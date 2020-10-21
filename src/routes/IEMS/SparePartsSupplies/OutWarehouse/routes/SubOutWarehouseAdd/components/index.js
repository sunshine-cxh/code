/*
 * @Descripttion : 新增出库管理数据页面
 * @Author       : caojiarong
 * @Date         : 2020-05-14 12:17:09
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-31 14:30:48
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
import { routesPrefix } from '../../../../../config.js'
import '../style/index.less'

const createForm = Form.create;
@connect(({ outWarehouseAdd, loading }) => ({
  outWarehouseAdd,
  loading: loading.models.outWarehouseAdd
}))
class outWarehouseAdd extends BaseComponent {
  handleSave = () => {
    const { dispatch, outWarehouseAdd:{appPageData} } = this.props
    let { validateFields, getFieldsValue } = this.form.props.form
    // 判断出库产品非空字段
    let keyList=[{key:'amount',tips:'请填写出库数量'}]
    let checked = Format.checkListKey(appPageData.list,keyList)
    if(appPageData.list.length < 1){
      notice.error('请选择出库设备')
      return
    }
    if(checked) {return}

    validateFields((err, values)=> {
      if(!err){
        dispatch({
          type: 'outWarehouseAdd/save',
          payload: {
            success: ()=> {
              // 路由跳转
              dispatch(routerRedux.push({
                pathname: `${routesPrefix}/outWarehouse`
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
          <BasicInfos  wrappedComponentRef={(form) => this.form = form} />
        </Panel>
        <Panel header={null}>
          <OperatorArea />
        </Panel>
        <Panel header={null}>
          <UploadFile />
        </Panel>
        <section className="footer-wrap">
          <Button type="primary3" onClick={this.handleSave}>保存</Button> 
          <Link to={`${routesPrefix}/outWarehouse`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

export default createForm()(outWarehouseAdd);