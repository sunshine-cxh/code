/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-07-17 10:11:21
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-19 11:35:59
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import { mapboxUrl } from '../../../config'
import { Scene, PolygonLayer, PointLayer, LineLayer, Popup, Zoom, Scale, Marker } from '@antv/l7'
import { Mapbox, GaodeMap } from '@antv/l7-maps'
import { DrawControl, DrawPoint, DrawCircle } from '@antv/l7-draw'
// import VideoLayout from './VideoLayout.js'
import './index.less'
import {Icon} from 'antd'
var pipLine

import '../libs/flowplayer-3.2.8.min.js'
import flowplayerswf from'../libs/flowplayer-3.2.18.swf'
import flowplayerswfRtmp from '../libs/flowplayer.rtmp-3.2.8.swf'
import flowplayerControl from '../libs/flowplayer.controls-3.2.16.swf'


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
    visible: false,
    videoJsOptions: {
      data:'',
      num:''
    },
  }
  async componentDidMount() {
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
              tiles: [mapboxUrl()+ '/TileFiles/SZTiles/{z}/{x}/{y}.png?apikey=1234'],
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
        zoom: 10,
        maxZoom: 16,
        minZoom: 9
      }),
    })
    
    const popup = new Popup({
      offsets: [0, 20],
    }).setText('报警：xx监测点压力异常！')

    this.scene = scene
  }
  componentDidUpdate(prevprops, prevstate) {
    let {
       pointVideo
    } = this.props
    // if(prevprops.realtime.pointVideo.length !== this.props.realtime.pointVideo.length) {
    pointVideo.map((item) => {
      if(item.isFixedDisplay == 0){

        var el = document.createElement('img')
        el.type = 'image'
        el.src = '/node.png'
        el.width = '30'
        el.height = '30'

        //报警

        const marker = new Marker({ element: el }).setLnglat([
          item.longitude || 120.64147166,
          item.latitude || 31.40394254,
        ])
        marker.on('click', (e) => {
          
          this.setState({
            ...this.state,
            visible: true,
            videoJsOptions: {
              // autoplay: false,
              // language: 'zh-CN',
              // preload: 'auto',
              // errorDisplay: true,
              // controls: true,
              // type: 2,
              // sources: [
              //   {
              //     src: item.url,
              //     type: 'application/x-mpegURL',
              //   },
              // ],
              data:item.url,
              num:item.code
            },
          },()=>{
            let urls = item.url
            flowplayer("playerabc", flowplayerswf ,{
              clip: {  
                url: urls,
                provider: 'rtmp', 
                live: true
              },
              plugins: {
                rtmp: {   
                  url: flowplayerswfRtmp,   
                  netConnectionUrl: urls
                },
                controls: {
                  url: flowplayerControl,
                  // play: false, opacity: 1, scrubber: false, volume: false, mute: false
                }
              }
            }); 
          })
        })
        // .setPopup(popup)
        this.scene.addMarker(marker)
      }
    })
    // }
  }
  onChangeVisible = (visible) => {
    this.setState({
      ...this.state,
      visible,
    })
  }
  handleReal = () => {
    this.setState({
      ...this.state,
      realActive: 'active',
      simuActive: '',
    })
  }
  handleSimu = () => {
    this.setState({
      ...this.state,
      realActive: '',
      simuActive: 'active',
    })
  }
  render() {
    let { visible, videoJsOptions } = this.state
    return (
      <>
        <div className="realtime-map">
          {/* <VideoLayout {...layoutProps}></VideoLayout> */}

          
          <div className="video-layout" style={{display:visible?'block':'none'}}>
            <Icon className="icon-item delete-btn" 
                  type="close-circle" 
                  theme="filled"
                  onClick={ (e)=> {
                    this.onChangeVisible(false)
                  } }
            />
            {/* <FlowPlay num={5} {...videoJsOptions} visible={visible}/> */}
            <a  href='#'
                className='player-a'
                id={"playerabc"} />
          </div> 
          

          <div id="map" className="map" />
        </div>
      </>
    )
  }
}
