/*
 * @Descripttion : 流程图g6实现
 * @Author       : hezihua
 * @Date         : 2020-05-08 16:49:53
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-05-09 14:16:27
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import Drawer from 'components/Drawer'
import Dagre from 'components/G6'
import data from './g6Data.js'

export default class extends Component {
  render() {
    let { visible, onVisible } = this.props
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
    let DagreProps = {
      data,
      id: 'container',
    }
    return (
      <Drawer {...drawerProps}>
        <Dagre {...DagreProps}></Dagre>
      </Drawer>
    )
  }
}
