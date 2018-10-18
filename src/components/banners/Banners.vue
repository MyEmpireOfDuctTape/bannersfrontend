<template>
  <div class="fullpage">
      <sidebar></sidebar>
		<div class="dashboard">
			<h1>Banners</h1>
			</div>
  </div>
</template>

<script>

import Sidebar from '../sidebar/Sidebar'
export default {
  name: 'Banners',
  components: {
      Sidebar
  },
  data () {
    return {
      msg: 'Dashboard yo'
    }
  }
}
</script>

