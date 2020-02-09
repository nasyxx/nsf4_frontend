let bio_data
let wq_data
let fire_data
let gis_data
function read_data(question_data) {
    let b_wq = []
    let b_fire = []
    let b_bio = []
    let b_gis = []
    let ll = question_data.length

    for (let i = 0; i < ll; i++) {
        let d = [question_data[i].x, question_data[i].y, question_data[i].question, question_data[i].catagory,question_data[i].source];
        switch (d[4]){
            case 'wq':
                b_wq.push(d)
                break
            case 'fire':
                b_fire.push(d)
                break
            case 'bio':
                b_bio.push(d)
                break
            case 'gis':
                b_gis.push(d)
                break
        }
        bio_data = b_bio
        wq_data = b_wq
        fire_data = b_fire
        gis_data = b_gis
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

    let option = {
        title: {
            text: 'Question category(color) visualize',
            subtext: 'FROM NJIT TEAM',
            left: 'center'
        },

        tooltip: {
            // trigger: 'axis',
            showDelay: 0,
            formatter: function (params) {

                return '<div class="tool_div">' + params.seriesName + ' :<br/>' + params.value[2] + '<br/>'
                    + 'category number: ' + params.value[3] + '<br/>' + '</div>'

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
        brush: {},
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
        color:['#F75000','#F75000','#F75000','#F75000'],
        legend: {
            data: ['Water Quality', 'Wild File','BIO','GIS'],
            top: "10%",
            right: "6%",

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
                name: 'Water Quality',
                type: 'scatter',
                data: wq_data,
                symbol: 'rect',
                itemStyle: {
                    color: function (params) {
                        let color
                        switch (params.value[3]) {
                            case 0:
                                color = "black"
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
                                color = "#AE0000"
                                break
                            case 6:
                                color = '#336666'
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
            },{
                name: 'Wild File',
                type: 'scatter',
                data: fire_data,
                symbol: 'circle',
                itemStyle: {
                    color: function (params) {
                        let color
                        switch (params.value[3]) {
                            case 0:
                                color = "black"
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
                                color = "#AE0000"
                                break
                            case 6:
                                color = '#336666'
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
            },{
                name: 'BIO',
                type: 'scatter',
                data: bio_data,
                symbol: 'diamond',
                itemStyle: {
                    color: function (params) {
                        let color
                        switch (params.value[3]) {
                            case 0:
                                color = "black"
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
                                color = "#AE0000"
                                break
                            case 6:
                                color = '#336666'
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
            },{
                name: 'GIS',
                type: 'scatter',
                data: gis_data,
                symbol: 'triangle',
                itemStyle: {
                    color: function (params) {
                        let color
                        switch (params.value[3]) {
                            case 0:
                                color = "black"
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
                                color = "#AE0000"
                                break
                            case 6:
                                color = '#336666'
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
