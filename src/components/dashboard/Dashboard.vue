<template>

    <div class="fullpage container-fluid">
         
        <div class="row">
                <sidebar v-on:company-changed="methodThatForcesUpdate($event)"></sidebar>
               <add-banner></add-banner>
                <template v-if="loading">
                    <Loading></Loading>
                </template>
		<div class="dashboard main-view container-fluid">
                <div class="banners-by-company row">
                   <template v-for="company in user.companies">
                        <div v-on:click="setCurrentCompany(company.id)" v-bind:class="isCurrentCompany(company.id)" class="banner-by-company col-lg-3 col-md-6 col-sm-12">
                            <span class="allcaps">{{ company.name }}</span><br />
                            <span class="small">{{ company.bannersCount }} banners, {{ company.templatesCount }} templates</span>
                        </div>
                    </template>
                </div>
                <div class="recent-banners">
                    <div class="header row">
                        <div class="left col-lg-8">
                            <h1>My recent Banners ({{banners.totalCount}})</h1>
                        </div>
                        <div class="right col-lg-4">
                                <button v-on:click="showOverlay" class="create blue roundedd">Create banner</button>
                            
                            <router-link to="/banners"><button class="view blue roundedd">View all</button></router-link>
                         </div>   
                    </div>
                    <div class="banner-slide row">
                       <div v-for="banner in banners.banners" class="col-lg-2 col-md-3 col-sm-6">
                            <!-- <div class="preview">
                                <div class="square">
                                    <div class="edit-overlay Aligner">
                                        <button v-on:click="checkBoxToggle" class="check"></button>
                                        <input type="checkbox" class="">
                                        <button v-on:click="editPopup" class="edit"></button>
                                        <div class="edit-box">
                                            <ul>
                                                <li><a href="#">
                                                     <svg version="1.1" fill="#ededed" id="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>60 all</title> <g> <path d="M76.6,51.8v24.8H23.4V23.4h24.8V12.7H18.1c-3,0-5.4,2.4-5.4,5.4V82c0,3,2.4,5.4,5.4,5.4H82c3,0,5.4-2.4,5.4-5.4V51.8H76.6z "/> <path d="M44,44.6l-4.2,11.1c-0.5,1.9,0.6,3.9,2.5,4.4c0.6,0.1,1.3,0.1,1.9,0L55.4,56c0.6-0.1,1.2-0.5,1.5-1l28.6-28.6 c1.4-1.4,2.3-2.9,0.8-4.2l-7.7-7.9c-1.4-1.4-3.7-1.4-5,0L45,43C44.5,43.4,44.2,44,44,44.6z"/> </g> </svg>
                                                    Edit</a></li>
                                                <li><a href="#">
                                                     <svg version="1.1" id="" fill="#ededed" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>Duplicate Solid</title> <desc>Created with Sketch.</desc> <g> <g> <path d="M45.5,14h33H86v7.5v33V62h-8v8h8c4.4,0,8-3.6,8-8v-7.5v-33V14c0-4.4-3.6-8-8-8h-7.5h-33H38c-4.4,0-8,3.6-8,8v8h8v-8H45.5 L45.5,14L45.5,14z M6,38c0-4.4,3.6-8,8-8h48c4.4,0,8,3.6,8,8v48c0,4.4-3.6,8-8,8H14c-4.4,0-8-3.6-8-8V38L6,38L6,38z"/> </g> </g> </svg>
                                                    Duplicate</a></li>
                                                <li><a href="#">
                                                     <svg version="1.1" id="" fill="#e0e0e0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>09</title> <path d="M22.8,28.6l0.1,45.2c0,7.2,5.8,13,13,13h28.3c7.2,0,13-5.8,13-13l0.1-45.2h7.4c1.7,0,3-1.3,3-3s-1.3-3-3-3H63.6v-2.5 c0-3.9-3.1-7-7-7H43.4c-3.9,0-7,3.1-7,7v2.5H15.3c-1.7,0-3,1.3-3,3s1.3,3,3,3H22.8z M53,69.8c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9 c0-1.7,1.3-3,3-3s3,1.3,3,3V69.8z M58,40.9c0-1.7,1.3-3,3-3s3,1.3,3,3v28.9c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9z M42.4,20.2 c0-0.6,0.4-1,1-1h13.2c0.6,0,1,0.4,1,1v2.5H42.4V20.2z M36,40.9c0-1.7,1.3-3,3-3s3,1.3,3,3v28.9c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9z" /> </svg>
                                                    Delete</a></li>
                                            </ul>
                                        </div>
                                         <img class="Aligner-item land" src="../../assets/img/banner.jpg">
                                    </div>   
                                </div>     
                            </div>   -->  
                            <router-link :to="{ path: '/banners/edit-banner/' + banner.id }">
                            <div v-bind:class="returnAspectRatio(banner.size.width, banner.size.height) + ' dimension-box'">
                                      <!--    <img class="Aligner-item land" src="../../assets/img/banner_tower.svg">
                                <img v-bind:src="'../../assets/img/banner_' + returnAspectRatio(banner.size.width, banner.size.height) + '.svg'"> -->
                                <template v-if="returnAspectRatio(banner.size.width, banner.size.height) == 'tower'">
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 40 40" style="enable-background:new 0 0 40 40;" xml:space="preserve"><g id="Page-1" class="st0"> <g id="image-gallery-copy-2"> <path id="Shape" d="M6.2,26.8V9.6H3.5C1.6,9.6,0,11.2,0,13.2v23.2c0,1.9,1.6,3.5,3.5,3.5h23.2c1.9,0,3.5-1.6,3.5-3.5v-2.5H13.2 C9.3,33.9,6.2,30.7,6.2,26.8z"/> <path d="M36.5,0.1H13.2c-1.9,0-3.5,1.6-3.5,3.5v23.2c0,1.9,1.6,3.5,3.5,3.5h23.2c1.9,0,3.5-1.6,3.5-3.5V3.6 C40,1.6,38.4,0.1,36.5,0.1z M28.5,25.5h-6.8V4.7h6.8V25.5z"/> </g> </g> </svg> 
                                </template>
                                <template v-else-if="returnAspectRatio(banner.size.width, banner.size.height) == 'rectangle'">
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 40 40" style="enable-background:new 0 0 40 40;" xml:space="preserve"> <g id="Page-1" class="st0"> <g id="image-gallery-copy-3"> <path id="Shape" d="M6.2,26.8V9.6H3.5C1.6,9.6,0,11.2,0,13.2v23.2c0,1.9,1.6,3.5,3.5,3.5h23.2c1.9,0,3.5-1.6,3.5-3.5v-2.5H13.2 C9.3,33.9,6.2,30.7,6.2,26.8z"/> <path d="M36.5,0.1H13.2c-1.9,0-3.5,1.6-3.5,3.5v23.2c0,1.9,1.6,3.5,3.5,3.5h23.2c1.9,0,3.5-1.6,3.5-3.5V3.6 C40,1.6,38.4,0.1,36.5,0.1z M35.2,18.4H15v-6.4h20.1V18.4z"/> </g> </g> </svg> 
                                </template>
                                <template v-else-if="returnAspectRatio(banner.size.width, banner.size.height) == 'squaree'">
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 40 40" style="enable-background:new 0 0 40 40;" xml:space="preserve"> <g id="Page-1" class="st0"> <g id="image-gallery-copy-4"> <path id="Shape" d="M6.2,26.8V9.6H3.5C1.6,9.6,0,11.2,0,13.2v23.2c0,1.9,1.6,3.5,3.5,3.5h23.2c1.9,0,3.5-1.6,3.5-3.5v-2.5H13.2 C9.3,33.9,6.2,30.7,6.2,26.8z"/> <path d="M36.5,0.1H13.2c-1.9,0-3.5,1.6-3.5,3.5v23.2c0,1.9,1.6,3.5,3.5,3.5h23.2c1.9,0,3.5-1.6,3.5-3.5V3.6 C40,1.6,38.4,0.1,36.5,0.1z M30.5,20.4H19.7V10.1h10.8V20.4z"/> </g> </g> </svg>     
                                </template>
                                <span>{{banner.size.width}}x{{banner.size.height}}</span>
                            </div>
                            <span>{{banner.name}}</span>
                            </router-link>
                        </div>
                        <template v-if="banners.totalCount == 0">
                            <span class="sad">No banners yet :'(</span>
                        </template>    

                      
                </div>
                </div>
                <div class="recent-templates">
                    <div class="header row">
                        <div class="left col-lg-8">
                            <h1>My recent Templates ({{templates.totalCount}})</h1>
                        </div>
                        <div class="right col-lg-4">
                            <button v-on:click="showOverlay" class="create blue roundedd">Create banner</button>
                            <router-link to="/templates"><button class="view blue roundedd">View all</button></router-link>
                         </div>   
                    </div>
                    <div class="template-list">
                        <div v-for="template in templates.templates" class="template row">
                            <div class="left col-lg-6">
                                <router-link :to="{ path: '/templates/' + template.name}"><span class="bold">{{template.name}}</span></router-link>
                                <span v-for="size in template.sizes" class="dimension">{{size.width}} x {{size.height}}</span>
                            </div>
                            <div class="right col-lg-6">
                                <div class="images">
                                                <div class="svg-wrapper popover-wrapper" data-popover="View Gallery of banners made with this template">      
                                                    <svg class="duplicate" version="1.1" id="Layer_1" fill="#e0e0e0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>All</title> <g id="Desktop"> <g id="Templates" transform="translate(-1270.000000, -689.000000)"> <g id="image-gallery-copy-2" transform="translate(1270.000000, 689.000000)"> <path id="Shape" d="M17.1,78.7V36.6h-6.5c-4.8,0-8.6,3.9-8.6,8.7v57c0,4.8,3.8,8.6,8.6,8.6h57c4.8,0,8.7-3.9,8.7-8.6V96H34.4 C24.9,96,17.1,88.2,17.1,78.7z"/> <path d="M91.4,13.1h-57c-4.8,0-8.7,3.9-8.7,8.6v57c0,4.8,3.9,8.7,8.7,8.7h57c4.8,0,8.6-3.9,8.6-8.7v-57 C100,17,96.1,13.1,91.4,13.1z M90.2,73.9c-0.5,0.9-1.4,1.4-2.4,1.4H39c-0.9,0-1.7-0.4-2.2-1.1c-0.5-0.7-0.7-1.6-0.4-2.4l7-23.1 c0.5-1.5,1.7-2.6,3.3-2.9c1.6-0.3,3.1,0.4,4.1,1.7l9.8,13.7c1.3,1.8,3.9,2.3,5.7,1l9-6.1c0.9-0.6,2.1-0.9,3.2-0.6 c1.1,0.2,2.1,0.9,2.7,1.8l9,13.8C90.6,72,90.7,73.1,90.2,73.9z"/> </g> </g> </g> </svg>              
                                                </div>    
                                                <div class="svg-wrapper popover-wrapper" data-popover="Edit the banners of this template">                  
                                                    <svg  class="edit" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>60 all</title> <g> <path d="M76.6,51.8v24.8H23.4V23.4h24.8V12.7H18.1c-3,0-5.4,2.4-5.4,5.4V82c0,3,2.4,5.4,5.4,5.4H82c3,0,5.4-2.4,5.4-5.4V51.8H76.6z "/> <path d="M44,44.6l-4.2,11.1c-0.5,1.9,0.6,3.9,2.5,4.4c0.6,0.1,1.3,0.1,1.9,0L55.4,56c0.6-0.1,1.2-0.5,1.5-1l28.6-28.6 c1.4-1.4,2.3-2.9,0.8-4.2l-7.7-7.9c-1.4-1.4-3.7-1.4-5,0L45,43C44.5,43.4,44.2,44,44,44.6z"/> </g> </svg>
                                                </div>
                                            </div>  
                                <div class="text">
                                     <span> Times used   <span>{{template.bannersCount}} banners</span></span>
                                    <span> Last used   <span>{{ humanDate(template.updatedAt) }}</span></span>
                                </div>        
                            </div>
                        </div>  
                        <template v-if="templates.totalCount == 0">
                            <span class="sad">No banners yet :'(</span>
                        </template>     
                          
                        </div>   
                    </div>    
   
                </div>
			</div>
			</div>

</template>

<script>

import Sidebar from '../sidebar/Sidebar'
import Loading from '../loading/Loading'
import AddBanner from '../modals/AddBanner'
import axios from 'axios'
import domfunctions from '@/mixins/domfunctions.js'



export default {
  name: 'Dashboard',
  components: {
      Sidebar ,
      AddBanner,
      Loading
  },
  data () {
    return {
        loading: true,
        user: this.$store.getters.getUser,
        banners:  null,
        templates: null,
        loading: true,
        currentCompany: this.$store.getters.getCurrentCompany || null,
        currentAccessLevel: this.$store.getters.getCurrentAccessLevel || null,
    }
  },
  computed: {
      loggedIn(){
          return this.$store.getters.loggedIn
      }

  },
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
        this.asyncgetBannersDirect()
        this.asyncgetTemplatesDirect()
  },
  mixins: [domfunctions],
  methods: {
        methodThatForcesUpdate(event) {
            // ...
            /* console.log(event)
            this.$forceUpdate() */
            this.setCurrentCompany(event.id)
              // Notice we have to use a $ here
            // ...
        },
        async asyncgetBannersDirect(){
            this.loading = true
            // SET HEADERS
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken,
			axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id

			//IF Logged in make Call
			if(this.isloggedIn()){
                const response = await axios.get('/banners')
                console.log(this)
                console.log(response.data)
                this.banners = response.data
                
            }
            this.loading = false
            
        },
        async asyncgetTemplatesDirect(){
            this.loading = true

            // SET HEADERS
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken,
			axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id

			//IF Logged in make Call
			if(this.isloggedIn()){
                const response = await axios.get('/templates')
                console.log(response)
                this.templates = response.data
            }
            this.loading = false
            
        },
        /* createBanner(){
				this.$store.dispatch('createBanner', {
					email: this.email,
					password: this.password,
				}).then(response => {
					console.log(response)
					this.$router.push({ path: `/dashboard` });
				}).catch(error => {
					console.log(error.response);
					//if(error.response.status == 422){
									// error logging in
									if(typeof error.response.data.errors != 'undefined'){
										let errors = error.response.data.errors;
											for (var key in errors) {
													if (errors.hasOwnProperty(key)) {
															console.log(key + " -> " + errors[key]);
															$('.logInForm input[name="'+key+'"]').parent().addClass('input-error animated shake');
													}
											}
											setTimeout(function(){ 
												$('.logInForm .input-block').removeClass('animated shake');
											}, 3000);
									}
									if(typeof error.response.data.message != 'undefined'){
										document.getElementById('error').innerHTML = error.response.data.message;
									}
					//	}
				})
			}, */
        checkBoxToggle(event){
                event.target.parentNode.classList.toggle('selected');
                event.target.classList.toggle('selected');
        },
        showOverlay(){
                document.querySelector('.overlay').classList.add('open', 'animated', 'slideInRight')
                //document.querySelector('.overlay .popup').classList.add('animated', 'flipInY')
        },
        isloggedIn(){
          return this.$store.getters.loggedIn
        },
        isCurrentCompany(id){
            return id === this.currentCompany.id ? 'active' : ''
        },
        setCurrentCompany(id){
            let index = _.findIndex(this.$store.getters.getUser.companies , company => {
                return company.id == id
            });
            console.log(index)
            this.$store.commit('setCurrentCompany', this.$store.getters.getUser.companies[index])
            this.currentCompany = this.$store.getters.getUser.companies[index]
            this.asyncgetBannersDirect()
            this.asyncgetTemplatesDirect()
        },
        returnAspectRatio(width, height, ){
                if(width == height){
                return 'squaree';
                }
                else if(width > height){
                    return 'rectangle';
                }
                else{
                    return 'tower';
                }
        }
  },
}
</script>

