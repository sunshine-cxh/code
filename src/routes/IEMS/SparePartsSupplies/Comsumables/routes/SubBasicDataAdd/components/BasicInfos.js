/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-11 15:29:54
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-30 16:26:35
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Input from 'components/Input'
import Select from 'components/Select'
import TreeSelect from 'components/TreeSelect'
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
const createForm = Form.create;
@connect(({ basicDataAdd, loading, basicData }) => ({
  basicDataAdd,
  loading: loading.models.basicDataAdd,
  basicData,
}))
class BasicForm extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    visible: false,
    cycle: [
      {
        code: 1,
        codeName: '天'
      },
      {
        code: 2,
        codeName: '月'
      },
      {
        code: 3,
        codeName: '年'
      }
    ]
  }
  componentDidMount(){
    const { dispatch } = this.props
    dispatch({
      type: 'equipmentGlobal/getType',
      payload: {
        namespace: 'basicDataAdd',
        valueField: 'typeList',
        type: 2,
        success: ()=> {
        }
      }
    })
    dispatch({
      type: 'equipmentGlobal/getBrand',
      payload: {
        namespace: 'basicDataAdd',
        valueField: 'brandList',
        success: ()=> {
        }
      }
    })
    dispatch({
      type: 'equipmentGlobal/getUnit',
      payload: {
        namespace: 'basicDataAdd',
        valueField: 'unitList',
        success: ()=> {
        }
      }
    })
  }
  inputChangeHandler = (val, key) => {
    const { dispatch } = this.props

    dispatch({
      type: 'basicDataAdd/basicInfosChange',
      payload: {
        val,
        key
      }
    })
  }

  render() {
    const { basicDataAdd, dispatch, form, basicData } = this.props
    const { basicInfos, details, typeList, unitList, brandList } = basicDataAdd
    const { getFieldDecorator } = form
    let { cycle } = this.state
    return (
      <section className="block-wrap form-wrap">
        <div className="header flex-1">
          <div className="title">基本信息</div>
        </div>
        <Form {...formItemLayout}>
          <Item label="名称">
            {
              getFieldDecorator('name', {
                rules:[
                  {
                    required: true,
                    message: '请输入名称'
                  }
                ],
                initialValue: details.name
              })
              (<Input
                width="100%" placeholder="名称"/>)
            }
            
          </Item>
          <Item label="类别">
            {
              getFieldDecorator('categoryId', {
                rules:[
                  {
                    required: true,
                    message: '请选择类别'
                  }
                ],
                initialValue: details.categoryId
              })
              (<TreeSelect
                width="100%" placeholder="类别"
                treeData={ typeList }/>)
            }
          </Item>
          <Item label="品牌">
            {
              getFieldDecorator('brandId', {
                rules:[
                  {
                    required: true,
                    message: '请选择品牌'
                  }
                ],
                initialValue: details.brandId
              })
              (<Select
                width="100%" placeholder="品牌"
                options={ brandList }/>)
            }
            
          </Item>
          <Item label="规格">
            {
              getFieldDecorator('standard', {
                rules:[
                  {
                    required: true,
                    message: '请输入规格'
                  }
                ],
                initialValue: details.standard
              })
              (<Input
                width="100%" placeholder="规格"/>)
            }
            
          </Item>
          <Item label="单位">
            {
              getFieldDecorator('unitId', {
                rules:[
                  {
                    required: true,
                    message: '请选择单位'
                  }
                ],
                initialValue: details.unitId
              })
              (<Select
                width="100%" placeholder="单位"
                options={ unitList } />)
            }
          </Item>
          <Item label="单价">
            {
              getFieldDecorator('price', {
                rules:[
                  {
                    required: true,
                    message: '请输入单价'
                  }
                ],
                initialValue: details.price
              })
              (<InputNumber
                width="100%" placeholder="单价"/>)
            }
          </Item>
          <Item label="采购周期">
            {
              getFieldDecorator('cycle', {
                rules:[
                  {
                    required: true,
                    message: '请选择采购周期'
                  }
                ],
                initialValue: details.cycle
              })
              (<Select
                width="100%" placeholder="采购周期"
                options={cycle}/>)
            }
          </Item>
          <Item label="预警值"  className="item-inline-wrap"  style={{marginBottom: '0px'}}>
            <Item style={{ marginLeft: 0, marginRight: '20px', width: '50%' }}>
              {
                getFieldDecorator('warningValueLow', {
                  rules:[
                    {
                      required: true,
                      message: '请输入低预警值'
                    }
                  ],
                  initialValue: details.warningValueLow
                })
                (<InputNumber
                  placeholder="低预警值"/>)
              }
                
                
            </Item>
            <Item style={{ width: '50%', marginRight: '0px' }}>

              {
                getFieldDecorator('warningValueHigh', {
                  rules:[
                    {
                      required: true,
                      message: '请输入高预警值'
                    }
                  ],
                  initialValue: details.warningValueHigh
                })
                (<InputNumber
                  placeholder="高预警值" />)
              }
            
            </Item>
          </Item>
          <Item label="标签码">
            {
              getFieldDecorator('lableCode', {
                rules:[
                  {
                    required: true,
                    message: '请输入标签码'
                  }
                ],
                initialValue: details.lableCode
              })
              (<Input
                width="100%" placeholder="标签码" />)
            }
          </Item>
          <Item label="备注">
            {
              getFieldDecorator('remark', {
                initialValue: details.remark
              })
              (<Input
                type="textarea" placeholder="备注"/>)
            }
            
          </Item>
        </Form>
      </section>
    )
  }
}


export default createForm()(BasicForm)