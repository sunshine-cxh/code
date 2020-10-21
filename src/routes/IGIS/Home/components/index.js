/*
 * @Descripttion :
 * @Author       : xuqiufeng
 * @Date         : 2020-06-24 16:19:57
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-08-21 15:44:57
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Icon from 'components/Icon'
import BaseComponent from 'components/BaseComponent'

import Search from './search'
import Tool from './tool'
import NetworkMap from './map'
import Table from './table'
import '../style/index.less'

const createForm = Form.create

@connect(({ geographyHome, loading }) => ({
  geographyHome,
  loading: loading.models.geographyHome,
}))
class Home extends BaseComponent {
  constructor(props) {
    super(props)
  }
  state = {
    tableState: false,
    fullScreen: true,
  }
  componentDidMount() {}

  //全屏
  toggleFullScreen() {
    let that = this
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      that.setState({
        fullScreen: false,
      })
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
      }
    } else {
      that.setState({
        fullScreen: true,
      })
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    }
  }

  //表格
  tableChange(state) {
    if (state == 'close') {
      this.setState({ tableState: false })
      return
    }
    this.setState({ tableState: this.state.tableState == true ? false : true })
  }
  onRef = (ref) => {
    this.NetworkMap = ref
  }

  render() {
    let { tableState, fullScreen } = this.state
    return (
      <div className="geography-home">
        <NetworkMap onRef={this.onRef} />
        {fullScreen == true ? (
          <div className="">
            <div className="panel-search">
              <Search
                tableChange={this.tableChange.bind(this)}
                tableState={tableState}
                setCenter={() => {
                  this.NetworkMap.setCenter && this.NetworkMap.setCenter()
                }}
              />
            </div>
            <div className="panel-tool">
              <Tool
                wrappedComponentRef={(form) => (this.form = form)}
                toggleFullScreen={this.toggleFullScreen.bind(this)}
                zoomIn={() => {
                  this.NetworkMap.zoomIn && this.NetworkMap.zoomIn()
                }}
                zoomOut={() => {
                  this.NetworkMap.zoomOut && this.NetworkMap.zoomOut()
                }}
                sceneDrawLine={() => {
                  this.NetworkMap.sceneDrawLine && this.NetworkMap.sceneDrawLine()
                }}
                sceneDrawArea={() => {
                  this.NetworkMap.sceneDrawArea && this.NetworkMap.sceneDrawArea()
                }}
                sceneDrawPoint={() => {
                  this.NetworkMap.sceneDrawPoint && this.NetworkMap.sceneDrawPoint()
                }}
              />
            </div>
            {tableState == true ? (
              <Table className="panel-table" tableChange={this.tableChange.bind(this)} />
            ) : null}
          </div>
        ) : (
          <div className="panel-screen" onClick={this.toggleFullScreen.bind(this)}>
            <Icon type={'screen-full'} className="tool-icon"></Icon>
            <span>退出全屏</span>
          </div>
        )}
      </div>
    )
  }
}
export default createForm()(Home)
