// http://www.wheresrhys.co.uk/fetch-mock/api
import packMock from 'utils/packMock';

import Menu from './menu'
import User from './SubAdmin/user';
import SomDictionaries from './SubAdmin/dictionaries';

/**
 * 加载mock文件
 * packMock(mock1[,mock2])
 */
packMock(
  Menu,
  User,
  SomDictionaries
);