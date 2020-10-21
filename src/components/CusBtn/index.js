/*
 * @Descripttion : 用于点击选择采购计划   采购申请
 * @Author       : hezihua
 * @Date         : 2020-05-12 11:01:45
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 14:00:34
 */

import React, { Component } from 'react'
// import Icon from 'components/Icon'
import Tooltip from 'components/Tooltip'
import './index.less'
import { Icon } from 'antd'
import { message } from 'antd';

export default class extends Component {
  static defaultProps={
    isFit: true,
    warning: '这是一个警告'
  }
  render() {
    let { onDelete, onChangeVisible, list, type, keyWord, placeHolder, isFit, warning, onSuccess } = this.props

    let items = []
    if (type === 1) {
      items = list.map((item) => {
        return (
          <span key={Math.random()} className="text-btn">
            {item[keyWord] || item.sn}
          </span>
        )
      })
    } else if (type === 2) {
      items = list.map((item, i) => {
        let arrow = list.length - 1 === i ? '' : ' >'
        return (
          <span key={Math.random()} className="text-btn">
            {item.approverName} {arrow}
          </span>
        )
      })
    }
    return (
      <div
        className="custom-btn"
        onClick={(e) => {
          if(isFit) {
            onChangeVisible(true)
            if(onSuccess) {
              onSuccess()
            }
            
          } else {
            message.warning(warning);
          }
          
        }}
      >
        <div className="text_side">
          {items.length > 0 ? (
            items
          ) : (
            <span className="place-holder">{placeHolder || '请选择'}</span>
          )}
        </div>
        {list.length > 0 ? (
          <Icon
            className="icon-item delete-btn"
            type="close-circle"
            theme="filled"
            onClick={(e) => {
              onDelete(e)
            }}
          />
        ) : null}
      </div>
    )
  }
}
