// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Router from 'vue-router'
import ace from 'ace-builds'
import acetheme from 'ace-builds/src-noconflict/theme-twilight'
//var ace = require('ace-builds/src-noconflict/ace')
/* require('../node_modules/bootstrap/scss/bootstrap.scss');
require('./assets/css/style.css'); */
//require('./assets/js/functions.js');
require('./assets/js/myscript.js');
//require('./assets/ace/src-noconflict/ace.js');



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
