/*
 * @Descripttion :
 * @Author       : xuqiufeng
 * @Date         : 2020-06-24 16:19:57
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-08-27 11:58:56
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
import { LineString, Polygon } from 'ol/geom'
import { getArea, getLength } from 'ol/sphere'

import { Style, Fill, Stroke, Circle as CircleStyle } from 'ol/style'
import { Draw, Modify, Snap } from 'ol/interaction'
import Circle from 'ol/geom/Circle'
import Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'

import Checkbox from 'components/Checkbox'
import Icon from 'components/Icon'

import '../style/index.less'
import legendImg from 'assets/images/legend.png'

const shenzhen = fromLonLat([114.064035, 22.548435])
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
    map: null,
    view: null,
    vectorLayer: null,
    tableState: false,
    fullScreen: true,
  }
  componentDidMount() {
    this.props.onRef && this.props.onRef(this)
    var view = new View({
      center: shenzhen,
      zoom: 13,
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
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    })

    var map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          preload: 4,
          source: new OSM(),
        }),
      ],
      logo: false,
      view: view,
    })
    var modify = new Modify({ source: source })
    map.addInteraction(modify)

    this.renderGeoJson()
    //将绘制层添加到地图容器中
    map.addLayer(vector)
    this.setState({
      map,
      view,
      vector,
      source,
    })
  }
  renderGeoJson() {
    
    fetch('/zhgasmap.json')
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
              color: 'green',
              width: 1,
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

        var aa = {
          //   type: 'FeatureCollection',
          //   crs: {
          //     type: 'name',
          //     properties: {
          //       name: 'EPSG:3857',
          //     },
          //   },
          //   features: [
          //     {
          //       type: 'Feature',
          //       geometry: {
          //         type: 'Point',
          //         coordinates: [0, 0],
          //       },
          //     },
          //     {
          //       type: 'Feature',
          //       geometry: {
          //         type: 'LineString',
          //         coordinates: [
          //           [4e6, -2e6],
          //           [8e6, 2e6],
          //         ],
          //       },
          //     },
          //     {
          //       type: 'Feature',
          //       geometry: {
          //         type: 'LineString',
          //         coordinates: [
          //           [4e6, 2e6],
          //           [8e6, -2e6],
          //         ],
          //       },
          //     },
          //     {
          //       type: 'Feature',
          //       geometry: {
          //         type: 'Polygon',
          //         coordinates: [
          //           [
          //             [-5e6, -1e6],
          //             [-4e6, 1e6],
          //             [-3e6, -1e6],
          //           ],
          //         ],
          //       },
          //     },
          //     {
          //       type: 'Feature',
          //       geometry: {
          //         type: 'MultiLineString',
          //         coordinates: [
          //           [
          //             [-1e6, -7.5e5],
          //             [-1e6, 7.5e5],
          //           ],
          //           [
          //             [1e6, -7.5e5],
          //             [1e6, 7.5e5],
          //           ],
          //           [
          //             [-7.5e5, -1e6],
          //             [7.5e5, -1e6],
          //           ],
          //           [
          //             [-7.5e5, 1e6],
          //             [7.5e5, 1e6],
          //           ],
          //         ],
          //       },
          //     },
          //     {
          //       type: 'Feature',
          //       geometry: {
          //         type: 'MultiPolygon',
          //         coordinates: [
          //           [
          //             [
          //               [-5e6, 6e6],
          //               [-5e6, 8e6],
          //               [-3e6, 8e6],
          //               [-3e6, 6e6],
          //             ],
          //           ],
          //           [
          //             [
          //               [-2e6, 6e6],
          //               [-2e6, 8e6],
          //               [0, 8e6],
          //               [0, 6e6],
          //             ],
          //           ],
          //           [
          //             [
          //               [1e6, 6e6],
          //               [1e6, 8e6],
          //               [3e6, 8e6],
          //               [3e6, 6e6],
          //             ],
          //           ],
          //         ],
          //       },
          //     },
          //     {
          //       type: 'Feature',
          //       geometry: {
          //         type: 'GeometryCollection',
          //         geometries: [
          //           {
          //             type: 'LineString',
          //             coordinates: [
          //               [-5e6, -5e6],
          //               [0, -5e6],
          //             ],
          //           },
          //           {
          //             type: 'Point',
          //             coordinates: [4e6, -5e6],
          //           },
          //           {
          //             type: 'Polygon',
          //             coordinates: [
          //               [
          //                 [1e6, -6e6],
          //                 [2e6, -4e6],
          //                 [3e6, -6e6],
          //               ],
          //             ],
          //           },
          //         ],
          //       },
          //     },
          //   ],
        }
        var geojsonObject = data

        var styleFunction = function (feature) {
          return styles[feature.getGeometry().getType()]
        }
        var vectorSource = new VectorSource({
          features: (new GeoJSON()).readFeatures(geojsonObject),
        })

        // vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)))
        let vectorLayer = new Vector({
          source: vectorSource,
          style: styleFunction,
        })
        console.log('NetworkMap -> renderGeoJson -> vectorLayer', vectorLayer)
        this.state.map.addLayer(vectorLayer)
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
      console.log(e.feature)
      console.log('111', e.feature.getGeometry())
      console.log('绘制结束后获取信息', e.feature.getGeometry().flatCoordinates)
    })

    map.addInteraction(draw)
    snap = new Snap({ source: source })
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
    return (
      <div className="geography-map">
        <div id="map" className="map" />
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
