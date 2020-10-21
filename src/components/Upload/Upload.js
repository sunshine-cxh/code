/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-14 12:21:09
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-04-29 16:50:49
 */
import React from 'react';
import { Upload } from 'antd';
import $$ from 'cmn-utils';
import config from '@/config';
import './index.less'
// 从全局配置里获取参数
const request = config.request || {};

/**
 * 使Upload可以走全局代理，并可携带全局头部信息
 */
export default class extends React.PureComponent {
  render() {
    const { headers, action, ...otherProps } = this.props;

    let newheaders = { ...headers };

    const uploadProps = { ...otherProps };

    if (request && request.withHeaders) {
      if ($$.isFunction(request.withHeaders)) {
        newheaders = { ...request.withHeaders(), ...newheaders };
      } else if ($$.isObject(request.withHeaders)) {
        newheaders = { ...request.withHeaders, ...newheaders };
      }
      uploadProps.headers = newheaders;
    }

    let nextURL = (request.prefix || '') + action;
    if (/^(http|https|ftp):\/\//.test(action)) {
      nextURL = action;
    }

    if (action) {
      uploadProps.action = nextURL;
    }
    return <Upload {...uploadProps} />;
  }
}
