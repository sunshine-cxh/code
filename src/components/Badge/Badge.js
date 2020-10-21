/*
 * @Descripttion : 徽标数组件：一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理
 * @Author       : wuhaidong
 * @Date         : 2020-02-24 10:52:46
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-03-19 12:11:55
 */
import React, { Component } from 'react';
import { Badge } from 'antd';
import './style/index.less';
export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { children, ...otherProps } = this.props;

    return (
      <Badge {...otherProps}>
        {children}
      </Badge>
    );
  }
}
