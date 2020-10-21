/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-19 14:25:30
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Input from 'components/Input'
import Select from 'components/Select'
import DatePicker from 'components/DatePicker'
import ApplyList from './applyList'
import '../style/apply.less'
import Icon from 'components/Icon'
import CusBtn from 'components/CusBtn'

const { Item } = Form
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
}

const createForm = Form.create

@connect(({ procurementTestAdd, loading }) => ({
  procurementTestAdd,
  loading: loading.models.procurementTestAdd,
}))
class BasicForm extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    visible: false,
  }
  componentDidMount() {
    const { dispatch } = this.props

    dispatch({
      type: 'procurementTestAdd/getCheckType',
      payload: {},
    })
  }
  changeVisible = (visible) => {
    this.setState({
      visible,
    })
  }
  handleDeleteBtn = (e) => {
    e.stopPropagation()
    const { dispatch } = this.props

    dispatch({
      type: 'procurementTestAdd/@change',
      payload: {
        applyRow: [],
      },
    })
    dispatch({
      type: 'procurementTestAdd/@change',
      payload: {
        applyRowKeys: [],
      },
    })
  }

  render() {
    const {
      procurementTestAdd: { basicInfos, applyRow, checkTypeList },
      dispatch,
      form,
    } = this.props
    const { getFieldDecorator } = form
    let applyProps = {
      visible: this.state.visible,
      changeVisible: (visible) => {
        this.setState({
          visible,
        })
      },
    }

    let CusBtnProps = {
      onDelete: (e) => {
        e.stopPropagation()
        dispatch({
          type: 'procurementTestAdd/@change',
          payload: {
            applyRow: [],
            applyRowKeys: [],
          },
        })
      },
      onChangeVisible: (visible) => {
        this.setState({
          visible,
        })
      },
      list: applyRow,
      type: 1,
      placeHolder: '请选择采购申请'
    }
    return (
      <section className="block-wrap form-wrap">
        <div className="header flex-1">
          <div className="title">基本信息</div>
        </div>
        <Form {...formItemLayout}>
          <Item label="标题">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请输入标题',
                },
              ],
            })(<Input width="100%" placeholder="标题" />)}
          </Item>
          <Item label="验收人">
            {getFieldDecorator('acceptUserID', {
              initialValue: basicInfos.acceptUserID,
            })(<Input disabled width="100%" placeholder="验收人" />)}
          </Item>
          <Item label="验收时间">
            {getFieldDecorator('acceptEndDate', {
              rules: [
                {
                  required: true,
                  message: '请输入验收时间',
                },
              ],
            })(<DatePicker width="100%" placeholder="验收时间" />)}
          </Item>
          <Item label="验收类别">
            {getFieldDecorator('acceptType', {
              rules: [
                {
                  required: true,
                  message: '请输入验收类别',
                },
              ],
            })(
              <Select
                width="100%"
                placeholder="验收类别"
                options={checkTypeList}
              />
            )}
          </Item>
          <Item label="采购申请">
            <CusBtn {...CusBtnProps}></CusBtn>
          </Item>
          <Item label="验收结果">
            {getFieldDecorator('acceptResult', {
              rules: [
                {
                  required: true,
                  message: '请输入验收结果',
                },
              ],
            })(<Input width="100%" placeholder="验收结果" />)}
          </Item>
          <Item label="备注">
            {getFieldDecorator('remark')(
              <Input width="100%" type="textarea" placeholder="备注" />
            )}
          </Item>
        </Form>
        <ApplyList {...applyProps}></ApplyList>
      </section>
    )
  }
}

export default createForm()(BasicForm)
