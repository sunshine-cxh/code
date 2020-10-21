/**
 * 模拟数据字典数据
 */
export default ({ fetchMock, delay, mock, toSuccess, toError }) => {
  return {
    //list
    '/api/dictionaries/getList': options => {
      const body = JSON.parse(options.body);
      const currentPage = body.currentPage;
      const idbase = (currentPage - 1) * 10 + 1;
      return toSuccess(
        mock({
          currentPage: currentPage,
          showCount: body.showCount,
          totalResult: 100,
          totalPage: 10,
          [`dataList|${body.showCount}`]: [
            {
              'id|+1': idbase,
              type: 1,
              name: '@cname',
              code: /[a-z][A-Z][0-9]/,
              'sort|+1': 1 ,
              tips: /\d{5,10}/,
            }
          ]
        }),
        400
      );
    },

    // type tree
    '/api/dictionaries/tree': (options) => {
      return toSuccess([{
        title: '数据类别',
        key: '0-0',
        children: [
          { title: '用户账号类型', key: '0-1-0-0' },
          { title: '角色类型', key: '0-1-0-1' },
          { title: '应用类型', key: '0-1-0-2' },
          { title: '组织类型', key: '0-1-0-3' },
          { title: '证件类型', key: '0-1-0-4' }
        ]
      }], 400)
    },

    //update
    '/api/dictionaries/update': options => toSuccess(),
    
  };
};
