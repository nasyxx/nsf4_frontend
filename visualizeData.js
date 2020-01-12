var dom = document.getElementById("chart");
var myChart = echarts.init(dom);
var app = {};
option = null;
option = {
    title: {
        text: 'Question category visualize',
        subtext: 'From Wenbo',
        left: 'center'
    },

    tooltip: {
        // trigger: 'axis',
        showDelay: 0,
        formatter: function (params) {
            return params.seriesName + ' :<br/>'
                + params.value[2] + ' ?<br/>'
                + 'x: ' + params.value[0]  + ' ' + 'y: ' + params.value[1] + '<br/>'
                + 'category number: ' + params.value[3] ;

        },
        axisPointer: {
            show: true,
            type: 'cross',
            lineStyle: {
                type: 'dashed',
                width: 1
            }
        }
    },
    toolbox: {
        feature: {
            dataZoom: {},
            brush: {
                type: ['rect', 'polygon', 'clear']
            }
        }
    },
    brush: {
    },
    dataZoom: [
        {
            type: 'slider',
            xAxisIndex: 0,
            start: 0,
            end: 100
        },

        {
            type: 'slider',
            yAxisIndex: 0,
            start: 0,
            end: 100
        },

    ],
    xAxis: [
        {
            type: 'value',
            scale: true,
            axisLabel: {
                formatter: '{value}'
            },
            splitLine: {
                show: false
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            scale: true,
            axisLabel: {
                formatter: '{value}'
            },
            splitLine: {
                show: false
            }
        }
    ],
    series: [
        {
            name: 'question',
            type: 'scatter',
            data: dd,
            itemStyle: {
                color: function(params){
                    let color;
                    switch(params.value[3]){
                        case 0:
                            color = "yellow";
                            break;
                        case 1:
                            color = "green";
                            break;
                        case 2:
                            color = "blue";
                            break;
                        case 3:
                            color = "orange";
                            break;
                        case 4:
                            color = "grey";
                            break;
                        case 5:
                            color = "red";
                            break;
                        case 6:
                            color = "Aquamarine";
                            break;
                        case 7:
                            color = "purple";
                            break;
                        case 8:
                            color = "fuchsia";
                            break;
                        case 9:
                            color = "maroon";
                            break;
                    }
                    return color;
                }
            },
            markArea: {
                silent: true,
                itemStyle: {
                    color: 'transparent',
                    borderWidth: 1,
                    borderType: 'dashed'
                },
                data: [[{
                    name: 'Question category',
                    xAxis: 'min',
                    yAxis: 'min'
                }, {
                    xAxis: 'max',
                    yAxis: 'max'
                }]]
            },

            markPoint: {
                data: [
                    {type: 'max', name: 'maxValue'},
                    {type: 'min', name: 'miniValue'}
                ]
            },

        },

    ]
};
;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}
myChart.on('click', function (params) {
    let chartData =  params.value[2];
    document.getElementById('q').value = chartData;
    search();
});