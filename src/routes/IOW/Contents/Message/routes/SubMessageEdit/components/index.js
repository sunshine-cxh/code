/*
 * @Descripttion : Do not edit
 * @Author       : xuqiufeng
 * @Date         : 2020-05-15 11:14:07
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-07-07 16:14:32
 */
import React from 'react'
import { connect } from 'dva'

import { Layout, Form } from 'antd'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import OperatorArea from './OperatorArea'
import BaseComponent from 'components/BaseComponent'
import { Link, routerRedux } from 'dva/router'
import PageHelper from 'utils/pageHelper'
import $$ from 'cmn-utils'
import { notice } from 'components/Notification'
import { routePrefix} from '../../../../../config'

import '../style/index.less'

const createForm = Form.create
@connect(({ MessageEdit, loading, Message }) => ({
  MessageEdit,
  loading: loading.models.MessageEdit,
}))
class MessageEdit extends BaseComponent {
  handleSubmit = () => {
    const { dispatch } = this.props

    dispatch({
      type: 'MessageEdit/submit',
      payload: {
        success: () => {
          notice.success('保存成功')
          // 路由跳转
          dispatch(
            routerRedux.push({
              pathname: `${routePrefix}/message`,
            })
          )
          dispatch({
            type: 'Message/getPageInfo',
            payload: {
              pageData: PageHelper.create().jumpPage(),
            },
          })
        },
      },
    })
  }

  render() {
    return (
      <Layout className="page procurement-add">
        <BasicInfos />

        <section className="btn-footer-area">
          <Button type="primary3" onClick={this.handleSubmit}>
            保存
          </Button>
          <Link to={`${routePrefix}/message`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </Layout>
    )
  }
}

export default createForm()(MessageEdit)
