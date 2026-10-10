Lumno는 Chromium 브라우저를 위해 만들었고, Firefox 버전도 있어요. 어디서 무엇이 되는지 정리했습니다.

## 한눈에 보기 {#support}

| 브라우저 | 명령 바 | 새 탭 | 설치하는 곳 |
| --- | --- | --- | --- |
| Google Chrome | 지원 | 지원 | Chrome 웹 스토어 |
| Microsoft Edge | 지원 | 지원 | Edge 추가 기능 |
| Brave, Arc, Vivaldi, Opera | 지원 | 지원 | Chrome 웹 스토어 |
| Dia | 지원 | 아직 미지원 | Chrome 웹 스토어 |
| Firefox, Zen 등 | 일부 지원 | 지원 | 아래 참고 |
| Safari | 미지원 | 미지원 | — |

휴대폰과 태블릿의 브라우저는 아직 지원하지 않아요.

## Dia {#dia}

Dia는 확장 프로그램이 새 탭을 바꾸지 못하게 해서 Lumno 새 탭을 쓸 수 없어요. 명령 바는 정상적으로 동작합니다.

단축키가 동작하지 않으면 확장 프로그램 단축키 페이지에서 Lumno 옆의 범위를 "In Dia"에서 "Global"로 바꾸세요.

## Firefox {#firefox}

Firefox 버전은 아직 Firefox 부가 기능 사이트에 올라가지 않았어요. 등록되면 이 사이트에서 링크할게요. Firefox 140 이상과 Zen, LibreWolf, Floorp 같은 Firefox 기반 브라우저용이에요.

Firefox의 확장 API는 Chromium과 달라서 일부 기능은 동작하지 않아요.

| 기능 | Firefox에서 |
| --- | --- |
| 자동 PIP | 사용 불가. Firefox는 확장 프로그램이 웹 영상을 PIP로 띄우는 것을 허용하지 않아요 |
| 웹 클립 | 사용 불가. Firefox는 문서 PIP를 지원하지 않아요 |
| `about:` 페이지와 부가 기능 사이트에서 명령 바 | 사용 불가 |
| 바로가기나 명령 바로 `about:` 페이지 열기 | 사용 불가 |
| 로컬 `file://` 페이지에서 명령 바 | 사용 불가 |
| 사이트 아이콘 | 한 번도 방문하지 않은 사이트는 처음에 기본 아이콘으로 보일 수 있어요 |

Firefox는 이미 `⌘ ⇧ K`를 쓰고 있어서, Firefox 버전의 기본 단축키는 macOS에서 `⌃ ⇧ K`, Windows와 Linux에서 `Alt + K`예요. `Alt + Q`는 같아요.

## Safari {#safari}

Safari의 확장 시스템은 Chromium과 많이 달라서 아직 Safari 버전은 없어요. Mac에서 비슷한 시스템 전체 검색을 원한다면 [Raycast](https://www.raycast.com/)나 [Alfred](https://www.alfredapp.com/)를 써 보세요.

## 화면 언어 {#languages}

확장 프로그램은 영어, 일본어, 중국어 간체·번체를 지원하고, 한국어 환경에서는 영어로 표시돼요. 기본으로 브라우저 언어를 따르며 설정에서 바꿀 수 있어요.
