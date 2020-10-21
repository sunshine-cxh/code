/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-19 14:24:53
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Input from 'components/Input'
import Select from 'components/Select'
import DatePicker from 'components/DatePicker'
import PlanList from './planList'
import Approval from './Approval'
import CusBtn from 'components/CusBtn'
import moment from 'utils/moment'
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
@connect(({ procurementApplyEquipment, loading }) => ({
  procurementApplyEquipment,
  loading: loading.models.procurementApplyEquipment,
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
      type: 'procurementApplyEquipment/getFlowwork',
    })
  }

  render() {
    const { procurementApplyEquipment, dispatch, form } = this.props
    const {
      details,
      planRow,
      flowworkList,
      approvalRow,
    } = procurementApplyEquipment
    const { getFieldDecorator } = form
    let CusBtnProps = {
      onDelete: (e) => {
        e.stopPropagation()
        dispatch({
          type: 'procurementApplyEquipment/@change',
          payload: {
            planRow: [],
            planRowKeys: [],
          },
        })
      },
      onChangeVisible: (visible) => {
        this.setState({
          visible,
        })
      },
      list: planRow,
      type: 1,
      placeHolder: '请选择采购计划'
    }
    let approvalCusBtnProps = {
      onDelete: (e) => {
        e.stopPropagation()
        dispatch({
          type: 'procurementApplyEquipment/@change',
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
    let planProps = {
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
          <div className="title">基本信息</div>
        </div>
        <Form {...formItemLayout}>
          <Item label="采购标题">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请输入采购标题',
                },
              ],
              initialValue: details.title,
            })(<Input width="100%" placeholder="采购标题" />)}
          </Item>

          <Item label="期望供货时间">
            {getFieldDecorator('dlivertyDate', {
              rules: [
                {
                  required: true,
                  message: '请输入期望供货时间',
                },
              ],
              initialValue:
                details.dlivertyDate && moment(details.dlivertyDate),
            })(<DatePicker width="100%" placeholder="期望供货时间" />)}
          </Item>

          <Item label="采购计划">
            <CusBtn {...CusBtnProps}></CusBtn>
          </Item>
          <Item label="购置原因">
            {getFieldDecorator('reason', {
              rules: [
                {
                  required: true,
                  message: '请输入购置原因',
                },
              ],
              initialValue: details.reason,
            })(<Input width="100%" placeholder="购置原因" />)}
          </Item>

          <Item label="审批人">
            <CusBtn {...approvalCusBtnProps}></CusBtn>
            {/* {
              getFieldDecorator('flowSchemeDataList', {
                rules:[
                  {
                    required: true,
                    message: '请选择审批人'
                  }
                ],
                initialValue: details.flowSchemeDataList
              })
              (<Select
                placeholder="审批人"
                width="100%" mode="multiple" expand="flow"
                options={ flowworkList }/>)
            } */}
          </Item>
          <Item label="备注">
            {getFieldDecorator('remark', {
              initialValue: details.remark,
            })(<Input type="textarea" placeholder="备注" />)}
          </Item>
        </Form>
        <PlanList {...planProps}></PlanList>
        <Approval {...approvalProps}></Approval>
      </section>
    )
  }
}

export default createForm()(BasicForm)
