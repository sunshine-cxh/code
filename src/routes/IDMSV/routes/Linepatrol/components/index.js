/*
 * @Descripttion : 安检巡线
 * @Author       : caojiarong
 * @Date         : 2020-07-14 11:13:41
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-27 12:02:34
 */ 
import React, { Component } from 'react'
import { connect } from 'dva'
import {Row, Col} from 'antd'
import Select from 'components/Select'
import DatePicker from 'components/DatePicker'
import { Modal } from 'components/Modal'
import Button from 'components/Button'
import MiddleLayout from '../../../components/MiddleLayout'
import RepaireChart from './repaireChart'
import Map from './Map'
import DataPart from './DataPark'
import './index.less'
import { apiPrefix } from '../../../config'
import {configApiPrefix} from '../../../../../../src/config'
import $$ from 'cmn-utils'
import moment from 'utils/moment'

@connect(({ linepatrol, loading }) => ({
  linepatrol,
  loading: loading.models.linepatrol,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    userId:'',
    date:'',
    trackData:[],
    mom: undefined
  }

  componentDidMount() {
    this.getData()

    // setInterval(this.getData(), 1000 * 60 * 5)
    this.getAllData = setInterval(()=>this.getData(), 1000 * 30)
  }

  getData = ()=>{
    const { dispatch } = this.props
    dispatch({
      type:'linepatrol/init'
    })
  }

  // 限制日期只可以选小于当前日期的前后一周范围
  getDisableDate = (time) => {
    let now = new Date()
    return time > now || time + (1 * 24 * 3600 * 1000) > now
  }

  // 巡检人员轨迹查询
  getStaffTrack=()=>{
    let {userId, date} = this.state
    if(userId ==''){
      Modal.confirm({
        title: '注意',
        content:'请选择巡检人员!',
        onOk: () => {},
        onCancel() {}
      });
      return 
    }else if(date ==''){
      Modal.confirm({
        title: '注意',
        content:'请选择巡检人员!',
        onOk: () => {},
        onCancel() {}
      });
      return 
    }else{
      $$.post( configApiPrefix() + apiPrefix + '/inspection/getusertrack',{userId:userId,date:date})
      .then((data) => {
        let res = JSON.parse(data)
        return res
      })
      .then((data) => {
        console.log(data)
        if(data.data ){
          if(data.data.length==0) {
            Modal.confirm({
              title: '注意',
              content:'该员工没有巡检历史!'
            });
          }else{
            this.setState({trackData:data})
          }
          
        }
        
      })
    }
    clearInterval(this.getAllData)
  }

  // 查询所有当前在线人员实时位置
  getInlineStaff = () =>{
    let {dispatch}=this.props
    // dispatch({
    //   type:'linepatrol/getusertrack'
    // })
    this.setState({trackData: [],userId:'',date:'',mom:undefined})
    this.getAllData = setInterval(()=>this.getData(), 1000 * 30)
  }
  

  render() {
    
    let {constructionState, hiddenState, usersPosition, carsPosition,userList} = this.props.linepatrol
    return (
    <div className="idmsv-linePatrol">
      <Row className='whole-part' gutter={20}>
        <Col span={6} className='left-content'>
          <MiddleLayout className='data-staff' style={{height:'31%',backgroundColor: 'rgba(1, 20, 73, .5)',boxShadow: '#0beaeb 0px 0px 18px inset'}}>
            <DataPart hiddenState={hiddenState} />
          </MiddleLayout>
          <MiddleLayout style={{height:'56%',backgroundColor: 'rgba(1, 20, 73, .5)',boxShadow: '#0beaeb 0px 0px 18px inset'}}>
            <RepaireChart data={constructionState} />
          </MiddleLayout>
          <div className='filter-box'>
            <Select 
              className='people-list' 
              options={userList} 
              placeholder='请选择人员' 
              allowClear={true}
              value={this.state.userId || undefined}
              onChange={(e)=>{this.setState({userId:e})}}
            />
            <DatePicker 
              className='date-select' 
              value={this.state.mom}
              disabledDate={this.getDisableDate}                                    
              onChange={(e,el)=>{this.setState({mom:e,date:el})}} />
          </div>
          <div className='filter-box'>
            <Button className='people-list-btn' onClick={()=>this.getStaffTrack()}>查询轨迹</Button>
            <Button className='date-list-btn' 
            onClick={()=>{this.getInlineStaff()}} >实时查询</Button>
          </div>
        </Col>

        <Col span={18} className='right-content'>
          <MiddleLayout style={{height:'100%',backgroundColor: 'rgba(1, 20, 73, .5)',boxShadow: '#0beaeb 0px 0px 18px inset'}}>
            <Map carData = {carsPosition} data={usersPosition} trackData={this.state.trackData} userId={this.state.userId} />
          </MiddleLayout>
        </Col>
      </Row>
    </div>
    )
  }
}
