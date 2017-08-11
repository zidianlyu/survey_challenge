var $j = jQuery.noConflict();
$j(function() {
    $j('.survey-form span').removeClass('hide');
    $j('.submit-answer').hide();
    $j('.submit-decision').hide();
    $j('input[name="answer"]').click(function() {
        $j('.submit-answer').show();
        $j('.survey-form span').addClass('hide');
        var selected = $j('input[name="answer"]:checked').val()
        $j(`.radio label`).removeClass('after-select');
        $j(`input[value="${selected}"]`).parent().addClass('after-select');

    });

    $j('.submit-decision').click(function() {
        $j('.data-chart').addClass('hide');
        $j('.submit-decision').hide();
        $j('.survey-context').show();
    });

    $j('.submit-answer').click(function() {
        $j('.submit-answer').hide();
        $j('.survey-context').hide();
        $j.ajax({
            url: '/survey',
            data: $j('#survey-form').serialize(),
            type: 'POST',
            success: function(response) {
                let answer = response.answer;
                $j('.data-chart').removeClass('hide');
                generateGraph(response.results, response.question);
            },
            error: function(error) {
            }
        });
        $j('.submit-decision').show();
    });
});

function generateGraph(results, question) {
    var ctx = document.getElementById("myChart");
    var names = results.map(x => x.answer);
    var counts = results.map(x => x.count);
    var themeColor = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ];
    var backgroundColor = themeColor.sort((a, b) => 0.5 - Math.random());
    var borderColor = backgroundColor.slice().map(x => x.replace(new RegExp('0.2', 'gi'), '1'));
    var hoverBackgroundColor = backgroundColor.slice().map(x => x.replace(new RegExp('0.2', 'gi'), '0.4'));
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: names,
            datasets: [{
                label: 'Survey Results',
                data: counts,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                hoverBackgroundColor: hoverBackgroundColor,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: Math.max.apply(Number, counts) + 1,
                        stepSize: 1,
                        fontSize: 25
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontSize: 35
                    }
                }]
            },
            // title in the chart top
            title: {
                display: true,
                text: question,
                fontSize: 35,
                fontStyle: '400',
                fontFamily: 'Helvetica Neue'
            },
            hover: {
                onHover: function(e, el) {
                    $j('#myChart').css('cursor', el[0] ? 'pointer' : 'default');
                }
            },
            animation: {
                duration: 1500,
                esaing: 'easeOutQuart'
            },
            // top below the title
            legend: {
                display: true,
                labels: {
                    fontSize: 25
                }
            },
            //pop up box
            tooltips: {
                enabled: true,
                titleFontSize: 25,
                bodyFontSize: 20
            }
        }
    });
}
