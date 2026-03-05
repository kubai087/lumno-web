import searchSvg from "../../assets/onboarding/search.svg?raw";
import siteSearchSvg from "../../assets/onboarding/sitesearch.svg?raw";
import newtabSvg from "../../assets/onboarding/newtab.svg?raw";
import labSvg from "../../assets/onboarding/lab.svg?raw";

export default function FeatureGrid() {
  return (
    <div className="feature-grid" data-node-id="3359:330">
      <article
        className="feature-card card-a"
        data-node-id="3359:331"
      >
        <header className="card-title-wrap">
          <h2 className="card-title" data-i18n="feature_search_title">
            搜索任意浏览器网页
          </h2>
          <p className="card-desc" data-i18n="feature_search_desc">
            支持书签、历史、已打开网页、最常访问
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
            自定义站内搜索
          </h2>
          <p className="card-desc" data-i18n="feature_sitesearch_desc">
            内置常用网站列表，Tab 一键搜索
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
            极简新标签页
          </h2>
          <p className="card-desc" data-i18n="feature_newtab_desc">
            展示书签与网页卡片
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
              <span data-i18n="feature_labs_title">实验室功能</span> <span className="title-strong" data-i18n="feature_labs_title_strong">&amp; 精美 UI</span>
            </h2>
            <img className="title-badge" src="/assets/badge-selected.svg" alt="Beta" data-i18n-alt="beta_alt" />
          </div>
          <p className="card-desc" data-i18n="feature_labs_desc">
            更多玩法，敬请期待
          </p>
        </header>
        <div className="card-d-graphic" data-node-id="3359:444">
          <span className="card-graphic-image mark-svg" aria-hidden="true" dangerouslySetInnerHTML={{ __html: labSvg }} />
        </div>
      </article>
    </div>
  );
}
