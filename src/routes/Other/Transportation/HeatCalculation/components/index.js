/*
 * @Descripttion : 热值计算
 * @Author       : wuhaidong
 * @Date         : 2020-02-09 10:11:37
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-06-02 10:45:03
 */
import React from 'react'
import { connect } from 'dva'
import { Layout } from 'antd'
import BaseComponent from 'components/BaseComponent'
import Panel from 'components/Panel'
import Select from 'components/Select'
import Button from 'components/Button'
import Tabs from 'components/Tabs'
import Form from 'components/Form'
import Input from 'components/Input'
import { columns } from './columns'
import { data } from './data'

import './index.less'

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
}

@connect(({ SteadystateCalculation, loading }) => ({
  SteadystateCalculation,
}))
class SteadystateCalculation extends BaseComponent {
  state = {
    value: 1,
    tabsActiveKeyKey: '',
    toolbarSelectorValue: 1,
    data: data,
    resultState: false,
  }

  componentDidMount() {
    let {
      data: { SGSolverGateStationList },
    } = this.state
    this.setState({
      tabsActiveKeyKey: SGSolverGateStationList[0].NodeName,
    })
  }

  onSubmit = () => {
    this.refs.wwww.validateFields((error, value) => {
      if (error) {
        console.log(error)
        return
      }
      this.setState({
        resultState: true,
      })
      console.log('SteadystateCalculation -> onSubmit -> value', value)
      return value
    })
  }

  render() {
    let {
      toolbarSelectorValue,
      tabsActiveKeyKey,
      data: { SGSolverGateStationList },
      resultState,
    } = this.state

    //选择列表
    let selectProps = {
      options: [
        { code: 1, codeName: '深圳燃气模型' },
        { code: 2, codeName: '东莞燃气模型' },
        { code: 3, codeName: '广州燃气模型' },
      ],
      value: toolbarSelectorValue,
      allowClear: false,
      placeholder: '请选择模型',
      onChange: (value, option) => {
        this.setState({
          toolbarSelectorValue: value,
        })
      },
    }

    return (
      <Layout className="full-layout page HeatCalculation-page">
        <Layout.Content>
          <Panel header={null}>
            <div className="flexbox flex-align-items-center">
              <span className="selector-title">选择模型</span>
              <Select {...selectProps} />
            </div>

            <Tabs
              style={{ marginTop: 40 }}
              className='tabs-wrap'
              activeKey={tabsActiveKeyKey}
              tabPosition="left"
              onChange={(value) => {
                this.setState({
                  tabsActiveKeyKey: value,
                })
              }}
            >
              {SGSolverGateStationList.map((item, i) => {
                return (
                  <div
                    tab={item.NodeName}
                    key={item.NodeName}
                    className="tab-item"
                  >
                    <Form
                      ref="wwww"
                      columns={columns}
                      record={item.NodeGasStreamComponent}
                      type="inline"
                      // onSubmit={this.onSubmit}
                      footer={false}
                      labelAlign="right"
                      // formItemLayout={formItemLayout}
                      {...formItemLayout}
                    />
                  </div>
                )
              })}
            </Tabs>
            <div
              className="flexbox flex-justify-content-center"
              style={{ marginTop: 40 }}
            >
              <Button type="primary3" style={{ marginRight: 40 }}>
                修改
              </Button>
              <Button type="primary3" onClick={this.onSubmit}>
                计算
              </Button>
            </div>

            <div className="result-wrap">
              <div className="result-title">工况状态</div>
              {resultState && (
                <div className="flexbox flex-wrap-wrap">
                  {SGSolverGateStationList.map((item, i) => {
                    return (
                      <div key={i} className="result-item">
                        <div className="item-name">{item.NodeName}</div>
                        <span className="flexbox flex-align-items-center flex-1">
                          <span
                            className="result-item-key"
                          >
                            压力：
                          </span>
                          <span>{item.NodePressure}</span>
                        </span>
                        <span className="flexbox flex-align-items-center flex-1">
                          <span
                            className="result-item-key"
                          >
                            流量：
                          </span>
                          <span>{item.NodeFlow}</span>
                        </span>
                        <span className="flexbox flex-align-items-center flex-1">
                          <span
                            className="result-item-key"
                          >
                            热值：
                          </span>
                          <span>{item.NodeHigherHeatingValue}</span>
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </Panel>
        </Layout.Content>
      </Layout>
    )
  }
}

export default SteadystateCalculation
