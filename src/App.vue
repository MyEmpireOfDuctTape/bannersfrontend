<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar/Sidebar'
export default {
  name: 'App',
  components: {
      Sidebar,
  },
}
</script>


<style lang="scss">
@import './assets/scss/style.scss';
@import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>
<style lang="css">
@import './assets/css/animate.css';
</style>



