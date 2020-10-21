/*
 * @Descripttion : 流程图timeline 实现
 * @Author       : hezihua
 * @Date         : 2020-05-06 16:13:35
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-01 14:14:02
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import Timeline from 'components/Timeline'
import Drawer from 'components/Drawer'

@connect(({ external, loading }) => ({
  external,
  loading: loading.models.external,
}))
export default class extends Component {
  render() {
    let {
      visible,
      onVisible,
      external: { flowchart },
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
