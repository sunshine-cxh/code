import React, { Component } from 'react'
import { connect } from 'dva'

import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import { fromLonLat } from 'ol/proj'
import OSM from 'ol/source/OSM'

import './index.less'

const shenzhen = fromLonLat([114.064035, 22.548435])

@connect(({ eographyHome, loading }) => ({
  eographyHome,
  loading: loading.models.eographyHome,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    var view = new View({
      center: shenzhen,
      zoom: 13,
    })

    var map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          preload: 4,
          source: new OSM(),
        }),
      ],
      view: view,
    })
  }

  render() {
    return (
      <div className="geography-home">
        <div id="map" className="map" />
        <div className="panel-1">操作窗口1</div>
        <div className="panel-2">操作窗口2</div>
      </div>
    )
  }
}
