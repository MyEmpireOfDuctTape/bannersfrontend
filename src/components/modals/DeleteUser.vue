<template>
<div id="delete-user-modal" v-on:click="hidePopup" class="overlay delete-user Aligner">
    <div class="popup Aligner-item">
        <div class="popup-header">
         <h3>{{ msg }}</h3>
         </div>
        <form class="auth-form" @submit.prevent="deleteUser"> 
            <span class="error-big">Delete user {{firstName}} {{lastName}} ?</span>
            <div class="danger-popup">
            <span>Are you sure?</span>
                <div class="buttons">
                    <a href="#" class="yes" v-on:click="showDelete">YES</a>
                    <a href="#" class="no" v-on:click="dissmissDelete">NO</a>
                </div>
            </div> 
            <!-- <div class="input-block disabled focused">
                <span v-on:click="focusInput" data-initial="First name" class="fake-label">First name</span>
                <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="firstName" type="text" name="name" disabled>
            </div>
            <div class="input-block disabled focused">
                <span v-on:click="focusInput" data-initial="Last name" class="fake-label">Last name</span>
                <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="lastName" type="text" name="name" disabled>
            </div>
            <div class="input-block">
                <span v-on:click="focusInput" data-initial="Password" class="fake-label">Password</span>
                <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="password" type="password" name="name">
            </div> -->
        <span id="error"></span>
        <button style="display: none" id="delete" type="submit">DELETE</button>
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
            confirmed: false,
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
            let payload = {
                    confirmed: this.confirmedtrue,
                    email: this.$store.getters.getUser.email,
                    password: this.password,
                    _method: 'delete'
            }
            console.log(payload)
            axios.post('/auth/user', payload)
            .then(function (response) {
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
        showDelete(event){
            event.preventDefault();
            this.confirmed = true
            document.querySelector('button#delete').style.display = 'block'
        },
        dissmissDelete(event){
                console.log(document.querySelector('#delete-user-modal'))
                document.querySelector('#delete-user-modal').classList.add('animated', 'slideOutRight')
                setTimeout(function(){
                        document.querySelector('#delete-user-modal').classList.remove('animated', 'slideOutRight', 'open')
                    
                }, 2000)
            
        }
    }
}
</script>

