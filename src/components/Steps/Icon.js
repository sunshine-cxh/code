/*
 * @Description: 步骤条图标icon
 * @Author: luo jun
 * @Date: 2020-03-18 09:49:17
 * @LastEditTime: 2020-03-18 10:42:32
 * @LastEditors: luo jun
 */
import React from 'react';

import './style/icon.less';

export const StepIconFinsh = () => (
  <div className="step-icon-finsh__wrapper">
    <div className="step-icon-finsh-inner"></div>
  </div>
);

export const StepIconWait = () => (
  <div className="step-icon-wait__wrapper">
    <div className="step-icon-wait"></div>
  </div>
);

export default {
  StepIconFinsh,
  StepIconWait
};