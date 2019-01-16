<template>
    <div class="fullpage container-fluid">
        <div class="row">

                <sidebar></sidebar>
               <add-banner></add-banner>

		<div class="dashboard main-view container-fluid">
                <div class="banners-by-company row" v-for="company in user.companies">
                   <template v-if="company.id === 1">
                        <div class="banner-by-company active col-lg-3">
                            <span class="allcaps">{{ company.name }}</span><br />
                            <span class="small">{{ company.bannersCount }} banners, {{ company.templatesCount }} templates</span>
                        </div>
                    </template>
                    <template v-else>
                        <div class="banner-by-company active col-lg-3">
                            <span class="allcaps">{{ company.name }}</span><br />
                            <span class="small">{{ company.bannersCount }} banners, {{ company.templatesCount }} templates</span>
                        </div>
                    </template>
                    <!-- <div class="banner-by-company colorful col-lg-3">
                        <span class="allcaps">{{ company.name }}</span><br />
                        <span class="small">{{ company.bannersCount }} banners, {{ company.templatesCount }} templates</span>
                    </div> -->

                    
                    <!-- <div class="banner-by-company colorful col-lg-3">
                        <span class="allcaps">idea ad</span><br />
                        <span class="small">230 banners, 0 templates</span>

                    </div>
                    <div class="banner-by-company col-lg-3">
                        <span class="allcaps">idea ad</span><br />
                        <span class="small">230 banners, 0 templates</span>

                    </div>
                    <div class="banner-by-company col-lg-3">
                        <span class="allcaps">idea ad</span><br />
                        <span class="small">230 banners, 0 templates</span>

                    </div> -->
                </div>
                <div class="recent-banners">
                    <div class="header row">
                        <div class="left col-lg-8">
                            <h1>My recent Banners ({{this.banners.count}})</h1>
                        </div>
                        <div class="right col-lg-4">
                            <button v-on:click="showOverlay" class="create blue roundedd">Create banner</button>
                            <router-link to="/banners"><button class="view blue roundedd">View all</button></router-link>
                         </div>   
                    </div>
                    <div class="banner-slide row">
                       <div class="col-lg-3 col-md-6 col-sm-12">
                            <div class="preview">
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
                            </div>    
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-12">
                            <div class="preview">
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
                                         <img class="Aligner-item land" src="../../assets/img/banner_port.jpg">
                                    </div>   
                                </div>     
                            </div>    
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-12">
                            <div class="preview">
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
                            </div>    
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-12">
                            <div class="preview">
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
                                         <img class="Aligner-item land" src="../../assets/img/banner_port.jpg">
                                    </div>   
                                </div>     
                            </div>    
                        </div>
                </div>
                </div>
                <div class="recent-templates">
                    <div class="header row">
                        <div class="left col-lg-8">
                            <h1>My recent Banners ({{this.banners.count}})</h1>
                        </div>
                        <div class="right col-lg-4">
                            <button v-on:click="showOverlay" class="create blue roundedd">Create banner</button>
                            <router-link to="/banners"><button class="view blue roundedd">View all</button></router-link>
                         </div>   
                    </div>
                    <div class="template-list">
                        <div class="template row">
                            <div class="left col-lg-6">
                                <span class="bold">Skyscraper_Banners_Set</span>
                                <span class="dimension">600x300</span>
                                <span class="dimension">600x300</span>
                                <span class="dimension">600x300</span>
                                <span class="dimension">600x300</span>
                                <span class="dimension">600x300</span>
                                <span class="dimension">600x300</span>
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
                        </div>     
                        <div class="template row">
                            <div class="left col-lg-6">
                                <span class="bold">Skyscraper_Banners_Set</span>
                                <span class="dimension">600x300</span>
                                <span class="dimension">600x300</span>
                                <span class="dimension">600x300</span>
                                <span class="dimension">600x300</span>
                                <span class="dimension">600x300</span>
                                <span class="dimension">600x300</span>
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
                        </div>   
                        </div>   
                    </div>    
   
                </div>
			</div>
			</div>

</template>

<script>

import Sidebar from '../sidebar/Sidebar'
import AddBanner from '../modals/AddBanner'


export default {
  name: 'Dashboard',
  components: {
      Sidebar ,
      AddBanner 
  },
  data () {
    return {
      user: this.$store.getters.getUser,
      banners: this.$store.getters.getBanners,
    }
  },
  computed: {
      loggedIn(){
          return this.$store.getters.loggedIn
      }
  },
  created: function(){
        this.getBanners()
  },
  beforeMount: function(){
        console.log(this.$store.getters.getBanners)
        console.log(this.$store.getters.getUser)

  },
  methods: {
        getBanners(){
            this.$store.dispatch('retrieveBanners', {
                bearer: this.$store.getters.getToken.accessToken,
                company: 1
            })
            .then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
        },
        createBanner(){
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
			},
        checkBoxToggle(event){
                event.target.parentNode.classList.toggle('selected');
                event.target.classList.toggle('selected');
        },
        editPopup(event){
			event.target.nextElementSibling.classList.toggle('visible');
        },
        showOverlay(){
                document.querySelector('.overlay').classList.add('open', 'animated', 'slideInRight')
                //document.querySelector('.overlay .popup').classList.add('animated', 'flipInY')
        }
  },
}
</script>

