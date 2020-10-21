/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-04-23 15:20:50
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-05-27 11:39:40
 */
import React from 'react'
import { TreeSelect } from 'antd'
import $$ from 'cmn-utils'

/**
 * 下拉树菜单元件
 */
export const TreeSelectForm = ({
  form,
  name,
  formFieldOptions = {},
  children,
  record,
  initialValue,
  normalize,
  rules,
  onChange,
  getPopupContainer,
  placeholder,
  setIdToName,
  ...otherProps
}) => {
  // --
  const { getFieldDecorator } = form

  let initval = initialValue

  if (record) {
    initval = record[name]
  }

  // 如果存在初始值
  if (initval !== null && typeof initval !== 'undefined') {
    if ($$.isFunction(normalize)) {
      formFieldOptions.initialValue = normalize(initval)
    } else {
      formFieldOptions.initialValue = initval
    }
  }

  // 如果有rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules
  }

  // 如果需要onChange
  if (typeof onChange === 'function') {
    formFieldOptions.onChange = (value, label, extra) =>
      onChange(form, value, label, extra) // form, value
  }

  const props = {
    treeDefaultExpandAll: true,
    showSearch: true,
    dropdownStyle:{maxHeight: '60vh'},
    treeNodeFilterProp: 'title',
    placeholder: placeholder || `选择${otherProps.title}`,
    ...otherProps,
  }

  if (getPopupContainer) {
    props.getPopupContainer = getPopupContainer
  } else {
    //默认渲染到 body上
    props.getPopupContainer = (node) => {
      if (node) {
        return node.parentNode
      }
      return document.body
    }
  }

  name = setIdToName && record.id ? `${record.id}${name}` : name

  return getFieldDecorator(name, formFieldOptions)(<TreeSelect {...props} />)
}

export default TreeSelectForm
