<template>
    <div class="fullpage container-fluid">
        <div class="row">

                <sidebar></sidebar>

                <div class="templates main-view container-fluid">
                    <h1>Templates</h1>
                        <div class="header row">
                            <div class="left col-lg-3 col-md-4">
                                <router-link to="/add-template"><button class="blue create roundedd">Create template</button></router-link>
                            </div>
                            <div class="right col-lg-9 col-md-8">
                                <div class="input-bubble search">
                                    <input type="text" placeholder="Search by name or description">
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
                                </div>
                                <div class="template-list">
                                    <div class="template row">
                                        <div class="left col-lg-6">
                                            <router-link to="templates/Skyscraper_Banners_Set"><span class="bold">Skyscraper_Banners_Set</span></router-link>
                                            <span class="dimension green">600x300</span>
                                            <span class="dimension green">600x300</span>
                                            <span class="dimension green">600x300</span>
                                            <span class="dimension green">600x300</span>
                                            <span class="dimension green">600x300</span>
                                            <span class="dimension green">600x300</span>
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
                                    </div>      
                                </div>   
                            </div> 
                        </div>
                    </div>
                </div>

</template>

<script>

import Sidebar from '../sidebar/Sidebar'
export default {
  name: 'Banners',
  components: {
      Sidebar
  },
  data () {
    return {
      msg: 'Dashboard yo'
    }
  }
}
</script>
