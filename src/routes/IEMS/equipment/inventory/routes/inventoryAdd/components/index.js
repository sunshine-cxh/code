/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-27 14:12:55
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-08-03 18:58:50
 */

import React from 'react'
import { connect } from 'dva'

import { Layout, Form } from 'antd'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import InventoryRange from './InventoryRange'
import BaseComponent from 'components/BaseComponent'
import { Link, routerRedux } from 'dva/router'
import PageHelper from 'utils/pageHelper'
import { notice } from 'components/Notification'
import $$ from 'cmn-utils'
import qs from 'query-string'
import '../style/index.less'
import SubPageLayout from 'components/SubPageLayout'
import { routesPrefix } from '../../../../../config'

@connect(({ inventoryAdd, loading }) => ({
  inventoryAdd,
  loading: loading.models.inventoryAdd,
}))
export default class extends BaseComponent {
  componentDidMount() {
    let { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'inventoryAdd/init',
      payload: {
        id: searchObj.id,
        success: (details)=> {
          
        }
      },
    })
    dispatch({
      type: 'equipmentGlobal/getAllOrganization',
      payload: {
        enterpriseId: $$.getStore('user') && $$.getStore('user').enterpriseId,
        namespace: 'inventoryAdd',
        valueField: 'organizationTree',
      },
    })
    dispatch({
      type: 'equipmentGlobal/getLocation',
      payload: {
        namespace: 'inventoryAdd',
        valueField: 'locationList',
      },
    })
    dispatch({
      type: 'equipmentGlobal/getType',
      payload: {
        namespace: 'inventoryAdd',
        valueField: 'typeList',
      },
    })
    dispatch({
      type: 'equipmentGlobal/getUser',
      payload: {
        namespace: 'inventoryAdd',
        valueField: 'allUserList',
      },
    })
  }
  handleSubmit = (submitType) => {
    const {
      dispatch,
      inventoryAdd: { details },
    } = this.props
    let { validateFields, getFieldsValue } = this.form.props.form

    let { categoryIds, foreignIds, organizationIds, scopeType } = this.range.props.form.getFieldsValue()
    dispatch({
      type: 'inventoryAdd/@change',
      payload: {
        basicInfos: {
          ...getFieldsValue(),
          ...{ categoryIds: categoryIds.join(','), foreignIds: foreignIds.join(','), organizationIds: organizationIds.join(','), scopeType },
        },
      },
    })
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: `inventoryAdd/${submitType}`,
          payload: {
            id: details.id,
            success: () => {
              // 路由跳转
              dispatch(
                routerRedux.push({
                  pathname: `${routesPrefix}/inventory`,
                })
              )
              dispatch({
                type: 'inventory/getPageInfo',
                payload: {
                  pageData: PageHelper.create().jumpPage(),
                },
              })
            },
          },
        })
      }
    })
  }

  render() {
    return (
      <SubPageLayout>
        <Panel header={null}>
            <BasicInfos wrappedComponentRef={(form) => (this.form = form)} />
        </Panel>
        <Panel header={null}>
            <InventoryRange wrappedComponentRef={(form) => (this.range = form)}></InventoryRange>
        </Panel>
        <section className="footer-wrap">
          <Button
            type="primary3"
            onClick={() => {
              this.handleSubmit('submit')
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
