/*
 * @Descripttion : 新增养护计划页面
 * @Author       : hezihua
 * @Date         : 2020-06-09 10:17:09
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 17:11:45
 */
import React from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import SubPageLayout from 'components/SubPageLayout'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import BaseComponent from 'components/BaseComponent'
import { Link, routerRedux } from 'dva/router'
import { notice } from 'components/Notification'
import qs from 'query-string'
import '../style/index.less'
import { routesPrefix } from '../../../../../config.js'
import PageHelper from 'utils/pageHelper'
import $$ from 'cmn-utils'
const createForm = Form.create
@connect(({ curingsPlanAdd, loading }) => ({
  curingsPlanAdd,
  loading: loading.models.curingsPlanAdd,
}))
class curingsPlanAdd extends BaseComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { location, dispatch } = this.props
    let searchObj = qs.parse(location.search)
    let recordId = searchObj.id
    if (recordId) {
      this.getRecordDetail(recordId)
    }
    dispatch({
      type: 'curingsPlanAdd/@change',
      payload: {
        recordId,
      },
    })
    dispatch({
      type: 'equipmentGlobal/getUser',
      payload: {
        namespace: 'curingsPlanAdd',
        valueField: 'allUserList',
      },
    })
    dispatch({
      type: 'equipmentGlobal/getAllOrganization',
      payload: {
        enterpriseId: $$.getStore('user') && $$.getStore('user').enterpriseId,
        namespace: 'curingsPlanAdd',
        valueField: 'organizationTree',
      },
    })
    dispatch({
      type: 'equipmentGlobal/getType',
      payload: {
        namespace: 'curingsPlanAdd',
        valueField: 'typeList',
        success: () => {},
      },
    })
    dispatch({
      type: 'curingsPlanAdd/getStandardTypeList'
    })
  }

  // 根据id获取养护的详情
  getRecordDetail = (id) => {
    const { dispatch } = this.props
    dispatch({
      type: 'curingsPlanAdd/getDetails',
      payload: {
        id,
        success: (details) => {
        },
      },
    })
  }

  handleSubmit = () => {
    const {
      dispatch,
      curingsPlanAdd: { basicInfos },
    } = this.props
    let { validateFields, getFieldsValue } = this.form.props.form
    dispatch({
      type: 'curingsPlanAdd/@change',
      payload: {
        basicInfos: {
          ...getFieldsValue(),
          ...{ cycle: Number(basicInfos.cycle), cycleUnit: Number(basicInfos.cycleUnit) },
        },
      },
    })
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'curingsPlanAdd/save',
          payload: {
            success: () => {
              // 路由跳转
              dispatch(
                routerRedux.push({
                  pathname: `${routesPrefix}/curingsPlan`,
                })
              )
              dispatch({
                type: 'curingsPlan/getPageInfo',
                payload: {
                  values: {},
                  pageData: PageHelper.create(),
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
      <SubPageLayout className="page curingsPlanAdd-add">
        <Panel header={null}>
          <BasicInfos wrappedComponentRef={(form) => (this.form = form)} />
        </Panel>
        <section className="footer-wrap">
          <Button type="primary3" onClick={this.handleSubmit}>
            保存
          </Button>
          <Link to={`${routesPrefix}/curingsPlan`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

export default createForm()(curingsPlanAdd)
