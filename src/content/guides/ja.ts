import type { GuideLocaleContent } from "../../lib/guides";

/** 日本語ヘルプセンター：直訳ではなく、日本語の製品ページらしい言葉で。 */
const content: GuideLocaleContent = {
  ui: {
    navLabel: "ヘルプセンター",
    navTitle: "Lumno ヘルプセンター",
    groups: {
      about: "Lumno について",
      quickstart: "はじめかた",
      trust: "互換性と安全性",
    },
    sections: {
      setup: "インストールと設定",
      "command-bar": "コマンドバー",
      "new-tab": "新しいタブ",
      more: "そのほかの機能",
      scenarios: "シーン別",
    },
    navToggle: "目次",
    updatedLabel: "{date}更新",
    tocLabel: "このページの内容",
    faqTitle: "よくある質問",
    previousLabel: "前へ",
    nextLabel: "次へ",
    homeCardLabel: "公式サイト",
    homeCardTitle: "Lumno のトップページへ",
    zoomLabel: "拡大表示",
    closeLabel: "閉じる",
    privacyLabel: "プライバシーポリシー",
    searchPlaceholder: "ヘルプを検索",
    searchLabel: "ヘルプセンターを検索",
    searchEmpty: "見つかりませんでした。お気軽に開発者までご連絡ください。",
    searchRecommended: "おすすめの記事",
    searchFeedbackGroup: "WeChat グループに参加",
    searchFeedbackIssue: "Issue を作成",
    searchFeedbackAuthor: "作者に連絡",
    stuckText: "解決しない場合は、GitHub で質問するか、X でお問い合わせください。",
    stuckPrimary: "GitHub で質問する",
    stuckSecondary: "X で連絡する",
  },
  pages: {
    "what-is-lumno": {
      pageTitle: "Lumno とは：オープンソースのブラウザコマンドバーと新しいタブ｜Lumno ヘルプ",
      pageDescription:
        "Lumno は無料・オープンソースのブラウザ拡張機能です。どのページでも ⌘⇧K でコマンドバーを開き、タブ・ブックマーク・履歴を検索したり、サイト内検索や AI への質問ができます。新しいタブも自由にカスタマイズ。Chrome、Edge、Dia など Chromium 系ブラウザと Firefox で使えます。",
      keywords: ["Lumno", "ブラウザ コマンドバー", "Chrome コマンドパレット 拡張機能", "タブ検索", "新しいタブ 拡張機能", "Arc コマンドバー"],
      title: "Lumno とは",
      navTitle: "Lumno とは",
      faq: [
        { question: "Lumno は無料ですか？", answer: "はい。GPL-3.0 のオープンソースで、すべての機能を無料で使えます。アカウント登録も不要です。" },
        {
          question: "どのブラウザで使用できますか？",
          answer: "Chrome、Edge、Dia、Brave、Arc、Vivaldi など Chromium 系のブラウザと、Firefox や Zen などの Firefox 系ブラウザです。Safari には対応していません。詳しくは「ブラウザ互換性」を参照してください。",
        },
      ],
    },
    limitations: {
      pageTitle: "Lumno にできないこと：機能の範囲と既知の制限｜Lumno ヘルプ",
      pageDescription:
        "Lumno はブラウザではなく拡張機能です。chrome:// などの制限ページではコマンドバーを開けません。Safari には非対応で、Dia では新しいタブを使えません。",
      keywords: ["Lumno 制限", "Chrome 拡張機能 制限ページ", "Arc サイドバー 代わり", "Dia 新しいタブ"],
      title: "Lumno にできないこと",
      navTitle: "Lumno にできないこと",
    },
    "use-cases": {
      pageTitle: "Lumno が役立つ場面：タブが多すぎる、Arc からの乗り換え、開発と執筆｜Lumno ヘルプ",
      pageDescription:
        "タブを何十個も開いている、Arc から Chrome や Dia に乗り換えた、ドキュメントと GitHub を行き来する開発者、調べものや執筆、AI にすぐ聞きたい、静かな新しいタブがほしい。Lumno が役立つ場面を紹介します。",
      keywords: ["Lumno 使い方", "タブが多すぎる", "Arc 代わり", "開発者 拡張機能", "AI にすぐ質問"],
      title: "活用シーン",
      navTitle: "活用シーン",
    },
    faq: {
      pageTitle: "Lumno のよくある質問：ショートカット、制限ページ、新しいタブ、同期｜Lumno ヘルプ",
      pageDescription:
        "Lumno のよくある質問。初期設定のショートカットと変更方法、ショートカットが反応しない場合の対処、ほかの新しいタブ拡張機能との併用、対応ブラウザ、設定の同期、閲覧データの扱いについて説明します。",
      keywords: ["Lumno よくある質問", "Lumno FAQ", "Chrome 拡張機能 ショートカット 反応しない", "新しいタブ 拡張機能 競合", "Lumno 無料"],
      title: "よくある質問",
      navTitle: "よくある質問",
    },
    install: {
      pageTitle: "Lumno のインストール：Chrome ウェブストア、Edge アドオン、Firefox アドオンから｜Lumno ヘルプ",
      pageDescription:
        "Chrome、Dia、Brave、Arc では Chrome ウェブストアから、Edge では Microsoft Edge アドオンから、Firefox と Zen では Firefox アドオンから Lumno をインストールします。ようこそページが開き、⌘⇧K ですぐに使えます。",
      keywords: ["Lumno インストール", "Lumno Chrome ウェブストア", "Lumno Edge アドオン", "Lumno Firefox アドオン", "Chrome 拡張機能 インストール"],
      title: "Lumno をインストールする",
      navTitle: "インストール",
      faq: [
        { question: "アカウントは必要ですか？", answer: "いいえ。Lumno にはアカウントの仕組みがありません。インストール後すぐに使用できます。" },
        {
          question: "アンインストールするにはどうすればよいですか？",
          answer: "chrome://extensions（Edge では edge://extensions）で Lumno の「削除」をクリックします。Firefox では about:addons から削除します。この端末に保存された設定や画像も削除されます。",
        },
      ],
    },
    "keyboard-shortcuts": {
      pageTitle: "Lumno のキーボードショートカット一覧：初期設定・変更方法・すべてのキー｜Lumno ヘルプ",
      pageDescription:
        "Lumno は ⌘⇧K（Windows では Ctrl+Shift+K）でコマンドバーを、⌥Q（Alt+Q）で最近のタブ切り替えを開きます。chrome://extensions/shortcuts で変更でき、⌘T にもできます。コマンドバー、新しいタブ、切り替え画面、Webクリップのキーと、バックグラウンドで開くなどのクリック操作もまとめました。",
      keywords: ["Lumno ショートカット", "Chrome 拡張機能 ショートカット 変更", "chrome://extensions/shortcuts", "⌘T コマンドバー", "バックグラウンドで開く"],
      title: "キーボードショートカット",
      navTitle: "ショートカット",
      faq: [
        {
          question: "ショートカットキーが反応しない場合はどうすればよいですか？",
          answer:
            "chrome:// の設定ページや拡張機能ストアなどの制限ページでないか確認し、chrome://extensions/shortcuts でほかの拡張機能と重なっていないか確かめてください。Dia では範囲を「グローバル」にします。",
        },
      ],
    },
    sync: {
      pageTitle: "同期：ブラウザの同期と WebDAV で Lumno を複数のパソコンに｜Lumno ヘルプ",
      pageDescription:
        "Lumno の設定はブラウザの同期でそのまま引き継がれます。WebDAV 同期をオンにすれば、アップロードしたアイコンや壁紙、名言リストも同期できます。Nextcloud、NAS など自分の WebDAV サーバーを使います。",
      keywords: ["Lumno 同期", "WebDAV 同期", "Nextcloud WebDAV", "Chrome 拡張機能 設定 同期", "新しいタブ 同期"],
      title: "同期",
      navTitle: "同期",
      faq: [
        { question: "同期に Lumno のアカウントは必要ですか？", answer: "いいえ。Lumno にはアカウントもサーバーもありません。設定はブラウザの同期で、アイコンや壁紙は自分の WebDAV で同期します。" },
        { question: "Chrome と Firefox の間で同期できますか？", answer: "はい、WebDAV を使用すれば同期できます。両方のブラウザを同じサーバーとフォルダに接続すると、同じパソコンで同時に開いている場合でも同期されます。" },
      ],
    },
    "search-tabs-bookmarks-history": {
      pageTitle: "開いているタブ・ブックマーク・履歴をまとめて検索｜Lumno ヘルプ",
      pageDescription:
        "どのページでも ⌘⇧K（Windows では Ctrl+Shift+K）で Lumno を開き、開いているタブ、ブックマーク、履歴、よくアクセスするサイトをひとつの検索ボックスで探せます。開いているタブだけに絞ることもできます。",
      keywords: ["Chrome タブ 検索", "ブックマーク 検索 拡張機能", "履歴 検索", "開いているタブを検索", "Chrome コマンドパレット"],
      title: "タブ・ブックマーク・履歴を検索する",
      navTitle: "タブ・ブックマーク・履歴の検索",
      faq: [
        {
          question: "Lumno は履歴やブックマークをアップロードしますか？",
          answer:
            "しません。タブ、ブックマーク、履歴はブラウザ内で検索され、Lumno が収集することはありません。入力内容は候補を表示するために検索エンジンの候補サービスへ送られます。アドレスバーで入力するときと同じです。",
        },
        { question: "検索結果を新しいタブで開けますか？", answer: "はい。Lumno の設定で、現在のタブ、その左右、またはタブバーの末尾のどこで開くか選べます。" },
      ],
    },
    "site-search": {
      pageTitle: "サイト内検索：略称を入力して Tab、GitHub や YouTube を直接検索｜Lumno ヘルプ",
      pageDescription:
        "Lumno には 47 の検索ショートカットが入っています。gh、yt、sf などを入力して Tab を押せば GitHub、YouTube、Stack Overflow を直接検索。ChatGPT や Gemini にそのまま質問することもできます。",
      keywords: ["Chrome サイト内検索", "Tab で検索", "ブラウザ 検索 ショートカット", "GitHub すばやく検索", "ChatGPT ショートカット", "カスタム検索エンジン"],
      title: "サイト内検索と AI への質問",
      navTitle: "サイト内検索と AI",
      faq: [
        {
          question: "どのサイトに対応していますか？",
          answer: "47 種類です。検索エンジン 11、AI チャットと AI 検索 11（ChatGPT、Gemini、Perplexity、DeepSeek など）、GitHub、YouTube、Stack Overflow などのサイト 24、そして Lumno ヘルプセンター。自分でサイトを追加することもできます。",
        },
        { question: "サイト内検索は Lumno のサーバーを経由しますか？", answer: "いいえ。Lumno にはサーバーがなく、Enter キーを押すと目的のサイトの検索ページが直接開きます。" },
      ],
    },
    "tab-switcher": {
      pageTitle: "最近のタブ切り替え：⌥Q で直前のタブへ｜Lumno ヘルプ",
      pageDescription:
        "⌥Q（Windows では Alt+Q）で Lumno の最近のタブ切り替えを開くと、使った順にタブがプレビュー付きで並びます。⌥ を押したまま Q を押して、離せば切り替わります。切り替え画面からタブを閉じることもできます。",
      keywords: ["Chrome タブ 切り替え", "最近のタブ", "ブラウザ Alt Tab", "Arc Ctrl Tab"],
      title: "最近のタブを切り替える",
      navTitle: "最近のタブを切り替える",
    },
    "newtab-wallpaper": {
      pageTitle: "新しいタブの壁紙：名画、Bing の今日の一枚、自分の写真とフィルター｜Lumno ヘルプ",
      pageDescription:
        "Lumno の新しいタブの壁紙を外観設定で変更できます。内蔵の名画やイラスト、Bing の今日の一枚、厳選写真、自分の画像や画像リンクから選び、オーバーレイやフィルター、ライトとダークで別々の壁紙も設定できます。検索ボックスやカードをフロストガラスやリキッドグラスの質感にすることもできます。",
      keywords: ["新しいタブ 壁紙", "Chrome 新しいタブ 背景", "Bing 壁紙 毎日", "新しいタブ 拡張機能", "リキッドグラス"],
      title: "壁紙を変える",
      navTitle: "壁紙を変える",
    },
    "newtab-bookmarks-shortcuts": {
      pageTitle: "新しいタブのショートカットとブックマーク：サイトの追加、グループ分け、3 つのレイアウト｜Lumno ヘルプ",
      pageDescription: "よく使うサイトを Lumno の新しいタブにショートカットとして追加し、アイコンを選んでグループやフォルダにまとめ、ブックマークをフォルダ・階層リスト・上部バーの 3 つのレイアウトで表示できます。表示する行数の変更や非表示にも対応しています。",
      keywords: ["新しいタブ ショートカット", "ショートカット グループ", "新しいタブ ブックマーク", "Chrome ブックマークバー", "ブックマーク フォルダ", "新しいタブ ブックマーク 非表示"],
      title: "ショートカットとブックマーク",
      navTitle: "ショートカットとブックマーク",
    },
    "newtab-frequent-sites": {
      pageTitle: "よくアクセスするサイトと進捗カード：サイトを固定、続きを覚えておく｜Lumno ヘルプ",
      pageDescription:
        "Lumno の新しいタブの下部には、よくアクセスするサイトや最近のサイトが並びます。3 つまで固定でき、ドラマや連載小説を固定すると、次の話や章に進むたびにカードが更新されます。カードは 1〜2 行で表示でき、非表示にもできます。",
      keywords: ["新しいタブ よくアクセス", "ドラマ 進捗", "連載小説 続き", "サイト 固定", "新しいタブ カード 非表示"],
      title: "よくアクセスするサイトと進捗カード",
      navTitle: "よくアクセスするサイト",
    },
    "newtab-clock-zen": {
      pageTitle: "時計、今日の一言、Zen モード：検索ボックスだけの新しいタブ｜Lumno ヘルプ",
      pageDescription: "Lumno の新しいタブに時計や、自分の TXT・Markdown ファイルから選んだ今日の一言を表示したり、/zen と入力して検索ボックス以外を隠したりできます。",
      keywords: ["新しいタブ 時計", "新しいタブ 名言", "ミニマル 新しいタブ", "Zen モード", "集中 新しいタブ"],
      title: "時計、一言、Zen モード",
      navTitle: "時計、一言、Zen モード",
    },
    "newtab-other-extensions": {
      pageTitle: "ほかの新しいタブ拡張機能と併用する：Lumno のコマンドバーだけを使う｜Lumno ヘルプ",
      pageDescription:
        "Momentum や Tabliss などの新しいタブ拡張機能を使い続けながら、Lumno のコマンドバーだけを使用する方法。ほかの拡張機能を Lumno よりあとにオンにすると、新しいタブを置き換えられます。変更の確認では「維持」を選択してください。",
      keywords: ["新しいタブ 拡張機能 競合", "Chrome 新しいタブ 拡張機能で変更", "Lumno コマンドバーだけ", "Momentum", "Tabliss"],
      title: "ほかの新しいタブ拡張機能と併用する",
      navTitle: "ほかの新しいタブ拡張機能と併用",
    },
    "selection-actions": {
      pageTitle: "選択テキストのクイック操作：選択した文章を AI に説明・翻訳・要約してもらう｜Lumno ヘルプ",
      pageDescription:
        "ウェブページでテキストを選択すると、Lumno が内容に応じて回答、翻訳、説明、要約、調査、計算などの AI 操作を表示します。手助けが必要かどうかをデバイス上で判断するため、選択のたびに表示されることはありません。",
      keywords: ["選択テキスト AI", "選択 翻訳 拡張機能", "選択した文章 説明", "Chrome 選択 AI", "選択 要約"],
      title: "選択テキストのクイック操作",
      navTitle: "選択テキストのクイック操作",
    },
    "auto-pip": {
      pageTitle: "動画の自動ピクチャー・イン・ピクチャー：タブを切り替えると動画を小さなウインドウで再生｜Lumno ヘルプ",
      pageDescription:
        "動画の再生中に別のタブに切り替えると、動画が自動的にピクチャー・イン・ピクチャーで再生され、戻ると元に戻ります。動作する条件、対象外のサイト、オン・オフの方法を説明します。",
      keywords: ["自動ピクチャーインピクチャー", "Chrome ピクチャーインピクチャー 拡張機能", "タブ切り替え 動画 小窓", "Arc 自動 PiP", "動画 フローティング"],
      title: "動画の自動ピクチャー・イン・ピクチャー",
      navTitle: "自動ピクチャー・イン・ピクチャー",
    },
    "web-clip": {
      pageTitle: "Webクリップ：ページの一部をフローティングウインドウで表示｜Lumno ヘルプ",
      pageDescription:
        "Webクリップを使うと、表やコード、グラフなどページの一部をフローティングウインドウに表示し、タブを切り替えても見続けられます。オンにする方法、内容の選び方、ウインドウの使い方と制限事項を説明します。",
      keywords: ["Webクリップ", "ドキュメント ピクチャーインピクチャー", "ページの一部 小窓", "Chrome 拡張機能 フローティング", "Web ページ 見比べ"],
      title: "Webクリップ",
      navTitle: "Webクリップ",
    },
    "arc-command-bar": {
      pageTitle: "Arc から Chrome・Dia・Edge へ：コマンドバーとショートカットの対応表｜Lumno ヘルプ",
      pageDescription:
        "Arc から Chrome、Dia、Edge に乗り換えたら、Lumno で Arc のようなコマンドバーを取り戻せます。⌘⇧K でタブ・ブックマーク・履歴を検索（⌘T にも変更可）、⌥Q で最近のタブを切り替え。Arc のショートカット対応表付き。",
      keywords: ["Arc コマンドバー 代わり", "Arc ブラウザ 代わり", "Arc から Chrome", "Dia コマンドバー", "Arc ショートカット"],
      title: "Arc から乗り換える",
      navTitle: "Arc から乗り換える",
      faq: [
        { question: "Lumno は Arc と関係がありますか？", answer: "いいえ。Lumno は Arc を参考にした独立したオープンソースプロジェクトであり、Arc および The Browser Company とは関係ありません。" },
      ],
    },
    "browser-compatibility": {
      pageTitle: "ブラウザ互換性：Chrome、Edge、Dia、Brave、Firefox、Safari｜Lumno ヘルプ",
      pageDescription:
        "Lumno は Chrome、Edge、Brave、Arc、Vivaldi など Chromium 系ブラウザですべての機能が使えます。Dia では新しいタブが使えず、Firefox 版は Firefox アドオンで公開しており、一部制限があります。Safari とスマートフォンのブラウザには非対応です。",
      keywords: ["Lumno 互換性", "Dia 拡張機能", "Edge 拡張機能", "Firefox 版", "Chromium 拡張機能"],
      title: "ブラウザ互換性",
      navTitle: "ブラウザ互換性",
    },
    "security-open-source": {
      pageTitle: "安全性とオープンソース：GPL-3.0、権限、Manifest V3｜Lumno ヘルプ",
      pageDescription: "Lumno は GPL-3.0 のオープンソースで、コードは GitHub で公開しています。Manifest V3 を採用し、リモートのコードは実行しません。必要な権限だけを要求します。",
      keywords: ["Lumno オープンソース", "Lumno 安全性", "Chrome 拡張機能 権限", "Manifest V3"],
      title: "安全性とオープンソース",
      navTitle: "安全性とオープンソース",
    },
    "ratings-reviews": {
      pageTitle: "評価とメディア掲載：Chrome ウェブストアのレビューと記事｜Lumno ヘルプ",
      pageDescription: "Chrome ウェブストアでの Lumno の評価とレビュー、Firefox アドオンのレビュー、Lumno を紹介した記事。",
      keywords: ["Lumno レビュー", "Lumno 評価", "Chrome コマンドバー 拡張機能 おすすめ"],
      title: "評価とメディア掲載",
      navTitle: "評価とメディア掲載",
    },
  },
};

export default content;
