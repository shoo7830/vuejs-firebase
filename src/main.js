// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import VueBlu from 'vue-blu'
import 'vue-blu/dist/css/vue-blu.min.css'
import App from './App'

Vue.use(VueFire)
Vue.use(VueBlu)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
