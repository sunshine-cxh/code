import React, { Component } from 'react';
import Icon from '../Icon';
import cx from 'classnames';
import CSSAnimate from '../CSSAnimate';
import { Popconfirm, Modal } from 'antd';
import './style/index.less';
const confirm = Modal.confirm;
const noop = _ => {};
/**
 * 面板组件
 */
class Panel extends Component {
  static defaultProps = {
    prefix: 'antui-panel',
    allowControls: false
  };

  constructor(props) {
    super(props);
    this.state = {
      collapse: props.collapse || false,
      expand: props.expand || false,
      refresh: 0,
      animationName: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    const st = {};
    if ('collapse' in nextProps) {
      st.collapse = true;
    } else if ('expand' in nextProps) {
      st.expand = true;
    }
    if (Object.keys(st).length) {
      this.setState(st);
    }
  }

  onExpand = expand => e => {
    const { onChange } = this.props;

    this.setState({
      expand,
      collapse: false
    });

    if (onChange) {
      onChange({
        expand,
        collapse: false
      });
    }
  };

  onCollapse = collapse => e => {
    const { onChange } = this.props;

    this.setState({
      collapse,
      expand: false
    });

    if (onChange) {
      onChange({
        collapse,
        expand: false
      });
    }
  };

  onRefresh = () => {
    this.setState({
      refresh: this.state.refresh + 1,
      animationName: 'fadeIn'
    });
    this.props.onRefresh && this.props.onRefresh();
  };

  render() {
    const { expand, collapse, refresh, animationName } = this.state;
    const {
      theme,
      prefix,
      className,
      title,
      width,
      height,
      style,
      children,
      header,
      cover,
      scroll,
      boxShadow,
      absoluteTitle,
      allowControls,
    } = this.props;

    const classnames = cx(prefix, className, {
      theme: !!theme,
      'panel-fullscreen': !!expand,
      'panel-collapsed': !!collapse,
      cover: !!cover,
      'panel-shadow': !!boxShadow
    });

    const headerClass = cx(`${prefix}-header`, {
      'absolute-header': !!absoluteTitle,
    });

    const styles = {
      ...style,
      width
    };
    const bodyStyles = {};
    if (!expand) {
      bodyStyles.height = height;
    }
    if (scroll) {
      bodyStyles.overflow = 'auto';
    }

    const Header =
      typeof header === 'undefined' ? (
        <div className={headerClass}>
          <span className={`${prefix}-header-title`}>{title}</span>
          {/* 面板控制功能留用 */}
          {/* <span className={`${prefix}-header-controls`}>
            <a className="panel-control-loader" onClick={this.onRefresh}>
              <Icon type="redo" antd />
            </a>
            <a
              className="panel-control-fullscreen"
              onClick={this.onExpand(expand ? false : true)}
            >
              <Icon
                antd
                type={`${expand ? 'fullscreen-exit' : 'fullscreen'}`}
              />
            </a>
            <a
              className="panel-control-collapsed"
              onClick={this.onCollapse(collapse ? false : true)}
            >
              <Icon antd type={`${collapse ? 'plus' : 'minus'}`} />
            </a>
          </span> */}
        </div>
      ) : (
        header
      );

    const controls = ( allowControls &&
      <div className={`${prefix}-controls`}>
        <span className={`${prefix}-controls-list`}>
            {/* <a className="panel-control-loader" onClick={this.onRefresh}>
              <Icon type="redo" antd />
            </a> */}
            <a
              className="panel-control-fullscreen"
              onClick={this.onExpand(expand ? false : true)}
            >
              <Icon
                antd
                type={`${expand ? 'fullscreen-exit' : 'fullscreen'}`}
              />
            </a>
            {/* <a
              className="panel-control-collapsed"
              onClick={this.onCollapse(collapse ? false : true)}
            >
              <Icon antd type={`${collapse ? 'plus' : 'minus'}`} />
            </a> */}
          </span>
      </div>
    )

    return (
      <div className={classnames} style={styles}>
        {Header}
        {controls}

        <div className={`${prefix}-body`} style={bodyStyles}>
          <CSSAnimate
            className="panel-content"
            type={animationName}
            callback={_ => this.setState({ animationName: '' })}
            key={refresh}
          >
            {children}
          </CSSAnimate>
        </div>
      </div>
    );
  }
}

export default Panel;
