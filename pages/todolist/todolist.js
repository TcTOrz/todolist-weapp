// pages/todolist/todolist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {
      checked: false
    },
    items: [
      { value: 'USA', name: '美国' },
      { value: 'CHN', name: '中国', checked: true },
      { value: 'BRA', name: '巴西' }
    ],
    ratios: [
      { value: 'all', name: 'All' , checked: true},
      { value: 'active', name: 'Active', checked: false },
      { value: 'complete', name: 'Complete', checked: false },
      { value: 'complete', name: 'Complete', checked: false },
      { value: 'complete', name: 'Complete', checked: false },
      { value: 'complete', name: 'Complete', checked: false }
    ]
  },

  checkboxChange(e) {
    const item = this.data.item    
    item.checked = item.checked?false:true
    this.setData({
      item
    })
  },

  checkboxContentChange() {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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