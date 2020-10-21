import {
  Scene,
  PolygonLayer,
  PointLayer,
  LineLayer,
  Popup,
  Zoom,
  Scale,
  Marker
} from '@antv/l7';
import { Mapbox, GaodeMap } from '@antv/l7-maps';

import { DrawControl, DrawPoint, DrawCircle } from '@antv/l7-draw';

import * as React from 'react';
import { Layout } from 'antd';

import Button from 'components/Button';
import Panel from 'components/Panel';
import Toolbar from 'components/Toolbar';
//import socketio from 'socket.io-client';

const { Content } = Layout;
var pipLine;
 




export default class MapboxExample extends React.Component {

  state = {
    pipLineConfig:{color:'#206C7C'}
  }

  componentWillUnmount() {
    this.scene.destroy();
  }

  //加载完成
  async componentDidMount() {


    // const socket = socketio('http://localhost');
    // socket.on('connect', function(){
    //   console.log("connect");
    // });
    // socket.on('event', function(data){

    //   console.log("event");
    // });
    // socket.on('disconnect', function(){

    //   console.log("disconnect");
    // });



    const scene = new Scene({
      id: 'map',
      map: new Mapbox({
        // center: [ 113.555936, 22.310937 ],

        center: [120.19382669582967, 30.258134],
        container: 'map', // container id
        style: {
          version: 8,
          name: 'Mapbox Streets',
          sprite: 'mapbox://sprites/mapbox/streets-v8',
          glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
          sources: {
            'osm-tiles': {
              type: 'raster',
              tiles: [
                'https://mt2.google.cn/vt/lyrs=m&scale=2&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}',
              ],
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
        zoom: 12,
        // starting zoom
        // center: [110.19382669582967, 50.258134],
        // pitch: 0,
        // style: 'dark',
        // zoom: 3,
        // token: 'pg.xxx', // 高德或者 Mapbox 的 token
      }),
    });

    // scene.on('loaded', () => {
    //   const zoomControl = new Zoom();
    //   const scaleControl = new Scale();
    //   scene.addControl(zoomControl);
    //   scene.addControl(scaleControl);
    // });

    // scene.addImage('00','https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg');
    // scene.addImage('01','https://gw.alipayobjects.com/zos/basement_prod/30580bc9-506f-4438-8c1a-744e082054ec.svg');
    // scene.addImage('02','https://gw.alipayobjects.com/zos/basement_prod/7aa1f460-9f9f-499f-afdf-13424aa26bbf.svg');

    scene.on('loaded', () => {
      // const drawPoint = new DrawPoint(scene);
      // drawPoint.enable();
      // drawPoint.on('draw.create', (e: any) => {
      //   console.log(e);
      // });
      // drawPoint.on('draw.update', (e: any) => {
      //   console.log(e);
      // });
      // const drawCircle = new DrawCircle(scene);
      // drawCircle.enable();
      // drawCircle.on('draw.create', (e: any) => {
      //   console.log(e);
      // });
      // drawCircle.on('draw.update', (e: any) => {
      //   console.log(e);
      // });
    });

    // const response = await fetch(
    //   'https://gw.alipayobjects.com/os/basement_prod/d2e0e930-fd44-4fca-8872-c1037b0fee7b.json'
    // );
    // const mapData = await fetch('https://gw.alipayobjects.com/os/basement_prod/40ef2173-df66-4154-a8c0-785e93a5f18e.json');

    // scene.on('loaded', () => {
    //   //.then((res) => mapData.json())
    //   // .then((data) => {
    //   const layer = new LineLayer()
    //     .source(mapData.json())
    //     .size(1.5)
    //     .shape('line')
    //     .color('#28B2E9')
    //     .animate({
    //       interval: 1, // 间隔
    //       duration: 1, // 持续时间，延时
    //       trailLength: 2, // 流线长度
    //     });
    //   scene.addLayer(layer);
    // });












    fetch('/Point.json')
      .then((res) => res.json())
      .then((data) => {
      console.log("MapboxExample -> componentDidMount -> data", data)
        
        //设备图层效果
        scene.addImage(
          '00',
          'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg'
        );
        scene.addImage(
          '01',
          'https://gw.alipayobjects.com/zos/basement_prod/30580bc9-506f-4438-8c1a-744e082054ec.svg'
        );
        scene.addImage(
          '02',
          'https://gw.alipayobjects.com/zos/basement_prod/7aa1f460-9f9f-499f-afdf-13424aa26bbf.svg'
        );
        // scene.addImage(
        //   '03',
        //   '/warning.gif'
        // );


        
    fetch('/LineLayer.json')
    .then((res) => res.json())
    .then((data) => {
      //管网图层//
       pipLine = new LineLayer({
        zIndex: 1
      })
        .source(data)
        .size(3)
        .shape('line')
   
        .color(this.state.pipLineConfig.color)
        .style({
          //colors:'#000000',
          //intensity: 2,
          radius: 30,
          // opacity: 1.0,
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
        .animate({
          interval: 1, // 间隔
          duration: 1, // 持续时间，延时
          trailLength: 2, // 流线长度
        });

      //管网图层点击效果
      pipLine.on('click', (e) => {
        console.log(e.feature);
        const popup = new Popup({
          offsets: [0, 0],
          closeButton: true,
        })
          .setLnglat(e.lngLat)
          .setHTML(`<span>管网编号: ${e.feature.name}</span></br><span>壁厚: ${e.feature.wallthickness}</span></br><span>外径: ${e.feature.diameterunits}</span></br><span>材料 : ${e.feature.assettype}</span></br><span>流速: ${e.feature.flowrate}</span></br><span>流量: ${e.feature.flow}</span></br><span>长度: ${e.feature.nominaldiameter}</span>`);
        scene.addPopup(popup);
      });



      const zoomControl = new Zoom({
        position: 'topright',
        layout: 'horizontal',
      });
      const scaleControl = new Scale({
        position: 'bottomright',
      });
      scene.addControl(zoomControl);
      scene.addControl(scaleControl);


      scene.addLayer(pipLine);
    });


          //绘制组件
          const drawControl = new DrawControl(scene, {
            position: 'topright',
            layout: 'horizontal', // horizontal vertical
            controls: {
              point: true,
              polygon: true,
              line: true,
              circle: true,
              rect: true,
              delete: true,
            },
          });
          scene.addControl(drawControl);

        

        const imageLayer = new PointLayer({
          zIndex: 2
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
          .size(20);

        //设备名称图层点击效果
        imageLayer.on('click', (e) => {
          console.log(e);
          const popup = new Popup({
            offsets: [0, 0],
            closeButton: true,
          })
            .setLnglat(e.lngLat)
            .setHTML(`<span>设备编号: ${e.feature.id}</span></br><span>种类: ${e.feature.assettype}</span></br><span>状态: ${e.feature.status}</span></br><span>压力: ${e.feature.pressure}</span></br><span>温度: ${e.feature.temperature}</span></br><span>流量: ${e.feature.flow}</span>`);
          scene.addPopup(popup);
        });

        scene.addLayer(imageLayer);
      });


      


      const popup = new Popup({
        offsets: [ 0, 20 ]
      }).setText('报警：xx监测点压力异常！');

      var el = document.createElement('img');
      el.type = "image";
      el.src = "/warning1.gif";
      el.width="50";
      el.height="50";

      // const marker = new L7.Marker({
      //   element: el,
      // }).setLnglat([data[i].x * 1, data[i].y]);

// el.className = 'labelclass';
// el.textContent = data[i].v;
// el.style.background = getColor(data[i].v);
//报警

      const marker = new Marker({element: el}).setLnglat([ 120.171151990288507, 30.235276483959943 ]).setPopup(popup);
      scene.addMarker(marker);

    // const layer = new PolygonLayer({});
    // layer
    //   .source(await response.json())
    //   .size('name', [0, 10000, 50000, 30000, 100000])
    //   .color('name', [
    //     '#2E8AE6',
    //     '#69D1AB',
    //     '#DAF291',
    //     '#FFD591',
    //     '#FF7A45',
    //     '#CF1D49',
    //   ])
    //   .shape('fill')
    //   .style({
    //     opacity: 0.8,
    //   });

    // scene.addLayer(layer);
    //scene.addLayer(ditu, 'states');
    this.scene = scene;



  }
  
  onAdd() {
    console.log(123);
  }

  onColor(xx) {

console.log(pipLine);
    pipLine.color('red');  

    // this.setState({
    //   pipLineConfig: {color:"#664A98"}
    //  },()=>{
    //    console.log(this.state.pipLineConfig);

    //  })

    

  //  this.state.pipLineConfig.color
    //console.log(pipLine);
  }

  onaaaa() {}

  //渲染
  render() {






    return (
      <Layout className="full-layout page">
        <Content>
          <Toolbar>
            <Button
              type="primary2"
              className="toolbar-item"
              icon="plus"
              onClick={this.onAdd}
            >
              新增
            </Button>
            <Button
              type="primary2"
              className="toolbar-item"
              icon="plus"
              // onClick={this.onColor()}
              onClick={(n) => {
                this.onColor('1111222333');
              }}
            >
              换色
            </Button>
          </Toolbar>

          <div
            id="map"
            style={{
              position: 'absolute',
              top: 80,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        </Content>
      </Layout>
    );
  }
}
