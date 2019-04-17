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
//import BannerFolder from '@/components/banners/BannerFolder'
import BannerFolder from '@/components/folders/BannerFolder'
import Templates from '@/components/templates/Templates'
import BannersByTemplate from '@/components/templates/BannersByTemplate'
import SingleTemplate from '@/components/templates/SingleTemplate'
import Folder from '@/components/folders/Folder'
import Folders from '@/components/folders/Folders'


import MyAccount from '@/components/users/MyAccount'
import EditCompany from '@/components/company/Edit-Company'
import AddTemplate from '@/components/templates/Add-Template'
import EditBanner from '@/components/banners/Edit-Banner'
import ace from "ace-builds"

import ColorPicker from '@/components/color/ColorPicker';
import Advanced from '@/components/color/advanced';
import MyFileUpload from '@/components/fileupload/FileUpload';

Vue.use(Router)

/* const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' } */

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
      path: '/password/:token',
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
      path: '/folders',
      name: 'Folders',
      component: Folders,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/folder/:id',
      name: 'Folder',
      component: Folder,
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
//      path: '/banners/:folderName',
      path: '/banners/:id',
      name: 'BannerFolder',
      component: BannerFolder,
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
      path: '/templates',
      name: 'Templates',
      component: Templates,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/templates/:id',
      name: 'BannersByTemplate',
      component: BannersByTemplate,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/template/:id',
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

    // tests
    {
      path: '/colorpicker',
      name: 'ColorPicker',
      component: ColorPicker,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/advanced',
      name: 'Advanced',
      component: Advanced,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/fileupload',
      name: 'MyFileUpload',
      component: MyFileUpload,
      meta: {
        requiresAuth: true
      }
    },


  ]
})
