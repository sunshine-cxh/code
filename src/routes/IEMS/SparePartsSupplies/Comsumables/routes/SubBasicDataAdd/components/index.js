/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-11 15:29:42
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-31 14:25:59
 */

import React from 'react'
import { connect } from 'dva'

import { Layout, Form } from 'antd'
import Panel from 'components/Panel'
import Button from 'components/Button'
import BasicInfos from './BasicInfos'
import BaseComponent from 'components/BaseComponent'
import { Link, routerRedux } from 'dva/router'
import PageHelper from 'utils/pageHelper'
import UploadFile from './UploadFile'
import UploadImage from './UploadImage'
import SubPageLayout from 'components/SubPageLayout'
import qs from 'query-string';
import '../style/index.less'
import { routesPrefix } from '../../../../../config'

@connect(({ basicDataAdd, loading, basicData }) => ({
  basicDataAdd,
  loading: loading.models.basicDataAdd,
  basicData
}))

export default class extends BaseComponent {
  componentDidMount(){
    let { dispatch, location } = this.props

    let searchObj = qs.parse(location.search)
    dispatch({
      type: 'basicDataAdd/init',
      payload: {
        id: searchObj.id,
        success: () => {},
      },
    })
  }
  handleSave = () => {
    const { dispatch, basicDataAdd: { details } } = this.props
    let { validateFields, getFieldsValue } = this.form.props.form
    dispatch({
      type: 'basicDataAdd/@change',
      payload: {
        basicInfos: getFieldsValue(),
      }
    })
    validateFields((err, values)=> {
      if(!err){
        dispatch({
          type: 'basicDataAdd/save',
          payload: {
            id: details.id,
            status,
            success: ()=> {
              // 路由跳转
              dispatch(routerRedux.push({
                pathname: `${routesPrefix}/Comsumables`
              })) 
              dispatch({
                type: 'basicData/getPageInfo',
                payload: {
                  pageData: PageHelper.create().jumpPage()
                }
              })  
            }
          }
        })
      }
    })
  }
  
  render() {
    return (
      <SubPageLayout>
          <Panel header={null}>
              <BasicInfos  wrappedComponentRef={(form) => this.form = form} />
          </Panel>
          <Panel header={null}>
              <UploadImage></UploadImage>
          </Panel>
          <Panel header={null}>
              <UploadFile></UploadFile>
          </Panel>
          <section className="footer-wrap">
            <Link to={`${routesPrefix}/Comsumables`}>
              <Button type="primary3">返回</Button>
            </Link>
            <Button type="primary3" onClick={this.handleSave}>提交</Button>
          </section>
      </SubPageLayout>
    )
  }
}