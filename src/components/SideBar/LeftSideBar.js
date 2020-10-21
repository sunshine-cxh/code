/*
 * @Descripttion : 左导航栏
 * @Author       : wuhaidong
 * @Date         : 2019-12-10 10:09:19
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-08-07 16:07:22
 */

import React, { PureComponent } from 'react'
import cx from 'classnames'
import { Menu, Layout, Drawer } from 'antd'
import { Link } from 'dva/router'
import pathToRegexp from 'path-to-regexp'
import Icon from '../Icon'
const { Sider } = Layout
const SubMenu = Menu.SubMenu
import isEqual from 'react-fast-compare'

import './style/index.less'

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = (icon) => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={`sider-menu-item-img`} />
  }
  if (typeof icon === 'string' && icon != '') {
    return <Icon type={icon} />
  }
  return icon
}

export const getMeunMatchKeys = (flatMenu, path) => {
  return flatMenu.filter((item) => {
    return pathToRegexp(item.path).test(path)
  })
}

class LeftSideBar extends PureComponent {
  static defaultProps = {
    fixed: true,
    theme: '',
  }

  constructor(props) {
    super(props)
    this.state = {
      openKeys: props.currentMenu ? props.currentMenu.parentPath : [],
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentMenu.parentPath) {
      prevProps.currentMenu.parentPath.push(Math.random()) //for setState any time
    }
    if (!isEqual(this.props.currentMenu.parentPath, prevProps.currentMenu.parentPath)) {
      this.setState({
        openKeys: this.props.currentMenu.parentPath || [],
      })
    }
  }

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = (item) => {
    const itemPath = this.conversionPath(item.path)
    const icon = getIcon(item.icon)
    const { isMobile, onCollapse } = this.props
    const { target, name } = item
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      )
    }
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === this.props.location.pathname}
        onClick={isMobile ? onCollapse : () => {}}
      >
        {icon}
        <span>{name}</span>
      </Link>
    )
  }

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = (item) => {
    if (item.children && item.children.some((child) => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children)
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  {getIcon(item.icon)}
                  <span>{item.name}</span>
                </span>
              ) : (
                item.name
              )
            }
            key={item.path}
          >
            {childrenItems}
          </SubMenu>
        )
      }
      return null
    } else {
      return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>
    }
  }
  /**
   * 获得菜单子节点
   */
  getNavMenuItems = (menusData) => {
    if (!menusData) {
      return []
    }
    return menusData
      .filter((item) => item.name && !item.hideInMenu)
      .map((item) => {
        const ItemDom = this.getSubMenuOrItem(item)
        return ItemDom
      })
      .filter((item) => item)
  }

  // conversion Path
  // 转化路径
  conversionPath = (path) => {
    if (path && path.indexOf('http') === 0) {
      return path
    } else {
      return `/${path || ''}`.replace(/\/+/g, '/').replace(/\/:\w+\??/, '')
    }
  }

  // Get the currently selected menu
  getSelectedMenuKeys = () => {
    const pathname = this.props.location.pathname
    const selectMenu = getMeunMatchKeys(this.props.flatMenu, pathname)[0]
    return selectMenu ? [selectMenu.path] : []
  }

  isMainMenu = (key) => {
    return this.props.menu.some((item) => key && (item.key === key || item.path === key))
  }

  handleOpenChange = (openKeys) => {
    const lastOpenKey = openKeys[openKeys.length - 1]
    const moreThanOne = openKeys.filter((openKey) => this.isMainMenu(openKey)).length > 1
    this.setState({
      openKeys: moreThanOne ? [lastOpenKey] : [...openKeys],
    })
  }

  render() {
    const {
      fixed,
      theme,
      collapsed,
      onCollapse,
      onCollapseLeftSide,
      onCollapseAll,
      leftCollapsedWidth,
      showHeader,
      menu,
      isMobile,
      flatMenu,
      currentTopMenu,
    } = this.props

    const classnames = cx('sidebar-left', 'sidebar-default', {
      affix: !!fixed,
      'sidebar-left-sm': collapsed,
      'show-header': collapsed ? false : showHeader,
      'sidebar-left-close': leftCollapsedWidth === 0,
      // [theme]: !!theme
    })

    const { openKeys } = this.state
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys()
    // Don't show popup menu when it is been collapsed
    const menuProps = collapsed
      ? {
          selectedKeys,
        }
      : {
          openKeys,
          selectedKeys,
        }

    const siderBar = (
      <Sider
        className={classnames}
        width={230}
        collapsedWidth={leftCollapsedWidth}
        collapsible
        collapsed={isMobile ? false : collapsed}
        onCollapse={isMobile ? null : onCollapse}
        breakpoint="lg"
        trigger={null}
      >
        <div className="toggle-wrap" onClick={onCollapseLeftSide}>
          <Icon antd type={`${collapsed ? 'right' : 'left'}`} className="toggle-icon" />
        </div>
        {currentTopMenu.title && (
          <header className="sidebar-header">
            <span className="flexbox flex-align-items-center flex-justify-content-center icon-wrap">
              <Icon type={currentTopMenu.icon} className="icon" />
            </span>
            <span className="title">{currentTopMenu.title}</span>
          </header>
        )}
        <Menu
          onClick={this.handleClick}
          onOpenChange={this.handleOpenChange}
          mode="inline"
          theme={theme}
          {...menuProps}
        >
          {this.getNavMenuItems(menu)}
        </Menu>
      </Sider>
    )

    return isMobile ? (
      <Drawer
        className="left-sidebar-drawer"
        visible={!collapsed}
        placement="left"
        onClose={onCollapse}
        width={230}
        closable={false}
      >
        {siderBar}
      </Drawer>
    ) : (
      siderBar
    )
  }
}

export default LeftSideBar
