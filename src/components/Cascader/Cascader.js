/*
 * @Description  : 级联选择组件
 * @Author       : luo jun
 * @Date         : 2020-03-20 08:48:42
 * @LastEditTime : 2020-06-24 10:41:31
 * @LastEditors  : hezihua
 */

import React, { Component } from 'react';
import { Cascader } from 'antd';

import './style/index.less';

export default class extends Component {
  constructor(props) {
    super(props);
  }

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
    return (
      <Cascader {...otherProps} allowClear={true}/>
    )
  }
};
