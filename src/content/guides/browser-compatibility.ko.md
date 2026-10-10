Lumno는 Chromium 기반 브라우저를 위해 개발되었으며, Firefox 버전도 제공합니다. 브라우저별로 사용할 수 있는 기능은 다음과 같습니다.

## 지원 현황 {#support}

| 브라우저 | 명령 바 | 새 탭 | 설치 위치 |
| --- | --- | --- | --- |
| Google Chrome | 지원 | 지원 | Chrome 웹 스토어 |
| Microsoft Edge | 지원 | 지원 | Edge 추가 기능 |
| Brave, Arc, Vivaldi, Opera | 지원 | 지원 | Chrome 웹 스토어 |
| Dia | 지원 | 아직 미지원 | Chrome 웹 스토어 |
| Firefox, Zen 등 | 일부 지원 | 지원 | 아래 참고 |
| Safari | 미지원 | 미지원 | — |

휴대전화와 태블릿의 브라우저는 아직 지원하지 않습니다.

## Dia {#dia}

Dia에서는 확장 프로그램이 새 탭을 바꿀 수 없으므로 Lumno 새 탭을 사용할 수 없습니다. 명령 바는 정상적으로 작동합니다.

단축키가 작동하지 않으면 확장 프로그램 단축키 페이지를 열고 Lumno 옆의 범위를 "In Dia"에서 "Global"로 변경하세요.

## Firefox {#firefox}

Firefox 버전은 아직 Firefox 부가 기능 사이트에 등록되지 않았습니다. 등록되면 이 사이트에서 설치 링크를 제공할 예정입니다. Firefox 140 이상과 Zen, LibreWolf, Floorp 등 Firefox 기반 브라우저를 지원합니다.

Firefox의 확장 프로그램 API는 Chromium과 다르기 때문에 다음 기능은 사용할 수 없습니다.

| 기능 | Firefox에서 |
| --- | --- |
| 자동 PIP | 사용할 수 없습니다. Firefox는 확장 프로그램이 웹 영상을 PIP로 표시하는 것을 허용하지 않습니다 |
| 웹 클립 | 사용할 수 없습니다. Firefox는 문서 PIP를 지원하지 않습니다 |
| `about:` 페이지와 부가 기능 사이트에서 명령 바 사용 | 사용할 수 없습니다 |
| 바로가기나 명령 바에서 `about:` 페이지 열기 | 사용할 수 없습니다 |
| 로컬 `file://` 페이지에서 명령 바 사용 | 사용할 수 없습니다 |
| 사이트 아이콘 | 방문한 적이 없는 사이트는 처음에 기본 아이콘으로 표시될 수 있습니다 |

Firefox는 이미 `⌘ ⇧ K`를 사용하므로, Firefox 버전의 기본 단축키는 macOS에서 `⌃ ⇧ K`, Windows와 Linux에서 `Alt + K`입니다. `Alt + Q`는 그대로입니다.

## Safari {#safari}

Safari의 확장 프로그램 구조는 Chromium과 크게 다르기 때문에 아직 Safari 버전은 제공하지 않습니다. Mac에서 비슷한 시스템 전체 검색이 필요하다면 [Raycast](https://www.raycast.com/)나 [Alfred](https://www.alfredapp.com/)를 사용해 보세요.

## 화면 언어 {#languages}

확장 프로그램은 영어, 일본어, 중국어 간체·번체를 지원하며, 한국어 환경에서는 영어로 표시됩니다. 기본적으로 브라우저 언어를 따르며, 설정에서 변경할 수 있습니다.
