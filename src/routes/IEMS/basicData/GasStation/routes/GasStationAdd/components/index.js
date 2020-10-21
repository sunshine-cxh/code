/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-07-29 09:49:48
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-30 10:09:13
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
import { notice } from 'components/Notification'
import $$ from 'cmn-utils'
import qs from 'query-string'
import './index.less'
import SubPageLayout from 'components/SubPageLayout'
import { routesPrefix } from '../../../../../config'

@connect(({ gasstationAdd, loading }) => ({
  gasstationAdd,
  loading: loading.models.gasstationAdd,
}))
export default class extends BaseComponent {
  componentDidMount() {
    let { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'gasstationAdd/init',
      payload: {
        id: searchObj.id,
        success: (details)=> {
          
        }
      },
    })
    dispatch({
      type: 'equipmentGlobal/getSupply',
      payload: {
        namespace: 'gasstationAdd',
        valueField: 'supplyList',
        success: () => {},
      },
    })
    dispatch({
      type: 'equipmentGlobal/getAddress',
      payload: {
        namespace: 'gasstationAdd',
        valueField: 'addressList',
        success: () => {},
      },
    })
    
  }
  handleSubmit = (submitType) => {
    const {
      dispatch,
      gasstationAdd: { details },
    } = this.props
    let { validateFields, getFieldsValue, getFieldValue } = this.form.props.form
    let postdata = {
      ...getFieldsValue(),
      districtId: getFieldValue('districtId')[2],
      coordinateX: String(getFieldValue('coordinateX')),
      coordinateY: String(getFieldValue('coordinateY')),
    }
    dispatch({
      type: 'gasstationAdd/@change',
      payload: {
        basicInfos: postdata
      },
    })
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: `gasstationAdd/${submitType}`,
          payload: {
            values: {...postdata, id: details.id},
            success: () => {
              // 路由跳转
              dispatch(
                routerRedux.push({
                  pathname: `${routesPrefix}/gasstation`,
                })
              )
              dispatch({
                type: 'gasstation/getPageInfo',
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
        <section className="footer-wrap">
          <Button
            type="primary3"
            onClick={() => {
              this.handleSubmit('submit')
            }}
          >
            提交
          </Button>
          <Link to={`${routesPrefix}/gasstation`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}
