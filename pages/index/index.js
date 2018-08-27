//index.js
import API from "../../constants/api"
import regeneratorRuntime from "../../packages/regenerator-runtime/runtime";
import wxRequest from '../../utils/request'

//获取应用实例
const app = getApp()

Page({
  data: {
    list: [],
    loading: false
  },
  onLoad() {
    this.getTimelineRequest(true)
  },
  onPullDownRefresh() {
    this.getTimelineRequest(true)
  },
  async onReachBottom(){
     this.setData({
      loading: true
    })
    await this.getTimelineRequest()
    this.setData({
      loading: false
    })
  },
  async getTimelineRequest(first){
    const { list } = this.data;
    try {
      let res = await wxRequest(API.timelineRequestUrl, {
        data: {
          src: "web",
          uid: "",
          device_id: "",
          token: "",
          limit: 20,
          category: "all",
          recomment: 1,
          before: ""
        }
      })
      let entrylist = res.d.entrylist || []
      this.setData({
        list: first ? entrylist : list.concat(entrylist)
      })

    } catch(err) {
      console.log(err)
    }
    
  }
});
