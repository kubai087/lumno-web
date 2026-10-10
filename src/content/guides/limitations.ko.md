Lumno는 새 브라우저가 아니라 확장 프로그램이라서, 브라우저가 허락하지 않는 일은 할 수 없어요. 설치하고 나서 알게 되지 않도록 미리 정리했고, 그 부분을 채워 줄 도구도 함께 적었습니다.

## 사이드바, Spaces, 화면 분할 {#not-a-browser}

세로 탭, 사이드바, Arc의 Spaces, 화면 분할은 브라우저 자체가 지원해야 해요. 확장 프로그램은 주소창이나 탭 줄을 바꿀 수 없습니다.

- 세로 탭이 필요하다면 기본으로 지원하는 [Microsoft Edge](https://www.microsoft.com/edge)를 써 보세요.
- Arc 같은 사이드바, 작업 공간, 화면 분할이 필요하다면 [Zen Browser](https://zen-browser.app/)나 [Vivaldi](https://vivaldi.com/)를 써 보세요.

## 명령 바가 열리지 않는 페이지 {#restricted-pages}

보안상 브라우저는 다음 페이지에서 확장 프로그램이 아무것도 띄우지 못하게 막아요.

- `chrome://`나 `edge://`로 시작하는 브라우저 페이지
- Chrome 웹 스토어와 Edge 추가 기능 사이트

이런 페이지에서 단축키를 누르면 Lumno 설정의 "Restricted page behavior"에 따라 동작합니다.

`file://`로 시작하는 로컬 PDF나 HTML 파일은 Lumno 확장 프로그램 세부정보 페이지에서 파일 URL 액세스를 허용하면 쓸 수 있어요.

## 브라우저 밖의 것들 {#outside-browser}

Lumno는 브라우저 안의 것만 검색해요. 앱, 파일, 시스템 설정까지 단축키 하나로 찾고 싶다면 macOS에서 [Raycast](https://www.raycast.com/)나 [Alfred](https://www.alfredapp.com/)를 써 보세요.

## 지원하지 않는 브라우저 {#browsers}

- Safari와 모바일 브라우저는 지원하지 않아요.
- Dia에서는 명령 바는 되지만 Lumno 새 탭은 쓸 수 없어요.
- Firefox 버전은 일부 기능이 빠져 있어요. [브라우저 호환성](../browser-compatibility/)을 참고하세요.

## 새 탭 위젯 {#widgets}

Lumno의 새 탭은 단순함을 지켜요. 날씨, 할 일, 메모 같은 위젯은 없습니다. 위젯이 가득한 새 탭을 원한다면 [Momentum](https://momentumdash.com/)이나 [Tabliss](https://tabliss.io/)를 써 보세요.

새 탭은 한 번에 하나의 확장 프로그램만 차지할 수 있어요. 다른 새 탭을 쓰면서 Lumno의 명령 바만 써도 괜찮습니다.

## 클라우드 동기화 {#data}

Lumno에는 서버가 없어서 클라우드 계정도 없어요. 설정은 브라우저 자체 동기화를 따라가고, 아이콘과 배경화면까지 옮기려면 Nextcloud나 NAS 같은 WebDAV 서버를 직접 준비해야 해요. [동기화](../sync/)를 참고하세요.

방문 기록, 북마크, 열린 탭은 Lumno 동기화 대상이 아니며, 지금처럼 브라우저가 동기화합니다.
