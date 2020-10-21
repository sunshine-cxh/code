/*
 * @Descripttion : 出库管理新建页基本信息
 * @Author       : caojiarong
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-06 15:00:00
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Input from 'components/Input'
import Select from 'components/Select'
import DatePicker from 'components/DatePicker'
import Icon from 'components/Icon'
import ApplyList from './applyList'
import '../style/apply.less'
import CusBtn from 'components/CusBtn'
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
@connect(({ outWarehouseAdd, loading }) => ({
  outWarehouseAdd,
  loading: loading.models.outWarehouseAdd
}))
class outWarehouseAdd extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    visible:false
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'outWarehouseAdd/getWarehouse',
      payload: {}
    })

    dispatch ({
      type: 'outWarehouseAdd/getOutWarehouseType',
      payload:{}
    })

    dispatch({
      type: 'outWarehouseAdd/getAllPeople',
      payload: {
        enterpriseId:JSON.parse(window.localStorage.getItem('user')).enterpriseId
      }
    })

  }

  // 改变领料申请选择的展示状态
  changeVisible = (visible)=> {
    this.setState({
      visible
    })
  }
  
  // 删除选中的领料申请-----------------
  handleDeleteBtn = (e)=> {
    e.stopPropagation()
    const { dispatch } = this.props

    dispatch({
      type: 'outWarehouseAdd/@change',
      payload: {
        applyRow: []
      }
    })
    dispatch({
      type: 'outWarehouseAdd/@change',
      payload: {
        applyRowKeys: []
      }
    })
  }

  inputChangeHandler(val, key) { //-------------------
    const {outWarehouseAdd: { flowSchemes: { list } }, dispatch, basicInfos} = this.props
    let res = val
    dispatch({
      type: 'outWarehouseAdd/basicInfosChange',
      payload: {
        val: res,
        key
      }
    })
    if(key == 'outInType' && res != '3' ){
      dispatch({
        type: 'outWarehouseAdd/basicInfosChange',
        payload: {
          val: undefined,
          key: 'operateId'
        }
      })
    }
  }

  render() {
    const { form, dispatch, outWarehouseAdd: { basicInfos, warehouseList, outWarehouseTypeList,peopleList,applyRow } } = this.props
    let { getFieldDecorator } = form
    let applyProps = {
      visible:this.state.visible,
      changeVisible:(visible)=>{
        this.changeVisible(visible)
      }
    }

    let CusBtnProps= {
      onDelete: (e)=> {
        e.stopPropagation()
        dispatch({
          type: 'outWarehouseAdd/@change',
          payload: {
            applyRow: [],
            applyRowKeys: []
          }
        })
      },
      onChangeVisible: (visible)=> {  
        this.setState({
          visible
        })
      },
      list: applyRow,
      type: 1
    }
    return (
      <section className="block-wrap form-wrap">
        <div className="header flex-1">
          <div className="title">基本信息</div>
        </div>
        <Form {...formItemLayout}>
          <Item label="出库仓库">
            {
              getFieldDecorator('warehouseId', {
                rules:[
                  {
                    required: true,
                    message: '请选择出库仓库'
                  }
                ]
              })
              (<Select
                width="100%" placeholder="请选择出库仓库"
                options={warehouseList}
                allowClear = {true}
                onChange={val => this.inputChangeHandler(val, 'warehouseId')} />)
            }
            
          </Item>

          <Item label="出库时间">
            {
              getFieldDecorator('operateTime', {
                rules:[
                  {
                    required: true,
                    message: '请选择出库时间'
                  }
                ]
              })
              (<DatePicker width="100%" 
              placeholder="出库时间"
              allowClear = {true}
              onChange={val => {this.inputChangeHandler(val.format("YYYY-MM-DD"), 'operateTime')}} />)
            }
            
          </Item>

          <Item label="出库类型">
          {
              getFieldDecorator('outInType', {
                rules:[
                  {
                    required: true,
                    message: '请选择出库类型'
                  }
                ]
              })
              (<Select
                width="100%" 
                placeholder="请选择出库类型"
                options={outWarehouseTypeList}
                allowClear = {true}
                onChange={val => this.inputChangeHandler( val, 'outInType')} />)
            }
            
          </Item>

          <Item label="领料人">
          {
              getFieldDecorator('receiveUserId', {
                rules:[
                  {
                    required: true,
                    message: '请选择领料人'
                  }
                ]
              })
              (<Select
                width="100%" placeholder="领料人"
                options={peopleList}
                allowClear = {true}
                onChange={
                  (val,key) => {
                    this.inputChangeHandler(val, 'receiveUserId')
                    }
                  } />)
            }
              
            </Item>

          <Item label="领料单">
            <CusBtn {...CusBtnProps} />
          </Item>
          
          <Item label="备注">
          {
              getFieldDecorator('remark')
              (<Input
                type="textarea" 
                placeholder="备注"
                onChange={val => this.inputChangeHandler(val, 'remark')}/>)
            }
            
          </Item>          
        </Form>
        <ApplyList {...applyProps}></ApplyList>
      </section>
    )
  }
}
export default createForm(outWarehouseAdd)