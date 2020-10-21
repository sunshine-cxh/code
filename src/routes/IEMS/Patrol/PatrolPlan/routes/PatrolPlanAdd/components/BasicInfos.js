/*
 * @Descripttion : 巡检计划新建页基本信息
 * @Author       : caojiarong
 * @Date         : 2020-06-02 10:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-03 09:55:58
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Input from 'components/Input'
import Select from 'components/Select'
import DatePicker from 'components/DatePicker'
import { patrolAndValidColumns, warnTimeColumns, startColumns } from './columns'
import moment from 'utils/moment'
import InputNumber from 'components/InputNumber'
const { Item } = Form
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  }
}

let createForm = Form.create()
@connect(({ patrolPlanAdd, loading }) => ({
  patrolPlanAdd,
  loading: loading.models.patrolPlanAdd
}))
class patrolPlanAdd extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    visible: false,
    type: 0
  }
  disabledStartDate = (current)=> { 
    let { getFieldValue } = this.props.form
    let endTime = getFieldValue('endTime')
    if(endTime) {
      return current > endTime || current < moment().endOf('day')
    } else {
      return current && current < moment().endOf('day');
    }
  }
  disabledEndDate = (current)=> {
    let { getFieldValue } = this.props.form
    let startTime = getFieldValue('startTime')
    if(startTime) {
      return current < startTime
    } else {
      return current && current < moment().endOf('day');
    }
  }
  render() {
    let { patrolPlanAdd: { basicInfos }, form } = this.props
    let { getFieldDecorator } = form
    let warnOptions = warnTimeColumns(this)
    let patrolAndValidOptions = patrolAndValidColumns(this)
    let isStartList = startColumns(this)
    return (
      <section className='block-wrap form-wrap'>
        <div className="header flex-1">
          <div className="title">基本信息</div>
        </div>
        <Form {...formItemLayout}>
          <Item label='计划名称'>
            {/* <Input width='100%' placeholder='标准名称'/> */}
            {
              getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入计划名称'
                  }
                ],
                initialValue: basicInfos.name
              })
                (<Input width='100%' placeholder='计划名称' />)
            }
          </Item>
          <Item label='计划开始日期'>
            {
              getFieldDecorator('startTime', {
                rules: [{
                  required: true,
                  message: '请选择计划开始日期'
                }],
                initialValue: basicInfos.startTime && moment(basicInfos.startTime)
              })
                (<DatePicker width='100%' placeholder='计划开始日期' disabledDate={this.disabledStartDate}
                />)
            }
          </Item>
          <Item label='计划结束日期'>
            {
              getFieldDecorator('endTime', {
                rules: [{
                  required: true,
                  message: '请选择计划结束日期'
                }],
                initialValue: basicInfos.endTime && moment(basicInfos.endTime)
              })
                (<DatePicker width='100%' placeholder='计划结束日期'  disabledDate={this.disabledEndDate}/>)
            }
          </Item>
          <Item label='巡检周期'>
            {
              getFieldDecorator('cycle', {
                rules: [{
                  required: true,
                  message: '请输入巡检周期'
                }],
                initialValue: basicInfos.cycle
              })
                (<InputNumber style={{ width: '70%' }} placeholder='巡检周期' />)
            }
            {
              getFieldDecorator('cycleUnit', { initialValue: basicInfos.cycleUnit })
                (<Select
                  style={{ float: 'right', width: '25%' }}
                  options={patrolAndValidOptions}
                />)
            }
          </Item>
          <Item label='提前提醒时间'>
            {
              getFieldDecorator('noticeTime', {
                initialValue: basicInfos.noticeTime
              })
                (<InputNumber style={{ width: '70%' }}  placeholder='提前提醒时间' />)
            }
            {
              getFieldDecorator('noticeUnit', { initialValue: basicInfos.noticeUnit })
                (
                  <Select
                    style={{ float: 'right', width: '25%' }}
                    options={warnOptions}
                  />
                )
            }

          </Item>

          <Item label='备注'>
            {
              getFieldDecorator('remark', {
                initialValue: basicInfos.remark
              })
                (<Input width='100%' type='textarea' placeholder='备注' />)
            }
          </Item>
        </Form>
      </section>
    )
  }
}

export default createForm(patrolPlanAdd)
