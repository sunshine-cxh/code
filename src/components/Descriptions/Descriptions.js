/*
 * @Description  : Descriptions 描述列表组件 
                   具体api可参照：https://ant.design/components/descriptions-cn/
 * @Author       : caojiarong
 * @Date         : 2020-06-01 15:36:52
 * @LastEditTime : 2020-07-02 14:52:10
 * @LastEditors  : hezihua
 */

import React, { Component } from 'react'
import { Descriptions } from 'antd'
import cx from 'classnames'
import './style/index.less'

export default class extends Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    bordered:true,         //默认带边框
    title: '基本信息',     //默认标题是：基本信息
  }

  render() {
    let {
      width,
      className,
      title,               //表格描述标题
      dataItems,          //数据源
      columns,           //表头配置
      bordered,         //边框
      ...otherProps
    } = this.props
    otherProps.getPopupContainer = (node) => {
      if (node) {
        return node.parentNode
      }
      return document.body
    }
    return (
      <Descriptions
        title={<span className='title'>{title}</span>}
        className={cx('antui-description', className)}
        bordered
        {...otherProps}
      >
        {Array.isArray(columns) && columns.length
          ? columns.map((option) => (
            
            (option.isShow == undefined || option.isShow == true) &&
            <Descriptions.Item key={Math.random()} label={option.title} span={option.span}>
              {
                option.render ? option.render(dataItems[option.name], dataItems) :
                dataItems[option.name]
              }
            </Descriptions.Item>
            ))
          : null}
      </Descriptions>
    )
  }
}
