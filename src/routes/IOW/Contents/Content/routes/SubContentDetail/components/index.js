/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-06 10:51:42
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-07-07 16:19:08
 */

import React from 'react'
import { connect } from 'dva'

import { Layout, Form } from 'antd'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BaseComponent from 'components/BaseComponent'
import { Link } from 'dva/router'
import BasicInfo from './BasicInfos'

import '../style/index.less'
import $$ from 'cmn-utils'
import { notice } from 'components/Notification'
import { getUrlParameters } from 'utils/urlHandler'
import SubPageLayout from 'components/SubPageLayout'
import { routePrefix } from '../../../../../config'

@connect(({ contentDetail, loading, Content }) => ({
  contentDetail,
  loading: loading.models.contentDetail,
  Content,
}))
export default class contentDetail extends BaseComponent {
  state = {
    isApproval: 0,
    contentId: '',
  }
  componentDidMount() {
    const { dispatch } = this.props

    let urlParameters = getUrlParameters()
    this.setState(
      {
        isApproval: urlParameters.isApproval,
        contentId: urlParameters.id,
      },
      () => {
        dispatch({
          type: 'contentDetail/getContentDetail',
          payload: {
            id: this.state.contentId,
            status: this.state.isApproval,
          },
        })
      }
    )
  }
  handleUpdatestatus = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'contentDetail/updatestatus',
      payload: {
        id: this.state.contentId,
        status: this.state.isApproval == 0 ? 1 : 0,

        success: () => {
          notice.success(this.state.isApproval == 0 ? '发布成功' : '取消发布成功')
          $$.setStore('content-isApproval', this.state.isApproval == 0 ? 1 : 0)
          this.setState({
            isApproval: this.state.isApproval == 0 ? 1 : 0,
          })
        },
      },
    })
  }
  render() {
    let { isApproval } = this.state
    return (
      <SubPageLayout className="page procurement-detail">
        <Panel header={null}>
          <section className="content__wrapper">
            <BasicInfo></BasicInfo>
          </section>
        </Panel>
        <section className="footer-wrap">
          <Button type="primary3" onClick={this.handleUpdatestatus}>
            {isApproval == 0 ? '发布' : '取消发布'}
          </Button>
          <Link to={`${routePrefix}/content`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}
