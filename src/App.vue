<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar/Sidebar'
//import Sass from './assets/scss/style.scss'
export default {
  name: 'App',
  components: {
      Sidebar,
  },
}
</script>


<style lang="scss">
/* @import './assets/scss/style.scss'; */
@import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>
<style lang="css">
/* @import '../node_modules/vuetify/dist/vuetify.min.css'; */
@import '../node_modules/@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';  
/* @import '../node_modules/vuetify/dist/vuetify.min.css'; */
@import './assets/css/animate.css';
@import './build/app.min.css';

</style>



