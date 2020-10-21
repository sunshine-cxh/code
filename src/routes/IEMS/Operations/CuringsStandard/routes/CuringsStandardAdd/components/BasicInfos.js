/*
 * @Descripttion : 养护标准新建页基本信息
 * @Author       : hezihua
 * @Date         : 2020-06-02 10:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 17:11:22
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Input from 'components/Input'
import Select from 'components/Select'
import TreeSelect from 'components/TreeSelect'
import '../style/index.less'
import InputNumber from 'components/InputNumber'

const { Item } = Form
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
}
let unitList = [
  {
    code: '1',
    codeName: '天',
  },
  {
    code: '2',
    codeName: '月',
  },
  {
    code: '3',
    codeName: '年',
  },
]
let createForm = Form.create()
@connect(({ curingsStandardAdd, loading }) => ({
  curingsStandardAdd,
  loading: loading.models.curingsStandardAdd,
}))
class curingsStandardAdd extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'curingsStandardAdd/getStandardTypeList',
    })
    dispatch({
      type: 'equipmentGlobal/getType',
      payload: {
        namespace: 'curingsStandardAdd',
        valueField: 'typeList',
        success: () => {},
      },
    })
  }

  changeType = (type) => {
    let {
      dispatch,
      curingsStandardAdd: { standardTypeList, details },
    } = this.props
    details = { ...details, type }
    dispatch({
      type: 'curingsStandardAdd/@change',
      payload: {
        details,
      },
    })
  }

  render() {
    let {
      curingsStandardAdd: { standardTypeList, typeList, details },
      form,
    } = this.props
    let { getFieldDecorator } = form
    return (
      <section className="block-wrap form-wrap">
        <div className="header flex-1">
          <div className="title">基本信息</div>
        </div>
        <Form {...formItemLayout}>
          <Item label="标准名称">
            {/* <Input width="100%" placeholder="标准名称"/> */}
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入标准名称',
                },
              ],
              initialValue: details.name,
            })(<Input width="100%" placeholder="标准名称" />)}
          </Item>
          <Item label="类型">
            {getFieldDecorator('type', {
              rules: [
                {
                  required: true,
                  message: '请选择设置类型',
                },
              ],
              initialValue: details.type != undefined ? '' + details.type : undefined, //类型int 转 string
            })(
              <Select
                width="100%"
                allowClear={true}
                placeholder="请选择设置类型"
                options={standardTypeList}
                onChange={this.changeType}
              />
            )}
          </Item>
          {
            //todo  分类的数据来源未确定
            details.type == '2' && (
              <>
                <Item label="设备类别">
                  {getFieldDecorator('cateId', {
                    rules: [
                      {
                        required: true,
                        message: '请选择分类',
                      },
                    ],
                    initialValue: details.cateId,
                  })(<TreeSelect width="100%" placeholder="分类" treeData={typeList} />)}
                </Item>
              </>
            )
          }
          <Item label="要求">
            {getFieldDecorator('require', {
              rules: [
                {
                  required: true,
                  message: '请输入标准要求',
                },
              ],
              initialValue: details.require,
            })(<Input width="100%" placeholder="要求" />)}
          </Item>
          <Item label="养护周期">
            {getFieldDecorator('cycle', {
              rules: [
                {
                  required: true,
                  message: '请输入养护周期',
                },
              ],
              initialValue: details.cycle,
            })(<InputNumber style={{ width: '70%' }} placeholder="养护周期" />)}
            {getFieldDecorator('cycleUnit', { initialValue: String(details.cycleUnit) })(
              <Select style={{ float: 'right', width: '25%' }} options={unitList} />
            )}
          </Item>
          <Item label="备注">
            {getFieldDecorator('remark', {
              initialValue: details.remark,
            })(<Input width="100%" type="textarea" placeholder="备注" />)}
          </Item>
        </Form>
      </section>
    )
  }
}

export default createForm(curingsStandardAdd)
