/*
 * @Descripttion : input组件
 * @Author       : wuhaidong
 * @Date         : 2020-04-28 12:07:19
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-12 14:43:52
 */

import React, { Component } from 'react'
import { Input } from 'antd'

import './style/index.less'

export default class extends Component {
  static defaultProps = {
    width: 255, // 默认宽度 255px
    allowClear: false,
    autoSize: { minRows: 1, maxRows: 5 },
  }

  inputChangeHandler(e) {
    let { onChange } = this.props
    const ev = e || window.event
    const { value } = ev.currentTarget
    onChange && onChange(value)
  }

  render() {
    let { type, allowClear, width, autoSize, ...otherProps } = this.props

    let TextAreaHeight = 40 * autoSize.minRows
    return (
      <>
        {type !== 'textarea' ? (
          <Input className="antui-input" type={type} allowClear={allowClear} style={{ width }} {...otherProps} onChange={this.inputChangeHandler.bind(this)} />
        ) : (
          <Input.TextArea
            allowClear={allowClear}
            className="antui-input antui-textarea"
            style={{ height: TextAreaHeight }}
            {...otherProps}
            onChange={this.inputChangeHandler.bind(this)}
          />
        )}
      </>
    )
  }
}
