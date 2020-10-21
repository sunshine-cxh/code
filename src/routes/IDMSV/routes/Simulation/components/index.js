/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-07-14 08:45:03
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-06 15:36:49
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col, Table } from 'antd'
// import DataTable from 'components/DataTable'
import MiddleLayout from '../../../components/MiddleLayout'
import SimulationMap from './SimulationMap.js'
import PressureChart from './PressureChart.js'
import FlowChart from './FlowChart.js'
import {dataColumns} from './columns'
import './index.less'
// import trans from 'assets/images/big/trans.png'

@connect(({ simulation, loading }) => ({
  simulation,
  loading: loading.models.simulation,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type:'simulation/init'
    })
  }

  render() {
    let columns = dataColumns(this)
    let tableProps={
      showNum:false,
      columns,
      // dataItems: dataList
    }
    let {infosData}=this.props.simulation
    return (
      <div className="idmsv-simulation">
        <Row style={{height: '100%'}}  gutter={20}>
          <Col span={16} className="flex-center">
            <MiddleLayout style={{ height: '100%', padding: 0, boxShadow: '#0beaeb 0px 0px 18px inset' }}>
              <SimulationMap></SimulationMap>
            </MiddleLayout>
          </Col>
        {/* </Row>
        <Row style={{height: '42%'}}  gutter={20}> */}
          <Col span={8} style={{height:'100%',display:'flex',flexDirection: 'column',justifyContent: 'space-between'}}>
            <MiddleLayout style={{height: '25%', background: '#051B4A' }}>
              <FlowChart></FlowChart> 
            </MiddleLayout>
          
            <MiddleLayout style={{height: '25%' }}>
              <PressureChart></PressureChart>
            </MiddleLayout>
            <MiddleLayout style={{height: '45%' }}>
              {/* <Table {...tableProps}/> */}
              <div className='table-header'>
                {
                  columns.map((item,index)=>{
                    return (
                      <span key={index}>{item.title}</span>
                    )
                  })
                }
                
              </div>
              <div className='data-list-box' style={{overflow: 'auto'}}>
                {
                  infosData.map((item, index)=>{
                    return (
                      <div className='scada-data-list' key={index}>
                        <span>{item.name}</span>
                        <span>{item.inOutData.scadaData.inFlow}(万m³)</span>
                        <span>{item.inOutData.spsData.inFlow}(万m³)</span>
                        <span>{item.inOutData.scadaData.inPressure}(Kpa)</span>
                        <span>{item.inOutData.spsData.inPressure}(Kpa)</span>
                      </div>
                    )
                  
                  })
                }
              </div>
              
            </MiddleLayout>
          </Col>
          {/* <Col span={12} className="flex-end">
            
          </Col> */}
        </Row>
        {/* <img src={trans} style={{width: '300px'}}></img> */}
      </div>
    )
  }
}
