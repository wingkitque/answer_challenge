// pages/test/test.js
//获取应用实例
const app = getApp()
var timer = require('../../utils/wxTimer.js');
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question_status: 1,
    shuffleIndex: '',
    wxTimer1: {},
    wxTimerList: {},
    beginTime: '',
    question_sum: '',
    video_url: '',
    music_url: '',
    pic_url: '',
    poster: 'https://www.wingkit.xyz/question/img/audio.jpg',
    name: '这是啥？',
    author: '猜猜看',

    begin: false,

    bc_default: '#F5F5F5',
    bc_right: '#C1FFC1',
    bc_wrong: '#EEB4B4',
    bcA: '',
    bcB: '',
    bcC: '',
    bcD: '',

    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://www.wingkit.xyz/mini/img/xiaozhangtongxue1.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://www.wingkit.xyz/mini/img/xiaozhangtongxue2.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://www.wingkit.xyz/mini/img/xiaozhangtongxue3.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://www.wingkit.xyz/mini/img/xiaozhangtongxue4.jpg'
    }],

    index: 1,
    realIndex: 0,
    massage: [],
    time: "",
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    optionA: "A",
    optionB: "B",
    optionC: "C",
    optionD: "D",
    questionDetail: "",
    answerA: "",
    answerB: "",
    answerC: "",
    answerD: "",
    list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    //    listABC : ['A','B','C','D'],
    answer: "",
    correct: 0,
    error: 0,
    dataphp: []
  },

  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
    console.log(this.data.cardCur)
  },
  select_pic: function(e) {
    console.log(e.currentTarget.dataset.cardcur)
  },

  // randSort: function () {
  //   return Math.random() > 0.5 ? 1 : -1;
  // },

  // setList: function () {
  //   var newList = this.data.list.sort(this.randSort);
  //   this.setData({
  //     list: newList,
  //   });
  // },

  // setABC : function(){
  //   var abc = this.data.listABC.sort(this.randSort);
  //   this.setData({
  //     listABC: abc,
  //   });
  // },

  setOption: function() {

  },

  answerClickA: function() {
    var that = this
    this.setData({
      A: this.data.A + 1
    })
    if (this.data.answer == 'A') {
      this.setData({
        correct: this.data.correct + 1,
        bcA: that.data.bc_right
      })
    } else {
      this.setData({
        error: this.data.error + 1,
        bcA: that.data.bc_wrong
      })
    }
    this.setdataAndSavedata();
  },

  answerClickB: function() {
    var that = this
    this.setData({
      B: this.data.B + 1
    })
    if (this.data.answer == 'B') {
      this.setData({
        correct: this.data.correct + 1,
        bcB: that.data.bc_right
      })
    } else {
      this.setData({
        error: this.data.error + 1,
        bcB: that.data.bc_wrong
      })
    }
    this.setdataAndSavedata();
  },


  answerClickC: function() {
    var that = this
    this.setData({
      C: this.data.C + 1
    })
    if (this.data.answer == 'C') {
      this.setData({
        correct: this.data.correct + 1,
        bcC: that.data.bc_right
      })
    } else {
      this.setData({
        error: this.data.error + 1,
        bcC: that.data.bc_wrong
      })
    }
    this.setdataAndSavedata();
  },

  answerClickD: function() {
    var that = this
    this.setData({
      D: this.data.D + 1
    })
    if (this.data.answer == 'D') {
      this.setData({
        correct: this.data.correct + 1,
        bcD: that.data.bc_right
      })
    } else {
      this.setData({
        error: this.data.error + 1,
        bcD: that.data.bc_wrong
      })
    }
    this.setdataAndSavedata();
  },

  setdata: function() {
    var that = this
    this.setData({
      index: this.data.index + 1,
      realIndex: this.data.list[this.data.index],
    })
    this.setData({
      //questionDetail: app.globalData.question[this.data.realIndex].question,
      questionDetail: this.data.dataphp[that.data.shuffleIndex[this.data.realIndex]].question,

      answerA: this.data.dataphp[that.data.shuffleIndex[this.data.realIndex]].A,
      answerB: this.data.dataphp[that.data.shuffleIndex[this.data.realIndex]].B,
      answerC: this.data.dataphp[that.data.shuffleIndex[this.data.realIndex]].C,
      answerD: this.data.dataphp[that.data.shuffleIndex[this.data.realIndex]].D,
      answer: this.data.dataphp[that.data.shuffleIndex[this.data.realIndex]].answer,
      music_url: this.data.dataphp[that.data.shuffleIndex[this.data.realIndex]].music_url,
      video_url: this.data.dataphp[that.data.shuffleIndex[this.data.realIndex]].video_url,
      pic_url: this.data.dataphp[that.data.shuffleIndex[this.data.realIndex]].pic_url,

      bcA: that.data.bc_default,
      bcB: that.data.bc_default,
      bcC: that.data.bc_default,
      bcD: that.data.bc_default,
    })

    // var wxTimer = new timer({
    //   beginTime: "00:00:10"
    // })
    // console.log(that.data.wxTimerList)
    // wxTimer.start(that); //加载完成开始计时
  },
  saveScore: function() {
    var that = this
    console.log("************")
    //将时分秒转为秒
    var time = app.globalData.time_use;
    var hour = time.split(':')[0];
    var min = time.split(':')[1];
    var sec = time.split(':')[2];
    var s = Number(hour * 3600) + Number(min * 60) + Number(sec);
    console.log(s); //130
    var time_use = s - that.data.wxTimerSecond;
    console.log("耗时：" + time_use)
    var stamp = +new Date(); //获取时间戳
    var time = util.format(stamp); // 转换成标准时间格式
    var openid = app.globalData.openid;
    var nickName = app.globalData.userInfo.nickName;
    var gender = app.globalData.userInfo.gender;
    var head = app.globalData.userInfo.avatarUrl;
    var score = that.data.correct;

    wx.request({
      url: 'https://www.wingkit.xyz/question/savescore.php',
      //url:'http://localhost/php/admin/savescore.php',
      data: {
        time_use: time_use,
        openid: openid,
        nickName: nickName,
        gender: gender,
        head: head,
        score: score,
        time: time
      },
      method: 'GET',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res.data)
        app.globalData.my_score_existence = true;
        //add_numner
        if (app.globalData.share_id) {
          var share_id = app.globalData.share_id;
          wx.request({
            url: 'https://www.wingkit.xyz/question/add_number.php',
            //url: 'http://localhost/php/admin/add_number.php',
            data: {
              share_id: share_id,
              openid: openid,
              time: time,
            },
            method: 'GET',
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success: function(res) {
              console.log(res.data)
            }
          })
        }
      }
    })


    /* wx.redirectTo({
       url: '/pages/result/result?A=' + this.data.A + '&B=' + this.data.B + '&C=' + this.data.C + '&D=' + this.data.D + '&correct=' + this.data.correct + '&error=' + this.data.error,
     })*/
    wx.redirectTo({
      url: '/pages/poster/poster?score=' + this.data.correct,
    })
  },
  setdataAndSavedata: function() {
    var that = this
    //  console.log(that.data.wxTimer1)
    //  that.data.wxTimer1.stop();
    var question_num = app.globalData.question_num
    if (this.data.index == question_num) {
      this.saveScore();
    }
    if (this.data.index < question_num) {
      setTimeout(function() {
        that.setdata();
      }, 500)
    }
  },
  //下拉刷新
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh()
  },

  //开始答题
  begin_btn: function() {
    var that = this
    this.setData({
      begin: true
    })
    that.data.wxTimer1.start(that); //开始计时
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      question_num: app.globalData.question_num,
      my_score_existence: app.globalData.my_score_existence
    })
    console.log(that.data.question_num)

    // this.setList();
    // this.setABC();

    wx.request({
      url: 'https://www.wingkit.xyz/question/return_question_status.php', //接口地址
      // url: 'http://localhost/php/admin/return_question_status.php',
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function(res) {
        console.log(res.data[0].status)
        if (res.data[0].status != 0) {
          that.setData({
            question_status: res.data[0].status
          })
        } else {
          that.setData({
            question_status: res.data[0].status
          })

          //计时
          var time_use = app.globalData.time_use
          console.log(time_use)
          var wxTimer = new timer({
            beginTime: time_use,
            complete: function() {
              console.log("时间结束！:" + that.data.index + ";" + app.globalData.question_num)
              if (that.data.index < app.globalData.question_num) {
                console.log("没有完成题目")
                that.saveScore()
              }
            }
          })
          that.setData({
            wxTimer1: wxTimer
          })
          console.log(that.data.wxTimer1)

          wx.request({
            url: 'https://www.wingkit.xyz/question/return_question.php',
            // url: 'http://localhost/php/admin/return_question.php',
            data: {
              //        openid: openid
            },
            method: 'GET',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
              console.log(res.data)

              let count = that.generateArray(0, res.data.length - 1);
              that.setData({
                shuffleIndex: that.shuffle(count).slice(0, 10) // 生成随机题序并进行截取
              })
              console.log(that.data.shuffleIndex); // [2,0,3,1,5,4...]

              that.data.dataphp = res.data
              that.setData({
                // questionDetail:that.data.dataphp[0].question,
                // answerA:that.data.dataphp[0].A,
                // answerB:that.data.dataphp[0].B,
                // answerC:that.data.dataphp[0].C,
                // answerD:that.data.dataphp[0].D,
                // answer:that.data.dataphp[0].answer,
                // music_url:that.data.dataphp[0].music_url,
                // video_url:that.data.dataphp[0].video_url,
                // pic_url: that.data.dataphp[0].pic_url,
                questionDetail: that.data.dataphp[that.data.shuffleIndex[0]].question,
                answerA: that.data.dataphp[that.data.shuffleIndex[0]].A,
                answerB: that.data.dataphp[that.data.shuffleIndex[0]].B,
                answerC: that.data.dataphp[that.data.shuffleIndex[0]].C,
                answerD: that.data.dataphp[that.data.shuffleIndex[0]].D,
                answer: that.data.dataphp[that.data.shuffleIndex[0]].answer,
                music_url: that.data.dataphp[that.data.shuffleIndex[0]].music_url,
                video_url: that.data.dataphp[that.data.shuffleIndex[0]].video_url,
                pic_url: that.data.dataphp[that.data.shuffleIndex[0]].pic_url,
                question_sum: res.data.length,


                bcA: that.data.bc_default,
                bcB: that.data.bc_default,
                bcC: that.data.bc_default,
                bcD: that.data.bc_default,
              })

              

            }
          })
        }
      }
    })



  },

  /*
   * 数组乱序/洗牌
   */
  shuffle: function(arr) {
    let i = arr.length;
    while (i) {
      let j = Math.floor(Math.random() * i--);
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  },
  /**
   * 生成一个从 start 到 end 的连续数组
   */
  generateArray: function(start, end) {
    return Array.from(new Array(end + 1).keys()).slice(start)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var openid = app.globalData.openid;
    return {
      title: '闯关大挑战',
      desc: '快来和我一起闯关吧！',
      path: `/pages/index/index?id=${openid}` // 路径，传递参数到指定页面。
    }
  }
})