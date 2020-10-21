/*
 * @Descripttion : 树形checkBox
 * @Author       : caojiarong
 * @Date         : 2020-07-02 11:11:30
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-16 17:43:27
 */ 
import React, { Component } from 'react'
import { Checkbox } from 'antd'
import './style/index.less'
import PropTypes from 'prop-types';
// 获取子列表中的value值
function getValues(dataList=[]){
  let valuesList = []
  for(let i of dataList){
    valuesList.push(i.value)
  }
  return valuesList
}
export default class CheckboxTree extends React.Component {
  state = {
    checkedValues: this.props.checkedList,
    indeterminate: false,
  };

  
  shouldComponentUpdate(nextProps){
    if(this.state.checkedValues === nextProps.checkedValues){
      return false
    }
    return true
  }

  // 组装返回的数据
  returnObj=(checkedValues,dataAll)=>{
    let {onChange} = this.props
    let list = []
    // let {value} = dataAll //返回选中的子节点上的父节点的value
    if(checkedValues.length>0){
      // list=[...checkedValues,value]  //返回选中的子节点上的父节点的value
      list=[...checkedValues]  //不返回父节点的value
    }
    
    let obj={gasClientId:dataAll.value,stationPointIds:list}
    onChange(obj)  //把当前多选框组的选中的返回
  }

  // 选中
  changeHandle = checkedValues => {
    let {dataAll, dataGroup, checkedAllFn} = this.props
    console.log(checkedValues)
    this.setState({
      checkedValues,
      indeterminate: !!checkedValues.length && checkedValues.length < dataGroup.length,
    });
    if(checkedValues.length === dataGroup.length){
      checkedAllFn(dataAll.value, true)
    }else{
      checkedAllFn(dataAll.value, false)
    }
    
    this.returnObj(checkedValues,dataAll)
  };

  // 全选和反选
  onCheckAllChange = e => {
    let {dataAll, checkedAllFn} = this.props
    checkedAllFn(dataAll.value, e.target.checked)
    this.setState({
      checkedValues: e.target.checked ? getValues(this.props.dataGroup) : [],
      indeterminate: false,
    },()=>{
      let {dataAll}=this.props
      let {checkedValues}=this.state
      this.returnObj(checkedValues,dataAll)
    })
  };

  clearCheck = ()=>{
    this.setState({checkedValues:[],indeterminate: false})
  }
  
  render(){
    let {checkedValues}=this.state
    // let {checkedValues}=this.props
    let {dataAll} = this.props
    return (
    <div className='antui-check-tree'>
      <div>
        <Checkbox
          value={dataAll.value}
          indeterminate={this.state.indeterminate}
          onChange={this.onCheckAllChange}
          checked={dataAll.checked} 
          label={dataAll.label}
          className='antui-check-parent'
        >
          {this.props.dataAll.label}
        </Checkbox>
      </div>
      <Checkbox.Group 
        className='antui-check-child'
        value={checkedValues}
        options={this.props.dataGroup} 
        onChange={this.changeHandle} />
        <button className='clear-checked' style={{display:'none'}} onClick={()=>{this.clearCheck()}}></button>
    </div>
  )}
}

CheckboxTree.propTypes = {
  onChange: PropTypes.func.isRequired,
  dataAll: PropTypes.object.isRequired,
  dataGroup: PropTypes.array.isRequired,
};