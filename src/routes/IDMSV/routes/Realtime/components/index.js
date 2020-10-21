/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-07-14 08:45:03
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-23 11:50:10
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import MiddleLayout from '../../../components/MiddleLayout'
import VideoPlayer from './VideoPlayer.js'

import RealtimeMap from './RealtimeMap.js'
import './index.less'
import { Row } from 'antd'

@connect(({ realtime, loading }) => ({
  realtime,
  loading: loading.models.realtime,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    fixedVideoProps: [],
  }
  componentDidMount() {
    let {
      dispatch,
      realtime: { fixedVideo },
    } = this.props
    dispatch({
      type: 'realtime/getVideoUrl',
      payload: {
        success: (res) => {
          let arr = []
          let pointArr = []
          res.map((item) => {
            if (item.isFixedDisplay === 1) {
              fixedVideo.push(item)

              arr.push({
                autoplay: false,
                language: 'zh-CN',
                preload: 'auto',
                errorDisplay: true,
                controls: true,
                type: 1,
                title: item.name || '视频监控',
                sources: [
                  {
                    src: item.url,
                    type: 'application/x-mpegURL',
                  },
                ],
              })
            } else if (item.isFixedDisplay === 0) {
              pointArr.push(item)
            }
          })
          this.setState({
            fixedVideoProps: arr,
          })
          dispatch({
            type: 'realtime/@change',
            payload: {
              pointVideo: pointArr
            }
          })
        },
      },
    })
  }
  render() {
    let { fixedVideoProps } = this.state
    return (
      <div className="idmsv-realtime">
        <div className="left">
          <div style={{ display: 'none' }}>
            <VideoPlayer></VideoPlayer>
          </div>
          <MiddleLayout style={{ width: '100%', height: '49%', padding: '18px',boxShadow: '#0beaeb 0px 0px 18px inset' }}>
            {fixedVideoProps[0] ? (
              <VideoPlayer {...fixedVideoProps[0]}></VideoPlayer>
            ) : (
              null
            )}
          </MiddleLayout>
          <MiddleLayout style={{ width: '100%', height: '49%', padding: '18px',boxShadow: '#0beaeb 0px 0px 18px inset' }}>
            {fixedVideoProps[1] ? (
              <VideoPlayer {...fixedVideoProps[1]}></VideoPlayer>
            ) : (
              null
            )}
            {/* <video>您的浏览器不支持 video 标签。</video> */}
          </MiddleLayout>
        </div>
        <MiddleLayout style={{ width: '50%', height: '100%', padding: 0, boxShadow: '#0beaeb 0px 0px 18px inset' }}>
          <RealtimeMap></RealtimeMap>
          {/* <video>您的浏览器不支持 video 标签。</video> */}
        </MiddleLayout>
        <div className="right">
          <MiddleLayout style={{ width: '100%', height: '49%', padding: '18px',boxShadow: '#0beaeb 0px 0px 18px inset' }}>
            {fixedVideoProps[2] ? (
              <VideoPlayer {...fixedVideoProps[2]}></VideoPlayer>
            ) : (
              null
            )}
            {/* <video>您的浏览器不支持 video 标签。</video> */}
          </MiddleLayout>
          <MiddleLayout style={{ width: '100%', height: '49%', padding: '18px', boxShadow: '#0beaeb 0px 0px 18px inset' }}>
            {fixedVideoProps[3] ? (
              <VideoPlayer {...fixedVideoProps[3]}></VideoPlayer>
            ) : (
              null
            )}
            {/* <video>您的浏览器不支持 video 标签。</video> */}
          </MiddleLayout>
        </div>
      </div>
    )
  }
}
