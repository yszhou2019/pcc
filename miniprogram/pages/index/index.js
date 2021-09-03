//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    canIUseGetUserProfile: false,
    canIUseGetOpenData: false,
    logged: false,
    // canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') // 如需尝试获取用户信息可改为false
    loading: true,
    active: 0,

  },

  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
  },
  onReady() {
    this.setData({
      loading: false,
    })},
  onLoad: function(e) {
    try{
      let userInfo = wx.getStorageSync('userInfo')
      if(userInfo){
        this.setData({
          userInfo: userInfo,
          logged: true,
          avatarUrl: userInfo.avatarUrl,
        })
        console.log(userInfo)
      }
    }catch(e){
      console.log(e)
    }
    // if (userInfo.nickName) {
    //   this.setData({
    //     userInfo: userInfo,
    //     logged: true
    //   })
    // } else {
      // // 查看是否授权
      // wx.getSetting({
      //   success: res => {
      //     if (res.authSetting['scope.userInfo']) {
      //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
      //       wx.getUserInfo({
      //         success: res => {
      //           this.setData({
      //             userInfo: res.userInfo
      //           })
      //         }
      //       })
      //     }
      //   }
      // })
    // }

    // wx.cloud.callFunction({
    //   name: 'login',
    //   data: {},
    //   success: res =>{
    //     app.globalData.openid = res.result.openid
    //   }
    // })
    // if (!wx.cloud) {
    //   wx.redirectTo({
    //     url: '../chooseLib/chooseLib',
    //   })
    //   return
    // }
    // if (wx.getUserProfile) {
    //   this.setData({
    //     canIUseGetUserProfile: true,
    //   })
    // }
  },

  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
          logged: true,
        })
        wx.setStorageSync('userInfo', res.userInfo)
        wx.setStorageSync('logged', true)
        // todo 跳转到个人信息注册页面
        wx.navigateTo({
          url: '../info/info',
        })
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
      wx.setStorageSync('userInfo', userInfo)
    }
  },

  onUpdateInfo: function() {
    wx.navigateTo({
      url: '../info/info',
    })
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        // wx.navigateTo({
        //   url: '../info/info',
        // })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateBack({
          delta: 0,
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = `my-image${filePath.match(/\.[^.]+?$/)[0]}`
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
