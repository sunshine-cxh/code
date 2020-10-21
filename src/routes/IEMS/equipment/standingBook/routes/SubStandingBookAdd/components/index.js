/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-11 15:29:42
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-04 17:54:42
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { Layout, Form } from 'antd'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import TableInfos from './TableInfos'
import BaseComponent from 'components/BaseComponent'
import { Link, routerRedux } from 'dva/router'
import PageHelper from 'utils/pageHelper'
import qs from 'query-string';
import '../style/index.less'
import SubPageLayout from 'components/SubPageLayout'
import { routesPrefix } from '../../../../../config'

@connect(({ standingBookAdd, loading, standingBook }) => ({
  standingBookAdd,
  loading: loading.models.standingBookAdd,
  standingBook,
}))
export default class extends Component {
  componentWillMount() {
    let { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'standingBookAdd/init',
      payload: {
        id: searchObj.id,
        success: (details) => {
          if (details.foreignType === 1) {
            dispatch({
              type: 'standingBookAdd/getGasStationList',
            })
          } else if (details.foreignType === 2) {
            dispatch({
              type: 'standingBookAdd/getGasUserList',
            })
          }
        },
      },
    })
    dispatch({
      type: 'equipmentGlobal/getUser',
      payload: {
        namespace: 'standingBookAdd',
        valueField: 'allUserList',
      },
    })
  }
  handleSubmit = () => {
    const {
      dispatch,
      standingBookAdd: { details },
    } = this.props

    let { validateFields, getFieldsValue } = this.form.props.form
    dispatch({
      type: 'standingBookAdd/@change',
      payload: {
        basicInfos: getFieldsValue(),
      },
    })
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'standingBookAdd/submit',
          payload: {
            id: details.id,
            success: () => {
              // 路由跳转
              dispatch(
                routerRedux.push({
                  pathname: `${routesPrefix}/standingBook`,
                })
              )
              dispatch({
                type: 'standingBook/getPageInfo',
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
    const formProps = {
      ref: 'form1',
      columns: [
        {
          title: '文件类型',
          name: 'type',
          formItem: {},
        },
      ],
    }
    return (
      <SubPageLayout>
        <Panel header={null}>
          <BasicInfos wrappedComponentRef={(form) => (this.form = form)} />
        </Panel>
        <TableInfos />
        <section className="footer-wrap">
          <Button type="primary3" onClick={this.handleSubmit}>
            提交
          </Button>
          <Link to={`${routesPrefix}/standingBook`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}
