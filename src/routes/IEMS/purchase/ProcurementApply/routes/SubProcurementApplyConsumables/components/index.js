/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-09 14:57:37
 */
import React from 'react'
import { connect } from 'dva'

import { Layout, Form } from 'antd'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import SubPageLayout from 'components/SubPageLayout'
import TableInfos from './TableInfos'
import BaseComponent from 'components/BaseComponent'
import { Link, routerRedux } from 'dva/router'
import PageHelper from 'utils/pageHelper'
import '../style/index.less'
import { notice } from 'components/Notification'
import qs from 'query-string'
import { routesPrefix } from '../../../../../config'

const createForm = Form.create
@connect(({ procurementApplyConsumables, loading, procurementapply }) => ({
  procurementApplyConsumables,
  loading: loading.models.procurementApplyConsumables,
  procurementapply,
}))
class ProcurementApplyConsumables extends BaseComponent {
  componentDidMount() {
    let { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'procurementApplyConsumables/init',
      payload: {
        id: searchObj.id,
        success: (details) => {
          let idArr = [],
            addRow = []
          details.purchaseDataList.forEach((item) => {
            if (item.id) {
              idArr.push(item.id)
            } else {
              addRow.push(item)
            }
          })
          dispatch({
            type: 'procurementApplyConsumables/@change',
            payload: {
              selectedRow: details.purchaseDataList,
              selectedRowKeys: idArr,
              addRow,
            },
          })
        },
      },
    })
  }
  handleSubmit = (submitType) => {
    const {
      dispatch,
      procurementApplyConsumables: { planRow, details, appPageData, approvalRow },
    } = this.props
    let { validateFields, getFieldsValue } = this.form.props.form
    dispatch({
      type: 'procurementApplyConsumables/@change',
      payload: {
        basicInfos: { ...getFieldsValue(), ...{ type: '1' } },
      },
    })
    validateFields((err, values) => {
      if (!err) {
        if (planRow.length === 0) {
          notice.error('采购计划必填')
          return
        }
        if (approvalRow.length === 0) {
          notice.error('审批人必填')
          return
        }
        if (appPageData.list.length === 0) {
          notice.error('设备清单至少有一条')
          return
        }
        dispatch({
          type: `procurementApplyConsumables/${submitType}`,
          payload: {
            id: details.id,
            success: () => {
              // 路由跳转
              dispatch(
                routerRedux.push({
                  pathname: `${routesPrefix}/procurementApply`,
                })
              )
              dispatch({
                type: 'procurementapply/getPageInfo',
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
        <TableInfos />
        <section className="footer-wrap">
          <Button
            type="primary3"
            onClick={() => {
              this.handleSubmit('save')
            }}
          >
            保存
          </Button>
          <Button
            type="primary3"
            onClick={() => {
              this.handleSubmit('submit')
            }}
          >
            提交
          </Button>
          <Link to={`${routesPrefix}/procurementApply`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

export default createForm()(ProcurementApplyConsumables)
