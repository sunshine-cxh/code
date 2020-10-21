/*
 * @Descripttion :  重点用户申报详情页面
 * @Author       : gujitao
 * @Date         : 2020-08-25 08:59:47
 * @LastEditors  : gujitao
 * @LastEditTime : 2020-09-08 09:50:42
 */


export const fileInfoColumns =(self)=>{
  return [
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

export const baseInfoColumns = (self) =>{
  return [
    {
      title: '申报单号',
      name: 'code',
    },
    {
      title: '合同名称',
      name: 'contractName'
    },
    {  
      title: '日指定量',
      name: 'AssignAmount',
    },
    {  
      title: '提气速率',
      name: 'upliftRate',
      
    },
    {  
      title: '申报用气量',
      name: 'declareConsumption',
    },
    {  
      title: '申报周期类型',
      name: 'declareTypeStr',
    },
    {  
      title: '申报开始时间',
      name: 'gasStartTime',
    },
    {  
      title: '申报结束时间',
      name: 'gasEndTime',
     
    },
    {  
      title: '申报人',
      name: 'notifierName',
    },
    {  
      title: '申报状态',
      name: 'statusStr',
      
    },
    {  
      title: '申报时间',
      name: 'createdOn',
      span:2
    },
   


  ]
}

