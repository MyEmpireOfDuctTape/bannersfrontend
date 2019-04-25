<template>
  <div class="login">
		<div class="container">
			<div class="row">
			<div class="col-lg-8 offset-lg-2 col-md-12">
      <template v-if="sent === false">
        <h1> Send password reminder </h1>
        <form class="auth-form" @submit.prevent="sendEmailReminder($event)">
          <div class="block">
              <div class="input-block">
                <span v-on:click="focusInput" class="fake-label">Email</span>
                <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="email" name="email" type="email">
              </div>
              <button class="blue roundedd">Send</button>
          <span :id="respType">{{responseText}}</span>
          </div>
        </form>
      </template>
      <template v-else>
        <h1> Password reminder sent</h1>
        <form class="auth-form" @submit.prevent="sendEmailReminder($event)">
          <div class="block">
              <span class="grey">We will send you an email with a link to reset your password, <br/> please check your spam folder just in case.</span>
              <router-link class="grey underline" to="/login">Click to Log-in</router-link>
          </div>
        </form>
      </template>
      <span> If you need help contact <a href="mailto:help@mail.com">help@mail.com</a> </span>
			</div>

			</div>
			</div>
  </div>
</template>

<script>
import axios from 'axios'
import domfunctions from '@/mixins/domfunctions.js'

export default {
  name: 'Reminder',
  data () {
    return {
      email: '', // MAKE REMINDER CALL
      msg: 'test',
      responseText: '',
      respType: '',
      sent: false,
    }
  },
  mixins: [domfunctions], 
  methods: {
    		sendEmailReminder(e){
          e.preventDefault()
/*           console.log('sending email reminder')
          console.log(e) */
			//IF NOT Logged in make Call
			if(!this.$store.getters.loggedIn){
					axios.post('/auth/password', {
            email: this.email,
          })
					.then(response => {
            let router = this.$router
            console.log(response)
            if(typeof response != 'undefined'){
                this.sent = true
                /* setTimeout(function(){ 
                  //router.push({ path: `/login` })
                }, 10000) */
            } 
            if(typeof response.data.messages != 'undefined'){
                this.responseText = response.data.messages[0].message
						    this.respType = response.data.messages[0].type
            }
					})
					.catch(error => {
						console.log(axios.defaults.headers)
						console.log(error.response);
          if(typeof error.response.data.errors != 'undefined'){
						let errors = error.response.data.errors;
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
                console.log(key + " -> " + errors[key]);
               
								document.querySelector('input[name="'+key+'"]').parentNode.classList.add('input-error', 'animated', 'shake' );
							}
						}
						setTimeout(function(){ 
							document.querySelector('.input-block').classList.remove('animated', 'shake');
						}, 3000);
          }
          
					if(typeof error.response.data.errors != 'undefined'){
						this.responseText = error.response.data.errors.email[0]
						this.respType = 'error'
					}
          })
			}
		},
  }
}
</script>

