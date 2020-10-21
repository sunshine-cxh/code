/*
 * @Descripttion : 今日用气趋势图表
 * @Author       : caojiarong
 * @Date         : 2020-07-01 15:11:37
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-28 13:57:02
 */
import React from 'react'
import BaseComponent from 'components/BaseComponent'
import G2 from 'components/Charts/G2'
import DataSet from '@antv/data-set'
import './index.less'
import {flowColumns, colorSet, getFilterName,TodayGasColorList,TodayGasColorList1} from './columns'
const { Charts, Axis, Geom, Tooltip, Legend} = G2


class TodayGasChart extends BaseComponent {
  
  render() {
    let {data} = this.props
    //压力曲线图
    let flowDv = new DataSet.View().source(data)
    flowDv.transform({
      type: 'fold',
      fields: getFilterName(flowColumns,'hourTime'),
      key: 'type',
      value: 'value',
    })
    const flowScale = {
      value: {
        alias: '(万m³)', // 数据字段的别名，会影响到轴的标题内容
      },
      hourTime: {
        range: [0.02, 0.98], //输出数据的范围，默认[0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。
        alias: '时', // 数据字段的别名，会影响到轴的标题内容
      },
    }
    
    return (
      <>
        <p className="today-gas-title">今日用气趋势图</p>
        <p className="chart-y-tips">(万m³)</p>
        <div style={{height:'78%'}}>
          <Charts
            // height={220} //图标高度
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
            />

            {/* X坐标轴 */}
            <Axis
              name="hourTime"  //name决定是x还是y
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
              name="value"  //name决定是x还是y
              grid={null}
              label={{
                offset:20,
                textStyle: {
                  textAlign: 'center', // 文本对齐方向，可取值为： start center end
                  fill: '#E1FFFE', // 文本的颜色
                }
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
                if(val == 'predictUseGas'){
                  return '预计用气量'
                }else if( val == 'actuallyUseGas'){
                  return '实际用气量'
                }
                return val
              }}
              offset={20}
            />
            
            {/* 转折点的相关配置 */}
            <Geom
              type="line"
              position="hourTime*value"
              shape={'smooth'}
              color={['type',
                (type)=>{
                  let typeList = getFilterName(flowColumns,'hourTime')
                  let colorIndex = colorSet(typeList,type)
                  return TodayGasColorList1[colorIndex]
                }]}

              tooltip={['hourTime*type*value', (hourTime,type, value)=>{ // array
                let thatName = ''
                if(type == 'predictUseGas'){
                  thatName = '预计用气量'
                }else if( type == 'actuallyUseGas'){
                  thatName = '实际用气量'
                }
                return {
                  title:'时间：' + hourTime,
                  name: thatName + '：',
                  value: value + ' 万m³'
                }
              }]}
            />
            <Geom
              type="point"
              position="hourTime*value"
              shape={'circle'}
              color={['type',
                (type)=>{
                  let typeList = getFilterName(flowColumns,'hourTime')
                  let colorIndex = colorSet(typeList,type)
                  return TodayGasColorList1[colorIndex]
              }]}
              tooltip={['hourTime*type*value', (hourTime,type, value)=>{ // array
                let thatName = ''
                if(type == 'predictUseGas'){
                  thatName = '预计用气量'
                }else if( type == 'actuallyUseGas'){
                  thatName = '实际用气量'
                }
                return {
                  title:'时间：' + hourTime,
                  name: thatName + '：',
                  value: value + ' (万m³)'
                }
              }]}  
            />
            {/* 几何标记对象，主要用以描述你要画的是什么图形（直方图、折线图、饼状图、区域图）：interval是直方图 */}
            <Geom
              type="area"
              position="hourTime*value"
              color={[
                'type',  //线条太多无法指定颜色
                (type)=>{
                  let typeList = getFilterName(flowColumns,'hourTime')
                  let colorIndex = colorSet(typeList,type)
                  return TodayGasColorList[colorIndex]
                }
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