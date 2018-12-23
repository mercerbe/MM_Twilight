jQuery(document).ready(function($) {
    
   var bgImage =$(".bg-image"), 
       dude =$(".dude"), 
       scrollLine =$(".scroll-line"), 
       scrollDown =$(".scrolldown"), 
       titleMain =$(".title-main")
   
   // Animate in
   
   var tlLoader = new TimelineMax();
    tlLoader
    .from(titleMain, 2,{autoAlpha:0})
    .from(scrollLine, 0.5,{scaleY:0, transformOrigin:"center top", ease:Power1.easeOut}, '-=2')
    .from(bgImage, 2, {autoAlpha:0, scale: 1.5,ease:Power1.easeOut}, '-=2')
    .from(dude, 2, {autoAlpha: 0, scale: 1.5, ease:Power1.easeOut},'-=1.5')
   
    
    //Scroll Starts
    
    var controller = new ScrollMagic.Controller();
    
    var tlMainScroll = new TimelineMax()
    .add([
        TweenMax.to(dude, 4, {scale:2, y: 150, x:"-45%", ease:Power1.easeInOut}),
        TweenMax.to(titleMain, 1, {autoAlpha:0}),
        TweenMax.to(bgImage, 4, {scale:2, ease:Power1.easeInOut}),
    ]);

    
    //Pin the scene
    var tweenHome = new ScrollMagic.Scene({
        triggerElement: '.pin-scene',
        triggerHook:0,
        duration: '130%'})
    
    .setTween(tlMainScroll)
    .setPin('.pin-scene')
    .addTo(controller);


//Scroll Out 

var tlMainScrollOut = new TimelineMax()
    .add([
        TweenMax.to(bgImage, 8, {autoAlpha:0}),
        TweenMax.from('.section2', 4, {autoAlpha:0}),
        TweenMax.to(dude, 8, {autoAlpha:0}),
    ]);

var section2 = new ScrollMagic.Scene ({
    triggerElement: '.section2',
    triggerHook: 0,
    duration: '40%'})
.setTween(tlMainScrollOut)
.setPin('.section2')
.addTo(controller);

});

//easing 
//pagegination functions
(function ($) {
    "use strict"; // Start of use strict

    // Closes the sidebar menu
    $(".menu-toggle").click(function (e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
        $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
        $(this).toggleClass("active");
    });

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('#sidebar-wrapper .js-scroll-trigger').click(function () {
        $("#sidebar-wrapper").removeClass("active");
        $(".menu-toggle").removeClass("active");
        $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
    });

    // Scroll to top button appear
    $(document).scroll(function () {
        var scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });

})(jQuery); // End of use strict

//email contact form
$(function () {
    function after_form_submitted(data) {
        if (data.result == 'success') {
            $('form#reused_form').hide();
            $('#success_message').show();
            $('#error_message').hide();
        }
        else {
            $('#error_message').append('<ul></ul>');

            jQuery.each(data.errors, function (key, val) {
                $('#error_message ul').append('<li>' + key + ':' + val + '</li>');
            });
            $('#success_message').hide();
            $('#error_message').show();

            //reverse the response on the button
            $('button[type="button"]', $form).each(function () {
                $btn = $(this);
                label = $btn.prop('orig_label');
                if (label) {
                    $btn.prop('type', 'submit');
                    $btn.text(label);
                    $btn.prop('orig_label', '');
                }
            });

        }//else
    }

    $('#reused_form').submit(function (e) {
        e.preventDefault();

        $form = $(this);
        //show some response on the button
        $('button[type="submit"]', $form).each(function () {
            $btn = $(this);
            $btn.prop('type', 'button');
            $btn.prop('orig_label', $btn.text());
            $btn.text('Sending ...');
        });


        $.ajax({
            type: "POST",
            url: 'handler.php',
            data: $form.serialize(),
            success: after_form_submitted,
            dataType: 'json'
        });

    });
});


//instafeed
var myFeed = new Instafeed({
    get: 'user',
    userId: '1256541053',
    clientId: '1e9a77d650c149658deed38a4b379a0f',
    accessToken: '1256541053.1e9a77d.dcb9b0d341ab458dbe5c6d10311af75f',
    resolution: 'thumbnail',
    template: '<a href="{{link}}" target="_blank" id="{{id}}"><img src="{{image}}" /></a>',
    sortBy: 'most-recent',
    limit: 8,
    links: false
});
myFeed.run();

