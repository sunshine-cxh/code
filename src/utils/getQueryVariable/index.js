/*
 * @Descripttion : 获取地址栏参数
 * @Author       : caojiarong
 * @Date         : 2020-06-10 15:06:57
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-06-10 15:54:11
 */ 

export function getQueryVariable (variable){
  let query = window.location.search.substring(1);
  let vars = query.split("&");
  for (let i=0;i<vars.length;i++) {
    let pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return('');
}
