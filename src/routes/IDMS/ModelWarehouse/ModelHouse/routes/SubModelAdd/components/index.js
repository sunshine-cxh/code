/*
 * @Descripttion : 模型新增、编辑页
 * @Author       : caojiarong
 * @Date         : 2020-05-27 14:12:55
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-03 17:46:27
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
import UploadFile from './UploadFile'
import { notice } from 'components/Notification'
import $$ from 'cmn-utils'
import qs from 'query-string'
import '../style/index.less'
import SubPageLayout from 'components/SubPageLayout'
import { routePrefix } from '../../../../../config'

let createForm = Form.create()
@connect(({ subModelAdd, loading }) => ({
  subModelAdd,
  loading: loading.models.subModelAdd,
}))
class SubModelAdd extends BaseComponent {
  state={
    id:'' 
  }
  componentDidMount() {
    let { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    if(searchObj.id){
      this.setState({id:searchObj.id})
    }
    dispatch({
      type: 'subModelAdd/init',
      payload: {
        id: searchObj.id
      },
    })
  }

  handleSubmit = (submitType) => {
    const {
      dispatch,
      subModelAdd: { details },
    } = this.props
    let { validateFields, getFieldsValue } = this.form.props.form
    let {id}=this.state
    // let { categoryIds, locationIds, organizationIds, scopeType } = this.range.props.form.getFieldsValue()
    dispatch({
      type: 'subModelAdd/@change',
      payload: {
        basicInfos: {
          ...getFieldsValue(),
        },
      },
    })
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: `subModelAdd/${submitType}`,
          payload: {
            id,
            success: () => {
              // 路由跳转
              dispatch(
                routerRedux.push({
                  pathname: `${routePrefix}/modelWarehouse`,
                })
              )
              dispatch({
                type: 'modelHouse/getPageData',
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
          <UploadFile />
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
          <Link to={`${routePrefix}/modelWarehouse`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}
export default createForm(SubModelAdd)