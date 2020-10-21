/*
 * @Descripttion : Search
 * @Author       : wuhaidong
 * @Date         : 2020-02-25 12:03:29
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-03-19 15:18:08
 */
import React from 'react';
import { Input } from 'antd';
import cx from 'classnames';
import './style/index.less';

export default class extends React.Component {

  static defaultProps = {
    prefixCls: 'antui-search',
    width: 340,
  };

  render() {
    const { prefixCls, className, width, onSearch, placeholder, ...otherProps } = this.props;

    return (
      <div className={cx(prefixCls, className)}>
        <Input.Search
          allowClear
          placeholder={placeholder}
          style={{ width:width }}
          suffix={<div className="line"></div>}
          onSearch={onSearch}
          {...otherProps}
        />
      </div>
    );
  }
}
