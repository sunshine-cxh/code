/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-06-09 14:02:48
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-04 11:33:13
 */

import React from 'react'
import { connect } from 'dva'

import { Layout, Form } from 'antd'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import MoveInfos from './MoveInfos'
// import TableInfos from './TableInfos'
import BaseComponent from 'components/BaseComponent'
import { Link, routerRedux } from 'dva/router'
import PageHelper from 'utils/pageHelper'
import { notice } from 'components/Notification'
import qs from 'query-string'
import $$ from 'cmn-utils'
import SubPageLayout from 'components/SubPageLayout'
import '../style/index.less'
import { routesPrefix } from '../../../../../config'
import UploadFile from './UploadFile'
@connect(({ sellAdd, loading }) => ({
  sellAdd,
  loading: loading.models.sellAdd,
}))
export default class extends BaseComponent {
  componentDidMount() {
    let { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'sellAdd/init',
      payload: {
        id: searchObj.id,
        success: (details) => {
          let idArr = []
          details.equipmentDataList.forEach((item) => {
            idArr.push(item.id)
          })
          dispatch({
            type: 'sellAdd/@change',
            payload: {
              selectedRow: details.equipmentDataList,
              selectedRowKeys: idArr,
            },
          })
        },
      },
    })
    dispatch({
      type: 'equipmentGlobal/getUser',
      payload: {
        namespace: 'sellAdd',
        valueField: 'allUserList',
      },
    })
  }
  handleSubmit = (submitType) => {
    const {
      dispatch,
      sellAdd: { details, approvalRow, sellInfoPageData },
    } = this.props
    let { validateFields, getFieldsValue } = this.form.props.form
    dispatch({
      type: 'sellAdd/@change',
      payload: {
        basicInfos: getFieldsValue(),
      },
    })
    validateFields((err, values) => {
      if (!err) {
        if (approvalRow.length === 0) {
          notice.error('审批人必填')
          return
        }
        if (sellInfoPageData.list.length === 0) {
          notice.error('至少有一条设备信息')
          return
        }
        dispatch({
          type: `sellAdd/submit`,
          payload: {
            id: details.id,
            type: submitType,
            success: () => {
              // 路由跳转
              dispatch(
                routerRedux.push({
                  pathname: `${routesPrefix}/sell`,
                })
              )
              dispatch({
                type: 'sell/getPageInfo',
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
          <MoveInfos />
        </Panel>
        <Panel header={null}>
          <UploadFile></UploadFile>
        </Panel>
        <section className="footer-wrap">
          <Button
            type="primary3"
            onClick={() => {
              this.handleSubmit('edit')
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
          <Link to={`${routesPrefix}/sell`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}