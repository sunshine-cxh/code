/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-09 09:11:35
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
import $$ from 'cmn-utils'
import qs from 'query-string'
import { routesPrefix } from '../../../../../config'

const createForm = Form.create
@connect(({ procurementApplyEquipment, loading, procurementapply }) => ({
  procurementApplyEquipment,
  loading: loading.models.procurementApplyEquipment,
  procurementapply,
}))
class procurementApplyEquipment extends BaseComponent {
  componentDidMount() {
    let { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'procurementApplyEquipment/init',
      payload: {
        id: searchObj.id,
        success: () => {},
      },
    })
  }
  handleSubmitInfos = (submitType) => {
    const {
      dispatch,
      procurementApplyEquipment: { planRow, details, appPageData, approvalRow },
    } = this.props
    let { validateFields, getFieldsValue } = this.form.props.form
    dispatch({
      type: 'procurementApplyEquipment/@change',
      payload: {
        basicInfos: { ...getFieldsValue(), ...{ type: '0' } },
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
          type: `procurementApplyEquipment/${submitType}`,
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
              this.handleSubmitInfos('save')
            }}
          >
            保存
          </Button>
          <Button
            type="primary3"
            onClick={() => {
              this.handleSubmitInfos('submit')
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

export default createForm()(procurementApplyEquipment)
