/*
 * @Descripttion : 门站运算输出-流量列表
 * @Author       : caojiarong
 * @Date         : 2020-07-01 15:11:37
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-14 11:17:16
 */
import React from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import Form from 'components/Form'
import Layout from 'components/Layout'
import BaseComponent from 'components/BaseComponent'
import Button from 'components/Button'
import Panel from 'components/Panel'
import G2 from 'components/Charts/G2'
import DataSet from '@antv/data-set'
import './index.less'
import Icon from 'components/Icon'
import {flowColumns, FlowColorList, colorSet, getFilterName} from './columns'
import {CheckboxTree} from 'components/Checkbox'
import { flow } from 'lodash'
const { Content } = Layout
const { Charts, Axis, Geom, Tooltip, Legend, Coord, Guide } = G2

class FlowChart extends BaseComponent {

  render() {
    let {data}=this.props
    //流量曲线图
    let flowDv = new DataSet.View().source(data)
    flowDv.transform({
      type: 'fold',
      fields: getFilterName(data,'Time'),
      key: 'type',
      value: 'value',
    })
    const flowScale = {
      value: {
        alias: '流量(m³/h)', // 数据字段的别名，会影响到轴的标题内容
      },
      Time: {
        range: [0, 0.95], //输出数据的范围，默认[0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。
        alias: '时间', // 数据字段的别名，会影响到轴的标题内容
      },
    }
    
    return (
      <>
        <Panel title="流量统计" absoluteTitle allowControls boxShadow height={440}>
          {/* <i className='flow-icon' /> */}
          <Icon type='flow' className='chart-icon'/>
          <div className="chart-y-tips-pressure">流量(m³/h) </div>
          <Charts
            className="chart-wrap pressure-chart"
            height={340} //图标高度
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
              g2-tooltip={{
                //提示框样式
                position: 'absolute',
                visibility: 'hidden',
                backgroundColor: '#FFF',
                color: '#8691AA',
                padding: '5px 15px',
                transition: 'top 200ms,left 200ms',
                boxShadow:'0px 2px 15px 1px rgba(8,107,255,0.2)',
                borderRadius: 6
              }}
              
            />

            {/* X坐标轴 */}
            <Axis
              name="Time"  //name决定是x还是y
              title={{
                // autoRotate: {Boolean}, // 是否需要自动旋转，默认为 true
                offset: 16, // 设置标题 title 距离坐标轴线的距离
                textStyle: {
                  fontSize: '14',
                  textAlign: 'center',
                  fill: '#C6D0D8',
                  // rotate: 0,
                  color:'#C6D0D8'
                }, // 坐标轴文本属性配置
                position: 'end'
              }}
              tickLine = {{
                lineWidth: 1, // 刻度线宽
                stroke: '#C6D0D8', // 刻度线的颜色
                length: -5, // 刻度线的长度, **原来的属性为 line**,可以通过将值设置为负数来改变其在轴上的方向
                inside:true
              }}
              label={{
                textStyle: {
                  textAlign: 'center', // 文本对齐方向，可取值为： start center end
                  fill: '#C6D0D8', // 文本的颜色
                }
              }}
              line={{
                stroke: '#C6D0D8', // 颜色
              }}
            />

            {/* y坐标轴 */}
            <Axis
              name="value"  //name决定是x还是y
              grid={{
                align: 'bottom', // 网格顶点从两个刻度中间开始
                lineStyle: {
                  stroke: '#C6D0D8', // 网格线的颜色
                  lineWidth: 1, // 网格线的宽度复制代码
                  lineDash: [4, 0] // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
                }, // 网格线的样式配置，原有属性为 line
                // alternateColor: '#ccc' || ['#f80', '#ccc'], // 为网格设置交替的背景色，指定一个值则先渲染奇数层，两个值则交替渲染。**代替原有的 odd 和 even 属性**
              }}
              label={{
                offset:20,
                textStyle: {
                  textAlign: 'center', // 文本对齐方向，可取值为： start center end
                  fill: '#C6D0D8', // 文本的颜色
                }
              }}
            />

            <Legend //图例
              title={null}
              position="bottom"
              // offsetY={-10}
              // offsetX={-16}
              allowAllCanceled={false}
              marker="circle"
              itemFormatter={(val) => {
                    return val
                // }
              }}
            />
            {/* 几何标记对象，主要用以描述你要画的是什么图形（直方图、折线图、饼状图、区域图）：interval是直方图 */}
            <Geom
              type="line"
              position="Time*value"
              opacity={1} //透明度
              color={['type',  //通过下标去取不同的预设颜色的值进行设置
                (type)=>{ 
                  let typeList = getFilterName(data,'Time')
                  let colorIndex = colorSet(typeList,type)
                  return FlowColorList[colorIndex]
              }]}
              shape="smooth"
              size={3}
              tooltip={['Time*value*type', (Time, value, type) => {  //格式化显示内容模板
                return {
                  //自定义 tooltip 上显示的 title 显示内容等。
                  title: '时间：' + Time,
                  name: type + ' 的流量值',
                  value: value + ' m³/h'
                };
              }]}
            />

            {/* 转折点的相关配置 */}
            <Geom
              type="point"
              position="Time*value"
              size={4}
              shape={'hyphen'}
              style={{ stroke: '#fff', lineWidth: 0 }}
              color={['type',
                (type)=>{
                  let typeList = getFilterName(data,'Time')
                  let colorIndex = colorSet(typeList,type)
                  return FlowColorList[colorIndex]
              }]}
              tooltip={['Time*value*type', (Time, value, type) => {  //格式化显示内容模板
                return {
                  //自定义 tooltip 上显示的 title 显示内容等。
                  title: '时间：' + Time,
                  name: type+ ' 的流量值',
                  value: value+ ' m³/h'
                };
              }]}
            />
          </Charts>
        </Panel>
    </>
    )
  }
}

export default FlowChart