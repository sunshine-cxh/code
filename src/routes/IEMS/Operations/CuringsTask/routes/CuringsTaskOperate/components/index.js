/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-06-09 14:02:48
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-08 14:34:36
 */

import React from 'react'
import { connect } from 'dva'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BaseComponent from 'components/BaseComponent'
import { routerRedux } from 'dva/router'
import DataTable from 'components/DataTable'
import BasicInfo from './BasicInfos'
import { createCuringColumns } from './columns'
import $$ from 'cmn-utils'
import PageHelper from 'utils/pageHelper'
import qs from 'query-string'
import SubPageLayout from 'components/SubPageLayout'
import Input from 'components/Input'
import { routesPrefix } from '../../../../../config'
import ComsumablesTable from './comsumablesTable'
@connect(({ curingsTaskOperate, loading }) => ({
  curingsTaskOperate,
  loading: loading.models.curingsTaskOperate,
}))
export default class curingsTaskOperate extends BaseComponent {
  componentDidMount() {
    let { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'curingsTaskOperate/init',
      payload: {
        id: searchObj.id,
      },
    })

    dispatch({
      type: 'equipmentGlobal/getUser',
      payload: {
        namespace: 'curingsTaskOperate',
        valueField: 'allUserList',
        success: () => { },
      },
    })
  }
  changeValue = (treeData, key, value) => {
    for (let i = 0; i < treeData.length; i++) {
      if (treeData[i].key === key) {
        treeData[i].inspectionResult = value
        return
      }
      if (treeData[i].children && treeData[i].children.length > 0) {
        this.changeValue(treeData[i].children, key, value)
      }
    }

  }
  onChange = (e, record) => {

    let { curingsTaskOperate: { curingPageInfo }, dispatch } = this.props
    this.changeValue(curingPageInfo.list, record.key, e.target.value)
    dispatch({
      type: 'curingsTaskOperate/@change',
      payload: {
        curingPageInfo
      }
    })
  }
  handleBack = () => {
    this.props.dispatch(routerRedux.goBack())
  }
  handleSave = () => {
    let { dispatch } = this.props
    dispatch({
      type: 'curingsTaskOperate/edit',
      payload: {
        success: () => {
          dispatch(routerRedux.push({
            pathname: `${routesPrefix}/curingsTask`
          }))
          dispatch({
            type: 'curingsTask/getPageInfo',
            payload: {
              values: {},
              pageData: PageHelper.create()
            }
          })
        }
      }
    })
  }
  handleSubmit = () => {
    let { dispatch } = this.props
    dispatch({
      type: 'curingsTaskOperate/submit',
      payload: {
        success: () => {
          dispatch(routerRedux.push({
            pathname: `${routesPrefix}/curingsTask`
          }))
          dispatch({
            type: 'curingsTask/getPageInfo',
            payload: {
              values: {},
              pageData: PageHelper.create()
            }
          })
        }
      }
    })
  }
  render() {
    const orderColumns = createCuringColumns(this)
    const {
      curingsTaskOperate: { curingPageInfo, details },
      loading,
    } = this.props
    let orderTableProps = {
      loading,
      columns: orderColumns,
      showNum: true,
      rowKey: 'key',
      dataItems: curingPageInfo,
      footer: () => {
        return <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div style={{ width: '350px', textAlign: 'center', height: '40px', lineHeight: '40px' }}>养护说明:</div>
          <Input style={{ width: 'calc(100% - 350px)' }} value={details.curingDescrep} onChange={(val)=> {
            let { dispatch } = this.props
            dispatch({
              type: 'curingsTaskOperate/@change',
              payload: {
                details: { ...details, curingDescrep: val}
              }
            })
          }}/>
          </div>
      }
    }
    return (
      <SubPageLayout>
        <Panel header={null}>
          <BasicInfo></BasicInfo>
        </Panel>
        <Panel header={null}>
          <section className="block-wrap">
            <div className="header">
              <span className="title">养护信息</span>
            </div>
            <DataTable {...orderTableProps}></DataTable>
          </section>
        </Panel>
        <Panel header={null}>
            <ComsumablesTable></ComsumablesTable>
        </Panel>
        
        <section className="footer-wrap">
          <Button type="primary3" onClick={this.handleSave}>
            保存
          </Button>
          <Button type="primary3" onClick={this.handleSubmit}>
            提交
          </Button>
          <Button type="primary3" onClick={this.handleBack}>
            返回
          </Button>
        </section>
      </SubPageLayout>
    )
  }
}