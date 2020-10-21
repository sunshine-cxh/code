import React, { Component } from 'react';
import { Tabs } from 'antd';

import './style/index.less';

export default class extends Component {
  constructor(props) {
    super(props);

    this.changeHandler = this.changeHandler.bind(this);
  }

  static defaultProps = {
    type: 'card',
  };


  changeHandler(val) {
    this.props.onChange(val);
  }


  render() {
    const { children, type, ...otherProps } = this.props;

    // 判断 children 对象是否是单个还是多个
    let newChildrens = children
    if (!Array.isArray(children)) {
      newChildrens = [children]
    }

    return (
      <div className="card-container">
        <Tabs type={type} onChange={this.changeHandler} {...otherProps}>
          {newChildrens.map(item => (
            <Tabs.TabPane tab={item.props.tab} key={item.key}>
              {item}
            </Tabs.TabPane>
          ))
          }
        </Tabs>
      </div>
    )
  }
};
