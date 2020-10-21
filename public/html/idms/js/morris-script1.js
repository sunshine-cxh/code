var Script = function () {

    //morris chart

    $(function () {

      // e-chart
      var myChart1 = echarts.init(document.getElementById('echart1'));
      var myChart2 = echarts.init(document.getElementById('echart2'));
      var myChart3 = echarts.init(document.getElementById('echart3'));

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
            data:['上月同期','上周同期','昨日每小时用气量','今日每小时用气量']
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
                name : '用气量(万Nm³)',
                type : 'value',
                min: function(value) {
                      return value.min - (value.min*0.1);
                  }
            }
        ],
        series : [
            {
                name:'今日每小时用气量',
                type:'line',
                stack: '总量1',
                // areaStyle: {},
                data:[49.0000, 50.0000, 50.1000, 51.1000, 50.7000, 61.0000, 61.5000, 61.5000, 65.5000, 64.5000, 64.0000, 64.0000, 61.5000, 62.5000, 63.5,61],
                smooth: true,
            },
            {
                name:'昨日每小时用气量',
                type:'line',
                stack: '总量2',
                // areaStyle: {},
                data:[48.8000, 49.4000, 50.1000, 51.1000, 50.7000, 61.0000, 60.7000, 62.0000, 64.5000, 63.6000, 63.7000, 63.5000, 62.0000, 61.5000, 62.0000, 60.6000, 60.3000, 62.0000, 59.3000, 59.2000, 58.9000, 58.9000, 58.7000, 48.7000],
                smooth: true,
            },
            {
                name:'上周同期',
                type:'line',
                stack: '总量3',
                // areaStyle: {},
                data:[47.8000, 48.4000, 51.1000, 52.1000, 51.7000, 60.0000, 61.7000, 64.0000, 64.5000, 62.6000, 61.7000, 62.5000, 61.0000, 60.5000, 65.0000, 64.6000, 62.3000, 61.0000, 60.3000, 58.2000, 56.9000, 57.9000, 59.7000, 49.7000],
                smooth: true,
            },
            {
              name:'上月同期',
              type:'line',
              stack: '总量4',
              // areaStyle: {normal: {}},
              data:[45.8000, 46.4000, 47.1000, 48.1000, 48.7000, 58.0000, 57.7000, 59.0000, 61.5000, 60.6000, 60.7000, 61.5000, 61.8000, 60.9900, 60.0000, 58.6000, 58.3000, 60.0000, 57.3000, 57.2000, 56.9000, 56.9000, 56.7000, 46.7000],
              smooth: true,
          },
        ]
    };

    // option2
    var option2 = {
      title: {
          // text: '月用气量趋势图'
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
          data:['本月每日用气量','上月每日用气量','去年同期']
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
              name : '日期',
              type : 'category',
              boundaryGap : false,
              data : ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24', '25', '26', '27', '28', '29', '30', '31']
          }
      ],
      yAxis : [
          {   
              name : '用气量(万Nm³)',
              type : 'value',
              min: function(value) {
                    return value.min - (value.min*0.1);
                }
          }
      ],
      series : [
          {
              name:'本月每日用气量',
              type:'line',
              stack: '总量1',
              // areaStyle: {},
              data:[1621, 1600, 1658],
              smooth: true,
          },
          {
              name:'上月每日用气量',
              type:'line',
              stack: '总量2',
              // areaStyle: {},
              data:[1433,1421, 1466, 1399, 1358, 1433, 1466, 1352, 1342, 1400, 1354, 1422, 1400, 1387, 1367, 1399, 1388, 1389, 1403, 1405, 1445, 1578, 1589, 1600, 1621, 1609, 1603, 1589, 1586, 1602, 1610],
              smooth: true,
          },
          {
            name:'去年同期',
            type:'line',
            stack: '总量3',
            // areaStyle: {normal: {}},
            data:[1300, 1310, 1320, 1300, 1290, 1311, 1299, 1280, 1285, 1277, 1267, 1268, 1299, 1290, 1289, 1267, 1260, 1265, 1255, 1257, 1280, 1279, 1280, 1276, 1269, 1277, 1280, 1301,1290, 1289, 1288],
            smooth: true,
        },
      ]
  };

  // option3
  var option3 = {
    title: {
        // text: '年用气量趋势图'
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
        data:['本年每月用气量','去年每月用气量','前年每月用气量']
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
            name : '月份',
            type : 'category',
            boundaryGap : false,
            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月',]
        }
    ],
    yAxis : [
        {
            name : '用气量(万Nm³)',
            type : 'value',
            min: function(value) {
                    return value.min - (value.min*0.1);
                }
        }
    ],
    series : [
        {
            name:'本年每月用气量',
            type:'line',
            stack: '总量1',
            // areaStyle: {},
            data:[4469.3391],
            smooth: true,
        },
        {
            name:'去年每月用气量',
            type:'line',
            stack: '总量2',
            // areaStyle: {},
            data:[40011.1584, 39322.1674, 14257.8732, 5734.5531, 4563.2111, 4532.2118, 4467.3456, 4356.2721, 4234.7618, 5673.2342, 6743.9531, 39011.1584],
            smooth: true,
        },
        {
          name:'前年每月用气量',
          type:'line',
          stack: '总量3',
          // areaStyle: {normal: {}},
          // label: {
          //     normal: {
          //         show: true,
          //         position: 'top'
          //     }
          // },
          data:[35432.1113, 34011.1584, 9103.0042, 5314.5531, 4123.2111, 4122.2118, 4017.3456, 4036.2721, 3924.7618, 5013.2342, 6213.9531, 34828.9187],
          smooth: true,
      },
    ]
};
      // 使用刚指定的配置项和数据显示图表。
      myChart1.setOption(option1);
      myChart2.setOption(option2);
      myChart3.setOption(option3);
    });

}();




