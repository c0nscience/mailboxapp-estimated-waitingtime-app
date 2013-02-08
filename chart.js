/*global $:false,jQuery:false */
"use strict";
(function ($) {
    var chartWrapper = $("#chartWrapper"),
            chartPlaceholder = $("#chart"),
            dateTimeFormat = "MM/DD/YYYY HH:mm",
            previousPoint = null,
            calculatedData = {},
            dataPoints = [
                {dateTime: moment("02/07/2013 20:07", dateTimeFormat), queueSize: 270982},
                {dateTime: moment("02/07/2013 22:15", dateTimeFormat), queueSize: 270900},
                {dateTime: moment("02/08/2013 01:52", dateTimeFormat), queueSize: 270796},
                {dateTime: moment("02/08/2013 02:16", dateTimeFormat), queueSize: 270776},
                {dateTime: moment("02/08/2013 04:02", dateTimeFormat), queueSize: 270712},
                {dateTime: moment("02/08/2013 17:20", dateTimeFormat), queueSize: 268060},
                {dateTime: moment("02/08/2013 18:20", dateTimeFormat), queueSize: 267185},
                {dateTime: moment("02/08/2013 18:56", dateTimeFormat), queueSize: 266655},
                {dateTime: moment("02/08/2013 20:20", dateTimeFormat), queueSize: 265424},
                {dateTime: moment("02/08/2013 21:12", dateTimeFormat), queueSize: 264644},
                {dateTime: moment("02/08/2013 21:50", dateTimeFormat), queueSize: 264094},
                {dateTime: moment("02/08/2013 22:20", dateTimeFormat), queueSize: 263643}
            ],
            firstDataPoint = dataPoints[0],
            lastDataPoint = dataPoints[dataPoints.length-1];

    function generateChartDataFromDataPoints() {
        var series = [];
        $.each(dataPoints, function (index, dataPoint) {
            var dateTime = dataPoint.dateTime,
                    queueSize = dataPoint.queueSize;

                series.push([dateTime, queueSize]);
        });

        return series;
    }

    function calculateData() {
        calculatedData.dateTimeDiff = lastDataPoint.dateTime.diff(firstDataPoint.dateTime) / 3600000;
        calculatedData.queueSizeDiff = firstDataPoint.queueSize - lastDataPoint.queueSize;
        calculatedData.decreasingRate = calculatedData.queueSizeDiff / calculatedData.dateTimeDiff;
        calculatedData.timeToWait = firstDataPoint.queueSize / calculatedData.decreasingRate;
        calculatedData.accessMoment = moment().add('hours', calculatedData.timeToWait);

        console.log("dtd: " + calculatedData.dateTimeDiff);
        console.log("qsd: " + calculatedData.queueSizeDiff);
        console.log("dr: " + calculatedData.decreasingRate);
        console.log("ttw: " + calculatedData.timeToWait);
        console.log("am: " + calculatedData.accessMoment.format('MMMM Do YYYY, h:mm:ss a'));
    }

    function generateIdealLineDataPoints() {
        var series = [],
            estimatedAccessTime = calculatedData.accessMoment;

        series.push([firstDataPoint.dateTime, firstDataPoint.queueSize]);
        series.push([estimatedAccessTime, 0]);

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
        var data = [
            {
                data: generateChartDataFromDataPoints(),
                label: "Queue Size"
            },
            {
                data: generateIdealLineDataPoints(),
                label: "Ideal Line"
            }
        ];
        var options = {
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
            colors: ["#3FBAD8", "#ff5454"],
            xaxis: {
                mode: "time",
                tickFormatter: function (val, axis) {
                    var momentValue = moment(val);
                    return momentValue.format("HH:mm");
                }
            },
            yaxis: {ticks: 5, tickDecimals: 0}
        };
        $.plot(chartPlaceholder, data, options);
    }

    function showToolTipAtItem(item) {
        var dataIndex = item.dataIndex;
        if (previousPoint != dataIndex) {
            previousPoint = dataIndex;

            $("#tooltip").remove();
            var x = item.datapoint[0],
                    y = item.datapoint[1];

            var point = {
                x: item.pageX,
                y: item.pageY
            };

            renderToolTipAtPointsWithText(point,
                                          moment(x).format("ddd, MMM Do, h:mm") + ", qs = " + y);
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

    function renderDataToChartWrapper(label, data) {
        var estimatedDateElement = $('<div>'),
            estimatedLabelElement = $('<span>');

        estimatedLabelElement.html(label.toUpperCase());
        estimatedLabelElement.css(
                {
                    color: '#999999',
                    fontSize: '12px'
                }
        );

        estimatedDateElement.html(data.toUpperCase());
        estimatedDateElement.css(
                {
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#3FBAD8',
                    marginLeft: '75px',
                    marginRight: '5px',
                    marginTop: '10px'
                }
        );
        estimatedDateElement.prepend(estimatedLabelElement);

        chartWrapper.append(estimatedDateElement);
    }

    function renderEstAccessTime() {
        renderDataToChartWrapper("est. access time: ",
                                 calculatedData.accessMoment.format('MMMM Do YYYY, h:mm a'));
    }

    function renderWaitedSince() {
        var waitedTimeString = "";
        if (moment().isBefore(calculatedData.accessMoment)) {
            waitedTimeString = firstDataPoint.dateTime.fromNow();
        } else {
            waitedTimeString = firstDataPoint.dateTime.from(calculatedData.accessMoment);
        }
        renderDataToChartWrapper("start waiting ", waitedTimeString);
    }

    function renderAdditionalData() {
        renderEstAccessTime();
        renderWaitedSince();
    }

    $(document).ready(function () {
        calculateData()
        renderChart();
        renderAdditionalData();

        chartPlaceholder.bind("plothover", function (event, pos, item) {
            onPlotHover(pos, item);
        });
    });
})(jQuery);
