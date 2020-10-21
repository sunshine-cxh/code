/*
 * @Descripttion : 新增仓库盘点页面
 * @Author       : caojiarong
 * @Date         : 2020-05-25 12:17:09
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-31 14:02:15
 */
import React from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import SubPageLayout from 'components/SubPageLayout'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import OperatorArea from './OperatorArea'
import BaseComponent from 'components/BaseComponent'
import { Link, routerRedux } from 'dva/router'
import Format from 'utils/format'
import {notice} from 'components/Notification'
import { routesPrefix } from '../../../../../config.js'
import '../style/index.less'

const createForm = Form.create;
@connect(({ warehouseInventoryAdd, loading, warehouseInventory }) => ({
  warehouseInventoryAdd,
  loading: loading.models.warehouseInventoryAdd,
  warehouseInventory
}))
class warehouseInventoryAdd extends BaseComponent {
  handleSave = () => {
    const { dispatch, warehouseInventoryAdd:{appPageData} } = this.props
    let { validateFields, getFieldsValue } = this.form.props.form
    
    dispatch({
      type: 'patrolStandardAdd/@change',
      payload: {
        basicInfos: getFieldsValue(),
      }
    })

    // 判断出库产品非空字段
    let keyList=[{key:'inventoryAmount',tips:'盘点数量填写错误'}]
    let checked = Format.checkListKey(appPageData.list,keyList)
    if(appPageData.list.length < 1){
      notice.error('请选择盘点信息')
      return
    }
    // 如果选择的信息中存在空的盘点数量则返回
    if(checked) {return}

    validateFields((err, values)=> {
      if(!err){
        dispatch({  
          type: 'warehouseInventoryAdd/save',
          payload: {
            success: ()=> {
              dispatch({
                type:'subWarehouseAdd/@change',
                payload:{
                  addRow: [],
                  selectedRow: [],
                  selectedRowKeys: [],
                  addRow: [],
                  parameters:{}
                }
              })
              // 路由跳转
              dispatch(routerRedux.push({
                pathname: `${routesPrefix}/warehouseInventory`
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
            <BasicInfos wrappedComponentRef={form=>this.form = form} />
        </Panel>
        <Panel header={null}>
          <OperatorArea />
        </Panel>
        <section className="footer-wrap">
          <Button type="primary3" onClick={this.handleSave}>提交</Button>
          <Link to={`${routesPrefix}/warehouseInventory`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

export default createForm()(warehouseInventoryAdd);