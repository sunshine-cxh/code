/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-04 11:09:50
 */
import React from 'react'
import { connect } from 'dva'

import { Layout, Form } from 'antd'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import UploadFile from './UploadFile'
import SubPageLayout from 'components/SubPageLayout'
import TableInfos from './TableInfos'
import BaseComponent from 'components/BaseComponent'
import { Link, routerRedux } from 'dva/router'
import PageHelper from 'utils/pageHelper'
import { notice } from 'components/Notification'
import qs from 'query-string'
import $$ from 'cmn-utils'

import '../style/index.less'
import { routesPrefix } from '../../../../../config'

@connect(({ recipientsAdd, loading }) => ({
  recipientsAdd,
  loading: loading.models.recipientsAdd
}))
export default class extends BaseComponent {
  componentDidMount() {
    let { dispatch } = this.props
    dispatch({
      type: 'equipmentGlobal/getAllOrganization',
      payload: {
        enterpriseId: $$.getStore('user') && $$.getStore('user').enterpriseId,
        namespace: 'recipientsAdd',
        valueField: 'organizationTree'
      },
    })
    dispatch({
      type: 'equipmentGlobal/getUser',
      payload: {
        namespace: 'recipientsAdd',
        valueField: 'allUserList'
      },
    })
  }
  handleSubmit = (submitType) => {
    const {
      dispatch,
      recipientsAdd: { details, approvalRow, appPageData, location },
    } = this.props
    let { validateFields, getFieldsValue } = this.form.props.form
    let cycle = getFieldsValue().cycle
    let basicInfos = {
      ...getFieldsValue(),
      cycle: cycle ? cycle[1] : null,
      cycleUnit: cycle ? cycle[0] : null,
    }
    dispatch({
      type: 'recipientsAdd/@change',
      payload: {
        basicInfos,
      },
    })
    validateFields((err, values) => {
      if (!err) {
        if (appPageData.list.length === 0) {
          notice.error('至少有一条领用设备数据')
          return
        }
        dispatch({
          type: `recipientsAdd/${submitType}`,
          payload: {
            id: details.id,
            success: () => {
              // 路由跳转
              dispatch(
                routerRedux.push({
                  pathname: `${routesPrefix}/recipients`,
                })
              )
              dispatch({
                type: 'recipients/getPageInfo',
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
        <Panel header={null}>
          <UploadFile></UploadFile>
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
          <Link to={`${routesPrefix}/recipients`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}
