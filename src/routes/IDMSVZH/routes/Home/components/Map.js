/*
 * @Descripttion : 安检巡线维修人员地图
 * @Author       : caojiarong
 * @Date         : 2020-07-20 17:07:22
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-12 18:47:36
 */ 
 
import React, { Component } from 'react'
import { connect } from 'dva'
import $$ from 'cmn-utils'
import {mapboxUrl} from '../../../config'
import { Scene, LineLayer, Popup, Marker } from '@antv/l7'

import { apiPrefix } from '../../../config'
import {configApiPrefix} from '../../../../../../src/config'
import { Mapbox } from '@antv/l7-maps'
import './index.less'
var pipLine
let colorList =['#00bcff', '#434653', '#757f95','#ff4f57', '#999999']  //1.正常 2.使用 3.在建中  4.预警

let tarckLine={}
export default class extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    tableState: false,
    fullScreen: true,
    pipLineConfig: { color: '#1890ff' },
  }
  
  async componentDidMount() {
    this.props.onRef && this.props.onRef(this)
    let zoom = 10
    const scene = new Scene({
      id: 'map',
      map: new Mapbox({
        center: [113.34388733, 22.14543580],
        container: 'map', // container id
        style: {
          version: 8,
          name: 'Mapbox Streets',
          sprite: 'mapbox://sprites/mapbox/streets-v8',
          glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
          sources: {
            'osm-tiles': {
              type: 'raster',
              tiles: [mapboxUrl()+'/TileFiles/ZHTiles/{z}/{x}/{y}.png?apikey=1234'],
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
        maxZoom: 19,
        minZoom: 9
      }),
    })

    // 管网层
    $$.post( configApiPrefix() + apiPrefix + '/simulation/getzhgisdata')
      .then((data) => {
        let res = JSON.parse(data)
        return res
      })
    // fetch('http://192.168.0.65:8060/api/igis/GIS/zhGasMap')
    //   .then((res) => res.json())
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
          // .animate({
          //   interval: 1, // 间隔
          //   duration: 3, // 持续时间，延时
          //   trailLength: 2, // 流线长度
          // })

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

        // const scaleControl = new Scale({
        //   position: 'bottomright',
        // })
        // scene.addControl(scaleControl)

        scene.addLayer(pipLine)
      })

    // TODO 用于demo使用的假数据，
    fetch('/zhTestData.json')
    .then((res)=>res.json())
    .then((data)=>{
      this.setMark(data.data)
    })

    this.scene = scene
    
  }

  componentDidUpdate(){
    
  }



  //设置门站图标
  setMark = (stationsPosition=[]) =>{
    stationsPosition.map(item=> {
        var el = document.createElement('img')
        el.type = 'image'
        el.src = '/marker.png'
        el.width = '30'
        el.height = '40'

        //报警
        const marker = new Marker({ element: el }).setLnglat([
          item.longitude,
          item.latitude,
        ])
        marker.on('click', (e) => {
          let { scadaData, spsData } = item.inOutData
          this.scene.setCenter([item.longitude, item.latitude])
          const popup = new Popup({
            offsets: [125, 40],
            closeButton: false,
            className: 'cus-popup',
          })
          .setLnglat([item.longitude, item.latitude])
          .setHTML(
            `<div class="cus-popup-title">${item.name}</div><div class="cus-popup-content"><span class="first-span">实时进气量: </span><span>${scadaData.inFlow}(万m³)</span></br><span class="first-span">实时进气口压力: </span><span>${scadaData.inPressure}(kpa)</span></br><span class="first-span">仿真进气量: </span><span>${spsData.inFlow}(万m³)</span></br><span class="first-span">仿真进气口压力: </span><span>${spsData.inPressure}(kpa)</span></div>`
            )
            this.scene.addPopup(popup)
        })
        
        this.scene.addMarker(marker)
      
    })
  }

  //设置运输车图标
  setCarMark = (carsPosition=[]) =>{
    
    carsPosition.map(item=> {
      if( item.status == 1 && item.lng && item.lat){
        var el = document.createElement('img')
        el.type = 'image'
        el.src = '/car-icon.png'
        el.width = '30'
        el.height = '30'

        //报警
        let carMarker = new Marker({ element: el }).setLnglat([item.lng, item.lat])
        carMarker.on('click', (e) => {
          this.scene.setCenter([item.lng, item.lat])
          const popup = new Popup({
            offsets: [125, 40],
            closeButton: false,
            className: 'cus-popup'
          })
          .setLnglat([item.lng, item.lat])
          .setHTML(
              '<div class="cus-popup-title">车辆信息</div>'+
              '<div class="cus-popup-content">'+
                '<div >车牌号：'+item.carNo+'</div>'+
              '</div>'
            )
            this.scene.addPopup(popup)
        })
        
        this.scene.addMarker(carMarker)
      }
      
    })
  }

  render() {
    return (
      <div className="linepatrol-map">
        <div id="map" className="mapBox" />
      </div>
    )
  }
}