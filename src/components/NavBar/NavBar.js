/*
 * @Descripttion : navbar基本布局头部区域
 * @Author       : wuhaidong
 * @Date         : 2019-12-10 10:09:19
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-08-21 17:16:10
 */
import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import Popover from '../Popover'
import Badge from '../Badge'
import Icon from '../Icon'
import Avatar from '../Avatar'
import Tooltip from '../Tooltip'
import NavTab from './NavTab'
import cx from 'classnames'
import logoImg from 'assets/images/logo.png'
import ImageLogoName from 'assets/images/logo_name2.png'
import './style/index.less'

@connect(({ global }) => ({ global }))
class NavBar extends PureComponent {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    fixed: true,
  }

  componentDidMount() {}

  toggleFullScreen() {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    }
  }

  handleRoute(item) {
    let {
      dispatch,
      currentSystem,
      global: { flatMenu },
    } = this.props
    if (item.url == '/idmsv') {
      this.toggleFullScreen()
    }
    //如果是当前系统则不能点击，!currentSystem 是为了解决403，505页面是的跳转
    if ((currentSystem && currentSystem.id != item.id) || !currentSystem) {
      dispatch({
        type: 'global/handleSystemRoute',
        payload: {
          currentClient: item,
        },
      })
    }
  }

  handleUserDropDownRoute(item) {
    let { dispatch } = this.props
    dispatch({
      type: 'global/handleSystemRoute',
      payload: {
        currentClient: item,
      },
    })
  }

  //设置个人菜单显示在左边导航栏, 与正常菜单一样
  handleUserAccountMenu(menu) {
    let { handleUserAccountMenu } = this.props
  }

  render() {
    let {
      fixed,
      collapsed,
      user,
      isMobile,
      systems,
      currentSystem,
      flatMenu,
      currentTopMenu,
      menu,
      location,
      onClickNavTab,
      global: { checkNumber },
    } = this.props

    let total = 0
    if (typeof checkNumber != 'undefined') {
      total = checkNumber.auditMyReceive + checkNumber.auditMySend + checkNumber.auditNot
    }

    if (total > 99) {
      total = '99+'
    }

    if (isNaN(total)) {
      total = 0
    }

    let classnames = cx('navbar', {
      'navbar-fixed-top': !!fixed,
      'navbar-sm': isMobile ? true : collapsed,
    })

    let USER_DROPDOWN = [
      // { title: '关于我们', icon: 'about', path: '/account/setting' },
      { title: '用户设置', icon: 'userSetting', path: '/account/setting' },
      { title: '退出系统', icon: 'signout', path: '/sign/login' },
    ]

    let PERSONAL_AFFAIRS = [
      {
        title: `我发出的审批`,
        icon: 'sendapproval',
        path: '/account/myApply',
        num: checkNumber.auditMySend,
      },
      {
        title: `我收到的审批`,
        icon: 'acceptapproval',
        path: '/account/myCheck',
        num: checkNumber.auditMyReceive,
      },
      {
        title: `待我审批`,
        icon: 'willapproval',
        path: '/account/willCheck',
        num: checkNumber.auditNot,
      },
    ]

    return (
      <header className={classnames}>
        {!isMobile && (
          <div className={`navbar-branding dropdown`}>
            {/* <Popover
              content={
                <ul className="dropdown-menu list-group dropdown-persist">
                  {systems != null &&
                    systems.length > 0 &&
                    systems.map((item) => {
                      let active = ''
                      if (currentSystem && currentSystem.id == item.id) {
                        active = 'active'
                      }
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            this.handleRoute(item)
                          }}
                        >
                          <li className={`list-group-item ${active}`}>
                            <Icon type={item.icon} /> <span>{item.clientName}</span>
                          </li>
                        </div>
                      )
                    })}
                </ul>
              }
            > */}
            <div className={`navbar-brand`}>
              <img className="logo spining" src={logoImg} />
              <span className="client-name">
                {currentSystem && currentSystem.clientName}
              </span>
              {/* <img src={ImageLogoName} className="logo-name" /> */}
            </div>
            {/* </Popover> */}
          </div>
        )}
        <NavTab
          onClickNavTab={onClickNavTab}
          flatMenu={flatMenu}
          currentTopMenu={currentTopMenu}
          menu={menu}
          location={location}
        />
        <div className="navbar-right">
          <ul className="navbar-nav">
            {!isMobile && (
              <li onClick={this.toggleFullScreen}>
                <a>
                  <Tooltip title="全屏" placement="bottom">
                    <Icon type="screen-full" className="icon-screenfull" />
                  </Tooltip>
                </a>
              </li>
            )}
            <li className="dropdown">
              <Popover
                content={
                  <ul className="dropdown-menu list-group dropdown-persist">
                    {systems != null &&
                      systems.length > 0 &&
                      systems.map((item) => {
                        let active = ''
                        if (currentSystem && currentSystem.id == item.id) {
                          active = 'active'
                        }
                        return (
                          <div
                            key={item.id}
                            onClick={() => {
                              this.handleRoute(item)
                            }}
                          >
                            <li className={`list-group-item ${active}`}>
                              <Icon type={item.icon} /> <span>{item.clientName}</span>
                            </li>
                          </div>
                        )
                      })}
                  </ul>
                }
              >
                <a>
                  <Tooltip title="系统切换" placement="bottom">
                    <Icon type="switch-system" />
                  </Tooltip>
                </a>
              </Popover>
            </li>
            <li>
              <a>
                <Badge count={0}>
                  <Tooltip title="通知" placement="bottom">
                    <Icon type="notice" className="icon-notice" />
                  </Tooltip>
                </Badge>
              </a>
            </li>

            <li>
              <Popover
                content={
                  <ul className="dropdown-menu list-group dropdown-persist">
                    {PERSONAL_AFFAIRS.length &&
                      PERSONAL_AFFAIRS.map((item) => {
                        return (
                          <Link key={item.title} to={item.path}>
                            <li
                              className="list-group-item"
                              onClick={() => {
                                this.handleRoute(item)
                              }}
                            >
                              <Icon type={item.icon} />
                              <span>{item.title}</span>
                              {item.num > 0 && <span style={{ color: 'red' }}>({item.num})</span>}
                            </li>
                          </Link>
                        )
                      })}
                  </ul>
                }
              >
                <a>
                  <Badge count={total}>
                    <Tooltip title="个人事务" placement="bottom">
                      <Icon type="personalAffairs" className="icon-notice" />
                    </Tooltip>
                  </Badge>
                </a>
              </Popover>
            </li>
            <li className="dropdown">
              <Popover
                content={
                  <ul className="dropdown-menu list-group dropdown-persist">
                    {USER_DROPDOWN.length &&
                      USER_DROPDOWN.map((item) => {
                        return (
                          <Link key={item.title} to={item.path}>
                            <li
                              className="list-group-item"
                              onClick={() => {
                                this.handleRoute(item)
                              }}
                            >
                              <Icon type={item.icon} /> <span>{item.title}</span>
                            </li>
                          </Link>
                        )
                      })}
                  </ul>
                }
              >
                <a className="flexbox flex-justify-content-center flex-align-items-center dropdown-toggle user">
                  {user.profilePhoto ? (
                    <Avatar className="user-avatar" src={user.profilePhoto}></Avatar>
                  ) : (
                    <Avatar
                      className="user-avatar"
                      src={require('assets/images/logo.png')}
                    ></Avatar>
                  )}
                  {/* <span className="user-name">{user.userName}</span> */}
                </a>
              </Popover>
            </li>
          </ul>
        </div>
      </header>
    )
  }
}

const UserDropDown = (props) => {
  let list = [
    { title: '关于', icon: 'about', path: '/' },
    { title: '设置', icon: 'setting', path: '/' },
    { title: '退出', icon: 'signout', path: '/sign/login' },
  ]
  return (
    <ul className="dropdown-menu list-group dropdown-persist">
      {list.length &&
        list.map((item) => (
          <Link key={item.title} to={item.path}>
            <li
              className="list-group-item"
              onClick={() => {
                this.handleRoute(item)
              }}
            >
              <Icon type={item.icon} /> <span>{item.title}</span>
            </li>
          </Link>
        ))}
      {/* 动画效果 */}
      {/* <li className="list-group-item animated animated-short fadeInUp">
        <Icon type="setting2" /> 设置
    </li> */}
    </ul>
  )
}

export default NavBar
