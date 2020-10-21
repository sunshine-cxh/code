/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-07-17 10:11:21
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-27 11:51:23
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import $$ from 'cmn-utils'
import { apiPrefix } from '../../../config'
import {configApiPrefix} from '../../../../../../src/config'
import { Scene, PolygonLayer, PointLayer, LineLayer, Popup, Zoom, Scale, Marker } from '@antv/l7'
import { Mapbox, GaodeMap } from '@antv/l7-maps'
import { DrawControl, DrawPoint, DrawCircle } from '@antv/l7-draw'
import { mapboxUrl } from '../../../config'
import markerIcon from 'assets/images/marker.png'
import './index.less'

var pipLine
let colorList =['#00bcff', '#434653', '#757f95','#ff4f57', '#999999']  //1.正常 2.使用 3.在建中  4.预警

// function gisApiPrefix() {
//   let prefix = 'http://192.168.0.71:5000' //dev
//   if (window.location.host === 'iomp.test.ilng.cn:8888') {
//     prefix = 'http://iomp.test.ilng.cn:5001' //test
//   } 
//   // else if (window.location.host === 'iomp.test.ilng.cn:8888') {
//   //   prefix = 'http://iomp.test.ilng.cn:8060/api' //public
//   // }
//   return prefix
// }

@connect(({ simulation, loading }) => ({
  simulation,
  loading: loading.models.simulation,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    tableState: false,
    fullScreen: true,
    pipLineConfig: { color: '#1890ff' },
    realActive: 'active',
    simuActive: '',
    currentStatus: 'real',
  }
  setStyle=()=>{
    let dom1 = document.getElementsByClassName('l7-scene')
    dom1[0].removeAttribute('style')
  }
  async componentDidMount() {
    this.props.onRef && this.props.onRef(this)
    let {
      simulation: { zoom, gisPointList },
      dispatch,
    } = this.props
    
    
    const scene = new Scene({
      id: 'map',
      logoVisible: false,
      map: new Mapbox({
        center: [120.64147166, 31.40394254],
        // center: [120.18382669582967, 30.255134],
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
              tiles: [mapboxUrl()+'/TileFiles/SZTiles/{z}/{x}/{y}.png?apikey=1234'],
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
          ]
        },
        zoom: zoom,
        maxZoom: 13,
        minZoom: 9,
      }),
    })
    // http://192.168.0.65:8060/api/igis/GIS/szGasMap
    $$.post( configApiPrefix() + apiPrefix + '/simulation/getgisdata')
      .then((data) => {
        let res = JSON.parse(data)
        return res
      })
      .then((data) => {
        //管网图层//
        pipLine = new LineLayer({
          zIndex: 1,
        })
          .source(data)
          .size(3)
          .shape('line')
          // 配置不同status类型的不同颜色--------------------------
          .color('status',
            (status)=>{
              if(status == 1){
                return colorList[0]
              }else if(status == 2){
                return colorList[1]
              }else if(status == 3){
                return colorList[2]
              }else if(status == 4){
                return colorList[3]
              }else if(status == 5){
                return colorList[4]
              }
               
            }
          )
          // .color(this.state.pipLineConfig.color)
          .style({
            radius: 30,
          })
          .animate({
            interval: 1, // 间隔
            duration: 3, // 持续时间，延时
            trailLength: 2, // 流线长度
          })

        //管网图层点击效果
        pipLine.on('click', (e) => {
          console.log(e.feature)
          // const popup = new Popup({
          //   offsets: [0, 0],
          //   closeButton: true,
          // })
          //   .setLnglat(e.lngLat)
          //   .setHTML(
          //     `<span>管网编号: </span></br><span>壁厚: </span></br><span>外径: </span></br><span>材料 :</span></br><span>流速: </span></br><span>流量: </span></br><span>长度:</span>`
          //   )
          // scene.addPopup(popup)
        })

        const scaleControl = new Scale({
          position: 'bottomright',
        })
        scene.addControl(scaleControl)

        scene.addLayer(pipLine)
      })
    this.setStyle()
    this.scene = scene
  }
  componentDidUpdate() {
    let {
      simulation: { infosData },
    } = this.props
    infosData.map((item) => {
      var el = document.createElement('img')
      el.type = 'image'
      el.src = markerIcon
      el.width = '30'
      el.height = '40'

      //报警
      const marker = new Marker({ element: el }).setLnglat([
        item.longitude || 120.64147166,
        item.latitude || 31.40394254,
      ])

      

      marker.on('click', (e) => {
        // console.log(item)
        let { scadaData, spsData } = item.inOutData
        this.scene.setCenter([item.longitude, item.latitude])
        const popup = new Popup({
          offsets: [125, 40],
          closeButton: false,
          className: 'cus-popup',
        })
          .setLnglat(e.lngLat)
          .setHTML(
            `<div class="cus-popup-title">${item.name}</div><div class="cus-popup-content"><span class="first-span">实时进气量: </span><span>${scadaData.inFlow}(万m³)</span></br><span class="first-span">实时进气口压力: </span><span>${scadaData.inPressure}(kpa)</span></br><span class="first-span">仿真进气量: </span><span>${spsData.inFlow}(万m³)</span></br><span class="first-span">仿真进气口压力: </span><span>${spsData.inPressure}(kpa)</span></div>`
          )
        this.scene.addPopup(popup)
      })
      // .setPopup(popup)
      this.scene.addMarker(marker)
    })
  }
  
  handleReal = () => {
    this.setState({
      ...this.state,
      realActive: 'active',
      simuActive: '',
      currentStatus: 'real',
    })
  }
  handleSimu = () => {
    this.setState({
      ...this.state,
      realActive: '',
      simuActive: 'active',
      currentStatus: 'simulation',
    })
  }
  render() {
    let { realActive, simuActive } = this.state
    return (
      <div className="simulation-map">
        <div id="map" className="map" />
      </div>
    )
  }
}
