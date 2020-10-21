/*
 * @Descripttion : 新奥工况分析
 * @Author       : wuhaidong
 * @Date         : 2020-02-09 10:11:37
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-09-10 09:34:45
 */
import React, { Fragment } from 'react'
import { connect } from 'dva'
import { Form, Row, Col } from 'antd'
const Item = Form.Item
import Layout from 'components/Layout'
import BaseComponent from 'components/BaseComponent'
import Panel from 'components/Panel'
import Select from 'components/Select'
import Radio from 'components/Radio'
import Switch from 'components/Switch'
import Button from 'components/Button'
import Input from 'components/Input'
import Tabs from 'components/Tabs'
import CForm from 'components/Form'
import DataTable from 'components/DataTable'
import { notice } from 'components/Notification'
import {
  columns,
  columnsAbnormalLeft,
  columnsAbnormalRight,
  columnsGisTop,
  columnsGisBottom,
} from './columns'
import {
  abnormalLeftData,
  abnormalRightData,
  gisConduitData1,
  gisConduitData2,
  gisConduitData3,
} from './data'

import NeoGisImg from '../assets/neo-gis.png'

import './index.less'

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 15,
  },
}

const CFormItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
}
let loaded = false
@connect(({ NEOsteadyStateCalculation, loading }) => ({
  NEOsteadyStateCalculation,
  loading: loading.models.NEOsteadyStateCalculation,
}))
class NEOsteadyStateCalculation extends BaseComponent {
  constructor(props) {
    super(props)
  }
  state = {
    toolbarSelectorValue: 1,
    displayHeatState: false,
    displayGis: true,
    gisDisplayData: { conduit: [], node: [] },
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'NEOsteadyStateCalculation/getInitData',
      payload: {
        success: () => {
          loaded = true
        },
      },
    })
  }

  radioChangeHandler = (e, type) => {
    let {
      NEOsteadyStateCalculation: { data },
      dispatch,
    } = this.props

    let {
      SGSolverGateStationList,
      SGSolverGuestList,
      SGSolverGuestEastUserList,
      SGSolverGuestWestSupplyList,
      SGSolverGuestWestUserList,
    } = data

    let valueArray = e.target.value.split('-')
    let NodeStatus = valueArray[0]
    let NodeId = valueArray[1]
    if (type === 'GateStation') {
      for (let i = 0; i < SGSolverGateStationList.length; i++) {
        if (SGSolverGateStationList[i].NodeId == NodeId) {
          SGSolverGateStationList[i].NodeStatus = NodeStatus
        }
      }
      data.SGSolverGateStationList = SGSolverGateStationList
    } else if (type === 'Guest') {
      for (let i = 0; i < SGSolverGuestList.length; i++) {
        if (SGSolverGuestList[i].NodeId == NodeId) {
          SGSolverGuestList[i].NodeStatus = NodeStatus
        }
      }
      data.SGSolverGuestList = SGSolverGuestList
    } else if (type === 'GuestEastUser') {
      for (let i = 0; i < SGSolverGuestEastUserList.length; i++) {
        if (SGSolverGuestEastUserList[i].NodeId == NodeId) {
          SGSolverGuestEastUserList[i].NodeStatus = NodeStatus
        }
      }

      data.SGSolverGuestEastUserList = SGSolverGuestEastUserList
    } else if (type === 'GuestWestSupply') {
      for (let i = 0; i < SGSolverGuestWestSupplyList.length; i++) {
        if (SGSolverGuestWestSupplyList[i].NodeId == NodeId) {
          SGSolverGuestWestSupplyList[i].NodeStatus = NodeStatus
        }
      }
      data.SGSolverGuestWestSupplyList = SGSolverGuestWestSupplyList
    } else if (type === 'GuestWestUser') {
      for (let i = 0; i < SGSolverGuestWestUserList.length; i++) {
        if (SGSolverGuestWestUserList[i].NodeId == NodeId) {
          SGSolverGuestWestUserList[i].NodeStatus = NodeStatus
        }
      }
      data.SGSolverGuestWestUserList = SGSolverGuestWestUserList
    }

    dispatch({
      type: 'NEOsteadyStateCalculation/@change',
      payload: {
        data,
      },
    })
  }

  inputGateStationChangeHandler = (value, id, type) => {
    let {
      NEOsteadyStateCalculation: { data },
      dispatch,
    } = this.props

    let { SGSolverGateStationList, SGSolverGuestList } = data

    if (type === 'GateStation') {
      for (let i = 0; i < SGSolverGateStationList.length; i++) {
        if (SGSolverGateStationList[i].NodeId == id) {
          if (SGSolverGateStationList[i].NodeStatus === 'Known Pressure') {
            SGSolverGateStationList[i].NodePressure = value
          } else {
            SGSolverGateStationList[i].NodeFlow = value
          }
        }
      }
      data.SGSolverGateStationList = SGSolverGateStationList
    } else if (type === 'Guest') {
      for (let i = 0; i < SGSolverGuestList.length; i++) {
        if (SGSolverGuestList[i].NodeId == id) {
          if (SGSolverGuestList[i].NodeStatus === 'Known Pressure') {
            SGSolverGuestList[i].NodePressure = value
          } else {
            SGSolverGuestList[i].NodeFlow = value
          }
        }
      }
      data.SGSolverGuestList = SGSolverGuestList
    }

    dispatch({
      type: 'NEOsteadyStateCalculation/@change',
      payload: {
        data,
      },
    })
  }

  inputDeviceRegulatorChangeHandler = (value, name) => {
    let {
      NEOsteadyStateCalculation: { data },
      dispatch,
    } = this.props

    let { SGSolverDeviceRegulatorList } = data

    for (let i = 0; i < SGSolverDeviceRegulatorList.length; i++) {
      if (SGSolverDeviceRegulatorList[i].RegulatorName == name) {
        SGSolverDeviceRegulatorList[i].RegulatorValue = value
      }
    }
    data.SGSolverDeviceRegulatorList = SGSolverDeviceRegulatorList
    dispatch({
      type: 'NEOsteadyStateCalculation/@change',
      payload: {
        data,
      },
    })
  }

  switchChangeHandler = (value, valueName) => {
    if (valueName === 'displayHeatState') {
      this.setState({
        displayHeatState: value,
      })
    } else if (valueName === 'displayGis') {
      this.setState({
        displayGis: value,
      })
    } else {
      let {
        NEOsteadyStateCalculation: { data },
        dispatch,
      } = this.props
      let { SGSolverDeviceValveList } = data

      for (let i = 0; i < SGSolverDeviceValveList.length; i++) {
        if (SGSolverDeviceValveList[i].ValveName === valueName) {
          SGSolverDeviceValveList[i].ValveStatus = value
        }
      }
      data.SGSolverDeviceValveList = SGSolverDeviceValveList

      dispatch({
        type: 'NEOsteadyStateCalculation/@change',
        payload: {
          data: data,
        },
      })
    }
  }

  switchChangeHandlertwo = (value, valueName) => {
    if (valueName === 'displayHeatState') {
      this.setState({
        displayHeatState: value,
      })
    } else {
      let {
        NEOsteadyStateCalculation: { data },
        dispatch,
      } = this.props
      let { SGSolverDeviceRegulatorExit } = data

      for (let i = 0; i < SGSolverDeviceRegulatorExit.length; i++) {
        if (SGSolverDeviceRegulatorExit[i].ValveName === valueName) {
          SGSolverDeviceRegulatorExit[i].ValveStatus = value
        }
      }
      data.SGSolverDeviceRegulatorExit = SGSolverDeviceRegulatorExit

      dispatch({
        type: 'NEOsteadyStateCalculation/@change',
        payload: {
          data: data,
        },
      })
    }
  }

  render() {
    let { toolbarSelectorValue, displayHeatState, displayGis, gisDisplayData } = this.state

    let {
      NEOsteadyStateCalculation: { data, tabsActiveKeyKey, analysisState, updateState },
      loading,
      dispatch,
    } = this.props

    let {
      SGSolverGateStationList,
      SGSolverDeviceValveList,
      SGSolverDeviceRegulatorList,
      SGSolverDeviceRegulatorExit,
      SGSolverGuestList,
      SGSolverGuestEastUserList,
      SGSolverGuestWestSupplyList,
      SGSolverGuestWestUserList,
    } = data

    //选择列表
    let selectProps = {
      options: [
        { code: 1, codeName: '青岛新奥A工况模型' },
        { code: 2, codeName: '青岛新奥B工况模型' },
        { code: 3, codeName: '青岛新奥日常调峰模型' },
        { code: 4, codeName: '青岛新奥冬供模型' },
        { code: 5, codeName: '5℃调度模型' },
        { code: 6, codeName: '10℃调度模型' },
        { code: 7, codeName: '15℃调度模型' },
      ],
      value: toolbarSelectorValue,
      placeholder: '请选择模型',
      allowClear: false,
      onChange: (value, option) => {
        this.setState({
          toolbarSelectorValue: value,
        })
      },
    }

    let dataTablePropsAbnormalLeft = {
      columns: columnsAbnormalLeft,
      rowKey: 'id',
      dataItems: abnormalLeftData,
    }

    let dataTablePropsAbnormalRight = {
      columns: columnsAbnormalRight,
      rowKey: 'id',
      dataItems: abnormalRightData,
    }

    let dataTablePropsGisTop = {
      columns: columnsGisTop,
      rowKey: 'id',
      dataItems: { list: gisDisplayData.conduit },
    }

    let dataTablePropsGisBottom = {
      columns: columnsGisBottom,
      rowKey: 'id',
      dataItems: { list: gisDisplayData.node },
    }

    return (
      <Layout className="NEOsteadyStateCalculation">
        {loading && !loaded ? (
          <Panel header={null}>
            <div className="flexbox flex-justify-content-center loading">模型加载中...</div>
          </Panel>
        ) : (
          <Panel header={null}>
            <div className="flexbox flex-align-items-center">
              <span className="selector-title">模型</span>
              <Select {...selectProps} />

              <span className="selector-title" style={{ marginLeft: 40 }}>
                查看热值
              </span>
              <Switch
                checked={displayHeatState}
                onChange={(value) => {
                  this.switchChangeHandler(value, 'displayHeatState')
                }}
              />

              <span className="selector-title" style={{ marginLeft: 40 }}>
                查看管网图
              </span>
              <Switch
                checked={displayGis}
                onChange={(value) => {
                  this.switchChangeHandler(value, 'displayGis')
                }}
              />
            </div>

            <div className="from-title">气源</div>
            {/* 判断是否显示热值 */}
            {!displayHeatState ? (
              <div className="from-wrap">
                <Form className="flexbox flex-wrap-wrap">
                  {SGSolverGateStationList &&
                    SGSolverGateStationList.map((item, i) => {
                      return (
                        <Item key={i} label={item.NodeName}>
                          <Radio.Group
                            onChange={(e) => {
                              this.radioChangeHandler(e, 'GateStation')
                            }}
                            value={`${item.NodeStatus}-${item.NodeId}`}
                          >
                            <span className="flexbox flex-align-items-center flex-1">
                              <Radio value={`Known Pressure-${item.NodeId}`}>压力</Radio>
                              <Input
                                width="100%"
                                placeholder="压力"
                                disabled={item.NodeStatus !== 'Known Pressure'}
                                style={{ marginBottom: 4 }}
                                value={item.NodePressure}
                                suffix="KPa"
                                onChange={(value) =>
                                  this.inputGateStationChangeHandler(
                                    value,
                                    item.NodeId,
                                    'GateStation'
                                  )
                                }
                              />
                            </span>
                            <span className="flexbox flex-align-items-center flex-1">
                              <Radio value={`Known Flow-${item.NodeId}`} disabled>
                                流量
                              </Radio>
                              <Input
                                width="100%"
                                placeholder="流量"
                                disabled={item.NodeStatus !== 'Known Flow'}
                                value={item.NodeFlow}
                                suffix="Nm³/h"
                                onChange={(value) =>
                                  this.inputGateStationChangeHandler(
                                    value,
                                    item.NodeId,
                                    'GateStation'
                                  )
                                }
                              />
                            </span>
                          </Radio.Group>
                        </Item>
                      )
                    })}
                </Form>
              </div>
            ) : (
              <Tabs
                className="tabs-wrap"
                activeKey={tabsActiveKeyKey}
                tabPosition="left"
                onChange={(value) => {
                  dispatch({
                    type: 'NEOsteadyStateCalculation/@change',
                    payload: {
                      tabsActiveKeyKey: value,
                    },
                  })
                }}
              >
                {SGSolverGateStationList &&
                  SGSolverGateStationList.map((item, i) => {
                    return (
                      <div tab={item.NodeName} key={item.NodeName} className="tab-item">
                        <div style={{ marginLeft: 60, marginBottom: 20 }}>
                          <Radio.Group
                            onChange={(e) => {
                              this.radioChangeHandler(e, 'GateStation')
                            }}
                            value={`${item.NodeStatus}-${item.NodeId}`}
                          >
                            <span className="flexbox flex-align-items-center flex-1">
                              <Radio value={`Known Pressure-${item.NodeId}`}>压力</Radio>
                              <Input
                                width="100%"
                                placeholder="压力"
                                disabled={item.NodeStatus !== 'Known Pressure'}
                                style={{ marginBottom: 4 }}
                                value={item.NodePressure}
                                suffix="KPa"
                                onChange={(value) =>
                                  this.inputGateStationChangeHandler(
                                    value,
                                    item.NodeId,
                                    'GateStation'
                                  )
                                }
                              />
                            </span>
                            <span className="flexbox flex-align-items-center flex-1">
                              <Radio value={`Known Flow-${item.NodeId}`} disabled>
                                流量
                              </Radio>
                              <Input
                                width="100%"
                                placeholder="流量"
                                disabled={item.NodeStatus !== 'Known Flow'}
                                style={{ marginBottom: 4 }}
                                value={item.NodeFlow}
                                suffix="Nm³/h"
                                onChange={(value) =>
                                  this.inputGateStationChangeHandler(
                                    value,
                                    item.NodeId,
                                    'GateStation'
                                  )
                                }
                              />
                            </span>
                            <span className="flexbox flex-align-items-center flex-1">
                              <Radio value={`Known Heat-${item.NodeId}`} disabled>
                                热值
                              </Radio>
                              <Input
                                width="100%"
                                placeholder="热值"
                                disabled
                                value={item.NodeHigherHeatingValue}
                                suffix="MJ"
                                onChange={(value) =>
                                  this.inputGateStationChangeHandler(
                                    value,
                                    item.NodeId,
                                    'GateStation'
                                  )
                                }
                              />
                            </span>
                          </Radio.Group>
                        </div>

                        <CForm
                          ref="wwww"
                          columns={columns}
                          record={item.NodeGasStreamComponent}
                          type="inline"
                          footer={false}
                          labelAlign="right"
                          {...CFormItemLayout}
                        />
                      </div>
                    )
                  })}
              </Tabs>
            )}

            <div className="from-title">阀门设备</div>
            <div className="from-wrap">
              <Form className="flexbox flex-wrap-wrap">
                {SGSolverDeviceValveList &&
                  SGSolverDeviceValveList.map((item, i) => {
                    return (
                      <Item key={i} label={item.ValveName}>
                        <Switch
                          checked={item.ValveStatus}
                          onChange={(value) => {
                            this.switchChangeHandler(value, item.ValveName)
                          }}
                        />
                      </Item>
                    )
                  })}
              </Form>
            </div>

            <div className="from-title">次高调压器设备</div>
            <div className="from-wrap">
              <Form className="flexbox flex-wrap-wrap Guest-wrap" {...formItemLayout}>
                {SGSolverDeviceRegulatorList &&
                  SGSolverDeviceRegulatorList.map((item, i) => {
                    return (
                      <Item key={i} label={item.NodeName}>
                        <Radio.Group
                          onChange={(e) => {
                            this.radioChangeHandlertwo(e, 'Guest')
                          }}
                          value={`${item.NodeStatus}-${item.NodeId}`}
                        >
                          <span className="flexbox flex-align-items-center flex-1">
                            <Radio value={`Known Pressure-${item.NodeId}`}>压力</Radio>
                            <Input
                              width="100%"
                              placeholder="压力"
                              disabled={item.NodeStatus !== 'Known Pressure'}
                              style={{ marginBottom: 4 }}
                              value={item.NodePressure}
                              suffix="KPa"
                              onChange={(value) =>
                                this.inputGateStationChangeHandler(value, item.NodeId, 'Guest')
                              }
                            />
                          </span>
                          <span className="flexbox flex-align-items-center flex-1">
                            <Radio value={`Known Flow-${item.NodeId}`} disabled>
                              流量
                            </Radio>
                            <Input
                              width="100%"
                              placeholder="流量"
                              disabled
                              style={{ marginBottom: 4 }}
                              value={item.NodeFlow}
                              suffix="Nm³/h"
                              onChange={(value) =>
                                this.inputGateStationChangeHandler(value, item.NodeId, 'Guest')
                              }
                            />
                          </span>

                          {displayHeatState && (
                            <span className="flexbox flex-align-items-center flex-1">
                              <Radio value={`Known Heat-${item.NodeId}`} disabled>
                                热值
                              </Radio>
                              <Input
                                width="100%"
                                placeholder="流量"
                                disabled
                                value={item.NodeHigherHeatingValue}
                                suffix="MJ"
                                onChange={(value) =>
                                  this.inputGateStationChangeHandler(value, item.NodeId, 'Guest')
                                }
                              />
                            </span>
                          )}
                        </Radio.Group>
                      </Item>
                    )
                  })}
              </Form>
            </div>

            <div className="from-title">次高压-中压调压器</div>
            <div className="from-wrap">
              <Form className="flexbox flex-wrap-wrap Guest-wrap" {...formItemLayout}>
                {SGSolverDeviceRegulatorExit &&
                  SGSolverDeviceRegulatorExit.map((item, i) => {
                    return (
                      <Item key={i} label={item.NodeName}>
                        <Radio.Group
                          onChange={(e) => {
                            this.radioChangeHandlertwo(e, 'Guest')
                          }}
                          value={`${item.NodeStatus}-${item.NodeId}`}
                        >
                          <span className="flexbox flex-align-items-center flex-1">
                            <Radio value={`Known Pressure-${item.NodeId}`}>压力</Radio>
                            <Input
                              width="100%"
                              placeholder="压力"
                              disabled={item.NodeStatus !== 'Known Pressure'}
                              style={{ marginBottom: 4 }}
                              value={item.NodePressure}
                              suffix="KPa"
                              onChange={(value) =>
                                this.inputGateStationChangeHandler(value, item.NodeId, 'Guest')
                              }
                            />
                          </span>
                          <span className="flexbox flex-align-items-center flex-1">
                            <Radio value={`Known Flow-${item.NodeId}`} disabled>
                              流量
                            </Radio>
                            <Input
                              width="100%"
                              placeholder="流量"
                              disabled
                              style={{ marginBottom: 4 }}
                              value={item.NodeFlow}
                              suffix="Nm³/h"
                              onChange={(value) =>
                                this.inputGateStationChangeHandler(value, item.NodeId, 'Guest')
                              }
                            />
                          </span>

                          {displayHeatState && (
                            <span className="flexbox flex-align-items-center flex-1">
                              <Radio value={`Known Heat-${item.NodeId}`} disabled>
                                热值
                              </Radio>
                              <Input
                                width="100%"
                                placeholder="流量"
                                disabled
                                value={item.NodeHigherHeatingValue}
                                suffix="MJ"
                                onChange={(value) =>
                                  this.inputGateStationChangeHandler(value, item.NodeId, 'Guest')
                                }
                              />
                            </span>
                          )}
                        </Radio.Group>
                      </Item>
                    )
                  })}
              </Form>
            </div>

            {/* 管网分布 */}
            <div className="from-title">片区管网</div>
            <div className="">
              <div className="flexbox">
                <div>
                  <div className="from-midtitle">东区气源</div>
                  <div className="from-wrap">
                    <Form className="flexbox flex-wrap-wrap Guest-wrap" {...formItemLayout}>
                      {SGSolverGuestList &&
                        SGSolverGuestList.map((item, i) => {
                          return (
                            <Item key={i} label={item.NodeName}>
                              <Radio.Group
                                onChange={(e) => {
                                  this.radioChangeHandler(e, 'Guest')
                                }}
                                value={`${item.NodeStatus}-${item.NodeId}`}
                              >
                                <span className="flexbox flex-align-items-center flex-1">
                                  <Radio value={`Known Pressure-${item.NodeId}`}>压力</Radio>
                                  <Input
                                    width="100%"
                                    placeholder="压力"
                                    disabled={item.NodeStatus !== 'Known Pressure'}
                                    style={{ marginBottom: 4 }}
                                    value={item.NodePressure}
                                    suffix="KPa"
                                    onChange={(value) =>
                                      this.inputGateStationChangeHandler(
                                        value,
                                        item.NodeId,
                                        'Guest'
                                      )
                                    }
                                  />
                                </span>
                                <span className="flexbox flex-align-items-center flex-1">
                                  <Radio value={`Known Flow-${item.NodeId}`}>流量</Radio>
                                  <Input
                                    width="100%"
                                    placeholder="流量"
                                    disabled={item.NodeStatus !== 'Known Flow'}
                                    style={{ marginBottom: 4 }}
                                    value={item.NodeFlow}
                                    suffix="Nm³/h"
                                    onChange={(value) =>
                                      this.inputGateStationChangeHandler(
                                        value,
                                        item.NodeId,
                                        'Guest'
                                      )
                                    }
                                  />
                                </span>
                                {displayHeatState && (
                                  <span className="flexbox flex-align-items-center flex-1">
                                    <Radio value={`Known Heat-${item.NodeId}`} disabled>
                                      热值
                                    </Radio>
                                    <Input
                                      width="100%"
                                      placeholder="流量"
                                      disabled
                                      value={item.NodeHigherHeatingValue}
                                      suffix="MJ"
                                      onChange={(value) =>
                                        this.inputGateStationChangeHandler(
                                          value,
                                          item.NodeId,
                                          'Guest'
                                        )
                                      }
                                    />
                                  </span>
                                )}
                              </Radio.Group>
                            </Item>
                          )
                        })}
                    </Form>
                  </div>
                </div>
                {/* SGSolverDeviceRegulatorExit SGSolverGuestEastUserList  SGSolverGuestWestSupplyList SGSolverGuestWestUserList   */}
                <div className="flex_left_content">
                  <div className="from-midtitle">东区用户</div>
                  <div className="from-wrap">
                    <Form className="flexbox flex-wrap-wrap Guest-wrap" {...formItemLayout}>
                      {SGSolverGuestEastUserList &&
                        SGSolverGuestEastUserList.map((item, i) => {
                          return (
                            <Item key={i} label={item.NodeName}>
                              <Radio.Group
                                onChange={(e) => {
                                  this.radioChangeHandler(e, 'GuestEastUser')
                                }}
                                value={`${item.NodeStatus}-${item.NodeId}`}
                              >
                                <span className="flexbox flex-align-items-center flex-1">
                                  <Radio value={`Known Pressure-${item.NodeId}`}>压力</Radio>
                                  <Input
                                    width="100%"
                                    placeholder="压力"
                                    disabled={item.NodeStatus !== 'Known Pressure'}
                                    style={{ marginBottom: 4 }}
                                    value={item.NodePressure}
                                    suffix="KPa"
                                    onChange={(value) =>
                                      this.inputGateStationChangeHandler(
                                        value,
                                        item.NodeId,
                                        'GuestEastUser'
                                      )
                                    }
                                  />
                                </span>
                                <span className="flexbox flex-align-items-center flex-1">
                                  <Radio value={`Known Flow-${item.NodeId}`}>流量</Radio>
                                  <Input
                                    width="100%"
                                    placeholder="流量"
                                    disabled={item.NodeStatus !== 'Known Flow'}
                                    style={{ marginBottom: 4 }}
                                    value={item.NodeFlow}
                                    suffix="Nm³/h"
                                    onChange={(value) =>
                                      this.inputGateStationChangeHandler(
                                        value,
                                        item.NodeId,
                                        'GuestEastUser'
                                      )
                                    }
                                  />
                                </span>
                                {displayHeatState && (
                                  <span className="flexbox flex-align-items-center flex-1">
                                    <Radio value={`Known Heat-${item.NodeId}`} disabled>
                                      热值
                                    </Radio>
                                    <Input
                                      width="100%"
                                      placeholder="流量"
                                      disabled
                                      value={item.NodeHigherHeatingValue}
                                      suffix="MJ"
                                      onChange={(value) =>
                                        this.inputGateStationChangeHandler(
                                          value,
                                          item.NodeId,
                                          'GuestEastUser'
                                        )
                                      }
                                    />
                                  </span>
                                )}
                              </Radio.Group>
                            </Item>
                          )
                        })}
                    </Form>
                  </div>
                </div>
              </div>

              <div className="flexbox">
                <div className="flex_box_left_content">
                  <div className="from-midtitle">西区气源</div>
                  <div className="from-wrap">
                    <Form className="flexbox flex-wrap-wrap Guest-wrap" {...formItemLayout}>
                      {SGSolverGuestWestSupplyList &&
                        SGSolverGuestWestSupplyList.map((item, i) => {
                          return (
                            <Item key={i} label={item.NodeName}>
                              <Radio.Group
                                onChange={(e) => {
                                  this.radioChangeHandler(e, 'GuestWestSupply')
                                }}
                                value={`${item.NodeStatus}-${item.NodeId}`}
                              >
                                <span className="flexbox flex-align-items-center flex-1">
                                  <Radio value={`Known Pressure-${item.NodeId}`}>压力</Radio>
                                  <Input
                                    width="100%"
                                    placeholder="压力"
                                    disabled={item.NodeStatus !== 'Known Pressure'}
                                    style={{ marginBottom: 4 }}
                                    value={item.NodePressure}
                                    suffix="KPa"
                                    onChange={(value) =>
                                      this.inputGateStationChangeHandler(
                                        value,
                                        item.NodeId,
                                        'GuestWestSupply'
                                      )
                                    }
                                  />
                                </span>
                                <span className="flexbox flex-align-items-center flex-1">
                                  <Radio value={`Known Flow-${item.NodeId}`}>流量</Radio>
                                  <Input
                                    width="100%"
                                    placeholder="流量"
                                    disabled={item.NodeStatus !== 'Known Flow'}
                                    style={{ marginBottom: 4 }}
                                    value={item.NodeFlow}
                                    suffix="Nm³/h"
                                    onChange={(value) =>
                                      this.inputGateStationChangeHandler(
                                        value,
                                        item.NodeId,
                                        'GuestWestSupply'
                                      )
                                    }
                                  />
                                </span>
                                {displayHeatState && (
                                  <span className="flexbox flex-align-items-center flex-1">
                                    <Radio value={`Known Heat-${item.NodeId}`} disabled>
                                      热值
                                    </Radio>
                                    <Input
                                      width="100%"
                                      placeholder="流量"
                                      disabled
                                      value={item.NodeHigherHeatingValue}
                                      suffix="MJ"
                                      onChange={(value) =>
                                        this.inputGateStationChangeHandler(
                                          value,
                                          item.NodeId,
                                          'GuestWestSupply'
                                        )
                                      }
                                    />
                                  </span>
                                )}
                              </Radio.Group>
                            </Item>
                          )
                        })}
                    </Form>
                  </div>
                </div>

                {/* SGSolverGuestWestSupplyList SGSolverGuestWestUserList */}

                <div className="flex_box_right_content">
                  <div className="from-midtitle">西区用户</div>
                  <div className="from-wrap">
                    <Form className="flexbox flex-wrap-wrap Guest-wrap" {...formItemLayout}>
                      {SGSolverGuestWestUserList &&
                        SGSolverGuestWestUserList.map((item, i) => {
                          return (
                            <Item key={i} label={item.NodeName}>
                              <Radio.Group
                                onChange={(e) => {
                                  this.radioChangeHandler(e, 'GuestWestUser')
                                }}
                                value={`${item.NodeStatus}-${item.NodeId}`}
                              >
                                <span className="flexbox flex-align-items-center flex-1">
                                  <Radio value={`Known Pressure-${item.NodeId}`}>压力</Radio>
                                  <Input
                                    width="100%"
                                    placeholder="压力"
                                    disabled={item.NodeStatus !== 'Known Pressure'}
                                    style={{ marginBottom: 4 }}
                                    value={item.NodePressure}
                                    suffix="KPa"
                                    onChange={(value) =>
                                      this.inputGateStationChangeHandler(
                                        value,
                                        item.NodeId,
                                        'GuestWestUser'
                                      )
                                    }
                                  />
                                </span>
                                <span className="flexbox flex-align-items-center flex-1">
                                  <Radio value={`Known Flow-${item.NodeId}`}>流量</Radio>
                                  <Input
                                    width="100%"
                                    placeholder="流量"
                                    disabled={item.NodeStatus !== 'Known Flow'}
                                    style={{ marginBottom: 4 }}
                                    value={item.NodeFlow}
                                    suffix="Nm³/h"
                                    onChange={(value) =>
                                      this.inputGateStationChangeHandler(
                                        value,
                                        item.NodeId,
                                        'GuestWestUser'
                                      )
                                    }
                                  />
                                </span>
                                {displayHeatState && (
                                  <span className="flexbox flex-align-items-center flex-1">
                                    <Radio value={`Known Heat-${item.NodeId}`} disabled>
                                      热值
                                    </Radio>
                                    <Input
                                      width="100%"
                                      placeholder="流量"
                                      disabled
                                      value={item.NodeHigherHeatingValue}
                                      suffix="MJ"
                                      onChange={(value) =>
                                        this.inputGateStationChangeHandler(
                                          value,
                                          item.NodeId,
                                          'GuestWestUser'
                                        )
                                      }
                                    />
                                  </span>
                                )}
                              </Radio.Group>
                            </Item>
                          )
                        })}
                    </Form>
                  </div>
                </div>
              </div>
            </div>

            <div className="flexbox abnormal">
              <div className="item-wrap left">
                <div className="title"> 异常管道信息</div>
                <DataTable {...dataTablePropsAbnormalLeft} />
              </div>

              <div className="item-wrap right">
                <div className="title">低压力节点</div>
                <DataTable {...dataTablePropsAbnormalRight} />
              </div>
            </div>

            {displayGis && (
              <div className="flexbox gis">
                <div className="item-wrap left">
                  <img src={NeoGisImg} className="neogis-img" />
                  <div className="gis-modal-1">
                    <div className="flexbox flex-wrap-wrap">
                      {gisConduitData1.map((item, index) => {
                        return (
                          <div
                            className="gis-child-item"
                            onClick={() => {
                              if (!item.children) {
                                this.setState({
                                  gisDisplayData: item.data,
                                })
                              }
                            }}
                          >
                            {item.children &&
                              item.children.map((cItem, index) => {
                                return (
                                  <div
                                    className="gis-child-item-child"
                                    onClick={() => {
                                      this.setState({
                                        gisDisplayData: cItem.data,
                                      })
                                    }}
                                  ></div>
                                )
                              })}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="gis-modal-2">
                    <div className="flexbox flex-wrap-wrap">
                      {gisConduitData2.map((item, index) => {
                        return (
                          <div
                            className="gis-child-item"
                            onClick={() => {
                              if (!item.children) {
                                this.setState({
                                  gisDisplayData: item.data,
                                })
                              }
                            }}
                          ></div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="gis-modal-3">
                    <div className="flexbox flex-wrap-wrap">
                      {gisConduitData3.map((item, index) => {
                        return (
                          <div
                            className="gis-child-item"
                            onClick={() => {
                              if (!item.children) {
                                this.setState({
                                  gisDisplayData: item.data,
                                })
                              }
                            }}
                          ></div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div className="item-wrap right">
                  <DataTable {...dataTablePropsGisTop} />
                  <DataTable {...dataTablePropsGisBottom} style={{ marginTop: 20 }} />
                </div>
              </div>
            )}

            <div
              className="flexbox flex-justify-content-center submit-wrap"
              style={{ marginTop: 40 }}
            >
              <Button
                type="primary3"
                style={{ marginRight: 40 }}
                onClick={() => {
                  dispatch({
                    type: 'NEOsteadyStateCalculation/@change',
                    payload: {
                      updateState: true,
                    },
                  })

                  setTimeout(() => {
                    dispatch({
                      type: 'NEOsteadyStateCalculation/@change',
                      payload: {
                        updateState: false,
                      },
                    })
                    notice.success('操作成功')
                  }, 3000)
                }}
              >
                {updateState ? '模型更新中...' : '更新模型'}
              </Button>
              <Button
                type="primary3"
                onClick={() => {
                  dispatch({
                    type: 'NEOsteadyStateCalculation/@change',
                    payload: {
                      analysisState: true,
                    },
                  })
                  dispatch({
                    type: 'NEOsteadyStateCalculation/steadyStateAnalysis',
                    payload: {
                      data: data,
                    },
                  })
                }}
              >
                {analysisState ? '分析中...' : '分析'}
              </Button>
            </div>
          </Panel>
        )}
      </Layout>
    )
  }
}

export default Form.create()(NEOsteadyStateCalculation)
