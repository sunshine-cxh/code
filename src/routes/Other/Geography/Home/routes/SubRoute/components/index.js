import React from 'react'
import { connect } from 'dva'
import { Layout } from 'antd'
import BaseComponent from 'components/BaseComponent'
import './index.less'
import { Link } from 'dva/router'

@connect()
export default class extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout page">
        <Link className="" to="/geography/home">
          返回
        </Link>
      </Layout>
    )
  }
}


// import React from 'react';
// import { connect } from 'dva';
// import { Layout } from 'antd';
// import BaseComponent from 'components/BaseComponent';
// import './index.less';
// const { Content } = Layout;

// @connect()
// export default class extends BaseComponent {
//   render() {
//     return (
//       <Layout className="full-layout page level2-route-page">
//         <Content>
//           <h2>二级路由</h2> 
//         </Content>
//       </Layout>
//     );
//   }
// }


