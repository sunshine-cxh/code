/*
 * @Descripttion : 全局 G2 设置
 * @Author       : wuhaidong
 * @Date         : 2019-12-18 17:04:56
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-03-26 10:18:50
 */

import { track, setTheme } from 'bizcharts'
import G2 from './G2'

const config = {
  defaultColor: '#1089ff',
  shape: {
    interval: {
      fillOpacity: 1
    }
  }
}

track(false)
setTheme(config)
export default G2
