var $j = jQuery.noConflict();
$j(document).ready(function() {
    $j('#reset').click(function() {
        $j.ajax({
            url: '/home',
            type: 'POST',
            data: 'reset',
            success: function(response) {},
            error: function(error) {}
        });
    });

    $j('#add').click(function() {
        $j.ajax({
            url: '/home',
            type: 'POST',
            data: 'add',
            success: function(response) {},
            error: function(error) {}
        });
    });

    $j('#report').click(function() {
        $j.ajax({
            url: '/summary',
            type: 'POST',
            data: 'report',
            success: function(response) {},
            error: function(error) {}
        });
    });

    $j('#start-survey').click(function() {
        $j.ajax({
            url: '/survey',
            type: 'POST',
            data: 'restart',
            success: function(response) {},
            error: function(error) {}
        });
    });

    $j('#addTips').hover(function() {
        $j('.add-tips').removeClass('hide');
        $j('.report-tips').addClass('hide');
        $j('.reset-tips').addClass('hide');
        $j('#reset').removeClass('focus');
        $j('#report').removeClass('focus');
        $j('#add').addClass('focus');
    }, function() {
        // $j('.add-tips').addClass('hide');
        // $j('#add').removeClass('focus');
    });

    $j('#resetTips').hover(function() {
        $j('.add-tips').addClass('hide');
        $j('.report-tips').addClass('hide');
        $j('.reset-tips').removeClass('hide');
        $j('#add').removeClass('focus');
        $j('#report').removeClass('focus');
        $j('#reset').addClass('focus');
    }, function() {
        // $j('.reset-tips').addClass('hide');
        // $j('#reset').removeClass('focus');
    });

    $j('#reportTips').hover(function() {
        $j('.add-tips').addClass('hide');
        $j('.reset-tips').addClass('hide');
        $j('.report-tips').removeClass('hide');
        $j('#add').removeClass('focus');
        $j('#reset').removeClass('focus');
        $j('#report').addClass('focus');
    }, function() {
        // $j('.reset-tips').addClass('hide');
        // $j('#reset').removeClass('focus');
    });
});
