/*var Script = function () {*/

    //morris chart
	function Check0()
	{
		  var myChart = echarts.init(document.getElementById('echart'));
      var option= {
        title: {
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
            data:['库容','预测量','计划量']
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
                name : '天数',
                type : 'category',
                boundaryGap : false,				
                data:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30']
            }
        ],
        yAxis : [
            {
                name : '气量值(万Nm3)',
                type : 'value',
                min: function(value) {
                      return value.min - (value.min*0.1);
                  }
            }
        ],
        series : [            
            {
                name:'预测量',
                type:'line',
                stack: '总量1',
                // areaStyle: {},
                data:[670, 695, 701, 675, 688, 680, 691, 676, 688, 700, 679, 700, 693, 681,670, 653, 646, 637, 659, 687, 700, 702, 693, 687,699, 700, 680, 695, 699, 701],
                smooth: true,
            },
            {
                name:'计划量',
                type:'line',
                stack: '总量2',
                // areaStyle: {},
                data:[690, 710, 719, 700, 705, 705, 710, 710, 720, 723,715, 722, 723,705,705, 685, 679, 670, 700, 715, 724, 730, 723, 721,720, 725, 726, 727, 739, 735],
                smooth: true,
            },
            {
              name:'库容',
              type:'line',
              stack: '总量3',
              // areaStyle: {normal: {}},
              data:[501, 589, 535, 590, 576, 600, 605, 580, 600,637,595, 590, 603, 581,599, 603, 596, 547, 553, 601, 613,590, 543, 551,592, 603,632, 630, 639, 633],
              smooth: true,
          },
        ]	
		    };
	
      myChart.setOption(option);	
	}
function Check1()
	{
		  var myChart = echarts.init(document.getElementById('echart'));
      var option= {
        title: {
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
            data:['库容','预测量','计划量']
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
                name : '天数',
                type : 'category',
                boundaryGap : false,				
                data:['2','4','6','8','10','12','14','16','18','20','22','24','26','28','30','32','34','36','38','40','42','44','46','48','50','52','54','56','58','60']
            }
        ],
        yAxis : [
            {
                name : '气量值(万Nm3)',
                type : 'value',
                min: function(value) {
                      return value.min - (value.min*0.1);
                  }
            }
        ],
        series : [            
            {
                name:'预测量',
                type:'line',
                stack: '总量1',
                // areaStyle: {},
                data:[1400, 1450, 1395, 1430, 1490, 1410, 1350, 1445, 1500, 1460, 1420, 1385, 1399, 1470, 1407, 1300, 1390, 1470, 1405, 1490,1405,1375,1447,1330,1395,1490,1555,1536,1359,1400],
                smooth: true,
            },
            {
                name:'计划量',
                type:'line',
                stack:  '总量2',
                // areaStyle: {},
                data:[1250, 1350, 1300, 1270, 1385, 1300, 1310,1390, 1400, 1370, 1332, 1300, 1305, 1335, 1290, 1100, 1250, 1325, 1280, 1338,1190,1259,1337,1200,1207,1300,1400,1357,1209,1240],
                smooth: true,
            },
            {
              name:'库容',
              type:'line',
              stack: '总量3',
              // areaStyle: {normal: {}},
              data:[1000, 1050, 1020, 1100, 1200, 1150, 1090, 1010, 1200, 1150, 1090, 1200, 1100, 1200, 1106, 1000, 1070, 1000, 1200, 1020,1010,1190,1052,990,1009,1050,1200,1127,1000,1014],
              smooth: true,
          },
        ]	
		    };
	
      myChart.setOption(option);	
	}
	function Check2()
	{
		  var myChart = echarts.init(document.getElementById('echart'));
      var option= {
        title: {
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
            data:['库容','预测量','计划量']
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
                name : '天数',
                type : 'category',
                boundaryGap : false,				
                data:['3','6','9','12','15','18','21','24','27','30','33','36','39','42','45','48','51','54','57','60','63','66','69','72','75','78','81','84','87','90']
            }
        ],
        yAxis : [
            {
                name : '气量值(万Nm3)',
                type : 'value',
                min: function(value) {
                      return value.min - (value.min*0.1);
                  }
            }
        ],
        series : [            
            {
                name:'预测量',
                type:'line',
                stack:'总量1',
                // areaStyle: {},
                data:[2100, 2000,2190, 2335, 2200, 2010, 2350, 2100, 2290, 2385, 2455, 2400, 2300, 2385, 2550, 2590, 2400, 2450, 2395, 2300,2400,2450,2556,2457,2454,2362,2459,2357,2462,2364],
                smooth: true,
            },
            {
                name:'计划量',
                type:'line',
                stack: '总量2',
                // areaStyle: {},
                data:[1900,1850, 1905, 2050, 1980, 1835, 2000, 1950, 2000, 2050, 2189, 2150,2100, 2150, 2387, 2400, 2270, 2300, 2100, 2050,2200,2250,2360,2263,2261,2160,2259,2152,2257,2160],
                smooth: true,
            },
            {
                name:'库容',
                type:'line',
                stack: '总量3',
                // areaStyle: {normal: {}},
                data:[1500,1410, 1600, 1750, 1670, 1600, 1800,1685, 1800, 1850, 1900, 1885, 1700, 1805, 1990, 2000, 1890, 1930, 1885,1800,2000,2050,2096,2000,1990,1962,1869,1867,1999,1964],
                smooth: true,
          },
        ]	
		    };
	
      myChart.setOption(option);	
	}
	function Check3()
	{
		 var myChart = echarts.init(document.getElementById('echart'));
      var option= {
        title: {
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
            data:['库容','预测量','计划量']
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
                name : '天数',
                type : 'category',
                boundaryGap : false,				
                data:['4','8','12','16','20','24','28','32','36','40','44','48','52','56','70','74','78','82','86','90','94','98','102','104','108','112','116','120']
            }
        ],
        yAxis : [
            {
                name : '气量值(万Nm3)',
                type : 'value',
                min: function(value) {
                      return value.min - (value.min*0.1);
                  }
            }
        ],
        series : [            
            {
                name:'预测量',
                type:'line',
                stack: '总量1',
                // areaStyle: {},
                data:[2800, 2850, 2900, 2790, 2855, 2900, 2940, 2980, 3019, 3000, 3070, 3050, 3020, 3000, 2960, 2970, 2959, 2930, 3000, 3010,2995,2980,2950,2930,2910,2900,2890,2900,2950,3000],
                smooth: true,
            },
            {
                name:'计划量',
                type:'line',
                stack: '总量2',
                // areaStyle: {},
                data:[2650, 2667, 2700, 2780, 2820, 2840, 2860, 2900, 2910, 2900, 2910, 2900, 2875, 2850, 2805, 2810, 2800, 2795, 2890, 2920,2915,2890,2860,2840,2815,2810,2800,2830,2880,2980],
                smooth: true,
            },
            {
                name:'库容',
                type:'line',
                stack: '总量3',
                // areaStyle: {normal: {}},
                data:[2550, 2600, 2610, 2700, 2750, 2740, 2765, 2790, 2820, 2800, 2860, 2830, 2750, 2720, 2679, 2690, 2680, 2650, 2785, 2797,2785,2750,2715,2710,2690,2650,2600,2635,2690,2770],
                smooth: true,
          },
        ]	
		    };
	
      myChart.setOption(option);	
	}
	function Check4()
	{
		 var myChart = echarts.init(document.getElementById('echart'));
      var option= {
        title: {
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
            data:['库容','预测量','计划量']
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
                name : '库容',
                type : 'category',
                boundaryGap : false,				
                data:['5','10','15','20','25','30','35','40','45','50','55','60','65','70','75','80','85','90','95','100','105','110','115','120','125','130','135','140','145','150']
            }
        ],
        yAxis : [
            {
                name : '气量值(万Nm3)',
                type : 'value',
                min: function(value) {
                      return value.min - (value.min*0.1);
                  }
            }
        ],
        series : [            
            {
                name:'预测量',
                type:'line',
                stack: '总量1',
                // areaStyle: {},
                data:[3500, 3550, 3530, 3570, 3580, 3600, 3600, 3610, 3630, 3615, 3610, 3600, 3570, 3590, 3610, 3630, 3690, 3700, 3705, 3720,3710,3700,3685,3630,3600,3600,3650,3630,3680,3700],
                smooth: true,
            },
            {
                name:'计划量',
                type:'line',
                stack: '总量2',
                // areaStyle: {},
                data:[3480, 3500, 3490, 3505, 3510, 3579, 3585, 3590, 3560, 3590, 3580, 3558, 3400, 3450, 3500, 3500, 3599, 3600, 3600, 3650,3650,3645,3610,3580,3550,3540,3580,3570,3600,3650],
                smooth: true,
            },
            {
                name:'库容',
                type:'line',
                stack: '总量3',
                // areaStyle: {normal: {}},
                data:[3300, 3400, 3390, 3430, 3450, 3500, 3490, 3500, 3510, 3505, 3450, 3440, 3370, 3385, 3490, 3480, 3500, 3530, 3535, 3570,3550,3560,3570,3530,3500,3490,3550,3565,3580,3590],
                smooth: true,
          },
        ]	
		    };
	
      myChart.setOption(option);	
	}
	function Check5()
	{
		 var myChart = echarts.init(document.getElementById('echart'));
      var option= {
        title: {
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
            data:['库容','预测量','计划量']
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
                name : '库容',
                type : 'category',
                boundaryGap : false,				
                data:['6','12','18','24','30','36','42','48','54','60','66','72','78','84','90','96','102','108','114','120','126','132','138','144','150','156','162','168','174','180']
            }
        ],
        yAxis : [
            {
                name : '气量值(万Nm3)',
                type : 'value',
                min: function(value) {
                      return value.min - (value.min*0.1);
                  }
            }
        ],
        series : [            
            {
                name:'预测量',
                type:'line',
                stack: '总量1',
                // areaStyle: {},
                data:[4200, 4250, 4230, 4230, 4300, 4300, 4320, 4490, 4500, 4530, 4500, 4500, 4600, 4610, 4630, 4650, 4660, 4600, 4560, 4530,4550,4530,4560,4510,4500,4480,4450,4470,4500,4550],
                smooth: true,
            },
            {
                name:'计划量',
                type:'line',
                stack: '总量2',
                // areaStyle: {},
                data:[4100, 4120, 4110, 4100, 4210, 4235, 4250, 4390, 4400, 4480, 4420, 4430, 4530, 4530, 4540, 4590, 4600, 4560, 4500, 4400,4490,4485,4490,4450,4430,4410,4400,4410,4460,4500],
                smooth: true,
            },
            {
                name:'库容',
                type:'line',
                stack: '总量3',
                // areaStyle: {normal: {}},
                data:[4000, 4010, 4050, 4020, 4000, 4050, 4100, 4280, 4380, 4400, 4365, 4370, 4490, 4495, 4500, 4520, 4550, 4300, 4400, 4390,4300,4370,4200,4300,4300,4335,4300,4325,4400,4450],
                smooth: true,
          },
        ]	
		    };
	
      myChart.setOption(option);	
	}
	
	   $(function () {
		Check0();	
	    
		/*var data = [
         { label: "������������",  data:65},
         { label: "����δ������",  data: 35}
         ];
		
		$.plot($("#hero-donut"), data,
            {
                series: {
                    pie: {
                        show: true,
                        radius: 1,
                        label: {
                            show: true,
                            radius: 3/4,
                            formatter: function(label, series){
                                return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
                            },
                            background: { opacity: 0.5 }
                        }
                    }
                },
                legend: {
                    show: false
                }
            });
		
		 Morris.Donut({
        element: 'hero-donut',
        data: [
          {label: '������������', value: 65 },
          {label: '����δ������', value: 35 }
        ],
          colors: ['#41cac0', '#49e2d7', '#34a39b'],
        formatter: function (y) { return y + "%" }
      });*/
    });
	   
	   function change(obj)
	  {
		  var _value = $(obj).val();
		  switch(Number(_value))
		  {
		     case 0:
			    Check0();
				$("#Purchase").val('21000');
				$("#Forecast").val('20900');
				$("#plan").val('21000');
				$("#LNG").val('16100');
				$("#shortage").val('100');
				$("#calorific").val('75.9');				
				$("#volume").val('2.68');
				$("#DUser").val('3227368');
				$("#CUser").val('95400000');
				break;
			 case 1:			    
			    Check1();
				$("#Purchase").val('42500');
				$("#Forecast").val('42550');
				$("#plan").val('42600');
				$("#LNG").val('20250');
				$("#shortage").val('50');
				$("#calorific").val('75.9');				
				$("#volume").val('2.68');
				$("#DUser").val('5486526');
				$("#CUser").val('174900000');
				break;
			 case 2:
			    Check2();
				$("#Purchase").val('63500');
				$("#Forecast").val('63000');
				$("#plan").val('63500');
				$("#LNG").val('25300');
				$("#shortage").val('500');
				$("#calorific").val('75.9');				
				$("#volume").val('2.68');
				$("#DUser").val('8229789');
				$("#CUser").val('254400000');
				break;
			case 3:
			    Check3();
				$("#Purchase").val('84100');
				$("#Forecast").val('84000');
				$("#plan").val('84000');
				$("#LNG").val('27600');
				$("#shortage").val('0');
				$("#calorific").val('75.9');				
				$("#volume").val('2.68');
				$("#DUser").val('10515842');
				$("#CUser").val('356160000');
				break;
			case 4:
			    Check4();
				$("#Purchase").val('105000');
				$("#Forecast").val('105000');
				$("#plan").val('106000');
				$("#LNG").val('27600');
				$("#shortage").val('1000');
				$("#calorific").val('75.9');				
				$("#volume").val('2.68');
				$("#DUser").val('12801894');
				$("#CUser").val('413400000');
				break;
			case 5:
			    Check5();
				$("#Purchase").val('126000');
				$("#Forecast").val('126000');
				$("#plan").val('126000');
				$("#LNG").val('27600');
				$("#shortage").val('0');
				$("#calorific").val('75.9');				
				$("#volume").val('2.68');
				$("#DUser").val('15087947');
				$("#CUser").val('524700000');
				break;
			 default:
			     break;
		  }
	  }
/*}();*/