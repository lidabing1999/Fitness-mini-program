// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  var myavatarUrl = event.avatarUrl
  var mynickName = event.nickName
  var myopenid = event.openid
  var realName = event.realName
  var userName = event.userName
  var userPassword = event.userPassword
  var stunum = event.stunum
  try {
    return await db.collection('user').add({
      data: {
        avatarUrl: myavatarUrl,
        nickName: mynickName,
        openid: myopenid,
        realName: realName,
        userName: userName,
        userPassword: userPassword,
        stunum: stunum,
        
      }
    })
  } catch (e) {
    console.log(e)
  }
}