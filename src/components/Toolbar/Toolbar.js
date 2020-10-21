import React from 'react';
import cx from 'classnames';
import './style/index.less';

export default class Toolbar extends React.Component {
  static propTypes = {};

  static defaultProps = {
    prefixCls: 'antui-toolbar'
  };

  render() {
    const { prefixCls, className, children } = this.props;

    return <div className={cx(prefixCls, className)}>{children}</div>;
  }
}
