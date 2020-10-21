/*
 * @Descripttion : 安检巡线维修人员地图
 * @Author       : caojiarong
 * @Date         : 2020-07-20 17:07:22
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-27 11:52:00
 */ 
 
import React, { Component } from 'react'
import { connect } from 'dva'
import {mapboxUrl} from '../../../config'
import { Scene, PolygonLayer, PointLayer, LineLayer, Popup, Zoom, Scale, Marker } from '@antv/l7'
import { Mapbox, GaodeMap } from '@antv/l7-maps'
import { DrawControl, DrawPoint, DrawCircle } from '@antv/l7-draw'
import staffIconMove from 'assets/icons/staff-icon-move.png'
import peopleIcon from 'assets/images/people-icon.png'
import './index.less'
var pipLine

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
        center: [120.64147166, 31.40394254],
        container: 'map', // container id
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
            
          ],
          
        },
        zoom: zoom,
        maxZoom: 16,
        minZoom: 9
      }),
    })
    this.scene = scene
    
  }

  componentDidUpdate(){
    let {data,trackData,carData, userId} = this.props
    if(trackData.length == 0 || userId == ''){
      // 首先要清除mark以及layer图层，否则会出现多个图层导致显示重叠
      let a =this.scene.getLayers()
      if(this.scene.layerService.layers.length > 0){
        for(let i=0;i<this.scene.layerService.layers.length;i++){
          this.scene.removeLayer(a[i]);
        }
      }
      for(let x=0;x<this.scene.markerService.markers.length;x++){
        this.scene.markerService.markers[x].remove()
      }
      
      this.setMark(data)
    }else if(trackData.name != '' && userId != ''){
      // 首先要清除mark以及layer图层，否则会出现多个图层导致显示重叠
      let a =this.scene.getLayers()
      for(let x=0;x<this.scene.markerService.markers.length;x++){
        this.scene.markerService.markers[x].remove()
      }
      if(this.scene.layerService.layers.length > 0){
        for(let i=0;i<this.scene.layerService.layers.length;i++){
          this.scene.removeLayer(a[i]);
        }
      }
      this.staffTrack(trackData)
    }
  }

  //人员轨迹移动
  staffMove=(data)=>{
    let el2 = document.createElement('img')
    el2.type = 'image'
    el2.src = staffIconMove
    el2.width = '40'
    el2.height = '40'
    const trackMark = new Marker({ element: el2 }).setLnglat([data[0][0], data[0][1]])
    this.scene.addMarker(trackMark)
    // trackMark
    for(let i =0;i<data.length;i++){
      (function (i){
        setTimeout(function(){
          trackMark.setLnglat(data[i])
        },i * 100)
      })(i)
        
    }
  }

  // 人员轨迹
  staffTrack=(data)=>{
    tarckLine = new LineLayer({
      zIndex: 1,
    })
      .source(data)
      .size(3)
      .shape('line')
      // 配置不同status类型的不同颜色--------------------------
      .color('rgb(140,192,112)')
      .style({
        radius: 30,
      })
      .animate({
        interval: 1,
        trailLength: 2,
        duration: 3
      })
    this.scene.addLayer(tarckLine)
    // 添加marker
    
    this.staffMove(data.features[0].geometry.coordinates)
    
  }

  //设置图标
  setMark = (usersPosition=[]) =>{
    usersPosition.map(item=> {
      if( item.currentStatus == 1 && item.lng && item.lat){
        var el = document.createElement('img')
        el.type = 'image'
        el.src = peopleIcon
        el.width = '40'
        el.height = '40'

        //报警
        const marker = new Marker({ element: el }).setLnglat([item.lng, item.lat])
        marker.on('click', (e) => {
          this.scene.setCenter([item.lng, item.lat])
          const popup = new Popup({
            offsets: [125, 40],
            closeButton: false,
            className: 'cus-popup'
          })
          .setLnglat([item.lng, item.lat])
          .setHTML(
              '<div class="cus-popup-title">员工信息</div>'+
              '<div class="cus-popup-content">'+
                '<div >姓名：'+item.username+'</div>'+
                '<div >电话：'+item.phones+'</div>'+
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
      <div className="linepatrol-map">
        <div id="map" className="map" />
      </div>
    )
  }
}