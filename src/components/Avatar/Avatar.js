/*
 * @Descripttion : Avatar
 * @Author       : wuhaidong
 * @Date         : 2020-03-20 17:56:38
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-03-25 11:51:48
 */

import React, { Component } from 'react'
import { Avatar } from 'antd'

export default class extends Component {

  static defaultProps = {
  }

  render() {
    const { children, ...otherProps } = this.props
    return (
      <Avatar {...otherProps}>
        {children}
      </Avatar>
    )
  }
}
