/*
 * @Descripttion : 养护计划新建页基本信息
 * @Author       : hezihua
 * @Date         : 2020-06-02 10:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 12:38:29
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Input from 'components/Input'
import Select from 'components/Select'
import DatePicker from 'components/DatePicker'
import '../style/apply.less'
import { warnTimeColumns } from './columns'
import moment from 'utils/moment'
import InputNumber from 'components/InputNumber'
import CusBtn from 'components/CusBtn'
import EuipmentSelect from './equipmentSelect'
import StandardSelect from './standardSelect'
const { Item } = Form
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
}
const cycletransfer = {
  1: '天',
  2: '月',
  3: '年',
}
let createForm = Form.create()
@connect(({ curingsPlanAdd, loading }) => ({
  curingsPlanAdd,
  loading: loading.models.curingsPlanAdd,
}))
class curingsPlanAdd extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    equipmentVisible: false,
    standardVisible: false,
  }
  disabledStartDate = (current) => {
    let { getFieldValue } = this.props.form
    let endTime = getFieldValue('endTime')
    if (endTime) {
      return current > endTime || current < moment().endOf('day')
    } else {
      return current && current < moment().endOf('day')
    }
  }
  disabledEndDate = (current) => {
    let { getFieldValue } = this.props.form
    let startTime = getFieldValue('startTime')
    if (startTime) {
      return current < startTime
    } else {
      return current && current < moment().endOf('day')
    }
  }
  onChangeStandardVisible = (standardVisible) => {
    this.setState({
      standardVisible,
    })
  }
  onSuccess = ()=> {
    const { dispatch, curingsPlanAdd } = this.props
    let { standardPageData, selectedDeviceRowKeys } = curingsPlanAdd
    dispatch({
      type: 'curingsPlanAdd/getStandardInfo',
      payload: {
        values: {
          entity: {
            equipmentLedgerId: selectedDeviceRowKeys[0],
          },
        },
        pageData: standardPageData.startPage(),
      },
    })
  }
  render() {
    let {
      curingsPlanAdd: { basicInfos, selectedDeviceRow, selectStandardRow, allUserList },
      form,
      dispatch,
    } = this.props
    let { getFieldDecorator } = form
    let warnOptions = warnTimeColumns(this)
    let { standardVisible, equipmentVisible } = this.state
    let standardCusBtnProps = {
      onDelete: (e) => {
        e.stopPropagation()
        dispatch({
          type: 'curingsPlanAdd/@change',
          payload: {
            selectStandardRow: [],
            selectStandardRowKeys: [],
          },
        })
      },
      onSuccess: this.onSuccess,
      onChangeVisible: this.onChangeStandardVisible,
      list: selectStandardRow,
      type: 1,
      keyWord: 'name',
      isFit: selectedDeviceRow.length > 0 ? true : false,
      warning: '请先选择设备',
    }
    let equpmentCusBtnProps = {
      onDelete: (e) => {
        e.stopPropagation()
        dispatch({
          type: 'curingsPlanAdd/@change',
          payload: {
            selectedDeviceRow: [],
            selectedDeviceRowKeys: [],
            selectedDeviceRowLocal: [],
            selectedDeviceRowKeysLocal: [],
            selectStandardRow: [],
            selectStandardRowKeys: [],
            selectStandardRowLocal: [],
            selectStandardRowKeysLocal: [],
            basicInfos: {
              ...basicInfos,
              equipmentCode: '',
              cycle: '',
              cycleUnit: ''
            }
          },
        })
      },
      onChangeVisible: (equipmentVisible) => {
        this.setState({
          equipmentVisible,
        })
      },
      list: selectedDeviceRow,
      type: 1,
      keyWord: 'name',
    }
    let equipmentSelectProps = {
      equipmentVisible,
      onChangeVisible: (equipmentVisible) => {
        this.setState({
          equipmentVisible,
        })
      },
    }
    let standardSelectProps = {
      standardVisible,
      onChangeVisible: this.onChangeStandardVisible,
    }
    return (
      <section className="block-wrap form-wrap">
        <div className="header flex-1">
          <div className="title">基本信息</div>
        </div>
        <Form {...formItemLayout}>
          <Item label="计划名称">
            {getFieldDecorator('planName', {
              rules: [
                {
                  required: true,
                  message: '请输入计划名称',
                },
              ],
              initialValue: basicInfos.planName,
            })(<Input width="100%" placeholder="计划名称" />)}
          </Item>
          <Item label="责任人">
            {getFieldDecorator('personLiableId', {
              rules: [
                {
                  required: true,
                  message: '请输入责任人',
                },
              ],
              initialValue: basicInfos.personLiableId,
            })(<Select width="100%" placeholder="责任人" options={allUserList} />)}
          </Item>
          <Item label="设备名称">
            <CusBtn {...equpmentCusBtnProps}></CusBtn>
          </Item>
          <Item label="设备编号">
            {getFieldDecorator('equipmentCode', {
              rules: [
                {
                  required: true,
                  message: '请输入设备编号',
                },
              ],
              initialValue: basicInfos.equipmentCode,
            })(<Input width="100%" disabled placeholder="设备编号" />)}
          </Item>
          <Item label="养护标准">
            <CusBtn {...standardCusBtnProps}></CusBtn>
          </Item>
          <Item label="养护周期">
            {getFieldDecorator('cycleValue', {
              rules: [
                {
                  required: true,
                  message: '请输入养护周期',
                },
              ],
              initialValue:
                basicInfos.cycle && basicInfos.cycleUnit
                  ? `${basicInfos.cycle}${cycletransfer[basicInfos.cycleUnit]}`
                  : '',
            })(<Input width="100%" disabled placeholder="养护周期" />)}
          </Item>
          <Item label="计划开始日期">
            {getFieldDecorator('startTime', {
              rules: [
                {
                  required: true,
                  message: '请选择计划开始日期',
                },
              ],
              initialValue: basicInfos.startTime && moment(basicInfos.startTime),
            })(
              <DatePicker
                width="100%"
                placeholder="计划开始日期"
                disabledDate={this.disabledStartDate}
              />
            )}
          </Item>
          <Item label="计划结束日期">
            {getFieldDecorator('endTime', {
              rules: [
                {
                  required: true,
                  message: '请选择计划结束日期',
                },
              ],
              initialValue: basicInfos.endTime && moment(basicInfos.endTime),
            })(
              <DatePicker
                width="100%"
                placeholder="计划结束日期"
                disabledDate={this.disabledEndDate}
              />
            )}
          </Item>

          <Item label="提前提醒时间">
            {getFieldDecorator('remindAdvance', {
              initialValue: basicInfos.remindAdvance,
            })(<InputNumber style={{ width: '70%' }} placeholder="提前提醒时间" />)}
            {getFieldDecorator('remindAdvanceUnit', { initialValue: basicInfos.remindAdvanceUnit })(
              <Select style={{ float: 'right', width: '25%' }} options={warnOptions} />
            )}
          </Item>

          <Item label="备注">
            {getFieldDecorator('curingExplain', {
              initialValue: basicInfos.curingExplain,
            })(<Input width="100%" type="textarea" placeholder="备注" />)}
          </Item>
        </Form>
        <EuipmentSelect {...equipmentSelectProps}></EuipmentSelect>
        <StandardSelect {...standardSelectProps}></StandardSelect>
      </section>
    )
  }
}

export default createForm(curingsPlanAdd)
