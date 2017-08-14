var $j = jQuery.noConflict();

$j(function() {
    $j("#fakeLoader").fakeLoader({
        timeToHide: (Math.floor(Math.random() * 3) + 5) * 100,
        zIndex: "999",
        spinner: "spinner7",
        bgColor: "#fff",
    });
});
