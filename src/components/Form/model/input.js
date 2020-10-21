/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-04-23 15:20:50
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-05-15 11:57:23
 */
import React from 'react'
import { Input } from 'antd'
import $$ from 'cmn-utils'
const { TextArea } = Input
/**
 * 文本框元件
 */
export default ({
  form,
  name,
  formFieldOptions = {},
  record,
  initialValue,
  normalize,
  rules,
  onChange,
  type,
  preview,
  placeholder,
  getPopupContainer,
  setIdToName,
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

  if (preview) {
    if (type === 'hidden') return null
    return <div style={otherProps.style}>{initval || ''}</div>
  }

  // 如果有rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules
  }

  // 如果需要onChange
  if (typeof onChange === 'function') {
    formFieldOptions.onChange = (e) => onChange(form, e.target.value, e, record) // form, value, event
  }

  const Comp = type === 'textarea' ? TextArea : Input

  delete otherProps.render

  const props = {
    autoComplete: 'off',
    type,
    disabled: type === 'disabled',
    placeholder: placeholder || `${otherProps.title}`,
    ...otherProps,
  }
  if (type === 'textarea') {
    props.autoSize = { minRows: 2, maxRows: 6 }
  }

  name = setIdToName && record.id ? `${record.id}${name}` : name

  return getFieldDecorator(name, formFieldOptions)(<Comp {...props} />)
}
