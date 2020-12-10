// miniprogram/pages/register/perfectinfor/perfectinfor.js
var app = getApp();
Page({
  data: {
    userName: '',
    userPassword: '',
    stunum: '',
    realName: '',
    card: '',
    email: '',
  },
  // 返回主界面
  backHomeTap: function() {
    wx.switchTab({
      url: '../../index/index',
    })
  },
  // 学号
  stunumInput: function(e) {
    this.setData({
      stunum: e.detail.value
    });
  },
  // 真实姓名
  nameInput: function(e) {
    this.setData({
      realName: e.detail.value
    });
  },
  // 下一步完成
  registerSuccessTap: function() {
    var stunum = this.data.stunum;
    var realName = this.data.realName;
    var userName = this.data.userName;
    var userPassword = this.data.userPassword;
    var stunumreg = /^2018(\d{6})+$/;
    var namereg = /^[\u4E00-\u9FA5]+$/;
    var that = this;
    if (stunum === '') {
      wx.showToast({
        title: '请输入学号',
        icon: 'none',
        duration: 2000,
        mask: true
      });
    } else if (!stunumreg.test(stunum)) {
      wx.showToast({
        title: '请输入正确的学号',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (!namereg.test(realName)) {
      wx.showToast({
        title: '请输入正确的名字',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    
    } else
     {
      console.log(realName)
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          console.log('[云函数] [login] user openid: ', res.result.openid)
          this.logged = true
          wx.setStorageSync('openid', res.result.openid)
          wx.getUserInfo({
            success: res => {
              const myavatarUrl = res.userInfo.avatarUrl
              const mynickName = res.userInfo.nickName
              const realName = this.data.realName
              console.log('这是函数里面'+realName)
              const userName = this.data.userName
              const userPassword = this.data.userPassword
              const stunum = this.data.stunum
              wx.cloud.callFunction({
                name: 'addUser',
                data: {
                  avatarUrl: myavatarUrl,
                  nickName: mynickName,
                  openid: wx.getStorageSync("openid"),
                  realName: realName,
                  userName: userName,
                  userPassword: userPassword,
                  stunum: stunum
                },
                success: function(res) {
                  console.log(res)
                  //self.onLoad();
                  //self.onShow();
                },
                fail: function(res) {
                  console.log(res)
                  if (getCurrentPages().length != 0) {
                    //刷新当前页面的数据
                    getCurrentPages()[getCurrentPages().length - 1].onLoad()
                  }
                }
              })
            }
          })
        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)
          if (getCurrentPages().length != 0) {
            //刷新当前页面的数据
            getCurrentPages()[getCurrentPages().length - 1].onLoad()
          }
        }
      })
    
      // 初始化云
      // wx.cloud.init({
      //   env: 'w347344960-30e5f7',
      //   traceUser: true
      // });
      // // 初始化数据库
      // const db = wx.cloud.database();
      // db.collection('user').add({
      //   // data 字段表示需新增的 JSON 数据
      //   data: {
      //     realName: realName,
      //     userName: userName,
      //     userPassword: userPassword,
      //     stunum: stunum,
      //   },
      //   success: function(res) {
      //     // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      //     console.log(res);
      //     console.log(res.errMsg);
      //   }
      // })
      wx.redirectTo({
        url: '../registerSuccess/registerSuccess'　　// 页面 A
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      userName: app.appData.account.userName,
      userPassword: app.appData.account.userPassword
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})