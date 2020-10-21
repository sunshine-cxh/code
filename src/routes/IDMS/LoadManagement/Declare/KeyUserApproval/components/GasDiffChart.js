/*
 * @Descripttion : 重点用户-用气量对比图
 * @Author       : caojiarong
 * @Date         : 2020-08-28 08:59:12
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-09-03 15:34:29
 */
import React from "react"
import G2 from 'components/Charts/G2'
import { connect } from 'dva'
import DataSet from "@antv/data-set"
import Radio from 'components/Radio'
import DatePicker from 'components/DatePicker'
import './index.less'
import Button from 'components/Button'
import {getFilterName, filterColumns} from './columns'
const {
  Charts,
  Geom,
  Axis,
  Tooltip,
  Legend,
} = G2
const data = [
  {
    'name': "批复量",
    "车坊门站": 18.9,
    "常熟站": 28.8,
    "东桥门站": 39.3,
    "用直站": 81.4,
    '坝基桥站': 47,
    "王家庄站": 20.3,
    "福运站": 24,
    "龙翔站": 35.6
  },
  {
    'name': "申请量",
    "车坊门站": 18.9,
    "常熟站": 28.8,
    "东桥门站": 39.3,
    "用直站": 81.4,
    '坝基桥站': 47,
    "王家庄站": 20.3,
    "福运站": 24,
    "龙翔站": 35.6
  },
  {
    'name': "使用量对比",
    "车坊门站": 18.9,
    "常熟站": 28.8,
    "东桥门站": 39.3,
    "用直站": 81.4,
    '坝基桥站': 47,
    "王家庄站": 20.3,
    "福运站": 24,
    "龙翔站": 35.6
  }
];
@connect(({ keyUserApproval, loading }) => ({
  keyUserApproval,
}))
export default class GasDiffChart extends React.Component {
  state={
    value:1
  }
  onChange = e => {
    let { dispatch } = this.props
    dispatch({
      type:'keyUserApproval/getHistoryData',
      payload:{
        id:e
      }
    })
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    let {historyData }=this.props.keyUserApproval
    let data = historyData.comparisonChart || []
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields: getFilterName(data, 'name'),
      // 展开字段集
      key: "月份",
      // key字段
      value: "月均降雨量" // value字段
    });
    return (
      <div style={{height:520}}>
        <h3 style={{fontWeight:'bold'}}>批复量、申请量、使用量对比</h3>
        {/* <div className='data-part'> */}
          {/* <label>选择时间</label>
          <DatePicker className='date-range' type={'range'} width="100%" placeholder="盘点日期" />
          <Button
            type="primary2" className="toolbar-item"
            icon="search">
              查询
          </Button> */}
        {/* </div> */}
        <Radio.Group style={{float:'right'}} onChange={this.onChange} value={this.state.value}>
          <Radio value={1}>昨天</Radio>
          <Radio value={2}>三天前</Radio>
          <Radio value={3}>上周</Radio>
          <Radio value={4}>上个月</Radio>
        </Radio.Group>
        
        <Charts height={400} data={dv} forceFit>
          <Axis name="月份" />
          <Axis name="月均降雨量" />
          <Legend />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="interval"
            position="月份*月均降雨量"
            color={"name"}
            adjust={[
              {
                type: "dodge",
                marginRatio: 0
              }
            ]}
          />
        </Charts>
      </div>
    );
  }
}