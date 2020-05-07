import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import "bootstrap/dist/js/bootstrap.min.js"
import jquery from "jquery"
import bootstrap from 'bootstrap-vue'
import axios from 'axios'
// 代码高亮
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/atom-one-dark.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios

// Vue.use(jquery)
Vue.use(bootstrap)
Vue.use(VueHighlightJS)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')