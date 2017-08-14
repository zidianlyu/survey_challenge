// show top or bot
var $j = jQuery.noConflict();
$j('#to-bottom').show();
$j('#to-top').hide();
$j(window).scroll(function() {
    if ($j(this).scrollTop() > $j(document).height() / 4) {
        $j("#to-bottom").fadeOut(0);
        $j("#to-top").fadeIn();
    } else {
        $j("#to-top").fadeOut(0);
        $j("#to-bottom").fadeIn();
    }
})

// scroll to top
function toTop() {
    $j('body,html').animate({
        scrollTop: 0
    }, 300);
}


// scroll to bottom
function toBottom() {
    $j('body,html').animate({
        scrollTop: $j(document).height()
    }, 300)
}


$j('#toolbar-add').click(function() {
    $j.ajax({
        url: '/home',
        type: 'POST',
        data: 'add',
        success: function(response) {},
        error: function(error) {}
    });
});

$j('#toolbar-reset').click(function() {
    $j.ajax({
        url: '/home',
        type: 'POST',
        data: 'reset',
        success: function(response) {},
        error: function(error) {}
    });
});

$j('#toolbar-report').click(function() {
    $j.ajax({
        url: '/summary',
        type: 'POST',
        data: 'report',
        success: function(response) {},
        error: function(error) {}
    });
});
