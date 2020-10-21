var Script = function () {

    //morris chart

    $(function () {

      // e-chart
      var myChart1 = echarts.init(document.getElementById('echart1'));
      var myChart2 = echarts.init(document.getElementById('echart2'));

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
            data:['钰湖电厂','华电分布式']
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
                name : '用气量(MJ)',
                type : 'value',
                min: function(value) {
                      return value.min - (value.min*0.1);
                  }
            }
        ],
        series : [
            {
                name:'华电分布式',
                type:'line',
                stack: '总量2',
                // areaStyle: {},
                data:[48.8000, 49.4000, 50.1000, 51.1000, 50.7000, 61.0000, 60.7000, 62.0000, 64.5000, 63.6000, 63.7000, 63.5000, 62.0000, 61.5000, 62.0000, 60.6000, 60.3000, 62.0000, 59.3000, 59.2000, 58.9000, 58.9000, 58.7000, 48.7000],
                smooth: true,
            },
            {
              name:'钰湖电厂',
              type:'line',
              stack: '总量3',
              // areaStyle: {normal: {}},
              // label: {
              //     normal: {
              //         show: true,
              //         position: 'top'
              //     }
              // },
              data:[45.8000, 46.4000, 47.1000, 48.1000, 48.7000, 58.0000, 57.7000, 59.0000, 61.5000, 60.6000, 60.7000, 61.5000, 61.8000, 60.9900, 60.0000, 58.6000, 58.3000, 60.0000, 57.3000, 57.2000, 56.9000, 56.9000, 56.7000, 46.7000],
              smooth: true,
          },
        ]
    };



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
            data:['西乡调压站','龙翔调压站','安托山中压路']
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
                name:'安托山中压路',
                type:'line',
                stack: '总量1',
                // areaStyle: {},
                data:[49.0000, 50.0000, 50.1000, 51.1000, 50.7000, 61.0000, 61.5000, 61.5000, 65.5000, 64.5000, 64.0000, 64.0000, 61.5000, 62.5000, 63.5,61],
                smooth: true,
            },
            {
                name:'龙翔调压站',
                type:'line',
                stack: '总量2',
                // areaStyle: {},
                data:[48.8000, 49.4000, 50.1000, 51.1000, 50.7000, 61.0000, 60.7000, 62.0000, 64.5000, 63.6000, 63.7000, 63.5000, 62.0000, 61.5000, 62.0000, 60.6000, 60.3000, 62.0000, 59.3000, 59.2000, 58.9000, 58.9000, 58.7000, 48.7000],
                smooth: true,
            },
            {
              name:'西乡调压站',
              type:'line',
              stack: '总量3',
              // areaStyle: {normal: {}},
              // label: {
              //     normal: {
              //         show: true,
              //         position: 'top'
              //     }
              // },
              data:[45.8000, 46.4000, 47.1000, 48.1000, 48.7000, 58.0000, 57.7000, 59.0000, 61.5000, 60.6000, 60.7000, 61.5000, 61.8000, 60.9900, 60.0000, 58.6000, 58.3000, 60.0000, 57.3000, 57.2000, 56.9000, 56.9000, 56.7000, 46.7000],
              smooth: true,
          },
        ]
    };   

      // 使用刚指定的配置项和数据显示图表。
      myChart1.setOption(option1);
      myChart2.setOption(option2);
    });

}();


function change(obj){
  var _value = $(obj).val();
  switch(Number(_value))
  {
     case 0:
       Check0();
      break;
     case 1:
       Check1();  
      break;
       case 2:
       Check2();  
      break;
       case 3:
       Check3();  
      break;
     default:
      break;
  }
}

function Check0(){
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
          data:['钰湖电厂','华电分布式']
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
              name : '热值(MJ)',
              type : 'value',
              min: function(value) {
                    return value.min - (value.min*0.1);
                }
          }
      ],
      series : [
          {
              name:'华电分布式',
              type:'line',
              stack: '总量2',
              // areaStyle: {},
              data:[48.8000, 49.4000, 50.1000, 51.1000, 50.7000, 61.0000, 60.7000, 62.0000, 64.5000, 63.6000, 63.7000, 63.5000, 62.0000, 61.5000, 62.0000, 60.6000, 60.3000, 62.0000, 59.3000, 59.2000, 58.9000, 58.9000, 58.7000, 48.7000],
              smooth: true,
          },
          {
            name:'钰湖电厂',
            type:'line',
            stack: '总量3',
            // areaStyle: {normal: {}},
            // label: {
            //     normal: {
            //         show: true,
            //         position: 'top'
            //     }
            // },
            data:[45.8000, 46.4000, 47.1000, 48.1000, 48.7000, 58.0000, 57.7000, 59.0000, 61.5000, 60.6000, 60.7000, 61.5000, 61.8000, 60.9900, 60.0000, 58.6000, 58.3000, 60.0000, 57.3000, 57.2000, 56.9000, 56.9000, 56.7000, 46.7000],
            smooth: true,
        },
      ]
  };
    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);
}
function Check1(){
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
          data:['钰湖电厂','华电分布式']
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
              name : '压力(MPa)',
              type : 'value',
              min: function(value) {
                    return value.min - (value.min*0.1);
                }
          }
      ],
      series : [
          {
              name:'华电分布式',
              type:'line',
              stack: '总量2',
              // areaStyle: {},
              data:[48.8000, 49.4000, 50.1000, 51.1000, 50.7000, 61.0000, 60.7000, 62.0000, 64.5000, 63.6000, 63.7000, 63.5000, 62.0000, 61.5000, 62.0000, 60.6000, 60.3000, 62.0000, 59.3000, 59.2000, 58.9000, 58.9000, 58.7000, 48.7000],
              smooth: true,
          },
          {
            name:'钰湖电厂',
            type:'line',
            stack: '总量3',
            // areaStyle: {normal: {}},
            // label: {
            //     normal: {
            //         show: true,
            //         position: 'top'
            //     }
            // },
            data:[45.8000, 46.4000, 47.1000, 48.1000, 48.7000, 58.0000, 57.7000, 59.0000, 61.5000, 60.6000, 60.7000, 61.5000, 61.8000, 60.9900, 60.0000, 58.6000, 58.3000, 60.0000, 57.3000, 57.2000, 56.9000, 56.9000, 56.7000, 46.7000],
            smooth: true,
        },
      ]
  };
    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);
}
function Check2(){
     var myChart2 = echarts.init(document.getElementById('echart2'));
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
          data:['西乡调压站','龙翔调压站','安托山中压路']
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
              name : '流量(万Nm³)',
              type : 'value',
              min: function(value) {
                    return value.min - (value.min*0.1);
                }
          }
      ],
      series : [
          {
              name:'安托山中压路',
              type:'line',
              stack: '总量1',
              // areaStyle: {},
              data:[49.0000, 50.0000, 50.1000, 51.1000, 50.7000, 61.0000, 61.5000, 61.5000, 65.5000, 64.5000, 64.0000, 64.0000, 61.5000, 62.5000, 63.5,61],
              smooth: true,
          },
          {
              name:'龙翔调压站',
              type:'line',
              stack: '总量2',
              // areaStyle: {},
              data:[48.8000, 49.4000, 50.1000, 51.1000, 50.7000, 61.0000, 60.7000, 62.0000, 64.5000, 63.6000, 63.7000, 63.5000, 62.0000, 61.5000, 62.0000, 60.6000, 60.3000, 62.0000, 59.3000, 59.2000, 58.9000, 58.9000, 58.7000, 48.7000],
              smooth: true,
          },
          {
            name:'西乡调压站',
            type:'line',
            stack: '总量3',
            // areaStyle: {normal: {}},
            // label: {
            //     normal: {
            //         show: true,
            //         position: 'top'
            //     }
            // },
            data:[45.8000, 46.4000, 47.1000, 48.1000, 48.7000, 58.0000, 57.7000, 59.0000, 61.5000, 60.6000, 60.7000, 61.5000, 61.8000, 60.9900, 60.0000, 58.6000, 58.3000, 60.0000, 57.3000, 57.2000, 56.9000, 56.9000, 56.7000, 46.7000],
            smooth: true,
        },
      ]
  };
    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option2);
}
function Check3(){
     var myChart2 = echarts.init(document.getElementById('echart2'));
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
          data:['西乡调压站','龙翔调压站','安托山中压路']
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
              name : '压力(MPa)',
              type : 'value',
              min: function(value) {
                    return value.min - (value.min*0.1);
                }
          }
      ],
      series : [
          {
              name:'安托山中压路',
              type:'line',
              stack: '总量1',
              // areaStyle: {},
              data:[49.0000, 50.0000, 50.1000, 51.1000, 50.7000, 61.0000, 61.5000, 61.5000, 65.5000, 64.5000, 64.0000, 64.0000, 61.5000, 62.5000, 63.5,61],
              smooth: true,
          },
          {
              name:'龙翔调压站',
              type:'line',
              stack: '总量2',
              // areaStyle: {},
              data:[48.8000, 49.4000, 50.1000, 51.1000, 50.7000, 61.0000, 60.7000, 62.0000, 64.5000, 63.6000, 63.7000, 63.5000, 62.0000, 61.5000, 62.0000, 60.6000, 60.3000, 62.0000, 59.3000, 59.2000, 58.9000, 58.9000, 58.7000, 48.7000],
              smooth: true,
          },
          {
            name:'西乡调压站',
            type:'line',
            stack: '总量3',
            // areaStyle: {normal: {}},
            // label: {
            //     normal: {
            //         show: true,
            //         position: 'top'
            //     }
            // },
            data:[45.8000, 46.4000, 47.1000, 48.1000, 48.7000, 58.0000, 57.7000, 59.0000, 61.5000, 60.6000, 60.7000, 61.5000, 61.8000, 60.9900, 60.0000, 58.6000, 58.3000, 60.0000, 57.3000, 57.2000, 56.9000, 56.9000, 56.7000, 46.7000],
            smooth: true,
        },
      ]
  };
    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option2);
}
