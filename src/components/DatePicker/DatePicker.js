/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-06-03 09:42:13
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-29 09:00:33
 */ 
import React, { Component } from 'react'
import { DatePicker } from 'antd'

import './style/index.less'

export default class extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { getPopupContainer, type, ...otherProps } = this.props
    if (getPopupContainer) {
      otherProps.getCalendarContainer = getPopupContainer
    } else {
      otherProps.getCalendarContainer = (node) => {
        if (node) {
          return node.parentNode
        }
        return document.body
      }
    }
    if (type === 'range') {
      return (
        <DatePicker.RangePicker {...otherProps}/>
      )
    }

    return (
      <DatePicker {...otherProps} />
    )
  }
}