/*
 * @Descripttion : 子系统公用model
 * @Author       : caojiarong
 * @Date         : 2020-08-12 09:44:54
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-08-12 09:34:32
 */
import $$ from 'cmn-utils'
import modelEnhance from 'utils/modelEnhance'
import PageHelper from 'utils/pageHelper'
import Format from 'utils/format'
import { apiPrefix } from './config'

export default modelEnhance({
  namespace: 'idmsvGlobal',

  state: {},

  effects: {
    // *init({payload},{call,put,select}){
    //   let {warnFn,cancelWarnFn}=payload
    //   // success('homePage')

    //   yield put({
    //     type:'getstationpressure',
    //     payload:{
    //       warnFn,
    //       cancelWarnFn
    //     }
    //   }),

    //   yield put({
    //     type:'getsimulationdata',
    //     payload:{
    //       warnFn,
    //       cancelWarnFn
    //     }
    //   })
    // },
    
    // 智慧管网-站点压力值统计-homePage
    *getstationpressure({ payload }, { call, put, select }) {
      let {warnFn,cancelWarnFn}=payload
      yield put.resolve({
        type: '@request',
        afterResponse:res=>{
          
          for(let i=0;i<res.length;i++){
            if(res[i].pressure < 800 || res[i].pressure>2600){
              warnFn('homePage',true)
              break
            }else if(i == res.length-1 && res[i].pressure >= 800 && res[i].pressure<=2600){
              cancelWarnFn('homePage',false)
            }
            
          }
        },
        payload: {
          method:'get',
          url: `${apiPrefix}/intelligentnetworkreport/getstationpressure`
        },
      })
    },

    // 工况仿真-站点压力值报警逻辑
    *getsimulationdata({ payload }, { call, put, select }) {
      let {warnFn,cancelWarnFn}=payload
      yield put.resolve({
        type: '@request',
        afterResponse:res=>{
          
          for(let i=0;i<res.length;i++){
            if(res[i].inOutData.scadaData.inPressure < 800 || res[i].inOutData.scadaData.inPressure > 2600){
              warnFn('simulationPage',true)
              break
            }else if(i == res.length - 1 && res[i].inOutData.scadaData.inPressure >= 800 && res[i].inOutData.scadaData.inPressure <=2600){
              cancelWarnFn('simulationPage',false)
            }
            
          }
        },
        payload: {
          url: `${apiPrefix}/simulation/getsimulationdata`,
        },
      })
    },
  },

  reducers: {},
})
