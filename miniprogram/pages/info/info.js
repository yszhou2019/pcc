// pages/info/info.js
let app = getApp()
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    logged: false,
    docid: '',

    phone: '',

    typeShow: false,
    type: '',
    types: [{name: '乘客'}, {name: '车主'}],

    name: '',
    
    license: '',

    carTypeShow: false,
    carType: '',
    carTypes: [{name:'4座'}, {name:'7座'}],

    color: '',

    status: '',
    score: 0,
    
    show: false,
  },

  onTypeDisplay() {
    this.setData({ typeShow: true });
  },
  onTypeSelect(e) {
    this.setData({
      typeShow: false,
      type: e.detail.name
    })
    if(e.detail.name=="乘客"){
      this.setData({show:false})
    }else{
      this.setData({show:true})
    }
  },
  onTypeClose(e) {
    this.setData({typeShow:false})
  },

  onCarTypeDisplay() {
    this.setData({ carTypeShow: true });
  },
  onCarTypeSelect(e) {
    this.setData({
      carTypeShow: false,
      carType: e.detail.name
    })
  },
  onCarTypeClose(e) {
    this.setData({typecarTypeShowShow:false})
  },

  onSubmit: function(){
    if(this.data.logged){
      // 已注册的用户修改信息
      if(this.data.show){
        // 车主信息修改
        db.collection('user').doc(this.data.docid).update({
          data:{
            phone: this.data.phone,
            type: this.data.type,
            name: this.data.name,
            license: this.data.license,
            carType: this.data.carType,
            color: this.data.color,
            status: this.data.status,
            score: this.data.score
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
      }else{
        // 乘客信息修改
        db.collection('user').doc(this.data.docid).update({
          data:{
            phone: this.data.phone,
            type: this.data.type,
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
    }else{
      // 新用户的注册
      if(this.data.show){
        // 新注册车主
        db.collection('user').add({
          data:{
            phone: this.data.phone,
            type: this.data.type,
            name: this.data.name,
            license: this.data.license,
            carType: this.data.carType,
            color: this.data.color,
            status: this.data.status,
            score: this.data.score
          },
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
      }else{
        // 新注册乘客
        db.collection('user').add({
          data:{
            phone: this.data.phone,
            type: this.data.type,
          },
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
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //查询用户是否已经注册
    db.collection('user').where({
      _openid: app.globalData.openid
    }).get({
      success: res=>{
        // console.log(res.data[0])
        // 已经注册的用户，可能修改个人信息
        if(res.data.length > 0){
          this.setData({
            phone: res.data[0].phone,
            type: res.data[0].type,
            name: res.data[0].name,
            license: res.data[0].license,
            carType: res.data[0].carType,
            color: res.data[0].color,
            docid: res.data[0]._id,
            status: res.data[0].status,
            score: res.data[0].score,
            logged: true
          })
        }
      },
      fail: err=>{
        // 没有注册就需要注册，注册成功后返回到订单界面
        wx.showTabBar({
          animation: true,
          title: '尚未注册'
        })
        this.setData({logged:false})
      }
    })
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