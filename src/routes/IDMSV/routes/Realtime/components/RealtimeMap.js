/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-07-17 10:11:21
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-10 10:17:38
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import { mapboxUrl } from '../../../config'
import { Scene, PolygonLayer, PointLayer, LineLayer, Popup, Zoom, Scale, Marker } from '@antv/l7'
import { Mapbox, GaodeMap } from '@antv/l7-maps'
import { DrawControl, DrawPoint, DrawCircle } from '@antv/l7-draw'
import VideoLayout from './VideoLayout.js'
import './index.less'
var pipLine

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

@connect(({ realtime, loading }) => ({
  realtime,
  loading: loading.models.realtime,
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
    visible: false,
    videoJsOptions: {
      autoplay: false,
      language: 'zh-CN',
      preload: 'auto',
      errorDisplay: true,
      controls: true,
      type: 2,
      sources: [
        {
          src: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8',
          type: 'application/x-mpegURL',
        },
      ],
    },
  }
  async componentDidMount() {
    console.log('')
    this.props.onRef && this.props.onRef(this)
    let {
      realtime: { zoom, pointVideo },
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
        zoom: zoom,
        maxZoom: 16,
        minZoom: 9
      }),
    })
    // fetch('/LineLayer1.json')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data)
    //     //管网图层//
    //     pipLine = new LineLayer({
    //       zIndex: 1,
    //     })
    //       .source(data)
    //       .size(2)
    //       .shape('line')

    //       .color(this.state.pipLineConfig.color)
    //       .style({
    //         //colors:'#000000',
    //         //intensity: 2,
    //         radius: 30,
    //         // opacity: 1.0,
    //         // rampColors: {
    //         //   colors: [
    //         //     '#000000',
    //         //     '#F7B74A',
    //         //     '#FFF598',
    //         //     '#91EABC',
    //         //     '#2EA9A1',
    //         //     '#206C7C'
    //         //   ].reverse(),
    //         //   positions: [ 0, 0.2, 0.4, 0.6, 0.8, 1.0 ]
    //         // }
    //       })
    //       .animate({
    //         interval: 1, // 间隔
    //         duration: 1, // 持续时间，延时
    //         trailLength: 2, // 流线长度
    //       })

    //     //管网图层点击效果
    //     pipLine.on('click', (e) => {
    //       console.log(e.feature)
    //       const popup = new Popup({
    //         offsets: [0, 0],
    //         closeButton: true,
    //       })
    //         .setLnglat(e.lngLat)
    //         .setHTML(
    //           `<span>管网编号: ${e.feature.name}</span></br><span>壁厚: ${e.feature.wallthickness}</span></br><span>外径: ${e.feature.diameterunits}</span></br><span>材料 : ${e.feature.assettype}</span></br><span>流速: ${e.feature.flowrate}</span></br><span>流量: ${e.feature.flow}</span></br><span>长度: ${e.feature.nominaldiameter}</span>`
    //         )
    //       scene.addPopup(popup)
    //     })

    //     const scaleControl = new Scale({
    //       position: 'bottomright',
    //     })
    //     scene.addControl(scaleControl)

    //     scene.addLayer(pipLine)
    //   })
    // fetch('/Point.json')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     //设备图层效果
    //     scene.addImage(
    //       '00',
    //       'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg'
    //     )
    //     scene.addImage(
    //       '01',
    //       'https://gw.alipayobjects.com/zos/basement_prod/30580bc9-506f-4438-8c1a-744e082054ec.svg'
    //     )
    //     scene.addImage(
    //       '02',
    //       'https://gw.alipayobjects.com/zos/basement_prod/7aa1f460-9f9f-499f-afdf-13424aa26bbf.svg'
    //     )
    //     // scene.addImage(
    //     //   '03',
    //     //   '/warning.gif'
    //     // );

    //     //绘制组件
    //     // const drawControl = new DrawControl(scene, {
    //     //   position: 'topright',
    //     //   layout: 'horizontal', // horizontal vertical
    //     //   controls: {
    //     //     point: true,
    //     //     polygon: true,
    //     //     line: true,
    //     //     circle: true,
    //     //     rect: true,
    //     //     delete: true,
    //     //   },
    //     // })
    //     // scene.addControl(drawControl)

    //     const imageLayer = new PointLayer({
    //       zIndex: 2,
    //     })
    //       //.options({zIndex:0})
    //       //.options('point_count', {

    //       .source(data, {
    //         parser: {
    //           type: 'json',
    //           x: 'longitude',
    //           y: 'latitude',
    //         },
    //       })

    //       .shape('name', ['00', '01', '02'])
    //       .size(20)

    //     //设备名称图层点击效果
    //     imageLayer.on('click', (e) => {
    //       console.log(e)
    //       const popup = new Popup({
    //         offsets: [0, 0],
    //         closeButton: true,
    //       })
    //         .setLnglat(e.lngLat)
    //         .setHTML(
    //           `<span style="color:black">设备编号: ${e.feature.id}</span></br><span>种类: ${e.feature.assettype}</span></br><span>状态: ${e.feature.status}</span></br><span>压力: ${e.feature.pressure}</span></br><span>温度: ${e.feature.temperature}</span></br><span>流量: ${e.feature.flow}</span>`
    //         )
    //       scene.addPopup(popup)
    //     })

    //     scene.addLayer(imageLayer)
    //   })

    const popup = new Popup({
      offsets: [0, 20],
    }).setText('报警：xx监测点压力异常！')

    // var el = document.createElement('img')
    // el.type = 'image'
    // el.src = '/marker.png'
    // el.width = '30'
    // el.height = '40'

    // //报警

    // const marker = new Marker({ element: el }).setLnglat([120.64147166, 31.40394254])
    // // .setPopup(popup)
    // scene.addMarker(marker)

    this.scene = scene
  }
  componentDidUpdate(prevprops, prevstate) {
    let {
      realtime: { pointVideo },
      onChangeSource,
    } = this.props
    // if(prevprops.realtime.pointVideo.length !== this.props.realtime.pointVideo.length) {
    pointVideo.map((item) => {
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
        console.log(e)
        this.setState({
          ...this.state,
          visible: true,
          videoJsOptions: {
            autoplay: false,
            language: 'zh-CN',
            preload: 'auto',
            errorDisplay: true,
            controls: true,
            type: 2,
            sources: [
              {
                src: item.url,
                type: 'application/x-mpegURL',
              },
            ],
          },
        })
      })
      // .setPopup(popup)
      this.scene.addMarker(marker)
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
    const layoutProps = {
      visible,
      onChangeVisible: this.onChangeVisible,
      videoJsOptions,
    }
    return (
      <>
        <div className="realtime-map">
          <VideoLayout {...layoutProps}></VideoLayout>
          <div id="map" className="map" />
        </div>
      </>
    )
  }
}
