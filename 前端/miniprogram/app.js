//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
     //调用API从本地缓存中获取数据
     var logs = wx.getStorageSync('logs') || []
     logs.unshift(Date.now())
     wx.setStorageSync('logs', logs)
     console.log(getCurrentPages())
     
    //  wx.login({
    //    success: function (res) {
    //      var code = res.code;//发送给服务器的code
    //      //console.log(res.code)
    //      if (code) {
    //        wx.request({
    //          url: 'http://nxyminiprogram.applinzi.com/Services/login.php',//此处修改为你的服务器php文件路径
    //          data: {
    //            code: code,
    //          },
    //          method: 'GET',
    //          header: {
    //            'content-type': 'application/json'
    //          },
    //          success: function (res) {
    //            //console.log(res.data);
    //            wx.setStorageSync('openid', res.data);//将获取信息写入本地缓存  
    //          }
    //        })
    //      }
    //      else {
    //        console.log("获取用户登录态失败！");
    //      }
    //    },
    //    fail: function (res) { },
    //    complete: function (res) { },
    //  })
     // 获取用户信息
     wx.getSetting({
       success: res => {
         if (res.authSetting['scope.userInfo']) {
           // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
           wx.getUserInfo({
             success: res => {
               // 可以将 res 发送给后台解码出 unionId
               this.globalData.userInfo = res.userInfo
               // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
               // 所以此处加入 callback 以防止这种情况
               if (this.userInfoReadyCallback) {
                 this.userInfoReadyCallback(res)
               }
             }
           })
         }
       }
     })
     //版本更新提示
     if (wx.canIUse('getUpdateManager')) {
       const updateManager = wx.getUpdateManager()
       updateManager.onCheckForUpdate(function (res) {
         //console.log('onCheckForUpdate====', res)
         // 请求完新版本信息的回调
         if (res.hasUpdate) {
           //console.log('res.hasUpdate====')
           updateManager.onUpdateReady(function () {
             wx.showModal({
               title: '更新提示',
               content: '新版本已经准备好，是否重启应用？',
               success: function (res) {
                 //console.log('success====', res)
                 // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                 if (res.confirm) {
                   // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                   updateManager.applyUpdate()
                 }
               }
             })
           })
           updateManager.onUpdateFailed(function () {
             // 新的版本下载失败
             wx.showModal({
               title: '已经有新版本了哟~',
               content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
             })
           })
         }
       })
     }else{
       wx.showModal({
         title: '提示',
         content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
       })
     }

    this.globalData = {}
  },
  appData: {
    // 账户信息
    account: '',
    //用户信息
    userinfo: '',
    //id (在binding.js中获取的userId)
    userId: '',
    wxCloudEnv:'clockin-ndy42'
  },
})
