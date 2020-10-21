/*
 * @Descripttion : 仿真压力
 * @Author       : hezihua
 * @Date         : 2020-07-01 15:11:37
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-06 10:33:34
 */
import React from 'react'
import { connect } from 'dva'
import Form from 'components/Form'
import Layout from 'components/Layout'
import BaseComponent from 'components/BaseComponent'
import Button from 'components/Button'
import Panel from 'components/Panel'
import G2 from 'components/Charts/G2'
import DataSet from '@antv/data-set'
import './index.less'
import Icon from 'components/Icon'
import {
  flowColumns,
  colorSet,
  getFilterName,
  TodayGasColorList,
  TodayGasColorList1,
} from './columns'
const { Charts, Axis, Geom, Tooltip, Legend } = G2

@connect(({ simulation, loading }) => ({
  simulation,
  loading: loading.models.simulation,
}))

class TodayGasChart extends BaseComponent {
  render() {
    let { simulation : { pressureData }} = this.props
    //压力曲线图
    let flowDv = new DataSet.View().source(pressureData)
    flowDv.transform({
      type: 'fold',
      fields: getFilterName(pressureData, 'time'),
      key: 'type',
      value: 'value',
    })
    const flowScale = {
      value: {
        alias: '(kpa)', // 数据字段的别名，会影响到轴的标题内容
      },
      time: {
        range: [0.02, 0.96], //输出数据的范围，默认[0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。
        alias: '(H)', // 数据字段的别名，会影响到轴的标题内容
      },
    }

    return (
      <>
        <p className="today-gas-title">压力统计</p>
        <p className="chart-y-tips">(kpa)</p>
        <div className="chart-box" style={{ height: '85%' }}>
          <Charts
            data={flowDv}
            scale={flowScale}
            forceFit //加这个属性宽度自适应
            theme="default" //主题
            placeholder //图表source为空时显示的内容 默认
          >
            {/* 鼠标hover的时候，提示框显示的值 */}
            <Tooltip
              crosshairs={{
                type: 'y', // 可选值：rect、x、y、cross，分别对应辅助框、平行x轴辅助线、平行y轴辅助线，十字辅助线
                lineStyle: {
                  stroke: '#ccc', // 辅助框颜色
                  lineWidth: 1, //辅助线宽度，单位为px
                  opacity: 1, // 辅助框的透明度
                },
              }} //用以设置tooltip的辅助线和辅助框
              offset={50}
              // g2-tooltip={{
              //   //提示框样式
              //   position: 'absolute',
              //   visibility: 'hidden',
              //   backgroundColor: 'rgba(92,205,210,.6)',
              //   color: '#000',
              //   padding: '5px 15px',
              //   transition: 'top 200ms,left 200ms',
              //   boxShadow:'0px 2px 15px 1px rgba(8,107,255,0.2)',
              //   borderRadius: 6
              // }}
            />

            {/* X坐标轴 */}
            <Axis
              name="time" //name决定是x还是y
              title={{
                // autoRotate: {Boolean}, // 是否需要自动旋转，默认为 true
                offset: 16, // 设置标题 title 距离坐标轴线的距离
                textStyle: {
                  fontSize: '14',
                  textAlign: 'center',
                  fill: '#C6D0D8',
                  rotate: 0,
                  color: '#C6D0D8',
                }, // 坐标轴文本属性配置
                position: 'end',
              }}
              tickLine={{
                lineWidth: 1, // 刻度线宽
                stroke: '#C6D0D8', // 刻度线的颜色
                length: -5, // 刻度线的长度, **原来的属性为 line**,可以通过将值设置为负数来改变其在轴上的方向
                inside: true,
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
              grid={{
                align: 'bottom', // 网格顶点从两个刻度中间开始
                lineStyle: {
                  stroke: 'rgba(255,255,255,.1)', // 网格线的颜色
                  lineWidth: 1, // 网格线的宽度复制代码
                  lineDash: [4, 4], // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
                }, // 网格线的样式配置，原有属性为 line
              }}
            />

            {/* y坐标轴 */}
            <Axis
              name="value" //name决定是x还是y
              grid={null}
              label={{
                offset: 20,
                textStyle: {
                  textAlign: 'center', // 文本对齐方向，可取值为： start center end
                  fill: '#E1FFFE', // 文本的颜色
                },
              }}
              line={{
                stroke: '#E1FFFE', // 颜色
              }}
            />

            <Legend //图例
              title={null}
              position="top-right"
              allowAllCanceled={false}
              marker={'circle'}
              itemFormatter={(val) => {
                return val
              }}
              itemFormatter={(val) => {
                if(val == 'realData'){
                  return '实时'
                }else if( val == 'simulationData'){
                  return '仿真'
                }
                return val
              }}
              offset={20}
            />

            {/* 转折点的相关配置 */}
            <Geom
              type="line"
              position="time*value"
              shape={'smooth'}
              color={[
                'type',
                (type) => {
                  let typeList = getFilterName(pressureData, 'time')
                  let colorIndex = colorSet(typeList, type)
                  return TodayGasColorList1[colorIndex]
                },
              ]}
              tooltip={['time*type*value', (time,type, value)=>{ // array
                let thatName = ''
                
                if(type == 'realData'){
                  thatName = '实时'
                }else if( type == 'simulationData'){
                  thatName = '仿真'
                }
                return {
                  title:'时间：' + time,
                  name: thatName + '：',
                  value: value + ' kpa'
                }
              }]}
            />
            <Geom
              type="point"
              position="time*value"
              shape={'circle'}
              color={[
                'type',
                (type) => {
                  let typeList = getFilterName(pressureData, 'time')
                  let colorIndex = colorSet(typeList, type)
                  return TodayGasColorList1[colorIndex]
                },
              ]}
              tooltip={['time*type*value', (time,type, value)=>{ // array
                let thatName = ''
                
                if(type == 'realData'){
                  thatName = '实时'
                }else if( type == 'simulationData'){
                  thatName = '仿真'
                }
                return {
                  title:'时间：' + time,
                  name: thatName + '：',
                  value: value + ' kpa'
                }
              }]}
            />
            {/* 几何标记对象，主要用以描述你要画的是什么图形（直方图、折线图、饼状图、区域图）：interval是直方图 */}
            <Geom
              type="area"
              position="time*value"
              color={[
                'type', //线条太多无法指定颜色
                (type) => {
                  let typeList = getFilterName(pressureData, 'time')
                  let colorIndex = colorSet(typeList, type)
                  return TodayGasColorList[colorIndex]
                },
              ]}
              shape="smooth"
              tooltip={null}
            />
          </Charts>
        </div>
      </>
    )
  }
}

export default TodayGasChart
