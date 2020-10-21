import {notice} from 'components/Notification'
/*
 * @Author       : wuhaidong
 * @Date         : 2020-03-08 23:28:42
 * @Descripttion : 数据格式化
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-09-02 14:42:18
 */

export default {
  /*
   * @description  : 格式化select结构需要的dict
   * @param        : response
   * @return       : news response
   */
  selectDictFormat: (response, code = 'dataCode', name = 'dataName', checked = false) => {
    let newsResp = response.map((item) => {
      let newsItem = {}
      newsItem.code = item[code]
      newsItem.codeName = item[name]
      newsItem.value = item[code]
      newsItem.label = item[name]
      newsItem.checked = checked
      if(item.child){
        let newChildArr = []
        item.child.map((itemChild)=>{
          let newChild={}
          newChild.code = itemChild[code]
          newChild.codeName = itemChild[name]
          newChild.value = itemChild[code]
          newChild.label = itemChild[name]
          newChild.checked = checked
          // return childRes
          newChildArr.push(newChild)
        })
        newsItem.child = newChildArr
      }
      return newsItem
    })
    return newsResp
  },

  /*
   * @description  : 格式化成select tree 组件数据格式
   * @param        : response
   * @return       : news response
   */
  selectTreeFormat(response, value = 'id', title = 'name') {
    return response.map((item) => {
      let newsItem = {}
      newsItem.value = item[`${value}`]
      newsItem.title = item[`${title}`]

      if (item.children && item.children.length > 0) {
        newsItem.children = item.children.map((childrenItem) => {
          let newsChildrenItem = {}
          newsChildrenItem.value = childrenItem[`${value}`]
          newsChildrenItem.title = childrenItem[`${title}`]
          if (childrenItem.children && childrenItem.children.length > 0) {
            newsChildrenItem.children = childrenItem.children.map(
              (cChildrenItem) => {
                let newsCChildrenItem = {}
                newsCChildrenItem.value = cChildrenItem[`${value}`]
                newsCChildrenItem.title = cChildrenItem[`${title}`]
                return newsCChildrenItem
              }
            )
          }
          return newsChildrenItem
        })
      }

      return newsItem
    })
  },

  /*
   * @description  : 多层嵌套数组转成一层
   * @param        : array:数组,toDict：是否转成select dict
   * @return       : news array
   */
  multiToOneFormat(array, toDict = false) {
    if (!toDict && array && array.length > 0) {
      return [].concat(
        ...array.map((item) =>
          [].concat(item, ...this.multiToOneFormat(item.children))
        )
      )
    } else if (array && array.length > 0) {
      let newsArray = [].concat(
        ...array.map((item) =>
          [].concat(item, ...this.multiToOneFormat(item.children))
        )
      )
      return this.selectDictFormat(newsArray, 'value', 'title')
    }
    
    return []
  },

  /*
   * @description  : 多层嵌套数组转成一层数组,取keys，set expandedRowKeys
   * @param        : array:数组, name : key name
   * @return       : news array
   */
  multiToKeysFormat(array, name = 'id') {
    if (array) {
      return [].concat(
        ...array.map((item) =>
          [].concat(item[`${name}`], ...this.multiToKeysFormat(item.children))
        )
      )
    } else {
      return []
    }
  },

  /*
   * @description  : 获取tree最深层的key值
   * @param        : array:数组
   * @return       : news array
   */
  deepestKey: [],
  multiToDeepestKey(array, name = 'key') {
    array &&
      array.map((item) => {
        if (item.children && item.children.length > 0) {
          this.multiToDeepestKey(item.children)
        } else {
          this.deepestKey.push(item[`${name}`])
        }
        return null
      })
    return this.deepestKey
  },

  /*
   * @description  : 比较两个数组,取两个数组共有的组成新数组
   * @param        : array:数组
   * @return       : news array
   */
  uniqueArray(uniqueArr, Arr) {
    let uniqueChild = []
    for (var i in Arr) {
      for (var k in uniqueArr) {
        if (uniqueArr[k] === Arr[i]) {
          uniqueChild.push(uniqueArr[k])
        }
      }
    }
    return uniqueChild
  },

  /*
   * @description  : 通过关键字比较两个数组,关键字相同取旧数据的属性，关键字不通取新增数组的新属性
   * @param        : arrayOld:修改后数组，arreNew:新增数组，key:对比的关键字
   * @return       : news array
   */
  newTableArr(arrOld, arrNew, key){
    let arrSumNew = [],index = 0  //新的数组，重新赋值index，让数组对象里面的index和数组的下标一致 
    for(let z = 0;z<arrOld.length;z++){
        let mark = false
        arrNew.some((child)=>{
          mark = arrOld[z][key] === child[key]
          return mark
        })
        if(mark) {
            console.log(z)
            console.log(arrOld[z])
            arrOld[z].index = index
            arrSumNew.push(arrOld[z])
            index ++
        }
    }
    for(let i = 0;i<arrNew.length;i++){
        let mark = false
        arrOld.some((child)=>{
          mark = arrNew[i][key] === child[key]
          return mark
        })
        if(!mark) {
            console.log(arrNew[i])
            arrNew[i].index = index
            arrSumNew.push(arrNew[i])
            index ++
        }
    }
    return arrSumNew
  },
  /**
   * @description: 
   * @param {type} 
   * @return: 
   */  
  getNameById(tree, id, key){
    for(let i = 0; i<tree.length;i++){
      if(tree[i][key] === id){
        return tree[i]
      }
      if(tree[i].children && tree[i].children.length > 0) {
        if(this.getNameById(tree[i].children, id, key)) {
          return this.getNameById(tree[i].children, id, key)
        }
      }
    }
  },

  /*
   * @description  : 判断数组里的对象里关键字是否为空
   * @param        : dataList:需要检查的数据，keyList:需要判断的关键字list :[{{key:'totalPrice',tips:'请填写总价'}}]
   * @return       : news array
   */

  checkListKey(dataList=[],keyList=[]){
    for(let i=0;i<dataList.length;i++){
      for(let j=0;j<keyList.length;j++){
        if(!dataList[i][keyList[j].key]){
          notice.error(keyList[j].tips)
          return true
        }
      }
    }
    
  }
}
