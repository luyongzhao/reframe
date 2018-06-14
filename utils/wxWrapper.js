function showToast(errMsg) {

  wx.showToast({
    title: errMsg,
    icon: 'none',
    duration: 3000
  })

}

function get(url, data, succ, error){

  //加载等待
  wx.showLoading({
    title: '加载中...',
    mask: true
  })

  //网络请求
  var requestTask = wx.request({
    url: baseUrl+url,
    data: data,
    method: "get",
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'cookie': wx.getStorageSync("sessionid")//读取cookie
    },
    success: function(res){
      //console.log(JSON.stringify(res));

      //登录请求回来之后,读取res的header的cookie
      //持久化sessionId
      if (res.header["Set-Cookie"] != null) {
        wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
      }

      if (succ) {
        succ(res.data);       
      }     
    },
    fail: function(e){

      if (error) {
        error(e);
      }else{
        //console.log(JSON.stringify(e));
        showToast("服务器暂时不可用！");
      }
    },
    complete: function(e){
      //无论成功失败，都需要关闭等待
      wx.hideLoading();
    }
  })

  //返回请求，便于终止请求
  return requestTask;

}


function post(url,data,succ,error){

  //加载等待
  wx.showLoading({
    title: '加载中...',
    mask: true
  })

  //网络请求
  var requestTask = wx.request({
    url: baseUrl + url,
    data: data,
    method: "post",
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'cookie': query("sessionid")//读取cookie
    },
    success: function (res) {
      //console.log(JSON.stringify(res));

      //登录请求回来之后,读取res的header的cookie
      //持久化sessionId
      if (res.header["Set-Cookie"]!=null) {
        upsert("sessionid", res.header["Set-Cookie"]);
        //wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
      }
      

      if (succ) {
        
        succ(res.data);
      }
    },
    fail: function (e) {

      if (error) {
        error(e);
      }
    },
    complete: function (e) {
      //无论成功失败，都需要关闭等待
      wx.hideLoading();
    }
  })

  //返回请求，便于终止请求
  return requestTask;
  
}

function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }

      obj.fail = function (res) {
        reject(res)
      }

      fn(obj)
    })
  }
}


function upsert(k,v){

  let value = wx.getStorageSync(k);
  if (value != null) {
    wx.removeStorageSync(k);
  }
  console.log("save in database,k="+k+",v="+v);
  wx.setStorageSync(k, v);
}

function query(k){

  let v = wx.getStorageSync(k);
  console.log("query in database,k=" +k+",v="+v);
  return v;
}

function del(k){
  wx.removeStorageSync(k);
}


module.exports.get = get;
module.exports.post = post;
module.exports.showToast = showToast;
module.exports.wxPromisify = wxPromisify;
module.exports.upsert = upsert;
module.exports.query = query;
module.exports.del = del;
