import React, { Component } from 'react'
import { connect } from 'dva'
import Layout from 'components/Layout'
import Panel from 'components/Panel'

import './index.less'

@connect(({ operationHome, loading }) => ({
  operationHome,
  loading: loading.models.operationHome,
}))
export default class extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  render() {
    return (
      <Layout className="operation-home">
        <Panel haeder={null}>首页</Panel>
      </Layout>
    )
  }
}
