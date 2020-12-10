// miniprogram/pages/personalCenter/personalCenter.js
var app = getApp();
Page({
  data: {
    userName: '',
    stunum: '',
    realName: '',
  },
  // 点击账户信息
  myInforTap: function () {
    wx.navigateTo({
      url: 'myInfor/myInfor',
    })
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
    if (app.appData.userId === '') {
      wx.redirectTo({
        url: '../noLogin/noLogin',
      })
    } else {
      this.setData({
        userName: app.appData.account.userName,
        stunum: app.appData.userinfo.stunum,
        realName: app.appData.userinfo.realName,
      })
    }
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