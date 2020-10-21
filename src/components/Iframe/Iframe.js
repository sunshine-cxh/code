/*
 * @Descripttion : Iframe
 * @Author       : wuhaidong
 * @Date         : 2020-07-21 16:13:51
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-09-08 19:43:29
 */

import React from 'react'
import ReactDOM from 'react-dom'
import Spin from '../Spin'
export default class Iframe extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      iFrameHeight: '0px',
    }
  }

  render() {
    const { loading } = this.state
    const { src, height } = this.props
    return (
      <>
        <iframe
          onLoad={() => {
            let object = ReactDOM.findDOMNode(this)
            if (object.contentWindow.document.getElementsByTagName('header')[0]) {
              object.contentWindow.document.getElementsByTagName('header')[0].style.display = 'none' //如果是iframe项目内的页面，隐藏头
            }
            if (object.contentWindow.document.getElementsByTagName('aside')[0]) {
              object.contentWindow.document.getElementsByTagName('aside')[0].style.display = 'none' //如果是iframe项目内的页面，隐藏左边导航
            }

            this.setState({
              loading: false,
              iFrameHeight: height
                ? height
                : object.contentWindow.document.body.scrollHeight + 'px',
            })
          }}
          ref="iframe"
          src={src}
          width="100%"
          height={this.state.iFrameHeight}
          scrolling="no"
          frameBorder="0"
        ></iframe>
        {loading && (
          <div
            className="flexbox flex-1 flex-justify-content-center flex-align-items-center"
            style={{ height: '100%' }}
          >
            <Spin />
          </div>
        )}
      </>
    )
  }
}
