/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-04-28 14:34:01
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-09 10:13:09
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Input from 'components/Input'
import Select from 'components/Select'
import TreeSelect from 'components/TreeSelect'
import DatePicker from 'components/DatePicker'
import $$ from 'cmn-utils'
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

@connect(({ recipientsAdd, loading, procurementPlan }) => ({
  recipientsAdd,
  loading: loading.models.recipientsAdd,
  procurementPlan,
}))
class BasicForm extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    approvalVisible: false,
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'recipientsAdd/getFlowwork',
      payload: {},
    })
  }

  render() {
    const { recipientsAdd, form } = this.props
    const { details, organizationTree, allUserList } = recipientsAdd
    const { getFieldDecorator } = form
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
              initialValue: details.code,
            })(<Input width="100%" placeholder="标题"/>)}
          </Item>
          <Item label="领用部门">
            {getFieldDecorator('depart', {
              rules: [
                {
                  required: true,
                  message: '请输入领用部门',
                },
              ],
              initialValue: details.depart,
            })(<TreeSelect width="100%" placeholder="领用部门" treeData={organizationTree} />)}
          </Item>
          <Item label="领用人员">
            {getFieldDecorator('user', {
              rules: [
                {
                  required: true,
                  message: '请输入领用人员',
                },
              ],
              initialValue: details.user,
            })(<Select width="100%" placeholder="领用人员" options={allUserList} />)}
          </Item>
          
          <Item label="备注">
            {getFieldDecorator('remark', {
              initialValue: details.remark,
            })(<Input type="textarea" placeholder="备注" />)}
          </Item>
        </Form>
      </section>
    )
  }
}

export default createForm()(BasicForm)
