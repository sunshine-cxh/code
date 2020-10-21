/*
 * @Descripttion :  重点用户申报详情页面
 * @Author       : gujitao
 * @Date         : 2020-08--25 14:12:55
 * @LastEditors  : gujitao
 * @LastEditTime : 2020-09-04 11:22:12
 */

import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import '../style/index.less'
import BaseComponent from 'components/BaseComponent'
import Descriptions from 'components/Descriptions'
import { baseInfoColumns } from './columns'
import DataTable from 'components/DataTable'
import { fileInfoColumns } from './columns'
@connect(({ subGasdeclareDetail, loading }) => ({
  subGasdeclareDetail,
  loading: loading.models.subGasdeclareDetail,
}))
export default class BasicInfos extends BaseComponent {
  // constructor(props) {
  //   super(props)

  // }

  state = {
    record: null,
    visible: false,
  }

  render() {
    let { loading } = this.props
    let {
      subGasdeclareDetail: { details },
    } = this.props
    console.log(this.props.subGasdeclareDetail.details)
    let baseCloumns = baseInfoColumns(this)
    let baseInfoForm = {
      columns: baseCloumns,
      dataItems: details,
      title: '基础信息',
    }
    let {subGasdeclareDetail:{weatherPageData,weatherlist}}=this.props 
    weatherlist=this.props.subGasdeclareDetail.details.weatherList
    weatherPageData.list = weatherlist
    let columnsWeather = fileInfoColumns(this)

    const dataTableProps = {
      loading,
      pagination: false,
      showNum: false,
      columns: columnsWeather,
      dataItems: weatherPageData,
    }
    return (
      <Fragment>
        <Descriptions {...baseInfoForm} className="base-info-content" />
        <section className="block-wrap">
          <div className="header">
            <span className="title">气象信息</span>
          </div>
          <DataTable {...dataTableProps} />
        </section>
      </Fragment>
    )
  }
}
