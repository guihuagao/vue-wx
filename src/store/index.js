/**
 * Created by DELL on 2018/3/26.
 */
import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

Vue.prototype.$http = axios;

Vue.use(Vuex)

/*初始化值*/
const state={
  showLoading: false,
  /*用户信息*/
  userInfo:{},

  commentList:[],

  opId:'',


  /*上传图片后的图片路径*/
  imgUrl:'http://gzh.xvzhushou.com:8080/',
  /*支付接口固定url*/
  wxconfigUrl:'http://gzh.xvzhushou.com/'


};


export default new Vuex.Store({
  modules: {
    mutations
  },
  state,
  getters,
  actions,
  mutations
})
