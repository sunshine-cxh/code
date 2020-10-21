/*
 * @Author       : xuqiufeng
 * @Date         : 2020-06-29 14:29:07
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-07-24 09:25:01
 * @FilePath     : \ilng-shuaizhen-admin\src\components\AutoCompleteHistory\AutoCompleteHistory.js
 */

import React, { Component } from 'react'
import { AutoComplete, Icon, Input } from 'antd'
// import Input from 'components/Input'
import './style/index.less'

const { Option } = AutoComplete

export default class extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    keyword: '23333',
  }
  searchHandle() {
    console.log(1222)
  }
  render() {
    let { dataSource, ...otherProps } = this.props

    const options = dataSource
      .map((group) => (
        <Option key={group.title}>
          <Icon type="history" />
          <span className="certain-search-item-title">{group.title}</span>
        </Option>
      ))
      .concat([
        <Option key=" " className="show-all">
          <span>清除搜索记录</span>
        </Option>,
      ])
    return (
      <div className="certain-category-search-wrapper" style={{ width: 400 }}>
        <AutoComplete
          className="certain-category-search"
          dropdownClassName="certain-category-search-dropdown"
          dropdownMatchSelectWidth={false}
          dropdownStyle={{
            width: 400,
          }}
          size="large"
          style={{ width: '100%' }}
          dataSource={options}
          optionLabelProp="value"
          backfill
          onChange={(e) => {
            this.setState({
              keyword: e,
            })
          }}
        >
          <Input
            placeholder="关键字检索"
            className="certain-category-input"
            suffix={<Icon type="search" className="certain-category-icon" onClick={this.props.searchHandle}/>}
          />
        </AutoComplete>
      </div>
    )
  }
}
