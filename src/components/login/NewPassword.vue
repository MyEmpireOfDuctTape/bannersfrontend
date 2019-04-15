<template>
  <div class="login">
		<div class="container">
			<div class="row">
			<div class="col-lg-8 offset-lg-2 col-md-12">

    <h1> {{ msg }} </h1>
    <form class="auth-form" @submit.prevent="updatePassword">

    <div class="block">
        <div class="input-block">
          <span v-on:click="focusInput" class="fake-label">Password</span>
          <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="password" name="password" type="password">
        </div>
        <div class="input-block">
          <span v-on:click="focusInput" class="fake-label">Confirm new password</span>
          <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="passwordConfirmation" name="passwordConfirmation" type="password">
        </div>
       
        <button class="blue roundedd">Submit</button>
    <span :id="responseType">{{ responseText }}</span>
    </div>
    </form>
      <span> If you need help contact <a href="mailto:help@mail.com">help@mail.com</a> </span>
			</div>

			</div>
			</div>
  </div>
</template>

<script>
import domfunctions from '@/mixins/domfunctions.js'
import axios from 'axios'

export default {
  name: 'NewPassword',
  data () {
    return {
      msg: 'Set a new password ',
      token: this.$route.params.token,
      password: '',
      passwordConfirmation: '',
      responseText: '',
      responseType: '',
    }
  },
  mixins: [domfunctions],
  created(){
    this.checkIfValidToken()
  },  
  methods : {
    checkIfValidToken(){
        axios.get('/auth/password/'+this.token)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.response)
            if(error.response.status == 404){
              this.$router.push({ path: `/login` });
            }
        })
    },
    updatePassword(){
          axios.post('/auth/password/' + this.token, {
					password: this.password,
          passwordConfirmation: this.passwordConfirmation,
				})
					.then(response => {
            console.log(response)
            if(response.status == 200){
              this.$router.push({ path: `/login` });
            }
            this.responseText = response.data.messages[0].type
            this.responseType = response.data.messages[0].message
					})
          .catch(error => {
            if(error.response.status == 404){
              this.$router.push({ path: `/login` });
            }
            else{
              if(typeof error.response.data.errors != 'undefined'){
                let errors = error.response.data.errors;
                for (var key in errors) {
                  if (errors.hasOwnProperty(key)) {
                    console.log(key + " -> " + errors[key]);
                    let inputs = document.querySelectorAll('input[type="'+key+'"]')
                      console.log(inputs)

                    for (let index = 0; index < inputs.length; inputs++) {
                      inputs[index].parentNode.classList.add('input-error', 'animated', 'shake' )
                                            console.log(inputs[index])
                    }
                    this.responseText = errors[key][0]
                    this.responseType = 'error'
                  }
                }
              }
            }
						console.log(axios.defaults.headers)
						console.log(error.response)
					})
			},
      updatePassword2(){
      console.log('updating pass')
				this.$store.dispatch('updatePassword', {
					password: this.password,
          passwordConfirmation: this.passwordConfirmation,
          token: this.token,
				}).then(response => {
          console.log(response)
          if(typeof response == 'undefined'){
              this.$router.push({ path: `/dashboard` });
          }
          if(typeof response.data.messages != 'undefined'){
              document.getElementById('success').innerHTML = response.data.messages[0].message;
          }
          
          //this.$router.push({ path: `/login` });s
          
				}).catch(error => {
          console.log(error.response);
          if(typeof error.response.data.errors != 'undefined'){
						let errors = error.response.data.errors;
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
                console.log(key + " -> " + errors[key]);
                let inputs = document.querySelectorAll('input[type="'+key+'"]')
                for (let index = 0; index < inputs.length; inputs++) {
                  console.log(inputs[index].parentNode)
                  console.log(inputs)
                  inputs[index].parentNode.classList.add('input-error', 'animated', 'shake' );
                }
                //document.querySelectorAll('input[type="'+key+'"]').parentNode.classList.add('input-error', 'animated', 'shake' );
							}
						}
						setTimeout(function(){ 
              let inputblocks = document.querySelectorAll('.input-block')
                  

              for (var key in inputblocks) {
                inputblocks[key].classList.remove('animated', 'shake');
                console.log(inputblocks[key].classList)
              }
							//document.querySelector('.input-block').classList.remove('animated', 'shake');
						}, 3000);
					}
					if(typeof error.response.data.password != 'undefined'){

						document.getElementById('error').innerHTML = error.response.data.message;
					}
          //this.$router.push({ path: `/dashboard` })
				})
			},
			
    }
}
</script>