// pages/test/test.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    ranking1:'',
    ranking2:'',
    ranking1_1:'',
    ranking1_2:'',
    ranking2_1:'',
    ranking3:''
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setList();
    // this.setABC();
    var that = this;
    that.setData({
      ranking1:app.globalData.ranking1,
      ranking2:app.globalData.ranking2,
      ranking3: app.globalData.ranking3,
      ranking1_1:app.globalData.ranking1_1,
      ranking1_2:app.globalData.ranking1_2,
      ranking2_1:app.globalData.ranking2_1,
    })
    wx.request({
      url: 'https://www.wingkit.xyz/question/return_ranking.php',
//url:'http://localhost/php/admin/return_ranking.php',
      data: {
        //        openid: openid
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          arry:res.data
        })
      }
    })

    wx.request({
      url: 'https://www.wingkit.xyz/question/return_ranking2.php',
//url:'http://localhost/php/admin/return_ranking2.php',
      data: {
        //        openid: openid
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          arry2: res.data
        })
      }
    })

    wx.request({
      url: 'https://www.wingkit.xyz/question/return_ranking3.php',
    //  url:'http://localhost/php/admin/return_ranking3.php',
      data: {
        //        openid: openid
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          arry3: res.data
        })
      }
    })
  },

  swichNav:function(e){
    var that = this
    var currentTab = that.data.currentTab
    var new_tab = e.currentTarget.dataset.current
    
      that.setData({
        currentTab: new_tab
        })


    // if(currentTab == 1){
    //   that.setData({
    //     currentTab:0
    //   })
    // }else{
    //   that.setData({
    //     currentTab:1
    //   })
    // }
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var openid = app.globalData.openid;
    return {
      title: '答题挑战小程序',
      desc: '快来和我一起答题闯关吧！',
      path: `/pages/index/index?id=${openid}` // 路径，传递参数到指定页面。
    }
  }
})