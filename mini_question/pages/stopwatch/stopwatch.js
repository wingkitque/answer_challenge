var app = getApp()
var interval = null;
const util = require('../../utils/util.js')
Page({
  data: {
    time: 0,
    displayTime: '00:00:00',
    btn : false,
    text:'开始',
    begin:false,
    times:5,
    stopwatch_time:'',
    challenge_times:''
  },
  begin_btn:function(){
    this.setData({
      begin:true
    })
  },

  btn:function(){
    var that = this;
    var stopwatch_time = app.globalData.stopwatch_time
    if(that.data.btn){
      that.onStopHandler();
      that.setData({
        btn:false
      })
      var time_distance = Math.abs((that.data.time - 1) - stopwatch_time * 100 );
      if (time_distance == 0)
      {
        wx.showModal({
          title: '恭喜您',
          content: '挑战成功！',
          showCancel:false
        })
      }
      console.log(time_distance)

      var stamp = +new Date(); //获取时间戳
      var time = util.format(stamp); // 转换成标准时间格式
      console.log(time)
      var openid = app.globalData.openid
      console.log(openid)
      var nickName = app.globalData.userInfo.nickName
      var gender = app.globalData.userInfo.gender
      var avatarUrl = app.globalData.userInfo.avatarUrl
      var stop_time = that.data.displayTime
      console.log(nickName)

      wx.showModal({
        title: '提示',
        content: '你的秒数为' + that.data.displayTime,
        showCancel: false,//是否显示取消按钮
     
        confirmText: "ok~~",//默认是“确定”
        confirmColor: 'skyblue',//确定文字的颜色
        success: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            //点击确定
           
              that.setData({
                begin: false,
                displayTime: '00:00:00',
                time: 0,
                text:'开始'
              })
              that.onLoad();
          }
        },
        fail: function (res) { },//接口调用失败的回调函数
        complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
      })

      var challenge_times = that.data.challenge_times
      wx.request({
        url: 'https://www.wingkit.xyz/question/add_stopwatch.php',
   //     url: 'http://localhost/php/admin/add_stopwatch.php',
        data: {
          stop_time: stop_time,
          openid: openid,
          nickName: nickName,
          avatarUrl: avatarUrl,
          gender: gender,
          time_distance: time_distance,
          time: time,
          challenge_times: challenge_times
        },
        method: 'GET',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res.data)
          that.onLoad();
        }
        
      })
      
    }else{
      that.onStartHandler();
      that.setData({
        btn:true,
        text:'结束'
      })
    }
  },

  onStartHandler() {
    if (!interval) {
      interval = setInterval(() => {
        this.setData({
          time: this.data.time + 1,
          displayTime: this.parseTime(this.data.time)
        })
      }, 10);
    }
  },

  parseTime() {
    var mm = parseInt(this.data.time / 100 / 60);
    if (mm < 10) mm = '0' + mm;
    var ss = parseInt(this.data.time % 6000 / 100);
    if (ss < 10) ss = '0' + ss;
    var ssss = parseInt(this.data.time % 100);
    if (ssss < 10) ssss = '0' + ssss;
    return `${mm}:${ss}:${ssss}`
  },

  onStopHandler() {
    console.log('stop')
    if (interval) {
      clearInterval(interval);
      interval = null;
    } else {
      this.setData({
        time: 0,
        displayTime: '00:00:00'
      })
    }
  },

  onLoad: function () {
    var that = this
    that.setData({
      stopwatch_time: app.globalData.stopwatch_time
    })
    
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    var openid = app.globalData.openid
    wx.request({
      url: 'https://www.wingkit.xyz/question/return_stopwatch_times.php',
  //    url: 'http://localhost/php/admin/return_stopwatch_times.php',
      data: {
        openid: openid,
      },
      method: 'GET',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data[0].challenge_times)
        that.setData({
          challenge_times: res.data[0].challenge_times
        })
      }
    })
  },

  onShow() {
    if (!interval && this.data.time != 0) {
      interval = setInterval(() => {
        this.setData({
          time: this.data.time + 1,
          displayTime: this.parseTime(this.data.time)
        })
      }, 10);
    }
  },
  onHide() {
    console.log('onHide...')
    if (interval) {
      clearInterval(interval);
      interval = null;
    } else {
      this.setData({
        time: 0,
        displayTime: '00:00:00'
      })
    }
  },
  onShareAppMessage: function () {
    var openid = app.globalData.openid;
    return {
      title: '闯关大挑战',
      desc: '快来和我一起闯关吧！',
      path: `/pages/index/index?id=${openid}` // 路径，传递参数到指定页面。
    }
  }
})