//index.js
//获取应用实例
const app = getApp()
let innerAudioContext = wx.createInnerAudioContext(); //创建音频实例

Page({
  data: {
    userInfo:'',
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://www.wingkit.xyz/question/img/index1.jpg'
    }, {
      id: 1,
      type: 'image',
        url: 'https://www.wingkit.xyz/question/img/index2.jpg',
    }, {
      id: 2,
      type: 'image',
        url: 'https://www.wingkit.xyz/question/img/index3.jpg'
    }, {
      id: 3,
      type: 'image',
        url: 'https://www.wingkit.xyz/question/img/index4.jpg'
    }, {
      id: 4,
      type: 'image',
        url: 'https://www.wingkit.xyz/question/img/index5.jpg'
    }],

    my_score_existence:true,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  // cardSwiper
  cardSwiper(e) {
      my_score_existence = app.globalData.my_score_existence
    
    this.setData({
      cardCur: e.detail.current
    })
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    //    console.log(that.data.moment);
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
    that.onLoad();
  },

  //事件处理函数
  beginAnswer: function() {
    wx.navigateTo({
      url: '../test/test'
    })

  },
  my_stopwatch: function () {
    wx.navigateTo({
      url: '../my_stopwatch/my_stopwatch'
    })
    console.log(this.data.userInfo)
  },
  feedback:function(){
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  },
  my_score:function(){
    wx.navigateTo({
      url: '../my_score/my_score',
    })
  },
  poster:function(){
    wx.navigateTo({
      url: `../poster/poster?score=10`,
    })
  },
  onLoad: function (e) {
    var that = this
 //   e.id = "o1Jvm5SnSj5YenEG4N7RWGLWGchs"
    //分享者的openid
    if(e != undefined){
      var share_id = e.id
      console.log("share_id:"+share_id)
      app.globalData.share_id=share_id
    }
//获取相关参数
    wx.request({
      url: 'https://www.wingkit.xyz/question/return_parameter.php', //接口地址
 //     url:'http://localhost/php/admin/return_parameter.php',
      data: {
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        console.log(res.data)
        app.globalData.ranking1=res.data[0].ranking1,
        app.globalData.ranking2=res.data[0].ranking2,
        app.globalData.ranking3 = res.data[0].ranking3,
        app.globalData.question_num=res.data[0].question_num,
        app.globalData.ranking1_1=res.data[0].ranking1_1,
        app.globalData.ranking1_2=res.data[0].ranking1_2,
        app.globalData.ranking2_1=res.data[0].ranking2_1,
        app.globalData.time_use=res.data[0].time_use,
        app.globalData.stopwatch_time = res.data[0].stopwatch_time,
        console.log(app.globalData.ranking1)
      }
    })

    //先获取openid
    wx.login({
      success: function (res) {
        var code = res.code
        console.log("code:"+code)
        wx.request({
          url: 'https://www.wingkit.xyz/question/return_openid.php', //接口地址
          data: {
            code: code,
          },
          method: 'GET',
          header: {
            'content-type': 'application/json' //默认值
          },
          success: function (res) {
            //给全局变量赋值
            app.globalData.openid = res.data.openid
            //console.log('这是全局量：' + app.globalData.openid)
            var openid = app.globalData.openid;
            //console.log('这是局部变量：' + app.globalData.openid)
            console.log("openid:"+openid)
    //成功后连同openid一起保存至数据库
            wx.request({
              url: 'https://www.wingkit.xyz/question/return_my_score.php', //接口地址
//              url:'http://localhost/php/admin/return_my_score.php',
              data: {
                openid: openid,
              },
              method: 'GET',
              header: {
                'content-type': 'application/json' //默认值
              },
              success: function (res) {
                console.log(res.data)
                if ((res.data) == 'undefined' || res.data == null || res.data == '')
                that.setData({
                  my_score_existence:false
                })
                app.globalData.my_score_existence = that.data.my_score_existence
              }
            })
          }
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    console.log(app.globalData.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
//添加用户信息
    var nickName = app.globalData.userInfo.nickName
    var gender = app.globalData.userInfo.gender
    var city = app.globalData.userInfo.city
    var province = app.globalData.userInfo.province
    var country = app.globalData.userInfo.country
    var avatarUrl = app.globalData.userInfo.avatarUrl
    var openid = app.globalData.openid
    wx.request({
      url: 'https://www.wingkit.xyz/question/add_myself_message.php', //接口地址
//  url:'http://localhost/php/admin/add_myself_message.php',
      data: {
        openid: openid,
        nickName: nickName,
        gender: gender,
        city: city,
        province: province,
        country: country,
        avatarUrl: avatarUrl
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
       console.log(res.data)
      }
    })
  },
  onShareAppMessage: function () {
    var openid = app.globalData.openid;
    return {
      title: '答题挑战小程序',
      desc: '快来和我一起闯关吧！',
      path: `/pages/index/index?id=${openid}` // 路径，传递参数到指定页面。
    }
  }
})
