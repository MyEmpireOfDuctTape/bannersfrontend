<template>
    <div class="fullpage container-fluid">
        <div class="row">

                <sidebar></sidebar>
            <template v-if="loading">
                <Loading></Loading>
            </template>
                <div class="template-single main-view container-fluid">
                   <div class="row">
                            <div class="col-lg-9 col-sm-12">
                                <router-link :to="{ path: '/templates' }">
                                            <span class="before">Templates </span>
                                        </router-link>
                                <svg class="subset" version="1.1" id="Layer_1" fill="#acb2bc" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 800 800" style="enable-background:new 0 0 800 800;" xml:space="preserve"> <path id="Shape" d="M369.1,518.3L194.2,343.5c-8.5-8.5-12.8-19.7-12.8-30.9s4.3-22.4,12.8-30.9c17.1-17.1,44.8-17.1,61.8,0 L400,425.6l143.9-143.9c17.1-17.1,44.8-17.1,61.8,0c17.1,17.1,17.1,44.7,0,61.8L430.9,518.3C413.8,535.4,386.2,535.4,369.1,518.3z" /> </svg>
                                <span class="after">{{ template.name }}</span>
                                <span class="description">{{ template.description }}</span>
                                <div class="text">
                                                            <span> Times used   <span>{{ template.bannersCount}} banners</span></span>
                                                            <span> Last used   <span>{{ humanDate(template.updatedAt) }}</span></span>
                             </div> 
                            </div> 
                            <div class="col-lg-3 col-sm-12 right">
                                <router-link :to="{ path: '/template/'+ template.id }">
                                            <button class="right roundedd blue duplicate">Edit Template</button>
                                        </router-link>
                           
                            </div>
                        </div> 
                                            <div class="linebreak"></div>
                        <div class="recent-templates">
                                <div class="header row">
                                    <div class="left  col-lg-4 col-md-6 col-sm-6">
                                        <div class="grey-dd">
                                            <span>Latest updated</span>
                                            <div class="hidden">
                                                <ul>
                                                    <li>Most used</li>
                                                    <li>Most used</li>
                                                    <li>Most used</li>
                                                    <li>Most used</li>
                                                    <li>Most used</li>
                                                </ul>
                                            </div>
                                        </div>    
                                    </div>
                                    <div class="right col-lg-8 col-md-6 col-sm-6">
                                         <div class="input-bubble dropdown"> 
                                    <span> Size</span>
                                    <div class="hidden">
                                        <ul>
                                            <li>Size 1</li>
                                            <li>Size 2</li>
                                            <li>Size 3</li>
                                            <li>Size 4</li>
                                        </ul>
                                    </div>                            
                                </div>
                                    </div>    
                                </div>
                                <div class="banner-slide row">
                            <template v-for="(banner, key) in banners">
                            <div class="col-lg-2 col-md-3 col-sm-6">
                                <router-link :to="{ path: '/banners/edit-banner/' + banner.id }">
                                <div v-bind:class="returnAspectRatio(banner.size.width, banner.size.height) + ' dimension-box'">
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
                        </template>
                      
                         <!-- <div class="col-lg-3">
                            <div class="preview">
                                <div class="square">
                                    <div class="edit-overlay Aligner">
                                        <button class="check"></button>
                                        <input type="checkbox" class="">
                                        <button class="edit"></button>
                                        <div class="edit-box">
                                            <ul>
                                                <li><a href="#">
                                                     <svg version="1.1" fill="#ededed" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>60 all</title> <g> <path d="M76.6,51.8v24.8H23.4V23.4h24.8V12.7H18.1c-3,0-5.4,2.4-5.4,5.4V82c0,3,2.4,5.4,5.4,5.4H82c3,0,5.4-2.4,5.4-5.4V51.8H76.6z "/> <path d="M44,44.6l-4.2,11.1c-0.5,1.9,0.6,3.9,2.5,4.4c0.6,0.1,1.3,0.1,1.9,0L55.4,56c0.6-0.1,1.2-0.5,1.5-1l28.6-28.6 c1.4-1.4,2.3-2.9,0.8-4.2l-7.7-7.9c-1.4-1.4-3.7-1.4-5,0L45,43C44.5,43.4,44.2,44,44,44.6z"/> </g> </svg>
                                                    Edit</a></li>
                                                <li><a href="#">
                                                     <svg version="1.1" id="Layer_1" fill="#ededed" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>Duplicate Solid</title> <desc>Created with Sketch.</desc> <g> <g> <path d="M45.5,14h33H86v7.5v33V62h-8v8h8c4.4,0,8-3.6,8-8v-7.5v-33V14c0-4.4-3.6-8-8-8h-7.5h-33H38c-4.4,0-8,3.6-8,8v8h8v-8H45.5 L45.5,14L45.5,14z M6,38c0-4.4,3.6-8,8-8h48c4.4,0,8,3.6,8,8v48c0,4.4-3.6,8-8,8H14c-4.4,0-8-3.6-8-8V38L6,38L6,38z"/> </g> </g> </svg>
                                                    Duplicate</a></li>
                                                <li><a href="#">
                                                     <svg version="1.1" id="Layer_1" fill="#e0e0e0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>09</title> <path d="M22.8,28.6l0.1,45.2c0,7.2,5.8,13,13,13h28.3c7.2,0,13-5.8,13-13l0.1-45.2h7.4c1.7,0,3-1.3,3-3s-1.3-3-3-3H63.6v-2.5 c0-3.9-3.1-7-7-7H43.4c-3.9,0-7,3.1-7,7v2.5H15.3c-1.7,0-3,1.3-3,3s1.3,3,3,3H22.8z M53,69.8c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9 c0-1.7,1.3-3,3-3s3,1.3,3,3V69.8z M58,40.9c0-1.7,1.3-3,3-3s3,1.3,3,3v28.9c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9z M42.4,20.2 c0-0.6,0.4-1,1-1h13.2c0.6,0,1,0.4,1,1v2.5H42.4V20.2z M36,40.9c0-1.7,1.3-3,3-3s3,1.3,3,3v28.9c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9z" /> </svg>
                                                    Delete</a></li>
                                            </ul>
                                        </div>    
                                         <img class="Aligner-item land" src="../../assets/img/banner.jpg">
                                    </div>   
                                </div>     
                                <span class="name">Telia skyscraper campaginr name long</span>
                                <span class="dimensions">300x300</span>
                            </div>    
                        </div> -->

                                </div>    
                                </div>   
                            </div> 
                        </div>
                    </div>
          

</template>

<script>

import Sidebar from '../sidebar/Sidebar'
import Loading from '../loading/Loading'


import domfunctions from '@/mixins/domfunctions.js'
import axios from 'axios'

export default {
  name: 'BannersByTemplate',
  components: {
      Sidebar,
      Loading
  },
  data () {
    return {
        loading: true,
        msg: 'Edit Template',
        template: null,
        banners: null,
        currentCompany: this.$store.getters.getCurrentCompany || null,
        currentAccessLevel: this.$store.getters.getCurrentAccessLevel || null,
    }
  },
  created(){
        if(this.$store.getters.getCurrentCompany == null){
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
        this.getTemplate()        
  },
   watch:{
    $route (to, from){

        this.banners = []
        this.folders = []
        this.parentNames = []
        this.getTemplate() 
        /* this.sortBannersById(to.params.id)
        this.sortFoldersById(to.params.id)
        this.asyncgetFolderbyID(to.params.id) */
    }
} ,
    mixins: [domfunctions],
  methods: {
            async getTemplate(){
                this.loading = true
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
                axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
                const response = await axios.get('/templates/'+this.$route.params.id)
                console.log(response)   
                this.template = response.data.template
                this.getBannersByTemplate(this.template.id)
                this.loading = false

      },
      async getBannersByTemplate(id){
          
          this.loading = true
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
            axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
            let params = {
                templateId: id,
                take: 50,
            }
            let serialized = this.serialize(params)
            const response = await axios.get('/banners'+serialized)
            console.log(response)  
            this.banners = response.data.banners

            this.loading = false
      }
  },
}
</script>
