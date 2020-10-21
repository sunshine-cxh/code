/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-17 09:11:49
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-07-10 14:32:09
 */
import React from 'react'
import { Select } from 'antd'
import $$ from 'cmn-utils'
/**
 * 下拉菜单元件
 */
export default ({
  form,
  name,
  dict = [],
  formFieldOptions = {},
  record,
  initialValue,
  rules,
  onChange,
  normalize,
  getPopupContainer,
  placeholder,
  preview,
  setIdToName,
  showSearch,
  ...otherProps
}) => {
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

  // 预览视图
  if (preview) {
    const _initval = $$.isArray(initval) ? initval : [initval]
    const dictObj = dict.filter((item) => _initval.indexOf(item.code) !== -1)
    let text = ''
    if (dictObj.length) {
      text = dictObj.map((item) => item.codeName).join(',')
    }
    return <div style={otherProps.style}>{text}</div>
  }

  // 如果有rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules
  }

  // 如果需要onChange
  if (typeof onChange === 'function') {
    formFieldOptions.onChange = (value) => onChange(form, value, record) // form, value
  }

  const props = {
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
  if(showSearch) {
    props.showSearch = showSearch
    props.optionFilterProp = 'children'
  }
  name = setIdToName && record.id ? `${record.id}${name}` : name

  return getFieldDecorator(
    name,
    formFieldOptions
  )(
    <Select {...props}>
      {dict.map((dic, i) => (
        <Select.Option key={dic.code} value={dic.code} title={dic.codeName}>
          {dic.codeName}
        </Select.Option>
      ))}
    </Select>
  )
}
