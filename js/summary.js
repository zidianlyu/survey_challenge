var $j = jQuery.noConflict();

$j(function() {
    $j('#build-summary').click(function() {
        $j.ajax({
            url: '/summary',
            type: 'POST',
            data: 'add',
            success: function(response) {
                $j('.summary-chart').removeClass('hide');
                $j('#build-summary').hide();
                $j('.transition-decorator').hide();
                for (let idx in response.all_data) {
                    generateSummaryChart(idx, response.all_data[idx].title, response.all_data[idx].detail);
                }
            },
            error: function(error) {}
        });
    });
    $j('.summary-option-button').click(function() {
        $j('#build-summary').show();
        $j('.transition-decorator').show();
    });
});

function generateSummaryChart(num, question, details) {
    var ctx = document.getElementById(`summaryChart${num}`);
    var names = details.map(x => x.answer);
    var counts = details.map(x => x.count);
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

    var summaryChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: names,
            datasets: [{
                data: counts,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                hoverBackgroundColor: hoverBackgroundColor,
                borderWidth: 1
            }]
        },
        options: {
            // title in the chart top
            title: {
                display: true,
                text: question,
                fontSize: 25,
                fontStyle: '400',
                fontFamily: "Helvetica Neue"
            },

            // top below the title
            legend: {
                labels: {
                    fontSize: 20
                }
            },
            //pop up box
            tooltips: {
                enabled: true,
                titleFontSize: 25,
                bodyFontSize: 20
            }
        },
        animation:{
            easing: 'easeInBounce'
        }
    });
}
