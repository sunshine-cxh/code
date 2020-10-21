/*
 * @Descripttion :
 * @Author       : xuqiufeng
 * @Date         : 2020-07-01 15:08:36
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-07-24 10:58:07
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import { Collapse, Form, Slider, Tabs, Input } from 'antd'
import moment from 'utils/moment'
import BaseComponent from 'components/BaseComponent'
import Radio from 'components/Radio'
import Button from 'components/Button'
import Icon from 'components/Icon'
import { DrawControl, DrawPoint, DrawCircle, DrawLine } from '@antv/l7-draw'

const { TabPane } = Tabs
const { Item } = Form
const { Panel } = Collapse
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
  0: '0:00',
  6: '6:00',
  12: '12:00',
  18: '18:00',
  24: '24:00',
}
const measure = [
  {
    title: '测量长度',
    iconName: 'column-width',
    val: '122公里',
  },
  {
    title: '测量面积',
    iconName: 'pie-chart',
    val: '122公里',
  },
  {
    title: '测量坐标',
    iconName: 'dot-chart',
    val: '122公里',
  },
]
const week = ['一', '二', '三', '四', '五', '六', '日']
const weekDate = '日一二三四五六'.charAt(new Date().getDay())
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
    weekState: weekDate,
    workState: 'default',
    measureState: false, //测量数据
    time: parseInt(moment().format('H')),
  }
  componentDidMount() {}
  hide = () => {
    this.setState({
      visible: false,
    })
  }

  //稳态，瞬态切换
  workStateChange = (e) => {
    this.setState({ workState: e.target.value })
  }
  handleVisibleChange = (visible) => {
    this.setState({ visible })
  }
  handleChange = (value) => {
    this.setState({ value })
  }
  //选择星期几
  weekChange = (e) => {
    this.setState({
      weekState: e,
    })
  }
  timeChange = (value) => {
    this.setState({
      time: value,
    })
  }
  measureChane = (e) => {
    this.setState({
      measureState: true,
    })
  }

  render() {
    let {
      geographyHome: { lineLength, area, point },
      form,
      loading,
    } = this.props

    let { visible, size, workState, weekState, time } = this.state
    let now = moment().format('YYYY/MM/DD HH:mm')
    const { getFieldDecorator } = form
    return (
      <div>
        <Tabs className="tool-list" defaultActiveKey="1">
          <TabPane
            tab={
              <div className="tool-item">
                <Icon type="drag" antd className="tool-icon"></Icon>
              </div>
            }
            key="1"
          ></TabPane>
          <TabPane
            tab={
              <div className="tool-item" onClick={this.props.zoomIn}>
                <Icon type={'zoom-in'} antd className="tool-icon"></Icon>
              </div>
            }
            key="2"
          ></TabPane>
          <TabPane
            tab={
              <div className="tool-item" onClick={this.props.zoomOut}>
                <Icon type={'zoom-out'} antd className="tool-icon"></Icon>
              </div>
            }
            key="3"
          ></TabPane>
          <TabPane
            tab={
              <div className="tool-item">
                <Icon antd type={'radar-chart'} className="tool-icon"></Icon>
                <span className="tool-name">工况</span>
              </div>
            }
            key="4"
          >
            <div className="tool-main">
              {/* <div className="item-title">
                <span className="pop-name">工况</span>
                <Icon type="close" antd className="pop-icon" />
              </div> */}
              <div className="tool-content">
                <div className="tool-main-title">
                  <Radio.Group
                    value={workState}
                    onChange={this.workStateChange}
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
                        <span className="condition-main">{now}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="condition-content">
                    <div className="condition-time">
                      <span className="condition-label">预测时间</span>
                      <div className="condition-main">
                        <span className="condition-main">
                          星期{weekState} {time}:00
                        </span>
                      </div>
                    </div>
                    <div className="condition-time">
                      <span className="condition-label">星期</span>
                      <div className="condition-main condition-week">
                        {week.map((item, i) => (
                          <span
                            className={`${weekState == item ? 'active ' : null} ${
                              weekDate == item ? ' weekActive' : null
                            }`}
                            onClick={(e) => this.weekChange(item)}
                            key={i}
                          >
                            {item}
                            {weekDate == item ? ' (今天)' : null}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="condition-time">
                      <span className="condition-label">时间</span>
                      <div className="condition-main">
                        <Slider
                          marks={marks}
                          min={0}
                          max={24}
                          value={time}
                          onChange={this.timeChange}
                          tipFormatter={(val) => {
                            return `${val}:00`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabPane>
          <TabPane
            tab={
              <div className="tool-item">
                <Icon antd type={'radius-setting'} className="tool-icon"></Icon>
                <span className="tool-name">编辑</span>
              </div>
            }
            key="5"
          >
            <div className="tool-main">
              {/* <div className="item-title">
                <span className="pop-name">编辑</span>
                <Icon type="close" antd className="pop-icon" />
              </div> */}
              <div className="tool-content tool-content-edit">
                <Radio.Group value={workState} style={{ marginBottom: 16 }}>
                  <Radio.Button value="default">点</Radio.Button>
                  <Radio.Button value="change">线</Radio.Button>
                  <Radio.Button value="change">面</Radio.Button>
                </Radio.Group>
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
            </div>
          </TabPane>
          <TabPane
            tab={
              <div className="tool-item">
                <Icon antd type={'hdd'} className="tool-icon"></Icon>
                <span className="tool-name">测量</span>
              </div>
            }
            key="6"
          >
            <div className="tool-main">
              {/* <div className="item-title">
                <span className="pop-name">测量</span>
                <Icon type="close" antd className="pop-icon" />
              </div> */}
              <div className="tool-content">
                <div className="tool-main-list">
                  <Collapse>
                    <Panel
                      header={
                        <div className="tool-range-title" onClick={this.props.sceneDrawLine}>
                          <Icon type="column-width" antd className="tool-range-icon" />
                          <p>测量长度</p>
                        </div>
                      }
                      className="tool-range"
                    >
                      <div className="tool-range-desc">
                        <Icon type="edit" antd className="tool-rang-draw" />
                        {lineLength != 0 ? <p>{lineLength}m</p> : null}
                      </div>
                    </Panel>
                    <Panel
                      header={
                        <div className="tool-range-title">
                          <Icon type="pie-chart" antd className="tool-range-icon" />
                          <p>测量面积</p>
                        </div>
                      }
                      className="tool-range"
                    >
                      <div className="tool-range-desc">
                        <Icon
                          type="edit"
                          antd
                          className="tool-rang-draw"
                          onClick={this.props.sceneDrawArea}
                        />

                        {area != 0 ? <p>{area}m²</p> : null}
                      </div>
                    </Panel>
                    <Panel
                      header={
                        <div className="tool-range-title">
                          <Icon type="dot-chart" antd className="tool-range-icon" />
                          <p>测量坐标</p>
                        </div>
                      }
                      className="tool-range"
                    >
                      <div className="tool-range-desc">
                        <Icon
                          type="edit"
                          antd
                          className="tool-rang-draw"
                          onClick={this.props.sceneDrawPoint}
                        />
                        {point[0] != 0 ? (
                          <p>
                            经度:{point[0].toFixed(2)} 纬度:{point[1].toFixed(2)}
                          </p>
                        ) : null}
                      </div>
                    </Panel>
                  </Collapse>
                  <Button className="tool-range-btn">撤销测量</Button>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane
            tab={
              <div className="tool-item" onClick={this.props.toggleFullScreen}>
                <Icon type={'screen-full'} className="tool-icon"></Icon>
                <span className="tool-name">全屏</span>
              </div>
            }
            key="7"
          ></TabPane>
        </Tabs>
      </div>
    )
  }
}

export default createForm()(Tool)
