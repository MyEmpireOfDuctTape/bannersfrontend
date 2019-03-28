<template>

    <div class="fullpage container-fluid">

            
        <div class="row">
                <sidebar v-on:company-changed="methodThatForcesUpdate($event)"></sidebar>
                <add-banner></add-banner>
            <template v-if="loading">
                <Loading></Loading>
            </template>
                <div class="overlay Aligner">

                            <div class="form-wrapper Aligner-item">
                                <div class="input-block">
                                    <span class="fake-label">Folder name</span>
                                    <input type="text" placeholder="Skyscraper tempate">
                                </div>
                                <div class="input-block">
                                    <span class="fake-label">Folder Description</span>
                                    <textarea class="comment"></textarea>
                                </div>
                                <button class="blue roundedd save">Save</button>
                            </div>    
                </div> 
                <div class="banners container-fluid main-view">
                    <div class="col-lg-9 col-sm-12">
                            <router-link :to="{ path: '/banners' }">
                                <span class="before">Banners </span>
                            </router-link>
                            <!-- <svg class="subset" version="1.1" id="Layer_1" fill="#acb2bc" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 800 800" style="enable-background:new 0 0 800 800;" xml:space="preserve"> <path id="Shape" d="M369.1,518.3L194.2,343.5c-8.5-8.5-12.8-19.7-12.8-30.9s4.3-22.4,12.8-30.9c17.1-17.1,44.8-17.1,61.8,0 L400,425.6l143.9-143.9c17.1-17.1,44.8-17.1,61.8,0c17.1,17.1,17.1,44.7,0,61.8L430.9,518.3C413.8,535.4,386.2,535.4,369.1,518.3z" /> </svg>
                            <span class="after">{{currentFolder.name}}</span> -->
                            <template v-for="(name, key) in parentNames">
                                <svg class="subset" version="1.1" id="Layer_1" fill="#acb2bc" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 800 800" style="enable-background:new 0 0 800 800;" xml:space="preserve"> <path id="Shape" d="M369.1,518.3L194.2,343.5c-8.5-8.5-12.8-19.7-12.8-30.9s4.3-22.4,12.8-30.9c17.1-17.1,44.8-17.1,61.8,0 L400,425.6l143.9-143.9c17.1-17.1,44.8-17.1,61.8,0c17.1,17.1,17.1,44.7,0,61.8L430.9,518.3C413.8,535.4,386.2,535.4,369.1,518.3z" /> </svg>
                                <router-link :to="{ path: '/banners/' + name.id }">
                                    <span class="after">{{name.name}}</span>
                                </router-link>
                            </template>
                        </div>
                    <div class="container-fluid">
                        <div class="header row">
                            <div class="left col-lg-5 col-md-4">
                                <button v-on:click="toggleCreating" class="blue create-folder roundedd">Create folder</button>
                                <button v-on:click="showBannerOverlay" class="blue create roundedd">Create Banner</button>
                            </div>
                            <div class="right col-lg-7 col-md-8">
                                <div class="input-bubble search">
                                    <input type="text" v-model="searchValue" v-on:keyup="searchFolders" placeholder="Search by name or description">
                                </div>
                                
                            </div>
                        </div>
                        <div class="folders row">
                            <template v-if="creating">
                            <div class="col-lg-2 col-md-3 col-sm-6">
                                    <div class="folder create-folder">
                                        <div class="folder-name">
                                            <form class="auth-form" id="addFolder" @submit.prevent="createFolder($event)"> 
                                            <div class="input-block white nomarg lesspadd">
                                                <span v-on:click="focusInput" data-initial="Folder name" class="fake-label">Folder name</span>
                                                <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="createName" type="text" name="name">
                                            </div>
                                            <div class="buttons">
                                            <button v-on:click="toggleCreating" class="left">CANCEL</button>
                                            <button class="right">CREATE</button>
                                            </div>
                                            </form>
                                            <span id="error"></span>
                                    </div>
                                </div>
                                    </div>
                            </template>
                            <template v-for="(folder, key) in folders" >
                                <div class="col-lg-2 col-md-3 col-sm-6">
                                    <div class="folder">
                                    <svg version='1.1' class="taust" xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 800 800' style='enable-background:new 0 0 800 800;' xml:space='preserve'> <path id='Shape-Copy' class='st0' d='M304.7,196.1l47.7,47.7c13.6,13.6,30.6,20.4,47.7,20.4h272.4v340.5H127.6V196.1H304.7z M331.9,128H127.6c-37.5,0-68.1,30.6-68.1,68.1v408.6c0,37.5,30.6,68.1,68.1,68.1h544.8c37.5,0,68.1-30.6,68.1-68.1V264.2 c0-37.5-30.6-68.1-68.1-68.1H400L331.9,128z'/> </svg>
                                    <button class="edit" v-on:click="editPopup($event)"></button>
                                            <div class="edit-box">
                                                <ul>
                                                    <li><a v-on:click="setEditing($event, key, folder)" href="#">
                                                        <svg version="1.1" fill="#ededed" id="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>60 all</title> <g> <path d="M76.6,51.8v24.8H23.4V23.4h24.8V12.7H18.1c-3,0-5.4,2.4-5.4,5.4V82c0,3,2.4,5.4,5.4,5.4H82c3,0,5.4-2.4,5.4-5.4V51.8H76.6z "/> <path d="M44,44.6l-4.2,11.1c-0.5,1.9,0.6,3.9,2.5,4.4c0.6,0.1,1.3,0.1,1.9,0L55.4,56c0.6-0.1,1.2-0.5,1.5-1l28.6-28.6 c1.4-1.4,2.3-2.9,0.8-4.2l-7.7-7.9c-1.4-1.4-3.7-1.4-5,0L45,43C44.5,43.4,44.2,44,44,44.6z"/> </g> </svg>
                                                        Edit</a></li>
                                                    <li><a v-on:click="deleteFolder($event, folder.id)" href="#">
                                                        <svg version="1.1" id="" fill="#e0e0e0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>09</title> <path d="M22.8,28.6l0.1,45.2c0,7.2,5.8,13,13,13h28.3c7.2,0,13-5.8,13-13l0.1-45.2h7.4c1.7,0,3-1.3,3-3s-1.3-3-3-3H63.6v-2.5 c0-3.9-3.1-7-7-7H43.4c-3.9,0-7,3.1-7,7v2.5H15.3c-1.7,0-3,1.3-3,3s1.3,3,3,3H22.8z M53,69.8c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9 c0-1.7,1.3-3,3-3s3,1.3,3,3V69.8z M58,40.9c0-1.7,1.3-3,3-3s3,1.3,3,3v28.9c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9z M42.4,20.2 c0-0.6,0.4-1,1-1h13.2c0.6,0,1,0.4,1,1v2.5H42.4V20.2z M36,40.9c0-1.7,1.3-3,3-3s3,1.3,3,3v28.9c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9z" /> </svg>
                                                        Delete </a></li>
                                                </ul>
                                            </div>
                                    <div class="folder-bg">
                                        <template v-if="editing == folder.id">      
                                            <form class="auth-form oneline" id="editFolder" @submit.prevent="editFolder($event, folder)"> 
                                                <div class="input-block white nomarg lesspadd focused">
                                                    <span v-on:click="focusInput" data-initial="Folder name" class="fake-label">Folder name</span>
                                                    <input id="editfolderinput" v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="editName" type="text" name="editName">
                                                </div>
                                                <div class="buttons">
                                                        <button class="right">SAVE</button>
                                                </div>
                                            </form>
                                        </template>
                                        <template v-else>      
                                           <router-link :to="{ path: '/banners/' + folder.id }">
                                                <span class="contents">{{folder.name}}</span>
                                                <span class="date">Created at <br />{{humanDate(folder.createdAt)}}</span>
                                                <span class="date">Updated at <br />{{humanDate(folder.updatedAt)}}</span>
                                            </router-link>
                                        </template>
                                    </div>
                                </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                        <div class="linebreak"></div>
                        <div class="recent-templates file-view">
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
                                        <div class="input-bubble search">
                                    <input type="text" v-model="searchValue" v-on:keyup="searchFolders" placeholder="Search by name or description">
                                </div>
                                <div class="input-bubble dropdown"> 
                                    <span> Aspect ratio</span>
                                    <div class="hidden">
                                        <ul>
                                            <li>600x300</li>
                                            <li>600x300</li>
                                            <li>600x300</li>
                                            <li>600x300</li>
                                        </ul>
                                    </div>                            
                                </div>
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
                                </div> 
                                </div> 
                        </div>
                    </div>
           
                </div>    

</template>
<script>

import Sidebar from '../sidebar/Sidebar'
import AddBanner from '../modals/AddBanner'
import Loading from '../loading/Loading'

import domfunctions from '@/mixins/domfunctions.js'
import axios from 'axios'


export default {
  name: 'BannerFolder',
  components: {
      Sidebar, 
      AddBanner,
      Loading,
  },
  data () {
    return {
        loading: true,
        goading: true,
        msg: 'Folders yo',
        banners: [],
        allBanners: null,
        folders: [],
        allFolders: null,
        parentFolder: null,
        parentNames: [],
        currentCompany: this.$store.getters.getCurrentCompany || null,
        currentAccessLevel: this.$store.getters.getCurrentAccessLevel || null,
        creating: false,
        createName: null,
        confirmedtrue: false,
        editName: null,
        editing: [],
        currentFolder: null,
        searchValue: null,
        searchResults: [],
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
        this.asyncgetFolders()        
        this.asyncgetBannersDirect()
       // this.asyncgetFolderbyID(this.$route.params.id)
  },
    watch:{
    $route (to, from){
        // too many api calls this.asyncgetBannersDirect()        
/*         console.log(this.banners)
        console.log(to.params.id) */
       /*  console.log('route change') */
        this.banners = []
        this.folders = []
        this.parentNames = []
         this.asyncgetFolders()        
        this.asyncgetBannersDirect()
        /* this.sortBannersById(to.params.id)
        this.sortFoldersById(to.params.id) */
        this.asyncgetFolderbyID(to.params.id)
/*         console.log(this.banners) */

    }
} ,
    mixins: [domfunctions],
  methods: {
        methodThatForcesUpdate(event) {
            //this.currentCompany = event

            // have to route to all folders 
            this.$router.push({ path: `/folders` });
           /*  this.asyncgetFolders() // redirect if 404 */
           /*  this.asyncgetBannersDirect() */
           /*  this.asyncgetFolderbyID(this.$route.params.id) */
        },
        searchFolders(){
            
            //console.log(this.searchValue)
            let searchValue = this.searchValue.toLowerCase()
            let searchResults = []
            if(searchValue == null || searchValue == ''){
                this.folders = this.allFolders
                return
            }
            _.forEach(this.allFolders, function(value){
                /* console.log(value.name.indexOf(searchValue)) */
                if(value.name && value.name.toLowerCase().indexOf(searchValue) > -1){
                    searchResults.push(value) 
                }
            })
            this.folders = searchResults
        },
        async asyncgetBannersDirect(){
            console.log('async banners start')
            this.loading = true
            let banana = this.banners
            //let id = this.$route.params.id
            // SET HEADERS
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken,
            axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
            let params = {
                    take: 30,
                    skip: 0,
                    folderId: this.$route.params.id
            };
            let serialized = this.serialize(params)
                const response = await axios.get('/banners'+serialized)
                console.log(response.data.banners)
                this.allBanners = response.data.banners
                this.banners = response.data.banners
                console.log(this.banners)
                //this.sortBannersById(this.$route.params.id)
            console.log('async banners end')
            this.loading = false
			
        },
        sortBannersById(id){
            let banana = this.banners
             // sort the banners with this folder id
            _.forEach(this.allBanners, function(value, key) {
                //if(value.folderId == this.$route.params.id){
                    //console.log(value)
                if(value.folderId == id){
                    banana.push(value)
                }
            });
        },
        hasParentFolder(folderObject){
            return folderObject.parentId != null ? folderObject.parentId : false
        },
        async asyncgetBannersDirectById(id){
            this.loading = true
            // SET HEADERS
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken,
            axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
            let params = {
                    take: 30,
                    skip: 0,
            };
            let serialized = this.serialize(params)
                const response = await axios.get('/banners')
                console.log(response.data.banners)
                this.banners = response.data.banners
			this.loading = false
        },
        async asyncgetFolderbyID(id){
            this.loading = true
            // SET HEADERS
			axios.defaults.headers.common['Accept'] = 'application/json',
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken,
			axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
                const response = await axios.get('/folders/'+id)
                console.log(response.data)
                let hasParentId = this.hasParentFolder(response.data.folder)
                this.parentNames.unshift({
                        name: response.data.folder.name,
                        id: response.data.folder.id
                    })
                if(hasParentId){
                    return this.asyncgetFolderbyID(hasParentId)
                }
                this.currentFolder = response.data.folder
                this.loading = false
                
			
        },
        async asyncgetFolders(takeAmount = false, skipAmount = false, orderByTypeArg = 'ASC', orderByArg = 'id'){
            //POSSIBLE ORDERBYS
            //companyId -> company_id
            //createdAt -> created_at
            //id -> id  // duh
            //name -> name
            // parentId -> parent_id
            //token -> ????? 
            // updatedAt -> updated_at
            this.loading = true
            let take = 50
            let skip = 0
            let orderBy = orderByArg
            let orderByType = orderByTypeArg
            if(takeAmount && Number.isInteger(takeAmount)){
                take = takeAmount
            }
            if(skipAmount && Number.isInteger(skipAmount)){
                skip = skipAmount
            }
            if(skipAmount && Number.isInteger(skipAmount)){
                skip = skipAmount
            }
            // SET HEADERS
            console.log('asyncfolders start')
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken,
            axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
            let params = {
                    take: take,
                    skip: skip,
                    orderByType: orderByType,
                    orderBy: orderBy,
                    parentId: this.$route.params.id
            };
            let serialized = this.serialize(params)
            const response = await axios.get('/folders'+serialized)
            console.log(response.data.folders)
            this.allFolders = response.data.folders
            this.folders = response.data.folders
            this.hideAllPopups()
            //this.sortFoldersById(this.$route.params.id)
            this.loading = false
                // nothing useful in here
                /* for(let key in response.data.folders){
                    if (response.data.folders.hasOwnProperty(key)) {
                        this.asyncgetFolderbyID(response.data.folders[key].id)
                    }
                } */

        },
        sortFoldersById(id){
            this.loading = true
            let banana = []
             // sort the banners with this folder id
            _.forEach(this.allFolders, function(value, key) {
                //if(value.folderId == this.$route.params.id){
                    //console.log(value)
                if(value.parentId == id){
                    banana.push(value)
                }
            });
            this.folders = banana
            //this.allFolders = banana
            this.loading = false
        },
        
        showBannerOverlay(){
            document.querySelector('.overlay.add-banner').classList.add('open', 'animated', 'slideInLeft')
            setTimeout(function(){
                    document.querySelector('.overlay.add-banner').classList.remove('animated', 'slideInLeft')
            }, 2000)
        },
        showFolderOverlay(){
            //console.log(document.querySelector('.overlay.add-folder'))
            document.querySelector('.overlay.add-folder').classList.add('open', 'animated', 'slideInLeft')
            setTimeout(function(){
                    document.querySelector('.overlay.add-banner').classList.remove('animated', 'slideInLeft')
            }, 2000)
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
        },
        editPopup(event){
            
            if(event.target.nextElementSibling.classList.contains('visible')){
                this.hideAllPopups()
                //event.target.nextElementSibling.classList.remove('visible')
            }
            else{
                event.target.nextElementSibling.classList.add('visible')
            }
            this.editing = null;
        },

        hideAllPopups(){
            let popups = document.querySelectorAll('.edit-box')
            for(let key in popups){
                if (popups.hasOwnProperty(key)) {
                    document.querySelectorAll('.edit-box')[key].classList.remove('visible')
                }
            }
           
        },
        toggleCreating(){
            this.creating = !this.creating
        },
        createFolder(event){
                console.log('attempting to create folder')
                console.log(event.target)
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken,
                axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
                let data = {
                    name: this.createName,
                };
                let routeid = this.$route.params.id
                //console.log(data)
                axios.post('/folders', data)
                .then((response) => {
                    console.log(response)
                    //this.asyncgetFolders()
                    this.assignParentToFolder( response.data.folder.id, response.data.folder.name ,  routeid , 0)
                    this.createName = null
                    this.creating = !this.creating
                    console.log(this.folders)
                })
                .catch( (error) => {
                        console.log(error);
                        if(error != 'undefined' && typeof error.response.data.errors != 'undefined'){
						let errors = error.response.data.errors;
							for (var key in errors) {
								if (errors.hasOwnProperty(key)) {
									console.log(key + " -> " + errors[key]);
									$('input[name="'+key+'"]').parent().addClass('input-error animated shake')
									$('input[name="'+key+'"]').prev().text(errors[key])
								}
							}
							setTimeout(function(){ 
                                $('.input-block').removeClass('input-error animated shake')
                                let labels = $('.fake-label');
                                for (var key in labels) {
                                   /*  console.log(key + " -> " + labels[key]); */
                                    let initial = $('.fake-label').eq(key).data('initial')
                                    $('.fake-label').eq(key).text(initial)
							    }
                                
							}, 3000);
						}
						if(typeof error.response.data.message != 'undefined'){
							document.getElementById('error').innerHTML = error.response.data.message;
						}
                })
            }, 
            assignParentToFolder(id, name, parentId, generatePreviewToken){
                console.log('assigntparenttofolderstart')
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
                axios.defaults.headers.common['Accept'] = 'application/json'
                axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
                axios.patch('/folders/'+id, {
                    name: name,
                    generatePreviewToken: generatePreviewToken,// what goes here?
                    parentId: parentId,
                }).then((response) => {
                    console.log(response)
                    this.asyncgetFolders()
                    /* this.createName = null
                    this.editName = null
                    this.editing = null
                    this.asyncgetFolderbyID(this.$route.params.id) */

                }).catch((error) => {
                     if(typeof error != 'undefined'){
                        console.log(error.response);      
                     }
                     
                });
            },
            deleteFolder(event, folderid){
                event.preventDefault()
                console.log('attempting to delete folder')
                axios.defaults.headers.common['Accept'] = 'application/json'
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken,
                axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
                let payload = {
                        confirmed: true,//this.confirmedtrue,
                        _method: 'delete'
                }
                console.log(payload)
                axios.post('/folders/'+folderid, payload)
                .then((response) => {
                    console.log(response)
                    this.asyncgetFolders()
                    console.log(this.folders)
                }).catch((error) => {
                    if(error.response != 'undefined'){
                        console.log(error.response);      
                    }
                })
            }, 
            editFolder(event, folder){
                event.preventDefault()
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
                axios.defaults.headers.common['Accept'] = 'application/json'
                axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
                let parentID = folder.parentId != null ? folder.parentId : 1
                axios.patch('/folders/'+folder.id, {
                    name: this.editName,
                    generatePreviewToken: 1,// what goes here?
                    parentId: parentID,
                }).then((response) => {
                    console.log(response)
                    this.asyncgetFolders()
                    this.createName = null
                    this.editName = null
                    this.editing = null
                    this.parentNames = []
                    this.asyncgetFolderbyID(this.$route.params.id)

                }).catch((error) => {
                     if(typeof error != 'undefined'){
                        console.log(error.response);      
                     }
                     
                });
            },
            testPromise(){
                new Promise(function(resolve, reject) {

                setTimeout(() => resolve(1), 1000); // (*)

                }).then(function(result) { // (**)

                alert(result); // 1
                return result * 2;

                }).then(function(result) { // (***)

                alert(result); // 2
                return result * 2;

                }).then(function(result) {

                alert(result); // 4
                return result * 2;

                });
            },
            setEditing($event, index, folder){
                event.preventDefault()
                this.editing = folder.id
                this.editName = folder.name
                this.hideAllPopups()
            }

  }
}
</script>
