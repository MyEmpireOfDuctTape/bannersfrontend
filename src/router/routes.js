import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

//login forms 
import Login from '@/components/login/Login'
import Logout from '@/components/login/Logout'
import Register from '@/components/login/Register'
import Reminder from '@/components/login/Reminder'
import NewPassword from '@/components/login/NewPassword'

//dashboard 
import Dashboard from '@/components/dashboard/Dashboard'
import Banners from '@/components/banners/Banners'
import BannerFolder from '@/components/banners/BannerFolder'
import Templates from '@/components/templates/Templates'
import SingleTemplate from '@/components/templates/Single-Template'


import MyAccount from '@/components/users/MyAccount'
import EditCompany from '@/components/company/Edit-Company'
import AddTemplate from '@/components/templates/Add-Template'
import EditBanner from '@/components/banners/Edit-Banner'
import ace from "ace-builds"


Vue.use(Router)

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

export default new Router({
  //mode:'history',
  routes: [
    {
      path: '/',
      name: 'LoginBase',
      component: Login,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout,
      meta: {
        requiresVisitor: false
      }
    },
    {
      path: '/invitation/:token',
      name: 'Register',
      component: Register,
      meta: {
        requiresVisitor: false
      }
    },
    {
      path: '/invitation',
      redirect: '/login',
    },
    {
      path: '/reminder',
      name: 'Reminder',
      component: Reminder,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/newpassword/:token',
      name: 'NewPassword',
      component: NewPassword,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/newpassword/',
      redirect: '/login',
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/my-account',
      name: 'MyAccount',
      component: MyAccount,
      meta: {
        requiresAuth: true
      }
    },
    {
        path: '/banners',
        name: 'Banners',
        component: Banners,
        meta: {
          requiresAuth: true
        }
    },
    {
      path: '/banners/:folderName',
      name: 'BannerFolder',
      component: BannerFolder,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/templates',
      name: 'Templates',
      component: Templates,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/add-template',
      name: 'AddTemplate',
      component: AddTemplate,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/templates/:id',
      name: 'SingleTemplate',
      component: SingleTemplate,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-company',
      name: 'EditCompany',
      component: EditCompany,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/banners/edit-banner/:bannerid',
      name: 'EditBanner',
      component: EditBanner,
      meta: {
        requiresAuth: true
      }
    },


  ]
})
