최근에 사용한 두세 개의 페이지 사이를 오갈 때는 전환기를 사용하는 것이 가장 빠릅니다. 입력할 필요 없이 키를 두 번만 누르면 됩니다.

## 전환기 열기 {#open}

`⌥ Q`를 누르면 최근에 사용한 탭이 사용한 순서대로 페이지 미리보기와 함께 표시됩니다.

![최근 탭 전환기. 탭 네 개가 사용한 순서대로 페이지 미리보기와 함께 나열되어 있다](switcher "최근 탭 전환기")

## 탭 전환하기 {#switch}

1. `⌥`를 누른 채 `Q`를 반복해서 눌러 원하는 페이지로 이동하세요. `Tab`이나 방향키로도 이동할 수 있습니다.
2. `⌥`에서 손을 떼거나 `↩`를 누르면 해당 페이지로 전환됩니다.

더 이상 필요 없는 탭은 전환기에서 바로 닫을 수 있습니다. 페이지 미리보기에 마우스를 올리고 모서리에 나타나는 닫기 버튼을 클릭하세요.

사용 방법은 컴퓨터의 `⌘ Tab | Alt + Tab`이나 [Arc](https://arc.net/)의 `⌃ Tab`과 비슷합니다.

## 전환기와 열린 탭 검색 비교 {#vs-search}

- 원하는 페이지가 최근에 사용한 몇 개의 탭 중에 있다면 전환기를 사용하세요. 키를 두 번만 누르면 이동할 수 있습니다.
- 탭이 많아 원하는 페이지가 최근 탭에 없다면 `⌘ ⇧ K`를 누르고, 검색창이 비어 있을 때 `Tab`을 눌러 열린 탭만 검색하세요. 자세한 내용은 [탭, 북마크, 방문 기록 검색](../search-tabs-bookmarks-history/#open-tabs)을 참고하세요.

## Ctrl+Tab으로 전환기 열기 {#ctrl-tab}

[Arc](https://arc.net/)에서 `⌃ Tab`으로 탭을 전환하는 데 익숙하다면 이 키를 전환기 단축키로 지정할 수도 있습니다. 브라우저의 단축키 페이지에서는 이 조합을 등록할 수 없으므로, 해당 페이지의 콘솔에서 설정합니다.

1. 주소창에 `chrome://extensions/shortcuts`를 입력해 엽니다.
2. `⌘ ⌥ J | Ctrl + Shift + J`를 눌러 콘솔을 엽니다.
3. 아래 코드를 붙여넣고 `↩`를 눌러 실행합니다.

   ```js
   const extensions = await chrome.developerPrivate.getExtensionsInfo();
   const lumno = extensions.find((item) =>
     item.commands.some((command) => command.name === "show-tab-switcher"));
   await chrome.developerPrivate.updateExtensionCommand({
     extensionId: lumno.id,
     commandName: "show-tab-switcher",
     keybinding: "Ctrl+Tab",
   });
   ```

4. 페이지를 새로고침하면 "Open recent tab switcher"가 `⌃ Tab`으로 표시됩니다.

![브라우저의 확장 프로그램 단축키 페이지. Lumno의 "Open recent tab switcher"가 ⌃⇥로 설정되어 있다](shortcuts-ctrl-tab "설정 후의 확장 프로그램 단축키 페이지")

이제 `⌃`를 누른 채 `Tab`을 반복해서 눌러 탭을 고르고, `⌃`를 떼면 그 탭으로 전환됩니다.

- 콘솔에 처음 붙여넣을 때는 브라우저가 확인 문구를 먼저 입력하라고 요청합니다. 안내대로 입력한 뒤 다시 붙여넣으세요.
- 이 코드는 Lumno의 이 단축키 하나만 바꿉니다. 설정한 뒤에는 브라우저 기본 `⌃ Tab`(오른쪽 탭으로 이동)이 더 이상 동작하지 않습니다.
- 되돌리려면 같은 페이지에서 해당 항목 오른쪽의 연필 아이콘을 클릭해 단축키를 다시 지정하세요.
- 브라우저 단축키 페이지에 내장된 기능을 사용하므로, 브라우저를 업데이트한 뒤에는 동작하지 않을 수 있습니다.

## 단축키 변경하기 {#shortcut}

전환기 단축키는 `chrome://extensions/shortcuts`에서 변경할 수 있습니다. 자세한 내용은 [단축키](../keyboard-shortcuts/#change)를 참고하세요.

페이지 미리보기는 탭을 전환할 때 사용자의 컴퓨터에서 캡처됩니다. 각 미리보기는 최대 2시간 동안 보관되며, 기기 밖으로 전송되지 않습니다.
