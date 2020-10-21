import { Scene, PolygonLayer } from '@antv/l7';
import { GaodeMap  } from '@antv/l7-maps';
import * as React from 'react';

export default class GaodeExample extends React.Component {

  componentWillUnmount() {
    this.scene.destroy();
  }

  async componentDidMount() {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/basement_prod/d2e0e930-fd44-4fca-8872-c1037b0fee7b.json',
    );
    const scene = new Scene({
      id: 'map',
      map: new GaodeMap ({
        center: [110.19382669582967, 50.258134],
        pitch: 0,
        style: 'dark',
        zoom: 3,
        token: 'pg.xxx', // 高德或者 Mapbox 的 token
      }),
    });
    const layer = new PolygonLayer({});

    layer
      .source(await response.json())
      .size('name', [0, 10000, 50000, 30000, 100000])
      .color('name', [
        '#2E8AE6',
        '#69D1AB',
        '#DAF291',
        '#FFD591',
        '#FF7A45',
        '#CF1D49',
      ])
      .shape('fill')
      .style({
        opacity: 0.8,
      });
    scene.addLayer(layer);
    this.scene = scene;
  }

  render() {
    return (
      <div
        id="map"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    );
  }
}