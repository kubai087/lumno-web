Lumno は Chromium 系のブラウザ向けに作られていて、Firefox 版もあります。ブラウザごとに使える機能をまとめました。

## 一覧 {#support}

| ブラウザ | コマンドバー | 新しいタブ | 入手先 |
| --- | --- | --- | --- |
| Google Chrome | 対応 | 対応 | Chrome ウェブストア |
| Microsoft Edge | 対応 | 対応 | Edge アドオン |
| Brave、Arc、Vivaldi、Opera | 対応 | 対応 | Chrome ウェブストア |
| Dia | 対応 | 未対応 | Chrome ウェブストア |
| Firefox、Zen など | 一部対応 | 対応 | 下記参照 |
| Safari | 非対応 | 非対応 | — |

スマートフォンやタブレットのブラウザには、まだ対応していません。

## Dia {#dia}

Dia では拡張機能が新しいタブを置き換えられないため、Lumno の新しいタブは使えません。コマンドバーは問題なく使えます。

ショートカットが反応しないときは、拡張機能のショートカット設定ページで、Lumno の右側の範囲を「Dia 内」から「グローバル」に変えてください。

## Firefox {#firefox}

Firefox 版はまだ Firefox Add-ons に掲載されていません。掲載されたら、このサイトから入手できるようにします。Firefox 140 以降と、Zen、LibreWolf、Floorp など Firefox ベースのブラウザで使えます。

Firefox の拡張機能の仕組みは Chromium と異なるため、いくつかの機能は使えません。

| 機能 | Firefox では |
| --- | --- |
| 動画の自動ピクチャー・イン・ピクチャー | 使えません。Firefox は拡張機能がウェブ動画をピクチャー・イン・ピクチャーにすることを許可していません |
| ウェブクリップ | 使えません。Firefox はドキュメントのピクチャー・イン・ピクチャーに対応していません |
| `about:` ページとアドオンサイトでのコマンドバー | 使えません |
| ショートカットやコマンドバーから `about:` ページを開く | 使えません |
| ローカルの `file://` ページでのコマンドバー | 使えません |
| サイトのアイコン | 一度も訪れていないサイトは、最初は仮のアイコンになることがあります |

Firefox は `⌘ ⇧ K` を自身で使っているため、Firefox 版の初期設定は macOS で `⌃ ⇧ K`、Windows と Linux で `Alt + K` です。`Alt + Q` は同じです。

## Safari {#safari}

Safari の拡張機能の仕組みは Chromium と大きく異なり、Lumno の Safari 版はまだありません。Mac で似たような全体検索がほしいなら、[Raycast](https://www.raycast.com/) や [Alfred](https://www.alfredapp.com/) を試してみてください。

## 表示言語 {#languages}

拡張機能は日本語、英語、簡体字・繁体字中国語に対応しています。初期設定ではブラウザの言語に合わせ、設定で変更することもできます。
