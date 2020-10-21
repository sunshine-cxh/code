/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-27 14:12:55
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-08-07 14:26:06
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import Button from 'components/Button'
import { Link, routerRedux } from 'dva/router'
import $$ from 'cmn-utils'
import BasicInfos from './BasicInfos'
import TableInfos from './TableInfos'
import qs from 'query-string'
import '../style/index.less'
import SubPageLayout from 'components/SubPageLayout'
import Panel from 'components/Panel'
import { PageHeader } from 'antd'
import PageHelper from 'utils/pageHelper'
import { routesPrefix } from '../../../../../config'

@connect(({ inventoryOperat, loading, inventory }) => ({
  inventoryOperat,
  loading: loading.models.inventoryOperat,
  inventory
}))
export default class extends Component {
  componentDidMount() {
    let { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'inventoryOperat/init',
      payload: {
        id: searchObj.id,
        success: (details) => {
          let arr = []
          details.list.forEach((item) => {
            if(item.detailStateDesc === '已盘点') {
              arr.push(item.equipmentId)
            }
          })
          dispatch({
            type: 'inventoryOperat/@change',
            payload: {
              inventoryRowKeys: arr,
              inventoryPageData: JSON.parse(JSON.stringify(details)),
            }
          })
        },
      },
    })
    dispatch({
      type: 'equipmentGlobal/getAllOrganization',
      payload: {
        enterpriseId: $$.getStore('user') && $$.getStore('user').enterpriseId,
        namespace: 'inventoryOperat',
        valueField: 'organizationTree',
      },
    })
    dispatch({
      type: 'equipmentGlobal/getLocation',
      payload: {
        namespace: 'inventoryOperat',
        valueField: 'locationList',
      },
    })
  }
  handleSubmit = (type) => {
    let {
      dispatch,
      inventoryOperat: { details, inventoryRowKeys },
    } = this.props
    dispatch({
      type: 'inventoryOperat/submit',
      payload: {
        id: details.id,
        ids: inventoryRowKeys,
        type,
        success: ()=> {
          dispatch(
            routerRedux.push({
              pathname: `${routesPrefix}/inventory`,
            })
          )
          dispatch({
            type: 'inventory/getPageInfo',
            payload: {
              pageData: PageHelper.create(),
            },
          })
        }
      },
    })
  }
  render() {
    return (
      <SubPageLayout>
        <Panel header={null}>
          <BasicInfos></BasicInfos>
        </Panel>
        <Panel header={null}>
          <TableInfos></TableInfos>
        </Panel>
        <section className="footer-wrap">
        <Button
            type="primary3"
            onClick={() => {
              this.handleSubmit(1)
            }}
          >
            保存
          </Button>
          <Button
            type="primary3"
            onClick={() => {
              this.handleSubmit(2)
            }}
          >
            提交
          </Button>
          <Link to={`${routesPrefix}/inventory`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}
