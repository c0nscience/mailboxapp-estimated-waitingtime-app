/*global $:false,jQuery:false */
"use strict";
(function ($) {
    var chartWrapper = $("#chartWrapper"),
            chartElement = $("#chart"),
            dateTimeFormat = "MM/DD/YYYY HH:mm",
            previousPoint = null,
            dataPoints = [
                {dateTime: moment("02/07/2013 20:07", dateTimeFormat), queueSize: 270982},
                {dateTime: moment("02/07/2013 22:15", dateTimeFormat), queueSize: 270900},
                {dateTime: moment("02/08/2013 01:52", dateTimeFormat), queueSize: 270796},
                {dateTime: moment("02/08/2013 02:16", dateTimeFormat), queueSize: 270776}
            ],
            firstDataPoint = dataPoints[0];

    function generateChartDataFromDataPoints() {
        var series = [];
        $.each(dataPoints, function (index, datePoint) {
            var dateTime = datePoint.dateTime,
                    queueSize = datePoint.queueSize;

            var previousDataPoint = dataPoints[index - 1];
            if (previousDataPoint !== undefined) {
                var dateTimeDiff = moment(previousDataPoint.dateTime).diff(dateTime) / 3600000,
                    queueDiff = previousDataPoint.queueSize - queueSize,
                    decreaseRate = queueDiff / dateTimeDiff;

                series.push([index, decreaseRate]);
            }
        });

        return series;
    }

    function renderToolTipAtPointsWithText(point, toolTipText) {
        var toolTipElement = $("<div id='tooltip'>");
        toolTipElement.html(toolTipText);
        toolTipElement.css({
                               position: 'absolute',
                               display: 'none',
                               top: point.y + 5,
                               left: point.x + 5,
                               border: '1px solid #fdd',
                               padding: '2px',
                               'background-color': '#dfeffc',
                               opacity: 0.80
                           }).appendTo("body").fadeIn(200);
    }

    function renderChart() {
        var data = generateChartDataFromDataPoints();

        $.plot(chartElement, [
            {
                data: data, label: "Decreasing Rate"
            }
        ], {
                   series: {
                       lines: { show: true,
                           lineWidth: 2
                       },
                       points: { show: true,
                           lineWidth: 2
                       },
                       shadowSize: 0
                   },
                   grid: {
                       hoverable: true,
                       clickable: true,
                       tickColor: "#f9f9f9",
                       borderWidth: 0
                   },
                   legend: {
                       show: true
                   },
                   colors: ["#3FBAD8"],
                   xaxis: {ticks: 5, tickDecimals: 0},
                   yaxis: {ticks: 5, tickDecimals: 0}
               }
        );
    }

    function showToolTipAtItem(item) {
        if (previousPoint != item.dataIndex) {
            previousPoint = item.dataIndex;

            $("#tooltip").remove();
            var x = item.datapoint[0].toFixed(0),
                    y = item.datapoint[1].toFixed(2);

            var point = {
                x: item.pageX,
                y: item.pageY
            };

            renderToolTipAtPointsWithText(point,
                                          dataPoints[x].dateTime.format("ddd, MMM Do, h:mm") + " &asymp; " + y + "/h");
        }
    }

    function hideToolTip() {
        $("#tooltip").remove();
        previousPoint = null;
    }

    function onPlotHover(pos, item) {
        $("#x").text(pos.x.toFixed(2));
        $("#y").text(pos.y.toFixed(2));

        if (item) {
            showToolTipAtItem(item);
        }
        else {
            hideToolTip();
        }
    }

    $(document).ready(function () {
        renderChart();

        chartElement.bind("plothover", function (event, pos, item) {
            onPlotHover(pos, item);
        });
    });
})(jQuery);