/*
 * @Descripttion : 模型新增页
 * @Author       : caojiarong
 * @Date         : 2020-08-25 14:12:55
 * @LastEditors  : gujitao
 * @LastEditTime : 2020-09-08 14:49:37
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Input from 'components/Input'
import Select from 'components/Select'
import '../style/index.less'
import BaseComponent from 'components/BaseComponent'
import {fileInfoColumns} from './columns'
import DataTable from 'components/DataTable'
import DatePicker from 'components/DatePicker'
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

@connect(({ subModelAdd, loading }) => ({
  subModelAdd,
  
  
  loading: loading.models.subModelAdd,
}))
class BasicInfos extends BaseComponent {
  componentDidMount() {
    let { dispatch } = this.props
    dispatch({
      type: 'subModelAdd/getweather',
      payload: {
        
     
      },
    })
   

  }

  state={
    
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

  render() {
    let { getFieldDecorator } = this.props.form
    let { moduleList, details } = this.props.subModelAdd
    let columnsFile = fileInfoColumns(this, this.state)
    let  {
      dispatch,
     
      
    }=this.props
    let {subModelAdd:{weatherPageData,weatherlist,contractList}}=this.props //解构出来直接使用
    weatherPageData.list = weatherlist
    let rangeProps = {
      type:'range',
     
    }
    const fileDataTableProps = {
    
      showNum: true,
      columns: columnsFile,
      rowKey: 'id',
      dataItems: weatherPageData,
      showNum: false
    }
    
    return (
      <section className="block-wrap form-wrap">
        <div className="header flex-1">
          <div className="title">基础信息</div>
        </div>
        <Form {...formItemLayout}>
          <Item label="申报编号">
            {getFieldDecorator('code', {initialValue:details.code || undefined
            })(<Input type="text" width="100%" disabled placeholder="系统生成" />)}
          </Item>

         
          <Item label="合同名称">
            {getFieldDecorator('contractId', {
              rules: [
                {
                  message: '请选择合同名称',
                  required:true,  //是否为必选
                },
              ],
              initialValue: details.contractId ? details.contractId + '' : undefined
            })(<Select width="100%" placeholder="合同" options={contractList}  onChange={(e) => this.inputChangeHandler(e, 'module')}/>)}
          </Item>
          
          <Item label="日指定量">
            {getFieldDecorator('assignAmount', {
             
              initialValue:details.assignAmount || undefined
            })(
              <Input type="text" width="100%" placeholder="合同带入" disabled={true} />)}
          </Item>
            
          <Item label="提气速率">
            {getFieldDecorator('upliftRate', {
             
              initialValue:details.upliftRate || undefined
            })(
              <Input type="text" width="100%" placeholder="合同带入" disabled={true} />)}
          </Item>

          <Item label="申报用气量">
            {getFieldDecorator('declareConsumption', {
             
              initialValue:details.declareConsumption || undefined
            })(
              <Input type="text" width="100%" placeholder="请填写申报用气量" disabled={false} />)}
          </Item>

          <Item label="申报周期类型">
            {getFieldDecorator('declareType', {
              rules: [
                {
                  required: true,
                  message: '请选择申报周期类型',  
                },
              ],
              initialValue: details.declareType ? details.declareType + '' : undefined
            })(<Select width="100%" placeholder="请选择申报类型" options={moduleList}  onChange={(e) => this.inputChangeHandler(e, 'module')}/>)}
          </Item>  

          <Item label="申报日期">
            {getFieldDecorator('date', {
             
              // initialValue:details.gasStartTime || undefined,
              // initialValue:details.gasEndTime || undefined
            })(
               <DatePicker 
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                className="toolbar-item"
                type="range"
          
                />
                )}
          </Item>
        
         
        </Form>
        <div className='content-foot'>
          <span className='weather-title'>气象信息</span>
        <DataTable {...fileDataTableProps}></DataTable>
        
        </div>
      </section>
    )
  }
}

export default createForm()(BasicInfos)
