import test from "node:test";
import assert from "node:assert/strict";

import {
  markHintDeclined,
  markHintShown,
  mayShowHint,
  pickHintLocale,
  toSiteLocale,
} from "../src/lib/language-hint.ts";

const ALL = ["zh-CN", "zh-TW", "en", "ja", "ko", "de", "fr", "es", "pt-BR", "ru"];
const DAY = 24 * 60 * 60 * 1000;

test("browser tags map to site locales, unknown ones to null", () => {
  assert.equal(toSiteLocale("en-GB"), "en");
  assert.equal(toSiteLocale("zh-HK"), "zh-TW");
  assert.equal(toSiteLocale("zh-Hans-CN"), "zh-CN");
  assert.equal(toSiteLocale("pt-PT"), "pt-BR");
  assert.equal(toSiteLocale("nl-NL"), null);
  assert.equal(toSiteLocale(""), null);
});

test("an English reader on the Chinese default page is offered English", () => {
  assert.equal(pickHintLocale("zh-CN", ["en-US", "en"], ALL), "en");
});

test("nothing is offered when the page language is anywhere in the browser list", () => {
  assert.equal(pickHintLocale("zh-CN", ["en-US", "zh-CN"], ALL), null);
  assert.equal(pickHintLocale("en", ["de", "en-GB"], ALL), null);
});

test("the first browser language the page has is offered", () => {
  assert.equal(pickHintLocale("zh-CN", ["nl", "ja", "en"], ALL), "ja");
  assert.equal(pickHintLocale("zh-CN", ["ko", "en"], ["zh-CN", "zh-TW", "en"]), "en");
});

test("nothing is offered when no browser language is a site language", () => {
  assert.equal(pickHintLocale("en", ["nl", "sv"], ALL), null);
  assert.equal(pickHintLocale("zh-CN", ["ko"], ["zh-CN", "en"]), null);
});

test("shown and left alone, the card waits a day", () => {
  const now = Date.UTC(2026, 10, 1);
  const shown = markHintShown(null, "en", now);
  assert.equal(mayShowHint(shown, "en", now + DAY / 2), false);
  assert.equal(mayShowHint(shown, "en", now + DAY + 1), true);
});

test("turned down, it waits 7 days, then 30, then stops", () => {
  const now = Date.UTC(2026, 10, 1);
  let state = markHintDeclined(markHintShown(null, "en", now), "en", now);
  assert.equal(mayShowHint(state, "en", now + 6 * DAY), false);
  assert.equal(mayShowHint(state, "en", now + 7 * DAY + 1), true);

  state = markHintDeclined(state, "en", now);
  assert.equal(mayShowHint(state, "en", now + 29 * DAY), false);
  assert.equal(mayShowHint(state, "en", now + 30 * DAY + 1), true);

  state = markHintDeclined(state, "en", now);
  assert.equal(mayShowHint(state, "en", now + 365 * DAY), false);
});

test("a different language starts a fresh count", () => {
  const now = Date.UTC(2026, 10, 1);
  let state = markHintDeclined(null, "en", now);
  state = markHintDeclined(state, "en", now);
  state = markHintDeclined(state, "en", now);
  assert.equal(mayShowHint(state, "ja", now), true);
  assert.deepEqual(markHintShown(state, "ja", now), { locale: "ja", declined: 0, shownAt: now });
});
