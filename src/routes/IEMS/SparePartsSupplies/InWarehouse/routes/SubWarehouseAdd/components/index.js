/*
 * @Descripttion : 新增入库管理数据页面
 * @Author       : caojiarong
 * @Date         : 2020-05-08 12:17:09
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-31 14:29:00
 */
import React from 'react'
import { connect } from 'dva'

import { Layout, Form, notification } from 'antd'
import SubPageLayout from 'components/SubPageLayout'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import OperatorArea from './OperatorArea'
import BaseComponent from 'components/BaseComponent'
import { Link, routerRedux } from 'dva/router'
import Format from 'utils/format'
import {notice} from 'components/Notification'
import '../style/index.less'
import { routesPrefix } from '../../../../../config.js'
const createForm = Form.create;
@connect(({ inWarehouseAdd, loading }) => ({
  inWarehouseAdd,
  loading: loading.models.inWarehouseAdd,
}))
class inWarehouseAdd extends BaseComponent {
  handleSave = () => {
    let { dispatch, inWarehouseAdd:{appPageData}} = this.props
    let { validateFields, getFieldsValue } = this.form.props.form
    // 判断入库产品非空字段
    let keyList=[{key:'amount',tips:'入库数量填写错误'}]
    let checked = Format.checkListKey(appPageData.list,keyList)
    if(appPageData.list.length < 1){
      notice.error('请选择入库设备')
      return
    }
    if(checked) {return}
    validateFields((err, values)=> {
      if(!err){
        dispatch({
          type: 'inWarehouseAdd/save',
          payload: {
            success: ()=> {
              // 路由跳转
              dispatch(routerRedux.push({
                pathname: `${routesPrefix}/inWarehouse`
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
          <BasicInfos wrappedComponentRef={(form) => this.form = form} />
        </Panel>
        <Panel header={null}>
          <OperatorArea />
        </Panel>
        <section className="footer-wrap">
          <Button type="primary3" onClick={this.handleSave}>保存</Button>
          <Link to={`${routesPrefix}/inWarehouse`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

export default createForm()(inWarehouseAdd);