var $j = jQuery.noConflict();

// number animation
$j(document).ready(function() {
    if($j('.total-survey-answer')[0]){
        var comma_separator_number_step = $j.animateNumber.numberStepFactories.separator(',')
        $j('.total-survey-answer').animateNumber({
            number: $j('.total-survey-answer')[0].innerHTML,
            numberStep: comma_separator_number_step
        }, 1200);
    }
});
