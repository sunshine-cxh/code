/*
 * @Descripttion :
 * @Author       : wuhaidong
 * @Date         : 2020-05-20 22:10:45
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-05-21 17:39:33
 */

import React from 'react'
import DataTable, { EditableOper } from 'components/DataTable'
import Icon from 'components/Icon'
import Button from 'components/Button'

export const createColumns = (self, expand) => {
  let { editingKey } = expand
  return [
    {
      title: '日期',
      name: 'date',
      formItem: {},
      tableItem: {
        type: 'input',
        // editing: (text, record) => record.time === editingKey,
      },
    },
    {
      title: '时间',
      name: 'time',
      formItem: {},
      tableItem: {
        type: 'input',
        // editing: (text, record) => record.time === editingKey,
      },
    },
    {
      title: '相对时间(小时)',
      name: 'relativeTime',
      formItem: {},
      tableItem: {
        type: 'input',
        // editing: (text, record) => record.time === editingKey,
      },
    },
    {
      title: '流量（sm^3/hr）',
      name: 'flow',
      tableItem: {
        type: 'input',
        editing: (text, record) => record.time === editingKey,
      },
    },
    {
      title: '操作',
      tableItem: {
        width: 80,
        align: 'center',
        render: (text, record) => (
          <EditableOper>
            {(form) =>
              record.time === editingKey ? (
                <>
                  <Button
                    tooltip="确定修改"
                    onClick={(e) => self.handleFunctionSave(record, form)}
                  >
                    <Icon type="save" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    tooltip="修改"
                    onClick={(e) => self.handleFunctionEdit(record)}
                  >
                    <Icon type="edit" />
                  </Button>
                </>
              )
            }
          </EditableOper>
        ),
      },
    },
  ]
}

export const chartColumns = [
  {
    moment: '00:00',
    todayForecast: 40,
    lastMonth: 45,
    lastWeek: 50,
    yesterday: 30,
    today: 50,
  },
  {
    moment: '01:00',
    todayForecast: 60,
    lastMonth: 45,
    lastWeek: 30,
    yesterday: 20,
    today: 70,
  },
  {
    moment: '02:00',
    todayForecast: 53,
    lastMonth: 45,
    lastWeek: 50,
    yesterday: 30,
    today: 50,
  },
  {
    moment: '03:00',
    todayForecast: 58,
    lastMonth: 45,
    lastWeek: 50,
    yesterday: 40,
    today: 44,
  },
  {
    moment: '04:00',
    todayForecast: 62,
    lastMonth: 45,
    lastWeek: 40,
    yesterday: 30,
    today: 50,
  },
  {
    moment: '05:00',
    todayForecast: 65,
    lastMonth: 45,
    lastWeek: 50,
    yesterday: 20,
    today: 44,
  },
  {
    moment: '06:00',
    todayForecast: 41,
    lastMonth: 45,
    lastWeek: 60,
    yesterday: 30,
    today: 50,
  },
  {
    moment: '07:00',
    todayForecast: 42,
    lastMonth: 45,
    lastWeek: 60,
    yesterday: 40,
    today: 44,
  },
  {
    moment: '08:00',
    todayForecast: 45,
    lastMonth: 45,
    lastWeek: 50,
    yesterday: 30,
    today: 50,
  },
  {
    moment: '09:00',
    todayForecast: 70,
    lastMonth: 45,
    lastWeek: 40,
    yesterday: 20,
    today: 44,
  },
  {
    moment: '10:00',
    todayForecast: 39,
    lastMonth: 45,
    lastWeek: 50,
    yesterday: 30,
    today: 50,
  },
  {
    moment: '11:00',
    todayForecast: 51,
    lastMonth: 45,
    lastWeek: 40,
    yesterday: 50,
    today: 44,
  },
  {
    moment: '12:00',
    todayForecast: 54,
    lastMonth: 45,
    lastWeek: 50,
    yesterday: 30,
    today: 50,
  },
  {
    moment: '13:00',
    todayForecast: 41,
    lastMonth: 45,
    lastWeek: 40,
    yesterday: 20,
    today: 44,
  },
  {
    moment: '14:00',
    todayForecast: 50,
    lastMonth: 45,
    lastWeek: 50,
    yesterday: 30,
    today: 50,
  },
  {
    moment: '15:00',
    todayForecast: 42,
    lastMonth: 45,
    lastWeek: 40,
    yesterday: 20,
    today: 44,
  },
  {
    moment: '16:00',
    todayForecast: 34,
    lastMonth: 60,
    lastWeek: 50,
    yesterday: 30,
    today: 50,
  },
  {
    moment: '17:00',
    todayForecast: 66,
    lastMonth: 45,
    lastWeek: 40,
    yesterday: 50,
    today: 44,
  },
  {
    moment: '18:00',
    todayForecast: 44,
    lastMonth: 45,
    lastWeek: 50,
    yesterday: 30,
    today: 50,
  },
  {
    moment: '19:00',
    todayForecast: 66,
    lastMonth: 45,
    lastWeek: 40,
    yesterday: 20,
    today: 44,
  },
  {
    moment: '20:00',
    todayForecast: 40,
    lastMonth: 45,
    lastWeek: 50,
    yesterday: 30,
    today: 50,
  },
  {
    moment: '21:00',
    todayForecast: 47,
    lastMonth: 45,
    lastWeek: 40,
    yesterday: 40,
    today: 44,
  },
  {
    moment: '22:00',
    todayForecast: 40,
    lastMonth: 45,
    lastWeek: 50,
    yesterday: 30,
    today: 50,
  },
  {
    moment: '23:00',
    todayForecast: 60,
    lastMonth: 45,
    lastWeek: 40,
    yesterday: 24,
    today: 44,
  },
  {
    moment: '24:00',
    todayForecast: 40,
    lastMonth: 45,
    lastWeek: 50,
    yesterday: 30,
    today: 50,
  },
]
