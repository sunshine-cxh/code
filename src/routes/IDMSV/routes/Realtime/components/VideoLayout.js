/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-19 14:34:40
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-22 17:44:04
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { ModalNormal } from 'components/Modal'
import VideoPlayer from './VideoPlayer'
import {
  CloseCircleOutlined
} from '@ant-design/icons';
import {Icon} from 'antd'
@connect(({ realtime, loading }) => ({
  realtime,
  loading: loading.models.realtime,
}))
export default class extends Component {
  render() {
    let { visible, onChangeVisible, videoJsOptions } = this.props
    let style = { display: 'none'}
    if(visible) {
      style = {display: 'block'}
    }
    console.log(visible)
    console.log(videoJsOptions)
    return (
      <>
      {
        visible ? <div className="video-layout" style={style}>
        <Icon className="icon-item delete-btn" 
              type="close-circle" 
              theme="filled"
              onClick={ (e)=> {
                onChangeVisible(false)
                  } }
        />
        <VideoPlayer {...videoJsOptions} visible={visible}></VideoPlayer>
      </div> : null
      }
      </>
      
    )
  }
}
