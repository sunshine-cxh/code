/*
 * @Descripttion : 流程图timeline 实现
 * @Author       : hezihua
 * @Date         : 2020-05-06 16:13:35
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-05-19 16:32:18
 */


import React, { Component } from 'react'
import { connect } from 'dva'
import Timeline from 'components/Timeline'
import Drawer from 'components/Drawer'

@connect(({ pickingApply, loading }) => ({
  pickingApply,
  loading: loading.models.pickingApply
}))
export default class extends Component {
  render() {

    let { visible, onVisible, pickingApply: { flowchart } } = this.props
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
      columns: flowchart
    }
    return <Drawer {...drawerProps}>
      <Timeline {...timelineProps}></Timeline>
    </Drawer>
  }
}