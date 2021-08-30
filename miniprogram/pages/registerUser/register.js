// pages/register/register.js
let app = getApp();
// 获取数据库引用
const db = wx.cloud.database();
const userListDB = db.collection('userlist');

Page({
 /**
  * 页面的初始数据
  */
 data: {
  phone: '',
 },

 onLoad: function() {
  //查询用户是否已经注册
  userListDB.where({
    _openid: this.data.openid
  //  _openid: app.globalData.openid // 填入当前用户 openid
  }).get({
    success: res=>{
      console.log("success")
      // 已经注册的用户，直接返回到订单界面
       wx.redirectTo({
        url: '../infoUser/infoUser',
      })
    },
    fail: err=>{
      // 没有注册的用户，需要注册，注册成功后，返回到订单界面
      console.log("fail")
      wx.showTabBar({
        animation: true,
      })
    }
  })
 },


 //输入手机号
 inputPhone(event) {
   this.setData({
     phone:event.detail.value
   })
 },
 //注册
//  注册成功之后返回到订单界面
  registerUser: function () {
    let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    // if (!myreg.test(this.data.phone)) {
    //   wx.showToast({
    //     title: '手机号格式不正确！',
    //     icon: 'none',
    //     duration: 1500
    //   })
    //   return;
    // }
   userListDB.add({
     data:{
      phone: this.data.phone,
     },
     success: res=>{
       wx.showToast({
         title: '注册成功',
       })
       wx.redirectTo({
         url: '../infoUser/infoUser',
       })
     },
     fail: err=>{
       wx.showToast({
        icon: 'none',
        title: '注册失败'
       })
     }
   })
 },
})