/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-04-28 14:34:01
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-03 08:46:31
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Input from 'components/Input'
import Select from 'components/Select'
import Cascader from 'components/Cascader'
import CusBtn from 'components/CusBtn'
import Approval from './Approval'
import EquipmentList from './EquipmentList'
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

@connect(({ externalAdd, loading }) => ({
  externalAdd,
  loading: loading.models.externalAdd
}))
class BasicForm extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    visible: false,
    approvalVisible: false,
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'externalAdd/getFlowwork',
      payload: {},
    })
  }

  render() {
    const { externalAdd, form, dispatch } = this.props
    const { details, flowworkList, approvalRow, equipmentRow } = externalAdd
    const { getFieldDecorator } = form
    let cycle = [details.cycleUnit, details.cycle]
    let equipmentCusBtnProps = {
      onDelete: (e) => {
        e.stopPropagation()
        dispatch({
          type: 'externalAdd/@change',
          payload: {
            equipmentRow: [],
            equipmentRowKeys: [],
          },
        })
      },
      onChangeVisible: (visible) => {
        this.setState({
          visible,
        })
      },
      list: equipmentRow,
      type: 1,
      placeHolder: '请选择设备',
    }
    let approvalCusBtnProps = {
      onDelete: (e) => {
        e.stopPropagation()
        dispatch({
          type: 'externalAdd/@change',
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
      placeHolder: '请选择审批人',
    }
    let approvalProps = {
      visible: this.state.approvalVisible,
      changeVisible: (approvalVisible) => {
        this.setState({
          approvalVisible,
        })
      },
    }
    let equipmentProps = {
      visible: this.state.visible,
      changeVisible: (visible) => {
        this.setState({
          visible,
        })
      },
    }
    return (
      <section className="block-wrap form-wrap">
        <div className="header flex-1">
          <div className="title">申请信息</div>
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
          <Item label="设备编号">
            <CusBtn {...equipmentCusBtnProps}></CusBtn>
          </Item>
          <Item label="审批人">
            <CusBtn {...approvalCusBtnProps}></CusBtn>
          </Item>
          <Item label="外委单位">
            {getFieldDecorator('commissionDept', {
              rules: [
                {
                  required: true,
                  message: '请输入外委单位',
                },
              ],
              initialValue: details.commissionDept,
            })(<Input width="100%" placeholder="外委单位" />)}
          </Item>
          <Item label="预计金额">
            {getFieldDecorator('estimateAmount', {
              rules: [
                {
                  required: true,
                  message: '请输入预计金额',
                },
              ],
              initialValue: details.estimateAmount,
            })(<Input width="100%" placeholder="预计金额" />)}
          </Item>
          <Item label="工期要求">
            {getFieldDecorator('require', {
              rules: [
                {
                  required: true,
                  message: '请输入工期要求',
                },
              ],
              initialValue: details.require,
            })(<Input width="100%" placeholder="工期要求" />)}
          </Item>
          <Item label="外委理由">
            {getFieldDecorator('reason', {
              initialValue: details.reason,
            })(<Input type="textarea" placeholder="外委理由" />)}
          </Item>
        </Form>
        <Approval {...approvalProps}></Approval>
        <EquipmentList {...equipmentProps}></EquipmentList>
      </section>
    )
  }
}

export default createForm()(BasicForm)
