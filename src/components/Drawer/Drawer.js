/*
 * @Description: 抽屉组件
 * @Author: luo jun
 * @Date: 2020-03-18 08:36:01
 * @LastEditTime : 2020-03-20 15:28:52
 * @LastEditors  : luo jun
 */

import React, { Component } from 'react'
import { Drawer } from 'antd'

import './style/index.less'

export default class extends Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    title: '',  // 标题
    width: 380, // 宽度
    visible: false,  // 是否显示
    mask: false,     // 是否展示蒙层
    placement: 'right',  // 默认从右边屏幕滑入
  }
  render() {
    const { props } = this

    return (
      <Drawer
        className="drawer__wrapper"
        title={props.title} mask={props.mask}
        width={props.width} visible={props.visible}
        placement={props.placement} onClose={props.onClose}>
          <section className="content__wrapper">
            { props.children }
          </section>
      </Drawer>
    )
  }
}
