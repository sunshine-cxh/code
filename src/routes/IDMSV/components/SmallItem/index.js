/*
 * @Descripttion : 图表外框组件
 * @Author       : caojiarong
 * @Date         : 2020-07-14 11:13:41
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-27 09:54:06
 */ 
import React, { Component } from 'react'
import './index.less'

export default class extends Component {

  componentDidMount() {}

  render() {
    let {title, data} = this.props
    return (
      <div className='item'> {/* 需要抽取成为组件*/}
            <div style={{height:'30%'}}>
              <p className='line' />
              <div className='text'> <span>{title}</span> </div>
              <p className='line'/>
            </div>
            <div className='out-box'>
              <p className='corner-small corner-left-top' />
              <p className='corner-small corner-left-bottom' />
              <p className='corner-small corner-right-top' />
              <p className='corner-small corner-right-bottom' />
              <p className='inner-box'>
                {data || 0}
                <span>万m³</span>
              </p>
            </div>
          </div>
    )
          
  }
}
