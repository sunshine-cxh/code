import React, { Component } from 'react';
import { Table } from 'antd';

import './style/index.less';

export default class extends Component {
  render() {

    return (
      <div className="antui-table">
        <Table {...this.props} size="small"></Table>
      </div>
    )
  }
};
