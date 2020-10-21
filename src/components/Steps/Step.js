/*
 * @Description: 进度条组件
 * @Author: luo jun
 * @Date: 2020-03-18 09:14:44
 * @LastEditTime : 2020-03-20 14:19:03
 * @LastEditors  : luo jun
 */

import React, { Component, Fragment } from 'react'
import { Steps } from 'antd'
import { StepIconFinsh, StepIconWait } from './Icon'

import './style/index.less'

export default class extends Component {
  constructor(props) {
    super(props)
  }
  static defaultProps = {
    current: 0, // 当前步骤
    direction: 'vertical',  // 摆放方向设置，默认垂直
    steps: [] // 步骤条数组
  }
  render() {
    const { props } = this

    return (
      <Fragment>
        {
          props.steps.length ? (
            <Steps className="step__wrapper" current={props.current} direction={props.direction}>
              {
                props.steps.map((item, idx) => (
                  <Steps.Step
                    key={item.desc ? item.desc : (Math.random() * 1000) + 1}
                    title={item.title ? item.title : ''}
                    description={item.desc ? item.desc : ''}
                    icon={idx <= props.current ? <StepIconFinsh /> : <StepIconWait />} />
                ))
              }
            </Steps>
          ) : null
        }
      </Fragment>
    )
  }
}
