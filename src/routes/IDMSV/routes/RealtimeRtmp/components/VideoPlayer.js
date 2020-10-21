/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-07-17 14:55:41
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-13 15:36:22
 */

import React from 'react'
import videojs from 'video.js'
import videozhCN from 'video.js/dist/lang/zh-CN.json'
import 'video.js/dist/video-js.css'
import 'videojs-flash'

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    // instantiate Video.js
    let {type, visible, ...otherProps} = this.props
    this.player = videojs(this.videoNode, otherProps, function onPlayerReady() {
      // console.log('onPlayerReady', this)
    })

    videojs.addLanguage('zh-CN', videozhCN)
  }

  // destroy player on unmount
  // componentWillUnmount() {
  //   if (this.player) {
      // this.player.dispose()
  //   }
  // }
  // componentWillReceiveProps(nextProps){
  componentDidUpdate(nextProps){
    let { visible, type } = nextProps
    if(!visible && type === 2 && this.player) {
      
      this.videoNode.pause()
    } else if ( type === 1 ){
      // this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    let { title, type } = this.props
    let className = 'video-js fixed-video'
    if (type === 2) {
      className = 'video-js layout-video'
    }
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div style={{ width: '100%', height: '100%' }}>
          <div className="video-title">{title}</div>
          <video
            ref={(node) => (this.videoNode = node)}
            className={className}
            data-setup="{}"
          ></video>
        </div>
      </div>
    )
  }
}
