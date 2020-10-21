/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-06-11 10:11:48
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-28 15:52:48
 */

import React, { Component } from 'react'
import { connect } from 'dva'

import { Form } from 'antd'
import TreeSelect from 'components/TreeSelect'
import Select from 'components/Select'
import Checkbox from 'components/Checkbox'
import Radio from 'components/Radio'
import '../style/index.less'
import BaseComponent from 'components/BaseComponent'
import $$ from 'cmn-utils'
import isEqual from 'react-fast-compare'
const { Item } = Form
const createForm = Form.create
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
}

const belongType = [
  {
    code: 1,
    codeName: '气化站',
  },
  {
    code: 2,
    codeName: '用气用户',
  },
]
@connect(({ inventoryAdd, loading, inventory }) => ({
  inventoryAdd,
  loading: loading.models.inventoryAdd,
  inventory,
}))
class BasicInfos extends BaseComponent {
  componentDidUpdate(prevProps) {
    let flag = false
    if (
      !isEqual(
        this.props.inventoryAdd.details.organizationIds,
        prevProps.inventoryAdd.details.organizationIds
      ) ||
      !isEqual(
        this.props.inventoryAdd.details.categoryIds,
        prevProps.inventoryAdd.details.categoryIds
      )
    ) {
      flag = true
    }
    if (flag) {
      let { dispatch } = this.props
      let { details, organizationTree, typeList, locationList } = this.props.inventoryAdd
      let checkboxList = []
      if (details.organizationIds && details.organizationIds.split(',').length > 0) {
        checkboxList.push(1)
      }
      if (details.categoryIds && details.categoryIds.split(',').length > 0) {
        checkboxList.push(3)
      }
      this.setState(
        {
          ...this.state,
          checkboxList,
        },
        () => {
          console.log(this.state)
        }
      )
    }
  }
  state = {
    radioValue: 1,
    checkboxList: [],
  }
  handleCheckboxChange = (checked) => {
    let { setFieldsValue } = this.props.form
    if (checked.length > 0) {
      setFieldsValue({
        scopeType: 3,
      })
    }
  }
  handleRadioChange = (e) => {
    let target = e.target
    let { setFieldsValue } = this.props.form
    if (target.value !== 3) {
      setFieldsValue({
        special: [],
        organizationIds: [],
        categoryIds: [],
      })
    }
  }
  handleBelongChange = (value) => {
    let {
      dispatch,
      form: { setFieldsValue },
    } = this.props
    if (value === 1) {
      dispatch({
        type: 'inventoryAdd/getGasStationList',
      })
    } else if (value === 2) {
      dispatch({
        type: 'inventoryAdd/getGasUserList',
      })
    }
    setFieldsValue({ foreignIds: [] })
  }
  handleTreeSelect = (value, node, extra, type) => {
    let { setFieldsValue } = this.props.form
    let { checkboxList } = this.state

    if (checkboxList.includes(type)) {
      return
    }
    this.setState(
      {
        ...this.state,
        checkboxList: [...checkboxList, type],
      },
      () => {
        setFieldsValue({
          special: this.state.checkboxList,
          scopeType: 3,
        })
      }
    )
  }
  render() {
    let { getFieldDecorator } = this.props.form
    let { details, organizationTree, typeList, locationList, gasList } = this.props.inventoryAdd
    let options = [
      { label: '所有', value: 1 },
      { label: '责任人负责的设备', value: 2 },
      { label: '指定设备', value: 3 },
    ]
    let checkboxStyle = {
      display: 'block',
      height: '50px',
      lineHeight: '50px',
      marginLeft: 0,
      width: '138px',
    }
    details.special = []
    if (details.organizationIds && details.organizationIds.split(',').length > 0) {
      details.special.push(1)
    }
    if (details.categoryIds && details.categoryIds.split(',').length > 0) {
      details.special.push(3)
    }
    return (
      <section className="block-wrap form-wrap inventory-range">
        <div className="header flex-1">
          <div className="title">盘点范围</div>
        </div>
        <Form {...formItemLayout}>
          <Item>
            {getFieldDecorator('scopeType', {
              initialValue: details.scopeType,
            })(<Radio.Group width="100%" options={options} onChange={this.handleRadioChange} />)}
          </Item>
          <Item>
            {getFieldDecorator('special', {
              initialValue: details.special,
            })(
              <Checkbox.Group width="100%" placeholder="备注" onChange={this.handleCheckboxChange}>
                <div style={checkboxStyle}>
                  <Checkbox value={2}>指定设备归属</Checkbox>
                  {getFieldDecorator('foreignType', {
                    initialValue: details.foreignType ? details.foreignType.split(',') : [],
                  })(
                    <Select
                      options={belongType}
                      treeCheckable
                      maxTagCount={3}
                      onSelect={(value, node, extra) => {
                        this.handleTreeSelect(value, node, extra, 2)
                      }}
                      onChange={this.handleBelongChange}
                      className="foreignType"
                    ></Select>
                  )}
                  {getFieldDecorator('foreignIds', {
                    initialValue: details.foreignIds ? details.foreignIds.split(',') : [],
                  })(
                    <Select
                      mode="multiple"
                      options={gasList}
                      treeCheckable
                      maxTagCount={3}
                      onSelect={(value, node, extra) => {
                        this.handleTreeSelect(value, node, extra, 2)
                      }}
                      className="foreignIds"
                    ></Select>
                  )}
                </div>
                <div style={checkboxStyle}>
                  <Checkbox value={1}>指定部门</Checkbox>
                  {getFieldDecorator('organizationIds', {
                    initialValue: details.organizationIds ? details.organizationIds.split(',') : [],
                  })(
                    <TreeSelect
                      treeData={organizationTree}
                      treeCheckable
                      maxTagCount={3}
                      onSelect={(value, node, extra) => {
                        this.handleTreeSelect(value, node, extra, 1)
                      }}
                      onChange={this.handleTreeChange}
                      className="commonSelect"
                    ></TreeSelect>
                  )}
                </div>

                <div style={checkboxStyle}>
                  <Checkbox value={3}>指定类别</Checkbox>
                  {getFieldDecorator('categoryIds', {
                    initialValue: details.categoryIds ? details.categoryIds.split(',') : [],
                  })(
                    <TreeSelect
                      treeData={typeList}
                      treeCheckable
                      maxTagCount={3}
                      onSelect={(value, node, extra) => {
                        this.handleTreeSelect(value, node, extra, 3)
                      }}
                      className="commonSelect"
                    ></TreeSelect>
                  )}
                </div>
              </Checkbox.Group>
            )}
          </Item>
        </Form>
      </section>
    )
  }
}

export default createForm()(BasicInfos)
