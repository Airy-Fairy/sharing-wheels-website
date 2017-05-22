// Load user page
$('#help, #user-page').on('click', function(event) {
    event.preventDefault(); // Stop loading new link
    var url = this.href;    // Get value of href

    // Remove previous container and load new
    $('.main-content > .container').remove();
    $('.main-content').load(url).hide().fadeIn();

    // load() callback
    $('.main-content').load(url, function() {
        // If it's a user page
        if($(this).children('.user-page')[0] !== undefined) {
            // Load first content from the first link
            // and make it current
            var a = $('#left-col-list>li>a')[0];

            $(a).addClass('current-link');
            $('.right-col > .content').load(a.href).hide().fadeIn();

            // Load new content on click
            $('.left-col li a').on('click', function(event) {
                event.preventDefault(); // Stop loading new link
                var url = this.href;    // Get value of href
                
                // Change style of the clicked link
                $('li a.current-link').removeClass('current-link');
                $(this).addClass('current-link');

                // Remove previous container and load new
                $('.right-col > .container').remove();
                $('.right-col > .content').load(url).hide().fadeIn();
            });
        }
    });

    // Show the header search
    $('.nav-search').css('visibility', 'visible');
});


// Show/hide popups listener
$.fn.popup = function(id, className, closeClass, divisor) {
    // On link click listener - show popup
    $(id).on('click', function(event) {
        event.preventDefault();
        $(className).show();
        $(className).centerPopup(divisor);
    });

    // On cross click listener - hide popup
    $('.close' + closeClass).on('click', function() {
        $(className).hide();
    });
};


// Call popup() twice for sign up and sign in forms
$.fn.popup('#sign-in', '.signin-form', '.signin', 4);
$.fn.popup('#sign-up', '.signup-form', '.signup', 16);

// Center popup window
$.fn.centerPopup = function(divisor) {
    this.css('top', Math.max(0, (($(window).height() - $(this).outerHeight()) / divisor) + 
        $(window).scrollTop()) + 'px');
    this.css('left', Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
        $(window).scrollLeft()) + 'px');
    return this;
};


$('#forgotpasswd').on('click', function(event) {
    event.preventDefault();
    $('.signin-form').hide();
    $('.passwd-recovery').show();
    $('.passwd-recovery').centerPopup(4);
});

$('.close.passwd').on('click', function() {
    $('.passwd-recovery').hide();
});