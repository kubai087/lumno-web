Web clip puts part of a web page in its own floating window, such as a table, a block of code or a chart. The window stays on top of other windows, even when you switch tabs or apps, so you can keep it in view while you read or work elsewhere.

## Turn on web clip {#enable}

Web clip is off by default. To use it, turn on "Web Clip" in Lumno's settings.

## Clip part of a page {#how}

1. On the page you want to clip from, press `⌘ ⇧ K` to open the command bar, type `/clip`, then press `↩`.

![The command bar with /clip typed and the result "Start Web Clip"](clip-command "Type /clip in the command bar")

2. Move the pointer over the page. Lumno outlines the area it can clip with a dashed frame.
3. If the frame is too large or too small, scroll to change it. You can also press `[` or `↑` to select the enclosing element, or `]` or `↓` to select an element inside it.
4. Click the outlined content to open it in a floating window. To cancel, press `Esc`.

![A hint at the top of an article page, with the CSS property table below outlined by a dashed frame](clip-picker "Choose what to clip with the dashed frame")

## The floating window {#window}

- The window shows a copy of the content you chose. When that part of the original page changes, the window updates too.
- Clicking a link in the window opens it in a new browser tab. To open it in the background, hold `⌘` while you click.
- Move the pointer to the bottom of the window to show the Reselect and Close buttons.
- You can move and resize the window like any other window.

## Limitations {#limits}

Web clip is built on the browser's Document Picture-in-Picture, so it has these limitations:

- It works only on the top-level page of an HTTPS site, not inside embedded frames (iframes).
- It isn't available on sites that disable picture-in-picture through their policy.
- If a video is already playing in picture-in-picture, close it first.
- Areas that are too small can't float. Choose a larger area instead.
- Only one floating window can be open at a time.

Firefox doesn't support Document Picture-in-Picture, so this feature isn't available in the Firefox version.
