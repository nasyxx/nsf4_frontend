let domain_question
function read_data(question_data) {
    let dd = []
    let ll = question_data.length

    for (let i = 0; i < ll; i++) {
        let d = [question_data[i].x, question_data[i].y, question_data[i].question, question_data[i].catagory,question_data[i].source];
        dd.push(d);
        domain_question= dd
    }

}



function load_visualize (){
    if (document.getElementById("Domain").value === "wqb") {
        read_data(bert)
    }else if (document.getElementById("Domain").value === "adqb"){
        read_data(bow)
    }else if(document.getElementById("Domain").value === "wqg"){
        read_data(glove)
    }else if(document.getElementById("Domain").value === "adqt"){
        read_data(tfidf)
    }

    option = {
        title: {
            text: 'Question category(color) visualize',
            subtext: '',
            left: 'center'
        },

        tooltip: {
            // trigger: 'axis',
            showDelay: 0,
            formatter: function (params) {

                return '<div class="tool_div">' + params.seriesName + ' :<br/>' + params.value[2] + ' ?<br/>'
                    + 'category number: ' + params.value[3] + '<br/>' + 'source: ' + params.value[4]+'</div>'

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
                data: domain_question,
                symbol: function (domain_question,params) {
                    let symbol
                    switch (params.value[4]){
                        case 'wq':
                            symbol = 'rect'
                            break
                        case 'fire':
                            symbol = 'circle'
                            break
                        case 'bio':
                            symbol = 'pin'
                            break
                        case 'gis':
                            symbol = 'triangle'
                            break

                    }
                    return symbol

                },
                itemStyle: {
                    color: function(params){
                        let color
                        switch(params.value[3]){
                            case 0:
                                color = "yellow"
                                break
                            case 1:
                                color = "green"
                                break
                            case 2:
                                color = "blue"
                                break
                            case 3:
                                color = "orange"
                                break
                            case 4:
                                color = "grey"
                                break
                            case 5:
                                color = "red"
                                break
                            case 6:
                                color = "Aquamarine"
                                break
                            case 7:
                                color = "purple"
                                break
                            case 8:
                                color = "fuchsia"
                                break
                            case 9:
                                color = "maroon"
                                break
                        }
                        return color
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
                        name: 'Triangle: gis; Rect: wq; Circle: fire; Pin: bio',
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
    }
    const dom = document.getElementById("chart")
    const myChart = echarts.init(dom)

    if (option && typeof option === "object") {
        myChart.setOption(option, true)
    }
    myChart.on('click', function (params) {
        let chartData =  params.value[2]
        document.getElementById('q').value = chartData
        search()
    })


}
