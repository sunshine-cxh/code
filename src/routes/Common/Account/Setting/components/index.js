/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-06-24 16:42:45
 */
import React from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import ChangPassword from './ChangPassword'
import BaseComponent from 'components/BaseComponent'
import { Link, routerRedux } from 'dva/router'
import PageHelper from 'utils/pageHelper'
import Tabs from 'components/Tabs'
import { notice } from 'components/Notification'
import SubPageLayout from 'components/SubPageLayout'
import { getUrlParameters } from 'utils/urlHandler'

import '../style/index.less'

const createForm = Form.create
@connect(({ Account, loading, content }) => ({
  Account,
  loading: loading.models.Account,
}))
class Account extends BaseComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'Account/init',
    })
  }
  state = {
    tabsActiveKeyKey: 'setting',
  }
  handleSubmit = () => {
    const { dispatch } = this.props
    if (this.state.tabsActiveKeyKey == 'setting') {
      let { validateFields, getFieldsValue } = this.form.props.form
      let postData = getFieldsValue()
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'Account/submit',
            payload: {
              postData: postData,
              success: () => {
                notice.success('保存成功')
                dispatch({
                  type: 'global/getUserInfo',
                })
              },
            },
          })
        }
      })
    } else {
      let { validateFields, getFieldsValue } = this.passwordForm.props.form
      validateFields((err, values) => {
        if (!err) {
          let postData = getFieldsValue()
          if (postData.newPassword == postData.oldPassword) {
            notice.error('新密码不能和原密码一致')
          } else {
            dispatch({
              type: 'Account/changePassword',
              payload: {
                postData: postData,
                success: () => {
                  notice.success('重置密码成功')
                  // 路由跳转
                  dispatch(
                    routerRedux.push({
                      pathname: '/sign/login',
                    })
                  )
                },
              },
            })
          }
        }
      })
    }
  }

  render() {
    const { tabsActiveKeyKey } = this.state
    return (
      <SubPageLayout className="setting-page">
        <Panel header={null}>
          <Tabs
            activeKey={tabsActiveKeyKey}
            onChange={(value) => {
              this.setState({
                tabsActiveKeyKey: value,
              })
            }}
          >
            <div tab="个人设置" key="setting">
              <BasicInfos wrappedComponentRef={(form) => (this.form = form)} />
            </div>
            <div tab="修改密码" key="password">
              <ChangPassword wrappedComponentRef={(form) => (this.passwordForm = form)} />
            </div>
          </Tabs>
        </Panel>
        <section className="footer-wrap">
          <Button type="primary3" onClick={this.handleSubmit}>
            保存
          </Button>
        </section>
      </SubPageLayout>
    )
  }
}

export default createForm()(Account)
