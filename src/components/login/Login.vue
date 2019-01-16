<template>
  <div class="login">
		<div class="container">
			<div class="row">
			<div class="col-lg-8 offset-lg-2 col-md-12">

    <h1> {{ msg }} </h1>
    <div class="block logInForm">
			<form class="auth-form" @submit.prevent="login">
        <div class="input-block">
          <span class="fake-label">Email</span>
          <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="email" type="email" name="email" placeholder="john.doe@bannermaster.ee">
        </div>
        <div class="input-block">
          <span class="fake-label">Password</span>
          <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="password" type="password"  name="password" id="loginPassword" placeholder="Supersecret">
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
  methods : {
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
															$('.logInForm input[name="'+key+'"]').parent().addClass('input-error animated shake');
													}
											}
											setTimeout(function(){ 
												$('.logInForm .input-block').removeClass('animated shake');
											}, 3000);
									}
									if(typeof error.response.data.message != 'undefined'){
										document.getElementById('error').innerHTML = error.response.data.message;
									}
					//	}
				})
			},
      logIn (e){
						e.preventDefault();
						document.getElementById('error').innerHTML = '';
						let inputs = $('.logInForm').find('input');
						let endpoint = '/auth/login';
						let inputsarray = [];
						let data = {};
						inputs.each(function(key, value){
							let name = $(value).attr('name');
							let val = $(value).val();
							inputsarray[name] = val;
						});
						Object.assign(data, inputsarray);
						console.log(data);
						/* console.log(axios); */
						$('.logInForm .input-block').removeClass('input-error');
						axios.post('https://stage.api.banners.ee/v1/auth/login', data)
              .then(function (response) {
								 /* email: 'priit.kuuseorg@gmail.com',
                password: 'Parool' */
								if(response.status == 200){
									router.push({ path: `/dashboard` });
								}
              })
              .catch(function (error) {
								console.log(error.response.data);
                if(error.response.status == 422){
									// error logging in
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
									if(typeof error.response.data.message != 'undefined'){
										document.getElementById('error').innerHTML = error.response.data.message;
									}
								}
              });

						//console.log(result);
						//router.push({ path: `/dashboard` });
						//console.log(router);
            //make ajax call here
			},
			highLightParent(event){
				event.target.parentNode.classList.remove('input-error');
				event.target.parentNode.classList.add('highlighted');
			},
			unHighLightParent(event){
				event.target.parentNode.classList.remove('highlighted');
			}
    }
}
</script>

