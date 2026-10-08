import type { ChromeStoreReview } from "./chrome-store-reviews";
import type { SupportedLocale } from "./locales";

type ReviewTranslations = Record<Exclude<SupportedLocale, "zh-CN">, string>;

/**
 * Hand translations of the Simplified Chinese store reviews, keyed by the
 * original text (live and snapshot review ids differ, the text does not).
 * A review that shows up live without an entry here stays on the zh-CN page
 * only; the build logs it so it can be translated.
 */
const REVIEW_TRANSLATIONS: Record<string, ReviewTranslations> = {
  "优秀，不知道作者还有没有其他的作品，也想用一用": {
    "zh-TW": "優秀！不知道作者還有沒有其他作品，也想用用看",
    en: "Excellent. Has the developer made anything else? I’d love to try it too.",
    ja: "素晴らしいです。作者さんのほかの作品もあれば使ってみたいです",
    ko: "훌륭해요. 개발자분의 다른 작품도 있다면 써 보고 싶어요",
    de: "Hervorragend. Gibt es noch mehr aus derselben Feder? Würde ich auch gern ausprobieren.",
    fr: "Excellent. Y a-t-il d’autres créations de la même personne ? J’aimerais les essayer aussi.",
    es: "Excelente. ¿Hay más proyectos de quien lo hizo? También me gustaría probarlos.",
    "pt-BR": "Excelente. Será que tem outros projetos de quem fez? Também queria experimentar.",
    ru: "Отлично. Интересно, есть ли у автора другие проекты — тоже хочу попробовать.",
  },
  "非常好用，美观实用满足了我所有的诉求": {
    "zh-TW": "非常好用，美觀又實用，滿足了我所有的需求",
    en: "Really easy to use. Beautiful, practical, and does everything I need.",
    ja: "とても使いやすい。見た目も実用性も、求めていたものがすべて揃っています",
    ko: "정말 쓰기 편해요. 예쁘고 실용적이라 원하던 게 다 있어요",
    de: "Sehr praktisch – schön, nützlich und erfüllt alles, was ich brauche.",
    fr: "Très pratique : beau, utile, et il fait tout ce dont j’ai besoin.",
    es: "Muy útil: bonito, práctico y cubre todo lo que necesito.",
    "pt-BR": "Muito útil: bonito, prático e atende a tudo o que eu preciso.",
    ru: "Очень удобно: красиво, практично и умеет всё, что мне нужно.",
  },
  "非常漂亮和实用！": {
    "zh-TW": "非常漂亮又實用！",
    en: "Gorgeous and genuinely useful!",
    ja: "とてもきれいで実用的！",
    ko: "정말 예쁘고 실용적이에요!",
    de: "Wunderschön und richtig praktisch!",
    fr: "Superbe et vraiment pratique !",
    es: "¡Precioso y muy práctico!",
    "pt-BR": "Lindo e muito prático!",
    ru: "Очень красиво и практично!",
  },
  "非常好看好用的启动页，功能越来越多啦！": {
    "zh-TW": "非常好看又好用的起始頁，功能越來越多了！",
    en: "A beautiful, easy start page, and the features keep coming!",
    ja: "見た目も使い勝手もいいスタートページ。機能もどんどん増えています！",
    ko: "예쁘고 편한 시작 페이지예요. 기능도 점점 많아지고 있어요!",
    de: "Eine schöne, praktische Startseite – und es kommen ständig neue Funktionen dazu!",
    fr: "Une page d’accueil belle et pratique, et les fonctionnalités ne cessent d’arriver !",
    es: "Una página de inicio bonita y cómoda, ¡y cada vez con más funciones!",
    "pt-BR": "Uma página inicial linda e prática, e com cada vez mais recursos!",
    ru: "Красивая и удобная стартовая страница, и функций становится всё больше!",
  },
  "非常美观，微动效很丝滑，体验感满满": {
    "zh-TW": "非常美觀，微動效很絲滑，體驗感滿分",
    en: "Beautiful, with silky-smooth micro-animations. A real pleasure to use.",
    ja: "とても美しく、マイクロアニメーションもなめらか。使っていて心地いいです",
    ko: "정말 예쁘고 마이크로 애니메이션이 아주 부드러워요. 쓰는 맛이 있어요",
    de: "Sehr schön, mit butterweichen Mikroanimationen. Macht richtig Spaß.",
    fr: "Très beau, avec des micro-animations d’une grande fluidité. Un vrai plaisir.",
    es: "Muy bonito, con microanimaciones suavísimas. Da gusto usarlo.",
    "pt-BR": "Muito bonito, com microanimações supersuaves. Dá gosto de usar.",
    ru: "Очень красиво, микроанимации невероятно плавные. Пользоваться — одно удовольствие.",
  },
  "美丽至极！原本用的小舒同学很久没更新了，换壁纸的图库链接都崩了。找了很久按照书签进行展示的新标签页，这样不用维护两个，最后发现了这个新的标签页，非常好用！": {
    "zh-TW":
      "美到極致！原本用的小舒同學很久沒更新，換桌布的圖庫連結都掛了。找了很久能依書籤顯示的新分頁，這樣就不用維護兩套，最後發現了這個新分頁，非常好用！",
    en: "Absolutely gorgeous! My old new tab hadn’t been updated in ages and its wallpaper links were all broken. I’d been hunting for a new tab built around my bookmarks, so I wouldn’t have to maintain two, and finally found this one. Love it!",
    ja: "最高に美しい！ 以前使っていた新しいタブはずっと更新されず、壁紙のリンクも切れていました。二つを管理しなくて済むよう、ブックマークをそのまま表示できる新しいタブを長いこと探して、ようやく見つけたのがこれ。とても使いやすいです！",
    ko: "정말 아름다워요! 예전에 쓰던 새 탭은 오랫동안 업데이트가 없어서 배경화면 링크까지 다 깨졌어요. 두 개를 따로 관리하지 않도록 북마크를 그대로 보여 주는 새 탭을 오래 찾다가 드디어 이걸 만났어요. 정말 좋아요!",
    de: "Wunderschön! Mein alter neuer Tab wurde ewig nicht aktualisiert, die Hintergrundbild-Links waren alle kaputt. Ich habe lange einen neuen Tab gesucht, der meine Lesezeichen zeigt, damit ich nicht zwei Dinge pflegen muss – und endlich diesen gefunden. Super praktisch!",
    fr: "Magnifique ! Mon ancien nouvel onglet n’était plus mis à jour depuis longtemps et ses liens de fonds d’écran étaient cassés. Je cherchais un nouvel onglet construit autour de mes favoris, pour ne pas en gérer deux, et j’ai enfin trouvé celui-ci. Très pratique !",
    es: "¡Precioso! La nueva pestaña que usaba llevaba mucho sin actualizarse y los enlaces de fondos estaban rotos. Busqué mucho tiempo una nueva pestaña que mostrara mis marcadores, para no mantener dos cosas, y por fin encontré esta. ¡Muy útil!",
    "pt-BR":
      "Lindo demais! A nova guia que eu usava estava sem atualização havia tempos, e os links de papéis de parede quebraram. Procurei muito uma nova guia que mostrasse meus favoritos, para não ter que manter duas coisas, e finalmente achei esta. Muito boa!",
    ru: "Невероятно красиво! Прежняя новая вкладка давно не обновлялась, ссылки на обои перестали работать. Давно хотелось новую вкладку, которая показывает закладки, чтобы не поддерживать две разные, — и наконец нашлась эта. Очень удобно!",
  },
  "用了 Lumno 之后就回不去了。Ctrl+T 一键呼出搜索浮层，历史记录、书签、常用网站全都能搜到，还有 Google 联想建议，基本不用再手动翻找了。最喜欢的是站内搜索快捷键功能，输入 gh + Tab 就能直接搜 GitHub，省了好多步骤。": {
    "zh-TW":
      "用了 Lumno 之後就回不去了。Ctrl+T 一鍵叫出搜尋浮層，歷史記錄、書籤、常用網站全都搜得到，還有 Google 搜尋建議，幾乎不用再手動翻找。最喜歡站內搜尋快捷鍵，輸入 gh + Tab 就能直接搜 GitHub，省了好多步驟。",
    en: "Once you’ve used Lumno, there’s no going back. Ctrl+T brings up the search overlay, which finds history, bookmarks and frequent sites, plus Google suggestions, so I barely dig around anymore. My favorite is site search shortcuts: type gh + Tab and you’re searching GitHub. Saves so many steps.",
    ja: "Lumno を使ったらもう戻れません。Ctrl+T で検索パネルが開き、履歴もブックマークもよく見るサイトも全部検索できて、Google の候補まで出るので、手で探すことはほとんどなくなりました。いちばん好きなのはサイト内検索のショートカット。gh + Tab で GitHub をそのまま検索でき、手間がぐっと減りました。",
    ko: "Lumno를 쓰고 나니 예전으로 못 돌아가겠어요. Ctrl+T 한 번이면 검색 창이 뜨고, 방문 기록·북마크·자주 가는 사이트를 전부 검색할 수 있고 Google 추천 검색어까지 나와서 일일이 찾을 일이 거의 없어요. 제일 좋은 건 사이트 검색 단축키예요. gh + Tab만 입력하면 바로 GitHub에서 검색돼요.",
    de: "Seit Lumno will ich nicht mehr zurück. Ctrl+T öffnet die Suche, die Verlauf, Lesezeichen und häufig besuchte Seiten findet, dazu Google-Vorschläge – manuelles Suchen fällt praktisch weg. Am liebsten mag ich die Kürzel für die Seitensuche: gh + Tab, und schon sucht man auf GitHub. Spart jede Menge Schritte.",
    fr: "Après Lumno, impossible de revenir en arrière. Ctrl+T ouvre la recherche, qui trouve historique, favoris et sites fréquents, avec en plus les suggestions Google : je ne fouille presque plus à la main. Ce que je préfère, ce sont les raccourcis de recherche sur site : gh + Tab et on cherche directement sur GitHub. Ça économise plein d’étapes.",
    es: "Después de Lumno ya no hay vuelta atrás. Ctrl+T abre el buscador, que encuentra historial, marcadores y sitios frecuentes, además de sugerencias de Google, así que casi no busco a mano. Lo que más me gusta son los atajos de búsqueda en sitios: escribes gh + Tab y buscas directamente en GitHub. Ahorra un montón de pasos.",
    "pt-BR":
      "Depois do Lumno, não dá para voltar atrás. Ctrl+T abre a busca, que encontra histórico, favoritos e sites frequentes, além das sugestões do Google, então quase não procuro nada na mão. O que mais gosto são os atalhos de busca em sites: digite gh + Tab e já está buscando no GitHub. Economiza um monte de passos.",
    ru: "После Lumno возвращаться не хочется. Ctrl+T открывает поиск: история, закладки, частые сайты — всё находится, плюс подсказки Google, так что вручную почти ничего не ищу. Больше всего нравятся сокращения для поиска по сайтам: gh + Tab — и сразу ищешь на GitHub. Экономит кучу шагов.",
  },
  "作者人很好，修bug很快，插件目前来看是我找到的聚焦搜索中最好用且美观得了：) 新标签页没咋用，不过看着也不差": {
    "zh-TW": "作者人很好，修 bug 很快，這是我目前找到最好用也最好看的聚焦搜尋了 :) 新分頁還沒怎麼用，不過看起來也不錯",
    en: "The developer is lovely and fixes bugs fast. Of all the spotlight-style searches I’ve found, this is the most useful and the best looking :) Haven’t used the new tab much, but it looks good too.",
    ja: "作者さんがとても親切で、バグ修正も早い。これまで見つけたフォーカス検索の中で、いちばん使いやすくて見た目もいいです :) 新しいタブはまだあまり使っていませんが、見た感じ悪くないです",
    ko: "개발자분이 친절하고 버그도 빨리 고쳐 줘요. 지금까지 찾은 포커스 검색 중에 가장 편하고 예뻐요 :) 새 탭은 아직 많이 안 써 봤지만 보기에도 괜찮아요",
    de: "Sehr netter Support, Bugs werden schnell behoben. Von allen Spotlight-artigen Suchen, die ich gefunden habe, ist das die praktischste und schönste :) Den neuen Tab nutze ich kaum, aber er sieht auch gut aus.",
    fr: "Un support adorable et des bugs corrigés très vite. De toutes les recherches façon Spotlight que j’ai trouvées, c’est la plus pratique et la plus belle :) J’utilise peu le nouvel onglet, mais il a l’air bien aussi.",
    es: "Quien lo desarrolla es muy amable y corrige los bugs rapidísimo. De todas las búsquedas tipo Spotlight que he encontrado, es la más útil y la más bonita :) La nueva pestaña casi no la uso, pero también se ve bien.",
    "pt-BR":
      "Quem desenvolve é muito gente boa e corrige bugs rapidinho. De todas as buscas estilo Spotlight que encontrei, é a mais útil e a mais bonita :) Quase não uso a nova guia, mas ela também parece ótima.",
    ru: "У автора отличная поддержка, баги исправляются быстро. Из всех поисков в стиле Spotlight, что мне попадались, этот самый удобный и красивый :) Новой вкладкой почти не пользуюсь, но выглядит она тоже неплохо.",
  },
};

const normalizeReviewText = (text: string) => text.replace(/\s+/g, " ").trim();

const TRANSLATIONS_BY_TEXT = new Map(
  Object.entries(REVIEW_TRANSLATIONS).map(([text, translations]) => [normalizeReviewText(text), translations]),
);

/**
 * The store reviews in the page's language. zh-CN shows the originals; other
 * locales show only the reviews that have a translation.
 */
export function localizeShowcaseReviews(
  reviews: readonly ChromeStoreReview[],
  locale: SupportedLocale,
): ChromeStoreReview[] {
  if (locale === "zh-CN") return [...reviews];

  const localized: ChromeStoreReview[] = [];
  const untranslated: string[] = [];

  for (const review of reviews) {
    const translation = TRANSLATIONS_BY_TEXT.get(normalizeReviewText(review.review))?.[locale];
    if (translation) localized.push({ ...review, review: translation });
    else untranslated.push(review.reviewerId);
  }

  if (untranslated.length && locale === "en") {
    console.warn(
      `[chrome-store-reviews] No translation for reviews by ${untranslated.join(", ")}; ` +
        "they show on the zh-CN homepage only. Add them to src/lib/chrome-store-review-translations.ts.",
    );
  }

  return localized;
}
