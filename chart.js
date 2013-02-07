/*global $:false */
"use strict";
$(document).ready(function () {
    $.plot($("#chart"), [
        [
            [0, 0],
            [1, 1]
        ]
    ], { yaxis: { max: 1 } });
});


/**
 * $.plot($("#stats-chart2"),
 [
 { data: visits, label: "Visits"},
 { data: pageviews, label: "Pageviews"},
 { data: visitors, label: "Visitors" },
 { data: newVisitors, label: "New Visitors"}
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
                              grid: { hoverable: true,
                                  clickable: true,
                                  tickColor: "#f9f9f9",
                                  borderWidth: 0
                              },
                              legend: {
                                  show: false
                              },
                              colors: ["#bdea74", "#eae874", "#2FABE9", "#FA5833"],
                              xaxis: {ticks: 15, tickDecimals: 0},
                              yaxis: {ticks: 5, tickDecimals: 0}
                          });

 function showTooltip(x, y, contents) {
            $('<div id="tooltip">' + contents + '</div>').css({
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
 $("#stats-chart2").bind("plothover", function (event, pos, item) {
            $("#x").text(pos.x.toFixed(2));
            $("#y").text(pos.y.toFixed(2));

            if (item) {
                if (previousPoint != item.dataIndex) {
                    previousPoint = item.dataIndex;

                    $("#tooltip").remove();
                    var x = item.datapoint[0].toFixed(2),
                            y = item.datapoint[1].toFixed(2);

                    showTooltip(item.pageX, item.pageY,
                                item.series.label + " of " + x + " = " + y);
                }
            }
            else {
                $("#tooltip").remove();
                previousPoint = null;
            }
        });
 **/