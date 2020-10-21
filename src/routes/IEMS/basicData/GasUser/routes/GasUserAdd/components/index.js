/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-07-29 09:49:48
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-30 10:13:32
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

@connect(({ gasuserAdd, loading }) => ({
  gasuserAdd,
  loading: loading.models.gasuserAdd,
}))
export default class extends BaseComponent {
  componentDidMount() {
    let { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'gasuserAdd/init',
      payload: {
        id: searchObj.id,
        success: (details)=> {
          
        }
      },
    })
    dispatch({
      type: 'equipmentGlobal/getAddress',
      payload: {
        namespace: 'gasuserAdd',
        valueField: 'addressList',
        success: () => {},
      },
    })
    dispatch({
      type: 'gasuserAdd/getGasUserType',
    })
    
    dispatch({
      type: 'gasuserAdd/getGasStationList',
      payload: {
        success: () => {},
      },
    })
    
  }
  handleSubmit = (submitType) => {
    const {
      dispatch,
      gasuserAdd: { details },
    } = this.props
    let { validateFields, getFieldsValue, getFieldValue } = this.form.props.form
    let postdata = {
      ...getFieldsValue(),
      districtId: getFieldValue('districtId')[2],
      type: Number(getFieldValue('type'))
    }
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: `gasuserAdd/${submitType}`,
          payload: {
            values: {...postdata, id: details.id},
            success: () => {
              // 路由跳转
              dispatch(
                routerRedux.push({
                  pathname: `${routesPrefix}/gasuser`,
                })
              )
              dispatch({
                type: 'gasuser/getPageInfo',
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
          <Link to={`${routesPrefix}/gasuser`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}
