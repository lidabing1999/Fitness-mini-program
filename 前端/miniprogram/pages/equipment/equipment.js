// miniprogram/pages/equipment/equipment.js
const app = getApp()

Page({

  data: {
    openid: '',
    queryResult: '',
    items: [
      {value: '哑铃', name: '哑铃', checked: 'true'},
      {value: '杠铃', name: '杠铃'},
      {value: '壶铃', name: '壶铃'}
     
    ],
    equipment:'哑铃',
    _id:''
  
  },
 
 
  
  onLoad: function (options) {
     
    this.onPullDownRefresh()
  },
 
  
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    const db = wx.cloud.database()
      //查询当前用户所有的 counters
     db.collection('equipment').get({
       success: res => {
         this.setData({
          //  queryResult: JSON.stringify(res.data, null, 2)
         
          queryResult:res.data,
          
          
         })
        console.log('[数据库] [查询记录] 成功: ', res)
        
        
      },
       fail: err => {
         wx.showToast({
           icon: 'none',
           title: '查询记录失败'
         })
         console.error('[数据库] [查询记录] 失败：', err)
       }
     })
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
     
  },
  
  onRemove: function(e) {
    
    var id = e.currentTarget.dataset._id;
    this.setData({
      _id:id
    })

     if (this.data._id) {
       const db = wx.cloud.database()
       
      db.collection('equipment').doc(this.data._id).remove({
         success: res => {
           wx.showToast({
             title: '删除成功',
           })
           this.setData({
            id: '',
             count: 1,
           })
           this.onLoad()
         },
         fail: err => {
           wx.showToast({
             icon: 'none',
             title: '删除失败',
           })
           console.error('[数据库] [删除记录] 失败：', err)
         }
       })
     } else {
       wx.showToast({
         title: '无记录可删，请先创建记录',
       })
     }
  },


})