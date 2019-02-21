<template>
<div v-bind:id="'edit-user-' + userIndex" v-on:click="hidePopup" class="overlay delete-user Aligner">
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
        <span id="error"></span>
        <button type="submit">DELETE</button>
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
        box-shadow: 0 0 10px 0 red;
    }
    h3{
        text-align: center;
    }
    button[type=submit]{
        background-color: #d01a1a;
        &:hover, &:focus{
            background-color: red;
        }
    }
    
</style>

<script>
import axios from 'axios'
import domfunctions from '@/mixins/domfunctions.js'
export default {
    name: 'DeleteUserModal',
    props: [ 'firstName', 'lastName'],
    data () {
        return {
            msg: 'Delete user',
            password: '',
            /* firstName: null,
            lastName: null,
            password: null,
            passwordConfirmation: null, */
        }
    },
    mixins: [domfunctions],
    created(){
        this.checkIfAutofilled()
    },
    methods : {
        deleteUser(userid){
            axios.defaults.headers.common['Accept'] = 'application/json'
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken,
            axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
            axios.delete('/auth/user', {
                confirmed: 1,
                email: this.$store.getters.getUser.email,// todo check this,
                password: this.password,
            }).then(function (response) {
                console.log(response)
                this.$cookie.delete('accessToken')
                this.$cookie.delete('user')
                this.$store.commit('retrieveToken', null)
				this.$store.commit('retrieveUser', null)
                this.$router.push({ path: `/login` })
            }).catch(function (error) {
                console.log(error.response);       
            });
        },
    }
}
</script>

