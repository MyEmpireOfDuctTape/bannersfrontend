<template>
    <div class="fullpage container-fluid">
        <div class="row">

                <sidebar></sidebar>
                <template v-if="loading">
                    <Loading></Loading>
                </template>
                <div class="templates main-view container-fluid">
                    <h1>Templates</h1>
                        <div class="header row">
                            <div class="left col-lg-3 col-md-4">
                                <router-link class="blue-link" to="/add-template"><button class="blue create roundedd">Create template</button></router-link>
                            </div>
                            <div class="right col-lg-9 col-md-8">
                                <div class="input-bubble search">
                                    <input type="text" v-model="searchValue" v-on:keyup="searchTemplates" placeholder="Search by name or description">
                                </div>
                                 <div class="input-bubble dropdown" v-bind:class="[editingAspectRatio === true ? 'open' : '']" v-on:click="openSortDropDown($event, 'ratio')"> 
                                    <span> Aspect ratio : {{ aspectRatios[currentAspectRatioIndex].text}}</span>
                                    <template v-if="editingAspectRatio === true">
                                    <div class="hidden visible">
                                        <ul>
                                            <li v-for="(ratio, key) in aspectRatios" :key="key" v-on:click="searchByAspectRatio($event, ratio.value, key)">{{ratio.text}}</li>
                                        </ul>
                                    </div>  
                                    </template>                          
                                </div>
                                <div class="input-bubble dropdown" v-bind:class="[editingSize === true ? 'open' : '']" v-on:click="openSortDropDown($event, 'size')"> 
                                    <span>Size: {{ getSizeTextByIndex(currentSizeIndex) }}</span>
                                    <template v-if="editingSize === true">
                                    <div class="hidden visible">
                                        <ul>
                                            <li v-for="(size, key) in allSizes" :key="key" v-on:click="searchBySizeId($event, size.id, key)" v-text="getSizeTextByIndex(key)"></li>
                                        </ul>
                                    </div>   
                                    </template>                         
                                </div>
                            </div>
                        </div>
                        <div class="linebreak"></div>
                        <div class="recent-templates">
                                <div class="header row">
                                    <div class="left  col-lg-4 col-md-6 col-sm-6">
                                        <div class="grey-dd">
                                            <span>Sort by</span>
                                            <span v-on:click="openSortDropDown($event, 'value')">{{ sortingOptions[currentSortByIndex].text }}</span>
                                            <span v-on:click="setSorting($event, false, 'order')" v-html="orderOptions[currentSortByOrderIndex].html"></span>
                                            <template v-if="editingOrderValue === true">
                                                <div class="hidden visible">
                                                    <ul>
                                                        <li v-for="(option, key) in sortingOptions" :key="key" v-on:click="setSorting($event, key, 'value')">{{option.text}}</li>
                                                    </ul>
                                                </div>
                                            </template>
                                            <template v-if="editingOrderOrder === true">
                                                <div class="hidden visible">
                                                    <ul>
                                                        <li v-for="(option, key) in orderOptions" :key="key" v-on:click="setSorting($event, key, 'order')">{{option.text}}</li>
                                                    </ul>
                                                </div>
                                            </template>
                                        </div>    
                                    </div>
                                </div>
                                 <template v-for="(template, index) in templates">
                                    <div class="template-list" :key="index">
                                    <div class="template row">
                                        <div class="left col-lg-6">
                                            <router-link :to="{ path: '/templates/' + template.id}"><span class="bold">{{ template.name }}</span></router-link>
                                           <template v-for="(size, key) in template.sizes">
                                            <span v-bind:class="returnAspectRatio(size.width, size.height) + ' dimension'" :key="key">{{ size.width }}x{{ size.height }}</span>
                                             </template>  
                                        </div>
                                        <div class="right col-lg-6">
                                            <div class="images">
                                                <div @mouseover="showTooltip(1, index)" @mouseout="showTooltip(1, index)" class="svg-wrapper popover-wrapper">  
                                                    <div v-show="active[index]" class="popoover">
                                                        <span>View Gallery of banners made with this template</span>
                                                    </div>
                                                    <router-link :to="{ path: '/templates/'+template.id }">
                                                        <svg  class="duplicate" version="1.1" id="Layer_1" fill="#e0e0e0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>All</title> <g id="Desktop"> <g id="Templates" transform="translate(-1270.000000, -689.000000)"> <g id="image-gallery-copy-2" transform="translate(1270.000000, 689.000000)"> <path id="Shape" d="M17.1,78.7V36.6h-6.5c-4.8,0-8.6,3.9-8.6,8.7v57c0,4.8,3.8,8.6,8.6,8.6h57c4.8,0,8.7-3.9,8.7-8.6V96H34.4 C24.9,96,17.1,88.2,17.1,78.7z"/> <path d="M91.4,13.1h-57c-4.8,0-8.7,3.9-8.7,8.6v57c0,4.8,3.9,8.7,8.7,8.7h57c4.8,0,8.6-3.9,8.6-8.7v-57 C100,17,96.1,13.1,91.4,13.1z M90.2,73.9c-0.5,0.9-1.4,1.4-2.4,1.4H39c-0.9,0-1.7-0.4-2.2-1.1c-0.5-0.7-0.7-1.6-0.4-2.4l7-23.1 c0.5-1.5,1.7-2.6,3.3-2.9c1.6-0.3,3.1,0.4,4.1,1.7l9.8,13.7c1.3,1.8,3.9,2.3,5.7,1l9-6.1c0.9-0.6,2.1-0.9,3.2-0.6 c1.1,0.2,2.1,0.9,2.7,1.8l9,13.8C90.6,72,90.7,73.1,90.2,73.9z"/> </g> </g> </g> </svg>      
                                                    </router-link>        
                                                </div>    
                                            <div @mouseover="showTooltip(2, index)" @mouseout="showTooltip(2, index)" class="svg-wrapper popover-wrapper">  
                                                <div v-show="activetwo[index]" class="popoover">
                                                        <span>Edit this template</span>
                                                    </div>           
                                                     <router-link :to="{ path: '/template/'+template.id }">       
                                                        <svg  class="edit" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>60 all</title> <g> <path d="M76.6,51.8v24.8H23.4V23.4h24.8V12.7H18.1c-3,0-5.4,2.4-5.4,5.4V82c0,3,2.4,5.4,5.4,5.4H82c3,0,5.4-2.4,5.4-5.4V51.8H76.6z "/> <path d="M44,44.6l-4.2,11.1c-0.5,1.9,0.6,3.9,2.5,4.4c0.6,0.1,1.3,0.1,1.9,0L55.4,56c0.6-0.1,1.2-0.5,1.5-1l28.6-28.6 c1.4-1.4,2.3-2.9,0.8-4.2l-7.7-7.9c-1.4-1.4-3.7-1.4-5,0L45,43C44.5,43.4,44.2,44,44,44.6z"/> </g> </svg>
                                                    </router-link>
                                                </div>
                                            </div>
                                            <div class="text">
                                                <span> Times used   <span>{{ template.bannersCount}} banners</span></span>
                                                <span> Last used   <span>{{ humanDate(template.updatedAt) }}</span></span>
                                            </div>        
                                        </div>
                                    </div> 
                                    </div> 
                                </template>   
                                    
                                    <!-- <div class="template row">
                                        <div class="left col-lg-6">
                                            <router-link to="templates/Skyscraper_Banners_Set"> <span class="bold">Skyscraper_Banners_Set</span></router-link>
                                            <span class="dimension orange">600x300</span>
                                            <span class="dimension orange">600x300</span>
                                            <span class="dimension orange">600x300</span>
                                            <span class="dimension orange">600x300</span>
                                            <span class="dimension orange">600x300</span>
                                            <span class="dimension orange">600x300</span>
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
                                        </div>
                                    </div>
                                    <div class="template row">
                                        <div class="left col-lg-6">
                                            <router-link to="templates/Skyscraper_Banners_Set"><span class="bold">Skyscraper_Banners_Set</span></router-link>
                                            <span class="dimension purple">600x300</span>
                                            <span class="dimension purple">600x300</span>
                                            <span class="dimension purple">600x300</span>
                                            <span class="dimension purple">600x300</span>
                                            <span class="dimension purple">600x300</span>
                                            <span class="dimension purple">600x300</span>
                                            <span class="dimension purple">600x300</span>
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
                                                <span> Times used   <span>150 banners</span></span>
                                                <span> Last used   <span>12th Sept 2018</span></span>
                                            </div>        
                                        </div>
                                    </div>   -->    
                                </div>   
                            </div> 
                        </div>
                    </div>
</template>

<script>

import Sidebar from '../sidebar/Sidebar'
import Loading from '../loading/Loading'
import axios from 'axios'
import domfunctions from '@/mixins/domfunctions.js'


export default {
  name: 'Templates',
  components: {
      Sidebar,
      Loading
  },
  mixins: [domfunctions],
  data () {
    return {
        loading: true,
        active: [],
        activetwo: [],
        aspectRatios:
        [
                {
                  value: 'all',
                  text: 'All',
                },
                {
                  value: 'square',
                  text: 'Square',
                },
                {
                  value: 'portrait',
                  text: 'Portrait',
                },
                {
                  value: 'landscape',
                  text: 'Landscape',
                },
        ],
        templates: null,
        allTemplates: null,
        popoverstart: '<div class="popoover">',
        popoverclose : '<a href="#" class="close">dismiss</a>',
        popoverend : '</div>',
        currentCompany: this.$store.getters.getCurrentCompany || null,
        currentAccessLevel: this.$store.getters.getCurrentAccessLevel || null,
        searchValue: null,
        allSizes: null,
        currentSortByIndex: 0,
        currentSortByOrderIndex: 0,
        currentAspectRatioIndex: 0,
        currentSizeIndex: 0,
        orderOptions: [
            {
                value: 'DESC',
                html: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 21l-12-18h24z"/></svg>',
                text: 'Descending'
            },
            {
                value: 'ASC',
                html: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 22h-24l12-20z"/></svg>',
                text: 'Ascending'
            }
        ],
        sortingOptions: [
            {
                value: 'updatedAt',
                text: 'Date updated'
            },
            {
                value: 'createdAt',
                text: 'Date created'
            },
            {
                value: 'bannersCount',
                text: 'Number of banners'
            },
            {
                value: 'name',
                text: 'Name alphabetically'
            },
            {
                value: 'description',
                text: 'Description alphabetically'
            },
        ],
        editingOrderValue: false,
        editingOrderOrder: false,
        editingAspectRatio: false,
        editingSize: false,

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
      this.getTemplates()
      this.getAllSizes()
  },
  methods: {
        setSorting(event, key, sortType){
            if(sortType == 'value'){
                this.currentSortByIndex = key
            }
            else if(sortType == 'order'){
                if(this.currentSortByOrderIndex == 0){
                    this.currentSortByOrderIndex = 1
                }
                else{
                    this.currentSortByOrderIndex = 0
                }
                
            }
            event.stopPropagation()
            this.editingOrderValue = false
            this.editingOrderOrder = false
            this.editingAspectRatio = false
            this.editingSize = false
            this.getTemplates(50, 0, this.orderOptions[this.currentSortByOrderIndex].value , this.sortingOptions[this.currentSortByIndex].value)
            console.log('sorting done')
            console.log(this.templates)
        },
        openSortDropDown(event, boxtype){
            console.log('opensortdropdown')
            console.log(boxtype)
            switch(boxtype){
                case 'value':
                this.editingOrderValue = !this.editingOrderValue
                break
                case 'order':
                this.editingOrderOrder = !this.editingOrderOrder
                break
                case 'ratio':
                this.editingAspectRatio = !this.editingAspectRatio
                break
                case 'size':
                this.editingSize = !this.editingSize
                break
                default:
                break
            }
        },
        searchTemplates(){
            //console.log(this.searchValue)
            let searchValue = this.searchValue.toLowerCase()
            let searchResults = []
            if(searchValue == null || searchValue == ''){
                this.templates = this.allTemplates
                return
            }
            console.log(searchValue)
            _.forEach(this.allTemplates, function(value){
                /* console.log(value)
                console.log(value.name)
                console.log(value.description) */
                if(value.name && value.name.toLowerCase().indexOf(searchValue) > -1){
                    searchResults.push(value) 
                }
                else if(value.description && value.description.toLowerCase().indexOf(searchValue) > -1){
                    searchResults.push(value) 
                }
            })
            console.log(searchResults)
            this.templates = searchResults
        },
        async getTemplates(takeAmount = 50, skipAmount = 0, orderByTypeArg = 'DESC ', orderByArg = 'updatedAt'){
          this.loading = true
          // reset popups
                this.active = []
                this.activetwo = []
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
                axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
        
                //IF Logged in make Call
                if(this.isloggedIn()){
                    let params = {
                        take: takeAmount,
                        skip: skipAmount,
                        orderByType: orderByTypeArg,
                        orderBy: orderByArg,
                    };
                    let serialized = this.serialize(params)
                    const response = await axios.get('/templates'+serialized)
                    console.log(response.data)
                    this.templates = response.data.templates
                    this.allTemplates = response.data.templates
                    for(let i = 0; i < response.data.templates.length; i++){
                        this.active.push(false)
                        this.activetwo.push(false)
                    }
                    _.forEach(this.templates, (template, key) => {
                        this.active.push(false)
                        this.activetwo.push(false)
                        _.forEach(template.sizes, (size) => {
                            if(typeof this.templates[key].aspectRatio !== Array){
                                this.templates[key].aspectRatio = []
                            }
                            if(typeof this.allTemplates[key].aspectRatio !== Array){
                                this.allTemplates[key].aspectRatio = []
                            }
                            if(size.width == size.height){
                                this.templates[key].aspectRatio.push('square')
                                this.allTemplates[key].aspectRatio.push('square')
                            }
                            else if(size.width > size.height){
                                this.templates[key].aspectRatio.push('landscape')
                                this.allTemplates[key].aspectRatio.push('landscape')
                            }
                            else{
                                this.templates[key].aspectRatio.push('portrait')
                                this.allTemplates[key].aspectRatio.push('portrait')
                            }
                        })
                    })
                    console.log(this.templates)
                    console.log(this.active)
                }
            this.loading = false
            },
            async getAllSizes(){
                this.loading = true
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
                axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
                axios.defaults.headers.common['Accept'] = 'application/json'
                const response = await axios.get('/sizes')
                console.log(response.data)
                this.allSizes = response.data.sizes
                let all = {
                    width: 'All',
                    id: 'all'
                }
                this.allSizes.unshift(all)
                this.loading = false
            },
            searchByAspectRatio(event, searchterm, key){
                event.stopPropagation()
                this.templates = []
                console.log('searching by aspect ratio')
                this.editingAspectRatio = false
                this.editingSize = false
                console.log(this.editingAspectRatio)
                console.log(this.editingSize)
                this.currentAspectRatioIndex = key
                if(searchterm == 'all'){
                    this.templates = this.allTemplates
                    return
                }
                _.forEach(this.allTemplates, (template, key) => {
                    if(typeof this.allTemplates[key].aspectRatio !== 'undefined' && this.allTemplates[key].aspectRatio.indexOf(searchterm) != -1){
                        this.templates.push(template)
                    }
                })
            },
            getSizeTextByIndex(key){
                if(typeof this.allSizes[key].width !== 'undefined' && typeof this.allSizes[key].height !== 'undefined'){
                    return this.allSizes[key].width + 'x' + this.allSizes[key].height
                }
                return this.allSizes[key].width
            },
            searchBySizeId(event, id, key){
                event.stopPropagation()
                this.templates = []
                this.editingOrderValue = false
                this.editingOrderOrder = false
                this.editingAspectRatio = false
                this.editingSize = false
                this.currentSizeIndex = key
                if(id == 'all'){
                    this.templates = this.allTemplates
                    return
                }
                _.forEach(this.allTemplates, (template, key) => {
                    if(typeof template.sizes !== 'undefined'){
                        _.forEach(template.sizes, (size) => {
                            if(size.id == id){
                                this.templates.push(template)
                                return
                            }
                        })
                    }
                })

            },
            isloggedIn(){
                return this.$store.getters.loggedIn
            },
            humanDate(input){
                let date = new Date(input)
                return date.toDateString()
            },
            showTooltip(button, index){
                if(button == 1){
                    this.active.splice(index, 1, !this.active[index])
                }
                else{
                    this.activetwo.splice(index, 1, !this.activetwo[index])
                }
            },
            toggleDropDown(event){
                switch(event.target.tagName){
                    case 'DIV':
                    event.target.children[1].classList.toggle('visible')
                    event.target.classList.toggle('open')
                    break
                    case 'SPAN':
                    event.target.nextElementSibling.classList.toggle('visible')
                    event.target.parentNode.classList.toggle('open')
                    break
                    default:
                    event.target.nextElementSibling.classList.toggle('visible')
                    event.target.parentNode.classList.toggle('open')
                }

            },
  }
}
</script>   
