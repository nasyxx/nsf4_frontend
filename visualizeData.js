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