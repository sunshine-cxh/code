import React from 'react'
import Layout from 'components/Layout'
import Iframe from 'components/Iframe'

export default class Index extends React.Component {

  render() {
    return (
      <Layout>
        <Iframe src="/html/supplyHtml/规范及政策.html" />
      </Layout>
    )
  }
}
