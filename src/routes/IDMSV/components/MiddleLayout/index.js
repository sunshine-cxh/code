/*
 * @Descripttion : 用气量通用组件
 * @Author       : caojiarong
 * @Date         : 2020-07-14 11:13:41
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-23 09:46:25
 */ 
import React, { Component, Children } from 'react'
import './index.less'

export default class extends Component {
  constructor(props){
    super(props)
  }
  render() {
    let {children, style, className} = this.props
    return (
      <div className={`flow-box ${className}`} style={style}>
        <p className='corner-big corner-left-top' />
        <p className='corner-big corner-left-bottom' />
        <p className='corner-big corner-right-top' />
        <p className='corner-big corner-right-bottom' />

        <p className='border-big border-left-top' />
        <p className='border-big border-left-bottom' />
        <p className='border-big border-right-top' />
        <p className='border-big border-right-bottom' />
        {children}
      </div>
    )
          
  }
}
