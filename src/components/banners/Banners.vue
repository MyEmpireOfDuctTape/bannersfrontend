<template>
    <div class="fullpage container-fluid">
        <div class="row">

                <sidebar v-on:company-changed="methodThatForcesUpdate($event)"></sidebar>
                <add-banner></add-banner>
<!--                 <AddFolder></AddFolder> -->
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
                    <h1>Banners</h1>
                    <div class="container-fluid">
                        <div class="header row">
                            <div class="left col-lg-5 col-md-4">
                                <button v-on:click="toggleCreating" class="blue create-folder roundedd">Create folder</button>
                                <button v-on:click="showBannerOverlay" class="blue create roundedd">Create Banner</button>
                            </div>
                            <div class="right col-lg-7 col-md-8">
                                <div class="input-bubble search">
                                    <input type="text" v-model="folderSearchValue" v-on:keyup="searchFolders" placeholder="Search folders by name or description">
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
                                            <!-- <input type="text" v-model="name" placeholder="Untitled folder"> -->
                                            <div class="buttons">
                                            <button v-on:click="toggleCreating" class="left">CANCEL</button>
                                            <!-- <button v-on:click="createFolder($event)" class="right">CREATE</button> -->
                                            <button class="right">CREATE</button>
                                            <!-- <button v-on:click="testPromise($event)" class="right">CREATE</button> -->
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
                                                    <!-- <li><a href="#">
                                                        <svg version="1.1" id="" fill="#ededed" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>Duplicate Solid</title> <desc>Created with Sketch.</desc> <g> <g> <path d="M45.5,14h33H86v7.5v33V62h-8v8h8c4.4,0,8-3.6,8-8v-7.5v-33V14c0-4.4-3.6-8-8-8h-7.5h-33H38c-4.4,0-8,3.6-8,8v8h8v-8H45.5 L45.5,14L45.5,14z M6,38c0-4.4,3.6-8,8-8h48c4.4,0,8,3.6,8,8v48c0,4.4-3.6,8-8,8H14c-4.4,0-8-3.6-8-8V38L6,38L6,38z"/> </g> </g> </svg>
                                                        Duplicate</a></li> -->
                                                    <li><a v-on:click="deleteFolder($event, folder.id)" href="#">
                                                        <svg version="1.1" id="" fill="#e0e0e0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>09</title> <path d="M22.8,28.6l0.1,45.2c0,7.2,5.8,13,13,13h28.3c7.2,0,13-5.8,13-13l0.1-45.2h7.4c1.7,0,3-1.3,3-3s-1.3-3-3-3H63.6v-2.5 c0-3.9-3.1-7-7-7H43.4c-3.9,0-7,3.1-7,7v2.5H15.3c-1.7,0-3,1.3-3,3s1.3,3,3,3H22.8z M53,69.8c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9 c0-1.7,1.3-3,3-3s3,1.3,3,3V69.8z M58,40.9c0-1.7,1.3-3,3-3s3,1.3,3,3v28.9c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9z M42.4,20.2 c0-0.6,0.4-1,1-1h13.2c0.6,0,1,0.4,1,1v2.5H42.4V20.2z M36,40.9c0-1.7,1.3-3,3-3s3,1.3,3,3v28.9c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9z" /> </svg>
                                                        Delete </a></li>
                                                </ul>
                                            </div>
                                    <div class="folder-bg">
                                        <!-- <span class="folder-name">{{folder.name}}</span> -->
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
                                    <div class="right col-lg-8 col-md-8">
                                        <div class="input-bubble search">
                                            <input type="text" v-model="bannerSearchValue" v-on:keyup="searchBanners" placeholder="Search banners by name or description">
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
                            </div>
                            <div class="banner-slide row">
                                    
                               
                        <!-- 
                        <div class="col-lg-3 col-md-6 col-sm-12">
                            <div class="preview">
                                <div class="square">
                                    <router-link to="/banners/Folder Name 1">
                                    <div class="edit-overlay Aligner folder">
                                        <button class="check"></button>
                                        <input type="checkbox" class="">
                                        <button class="edit"></button>
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
                                        <svg version="1.1" id="" class="Aligner-item" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 800 800" style="enable-background:new 0 0 800 800;" xml:space="preserve"> <path id="Shape-Copy" class="st0" d="M304.7,196.1l47.7,47.7c13.6,13.6,30.6,20.4,47.7,20.4h272.4v340.5H127.6V196.1H304.7z M331.9,128H127.6c-37.5,0-68.1,30.6-68.1,68.1v408.6c0,37.5,30.6,68.1,68.1,68.1h544.8c37.5,0,68.1-30.6,68.1-68.1V264.2 c0-37.5-30.6-68.1-68.1-68.1H400L331.9,128z"/> </svg>    
                                    </div>   
                                    </router-link>
                                </div>     
                                <span class="name">Folder name 1</span>
                                <span class="dimensions">20 banners</span>
                            </div>    
                        </div>
                         -->
                         
                        <template v-for="(banner, key) in banners">
                            <div class="col-lg-2 col-md-3 col-sm-6">
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
import AddFolder from '../modals/AddFolder'
import Loading from '../loading/Loading'

import domfunctions from '@/mixins/domfunctions.js'
import axios from 'axios'


export default {
  name: 'Banners',
  components: {
      Sidebar, 
      AddBanner,
      AddFolder,
      Loading,
  },
  data () {
    return {
        loading: true,
        msg: 'Banners yo',
        banners: null,
        folders: null,
        allFolders: null,
        currentCompany: this.$store.getters.getCurrentCompany || null,
        currentAccessLevel: this.$store.getters.getCurrentAccessLevel || null,
        creating: false,
        createName: null,
        confirmedtrue: false,
        editName:  null,
        editing: [],
        allSizes: null,
        currentSortByIndex: 0,
        currentSortByOrderIndex: 0,
        currentAspectRatioIndex: 0,
        currentSizeIndex: 0,
        bannerSearchValue: null,
        folderSearchValue: null,
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
                value: 'name',
                text: 'Name alphabetically'
            },
            {
                value: 'description',
                text: 'Description alphabetically'
            },
            {
                value: 'templateId',
                text: 'Template ID'
            },
            {
                value: 'estimatedBannerSize',
                text: 'Estimated banner size'
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
        this.asyncgetBannersDirect()
        this.asyncgetFolders()
        this.getAllSizes()
  },
mixins: [domfunctions],
  methods: {
      searchFolders(){
            //console.log(this.searchValue)
            let searchValue = this.folderSearchValue.toLowerCase()
            let searchResults = []
            if(searchValue == null || searchValue == ''){
                this.folders = this.allFolders
                return
            }
            _.forEach(this.allFolders, function(value){
                /* console.log(value.name.indexOf(searchValue)) */
                if(value.name.toLowerCase().indexOf(searchValue) > -1){
                    searchResults.push(value) 
                }
            })
            this.folders = searchResults
        },
        searchBanners(){
            //console.log(this.searchValue)
            let searchValue = this.bannerSearchValue.toLowerCase()
            let searchResults = []
            if(searchValue == null || searchValue == ''){
                this.banners = this.allBanners
                return
            }
            _.forEach(this.allBanners, function(value){
                /* console.log(value.name.indexOf(searchValue)) */
                if(value.name.toLowerCase().indexOf(searchValue) > -1){
                    searchResults.push(value) 
                }
            })
            this.banners = searchResults
        },
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
            this.asyncgetBannersDirect(20, 0, this.orderOptions[this.currentSortByOrderIndex].value , this.sortingOptions[this.currentSortByIndex].value)
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
        async asyncgetBannersDirect(takeAmount = 20, skipAmount = 0, orderByTypeArg = 'DESC', orderByArg = 'updatedAt'){
            this.loading = true
            // SET HEADERS
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken,
            axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
            let params = {
                    take: takeAmount,
                    skip: skipAmount,
                    orderByType: orderByTypeArg,
                    orderBy: orderByArg,
            };
            let serialized = this.serialize(params)
                const response = await axios.get('/banners'+serialized)
                console.log(response)
                this.banners = response.data.banners
                this.allBanners = response.data.banners
                _.forEach(this.allBanners, (banner, key) => {
                            if(typeof this.banners[key].aspectRatio !== Array){
                                this.banners[key].aspectRatio = []
                            }
                            if(typeof this.allBanners[key].aspectRatio !== Array){
                                this.allBanners[key].aspectRatio = []
                            }
                            if(banner.size.width == banner.size.height){
                                this.banners[key].aspectRatio.push('square')
                                this.allBanners[key].aspectRatio.push('square')
                            }
                            else if(banner.size.width > banner.size.height){
                                this.banners[key].aspectRatio.push('landscape')
                                this.allBanners[key].aspectRatio.push('landscape')
                            }
                            else{
                                this.banners[key].aspectRatio.push('portrait')
                                this.allBanners[key].aspectRatio.push('portrait')
                            }
                    })
                    console.log(this.banners)
                this.loading = false
			
        },
        searchByAspectRatio(event, searchterm, key){
                event.stopPropagation()
                this.banners = []
                console.log('searching by aspect ratio')
                this.editingAspectRatio = false
                this.editingSize = false
                this.currentAspectRatioIndex = key
                if(searchterm == 'all'){
                    this.banners = this.allBanners
                    return
                }
                _.forEach(this.allBanners, (template, key) => {
                    if(typeof this.allBanners[key].aspectRatio !== 'undefined' && this.allBanners[key].aspectRatio.indexOf(searchterm) != -1){
                        this.banners.push(template)
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
                this.banners = []
                this.editingOrderValue = false
                this.editingOrderOrder = false
                this.editingAspectRatio = false
                this.editingSize = false
                this.currentSizeIndex = key
                if(id == 'all'){
                    this.banners = this.allBanners
                    return
                }
                _.forEach(this.allBanners, (banner, key) => {
                    console.log(banner.size)
                    console.log(id)
                    if(typeof banner.size !== 'undefined' && banner.size.id == id){
                        this.banners.push(banner)
                        return
                    }
                })

            },
        async asyncgetFolderbyID(id){
            this.loading = true

            // SET HEADERS
			axios.defaults.headers.common['Accept'] = 'application/json',
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken,
			axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
                const response = await axios.get('/folders/'+id)
                console.log(response.data)
                
            this.loading = false
			
        },
        async asyncgetFolders(takeAmount = 50, skipAmount = 0, orderByTypeArg = 'ASC', orderByArg = 'id'){
            //POSSIBLE ORDERBYS
            //companyId -> companyId
            //createdAt -> createdAt
            //id -> id  // duh
            //name -> name
            // parentId -> parentId
            //token -> ????? 
            // updatedAt -> updated_at
            this.loading = true
/*             let take = 50
            let skip = 0
            let orderBy = orderByArg
            let orderByType = orderByTypeArg
            if(takeAmount && Number.isInteger(takeAmount)){
                take = takeAmount
            }
            if(skipAmount && Number.isInteger(skipAmount)){
                skip = skipAmount
            } */
            // SET HEADERS
            console.log('asyncfolders start')
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken,
            axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
            let params = {
                    take: takeAmount,
                    skip: skipAmount,
                    orderByType: orderByTypeArg,
                    orderBy: orderByArg,
            };
            let serialized = this.serialize(params)
            const response = await axios.get('/folders'+serialized)
            console.log(response.data.folders)
            this.folders = response.data.folders
            this.allFolders = response.data.folders
            this.sortFoldersById()
            this.hideAllPopups()
                // nothing useful in here
                /* for(let key in response.data.folders){
                    if (response.data.folders.hasOwnProperty(key)) {
                        this.asyncgetFolderbyID(response.data.folders[key].id)
                    }
                } */
            this.loading = false


        },
        sortFoldersById(){
            this.loading = true
            let banana = []
             // sort the banners with this folder id
            _.forEach(this.allFolders, function(value, key) {
                //if(value.folderId == this.$route.params.id){
                    //console.log(value)
                if(value.parentId == null){
                    banana.push(value)
                }
            });
            this.folders = banana
            this.allFolders = banana
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
                console.log(data)
                axios.post('/folders', data)
                .then((response) => {
                    console.log(response)
                    this.asyncgetFolders()
                    this.createName = null
                    this.creating = !this.creating
                    console.log(this.folders)
                }) 
                .catch( (error) => {
                        console.log(error.response);
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
                }).catch((error) => {
                     if(typeof error != 'undefined'){
                        console.log(error.response);      
                     }
                     
                });
            },
            setEditing($event, index, folder){
                event.preventDefault()
                this.editing = folder.id
                this.editName = folder.name
                this.hideAllPopups()
            },
            methodThatForcesUpdate(event) {
                this.currentCompany = event
                this.asyncgetBannersDirect()
                this.asyncgetFolders()
            },

  }
}
</script>
