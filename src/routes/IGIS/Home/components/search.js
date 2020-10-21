/*
 * @Descripttion :
 * @Author       : xuqiufeng
 * @Date         : 2020-06-28 17:07:40
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-07-30 15:06:54
 */

import { connect } from 'dva'
import React, { Component } from 'react'
import { Tabs, Slider } from 'antd'
import AutoCompleteHistory from 'components/AutoCompleteHistory'
import Icon from 'components/Icon'
import Tree from 'components/Tree'
import Button from 'components/Button'

import logoImg from 'assets/images/logo.png'
const { TabPane } = Tabs
const { TreeNode } = Tree

let productList = [
  {
    name: '管道GD 005号',
  },
  {
    name: '阀门 023402',
  },
  {
    name: '阀门 00323',
  },
  {
    name: '气源 00234大庆',
  },
  {
    name: '气源 00542盐田',
  },
  {
    name: '气源 00234盐田',
  },
  {
    name: '气源 00233盐田',
  },
]
@connect(({ geographyHome, global }) => ({
  geographyHome,
  global,
}))
export default class Search extends Component {
  state = {
    searchList: false,
  }
  //tree---选择
  handleFunctionCheck = (checkedKeys, info) => {
    let submitCheckedKeys = checkedKeys.concat(info.halfCheckedKeys)
    this.props.dispatch({
      type: 'role/@change',
      payload: {
        functionCheckedKeys: checkedKeys,
        submitFunctionCheckedKeys: submitCheckedKeys,
      },
    })
  }

  //tree nodes
  renderTreeNodes = (data) =>
    data.map((item) => {
      if (item.children) {
        return (
          <TreeNode
            title={
              <div className="tree-title">
                <span>{item.title}</span>
                <Slider className="slider-opacity" />
              </div>
            }
            // icon={<Slider className="slider-opacity" />}
            icon={<Icon antd type="stock" className="slider-icon" />}
            key={item.key}
            dataRef={item}
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return (
        <TreeNode
          title={
            <div className="tree-title">
              <span>{item.title}</span>
              <Slider className="slider-opacity" />
            </div>
          }
          icon={<Icon antd type="stock" className="slider-icon" />}
          // icon={<Slider className="slider-opacity" />}
          key={item.key}
          dataRef={item}
        />
      )
    })

  searchHandle() {
    let { dispatch } = this.props

    dispatch({
      type: 'geographyHome/@change',
      payload: {
        centralCoordinates: [120.171129436286677, 30.220808743347998],
      },
    })
    this.props.setCenter()
  }
  render() {
    let { searchList } = this.state
    let {
      geographyHome: { dataSource, treeData, checkedKeys, expandedKeys },
      tableState,
    } = this.props
    return (
      <div className="search-wrap">
        <div className="search">
          {searchList == false ? (
            <div className="search-bar">
              <img src={logoImg} className="logo" />
              <AutoCompleteHistory
                dataSource={dataSource}
                searchHandle={this.searchHandle.bind(this)}
              />
              <Icon
                antd
                type="unordered-list"
                className="search-list-icon"
                onClick={() => {
                  this.setState({
                    searchList: true,
                  })
                }}
              />
            </div>
          ) : (
            <div className={`search-list ${searchList == false ? null : 'active'}`}>
              <div className="search-list-title">
                <Icon antd type="unordered-list" className="search-icon" />
                <Icon
                  antd
                  type="close"
                  className="search-icon search-close"
                  onClick={() => {
                    this.setState({
                      searchList: false,
                    })
                    this.props.tableChange('close')
                  }}
                />
              </div>
              <div className="search-list-content">
                <div className="search-tool">
                  <Icon antd type="unordered-list" className="search-icon" />
                  <Icon antd type="menu-unfold" className="search-icon" />
                  <Icon
                    antd
                    type="table"
                    className={`search-icon ${tableState == true ? 'active' : null}`}
                    onClick={() => {
                      this.props.tableChange()
                    }}
                  />
                </div>
                <Tabs className="search-tabs" defaultActiveKey="1">
                  <TabPane tab={<Button className="btn">服务资源</Button>} key="1">
                    <div className="search-list-content-main">
                      <Tree
                        className="module-tree"
                        checkable
                        showIcon
                        // showLine
                        blockNode
                        defaultExpandAll={true}
                        // expandedKeys={expandedKeys}
                        autoExpandParent={true}
                        // checkedKeys={checkedKeys}
                        onCheck={this.handleFunctionCheck}
                      >
                        {this.renderTreeNodes(treeData)}
                      </Tree>
                    </div>
                  </TabPane>
                  <TabPane tab={<Button className="btn">专题列表</Button>} key="2">
                    <div className="product-list">
                      {productList.map((item, i) => (
                        <div className="product-item" key={i}>
                          <Icon antd type="compass" className="search-icon" />
                          <span className="product-name">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
