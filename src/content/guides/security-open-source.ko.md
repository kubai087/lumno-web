Lumno의 코드는 한 줄도 빠짐없이 공개되어 있어서, 확장 프로그램이 무엇을 하고 무엇을 하지 않는지 누구나 확인할 수 있어요.

## 오픈소스 {#open-source}

- 코드: [github.com/kubai087/lumno-extension](https://github.com/kubai087/lumno-extension)
- 라이선스: GPL-3.0
- 문제를 발견했다면 GitHub에 이슈를 남겨 주세요

스토어에 올라가는 버전은 모두 같은 코드로 빌드되며, 바뀐 내용은 [업데이트 내역](/ko/release/)과 GitHub Releases에 정리되어 있어요.

## 안전하게 설계했어요 {#design}

- Manifest V3: 브라우저는 Manifest V3 확장 프로그램이 원격 코드를 내려받아 실행하지 못하게 해요. 그래서 Lumno의 코드는 모두 심사를 거친 패키지 안에 있어요.
- 서버 없음: 계정 시스템도, 데이터를 저장하는 곳도 없어요.
- 꼭 필요한 권한만 요청하고, 선택 권한은 없어요.
- WebDAV 앱 비밀번호는 기기에만 저장되고 브라우저 동기화로 옮겨지지 않아요.

## 권한별 용도 {#permissions}

| 권한 | 용도 |
| --- | --- |
| `tabs`, `tabGroups` | 탭 검색, 전환, 복원, 전환기 미리보기 캡처 |
| `history` | 기기 안에서 방문 기록 검색 |
| `bookmarks` | 북마크 검색, 표시, 관리 |
| `topSites` | 새 탭에 자주 가는 사이트 표시 |
| `storage`, `unlimitedStorage` | 설정, 아이콘, 배경화면 저장 |
| `alarms` | WebDAV 동기화 상태를 주기적으로 확인 |
| `search` | 기본 검색 엔진으로 검색 전달 |
| `favicon` | 사이트 아이콘 표시 |
| `scripting`과 모든 사이트 접근 | 페이지에 명령 바 표시, 단축키 응답, 텍스트 작업, PIP |

모든 사이트 접근 권한은 페이지에 명령 바 같은 기능을 띄울 때만 써요. Lumno는 페이지 내용을 대량으로 읽거나 올리지 않아요.
