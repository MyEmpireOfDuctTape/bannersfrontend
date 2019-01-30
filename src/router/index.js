import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

//login forms 
import Login from '@/components/login/Login'
import Register from '@/components/login/Register'
import Reminder from '@/components/login/Reminder'
import NewPassword from '@/components/login/NewPassword'

//dashboard 
import Dashboard from '@/components/dashboard/Dashboard'
import Banners from '@/components/banners/Banners'
import BannerFolder from '@/components/banners/BannerFolder'
import Templates from '@/components/templates/Templates'
import SingleTemplate from '@/components/templates/Single-Template'


import EditCompany from '@/components/company/Edit-Company'
import AddTemplate from '@/components/templates/Add-Template'
import EditBanner from '@/components/banners/Edit-Banner'
import ace from "ace-builds"


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
      path: '/banners/:folderName',
      name: 'BannerFolder',
      component: BannerFolder
    },
    {
      path: '/templates',
      name: 'Templates',
      component: Templates
    },
    {
      path: '/add-template',
      name: 'AddTemplate',
      component: AddTemplate
    },
    {
      path: '/templates/:id',
      name: 'SingleTemplate',
      component: SingleTemplate
    },
    {
      path: '/edit-company',
      name: 'EditCompany',
      component: EditCompany
    },
    {
      path: '/banners/edit-banner/:bannerid',
      name: 'EditBanner',
      component: EditBanner
    },


  ]
})
