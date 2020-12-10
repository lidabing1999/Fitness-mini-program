// miniprogram/pages/register/register.js
var app = getApp();
Page({
  data: {
    userName: '',
    userPassword: '',
    userPasswordAgain: '',
    checkbox: false,
    repetition: false
  },
  // 返回主页面
  backHomeTap: function() {
    wx.switchTab({
      url: '../index/index',
    })
  },
  // 绑定
  bindingTap: function () {
    wx.redirectTo({
      url: '../login/login',
    })
  },
  // 用户名
  userNameInput: function(e) {
    this.setData({
      userName: e.detail.value
    });
  },
  // 密码
  userPasswordInput: function(e) {
    this.setData({
      userPassword: e.detail.value
    });
  },
  // 再次输入密码
  userPasswordAgainInput: function(e) {
    this.setData({
      userPasswordAgain: e.detail.value
    });
  },
  // 下一步，完善个人信息
  perfectInforTap: function() {
    var userName = this.data.userName;
    var userPassword = this.data.userPassword;
    var userPasswordAgain = this.data.userPasswordAgain;
    var name = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
    var repetition = this.data.repetition;
    if (userName === '') {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (!name.test(userName)) {
      wx.showToast({
        title: '用户名格式不正确',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (repetition === true) {
      wx.showToast({
        title: '用户名已存在',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (userPassword === '') {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (userPassword.length < 6) {
      wx.showToast({
        title: '密码最少6位',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (userPassword !== userPasswordAgain) {
      wx.showToast({
        title: '两次密码输入不一致',
        icon: 'none',
        duration: 2000,
        mask: true
      })
  
    } else {
      wx.redirectTo({
        url: 'perfectInfor/perfectInfor',
      })
      // 保存用户名和密码
      app.appData.account = {
        userName: userName,
        userPassword: userPassword
      }
    }
  }
})