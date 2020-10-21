/*
 * @Descripttion : 流程图timeline 实现
 * @Author       : hezihua
 * @Date         : 2020-05-06 16:13:35
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-17 15:17:43
 */


import React, { Component } from 'react'
import { connect } from 'dva'
import Timeline from 'components/Timeline'
import Drawer from 'components/Drawer'

@connect(({ willCheck, loading }) => ({
  willCheck,
  loading: loading.models.willCheck
}))
export default class extends Component {
  render() {

    let { visible, onVisible, willCheck: { flowchart } } = this.props
    let drawerProps = {
      title: '审核信息',
      visible,
      onClose:()=> {
        onVisible(false)
      },
      modalOpts: {
        width: 570
      }
    }
    let timelineProps = {
      type: 1,
      columns: flowchart
    }
    console.log(timelineProps)
    return <Drawer {...drawerProps}>
      <Timeline {...timelineProps}></Timeline>
    </Drawer>
  }
}