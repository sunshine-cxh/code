/*
 * @Descripttion : 稳态计算
 * @Author       : wuhaidong
 * @Date         : 2020-02-09 10:11:37
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-06-28 15:27:28
 */
import React from 'react'
import { connect } from 'dva'
import { Form, Row, Col } from 'antd'
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
import './index.less'
const Item = Form.Item
import { columns } from './columns'
import { notice } from 'components/Notification'

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
@connect(({ SteadyStateCalculation, loading }) => ({
  SteadyStateCalculation,
  loading: loading.models.SteadyStateCalculation,
}))
class SteadyStateCalculation extends BaseComponent {
  constructor(props) {
    super(props)
  }
  state = {
    toolbarSelectorValue: 1,
    displayHeatState: false,
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'SteadyStateCalculation/getInitData',
      payload: {
        success: () => {
          loaded = true
        },
      },
    })
  }

  radioChangeHandler = (e, type) => {
    let {
      SteadyStateCalculation: { data },
      dispatch,
    } = this.props

    let { SGSolverGateStationList, SGSolverGuestList } = data

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
    }

    dispatch({
      type: 'SteadyStateCalculation/@change',
      payload: {
        data,
      },
    })
  }

  inputGateStationChangeHandler = (value, id, type) => {
    let {
      SteadyStateCalculation: { data },
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
      type: 'SteadyStateCalculation/@change',
      payload: {
        data,
      },
    })
  }

  inputDeviceRegulatorChangeHandler = (value, name) => {
    let {
      SteadyStateCalculation: { data },
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
      type: 'SteadyStateCalculation/@change',
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
    } else {
      let {
        SteadyStateCalculation: { data },
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
        type: 'SteadyStateCalculation/@change',
        payload: {
          data: data,
        },
      })
    }
  }

  render() {
    let { toolbarSelectorValue, displayHeatState } = this.state

    let {
      SteadyStateCalculation: { data, tabsActiveKeyKey, analysisState, updateState },
      loading,
      dispatch,
    } = this.props

    let {
      SGSolverGateStationList,
      SGSolverDeviceValveList,
      SGSolverDeviceRegulatorList,
      SGSolverGuestList,
    } = data

    console.log('SteadyStateCalculation -> render -> tabsActiveKeyKey', tabsActiveKeyKey)

    //选择列表
    let selectProps = {
      options: [
        { code: 1, codeName: '深圳燃气模型' },
        // { code: 2, codeName: '东莞燃气模型' },
        // { code: 3, codeName: '广州燃气模型' },
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

    return (
      <Layout className="steadyState-calculation">
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
            </div>

            <div className="from-title">门站</div>

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
                              <Radio value={`Known Flow-${item.NodeId}`}>流量</Radio>
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
                    type: 'SteadyStateCalculation/@change',
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
              <Form
                className="flexbox flex-wrap-wrap DeviceRegulator-wrap"
                labelAlign="right"
                {...formItemLayout}
              >
                {SGSolverDeviceRegulatorList &&
                  SGSolverDeviceRegulatorList.map((item, i) => {
                    return (
                      <Item key={i} label={item.RegulatorName}>
                        <div className="flexbox flex-align-items-center flex-1">
                          <Input
                            width="100%"
                            placeholder="设置压力"
                            value={item.RegulatorValue}
                            suffix="KPa"
                            onChange={(value) =>
                              this.inputDeviceRegulatorChangeHandler(value, item.RegulatorName)
                            }
                          />
                        </div>
                      </Item>
                    )
                  })}
              </Form>
            </div>

            <div className="from-title">用户</div>
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
                                this.inputGateStationChangeHandler(value, item.NodeId, 'Guest')
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

            <div
              className="flexbox flex-justify-content-center submit-wrap"
              style={{ marginTop: 40 }}
            >
              <Button
                type="primary3"
                style={{ marginRight: 40 }}
                onClick={() => {
                  dispatch({
                    type: 'SteadyStateCalculation/@change',
                    payload: {
                      updateState: true,
                    },
                  })
                  // dispatch({
                  //   type: 'SteadyStateCalculation/steadyStateEditForm',
                  //   payload: {
                  //     data: data,
                  //   },
                  // })

                  setTimeout(() => {
                    // dispatch({
                    //   type: 'SteadyStateCalculation/steadyStateEditForm',
                    // })

                    dispatch({
                      type: 'SteadyStateCalculation/@change',
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
                    type: 'SteadyStateCalculation/@change',
                    payload: {
                      analysisState: true,
                    },
                  })
                  dispatch({
                    type: 'SteadyStateCalculation/steadyStateAnalysis',
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

export default Form.create()(SteadyStateCalculation)
