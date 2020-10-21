/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-06-04 15:06:57
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-06-04 16:18:37
 */ 

import $$ from 'cmn-utils'


export function changeStorage(target, origin){
  if($$.getStore(origin)) {
    console.log('hh;')
    $$.setStore(
      origin,
      { ...$$.getStore(origin), ...target}
    ) 
  } else {
    console.log('hh')
    console.log(origin, target)
    $$.setStore(
      origin,
      target
    )
  }
  
}
