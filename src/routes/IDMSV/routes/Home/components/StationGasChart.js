/*
 * @Descripttion : 场站用气量图表
 * @Author       : caojiarong
 * @Date         : 2020-07-17 16:23:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-28 13:56:54
 */
import React from 'react'
import BaseComponent from 'components/BaseComponent'
import G2 from 'components/Charts/G2'
import DataSet from '@antv/data-set'
import { getFilterNameArr,colorSet2,gasColorList } from './columns'
import './index.less'
const { Charts, Axis, Geom, Tooltip } = G2

class StationGasChart extends BaseComponent {

  render() {
    let { data } = this.props

    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: getFilterNameArr(data, 'stationName', 'applyGasVolume'),
      // fields: ['time'],
      // 展开字段集
      key: 'key',
      // key字段
      value: 'value', // value字段
    })
      .transform({
        type: 'map',
        callback: (obj) => {
          obj.type = obj.key
          if (obj.value == undefined) {
            obj.key = undefined
            obj.type = undefined
          }
          return obj;
        },
      })
      .transform({
        type: 'filter',
        callback(obj) {
          return obj.value !== undefined;
        }
      });

    // applyGasVolume: 0
    // key: "SRWJZ_WJ_D"
    // stationName: "吴江港华"
    // value: 0

    return (
      <>
        <p className="station-gas-title">场站用气量统计</p>
        <p className="chart-y-tips2">(万m³)</p>
        <div style={{ height: '78%' }}>
          <Charts
            data={dv}
            forceFit //加这个属性宽度自适应
            // theme="default" //主题
            placeholder //图表source为空时显示的内容 默认
          >
            {/* x轴 */}
            <Axis
              name="stationName"
              grid={null}

              tickLine={{
                lineWidth: 1, // 刻度线宽
                stroke: '#C6D0D8', // 刻度线的颜色
                length: -5, // 刻度线的长度, **原来的属性为 line**,可以通过将值设置为负数来改变其在轴上的方向
                inside: true
              }}
              label={{
                textStyle: {
                  textAlign: 'center', // 文本对齐方向，可取值为： start center end
                  fill: '#C6D0D8', // 文本的颜色
                },
              }}
              line={{
                stroke: '#C6D0D8', // 颜色
              }}
            />
            {/* y轴 */}
            <Axis
              name='value'
              grid={{
                align: 'bottom', // 网格顶点从两个刻度中间开始
                lineStyle: {
                  stroke: 'rgba(255,255,255,.3)', // 网格线的颜色
                  lineWidth: 1, // 网格线的宽度复制代码
                  lineDash: [4, 4], // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
                }, // 网格线的样式配置，原有属性为 line
              }}
              label={{
                offset: 20,
                textStyle: {
                  textAlign: 'center', // 文本对齐方向，可取值为： start center end
                  fill: '#E1FFFE', // 文本的颜色
                }
              }}
              line={{
                stroke: '#E1FFFE', // 颜色
              }}
            />

            <Axis
              name='applyGasVolume'
              grid={null}
              label={null}
            // line={{
            //   stroke: '#E1FFFE', // 颜色
            // }}
            />
            <Tooltip
              g2-tooltip={{
                //提示框样式
                fill: 'rgba(71, 33, 202, 1)',
              }}
            />
            
            <Geom
              type="interval"
              position="stationName*value*type"
              color={['type*stationName',(type,stationName,)=>{
                let colorIndex = colorSet2(this.props.data,stationName,type)
                return gasColorList[colorIndex]
              }]}
              size={28}
              tooltip={['stationName*value*type', (stationName, value, type) => { // array
                if (type) {
                  return {
                    name: type,
                    value: value + ' 万m³'
                  }
                }

              }]}
              adjust={[
                {
                  type: "stack"
                }
              ]}
            />
            {/* <Geom
              type="interval"
              position="stationName*applyGasVolume"
              color={'l (90) 0:rgba(71, 33, 202, 1) 1:rgba(134, 81, 244, 0.8)'}
              size={28}
              tooltip={['stationName*applyGasVolume', (stationName, applyGasVolume) => { // array
                return {
                  name: '申请用气量：',
                  value: applyGasVolume + ' 万m³'
                }
              }]}
            /> */}
          </Charts>
        </div>

      </>
    )
  }
}

export default StationGasChart