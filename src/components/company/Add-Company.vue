<template>
    <div class="fullpage container-fluid">
        <div class="row">
                <sidebar></sidebar>
		        <button v-on:click="createCompany"
			</div>
		</div>

</template>

<script>

import Sidebar from '../sidebar/Sidebar'
import domfunctions from '@/mixins/domfunctions.js'
import axios from 'axios'


export default {
  name: 'EditCompany',
  components: {
      Sidebar
  },
  data () {
    return {
      
    }
  },
  created(){
    if(this.currentCompany == null){
            this.$store.commit('setCurrentCompany', this.$store.getters.getUser.companies[0])
            this.currentCompany = this.$store.getters.getUser.companies[0]
    }
     if(this.currentAccessLevel == null){
            this.$store.commit('setCurrentAccessLevel', this.$store.getters.getUser.companies[this.currentCompany.id])
            let index = this.returnTheCompanyIndexById(this.currentCompany.id)
            this.currentAccessLevel = this.$store.getters.getUser.companies[index].pivot.role
            console.log(this.currentAccessLevel)
    }
    this.name = this.currentCompany.name
    this.registrationCode = this.currentCompany.registrationCode
    this.vat_number = this.currentCompany.vatNumber
    this.country = this.currentCompany.country
    this.city = this.currentCompany.city
    this.address = this.currentCompany.address

    this.getUsers()
  },
  mixins: [domfunctions],
  methods:{
        returnTheCompanyIndexById(id){
            let companies = this.$store.getters.getUser.companies
            let found = companies.find(company => 
               company.id == id
            )
            console.log(companies)
            console.log(typeof companies)
            if(typeof companies == 'object'){
                return 0
            }
            let index = companies.findIndex(found)
            return index
        },
        async getUsers(){
            if(typeof this.currentCompany != null){
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
                    const response = await axios.get('/companies/'+this.currentCompany.id)
                    this.users = response.data.company.users
                    console.log(this.users)
            }    
        },
    },
}



//use this 
/* data() {
    return {
        house: {
            livingroom: {
                lights: 4
            }
        }
    }
},
watch: {
    'house.livingroom.lights' : function(newVal, oldVal) {
        // triggered when lights is changed
    }
} */
</script>

