<!--
 * @Descripttion : ILNG平台系统主框架工程结构和说明
 * @Author       : wuhaidong
 * @Date         : 2019-12-10 17:04:56
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-08-28 11:21:51
 -->

## 工程结构

```
.
├── public                           # 不参与编译的资源文件
├── src                              # 主程序目录
│   ├── index.js                     # 程序启动和渲染入口文件
│   ├── config.js                    # 全局配置
│   ├── components                   # 全局公共组件
│   ├── utils                        # 公共工具类
│   ├── assets                       # 资源文件 
│   │   ├── fonts                    # 字体 & 字体图标
│   │   ├── images                   # 图片
│   │   ├── icons                    # 图片图标
│   │   └── styles                   # 样式
│   ├── layouts                      # 页面结构组件
│   │   ├── BasicLayout              # 基本布局
│   │   └── OtherLayout              # 布局组件根据具体功能调整，在路由配置中引用
│   ├── routes                       # 动态路由目录（每个功能一个文件夹的MVC结构）
│   │   ├── index.js                 # 所有子系统路由入口
│   │   ├── Common                   # 子系统公共路由,如登录页、404、403等
│   │   │   ├── Account              # 个人中心页面
│   │   │   ├── Login                # 登录页面
│   │   │   │   ├── index.js         # 路由配置文件
│   │   │   │   ├── assets           # 单独属于这个模块的静态资源文件
│   │   │   │   ├── components       # 页面组件
│   │   │   │   ├── model            # dva model
│   │   │   │   ├── service          # dva service
│   │   │   │   └── routes **        # 子路由(目录结构与父级相同)
│   │   │   └── ***                  # 其他公共页面
│   │   ├── IAMS                     # 子系统：后台管理系统
│   │   │   ├── index.js             # 子系统路由入口
│   │   │   ├── config.js            # 子系统路由配置文件
│   │   │   ├── System               # 一级导航/系统管理
│   │   │   │   ├── Users            # 二级导航/用户管理页面
│   │   │   │   │   ├── index.js     # 路由配置文件
│   │   │   │   │   ├── assets       # 单独属于这个模块的静态资源文件（如果有）
│   │   │   │   │   ├── components   # 页面组件(如果有)
│   │   │   │   │   ├── model        # dva model
│   │   │   │   │   ├── service      # dva service(如果有)
│   │   │   │   │   └── routes **    # 子路由(目录结构与父级相同,如果有)
│   │   │   │   └── ***              # 二级导航/其他
│   │   │   └── ***                  # 一级导航/其他
│   │   └── ***                      # 子系统/其他

```

## npm 使用方法

```javascript
// 安装依赖
$ npm install
// 启动
$ npm run start
// 打包
$ npm run build
// 打包带图形化分析
$ npm run build --analyze
```
