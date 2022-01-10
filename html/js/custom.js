(function ($) {

  "use strict";

    // PRE LOADER
    $(window).load(function(){
      $('.preloader').fadeOut(1000); // set duration in brackets    
    });


    // ABOUT SLIDER
    $('body').vegas({
        slides: [
            { src: 'https://ipfs.io/ipfs//QmVsgSnEwMy2bLQXMTPWekckCzbA5EEnQH3HZYedEbEGNk/slide-image01.jpg' },
            { src: 'https://ipfs.io/ipfs//QmVsgSnEwMy2bLQXMTPWekckCzbA5EEnQH3HZYedEbEGNk/slide-image02.jpg' },
            { src: 'https://ipfs.io/ipfs//QmVsgSnEwMy2bLQXMTPWekckCzbA5EEnQH3HZYedEbEGNk/slide-image03.jpg' },
            { src: 'https://ipfs.io/ipfs//QmVsgSnEwMy2bLQXMTPWekckCzbA5EEnQH3HZYedEbEGNk/slide-image04.jpg' },
        ],
        timer: false,
        transition: [ 'zoomOut', ]
    });

})(jQuery);
