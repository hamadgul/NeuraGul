/*
Author       : AB_Themes.
Template Name: Onion - Corporate Agency HTML Landing Template.
Version      : 1.0
*/


(function($) {
	'use strict';
		
	/*PRELOADER JS*/
		window.addEventListener("load", function(event){
			var loaderWrapper;
			if ( loaderWrapper = document.querySelector('.loader-wrapper') ) {
				loaderWrapper.style.display = "none";
				// initialize the AOS
				if (typeof AOS === 'object') {
					AOS.init();
				}
			} else {
				// initialize the AOS
				if (typeof AOS === 'object') {
					AOS.init();
				}
			}

		})

		 new WOW().init();
		
	 
	 /*-------------------------------------
    Main menus
    -------------------------------------*/
    	
    	$(window).on('scroll', function () {
    		
    		if ($(this).scrollTop() > 100) {
    			$('.header').addClass('sticky');
    		} else {
    			$('.header').removeClass('sticky');
    		}
    	});
		
		$('.main_menu').onePageNav({
    		currentClass: 'current',
    		changeHash: true,
    		scrollSpeed: 750,
    		scrollThreshold: 0.5,
    		filter: '',
    		easing: 'swing',
    		begin: function() {
    			//I get fired when the animation is starting
    		},
    		end: function() {
    			//I get fired when the animation is ending
    		},
    		scrollChange: function(jQuerycurrentListItem) {
    			//I get fired when you enter a section and I pass the list item of the section
    		}
    	});
		
		/*-------------------------------------
     LIGHTBOX popup
    -------------------------------------*/
    
    	lightbox.option({
    	  'resizeDuration': 200,
    	  'wrapAround': true
    	})	
		
		 /*
        Counter Js
        ============================*/
        $(".counter").counterUp({
            delay: 10,
            time: 1000,
        });
		 
	 /*Start PRoject Design*/
		$('.portfolio_slider').owlCarousel({
        loop: true,
        margin: 30,
		items: 3,
		responsive: {
            0: {
                items: 1,
                nav: false
            },
            767: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: false,
                loop: true
            }
        }
    });

		/*END PRoject Design*/
	
	 $('.testimonial__slider').owlCarousel({
        loop: true,
        margin: 50,
        responsiveClass: true,
		items: 2,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            768: {
                items: 2,
                nav: false
            },
            1000: {
                items: 2,
                nav: false,
                loop: true
            }
        }
    });
	 /*-------------------------------------
    Countdown
    -------------------------------------*/
	
	  // Function to start the countdown
	 // Unix timestamp (in seconds) to count down to
	var twoDaysFromNow = (new Date().getTime() / 1000) + (86400 * 2) + 1;

	// Set up FlipDown
	var flipdown = new FlipDown(twoDaysFromNow)

	// Start the countdown
	.start()

	// Do something when the countdown ends
	.ifEnded(() => {
	  console.log('The countdown has ended!');
	});

	// Apply light theme directly
	document.body.classList.add('light-theme');
	document.querySelector('#flipdown').classList.add('flipdown__theme-light');


	
	/* light and dark mode */
	
	// Function to toggle between light and dark mode
	function toggleMode() {
		const body = document.body;
		const themeStyle = document.getElementById('theme-style');
		const icon = document.getElementById('mode-icon');

		if (body.classList.contains('light-mode')) {
			// Switch to dark mode
			body.classList.remove('light-mode');
			icon.classList.remove('fa-moon');
			icon.classList.add('fa-sun');
			themeStyle.setAttribute('href', 'assets/css/dark-mode.css'); // Link to your dark mode CSS
		} else {
			// Switch to light mode
			body.classList.add('light-mode');
			icon.classList.remove('fa-sun');
			icon.classList.add('fa-moon');
			themeStyle.setAttribute('href', 'assets/css/style.css'); // Link to your light mode CSS
		}
	}

	// Event listener for icon click
	document.getElementById('mode-icon').addEventListener('click', toggleMode);
		
		
})(jQuery);


