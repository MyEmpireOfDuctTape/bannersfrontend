<template>
    <div class="fullpage container-fluid">
        <div class="row">
                <sidebar v-on:company-changed="methodThatForcesUpdate($event)"></sidebar>
                <add-user></add-user>
                <editUser v-bind:firstName="currentUser.firstName" v-bind:lastName="currentUser.lastName"></EditUser>
                <DeleteUser v-bind:firstName="currentUser.firstName" v-bind:lastName="currentUser.lastName"></DeleteUser>

		        <div class="edit-company main-view container-fluid">
                    <div class="row">
                        <div class="col-lg-5 col-md-12 edit-form">
                            <form @submit="editCompany($event)">
                            <h1>Edit Company</h1>
                            <div class="company-form">
                                <div class="input-block focused">
                                    <span v-on:click="focusInput" class="fake-label">Name</span>
                                    <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="name" name="name" type="text">
                                </div>
                                <div class="input-block focused">
                                    <span v-on:click="focusInput" class="fake-label">Company Email</span>
                                    <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="email" name="email" type="email">
                                </div>
                                <div class="input-block focused">
                                    <span v-on:click="focusInput" class="fake-label">Registration code</span>
                                    <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="registrationCode" name="registrationCode" type="text">
                                </div>
                                <div class="input-block focused">
                                    <span v-on:click="focusInput" class="fake-label">VAT Code</span>
                                    <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="vatNumber" name="vat_number" type="text">
                                </div>
                                <div class="input-block focused">
                                    <span v-on:click="focusInput" class="fake-label">Country</span>
                                    <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="country" name="country" type="text">
                                </div>
                                <div class="input-block focused">
                                    <span v-on:click="focusInput" class="fake-label">City</span>
                                    <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="city" name="city" type="text" >
                                </div>
                                <div class="input-block focused">
                                    <span v-on:click="focusInput" class="fake-label">Street Address</span>
                                    <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="address" name="address" type="text" >
                                </div>
                                <!-- <div class="input-block focused">
                                    <span v-on:click="focusInput" class="fake-label">Email</span>
                                    <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="email" name="email" type="text">
                                </div> -->
                            </div>  
                            <button class="blue save roundedd">Save</button>  
                            </form>
                        </div>
                        <!-- <template v-for="(user, key, index) in users">
                            <span>{{user}}</span>
                            <span> key {{key}}</span>
                            <span>index {{index}}</span>
                        </template> -->
                        <div class="col-lg-7 col-md-12 users">
                            <div class="row top">
                                <div class="col-lg-6 left">
                                    <h1>Users</h1>
                                </div>
                                <div class="col-lg-6 right">
                                    <button v-on:click="showOverlay" class="add-user blue roundedd">Add user</button>
                                </div>   
                            </div>
                            <template v-for="(user, key, index) in users">
                                <template v-if="user.firstName !== null && user.lastName !== null">
                            <div class="user row">
                                <div class="col-lg-2 status">
                                    <div class="round-wrapper Aligner">
                                        <span class="round">
                                            <span>{{ user.firstName.substring(0,1) }}{{ user.lastName.substring(0,1) }}</span>
                                            </span>
                                    </div>    
                                    <span class="indicator confirmed"></span>
                                </div>
                                <div class="col-lg-5">
                                    <span class="bold">{{user.firstName}} {{user.lastName}}</span>
                                    <span class="email">{{user.email}}</span>
                                    <span class="lastseen">Last seen <span class="date"> {{ humanDate(user.lastSeenAt) }}</span></span>
                                </div>
                                <div class="col-lg-3">
                                    <div class="input-bubble dropdown actually-not"> 
                                    <span> {{ returnRole(user.pivot.role) }}</span>
                                    <!-- <div class="hidden">
                                        <ul>
                                            <li>User</li>
                                            <li>Designer</li>
                                            <li>Developer</li>
                                        </ul>
                                    </div>               -->              
                                </div>
                                </div>
                                <div class="col-lg-2 status">
                                    <template v-if="user.id == currentUser.id">
                                   <div class="grey-dd">
                                            <svg class="icon" v-on:click="editPopup" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>setng cog</title> <path d="M98.7,38.7c-0.1-0.3-0.3-0.6-0.5-0.9c-1.8-2.3-4.6-3.6-7.5-3.5h-0.5c-1.7,0-3.2-1-4-2.5c-0.1,0-0.1,0-0.1-0.1c0,0,0,0,0,0 c-0.5-0.9-1-1.7-1.5-2.6c-0.1,0-0.1-0.1-0.1-0.1c-0.9-1.5-0.9-3.3-0.1-4.8c0.1-0.1,0.2-0.2,0.2-0.4c1.5-2.6,1.8-5.7,0.8-8.6 c-0.1-0.3-0.3-0.7-0.5-0.9c-1.7-1.6-3.5-3.1-5.4-4.5c-0.2-0.1-0.5-0.2-0.9-0.4c-2.9-0.6-6,0.2-8.2,2.2c-0.1,0-0.3,0.1-0.4,0.2 c-0.8,0.7-1.8,1-2.8,1c-0.6,0-1.2-0.1-1.8-0.4c-1-0.4-1.9-0.7-2.9-1c-1.6-0.6-2.8-2-3.1-3.6c0-0.2-0.1-0.3-0.1-0.5 c-0.4-3-2.2-5.6-4.9-7c-0.3-0.2-0.6-0.2-0.9-0.2c-2.3-0.1-4.6-0.1-6.9,0c-0.3,0-0.6,0.1-0.9,0.2c-2.7,1.5-4.5,4.1-4.9,7.1 c-0.1,0.1-0.2,0.2-0.1,0.4c-0.3,1.7-1.4,3.1-3.1,3.6c-0.9,0.2-1.9,0.6-2.9,1c-0.6,0.1-1.2,0.2-1.8,0.2c-1,0-2-0.4-2.8-1 c-0.1-0.1-0.2-0.1-0.4-0.3c-2.2-2-5.3-2.8-8.2-2.2c-0.3,0-0.7,0.1-0.9,0.4c-1.9,1.3-3.7,2.8-5.4,4.5c-0.2,0.3-0.4,0.6-0.5,0.9 c-1.1,2.8-0.8,6,0.8,8.6c0.1,0.1,0.2,0.3,0.2,0.4c0.8,1.5,0.7,3.3-0.1,4.8c-0.1,0-0.1,0-0.1,0.1c0,0,0,0,0,0c-0.5,0.8-1,1.7-1.5,2.6 c-0.1,0-0.1,0-0.1,0.1c0,0,0,0,0,0c-0.8,1.5-2.3,2.5-4,2.5H9.3c-2.9-0.1-5.7,1.2-7.5,3.5c-0.2,0.3-0.4,0.6-0.5,0.9 c-0.6,2.4-1,4.8-1.3,7.3c0,0.3,0,0.7,0.1,1c0.9,2.8,3.1,4.9,5.9,5.9c0.2,0,0.3,0.1,0.5,0.1c1.6,0.6,2.7,2,2.9,3.6v0.1 c0.1,1,0.3,2,0.5,3v0.1c0.3,1.7-0.3,3.4-1.5,4.5c-0.1,0-0.3,0.1-0.4,0.2c-2.2,1.8-3.5,4.5-3.6,7.4c0,0.3,0.1,0.7,0.2,1 c1.1,2.3,2.4,4.5,3.8,6.6C8.7,80,9,80.3,9.3,80.4c2.5,1.4,5.4,1.6,8,0.5c0.2,0,0.4,0,0.5-0.1c0.5-0.2,1-0.3,1.5-0.2 c0.6,0,1.1,0.1,1.6,0.3c0.6,0.2,1.1,0.5,1.5,0.9l2.3,2l0.1,0.1c1.3,1.1,1.9,2.7,1.7,4.4c-0.1,0.2-0.1,0.3-0.1,0.5 c-0.6,2.8,0.1,5.7,1.8,7.9c0.2,0.3,0.6,0.5,0.9,0.6c2.3,1.2,4.8,2.1,7.3,2.7c0.4,0.1,0.8,0.1,1.2,0c2.7-0.6,5.1-2.3,6.4-4.8 c0.1-0.1,0.2-0.3,0.2-0.4c0.8-1.5,2.4-2.5,4.1-2.3h3.2c1.7,0,3.3,0.8,4.1,2.3c0.1,0.1,0.2,0.3,0.2,0.4c1.3,2.5,3.6,4.2,6.4,4.8h0.5 c0.1,0,0.4,0,0.2-0.3c2.5-0.8,4.9-1.7,7.3-2.7c0.3-0.1,0.7-0.4,0.9-0.6c1.4-1.6,2.1-3.7,2.1-5.8c0-0.6-0.1-1.2-0.2-1.8 c0-0.3,0-0.5-0.1-0.8c-0.2-1.6,0.5-3.3,1.8-4.3c-0.1-0.1-0.1-0.1,0-0.2s0.1-0.1,0.2,0c0.8-0.6,1.6-1.3,2.3-2h0.1 c0.8-0.8,1.9-1.2,3.1-1.2c0.4,0,0.7,0,1.1,0.1c0.1,0,0.3,0.1,0.4,0.1c0.2,0,0.3,0.1,0.5,0.1c0.5,0.2,1.1,0.4,1.7,0.5 c0.6,0.1,1.2,0.2,1.8,0.2c1.6,0,3.2-0.4,4.6-1.2l0.8-0.8c1.5-2.1,2.8-4.3,3.8-6.6c0.2-0.3,0.2-0.7,0.2-1c-0.1-2.9-1.4-5.6-3.6-7.4 c-0.1-0.1-0.2-0.2-0.4-0.4c-1.2-1-1.8-2.5-1.5-4v-0.1c0.2-1,0.4-2,0.5-3v-0.1c0.5-3,2.7-3.7,2.9-3.7c0.2,0,0.4,0,0.6-0.2 c2.7-0.9,4.9-3.1,5.8-5.8c0.1-0.3,0.2-0.7,0.1-1C99.8,43.5,99.3,41.1,98.7,38.7z M50,71.1c-11.3,0.1-20.6-9-20.7-20.4 c-0.1-11.3,9-20.6,20.4-20.7c11.3-0.1,20.6,9,20.7,20.4c0,0,0,0.1,0,0.1c0.1,11.3-8.9,20.5-20.2,20.6C50.1,71.1,50.1,71.1,50,71.1z" /> </svg>
                                            <div class="edit-box">
                                            <ul>
                                                <li>
                                                    <a  v-on:click="editUser" href="#" >
                                                     <svg version="1.1" fill="#ededed" id="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>60 all</title> <g> <path d="M76.6,51.8v24.8H23.4V23.4h24.8V12.7H18.1c-3,0-5.4,2.4-5.4,5.4V82c0,3,2.4,5.4,5.4,5.4H82c3,0,5.4-2.4,5.4-5.4V51.8H76.6z "/> <path d="M44,44.6l-4.2,11.1c-0.5,1.9,0.6,3.9,2.5,4.4c0.6,0.1,1.3,0.1,1.9,0L55.4,56c0.6-0.1,1.2-0.5,1.5-1l28.6-28.6 c1.4-1.4,2.3-2.9,0.8-4.2l-7.7-7.9c-1.4-1.4-3.7-1.4-5,0L45,43C44.5,43.4,44.2,44,44,44.6z"/> </g> </svg>
                                                    Edit</a>
                                                    
                                                    </li>
                                                <!-- <li><a href="#">
                                                     <svg version="1.1" id="" fill="#ededed" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>Duplicate Solid</title> <desc>Created with Sketch.</desc> <g> <g> <path d="M45.5,14h33H86v7.5v33V62h-8v8h8c4.4,0,8-3.6,8-8v-7.5v-33V14c0-4.4-3.6-8-8-8h-7.5h-33H38c-4.4,0-8,3.6-8,8v8h8v-8H45.5 L45.5,14L45.5,14z M6,38c0-4.4,3.6-8,8-8h48c4.4,0,8,3.6,8,8v48c0,4.4-3.6,8-8,8H14c-4.4,0-8-3.6-8-8V38L6,38L6,38z"/> </g> </g> </svg>
                                                    Duplicate</a></li> -->
                                                <template v-if="user.id == currentUser.id">
                                                    <li><a v-on:click="openDeleteUser" href="#">
                                                     <svg version="1.1" id="" fill="#e0e0e0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>09</title> <path d="M22.8,28.6l0.1,45.2c0,7.2,5.8,13,13,13h28.3c7.2,0,13-5.8,13-13l0.1-45.2h7.4c1.7,0,3-1.3,3-3s-1.3-3-3-3H63.6v-2.5 c0-3.9-3.1-7-7-7H43.4c-3.9,0-7,3.1-7,7v2.5H15.3c-1.7,0-3,1.3-3,3s1.3,3,3,3H22.8z M53,69.8c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9 c0-1.7,1.3-3,3-3s3,1.3,3,3V69.8z M58,40.9c0-1.7,1.3-3,3-3s3,1.3,3,3v28.9c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9z M42.4,20.2 c0-0.6,0.4-1,1-1h13.2c0.6,0,1,0.4,1,1v2.5H42.4V20.2z M36,40.9c0-1.7,1.3-3,3-3s3,1.3,3,3v28.9c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9z" /> </svg>
                                                    Delete</a>
                                                    
                                                    </li>
                                                </template>
                                            </ul>
                                        </div>
                                        
                                        </div>   
                                                </template>

                                </div>
                           </div>   
                           </template>
                           <template v-else>
                               <div class="user row">
                                <div class="col-lg-2 status">
                                    <div class="round-wrapper Aligner">
                                        <span class="round">
                                            <span>JD</span>
                                            </span>
                                    </div>    
                                    <span class="indicator pending"></span>
                                </div>
                                <div class="col-lg-5">
                                    <span class="bold">John Doe</span>
                                    <span class="email">{{user.email}} </span>
                                    <span class="lastseen">Last updated <span class="date"> {{ humanDate(user.updatedAt) }}</span></span>
                                </div>
                                <div class="col-lg-3">
                                    <div class="input-bubble dropdown actually-not"> 
                                    <span> {{ returnRole(user.pivot.role) }}</span>
                                    <!-- <div class="hidden">
                                        <ul>
                                            <li>User</li>
                                            <li>Designer</li>
                                            <li>Developer</li>
                                        </ul>
                                    </div>               -->              
                                </div>
                                </div>
                                <div class="col-lg-2 status">
                                    <template v-if="user.id == currentUser.id">
                                   <div class="grey-dd">
                                            <svg class="icon" v-on:click="editPopup" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>setng cog</title> <path d="M98.7,38.7c-0.1-0.3-0.3-0.6-0.5-0.9c-1.8-2.3-4.6-3.6-7.5-3.5h-0.5c-1.7,0-3.2-1-4-2.5c-0.1,0-0.1,0-0.1-0.1c0,0,0,0,0,0 c-0.5-0.9-1-1.7-1.5-2.6c-0.1,0-0.1-0.1-0.1-0.1c-0.9-1.5-0.9-3.3-0.1-4.8c0.1-0.1,0.2-0.2,0.2-0.4c1.5-2.6,1.8-5.7,0.8-8.6 c-0.1-0.3-0.3-0.7-0.5-0.9c-1.7-1.6-3.5-3.1-5.4-4.5c-0.2-0.1-0.5-0.2-0.9-0.4c-2.9-0.6-6,0.2-8.2,2.2c-0.1,0-0.3,0.1-0.4,0.2 c-0.8,0.7-1.8,1-2.8,1c-0.6,0-1.2-0.1-1.8-0.4c-1-0.4-1.9-0.7-2.9-1c-1.6-0.6-2.8-2-3.1-3.6c0-0.2-0.1-0.3-0.1-0.5 c-0.4-3-2.2-5.6-4.9-7c-0.3-0.2-0.6-0.2-0.9-0.2c-2.3-0.1-4.6-0.1-6.9,0c-0.3,0-0.6,0.1-0.9,0.2c-2.7,1.5-4.5,4.1-4.9,7.1 c-0.1,0.1-0.2,0.2-0.1,0.4c-0.3,1.7-1.4,3.1-3.1,3.6c-0.9,0.2-1.9,0.6-2.9,1c-0.6,0.1-1.2,0.2-1.8,0.2c-1,0-2-0.4-2.8-1 c-0.1-0.1-0.2-0.1-0.4-0.3c-2.2-2-5.3-2.8-8.2-2.2c-0.3,0-0.7,0.1-0.9,0.4c-1.9,1.3-3.7,2.8-5.4,4.5c-0.2,0.3-0.4,0.6-0.5,0.9 c-1.1,2.8-0.8,6,0.8,8.6c0.1,0.1,0.2,0.3,0.2,0.4c0.8,1.5,0.7,3.3-0.1,4.8c-0.1,0-0.1,0-0.1,0.1c0,0,0,0,0,0c-0.5,0.8-1,1.7-1.5,2.6 c-0.1,0-0.1,0-0.1,0.1c0,0,0,0,0,0c-0.8,1.5-2.3,2.5-4,2.5H9.3c-2.9-0.1-5.7,1.2-7.5,3.5c-0.2,0.3-0.4,0.6-0.5,0.9 c-0.6,2.4-1,4.8-1.3,7.3c0,0.3,0,0.7,0.1,1c0.9,2.8,3.1,4.9,5.9,5.9c0.2,0,0.3,0.1,0.5,0.1c1.6,0.6,2.7,2,2.9,3.6v0.1 c0.1,1,0.3,2,0.5,3v0.1c0.3,1.7-0.3,3.4-1.5,4.5c-0.1,0-0.3,0.1-0.4,0.2c-2.2,1.8-3.5,4.5-3.6,7.4c0,0.3,0.1,0.7,0.2,1 c1.1,2.3,2.4,4.5,3.8,6.6C8.7,80,9,80.3,9.3,80.4c2.5,1.4,5.4,1.6,8,0.5c0.2,0,0.4,0,0.5-0.1c0.5-0.2,1-0.3,1.5-0.2 c0.6,0,1.1,0.1,1.6,0.3c0.6,0.2,1.1,0.5,1.5,0.9l2.3,2l0.1,0.1c1.3,1.1,1.9,2.7,1.7,4.4c-0.1,0.2-0.1,0.3-0.1,0.5 c-0.6,2.8,0.1,5.7,1.8,7.9c0.2,0.3,0.6,0.5,0.9,0.6c2.3,1.2,4.8,2.1,7.3,2.7c0.4,0.1,0.8,0.1,1.2,0c2.7-0.6,5.1-2.3,6.4-4.8 c0.1-0.1,0.2-0.3,0.2-0.4c0.8-1.5,2.4-2.5,4.1-2.3h3.2c1.7,0,3.3,0.8,4.1,2.3c0.1,0.1,0.2,0.3,0.2,0.4c1.3,2.5,3.6,4.2,6.4,4.8h0.5 c0.1,0,0.4,0,0.2-0.3c2.5-0.8,4.9-1.7,7.3-2.7c0.3-0.1,0.7-0.4,0.9-0.6c1.4-1.6,2.1-3.7,2.1-5.8c0-0.6-0.1-1.2-0.2-1.8 c0-0.3,0-0.5-0.1-0.8c-0.2-1.6,0.5-3.3,1.8-4.3c-0.1-0.1-0.1-0.1,0-0.2s0.1-0.1,0.2,0c0.8-0.6,1.6-1.3,2.3-2h0.1 c0.8-0.8,1.9-1.2,3.1-1.2c0.4,0,0.7,0,1.1,0.1c0.1,0,0.3,0.1,0.4,0.1c0.2,0,0.3,0.1,0.5,0.1c0.5,0.2,1.1,0.4,1.7,0.5 c0.6,0.1,1.2,0.2,1.8,0.2c1.6,0,3.2-0.4,4.6-1.2l0.8-0.8c1.5-2.1,2.8-4.3,3.8-6.6c0.2-0.3,0.2-0.7,0.2-1c-0.1-2.9-1.4-5.6-3.6-7.4 c-0.1-0.1-0.2-0.2-0.4-0.4c-1.2-1-1.8-2.5-1.5-4v-0.1c0.2-1,0.4-2,0.5-3v-0.1c0.5-3,2.7-3.7,2.9-3.7c0.2,0,0.4,0,0.6-0.2 c2.7-0.9,4.9-3.1,5.8-5.8c0.1-0.3,0.2-0.7,0.1-1C99.8,43.5,99.3,41.1,98.7,38.7z M50,71.1c-11.3,0.1-20.6-9-20.7-20.4 c-0.1-11.3,9-20.6,20.4-20.7c11.3-0.1,20.6,9,20.7,20.4c0,0,0,0.1,0,0.1c0.1,11.3-8.9,20.5-20.2,20.6C50.1,71.1,50.1,71.1,50,71.1z" /> </svg>
                                            <div class="edit-box">
                                            <ul>
                                                <li>
                                                    <a  v-on:click="editUser" href="#" >
                                                     <svg version="1.1" fill="#ededed" id="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>60 all</title> <g> <path d="M76.6,51.8v24.8H23.4V23.4h24.8V12.7H18.1c-3,0-5.4,2.4-5.4,5.4V82c0,3,2.4,5.4,5.4,5.4H82c3,0,5.4-2.4,5.4-5.4V51.8H76.6z "/> <path d="M44,44.6l-4.2,11.1c-0.5,1.9,0.6,3.9,2.5,4.4c0.6,0.1,1.3,0.1,1.9,0L55.4,56c0.6-0.1,1.2-0.5,1.5-1l28.6-28.6 c1.4-1.4,2.3-2.9,0.8-4.2l-7.7-7.9c-1.4-1.4-3.7-1.4-5,0L45,43C44.5,43.4,44.2,44,44,44.6z"/> </g> </svg>
                                                    Edit</a>
                                                    
                                                    </li>
                                                <!-- <li><a href="#">
                                                     <svg version="1.1" id="" fill="#ededed" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>Duplicate Solid</title> <desc>Created with Sketch.</desc> <g> <g> <path d="M45.5,14h33H86v7.5v33V62h-8v8h8c4.4,0,8-3.6,8-8v-7.5v-33V14c0-4.4-3.6-8-8-8h-7.5h-33H38c-4.4,0-8,3.6-8,8v8h8v-8H45.5 L45.5,14L45.5,14z M6,38c0-4.4,3.6-8,8-8h48c4.4,0,8,3.6,8,8v48c0,4.4-3.6,8-8,8H14c-4.4,0-8-3.6-8-8V38L6,38L6,38z"/> </g> </g> </svg>
                                                    Duplicate</a></li> -->
                                                <template v-if="user.id == currentUser.id">
                                                    <li><a v-on:click="openDeleteUser" href="#">
                                                     <svg version="1.1" id="" fill="#e0e0e0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>09</title> <path d="M22.8,28.6l0.1,45.2c0,7.2,5.8,13,13,13h28.3c7.2,0,13-5.8,13-13l0.1-45.2h7.4c1.7,0,3-1.3,3-3s-1.3-3-3-3H63.6v-2.5 c0-3.9-3.1-7-7-7H43.4c-3.9,0-7,3.1-7,7v2.5H15.3c-1.7,0-3,1.3-3,3s1.3,3,3,3H22.8z M53,69.8c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9 c0-1.7,1.3-3,3-3s3,1.3,3,3V69.8z M58,40.9c0-1.7,1.3-3,3-3s3,1.3,3,3v28.9c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9z M42.4,20.2 c0-0.6,0.4-1,1-1h13.2c0.6,0,1,0.4,1,1v2.5H42.4V20.2z M36,40.9c0-1.7,1.3-3,3-3s3,1.3,3,3v28.9c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9z" /> </svg>
                                                    Delete</a>
                                                    
                                                    </li>
                                                </template>
                                            </ul>
                                        </div>
                                        
                                        </div>   
                                                </template>

                                </div>
                           </div>   
                           </template>


                           </template>
                           <!--<! user 
                            <div class="user row">
                                <div class="col-lg-2 status">
                                    <div class="round-wrapper Aligner">
                                        <span class="round">MS</span>
                                    </div>    
                                    <span class="indicator confirmed"></span>
                                </div>
                                <div class="col-lg-5">
                                    <span class="bold">Matthew Stevens</span>
                                    <span class="email">matthew.stevens@email.com</span>
                                    <span class="lastseen">Last seen <span class="date"> 23rd Sept 2018</span></span>
                                </div>
                                <div class="col-lg-3">
                                    <div v-on:click="toggleDropDown" class="input-bubble dropdown"> 
                                    <span> Administrator</span>
                                    <div class="hidden">
                                        <ul>
                                            <li>User</li>
                                            <li>Designer</li>
                                            <li>Developer</li>
                                        </ul>
                                    </div>                            
                                </div>
                                </div>
                                <div class="col-lg-2 status">
                                   <div class="grey-dd">
                                            <svg class="icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>setng cog</title> <path d="M98.7,38.7c-0.1-0.3-0.3-0.6-0.5-0.9c-1.8-2.3-4.6-3.6-7.5-3.5h-0.5c-1.7,0-3.2-1-4-2.5c-0.1,0-0.1,0-0.1-0.1c0,0,0,0,0,0 c-0.5-0.9-1-1.7-1.5-2.6c-0.1,0-0.1-0.1-0.1-0.1c-0.9-1.5-0.9-3.3-0.1-4.8c0.1-0.1,0.2-0.2,0.2-0.4c1.5-2.6,1.8-5.7,0.8-8.6 c-0.1-0.3-0.3-0.7-0.5-0.9c-1.7-1.6-3.5-3.1-5.4-4.5c-0.2-0.1-0.5-0.2-0.9-0.4c-2.9-0.6-6,0.2-8.2,2.2c-0.1,0-0.3,0.1-0.4,0.2 c-0.8,0.7-1.8,1-2.8,1c-0.6,0-1.2-0.1-1.8-0.4c-1-0.4-1.9-0.7-2.9-1c-1.6-0.6-2.8-2-3.1-3.6c0-0.2-0.1-0.3-0.1-0.5 c-0.4-3-2.2-5.6-4.9-7c-0.3-0.2-0.6-0.2-0.9-0.2c-2.3-0.1-4.6-0.1-6.9,0c-0.3,0-0.6,0.1-0.9,0.2c-2.7,1.5-4.5,4.1-4.9,7.1 c-0.1,0.1-0.2,0.2-0.1,0.4c-0.3,1.7-1.4,3.1-3.1,3.6c-0.9,0.2-1.9,0.6-2.9,1c-0.6,0.1-1.2,0.2-1.8,0.2c-1,0-2-0.4-2.8-1 c-0.1-0.1-0.2-0.1-0.4-0.3c-2.2-2-5.3-2.8-8.2-2.2c-0.3,0-0.7,0.1-0.9,0.4c-1.9,1.3-3.7,2.8-5.4,4.5c-0.2,0.3-0.4,0.6-0.5,0.9 c-1.1,2.8-0.8,6,0.8,8.6c0.1,0.1,0.2,0.3,0.2,0.4c0.8,1.5,0.7,3.3-0.1,4.8c-0.1,0-0.1,0-0.1,0.1c0,0,0,0,0,0c-0.5,0.8-1,1.7-1.5,2.6 c-0.1,0-0.1,0-0.1,0.1c0,0,0,0,0,0c-0.8,1.5-2.3,2.5-4,2.5H9.3c-2.9-0.1-5.7,1.2-7.5,3.5c-0.2,0.3-0.4,0.6-0.5,0.9 c-0.6,2.4-1,4.8-1.3,7.3c0,0.3,0,0.7,0.1,1c0.9,2.8,3.1,4.9,5.9,5.9c0.2,0,0.3,0.1,0.5,0.1c1.6,0.6,2.7,2,2.9,3.6v0.1 c0.1,1,0.3,2,0.5,3v0.1c0.3,1.7-0.3,3.4-1.5,4.5c-0.1,0-0.3,0.1-0.4,0.2c-2.2,1.8-3.5,4.5-3.6,7.4c0,0.3,0.1,0.7,0.2,1 c1.1,2.3,2.4,4.5,3.8,6.6C8.7,80,9,80.3,9.3,80.4c2.5,1.4,5.4,1.6,8,0.5c0.2,0,0.4,0,0.5-0.1c0.5-0.2,1-0.3,1.5-0.2 c0.6,0,1.1,0.1,1.6,0.3c0.6,0.2,1.1,0.5,1.5,0.9l2.3,2l0.1,0.1c1.3,1.1,1.9,2.7,1.7,4.4c-0.1,0.2-0.1,0.3-0.1,0.5 c-0.6,2.8,0.1,5.7,1.8,7.9c0.2,0.3,0.6,0.5,0.9,0.6c2.3,1.2,4.8,2.1,7.3,2.7c0.4,0.1,0.8,0.1,1.2,0c2.7-0.6,5.1-2.3,6.4-4.8 c0.1-0.1,0.2-0.3,0.2-0.4c0.8-1.5,2.4-2.5,4.1-2.3h3.2c1.7,0,3.3,0.8,4.1,2.3c0.1,0.1,0.2,0.3,0.2,0.4c1.3,2.5,3.6,4.2,6.4,4.8h0.5 c0.1,0,0.4,0,0.2-0.3c2.5-0.8,4.9-1.7,7.3-2.7c0.3-0.1,0.7-0.4,0.9-0.6c1.4-1.6,2.1-3.7,2.1-5.8c0-0.6-0.1-1.2-0.2-1.8 c0-0.3,0-0.5-0.1-0.8c-0.2-1.6,0.5-3.3,1.8-4.3c-0.1-0.1-0.1-0.1,0-0.2s0.1-0.1,0.2,0c0.8-0.6,1.6-1.3,2.3-2h0.1 c0.8-0.8,1.9-1.2,3.1-1.2c0.4,0,0.7,0,1.1,0.1c0.1,0,0.3,0.1,0.4,0.1c0.2,0,0.3,0.1,0.5,0.1c0.5,0.2,1.1,0.4,1.7,0.5 c0.6,0.1,1.2,0.2,1.8,0.2c1.6,0,3.2-0.4,4.6-1.2l0.8-0.8c1.5-2.1,2.8-4.3,3.8-6.6c0.2-0.3,0.2-0.7,0.2-1c-0.1-2.9-1.4-5.6-3.6-7.4 c-0.1-0.1-0.2-0.2-0.4-0.4c-1.2-1-1.8-2.5-1.5-4v-0.1c0.2-1,0.4-2,0.5-3v-0.1c0.5-3,2.7-3.7,2.9-3.7c0.2,0,0.4,0,0.6-0.2 c2.7-0.9,4.9-3.1,5.8-5.8c0.1-0.3,0.2-0.7,0.1-1C99.8,43.5,99.3,41.1,98.7,38.7z M50,71.1c-11.3,0.1-20.6-9-20.7-20.4 c-0.1-11.3,9-20.6,20.4-20.7c11.3-0.1,20.6,9,20.7,20.4c0,0,0,0.1,0,0.1c0.1,11.3-8.9,20.5-20.2,20.6C50.1,71.1,50.1,71.1,50,71.1z" /> </svg>
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
                                        </div>   
                                </div>
                            </div> <! user 
                            <div class="user row">
                                <div class="col-lg-2 status">
                                    <div class="round-wrapper Aligner">
                                        <span class="round">MS</span>
                                    </div>    
                                    <span class="indicator pending"></span>
                                </div>
                                <div class="col-lg-5">
                                    <span class="bold">Matthew Stevens</span>
                                    <span class="email">matthew.stevens@email.com</span>
                                    <span class="lastseen">Pending</span>
                                </div>
                                <div class="col-lg-3">
                                    <div class="input-bubble dropdown"> 
                                    <span> Administrator</span>
                                    <div class="hidden">
                                        <ul>
                                            <li>User</li>
                                            <li>Designer</li>
                                            <li>Developer</li>
                                        </ul>
                                    </div>                            
                                </div>
                                </div>
                                <div class="col-lg-2 status">
                                   <div class="grey-dd">
                                            <svg class="icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>setng cog</title> <path d="M98.7,38.7c-0.1-0.3-0.3-0.6-0.5-0.9c-1.8-2.3-4.6-3.6-7.5-3.5h-0.5c-1.7,0-3.2-1-4-2.5c-0.1,0-0.1,0-0.1-0.1c0,0,0,0,0,0 c-0.5-0.9-1-1.7-1.5-2.6c-0.1,0-0.1-0.1-0.1-0.1c-0.9-1.5-0.9-3.3-0.1-4.8c0.1-0.1,0.2-0.2,0.2-0.4c1.5-2.6,1.8-5.7,0.8-8.6 c-0.1-0.3-0.3-0.7-0.5-0.9c-1.7-1.6-3.5-3.1-5.4-4.5c-0.2-0.1-0.5-0.2-0.9-0.4c-2.9-0.6-6,0.2-8.2,2.2c-0.1,0-0.3,0.1-0.4,0.2 c-0.8,0.7-1.8,1-2.8,1c-0.6,0-1.2-0.1-1.8-0.4c-1-0.4-1.9-0.7-2.9-1c-1.6-0.6-2.8-2-3.1-3.6c0-0.2-0.1-0.3-0.1-0.5 c-0.4-3-2.2-5.6-4.9-7c-0.3-0.2-0.6-0.2-0.9-0.2c-2.3-0.1-4.6-0.1-6.9,0c-0.3,0-0.6,0.1-0.9,0.2c-2.7,1.5-4.5,4.1-4.9,7.1 c-0.1,0.1-0.2,0.2-0.1,0.4c-0.3,1.7-1.4,3.1-3.1,3.6c-0.9,0.2-1.9,0.6-2.9,1c-0.6,0.1-1.2,0.2-1.8,0.2c-1,0-2-0.4-2.8-1 c-0.1-0.1-0.2-0.1-0.4-0.3c-2.2-2-5.3-2.8-8.2-2.2c-0.3,0-0.7,0.1-0.9,0.4c-1.9,1.3-3.7,2.8-5.4,4.5c-0.2,0.3-0.4,0.6-0.5,0.9 c-1.1,2.8-0.8,6,0.8,8.6c0.1,0.1,0.2,0.3,0.2,0.4c0.8,1.5,0.7,3.3-0.1,4.8c-0.1,0-0.1,0-0.1,0.1c0,0,0,0,0,0c-0.5,0.8-1,1.7-1.5,2.6 c-0.1,0-0.1,0-0.1,0.1c0,0,0,0,0,0c-0.8,1.5-2.3,2.5-4,2.5H9.3c-2.9-0.1-5.7,1.2-7.5,3.5c-0.2,0.3-0.4,0.6-0.5,0.9 c-0.6,2.4-1,4.8-1.3,7.3c0,0.3,0,0.7,0.1,1c0.9,2.8,3.1,4.9,5.9,5.9c0.2,0,0.3,0.1,0.5,0.1c1.6,0.6,2.7,2,2.9,3.6v0.1 c0.1,1,0.3,2,0.5,3v0.1c0.3,1.7-0.3,3.4-1.5,4.5c-0.1,0-0.3,0.1-0.4,0.2c-2.2,1.8-3.5,4.5-3.6,7.4c0,0.3,0.1,0.7,0.2,1 c1.1,2.3,2.4,4.5,3.8,6.6C8.7,80,9,80.3,9.3,80.4c2.5,1.4,5.4,1.6,8,0.5c0.2,0,0.4,0,0.5-0.1c0.5-0.2,1-0.3,1.5-0.2 c0.6,0,1.1,0.1,1.6,0.3c0.6,0.2,1.1,0.5,1.5,0.9l2.3,2l0.1,0.1c1.3,1.1,1.9,2.7,1.7,4.4c-0.1,0.2-0.1,0.3-0.1,0.5 c-0.6,2.8,0.1,5.7,1.8,7.9c0.2,0.3,0.6,0.5,0.9,0.6c2.3,1.2,4.8,2.1,7.3,2.7c0.4,0.1,0.8,0.1,1.2,0c2.7-0.6,5.1-2.3,6.4-4.8 c0.1-0.1,0.2-0.3,0.2-0.4c0.8-1.5,2.4-2.5,4.1-2.3h3.2c1.7,0,3.3,0.8,4.1,2.3c0.1,0.1,0.2,0.3,0.2,0.4c1.3,2.5,3.6,4.2,6.4,4.8h0.5 c0.1,0,0.4,0,0.2-0.3c2.5-0.8,4.9-1.7,7.3-2.7c0.3-0.1,0.7-0.4,0.9-0.6c1.4-1.6,2.1-3.7,2.1-5.8c0-0.6-0.1-1.2-0.2-1.8 c0-0.3,0-0.5-0.1-0.8c-0.2-1.6,0.5-3.3,1.8-4.3c-0.1-0.1-0.1-0.1,0-0.2s0.1-0.1,0.2,0c0.8-0.6,1.6-1.3,2.3-2h0.1 c0.8-0.8,1.9-1.2,3.1-1.2c0.4,0,0.7,0,1.1,0.1c0.1,0,0.3,0.1,0.4,0.1c0.2,0,0.3,0.1,0.5,0.1c0.5,0.2,1.1,0.4,1.7,0.5 c0.6,0.1,1.2,0.2,1.8,0.2c1.6,0,3.2-0.4,4.6-1.2l0.8-0.8c1.5-2.1,2.8-4.3,3.8-6.6c0.2-0.3,0.2-0.7,0.2-1c-0.1-2.9-1.4-5.6-3.6-7.4 c-0.1-0.1-0.2-0.2-0.4-0.4c-1.2-1-1.8-2.5-1.5-4v-0.1c0.2-1,0.4-2,0.5-3v-0.1c0.5-3,2.7-3.7,2.9-3.7c0.2,0,0.4,0,0.6-0.2 c2.7-0.9,4.9-3.1,5.8-5.8c0.1-0.3,0.2-0.7,0.1-1C99.8,43.5,99.3,41.1,98.7,38.7z M50,71.1c-11.3,0.1-20.6-9-20.7-20.4 c-0.1-11.3,9-20.6,20.4-20.7c11.3-0.1,20.6,9,20.7,20.4c0,0,0,0.1,0,0.1c0.1,11.3-8.9,20.5-20.2,20.6C50.1,71.1,50.1,71.1,50,71.1z" /> </svg>
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
                                        </div>   
                                </div>
                            </div> <!user -->  
                        </div>
                    </div>  
                </div>
			</div>
		</div>

</template>

<script>

import Sidebar from '../sidebar/Sidebar'
import editUser from '../modals/EditUser'
import AddUser from '../modals/AddUser'
import DeleteUser from '../modals/DeleteUser'
import domfunctions from '@/mixins/domfunctions.js'
import axios from 'axios'


export default {
  name: 'EditCompany',
  components: {
        Sidebar,
        AddUser,
        editUser,
        DeleteUser,
  },
  data () {
    return {
      msg: 'Edit Company',
      name:  '',
      registrationCode:  '',
      vatNumber:  '',
      country: '',
      city:  '',
      email:  '',
      address:  '',
      users: null,
      currentUser: this.$store.getters.getUser,
      currentCompany: this.$store.getters.getCurrentCompany || null,
      currentAccessLevel: this.$store.getters.getCurrentAccessLevel || null,
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
    this.name = this.currentCompany.name
    this.email = this.currentCompany.email
    this.registrationCode = this.currentCompany.registrationCode
    this.vatNumber = this.currentCompany.vatNumber
    this.country = this.currentCompany.country
    this.city = this.currentCompany.city
    this.address = this.currentCompany.address
    this.getUsers()
    this.getAllCompanies()
    console.log(this.currentCompany)

  },
  mixins: [domfunctions],
  methods:{
        methodThatForcesUpdate(event) {
            // ...
            /* console.log(event)
            this.$forceUpdate() */
            this.setCurrentCompany(event.id)
              // Notice we have to use a $ here
            // ...
        },
        setCurrentCompany(id){
            let index = _.findIndex(this.$store.getters.getUser.companies , company => {
                return company.id == id
            });
            console.log(index)
            this.$store.commit('setCurrentCompany', this.$store.getters.getUser.companies[index])
            this.currentCompany = this.$store.getters.getUser.companies[index]
        },
        async getUsers(){
            this.loading = true
            if(typeof this.currentCompany != null){
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
                    const response = await axios.get('/companies/'+this.currentCompany.id)
                    this.users = response.data.company.users
                    console.log(this.users)
                    console.log(this.currentCompany.id)
            }  
            this.loading = false

        },
        editCompany(event){
            event.preventDefault()
                /* console.log(this.selectedCompany)
                console.log(this.body) */
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
                    axios.defaults.headers.common['Accept'] = 'application/json',
                    axios.defaults.headers.common['Content-Type'] = 'application/json',
                    axios.defaults.headers.common['Company'] = this.currentCompany.id
                    let modifiedCompany = {
                        name: this.name, 
                        registrationCode: this.registrationCode, 
                        vatNumber: this.vatNumber, 
                        country: this.country, 
                        city: this.city, 
                        address: this.address, 
                        email: this.email, 
                        //users: this.users
                    }
                    let serialized = this.serialize(modifiedCompany)
                    axios.patch('/companies/'+this.currentCompany.id, modifiedCompany)
                    .then((response) => {
                    console.log(response)
                    
                    }).catch((error) => {
                        console.log(error); 
                    })
        },
        showOverlay(){
                document.querySelector('.overlay').classList.add('open', 'animated', 'slideInRight')
                //document.querySelector('.overlay .popup').classList.add('animated', 'flipInY')
        },
        async getAllCompanies(){
            this.loading = true
            // SET HEADERS
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken,
			axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id

            const response = await axios.get('/companies')
            console.log(response.data)
        
            this.loading = false
        },
        async getCompanyById(id){
            this.loading = true
            // SET HEADERS
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken,
			axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id

            const response = await axios.get('/companies/'+id)
            console.log(response.data)
        
            this.loading = false
        },
        editUser(event){
            event.preventDefault()
            let elemt = document.querySelector('.edit-user.overlay')
            elemt.classList.add('open', 'animated', 'slideInRight')
            this.focusEveryElementOnce($('.edit-user.overlay'))
        },
        openDeleteUser(event){
            event.preventDefault()
            let elemt = document.querySelector('.delete-user.overlay')
            elemt.classList.add('open', 'animated', 'slideInRight')
             this.focusEveryElementOnce($('.delete-user.overlay'))
        }
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

