/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-19 14:34:40
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-19 10:58:20
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { ModalNormal } from 'components/Modal'
import VideoPlayer from './VideoPlayer'
import FlowPlay from './FlowPlay'
import './index.less'
import '../libs/flowplayer-3.2.8.min.js'
import flowplayerswf from'../libs/flowplayer-3.2.18.swf'
import flowplayerswfRtmp from '../libs/flowplayer.rtmp-3.2.8.swf'
import flowplayerControl from '../libs/flowplayer.controls-3.2.16.swf'
import {
  CloseCircleOutlined
} from '@ant-design/icons';
import {Icon} from 'antd'
@connect(({ realtime, loading }) => ({
  realtime,
  loading: loading.models.realtime,
}))
export default class extends Component {
  componentWillUnmount() {
    // TODO 到时候要修改urls
    // let urls = 'rtmp://202.69.69.180:443/webcast/bshdlive-pc';
    console.log(this.props.videoJsOptions)
    let urls = 'rtmp://202.69.69.180:443/webcast/bshdlive-pc'
    flowplayer("player5", flowplayerswf ,{
      clip: {  
        url: urls,
        provider: 'rtmp', 
        live: true
      },
      plugins: {
        rtmp: {   
          url: flowplayerswfRtmp,   
          netConnectionUrl: urls
        },
        controls: {
          url: flowplayerControl,
          // play: false, opacity: 1, scrubber: false, volume: false, mute: false
        }
      }
    }); 
  }
  render() {
    let { visible, onChangeVisible, videoJsOptions } = this.props
    let style = { display: 'none'}
    if(visible) {
      style = {display: 'block'}
    }
    return (
      <></>
      
    )
  }
}
