/*
 * @Descripttion : Do not edit
 * @Author       : xuqiufeng
 * @Date         : 2020-05-06 11:25:37
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-06-08 11:48:00
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { Form, Switch } from 'antd'
import $$ from 'cmn-utils'

const { Item } = Form
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
}

@connect(({ contentDetail, loading, Content }) => ({
  contentDetail,
  loading: loading.models.contentDetail,
  Content,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      contentDetail: { details },
    } = this.props
    return (
      <section className="basic-article">
        <h3 className="title">{details.title}</h3>
        <p className="time">{details.publishDate}</p>
        <div className="article" dangerouslySetInnerHTML={{__html:details.detail}}></div>
      </section>
    )
  }
}
