//index.js

var wxw = require("../../utils/wxWrapper.js");

//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  onLoad: function () {
    
  },
  showDetail: function(e){

    console.log("数据输出：detail=" + JSON.stringify(e));
    wx.navigateTo({
      url: './detail',
    })
  },
  help: function(e){

    console.log("数据输出：id=" + e.currentTarget.dataset.id);
    wxw.showToast("detail:" + JSON.stringify(e));
  },
  share: function(e){

    console.log("数据输出：id=" + e.currentTarget.dataset.id);
    wxw.showToast("detail:" + JSON.stringify(e));
  }
})
