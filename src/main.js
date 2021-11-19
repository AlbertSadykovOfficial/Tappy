import Vue from 'vue'
import App from './App'

Vue.filter('filterPerMinute', function (value) {
      return !value ? '' : [String(Math.floor(value)), 'Symb/Min'].join(' ')
})
Vue.filter('filterPercent', function (value) {
      return !value ? '' : [String(100 - Math.floor(value * 100)), '%'].join(' ')
})

Vue.config.productionTip = false


new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
