/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-06-09 14:02:48
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-08 14:42:37
 */

import React from 'react'
import { connect } from 'dva'

import { Layout, Form } from 'antd'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BaseComponent from 'components/BaseComponent'
import { routerRedux } from 'dva/router'
import DataTable from 'components/DataTable'
import BasicInfo from './BasicInfos'
import { createCuringColumns, createColumns } from './columns'
import downloadFile from 'utils/fileHandler'
import $$ from 'cmn-utils'
let { Item } = Form
import PageHelper from 'utils/pageHelper'
import qs from 'query-string'
import SubPageLayout from 'components/SubPageLayout'
import Input from 'components/Input'
const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  if (index === 4) {
    obj.props.colSpan = 0;
  }
  return obj;
};
let list = [
  {
    key: 1,
    name: 'John Brown sr.',
    children: [
      {
        key: 11,
        age: 42,
        address: 1,
      },
      {
        key: 12,
        age: 30,
        address: 2,
      },
      {
        key: 13,
        age: 72,
        address: 1,
      },
    ],
  },
  {
    key: 2,
    name: 'Jim Green',
    children: [
      {
        key: 21,
        age: 32,
        address: 1,
      },
    ]
  },
  
];
@connect(({ curingsTaskDetail, loading }) => ({
  curingsTaskDetail,
  loading: loading.models.curingsTaskDetail,
}))
export default class curingsTaskDetail extends BaseComponent {
  componentDidMount() {
    let { dispatch, location } = this.props
    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'curingsTaskDetail/init',
      payload: {
        id: searchObj.id,
      },
    })

    dispatch({
      type: 'equipmentGlobal/getBrand',
      payload: {
        namespace: 'curingsTaskDetail',
        valueField: 'allUserList',
        success: () => { },
      },
    })
  }
  handleDownload = (record) => {
    downloadFile(record)
  }
  changeValue = (treeData, key, value) => {
    for (let i = 0; i < treeData.length; i++) {
      if (treeData[i].key === key) {
        treeData[i].address = value
        return
      }
      if (treeData[i].children && treeData[i].children.length > 0) {
        this.changeValue(treeData[i].children, key, value)
      }
    }

  }
  onChange = (e, record) => {
    
    let {curingsTaskDetail: { curingPageInfo}, dispatch} = this.props
    this.changeValue(curingPageInfo.list, record.key, e.target.value)
    dispatch({
      type: 'curingsTaskDetail/@change',
      payload: {
        curingPageInfo
      }
    })
  }
  handleBack = () => {
    this.props.dispatch(routerRedux.goBack())
  }
  handleAgree = (resultType) => {
    let { validateFields, getFieldValue } = this.form.props.form
    let {
      dispatch,
      location: { state },
      curingsTaskDetail: { details },
    } = this.props
    validateFields((err, values) => {
      if (!err) {
        let auditOpinion = getFieldValue('auditOpinion')
        dispatch({
          type: 'curingsTaskDetail/postaudit',
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
    const orderColumns = createCuringColumns(this)
    const columns = createColumns(this)
    const {
      curingsTaskDetail: { curingPageInfo, curingFeePageInfo, details },
      loading,
    } = this.props
    let orderTableProps = {
      loading,
      columns: orderColumns,
      showNum: true,
      rowKey: 'key',
      dataItems: curingPageInfo,
      footer: ()=> {
      return <div style={{display: 'flex',justifyContent: 'flex-start'}}><div style={{width: '300px',textAlign: 'center', height: '40px', lineHeight: '40px'}}>养护说明:</div><div style={{width: 'calc(100% - 300px)'}}>{details.curingDescrep}</div></div>
      }
    }
    let tableProps = {
      loading,
      columns: columns,
      rowKey: 'key',
      dataItems: curingFeePageInfo,
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
          <section className="block-wrap">
            <div className="header">
              <span className="title">养护费用</span>
            </div>
            <DataTable {...tableProps}></DataTable>
          </section>
        </Panel>
        <section className="footer-wrap">
          <Button type="primary3" onClick={this.handleBack}>
            返回
          </Button>
        </section>
      </SubPageLayout>
    )
  }
}