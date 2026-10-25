Lumno 웹사이트와 커뮤니티에서 자주 묻는 질문과 답변을 정리했습니다. 각 답변에는 자세한 설명이 있는 페이지 링크가 포함되어 있습니다.

## 사용 {#using}

### 기본 단축키는 무엇이며, 변경할 수 있나요?

기본 단축키는 Mac에서 `⌘ ⇧ K | ⌘ ⇧ K`, Windows와 Linux에서 `Ctrl + Shift + K`입니다. 단축키는 `chrome://extensions/shortcuts`에서 변경할 수 있습니다. 자세한 내용은 [단축키](../keyboard-shortcuts/#change)를 참고하세요. Firefox 버전은 기본 단축키가 다르며, [브라우저 호환성](../browser-compatibility/#firefox)에서 확인할 수 있습니다.

### 단축키가 작동하지 않으면 어떻게 해야 하나요?

먼저 현재 페이지가 `chrome://` 설정이나 확장 프로그램 스토어 같은 제한된 페이지가 아닌지 확인하세요. 그런 다음 `chrome://extensions/shortcuts`에서 다른 확장 프로그램이 같은 단축키를 사용하고 있지 않은지 확인하세요. Dia에서는 항목 옆의 범위도 "Global"로 변경해야 합니다.

### 일부 페이지에서 명령 바 대신 새 탭이 열리는 이유는 무엇인가요?

보안상의 이유로 브라우저는 `chrome://` 설정 페이지, 확장 프로그램 페이지, Chrome 웹 스토어, Edge 추가 기능 사이트 같은 제한된 페이지에서 확장 프로그램이 실행되거나 화면을 표시하지 못하게 하며, Lumno도 이를 우회할 수 없습니다. 이런 페이지에서 단축키를 누르면 Lumno가 대신 새 탭을 열어 검색창을 보여 줍니다. 이는 오류가 아니며, 일반 웹 페이지에서는 페이지 위에 명령 바가 열립니다. 바로가기에서 `chrome://inspect/#devices` 같은 페이지를 여는 것에는 영향이 없습니다. 로컬 PDF나 HTML 파일에서 사용하려면 확장 프로그램 세부정보 페이지에서 파일 URL에 대한 액세스를 허용하세요. 자세한 내용은 [Lumno가 할 수 없는 일](../limitations/#restricted-pages)을 참고하세요.

### 명령 바의 라이트·다크 모드가 시스템과 다른 이유는 무엇인가요?

"Follow system" 모드에서는 명령 바가 현재 페이지의 색상도 참고합니다. 시스템 설정만 따르게 하려면 Lumno 설정의 Appearance에서 "Adapt theme colors to each webpage"를 끄세요.

### Arc에서 옮겨 와도 익숙한 명령 바를 사용할 수 있나요?

네. Lumno의 디자인은 [Arc](https://arc.net/)를 참고했으며(Arc와는 관련이 없습니다), Dia, Chrome, Edge에서 언제든지 명령 바를 열 수 있습니다. 단축키를 `⌘ T`로 변경하면 Arc에서와 같은 방식으로 사용할 수 있습니다. Dia에서는 먼저 `⌘ T`를 비워야 합니다. [브라우저 호환성](../browser-compatibility/#dia)을 참고하세요. 자세한 내용은 [Arc에서 옮겨 왔다면](../arc-command-bar/)을 참고하세요.

### Arc처럼 Ctrl+Tab으로 탭을 전환할 수 있나요?

네. 브라우저의 단축키 페이지에서는 `⌃ Tab`을 등록할 수 없지만, 해당 페이지의 콘솔에서 짧은 코드를 실행하면 Lumno 전환기의 단축키로 지정할 수 있습니다. 자세한 내용은 [Ctrl+Tab으로 전환기 열기](../tab-switcher/#ctrl-tab)를 참고하세요.

## 새 탭 {#new-tab}

### 명령 바만 사용하고 다른 새 탭 확장 프로그램을 계속 사용할 수 있나요?

네. Lumno를 켠 상태에서 사용하던 새 탭 확장 프로그램을 다시 설치하거나, 껐다가 다시 켜서 새 탭을 다시 바꾸게 하면 됩니다. 명령 바에는 영향이 없습니다. 자세한 단계는 [다른 새 탭 확장 프로그램과 함께 사용하기](../newtab-other-extensions/)를 참고하세요.

### 새 탭의 주소창에 확장 프로그램 URL이 표시되는 이유는 무엇인가요?

"Automatically focus input" 옵션이 켜져 있기 때문입니다. 커서를 Lumno 검색창에 바로 놓기 위해 주소창에 확장 프로그램 URL이 표시됩니다. 새 탭의 Appearance 설정에서 이 옵션을 끄면 주소창이 비어 있는 상태로 표시됩니다.

## 호환성 {#compatibility}

### 어떤 브라우저를 지원하나요?

Chrome, Edge, Dia, Brave, Vivaldi 등 Chromium 기반 브라우저와 Firefox 140 이상, Zen 같은 Firefox 기반 브라우저를 지원합니다. Safari는 아직 지원하지 않습니다. Dia에서는 명령 바를 사용할 수 있지만 Lumno 새 탭은 아직 사용할 수 없습니다. 자세한 내용은 [브라우저 호환성](../browser-compatibility/)을 참고하세요.

### Firefox 버전은 Chrome 버전과 무엇이 다른가요?

주요 기능은 같고, Firefox의 제약으로 몇 가지만 다릅니다. 웹 클립과 자동 PIP를 사용할 수 없고, `about:` 페이지, 부가 기능 사이트, 로컬 파일에서는 명령 바를 열 수 없으며, 기본 단축키는 `⌃ ⇧ K | Alt + K`입니다. 자세한 내용은 [브라우저 호환성](../browser-compatibility/#firefox)을 참고하세요.

### Zen, LibreWolf 등 Firefox 기반 브라우저에서도 사용할 수 있나요?

네. 이런 브라우저에서는 Firefox 버전을 사용하며, [Firefox 부가 기능](https://addons.mozilla.org/firefox/addon/lumno-command-bar-new-tab/)에서 설치하면 됩니다. Firefox 140 이상 엔진이 필요합니다.

### Safari나 휴대폰에서도 사용할 수 있나요?

아직 지원하지 않습니다. Safari의 확장 프로그램 구조는 Chromium과 크게 달라 Safari 버전은 제공하지 않으며, 휴대폰과 태블릿 브라우저도 지원하지 않습니다. 휴대전화에서 이 사이트를 보고 있고 Google 계정에 로그인되어 있다면 먼저 설치를 눌러 두세요. 나중에 같은 Google 계정으로 로그인하고 동기화를 켠 컴퓨터에서 Chrome을 열면 Lumno가 자동으로 설치됩니다. 자세한 내용은 [브라우저 호환성](../browser-compatibility/#safari)을 참고하세요.

## 데이터와 동기화 {#data}

### 여러 기기에서 설정을 동기화할 수 있나요?

네. 설정은 기본적으로 브라우저 계정을 통해 동기화됩니다. WebDAV 동기화(Nextcloud, Nutstore 또는 직접 운영하는 서버 지원)를 켜면 서로 다른 브라우저 사이에서도 아이콘과 배경화면을 동기화할 수 있습니다. 자세한 내용은 [동기화](../sync/)를 참고하세요.

### Lumno가 브라우징 데이터를 업로드하나요?

아니요. 탭, 북마크, 방문 기록은 기기에서 검색됩니다. 입력한 내용은 웹 검색이나 AI 질문을 할 때만 전송되며, 사용자가 선택한 검색 엔진이나 AI 사이트로만 전송됩니다. 자세한 내용은 [개인정보처리방침](/ko/privacy/)를 참고하세요.

### Lumno는 무료인가요? 가입이 필요한가요?

Lumno는 완전히 무료이며, GPL-3.0 라이선스로 [GitHub](https://github.com/kubai087/lumno-extension)에 오픈소스로 공개되어 있습니다. 계정 시스템이 없으므로 가입 없이 설치 후 바로 사용할 수 있습니다.
