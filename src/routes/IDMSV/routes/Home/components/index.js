/*
 * @Descripttion : 智慧管网
 * @Author       : caojiarong
 * @Date         : 2020-07-14 11:13:41
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-12 10:29:30
 */ 
import React, { Component, Children } from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import './index.less'
import MiddleLayout from '../../../components/MiddleLayout'
import SmallItem from '../../../components/SmallItem'
import StationGasChart from './StationGasChart'
import TodayGasChart from './TodayGasChart'
import SumGas from './SumGas'
import Map from './Map'
import DashBoard from './dashBoard'

@connect(({ idmsvHome, loading }) => ({
  idmsvHome,
  loading: loading.models.idmsvHome,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }
 
  componentDidMount() {
    this.getAllData()
    setInterval(()=>this.getAllData,1000*60*5) 
  }

  getAllData = ()=>{
    const { dispatch } =this.props
    dispatch({
      type:'idmsvHome/init'
    })
  }

  render() {
    let { daycountData, gasTendencyData, stationPointUseData, stationUsedGas,mapPointerData,stationPressure } = this.props.idmsvHome
    return (
    <div className='idmsv-home'>
      <Row className='top-part' gutter={20}>
        <Col span={12} className='left-data'>
          <div className='data-sum'>
            <SmallItem title={daycountData.todaySpecifiedTitle} data={parseInt(daycountData.todaySpecifiedFlow)}/>
            <SmallItem title={daycountData.yesterdaySpecifiedTitle} data={parseInt(daycountData.yesterdaySpecifiedFlow)}/>
            <SmallItem title={daycountData.todayUsedTitle} data={parseInt(daycountData.todayUsedFlow)}/>
            <SmallItem title={daycountData.yesterdayUsedTitle} data={parseInt(daycountData.yesterdayUsedFlow)}/>
            <SmallItem title={daycountData.recentSpecifiedTitle} data={parseInt(daycountData.recentSpecifiedFlow)}/>
            <SmallItem title={daycountData.recentUsedTitle} data={parseInt(daycountData.recentUsedFlow)}/>
          </div>
          
          <MiddleLayout style={{height:'70%'}}>
            <TodayGasChart data={gasTendencyData}/>
          </MiddleLayout>
        </Col>

        <Col span={12} className='right-map'>
          <MiddleLayout style={{height:'100%', padding:'1px',display:'flex',justifyContent: 'space-evenly',flexWrap: 'wrap'}}>
            {
              stationPressure.map((item,index)=>{
                item.value= parseFloat((item.pressure/1000).toFixed(2))
                if(index <= 11){
                  return <DashBoard key={index} data={[item]}/>
                }
              })
            }
          </MiddleLayout>
        </Col>
      </Row>

      <Row  className='bottom-part'  gutter={20}>
        <Col span={12} className='left-data'>
          <MiddleLayout style={{height:'100%'}}>
            <StationGasChart data={stationUsedGas}/>
          </MiddleLayout>
        </Col>

        <Col span={12} className='left-data'>
          <MiddleLayout style={{height:'100%'}}>
            <SumGas data={stationPointUseData} />
          </MiddleLayout>
        </Col>
      </Row>
    </div>)
  }
}