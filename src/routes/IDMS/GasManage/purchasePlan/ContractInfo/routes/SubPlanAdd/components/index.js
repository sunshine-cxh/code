/*
 * @Descripttion : 合同新增、编辑页
 * @Author       : caojiarong
 * @Date         : 2020-09-01 14:12:55
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-09 19:36:42
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
import { routePrefix } from '../../../../../../config'

let createForm = Form.create()
@connect(({ subPlanAdd, loading }) => ({
  subPlanAdd,
  loading: loading.models.subPlanAdd,
}))
class subPlanAdd extends BaseComponent {
  state={
    id:'',
    fatherId:'',
    childId:''
  }
  componentDidMount() {
    let { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    if(searchObj.id){ //如果是id，则是修改合同或者补充协议, 不存在id或者fatherId则是添加合同
      this.setState({id:searchObj.id})
      dispatch({
        type: 'subPlanAdd/init',
        payload: {
          id: searchObj.id
        },
      })
    }else if(searchObj.fatherId){  //如果存在fatherId,则是添加补充协议
      this.setState({fatherId:searchObj.fatherId})
    }
    
    dispatch({
      type:'subPlanAdd/paramInit'
    })
    
  }

  handleSubmit = (submitType) => {
    const {
      dispatch,
      subPlanAdd: { details },
    } = this.props
    let { validateFields, getFieldsValue } = this.form.props.form
    let {id, fatherId, childId}=this.state
    // let { categoryIds, locationIds, organizationIds, scopeType } = this.range.props.form.getFieldsValue()
    dispatch({
      type: 'subPlanAdd/@change',
      payload: {
        basicInfos: {
          ...getFieldsValue(),
        },
      },
    })
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: `subPlanAdd/${submitType}`,
          payload: {
            id,
            fatherId,
            success: () => {
              // 路由跳转
              dispatch(
                routerRedux.push({
                  pathname: `${routePrefix}/gasPurchasePlan/contractInfo`,
                })
              )
              dispatch({
                type: 'contractInfo/getPageData',
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
    let { id } = this.state
    return (
      <SubPageLayout>
        <Panel header={null}>
          <BasicInfos wrappedComponentRef={(form) => (this.form = form)} />
        </Panel>
        <Panel header={null}>
          <UploadFile id={id}/>
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
          <Link to={`${routePrefix}/gasPurchasePlan/contractInfoe`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}
export default createForm(subPlanAdd)