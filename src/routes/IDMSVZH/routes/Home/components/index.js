/*
 * @Descripttion : 珠海大屏智慧管网
 * @Author       : caojiarong
 * @Date         : 2020-07-14 11:13:41
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-12 15:28:48
 */ 
import React, { Component, Children } from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import './index.less'
import MiddleLayout from '../../../components/MiddleLayout'
import Map from './Map'

@connect(({ idmsvzhHome, loading }) => ({
  idmsvzhHome,
  loading: loading.models.idmsvzhHome,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }
 
  componentDidMount() {
    // this.getAllData()
    // setInterval(()=>this.getAllData,1000*60*5) 
  }

  getAllData = ()=>{
    const { dispatch } =this.props
    dispatch({
      type:'idmsvzhHome/init'
    })
  }

  render() {
    return (
    <div className='idmsvzh-home'>

      <Row  className='bottom-part'  gutter={20}>
          <MiddleLayout style={{height:'100%',boxShadow: 'rgb(11, 234, 235) 0px 0px 18px inset',padding:'1.5%'}}>
            <Map />
          </MiddleLayout>
      </Row>
    </div>)
  }
}