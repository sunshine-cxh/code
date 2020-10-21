/*
 * @Descripttion :
 * @Author       : xuqiufeng
 * @Date         : 2020-06-24 16:19:57
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-09-01 15:05:10
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { Scene, PolygonLayer, PointLayer, LineLayer, Popup, Marker } from '@antv/l7'
import { Mapbox, GaodeMap } from '@antv/l7-maps'
import { DrawControl, DrawPoint, DrawCircle, DrawLine } from '@antv/l7-draw'

import Button from 'components/Button'
import Panel from 'components/Panel'
import Toolbar from 'components/Toolbar'
//import socketio from 'socket.io-client';


import Checkbox from 'components/Checkbox'

import '../style/index.less'
import legendImg1 from 'assets/images/legend1.png'
import legendImg from 'assets/images/legend.png'
import { first, forEach } from 'lodash'
import ScrollNumber from 'antd/lib/badge/ScrollNumber'

var pipLine
const CheckGroup = Checkbox.Group

@connect(({ geographyHome, loading }) => ({
  geographyHome,
  loading: loading.models.geographyHome,
}))
export default class NetworkMap extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    tableState: false,
    fullScreen: true,
    pipLineConfig: { color: '#1890ff', opacity: 1 },
  }

  componentWillUnmount() {
    this.scene.destroy()
  }
  //加载完成
  async componentDidMount() {
    this.props.onRef && this.props.onRef(this)
    this.setScene()
  }
  setScene() {
    let {
      geographyHome: { zoom, centralCoordinates },
    } = this.props
    const scene = new Scene({
      id: 'map',
      map: new Mapbox({
        center: centralCoordinates,
        maxZoom: 16,
        container: 'map', // container id
        style: {
          version: 8,
          name: 'Mapbox Streets',
          sprite: 'mapbox://sprites/mapbox/streets-v8',
          glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
          sources: {
            'osm-tiles': {
              type: 'raster',
              tiles: ['http://192.168.0.71:5000/TileFiles/ZHTiles/{z}/{x}/{y}.png?apikey=1234'],
              tileSize: 256,
            },
            'ZHTiles_Satellite': {
              type: 'raster',
              tiles: ['http://192.168.0.71:5000/TileFiles/ZHTiles_Satellite/{z}/{x}/{y}.png?apikey=1234'],
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
      }),
    })

    const popup = new Popup({
      offsets: [0, 20],
    }).setText('报警：xx监测点压力异常！')

    var el = document.createElement('img')
    el.type = 'image'
    el.src = '/warning1.gif'
    el.width = '40'
    el.height = '40'

    //报警

    const marker = new Marker({ element: el })
      .setLnglat([120.171151990288507, 30.235276483959943])
      .setPopup(popup)
    scene.addMarker(marker)

    this.scene = scene
    this.pointLayer()

    //绘制圆形
    const drawCircle = new DrawCircle(this.scene)
    drawCircle.on('draw.click', (e) => {
      console.log(e)
    })
    this.drawCircle = drawCircle

    //绘制线段
    const drawLine = new DrawLine(this.scene)
    drawLine.on('draw.click', (e) => {
      console.log(e)
    })
    this.drawLine = drawLine
  }
  //点--图层
  pointLayer() {
    fetch('/Point.json')
      .then((res) => res.json())
      .then((data) => {
        //设备图层效果
        this.scene.addImage(
          '00',
          'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg'
        )
        this.scene.addImage(
          '01',
          'https://gw.alipayobjects.com/zos/basement_prod/30580bc9-506f-4438-8c1a-744e082054ec.svg'
        )
        this.scene.addImage(
          '02',
          'https://gw.alipayobjects.com/zos/basement_prod/7aa1f460-9f9f-499f-afdf-13424aa26bbf.svg'
        )
        this.lineLayer()

        const imageLayer = new PointLayer({
          zIndex: 2,
        })
          //.options({zIndex:0})
          //.options('point_count', {

          .source(data, {
            parser: {
              type: 'json',
              x: 'longitude',
              y: 'latitude',
            },
          })

          .shape('name', ['00', '01', '02'])
          .size(16)

        //设备名称图层点击效果
        imageLayer.on('click', (e) => {
          console.log(e)
          const popup = new Popup({
            offsets: [0, 0],
            closeButton: true,
          })
            .setLnglat(e.lngLat)
            .setHTML(
              `<span>设备编号: ${e.feature.id}</span></br><span>种类: ${e.feature.assettype}</span></br><span>状态: ${e.feature.status}</span></br><span>压力: ${e.feature.pressure}</span></br><span>温度: ${e.feature.temperature}</span></br><span>流量: ${e.feature.flow}</span>`
            )
          this.scene.addPopup(popup)
        })

        this.scene.addLayer(imageLayer)
      })
  }
  //管网--图层
  lineLayer(opacity) {
    fetch('http://192.168.0.65:8060/api/igis/GIS/zhGasMap')
      .then((res) => res.json())
      .then((data) => {
        //管网图层//

        //分类json，管网json

        pipLine = new LineLayer({
          zIndex: 1,
        })
          .source(data)
          .size(2)
          .shape('line')
          // .color('value', ['#ca0020', '#f4a582', '#f7f7f7', '#92c5de', '#0571b0'].reverse())
          .color(this.state.pipLineConfig.color)
          .render()
          .style({
            //colors:'#000000',
            //intensity: 2,
            radius: 30,
            opacity: this.state.pipLineConfig.opacity,
            // rampColors: {
            //   colors: [
            //     '#000000',
            //     '#F7B74A',
            //     '#FFF598',
            //     '#91EABC',
            //     '#2EA9A1',
            //     '#206C7C'
            //   ].reverse(),
            //   positions: [ 0, 0.2, 0.4, 0.6, 0.8, 1.0 ]
            // }
          })
        // .animate({
        //   interval: 1, // 间隔
        //   duration: 1, // 持续时间，延时
        //   trailLength: 2, // 流线长度
        // })

        //管网图层点击效果
        pipLine.on('click', (e) => {
          console.log(e.feature)
          const popup = new Popup({
            offsets: [0, 0],
            closeButton: true,
          })
            .setLnglat(e.lngLat)
            .setHTML(
              `<span>管网编号: ${e.feature.name}</span></br><span>壁厚: ${e.feature.wallthickness}</span></br><span>外径: ${e.feature.diameterunits}</span></br><span>材料 : ${e.feature.assettype}</span></br><span>流速: ${e.feature.flowrate}</span></br><span>流量: ${e.feature.flow}</span></br><span>长度: ${e.feature.nominaldiameter}</span>`
            )
          this.scene.addPopup(popup)
        })

        // const scaleControl = new Scale({
        //   position: 'bottomright',
        // })
        // this.scene.addControl(scaleControl)

        this.scene.addLayer(pipLine)
      })
  }
  //鼠标滚轮--放大缩小
  handleScroll(e) {
    // console.log(this.scene.getLayers().find((x) => x.type === 'LineLayer'))
    console.log(this.scene.getLayer(pipLine))
    this.scene.on('zoomchange', () => {
      if (this.scene.getZoom() == 5) {
      }
    })
  }
  //图例
  legendChange = (val) => {
    // console.log('checked = ', val)
    // console.log(this.scene.getLayers())

    // this.scene.removeLayer(pipLine)
    val.find((x) => {
      if (x != '1') {
        this.setState({
          pipLineConfig: { ...this.state.pipLineConfig, opacity: 0 },
        })
      } else if (x == '1') {
        this.setState({
          pipLineConfig: { ...this.state.pipLineConfig, opacity: 1 },
        })
      }
    })
    // this.sceneDrawLine()
  }
  // 测量线段距离
  sceneDrawLine() {
    let {
      geographyHome: { lineLength },
      dispatch,
    } = this.props

    this.drawLine.enable()
    this.drawLine.on('draw.create', (e) => {
      console.log(e)
      const pointCoordinates = e.geometry.coordinates // 点坐标位置
      let sum = 0

      for (var i = 0; i < pointCoordinates.length; i++) {
        let val = 0
        if (i < pointCoordinates.length - 1) {
          val = this.getFlatternDistance(
            pointCoordinates[i][0] * 1,
            pointCoordinates[i][1] * 1,
            pointCoordinates[i * 1 + 1][0] * 1,
            pointCoordinates[i * 1 + 1][1] * 1
          )
        }
        sum = sum * 1 + val
      }
      dispatch({
        type: 'geographyHome/@change',
        payload: {
          lineLength: sum,
        },
      })
    })
  }
  //绘制圆形--计算圆形面积
  sceneDrawArea() {
    let {
      geographyHome: { area },
      dispatch,
    } = this.props

    this.drawCircle.enable()
    this.drawCircle.on('draw.create', (e) => {
      let startPoint = e.properties.startPoint
      let endPoint = e.properties.endPoint
      let radius = this.getFlatternDistance(
        startPoint.lng,
        startPoint.lat,
        endPoint.lng,
        endPoint.lat
      )

      dispatch({
        type: 'geographyHome/@change',
        payload: {
          area: radius * radius * (3.14).toFixed(2),
        },
      })
    })
  }
  // 地理坐标距离
  getFlatternDistance(lat1, lng1, lat2, lng2) {
    var EARTH_RADIUS = 6378137.0 //单位M
    var PI = Math.PI

    function getRad(d) {
      return (d * PI) / 180.0
    }
    var f = getRad((lat1 + lat2) / 2)
    var g = getRad((lat1 - lat2) / 2)
    var l = getRad((lng1 - lng2) / 2)
    var sg = Math.sin(g)
    var sl = Math.sin(l)
    var sf = Math.sin(f)
    var s, c, w, r, d, h1, h2
    var a = EARTH_RADIUS
    var fl = 1 / 298.257

    sg = sg * sg
    sl = sl * sl
    sf = sf * sf

    s = sg * (1 - sl) + (1 - sf) * sl
    c = (1 - sg) * (1 - sl) + sf * sl

    w = Math.atan(Math.sqrt(s / c))
    r = Math.sqrt(s * c) / w
    d = 2 * w * a
    h1 = (3 * r - 1) / 2 / c
    h2 = (3 * r + 1) / 2 / s

    return Math.round(d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg)))
  }
  // 取点坐标
  sceneDrawPoint() {
    let {
      geographyHome: { point },
      dispatch,
    } = this.props
    const drawPoint = new DrawPoint(this.scene)
    drawPoint.enable()
    drawPoint.on('draw.create', (e) => {
      console.log(e.geometry.coordinates)
      dispatch({
        type: 'geographyHome/@change',
        payload: {
          point: e.geometry.coordinates,
        },
      })
    })
  }
  //图层--放大
  zoomIn = () => {
    this.scene.zoomIn()
  }
  //图层--缩小
  zoomOut = () => {
    this.scene.zoomOut()
  }
  //设置中心坐标点
  setCenter() {
    console.log(111)
    let {
      geographyHome: { centralCoordinates },
      dispatch,
    } = this.props

    dispatch({
      type: 'geographyHome/@change',
      payload: {
        centralCoordinates: [120.171184951272892, 30.221031080154326],
      },
      success: () => {
        this.scene.panTo(centralCoordinates)
      },
    })
  }
  render() {
    return (
      <div className="geography-map">
        <div id="map" className="map" onWheel={(e) => this.handleScroll(e)} />
        <CheckGroup className="legend" defaultValue={['1', '2', '3']} onChange={this.legendChange}>
          <Checkbox value="1">
            <img src={legendImg1} className="legendImg" />
          </Checkbox>
          <Checkbox value="2">
            <img src={legendImg} className="legendImg" />
          </Checkbox>
          <Checkbox value="3">
            <img src={legendImg} className="legendImg" />
          </Checkbox>
        </CheckGroup>
      </div>
    )
  }
}
