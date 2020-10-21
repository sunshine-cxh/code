import React from 'react'
import { connect } from 'dva'
import { Layout } from 'antd'
import BaseComponent from 'components/BaseComponent'
import './index.less'
import { Link, Switch } from 'dva/router'
const { Content, Header } = Layout

@connect(({ geographyHome, loading }) => ({
  geographyHome,
  loading: loading.models.geographyHome
}))
export default class extends BaseComponent {
  render() {
    let { routerData, geographyHome } = this.props;
    let { childRoutes } = routerData;
    let { isCurrentRoute } = geographyHome
    return (
      <Layout className="full-layout page">

        {isCurrentRoute ?
          <Link className="" to="/geography/home/subRoute">
            二级跳转
          </Link>
          : null}

        <Content>
          <Switch>{childRoutes}</Switch>
        </Content>
      </Layout>
    )
  }
}
