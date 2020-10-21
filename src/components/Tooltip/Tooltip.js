/*
 * @Descripttion : Avatar
 * @Author       : wuhaidong
 * @Date         : 2020-03-20 17:56:38
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-04-16 15:45:19
 */

import React, { Component } from 'react'
import { Tooltip } from 'antd'
import './style/index.less'

export default class extends Component {
  static defaultProps = {
    prefixCls: 'antui-tooltip',
  };

  render() {
    const { prefixCls, children, ...otherProps } = this.props
    return (
      <Tooltip
        overlayClassName={prefixCls}
        {...otherProps}
      >
        {children}
      </Tooltip>
    )
  }
}
