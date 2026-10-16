"""Smoke-test the production static export over loopback HTTP, without a browser."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from urllib.error import HTTPError
from urllib.parse import urlsplit
from urllib.request import urlopen
import runpy

# Reuse file/fragment/content checks and enumerate exactly their local targets.
checks = runpy.run_path(str(Path(__file__).with_name("check-export.py")))
OUT = checks["OUT"]
pages = checks["pages"]
paths = {"/", "/index.html", "/Evans_Gitahi_Resume.pdf", "/404.html"}
for path, page in pages.items():
    paths.add("/" + path.relative_to(OUT).as_posix())
    for reference in page.references:
        url = urlsplit(reference)
        if not url.scheme and not url.netloc and url.path:
            paths.add(url.path)


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


server = ThreadingHTTPServer(("127.0.0.1", 0), partial(QuietHandler, directory=str(OUT)))
thread = Thread(target=server.serve_forever, daemon=True)
thread.start()
base = f"http://127.0.0.1:{server.server_port}"
try:
    for path in sorted(paths):
        with urlopen(base + path, timeout=10) as response:
            assert response.status == 200 and response.read(), path
    for slug in ("scorelearn", "ladyshelf", "sceneit"):
        with urlopen(f"{base}/projects/{slug}/") as canonical, urlopen(f"{base}/projects/{slug}.html") as legacy:
            assert canonical.read() == legacy.read(), slug
    missing = ("/missing/", "/projects/unknown/", "/projects/unknown.html", "/projects/toString/", "/projects/constructor/")
    for path in missing:
        try:
            urlopen(base + path, timeout=10)
            raise AssertionError(f"Unexpected successful response: {path}")
        except HTTPError as error:
            assert error.code == 404, path
    print(f"HTTP: {len(paths)} known page/asset paths return 200; all 3 legacy pages match canonical bodies; {len(missing)} unknown paths return 404.")
finally:
    server.shutdown()
    server.server_close()
    thread.join()
