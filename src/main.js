import Vue from 'vue'
import App from './App.vue'
import moment from "moment"

Vue.config.productionTip = false

Vue.filter("convertTime", function(timeStamp) {
  if (!timeStamp) return ""

  return moment(timeStamp).format("LLL")
})


new Vue({
  render: h => h(App),
}).$mount('#app')
