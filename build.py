#!/usr/bin/env python3
"""Generate all service and case-study pages. Run: python3 build.py"""
from pathlib import Path
from pages.content import SERVICES, CASE_STUDIES
from pages import template as t

ROOT = Path(__file__).resolve().parent


def write(rel_path, html):
    dest = ROOT / rel_path
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(html, encoding="utf-8")
    print("wrote", rel_path)


def main():
    cases_by_slug = {c["slug"]: c for c in CASE_STUDIES}
    services_by_slug = {s["slug"]: s for s in SERVICES}

    write("services/index.html", t.render_services_hub(SERVICES))
    for s in SERVICES:
        write("services/%s/index.html" % s["slug"], t.render_service(s, cases_by_slug))

    write("work/index.html", t.render_work_hub(CASE_STUDIES))
    for c in CASE_STUDIES:
        write("work/%s/index.html" % c["slug"], t.render_case_study(c, services_by_slug))

    print("done: %d pages" % (2 + len(SERVICES) + len(CASE_STUDIES)))


if __name__ == "__main__":
    main()
