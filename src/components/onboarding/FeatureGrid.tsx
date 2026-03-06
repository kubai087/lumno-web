import searchSvg from "../../assets/onboarding/search.svg?raw";
import siteSearchSvg from "../../assets/onboarding/sitesearch.svg?raw";
import newtabSvg from "../../assets/onboarding/newtab.svg?raw";
import labSvg from "../../assets/onboarding/lab.svg?raw";

type FeatureMessages = {
  searchTitle: string;
  searchDesc: string;
  siteSearchTitle: string;
  siteSearchDesc: string;
  newTabTitle: string;
  newTabDesc: string;
  labsTitle: string;
  labsTitleStrong: string;
  labsDesc: string;
  betaAlt: string;
};

interface Props {
  messages?: FeatureMessages;
}

const defaultMessages: FeatureMessages = {
  searchTitle: "搜索浏览器中的任意页面",
  searchDesc: "支持书签、历史记录、已打开页面和最常访问",
  siteSearchTitle: "自定义站内搜索",
  siteSearchDesc: "内置常用站点，按 Tab 一键发起站内搜索",
  newTabTitle: "极简新标签页",
  newTabDesc: "展示书签与常用网页卡片",
  labsTitle: "实验室功能",
  labsTitleStrong: "& 精美 UI",
  labsDesc: "更多玩法，敬请期待",
  betaAlt: "Beta",
};

export default function FeatureGrid({ messages = defaultMessages }: Props) {
  return (
    <div className="feature-grid" data-node-id="3359:330">
      <article
        className="feature-card card-a"
        data-node-id="3359:331"
      >
        <header className="card-title-wrap">
          <h2 className="card-title" data-i18n="feature_search_title">
            {messages.searchTitle}
          </h2>
          <p className="card-desc" data-i18n="feature_search_desc">
            {messages.searchDesc}
          </p>
        </header>
        <div className="card-a-graphic" data-node-id="3359:336">
          <span className="card-a-image mark-svg" aria-hidden="true" dangerouslySetInnerHTML={{ __html: searchSvg }} />
        </div>
      </article>

      <article
        className="feature-card card-b"
        data-node-id="3359:353"
      >
        <header className="card-title-wrap">
          <h2 className="card-title" data-i18n="feature_sitesearch_title">
            {messages.siteSearchTitle}
          </h2>
          <p className="card-desc" data-i18n="feature_sitesearch_desc">
            {messages.siteSearchDesc}
          </p>
        </header>
        <div className="card-b-graphic" data-node-id="3359:358">
          <span className="card-graphic-image mark-svg" aria-hidden="true" dangerouslySetInnerHTML={{ __html: siteSearchSvg }} />
        </div>
      </article>

      <article
        className="feature-card card-c"
        data-node-id="3359:387"
      >
        <header className="card-title-wrap">
          <h2 className="card-title" data-i18n="feature_newtab_title">
            {messages.newTabTitle}
          </h2>
          <p className="card-desc" data-i18n="feature_newtab_desc">
            {messages.newTabDesc}
          </p>
        </header>
        <div className="card-c-graphic" data-node-id="3359:392">
          <span className="card-graphic-image mark-svg" aria-hidden="true" dangerouslySetInnerHTML={{ __html: newtabSvg }} />
        </div>
      </article>

      <article
        className="feature-card card-d"
        data-node-id="3359:428"
      >
        <header className="card-title-wrap">
          <div className="title-with-badge">
            <h2 className="card-title">
              <span data-i18n="feature_labs_title">{messages.labsTitle}</span>{" "}
              <span className="title-strong" data-i18n="feature_labs_title_strong">{messages.labsTitleStrong}</span>
            </h2>
            <img className="title-badge" src="/assets/badge-selected.svg" alt={messages.betaAlt} data-i18n-alt="beta_alt" />
          </div>
          <p className="card-desc" data-i18n="feature_labs_desc">
            {messages.labsDesc}
          </p>
        </header>
        <div className="card-d-graphic" data-node-id="3359:444">
          <span className="card-graphic-image mark-svg" aria-hidden="true" dangerouslySetInnerHTML={{ __html: labSvg }} />
        </div>
      </article>
    </div>
  );
}
