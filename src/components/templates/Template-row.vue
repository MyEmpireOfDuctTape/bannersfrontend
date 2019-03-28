<template>
    <div class="template row">
                                        <div class="left col-lg-6">
                                            <router-link to="templates/Skyscraper_Banners_Set"><span class="bold">{{ template.name }}</span></router-link>
                                           <template v-for="size in template.sizes">
                                            <span class="dimension green">{{ size.width }}x{{ size.height }}</span>
                                             </template>  
                                        </div>
                                        <div class="right col-lg-6">
                                            <div class="images">
                                                <div @mouseover="showTooltip" class="svg-wrapper popover-wrapper" data-popover="View Gallery of banners made with this template">  
                                                    <div v-show="active" class="popoover">
                                                        <span>View all banners made with this template</span>
                                                    </div>
                                                    <svg @mouseover="showTooltip" class="duplicate" version="1.1" id="Layer_1" fill="#e0e0e0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>All</title> <g id="Desktop"> <g id="Templates" transform="translate(-1270.000000, -689.000000)"> <g id="image-gallery-copy-2" transform="translate(1270.000000, 689.000000)"> <path id="Shape" d="M17.1,78.7V36.6h-6.5c-4.8,0-8.6,3.9-8.6,8.7v57c0,4.8,3.8,8.6,8.6,8.6h57c4.8,0,8.7-3.9,8.7-8.6V96H34.4 C24.9,96,17.1,88.2,17.1,78.7z"/> <path d="M91.4,13.1h-57c-4.8,0-8.7,3.9-8.7,8.6v57c0,4.8,3.9,8.7,8.7,8.7h57c4.8,0,8.6-3.9,8.6-8.7v-57 C100,17,96.1,13.1,91.4,13.1z M90.2,73.9c-0.5,0.9-1.4,1.4-2.4,1.4H39c-0.9,0-1.7-0.4-2.2-1.1c-0.5-0.7-0.7-1.6-0.4-2.4l7-23.1 c0.5-1.5,1.7-2.6,3.3-2.9c1.6-0.3,3.1,0.4,4.1,1.7l9.8,13.7c1.3,1.8,3.9,2.3,5.7,1l9-6.1c0.9-0.6,2.1-0.9,3.2-0.6 c1.1,0.2,2.1,0.9,2.7,1.8l9,13.8C90.6,72,90.7,73.1,90.2,73.9z"/> </g> </g> </g> </svg>              
                                                </div>    
                                            <div v-on:mouseover="showTooltip" class="svg-wrapper popover-wrapper" data-popover="Edit the banners of this template">                    
                                                    <svg  class="edit" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>60 all</title> <g> <path d="M76.6,51.8v24.8H23.4V23.4h24.8V12.7H18.1c-3,0-5.4,2.4-5.4,5.4V82c0,3,2.4,5.4,5.4,5.4H82c3,0,5.4-2.4,5.4-5.4V51.8H76.6z "/> <path d="M44,44.6l-4.2,11.1c-0.5,1.9,0.6,3.9,2.5,4.4c0.6,0.1,1.3,0.1,1.9,0L55.4,56c0.6-0.1,1.2-0.5,1.5-1l28.6-28.6 c1.4-1.4,2.3-2.9,0.8-4.2l-7.7-7.9c-1.4-1.4-3.7-1.4-5,0L45,43C44.5,43.4,44.2,44,44,44.6z"/> </g> </svg>
                                                </div>
                                            </div>
                                            <div class="text">
                                                <span> Times used   <span>{{ template.bannersCount}} banners</span></span>
                                                <span> Last used   <span>{{ humanDate(template.updatedAt) }}</span></span>
                                            </div>        
                                        </div>
                                    </div> 
</template>


<script>
import axios from 'axios'

export default {
  name: 'TemplateRow',
  data () {
    return {
        template: 'test',
    }
  },
  computed: {
      loggedIn(){
          return this.$store.getters.loggedIn
      }
  },
  methods : {
 

    }
}
</script>


