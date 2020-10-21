/*
 * @Descripttion : 登录页
 * @Author       : wuhaidong
 * @Date         : 2019-12-10 10:09:19
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-05-28 09:43:32
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Layout, Input, Checkbox} from 'antd'
import Button from 'components/Button'
import ImageLogo from 'assets/images/logo.png'
import ImageLogoName from 'assets/images/logo_name.png'
import IconUser from 'assets/icons/user.png'
import IconPassword from 'assets/icons/password.png'
const { Content } = Layout
const FormItem = Form.Item
import md5 from '@/utils/md5'
import $$ from 'cmn-utils'

import './index.less'
@connect(({ login, loading }) => ({
  login,
  loading: loading.models.login,
}))
class Login extends Component {
  state = {
    rememberPassword: false,
    loginValues: {},
  }

  inputItemIcon = (src) => {
    return <img className="input-item-icon" src={src} alt="" />
  }

  handleSubmit = (e) => {
    const { form, dispatch } = this.props
    e.preventDefault()
    form.validateFields((err, values) => {
      $$.setStore('loginValues', values)

      if (!err) {
        values.password = md5.hash(values.password)
        dispatch({
          type: 'login/login',
          payload: values,
        })
      }
    })
  }

  componentDidMount() {
    let loginValues = $$.getStore('loginValues')
    this.setState({
      rememberPassword: loginValues ? loginValues.remember : false,
      loginValues: loginValues,
    })
  }

  render() {
    let { rememberPassword, loginValues } = this.state
    let { loading, form } = this.props
    let { getFieldDecorator } = form

    return (
      <Layout className="login-page">
        <Content>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <div className="login-form-wrap">
              <div className="flexbox flex-justify-content-center flex-align-items-center login-form-head">
                <img className="image-logo" src={ImageLogo} alt="logo" />
                <img
                  className="image-logo-name"
                  src={ImageLogoName}
                  alt="logo"
                />
              </div>
              <div className="customer">苏州天然气管网有限公司</div>
              {/* TODO */}
              {/* <div className='flexbox flex-justify-content-space-between tab'>
                  <div className='tab-item tab-item_active'>密码登录</div>
                  <div className='tab-item'>扫码登录</div>
                </div> */}

              <div className="form-form-area">
                <FormItem className="form-item-user">
                  {getFieldDecorator('account', {
                    initialValue:
                      rememberPassword && loginValues
                        ? loginValues.account
                        : '',
                    rules: [{ required: true, message: '请输入您的用户名' }],
                  })(
                    <Input
                      size="large"
                      className="login-input-item"
                      prefix={this.inputItemIcon(IconUser)}
                      placeholder="请输入用户名"
                      autoComplete="off"
                    />
                  )}
                </FormItem>
                <FormItem className="form-item-password">
                  {getFieldDecorator('password', {
                    initialValue:
                      rememberPassword && loginValues
                        ? loginValues.password
                        : '',
                    rules: [{ required: true, message: '请输入您的密码' }],
                  })(
                    <Input
                      size="large"
                      className="login-input-item"
                      // prefix={<Icon type='lock' style={{ fontSize: '24px', color: '#00F6FF',marginRight: '30px' }}/>}
                      prefix={this.inputItemIcon(IconPassword)}
                      type="password"
                      placeholder="请输入密码"
                    />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: rememberPassword,
                  })(<Checkbox className="checkbox-item">记住密码</Checkbox>)}
                </FormItem>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  disabled={!!loading}
                >
                  {!!loading ? '正在登录...' : '登录'}
                </Button>
              </div>
            </div>
          </Form>
          <div className="flexbox flex-justify-content-center copyright">
            Copyright &nbsp;2013-2020 &nbsp;&nbsp;
            深圳市爱路恩济能源技术有限公司
          </div>
          {/* </Spin> */}
        </Content>
      </Layout>
    )
  }
}

export default Form.create()(Login)
