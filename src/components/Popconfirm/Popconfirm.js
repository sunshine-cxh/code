/*
 * @Description  : 气泡确认框
 * @Author       : caojiarong
 * @Date         : 2020-05-15 15:10:52
 * @LastEditTime : 2020-05-15 15:44:29
 * @LastEditors  : caojiarong
 */

import React, { Component } from 'react'
import { Popconfirm } from 'antd'
import cx from 'classnames'

import './style/index.less'

export default class extends Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    width: 255, // 默认宽度 255px
  }

  render() {
    let {
      width,
      className,
      children,
      ...otherProps
    } = this.props
    let {props} = this
    return (
      <Popconfirm {...otherProps}>
        {children}
      </Popconfirm>
    )
  }
}
