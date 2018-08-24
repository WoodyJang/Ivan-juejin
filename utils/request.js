import regeneratorRuntime from "../packages/regenerator-runtime/runtime";

const wxRequest = async (url, params = {}) => {
  Object.assign(params, { 
    token: wx.getStorageSync("token") || ''
  });
  let data = params.data || {}
  let method = params.method || 'GET'
  let header = params.header || { 
                "Content-Type": "application/json; charset=utf-8", 
                "token": params.token || ''
              }
  return await new Promise((resolve,reject) => {
    wx.request({
      url: url,
      method: method,
      data: data,
      header: header,
      success:res => {
        if (res.data && res.data.s === 1){
          resolve(res.data)
        }else{
          wx.showToast({
            title: res.data.m.toString(),
            icon: "none"
          });
          return reject(res)
        }
      },
      fail: err => {
        wx.showToast({
          title: "网路开小差，请稍后再试",
          icon: "none"
        });
        return reject(err)
      }
    })
  })
}
  
export default wxRequest