/*
 * @Descripttion : 调压站运算输出
 * @Author       : caojiarong
 * @Date         : 2020-07-01 15:11:37
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-14 14:24:58
 */
import React from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import Form from 'components/Form'
import Layout from 'components/Layout'
import BaseComponent from 'components/BaseComponent'
import Button from 'components/Button'
import Panel from 'components/Panel'
import DataTable from 'components/DataTable'
import G2 from 'components/Charts/G2'
import DataSet from '@antv/data-set'
import './index.less'
import Icon from 'components/Icon'
import DatePicker from 'components/DatePicker'
import Radio from 'components/Radio'
import Format from 'utils/format'
import {flowColumns, tempShowOption} from './columns'
import {CheckboxTree} from 'components/Checkbox'
import FlowChart from './flowChart'
import PressureChart from './pressureChart'
import TemperatureChart from './temperatureChart'
import { notice } from 'components/Notification'
const { Content } = Layout
const Pagination = DataTable.Pagination
const { Charts, Axis, Geom, Tooltip, Legend, Coord, Guide } = G2

@connect(({ pressureStationResult, loading }) => ({
  pressureStationResult,
  loading: loading.models.pressureStationResult,
}))
class pressureStationResult extends BaseComponent {
  state = {
    choiceDate:[],
    disableDate:'',  //禁用选择的范围
    choosenDate:[],  //日期范围
    paramsList:[],
    checkedList:[],
    tempShow:false,
    dateString:[],
    checkedValues:[],
    checkAll:false
  }
  componentDidMount(){
    const {dispatch} = this.props
    dispatch({
      type:'pressureStationResult/getStationExitList'
    })
  }

  getChecked=(obj)=>{
    // let { paramsList } = this.props.pressureStationResult
    let { paramsList } = this.state
    let checkedList = []
    // 判断数组是否已经包含当前name
    let isExit = false;
    for(let index in paramsList){
      if(paramsList[index].gasClientId == obj.gasClientId){
        paramsList[index].stationPointIds = obj.stationPointIds
        isExit = true
        break //存在就直接跳出循环
      }
    }
    //不存在 直接push进去
    if(!isExit){
      paramsList.push(obj)
    }
    
    for(let item of paramsList){
      checkedList = [...checkedList, ...item.stationPointIds]
    }
    this.setState({checkedList})
  }

  // 限制日期只可以选小于当前日期的前后一周范围
  getDisableDate = (time) => {
    let now = new Date()
    if (this.state.choiceDate.length > 0) {
      const one = 6 * 24 * 3600 * 1000
      const minTime = this.state.choiceDate[0] - one
      const maxTime = this.state.choiceDate[0] + one
      return time < minTime || time > maxTime || time > now || time + (1 * 24 * 3600 * 1000) > now
    }
    return time > now || time + (1 * 24 * 3600 * 1000) > now
  }

  // 查询事件
  handleSearch = ()=>{
    let { dispatch } = this.props
    let { paramsList, choosenDate, dateString, checkedList } = this.state
    if(choosenDate.length<1){
      notice.error('请选择查询日期。')
      return
    }
    else if( checkedList.length < 1 ){
      notice.error('请选择要查询的门站出口。')
      return
    }else if(checkedList.length > 10 ){ //
      notice.error('查询的门站出口数量不能超过10个。')
      return
    }
    dispatch({
      type:'pressureStationResult/getResult',
      payload:{
        dataStartTime: dateString[0], 
        dataEndTime: dateString[1], 
        clientPoints: checkedList
      }
    })
  }

  // 重置事件
  handleRest = ()=>{
    this.setState({
      choiceDate:[],
      choosenDate:[],  //日期范围
      paramsList:[],
      checkedList:[],
      tempShow:false
    })
    this.checkedAllFn(true)
    let x = document.getElementsByClassName('clear-checked')
    for(let i = 0;i<x.length;i++){
      x[i].click()
    }

    let {dispatch}=this.props

    dispatch({
      type:'gateStationResult/@change',
      payload:{
        resultData:{
          flowData:[],
          pressureData:[],
          temperatureData:[]
        }
      }
    })

  }

  // 设置温度图表是否显示
  setTempShow = (tempShow)=>{
    this.setState({tempShow})
  }

  // 
  checkedAllFn = (type, key, checked) =>{
    let {dispatch, pressureStationResult:{ stationExitList }} = this.props
    let newArr = []
    for(let item of stationExitList){
      if(key && item.code == key){
        item.checked = checked
      }else if(type){
        item.checked = false
      }
      newArr.push(item)
    }
    dispatch({
      type:'pressureStationResult/@change',
      payload:{
        stationExitList: newArr
      }
    })
  }

  checkChildFn = (key)=>{
    let {dispatch, pressureStationResult:{ stationExitList }} = this.props
    for(let item of stationExitList){
      if(item.child && item.child.length > 0){
        let newChildArr=[]
        for(let childItem of item.child){
          let newChild = {}
          if(key.include(childItem.code)){
            newChild.value = childItem.code
            newChild.label = childItem.name
            newChild.checked = true
            newChildArr.push(newChild)
          }else{
            newChild.value = childItem.code
            newChild.label = childItem.name
            newChild.checked = false
          }
          newChildArr.push(newChild)
        }
        if(newChildArr.length > 0 ){
          item.child = newChildArr
          break
        } 
        
      }
    }
    dispatch({
      type:'pressureStationResult/@change',
      payload:{
        stationExitList: newArr
      }
    })
  }



  render() {
    let { choosenDate, tempShow,checkedList } = this.state
    let {stationExitList,resultData} = this.props.pressureStationResult
    let rangeProps = {
      type:'range',
      value: choosenDate,
      disabledDate: this.getDisableDate,
      onChange:(e,e1)=>{
        if(e1.length < 1){
          this.setState({choiceDate:[], choosenDate:[],dateString:[]})
        }else{
          this.setState({choosenDate:e,dateString:e1, choiceDate:e})
        }
      },
      onCalendarChange:(e,e1)=>{
        this.setState({choiceDate:e})
      },
      onOpenChange:(status)=>{
        let {choosenDate}=this.state
        if(!status && choosenDate.length<1){
          this.setState({choiceDate:[],dateString:[]})
        }
      }
    }

    let radioProps = {
      options: tempShowOption(),
      value: tempShow,
      onChange:(e)=>{this.setState({tempShow:e.target.value})}
    }

    return (
      <Layout>
        <Content className='gate-station-content'>
          <Row>
            <Col className='left-menu' span={8}>
              <Panel title="查询条件" boxShadow className='filter-all'>
                {/* <Form {...formProps}></Form> */}
                <Icon type='fire' className='filter-icon-fire'/>
                
                <div className='show-date'>
                  <span>展示日期：</span>
                  <DatePicker {...rangeProps} />
                </div>
                <div className='show-temperature'>
                  <span>是否显示温度：</span>
                  <Radio.Group className='radio-btn' {...radioProps}/>
                </div>
                {/* <Form {...formProps}></Form> */}
                <div className='station-list-title'>
                  选择门站
                  <Icon type='fire' className='filter-icon-fire2'/>
                </div>
                
                <div className='tree-list'>
                {
                  stationExitList.map((item, index)=>{
                    return (
                      <CheckboxTree 
                        key={index}
                        dataAll={item}  //整体树形结构数据-对象类型
                        dataGroup={item.child}  //子的数据-数组类型
                        onChange={(obj)=>this.getChecked(obj)}
                        checkedList={checkedList}
                        // checkChildFn={(key,checked)=>this.checkChildFn(key,checked)}
                        checkedAllFn={(key,checked)=>this.checkedAllFn(false,key,checked)}
                      />
                    )
                  })
                }
                </div>
                
                <div className='top-btn'>
                  <Button onClick={() => this.handleRest()} >
                    重置
                  </Button>
                  <Button className='search-btn' onClick={() => this.handleSearch()} >
                    查询
                  </Button>
                </div>
              </Panel>
            </Col>
            
            <Col className='right-chart' span={16}>
              <Row gutter={24}>
                <Col span={24}>
                  {/* 流量统计图表   需要传数据进来，进行渲染 */}
                  <FlowChart data={resultData.flowData}/>
                  <PressureChart  data={resultData.pressureData}/>
                  {
                    tempShow && <TemperatureChart  data={resultData.temperatureData}/>
                  }
                  
                </Col>
              </Row>
            </Col>
          </Row>
          
        </Content>
    </Layout>
    )
  }
}

export default pressureStationResult
