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
                borderColor: 'red',
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
            data: ['Water Quality', 'Wild File','BIO','GIS','Data Representation','Decision Support Systems','WQ Contaminants','Results Visualization','GIS Granularity','Remote Sensing','Measurement','Data Modeling','Impacts Analysis','Conservation Planning'],
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
                symbol: 'path://M512 954.181818c168.494545 0 302.545455-152.622545 302.545455-338.059636 0-120.692364-88.901818-294.260364-265.402182-527.825455L512 39.144727l-37.143273 49.152C298.356364 321.861818 209.454545 495.429818 209.454545 616.122182 209.454545 801.512727 343.505455 954.181818 512 954.181818z m209.454545-338.059636c0 136.517818-95.232 244.968727-209.454545 244.968727s-209.454545-108.450909-209.454545-244.968727c0-86.621091 69.445818-229.003636 209.454545-421.608727 140.008727 192.605091 209.454545 334.987636 209.454545 421.608727z',
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
                name: 'Wild File',
                type: 'scatter',
                data: fire_data,
                symbol: 'path://M418.048 950.08c-48.704-28.864-83.584-79.616-85.568-139.328C329.6 699.2 407.104 644.48 452.992 569.728c65.664-107.52 47.744-174.208 47.744-174.208S555.52 426.368 587.392 540.864c9.92 33.856 11.968 67.776 8.96 99.648-4.928 80.64-39.808 153.28-39.808 153.28s60.736-12.928 77.632-123.456c27.968 28.864 53.824 70.656 56.768 114.496 4.992 75.712-39.744 145.344-107.52 175.168 117.312-26.88 201.152-126.4 230.016-199.104 36.8-91.52 26.88-173.184 20.864-243.904-7.936-96.512 25.856-168.256 25.856-168.256s-64.704 18.944-112.512 97.536C725.76 482.176 716.8 534.848 716.8 534.848s4.992-46.72-25.92-132.352c-30.784-83.648-58.752-113.472-75.712-175.168C593.344 144.64 642.048 64 642.048 64S449.024 99.904 361.344 268.096C283.712 417.408 315.584 507.072 315.584 507.072S282.688 476.16 265.792 433.344 252.672 351.744 252.672 351.744 115.456 503.04 182.208 693.248C227.008 826.624 313.536 914.24 418.048 950.08z',
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
                name: 'BIO',
                type: 'scatter',
                data: bio_question,
                symbol: 'path://M511.998465 310.976614c0-36.988426 30.011524-66.912969 67.044976-66.912969 36.988426 0 67.000973 29.92352 67.000973 66.912969 0 36.990472-30.011524 67.044976-67.000973 67.044976C542.009989 378.021589 511.998465 347.96811 511.998465 310.976614zM266.376325 378.021589c-36.989449 0-67.043952 30.009478-67.043952 66.998927 0 36.990472 30.05348 67.044976 67.043952 67.044976 36.988426 0 66.912969-30.05348 66.912969-67.044976C333.289294 408.031067 303.365774 378.021589 266.376325 378.021589zM400.288221 378.021589c37.032428 0 67.043952-30.05348 67.043952-67.044976 0-36.988426-30.010501-66.912969-67.043952-66.912969-36.989449 0-66.99995 29.92352-66.99995 66.912969C333.289294 347.96811 363.298771 378.021589 400.288221 378.021589zM958.709483 244.064668l0 535.9996c0 98.625228-80.000032 178.581258-178.75522 178.581258L243.999688 958.645526c-98.624205 0-178.710194-79.95603-178.710194-178.581258L65.289494 244.064668c0-98.711186 80.08599-178.709171 178.710194-178.709171l535.955598 0C878.709451 65.355497 958.709483 145.353482 958.709483 244.064668zM869.287871 288.731984c0-74.023924-59.932997-134.086881-133.954875-134.086881L288.621978 154.645103c-73.978898 0-133.911896 60.062957-133.911896 134.086881l0 446.665992c0 73.979922 59.932997 133.956921 133.911896 133.956921l446.711018 0c74.021877 0 133.954875-59.977 133.954875-133.956921L869.287871 288.731984zM757.709633 333.35325c-37.07643 0-67.000973 30.055526-67.000973 67.044976s29.92352 66.998927 67.000973 66.998927c36.988426 0 66.912969-30.009478 66.912969-66.998927S794.699082 333.35325 757.709633 333.35325zM511.998465 422.642856c-98.623181 0-178.709171 70.098521-178.709171 156.334581 0 86.367043 80.08599 156.419516 178.709171 156.419516 98.713232 0 178.711218-70.052472 178.711218-156.419516C690.709683 492.741377 610.711697 422.642856 511.998465 422.642856z',
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
                name: 'GIS',
                type: 'scatter',
                data: gis_data,
                symbol: 'path://M872.3 359.8c-19.7-46.6-47.9-88.4-83.8-124.3-35.9-35.9-77.7-64.1-124.3-83.8C616 131.3 564.8 121 512 121s-104 10.3-152.2 30.7c-46.6 19.7-88.4 47.9-124.3 83.8s-64.1 77.7-83.8 124.3C131.3 408 121 459.2 121 512s10.3 104 30.7 152.2c19.7 46.6 47.9 88.4 83.8 124.3 35.9 35.9 77.7 64.1 124.3 83.8C408 892.7 459.2 903 512 903s104-10.3 152.2-30.7c46.6-19.7 88.4-47.9 124.3-83.8 35.9-35.9 64.1-77.7 83.8-124.3C892.7 616 903 564.8 903 512s-10.3-104-30.7-152.2z m-345-0.8c45.7-1.2 90.9-7.9 134.6-19.7 0.8-0.2 1.6 0.2 1.8 1 16.6 50 26 102.5 27.6 155.9 0 0.8-0.7 1.5-1.5 1.5H527.3c-0.8 0-1.5-0.7-1.5-1.5V360.5c0-0.8 0.6-1.4 1.5-1.5z m-1.5-30V165.6c0-0.9 0.7-1.5 1.6-1.5 13.9 0.6 27.6 2 41.1 4.2 0.4 0.1 0.7 0.3 0.9 0.5 35.1 43 63.1 90.8 83.4 141.6 0.3 0.8-0.1 1.8-1 2-40.4 10.7-82.2 16.8-124.4 18-0.9 0.1-1.6-0.5-1.6-1.4z m-30 1.5c-41.9-1.2-83.3-7.3-123.4-18-0.9-0.2-1.3-1.2-1-2 20.3-50.9 48.3-98.7 83.3-141.7 0.2-0.3 0.6-0.5 0.9-0.5 13.2-2.2 26.6-3.6 40.2-4.2 0.9 0 1.6 0.6 1.6 1.5V329c-0.1 0.8-0.8 1.5-1.6 1.5z m1.5 30v135.8c0 0.8-0.7 1.5-1.5 1.5H334.3c-0.8 0-1.5-0.7-1.5-1.5 1.6-53.3 11-105.8 27.6-155.9 0.3-0.8 1-1.2 1.8-1 43.4 11.8 88.3 18.4 133.6 19.7 0.9-0.1 1.5 0.6 1.5 1.4zM302.8 497.7H165.6c-0.9 0-1.5-0.7-1.5-1.6 3.5-76.9 32-147.3 77.5-203.4 0.5-0.6 1.2-0.7 1.9-0.4 28.4 15.1 58 27.8 88.5 37.9 0.8 0.3 1.2 1.1 0.9 1.9-17.5 52.9-27.1 108-28.7 164.2 0 0.8-0.6 1.4-1.4 1.4z m1.4 30c1.5 56.2 11.1 111.3 28.7 164.2 0.3 0.8-0.2 1.6-0.9 1.9-30.5 10.1-60.1 22.7-88.5 37.9-0.6 0.3-1.4 0.2-1.9-0.4-45.6-56.1-74.1-126.5-77.5-203.4 0-0.9 0.6-1.6 1.5-1.6h137.1c0.9 0 1.5 0.6 1.5 1.4z m30.1-1.4h161.5c0.8 0 1.5 0.7 1.5 1.5v135.8c0 0.8-0.6 1.5-1.5 1.5-45.4 1.3-90.3 7.9-133.7 19.7-0.8 0.2-1.6-0.2-1.8-1-16.6-50-26-102.5-27.6-155.9 0-0.9 0.7-1.6 1.6-1.6z m163 168.7v163.4c0 0.9-0.7 1.5-1.6 1.5-13.6-0.6-27-2-40.2-4.2-0.4-0.1-0.7-0.3-0.9-0.5-35-43-63-90.8-83.3-141.6-0.3-0.8 0.1-1.8 1-2 40.2-10.7 81.6-16.7 123.5-18 0.8-0.1 1.5 0.6 1.5 1.4z m30-1.5c42.2 1.2 83.9 7.3 124.4 18 0.9 0.2 1.3 1.2 1 2-20.3 50.8-48.3 98.6-83.4 141.6-0.2 0.3-0.6 0.5-0.9 0.5-13.5 2.2-27.2 3.6-41.1 4.2-0.9 0-1.6-0.6-1.6-1.5V695c0.1-0.9 0.8-1.5 1.6-1.5z m-1.5-30V527.7c0-0.8 0.7-1.5 1.5-1.5h162.4c0.8 0 1.5 0.7 1.5 1.5a539.9 539.9 0 0 1-27.6 155.9c-0.3 0.8-1 1.2-1.8 1-43.7-11.8-88.9-18.5-134.6-19.7-0.8 0-1.4-0.6-1.4-1.4z m195.4-137.2h137.1c0.9 0 1.5 0.7 1.5 1.6-3.5 76.9-31.9 147.3-77.5 203.4-0.5 0.6-1.2 0.7-1.9 0.4-28.4-15.1-58-27.8-88.5-37.8-0.8-0.3-1.2-1.1-0.9-1.9 17.5-52.9 27.1-108 28.7-164.2 0.1-0.9 0.7-1.5 1.5-1.5z m-1.4-30c-1.5-56.2-11.1-111.3-28.6-164.2-0.3-0.8 0.2-1.6 0.9-1.9 30.4-10.1 60-22.7 88.5-37.9 0.6-0.3 1.4-0.2 1.9 0.4 45.6 56.1 74.1 126.5 77.5 203.4 0 0.9-0.6 1.6-1.5 1.6H721.2c-0.8 0-1.4-0.6-1.4-1.4z m40.5-225.5c-25.1 12.9-51.2 23.8-78 32.7-0.8 0.2-1.6-0.1-1.9-0.9-16.8-42.7-38.6-83-65-120.4-0.8-1.2 0.3-2.7 1.7-2.3 55 17.4 104.2 48.2 143.6 88.5 0.7 0.7 0.5 1.9-0.4 2.4z m-351.7-88.6c-26.5 37.4-48.2 77.7-65 120.4-0.3 0.7-1.1 1.1-1.9 0.9-26.8-8.8-52.9-19.7-78-32.6-0.9-0.5-1.1-1.7-0.4-2.4 39.5-40.3 88.6-71 143.6-88.5 1.4-0.5 2.6 1.1 1.7 2.2z m-144.9 571c25.1-12.9 51.2-23.8 78-32.7 0.8-0.2 1.6 0.1 1.9 0.9 16.8 42.7 38.6 83 65 120.4 0.8 1.2-0.3 2.7-1.7 2.3-55-17.4-104.2-48.2-143.6-88.5-0.7-0.7-0.5-2 0.4-2.4z m351.7 88.6c26.4-37.3 48.2-77.6 65-120.3 0.3-0.7 1.1-1.1 1.9-0.9 26.8 8.8 52.9 19.7 78 32.6 0.9 0.5 1.1 1.7 0.4 2.4-39.5 40.3-88.6 71-143.6 88.5-1.4 0.4-2.5-1.2-1.7-2.3z',
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
