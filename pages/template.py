"""Pure render functions for generated pages. Root-absolute paths only."""
import html

BASE = "https://neuragul.com"


def esc(s):
    return html.escape(s, quote=True)


ARROW = (
    '<svg class="nrg-btn__arrow" viewBox="0 0 18 18" fill="none" '
    'xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
    '<path d="M13.922 4.5V11.8125C13.922 11.9244 13.8776 12.0317 13.7985 12.1108C13.7193 '
    '12.1899 13.612 12.2344 13.5002 12.2344C13.3883 12.2344 13.281 12.1899 13.2018 12.1108C13.1227 '
    '12.0317 13.0783 11.9244 13.0783 11.8125V5.51953L4.79547 13.7953C4.71715 13.8736 4.61092 '
    '13.9176 4.50015 13.9176C4.38939 13.9176 4.28316 13.8736 4.20484 13.7953C4.12652 13.717 '
    '4.08252 13.6108 4.08252 13.5C4.08252 13.3892 4.12652 13.283 4.20484 13.2047L12.4806 '
    '4.92188H6.18765C6.07577 4.92188 5.96846 4.87743 5.88934 4.79831C5.81023 4.71919 5.76578 '
    '4.61189 5.76578 4.5C5.76578 4.38811 5.81023 4.28081 5.88934 4.20169C5.96846 4.12257 '
    '6.07577 4.07813 6.18765 4.07812H13.5002C13.612 4.07813 13.7193 4.12257 13.7985 '
    '4.20169C13.8776 4.28081 13.922 4.38811 13.922 4.5Z" fill="currentColor"/></svg>'
)


def _nav():
    return (
        '<header class="nrg-nav is-scrolled" id="nrg-nav">\n'
        '  <div class="nrg-container nrg-nav__inner">\n'
        '    <a href="/" class="nrg-nav__brand" aria-label="NeuraGul home">'
        '<img src="/assets/img/logo.png" alt="" width="218" height="105"></a>\n'
        '    <nav class="nrg-nav__links" aria-label="Primary">\n'
        '      <a href="/services/">Services</a>\n'
        '      <a href="/work/">Work</a>\n'
        '      <a href="/#contact">Contact</a>\n'
        '    </nav>\n'
        '    <a href="/#contact" class="nrg-btn nrg-btn--filled nrg-nav__cta">Start a project ' + ARROW + '</a>\n'
        '  </div>\n'
        '</header>'
    )


def _footer():
    return (
        '<footer class="nrg-foot">\n'
        '  <div class="nrg-container">\n'
        '    <div class="nrg-foot__top">\n'
        '      <div class="nrg-foot__brand">\n'
        '        <a href="/" class="nrg-foot__mark" aria-label="NeuraGul home">'
        '<img src="/assets/img/logo.png" alt="" width="218" height="105"></a>\n'
        '        <p class="nrg-foot__tag">Software, shipped with intent.</p>\n'
        '      </div>\n'
        '      <div class="nrg-foot__cols">\n'
        '        <div><span class="nrg-label">Company</span><ul>'
        '<li><a href="/#about">About</a></li><li><a href="/#contact">Contact</a></li></ul></div>\n'
        '        <div><span class="nrg-label">Services</span><ul>'
        '<li><a href="/services/custom-software/">Custom software</a></li>'
        '<li><a href="/services/web-mobile/">Web &amp; mobile</a></li>'
        '<li><a href="/services/cloud/">Cloud</a></li>'
        '<li><a href="/services/ai-consulting/">AI</a></li></ul></div>\n'
        '        <div><span class="nrg-label">Resources</span><ul>'
        '<li><a href="/work/">Work</a></li><li><a href="/privacy.html">Privacy</a></li></ul></div>\n'
        '      </div>\n'
        '    </div>\n'
        '    <hr class="nrg-rule">\n'
        '    <div class="nrg-foot__bottom"><span>© 2026 NeuraGul Labs</span>'
        '<span class="nrg-label">v2026 · Made with intent</span></div>\n'
        '  </div>\n'
        '</footer>'
    )


def breadcrumb_jsonld(items):
    elements = []
    for i, (name, url) in enumerate(items, start=1):
        elements.append(
            '{"@type":"ListItem","position":%d,"name":%s,"item":%s}'
            % (i, _json_str(name), _json_str(url))
        )
    return (
        '<script type="application/ld+json">\n'
        '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":['
        + ",".join(elements)
        + ']}\n</script>'
    )


def _json_str(s):
    import json
    return json.dumps(s, ensure_ascii=False)


def document(title, description, canonical, body, jsonld_blocks):
    head = (
        '<!DOCTYPE html>\n<html lang="en">\n<head>\n'
        '  <meta charset="utf-8">\n'
        '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
        '  <meta name="description" content="' + esc(description) + '">\n'
        '  <title>' + esc(title) + '</title>\n'
        '  <link rel="canonical" href="' + esc(canonical) + '">\n'
        '  <link rel="icon" type="image/png" href="/assets/img/favicon.png">\n'
        '  <meta property="og:type" content="website">\n'
        '  <meta property="og:site_name" content="NeuraGul">\n'
        '  <meta property="og:title" content="' + esc(title) + '">\n'
        '  <meta property="og:description" content="' + esc(description) + '">\n'
        '  <meta property="og:url" content="' + esc(canonical) + '">\n'
        '  <meta property="og:image" content="' + BASE + '/assets/img/hero-poster.jpg">\n'
        '  <meta name="twitter:card" content="summary_large_image">\n'
        '  <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>\n'
        '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
        '  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">\n'
        '  <link rel="stylesheet" href="/assets/css/refresh.css">\n'
        + "".join("  " + b.replace("\n", "\n  ") + "\n" for b in jsonld_blocks)
        + '</head>\n<body>\n'
        '<a href="#main" class="nrg-skip">Skip to content</a>\n'
        + _nav() + '\n<main id="main">\n'
    )
    return head + body + '\n</main>\n' + _footer() + '\n<script src="/assets/js/reveal.js"></script>\n</body>\n</html>\n'


def _service_schema(service, url):
    import json
    obj = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service["name"],
        "description": service["promise"],
        "url": url,
        "provider": {"@type": "Organization", "name": "NeuraGul", "url": BASE + "/"},
        "areaServed": "US",
    }
    return '<script type="application/ld+json">\n' + json.dumps(obj, ensure_ascii=False) + '\n</script>'


def render_service(service, cases_by_slug):
    url = BASE + "/services/" + service["slug"] + "/"
    title = service["name"] + " — NeuraGul"
    desc = service["promise"]
    crumbs = breadcrumb_jsonld([
        ("Home", BASE + "/"),
        ("Services", BASE + "/services/"),
        (service["name"], url),
    ])
    deliverables = "".join(
        "<li>" + esc(d) + "</li>\n" for d in service["deliverables"]
    )
    # Related work: cards for mapped case studies, or a hub link if none.
    if service["related"]:
        cards = ""
        for slug in service["related"]:
            c = cases_by_slug[slug]
            cards += (
                '<a class="nrg-detail__card" href="/work/' + slug + '/" data-reveal>'
                '<span class="nrg-label">' + esc(c["meta"]) + '</span>'
                '<h3>' + esc(c["name"]) + '</h3>'
                '<span class="nrg-detail__card-arrow" aria-hidden="true">→</span></a>\n'
            )
        related = (
            '<section class="nrg-detail__section"><h2 data-reveal>Related work</h2>'
            '<div class="nrg-detail__cards">' + cards + '</div></section>'
        )
    else:
        related = (
            '<section class="nrg-detail__section"><h2 data-reveal>Related work</h2>'
            '<p data-reveal><a class="nrg-detail__more" href="/work/">See all our work →</a></p></section>'
        )
    body = (
        '<article class="nrg-section nrg-detail">\n'
        '<div class="nrg-container">\n'
        '<nav class="nrg-detail__crumb" aria-label="Breadcrumb"><a href="/">Home</a> / '
        '<a href="/services/">Services</a> / <span>' + esc(service["name"]) + '</span></nav>\n'
        '<header class="nrg-detail__head">\n'
        '<h1 class="nrg-detail__title" data-reveal>' + esc(service["name"]) + '</h1>\n'
        '<p class="nrg-detail__lede" data-reveal>' + esc(service["promise"]) + '</p>\n'
        '</header>\n'
        '<section class="nrg-detail__section"><h2 data-reveal>What\'s included</h2>'
        '<ul class="nrg-detail__list" data-reveal>' + deliverables + '</ul></section>\n'
        '<section class="nrg-detail__section"><h2 data-reveal>Who it\'s for</h2>'
        '<p data-reveal>' + esc(service["who_for"]) + '</p></section>\n'
        '<section class="nrg-detail__section"><h2 data-reveal>How we work</h2>'
        '<ol class="nrg-detail__steps" data-reveal>'
        '<li><strong>Discover.</strong> We map the real problem and write down what we\'re shipping.</li>'
        '<li><strong>Design &amp; build.</strong> Tight loops with working software, usable in week one.</li>'
        '<li><strong>Operate.</strong> We support what we ship and hand off only when you\'re ready.</li>'
        '</ol></section>\n'
        + related + '\n'
        '<section class="nrg-detail__cta"><a href="/#contact" class="nrg-btn nrg-btn--filled">'
        'Start a project ' + ARROW + '</a></section>\n'
        '</div>\n</article>'
    )
    return document(title, desc, url, body, [crumbs, _service_schema(service, url)])


def _case_schema(case, url):
    import json
    obj = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": case["name"],
        "abstract": case["brief"],
        "url": url,
        "creator": {"@type": "Organization", "name": "NeuraGul", "url": BASE + "/"},
    }
    return '<script type="application/ld+json">\n' + json.dumps(obj, ensure_ascii=False) + '\n</script>'


def render_case_study(case, services_by_slug):
    url = BASE + "/work/" + case["slug"] + "/"
    title = case["name"] + " — NeuraGul case study"
    desc = case["brief"]
    crumbs = breadcrumb_jsonld([
        ("Home", BASE + "/"),
        ("Work", BASE + "/work/"),
        (case["name"], url),
    ])
    stack = "".join("<li>" + esc(s) + "</li>" for s in case["stack"])
    svc_cards = ""
    for slug in case["related_services"]:
        s = services_by_slug[slug]
        svc_cards += (
            '<a class="nrg-detail__card" href="/services/' + slug + '/" data-reveal>'
            '<h3>' + esc(s["name"]) + '</h3>'
            '<span class="nrg-detail__card-arrow" aria-hidden="true">→</span></a>\n'
        )
    body = (
        '<article class="nrg-section nrg-detail">\n'
        '<div class="nrg-container">\n'
        '<nav class="nrg-detail__crumb" aria-label="Breadcrumb"><a href="/">Home</a> / '
        '<a href="/work/">Work</a> / <span>' + esc(case["name"]) + '</span></nav>\n'
        '<header class="nrg-detail__head">\n'
        '<span class="nrg-label" data-reveal>' + esc(case["meta"]) + '</span>\n'
        '<h1 class="nrg-detail__title" data-reveal>' + esc(case["name"]) + '</h1>\n'
        '<ul class="nrg-detail__stack" aria-label="Built with" data-reveal>' + stack + '</ul>\n'
        '</header>\n'
        '<section class="nrg-detail__section"><h2 data-reveal>The brief</h2>'
        '<p data-reveal>' + esc(case["brief"]) + '</p></section>\n'
        '<section class="nrg-detail__section"><h2 data-reveal>What we built</h2>'
        '<p data-reveal>' + esc(case["built"]) + '</p></section>\n'
        '<section class="nrg-detail__section"><h2 data-reveal>Outcome</h2>'
        '<p data-reveal>' + esc(case["outcome"]) + '</p></section>\n'
        '<section class="nrg-detail__cta" data-reveal>'
        '<a href="' + esc(case["live_url"]) + '" class="nrg-btn nrg-btn--filled" target="_blank" rel="noopener">'
        + esc(case["live_label"]) + ' ' + ARROW + '</a></section>\n'
        + ('<section class="nrg-detail__section"><h2 data-reveal>Related services</h2>'
           '<div class="nrg-detail__cards">' + svc_cards + '</div></section>\n' if svc_cards else '')
        + '<section class="nrg-detail__cta"><a href="/#contact" class="nrg-btn nrg-btn--ghost">'
        'Start a project ' + ARROW + '</a></section>\n'
        '</div>\n</article>'
    )
    return document(title, desc, url, body, [crumbs, _case_schema(case, url)])
