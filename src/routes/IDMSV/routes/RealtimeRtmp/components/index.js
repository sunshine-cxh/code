/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-07-14 08:45:03
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-13 17:54:19
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import MiddleLayout from '../../../components/MiddleLayout'
import VideoPlayer from './VideoPlayer.js'

import RealtimeMap from './RealtimeMap.js'
import './index.less'
import { Row } from 'antd'
import FlowPlay from './FlowPlay'
@connect(({ realtime, loading }) => ({
  realtime,
  loading: loading.models.realtime,
}))
export default class extends Component {s
  constructor(props) {
    super(props)
  }
  state = {
    fixedVideoProps: [],
  }
  componentDidMount() {
    const {dispatch}=this.props
    dispatch({
      type: 'realtime/getVideoUrl',
      payload:{
        success: (res) => {
          let arr = []
          res.map((item) => {
            if (item.isFixedDisplay == 1) {

              arr.push({
                title: item.name || '视频监控',
                url: item.url,
              })
            }
          })
          this.setState({
            fixedVideoProps: arr,
          })
        },
      }
    })
  }
  render() {
    let { realtime:{pointVideo} } = this.props
    let {fixedVideoProps}=this.state
    return (
      <div className="idmsv-realtime">
        
        <div className="left">
          <div style={{ display: 'none' }}>
            <VideoPlayer></VideoPlayer>
          </div>
          <MiddleLayout style={{ width: '100%', height: '49%', padding: '18px',boxShadow: '#0beaeb 0px 0px 18px inset' }}>
            <FlowPlay num={1} data={fixedVideoProps[0]}/>
          </MiddleLayout>
          <MiddleLayout style={{ width: '100%', height: '49%', padding: '18px',boxShadow: '#0beaeb 0px 0px 18px inset' }}>
            <FlowPlay num={2} data={fixedVideoProps[1]}/>
            {/* <video>您的浏览器不支持 video 标签。</video> */}
          </MiddleLayout>
        </div>
        <MiddleLayout style={{ width: '50%', height: '100%', padding: 0, boxShadow: '#0beaeb 0px 0px 18px inset' }}>
          <RealtimeMap pointVideo={pointVideo}/>
          {/* <video>您的浏览器不支持 video 标签。</video> */}
        </MiddleLayout>
        <div className="right">
          <MiddleLayout style={{ width: '100%', height: '49%', padding: '18px',boxShadow: '#0beaeb 0px 0px 18px inset' }}>
            <FlowPlay num={3} data={fixedVideoProps[2]}/>
            {/* <video>您的浏览器不支持 video 标签。</video> */}
          </MiddleLayout>
          <MiddleLayout style={{ width: '100%', height: '49%', padding: '18px', boxShadow: '#0beaeb 0px 0px 18px inset' }}>
            <FlowPlay num={4} data={fixedVideoProps[3]}/>
            {/* <video>您的浏览器不支持 video 标签。</video> */}
          </MiddleLayout>
        </div>
      </div>
    )
  }
}
