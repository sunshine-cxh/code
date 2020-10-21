/*
 * @Descripttion :
 * @Author       : xuqiufeng
 * @Date         : 2020-07-28 09:59:59
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-09-02 14:39:41
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import { Tabs, Slider } from 'antd'
import { Form } from 'antd'

import BaseComponent from 'components/BaseComponent'
import Checkbox from 'components/Checkbox'
import Icon from 'components/Icon'
import Button from 'components/Button'
import Tree from 'components/Tree'
import Search from 'components/Search'
import { notice } from 'components/Notification'

import FormInfos from './formInfos'
import '../style/index.less'

const { TabPane } = Tabs
const { TreeNode } = Tree
const createForm = Form.create
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
}
@connect(({ geographyBackstage, loading }) => ({
  geographyBackstage,
  loading: loading.models.geographyBackstage,
}))
class Tool extends BaseComponent {
  constructor(props) {
    super(props)
  }
  state = {
    importVisible: false,
    formVisible: false,
  }
  componentDidMount() {
    const { dispatch } = this.props

    dispatch({
      type: 'geographyBackstage/getLayerLists',
      payload: {
        success: () => {},
      },
    })
  }
  callback(key) {
    console.log(key)
  }
  handleSubmit = () => {
    const { dispatch } = this.props
    let { validateFields, getFieldsValue } = this.form.props.form
    let parameters = getFieldsValue()
    parameters.status ? (parameters.status = 1) : (parameters.status = 0)
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'geographyBackstage/submit',
          payload: {
            parameters: parameters,
            success: () => {
              notice.success('保存成功')
              this.setState({
                formVisible: false,
              })
            },
          },
        })
      }
    })
  }
  handleReset = () => {}
  //tree---选择
  handleFunctionCheck = (checkedKeys, info) => {
    let submitCheckedKeys = checkedKeys.concat(info.halfCheckedKeys)
    this.props.dispatch({
      type: 'geographyHome/@change',
      payload: {
        functionCheckedKeys: checkedKeys,
        submitFunctionCheckedKeys: submitCheckedKeys,
      },
    })
  }
  conduit(key, value) {
    this.setState({
      importVisible: false,
      searchVisible: false,
      formVisible: false,
      [key]: value,
    })
  }
  tableVisible(key) {
    let {
      dispatch,
      geographyBackstage: { tableVisible },
    } = this.props

    dispatch({
      type: 'geographyBackstage/@change',
      payload: {
        tableVisible: !tableVisible,
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
                <div className="tree-operate">
                  <Icon
                    antd
                    type="table"
                    className="tree-icon"
                    onClick={() => {
                      this.tableVisible(item.key)
                    }}
                  />
                  <Icon
                    antd
                    type="plus-circle"
                    className="tree-icon"
                    onClick={() => {
                      this.conduit('formVisible', !this.state.formVisible)
                    }}
                  />
                </div>
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
              <div className="tree-operate">
                <Icon
                  antd
                  type="table"
                  className="tree-icon"
                  onClick={() => {
                    this.tableVisible(item.key)
                  }}
                />
                <Icon
                  antd
                  type="plus-circle"
                  className="tree-icon"
                  onClick={() => {
                    this.conduit('formVisible', !this.state.formVisible)
                    let {
                      dispatch,
                      geographyBackstage: { layerKey },
                    } = this.props

                    dispatch({
                      type: 'geographyBackstage/@change',
                      payload: {
                        layerKey: item.key,
                      },
                    })
                    console.log('Tool -> layerKey', layerKey)
                  }}
                />
              </div>
            </div>
          }
          icon={<Icon antd type="stock" className="slider-icon" />}
          // icon={<Slider className="slider-opacity" />}
          key={item.key}
          dataRef={item}
        />
      )
    })

  render() {
    let {
      geographyBackstage: { layerLists, treeData },
    } = this.props
    let { importVisible, searchVisible, formVisible } = this.state

    return (
      <div className="backstage-tool">
        <div className="tool-search">
          <div className="tool-title">
            <Icon type="file-search" className="icon-title" antd />
            <p className="txt-title">搜索管道名称、设备编号等</p>
          </div>
          <Search
            placeholder="请输入关键字"
            onSearch={(value) => console.log(value)}
            style={{ width: 300 }}
          />
        </div>
        <div className="tool-list">
          <Icon
            type="plus-square"
            theme="filled"
            antd
            className={`icon-tool-list ${formVisible ? 'active' : ''}`}
            onClick={() => {
              this.conduit('formVisible', !formVisible)
            }}
          />
          <Icon type="eye-invisible" antd className="icon-tool-list" theme="filled" />
          <Icon type="delete" antd className="icon-tool-list" />
        </div>

        <Tabs className="tab-content" onChange={this.callback}>
          <TabPane
            tab={
              <div className="tool-item">
                <span>图层</span>
              </div>
            }
            key="2"
          >
            <div className="tool-main">
              <Tree
                className="module-tree"
                showIcon
                checkable
                // showLine
                blockNode
                defaultExpandAll={true}
                // expandedKeys={expandedKeys}
                autoExpandParent={true}
                // checkedKeys={checkedKeys}
                onCheck={this.handleFunctionCheck}
              >
                {this.renderTreeNodes(layerLists)}
              </Tree>
            </div>
          </TabPane>
          <TabPane
            tab={
              <div className="tool-item">
                <span>组件</span>
              </div>
            }
            key="1"
          >
            <div className="tool-main">
              <div className="tool-layer">
                <Icon type="tool" theme="filled" antd className="icon-layer" />
                <span>管节</span>
              </div>
              <div className="tool-layer">
                <Icon type="tool" theme="filled" antd className="icon-layer" />
                <span>气源门站</span>
              </div>
              <div className="tool-layer">
                <Icon type="tool" theme="filled" antd className="icon-layer" />
                <span>球阀</span>
              </div>
              <div className="tool-layer">
                <Icon type="tool" theme="filled" antd className="icon-layer" />
                <span>测量桩</span>
              </div>
              <div className="tool-layer">
                <Icon type="tool" theme="filled" antd className="icon-layer" />
                <span>调压站</span>
              </div>
            </div>
          </TabPane>
        </Tabs>
        {importVisible && (
          <div className="tool-dialog">
            <div className="tool-title">
              <Icon type="retweet" className="icon-title" antd />
              <p className="txt-title">添加管道</p>
              <Icon
                type="close"
                antd
                className="icon-close"
                onClick={() => {
                  this.conduit('importVisible', !importVisible)
                }}
              />
            </div>

            <div className="dialog-main">
              <div className="btn-import">
                <Button type="dashed" className="import">
                  Excel 导入
                </Button>
                <Button type="dashed" className="import">
                  Excel 模板下载
                </Button>
              </div>
              <div className="list-conduit">
                <p>01管</p>
                <p>02管</p>
                <p>03管</p>
              </div>
            </div>
          </div>
        )}

        {formVisible && (
          <div className="tool-dialog form-dialog">
            <div className="tool-title">
              <Icon type="deployment-unit" className="icon-title" antd />
              <p className="txt-title">新增管节</p>
              <Icon
                type="close"
                antd
                className="icon-close"
                onClick={() => {
                  this.conduit('formVisible', !formVisible)
                }}
              />
            </div>
            <div className="dialog-main">
              <FormInfos wrappedComponentRef={(form) => (this.form = form)} />
              <div className="form-btn">
                <Button className="reset-btn" onClick={this.handleReset}>
                  重置
                </Button>
                <Button type="primary" onClick={this.handleSubmit}>
                  提交
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
export default createForm()(Tool)
