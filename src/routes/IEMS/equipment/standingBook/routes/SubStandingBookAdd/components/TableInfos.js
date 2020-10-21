/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-11 15:30:46
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-12 15:11:55
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import UploadFile from './UploadFile'
import UploadImage from './UploadImage'
import ChildEquipment from './ChildEquipment'
import ParentEquipment from './ParentEquipment'
import ConnectEquipment from './ConnectEquipment'
import Panel from 'components/Panel'

@connect(({ standingBookAdd, loading }) => ({
  standingBookAdd,
  loading: loading.models.standingBookAdd,
}))
export default class extends Component {
  render() {
    return (
      <>
        <Panel header={null}>
          <UploadImage></UploadImage>
        </Panel>
        <Panel header={null}>
          <UploadFile></UploadFile>
        </Panel>
        <Panel header={null}>
          <ParentEquipment></ParentEquipment>
        </Panel>
        <Panel header={null}>
          <ConnectEquipment></ConnectEquipment>
        </Panel>
      </>
    )
  }
}
