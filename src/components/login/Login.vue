<template>
  <div class="login">
		<div class="container">
			<div class="row">
			<div class="col-lg-8 offset-lg-2 col-md-12">

    <h1> {{ msg }} </h1>
    <div class="block logInForm">
			<form class="auth-form" @submit.prevent="login">
        <div class="input-block">
          <span v-on:click="focusInput" class="fake-label">Email</span>
          <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-on:change="changed" v-model="email" type="email" name="email" placeholder="john.doe@bannermaster.ee">
        </div>
        <div class="input-block">
          <span v-on:click="focusInput" class="fake-label">Password</span>
          <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-on:change="changed" v-model="password" type="password"  name="password" id="loginPassword" placeholder="Supersecret">
        </div>
        <button class="blue roundedd">Log in</button>
			</form>
      <span id="error"></span>

        <router-link to="/reminder">Forgot your password?</router-link>

    </div>
      <span> If you need help contact <a href="mailto:help@mail.com">help@mail.com</a> </span>
			</div>

			</div>
			</div>
  </div>
</template>

<script>
import domfunctions from '@/mixins/domfunctions.js'

export default {
	name: 'Login',
  data () {
    return {
			msg: 'Authenticate',
			email: '',
      password: '',
      submitted: false
    }
	},
	mounted(){
		this.clickFirstInput()
	},
	mixins: [domfunctions],	
  methods: {
			clickFirstInput(){
				document.document.querySelector('input')[0].focus()
			},
			changed(){
				this.checkIfAutofilled()
			},
			login(){
				this.$store.dispatch('retrieveToken', {
					email: this.email,
					password: this.password,
				}).then(response => {
					console.log(response)
					this.$router.push({ path: `/dashboard` });
				}).catch(error => {
					console.log(error.response);
					//if(error.response.status == 422){
									// error logging in
									if(typeof error.response.data.errors != 'undefined'){
										let errors = error.response.data.errors;
											for (var key in errors) {
													if (errors.hasOwnProperty(key)) {
															console.log(key + " -> " + errors[key]);
															document.querySelector('.logInForm input[name="'+key+'"]').parentNode.classList.add('input-error', 'animated', 'shake');
													}
											}
											setTimeout(function(){ 
													document.querySelector('.logInForm .input-block').classList.remove('animated', 'shake');
											}, 3000);
									}
									if(typeof error.response.data.message != 'undefined'){
										document.getElementById('error').innerHTML = error.response.data.message;
									}
					//	}
				})
			},
    }
}
</script>

