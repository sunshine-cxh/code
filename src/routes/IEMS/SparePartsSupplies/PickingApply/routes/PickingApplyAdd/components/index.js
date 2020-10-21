/*
 * @Descripttion : 新增领料申请页面
 * @Author       : caojiarong
 * @Date         : 2020-05-19 14:17:09
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-31 14:33:42
 */
import React from 'react'
import { connect } from 'dva'

import { Layout, Form } from 'antd'
import SubPageLayout from 'components/SubPageLayout'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import OperatorArea from './OperatorArea'
import UploadFile from './UploadFile'
import BaseComponent from 'components/BaseComponent'
import { Link, routerRedux } from 'dva/router'
import Format from 'utils/format'
import {notice} from 'components/Notification'
import qs from 'query-string'
import '../style/index.less'
import { routesPrefix } from '../../../../../config.js'
const createForm = Form.create;
@connect(({ pickingApplyAdd, loading, pickingApply }) => ({
  pickingApplyAdd,
  loading: loading.models.pickingApplyAdd,
  pickingApplyAdd
}))
class PickingApplyAdd extends BaseComponent {
  handleSubmit = () => {
    const { dispatch, pickingApplyAdd:{appPageData},location } = this.props
    let { validateFields } = this.form.props.form
    let searchObj = qs.parse(location.search)
    let id = searchObj.id || undefined
    // 判断领料信息非空字段
    let keyList=[{key:'num',tips:'申请数量填写错误'}]
    let checked = Format.checkListKey(appPageData.list,keyList)
    if(appPageData.list.length < 1){
      notice.error('请选择领料信息')
      return
    }
    if(checked) {return}

    validateFields((err, values)=> {
      if(!err){
        dispatch({
          type: 'pickingApplyAdd/save',
          payload: {
            id,
            success: ()=> {
              // 路由跳转
              dispatch(routerRedux.push({
                pathname: `${routesPrefix}/pickingApply`
              })) 
            }
          }
        })
      }
    })
  }

  getDetails = (id) => {
    const { dispatch } = this.props
    dispatch({
      type: 'pickingApplyAdd/getPickingApplyDetail',
      payload: {
        id
      }
    })
  } 
  componentDidMount() {
    const { location } = this.props
    let searchObj = qs.parse(location.search)
    if(searchObj.id){
      this.getDetails(searchObj.id)
    }
  }


  handleSave = () => {
    
    const { dispatch, pickingApplyAdd:{appPageData},location } = this.props
    let searchObj = qs.parse(location.search)
    let id = searchObj.id || undefined
    // 判断领料信息非空字段
    let keyList=[{key:'num',tips:'申请数量填写错误'}]
    let checked = Format.checkListKey(appPageData.list,keyList)
    if(appPageData.list.length < 1){
      notice.error('请选择领料信息')
      return
    }
    // 如果存在关键字为空则返回，不继续执行
    if(checked) {return}

    let { validateFields } = this.form.props.form
    validateFields((err, values)=> {
      if(!err){
        dispatch({
          
          type: 'pickingApplyAdd/edit',
          payload: {
            id,
            success: ()=> {
              // 路由跳转
              dispatch(routerRedux.push({
                pathname: `${routesPrefix}/pickingApply`
              })) 
            }
          }
        })
      }
    })

  }

  handleDownload=(record)=>{
    window.open(record.filePath)
  }
  
  render() {
    return (
      <SubPageLayout>
        <Panel header={null}>
          <BasicInfos wrappedComponentRef={(form) => this.form = form} />
        </Panel>
        <Panel header={null}>
          <OperatorArea />
        </Panel>
        <Panel header={null}>
          <UploadFile />
        </Panel>
        <section className="footer-wrap">
        <Button type="primary3" onClick={this.handleSave}>保存</Button>
          <Button type="primary3" onClick={this.handleSubmit}>提交</Button>
          <Link to={`${routesPrefix}/pickingApply`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

export default createForm()(PickingApplyAdd);