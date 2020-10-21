/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-14 12:21:09
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-04-23 14:42:42
 */
import React from 'react';
import { InputNumber } from 'antd';
import $$ from 'cmn-utils';
/**
 * 数字输入框元件
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
  preview,
  placeholder,
  getPopupContainer,
  type,
  setIdToName,
  ...otherProps
}) => {
  const { getFieldDecorator } = form;

  let initval = initialValue;

  if (record) {
    initval = record[name];
  }

  // 如果存在初始值
  if (initval !== null && typeof initval !== 'undefined') {
    if ($$.isFunction(normalize)) {
      formFieldOptions.initialValue = normalize(initval);
    } else {
      formFieldOptions.initialValue = initval;
    }
  }

  if (preview) {
    return <div style={otherProps.style}>{initval || ''}</div>;
  }

  // 如果有rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules;
  }

  // 如果需要onChange
  if (typeof onChange === 'function') {
    formFieldOptions.onChange = value => onChange(form, value, record); // form, value, event
  }

  delete otherProps.render;

  const props = {
    placeholder: placeholder || `${otherProps.title}`,
    ...otherProps
  };

  name = setIdToName && record.id ? `${record.id}${name}` : name

  return getFieldDecorator(name, formFieldOptions)(<InputNumber {...props} />);
};
