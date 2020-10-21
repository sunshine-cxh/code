/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-07-14 08:45:03
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-19 10:43:14
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import './index.less'
import '../libs/flowplayer-3.2.8.min.js'
import flowplayerswf from'../libs/flowplayer-3.2.18.swf'
import flowplayerswfRtmp from '../libs/flowplayer.rtmp-3.2.8.swf'
import flowplayerControl from '../libs/flowplayer.controls-3.2.16.swf'

@connect(({ realtime, loading }) => ({
  realtime,
  loading: loading.models.realtime,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }
  
  componentDidUpdate() {
    // TODO 到时候要修改urls
    // let urls = 'rtmp://202.69.69.180:443/webcast/bshdlive-pc';
    let urls = this.props.data ? this.props.data.url : ''
    flowplayer("player"+this.props.num, flowplayerswf ,{  
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
    return (
      <>
        <a    href='#'
          style={{display:'block',width:'100%',height:'100%' }}
          id={"player"+this.props.num}>
        </a> 
      </>
    )
  }
}
