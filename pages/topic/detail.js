// pages/topic/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },
  reply: function(e){

    console.log(JSON.stringify(e));
  },
  barClick: function(e) {
    //console.log(e);
    this.setData({
      current: e.detail.key
    });
    if (e.detail.key == "suggest") {
      
      wx.navigateTo({
        url: './suggest',
      })

    }else if (e.detail.key == "collection") {

      console.log("被点击：收藏");
    }else if (e.detail.key == "share") {

      console.log("被电击：分享");
    }

    this.setData({
      current: e.detail.key
    });
  },
})