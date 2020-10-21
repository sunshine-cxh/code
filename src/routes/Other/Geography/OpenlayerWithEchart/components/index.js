/*
 * @Author       : xuqiufeng
 * @Date         : 2020-06-24 16:19:57
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-07-10 11:30:29
 * @FilePath     : \ilng.iomp.web\src\routes\IGIS\Home\components\index.js
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import { fromLonLat } from 'ol/proj'
import OSM from 'ol/source/OSM'
import Search from './search'
import Tool from './tool'
import { Form } from 'antd'
import BaseComponent from 'components/BaseComponent'

import Table from './table'
import '../style/index.less'

const createForm = Form.create
const shenzhen = fromLonLat([114.064035, 22.548435])

@connect(({ geographyHome, loading }) => ({
  geographyHome,
  loading: loading.models.geographyHome,
}))
class Home extends BaseComponent {
  constructor(props) {
    super(props)
  }
  state = {
    tableState: false,
  }
  componentDidMount() {
    var view = new View({
      center: shenzhen,
      zoom: 13,
    })

    var map = new Map({
      target: 'mapWithEchart',
      layers: [
        new TileLayer({
          preload: 4,
          source: new OSM(),
        }),
      ],
      view: view,
    })
  }
  tableChange(state) {
    if (state == 'close') {
      this.setState({ tableState: false })
      return
    }
    this.setState({ tableState: this.state.tableState == true ? false : true })
  }

  render() {
    let { tableState } = this.state
    return (
      <div className="OpenlayerWithEchart-home">
        <div id="mapWithEchart" className="map" />
        <div className="panel-search">
          <Search tableChange={this.tableChange.bind(this)} tableState={tableState}></Search>
        </div>
        <div className="panel-tool">
          <Tool wrappedComponentRef={(form) => (this.form = form)}></Tool>
        </div>
        {tableState == true ? (
          <Table className="panel-table" tableChange={this.tableChange.bind(this)}></Table>
        ) : null}
      </div>
    )
  }
}
export default createForm()(Home)
