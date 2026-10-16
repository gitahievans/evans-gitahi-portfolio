"""Check the static export without opening a browser (Python standard library)."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "out"


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.ids = set()
        self.references = []
        self.text = []
        self.main_text = []
        self.in_main = False
        self.ignored = 0
        self.h1 = 0
        self.images = []
        self.sources = []
        self.anchors = []
        self.sections = []
        self.headings = []
        self.selects = []
        self.details = []
        self.feed(path.read_text())

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ("script", "style", "head"):
            self.ignored += 1
        if tag == "main":
            self.in_main = True
        if tag == "a":
            self.anchors.append(attrs)
        if tag == "section":
            self.sections.append(attrs)
        if tag in ("h1", "h2", "h3"):
            self.headings.append(tag)
        if tag == "select":
            self.selects.append(attrs)
        if tag == "details":
            self.details.append(attrs)
        if tag == "h1":
            self.h1 += 1
        if "id" in attrs:
            assert attrs["id"] not in self.ids, f'Duplicate ID: {attrs["id"]}'
            self.ids.add(attrs["id"])
        for name in ("href", "src"):
            if name in attrs:
                self.references.append(attrs[name])
        if tag == "source":
            self.sources.append(attrs)
            self.references.extend(item.strip().split()[0] for item in attrs.get("srcset", "").split(",") if item.strip())
        if tag == "img":
            self.images.append(attrs)

    def handle_endtag(self, tag):
        if tag in ("script", "style", "head"):
            self.ignored -= 1
        if tag == "main":
            self.in_main = False

    def handle_data(self, data):
        if not self.ignored and data.strip():
            segment = " ".join(data.split())
            self.text.append(segment)
            if self.in_main:
                self.main_text.append(segment)


def exported(path):
    target = OUT / path.lstrip("/")
    return target / "index.html" if target.is_dir() else target


pages = {path: Page(path) for path in OUT.rglob("*.html")}
assert pages, "Run npm run build before checking the export"
references = 0
for path, page in pages.items():
    for reference in page.references:
        url = urlsplit(reference)
        if url.scheme or url.netloc:
            continue
        assert not url.path or url.path.startswith("/"), f"Non-root-relative path in {path}: {reference}"
        target = exported(unquote(url.path)) if url.path else path
        assert target.is_file(), f"Missing target in {path}: {reference}"
        if url.fragment:
            assert target in pages and unquote(url.fragment) in pages[target].ids, f"Missing fragment in {path}: {reference}"
        references += 1

fixtures = json.loads((ROOT / "tests/fixtures/legacy-content.json").read_text())["pages"]
segments = 0
for slug in ("scorelearn", "ladyshelf", "sceneit"):
    source = fixtures[slug]
    path = OUT / "projects" / slug / "index.html"
    page = pages[path]
    assert path.read_bytes() == (OUT / "projects" / f"{slug}.html").read_bytes(), f"Legacy content differs: {slug}"
    text = " ".join(page.main_text)
    for segment in source["text"]:
        assert segment in text, f"Lost {slug} text: {segment}"
        segments += 1
    # Include repository/demo and related-project destinations in the comparison.
    for href in source["links"]:
        assert href in page.references, f"Lost {slug} link: {href}"
    assert page.h1 == 1, f"Expected one h1 in {slug}"
    assert len(page.images) == 1
    image = page.images[0]
    assert image.get("alt") and image.get("width") and image.get("height"), f"Incomplete image: {slug}"
    assert len(page.sources) == 1 and page.sources[0].get("sizes") and len(page.sources[0]["srcset"].split(",")) == 3
    assert f"<title>{source['title']} Case Study | Evans Gitahi</title>" in path.read_text()
    assert 'aria-current="location"' in path.read_text()

assert not exported("/projects/unknown/").exists()
assert exported("/404.html").is_file()
print(f"Verified {len(pages)} HTML files, {references} local references/fragments, {segments} legacy case-study text segments, three identical legacy entries, image attributes, titles and unknown-route export boundary.")

home = pages[OUT / "index.html"]
for segment in fixtures["home"]["text"]:
    assert segment in " ".join(home.text), f"Lost homepage text: {segment}"
for href in fixtures["home"]["links"]:
    assert href in home.references, f"Lost homepage link: {href}"
assert [home.headings.count(tag) for tag in ("h1", "h2", "h3")] == [1, 5, 9]
assert [section["id"] for section in home.sections] == ["profile", "about", "experience", "career", "projects", "contact"]
for path, page in pages.items():
    assert page.h1 == 1, f"Expected one h1: {path}"
    for section in page.sections:
        assert section.get("aria-labelledby") in page.ids, f"Unlabeled section: {path}"
    for anchor in page.anchors:
        if anchor.get("target") == "_blank":
            assert {"noopener", "noreferrer"} <= set(anchor.get("rel", "").split())
    if page.details:
        assert len(page.details) == 1 and "open" not in page.details[0]
        assert len(page.selects) == 1 and "disabled" in page.selects[0]
        assert 'id="theme-init"' in path.read_text().split("</head>")[0]
css = "\n".join(path.read_text() for path in (OUT / "_next/static").rglob("*.css"))
for token in ("grid-cols-about", "grid-cols-skill", "grid-cols-timeline", "grid-cols-study-hero", "grid-cols-study-section", "prefers-reduced-motion", "--light-background", "--dark-background"):
    assert token in css, f"Missing generated CSS: {token}"
assert ".max-w-menu{max-width:var(--container-menu)}" in css
assert all("src/assets" not in reference and "src/main.js" not in reference for page in pages.values() for reference in page.references)
print(f"Verified all {len(fixtures['home']['text'])} homepage text segments, destinations, heading/section semantics, disclosure/theme initial markup, external-link protection and generated responsive/theme CSS.")
