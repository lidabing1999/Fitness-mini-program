// miniprogram/pages/register/registerSuccess/registerSuccess.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    second: '5',
    timer: ''
  },
  goToPersonalCenter: function () {
    wx.redirectTo({
      url: '../../login/login',
    })
  },
  countDown: function () {
    let that = this;
    let second = that.data.second;
    that.setData({
      timer: setInterval(function () {
        second--;
        that.setData({
          second: second
        })
        if (second === 0) {
          clearInterval(that.data.timer);
          wx.redirectTo({
            url: '../../login/login',
          })
        }
      }, 1000)
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
    this.countDown();
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