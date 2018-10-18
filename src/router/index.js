import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/Login'
import Register from '@/components/login/Register'
import Reminder from '@/components/login/Reminder'
import NewPassword from '@/components/login/NewPassword'
import Dashboard from '@/components/dashboard/Dashboard'
import Banners from '@/components/banners/Banners'
import Templates from '@/components/templates/Templates'




Vue.use(Router)

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/reminder',
      name: 'Reminder',
      component: Reminder
    },
    {
    path: '/newpassword',
    name: 'NewPassword',
    component: NewPassword
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
        path: '/banners',
        name: 'Banners',
        component: Banners
    },
    {
      path: '/templates',
      name: 'Templates',
      component: Templates
    },


  ]
})
