/*
 * @Descripttion : BizCharts是基于G2封装的图标库 官方文档：https://bizcharts.net/products/bizCharts/api/bizcharts
 * @Author       : wuhaidong
 * @Date         : 2019-12-18 17:04:56
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-03-26 10:23:43
 */
import React, { PureComponent } from 'react'
import * as BizCharts from 'bizcharts'
import resizeMe from '@/decorator/resizeMe'
const { Chart } = BizCharts

@resizeMe({ refreshRate: 50 })
class Charts extends PureComponent {
  onGetG2Instance = chart => {
    this.chart = chart
  }

  render() {
    const { children, size, ...otherProps } = this.props
    const { width, height } = size

    return (
      <Chart
        height={height}
        width={width}
        padding={'auto'}
        {...otherProps}
        onGetG2Instance={(chart) => {
          this.chart = chart
        }}
      >
        {children}
      </Chart>
    )
  }
}

BizCharts.Charts = Charts
export default BizCharts
