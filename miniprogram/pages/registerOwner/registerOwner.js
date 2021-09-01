// pages/registerOwner/register.js
let app = getApp();
// 获取数据库引用
const db = wx.cloud.database();

Page({
 /**
  * 页面的初始数据
  */
// todo wxml个别选项需要选择框，个别选项需要输入验证(验证是手机号，车牌号，)
 data: {
  phone: '',
  name: '',
  license: '',
  type: '',
  color: '',
  driverId: '',
  docid: '',
 },

 onLoad: function() {
  //查询用户是否已经注册
  db.collection('owner').where({
    _openid: app.globalData.openid
  }).get({
    success: res=>{
      // 已经注册的用户，可能修改个人信息
      if(res.data.length > 0){
        this.setData({
          phone: res.data[0].phone,
          name: res.data[0].name,
          license: res.data[0].license,
          type: res.data[0].type,
          color: res.data[0].color,
          driverId: res.data[0].driverId,
          docid: res.data[0]._id,
        })
      }
    },
    fail: err=>{
      // 没有注册就需要注册，注册成功后返回到订单界面
      wx.showTabBar({
        animation: true,
        title: '尚未注册'
      })
    }
  })
 },

//  输入框
 inputName(event) {
   this.setData({
     name:event.detail.value
   })
 },
 inputPhone(event) {
  this.setData({
    phone:event.detail.value
  })
 },
 inputLicense(event) {
  this.setData({
    license:event.detail.value
  })
 },
 inputType(event) {
  this.setData({
    type:event.detail.value
  })
 },
 inputColor(event) {
  this.setData({
    color:event.detail.value
  })
 },

 generateId(){
  let code = "";
  const array = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 
  'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 
  'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 
  'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  for (let i = 0; i < 12; i++) {
    let id = Math.round(Math.random() * 61);
    code += array[id];
  }
  return code;
 },

 //注册
//  注册成功之后返回到订单界面
  registerOwner: function () {
    //  数据检查，检查成功，执行后续操作
    let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    // if (!myreg.test(this.data.phone)) {
    //   wx.showToast({
    //     title: '手机号格式不正确！',
    //     icon: 'none',
    //     duration: 1500
    //   })
    //   return;
    // }
    if(this.data.driverId==''){
      // 新用户的注册
      this.setData({
        driverId: this.generateId()
      })
      db.collection('owner').add({
        data:{
        name: this.data.name,
        phone: this.data.phone,
        license: this.data.license,
        type: this.data.type,
        color: this.data.color,
        driverId: this.data.driverId,
        score: 0,
        },

      // 注册 注册成功，返回订单界面
        success: res=>{
          wx.showToast({
            title: '注册成功',
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
          title: '注册失败'
          })
        }
      })
    }
    else{
      // 用户信息修改
      db.collection('owner').doc(this.data.docid).update({
        data:{
          name: this.data.name,
          phone: this.data.phone,
          license: this.data.license,
          type: this.data.type,
          color: this.data.color,
          driverId: this.data.driverId,
          score: 0,
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