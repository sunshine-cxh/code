/*
 * @Descripttion :
 * @Author       : xuqiufeng
 * @Date         : 2020-07-28 09:59:59
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-09-02 15:57:22
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import { Tabs } from 'antd'

import Checkbox from 'components/Checkbox'
import Icon from 'components/Icon'
import Button from 'components/Button'
import Switch from 'components/Switch'

import '../style/index.less'
import logoImg from 'assets/images/logo.png'

const { TabPane } = Tabs

@connect(({ geographyBackstage, loading }) => ({
  geographyBackstage,
  loading: loading.models.geographyBackstage,
}))
export default class NetworkMap extends Component {
  constructor(props) {
    super(props)
  }
  state = {}
  componentDidMount() {}
  callback(key) {
    console.log(key)
  }
  onChange = async (checked, name) => {
    let { dispatch } = this.props
    await dispatch({
      type: 'geographyBackstage/@change',
      payload: {
        layerVisible: checked,
        layerName: name,
      },
    })
    this.props.toggleLayers()
  }

  render() {
    return (
      <div className="backstage-header">
        <div className="header-title">
          <img src={logoImg} alt="" className="logo" />
          <h2>ILNG地图编辑器</h2>
          <Icon type="right" antd className="icon-right" />
          <h3>苏州管网</h3>
        </div>
        <div className="header-tool">
          <div className="coordinate" id="mouse-position"></div>
          <Tabs className="tab-content" onChange={this.callback}>
            <TabPane
              tab={
                <div className="tool-item">
                  <Icon type="question-circle" antd className="icon-tab" />
                  <span>帮助</span>
                </div>
              }
              key="1"
            >
              <div className="tool-content"></div>
            </TabPane>
            <TabPane
              tab={
                <div className="tool-item">
                  <Icon type="setting" antd className="icon-tab" />
                  <span>设置</span>
                </div>
              }
              key="2"
            >
              <div className="map-style">
                <span className="title">选择底图</span>
                <div className="style-item">
                  <span>卫星地图</span>
                  <Switch
                    defaultChecked
                    onChange={(checked) => {
                      this.onChange(checked, 'Map_satellite')
                    }}
                    className="style-switch"
                  />
                </div>
                {/* <div className="style-item">
                  <span>地形地图</span>
                  <Switch
                    defaultChecked
                    onChange={(checked) => {
                      this.onChange(checked, 'Map_tile')
                    }}
                    className="style-switch"
                  />
                </div> */}
                <div className="style-item">
                  <span>影像地图</span>
                  <Switch
                    defaultChecked
                    onChange={(checked) => {
                      this.onChange(checked, 'Map_tile')
                    }}
                    className="style-switch"
                  />
                </div>
              </div>
            </TabPane>
            <TabPane
              tab={
                <div className="tool-item" onClick={this.props.savePng}>
                  <Icon type="snippets" antd className="icon-tab" />
                  <span>打印</span>
                </div>
              }
              key="3"
            >
              Content of Tab Pane 3
            </TabPane>
            <TabPane
              tab={
                <div className="tool-item">
                  <Icon type="share-alt" antd className="icon-tab" />
                  <span>分享</span>
                </div>
              }
              key="4"
            >
              Content of Tab Pane 4
            </TabPane>
          </Tabs>

          <div className="header-tool-item">
            <Button type="primary">发布</Button>
          </div>
        </div>
      </div>
    )
  }
}
