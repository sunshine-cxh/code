/*
 * @Descripttion : Do not edit
 * @Author       : 贺子华
 * @Date         : 2020-04-15 11:14:07
 * @LastEditors  : xuqiufeng
 * @LastEditTime : 2020-07-07 16:13:05
 */
import modelEnhance from 'utils/modelEnhance'
import { apiPrefix,routePrefix } from '../../../../../config'
import { getUrlParameters } from 'utils/urlHandler'
export default modelEnhance({
  namespace: 'ContentEdit',

  state: {
    objectId: '',
    imageList: [{ id: '', filePath: '' }],
    contentType: [],
    basicInfos: {
      contentType: '10',
      isDisplay: 1,
      isPublic: 1,
      imageId: '',
      imageThumbnailUrl: '',
      imageUrl: '',
      publishDate: '',
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === `${routePrefix}/content/subContentEdit`) {
          dispatch({
            type: '@change',
            payload: {
              basicInfos: {
                contentType: '10',
                isDisplay: 1,
                isPublic: 1,
                imageId: '',
                imageThumbnailUrl: '',
                imageUrl: '',
              },
              imageList: [
                {
                  id: '',
                  filePath: '',
                  thumbnailPath: '',
                },
              ],
            },
          })
        }
      })
    },
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      // 获取内容类型
      yield put.resolve({
        type: 'global/getMasterDataItem',
        payload: {
          namespace: 'ContentEdit',
          valueField: 'contentType',
          category: 'contentType',
        },
      })
    },

    // 获取内容详情
    *getContentDetail({ payload }, { call, put, select }) {
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'basicInfos',
          url: `${apiPrefix}/webcontent/getdetail?id=${payload.contentId}`,
        },
      })
    },
    // 内容编辑
    *submit({ payload }, { call, put, select }) {
      const { imageList, basicInfos } = yield select((state) => state.ContentEdit)
      let imageId = ''
      let imageUrl = ''
      let imageThumbnailUrl = ''

      if (imageList.length == 1) {
        imageId = imageList[0].id
        imageUrl = imageList[0].filePath
        imageThumbnailUrl = imageList[0].thumbnailPath
      }

      let { success, postData } = payload
      postData = {
        ...postData,
        id: basicInfos.id,
        imageId: imageId,
        imageThumbnailUrl: imageThumbnailUrl,
        imageUrl: imageUrl,
      }

      yield put.resolve({
        type: '@request',
        payload: {
          url: `${apiPrefix}/webcontent/submit`,
          data: postData,
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
