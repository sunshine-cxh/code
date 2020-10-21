/*
 * @Descripttion : 领料申请详情数据页面
 * @Author       : caojiarong
 * @Date         : 2020-05-08 12:17:09
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-31 14:31:58
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
import PageHelper from 'utils/pageHelper'
import DataTable from 'components/DataTable'
import qs from 'query-string'
import $$ from 'cmn-utils'
import '../style/index.less'
import UploadFile from './UploadFile'
import { createCheckColumns } from './columns'
import Suggest from './Suggest'
import { routesPrefix } from '../../../../../config.js'
const createForm = Form.create;
@connect(({ pickingApplyDetail, loading }) => ({
  pickingApplyDetail,
  loading: loading.models.pickingApplyDetail
}))
class PickingApplyDetail extends BaseComponent {
  handleDownload=(record)=>{
    window.open(record.filePath)
  }
  getDetails = () => {
    const { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'pickingApplyDetail/getPickingApplyDetail',
      payload: {
        id: searchObj.id
      }
    })
  } 
  componentDidMount() {
    this.getDetails()
  }

  handleBack = () => {
    this.props.dispatch(routerRedux.goBack())
  }
  handleAgree = (resultType) => {
    let { validateFields, getFieldValue } = this.form.props.form
    let {
      dispatch,
      location: { state },
      pickingApplyDetail: { details },
    } = this.props
    validateFields((err, values) => {
      if (!err) {
        let auditOpinion = getFieldValue('auditOpinion')
        dispatch({
          type: 'pickingApplyDetail/postaudit',
          payload: {
            id: details.id,
            resultType,
            auditOpinion,
            success: () => {
              this.handleBack()
            },
          },
        })
      }
    })
  }

  render() {
    const checkColumns = createCheckColumns(this)
    const preroute = $$.getStore('pre-route-path')
    let {loading,checkHis} = this.props.pickingApplyDetail
    let checkHisList = PageHelper.create()
    let checkTableProps = {
      loading,
      showNum: true,
      columns: checkColumns,
      rowKey: 'id',
      dataItems: checkHisList,
    }
    let content = '',
      footer = ''
    checkHisList.list = checkHis
    if (preroute === '/account/willCheck') {
      content = (
        <>
          <Panel header={null}>
            <section className="block-wrap">
              <div className="header">
                <span className="title">审批意见</span>
              </div>
              <Suggest wrappedComponentRef={(form) => (this.form = form)}></Suggest>
            </section>
          </Panel>
        </>
      )
      footer = (
        <>
          <Button
            type="primary3"
            onClick={() => {
              this.handleAgree(1)
            }}
          >
            同意
          </Button>
          <Button
            type="primary3"
            onClick={() => {
              this.handleAgree(2)
            }}
          >
            不同意
          </Button>
          <Button
            type="primary3"
            onClick={() => {
              this.handleAgree(3)
            }}
          >
            驳回
          </Button>
        </>
      )
    } else {
      content = (
        <>
          <Panel header={null}>
            <section className="block-wrap">
              <div className="header">
                <span className="title">审批信息</span>
              </div>
              <DataTable {...checkTableProps}></DataTable>
            </section>
          </Panel>
        </>
      )
    }
    return (
      <SubPageLayout>
        <Panel header={null}>
          <BasicInfos />
        </Panel>
        <Panel header={null}>
          <OperatorArea />
        </Panel>
        <Panel header={null}>
          <UploadFile />
        </Panel>
        {content}
        <section className="footer-wrap">
          {footer}
          <Link to={`${routesPrefix}/pickingApply`}>
            <Button type="primary3" onClick={()=>{$$.setStore('pre-route-path',null)}}>返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

export default createForm()(PickingApplyDetail);