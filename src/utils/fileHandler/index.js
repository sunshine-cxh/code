/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-04-28 16:09:48
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-11 15:33:52
 */
import config from '../../config.js'
import { getUrlParameters } from 'utils/urlHandler'
let downloadFile = (record) => {
  let url = `${config.request.prefix}/ifss/file/Download?id=${record.id}`
  window.open(url, '_blank')
  window.close()
}
export const downloadImage = (record) => {
  let url = `${config.request.prefix}/ifss/image/Download?id=${record.id}`
  window.open(url, '_blank')
  window.close()
}
export const getFileType = (str) => {
  let last_len = str.lastIndexOf('.')
  let fileType = str.substring(last_len, str.length)
  return fileType
}
export const getAction = (type) => {
  let searchObj = getUrlParameters()
  let action = `/ifss/file/upload?type=${type}`
  if (searchObj.id) {
    action = `/ifss/file/upload?objectId=${searchObj.id}&type=${type}`
  }

  return action
}
export default downloadFile
