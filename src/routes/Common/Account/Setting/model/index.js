/*
 * @Descripttion : Do not edit
 * @Author       : xuqiufeng
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-08-13 19:43:11
 */
import modelEnhance from 'utils/modelEnhance'
import md5 from '@/utils/md5'
export default modelEnhance({
  namespace: 'Account',

  state: {
    imageList: [{ filePath: '' }],
    contentType: [],
    basicInfos: {
      isShowTab: 1,
      menuPosition: 1,
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        dispatch({
          type: 'handleChangeState',
          payload: {
            isCurrentRoute: pathname == '/account/setting' ? true : false,
          },
        })
      })
    },
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      // 获取内容类型
      yield put.resolve({
        type: 'global/getUserInfo',
      })
    },

    // 用户信息编辑
    *submit({ payload }, { call, put, select }) {
      const { imageList, basicInfos } = yield select((state) => state.Account)

      let { success, postData } = payload
      let imageUrl = ''
      if (imageList[0]) {
        imageUrl = imageList[0].filePath
      }
      postData = { ...postData, profilePhoto: imageUrl }

      yield put.resolve({
        type: '@request',
        payload: {
          url: `/iams/system/modifyuserinfo`,
          data: postData,
          success: () => {
            success && success()
          },
        },
      })
    },
    // 重置密码
    *changePassword({ payload }, { call, put, select }) {
      let { success, postData } = payload
      
      yield put.resolve({
        type: '@request',
        payload: {
          url: `/iams/system/modifypassword?oldPassword=${md5.hash(postData.oldPassword)}&newPassword=${md5.hash(postData.newPassword)}`,
          success: () => {
            success()
          },
        },
      })
    },
    *deleteImage({ payload }, { call, put, select }) {
      let { success } = payload
      let postData = {
        id: payload.id,
      }
      yield put.resolve({
        type: '@request',
        payload: {
          url: `/ifss/image/delete`,
          data: postData,
          success: () => {
            success()
          },
        },
      })
    },
  },
  reducers: {
    basicInfosChange(state, { payload }) {
      return {
        ...state,
        basicInfos: {
          ...state.basicInfos,
          [payload.key]: payload.val,
        },
      }
    },
  },
})
