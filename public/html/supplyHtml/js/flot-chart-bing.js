var Script = function () {

    //morris chart

    $(function () {
      var myChart = echarts.init(document.getElementById('echart1'));

      setTimeout(function () {
          option = {
              legend: {},
              tooltip: {
                  trigger: 'axis',
                  showContent: false
              },
              dataset: {
                  source: [
                      ['product', '8:00', '10:00','12:00','14:00','16:00', '18:00', '20:00', '22:00', '24:00','2:00','4:00','6:00',],
                      ['求雨岭', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7, 41.1, 65.1, 53.3, 83.8, 98.7, 41.1],
                      ['坪山', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1, 86.5, 85.7, 83.1, 73.4, 55.1, 86.5],
                      ['安托山', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5, 24.1, 79.5, 86.4, 65.2, 82.5, 24.1],
                      ['华安', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1, 55.2, 69.2, 72.4, 53.9, 39.1, 55.2],
                      ['迭福', 54.2, 57.1, 64.2, 62.4, 48.9, 34.1, 45.2, 64.2, 62.4, 48.9, 34.1, 45.2]
                  ]
              },
              xAxis: {type: 'category'},
              yAxis: {name : '用气量(万Nm³)',gridIndex: 0},
              grid: {top: '55%'},
              series: [
                  {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                  {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                  {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                  {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                  {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                  {
                      type: 'pie',
                      id: 'pie',
                      radius: '30%',
                      center: ['50%', '25%'],
                      label: {
                          formatter: '{b}: {@2012} ({d}%)'
                      },
                      encode: {
                          itemName: 'product',
                          value: '2012',
                          tooltip: '2012'
                      }
                  }
              ]
          };

          myChart.on('updateAxisPointer', function (event) {
              var xAxisInfo = event.axesInfo[0];
              if (xAxisInfo) {
                  var dimension = xAxisInfo.value + 1;
                  myChart.setOption({
                      series: {
                          id: 'pie',
                          label: {
                              formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                          },
                          encode: {
                              value: dimension,
                              tooltip: dimension
                          }
                      }
                  });
              }
          });

          myChart.setOption(option);

      });

    });

}();




