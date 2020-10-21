/*
 * @Descripttion : NavTab：一级导航
 * @Author       : wuhaidong
 * @Date         : 2020-07-15 09:54:31
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-08-03 11:48:13
 */
import React from 'react'
import isEqual from 'react-fast-compare'
import pathToRegexp from 'path-to-regexp'
import { Menu } from 'antd'
import Icon from '../Icon'

import './style/navtab.less'

export const getMeunMatchKeys = (flatMenu, path) => {
  return flatMenu.filter((item) => {
    return pathToRegexp(item.path).test(path)
  })
}

export default class NavTab extends React.Component {
  constructor(props, prevProps) {
    super(props, prevProps)
    this.state = {
      currentMenuKey: '',
    }
  }

  //点击tab
  handleClick = (e) => {
    let { onClickNavTab, menu } = this.props
    let currentTopMenu = {}
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].key === e.key) {
        currentTopMenu = menu[i]
      }
    }
    this.setState({ currentMenuKey: e.key }, () => {
      onClickNavTab(currentTopMenu)
    })
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(this.props.currentTopMenu, prevProps.currentTopMenu)) {
      this.setState({
        currentMenuKey:
          JSON.stringify(this.props.currentTopMenu) != '{}' ? this.props.currentTopMenu.key : '',
      })
    }
  }

  getSelectedMenuKeys = () => {
    const pathname = this.props.location.pathname
    const selectMenu = getMeunMatchKeys(this.props.flatMenu, pathname)[0]
    return selectMenu ? [selectMenu.path] : []
  }

  render() {
    let { currentMenuKey } = this.state
    let { menu } = this.props

    return (
      <div className="navtab">
        <Menu onClick={this.handleClick} selectedKeys={[currentMenuKey]} mode="horizontal">
          {menu.map((item) => {
            return (
              <Menu.Item key={item.key}>
                <span>{item.title}</span>
                <Icon type="down" />
              </Menu.Item>
            )
          })}
        </Menu>
      </div>
    )
  }
}
