import React from 'react';
import { Radio, Switch } from 'antd';
import $$ from 'cmn-utils';
const RadioGroup = Radio.Group;
/**
 * switch开关
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
  buttonStyle,
  getPopupContainer,
  preview,
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

  // 预览视图
  if (preview) {
    const dictObj = dict.filter(item => item.code === initval)[0];
    let text = '';
    if (dictObj) {
      text = dictObj.codeName;
    }
    return <div style={otherProps.style}>{text}</div>;
  }

  // 如果有rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules;
  }

  // 如果需要onChange
  if (typeof onChange === 'function') {
    formFieldOptions.onChange = (checked, e) =>
      onChange(checked, e.target.value ? 1 : 0); // form, value
  }

  const props = {
    defaultChecked: !!initialValue,
    ...otherProps
  };

  if (getPopupContainer) {
    props.getPopupContainer = getPopupContainer;
  }else {
    //默认渲染到 body上
    props.getPopupContainer = (node) => {
      if (node) {
        return node.parentNode;
      }
      return document.body;
    }
  }

  name = setIdToName && record.id ? `${record.id}${name}` : name
  return getFieldDecorator(
    name,
    formFieldOptions
  )(<Switch {...props}></Switch>);
};
