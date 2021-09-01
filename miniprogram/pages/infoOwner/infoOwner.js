// pages/infoOwner/infoOwner.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderData: [],
    driverId: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const db = wx.cloud.database()
    // 首先根据openid 获取对应的driverid
    db.collection('owner').where({
      _openid: app.globalData.openid
    }).get({
      success: res=>{ 
        if(res.data.length == 0){
          wx.showToast({
            icon: 'none',
            title: '尚未注册',
            mask: true,
            success(){
              setTimeout(()=>{
                wx.navigateTo({
                  url: '../registerOwner/register',
                })
              }, 1000)
            }
          })
        }
        else{
          db.collection('order').where({
            driverId: res.data[0].driverId
          }).get({
            success: res => {
              this.setData({
                orderData: res.data
              })
              if(res.data.length == 0){
                wx.showToast({
                  icon: 'none',
                  title: '没有任何订单'
                })
              }
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
        }
      },
      fail: err=>{
        if(res.data.length == 0){
          wx.showToast({
            icon: 'none',
            title: '尚未注册',
            mask: true,
            success(){
              setTimeout(()=>{
                wx.navigateTo({
                  url: '../registerOwner/register',
                })
              }, 1000)
            }
          })
        }
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