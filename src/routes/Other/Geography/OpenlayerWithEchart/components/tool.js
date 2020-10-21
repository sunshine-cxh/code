/*
 * @Author       : xuqiufeng
 * @Date         : 2020-07-01 15:08:36
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-07-08 17:47:46
 * @FilePath     : \ilng.iomp.web\src\routes\IGIS\Home\components\tool.js
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import { Popover, Form, Slider } from 'antd'
import moment from 'utils/moment'
import BaseComponent from 'components/BaseComponent'
import Input from 'components/Input'
import Radio from 'components/Radio'
import Button from 'components/Button'
import Icon from 'components/Icon'

const { Item } = Form
const createForm = Form.create
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
}
const marks = {
  0: '00:00',
  6: '6:00',
  12: '12:00',
  18: '18:00',
  24: '24:00',
}
const week = ['一', '二', '三', '四', '五', '六', '日']
@connect(({ geographyHome, loading }) => ({
  geographyHome,
  loading: loading.models.geographyHome,
}))
class Tool extends BaseComponent {
  constructor(props) {
    super(props)
  }
  state = {
    visible: false,
    weekState: "日一二三四五六".charAt(new Date().getDay()),
    workState: 'default',
    times:12,
  }
  componentDidMount() {}
  hide = () => {
    this.setState({
      visible: false,
    })
  }
  onChange = (e) => {
    this.setState({ workState: e.target.value })
  }
  handleVisibleChange = (visible) => {
    this.setState({ visible })
  }
  handleChange = (value) => {
    this.setState({ value })
  }
  weekChange = (val) => {
    console.log(val)
  }
  //全屏
  toggleFullScreen() {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
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
  render() {
    let { form, loading } = this.props
    let { visible, size, workState, weekState,times } = this.state
    let now = moment().format('YYYY/MM/DD HH:mm:ss')
    console.log(now)
    const { getFieldDecorator } = form
    return (
      <div className="tool-list">
        <div className="tool-item">
          <Icon type="drag" antd className="tool-icon"></Icon>
        </div>
        <div className="tool-item">
          <Icon type={'zoom-in'} antd className="tool-icon"></Icon>
        </div>
        <div className="tool-item">
          <Icon type={'zoom-out'} antd className="tool-icon"></Icon>
        </div>
        <Popover
          className="tool-item"
          content={
            <div className="tool-content">
              <div className="tool-main-title">
                <Radio.Group
                  value={workState}
                  onChange={this.onChange}
                  style={{ marginBottom: 16 }}
                >
                  <Radio.Button value="default">稳态</Radio.Button>
                  <Radio.Button value="change">瞬态</Radio.Button>
                </Radio.Group>
                <div className="tool-rate">
                  <span>弱</span>
                  <div className="tool-state">
                    <i className="tool-state-icon"></i>
                    <i className="tool-state-icon"></i>
                    <i className="tool-state-icon"></i>
                    <i className="tool-state-icon"></i>
                  </div>
                  <span>强</span>
                </div>
              </div>
              {workState == 'default' ? (
                <div className="condition-content">
                  <div className="condition-time">
                    <span className="condition-label">更新时间</span>
                    <div className="condition-main">
                      <span className="condition-main"></span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="condition-content">
                  <div className="condition-time">
                    <span className="condition-label">预测时间</span>
                    <div className="condition-main">
                      <span className="condition-main">星期{weekState} 19:00</span>
                    </div>
                  </div>
                  <div className="condition-time">
                    <span className="condition-label">星期</span>
                    <div className="condition-main condition-week">
                      {week.map((item, i) => (
                        <span
                          className={weekState == item ? 'active' : null}
                          onClick={this.weekChange(item)}
                          key={i}
                        >
                          {item}
                          {weekState == item ? ' (今天)' : null}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="condition-time">
                    <span className="condition-label">时间</span>
                    <div className="condition-main">
                      <Slider marks={marks} min={0} max={24} defaultValue={times} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          }
          title={
            <div className="item-title">
              <span className="pop-name">工况</span>
              <Icon type="close" antd className="pop-icon" />
            </div>
          }
          trigger="click"
        >
          <div>
            <Icon antd type={'radar-chart'} className="tool-icon"></Icon>
            <span className="tool-name">工况</span>
          </div>
        </Popover>
        <Popover
          className="tool-item"
          content={
            <div className="tool-content tool-content-edit">
              <Form {...formItemLayout}>
                <Item label="管道名称">
                  {getFieldDecorator('contentType', {
                    rules: [
                      {
                        required: true,
                        message: '管道名称不能为空',
                      },
                    ],

                    initialValue: '',
                  })(<Input width="100%" allowClear placeholder="管道名称" />)}
                </Item>
              </Form>
              <div className="tool-content-edit-btn-list">
                <Button type="primary" ghost className="edit-btn">
                  提交
                </Button>
                <Button className="edit-btn">取消</Button>
              </div>
              ,
            </div>
          }
          title={
            <div className="item-title">
              <span className="pop-name">编辑</span>
              <Icon type="close" antd className="pop-icon" />
            </div>
          }
          trigger="click"
        >
          <div>
            <Icon antd type={'radius-setting'} className="tool-icon"></Icon>
            <span className="tool-name">编辑</span>
          </div>
        </Popover>
        <Popover
          className="tool-item"
          content={
            <div className="tool-content">
              <div className="tool-main-list">
                <div className="tool-range">
                  <Button className="tool-range-btn active" icon="search">
                    测量长度
                  </Button>

                  <p className="tool-range-desc active">0.02km</p>
                </div>
                <div className="tool-range">
                  <Button className="tool-range-btn" icon="search">
                    测量面积
                  </Button>
                  <p className="tool-range-desc">0.02km</p>
                </div>
                <div className="tool-range">
                  <Button className="tool-range-btn" icon="search">
                    测量坐标
                  </Button>
                  <p className="tool-range-desc">0.02km</p>
                </div>
                <div className="tool-range">
                  <Button className="tool-range-btn">
                    撤销测量
                  </Button>
                </div>
              </div>
            </div>
          }
          title={
            <div className="item-title">
              <span className="pop-name">测量</span>
              <Icon type="close" antd className="pop-icon" />
            </div>
          }
          trigger="click"
        >
          <div>
            <Icon antd type={'hdd'} className="tool-icon"></Icon>
            <span className="tool-name">测量</span>
          </div>
        </Popover>
        <div className="tool-item" onClick={this.toggleFullScreen}>
          <Icon type={'screen-full'} className="tool-icon"></Icon>
          <span className="tool-name">全屏</span>
        </div>
      </div>
    )
  }
}

export default createForm()(Tool)
