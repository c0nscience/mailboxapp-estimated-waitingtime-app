/*global $:false,jQuery:false */
"use strict";
(function ($) {
    var chartWrapper = $("#chartWrapper"),
            chartPlaceholder = $("#chart"),
            dateTimeFormat = "MM/DD/YYYY HH:mm",
            previousPoint = null,
            calculatedData = {},
            dataPoints = [
                {dateTime: moment("02/07/2013 20:07", dateTimeFormat), queueSize: 270982, peopleBehind: 2087},
                {dateTime: moment("02/08/2013 04:02", dateTimeFormat), queueSize: 270712},
                {dateTime: moment("02/08/2013 17:20", dateTimeFormat), queueSize: 268060},
                {dateTime: moment("02/09/2013 00:18", dateTimeFormat), queueSize: 261907},
                {dateTime: moment("02/09/2013 14:56", dateTimeFormat), queueSize: 249072, peopleBehind: 393553},
                {dateTime: moment("02/09/2013 21:27", dateTimeFormat), queueSize: 244263, peopleBehind: 420529},
                {dateTime: moment("02/10/2013 09:49", dateTimeFormat), queueSize: 238800, peopleBehind: 453121},
                {dateTime: moment("02/10/2013 13:49", dateTimeFormat), queueSize: 237956, peopleBehind: 462687},
                {dateTime: moment("02/10/2013 17:10", dateTimeFormat), queueSize: 235470, peopleBehind: 472064},
                {dateTime: moment("02/10/2013 22:11", dateTimeFormat), queueSize: 228822, peopleBehind: 486986},
                {dateTime: moment("02/11/2013 01:12", dateTimeFormat), queueSize: 225295, peopleBehind: 494899},
                {dateTime: moment("02/11/2013 13:34", dateTimeFormat), queueSize: 210903, peopleBehind: 521249},
                {dateTime: moment("02/11/2013 16:44", dateTimeFormat), queueSize: 207200},
                {dateTime: moment("02/11/2013 18:34", dateTimeFormat), queueSize: 205070},
                {dateTime: moment("02/11/2013 22:28", dateTimeFormat), queueSize: 200646, peopleBehind: 545445},
                {dateTime: moment("02/12/2013 01:03", dateTimeFormat), queueSize: 197633, peopleBehind: 551325},
                {dateTime: moment("02/12/2013 04:06", dateTimeFormat), queueSize: 194086, peopleBehind: 557342},
                {dateTime: moment("02/12/2013 11:36", dateTimeFormat), queueSize: 185328, peopleBehind: 569958},
                {dateTime: moment("02/12/2013 15:52", dateTimeFormat), queueSize: 180312, peopleBehind: 577551},
                {dateTime: moment("02/12/2013 18:27", dateTimeFormat), queueSize: 177375, peopleBehind: 584091},
                {dateTime: moment("02/12/2013 20:33", dateTimeFormat), queueSize: 174994, peopleBehind: 590135},
                {dateTime: moment("02/13/2013 00:53", dateTimeFormat), queueSize: 169953, peopleBehind: 602218},
                {dateTime: moment("02/13/2013 03:24", dateTimeFormat), queueSize: 167043, peopleBehind: 606875},
                {dateTime: moment("02/13/2013 13:00", dateTimeFormat), queueSize: 155684, peopleBehind: 621980},
                {dateTime: moment("02/13/2013 14:44", dateTimeFormat), queueSize: 153622, peopleBehind: 624807},
                {dateTime: moment("02/13/2013 16:36", dateTimeFormat), queueSize: 151396, peopleBehind: 628083},
                {dateTime: moment("02/13/2013 18:47", dateTimeFormat), queueSize: 148790, peopleBehind: 632355},
                {dateTime: moment("02/14/2013 00:26", dateTimeFormat), queueSize: 142091, peopleBehind: 643495},
                {dateTime: moment("02/14/2013 03:57", dateTimeFormat), queueSize: 137935, peopleBehind: 648400},
                {dateTime: moment("02/14/2013 09:07", dateTimeFormat), queueSize: 133098, peopleBehind: 654553},
                {dateTime: moment("02/14/2013 12:13", dateTimeFormat), queueSize: 129727, peopleBehind: 657520},
                {dateTime: moment("02/14/2013 16:17", dateTimeFormat), queueSize: 124646, peopleBehind: 662135},
                {dateTime: moment("02/14/2013 20:39", dateTimeFormat), queueSize: 121937, peopleBehind: 667006},
                {dateTime: moment("02/14/2013 21:25", dateTimeFormat), queueSize: 121937, peopleBehind: 667930},
                {dateTime: moment("02/14/2013 22:15", dateTimeFormat), queueSize: 121937, peopleBehind: 668950},
                {dateTime: moment("02/15/2013 11:35", dateTimeFormat), queueSize: 117876, peopleBehind: 679917},
                {dateTime: moment("02/15/2013 12:39", dateTimeFormat), queueSize: 117355, peopleBehind: 680612},
                {dateTime: moment("02/15/2013 14:17", dateTimeFormat), queueSize: 116548, peopleBehind: 682028},
                {dateTime: moment("02/15/2013 14:59", dateTimeFormat), queueSize: 116199, peopleBehind: 682733},
                {dateTime: moment("02/15/2013 18:25", dateTimeFormat), queueSize: 114503, peopleBehind: 686146},
                {dateTime: moment("02/15/2013 19:56", dateTimeFormat), queueSize: 113754, peopleBehind: 687483},
                {dateTime: moment("02/15/2013 21:27", dateTimeFormat), queueSize: 113002, peopleBehind: 688872},
                {dateTime: moment("02/15/2013 22:22", dateTimeFormat), queueSize: 112546, peopleBehind: 689646},
                {dateTime: moment("02/15/2013 23:34", dateTimeFormat), queueSize: 111958, peopleBehind: 690702},
                {dateTime: moment("02/16/2013 02:15", dateTimeFormat), queueSize: 110626, peopleBehind: 692599},
                {dateTime: moment("02/16/2013 03:00", dateTimeFormat), queueSize: 110258, peopleBehind: 693053},
                {dateTime: moment("02/16/2013 11:41", dateTimeFormat), queueSize: 105970, peopleBehind: 697984},
                {dateTime: moment("02/16/2013 16:29", dateTimeFormat), queueSize: 103596, peopleBehind: 701350},
                {dateTime: moment("02/16/2013 19:57", dateTimeFormat), queueSize: 101858, peopleBehind: 704534},
                {dateTime: moment("02/16/2013 22:47", dateTimeFormat), queueSize: 99999, peopleBehind: 706984},
                {dateTime: moment("02/17/2013 02:34", dateTimeFormat), queueSize: 97516, peopleBehind: 710917},
                {dateTime: moment("02/17/2013 13:47", dateTimeFormat), queueSize: 90165, peopleBehind: 719292},
                {dateTime: moment("02/17/2013 15:46", dateTimeFormat), queueSize: 88861, peopleBehind: 720895},
                {dateTime: moment("02/17/2013 19:51", dateTimeFormat), queueSize: 86185, peopleBehind: 725180},
                {dateTime: moment("02/17/2013 22:01", dateTimeFormat), queueSize: 84768, peopleBehind: 727402},
                {dateTime: moment("02/18/2013 12:14", dateTimeFormat), queueSize: 75446, peopleBehind: 737141},
                {dateTime: moment("02/18/2013 13:14", dateTimeFormat), queueSize: 74789, peopleBehind: 737698},
                {dateTime: moment("02/18/2013 14:10", dateTimeFormat), queueSize: 74173, peopleBehind: 738311},
                {dateTime: moment("02/18/2013 17:45", dateTimeFormat), queueSize: 71827, peopleBehind: 741221},
                {dateTime: moment("02/18/2013 19:31", dateTimeFormat), queueSize: 70630, peopleBehind: 742956},
                {dateTime: moment("02/18/2013 23:13", dateTimeFormat), queueSize: 67604, peopleBehind: 747032},
                {dateTime: moment("02/19/2013 00:19", dateTimeFormat), queueSize: 66696, peopleBehind: 748116},
                {dateTime: moment("02/19/2013 12:41", dateTimeFormat), queueSize: 56619, peopleBehind: 757348},
                {dateTime: moment("02/19/2013 16:16", dateTimeFormat), queueSize: 53697, peopleBehind: 760976},
                {dateTime: moment("02/19/2013 19:43", dateTimeFormat), queueSize: 50870, peopleBehind: 765251},
                {dateTime: moment("02/19/2013 22:05", dateTimeFormat), queueSize: 48948, peopleBehind: 767801},
                {dateTime: moment("02/20/2013 04:56", dateTimeFormat), queueSize: 43353, peopleBehind: 773765},
                {dateTime: moment("02/20/2013 14:23", dateTimeFormat), queueSize: 35707, peopleBehind: 780551},
                {dateTime: moment("02/20/2013 15:06", dateTimeFormat), queueSize: 35118, peopleBehind: 781112},
                {dateTime: moment("02/21/2013 02:40", dateTimeFormat), queueSize: 25687, peopleBehind: 789560}
            ],
            firstDataPoint = dataPoints[0],
            lastDataPoint = dataPoints[dataPoints.length - 1];

    $(document).ready(function () {
        calculateAdditionalData()
        renderChart();
        renderAdditionalData();

        chartPlaceholder.bind("plothover", function (event, pos, item) {
            onPlotHover(pos, item);
        });
    });

    function calculateAdditionalData() {
        calculatedData.fillRate = calculateFillRate(dataPoints.length - 1);
        calculatedData.timeToWait = lastDataPoint.queueSize / calculatedData.fillRate;
        calculatedData.accessMoment = moment().add('hours', calculatedData.timeToWait);
    }

    function calculateFillRate(index) {
        var previous = dataPoints[index - 1];
        var actual = dataPoints[index];

        var dateTimeDiff = previous.dateTime.diff(actual.dateTime) / -3600000;
        var queueSizeDiff = previous.queueSize - actual.queueSize;

        return queueSizeDiff / dateTimeDiff;
    }

    function renderChart() {
        var data = [
//            {
//                data: generatePeopleBehindRateData(),
//                label: "people behind increasing rate",
//                yaxis: 3
//            },
//            {
//                data: generatePeopleBehindDataPoints(),
//                label: "people behind"
//            },
            {
                data: generateFillRateData(),
                label: " Fill Rate",
                yaxis: 2
            },
            {
                data: generateChartDataFromDataPoints(),
                label: " Queue Size"
            },
            {
                data: [
                    [calculatedData.accessMoment, 0]
                ],
                label: " Access Date"
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
            colors: [
//                "#BBBBBB",
//                "#666666",
                "#00FF00",
                "#3FBAD8",
                "#ff5454"
            ],
            xaxis: {
                mode: "time",
                tickFormatter: function (val, axis) {
                    var momentValue = moment(val);
                    return momentValue.format("MM.DD");
                }
            },
            yaxis: {ticks: 5, tickDecimals: 0}
        };
        $.plot(chartPlaceholder, data, options);
    }

    function calculatePeopleBehindFillRate(index) {
        var actual = dataPoints[index];
        var previous = dataPoints[index - 1];

        if (previous.peopleBehind == undefined) {
            for (var i = index - 1; i >= 0; i--) {
                if (dataPoints[i].peopleBehind !== undefined) {
                    previous = dataPoints[i];
                }
            }
        }

        var dateTimeDiff = previous.dateTime.diff(actual.dateTime) / -3600000;
        var peopleBehindDiff = actual.peopleBehind - previous.peopleBehind;

        return peopleBehindDiff / dateTimeDiff;
    }

    function generatePeopleBehindRateData() {
        var series = [];

        $.each(dataPoints, function (index, dataPoint) {
            if (dataPoint.peopleBehind !== undefined) {
                if (index > 0) {
                    var dateTime = dataPoint.dateTime;
                    var fillRate = calculatePeopleBehindFillRate(index);
                    series.push([dateTime, fillRate]);
                } else {
                    series.push([dataPoint.dateTime, 0]);
                }
            }
        });

        return series;
    }

    function generatePeopleBehindDataPoints() {
        var series = [];

        $.each(dataPoints, function (index, dataPoint) {
            var dateTime = dataPoint.dateTime,
                    peopleBehind = dataPoint.peopleBehind;
            if (peopleBehind !== undefined) {
                series.push([dateTime, peopleBehind]);
            }
        });

        return series;
    }

    function generateChartDataFromDataPoints() {
        var series = [];
        $.each(dataPoints, function (index, dataPoint) {
            var dateTime = dataPoint.dateTime,
                    queueSize = dataPoint.queueSize;

            series.push([dateTime, queueSize]);
        });

        return series;
    }

    function generateFillRateData() {
        var series = [];

        $.each(dataPoints, function (index, dataPoint) {
            if (index > 0) {
                var dateTime = dataPoint.dateTime;
                var fillRate = calculateFillRate(index);
                series.push([dateTime, fillRate]);
            } else {
                series.push([dataPoint.dateTime, 0]);
            }
        });

        return series;
    }

    function renderAdditionalData() {
        renderEstAccessTime();
        renderTimeToWait();
        renderDecreasingRate();
        renderWaitedSince();
    }

    function renderEstAccessTime() {
        renderDataToChartWrapper("est. access time: ",
                                 calculatedData.accessMoment.format('MMMM Do YYYY, h:mm a'));
    }

    function renderTimeToWait() {
        renderDataToChartWrapper("get access ", calculatedData.accessMoment.fromNow())
    }

    function renderDecreasingRate() {
        renderDataToChartWrapper("fill rate: ", calculatedData.fillRate.toFixed(2) + "/h")
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

    function showToolTipAtItem(item) {
        var dataIndex = item.dataIndex;
        if (previousPoint != dataIndex) {
            previousPoint = dataIndex;

            $("#tooltip").remove();
            var x = item.datapoint[0],
                    y = item.datapoint[1].toFixed(2);

            var point = {
                x: item.pageX,
                y: item.pageY
            };

            renderToolTipAtPointsWithText(point,
                                          moment(x).format("ddd, MMM Do, h:mm") + ", qs = " + y);
        }
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

    function hideToolTip() {
        $("#tooltip").remove();
        previousPoint = null;
    }
})(jQuery);
