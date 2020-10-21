/*
 * @Descripttion : 
 * @Author       : caojiarong
 * @Date         : 2020-07-17 17:35:38
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-30 08:51:55
 */ 

import React from 'react'
import BaseComponent from 'components/BaseComponent'
import G2 from 'components/Charts/G2'
import './index.less'
import DataSet from "@antv/data-set"
const { Charts, Axis, Geom, Tooltip, Coord,Label, Shape} = G2

class SumGas extends BaseComponent {

  render() {
    let {data}=this.props
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.source(data).transform({
      type: "sort",

      callback(a, b) {
        // 排序依据，和原生js的排序callback一致
        return a.population - b.population > 0;
      }
    });

    Shape.registerShape("interval", "top", {
      getPoints: function (cfg) {
        // 获取 shape 绘制的关键点
        const x = cfg.x;
        const y = cfg.y;
        const y0 = cfg.y0;
        const width = cfg.size;
        if(y > 0){
          return [
            { x: x - width / 2, y: y0 },
            { x: x - width / 2, y: y },
            { x: x + width / 2, y: y-0.03 },
            { x: x + width / 2, y: y0 },
          ]
        }else{
          return [
            { x: x - width / 2, y: y0 },
            { x: x - width / 2, y: y },
            { x: x + width / 2, y: y},
            { x: x + width / 2, y: y0 },
          ]
        }
      },
      draw: function (cfg, container) {
        // 自定义最终绘制的逻辑
        const points = this.parsePoints(cfg.points); // 将0-1空间的坐标转换为画布坐标
        const polygon = container.addShape('polygon', {
          attrs: {
            points: [
              [points[0].x, points[0].y],
              [points[1].x, points[1].y],
              [points[2].x, points[2].y],
              [points[3].x, points[3].y]
            ],
            fill: 'l (0) 0:rgba(2, 154, 255, 1) 1:rgba(0, 255, 234, 1)'
          }
        }); 
        return polygon
      }
    });

    return (
      <>
        <p className="station-gas-title">气源点进气量统计</p>
        <div style={{height: '78%'}}>
          <Charts data={dv} padding={['auto',45,'auto','auto']} forceFit>
            <Coord transpose />
            <Axis
              name="pointer"
              tickLine = {{
                lineWidth: 1, // 刻度线宽
                stroke: '#C6D0D8', // 刻度线的颜色
                length: -5, // 刻度线的长度, **原来的属性为 line**,可以通过将值设置为负数来改变其在轴上的方向
                inside:true
              }}
              label={{
                textStyle: {
                  fill: 'rgba(2, 154, 255, 1)', // 文本的颜色
                }
              }}  
            />
            <Axis 
              name="gasVolume" 
              visible={false}
            />
            <Tooltip 
              g2-tooltip={{
              //提示框样式
              fill: 'rgba(2, 154, 255, 1)',
            }} />
            <Geom 
              type="interval" 
              position="pointer*gasVolume"
              color={'l (0) 0:rgba(2, 154, 255, 1) 1:rgba(0, 255, 234, 1)'}
              tooltip={['pointer*gasVolume', (pointer,value)=>{ // array
                return {
                  title:'气源点：' + pointer,
                  name: '进气量：' ,
                  value: value + ' 万m³'
                }
              }]}
              shape='top'
             >
              <Label
               content='gasVolume'
               offset={5}
               textStyle={{
                fill:'rgba(0, 250, 235, 1)'
               }}
               content={["pointer*gasVolume", (pointer, gasVolume)=>{
                return `${gasVolume} 万m³`;
              }]}
               />
            </Geom>
          </Charts>
        </div>
    </>
    )
  }
}

export default SumGas