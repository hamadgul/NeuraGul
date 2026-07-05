(function(){
	var toggle = document.querySelector('.nrg-nav__toggle');
	var mobile = document.getElementById('nrg-nav-mobile');
	if (!toggle || !mobile) return;
	toggle.addEventListener('click', function(){
		var open = !mobile.hasAttribute('hidden');
		if (open) { mobile.setAttribute('hidden', ''); toggle.setAttribute('aria-expanded', 'false'); }
		else { mobile.removeAttribute('hidden'); toggle.setAttribute('aria-expanded', 'true'); }
	});
	mobile.querySelectorAll('a').forEach(function(a){
		a.addEventListener('click', function(){ mobile.setAttribute('hidden', ''); toggle.setAttribute('aria-expanded', 'false'); });
	});
	window.addEventListener('resize', function(){
		if (window.innerWidth > 900 && !mobile.hasAttribute('hidden')) {
			mobile.setAttribute('hidden', '');
			toggle.setAttribute('aria-expanded', 'false');
		}
	}, { passive: true });
	document.addEventListener('keydown', function(e){
		if (e.key === 'Escape' && !mobile.hasAttribute('hidden')) {
			mobile.setAttribute('hidden', '');
			toggle.setAttribute('aria-expanded', 'false');
			toggle.focus();
		}
	});
	var observer = new MutationObserver(function(){
		if (!mobile.hasAttribute('hidden')) {
			var firstLink = mobile.querySelector('a');
			if (firstLink) firstLink.focus();
		}
	});
	observer.observe(mobile, { attributes: true, attributeFilter: ['hidden'] });
})();
