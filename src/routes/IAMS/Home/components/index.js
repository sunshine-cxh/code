/*
 * @Descripttion : 后台管理首页
 * @Author       : wuhaidong
 * @Date         : 2020-02-09 10:11:37
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-03-26 10:32:59
 */
import React from 'react';
import { connect } from 'dva';
import { Form, Select, Layout, Row, Col, Input } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Button from 'components/Button';
import Panel from 'components/Panel';
import DataTable from 'components/DataTable';
import G2 from 'components/Charts/G2';
import DataSet from '@antv/data-set';
import { columns1, columns2, columns3, columns4 } from './columns';
import './index.less';
const { Content } = Layout;
const Pagination = DataTable.Pagination;
const { Charts, Axis, Geom, Tooltip, Legend, Coord, Guide } = G2;

let data = {
  pageNum: 1,
  pageSize: 10,
  size: 0,
  total: 92,
  totalPages: 6
};
let list = [];
for (let i = 0; i < 5; i++) {
  let item = {
    id: i + 1,
    sort: i + 1,
    name: '用户' + i,
    used: 12929 + i,
    declare: 12999 + i
  };
  list.push(item);
}

data = {
  ...data,
  list
};

@connect(({ home, loading }) => ({
  home
}))
class Home extends BaseComponent {
  state = {
    forecastResult: 69000
  };

  componentDidMount() {}

  handleSubmitForecast = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      let { temperature, strategy } = values;

      this.setState({
        forecastResult: (69000 * strategy * temperature) / 100
      });
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    let { forecastResult } = this.state;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };

    const dataTableProps = {
      // loading,
      columns: columns1,
      rowKey: 'id',
      dataItems: data, //pageData,
      showSizeChanger: false,
      pagination: true,
      isScroll: {x:325},
      onChange: ({ pageNum, pageSize }) => {
        // dispatch({
        //   type: 'masterDataItem/getPageInfo',
        //   payload: {
        //     pageData: pageData.jumpPage(pageNum, pageSize),
        //   }
        // })
      }
    };

    //日曲线图
    let dayDv = new DataSet.View().source(columns2);
    dayDv.transform({
      type: 'fold',
      fields: ['todayForecast', 'lastMonth', 'lastWeek', 'yesterday', 'today'],
      key: 'type',
      value: 'value'
    });
    const dayScale = {
      value: {
        alias: '用气量(万Nm³)' // 数据字段的别名，会影响到轴的标题内容
      },
      moment: {
        range: [0.01, 0.98], //输出数据的范围，默认[0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。
        alias: '时' // 数据字段的别名，会影响到轴的标题内容
      }
    };

    //月柱状态图
    let monthDv = new DataSet.View().source(columns3);
    monthDv.transform({
      type: 'fold',
      fields: ['thisMonth', 'lastMonth', 'lastyear'],
      key: 'type',
      value: 'value'
    });
    const monthScale = {
      value: {
        alias: '用气量(万Nm³)' // 数据字段的别名，会影响到轴的标题内容
      },
      day: {
        range: [0.02, 0.98], //输出数据的范围，默认[0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。
        alias: '日' // 数据字段的别名，会影响到轴的标题内容
      }
    };

    //年曲线图
    let yearDv = new DataSet.View().source(columns4);
    yearDv.transform({
      type: 'fold',
      fields: ['thisYear', 'lastyear', 'beforeYear'],
      key: 'type',
      value: 'value'
    });
    const yearScale = {
      value: {
        alias: '用气量(万Nm³)' // 数据字段的别名，会影响到轴的标题内容
      },
      month: {
        range: [0.01, 0.98], //输出数据的范围，默认[0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。
        alias: '月' // 数据字段的别名，会影响到轴的标题内容
      }
    };

    return (
      <Layout className="full-layout page operate-home-page">
        <Content>
          <Row gutter={[24, { md: 12 }]}>
            <Col md={12}>
              <Panel title="大用户申报" boxShadow height={390}>
                <DataTable {...dataTableProps} />
                {/* <Pagination {...dataTableProps} /> */}
              </Panel>
            </Col>
            <Col md={6}>
              <Panel title="气象预测条件" boxShadow height={390}>
                <div className="forecast-wrap">
                  <Form
                    {...formItemLayout}
                    onSubmit={this.handleSubmitForecast}
                  >
                    <Form.Item label="明日温度">
                      {getFieldDecorator('temperature', {
                        initialValue: 20
                        // rules: [{ required: true, message: '请输入明日温度' }]
                      })(<Input placeholder="请输入温度" suffix="°C" />)}
                    </Form.Item>
                    <Form.Item label="供气策略">
                      {getFieldDecorator('strategy', {
                        initialValue: 1
                      })(
                        <Select>
                          <Select.Option value={1}>正常运营</Select.Option>
                          <Select.Option value={1.5}>增量20%</Select.Option>
                          <Select.Option value={0.5}>减量20%</Select.Option>
                        </Select>
                      )}
                    </Form.Item>
                    <Button
                      type="primary3"
                      htmlType="submit"
                      className="forecast-submit-button"
                    >
                      计算
                    </Button>
                  </Form>
                </div>
              </Panel>
            </Col>

            <Col md={6}>
              <Panel title="预测用气量" boxShadow height={390}>
                <div className="forecast-wrap">
                  <div className="forecast-tips">明日用气量：</div>
                  <div className="forecast-result">
                    <strong>{forecastResult}</strong> <span>万Nm³</span>
                  </div>
                </div>
              </Panel>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Panel
                title="日用用气量趋势表"
                absoluteTitle
                boxShadow
                height={430}
              >
                <div className="chart-y-tips">用气量（万Nm³）</div>
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
                        opacity: 1 // 辅助框的透明度
                      }
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
                      borderRadius: 0
                    }}
                  />
                  {/* Y坐标轴 */}
                  {/* <Axis
                    name="value"
                    title={{
                      // autoRotate: false
                      offset:0, // 设置标题 title 距离坐标轴线的距离
                      textStyle: {
                        fontSize: '14',
                        textAlign: 'center',
                        fill: '#666',
                        rotate: 90 ,
                        top: -50
                      }, // 坐标轴文本属性配置
                      position: 'end' //|| 'center' || 'end', // 标题的位置，**新增**
                    }}
                  /> */}
                  {/* X坐标轴 */}
                  <Axis
                    name="moment"
                    title={{
                      // autoRotate: {Boolean}, // 是否需要自动旋转，默认为 true
                      offset: 16, // 设置标题 title 距离坐标轴线的距离
                      // offsetY: 20,
                      textStyle: {
                        fontSize: '14',
                        textAlign: 'center',
                        fill: '#666',
                        rotate: 0
                      }, // 坐标轴文本属性配置
                      position: 'end' //|| 'center' || 'end', // 标题的位置，**新增**
                    }}
                  />

                  <Legend //图例
                    title={null}
                    position="top-right"
                    offsetY={-60}
                    // offsetX={-70}
                    allowAllCanceled={false}
                    marker="circle"
                    itemFormatter={val => {
                      // val 为每个图例项的文本值
                      switch (val) {
                        case 'todayForecast':
                          return '今天预测用气量';
                        case 'lastMonth':
                          return '上月同期用气量';
                        case 'lastWeek':
                          return '周同期用气量';
                        case 'yesterday':
                          return '昨天用气量';
                        case 'today':
                          return '今天用气量';
                        default:
                          return val;
                      }
                    }}
                  />
                  {/* 几何标记对象，主要用以描述你要画的是什么图形（直方图、折线图、饼状图、区域图）：interval是直方图 */}
                  <Geom
                    type="line"
                    position="moment*value"
                    opacity={1} //透明度
                    color={[
                      'type',
                      type => {
                        switch (type) {
                          case 'todayForecast':
                            return 'rgba(6, 184, 182, 1)';
                          case 'lastMonth':
                            return 'rgba(51, 51, 51, 1)';
                          case 'lastWeek':
                            return 'rgba(37, 153, 215, 1)';
                          case 'yesterday':
                            return 'rgba(15, 32, 75, 1)';
                          case 'today':
                            return 'rgba(10, 110, 184, 1)';
                          default:
                            return 'rgba(10, 110, 184, 1)';
                        }
                      }
                    ]}
                    shape="smooth"
                    size={1}
                  />

                  <Geom
                    type="area"
                    position="moment*value"
                    color={[
                      'type',
                      type => {
                        switch (type) {
                          case 'todayForecast':
                            return 'rgba(6, 184, 182, 0.3)';
                          case 'lastMonth':
                            return 'rgba(51, 51, 51, 0.3)';
                          case 'lastWeek':
                            return 'rgba(37, 153, 215, 0.3)';
                          case 'yesterday':
                            return 'rgba(15, 32, 75, 0.3)';
                          case 'today':
                            return 'rgba(10, 110, 184, 0.3)';
                          default:
                            return 'rgba(10, 110, 184, 0.3)';
                        }
                      }
                    ]}
                    shape="smooth"
                    tooltip={false}
                    size={2}
                  />
                </Charts>
              </Panel>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Panel
                title="月用用气量趋势表"
                absoluteTitle
                boxShadow
                height={430}
              >
                <div className="chart-y-tips">用气量（万Nm³）</div>
                <Charts
                  className="chart-wrap"
                  height={400} //图标高度
                  data={monthDv}
                  scale={monthScale}
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
                        opacity: 1 // 辅助框的透明度
                      }
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
                      borderRadius: 0
                    }}
                  />
                  {/* 坐标轴 */}
                  <Axis
                    name="day"
                    title={{
                      // 坐标轴文本属性配置
                      // autoRotate: {Boolean}, // 是否需要自动旋转，默认为 true
                      offset: 16, // 设置标题 title 距离坐标轴线的距离
                      textStyle: {
                        fontSize: '14',
                        textAlign: 'center',
                        fill: '#666',
                        rotate: 0
                      },
                      position: 'end' // 标题的位置 'center' || 'end'
                    }}
                  />

                  <Legend //图例
                    title={null}
                    position="top-right"
                    offsetY={-60}
                    // offsetX={-70}
                    allowAllCanceled={false}
                    marker="circle"
                    itemFormatter={val => {
                      // val 为每个图例项的文本值
                      switch (val) {
                        case 'thisMonth':
                          return '本月每日用气量';
                        case 'lastMonth':
                          return '上月每日用气量';
                        case 'lastyear':
                          return '去年同期';
                        default:
                          return val;
                      }
                    }}
                  />
                  <Geom
                    type="interval" //分组柱状图
                    adjust={[
                      {
                        type: 'dodge',
                        marginRatio: 1 / 16 // 数值范围为 0 至 1，用于调整分组中各个柱子的间距
                      }
                    ]}
                    position="day*value" //位置属性的映射 X*Y
                    color={[
                      'type',
                      type => {
                        switch (type) {
                          case 'thisMonth':
                            return 'rgba(15,32,75,1)';
                          case 'lastMonth':
                            return 'rgba(30,114,185,1)';
                          case 'lastyear':
                            return 'rgba(52,182,234,1)';
                          default:
                            return 'rgba(52,182,234,1)';
                        }
                      }
                    ]}
                    shape="smooth"
                  />
                </Charts>
              </Panel>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Panel
                title="年用用气量趋势表"
                absoluteTitle
                boxShadow
                height={430}
              >
                <div className="chart-y-tips">用气量（万Nm³）</div>
                <Charts
                  className="chart-wrap"
                  height={400} //图标高度
                  data={yearDv}
                  scale={yearScale}
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
                        opacity: 1 // 辅助框的透明度
                      }
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
                      borderRadius: 0
                    }}
                  />

                  {/* X坐标轴 */}
                  <Axis
                    name="month"
                    title={{
                      // autoRotate: {Boolean}, // 是否需要自动旋转，默认为 true
                      offset: 16, // 设置标题 title 距离坐标轴线的距离
                      textStyle: {
                        fontSize: '14',
                        textAlign: 'center',
                        fill: '#666',
                        rotate: 0
                      }, // 坐标轴文本属性配置
                      position: 'end'
                    }}
                  />

                  <Legend //图例
                    title={null}
                    position="top-right"
                    offsetY={-60}
                    allowAllCanceled={false}
                    marker="circle"
                    itemFormatter={val => {
                      // val 为每个图例项的文本值
                      switch (val) {
                        case 'thisYear':
                          return '本年每月用气量';
                        case 'lastyear':
                          return '去年每月用气量';
                        case 'beforeYear':
                          return '前年每月用气量';
                        default:
                          return val;
                      }
                    }}
                  />
                  {/* 几何标记对象，主要用以描述你要画的是什么图形（直方图、折线图、饼状图、区域图）：interval是直方图 */}
                  <Geom
                    type="line"
                    position="month*value"
                    opacity={1} //透明度
                    color={[
                      'type',
                      type => {
                        switch (type) {
                          case 'thisYear':
                            return 'rgba(15,32,75, 1)';
                          case 'lastyear':
                            return 'rgba(30,114,185, 1)';
                          case 'beforeYear':
                            return 'rgba(52,182,234, 1)';
                          default:
                            return 'rgba(10, 110, 184, 1)';
                        }
                      }
                    ]}
                    shape="smooth"
                    size={1}
                  />

                  <Geom
                    type="area"
                    position="month*value"
                    color={[
                      'type',
                      type => {
                        switch (type) {
                          case 'thisYear':
                            return 'rgba(15,32,75, 0.3)';
                          case 'lastyear':
                            return 'rgba(30,114,185, 0.3)';
                          case 'beforeYear':
                            return 'rgba(52,182,234, 0.3)';
                          default:
                            return 'rgba(10, 110, 184, 0.3)';
                        }
                      }
                    ]}
                    shape="smooth"
                    tooltip={false}
                    size={2}
                  />
                </Charts>
              </Panel>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default Form.create()(Home);
