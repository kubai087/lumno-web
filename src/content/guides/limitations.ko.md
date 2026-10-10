Lumno는 새 브라우저가 아니라 브라우저 확장 프로그램일 뿐이라, 아직 못 하는 일도 있어요. 지금 알고 있는 부족한 점을 정리했어요. 이런 기능이 꼭 필요하다면 여기서 소개하는 다른 도구가 더 잘 맞을 수도 있어요.

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
