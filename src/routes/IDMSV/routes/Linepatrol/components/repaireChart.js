/*
 * @Descripttion : 未维修、隐患图表
 * @Author       : caojiarong
 * @Date         : 2020-07-20 18:00:23
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-30 09:34:31
 */ 

import React from 'react'
import BaseComponent from 'components/BaseComponent'
import G2 from 'components/Charts/G2'
import DataSet from '@antv/data-set'
import './index.less'
const { Charts, Axis, Geom, Tooltip, Legend} = G2

class RepaireChart extends BaseComponent {
  render() {
    let {data}=this.props
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields: ["hiddenState", "constructionState"],
      // 展开字段集
      key: "type",
      // key字段
      value: "value" // value字段
    });
    return (
      <>
        <p className="today-repaire-title">隐患/施工</p>
        <div className='chart-box' style={{height:'85%'}}>
          <Charts data={dv} forceFit>
            <Axis 
              name="type" 
              grid={{
                lineStyle: {
                  lineDash: [0, 0],
                  stroke: "rgba(119, 200, 255, .5)"
                }
              }}
              label={{
                textStyle: {
                  textAlign: 'center', // 文本对齐方向，可取值为： start center end
                  fill: '#77C8FF', // 文本的颜色
                },
                formatter(text, item, index) {
                  let typeName = ''
                  if(text=='hiddenState'){
                    typeName = '隐患'
                  }else if(text=='constructionState'){
                    typeName = '施工'
                  }
                  return typeName
                }
              }}
              tickLine = {null}
              line={{
                stroke: 'rgba(119, 200, 255, .5)',
                fill: 'rgba(119, 200, 255, .5)',
              }}
              
              />
            <Axis 
              name="value" 
              grid={{
                lineStyle: {
                  lineDash: [0, 0],
                  stroke: "rgba(119, 200, 255, .5)"
                }
              }}
              label={{
                textStyle: {
                  textAlign: 'center', // 文本对齐方向，可取值为： start center end
                  fill: '#77C8FF', // 文本的颜色
                }
              }}
            />
            <Legend 
              position='bottom-left'
              marker={'circle'}
              textStyle={{
                fill: '#fff',
              }}
              offsetY={-10}

              itemFormatter={(val) => {
                let newName = ''
                if(val=='completeCount'){
                  newName = '已处理'
                }else if(val=='processingCount'){
                  newName = '处理中'
                }else if(val=='unCompleteCount'){
                  newName = '未处理'
                }
                return newName
              }}
              
             />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom
              type="interval"
              position="type*value"
              size={20}
              adjust={[
                {
                  type: "dodge",
                }
              ]}
              color={["name",(name)=>{
                if (name =='completeCount') {
                  return 'rgb(28, 75, 251)'
                }else if (name =='processingCount') {
                  return 'rgb(51, 212, 236)'
                }else if (name =='unCompleteCount') {
                  return '#E71DFB'
                }
              }]}

              tooltip={['type*value*name', (type,value,name)=>{ // array
                let typeName = ''
                if(type=='hiddenState'){
                  typeName = '隐患'
                }else if(type=='constructionState'){
                  typeName = '施工'
                }

                let newName = ''
                if(name=='completeCount'){
                  newName = '已处理'
                }else if(name=='processingCount'){
                  newName = '处理中'
                }else if(name=='unCompleteCount'){
                  newName = '未处理'
                }

                return {
                  title: typeName,
                  name: newName+'：' ,
                  value
                }
              }]}
              
            />
          </Charts>
        </div>
      </>
    );
  }
}

export default RepaireChart