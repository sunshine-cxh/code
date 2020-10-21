/*
 * @Descripttion : SubPageLayout
 * @Author       : wuhaidong
 * @Date         : 2020-06-08 17:56:38
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-06-09 11:06:59
 */
import React, { Component } from 'react'
import cx from 'classnames'
import Layout from 'components/Layout'
import './style/index.less'

class SubPageLayout extends Component {
  static defaultProps = {
    prefixCls: 'sub-page-layout',
  }

  render() {
    const { prefixCls, children, className, ...otherProps } = this.props
    let classname = cx(prefixCls, className)
    return (
      <Layout className={classname} {...otherProps}>
        {children}
      </Layout>
    )
  }
}

export default SubPageLayout
