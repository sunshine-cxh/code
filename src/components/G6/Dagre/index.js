/*
 * @Descripttion : G6  流程图
 * @Author       : hezihua
 * @Date         : 2020-05-09 08:33:04
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-05-09 11:41:56
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types';
import G6 from '@antv/g6'
import './index.less'



export default class extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  }
  componentDidMount(){
    let { data, id} = this.props
    G6.registerNode(
      'sql',
      {
        drawShape(cfg, group) {
          const rect = group.addShape('rect', {
            attrs: {
              x: -75,
              y: -25,
              width: 150,
              height: 50,
              radius: 10,
              stroke: '#5B8FF9',
              fill: '#C6E5FF',
              lineWidth: 3,
            },
            name: 'rect-shape',
          });
          if (cfg.name) {
            group.addShape('text', {
              attrs: {
                text: cfg.name,
                x: 0,
                y: 0,
                fill: '#00287E',
                fontSize: 14,
                textAlign: 'center',
                textBaseline: 'middle',
                fontWeight: 'bold',
              },
              name: 'text-shape',
            });
          }
          return rect;
        },
      },
      'single-node',
    );
    
    const width = 300;
    const height = 800;
    const graph = new G6.Graph({
      container: id,
      width,
      height,
      layout: {
        type: 'dagre',
        nodesepFunc: d => {
          if (d.id === '3') {
            return 500;
          }
          return 50;
        },
        ranksep: 70,
        controlPoints: true
      },
      defaultNode: {
        type: 'sql',
      },
      defaultEdge: {
        type: 'polyline',
        style: {
          radius: 20,
          offset: 45,
          endArrow: true,
          lineWidth: 2,
          stroke: '#C2C8D5',
        },
      },
      nodeStateStyles: {
        selected: {
          stroke: '#d9d9d9',
          fill: '#5394ef',
        }
      },
      modes: {
        default: [
          'drag-canvas',
          'zoom-canvas',
          'click-select',
          {
            type: 'tooltip',
            formatText(model) {
              const cfg = model.conf;
              const text = [];
              cfg.forEach(row => {
                text.push(row.label + ':' + row.value + '<br>');
              });
              return text.join('\n');
            },
            offset: 30
          },
        ],
      },
      fitView: true,
    });
    graph.data(data);
    graph.render();
  }
  render (){
    let { id } = this.props
    return (
      <div id={ id }></div>
    )
  }
}