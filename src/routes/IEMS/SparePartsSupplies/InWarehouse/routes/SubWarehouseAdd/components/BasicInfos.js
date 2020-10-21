/*
 * @Descripttion : 新建入库管理页
 * @Author       : caojiarong
 * @Date         : 2020-05-15 11:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-13 17:45:01
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

let createForm  = Form.create()
@connect(({ inWarehouseAdd, loading, inWarehouse }) => ({
  inWarehouseAdd,
  loading: loading.models.inWarehouseAdd,
  inWarehouse
}))
class inWarehouseAdd extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    visible:false
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'inWarehouseAdd/getWarehouse',
      payload: {}
    }) 

    dispatch ({
      type: 'inWarehouseAdd/getInWarehouseType',
      payload:{}
    })

    dispatch({
      type: 'inWarehouseAdd/getAllPeople',
      payload: {
        enterpriseId:JSON.parse(window.localStorage.getItem('user')).enterpriseId
      }
    })
  }

  componentDidMount(){
    // 
  }

  initParams=()=>{
    const { dispatch } = this.props
    dispatch({
      type:'inWarehouseAdd/initParams',
      payload:{}
    })
  }

  // 改变采购申请选择的展示状态
  changeVisible = (visible)=> {
    this.setState({
      visible
    })
  }
  inputChangeHandler(val, key) { 
    const {inWarehouseAdd: {basicInfos, flowSchemes: { list } }, dispatch} = this.props
    let res = val
    dispatch({
      type: 'inWarehouseAdd/basicInfosChange',
      payload: {
        val: res,
        key
      }
    })
    if(key == 'outInType' && res != '3' ){
      dispatch({
        type: 'inWarehouseAdd/basicInfosChange',
        payload: {
          val: undefined,
          key: 'receiveUserId'
        }
      })
      dispatch({
        type: 'inWarehouseAdd/basicInfosChange',
        payload: {
          val: undefined,
          key: 'receiveUserName'
        }
      })
    }
  }

  render() {
    const { inWarehouseAdd: { basicInfos, warehouseList, inWarehouseType,peopleList,applyRow, flowSchemes: { list }}, form, dispatch} = this.props
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
          type: 'inWarehouseAdd/@change',
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
          <Item label="入库仓库">
          {
              getFieldDecorator('warehouseId', {
                rules:[
                  {
                    required: true,
                    message: '请选择入库仓库'
                  }
                ]
              })
              (<Select width="100%" 
                placeholder="入库仓库" 
                allowClear = {true}
                options={warehouseList}
                onChange={val => this.inputChangeHandler(val, 'warehouseId')} />)
            }
          </Item>

          <Item label="入库时间">
          {
              getFieldDecorator('operateTime', {
                rules:[
                  {
                    required: true,
                    message: '请选择入库时间'
                  }
                ]
              })
            (<DatePicker width="100%" placeholder="入库时间"
                // value={basicInfos.operateTime}
                allowClear = {true}
                onChange={val => {this.inputChangeHandler(val.format("YYYY-MM-DD"), 'operateTime');}} />)
            }
          </Item>

          <Item label="入库类型">
            {
              getFieldDecorator('outInType', {
                rules:[
                  {
                    required: true,
                    message: '请选择入库类型'
                  }
                ]
              })
              (<Select
                width="100%" placeholder="请选择入库类型" 
                options={inWarehouseType}
                allowClear = {true}
                onChange={val => this.inputChangeHandler( val, 'outInType')} />)
            }
            
          </Item>
          {/* 采购入库类型才显示 */}
          {
             (basicInfos.outInType == 2 || basicInfos.outInType == '采购入库')&&
             <Item label="选择采购申请">
              <CusBtn {...CusBtnProps} />
            </Item>
          }
          
          { //选择领用归还的入库类型才显示
            (basicInfos.outInType == 3 || basicInfos.outInType == '领用归还') &&
            <Item label="选择归还人">
              {
                getFieldDecorator('operateId', {
                  rules:[
                    {
                      required: true,
                      message: '请选择归还人'
                    }
                  ]
                })
                (<Select
                  width="100%" placeholder="请选择归还人"
                  options={peopleList}
                  allowClear = {true}
                  onChange={
                    (val,key) => {
                      this.inputChangeHandler(val, 'receiveUserId')
                      this.inputChangeHandler(key.props.title, 'receiveUserName')
                    }
                  } />)
              }
              
            </Item>
          }
          
          <Item label="备注">
          {
              getFieldDecorator('remark', {})
              (<Input
                type="textarea" placeholder="备注"
                onChange={val => this.inputChangeHandler( val, 'remark')}
                />)
            }
          </Item>          
        </Form>
        <ApplyList {...applyProps} />
      </section>
    )
  }
}

export default createForm(inWarehouseAdd)