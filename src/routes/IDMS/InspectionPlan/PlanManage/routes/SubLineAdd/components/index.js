/*
 * @Descripttion : 巡检计划新增页
 * @Author       : caojiarong
 * @Date         : 2020-05-27 14:12:55
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-18 17:17:29
 */

import React from 'react'
import { connect } from 'dva'

import { Layout, Form } from 'antd'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import BaseComponent from 'components/BaseComponent'
import { Link, routerRedux } from 'dva/router'
import PageHelper from 'utils/pageHelper'
import LineInfoList from './LineInfoList'
import { notice } from 'components/Notification'
import $$ from 'cmn-utils'
import qs from 'query-string'
import '../style/index.less'
import SubPageLayout from 'components/SubPageLayout'
import { routePrefix } from '../../../../../config'

const { Item } = Form
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  }
}

let createForm = Form.create()
@connect(({ subLineAdd, loading }) => ({
  subLineAdd,
  loading: loading.models.subLineAdd,
}))
class SubLineAdd extends BaseComponent {
  componentDidMount() {
    let { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'subLineAdd/init',
      payload: {
        id: searchObj.id
      },
    })
  }

  handleSubmit = (submitType) => {
    const {
      dispatch,
      subLineAdd: { details },
    } = this.props
    let { validateFields, getFieldsValue } = this.form.props.form

    // let { categoryIds, locationIds, organizationIds, scopeType } = this.range.props.form.getFieldsValue()
    dispatch({
      type: 'subLineAdd/@change',
      payload: {
        basicInfos: {
          ...getFieldsValue(),
        },
      },
    })
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: `subLineAdd/${submitType}`,
          payload: {
            success: () => {
              // 路由跳转
              dispatch(
                routerRedux.push({
                  pathname: `${routePrefix}/PlanManage`,
                })
              )
              dispatch({
                type: 'PlanManage/getPageData',
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
          <LineInfoList />
        </Panel>
        <section className="footer-wrap">
          <Button
            type="primary3"
            onClick={() => {
              this.handleSubmit('submit')
            }}
          >
            保存
          </Button>
          <Link to={`${routePrefix}/PlanManage`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}
export default createForm(SubLineAdd)