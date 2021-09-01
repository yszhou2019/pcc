// pages/order/order.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
    id: null,
    driverId: null,
		passengers: null,
		departure: null,
		destination: null, 
		time: null,
		dateInfo: null,
		cost: 0,
		score: 0,
		status: null
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
    const db = wx.cloud.database()
    db.collection('order').where({
      id: options.id
    }).get({
      success: res => {
        console.log(res.data[0])
        this.setData({
					orderid: res.data[0].orderid,
					driverId: res.data[0].driverId,
					passengers: res.data[0].passengers,
					departure: res.data[0].departure,
					destination: res.data[0].destination,
					startTime: res.data[0].startTime,
					dateInfo: res.data[0].dateInfo,
					cost: res.data[0].cost,
					score: res.data[0].score,
					status: res.data[0].status
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