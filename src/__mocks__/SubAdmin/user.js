/**
 * 模拟请求数据
 * @param {FetchMock} fetchMock 当现有条件不满足时，可以使用fetchMock来进行扩展
 * @param {function} delay 增加延迟时间 ms 例: delay(mockData) 或 delay(mockData, 200)
 * @param {function} mock 使用mock生成数据，例:

   mock({
     'string|1-10': '★' // 生成最少1颗，最多10颗星字符
   })

   // {'string': '★★★★★★'} 

  更多用法参考 http://mockjs.com/examples.html
 */
export default ({ fetchMock, delay, mock, toSuccess, toError }) => {
  // 如果现有扩展不满足需求，可以直接使用fetchMock方法
  // fetchMock.mock(/httpbin.org\/post/, {/* response */}, {/* options */});

  return {
    '/api/user/login': options => {
      if (options.body) {
        const user = JSON.parse(options.body);
        if (user.userName === 'admin' && user.password === 'admin') {
          return toSuccess(
            mock({
              userName: 'admin', // 用户名
              name: '@cname', // 中文名称
              'age|1-100': 100, // 100以内随机整数
              birthday: '@date("yyyy-MM-dd")', // 日期
              city: '@city(true)', // 中国城市
              phone: /^1[385][1-9]\d{8}/, // 手机号
              token: '@guid' // token
            }),
            400
          );
        } else {
          return toError('用户名或密码错误 admin/admin');
        }
      } else {
        return toError('请输入用户名和密码');
      }
    },
    '/api/user/register': options => toSuccess(),
    '/api/user/getlist': options => {
      console.log('TCL: options-----', options);

      const body = JSON.parse(options.body);
      const currentPage = body.currentPage;
      const idbase = (currentPage - 1) * 10 + 1;

      return toSuccess(
        mock({
          CurrentPage: currentPage,
          Total: 100,
          TotalPages: 10,
          [`Rows|${body.pageSize}`]: [
            {
              'Id|+1': idbase,
              'EnterpriseId|1': idbase,
              RealName: '@cname',
              Account: '@cword(3)',
              Password: '@date',
              Salt: '@date',
              'AccountType|1-3': 'RoleId',
              RoleId: 1,
              OrgId: 1,
              Phone: '111111',
              Email: '111111@qq.com',
              Birthday: '2020-01-01',
              ProfilePhoto: '@csentence',
              Gender: ['0', '1'],
              Wechat: '10000',
              QQ: '111111',
              Remark: '备注' + idbase
            }
          ]
        }),
        400
      );

      // const body = JSON.parse(options.body);
      // const currentPage = body.currentPage;
      // const sortMap = body.sortMap;
      // const idbase = (currentPage - 1) * 10 + 1;
      // let sortField = { 'age|1-100': 1 };
      // if (sortMap && sortMap.age) { // 模拟排序
      //   let i = 60;
      //   sortField =
      //     sortMap.age === 'asc'
      //       ? { 'age|+1': new Array(10).fill(0).map(item => i++) }
      //       : { 'age|+1': new Array(10).fill(0).map(item => i--) };
      // }

      // return toSuccess(
      //   mock({
      //     currentPage: currentPage,
      //     showCount: body.showCount,
      //     totalResult: 100,
      //     totalPage: 10,
      //     [`dataList|${body.showCount}`]: [
      //       {
      //         'id|+1': idbase,
      //         name: '@cname',
      //         address: '@county()',
      //         'role|1': ['1', '2', '3'],
      //         ...sortField
      //       }
      //     ]
      //   }),
      //   400
      // );
    }
  };
};
