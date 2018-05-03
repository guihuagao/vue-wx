
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import Vuex from 'vuex'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'
import store from './store/index.js'
import httpconfig from './util/http.js'
import jweixin from 'weixin-js-sdk'
import { Uploader,Swipe, SwipeItem,ImagePreview } from 'vant'
import {
  Table,TableColumn,Pagination,Collapse,CollapseItem,Tooltip
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import { Popup } from 'vant';
import chartcore from '@antv/f2'
import 'vant/lib/vant-css/swipe.css';
import 'vant/lib/vant-css/image-preview.css';
import 'vant/lib/vant-css/popup.css';

/*import global from './components/global'*/
Vue.use(jweixin);
Vue.use(chartcore);
Vue.use(Tooltip);
Vue.use(Popup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(CollapseItem);
Vue.use(Collapse);
Vue.use(Uploader);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(ImagePreview);
Vue.prototype.$http = axios;
Vue.prototype.router = router;
/*Vue.prototype.GLOBAL=App;*/
fastclick.attach(document.body)
Vue.use(Mint)
Vue.use(Vuex)
Vue.config.productionTip = false

/*axios.interceptors.request.use(function (config) {
  stores.dispatch('showloader')
  return config
}, function(err) {
  return Promise.reject(err)
})*/
/*axios.interceptors.response.use(function (response) {
  stores.dispatch('hideloader')
  return response
}, function(err) {
  return Promise.reject(err)
})*/

new Vue({
  el: '#app',
  router,
  store: store,
  chartcore,
  httpconfig:httpconfig,
  components: { App },
  template: '<App/>'
})
