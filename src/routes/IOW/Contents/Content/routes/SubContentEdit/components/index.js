/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-07-07 16:00:56
 */
import React from 'react'
import { connect } from 'dva'

import { Layout, Form } from 'antd'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import BaseComponent from 'components/BaseComponent'
import { Link, routerRedux } from 'dva/router'
import PageHelper from 'utils/pageHelper'
import { notice } from 'components/Notification'
import { getUrlParameters } from 'utils/urlHandler'
import SubPageLayout from 'components/SubPageLayout'
import { routePrefix } from '../../../../../config'

import '../style/index.less'

const createForm = Form.create
@connect(({ ContentEdit, loading, content }) => ({
  ContentEdit,
  loading: loading.models.ContentEdit,
}))
class ContentEdit extends BaseComponent {
  componentDidMount() {
    let { dispatch } = this.props
    let urlParameters = getUrlParameters()

    if (urlParameters.id !== undefined) {
      this.setState(
        {
          contentId: urlParameters.id,
        },
        () => {
          dispatch({
            type: 'ContentEdit/getContentDetail',
            payload: {
              contentId: this.state.contentId,
            },
          })
        }
      )
    }
    dispatch({
      type: 'ContentEdit/init',
      payload: {
        contentId: this.state.contentId,
      },
    })
  }
  state = {
    contentId: '',
  }
  componentWillUnmount() {
    this.setState({
      contentId: '',
    })
  }

  handleSubmit = () => {
    const { dispatch } = this.props
    let { validateFields, getFieldsValue } = this.form.props.form
    let postData = getFieldsValue()
    postData.isPublic ? (postData.isPublic = 1) : (postData.isPublic = 0)
    postData.isDisplay ? (postData.isDisplay = 1) : (postData.isDisplay = 0)
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'ContentEdit/submit',
          payload: {
            postData: postData,
            success: () => {
              notice.success('保存成功')

              // 路由跳转
              dispatch(
                routerRedux.push({
                  pathname: `${routePrefix}/content`,
                })
              )
              dispatch({
                type: 'Content/getPageInfo',
                payload: {
                  pageData: PageHelper.create().jumpPage(),
                },
              })
            },
          },
        })
      }
    })
  }

  render() {
    return (
      <SubPageLayout>
        <Panel header={null}>
          <section className="content__wrapper">
            <BasicInfos wrappedComponentRef={(form) => (this.form = form)} />
            {/* <OperatorArea /> */}
          </section>
        </Panel>
        <section className="footer-wrap">
          {/* <Button type="primary3" onClick={this.handleSave}>保存</Button> */}
          <Button type="primary3" onClick={this.handleSubmit}>
            保存
          </Button>
          <Link to={`${routePrefix}/content`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

export default createForm()(ContentEdit)
