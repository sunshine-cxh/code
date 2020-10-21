/*
 * @Descripttion : 路线新增页
 * @Author       : caojiarong
 * @Date         : 2020-05-27 14:12:55
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-21 17:27:12
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Input from 'components/Input'
import Select from 'components/Select'
import '../style/index.less'
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

@connect(({ subLineAdd, loading }) => ({
  subLineAdd,
  loading: loading.models.subLineAdd,
}))
class BasicInfos extends BaseComponent {
  componentDidMount() {
    let { dispatch } = this.props
    
  }

  state={
    coordinateNum:[],
    coordinateList:[{index:0,startCoordinate:'', endCoordinate:''}]
  }

  // 新增坐标组
  handleCoordinateAdd=()=>{
    let {coordinateList}=this.state
    // for(let i = 0;i<coordinateList.length;i++){
      
      // coordinateList[coordinateList.length].index = i
    // }
    let newCoordinateList = {index:coordinateList[coordinateList.length-1].index+1,startCoordinate:'', endCoordinate:''}
    coordinateList.push(newCoordinateList)
  }

  // 删除坐标组
  handleCoordinateDelete = (index)=>{
    console.log(index)
    let {coordinateList}=this.state
    coordinateList.splice(index,1)
  }

  // 坐标值更改
  handleCoordinateChange = (index,key,value)=>{
    let {coordinateList}=this.state
    coordinateList[index][key]=value
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
    let { selectTypeList, lineInfo, lineStatusList } = this.props.subLineAdd
    let { coordinateNum,coordinateList } = this.state
    console.log('BasicInfos -> render -> coordinateList', coordinateList)
    return (
      <section className="block-wrap form-wrap">
        <div className="header flex-1">
          <div className="title">管段信息</div>
        </div>
        <Form {...formItemLayout}>
          <Item label="管段编号">
            {getFieldDecorator('code', {
            })(<Input type="text" width="100%" disabled placeholder="自动生成" />)}
          </Item>

          <Item label="管段名称">
            {getFieldDecorator('name', {
              rules:[
                {
                  required: true,
                  message: '请输入管段名称' 
                }
              ]
            })(<Input type="text" width="100%" placeholder="路线名称" onChange={(e) => this.inputChangeHandler(e, 'name')} />)}
          </Item>

          <Item label="选取方式">
            {getFieldDecorator('selectMethod', {
              rules: [
                {
                  required: true,
                  message: '请选择管段选取方式',
                },
              ],
            })(<Select width="100%" placeholder="选取方式" options={selectTypeList}  onChange={(e) => this.inputChangeHandler(e, 'selectMethod')}/>)}
          </Item>

          <Item label="管段信息">
            {getFieldDecorator('pipelineId', {
              rules: [
                {
                  required: true,
                  message: '请选择管段信息',
                },
              ],
            })(
            <Select 
              width="100%" 
              placeholder="管段信息" 
              options={lineInfo}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(e) => this.inputChangeHandler(e, 'pipelineId')}
            />)}
          </Item>

          {
            coordinateList.map((item,index)=>{
              return(
                <>
                  <Item label="起始坐标">
                    {getFieldDecorator('startCoordinate'+item.index, {
                      rules: [
                        {
                          required: true,
                          message: '请输入起始坐标',
                        },
                      ],
                      initialValue: item.startCoordinate
                    })(<Input type="text" width="100%" placeholder="起始坐标"
                        onChange={(e) => this.handleCoordinateChange(index,'startCoordinate', e)} />)}
                  </Item>

                  <Item label="终点坐标">
                    {getFieldDecorator('endCoordinate'+item.index, {
                      rules: [
                        {
                          required: true,
                          message: '请输入终点坐标',
                        },
                      ],
                      initialValue: item.endCoordinate
                    })(<Input type="text" width="100%" placeholder="终点坐标" setFieldsValue={item.endCoordinate}
                    onChange={(e) => this.handleCoordinateChange(index,'endCoordinate', e)} />)}

                    {
                      index == 0?<span style={{color:'red',cursor:'pointer',position:'absolute'}}
                      onClick={()=>{
                        this.handleCoordinateAdd()
                      }}
                    >+</span>:
                      <span style={{color:'red',cursor:'pointer',position:'absolute'}}
                        onClick={()=>{
                          this.handleCoordinateDelete(item.index)
                        }}
                      >-</span>
                    }
                    
                    
                  </Item>
                </>
              )
            })
          }

          {/* TODO暂无 */}
          <Item label="所属区域">
            {getFieldDecorator('area', {
              rules: [
                {
                  required: true,
                  message: '请选择所属区域',
                },
              ],
            })(<Select width="100%" placeholder="所属区域" options={lineStatusList}  onChange={(e) => this.inputChangeHandler(e, 'area')}/>)}
          </Item>

          <Item label="管段里程">
            {getFieldDecorator('pipelineMileage', {
              rules: [
                {
                  required: true,
                  message: '请输入管段里程',
                },
              ],
            })(<Input type="text" width="100%" placeholder="管段里程" onChange={(e) => this.inputChangeHandler(e, 'pipelineMileage')} />)}
          </Item>

          <Item label="路线数">
            {getFieldDecorator('routeNum', {
              rules: [
                {
                  required: true,
                  message: '请输入路线数',
                },
              ],
            })(<Input type="text" width="100%" placeholder="路线数" onChange={(e) => this.inputChangeHandler(e, 'routeNum')}  />)}
          </Item>

          {/* TODO暂无 */}
          {/* <Item label="管段状态">
            {getFieldDecorator('status', {
              rules: [
                {
                  required: true,
                  message: '请选择管段状态',
                },
              ],
            })(<Select width="100%" placeholder="管段状态" options={lineStatusList}  onChange={(e) => this.inputChangeHandler(e, 'status')}/>)}
          </Item> */}

          {/* <Item label="备注">
          {
            getFieldDecorator('remark', {})
            (<Input
              type="textarea" placeholder="备注"
              onChange={val => this.inputChangeHandler( val, 'remark')}
            />)
          }
          </Item> */}
        </Form>
      </section>
    )
  }
}

export default createForm()(BasicInfos)
