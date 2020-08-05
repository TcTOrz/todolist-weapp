// pages/todolist/todolist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    STORAGE_KEY: "todo-weapp-1.0.0",
    insertText: '',
    item: {
      checked: false
    },
    items: [
      // {value: '待办任务1', name: '第一个待办任务样例', checked: false},
      // {value: '待办任务2', name: '第一个已完成任务样例', checked: true},
    ],
    storageItems: [
      // {value: '待办任务1', name: '第一个待办任务样例', checked: false},
      // {value: '待办任务2', name: '第一个已完成任务样例', checked: true},
    ],
    ratios: [
      { value: '所有', name: 'All' , checked: true},
      { value: '进行中', name: 'Active', checked: false },
      { value: '已完成', name: 'Complete', checked: false },
    ],
    // slideBtns: [{
    //   type: 'warn',
    //   text: '删除'
    // }],
    leftNum: 0,//()=>{this.calcLeftNum()}
    dialogShowClear: false,
    clearBtn: [{text: '取消'}, {text: '确定'}]
  },

  /**
   * 剩余代办
   */
  calcLeftNum() {
    // console.log(this.data.storageItems)
    return this.data.storageItems.filter((val)=> {
      return !val.checked 
    }).length
  },

  /**
   * 保存列表
   * @param {string} value 
   */
  saveList(value) {
    let val
    let data = this.data.storageItems
    let date = new Date().getTime()
    if( value ) {
      val = { value: date, name: value, checked: false }
      data.unshift(val)
    }
    wx.setStorage({
      data: JSON.stringify(data),
      key: this.data.STORAGE_KEY
    })
  },

  /**
   * 刷新列表
   */
  refreshList() {
    let _this = this
    wx.getStorage({
      key: this.data.STORAGE_KEY,
      success(res) {
        if( res.data ) {
          _this.setData({
            storageItems: JSON.parse(res.data),
            items: JSON.parse(res.data)
          })
          _this.setData({
            leftNum: _this.calcLeftNum()
          })
        } 
      }
    })
  },

  /**
   * 筛选列表
   * @param {string} status 
   */
  showList(status) {
    let storageItems = this.data.storageItems
    // let items = this.data.items
    if( status === '所有' ) {
      this.setData({
        items: storageItems
      })
    }else if( status === '进行中' ) {
      let filter = storageItems.filter((val, index)=> {
        return !val.checked
      })
      console.log(filter)
      this.setData({
        items: filter
      })
    }else {
      let filter = storageItems.filter((val, index)=> {
        return val.checked
      })
      this.setData({
        items: filter
      })
    }
  },

  /**
   * 删除所选项
   * @param {any} e 
   */
  slideBtnTap: function(e) {
    let {index: btn, data: index} = e.detail
    let sItems = this.data.storageItems
    let items = this.data.items
    if( btn === 0 ) {
      sItems.splice(sItems.findIndex((ele) => {
        return ele.value === index
      }), 1)
      this.setData({
        sItems,
        items: sItems
      })
      wx.setStorage({
        data: JSON.stringify(sItems),
        key: this.data.STORAGE_KEY
      })
      this.refreshList()
    }
  },

  /**
   * 清除所有已完成
   * @param {any} e 
   */
  tapDialogClearBtn: function(e) {
    if( e.detail.index ) {
      let data = this.data.storageItems
      let filter = data.filter((val, index)=> {
        return !val.checked
      })
      wx.setStorage({
        data: JSON.stringify(filter),
        key: this.data.STORAGE_KEY
      })
      this.setData({
        storageItems: filter,
        items: filter
      })
    }
    this.setData({
      dialogShowClear: false
    })
  },
  
  tapRmComplete: function(event) {
    this.setData({
      dialogShowClear: true
    })
    
  },
  
  /**
   * 切换
   * @param {boolean} flag 
   */
  switchList(flag) {
    let data = this.data.storageItems
    let _this = this
    data.forEach((val, index)=> {
      val.checked = flag
    })
    this.setData({
      items: data,
      storageItems: data,
      leftNum: _this.calcLeftNum()
    })
    wx.setStorage({
      data: JSON.stringify(data),
      key: this.data.STORAGE_KEY
    })
  },

  /**
   * 保存
   * @param {any}} e 
   */
  saveTodo(e) {
    this.saveList(e.detail.value)
    this.setData({
      insertText: ''
    })
    this.refreshList()
  },

  /**
   * 全部切换
   * @param {any} e 
   */
  checkboxChange(e) {
    const item = this.data.item
    item.checked = item.checked?false:true
    this.setData({
      item
    })

    this.switchList(item.checked)
  },

  /**
   * 列表切换
   * @param {any} e 
   */
  checkboxContentChange(e) {
    let val = e.detail.value
    let sItem = this.data.storageItems
    let data = []
    for (let index = 0; index < sItem.length; index++) {
      sItem[index].checked = false
      for (let j = 0; j < val.length; j++) {
        if( sItem[index].value == val[j] ) {
          sItem[index].checked = true
          continue
        }
      }
    }
    this.setData({
      storageItems: sItem,
      items: sItem
    })
    this.saveList()
    this.refreshList()
    // console.log(this.data.items)
  },

  /**
   * 状态切换
   * @param {any} event 
   */
  tapRadio: function(event) {
    let ratio = event.target.dataset.radio
    let ratios = this.data.ratios
    let arr = []
    for( let i=0; i<ratios.length; i++ ) {
      if( ratios[i].value === ratio ) {
        ratios[i].checked = true
      } else {
        ratios[i].checked = false
      }
      arr.push(ratios[i])
    }
    this.setData({
      ratios: arr
    })
    this.showList(ratio)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.refreshList()
    // wx.removeStorage({
    //   key: this.data.STORAGE_KEY,
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})