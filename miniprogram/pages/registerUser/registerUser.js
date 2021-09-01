// pages/register/register.js
let app = getApp();
// 获取数据库引用
const db = wx.cloud.database();
const userListDB = db.collection('user');

Page({
 /**
  * 页面的初始数据
  */
 data: {
  phone: '',
  first: true,
  docid: '',
 },

 onLoad: function() {
  //查询用户是否已经注册
  userListDB.where({
   _openid: app.globalData.openid
  }).get({
    success: res=>{
      // 已经注册
      if(res.data.length>0){
        this.setData({
          phone: res.data[0].phone,
          first: false,
          docid: res.data[0]._id,
        })
      }else{
        // 尚未注册
        wx.showTabBar({
          animation: true,
          title: '尚未注册'
        })
      }
    },
    fail: err=>{
      wx.showTabBar({
        animation: true,
        title: '尚未注册'
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
    if(this.data.first){
      // 注册
      userListDB.add({
        data:{
        phone: this.data.phone,
        },
        success: res=>{
          wx.showToast({
            title: '注册成功',
            success: ()=>{
              setTimeout(() => {
                wx.navigateBack({
                  delta: 0,
                })
              }, 1000);
            }
          })
        },
        fail: err=>{
          wx.showToast({
          icon: 'none',
          title: '注册失败'
          })
        }
      })
    }
    else{
      // 修改信息
      userListDB.doc(this.data.docid).update({
        data:{
          phone: this.data.phone,
        },
        success: res=>{
          wx.showToast({
            title: '修改成功',
            success: function (){
              setTimeout(() => {
                wx.navigateBack({
                  delta: 0,
                })
              }, 1000);
            }
          })
        },
        fail: err=>{
          wx.showToast({
          icon: 'none',
          title: '修改失败'
          })
        }
      })
    }
 },
})