/*
 * @Descripttion : SeachBarSelect
 * @Author       : wuhaidong
 * @Date         : 2020-02-25 12:03:29
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-22 09:26:34
 */

import React from 'react'
import { Select } from 'antd'
import './style/SeachBarSelect.less'

export default class extends React.Component {
  static propTypes = {}

  render() {
    let { getPopupContainer, dict, ...otherProps } = this.props

    if (getPopupContainer) {
      otherProps.getPopupContainer = getPopupContainer
    } else {
      //默认渲染到 body上
      otherProps.getPopupContainer = (node) => {
        if (node) {
          return node.parentNode
        }
        return document.body
      }
    }
    return (
      <div className="antui-select">
        <Select {...otherProps}>
          {dict.map((dic, i) => (
            <Select.Option key={dic.code} value={dic.code} title={dic.codeName}>
              {dic.codeName}
            </Select.Option>
          ))}
        </Select>
      </div>
    )
  }
}
