/*
 * @Descripttion : 报修工单新建页基本信息
 * @Author       : caojiarong
 * @Date         : 2020-06-17 10:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-24 14:02:07
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Input from 'components/Input'
import Select from 'components/Select'
import DatePicker from 'components/DatePicker'
import CusBtn from 'components/CusBtn'
import '../style/apply.less'
import { createColumnsProduct } from './columns'
import ProductList from './productList'
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
@connect(({ repairOrderAdd, loading }) => ({
  repairOrderAdd,
  loading: loading.models.repairOrderAdd
}))
class repairOrderAdd extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    visible: false,
    type: 0
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'repairOrderAdd/init'
    })
  }

  inputChangeHandler(val, key) { //-------------------
    const { dispatch } = this.props
    let res = val
    dispatch({
      type: 'repairOrderAdd/basicInfosChange',
      payload: {
        val: res,
        key
      }
    })
  }

  // changeType = (type) => {
  //   if (type != 2) {
  //     this.inputChangeHandler(undefined, 'cateId')
  //   }
  //   this.inputChangeHandler(type, 'type')
  //   this.setState({
  //     type
  //   })
  // }

  changeVisible = (visible)=>{
    this.setState({visible})
  }
  

  render() {
    let { repairOrderAdd: { basicInfos, faultTypeList,peopleList,warehouseList,faultLevelList, applyRow }, form } = this.props
    let { getFieldDecorator } = form
    let columns = createColumnsProduct(this)
    const {dispatch}=this.props
    let productProps = {
      visible: this.state.visible,
      changeVisible: (visible) => {
        this.changeVisible(visible)
      }
    }
    let CusBtnProps = {
      
      onDelete: (e) => {
        e.stopPropagation()
        dispatch({
          type: 'repairOrderAdd/@change',
          payload: {
            applyRow: [],
            applyRowKeys: []
          }
        })
      },
      onChangeVisible: (visible) => {
        this.changeVisible(visible)
      },
      list: applyRow,
      keyWord:'name',
      type: 1
    }

    return (
      <section className='block-wrap form-wrap'>
        <div className="header flex-1">
          <div className="title">基本信息</div>
        </div>
        <Form {...formItemLayout}>
          <Item label='报障人'>
            {/* <Input width='100%' placeholder='标准名称'/> */}
            {
              getFieldDecorator('reportUserId', {
                rules: [
                  {
                    required: true,
                    message: '请选择报障人'
                  }
                ],
                // initialValue: basicInfos.name
              })
                (<Select width='100%' allowClear={true} placeholder='请选择报障人' options={peopleList} onChange={(e) => this.inputChangeHandler(e, 'reportUserId')}/>)
            }
          </Item>
          <Item label='规格'>
          {
              getFieldDecorator('standard', {
                rules:[
                  {
                    required: true,
                    message: '请输入规格'
                  }
                ],
                // initialValue: basicInfos.type != undefined ? ''+ basicInfos.type : undefined //类型int 转 string
              })
              (<Input width='100%' type='text' placeholder='请输入规格' onChange={(e)=>this.inputChangeHandler(e, 'standard')}/>)
            }
          </Item>
          
          <Item label='报障时间'>
            {
              getFieldDecorator('reportTime', {
                rules: [{
                  required: true,
                  message: '请选择报障时间'
                }]
              })
                (<DatePicker width='100%' placeholder='请选择报障时间'
                  onChange={(e) => this.inputChangeHandler(e, 'reportTime')}
                />)
            }
          </Item>
          <Item label='负责人'>
          { //todo
              getFieldDecorator('processsor', {
                rules:[
                  {
                    required: true,
                    message: '请选择负责人'
                  }
                ],
                // initialValue: basicInfos.type != undefined ? ''+ basicInfos.type : undefined //类型int 转 string
              })
              (<Select width='100%' allowClear={true} placeholder='请选择负责人' options={peopleList} onChange={(e) => this.inputChangeHandler(e, 'processsor')}/>)
            }
          </Item>
          <Item label="设备名称">
            <CusBtn {...CusBtnProps}></CusBtn>
          </Item>
          <Item label='故障类型'>
          {
              getFieldDecorator('faultType', {
                rules:[
                  {
                    required: true,
                    message: '请选择故障类型'
                  }
                ],
                // initialValue: basicInfos.type != undefined ? ''+ basicInfos.type : undefined //类型int 转 string
              })
              (<Select width='100%' allowClear={true} placeholder='请选择故障类型' options={faultTypeList} onChange={(e)=>this.inputChangeHandler(e, 'faultType')}/>)
            }
          </Item>
          <Item label='存放位置'>
          {
              getFieldDecorator('wareshouseId', {
                rules:[
                  {
                    required: true,
                    message: '请选择存放位置'
                  }
                ],
                // initialValue: basicInfos.type != undefined ? ''+ basicInfos.type : undefined //类型int 转 string
              })
              (<Select width='100%' allowClear={true} placeholder='请选择存放位置' options={warehouseList} onChange={(e)=>this.inputChangeHandler(e, 'wareshouseId')}/>)
            }
          </Item>
          <Item label='故障等级'>
            {
              getFieldDecorator('faultLevel')
                (<Select width='100%' allowClear={true} placeholder='请选择故障等级' options={faultLevelList} onChange={(e) => this.inputChangeHandler(e, 'faultLevel')}/>)

            }
            
          </Item>
          <Item label='故障描述'>
            {
              getFieldDecorator('content')
                (<Input width='100%' type='textarea' placeholder='故障描述' onChange={(e) => this.inputChangeHandler(e, 'content')} />)
            }
          </Item>
          <Item label='备注'>
            {
              getFieldDecorator('remark')
                (<Input width='100%' type='textarea' placeholder='备注' onChange={(e) => this.inputChangeHandler(e, 'remark')} />)
            }
          </Item>
        </Form>
        <ProductList {...productProps} />
      </section>
    )
  }
}

export default createForm(repairOrderAdd)