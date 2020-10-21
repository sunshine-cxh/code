/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-04-24 14:59:26
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-22 18:17:31
 */

import React, { Component } from 'react'
import { TreeSelect } from 'antd'
import './style/index.less'

export default class extends Component {
  render() {
    let { getPopupContainer, ...otherProps } = this.props
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
    return <TreeSelect {...otherProps}></TreeSelect>
  }
}
