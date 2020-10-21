/*
 * @Descripttion : 仪表盘
 * @Author       : caojiarong
 * @Date         : 2020-07-22 19:25:54
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-27 15:46:44
 */ 
// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react'
import BaseComponent from 'components/BaseComponent'
import G2 from 'components/Charts/G2'
import DataSet from '@antv/data-set'
import './index.less'

const { Chart, Axis, Coord, Geom, Guide, Shape } = G2
const { Html, Arc } = Guide;



// 自定义Shape 部分
Shape.registerShape('point', 'pointer', {
  drawShape(cfg, group) {
    let point = cfg.points[0]; // 获取第一个标记点
    point = this.parsePoint(point);
    const center = this.parsePoint({ // 获取极坐标系下画布中心点
      x: 0,
      y: 0,
    });
    // 绘制指针
    group.addShape('line', {
      attrs: {
        x1: center.x,
        y1: center.y,
        x2: point.x,
        y2: point.y,
        stroke: cfg.color,
        lineWidth: 3,
        lineCap: 'round',
      },
    });
    return group.addShape('circle', {
      attrs: {
        x: center.x,
        y: center.y,
        r: 6,
        stroke: cfg.color,
        lineWidth: 3,
        fill: '#fff',
      },
    });
  },
});
const color = ['#66CC66', '#66CC66', '#e76f51'];

function checkIsSafe(value){
  if(value > 2.6 || value < 0.8){
    return '<span style="color:red;font-weight: bold;">'+value+'<span>'
  }else{
    return value
  }
}

class DashBoard extends BaseComponent {

  constructor() {
    super();
    this.state = {
      // data,
      lineWidth: 14,
    };
  }

  componentDidMount() {
  }
  
  render() {
    const { lineWidth } = this.state;
    // const val = this.state.data[0].value
    let {data} = this.props
    const val = (data[0].pressure/1000).toFixed(2)
    let cols = {
      value: {
        min: 0,   //仪表盘盘最小值
        max: 3,   //仪表盘最大值
        tickInterval: 0.5,  //区间
        nice: false,
      },
    };
    return (
      <div style={{height:135,width:'25%'}}>
        <Chart height={135} style={{width:150, margin:'auto'}} data={data} scale={cols} padding={{top: -30, right: 5, bottom:5, left: 5}} forceFit>
          <Coord type="polar" startAngle={-9 / 8 * Math.PI} endAngle={1 / 8 * Math.PI} radius={0.75} />
          <Axis
            name='value'
            zIndex={2}
            line={null}
            label={{
              offset: -13,
              textStyle: {
                fontSize: 14,
                textAlign: 'center',
                textBaseline: 'middle',
                fill:'#fff'
              },
            }}
            subTickCount={4}
            subTickLine={{
              length: -8,
              stroke: '#fff',
              strokeOpacity: 1,
            }}
            tickLine={{
              length: -12,
              stroke: '#fff',
              strokeOpacity: 1,
            }}
          />
          <Axis name="1" visible={false} />
          <Guide>
            <Arc  
              zIndex={0}
              start={[0, 0.965]}   //起点
              end={[cols.value.max, 0.965]}      //终点
              style={{ // 底灰色
                stroke: '#CBCBCB',    //灰色----------
                lineWidth: 10,    //底盘线条宽度
              }}
            />
            {val > 0 &&
              <Arc
                zIndex={1}
                start={[0, 0.965]}
                end={[val, 0.965]}
                style={{ // 底灰色
                  stroke: color[2],   //红色---
                  lineWidth,
                }}
              />}
            {val > 0.8 && 
            <Arc
              zIndex={2}
              start={[0.8, 0.965]}  
              end={[val, 0.965]}
              style={{ // 底灰色
                stroke: color[0],  //蓝色--------
                lineWidth,
              }}
            />}
            { val >= 2 && //当值处于区间
            <Arc
              zIndex={3}
              start={[2, 0.965]}   //区间开始
              end={[val, 0.965]}     //区间结束
              style={{ // 底灰色
                stroke: color[1],  //黄色-----------
                lineWidth,
              }}
            />}
            { val > 2.6 && 
            <Arc
              zIndex={4}
              start={[2.6, 0.965]}
              end={[val, 0.965]}
              style={{ // 底灰色
                stroke: color[2],   //红色--------
                lineWidth,
              }}
            />}
            {val < 2 && val > 0.8 &&
              <Arc
                zIndex={2}
                start={[0.8, 0.965]}
                end={[val, 0.965]}
                style={{ // 底灰色
                  stroke: color[0],   //蓝色---
                  lineWidth,
                }}
              />}
              
            <Html
              position={['50%', '90%']}   //描述文字的位置     html模板
              html={() => (
                '<div style="width: 170px;text-align: center;font-size: 12px!important;">'+
                  '<p style="font-size: 12px; color: rgba(255,255,255,1);margin: 0;overflow: hidden;text-overflow: ellipsis;">'+
                  data[0].stationName
                  +'压力值'+
                  '</p>'+
                  '<p style="font-size: 12px;color: rgba(255,255,255,0.85);margin: 0;overflow: hidden;text-overflow: ellipsis;">'
                    +checkIsSafe(val)+
                  'MPa</p>'+
                '</div>')
              }
            />
          </Guide>
          <Geom
            type="point"
            position="value*1"
            shape="pointer"
            color="#1890FF"
            active={false}
            style={{ stroke: '#fff', lineWidth: 1 }}
          />
        </Chart>
      </div>
    );
  }
}

export default DashBoard