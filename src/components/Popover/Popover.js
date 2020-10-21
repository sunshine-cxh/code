/*
 * @Descripttion : popover 气泡卡片
 * @Author       : wuhaidong
 * @Date         : 2020-03-20 17:56:38
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-03-25 14:04:22
 */

import React, { Component } from 'react'
import { Popover } from 'antd'
import cx from 'classnames'
import './style/index.less'

export default class extends Component {

  static defaultProps = {
    trigger: 'click',
    placement: 'bottom',
  }

  render() {
    const { children, trigger, placement, overlayClassName, ...otherProps } = this.props
    const classnames = cx('navbar-popup', overlayClassName)

    return (
      <Popover overlayClassName={classnames} trigger={trigger} placement={placement} {...otherProps}>
        {children}
      </Popover>
    )
  }
}
