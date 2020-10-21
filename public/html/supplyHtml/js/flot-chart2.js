var Script = function () {

    //morris chart

    $(function () {

      // e-chart
      var myChart1 = echarts.init(document.getElementById('echart1'));

      // 指定图表的配置项和数据
      var option1 = {
        title: {
            // text: '日用气量趋势图'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data:['管存量']
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '6%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                name : '小时',
                type : 'category',
                boundaryGap : false,
                data : ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24']
            }
        ],
        yAxis : [
            {
                name : '管存量(万Nm3)',
                type : 'value',
                min: function(value) {
                      return value.min - (value.min*0.1);
                  }
            }
        ],
        series : [
            {
                name:'管存量',
                type:'line',
                stack: '总量2',
                // areaStyle: {},
                data:[48.8000, 49.4000, 50.1000, 51.1000, 50.7000, 61.0000, 60.7000, 62.0000, 64.5000, 63.6000, 63.7000, 63.5000, 62.0000, 61.5000, 62.0000, 60.6000, 60.3000, 62.0000, 59.3000, 59.2000, 58.9000, 58.9000, 58.7000, 48.7000],
                smooth: true,
            }
        ]
    };

   

      // 使用刚指定的配置项和数据显示图表。
      myChart1.setOption(option1);
    });

}();




