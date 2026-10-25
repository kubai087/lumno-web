When you switch to another tab while a video is playing on a page, the video moves into a small picture-in-picture window and keeps playing. When you return to the original tab, the window closes and the video continues on the page. This works much like automatic picture-in-picture in [Arc](https://arc.net/).

## When picture-in-picture starts {#when}

When you switch to another tab, a video moves into picture-in-picture if:

- It's playing, not paused or finished.
- You've interacted with the page, for example by clicking play.
- It's large enough on the page. Small previews and animated thumbnails aren't taken along.

If a page has several videos, Lumno prefers the larger one with sound.

## When you return to the tab {#return}

When you go back to the video's tab, the picture-in-picture window closes and the video continues playing on the page. If you paused the video in the small window, it stays paused when you return.

## When it doesn't start {#excluded}

- Shopping sites and social feeds often play videos automatically. To avoid distractions, Lumno doesn't start picture-in-picture automatically on JD, Taobao, X (Twitter) or Weibo.
- If a site disables picture-in-picture through its policy, the browser doesn't allow it.
- While a [web clip](../web-clip/) window is open, video picture-in-picture doesn't start automatically.

## If nothing happens in Helium and similar browsers {#site-permission}

Unless you allow it yourself, the browser only lets sites where you often watch videos enter picture-in-picture automatically. Chrome ships with a list of popular video sites, so it works on YouTube and similar sites right after you install it. Helium, ungoogled-chromium and some other browsers remove that list, so in a fresh install it only starts working once you've watched videos on the site for a while.

To use it right away, allow the site yourself:

1. Open the video site, click the site information icon on the left of the address bar, and choose "Site settings".
2. Find "Automatic picture-in-picture" and change it to "Allow".
3. Go back to the video, play it, and switch to another tab.

Do this once for each video site you want to use. In Chrome, if a site doesn't respond when you switch tabs, you can set it the same way.

## Turn it on or off {#toggle}

This feature is on by default. If you don't need it, turn off "Auto Picture-in-Picture" in Lumno's settings.

Firefox doesn't allow extensions to put web videos into picture-in-picture automatically, so this feature isn't available in the Firefox version.
