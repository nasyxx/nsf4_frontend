let bio_question
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
        bio_question = b_bio
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
            text: 'Interactive Question Category Visualization',
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
            itemSize: 20,
            iconStyle:{
                color:'',
                borderColor: 'grey',
                borderWidth: 3,
            },
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
                type: 'select',
                xAxisIndex: 0,
                start: 0,
                end: 100
            },

            {
                type: 'select',
                yAxisIndex: 0,
                start: 0,
                end: 100
            },

        ],
        color:['black','black','black','black','#F75000','green','blue','orange','grey',"#AE0000",'#336666','purple','fuchsia','maroon'],
        legend: {
            data: ['Water Quality', 'Wild Land Fire','Biodiversity','Geographic information system','Data Representation','Decision Support Systems','WQ Contaminants','Results Visualization','GIS Granularity','Remote Sensing','Measurement','Data Modeling','Impacts Analysis','Conservation Planning'],
            top: "8%",
            right: "1%",
            orient: 'vertical',
            type: 'scroll',
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
                symbol: 'path://M505.668923 74.919385c-17.142154 19.282708-34.282338 44.994954-100.688738 149.962831-32.143754 53.5552-59.984738 102.829292-85.698954 152.103385-49.274092 96.407631-98.548185 227.089723-98.548185 310.636308 2.140554 72.847754 29.993354 134.973046 85.698954 186.387692C364.266338 925.426215 430.682585 951.138462 509.950031 951.138462s147.822277-25.712246 203.52-79.267446c57.844185-53.565046 85.698954-115.688369 83.5584-188.526277C797.026462 462.684554 503.518523 72.778831 505.668923 74.919385z',
                itemStyle: {
                    color: function (params) {
                        let color
                        switch (params.value[3]) {
                            case 0:
                                color = "#F75000"
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
                name: 'Wild Land Fire',
                type: 'scatter',
                data: fire_data,
                symbol: 'path://M813.791929 239.816924c-126.014018 35.014468-149.063991 134.312008-140.930753 197.410092-89.868797-102.998839-86.187965-221.481324-86.187965-392.173914C298.468231 151.023622 365.467157 456.500988 356.824313 549.252439c-72.470545-57.847499-86.148056-196.061374-86.148056-196.061374-76.556607 38.387285-114.927519 140.912333-114.927519 224.089731 0 201.091948 167.227676 364.145557 373.482203 364.145557 206.253504 0 373.48118-163.05361 373.48118-364.145557C902.711098 457.758632 812.695968 402.612661 813.791929 239.816924z',
                itemStyle: {
                    color: function (params) {
                        let color
                        switch (params.value[3]) {
                            case 0:
                                color = "#F75000"
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
                name: 'Biodiversity',
                type: 'scatter',
                data: bio_question,
                symbol: 'path://M953.291948 10.594692a87.521368 87.521368 0 0 0-52.973459 3.454791A81.763383 81.763383 0 0 0 875.213675 2.533513a100.879892 100.879892 0 0 0-89.363922 25.104814 191.625731 191.625731 0 0 0-59.192083 99.267656 207.287449 207.287449 0 0 0-6.218624 62.186235c-121.608637 13.819163-373.578048 49.979307-473.997301 89.824561A400.295097 400.295097 0 0 0 12.206928 550.693657a380.717949 380.717949 0 0 0 76.466036 339.03014l3.454791-3.454791a437.606838 437.606838 0 0 1-51.821862-83.836257C78.078273 852.181736 143.719298 908.149348 210.97256 909.761583v111.474584h378.875393v-58.731444h-1.151597a195.541161 195.541161 0 0 0-115.159694-39.614934v-15.892038a208.899685 208.899685 0 0 0 37.311741-56.42825 444.2861 444.2861 0 0 0 52.282501-33.165992l19.807468-14.740441 96.273504 219.494377v1.842555h99.497976v-66.792623l-44.912281-40.996851v-104.104363l168.363473 207.287449h92.127755v-64.489428L937.169591 921.277553l-127.596941-256.11516v-50.670265c20.959064-21.419703 74.393162-84.296896 87.982006-134.506523 12.206928-2.072874 92.127755-15.431399 127.596941-24.183536a253.351327 253.351327 0 0 0 105.025641-51.361223l7.139901-8.521818a85.448493 85.448493 0 0 0 5.757985-102.722447 526.279802 526.279802 0 0 0-112.395862-126.445344V123.220873c-4.606388-57.579847-35.008547-101.80117-77.387314-112.626181z',
                itemStyle: {
                    color: function (params) {
                        let color
                        switch (params.value[3]) {
                            case 0:
                                color = "#F75000"
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
                name: 'Geographic information system',
                type: 'scatter',
                data: gis_data,
                symbol: 'path://M897.1 126.1L126.9 446.3l318.7 132.9 126.8 318.7 324.7-771.8',
                itemStyle: {
                    color: function (params) {
                        let color
                        switch (params.value[3]) {
                            case 0:
                                color = "#F75000"
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
                name:'Data Representation',
                type: 'scatter',
                symbol:'circle'
            },{
                name:'Decision Support Systems',
                type: 'scatter',
                symbol:'circle'
            },{
                name:'WQ Contaminants',
                type: 'scatter',
                symbol:'circle'
            },{
                name:'Results Visualization',
                type: 'scatter',
                symbol:'circle'
            },{
                name:'GIS Granularity',
                type: 'scatter',
                symbol:'circle'
            },{
                name:'Remote Sensing',
                type: 'scatter',
                symbol:'circle'
            },{
                name:'Measurement',
                type: 'scatter',
                symbol:'circle'
            },{
                name:'Data Modeling',
                type: 'scatter',
                symbol:'circle'
            },{
                name:'Impacts Analysis',
                type: 'scatter',
                symbol:'circle'
            },{
                name:'Conservation Planning',
                type: 'scatter',
                symbol:'circle'
            }

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
