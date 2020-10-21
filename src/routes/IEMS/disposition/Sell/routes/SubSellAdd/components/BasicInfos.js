/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-04-28 14:34:01
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-24 16:27:11
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Input from 'components/Input'
import Select from 'components/Select'
import TreeSelect from 'components/TreeSelect'
import DatePicker from 'components/DatePicker'
import CusBtn from 'components/CusBtn'
import Approval from './Approval'
import moment from 'moment'
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


@connect(({ sellAdd, loading }) => ({
  sellAdd,
  loading: loading.models.sellAdd
}))
class BasicForm extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    approvalVisible: false,
  }

  componentDidMount() {
  }

  render() {
    const { sellAdd, form, dispatch } = this.props
    const { details, approvalRow, organizationTree } = sellAdd
    const { getFieldDecorator } = form
    let approvalCusBtnProps = {
      onDelete: (e) => {
        e.stopPropagation()
        dispatch({
          type: 'procurementApplyConsumables/@change',
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
          <div className="title">申请信息</div>
        </div>
        <Form {...formItemLayout}>
          <Item label="标题">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请选择标题',
                },
              ],
              initialValue: details.title,
            })(<Input width="100%" placeholder="标题" />)}
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
