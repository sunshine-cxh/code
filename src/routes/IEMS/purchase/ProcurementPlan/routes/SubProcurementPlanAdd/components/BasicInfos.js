/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-04-28 14:34:01
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-01 11:39:50
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Input from 'components/Input'
import Select from 'components/Select'
import Cascader from 'components/Cascader'
import CusBtn from 'components/CusBtn'
import Approval from './Approval'

const { Item } = Form
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
}
const createForm = Form.create

// 创建年份列表
const createYearList = () => {
  let start = 1970
  const end = Number(new Date().getFullYear()) + 50
  let res = []

  for (let i = start; i <= end; i++) {
    res.push({
      codeName: i,
      code: i,
    })
  }

  return res
}

@connect(({ procurementPlanAdd, loading, procurementPlan }) => ({
  procurementPlanAdd,
  loading: loading.models.procurementPlanAdd,
  procurementPlan,
}))
class BasicForm extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    types: [
      {
        codeName: '设备采购',
        code: '0',
      },
      {
        codeName: '备件耗材采购',
        code: '1',
      },
    ],
    cycleList: [
      {
        value: 1,
        label: '季度',
        children: [
          {
            value: 1,
            label: '第一季度',
          },
          {
            value: 2,
            label: '第二季度',
          },
          {
            value: 3,
            label: '第三季度',
          },
          {
            value: 4,
            label: '第四季度',
          },
        ],
      },
      {
        value: 2,
        label: '月份',
        children: [
          {
            value: 1,
            label: '一月',
          },
          {
            value: 2,
            label: '二月',
          },
          {
            value: 3,
            label: '三月',
          },
          {
            value: 4,
            label: '四月',
          },
          {
            value: 5,
            label: '五月',
          },
          {
            value: 6,
            label: '六月',
          },
          {
            value: 7,
            label: '七月',
          },
          {
            value: 8,
            label: '八月',
          },
          {
            value: 9,
            label: '九月',
          },
          {
            value: 10,
            label: '十月',
          },
          {
            value: 11,
            label: '十一月',
          },
          {
            value: 12,
            label: '十二月',
          },
        ],
      },
    ],
    approvalVisible: false,
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'procurementPlanAdd/getFlowwork',
      payload: {},
    })
  }

  render() {
    const { procurementPlanAdd, form, dispatch } = this.props
    const { details, flowworkList, approvalRow } = procurementPlanAdd
    const { getFieldDecorator } = form
    let cycle = [details.cycleUnit, details.cycle]
    let approvalCusBtnProps = {
      onDelete: (e) => {
        e.stopPropagation()
        dispatch({
          type: 'procurementPlanAdd/@change',
          payload: {
            approvalRow: [],
            approvalRowKeys: [],
            approvalRowLocal: [],
            approvalRowKeysLocal: [],
            flowchartList: [],
          },
        })
      },
      onChangeVisible: (approvalVisible) => {
        this.setState({
          approvalVisible,
        })
      },
      list: approvalRow,
      type: 2,
      placeHolder: '请选择审批人'
    }
    let approvalProps = {
      visible: this.state.approvalVisible,
      changeVisible: (approvalVisible) => {
        this.setState({
          approvalVisible,
        })
      },
    }
    return (
      <section className="block-wrap form-wrap">
        <div className="header flex-1">
          <div className="title">基本信息</div>
        </div>
        <Form {...formItemLayout}>
          <Item label="标题">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请输入标题',
                },
              ],
              initialValue: details.title,
            })(<Input width="100%" placeholder="标题" />)}
          </Item>
          <Item label="类型">
            {getFieldDecorator('type', {
              rules: [
                {
                  required: true,
                  message: '请输入类型',
                },
              ],
              initialValue: details.type,
            })(<Select width="100%" placeholder="类型" options={this.state.types} />)}
          </Item>
          <Item label="采购周期" className="item-inline-wrap" style={{marginBottom: '0px'}}>
            <Item style={{ marginLeft: 0, marginRight: '20px', width: '50%' }}>
              {getFieldDecorator('year', {
                rules: [
                  {
                    required: true,
                    message: '请输入采购周期',
                  },
                ],
                initialValue: details.year,
              })(<Select placeholder="采购周期" options={createYearList()} />)}
            </Item>
            <Item style={{ width: '50%', marginRight: '0px' }}>
              {getFieldDecorator('cycle', {
                rules: [
                  {
                    required: true,
                    message: '请输入季度/月份',
                  },
                ],
                initialValue: details.cycleUnit && details.cycle && [details.cycleUnit, details.cycle],
              })(<Cascader placeholder="季度/月份" options={this.state.cycleList} />)}
            </Item>
          </Item>
          <Item label="审批人">
            <CusBtn {...approvalCusBtnProps}></CusBtn>
          </Item>
          <Item label="备注">
            {getFieldDecorator('remark', {
              initialValue: details.remark,
            })(<Input type="textarea" placeholder="备注" />)}
          </Item>
        </Form>
        <Approval {...approvalProps}></Approval>
      </section>
    )
  }
}

export default createForm()(BasicForm)
