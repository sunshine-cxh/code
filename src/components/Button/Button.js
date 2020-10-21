import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';
import Icon from '../Icon';
import cx from 'classnames';

import './style/index.less';

const ButtonGroup = Button.Group;
/**
 *  Button
 */
export default class extends React.Component {
  static Group = ButtonGroup;

  static propTypes = {
    /**
     * 是否用Tooltip组件显示提示信息
     */
    tooltip: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  };

  static defaultProps = {
    prefixCls: 'antui-button-tooltip',
    display: true
  };

  render() {
    const { tooltip, prefixCls, children, icon, display, ...otherProps } = this.props;

    return tooltip ? (
      <Tooltip
        overlayClassName={prefixCls}
        title={tooltip === true ? otherProps.title : tooltip}
      >
        <Button style={{ display: display ? 'inline-block' : 'none' }} {...otherProps} >
          {icon ? <Icon type={icon} className="button-icon" /> : null}
          {children}
        </Button>
      </Tooltip>
    ) : (
        <Button style={{ display: display ? 'inline-block' : 'none' }} {...otherProps}>
          {icon ? <Icon type={icon} className="button-icon" /> : null}
          {children}
        </Button>
      );
  }
}
