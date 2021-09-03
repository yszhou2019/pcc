// pages/order/order.js

let app = getApp()

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
    id: null,
    orders:[],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
    const db = wx.cloud.database()
    db.collection('user').where({
      _openid: app.globalData.openid
    }).get({
      success: res=>{
        this.setData({type:res.data[0].type})
        if(res.data[0].type=='乘客'){
          db.collection('order').where({
            _openid: app.globalData.openid
          }).get({
            success: res => {
              console.log(res.data)
              this.setData({orders:res.data})
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '查询记录失败'
              })
            }
          })
        }else if(res.data[0].type=='车主'){
          db.collection('order').where({
            driverId: app.globalData.openid
          }).get({
            success: res => {
              this.setData({orders:res.data})
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '查询记录失败'
              })
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