/*
 * @Descripttion : 子系统列表
 * @Author       : wuhaidong
 * @Date         : 2019-12-10 10:09:19
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-07 10:30:38
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import { Layout } from 'antd'
const { Content } = Layout
import Icon from 'components/Icon'

import './index.less'

function toggleFullScreen() {
  if (
    !document.fullscreenElement &&
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen()
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen()
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
    }
  }
}

@connect(({ systems }) => ({
  systems
}))

@connect(({ global }) => ({
  global,

}))
export default class Systems extends Component {

  handleRoutes = (item) => {
    if (item.url == '/idmsv') {
      toggleFullScreen()
    }
    
    let { dispatch } = this.props

    dispatch({
      type: 'global/handleSystemRoute',
      payload: {
        currentClient: item
      }
    })
  }

  componentDidMount() {
    let { dispatch } = this.props
    dispatch({
      type: 'systems/getSystems',
      payload: {}
    })
  }

  render() {
    let { systems: { clients } } = this.props
    return (
      <Layout className='systems-page'>
        <Content>
          <div className='flexbox flex-justify-content-center head'>率真燃气全产业链智能运营管理平台 </div>
          <div className='flexbox  flex-wrap-wrap  list-wrap'>
            {clients.length && clients.map((item) => (
              <div key={item.id} className='flexbox flex-direction-column flex-justify-content-center flex-align-items-center item' onClick={() => { this.handleRoutes(item) }}>
                <Icon type={item.icon} className='icon-item' />
                 <div className='title'>{item.clientName}</div>
              </div>
            ))}
          </div>
        </Content>
      </Layout>
    )
  }
}
