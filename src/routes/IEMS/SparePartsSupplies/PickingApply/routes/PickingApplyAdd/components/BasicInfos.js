/*
 * @Descripttion : 领料申请新建页基本信息
 * @Author       : caojiarong
 * @Date         : 2020-04-19 14:14:07
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-06 14:36:22
 */
import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import Input from 'components/Input'
import Select from 'components/Select'
import ApplyList from './applyList'
import '../style/apply.less'
import CusBtn from 'components/CusBtn'
import { notice } from 'components/Notification'
import Approval from './Approval'
const { Item } = Form
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  }
}

let createForm = Form.create()
@connect(({ pickingApplyAdd, loading }) => ({
  pickingApplyAdd,
  loading: loading.models.pickingApplyAdd
}))
class pickingApplyAdd extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    visible: false,
    userName: JSON.parse(window.localStorage.getItem('user')).userName,
    pickType: '',  //conserve:养护  service:维修类型
    approvalVisible: false,
  }

  componentWillMount() {
    const { dispatch } = this.props

    dispatch({
      type: 'pickingApplyAdd/getFlowwork',
      payload: {}
    })

    this.props.dispatch({
      type: 'pickingApplyAdd/getPickingTypeList',
    })
  }

  // 改变领料申请选择的展示状态
  changeVisible = (visible) => {

    let { pickType } = this.state
    let {pickingApplyAdd:{basicInfos}}=this.props
    const { dispatch, pickingApplyAdd: { applyDataList } } = this.props
    if (visible == false) {
      this.setState({
        visible
      })
      return
    }
    // if (pickType == 'service' || pickType == 'conserve') {
    //   dispatch({
    //     type: 'pickingApplyAdd/getRelateList',
    //     payload: {
    //       keyWord: '',
    //       type: pickType,
    //       applyDataList
    //     }
    //   })
    //   this.setState({
    //     visible
    //   })
    // } else if (pickType == 'other') {
    //   notice.error("其他领料类型不能关联单号")
    // } else {
    //   notice.error('请选择领料类型')
    // }
    if (basicInfos.type == 1 || basicInfos.type == 2) {
      dispatch({
        type: 'pickingApplyAdd/getRelateList',
        payload: {
          keyWord: '',
          type,
          applyDataList
        }
      })
      this.setState({
        visible
      })
    } else if (basicInfos.type == 3) {
      notice.error("其他领料类型不能关联单号")
    } else {
      notice.error('请选择领料类型')
    }
  }

  inputChangeHandler(val, key) { //-------------------
    const { pickingApplyAdd: { flowSchemes: { list } }, dispatch, basicInfos } = this.props
    let res = val
    dispatch({
      type: 'pickingApplyAdd/basicInfosChange',
      payload: {
        val: res,
        key
      }
    })
    if (key == 'outInType' && res != '3') {
      dispatch({
        type: 'pickingApplyAdd/basicInfosChange',
        payload: {
          val: undefined,
          key: 'operateId'
        }
      })
    }
  }

  render() {
    const { form,dispatch, pickingApplyAdd: {approvalRow, basicInfos, pickingTypeList, applyRow } } = this.props
    let { pickType,userName } = this.state

    let { getFieldDecorator } = form
    let applyProps = {
      pickType,
      visible: this.state.visible,
      changeVisible: (visible) => {
        this.changeVisible(visible)
      }
    }
    let CusBtnProps = {
      onDelete: (e) => {
        e.stopPropagation()
        dispatch({
          type: 'pickingApplyAdd/@change',
          payload: {
            applyRow: [],
            applyRowKeys: []
          }
        })
      },
      onChangeVisible: (visible) => {
        this.changeVisible(visible)
        // this.setState({
        //   visible
        // })
      },
      list: applyRow,
      keyWord:'code',
      type: 1
    }
    let approvalCusBtnProps = {
      onDelete: (e) => {
        e.stopPropagation()
        dispatch({
          type: 'pickingApplyAdd/@change',
          payload: {
            approvalRow: [],
            approvalRowKeys: [],
            approvalRowLocal: [],
            approvalRowKeysLocal: [],
            flowchartList: [],
          },
        })
      },
      onChangeVisible: (approvalVisible) => {
        this.setState({
          approvalVisible,
        })
      },
      list: approvalRow,
      type: 2,
    }
    let approvalProps = {
      visible: this.state.approvalVisible,
      changeVisible: (approvalVisible) => {
        this.setState({
          approvalVisible,
        })
      },
    }
    return (
      <section className="block-wrap form-wrap">
        <div className="header flex-1">
          <div className="title">基本信息</div>
        </div>
        <Form {...formItemLayout}>
          <Item label="标题">
            {
              getFieldDecorator('title', { 
                rules: [
                  {
                    required: true,
                    message: '请输入标题'
                  }
                ],initialValue: basicInfos.title})
                (<Input
                  width="100%"
                  type='text'
                  placeholder="请输入标题"
                  onChange={e=>{this.inputChangeHandler(e,'title')}}
                  />)
            }
          </Item>
          <Item label="申请人">
            {
              getFieldDecorator('userName', { initialValue: userName})
                (<Input
                  width="100%"
                  disabled />)
            }
          </Item>
          
          <Item label="申请类型">
            {
              getFieldDecorator('type', {
                rules: [
                  {
                    required: true,
                    message: '请选择申请类型'
                  }
                ],
                initialValue: basicInfos.type? ''+basicInfos.type : '1'
              })
                (<Select
                  width="100%" placeholder="请选择申请类型"
                  options={pickingTypeList}
                  onChange={val => {
                    this.inputChangeHandler(val, 'type')
                  }} />)
            }

          </Item>
          <Item label="关联单号">
            <CusBtn {...CusBtnProps} />
          </Item>
          <Item label="审批人">
            <CusBtn {...approvalCusBtnProps}></CusBtn>
          </Item>
          <Item label="备注">
            {
              getFieldDecorator('remark',{initialValue:basicInfos.remark})
                (<Input
                  type="textarea"
                  placeholder="备注"
                  onChange={val => this.inputChangeHandler(val, 'remark')} />)
            }
          </Item>
        </Form>
        <ApplyList {...applyProps} />
        <Approval {...approvalProps}></Approval>
      </section>
    )
  }
}
export default createForm(pickingApplyAdd)