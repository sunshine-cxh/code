/*
 * @Descripttion : 新增巡检标准页面
 * @Author       : caojiarong
 * @Date         : 2020-06-02 14:17:09
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-02 15:08:20
 */
import React from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import SubPageLayout from 'components/SubPageLayout'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import OperatorArea from './OperatorArea'
import RelateDevice from './relateDevice'
import BaseComponent from 'components/BaseComponent'
import { Link, routerRedux } from 'dva/router'
import { notice } from 'components/Notification'
import qs from 'query-string'
import '../style/index.less'
import { routesPrefix } from '../../../../../config.js'
import PageHelper from 'utils/pageHelper'
const createForm = Form.create;
import { guid } from 'utils/common'


@connect(({ patrolStandardAdd, loading }) => ({
  patrolStandardAdd,
  loading: loading.models.patrolStandardAdd
}))
class patrolStandardAdd extends BaseComponent {
  constructor(props) {
    super(props)
  }
  state = {
    recordId: ''
  }

  componentDidMount() {
    let { location } = this.props
    let searchObj = qs.parse(location.search)
    let recordId = searchObj.id;
    if (recordId) {
      this.getRecordDetail(recordId)
      this.setState({ recordId })
    }
  }

  // 根据id获取巡检的详情
  getRecordDetail = (recordId) => {
    const { dispatch } = this.props
    dispatch({
      type: 'patrolStandardAdd/getDetail',
      payload: {
        id: recordId,
        success: (details)=> {
          let { patrolStandardAdd: { itemPageData }} = this.props
          let arr = []
          details.standardItemList.forEach((item, index)=> {
            arr.push({
              index,
              name: item,
              id: guid()
            })
          })
          itemPageData.list = arr
          // appPageData.list = details.equipmentList
        }
      }
    })
  }

  handleSubmit = () => {
    const { dispatch, patrolStandardAdd: { itemPageData, appPageData, basicInfos } } = this.props
    let { recordId } = this.state
    let { validateFields, getFieldsValue } = this.form.props.form
    if (itemPageData.list.length < 1) {
      notice.error('点检项目不能为空')
      return
    }
    if (appPageData.list.length < 1 && basicInfos.type == 1) {
      notice.error('请选择关联设备')
      return
    }
    dispatch({
      type: 'patrolStandardAdd/@change',
      payload: {
        recordId,
        basicInfos: getFieldsValue(),
      }
    })

    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'patrolStandardAdd/save',
          payload: {
            // id: details.id
            success: () => {
              // 路由跳转
              dispatch(routerRedux.push({
                pathname: `${routesPrefix}/patrolStandard`
              }))
              dispatch({
                type: 'patrolStandard/getPageInfo',
                payload: {
                  values: {},
                  pageData: PageHelper.create()
                }
              })
            }
          }
        })
      }
    })
  }

  render() {
    let { details } = this.props.patrolStandardAdd
    return (
      <SubPageLayout>
        <Panel header={null}>
          <BasicInfos wrappedComponentRef={(form) => this.form = form} />
        </Panel>
        {
          details.type == 1 ? <Panel header={null}><RelateDevice /></Panel> : null
        }
        <Panel header={null}>
          <OperatorArea />
        </Panel>
        <section className="footer-wrap">
          <Button type="primary3" onClick={this.handleSubmit}>保存</Button>
          <Link to={`${routesPrefix}/patrolStandard`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

export default createForm()(patrolStandardAdd);