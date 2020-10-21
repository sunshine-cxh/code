/*
 * @Descripttion : 合同新增页
 * @Author       : caojiarong
 * @Date         : 2020-09-01 14:12:55
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-09 15:44:36
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Checkbox from 'components/Checkbox'
import DatePicker from 'components/DatePicker'
import Input from 'components/Input'
import Select from 'components/Select'
import Radio from 'components/Radio'
import '../style/index.less'
import moment from 'moment';
import BaseComponent from 'components/BaseComponent'
const { Item } = Form
const createForm = Form.create
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
}

@connect(({ subPlanAdd, loading }) => ({
  subPlanAdd,
  loading: loading.models.subPlanAdd,
}))
class BasicInfos extends BaseComponent {
  componentDidMount() {
    let { dispatch } = this.props
    
  }

  state={
    checkedStr:''
  }

  inputChangeHandler(val, key) { //-------------------
    const { dispatch } = this.props
    let res = val
    dispatch({
      type: 'patrolPlanAdd/basicInfosChange',
      payload: {
        val: res,
        key
      }
    })
  }

  setGasType=(arr)=>{
    let valueStr = arr.toString()
    console.log(valueStr)
  }

  render() {
    let { getFieldDecorator } = this.props.form
    let { sellerList,buyerList, addressList, agreementList,agreementStatusList,currencyList, details } = this.props.subPlanAdd
    
    return (
      <section className="block-wrap form-wrap">
        <div className="header flex-1">
          <div className="title">协议信息</div>
        </div>
        <Form {...formItemLayout}>
          <Item label="协议编号">
            {getFieldDecorator('code', {initialValue:details.code || undefined
            })(<Input type="text" width="100%" placeholder="协议生成" />)}
          </Item>

          <Item label="协议名称">
            {getFieldDecorator('name', {
              rules:[
                {
                  required: true,
                  message: '请输入协议名称' 
                }
              ],
              initialValue:details.name || undefined
            })(<Input type="text" width="100%" placeholder="协议名称" onChange={(e) => this.inputChangeHandler(e, 'name')} />)}
          </Item>

          <Item label="买方">
            {getFieldDecorator('buyer', {
              rules: [
                {
                  required: true,
                  message: '请选择买方',
                },
              ],
              initialValue: details.buyer || undefined
            })(<Select width="100%" placeholder="买方" options={buyerList}  onChange={(e) => this.inputChangeHandler(e, 'buyer')}/>)}
          </Item>

          <Item label="卖方">
            {getFieldDecorator('seller', {
              rules: [
                {
                  required: true,
                  message: '请选择卖方',
                },
              ],
              initialValue: details.seller || undefined
            })(<Select width="100%" placeholder="卖方" options={sellerList}  onChange={(e) => this.inputChangeHandler(e, 'seller')}/>)}
          </Item>

          <Item label="协议类型">
            {getFieldDecorator('contractType', {
              rules: [
                {
                  required: true,
                  message: '请选择协议类型',
                },
              ],
              initialValue: details.contractType ? details.contractType + '' : undefined
            })(<Select width="100%" placeholder="协议类型" options={agreementList}  onChange={(e) => this.inputChangeHandler(e, 'contractType')}/>)}
          </Item>
          
          <Item label='气源类型'>
          {getFieldDecorator('gasType', {
              rules: [
                {
                  required: true,
                  message: '请选择气源类型',
                },
              ],
              initialValue: details.gasType || undefined
            })(
              <Checkbox.Group style={{ width: '100%' }} onChange={(checkedValues)=>{this.setGasType(checkedValues)}}>
                <Checkbox value={1}>NG</Checkbox>
                <Checkbox value={2}>LNG</Checkbox>
              </Checkbox.Group>
            )}
          </Item>

          <Item label="交付点">
            {getFieldDecorator('deliveryAddrss', {
              rules: [
                {
                  required: true,
                  message: '请选择交付点',
                },
              ],
              initialValue: details.deliveryAddrss ? details.deliveryAddrss + '' : undefined
            })(<Select width="100%" placeholder="交付点" options={addressList}  onChange={(e) => this.inputChangeHandler(e, 'deliveryAddrss')}/>)}
          </Item>

          <Item label="协议起止时间">
            {getFieldDecorator('date', {
              rules: [
                {
                  required: true,
                  message: '请选择协议起止时间',
                },
              ],
              initialValue: [moment(details.startTime), moment(details.endTime)]
            })(<DatePicker type='range' width="100%" placeholder="协议起止时间" onChange={(e) => this.inputChangeHandler(e, 'date')}/>)}
          </Item>
          
          <Item label="年供气量">
            {getFieldDecorator('annualSupply', {
              rules: [
                {
                  required: true,
                  message: '年供气量',
                },
              ],
              initialValue: details.annualSupply || undefined
            })(<Input width="100%" type='number' placeholder="年供气量"  onChange={(e) => this.inputChangeHandler(e, 'annualSupply')}/>)}
          </Item>

          <Item label="日指定量">
            {getFieldDecorator('assignAmount', {
              rules: [
                {
                  required: true,
                  message: '日指定量',
                },
              ],
              initialValue: details.assignAmount || undefined
            })(<Input width="100%" type='number' placeholder="日指定量" onChange={(e) => this.inputChangeHandler(e, 'assignAmount')}/>)}
          </Item>

          <Item label="提气速率/小时">
            {getFieldDecorator('upliftRateBase', {
              rules: [
                {
                  required: true,
                  message: '最大提气速率/小时',
                },
              ],
              initialValue: details.upliftRateBase || undefined
            })(<Input width="70%" type='number' placeholder="最大提气速率/小时" onChange={(e) => this.inputChangeHandler(e, 'upliftRateBase')}/>)}
            <span style={{display:'inline-block',width:'10%',textAlign:'center'}}>*</span>
            {getFieldDecorator('upliftRateCoefficient', {
              rules: [
                {
                  required: true,
                  message: '最大提气速率/小时',
                },
              ],
              initialValue: details.upliftRateCoefficient || undefined
            })(<Input placeholder='系数' type='number' width={'20%'} onChange={(e) => this.inputChangeHandler(e, 'upliftRateCoefficient')} />)}
          </Item>

          <Item label="采购单价">
            {getFieldDecorator('purchasePrice', {
              rules: [
                {
                  required: true,
                  message: '采购单价',
                },
              ],
              initialValue: details.purchasePrice || undefined
            })(<Input width="100%" type='number' placeholder="采购单价" onChange={(e) => this.inputChangeHandler(e, 'purchasePrice')}/>)}
          </Item>

          <Item label="管输费单价">
            {getFieldDecorator('pipelineTransportationFee', {
              rules: [
                {
                  required: true,
                  message: '管输费单价',
                },
              ],
              initialValue: details.pipelineTransportationFee || undefined
            })(<Input width="100%" type='number' placeholder="管输费单价" onChange={(e) => this.inputChangeHandler(e, 'pipelineTransportationFee')}/>)}
          </Item>

          <Item label="交付压力">
            {getFieldDecorator('deliveryPressure', {
              rules: [
                {
                  required: true,
                  message: '交付压力',
                },
              ],
              initialValue: details.deliveryPressure || undefined
            })(<Input width="100%" type='number' placeholder="交付压力" onChange={(e) => this.inputChangeHandler(e, 'deliveryPressure')}/>)}
          </Item>

          <Item label="交付热值">
            {getFieldDecorator('deliveryCalorific', {
              rules: [
                {
                  required: true,
                  message: '交付热值',
                },
              ],
              initialValue: details.deliveryCalorific || undefined
            })(<Input type='number' width="100%" placeholder="交付热值" onChange={(e) => this.inputChangeHandler(e, 'deliveryCalorific')}/>)}
          </Item>

          <Item label="气量单位">
            {getFieldDecorator('gasUnit', {
              rules: [
                {
                  required: true,
                  message: '交付热值',
                },
              ],
              initialValue: details.gasUnit || undefined
            })(
            <Radio.Group>
              <Radio value={1}>标方</Radio>
              <Radio value={2}>吉焦</Radio>
              <Radio value={3}>吨</Radio>
            </Radio.Group>
            )}
          </Item> 

          <Item label="结算币种">
            {getFieldDecorator('exchangeCurrency', {
              rules: [
                {
                  required: true,
                  message: '结算币种',
                },
              ],
              initialValue: details.exchangeCurrency?details.exchangeCurrency.toString(): undefined
            })(<Select width="100%" placeholder="结算币种" options={currencyList}  onChange={(e) => this.inputChangeHandler(e, 'exchangeCurrency')}/>)}
          </Item>

          <Item label="结算汇率">
            {getFieldDecorator('exchangeRate', {
              rules: [
                {
                  required: true,
                  message: '结算汇率',
                },
              ],
              initialValue: details.exchangeRate || undefined
            })(<Input width="100%" type='number' placeholder="结算汇率" onChange={(e) => this.inputChangeHandler(e, 'exchangeRate')}/>)}
          </Item>

          <Item label="协议状态">
            {getFieldDecorator('status', {
              rules: [
                {
                  required: true,
                  message: '协议状态',
                },
              ],
              initialValue: details.status ? details.status + '' : undefined
            })(<Select width="100%" placeholder="协议状态" options={agreementStatusList}  onChange={(e) => this.inputChangeHandler(e, 'status')}/>)}
          </Item>

          <Item label="备注">
          {
            getFieldDecorator('remark', {initialValue:details.remark || undefined})
            (<Input
              type="textarea" placeholder="备注"
              onChange={val => this.inputChangeHandler( val, 'remark')}
            />)
          }
          </Item>
        </Form>
      </section>
    )
  }
}

export default createForm()(BasicInfos)
