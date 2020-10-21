/*
 * @Description  : Select 选择器
 * @Author       : wuhaidong
 * @Date         : 2020-03-19 09:36:52
 * @LastEditTime : 2020-06-22 13:57:22
 * @LastEditors  : hezihua
 */

import React, { Component } from 'react'
import { Select } from 'antd'
import cx from 'classnames'

import './style/index.less'

export default class extends Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    width: 255, // 默认宽度 255px
    expand: '', // 自定义拓展的模式 flow--> 流程审批
    allowClear: false
  }

  render() {
    let { options, width, expand, className, allowClear, getPopupContainer, ...otherProps } = this.props

    if (getPopupContainer) {
      otherProps.getPopupContainer = getPopupContainer
    } else {
      otherProps.getPopupContainer = (node) => {
        if (node) {
          return node.parentNode
        }
        return document.body
      }
    }

    return (
      <Select
        allowClear={allowClear}
        getPopupContainer={getPopupContainer}
        className={cx('antui-select', { 'antui-select-flow': expand === 'flow' }, className)}
        style={{ width }}
        {...otherProps}
      >
        {Array.isArray(options) && options.length
          ? options.map((option) => (
              <Select.Option key={option.code} value={option.code} title={option.codeName}>
                {option.codeName}
              </Select.Option>
            ))
          : null}
      </Select>
    )
  }
}
