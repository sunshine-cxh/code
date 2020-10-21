/*
 * @Descripttion : webpack重写配置文件
 * @Author       : wuhaidong
 * @Date         : 2019-12-12 17:04:56
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-06-24 16:11:55
 */
const {
  override,
  addDecoratorsLegacy,
  disableEsLint,
  addBundleVisualizer,
  addWebpackAlias,
  adjustWorkbox,
  addLessLoader,
  fixBabelImports,
} = require('customize-cra')
const path = require('path')

module.exports = override(
  addDecoratorsLegacy(),
  disableEsLint(),
  addBundleVisualizer({}, true),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
    components: path.resolve(__dirname, 'src/components'),
    assets: path.resolve(__dirname, 'src/assets'),
    utils: path.resolve(__dirname, 'src/utils'),
  }),
  adjustWorkbox((wb) =>
    Object.assign(wb, {
      skipWaiting: true,
      exclude: (wb.exclude || []).concat('index.html'),
    })
  ),
  fixBabelImports('import', {
    libraryName: 'antd',
    style: true,
  }),
  addLessLoader({
    localIdentName: '[local]--[hash:base64:8]',
    javascriptEnabled: true,
    modifyVars: {
      //覆盖掉antd主题
      // '@primary-color': '#276DD8' , //'#04398C', //修改默认主题
      '@border-color-base': '#9A9A9A',
    },
  })
)
