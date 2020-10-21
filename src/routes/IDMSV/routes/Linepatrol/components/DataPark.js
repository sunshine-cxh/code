/*
 * @Descripttion : 安检巡线-今日施工数据
 * @Author       : caojiarong
 * @Date         : 2020-07-20 08:45:03
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-27 11:42:10
 */ 
import React, { Component } from 'react'
import { Row } from 'antd'
import situationIcon from 'assets/images/big/situation-icon.png'
import inlineIcon from 'assets/images/big/in-line-icon.png'
import outlineIcon from 'assets/images/big/out-line-icon.png'
import './index.less'
export default class DataPark extends Component{
  constructor(props){
    super(props)
  }

  render(){
    let { hiddenState } = this.props
    return (
      <>
        <div className='today-staff'>今日隐患/施工</div>
        <Row className='data-list' gutter={8}>
            <div className='data-box'>
                <p>{ parseInt(hiddenState.todayReceipt.todayConstruction) + parseInt(hiddenState.todayReceipt.todayHiddenAttributes) }</p>
                <p>待抢修</p>
            </div>
            <p className='next-icon' />
            <div className='data-box'>
                <p>{ parseInt(hiddenState.todayReceipt.currentConstructionCount) + parseInt(hiddenState.todayReceipt.currentHiddenAttributes) }</p>
                <p>抢修中</p>
            </div>
            <p className='next-icon' />
            <div className='data-box'>
                <p>{ parseInt(hiddenState.todayReceipt.todayHandledConstruction) + parseInt(hiddenState.todayReceipt.todayHandledHidden) }</p>
                <p>已完成</p>
            </div>
        </Row>
        <hr className='filter-line' />

        <div className='staff-situation'>
          <div className='in-line'>
            <div>
              <img alt='在线头像' src={inlineIcon}/>
              <div className='in-out-line'>在线人员</div>
            </div>
            <div>
              <div>人数</div>
              <div>{hiddenState.usersCount.onLineCount}</div>
            </div>
          </div>

          <div className='in-line'>
            <div>
              <img alt='离线线头像' src={outlineIcon}/>
              <div className='in-out-line'>离线人员</div>
            </div>
            <div>
              <div>人数</div>
              <div>{hiddenState.usersCount.offLineCount}</div>
            </div>
          </div>
        </div>
      </>
    )
  }
}