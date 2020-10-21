/*
 * @Descripttion : 新增报修工单页面
 * @Author       : caojiarong
 * @Date         : 2020-06-17 10:17:09
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-31 14:10:04
 */
import React from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import SubPageLayout from 'components/SubPageLayout'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import BaseComponent from 'components/BaseComponent'
import { Link, routerRedux } from 'dva/router'
import $$ from 'cmn-utils';
import UploadImage from './UploadImage'
import '../style/index.less'
import { routesPrefix } from '../../../../../config.js'

const createForm = Form.create;
@connect(({ repairOrderAdd, loading }) => ({
  repairOrderAdd,
  loading: loading.models.repairOrderAdd
}))
class repairOrderAdd extends BaseComponent {
  constructor(props){
    super(props)
  }
  state={
    recordId:''
  }

  componentDidMount(){
    let recordId = $$.getStore('equipment-editRepairOrder-id');
    if(recordId){
      this.getRecordDetail(recordId)
    }
    this.setState({recordId})
  }

  // 根据id获取巡检的详情
  getRecordDetail = (recordId) => {
    const {dispatch} = this.props
    dispatch({
      type:'repairOrderAdd/getPartolPlanDetail',
      payload:{
        id : recordId
      }
    })
  }

  handleSubmit = () => {
    const { dispatch } = this.props
    let { recordId } = this.state
    let { validateFields, getFieldsValue } = this.form.props.form

    validateFields((err, values)=> {
      if(!err){
        dispatch({
          type: 'repairOrderAdd/save',
          payload: {
            // id: details.id
            success: ()=> {
              // 路由跳转
              dispatch(routerRedux.push({
                pathname: `${routesPrefix}/repairOrder`
              }))  
            }
          }
        })
      }
    })
  }
  
  render() {
    return (
      <SubPageLayout>
        <Panel header={null}>
          <BasicInfos wrappedComponentRef={(form) => this.form = form}/>
        </Panel>
        <Panel header={null}>
          <UploadImage />
        </Panel>
        <section className="footer-wrap">
          <Button type="primary3" onClick={this.handleSubmit}>保存</Button>
          <Link to={`${routesPrefix}/repairOrder`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

export default createForm()(repairOrderAdd);