/*
 * @Descripttion : 新增养护标准页面
 * @Author       : hezihua
 * @Date         : 2020-06-02 14:17:09
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-09 11:04:56
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
import { guid } from 'utils/common'
const createForm = Form.create;

@connect(({ curingsStandardAdd, loading }) => ({
  curingsStandardAdd,
  loading: loading.models.curingsStandardAdd
}))
class curingsStandardAdd extends BaseComponent {
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

  // 根据id获取养护的详情
  getRecordDetail = (recordId) => {
    const { dispatch } = this.props
    dispatch({
      type: 'curingsStandardAdd/getDetail',
      payload: {
        id: recordId,
        success: (details)=> {
          let {
            curingsStandardAdd: { curingItemPageData },
          } = this.props
          let arr = []
          details.curingItemList.forEach((item, index) => {
            arr.push({
              index,
              name: item,
              id: guid(),
            })
          })
          curingItemPageData.list = arr
        }
      }
    })
  }

  handleSubmit = () => {
    const { dispatch, curingsStandardAdd: { curingItemPageData, appPageData, basicInfos } } = this.props
    let { recordId } = this.state
    let { validateFields, getFieldsValue } = this.form.props.form
    if (curingItemPageData.list.length < 1) {
      notice.error('养护项不能为空')
      return
    }
    if (appPageData.list.length < 1 && basicInfos.type == 1) {
      notice.error('请选择关联设备')
      return
    }
    dispatch({
      type: 'curingsStandardAdd/@change',
      payload: {
        recordId,
        basicInfos: getFieldsValue(),
      }
    })

    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'curingsStandardAdd/save',
          payload: {
            // id: details.id
            success: () => {
              // 路由跳转
              dispatch(routerRedux.push({
                pathname: `${routesPrefix}/curingsStandard`
              }))
              dispatch({
                type: 'curingsStandard/getPageInfo',
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
    let { details } = this.props.curingsStandardAdd
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
          <Link to={`${routesPrefix}/curingsStandard`}>
            <Button type="primary3">返回</Button>
          </Link>
        </section>
      </SubPageLayout>
    )
  }
}

export default createForm()(curingsStandardAdd);