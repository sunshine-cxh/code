/*
 * @Descripttion : 基本部局
 * @Author       : wuhaidong
 * @Date         : 2019-12-10 10:09:19
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-08-26 19:08:39
 */
import React from 'react'
import { connect } from 'dva'
import { Layout } from 'antd'
import { Switch, routerRedux } from 'dva/router'
import NavBar from 'components/NavBar'
import { LeftSideBar, RightSideBar } from 'components/SideBar'
import pathToRegexp from 'path-to-regexp'
import isEqual from 'react-fast-compare'
import { enquireIsMobile } from 'utils/enquireScreen'
import './styles/basic.less'
import $$ from 'cmn-utils'
import cx from 'classnames'
const { Content, Header } = Layout
import { accountMenu } from '../routes/Common/config.js'

@connect(({ global }) => ({ global }))
export default class BasicLayout extends React.PureComponent {
  constructor(props, prevProps) {
    super(props, prevProps)

    let theme = $$.getStore('theme', {
      leftSide: 'darkgrey', // 左边
      navbar: 'light', // 顶部
    })
    //获取pathname获取当前访问子系统
    let clients = $$.getStore('clients')
    let currentClientPrefix = this.getCurrentClientPrefix(props.location.pathname)
    let currentClient = {}
    // currentClient = this.getCurrentClient(currentClientPrefix, clients)
    //个人中心、消息通知等路由不切换系统
    if (currentClientPrefix != '/account') {
      currentClient = this.getCurrentClient(currentClientPrefix, clients)
      $$.setStore('preClient', currentClient)
    } else {
      currentClient = $$.getStore('preClient')
      props.dispatch({
        type: 'global/@change',
        payload: {
          flatMenu: accountMenu.personalAffairsSubMenu,
        },
      })
    }

    // if (!theme.layout) {   //动态设置时
    //   theme.layout = [
    //     'fixedHeader',
    //     'fixedSidebar',
    //     'fixedBreadcrumbs',
    //     'tabLayout',
    //     // 'hidedBreadcrumbs', //面包屑
    //   ]
    // }
    theme.layout = ['fixedHeader', 'fixedSidebar', 'fixedBreadcrumbs', 'tabLayout']

    this.state = {
      collapsedLeftSide: false, // 左边栏开关控制
      leftCollapsedWidth: 76, // 左边栏宽度
      showSidebarHeader: false, // 左边栏头部开关
      theme, // 皮肤设置
      currentMenu: {}, //当前菜单/路由
      currentTopMenu: {}, //当前一级菜单
      currentSubMenu: {}, //当前一级菜单下的所有子菜单
      isMobile: false, //是否为移动端
      currentClient, //当前系统
      clients, //系统列表
    }
  }

  componentDidMount() {
    this.checkLoginState()

    this.unregisterEnquire = enquireIsMobile((ismobile) => {
      const { isMobile, theme } = this.state
      if (isMobile !== ismobile) {
        // // 如查是移动端则不固定侧边栏
        // if (ismobile && $$.isArray(theme.layout)) {
        //   theme.layout = theme.layout.filter(item => item !== 'fixedSidebar')
        // }
        this.setState({
          isMobile: ismobile,
        })
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !isEqual(this.props.location.pathname, prevProps.location.pathname) ||
      !isEqual(this.props.global.flatMenu, prevProps.global.flatMenu)
    ) {
      if (this.getCurrentClientPrefix(this.props.location.pathname) === '/account') {
        this.props.dispatch({
          type: 'global/@change',
          payload: {
            flatMenu: accountMenu.personalAffairsSubMenu,
          },
          success: () => {
            this.setState({
              currentMenu: this.getCurrentMenu(this.props) || {},
            })
          },
        })
      }

      let currentTopMenu = this.getCurrentTopMenu(this.props)
      this.setState(
        {
          currentMenu: this.getCurrentMenu(this.props) || {},
          currentTopMenu:
            this.getCurrentClientPrefix(this.props.location.pathname) != '/account'
              ? currentTopMenu
              : accountMenu.personalAffairsTopMenu,
          currentSubMenu:
            this.getCurrentClientPrefix(this.props.location.pathname) != '/account'
              ? currentTopMenu.children
              : accountMenu.personalAffairsSubMenu,
        },
        () => {
          this.getCurrentMenuFunctionAuthority()
        }
      )
    }
  }

  componentWillUnmount() {
    // 清理监听
    this.unregisterEnquire()
  }

  // 检查有户是否登录
  checkLoginState() {
    const user = $$.getStore('user')
    if (!user) {
      this.props.dispatch(routerRedux.replace('/sign/login'))
    } else {
      let currentClientPrefix = this.getCurrentClientPrefix(this.props.location.pathname)
      if (currentClientPrefix != '/account') {
        this.getMenu()
      }
    }
  }

  //获取当前子系统路由前缀
  getCurrentClientPrefix(pathname) {
    return `/${pathname.split('/')[1]}`
  }

  // 获取当前客户端路由
  getMenu() {
    let { currentClient } = this.state

    this.props.dispatch({
      type: 'global/getMenu',
      payload: { ...currentClient },
    })
  }

  //当前一级菜单
  getCurrentTopMenu = (props) => {
    const {
      location: { pathname },
      global: { menu },
    } = props || this.props
    let currentTopMenu = {}
    if (this.getCurrentClientPrefix(pathname) != '/account') {
      let currentMenu = this.getCurrentMenu(this.props)
      if (typeof currentMenu.parentPath != 'undefined') {
        for (let i = 0; i < menu.length; i++) {
          if (menu[i].path === currentMenu.parentPath[0]) {
            currentTopMenu = menu[i]
          }
        }
      }
    }

    return currentTopMenu
  }

  // 当前路由
  getCurrentMenu(props) {
    const {
      location: { pathname },
      global,
    } = props || this.props
    const menu = this.getMeunMatchKeys(global.flatMenu, pathname)[0]

    return menu
  }

  getMeunMatchKeys = (flatMenu, path) => {
    return flatMenu.filter((item) => {
      return pathToRegexp(item.path).test(path)
    })
  }

  //获取当前路由所在系统信息
  getCurrentClient(currentClientPrefix, clients) {
    let currentClient = null
    Array.isArray(clients) &&
      clients.length > 0 &&
      clients.forEach((item) => {
        if (currentClientPrefix === item.url) {
          currentClient = item
        }
      })

    return currentClient
  }

  //获取当前路由功能权限
  getCurrentMenuFunctionAuthority() {
    let { currentMenu, currentClient } = this.state
    let { dispatch } = this.props
    let params = {
      clientId: currentClient && currentClient.id,
      moduleId: currentMenu && currentMenu.id,
    }
    dispatch({
      type: 'global/getFunctionAuthority',
      payload: {
        ...params,
      },
    })
    //获取个人事务未处理项
    dispatch({
      type: 'global/getCheckNumber',
    })
  }

  //顶部左侧菜单图标收缩控制
  onCollapseLeftSide = (_) => {
    const collapsedLeftSide =
      this.state.leftCollapsedWidth === 0 ? true : !this.state.collapsedLeftSide

    this.setState({
      collapsedLeftSide,
      leftCollapsedWidth: 76,
    })
  }

  //完全关闭左边栏，即宽为0
  onCollapseLeftSideAll = (_) => {
    this.setState({
      collapsedLeftSide: true,
      leftCollapsedWidth: 0,
    })
  }

  //切换左边栏中头部的开合
  toggleSidebarHeader = (_) => {
    this.setState({
      showSidebarHeader: !this.state.showSidebarHeader,
    })
  }

  //头部tab切换
  onClickNavTab = (currentTopMenu) => {
    this.setState({
      currentTopMenu: currentTopMenu,
      currentSubMenu: currentTopMenu.children,
    })
  }

  render() {
    const {
      collapsedLeftSide,
      leftCollapsedWidth,
      showSidebarHeader,
      theme,
      currentMenu,

      currentTopMenu,
      currentSubMenu,
      isMobile,
      currentClient,
      clients,
    } = this.state
    const {
      routerData: { childRoutes },
      location,
      global: { menu, flatMenu, user },
    } = this.props
    const classnames = cx('basic-layout', 'full-layout', {
      fixed: theme.layout && theme.layout.indexOf('fixedSidebar') !== -1,
      'fixed-header': theme.layout && theme.layout.indexOf('fixedHeader') !== -1,
      'fixed-breadcrumbs': theme.layout && theme.layout.indexOf('fixedBreadcrumbs') !== -1,
      'hided-breadcrumbs': theme.layout && theme.layout.indexOf('hidedBreadcrumbs') !== -1,
    })

    let subMenu = JSON.stringify(currentSubMenu) != '{}' ? currentSubMenu : []
    return (
      <Layout className={classnames}>
        <Header id="header">
          <NavBar
            collapsed={collapsedLeftSide}
            onCollapseLeftSide={this.onCollapseLeftSide}
            onExpandTopBar={this.onExpandTopBar}
            toggleSidebarHeader={this.toggleSidebarHeader}
            onClickNavTab={this.onClickNavTab}
            theme={theme.navbar}
            user={user}
            isMobile={isMobile}
            location={location}
            systems={clients}
            currentSystem={currentClient}
            flatMenu={flatMenu}
            currentMenu={currentMenu}
            currentTopMenu={currentTopMenu}
            menu={menu}
          />
        </Header>
        <Layout>
          <LeftSideBar
            collapsed={collapsedLeftSide}
            leftCollapsedWidth={leftCollapsedWidth}
            showHeader={showSidebarHeader}
            onCollapse={this.onCollapseLeftSide}
            onCollapseAll={this.onCollapseLeftSideAll}
            onCollapseLeftSide={this.onCollapseLeftSide}
            location={location}
            theme={theme.leftSide}
            flatMenu={flatMenu}
            currentMenu={currentMenu}
            currentTopMenu={currentTopMenu}
            menu={subMenu}
            isMobile={isMobile}
          />
          <Content>
            <Content className="router-page">
              <Switch>{childRoutes}</Switch>
            </Content>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
