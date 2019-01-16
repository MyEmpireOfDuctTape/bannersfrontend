<template>
  <div class="login">
		<div class="container">
			<div class="row">
			<div class="col-lg-8 offset-lg-2 col-md-12">

    <h1> Send password reminder </h1>
    <form class="auth-form" @submit.prevent="sendReminder">
    <div class="block">
        <div class="input-block">
          <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="email" name="email" type="email" placeholder="Email">
        </div>
       
        <button class="blue roundedd">Send</button>
    <span id="error"></span>
    <span id="success"></span>

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
  name: 'Reminder',
  data () {
    return {
      email: '', // MAKE REMINDER CALL
      msg: 'test'
    }
  },
  methods: {
    sendReminder(){
      document.getElementById('success').innerHTML = '';
      document.getElementById('error').innerHTML = '';
      console.log(this.email)
				this.$store.dispatch('sendEmailReminder', {
					email: this.email,
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

