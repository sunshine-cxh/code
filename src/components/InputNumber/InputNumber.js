/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-14 17:02:56
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-05-14 17:08:54
 */

import React, { Component } from 'react'
import { InputNumber } from 'antd'
import './style/index.less'

export default class extends Component {
  render (){
    return (
      <InputNumber {...this.props}></InputNumber>
    )
  }
}