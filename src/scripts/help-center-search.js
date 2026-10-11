(function(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  root.LumnoHelpCenterSearch = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function() {
  // Searches the help center's own index (lumno.kubai.design/<locale>/help/search-index.json)
  // and synonym list (search-synonyms.json). The help center's search box and the extension's
  // "Lumno 帮助中心" site search both run this file, so both list the same pages; keep it in
  // step with lumno-extension src/shared/help-center-search.js. lumno-web checks it against
  // src/content/guides/search/eval/<locale>.json after every build (scripts/help-search-eval.mjs).
  const RESULT_LIMIT = 6;
  const RECOMMENDED_LIMIT = 3;
  const INDEX_CACHE_TTL_MS = 10 * 60 * 1000;
  const FETCH_TIMEOUT_MS = 4000;
  const VARIANT_LIMIT = 48;
  const REWRITE_LIMIT = 24;

  // Words that phrase a question rather than name a topic; removing them leaves what the
  // person is asking about (怎么改快捷键 → 改快捷键, "how do I change the shortcut" → change shortcut).
  const QUERY_FILLERS = [
    '有什么用', '有啥用', '是干什么的', '干什么', '做什么', '是什么',
    '怎么样', '怎么办', '怎么', '怎样', '如何', '为什么', '为啥', '什么', '是否', '请问', '一下', '可以', '能不能',
    '有什麼用', '是做什麼的', '做什麼', '是什麼',
    '怎麼樣', '怎麼辦', '怎麼', '為什麼', '什麼', '請問',
    'って何', 'とは', 'どうやって', 'どうすれば', 'どうして', 'なぜ', 'したい', 'ですか', 'ますか',
    '吗', '嗎', '呢', '吧', '啊', '的', '了'
  ];
  const LATIN_STOP_WORDS = new Set([
    'a', 'an', 'the', 'how', 'do', 'does', 'did', 'can', 'could', 'i', 'my', 'me', 'to', 'is', 'are', 'was',
    'what', 'why', 'where', 'when', 'which', 'it', 'its', 'in', 'on', 'of', 'for', 'with', 'and', 'or', 'not',
    "don't", "doesn't", "can't", 'be', 'you', 'your', 'this', 'that', 'there', 'way', 'get', 'use', 'using'
  ]);
  const CJK_RUN = /[぀-ヿ㐀-鿿豈-﫿가-힯]+/g;
  const LATIN_WORD = /^[a-z][a-z'-]*$/;
  // A synonym the query contains is marked as \u0001<group>.<member>\u0002 so that filler words
  // can't break it up (我的最爱 keeps its 的) and so it can be swapped for the group's other words.
  const MARK = /\u0001(\d+)\.(\d+)\u0002/;
  const MARK_SPLIT = /(\u0001\d+\.\d+\u0002)/;

  function toStrings(value) {
    return Array.isArray(value) ? value.filter((item) => typeof item === 'string' && item) : [];
  }

  // Index docs: { title, href, text, aliases?, sections: [{ id, title, aliases? }] }. Aliases are
  // how people phrase a page or a section; they match like a heading but are never shown. text has
  // a line per block of the page (see parseLines); matching reads it as one run, tabs and line
  // breaks turned to spaces so every offset stays the same.
  function normalizeIndex(payload) {
    return (Array.isArray(payload) ? payload : [])
      .filter((doc) => doc && typeof doc.title === 'string' && typeof doc.href === 'string')
      .map((doc) => {
        const source = typeof doc.text === 'string' ? doc.text : '';
        const text = source.replace(/[\t\n]/g, ' ');
        const aliases = toStrings(doc.aliases);
        const sections = (Array.isArray(doc.sections) ? doc.sections : [])
          .filter((section) => section && typeof section.id === 'string' && typeof section.title === 'string')
          .map((section) => {
            const sectionAliases = toStrings(section.aliases);
            return {
              id: section.id,
              title: section.title,
              aliases: sectionAliases,
              lowerTitle: section.title.toLowerCase(),
              lowerAliases: sectionAliases.map((alias) => alias.toLowerCase())
            };
          });
        const lower = {
          title: doc.title.toLowerCase(),
          text: text.toLowerCase(),
          aliases: aliases.map((alias) => alias.toLowerCase())
        };
        lower.all = [lower.title, ...lower.aliases, ...sections.flatMap((s) => [s.lowerTitle, ...s.lowerAliases]), lower.text].join('\n');
        const lines = parseLines(source);
        locateSections(lower.text, lines, sections);
        return { title: doc.title, href: doc.href, text, lines, aliases, sections, lower };
      });
  }

  // The page's blocks, as the help center writes them into text: a line each, led by one tab for a
  // heading, two for a bullet and three for a table row (its cells split by tabs); a numbered step
  // keeps its "1. ". start and end are offsets into text, past the leading tabs.
  const LINE_KINDS = ['text', 'heading', 'bullet', 'row'];

  function parseLines(source) {
    const lines = [];
    let offset = 0;
    let previous = '';
    source.split('\n').forEach((raw) => {
      const tabs = Math.min(raw.match(/^\t*/)[0].length, 3);
      const content = raw.slice(tabs);
      const start = offset + tabs;
      const kind = LINE_KINDS[tabs];
      offset += raw.length + 1;
      if (!content.trim()) {
        previous = '';
        return;
      }
      const step = kind === 'text' ? content.match(/^(\d+)\.\s+/) : null;
      lines.push({
        kind: step ? 'step' : kind,
        start: step ? start + step[0].length : start,
        end: start + content.length,
        marker: step ? `${step[1]}.` : '',
        cells: kind === 'row' ? content.split('\t') : null,
        // A table's first row is its header.
        header: kind === 'row' && previous !== 'row'
      });
      previous = kind;
    });
    return lines;
  }

  // Where each section's body sits in the page text: from the end of its heading line (which may
  // number it, as the privacy policy does) to the next section's heading line. A section whose
  // heading isn't in the text gets none.
  function locateSections(lowerText, lines, sections) {
    let from = 0;
    const found = sections.map((section) => {
      const line = section.lowerTitle
        ? lines.find((item) => item.kind === 'heading' && item.start >= from && lowerText.slice(item.start, item.end).trim().endsWith(section.lowerTitle))
        : null;
      if (line) {
        from = line.end;
      }
      return line || null;
    });
    sections.forEach((section, i) => {
      const line = found[i];
      const next = found.slice(i + 1).find(Boolean);
      section.body = line ? { start: line.end, end: next ? next.start : lowerText.length } : null;
    });
  }

  // Synonym groups: string[][], each a set of words that mean the same thing to the reader.
  function normalizeSynonyms(payload) {
    const groups = (Array.isArray(payload) ? payload : [])
      .map((group) => [...new Set(toStrings(group).map((word) => word.toLowerCase().trim()).filter(Boolean))])
      .filter((group) => group.length > 1);
    // An English word only counts on its own, plural or not ("pin" not in "pinyin"); CJK words anywhere.
    const members = groups
      .flatMap((group, groupIndex) => group.map((word, memberIndex) => ({
        word,
        groupIndex,
        memberIndex,
        pattern: /^[a-z]/.test(word) || /[a-z]$/.test(word)
          ? new RegExp(`(?<![a-z])${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:s|es)?(?![a-z])`, 'g')
          : null
      })))
      .sort((a, b) => b.word.length - a.word.length);
    return { groups, members };
  }

  const preparedIndexes = new WeakMap();
  const preparedSynonyms = new WeakMap();
  const vocabularies = new WeakMap();
  const EMPTY_SYNONYMS = normalizeSynonyms([]);

  function prepareIndex(index) {
    if (!Array.isArray(index)) {
      return [];
    }
    if (index.every((doc) => doc && doc.lower)) {
      return index;
    }
    if (!preparedIndexes.has(index)) {
      preparedIndexes.set(index, normalizeIndex(index));
    }
    return preparedIndexes.get(index);
  }

  function prepareSynonyms(synonyms) {
    if (synonyms && Array.isArray(synonyms.groups) && Array.isArray(synonyms.members)) {
      return synonyms;
    }
    if (!Array.isArray(synonyms)) {
      return EMPTY_SYNONYMS;
    }
    if (!preparedSynonyms.has(synonyms)) {
      preparedSynonyms.set(synonyms, normalizeSynonyms(synonyms));
    }
    return preparedSynonyms.get(synonyms);
  }

  function markSynonyms(text, synonyms) {
    let marked = text;
    synonyms.members.forEach(({ word, groupIndex, memberIndex, pattern }) => {
      if (!marked.includes(word)) {
        return;
      }
      const mark = `\u0001${groupIndex}.${memberIndex}\u0002`;
      marked = pattern ? marked.replace(pattern, mark) : marked.split(word).join(mark);
    });
    return marked;
  }

  // The word the person typed first, then the rest of its group.
  function groupOptions(synonyms, mark) {
    const [, groupIndex, memberIndex] = mark.match(MARK);
    const group = synonyms.groups[Number(groupIndex)];
    const typed = group[Number(memberIndex)];
    return [typed, ...group.filter((word) => word !== typed)];
  }

  function unmark(text, synonyms) {
    return text.split(MARK_SPLIT).map((part) => (MARK.test(part) ? groupOptions(synonyms, part)[0] : part)).join('');
  }

  // Every spelling of a marked word: each synonym swapped in, the typed one first.
  function expandMarked(term, synonyms) {
    let variants = [''];
    term.split(MARK_SPLIT).filter(Boolean).forEach((part) => {
      const options = MARK.test(part) ? groupOptions(synonyms, part) : [part];
      const next = [];
      variants.forEach((variant) => {
        options.forEach((option) => {
          if (next.length < VARIANT_LIMIT) {
            next.push(variant + option);
          }
        });
      });
      variants = next;
    });
    return variants;
  }

  // The query once as typed, then once for each synonym swapped in on its own.
  function rewritesOf(text, synonyms) {
    const parts = text.split(MARK_SPLIT);
    const typed = parts.map((part) => (MARK.test(part) ? groupOptions(synonyms, part)[0] : part));
    const rewrites = [typed.join('')];
    parts.forEach((part, at) => {
      if (!MARK.test(part)) {
        return;
      }
      groupOptions(synonyms, part).slice(1).forEach((option) => {
        if (rewrites.length < REWRITE_LIMIT) {
          rewrites.push(typed.map((value, i) => (i === at ? option : value)).join(''));
        }
      });
    });
    return [...new Set(rewrites)];
  }

  function stripFillers(text) {
    let value = text;
    QUERY_FILLERS.forEach((filler) => {
      value = value.split(filler).join(' ');
    });
    return value;
  }

  // English endings: shortcuts → shortcut, syncing → sync, pinned → pin, changing → change.
  function latinStems(word) {
    if (!LATIN_WORD.test(word) || word.length < 4) {
      return [];
    }
    const stems = [];
    const undouble = (stem) => (/([b-df-hj-np-tv-z])\1$/.test(stem) ? [stem, stem.slice(0, -1)] : [stem]);
    if (word.endsWith('ies')) stems.push(`${word.slice(0, -3)}y`);
    if (word.endsWith('es')) stems.push(word.slice(0, -2));
    if (word.endsWith('s') && !word.endsWith('ss')) stems.push(word.slice(0, -1));
    if (word.endsWith('ing')) stems.push(...undouble(word.slice(0, -3)), `${word.slice(0, -3)}e`);
    if (word.endsWith('ed')) stems.push(...undouble(word.slice(0, -2)), word.slice(0, -1));
    return stems.filter((stem) => stem.length >= 3);
  }

  function vocabularyOf(docs) {
    if (!vocabularies.has(docs)) {
      const words = new Set();
      docs.forEach((doc) => {
        (doc.lower.all.match(/[a-z][a-z'-]{3,}/g) || []).forEach((word) => words.add(word));
      });
      vocabularies.set(docs, [...words]);
    }
    return vocabularies.get(docs);
  }

  // Optimal string alignment distance, giving up once it passes max.
  function withinEdits(a, b, max) {
    if (Math.abs(a.length - b.length) > max) {
      return false;
    }
    let before = null;
    let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i += 1) {
      const current = [i];
      let rowMin = i;
      for (let j = 1; j <= b.length; j += 1) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        let value = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + cost);
        if (before && i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          value = Math.min(value, before[j - 2] + 1);
        }
        current.push(value);
        rowMin = Math.min(rowMin, value);
      }
      if (rowMin > max) {
        return false;
      }
      before = previous;
      previous = current;
    }
    return previous[b.length] <= max;
  }

  // A misspelt English word the pages never use (shorcut, wallpapper) borrows the closest words they do.
  function typoFixes(word, docs) {
    if (!LATIN_WORD.test(word) || word.length < 5) {
      return [];
    }
    const max = word.length >= 9 ? 2 : 1;
    return vocabularyOf(docs).filter((candidate) => withinEdits(word, candidate, max)).slice(0, 5);
  }

  function termVariants(term, synonyms, docs) {
    const spelled = expandMarked(term, synonyms);
    const variants = [...spelled];
    spelled.forEach((variant) => variants.push(...latinStems(variant)));
    if (!MARK.test(term) && !variants.some((variant) => docs.some((doc) => contains(doc.lower.all, variant)))) {
      variants.push(...typoFixes(term, docs));
    }
    return [...new Set(variants)];
  }

  // CJK has no spaces, so a word made of known synonyms and pieces of two or more characters is
  // taken as separate words (设置深色模式 → 设置 + 深色模式); a lone character stays attached (改快捷键).
  function splitAtSynonyms(word) {
    const pieces = word.split(MARK_SPLIT).filter(Boolean);
    const cjkPiece = (piece) => piece.length >= 2 && piece.replace(CJK_RUN, '') === '';
    return pieces.length > 1 && pieces.every((piece) => MARK.test(piece) || cjkPiece(piece)) ? pieces : [word];
  }

  // Key names as the pages write them: ⌘T and cmd+t become "⌘ t" and "cmd t".
  function normalizeKeys(text) {
    return text.replace(/\s*\+\s*/g, ' ').replace(/([⌘⌥⇧⌃↩])\s*/g, ' $1 ');
  }

  // What the query asks about: its words (each with every spelling to try) and its rewrites.
  function planQuery(query, synonyms, docs) {
    const lower = normalizeKeys(String(query || '').toLowerCase()).trim();
    const marked = markSynonyms(lower, synonyms);
    const stripped = stripFillers(marked);
    let words = stripped.split(/\s+/).flatMap(splitAtSynonyms).filter((word) => word && !LATIN_STOP_WORDS.has(word));
    if (!words.length) {
      words = marked.split(/\s+/).filter(Boolean);
    }
    return {
      words: words.map((word) => unmark(word, synonyms)),
      terms: words.map((word) => termVariants(word, synonyms, docs)),
      rewrites: rewritesOf(stripped.trim() ? stripped : marked, synonyms)
    };
  }

  function getExactTerms(query, synonyms) {
    return planQuery(query, prepareSynonyms(synonyms), []).words;
  }

  // Only the start is trimmed here; the row's own ellipsis cuts the end at whatever width it has.
  const SNIPPET_LEAD = 24;
  const SNIPPET_LENGTH = 240;

  function snippet(text, term) {
    const at = text.toLowerCase().indexOf(term);
    const start = at < 0 ? 0 : Math.max(0, at - SNIPPET_LEAD);
    return `${start > 0 ? '…' : ''}${text.slice(start, start + SNIPPET_LENGTH).replace(/\s+/g, ' ')}`;
  }

  // The passage a result's hover card shows, as blocks laid out like the page: the heading it sits
  // under, then from the first block that mentions a query word (or the section's first block) on,
  // within a budget where CJK characters count double so every language fills about the same space.
  // Each block is { kind: 'heading' | 'text' | 'bullet' | 'step' | 'row', text, marker?, cells?, header? }.
  const CONTEXT_BUDGET = 300;
  const CONTEXT_LEAD = 40;
  const SENTENCE_END = /[。！？!?.；;：:]/;

  function widthOf(value) {
    let width = 0;
    for (const char of value) {
      width += /[぀-ヿ㐀-鿿豈-﫿가-힯＀-￯]/.test(char) ? 2 : 1;
    }
    return width;
  }

  // Up to budget wide, closing on a whole sentence when one ends in the second half.
  function clip(value, budget) {
    if (widthOf(value) <= budget) {
      return value;
    }
    let cut = 0;
    let width = 0;
    for (const char of value) {
      width += widthOf(char);
      if (width > budget) {
        break;
      }
      cut += char.length;
    }
    const head = value.slice(0, cut);
    const sentence = Math.max(...[...head.matchAll(/[。！？!?.；;]/g)].map((match) => match.index + 1), 0);
    return sentence && widthOf(head.slice(0, sentence)) >= budget / 2 ? head.slice(0, sentence) : `${head.trimEnd()}…`;
  }

  function blockOf(doc, line, from) {
    if (line.kind === 'row') {
      return line.header ? { kind: 'row', cells: line.cells.map((cell) => cell.trim()), header: true } : { kind: 'row', cells: line.cells.map((cell) => cell.trim()) };
    }
    const value = doc.text.slice(from, line.end).trim();
    const block = { kind: line.kind, text: from > line.start ? `…${value}` : value };
    if (line.marker) {
      block.marker = line.marker;
    }
    return block;
  }

  function blockWidth(block) {
    return block.kind === 'row' ? widthOf(block.cells.join('  ')) : widthOf(block.text) + 4;
  }

  function passage(doc, section, words) {
    const lines = doc.lines || [];
    const range = section && section.body ? section.body : { start: 0, end: doc.text.length };
    const body = doc.lower.text.slice(range.start, range.end);
    const hits = words.filter(Boolean).map((word) => body.indexOf(word)).filter((at) => at >= 0);
    const hit = hits.length ? range.start + Math.min(...hits) : range.start;
    let at = lines.findIndex((line) => line.end > hit);
    if (at < 0 || lines[at].start >= range.end) {
      return [];
    }
    const blocks = [];
    // The section's own heading, or the nearest one above the match.
    let heading = section && section.body ? lines.findIndex((line) => line.end === range.start) : -1;
    if (heading < 0) {
      for (let i = at; i >= 0 && heading < 0; i -= 1) {
        heading = lines[i].kind === 'heading' ? i : -1;
      }
    }
    if (heading >= 0 && heading !== at) {
      blocks.push(blockOf(doc, lines[heading], lines[heading].start));
    }
    // A table row brings the table's header row along.
    if (lines[at].kind === 'row' && !lines[at].header) {
      let first = at;
      while (first > 0 && !lines[first].header) {
        first -= 1;
      }
      blocks.push(blockOf(doc, lines[first], lines[first].start));
    }
    // A long block starts at the sentence holding the match, or a little before it.
    let from = lines[at].start;
    if (lines[at].kind !== 'row' && hit - from > CONTEXT_LEAD) {
      from = hit;
      while (from > lines[at].start && hit - from < CONTEXT_LEAD && !SENTENCE_END.test(doc.text[from - 1])) {
        from -= 1;
      }
    }
    let budget = CONTEXT_BUDGET - blocks.reduce((sum, block) => sum + blockWidth(block), 0);
    for (let i = at; i < lines.length && lines[i].start < range.end && budget > 20; i += 1) {
      if (i > at && lines[i].kind === 'heading' && !(section && section.body)) {
        break;
      }
      const block = blockOf(doc, lines[i], i === at ? from : lines[i].start);
      const width = blockWidth(block);
      if (width > budget && i > at && (block.kind === 'row' || budget < 60)) {
        break;
      }
      if (width > budget && block.kind !== 'row') {
        block.text = clip(block.text, budget - 4);
      }
      blocks.push(block);
      budget -= width;
    }
    // A heading with nothing under it says nothing.
    while (blocks.length && blocks[blocks.length - 1].kind === 'heading') {
      blocks.pop();
    }
    return blocks;
  }

  // Where one spelling of a word appears: the title, a heading, a section's aliases, the page's
  // aliases, then the body.
  function locate(doc, variant) {
    const heading = doc.sections.find((section) => contains(section.lowerTitle, variant));
    if (contains(doc.lower.title, variant)) {
      return { score: 10, section: heading || null, variant };
    }
    if (heading) {
      return { score: 4, section: heading, variant };
    }
    const aliased = doc.sections.find((section) => section.lowerAliases.some((alias) => contains(alias, variant)));
    if (aliased) {
      return { score: 3, section: aliased, variant };
    }
    if (doc.lower.aliases.some((alias) => contains(alias, variant))) {
      return { score: 2, section: null, variant };
    }
    if (contains(doc.lower.text, variant)) {
      return { score: 1, section: null, variant };
    }
    return null;
  }

  // A heading or alias that holds every word of a longer query is the question being asked.
  function phraseBonus(doc, terms) {
    if (terms.length < 2) {
      return 0;
    }
    const fields = [doc.lower.title, ...doc.lower.aliases, ...doc.sections.flatMap((section) => [section.lowerTitle, ...section.lowerAliases])];
    return fields.some((field) => terms.every((variants) => fieldHas(field, variants))) ? 4 : 0;
  }

  // Short English words only count on their own ("ai" not in "email", "pc" not in "npc").
  const shortWordPatterns = new Map();
  function contains(text, variant) {
    if (variant.length > 3 || !LATIN_WORD.test(variant)) {
      return text.includes(variant);
    }
    if (!shortWordPatterns.has(variant)) {
      shortWordPatterns.set(variant, new RegExp(`(?<![a-z])${variant}(?![a-z])`));
    }
    return text.includes(variant) && shortWordPatterns.get(variant).test(text);
  }

  function fieldHas(text, variants) {
    return variants.some((variant) => contains(text, variant));
  }

  function sectionHas(section, variants) {
    return fieldHas(section.lowerTitle, variants) || section.lowerAliases.some((alias) => fieldHas(alias, variants));
  }

  // The section to open: the one whose heading or aliases hold the most of the query's words,
  // rarer words counting for more (支持 Safari 吗 → the Safari section, not 支持情况).
  function bestSection(doc, terms, weights, fallback) {
    let best = fallback;
    let bestScore = 0;
    let bestLength = 0;
    doc.sections.forEach((section) => {
      let value = 0;
      let length = 0;
      terms.forEach((variants, i) => {
        if (sectionHas(section, variants)) {
          value += weights[i];
          length += variants[0].length;
        }
      });
      // Ties go to the section that holds the longer words (Safari over 支持).
      if (value > bestScore + 1e-9 || (value > 0 && Math.abs(value - bestScore) < 1e-9 && length > bestLength)) {
        best = section;
        bestScore = value;
        bestLength = length;
      }
    });
    return best;
  }

  // Every word must match somewhere; a title hit outranks a heading, which outranks the body.
  function matchExactly(docs, terms) {
    const weights = terms.map((variants) => {
      const count = docs.reduce((sum, doc) => sum + doc.sections.filter((section) => sectionHas(section, variants)).length, 0);
      return 1 / (1 + count);
    });
    return docs
      .map((doc, order) => {
        let score = 0;
        let section = null;
        let firstVariant = '';
        for (const variants of terms) {
          let best = null;
          variants.forEach((variant) => {
            const hit = locate(doc, variant);
            if (hit && (!best || hit.score > best.score)) {
              best = hit;
            }
          });
          if (!best) {
            return null;
          }
          score += best.score;
          if (best.section && !section) {
            section = best.section;
          }
          firstVariant = firstVariant || best.variant;
        }
        // Every spelling counts here, so a title hit on one (pinn) still opens the section another names (pin).
        section = bestSection(doc, terms, weights, section);
        score += phraseBonus(doc, terms);
        return {
          doc,
          score,
          order,
          section,
          detail: section ? section.title : snippet(doc.text, firstVariant),
          context: passage(doc, section, terms.flat())
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score || a.order - b.order);
  }

  // The pieces a loose match compares: pairs of characters for CJK text, which has no spaces
  // between words, and whole words for the rest.
  function unitsOf(text) {
    const units = new Set();
    (text.match(CJK_RUN) || []).forEach((run) => {
      if (run.length === 1) {
        units.add(run);
        return;
      }
      for (let i = 0; i < run.length - 1; i += 1) {
        units.add(run.slice(i, i + 2));
      }
    });
    text.replace(CJK_RUN, ' ').split(/[^\p{L}\p{N}']+/u).forEach((word) => {
      if (word.length >= 2 && !LATIN_STOP_WORDS.has(word)) {
        units.add(word);
      }
    });
    return [...units];
  }

  function getQueryUnits(query, synonyms) {
    const prepared = prepareSynonyms(synonyms);
    return unitsOf(planQuery(query, prepared, []).rewrites[0] || '');
  }

  function coverage(text, units) {
    return units.filter((unit) => text.includes(unit)).length / units.length;
  }

  // The longest stretch of the query's CJK text found as typed (快捷键老是失灵 → 快捷键 in 修改快捷键).
  function longestSharedRun(text, runs) {
    let longest = 0;
    runs.forEach((run) => {
      for (let start = 0; start < run.length; start += 1) {
        for (let end = run.length; end - start > longest; end -= 1) {
          if (text.includes(run.slice(start, end))) {
            longest = end - start;
            break;
          }
        }
      }
    });
    return longest;
  }

  // How well a title, heading or alias answers the query: the share of its pieces it contains,
  // or, for a long question, a phrase of three or more characters taken from it.
  function headingMatch(text, units, runs) {
    const value = coverage(text, units);
    return longestSharedRun(text, runs) >= 3 ? Math.max(value, 0.4) + 0.1 : value;
  }

  function recommendFor(docs, rewrite, excludedDocs) {
    const units = unitsOf(rewrite);
    if (!units.length) {
      return [];
    }
    const runs = rewrite.match(CJK_RUN) || [];
    return docs
      .map((doc, order) => {
        if (excludedDocs.has(doc)) {
          return null;
        }
        let headingCoverage = headingMatch(doc.lower.title, units, runs);
        let section = null;
        doc.lower.aliases.forEach((alias) => {
          headingCoverage = Math.max(headingCoverage, headingMatch(alias, units, runs) * 0.9);
        });
        doc.sections.forEach((item) => {
          const value = Math.max(
            headingMatch(item.lowerTitle, units, runs) * 0.9,
            ...item.lowerAliases.map((alias) => headingMatch(alias, units, runs) * 0.85)
          );
          if (value > headingCoverage) {
            headingCoverage = value;
            section = item;
          }
        });
        const bodyCoverage = coverage(doc.lower.text, units);
        if (headingCoverage < 0.4 && !(units.length > 1 && bodyCoverage === 1)) {
          return null;
        }
        return {
          doc,
          order,
          section,
          score: headingCoverage + bodyCoverage * 0.25,
          detail: section ? section.title : snippet(doc.text, units[0]),
          context: passage(doc, section, units),
          recommended: true
        };
      })
      .filter(Boolean);
  }

  // When the words don't all appear, the pages whose title, a heading or an alias share most of
  // the query's pieces (under any of its synonyms) are still worth reading; the body only breaks ties.
  function recommend(docs, rewrites, excludedDocs) {
    const best = new Map();
    rewrites.forEach((rewrite) => {
      recommendFor(docs, rewrite, excludedDocs).forEach((item) => {
        const current = best.get(item.doc);
        if (!current || item.score > current.score) {
          best.set(item.doc, item);
        }
      });
    });
    return [...best.values()]
      .sort((a, b) => b.score - a.score || a.order - b.order)
      .slice(0, RECOMMENDED_LIMIT);
  }

  function toUrl(origin, href) {
    return /^https?:\/\//i.test(href) ? href : `${origin}${href}`;
  }

  // Exact matches first; when they leave room, the closest pages follow as recommended reading.
  function searchIndex(index, query, options) {
    const settings = options && typeof options === 'object' ? options : {};
    const origin = String(settings.origin || '');
    const limit = Number.isFinite(Number(settings.limit)) ? Number(settings.limit) : RESULT_LIMIT;
    const docs = prepareIndex(index);
    if (!String(query || '').trim() || !docs.length) {
      return [];
    }
    const plan = planQuery(query, prepareSynonyms(settings.synonyms), docs);
    const exact = matchExactly(docs, plan.terms).slice(0, limit);
    const recommended = exact.length < limit
      ? recommend(docs, plan.rewrites, new Set(exact.map((item) => item.doc))).slice(0, limit - exact.length)
      : [];
    return [...exact, ...recommended].map((item) => {
      const result = {
        title: item.doc.title,
        detail: item.detail,
        context: item.context,
        url: toUrl(origin, item.section ? `${item.doc.href}#${item.section.id}` : item.doc.href)
      };
      if (item.recommended) {
        result.recommended = true;
      }
      return result;
    });
  }

  // One cached index per language; a failed load is forgotten so the next query retries.
  // parse turns the response into what is cached (normalizeSynonyms for search-synonyms.json).
  function createIndexLoader(options) {
    const config = options && typeof options === 'object' ? options : {};
    const fetchImpl = config.fetchImpl;
    const parse = typeof config.parse === 'function' ? config.parse : normalizeIndex;
    const now = typeof config.now === 'function' ? config.now : () => Date.now();
    const ttlMs = Number.isFinite(Number(config.ttlMs)) ? Number(config.ttlMs) : INDEX_CACHE_TTL_MS;
    const timeoutMs = Number.isFinite(Number(config.timeoutMs)) ? Number(config.timeoutMs) : FETCH_TIMEOUT_MS;
    const cache = new Map();

    function load(url) {
      const key = String(url || '');
      const cached = cache.get(key);
      if (cached && now() - cached.loadedAt < ttlMs) {
        return cached.promise;
      }
      if (typeof fetchImpl !== 'function' || !key) {
        return Promise.resolve([]);
      }
      const controller = typeof AbortController === 'function' ? new AbortController() : null;
      const timeoutId = controller ? setTimeout(() => controller.abort(), timeoutMs) : 0;
      const promise = Promise.resolve(fetchImpl(key, controller ? { signal: controller.signal } : undefined))
        .then((response) => {
          if (!response || !response.ok || typeof response.json !== 'function') {
            throw new Error('help center index unavailable');
          }
          return response.json();
        })
        .then(parse)
        .catch((error) => {
          if (cache.get(key) && cache.get(key).promise === promise) {
            cache.delete(key);
          }
          throw error;
        })
        .finally(() => {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
        });
      cache.set(key, { loadedAt: now(), promise });
      return promise;
    }

    return Object.freeze({ load });
  }

  return Object.freeze({
    RESULT_LIMIT,
    INDEX_CACHE_TTL_MS,
    normalizeIndex,
    normalizeSynonyms,
    getExactTerms,
    getQueryUnits,
    searchIndex,
    createIndexLoader
  });
});
