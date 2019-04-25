<template>
<div id="add-user-overlay" v-on:click="hidePopup" class="overlay add-folder Aligner">
    <div class="popup Aligner-item">
        <div class="popup-header">
         <h3>{{ msg }}</h3>
         </div>
        <form class="auth-form" id="addUser" @submit.prevent="createUser()"> 
        <dropDown v-on:element-selected="selectCompany($event)" defaultValue="Select user company" name="User company" v-bind:optionsArray="availableCompanies" ></dropDown>
         <div class="input-block">
          <span v-on:click="focusInput" data-initial="User email" class="fake-label">User email</span>
          <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="email" type="text" name="email">
        </div>
        <dropDown v-on:element-selected="selectAccessLevel($event)" defaultValue="Select user access level" name="User access level" v-bind:optionsArray="accessLevels" ></dropDown>
        <span id="error"></span>
        <span :id="respType">{{responseText}}</span>
        <button type="submit">Create User</button>
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
import dropDown from '@/components/htmlComponents/dropDown'
export default {
  name: 'AddUserModal',
  data () {
    return {
        msg: 'Create a User',
        currentCompany: this.$store.getters.getCurrentCompany || null,
        currentAccessLevel: this.$store.getters.getCurrentAccessLevel || null,
        accessLevels: [
            {   
                'value': 'admin',
                'name': 'Administrator'
            },
            {   
                'value': 'developer',
                'name': 'Developer'
            },
            {   
                'value': 'designer',
                'name': 'Designer'
            },
        ],
        availableCompanies: [],

        //params to send
        selectedCompanyId : null,
        selectedCompany: {
            name: null,
            registrationCode: 12345678, //null,
            vat_number: 123456789, //null,
            country: 'Eesti', //null,
            city: 'Tallinn', // null,
            address: "Aadress", //null
            email: 'test@test.ee', //null,
            users: [
                
            ]
        },
        responseText: '',
        respType: 'error',
        selectedAccessLevel: null,
        email: null,

    }
  },
  components: {
        dropDown
  },
  mixins: [domfunctions],
  created(){
            if(this.currentCompany == null){
                this.$store.commit('setCurrentCompany', this.$store.getters.getUser.companies[0])
                this.currentCompany = this.$store.getters.getUser.companies[0]
            }
            if(this.currentAccessLevel == null){
                let index = _.findIndex(this.$store.getters.getUser.companies , company => {
                    return company.id == this.$store.getters.getCurrentCompany.id
                });
                this.currentAccessLevel = this.$store.getters.getUser.companies[index].pivot.role
                this.$store.commit('setCurrentAccessLevel', this.$store.getters.getUser.companies[index].pivot.role)
            }
            this.setAvailableCompanies()
            //console.log(this.availableCompanies)
  },
  methods : {
            selectCompany(id){
                //this.selectedCompany = id
                let companies = this.$store.getters.getUser.companies 
                let company = _.find(this.availableCompanies, company => {
                    return company.value == id
                })
                console.log(company)
                this.selectedCompanyId = company.value
                this.selectedCompany.name = company.name == null ? this.selectedCompany.name : company.name
                this.selectedCompany.registrationCode = company.registrationCode == null ? this.selectedCompany.registrationCode : company.registrationCode
                this.selectedCompany.vat_number = company.vatNumber == null ? this.selectedCompany.vat_number : company.vatNumber
                this.selectedCompany.country = company.country == null ? this.selectedCompany.country : company.country
                this.selectedCompany.city = company.city == null ? this.selectedCompany.city : company.city
                this.selectedCompany.address = company.address == null ? this.selectedCompany.address : company.address
                this.selectedCompany.email = company.email == null ? this.selectedCompany.email : company.email
                console.log(this.selectedCompany)
            },
            selectAccessLevel(accessLevelName){
                this.selectedAccessLevel = accessLevelName
                this.selectedCompany.users.push({
                    email: this.email,
                    role: this.selectedAccessLevel
                })
            },
            setAvailableCompanies(){
                let companies = this.$store.getters.getUser.companies 
                console.log(companies)
                _.forEach(companies, (company, index) => {
                    if(company.pivot.role == 'admin'){
                        this.availableCompanies.push(
                            {   
                                'value': company.id,
                                'name': company.name
                            }
                        )
                    }
                })
            },
            async createUser(){
            if(typeof this.currentCompany != null){

                console.log(this.selectedCompany)
                console.log(this.body)
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
                    axios.defaults.headers.common['Accept'] = 'application/json',
                    axios.defaults.headers.common['Content-Type'] = 'application/json',
                    axios.defaults.headers.common['Company'] = this.currentCompany.id
                    let serialized = '?'
                    _.forEach(this.selectedCompany, (value, index) => {
                        
                        if(index == 'vat_number'){
                            serialized += index + '=testtestt&'
                        }
                        else if(index == 'email'){
                            serialized += index + '=juhan.soone@havas.ee&'
                        }
                        else if(value == null && index != 'vat_number'){
                            serialized += index + '=testtest&'
                        }
                        else{
                            serialized += index + '=' + value + '&'
                        }
                        
                    })
                    serialized = serialized.substring(0, serialized.length - 1)
                    //let serialize = Object.entries(this.selectedCompany).map(([key, val]) => `${key}=${val}`).join('&')

                    console.log(this.selectedCompany)
                    console.log(this.selectedCompanyId)
                    axios.patch('/companies/'+this.selectedCompanyId, this.selectedCompany)
                    .then(function (response) {
                        console.log(response)
                        this.hidePopup()
                    }).catch(function (error) {
                        console.log(error.response); 
                        if(typeof error.response != 'undefined' && typeof error.response.data.message != 'undefined'){
                            document.getElementById('error').innerHTML = error.response.data.message
                        }
                        if(typeof error.response != 'undefined' && typeof error.response.data.errors != 'undefined'){
						let errors = error.response.data.errors;
							for (var key in errors) {
								if (errors.hasOwnProperty(key)) {
									console.log(key + " -> " + errors[key]);
                                    //$('input[name="'+key+'"]').parent().addClass('input-error animated shake')
                                    document.querySelector('#addUser input[name="'+key+'"]').parentNode.classList.add('input-error', 'animated', 'shake' )
									document.querySelector('#addUser input[name="'+key+'"]').parentNode.children[0].innerHTML = errors[key]
								}
							}
							setTimeout(function(){
                                for (var key in errors) {
                                    if (errors.hasOwnProperty(key)) {
                                        console.log(document.querySelector('#addUser input[name="'+key+'"]').parentNode)
                                        document.querySelector('#addUser input[name="'+key+'"]').parentNode.classList.remove('input-error', 'animated', 'shake' )
                                        document.querySelector('#addUser input[name="'+key+'"]').parentNode.children[0].innerHTML = document.querySelector('input[name="'+key+'"]').parentNode.children[0].dataset.initial
                                    }
                                }
                                if(typeof error.response.data.message != 'undefined'){
								    document.getElementById('error').innerHTML = ''
						        }
							}, 5000);
						}
						if(typeof error.response != 'undefined' && typeof error.response.data.message != 'undefined'){
										document.getElementById('error').innerHTML = error.response.data.message;
									}           
                    });
            }    
        },

    }
}
</script>

