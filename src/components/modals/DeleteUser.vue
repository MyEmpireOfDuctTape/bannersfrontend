<template>
<div id="delete-user-modal" v-on:click="hidePopup" class="overlay delete-user Aligner">
    <div class="popup Aligner-item">
        <div class="popup-header">
         <h3>{{ msg }}</h3>
         </div>
        <form class="auth-form" @submit.prevent="deleteUser()"> 
            <span class="error-big">Delete user {{user.firstName}} {{user.lastName}} ?</span>
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
    props: {
        user: { type: Object, required: true },
    },
    data () {
        return {
            msg: 'Delete user',
            confirmed: false,
            userData: this.user,
            loading: false,
            /* firstName: null,
            lastName: null,
            password: null,
            passwordConfirmation: null, */
        }
    },
    mixins: [domfunctions],
    created(){
        //this.checkIfAutofilled()
        console.log(this.userData)
        this.getUserById(this.userData.id)
    },
    methods : {
        async getUserById(id){
            this.loading = true
            // todo
            axios.defaults.headers.common['Accept'] = 'application/json'
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
            const response = await axios.get('/auth/user')
            console.log(response.data)
            
            
            this.loading = false
        },
        deleteUser(){
            axios.defaults.headers.common['Accept'] = 'application/json'
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken,
            axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
            let payload = {
                    confirmed: this.confirmed,
                    email: this.userData.email,
                    password: this.password,
                    _method: 'delete'
            }
            console.log(payload)
            axios.post('/auth/user', payload)
            .then((response) => {
                console.log(response)
                this.$cookie.delete('accessToken')
                this.$cookie.delete('user')
                this.$store.commit('retrieveToken', null)
                this.$store.commit('retrieveUser', null)
                this.$store.commit('setCurrentCompany', null)
                this.$emit('company-changed', this.currentCompany)
                //this.$router.push({ path: `/login` })
            }).catch((error) => {
                console.log(error)   
            });
        },
        showDelete(event){
            event.preventDefault();
            this.confirmed = true
            document.querySelector('button#delete').style.display = 'block'
        },
        dissmissDelete(event){
            this.confirmed = false
                /* console.log(document.querySelector('#delete-user-modal'))
                document.querySelector('#delete-user-modal').classList.add('animated', 'slideOutRight')
                setTimeout(function(){
                        
                    
                }, 2000) */
                console.log('animatecss')
                this.animateCss(event, '#delete-user-modal', 'slideOutRight', () => {
                    let node = document.querySelector('#delete-user-modal')
                    node.classList.remove('open')
                }); /* , function() {
                     document.querySelector('#delete-user-modal').classList.remove('animated', 'slideOutRight', 'open')
                });   */
            
        },
    }
}
</script>

