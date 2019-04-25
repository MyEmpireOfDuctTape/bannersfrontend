<template>
    <div class="login">
		<div class="container">
			<div class="row">
			<div class="col-lg-8 offset-lg-2 col-md-12">
        <h1> Logging out...</h1>
        <form class="auth-form" @submit.prevent="sendEmailReminder($event)">
          <div class="block">
              <span class="grey">You are being logged out.</span>
              <router-link class="grey underline" to="/login">Click to Log-in</router-link>
          </div>
        </form>
      <span> If you need help contact <a href="mailto:help@mail.com">help@mail.com</a> </span>
			</div>

			</div>
			</div>
  </div>
</template>
<script>
export default {
    name: 'Logout',
    created(){
        console.log(this.$router)
        console.log(this.$store.getters.getToken)
        this.$store.dispatch('destroyToken', {
              bearer: this.$store.getters.getToken.accessToken,
        })
        .then(response => {
            this.$router.push({ path: `/login` })
            
        })
        .catch(error => {
             this.$router.push({ path: `/login` })
        })
        
    }
}
</script>
