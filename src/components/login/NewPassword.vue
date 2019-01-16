<template>
  <div class="login">
		<div class="container">
			<div class="row">
			<div class="col-lg-8 offset-lg-2 col-md-12">

    <h1> {{ msg }} </h1>
    <form class="auth-form" @submit.prevent="updatePassword">

    <div class="block">
        <div class="input-block">
          <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="password" name="password" type="password" placeholder="Password">
        </div>
        <div class="input-block">
          <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="passwordConfirmation" name="passwordConfirmation" type="password" placeholder="Confirm new password">
        </div>
       
        <button class="blue roundedd">Submit</button>
    <span id="error"></span>
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
  name: 'NewPassword',
  data () {
    return {
      msg: 'Set a new password ',
      token: this.$route.params.token,
      password: '',
      passwordConfirmation: '',
    }
  },
  methods : {
      updatePassword(){
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