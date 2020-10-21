/*
 * @Descripttion : gis展示地图
 * @Author       : caojiarong
 * @Date         : 2020-07-20 11:18:44
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-30 08:50:20
 */ 

 
import React, { Component } from 'react'
import { connect } from 'dva'

import { Scene, Popup, Marker } from '@antv/l7'
import { Mapbox } from '@antv/l7-maps'
import './index.less'
@connect(({ idmsvHome, loading }) => ({
  idmsvHome,
  loading: loading.models.idmsvHome,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    tableState: false,
    fullScreen: true,
    pipLineConfig: { color: '#1890ff' },
    centerPoint:[120.64147166, 31.40394254]
  }
  componentDidMount() {
    this.setMark()
  }
  componentDidUpdate(){
    this.setMark()
  }

  async componentDidMount() {
    this.props.onRef && this.props.onRef(this)
    let {
      idmsvHome: { zoom },
    } = this.props
    let {centerPoint} = this.state
    const scene = new Scene({
      id: 'map',
      map: new Mapbox({
        center: centerPoint || [120.64147166, 31.40394254],
        container: 'map', // container id
        // style: 'dark',
        style: {
          version: 8,
          name: 'Mapbox Streets',
          sprite: 'mapbox://sprites/mapbox/streets-v8',
          glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
          sources: {
            'osm-tiles': {
              type: 'raster',
              tiles: ['http://192.168.0.71:5000/TileFiles/SZTiles/{z}/{x}/{y}.png?apikey=1234'],
              tileSize: 256,
            },
          },
          layers: [
            {
              id: '123',
              type: 'raster',
              source: 'osm-tiles',
              'source-layer': 'osmtiles',
            },
          ],
        },
        zoom: zoom,
        minZoom: 8,
        maxZoom: 16
      }),
    })

    const popup = new Popup({
      offsets: [0, 20],
    }).setText('报警：xx监测点压力异常！')

    var el = document.createElement('img')
    el.type = 'image'
    el.src = '/marker.png'
    el.width = '30'
    el.height = '40'
    this.scene = scene
  }

  setMark = () =>{
    this.props.data.map(item=> {
      if( item.longitude && item.latitude){
        var el = document.createElement('img')
        el.type = 'image'
        el.src = '/marker.png'
        el.width = '30'
        el.height = '40'

        //报警
        const marker = new Marker({ element: el }).setLnglat([item.longitude, item.latitude])
        marker.on('click', (e) => {
          this.scene.setCenter([item.longitude, item.latitude])
          const popup = new Popup({
            offsets: [140, 5],
            closeButton: false,
            className: 'cus-popup'
          })
          .setLnglat([item.longitude, item.latitude])
          .setHTML(
            '<div class="cus-popup-title" title="'+item.name+'">'+item.name+'</div>'+
            '<div class="cus-popup-content">'+
              '<div class="left-box">'+
                '<div class="data-show-up" ></div>'+
                '<div class="data-show-middle" ></div>'+
                '<div class="data-show-low" ></div>'+
              '</div>'+
              '<div class="right-box">'+
                '<div class="up-limit"><span>上限压力值：</span><span>'+item.upperLimitPressure+'</span></div>'+
                '<div class="middle-limit"><span>实测压力值：</span><span>'+item.actuallyPressure+'</span></div>'+
                '<div class="low-limit"><span>下限压力值：</span><span>'+item.lowerLimitPressure+'</span></div>'+
              '</div>'+
            '</div>'
            )
            this.scene.addPopup(popup)
        })
        
        this.scene.addMarker(marker)
      }
      
    })
  }

  render() {
    return (
      <div className="idmsvHome-map">
        <div id="map" className="map" />
      </div>
    )
  }
}