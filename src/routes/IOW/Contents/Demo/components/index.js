import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
import './index.less';
import style from './index.module.less';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout demo-page">
        <Content className="demo-class">demo</Content>
        <Content className={style.demoClassName}>demo</Content>
      </Layout>
    );
  }
}
