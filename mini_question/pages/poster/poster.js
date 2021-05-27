const app = getApp()
Page({
  /**
  * 页面的初始数据
  */
  data: {　　//初始化为空
    source: '',
    poster: '',
    code: '',
    score:''
  },
  onLoad: function (e) {
    console.log(e.score)
    this.setData({
      score:e.score
    })
    var score = e.score
    this.uploadimg();
  },
  //预览图片
  previewImg: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var url = that.data.poster;
    var previewImgArr = [];

    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  },
  /**
   * 上传图片
   */
  uploadimg: function () {
    var head = '';
    var pic = '';
    var code = '';
    var score = this.data.score;
    var nickName = app.globalData.userInfo.nickName;
    var avatarUrl = app.globalData.userInfo.avatarUrl;
    console.log(nickName)
    var openid = app.globalData.openid;

    var that = this;
    wx.request({
      url: 'https://www.wingkit.xyz/question/poster/download_code.php', //接口地址
 //     url: 'http://localhost/php/admin/poster/download_code.php',
      data: {
        openid: openid
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        code = res.data
        wx.request({
              url: 'https://www.wingkit.xyz/question/poster/download_img.php',
         // url: 'http://localhost/php/admin/poster/download_img.php',
          data: {
            openid: openid,
            avatarUrl: avatarUrl
          },
          method: 'GET',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res.data)
            head = res.data;

            // wx.chooseImage({ //从本地相册选择图片或使用相机拍照
            //   count: 1, // 默认9
            //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            //   success: function (res) {
            //     //console.log(res)
            //     //前台显示
            //     that.setData({
            //       source: res.tempFilePaths
            //     })
            //     // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            //     var tempFilePaths = res.tempFilePaths
            //     //        console.log(tempFilePaths[0])
            //     wx.uploadFile({
            //    //   url: 'https://www.wingkit.xyz/tushuguan/poster/upload_img.php',
            //       url: 'http://localhost/php/admin/poster/upload_img.php',
            //       filePath: tempFilePaths[0],
            //       name: 'file',
            //       success: function (res) {
            //         //打印
            //         console.log(res.data)
            //         pic = res.data;
            that.setData({
              poster: 'https://www.wingkit.xyz/question/poster/index.php?nickName=' + nickName + '&head=' + head + '&code=' + code + '&score=' + score
//              poster: 'http://localhost/php/admin/poster/index.php?nickName=' + nickName + '&head=' + head + '&code=' + code + '&score=' + score
            })
            //           }
            //       })

            //       }
            //     })
            //   }
            // })

          }
        })
      }
    })

      },
      saveImage() {
        var poster = this.data.poster
        this.wxToPromise('downloadFile', {
          url: poster
        })
          .then(res => this.wxToPromise('saveImageToPhotosAlbum', {
            filePath: res.tempFilePath
          }))
          .then(res => {
            console.log(res);
            // this.hide();
            wx.showModal({
              title: '提示',
              content: '保存海报图片成功,快去分享吧！',
              showCancel: false,
              confirmText: 'ok~~'
            })
          })
          .catch(({ errMsg }) => {
            console.log(errMsg)
            // if (~errMsg.indexOf('cancel')) return;
            if (!~errMsg.indexOf('auth')) {
              wx.showToast({ title: '图片保存失败，稍后再试', icon: 'none' });
            } else {
              // 调用授权提示弹框
              this.setData({
                showDialog: true
              })
            };
          })
      },

      // callback to promise
      wxToPromise(method, opt) {
        return new Promise((resolve, reject) => {
          wx[method]({
            ...opt,
            success(res) {
              opt.success && opt.success();
              resolve(res)
            },
            fail(err) {
              opt.fail && opt.fail();
              reject(err)
            }
          })
        });
      },

      confirm() {
        this.setData({
          showDialog: false
        })
      },

      cancel() {
        this.setData({
          showDialog: false
        })
      },

  onShareAppMessage: function () {
    var openid = app.globalData.openid;
    return {
      title: '答题挑战小程序',
      desc: '快来和我一起答题闯关吧！',
      path: `/pages/index/index?id=${openid}` // 路径，传递参数到指定页面。
    }
  }

    })