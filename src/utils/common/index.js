/*
 * @Descripttion : 
 * @Author       : hezihua
 * @Date         : 2020-09-02 14:50:03
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-03 17:38:28
 */
export const guid = ()=> {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
