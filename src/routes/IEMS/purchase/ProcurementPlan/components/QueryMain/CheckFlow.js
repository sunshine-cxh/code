/*
 * @Descripttion : 流程图timeline 实现
 * @Author       : hezihua
 * @Date         : 2020-05-06 16:13:35
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-02 14:45:39
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import Timeline from 'components/Timeline'
import Drawer from 'components/Drawer'

@connect(({ procurementPlan, loading }) => ({
  procurementPlan,
  loading: loading.models.procurementPlan,
}))
export default class extends Component {
  render() {
    let {
      visible,
      onVisible,
      procurementPlan: { flowchart },
    } = this.props
    let drawerProps = {
      title: '审核信息',
      visible,
      onClose: () => {
        onVisible(false)
      },
      modalOpts: {
        width: 570,
      },
    }
    let timelineProps = {
      columns: flowchart,
      type: 1,
    }
    return (
      <Drawer {...drawerProps}>
        <Timeline {...timelineProps}></Timeline>
      </Drawer>
    )
  }
}