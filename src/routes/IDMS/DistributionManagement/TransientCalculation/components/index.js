/*
 * @Descripttion : 瞬态工况分析
 * @Author       : wuhaidong
 * @Date         : 2020-02-09 10:11:37
 * @LastEditors  : gujitao
 * @LastEditTime : 2020-09-08 17:08:07
 */
import React from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import Layout from 'components/Layout'
import BaseComponent from 'components/BaseComponent'
import Panel from 'components/Panel'
import Select from 'components/Select'
import Button from 'components/Button'
import Toolbar from 'components/Toolbar'
import { createColumns } from './columns'
import { data, tableData } from './data'
import format from 'utils/format'
import DataTable, { Editable } from 'components/DataTable'
import DataSet from '@antv/data-set'
import G2 from 'components/Charts/G2'
const { Charts, Axis, Geom, Tooltip, Legend, Coord, Guide, View } = G2
import { notice } from 'components/Notification'
import Checkbox from 'components/Checkbox'
import ResultDataTable from './resultDataTable'
const CheckGroup = Checkbox.Group

import './index.less'

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
}

@connect(({ TransientCalculation, loading }) => ({
  TransientCalculation,
}))
class TransientCalculation extends BaseComponent {
  state = {
    value: 1,
    tabsActiveKeyKey: '',
    toolbarSelectorValue: 1,
    qiyuanSelectorValue: 3643,
    guestSelectorValue: 3241,
    data: data,
    resultState: false,
    editingKey: null,
    tableData: tableData,
    checkboxSelectedKeys: [0, 1, 2],
  }

  componentDidMount() {
    // this.props.dispatch({
    //   type: 'TransientCalculation/transientAnalysis',
    // })
  }

  // 功能管理编辑
  handleFunctionEdit = (record) => {
    this.setState({ editingKey: record.time })
  }

  // 功能管理编辑保存
  handleFunctionSave = (record, form) => {
    form.validateFields((err, values) => {
      if (!err) {
        let { tableData } = this.state
        for (let i = 0; i < tableData.length; i++) {
          if (tableData[i].time == record.time) {
            tableData[i].flow = values.flow
          }
        }
        this.setState({ editingKey: null, tableData: tableData })
      }
    })
  }

  //checkbox out
  checkGroupChange = (value) => {
    this.setState({
      checkboxSelectedKeys: value.sort(),
      resultState: false,
    })
  }

  render() {
    let {
      toolbarSelectorValue,
      qiyuanSelectorValue,
      guestSelectorValue,
      tabsActiveKeyKey,
      data: { SGSolverGateStationList, SGSolverGuestList },
      resultState,
      editingKey,
      tableData,
      checkboxSelectedKeys,
    } = this.state

    let {
      TransientCalculation: {
        analysisState,
        resultData,
        linepackData,
        resultSeletorValue,
        flowAndPressureData,
      },
      dispatch,
    } = this.props

    let moduleList = [
      { code: 0, codeName: '深圳燃气模型A' },
      { code: 1, codeName: '深圳燃气模型B' },
      { code: 2, codeName: '深圳燃气模型C' },
    ]

    //选择列表
    let selectProps = {
      options: [
        { code: 1, codeName: '深圳燃气模型' },
        { code: 2, codeName: '东莞燃气模型' },
        { code: 3, codeName: '广州燃气模型' },
      ],
      value: toolbarSelectorValue,
      allowClear: false,
      placeholder: '请选择模型',
      onChange: (value, option) => {
        this.setState({
          toolbarSelectorValue: value,
        })
      },
    }

    let selectQiyuanProps = {
      options: format.selectDictFormat(SGSolverGateStationList, 'NodeId', 'NodeName'),
      value: qiyuanSelectorValue,
      allowClear: false,
      placeholder: '请选择模型',
      onChange: (value, option) => {
        this.setState({
          qiyuanSelectorValue: value,
        })
      },
    }

    let selectGuestProps = {
      options: format.selectDictFormat(SGSolverGuestList, 'NodeId', 'NodeName'),
      value: guestSelectorValue,
      allowClear: false,
      placeholder: '请选择模型',
      onChange: (value, option) => {
        this.setState({
          guestSelectorValue: value,
        })
      },
    }

    let selectResultProps = {
      options: format.selectDictFormat(resultData, 'NodeId', 'NodeName'),
      value: resultSeletorValue,
      allowClear: false,
      placeholder: '请选择节点',
      onChange: (value, option) => {
        let SGSolverProfileList = []
        for (let i = 0; i < resultData.length; i++) {
          if (resultData[i].NodeId === value) {
            SGSolverProfileList = resultData[i].SGSolverProfileList[0].NodeProfileList
          }
        }
        dispatch({
          type: 'TransientCalculation/@change',
          payload: {
            resultSeletorValue: value,
          },
        })
        dispatch({
          type: 'TransientCalculation/@change',
          payload: {
            flowAndPressureData: SGSolverProfileList,
          },
        })
      },
    }

    let functionTableProps = {
      showNum: true,
      columns: createColumns(this, { editingKey }),
      rowKey: 'time',
      dataItems: {
        list: tableData,
      },
      isScroll: { x: 690 },
    }

    //剖面图
    let dayDv = new DataSet.View().source(tableData)
    dayDv.transform({
      type: 'fold',
      fields: ['flow'], //['todayForecast', 'lastMonth', 'lastWeek', 'yesterday', 'today'],
      key: 'type',
      value: 'value',
    })
    const dayScale = {
      value: {
        alias: '流量(sm^3/hr)', // 数据字段的别名，会影响到轴的标题内容
      },
      time: {
        range: [0, 1], //输出数据的范围，默认[0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。
        // alias: '时', // 数据字段的别名，会影响到轴的标题内容
      },
    }

    //流量/压力
    let flowAndPressureDv = new DataSet.View().source(flowAndPressureData)
    flowAndPressureDv.transform({
      type: 'fold',
      fields: ['NodeFlowProfileFlow', 'NodeProfilePressure'],
      key: 'type',
      value: 'value',
    })
    const flowAndPressurScale = {
      NodeFlowProfileFlow: {
        alias: '流量(sm^3/hr)', // 数据字段的别名，会影响到轴的标题内容
      },
      NodeProfilePressure: {
        alias: '压力KPa',
      },
      NodeProfileTime: {
        range: [0, 1], //输出数据的范围，默认[0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。
        // alias: '时', // 数据字段的别名，会影响到轴的标题内容
        // tickInterval:100,
        // type:"linear",
        tickCount: 24,
      },
    }

    //热值
    let calorificDv = new DataSet.View().source(flowAndPressureData)
    calorificDv.transform({
      type: 'fold',
      fields: ['NodeProfileCalorific'],
      key: 'type',
      value: 'value',
    })
    const calorificScale = {
      NodeProfileCalorific: {
        alias: '热值(MJ)', // 数据字段的别名，会影响到轴的标题内容
      },
      NodeProfileTime: {
        range: [0, 1], //输出数据的范围，默认[0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。
        // alias: '时', // 数据字段的别名，会影响到轴的标题内容
        // tickInterval:100,
        // type:"linear",
        tickCount: 24,
      },
    }

    //C1 C2 曲线
    let C1AndC2Dv = new DataSet.View().source(flowAndPressureData)
    C1AndC2Dv.transform({
      type: 'fold',
      fields: ['C1', 'C2'],
      key: 'type',
      value: 'value',
    })
    const C1AndC2Scale = {
      C1: {
        alias: 'C1(%)', // 数据字段的别名，会影响到轴的标题内容
      },
      C2: {
        alias: 'C2(%)',
      },
      NodeProfileTime: {
        range: [0, 1], //输出数据的范围，默认[0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。
        // alias: '时', // 数据字段的别名，会影响到轴的标题内容
        // tickInterval:100,
        // type:"linear",
        tickCount: 24,
      },
    }

    //管存图
    let custodyDv = new DataSet.View().source(linepackData)
    custodyDv.transform({
      type: 'fold',
      fields: ['SystemLinepackValue'],
      key: 'type',
      value: 'value',
    })
    const custodyScale = {
      SystemLinepackValue: {
        alias: '管存(sm3)', // 数据字段的别名，会影响到轴的标题内容
      },
      SystemLinepackTime: {
        range: [0, 1], //输出数据的范围，默认[0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。
        // alias: '时', // 数据字段的别名，会影响到轴的标题内容
        tickCount: 24,
      },
    }

    return (
      <Layout className="TransientCalculation-page">
        <Panel header={null}>
          <div className="flexbox flex-align-items-center">
            <span className="selector-title">模型</span>
            {/* <Select {...selectProps} /> */}

            <CheckGroup
              className="checkgroup"
              // defaultValue={[1, 2, 3]}
              value={checkboxSelectedKeys}
              onChange={this.checkGroupChange}
            >
              {moduleList.map((item, index) => {
                return (
                  <Checkbox key={index} value={item.code}>
                    {item.codeName}
                  </Checkbox>
                )
              })}
            </CheckGroup>
          </div>

          <div
            className="flexbox flex-align-items-center"
            style={{ marginTop: 30, marginBottom: 10 }}
          >
            <Toolbar>
              <span className="selector-title">气源</span>
              <Select {...selectQiyuanProps} />
              <Button
                type="primary2"
                className="toolbar-item"
                onClick={() => {
                  setTimeout(() => {
                    notice.success('操作成功')
                  }, 1000)
                }}
              >
                更新模型
              </Button>
            </Toolbar>
          </div>
          <div className="box-wrap flexbox">
            <div className="table-wrap">
              <Editable {...functionTableProps} />
            </div>
            <div className="chart-wrap">
              <Row>
                <Col>
                  <Panel
                    title="剖面图"
                    absoluteTitle
                    // allowControls
                    boxShadow
                    height={430}
                  >
                    {/* <div className="chart-y-tips">用气量（万Nm³）</div> */}
                    <Charts
                      className="chart-wrap"
                      height={400} //图标高度
                      data={dayDv}
                      scale={dayScale}
                      forceFit //加这个属性宽度自适应
                      theme="default" //主题
                      placeholder //图表source为空时显示的内容 默认
                    >
                      {/* 鼠标hover的时候，提示框显示的值 */}
                      <Tooltip
                        crosshairs={{
                          type: 'y', // 可选值：rect、x、y、cross，分别对应辅助框、平行x轴辅助线、平行y轴辅助线，十字辅助线
                          lineStyle: {
                            stroke: '#fff', // 辅助框颜色
                            lineWidth: 1, //辅助线宽度，单位为px
                            opacity: 1, // 辅助框的透明度
                          },
                        }} //用以设置tooltip的辅助线和辅助框
                        offset={50}
                        g2-tooltip={{
                          //提示框样式
                          position: 'absolute',
                          visibility: 'hidden',
                          backgroundColor: '#1E72B9',
                          color: '#fff',
                          padding: '5px 15px',
                          transition: 'top 200ms,left 200ms',
                          boxShadow: 0,
                          borderRadius: 0,
                        }}
                      />
                      {/* Y坐标轴 */}
                      <Axis
                        name="value"
                        title={{
                          // autoRotate: false,
                          // offset: 30, // 设置标题 title 距离坐标轴线的距离
                          textStyle: {
                            fontSize: '14',
                            textAlign: 'center',
                            fill: '#666',
                            // rotate: 90,
                            // top: -50,
                          }, // 坐标轴文本属性配置
                          position: 'center', //|| 'center' || 'end', // 标题的位置，**新增**
                        }}
                      />
                      {/* X坐标轴 */}
                      <Axis
                        name="时间"
                        title={{
                          autoRotate: false, // 是否需要自动旋转，默认为 true
                          // offset: 16, // 设置标题 title 距离坐标轴线的距离
                          // offsetY: 20,
                          textStyle: {
                            fontSize: '14',
                            textAlign: 'center',
                            fill: '#666',
                            // rotate: 0,
                          }, // 坐标轴文本属性配置
                          position: 'center', //|| 'center' || 'end', // 标题的位置，**新增**
                        }}
                      />

                      <Legend //图例
                        title={null}
                        position="top-right"
                        offsetY={-54}
                        offsetX={-60}
                        allowAllCanceled={false}
                        marker="circle"
                        itemFormatter={(val) => {
                          // val 为每个图例项的文本值
                          switch (val) {
                            case 'flow':
                              return '流量'
                            default:
                              return val
                          }
                        }}
                      />
                      {/* 几何标记对象，主要用以描述你要画的是什么图形（直方图、折线图、饼状图、区域图）：interval是直方图 */}
                      <Geom
                        type="line"
                        position="time*value"
                        opacity={1} //透明度
                        color="type"
                        shape="smooth"
                        size={1}
                      />

                      <Geom
                        type="point"
                        position="time*value"
                        size={4}
                        shape={'circle'}
                        style={{ stroke: '#fff', lineWidth: 1 }}
                        color="type"
                      />
                    </Charts>
                  </Panel>
                </Col>
              </Row>
            </div>
          </div>
          <div
            className="flexbox flex-align-items-center"
            style={{ marginTop: 30, marginBottom: 10 }}
          >
            <Toolbar>
              <span className="selector-title">用户</span>
              <Select {...selectGuestProps} />
              <Button
                type="primary2"
                className="toolbar-item"
                onClick={() => {
                  setTimeout(() => {
                    notice.success('操作成功')
                  }, 1000)
                }}
              >
                更新模型
              </Button>
            </Toolbar>
          </div>

          <div className="box-wrap flexbox">
            <div className="table-wrap">
              <Editable {...functionTableProps} />
            </div>
            <div className="chart-wrap">
              <Row>
                <Col>
                  <Panel
                    title="剖面图"
                    absoluteTitle
                    // allowControls
                    boxShadow
                    height={430}
                  >
                    {/* <div className="chart-y-tips">用气量（万Nm³）</div> */}
                    <Charts
                      className="chart-wrap"
                      height={400} //图标高度
                      data={dayDv}
                      scale={dayScale}
                      forceFit //加这个属性宽度自适应
                      theme="default" //主题
                      placeholder //图表source为空时显示的内容 默认
                    >
                      {/* 鼠标hover的时候，提示框显示的值 */}
                      <Tooltip
                        crosshairs={{
                          type: 'y', // 可选值：rect、x、y、cross，分别对应辅助框、平行x轴辅助线、平行y轴辅助线，十字辅助线
                          lineStyle: {
                            stroke: '#fff', // 辅助框颜色
                            lineWidth: 1, //辅助线宽度，单位为px
                            opacity: 1, // 辅助框的透明度
                          },
                        }} //用以设置tooltip的辅助线和辅助框
                        offset={50}
                        g2-tooltip={{
                          //提示框样式
                          position: 'absolute',
                          visibility: 'hidden',
                          backgroundColor: '#1E72B9',
                          color: '#fff',
                          padding: '5px 15px',
                          transition: 'top 200ms,left 200ms',
                          boxShadow: 0,
                          borderRadius: 0,
                        }}
                      />
                      {/* Y坐标轴 */}
                      <Axis
                        name="value"
                        title={{
                          // autoRotate: false,
                          // offset: 30, // 设置标题 title 距离坐标轴线的距离
                          textStyle: {
                            fontSize: '14',
                            textAlign: 'center',
                            fill: '#666',
                            // rotate: 90,
                            // top: -50,
                          }, // 坐标轴文本属性配置
                          position: 'center', //|| 'center' || 'end', // 标题的位置，**新增**
                        }}
                      />
                      {/* X坐标轴 */}
                      <Axis
                        // name="time"
                        title={{
                          // autoRotate: {Boolean}, // 是否需要自动旋转，默认为 true
                          offset: 16, // 设置标题 title 距离坐标轴线的距离
                          // offsetY: 20,
                          textStyle: {
                            fontSize: '14',
                            textAlign: 'center',
                            fill: '#666',
                            rotate: 0,
                          }, // 坐标轴文本属性配置
                          position: 'end', //|| 'center' || 'end', // 标题的位置，**新增**
                        }}
                      />

                      <Legend //图例
                        title={null}
                        position="top-right"
                        offsetY={-54}
                        offsetX={-60}
                        allowAllCanceled={false}
                        marker="circle"
                        itemFormatter={(val) => {
                          // val 为每个图例项的文本值
                          switch (val) {
                            case 'flow':
                              return '流量'
                            default:
                              return val
                          }
                        }}
                      />
                      {/* 几何标记对象，主要用以描述你要画的是什么图形（直方图、折线图、饼状图、区域图）：interval是直方图 */}
                      <Geom
                        type="line"
                        position="time*value"
                        opacity={1} //透明度
                        color="type"
                        shape="smooth"
                        size={1}
                      />

                      <Geom
                        type="point"
                        position="time*value"
                        size={4}
                        shape={'circle'}
                        style={{ stroke: '#fff', lineWidth: 1 }}
                        color="type"
                      />
                    </Charts>
                  </Panel>
                </Col>
              </Row>
            </div>
          </div>

          <div
            className="flexbox flex-justify-content-center submit-wrap"
            style={{ marginTop: 40 }}
          >
            <Button
              type="primary3"
              onClick={() => {
                dispatch({
                  type: 'TransientCalculation/@change',
                  payload: {
                    analysisState: true,
                  },
                })

                setTimeout(() => {
                  dispatch({
                    type: 'TransientCalculation/transientAnalysis',
                  })

                  dispatch({
                    type: 'TransientCalculation/@change',
                    payload: {
                      analysisState: true,
                    },
                  })
                  notice.success('操作成功')
                }, 4000)
              }}
            >
              {analysisState ? '分析中...' : '瞬态工况分析'}
            </Button>
          </div>
        </Panel>

        {resultData.length > 0 && (
          <div>
            <Panel title="分析方案">
              <ResultDataTable checkboxSelectedKeys={checkboxSelectedKeys} />
            </Panel>
            <Panel title="最优结果展示">
              <div
                className="flexbox flex-align-items-center"
                style={{ marginTop: 30, marginBottom: 10 }}
              >
                <Toolbar>
                  <span className="selector-title">节点</span>
                  <Select {...selectResultProps} />
                </Toolbar>
              </div>

              {/* 流量/压力曲线图 */}
              <div className="chart-wrap">
                <Row>
                  <Col>
                    <Panel
                      title="流量/压力曲线图"
                      // absoluteTitle
                      // allowControls
                      boxShadow
                      height={430}
                    >
                      <Charts
                        className="chart-wrap"
                        height={400} //图标高度
                        data={flowAndPressureDv}
                        scale={flowAndPressurScale}
                        forceFit //加这个属性宽度自适应
                        theme="default" //主题
                        placeholder //图表source为空时显示的内容 默认
                      >
                        {/* 鼠标hover的时候，提示框显示的值 */}
                        <Tooltip
                          crosshairs={{
                            type: 'y', // 可选值：rect、x、y、cross，分别对应辅助框、平行x轴辅助线、平行y轴辅助线，十字辅助线
                            lineStyle: {
                              stroke: '#fff', // 辅助框颜色
                              lineWidth: 1, //辅助线宽度，单位为px
                              opacity: 1, // 辅助框的透明度
                            },
                          }} //用以设置tooltip的辅助线和辅助框
                          offset={50}
                          g2-tooltip={{
                            //提示框样式
                            position: 'absolute',
                            visibility: 'hidden',
                            backgroundColor: '#1E72B9',
                            color: '#fff',
                            padding: '5px 15px',
                            transition: 'top 200ms,left 200ms',
                            boxShadow: 0,
                            borderRadius: 0,
                          }}
                        />

                        <Legend />

                        <Legend //图例
                          title={null}
                          position="bottom-center"
                          offsetY={-54}
                          offsetX={-60}
                          allowAllCanceled={false}
                          marker="circle"
                          itemFormatter={(val) => {
                            // val 为每个图例项的文本值
                            switch (val) {
                              case 'NodeFlowProfileFlow':
                                return '流量'
                              case 'NodeProfilePressure':
                                return '压力'
                              default:
                                return val
                            }
                          }}
                        />

                        {/* 几何标记对象，主要用以描述你要画的是什么图形（直方图、折线图、饼状图、区域图）：interval是直方图 */}

                        <View data={flowAndPressureData}>
                          <Axis
                            name="NodeFlowProfileFlow"
                            position="left"
                            title={{
                              // autoRotate: false,
                              // offset: 30, // 设置标题 title 距离坐标轴线的距离
                              textStyle: {
                                fontSize: '14',
                                textAlign: 'center',
                                fill: '#333',
                                // rotate: 90,
                                // top: -50,
                              }, // 坐标轴文本属性配置
                              position: 'right', //|| 'center' || 'end', // 标题的位置，**新增**
                            }}
                          />
                          <Geom
                            type="line"
                            position="NodeProfileTime*NodeFlowProfileFlow"
                            opacity={1} //透明度
                            shape="smooth"
                            size={1}
                            color={[
                              'type',
                              (type) => {
                                switch (type) {
                                  case 'NodeFlowProfileFlow':
                                    return 'rgba(103,194,58,1)'
                                  default:
                                    return 'rgba(103,194,58,1)'
                                }
                              },
                            ]}
                          />
                        </View>

                        {/* 右边轴 */}
                        <View data={flowAndPressureData}>
                          <Axis
                            name="NodeProfilePressure"
                            position="right"
                            title={{
                              // autoRotate: false,
                              // offset: 30, // 设置标题 title 距离坐标轴线的距离
                              textStyle: {
                                fontSize: '14',
                                textAlign: 'center',
                                fill: '#333',
                                // rotate: 90,
                                // top: -50,
                              }, // 坐标轴文本属性配置
                              position: 'right', //|| 'center' || 'end', // 标题的位置，**新增**
                            }}
                          />
                          <Geom
                            type="line"
                            position="NodeProfileTime*NodeProfilePressure"
                            opacity={1} //透明度
                            shape="smooth"
                            size={2}
                            color={[
                              'type',
                              (type) => {
                                switch (type) {
                                  case 'NodeProfilePressure':
                                    return 'rgba(52,182,234,1)'
                                  default:
                                    return 'rgba(52,182,234,1)'
                                }
                              },
                            ]}
                          />
                        </View>
                      </Charts>
                    </Panel>
                  </Col>
                </Row>
              </div>

              {/* 热值曲线图 */}
              <div className="chart-wrap">
                <Row>
                  <Col>
                    <Panel
                      title="热值曲线图"
                      // absoluteTitle
                      // allowControls
                      boxShadow
                      height={430}
                    >
                      {/* <div className="chart-y-tips">用气量（万Nm³）</div> */}
                      <Charts
                        className="chart-wrap"
                        height={400} //图标高度
                        data={calorificDv}
                        scale={calorificScale}
                        forceFit //加这个属性宽度自适应
                        theme="default" //主题
                        placeholder //图表source为空时显示的内容 默认
                      >
                        {/* 鼠标hover的时候，提示框显示的值 */}
                        <Tooltip
                          crosshairs={{
                            type: 'y', // 可选值：rect、x、y、cross，分别对应辅助框、平行x轴辅助线、平行y轴辅助线，十字辅助线
                            lineStyle: {
                              stroke: '#fff', // 辅助框颜色
                              lineWidth: 1, //辅助线宽度，单位为px
                              opacity: 1, // 辅助框的透明度
                            },
                          }} //用以设置tooltip的辅助线和辅助框
                          offset={50}
                          g2-tooltip={{
                            //提示框样式
                            position: 'absolute',
                            visibility: 'hidden',
                            backgroundColor: '#1E72B9',
                            color: '#fff',
                            padding: '5px 15px',
                            transition: 'top 200ms,left 200ms',
                            boxShadow: 0,
                            borderRadius: 0,
                          }}
                        />

                        <View data={flowAndPressureData}>
                          <Axis
                            name="NodeProfileCalorific"
                            position="left"
                            title={{
                              // autoRotate: false,
                              // offset: 30, // 设置标题 title 距离坐标轴线的距离
                              textStyle: {
                                fontSize: '14',
                                textAlign: 'center',
                                fill: '#333',
                                // rotate: 90,
                                // top: -50,
                              }, // 坐标轴文本属性配置
                              position: 'right', //|| 'center' || 'end', // 标题的位置，**新增**
                            }}
                          />
                          <Geom
                            type="line"
                            position="NodeProfileTime*NodeProfileCalorific"
                            opacity={1} //透明度
                            shape="smooth"
                            size={1}
                            color={[
                              'type',
                              (type) => {
                                switch (type) {
                                  case 'NodeProfileCalorific':
                                    return 'rgba(82,196,26,1)'
                                  default:
                                    return 'rgba(230,162,60,1)'
                                }
                              },
                            ]}
                          />
                        </View>
                      </Charts>
                    </Panel>
                  </Col>
                </Row>
              </div>

              {/* C1、C2曲线图 */}
              <div className="chart-wrap">
                <Row>
                  <Col>
                    <Panel
                      title="组分曲线图"
                      // absoluteTitle
                      // allowControls
                      boxShadow
                      height={430}
                    >
                      <Charts
                        className="chart-wrap"
                        height={400} //图标高度
                        data={C1AndC2Dv}
                        scale={C1AndC2Scale}
                        forceFit //加这个属性宽度自适应
                        theme="default" //主题
                        placeholder //图表source为空时显示的内容 默认
                      >
                        {/* 鼠标hover的时候，提示框显示的值 */}
                        <Tooltip
                          crosshairs={{
                            type: 'y', // 可选值：rect、x、y、cross，分别对应辅助框、平行x轴辅助线、平行y轴辅助线，十字辅助线
                            lineStyle: {
                              stroke: '#fff', // 辅助框颜色
                              lineWidth: 1, //辅助线宽度，单位为px
                              opacity: 1, // 辅助框的透明度
                            },
                          }} //用以设置tooltip的辅助线和辅助框
                          offset={50}
                          g2-tooltip={{
                            //提示框样式
                            position: 'absolute',
                            visibility: 'hidden',
                            backgroundColor: '#1E72B9',
                            color: '#fff',
                            padding: '5px 15px',
                            transition: 'top 200ms,left 200ms',
                            boxShadow: 0,
                            borderRadius: 0,
                          }}
                        />

                        {/* <Legend /> */}

                        <Legend //图例
                          title={null}
                          position="bottom-center"
                          offsetY={-54}
                          offsetX={-60}
                          allowAllCanceled={false}
                          marker="circle"
                          itemFormatter={(val) => {
                            // val 为每个图例项的文本值
                            switch (val) {
                              case 'C1':
                                return '流量'
                              case 'C2':
                                return '压力'
                              default:
                                return val
                            }
                          }}
                        />

                        {/* 几何标记对象，主要用以描述你要画的是什么图形（直方图、折线图、饼状图、区域图）：interval是直方图 */}

                        <View data={flowAndPressureData}>
                          <Axis
                            name="C1"
                            position="left"
                            title={{
                              // autoRotate: false,
                              // offset: 30, // 设置标题 title 距离坐标轴线的距离
                              textStyle: {
                                fontSize: '14',
                                textAlign: 'center',
                                fill: '#333',
                                // rotate: 90,
                                // top: -50,
                              }, // 坐标轴文本属性配置
                              position: 'right', //|| 'center' || 'end', // 标题的位置，**新增**
                            }}
                          />
                          <Geom
                            type="line"
                            position="NodeProfileTime*C1"
                            opacity={1} //透明度
                            shape="smooth"
                            size={1}
                            color={[
                              'type',
                              (type) => {
                                switch (type) {
                                  case 'C1':
                                    return 'rgba(103,194,58,1)'
                                  default:
                                    return 'rgba(103,194,58,1)'
                                }
                              },
                            ]}
                          />
                          
                        </View>

                        {/* 右边轴 */}
                        <View data={flowAndPressureData}>
                          <Axis
                            name="C2"
                            position="right"
                            title={{
                              // autoRotate: false,
                              // offset: 30, // 设置标题 title 距离坐标轴线的距离
                              textStyle: {
                                fontSize: '14',
                                textAlign: 'center',
                                fill: '#333',
                                // rotate: 90,
                                // top: -50,
                              }, // 坐标轴文本属性配置
                              position: 'right', //|| 'center' || 'end', // 标题的位置，**新增**
                            }}
                          />
                          <Geom
                            type="line"
                            position="NodeProfileTime*C2"
                            opacity={1} //透明度
                            shape="smooth"
                            size={2}
                            color={[
                              'type',
                              (type) => {
                                switch (type) {
                                  case 'NodeProfilePressure':
                                    return 'rgba(52,182,234,1)'
                                  default:
                                    return 'rgba(52,182,234,1)'
                                }
                              },
                            ]}
                          />
                        </View>
                      </Charts>
                    </Panel>
                  </Col>
                </Row>
              </div>

              {/* 管存图 */}
              <div className="chart-wrap">
                <Row>
                  <Col>
                    <Panel
                      title="管存曲线图"
                      // absoluteTitle
                      // allowControls
                      boxShadow
                      height={430}
                    >
                      {/* <div className="chart-y-tips">用气量（万Nm³）</div> */}
                      <Charts
                        className="chart-wrap"
                        height={400} //图标高度
                        data={custodyDv}
                        scale={custodyScale}
                        forceFit //加这个属性宽度自适应
                        theme="default" //主题
                        placeholder //图表source为空时显示的内容 默认
                      >
                        {/* 鼠标hover的时候，提示框显示的值 */}
                        <Tooltip
                          crosshairs={{
                            type: 'y', // 可选值：rect、x、y、cross，分别对应辅助框、平行x轴辅助线、平行y轴辅助线，十字辅助线
                            lineStyle: {
                              stroke: '#fff', // 辅助框颜色
                              lineWidth: 1, //辅助线宽度，单位为px
                              opacity: 1, // 辅助框的透明度
                            },
                          }} //用以设置tooltip的辅助线和辅助框
                          offset={50}
                          g2-tooltip={{
                            //提示框样式
                            position: 'absolute',
                            visibility: 'hidden',
                            backgroundColor: '#1E72B9',
                            color: '#fff',
                            padding: '5px 15px',
                            transition: 'top 200ms,left 200ms',
                            boxShadow: 0,
                            borderRadius: 0,
                          }}
                        />

                        <View data={linepackData}>
                          <Axis
                            name="SystemLinepackValue"
                            position="left"
                            title={{
                              // autoRotate: false,
                              // offset: 30, // 设置标题 title 距离坐标轴线的距离
                              textStyle: {
                                fontSize: '14',
                                textAlign: 'center',
                                fill: '#333',
                                // rotate: 90,
                                // top: -50,
                              }, // 坐标轴文本属性配置
                              position: 'right', //|| 'center' || 'end', // 标题的位置，**新增**
                            }}
                          />
                          <Geom
                            type="line"
                            position="SystemLinepackTime*SystemLinepackValue"
                            opacity={1} //透明度
                            shape="smooth"
                            size={1}
                            color={[
                              'type',
                              (type) => {
                                switch (type) {
                                  case 'SystemLinepackValue':
                                    return 'rgba(230,162,60,1)'
                                  default:
                                    return 'rgba(230,162,60,1)'
                                }
                              },
                            ]}
                          />
                        </View>
                      </Charts>
                    </Panel>
                  </Col>
                </Row>
              </div>
            </Panel>
          </div>
        )}
      </Layout>
    )
  }
}

export default TransientCalculation
