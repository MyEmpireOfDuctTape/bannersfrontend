<template>
<div id="add-folder-overlay" v-on:click="hidePopup" class="overlay add-folder Aligner">
    <div class="popup Aligner-item">
        <div class="popup-header">
         <h3>{{ msg }}</h3>
         </div>
        <form class="auth-form" @submit.prevent=""> 
         <div class="input-block">
          <span v-on:click="focusInput" data-initial="Folder name" class="fake-label">Folder name</span>
          <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="name" type="text" name="name">
        </div>
        <span id="error"></span>
        <button type="submit">Create folder</button>
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
  name: 'AddUserModal',
  data () {
    return {
        msg: 'Create a User',
        currentCompany: this.$store.getters.getCurrentCompany || null,
        companyToChangeId : 1,
    }
  },
  mixins: [domfunctions],
  created(){
        console.log('adduser created')
        if(this.currentCompany == null){
            this.$store.commit('setCurrentCompany', this.$store.getters.getUser.companies[0])
            this.currentCompany = this.$store.getters.getUser.companies[0]
        }
        console.log(this.currentCompany)

  },
  methods : {
            async createUser(){

                // todo - creat the fucking user
                
            if(typeof this.currentCompany != null){
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
                    axios.defaults.headers.common['Accept'] = 'application/json',
                    axios.defaults.headers.common['Content-Type'] = 'application/json',
                    axios.defaults.headers.common['Company'] = this.currentCompany.id
                    const response = await axios.post('/companies/'+this.companyToChangeId,{
                        name: this.currentCompany.name,
                        registrationCode: this.currentCompany.registrationCode,
                        vatNumber: this.currentCompany.vatNumber,
                        country: this.currentCompany.country,
                        city: this.currentCompany.city,
                        address: this.currentCompany.address,
                        address: this.currentCompany.address,
                    })
                    this.users = response.data.company.users
                    console.log(this.users)
            }    
        },

    }
}
</script>

