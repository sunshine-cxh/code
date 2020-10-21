/*
 * @Descripttion :
 * @Author       : xuqiufeng
 * @Date         : 2020-06-24 16:19:57
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-09-02 14:25:23
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Icon from 'components/Icon'
import BaseComponent from 'components/BaseComponent'

import Header from './header'
import Search from './search'
import Tool from './tool'
import NetworkMap from './map'
import Table from './table'
import '../style/index.less'

const createForm = Form.create

@connect(({ geographyBackstage, loading }) => ({
  geographyBackstage,
  loading: loading.models.geographyBackstage,
}))
class Home extends BaseComponent {
  constructor(props) {
    super(props)
  }
  state = {}
  componentDidMount() {}

  onRef = (ref) => {
    this.NetworkMap = ref
  }

  render() {
    let {} = this.state
    let {
      geographyBackstage: { tableVisible },
    } = this.props
    return (
      <div className="geography-backstage">
        <Header
          savePng={() => {
            this.NetworkMap.savePng && this.NetworkMap.savePng()
          }}
          toggleLayers={() => {
            this.NetworkMap.toggleLayers && this.NetworkMap.toggleLayers()
          }}
        />
        <NetworkMap onRef={this.onRef} />
        <Tool />
        {tableVisible ? <Table className="panel-table" /> : null}
      </div>
    )
  }
}
export default createForm()(Home)
