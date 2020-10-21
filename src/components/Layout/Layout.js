/*
 * @Descripttion : Layout
 * @Author       : wuhaidong
 * @Date         : 2020-03-20 17:56:38
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-06-12 16:24:00
 */
import React, { Component } from 'react'
import cx from 'classnames'
import { Layout } from 'antd'
import './style/index.less'

class CustomLayout extends Component {
  static defaultProps = {
    prefixCls: 'full-layout antui-layout',
  }

  render() {
    const { prefixCls, children, className, ...otherProps } = this.props
    let classname = cx(prefixCls, className)
    return (
      <Layout className={classname} {...otherProps}>
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    )
  }
}

CustomLayout.Content = Layout.Content

export default CustomLayout
