// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/routes'
import store from './store/store'
import VueCookie from 'vue-cookie'


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        name: 'Login',
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})
  

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  VueCookie,
  components: { App },
  template: '<App/>',
  render: h => h(App),
  /* created(){
    console.log('App Created!')
    this.$store.dispatch('resetToken', this.$store.getters.getToken)
        .then(response => {
            //this.$router.push({ path: `/login` })
            console.log(response)
        })
        .catch(error => {
             //this.$router.push({ path: `/login` })
            console.log(error)
        })
  } */
})
