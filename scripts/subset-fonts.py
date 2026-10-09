#!/usr/bin/env python3
"""
Regenerate the web fonts served from public/assets from the full sources in
scripts/font-sources. Needs fontTools + brotli:

    python3 -m venv .venv && .venv/bin/pip install fonttools brotli
    .venv/bin/python scripts/subset-fonts.py

- Open Sans: the variable TTF (wdth + wght axes) is split into WOFF2 files by
  Google Fonts' unicode-range buckets, so a page only downloads the scripts it
  renders. The ranges here must match the @font-face blocks in
  src/styles/site.css and public/assets/fonts/open-sans/open-sans.css.
- Remix Icon: only the icons whose `ri-*` class appears in src/ are kept, both
  in the font and in the stylesheet. Rerun after using a new icon;
  tests/font-assets.test.mjs fails until you do.
"""

import re
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
SOURCES = ROOT / "scripts" / "font-sources"
PUBLIC_ASSETS = ROOT / "public" / "assets"

OPEN_SANS_RANGES = {
    "latin": "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
    "latin-ext": "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
    "cyrillic-ext": "U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F",
    "cyrillic": "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116",
    "greek": "U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF, U+1F00-1FFF",
    "vietnamese": "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB",
}


def parse_ranges(css_ranges):
    codepoints = []
    for part in css_ranges.split(","):
        start, _, end = part.strip().removeprefix("U+").partition("-")
        codepoints.extend(range(int(start, 16), int(end or start, 16) + 1))
    return codepoints


def write_woff2(source, unicodes, target, keep_all_features):
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = ["*"] if keep_all_features else []
    options.notdef_outline = True
    options.name_IDs = ["*"]
    font = TTFont(source)
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=unicodes)
    subsetter.subset(font)
    target.parent.mkdir(parents=True, exist_ok=True)
    font.flavor = "woff2"
    font.save(target)
    print(f"{target.relative_to(ROOT)}: {target.stat().st_size:,} bytes")


def subset_open_sans():
    source = SOURCES / "OpenSans-VariableFont-wdth-wght.ttf"
    for name, ranges in OPEN_SANS_RANGES.items():
        target = PUBLIC_ASSETS / "fonts" / "open-sans" / f"open-sans-{name}.woff2"
        write_woff2(source, parse_ranges(ranges), target, keep_all_features=True)


def used_icon_classes():
    used = set()
    for path in (ROOT / "src").rglob("*"):
        if path.suffix in {".astro", ".ts", ".tsx", ".js", ".jsx", ".mjs", ".md", ".css"}:
            used.update(re.findall(r"\bri-[a-z0-9-]+", path.read_text(encoding="utf8")))
    return used


def subset_remixicon():
    css = (SOURCES / "remixicon.full.css").read_text(encoding="utf8")
    used = used_icon_classes()
    icon_rule = re.compile(r'^\.(ri-[a-z0-9-]+):before \{ content: "\\([0-9a-f]+)"; \}$', re.M)
    kept = [(name, code) for name, code in icon_rule.findall(css) if name in used]

    header, _, _ = css.partition("\n.ri-24-hours-fill:before")
    header = re.sub(r'url\("remixicon\.woff2\?t=\d+"\)', 'url("remixicon.woff2")', header)
    header = header.replace("Date: ", "Subset of the full set in scripts/font-sources (scripts/subset-fonts.py)\n* Date: ", 1)
    rules = "\n".join(f'.{name}:before {{ content: "\\{code}"; }}' for name, code in sorted(kept))
    (PUBLIC_ASSETS / "remixicon.css").write_text(f"{header.rstrip()}\n\n{rules}\n", encoding="utf8")

    write_woff2(
        SOURCES / "remixicon.full.woff2",
        [int(code, 16) for _, code in kept],
        PUBLIC_ASSETS / "remixicon.woff2",
        keep_all_features=False,
    )
    print(f"public/assets/remixicon.css: {len(kept)} icons")


if __name__ == "__main__":
    subset_open_sans()
    subset_remixicon()
