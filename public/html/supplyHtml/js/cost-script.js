var Script = function () {

    //morris chart

    $(function () {

      // e-chart
      var myChart = echarts.init(document.getElementById('echart'));
	  //var myChart2 = echarts.init(document.getElementById('echart2'));

      // 指定图表的配置项和数据
      var option = {
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
            data:['历史成本','预测成本']
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
                name : '',
                type : 'category',
                boundaryGap : false,
                data : ['2019/11/1','2019/11/2','2019/11/3','2019/11/4','2019/11/5','2019/11/6','2019/11/7','2019/11/8','2019/11/9','2019/11/10','2019/11/11','2019/11/12','2019/11/13','2019/11/14','2019/11/15','2019/11/16','2019/11/17','2019/11/18','2019/11/19','2019/11/20','2019/11/21','2019/11/22','2019/11/23','2019/11/24','2019/11/25','2019/11/26','2019/11/27','2019/11/28','2019/11/29','2019/11/30']
            }
        ],
        yAxis : [
            {
                name : '金额(元/Nm3)',
                type : 'value',
				position:'left',
                min: function(value) {
                      return value.min - (value.min*0.1);
                  }
            }
        ],
        series : [           
            {
                name:'历史成本',
                type:'line',
                stack: '总量1',
                // areaStyle: {},1.2-3.5
                data:[1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 1.3,1.5, 1.5, 1.7, 1.9, 2.1, 2.3, 2.4, 2.5, 2.6, 2.6, 2.7, 2.8, 3.0, 3.0, 3.2, 3.0, 2.9,2.7,2.5,2.7,2.9,3.1,3.2],
                smooth: true,
            },
            {
                name:'预测成本',
                type:'line',
                stack: '总量2',
                // areaStyle: {normal: {}},
                data:[1.6, 1.6, 1.8, 1.9, 2.0, 2.0, 1.4, 1.5, 1.6, 1.8, 1.9, 2.1, 2.3, 2.5, 2.5, 2.7, 2.7, 2.8, 2.9, 3.1, 3.2, 3.3, 3.1, 3.0,2.8,2.5,2.7,3.0,3.2,3.3],
              smooth: true,
			},
			{
				type: "line", //如果将 markLine 单独写在一个对象里，就必须加 type ，不然报错。
				markLine: {
					symbol: "none", //相当于["none", "none"] [虚线，没有箭头]
					silent: false, // true 不响应鼠标事件
					data: [{
						xAxis: '2019/11/20', //对于x轴中的一个值
						lineStyle: { //线的样式
							color: "red",
							width: 3,
							opacity: 0.8
						},
						label: { //文字的样式，默认是白色，有时候文字不显示，可能是颜色的问题
							color: "red",
							fontSize: 15,
							formatter: function () {
								return "当前时刻"
							}
						}
					}],
					
				}
			},
			
        ]
    };
	
	
	// 指定图表的配置项和数据
      var option2 = {
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
            data:['历史成本','预测成本']
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
                name : '',
                type : 'category',
                boundaryGap : false,
                data : ['2019/11/1','2019/11/2','2019/11/3','2019/11/4','2019/11/5','2019/11/6','2019/11/7','2019/11/8','2019/11/9','2019/11/10','2019/11/11','2019/11/12','2019/11/13','2019/11/14','2019/11/15','2019/11/16','2019/11/17','2019/11/18','2019/11/19','2019/11/20','2019/11/21','2019/11/22','2019/11/23','2019/11/24','2019/11/25','2019/11/26','2019/11/27','2019/11/28','2019/11/29','2019/11/30']
            }
        ],
        yAxis : [
            {
                name : '金额(元/Nm3)',
                type : 'value',
                min: function(value) {
                      return value.min - (value.min*0.1);
                  }
            }
        ],
        series : [           
            {
                name:'历史成本',
                type:'line',
                stack: '总量1',
                // areaStyle: {},1.2-3.5
                data:[1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 1.3,1.5, 1.5, 1.7, 1.9, 2.1, 2.3, 2.4, 2.5, 2.6, 2.6, 2.7, 2.8, 3.0, 3.0, 3.2, 3.0, 2.9,2.7,2.5,2.7,2.9,3.1,3.2],
                smooth: true,
            },
            {
                name:'预测成本',
                type:'line',
                stack: '总量2',
                // areaStyle: {normal: {}},
                data:[1.6, 1.6, 1.8, 1.9, 2.0, 2.0, 1.4, 1.5, 1.6, 1.8, 1.9, 2.1, 2.3, 2.5, 2.5, 2.7, 2.7, 2.8, 2.9, 3.1, 3.2, 3.3, 3.1, 3.0,2.8,2.5,2.7,3.0,3.2,3.3],
              smooth: true,
          },
        ]
    };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
	  //myChart2.setOption(option2);

    });

}();




