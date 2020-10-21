/*
 * @Descripttion : 重点用户申报详情页面
 * @Author       : gujitao
 * @Date         : 2020-08-25 08:59:47
 * @LastEditors  : gujitao
 * @LastEditTime : 2020-09-03 11:51:05
 */


export const fileInfoColumns =(self)=>{

  return [
    {
      title: '气象日期',
      name: 'gasDeclareId',
      tableItem: {}
    },
    {
      title: '天气',
      name: 'theWeather',
      tableItem: {}
    },
    {
      title: '温度',
      name: 'temperature',
      tableItem: {},
    },
    {
      title: '湿度',
      name: 'humidity',
      tableItem: {},
    },
    {
      title: '风速',
      name: 'windSpeed',
      tableItem: {},
    }
  ]
  
};

export const baseInfoColumns =(self)=>{
  return [
    {
      title:'申报单号',
      name:'code'
    },
    {
      title:'合同名称',
      name:'contractId'
    },
    {
      title:'日指定量',
      name:'AssignAmount'
    },
    {
      title:'提起速率(标方)',
      name:'code'
    },
    {
      title:'申报用气量',
      name:'declareConsumption'
    },
    {
      title:'申报周期类型',
      name:'declareType'
    },
    {
      title:'申报开始时间',
      name:'gasStartTime'
    },
    {
      title:'申报结束时间',
      name:'gasEndTime'
    },
    {
      title:'申报人',
      name:'notifierId'
    },
    {
      title:'申报状态',
      name:'status'
    },
    {
      title:'申报时间',
      name:'createdOn'
    },
        

  ]

}