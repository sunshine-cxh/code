/*
 * @Descripttion : 仿真压力
 * @Author       : hezihua
 * @Date         : 2020-07-01 15:11:37
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-20 08:50:56
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
import { flowColumns, PressureColorList, colorSet, getFilterName } from './columns'
import { CheckboxTree } from 'components/Checkbox'
import { flow } from 'lodash'
const { Content } = Layout
const { Charts, Axis, Geom, Tooltip, Legend, Coord, Guide } = G2

@connect(({ gateStationResult, loading }) => ({
  gateStationResult,
  loading: loading.models.gateStationResult,
}))
class PressureChart extends BaseComponent {
  render() {
    const data = [
      {
        month: 'Jan',
        city: 'Tokyo',
        temperature: 7,
      },
      {
        month: 'Jan',
        city: 'London',
        temperature: 3.9,
      },
      {
        month: 'Feb',
        city: 'Tokyo',
        temperature: 6.9,
      },
      {
        month: 'Feb',
        city: 'London',
        temperature: 4.2,
      },
      {
        month: 'Mar',
        city: 'Tokyo',
        temperature: 9.5,
      },
      {
        month: 'Mar',
        city: 'London',
        temperature: 5.7,
      },
      {
        month: 'Apr',
        city: 'Tokyo',
        temperature: 14.5,
      },
      {
        month: 'Apr',
        city: 'London',
        temperature: 8.5,
      },
      {
        month: 'May',
        city: 'Tokyo',
        temperature: 18.4,
      },
      {
        month: 'May',
        city: 'London',
        temperature: 11.9,
      },
      {
        month: 'Jun',
        city: 'Tokyo',
        temperature: 21.5,
      },
      {
        month: 'Jun',
        city: 'London',
        temperature: 15.2,
      },
      {
        month: 'Jul',
        city: 'Tokyo',
        temperature: 25.2,
      },
      {
        month: 'Jul',
        city: 'London',
        temperature: 17,
      },
      {
        month: 'Aug',
        city: 'Tokyo',
        temperature: 26.5,
      },
      {
        month: 'Aug',
        city: 'London',
        temperature: 16.6,
      },
      {
        month: 'Sep',
        city: 'Tokyo',
        temperature: 23.3,
      },
      {
        month: 'Sep',
        city: 'London',
        temperature: 14.2,
      },
      {
        month: 'Oct',
        city: 'Tokyo',
        temperature: 18.3,
      },
      {
        month: 'Oct',
        city: 'London',
        temperature: 10.3,
      },
      {
        month: 'Nov',
        city: 'Tokyo',
        temperature: 13.9,
      },
      {
        month: 'Nov',
        city: 'London',
        temperature: 6.6,
      },
      {
        month: 'Dec',
        city: 'Tokyo',
        temperature: 9.6,
      },
      {
        month: 'Dec',
        city: 'London',
        temperature: 4.8,
      },
    ]
    const cols = {
      month: {
        range: [0, 1],
      },
    }

    return (
      // <div>hhh</div>
      <>
        {/* <Panel absoluteTitle boxShadow> */}
        <div className="title-text">流量统计</div>
        <Charts height={220} data={data} scale={cols} forceFit>
          <Legend position="top-right" />
          <Axis
            name="month"
            grid={{
              align: 'bottom', // 网格顶点从两个刻度中间开始
              lineStyle: {
                stroke: '#C6D0D8', // 网格线的颜色
                lineWidth: 1, // 网格线的宽度复制代码
                lineDash: [4, 0], // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
              }, // 网格线的样式配置，原有属性为 line
              // alternateColor: '#ccc' || ['#f80', '#ccc'], // 为网格设置交替的背景色，指定一个值则先渲染奇数层，两个值则交替渲染。**代替原有的 odd 和 even 属性**
            }}
            label={{
              offset: 20,
              textStyle: {
                textAlign: 'center', // 文本对齐方向，可取值为： start center end
                fill: '#C6D0D8', // 文本的颜色
              },
            }}
            tickLine = {{
              lineWidth: 1, // 刻度线宽
              stroke: '#C6D0D8', // 刻度线的颜色
              length: -5, // 刻度线的长度, **原来的属性为 line**,可以通过将值设置为负数来改变其在轴上的方向
              inside:true
            }}
          />
          <Axis
            name="temperature"
            grid={null}
            label={{
              formatter: (val) => `${val}°C`,
            }}
          />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom type="line" position="month*temperature" size={2} color={'city'} shape={'smooth'} />
          <Geom
            type="point"
            position="month*temperature"
            size={4}
            shape={'circle'}
            color={'city'}
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
          />
        </Charts>
      </>
    )
  }
}

export default PressureChart
