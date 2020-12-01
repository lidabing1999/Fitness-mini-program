// miniprogram/pages/equipmentLend/equipmentLend.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    count:1,
    counterId: '',
    wordContent:'',
    
    items: [
      {value: '哑铃', name: '哑铃', checked: 'true'},
      {value: '杠铃', name: '杠铃'},
      {value: '壶铃', name: '壶铃'}
     
    ],
    equipment:'哑铃',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res.userInfo)
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                nickname: res.userInfo.nickName
                
              })
              
            }
          })
        }
      }
    })
   
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
  },
  onAdd: function () {
    var date= new Date();
     const db = wx.cloud.database()
     db.collection('equipment').add({
      data: {
         count: this.data.count,
         username:this.data.nickname,
         time:date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
         avatarUrl:this.data.avatarUrl,
         equipment:this.data.equipment,
         wordContent:this.data.wordContent
     },
       success: res => {
         // 在返回结果中会包含新创建的记录的 _id
        // this.setData({
        //   counterId: res._id,
          
        //    count: 1
        // })
         wx.showToast({
           title: '新增记录成功',
         })
         
        setTimeout( wx.navigateBack({
          delta: 1,
          
        }),1000);
        this.onLoad()
         console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
       },
       fail: err => {
         wx.showToast({
         icon: 'none',
           title: '新增记录失败'
         })
         console.error('[数据库] [新增记录] 失败：', err)
       }
    })
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }

    this.setData({
      items,
      equipment:e.detail.value
    })
  },

onCounterInc: function() {
  this.setData({
    count : this.data.count + 1
  })

},

onCounterDec: function() {

  this.setData({
    count:this.data.count-1
  })
 
},
bindWordContent(e) {
  this.setData({
    wordContent:e.detail.value
  })
  console.log(e.detail.value)
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