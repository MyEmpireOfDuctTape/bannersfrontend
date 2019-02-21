<template>
<div id="edit-user-modal" v-on:click="hidePopup" class="overlay edit-user Aligner">
    <div class="popup Aligner-item">
        <div class="popup-header">
         <h3>{{ msg }}</h3>
         </div>
        <form class="auth-form" @submit.prevent="editUser"> 
            <div class="input-block">
                <span v-on:click="focusInput" data-initial="First name" class="fake-label">First name</span>
                <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="firstName" type="text" name="name">
            </div>
            <div class="input-block">
                <span v-on:click="focusInput" data-initial="Last name" class="fake-label">Last name</span>
                <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="lastName" type="text" name="name">
            </div>
            <div class="input-block">
                <span v-on:click="focusInput" data-initial="Password" class="fake-label">Password</span>
                <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="password" type="text" name="name">
            </div>
            <div class="input-block">
                <span v-on:click="focusInput" data-initial="Password Confirmation" class="fake-label">Password Confirmation</span>
                <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="passwordConfirmation" type="text" name="name">
            </div>
        <span id="error"></span>
        <button type="submit">Save</button>
        </form>
    </div>    
    </div>    
 
</template>

<style lang="scss" scoped>
    .popup{
        background-color: white;
        z-index: 400;
        padding: 2rem;
        border-radius: 5px;
        box-shadow: 0 0 10px 0 rgba(163,231,251,0.7);
    }
    h3{
        text-align: center;
    }
    
</style>

<script>
import axios from 'axios'
import domfunctions from '@/mixins/domfunctions.js'
export default {
    name: 'EditUserModal',
    props: ['userIndex', 'firstName', 'lastName', 'password', 'passwordConfirmation'],
    data () {
        return {
            msg: 'Edit user',
            firstName: this.props.firstName,

            /* firstName: null,
            lastName: null,
            password: null,
            passwordConfirmation: null, */
        }
    },
    mixins: [domfunctions],
    created(){
        this.checkIfAutofilled()
        console.log(this.props.firstName)
    },
    methods : {
        editUser(){
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
            axios.defaults.headers.common['Accept'] = 'application/json'
            axios.patch('/auth/user', {
                confirmed: 1,
                email: this.$store.getters.getUser.email,// todo check this,
                password: this.password,
                passwordConfirmation: this.passwordConfirmation,
            }).then(function (response) {
                console.log(response)
                if(typeof response.data.token != undefined){
                    let date = new Date()
                    date.setTime(token.expiresIn)
                    this.$cookie.set('accessToken', JSON.stringify(response.data.token) , date.toUTCString());
					this.$cookie.set('user', JSON.stringify(response.data.user), date.toUTCString());
                    this.$store.commit('retrieveToken', response.data.token)
                    this.$store.commit('retrieveUser', response.data.token)
                } 
            }).catch(function (error) {
                console.log(error.response);       
            });

        }
    }
}
</script>

