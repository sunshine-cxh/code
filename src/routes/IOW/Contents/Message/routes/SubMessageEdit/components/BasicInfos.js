/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-04-28 14:34:01
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-06-23 11:36:20
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { Form, Switch } from 'antd'
import Input from 'components/Input'
import Select from 'components/Select'
import Cascader from 'components/Cascader'
import Editor from 'components/Editor'
import $$ from 'cmn-utils'
import Panel from 'components/Panel'

const { Item } = Form
const formItemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 20,
  },
}

@connect(({ MessageEdit, loading, Message }) => ({
  MessageEdit,
  loading: loading.models.MessageEdit,
  Message,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    let messageId = $$.getStore('message-id')
    if (messageId) {
      dispatch({
        type: 'MessageEdit/getMessageDetail',
        payload: {
          id: messageId,
        },
      })
    }
  }

  inputChangeHandler(val, key) {
    const { dispatch } = this.props

    dispatch({
      type: 'MessageEdit/basicInfosChange',
      payload: {
        val,
        key,
      },
    })
  }

  render() {
    const {
      MessageEdit: { basicInfos },
    } = this.props
    return (
      <section>
        <Panel header={null}>
          <section className="content__wrapper">
            <section className="basic-infos__wrapper">
              <Form {...formItemLayout}>
                <Item label="姓名">
                  <p>{basicInfos.name}</p>
                </Item>
                <Item label="邮箱">
                  <p>{basicInfos.email}</p>
                </Item>
                <Item label="电话">
                  <p>{basicInfos.phone}</p>
                </Item>
                <Item label="留言内容">
                  <p>{basicInfos.message}</p>
                </Item>
              </Form>
            </section>
          </section>
        </Panel>

        <Panel header={null}>
          <section className="content__wrapper">
            <section className="basic-infos__wrapper">
              <Form {...formItemLayout}>
                <Item label="处理反馈">
                  <Input
                    type="textarea"
                    width="100%"
                    placeholder="请输入处理反馈"
                    value={basicInfos.remark}
                    allowClear 
                    onChange={(val) => this.inputChangeHandler(val, 'remark')}
                  />
                </Item>
              </Form>
            </section>
          </section>
        </Panel>
      </section>
    )
  }
}
