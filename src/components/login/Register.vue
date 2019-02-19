<template>
  <div class="login">
		<div class="container">
			<div class="row">
			<div class="col-lg-8 offset-lg-2 col-md-12">

    <h1> {{ msg }} </h1>
    <div class="block">
        <!-- <div class="half-input-row">
            <div class="input-block half-width">
            <input type="text" placeholder="First Name">
            </div>
            <div class="input-block half-width">
            <input type="text" placeholder="Last Name">
            </div>
        </div>   -->  
        <div class="row">
            <div class="col-lg-6 col-sm-12">
                <div class="input-block half-width">
                    <span v-on:click="focusInput" class="fake-label">First Name</span>
                    <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="firstName" name="firstName" type="text">
                </div>
            </div>
            <div class="col-lg-6 col-sm-12">
                <div class="input-block half-width">
                    <span v-on:click="focusInput" class="fake-label">Last Name</span>
                    <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="lastName" name="lastName" type="text">
                </div>
            </div>    
        </div>  
        <div class="input-block focused disabled">
           <span v-on:click="focusInput" class="fake-label">Email</span>
           <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="email" name="email" type="text" disabled>
        </div>
        <div class="input-block">
          <span v-on:click="focusInput" class="fake-label">Password</span>
           <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="password" name="password" type="password">
        </div>
        <div class="input-block">
           <span v-on:click="focusInput" class="fake-label">Confirm Password</span>
           <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="passwordConfirmation" name="passwordConfirmation" type="password">
        </div>
       <div class="checkbox-group normal">
                <span v-on:click="checkBox"></span><label for="data_accept">I accept the <a href="" target="_blank">terms &amp; conditions</a></label>
                    <input v-model="terms" type="checkbox" name="data_accept">
        </div>
        <button class="blue roundedd">Register</button>
    </div>
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
  name: 'Register',
  data () {
    return {
      msg: 'Register as user',
      firstName: null,
      lastName: null,
      email: 'test',//null,
      password: null,
      passwordConfirmation: null,
      terms: false,
    }
  },
  created(){
    //console.log(this.$route.params.token)
    this.getInvitation()
  },
  mixins: [domfunctions],
  methods:{
        async getInvitation(){
          // https://stage.banners.ee/#/invitation/I1ZsEYZxAJ7SoMRBGi9k -> juhan.soone@gmail.com
            if(typeof this.currentCompany != null){
                    axios.defaults.headers.common['Accept'] = 'application/json'
                    //const response = await axios.get('/auth/invitation/'+this.$route.params.token)
                     axios.get('/auth/invitation/'+this.$route.params.token)
                    .then(response => {
                      console.log(response)
                      if(typeof response.data.invitation.user != undefined){
                        this.email = response.data.invitation.user.email
                      }
                    })
                    .catch(error => {
                      console.log(error.response)
                    }) 
                    //this.users = response.data.company.users
                    console.log(response.data)

            }    
        },
        registerUser(){
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
                    axios.defaults.headers.common['Accept'] = 'application/json',
                    axios.defaults.headers.common['Content-Type'] = 'application/json',
                    axios.defaults.headers.common['Company'] = this.currentCompany.id
                    axios.patch('/auth/register', {
                      firstName: this.firstName,
                      lastName: this.lastName,
                      email: this.email,
                      password: this.password,
                      passwordConfirmation: this.passwordConfirmation,
                      terms: this.terms,
                    }).then(function (response) {
                        console.log(response);
                    }).catch(function (error) {
                        console.log(error.response);       
                    });
        },
        checkBox(e){
            $(e.target).toggleClass('checked');
            this.terms = !this.terms
            console.log(this.terms)
            /* var checkBoxes = $(e.target).parent().find('input[type="checkbox"]');
            checkBoxes.prop('checked', !checkBoxes.prop('checked')); */
        },
    },
}
</script>

