/*
 * @Descripttion :
 * @Author       : xuqiufeng
 * @Date         : 2020-06-24 16:19:57
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-09-07 16:28:11
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import { fromLonLat } from 'ol/proj'
import OSM from 'ol/source/OSM'
import { Vector as VectorSource } from 'ol/source'
import { Vector } from 'ol/layer'
import { LineString, Polygon, Point } from 'ol/geom'
import { getArea, getLength } from 'ol/sphere'
import XYZ from 'ol/source/XYZ' //tile图层
import { Style, Fill, Stroke, Circle as CircleStyle } from 'ol/style'
import { Draw, Modify, Snap } from 'ol/interaction'
import Circle from 'ol/geom/Circle'
import Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'

import { createStringXY } from 'ol/coordinate'
import mousePosition from 'ol/control/MousePosition'
import { defaults as defaultControls } from 'ol/control'

import Overlay from 'ol/Overlay'
import { toLonLat } from 'ol/proj'
import { toStringHDMS } from 'ol/coordinate'

import Select from 'ol/interaction/Select'

import Checkbox from 'components/Checkbox'
import Icon from 'components/Icon'

import '../style/index.less'
import legendImg from 'assets/images/legend.png'

const zhuhai = fromLonLat([113.28236014172502, 22.16642221099955])
const CheckGroup = Checkbox.Group

@connect(({ geographyBackstage, loading }) => ({
  geographyBackstage,
  loading: loading.models.geographyBackstage,
}))
export default class NetworkMap extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    map: null,
    view: null,
    vectorLayer: null,
    info: [],
  }
  componentDidMount() {
    let that = this
    this.props.onRef && this.props.onRef(this)
    var view = new View({
      center: zhuhai,
      zoom: 13,
      projection: 'EPSG:3857',
    })
    // 添加绘制图层
    var source = new VectorSource()
    var vector = new Vector({
      source: source,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: '#5b7897',
          width: 7,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    })
    this.renderGeoJson().then((res) => {
      console.log('NetworkMap -> componentDidMount -> res', res)
      let vectorLayer = res
      let mousePositionControl = this.mousePosition()

      let Map_tile = new TileLayer({
        projection: 'EPSG:4326',
        preload: 4,
        name: '矢量图层',
        source: new XYZ({
          attributions:
            '<a href="https://www.ilng.cn/" target="_blank">&copy; MapTiler</a> <a href="https://www.ilng.cn/" target="_blank">&copy; ILNG</a>',
          url: 'http://192.168.0.71:5000/TileFiles/ZHTiles/{z}/{x}/{y}.png?apikey=1234',
        }),
      })
      let Map_satellite = new TileLayer({
        projection: 'EPSG:4326',
        preload: 4,
        name: '卫星图层',
        source: new XYZ({
          attributions:
            '<a href="https://www.ilng.cn/" target="_blank">&copy; MapTiler</a> <a href="https://www.ilng.cn/" target="_blank">&copy; ILNG</a>',
          url: 'http://192.168.0.71:5000/TileFiles/ZHTiles_Satellite/{z}/{x}/{y}.png?apikey=1234',
        }),
      })
      let overlay = this.toggleDialog()
      var map = new Map({
        controls: defaultControls().extend([mousePositionControl]),
        overlays: [overlay],
        target: 'map',
        layers: [Map_tile, Map_satellite, vectorLayer],
        logo: false,
        view: view,
      })
      console.log('map', map.layer)
      var modify = new Modify({ source: source })
      map.addInteraction(modify)

      let select = new Select()
      map.addInteraction(select)

      // map.removeInteraction(select)

      select.on('select', function (e) {
        if (e.selected.length > 0) {
          var coordinate = e.mapBrowserEvent.coordinate

          that.setState(
            {
              info: e.selected[0].values_.info,
            },
            () => {
              overlay.setPosition(coordinate)
            }
          )
        } else {
          that.setState({
            info: [],
          })
          overlay.setPosition(undefined)
        }

        // document.getElementById('status').innerHTML =
        //   '&nbsp;' +
        //   e.target.getFeatures().getLength() +
        //   ' selected features (last operation selected ' +
        //   e.selected.length +
        //   ' and deselected ' +
        //   e.deselected.length +
        //   ' features)'
      })
      var closer = document.getElementById('popup-closer')
      closer.onclick = function () {
        overlay.setPosition(undefined)
        closer.blur()
        return false
      }
      //将绘制层添加到地图容器中
      map.addLayer(vector)
      this.setState({
        map,
        view,
        vector,
        source,
        overlay,
        Map_tile,
        Map_satellite,
      })
    })
  }
  toggleLayers() {
    let {
      geographyBackstage: { layerName, layerVisible },
    } = this.props
    console.log(this.state[layerName])
    this.state[layerName].setVisible(layerVisible)
    console.log('NetworkMap -> toggleLayers -> layerName', layerName)
  }
  toggleDialog() {
    var container = document.getElementById('popup')

    return new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    })
  }
  mousePosition() {
    return new mousePosition({
      coordinateFormat: createStringXY(4),
      projection: 'EPSG:4326',
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;',
    })
  }
  renderGeoJson() {
    return new Promise((res, rej) => {
      let vectorLayer
      fetch('http://192.168.0.65:8060/api/igis/GIS/zhGasMap')
        .then((res) => res.json())
        .then((data) => {
          var image = new CircleStyle({
            radius: 5,
            fill: null,
            stroke: new Stroke({ color: 'red', width: 1 }),
          })

          var styles = {
            Point: new Style({
              image: image,
            }),
            LineString: new Style({
              stroke: new Stroke({
                color: '#4883c1',
                width: 6,
              }),
            }),
            MultiLineString: new Style({
              stroke: new Stroke({
                color: 'green',
                width: 1,
              }),
            }),
            MultiPoint: new Style({
              image: image,
            }),
            MultiPolygon: new Style({
              stroke: new Stroke({
                color: 'yellow',
                width: 1,
              }),
              fill: new Fill({
                color: 'rgba(255, 255, 0, 0.1)',
              }),
            }),
            Polygon: new Style({
              stroke: new Stroke({
                color: 'blue',
                lineDash: [4],
                width: 3,
              }),
              fill: new Fill({
                color: 'rgba(0, 0, 255, 0.1)',
              }),
            }),
            GeometryCollection: new Style({
              stroke: new Stroke({
                color: 'magenta',
                width: 2,
              }),
              fill: new Fill({
                color: 'magenta',
              }),
              image: new CircleStyle({
                radius: 10,
                fill: null,
                stroke: new Stroke({
                  color: 'magenta',
                }),
              }),
            }),
            Circle: new Style({
              stroke: new Stroke({
                color: 'red',
                width: 2,
              }),
              fill: new Fill({
                color: 'rgba(255,0,0,0.2)',
              }),
            }),
          }

          var geojsonObject = data
          console.log('NetworkMap -> renderGeoJson -> geojsonObject', geojsonObject)

          var styleFunction = function (feature) {
            console.log(
              'NetworkMap -> styleFunction -> feature.getGeometry().getType()',
              feature.getGeometry().getType()
            )
            return styles[feature.getGeometry().getType()]
          }
          // var vectorSource = new VectorSource({
          //   features: new GeoJSON().readFeatures(geojsonObject),
          // })
          var vectorSource = new VectorSource({
            features: new GeoJSON().readFeatures(geojsonObject, {
              dataProjection: 'EPSG:4326',
              featureProjection: 'EPSG:3857',
            }),
          })
          // vectorSource.addFeature(
          //   new Feature(new Circle([113.28236014172502, 22.16642221099955], 114.28236014172502))
          // )
          // vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)))
          vectorLayer = new Vector({
            source: vectorSource,
            style: styleFunction,
          })
          console.log('NetworkMap -> renderGeoJson -> vectorLayer', vectorLayer)
          this.setState({
            vectorSource
          })
         
          res(vectorLayer)
        })
    })
  }

  // 移动到成都
  moveTo() {
    var view = this.state.map.getView()
    // 设置地图中心为成都的坐标，即可让地图移动到成都
    view.setCenter(ol.proj.transform([104.06, 30.67], 'EPSG:4326', 'EPSG:3857'))
    map.render()
  }

  // 放大地图
  zoomIn() {
    var view = this.state.map.getView()
    view.setZoom(view.getZoom() + 1)
  }

  // 缩小地图
  zoomOut() {
    var view = this.state.map.getView()
    view.setZoom(view.getZoom() - 1)
  }
  //    测量长度输出
  formatLength = (line) => {
    var length = getLength(line)
    var output
    if (length > 100) {
      output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km'
    } else {
      output = Math.round(length * 100) / 100 + ' ' + 'm'
    }
    return output
  }
  //    测量面积输出
  formatArea = (polygon) => {
    var area = getArea(polygon)
    var output
    if (area > 10000) {
      output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km²'
    } else {
      output = Math.round(area * 100) / 100 + ' ' + 'm²'
    }
    return output
  }
  //绘制图形
  addGraph = (drawType) => {
    let that = this
    let { map, source } = this.state
    let snap

    map.removeInteraction(draw)
    map.removeInteraction(snap)
    console.log(this.state.source)
    var draw = new Draw({
      //绘制层数据源
      source: that.state.source,
      /** @type {ol.geom.GeometryType}几何图形类型 */
      type: drawType,
      // //几何信息变更时调用函数
      // geometryFunction: geometryFunction,
      //最大点数
      // maxPoints: 2
      //
      // freehand: true
    })
    draw.on('drawstart', function (e) {
      e.feature.getGeometry().on('change', function (evt) {
        var geom = evt.target //绘制几何要素
        var output
        var tooltipCoord
        if (geom instanceof Polygon) {
          output = that.formatArea(geom) //面积值
          tooltipCoord = geom.getInteriorPoint().getCoordinates() //坐标
        } else if (geom instanceof LineString) {
          output = that.formatLength(geom) //长度值
          tooltipCoord = geom.getLastCoordinate() //坐标
        }
        console.log(output)
        //将测量值设置到测量工具提示框中显示
        // measureTooltipElement.innerHTML = output;
      })
    })
    draw.on('drawend', function (e) {
      // console.log(this.state.overlay)
      // this.state.overlay.setVisible(undefined)
      console.log('111', e.feature.getGeometry())
      console.log('绘制结束后获取信息', e.feature.getGeometry().flatCoordinates)
    })

    map.addInteraction(draw)
    snap = new Snap({ source: source,source:this.state.vectorSource })
    map.addInteraction(snap)
  }

  //  地图保存成png
  savePng = () => {
    let that = this
    // 实现canvas转化成图片
    this.state.map.once('postcompose', function (e) {
      var canvas = e.context.canvas
      var MIME_TYPE = 'image/png'

      var imgURL = canvas.toDataURL(MIME_TYPE)

      var dlLink = document.createElement('a')
      dlLink.download = 'map.png'
      dlLink.href = imgURL
      dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':')

      document.body.appendChild(dlLink)
      dlLink.click()
      document.body.removeChild(dlLink)
    })
    this.state.map.renderSync()
  }
  render() {
    let { info } = this.state
    return (
      <div className="geography-map">
        <div id="popup" className="ol-popup">
          <a href="#" id="popup-closer" className="ol-popup-closer"></a>
          <div id="popup-content">
            <p>详细信息:</p>
            {info && info.map((item, index) => <p key={index}>{`${item.keys}:${item.value}`}</p>)}
          </div>
        </div>
        <div id="map" className="map" ref="map" />
        <div className="zoom">
          <Icon
            type="zoom-in"
            antd
            className="icon-zoom"
            onClick={() => {
              this.zoomIn()
            }}
          />
          <Icon
            type="zoom-out"
            antd
            className="icon-zoom"
            onClick={() => {
              this.zoomOut()
            }}
          />
        </div>
        {/* <div id="mouse-position"></div> */}
        <div className="drawList">
          <Icon
            type="environment"
            theme="filled"
            antd
            className="icon-draw"
            onClick={() => {
              this.addGraph('Point')
            }}
          />
          <Icon
            type="edit"
            theme="filled"
            antd
            className="icon-draw"
            onClick={() => {
              this.addGraph('LineString')
            }}
          />
          <Icon
            type="radar-chart"
            antd
            className="icon-draw"
            onClick={() => {
              this.addGraph('Polygon')
            }}
          />
        </div>
      </div>
    )
  }
}
