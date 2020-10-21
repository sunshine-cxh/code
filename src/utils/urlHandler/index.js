/*
 * @Descripttion : url handler
 * @Author       : wuhaidong
 * @Date         : 2020-06-02 11:41:46
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-06-02 11:53:20
 */

export function getUrlParameters() {
  let currentSearch = window.location.href.split('?')[1]
  if (!currentSearch) {
    return {}
  }
  var a = currentSearch.split('&')
  if (a == '') return {}
  var b = {}
  for (var i = 0; i < a.length; ++i) {
    var p = a[i].split('=', 2)
    if (p.length != 2) continue
    b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '))
  }
  return b
}
