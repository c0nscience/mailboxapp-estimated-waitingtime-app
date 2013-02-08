/*global $:false */
"use strict";
$(document).ready(function () {
    var chartWrapper = $("#chartWrapper");
    var dateTimeFormat = "MM/DD/YYYY HH:mm";

    var dataPoints = [
        {dateTime: moment("02/07/2013 20:07", dateTimeFormat), queueSize: 270982},
        {dateTime: moment("02/07/2013 22:15", dateTimeFormat), queueSize: 270900},
        {dateTime: moment("02/08/2013 01:52", dateTimeFormat), queueSize: 270796},
        {dateTime: moment("02/08/2013 02:16", dateTimeFormat), queueSize: 270776}
    ];

    function generateSeries(dataPoints) {
        var series = [];
        $.each(dataPoints, function (index, datePoint) {
            var dateTime = datePoint.dateTime,
                    queueSize = datePoint.queueSize;

            var previousDataPoint = dataPoints[index - 1];
            if (previousDataPoint !== undefined) {
                var dateTimeDiff = moment(previousDataPoint.dateTime).diff(dateTime) / 3600000;
                var queueDiff = previousDataPoint.queueSize - queueSize;

                var decreaseRate = queueDiff / dateTimeDiff;

                console.log("dateTimeDiff: " + dateTimeDiff +
                            "; queueDiff: " + queueDiff +
                            "; decreaseRate: " + decreaseRate + "/h");
                series.push([index, decreaseRate]);
            }
        });

        return series;
    }

    var chartElement = $("#chart");
    $.plot(chartElement, [
        { data: generateSeries(dataPoints), label: "decreasing rate"}
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

    function showTooltip(x, y, contents) {
        var toolTipElement = $("<div id='tooltip'>");
        toolTipElement.html(contents);
        toolTipElement.css({
                               position: 'absolute',
                               display: 'none',
                               top: y + 5,
                               left: x + 5,
                               border: '1px solid #fdd',
                               padding: '2px',
                               'background-color': '#dfeffc',
                               opacity: 0.80
                           }).appendTo("body").fadeIn(200);
    }

    var previousPoint = null;
    chartElement.bind("plothover", function (event, pos, item) {
        $("#x").text(pos.x.toFixed(2));
        $("#y").text(pos.y.toFixed(2));

        if (item) {
            if (previousPoint != item.dataIndex) {
                previousPoint = item.dataIndex;

                $("#tooltip").remove();
                var x = item.datapoint[0].toFixed(0),
                        y = item.datapoint[1].toFixed(2);

                showTooltip(item.pageX, item.pageY,
                            dataPoints[x].dateTime.format("ddd, MMM Do, h:mm") + " &asymp; " + y + "/h");
            }
        }
        else {
            $("#tooltip").remove();
            previousPoint = null;
        }
    });
});