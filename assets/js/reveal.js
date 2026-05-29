(function () {
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('[data-reveal]').forEach(function (el) {
            el.classList.add('is-revealed');
        });
        return;
    }

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
        document.querySelectorAll('[data-reveal]').forEach(function (el) {
            el.classList.add('is-revealed');
        });
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

    document.querySelectorAll('[data-reveal]').forEach(function (el) {
        observer.observe(el);
    });
})();

// Active-section nav highlighting
(function(){
    var links = document.querySelectorAll('.nrg-nav__links a[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;

    var sectionMap = {};
    var sections = [];
    links.forEach(function(a){
        var id = a.getAttribute('href').slice(1);
        var section = document.getElementById(id);
        if (section) {
            sectionMap[id] = a;
            sections.push(section);
        }
    });

    var observer = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
            if (entry.isIntersecting) {
                links.forEach(function(a){ a.classList.remove('is-current'); });
                var link = sectionMap[entry.target.id];
                if (link) link.classList.add('is-current');
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach(function(s){ observer.observe(s); });
})();
