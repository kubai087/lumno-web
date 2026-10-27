[Arc](https://arc.net/)는 2026년 12월 22일에 서비스를 종료하며, 그 이후에는 Mac과 Windows용 Arc를 열 수 없습니다. Arc를 떠나기 전에 데이터를 먼저 옮기고 새 브라우저를 고르세요. Lumno는 명령 바, 최근 탭 전환, 재시작 후 고정 탭 복원, 동영상 자동 PIP 등 Arc의 여러 기능을 참고했으며, Chrome, Dia, Edge에 설치하면 계속 사용할 수 있습니다.

Lumno는 독립 오픈소스 프로젝트이며, Arc 및 The Browser Company와는 관련이 없습니다.

## Arc 서비스 종료 일정 {#timeline}

- **10월 22일**: Arc가 서비스 종료를 발표했으며, 새 Arc 계정을 더 이상 만들 수 없습니다.
- **11월 23일**: iOS와 Android용 Arc Search의 AI 기능이 꺼지고 로그인과 동기화도 할 수 없게 되지만, 일반 브라우저로는 계속 사용할 수 있습니다.
- **12월 15일**: Arc 계정 개인 데이터의 사본이나 삭제를 요청할 수 있는 마지막 날입니다.
- **12월 22일**: Mac과 Windows용 Arc가 작동을 멈추고 모든 계정이 비활성화됩니다. 계정과 관련된 개인 데이터는 30일 이내에 삭제됩니다.

서비스 종료 후에는 이 컴퓨터에 저장된 Arc 데이터도 열 수 없습니다. 자세한 내용은 Arc 공식 문서 [Arc Sunset: Key Dates and What to Expect](https://resources.arc.net/hc/en-us/articles/44412972248471)를 참고하세요.

## 12월 22일 전에 데이터 내보내기 {#export}

- **Dia로 옮길 때**: 내보낼 필요가 없습니다. Dia를 설치하고 Arc에서 가져오기를 선택하면 Spaces, 고정 탭, 폴더, 북마크, 방문 기록, 비밀번호, 확장 프로그램이 함께 옮겨지며, Spaces는 Dia의 Profiles가 됩니다. 가져오기가 끝날 때까지 Arc를 삭제하지 마세요. 자세한 내용은 [Move from Arc to Dia](https://resources.arc.net/hc/en-us/articles/44413129117591)를 참고하세요.
- **다른 브라우저로 옮길 때**: Arc 설정에서 「Advanced」를 열고 「Export Data」를 선택하세요. Arc가 `Arc Data Export.md` 파일을 저장하며, 즐겨찾기, 고정 탭, 폴더의 링크를 Space별로 정리해 줍니다. 북마크 파일이 아니라 링크 목록이므로, 새 브라우저에서 필요한 링크를 직접 열거나 북마크에 추가해야 합니다. 자세한 내용은 [How Do I Export My Data from Arc?](https://resources.arc.net/hc/en-us/articles/25583851606039)를 참고하세요.

Easel과 Boost는 내보낼 수 없으며 Dia로도 옮겨지지 않습니다.

## Arc에서 Lumno를 썼다면 설정부터 챙기세요 {#lumno-settings}

Lumno 설정은 설치된 브라우저 안에 저장되므로, Arc가 작동을 멈추면 되찾을 수 없습니다. 브라우저를 옮기기 전에 Lumno 설정에서 [설정을 내보내고](../sync/#export), 새 브라우저에 Lumno를 설치한 뒤 가져오세요. [WebDAV 동기화](../sync/)를 켜면 아이콘과 배경화면까지 함께 옮길 수 있습니다.

Dia로 옮길 때 확장 프로그램도 함께 가져오지만, 만약을 위해 먼저 내보내 두는 것이 좋습니다.

## 새 브라우저 고르기 {#choose}

| 브라우저 | Arc와 비슷한 점 | Lumno와 함께 쓸 때 |
| --- | --- | --- |
| Dia | 같은 팀이 만들었으며 사이드바, 고정 탭, 탭 전환기가 있고 Arc에서 바로 가져올 수 있음 | 명령 바 사용 가능, 새 탭은 아직 미지원 |
| Chrome, Edge | 사이드바와 Spaces는 없지만 확장 프로그램 선택지가 가장 많음 | 모든 기능 사용 가능 |
| [Zen Browser](https://zen-browser.app/) | Firefox 기반이며 사이드바, 작업 공간, 화면 분할이 있어 Arc와 매우 비슷함 | Firefox 부가 기능에서 설치, 일부 기능 제한 |
| [Vivaldi](https://vivaldi.com/) | 사이드바, 작업 공간, 화면 분할 제공 | 모든 기능 사용 가능 |

브라우저별 지원 현황은 [브라우저 호환성](../browser-compatibility/)을 참고하세요.

## Arc와 Lumno 비교 {#mapping}

| Arc | Lumno |
| --- | --- |
| `⌘ T`로 명령 바 열기 | `⌘ ⇧ K`로 명령 바 열기(`⌘ T`로 변경 가능) |
| 명령 바에서 열린 탭으로 전환 | "Opened" 표시가 있는 결과를 선택하고 `↩` 키 누르기 |
| `⌃ Tab`으로 최근 탭 전환 | `⌥ Q`로 최근 탭 전환기 열기 |
| `⌘ ⇧ C`로 URL 복사 | 확장 프로그램 페이지에서 "Copy Current Page URL"에 단축키 지정 |
| 재시작 후에도 고정 탭 유지 | Lumno 설정에서 "Restore Pinned Tabs After Restart" 켜기 |
| 탭을 전환하면 동영상이 PIP로 재생 | [자동 PIP](../auto-pip/), 기본적으로 켜져 있음 |
| 새 탭 | Lumno 새 탭(Dia에서는 아직 지원하지 않음) |

## 옮겨 오는 방법 {#steps}

1. [Lumno를 설치하세요](../install/). Chrome과 Dia에서는 Chrome 웹 스토어에서, Edge에서는 Edge 추가 기능에서 설치합니다.
2. `chrome://extensions/shortcuts`를 열고 "Open command bar"를 Arc, Zen과 같은 `⌘ T`로 변경하세요. 자세한 내용은 [단축키](../keyboard-shortcuts/#change)를 참고하세요. Dia에서는 먼저 `⌘ T`를 비워야 합니다(아래 참고).
3. `⌘ T`를 누르고 [탭, 북마크, 방문 기록 검색](../search-tabs-bookmarks-history/)을 사용해 보세요.
4. 최근에 본 몇 개의 페이지 사이를 오가려면 `⌥ Q`를 눌러 [최근 탭 전환기](../tab-switcher/)를 여세요.

Dia 자체 단축키가 우선하므로 Dia에서는 먼저 Settings → Shortcuts를 열고 "New Tab"의 `⌘ T`를 다른 키로 변경하세요. 자세한 내용은 [브라우저 호환성](../browser-compatibility/#dia)을 참고하세요. Dia에서 단축키가 작동하지 않으면 확장 프로그램 페이지에서 범위를 "In Dia"에서 "Global"로 변경하세요.

## Lumno에서 제공할 수 없는 Arc 기능 {#limits}

사이드바, Spaces, 화면 분할은 브라우저 자체가 지원해야 하는 기능이므로 확장 프로그램으로는 추가할 수 없습니다. 이러한 기능이 꼭 필요하다면 위 표의 Dia, Zen, Vivaldi 중에서 골라 보세요. 자세한 내용은 [Lumno가 할 수 없는 일](../limitations/)을 참고하세요.
