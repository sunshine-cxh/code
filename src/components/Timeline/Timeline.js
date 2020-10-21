/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-06 16:30:10
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-12 17:44:39
 */

import React, { Component } from 'react'
import { Timeline } from 'antd';
import './style/index.less'

export default class extends Component {
  constructor() {
    super()
  }
  render () {
    let { columns, type } = this.props
    let { Item } = Timeline
    let items = []
    if(type === 1) {
      items = columns.map(item=> {
        return <Item  key={item.id} color={item.isNode === 1? 'red' : 'blue'}>
          <div className="main-text">{item.auditorName}</div>
          <div className="sub-text">{item.dept}</div>
          <div className="sub-text">{item.auditTime}</div>
        </Item>
      })
    } else if(type === 2) {
      items = columns.map(item=> {
        return <Item  key={item.id}>
          <div className="main-text">{item.approverName}</div>
        </Item>
      })
    }
    return (<Timeline {...this.props}>
      {
        items
      }
    </Timeline>)
  }
}