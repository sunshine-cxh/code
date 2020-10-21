/*
 * @Descripttion : 巡检标准新建页基本信息
 * @Author       : caojiarong
 * @Date         : 2020-06-02 10:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-24 09:30:42
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Input from 'components/Input'
import Select from 'components/Select'
import TreeSelect from 'components/TreeSelect'
import UploadImage from './UploadImage'

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
@connect(({ patrolTaskSubmit, loading }) => ({
  patrolTaskSubmit,
  loading: loading.models.patrolTaskSubmit
}))
class patrolTaskSubmit extends Component {
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
      type: 'patrolTaskSubmit/getStandardTypeList'
    })
    dispatch({
      type: 'equipmentGlobal/getType',
      payload: {
        namespace: 'patrolTaskSubmit',
        valueField: 'typeList',
        success: () => {
        }
      }
    })
  }

  inputChangeHandler(val, key) { //-------------------
    const { dispatch } = this.props
    let res = val
    dispatch({
      type: 'patrolTaskSubmit/basicInfosChange',
      payload: {
        val: res,
        key
      }
    })
  }

  changeType = (type) => {
    if (type != 2) {
      this.inputChangeHandler(undefined, 'cateId')
    }
    if (type != 1) {

    }
    this.inputChangeHandler(type, 'type')
    this.setState({
      type
    })
  }

  render() {
    let { patrolTaskSubmit: { basicInfos, standardTypeList, typeList, details }, form } = this.props
    let { getFieldDecorator } = form

    return (
      <section className="block-wrap form-wrap">
        <div className="header flex-1">
          <div className="title">故障信息</div>
        </div>
        <Form {...formItemLayout}>
          <Item label="处理人">
            {/* <Input width="100%" placeholder="标准名称"/> */}
            {
              getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入标准名称'
                  }
                ],
                initialValue: basicInfos.name
              })
                (<Input width="100%" placeholder="标准名称" onChange={(e) => this.inputChangeHandler(e, 'name')} />)
            }
          </Item>
          <Item label="故障类型">
            {
              getFieldDecorator('type', {
                rules: [
                  {
                    required: true,
                    message: '请选择设置类型'
                  }
                ],
                initialValue: basicInfos.type != undefined ? '' + basicInfos.type : undefined //类型int 转 string
              })
                (<Select width="100%" allowClear={true} placeholder="请选择设置类型" options={standardTypeList} onChange={(e) => this.changeType(e)} />)
            }
          </Item>
          <Item label="故障等级">
            {
              getFieldDecorator('cateId', {
                rules: [
                  {
                    required: true,
                    message: '请选择分类'
                  }
                ],
                initialValue: basicInfos.cateId
              })
                (<TreeSelect
                  width="100%" placeholder="分类"
                  treeData={typeList} />)
            }
          </Item>
          <Item label="备注">
            {
              getFieldDecorator('remark', {
                initialValue: basicInfos.remark
              })
                (<Input width="100%" type='textarea' placeholder="备注" onChange={(e) => this.inputChangeHandler(e, 'remark')} />)
            }
          </Item>
          <Item label="故障图片">
            <UploadImage></UploadImage>
          </Item>
        </Form>
      </section>
    )
  }
}

export default createForm(patrolTaskSubmit)
