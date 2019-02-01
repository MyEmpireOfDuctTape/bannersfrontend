<template>
  <div class="sidebar col-lg-2 sidebar-hidden closed">
      <div class="close-sidebar" v-on:click="toggleSidebar">
          <svg xmlns="http://www.w3.org/2000/svg" fill="#ededed" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 24 30" x="0px" y="0px"><path d="M17 21h-10c-2.209 0-4-1.791-4-4v-10c0-2.209 1.791-4 4-4h10c2.209 0 4 1.791 4 4v10c0 2.209-1.791 4-4 4zM19 7c0-1.105-0.895-2-2-2h-10c-1.105 0-2 0.895-2 2v10c0 1.105 0.895 2 2 2h10c1.105 0 2-0.895 2-2v-10zM14.008 8l4 4-4 4v-8zM9.992 8v8l-4-4z"/><text x="0" y="39" fill="#000000" font-size="5px" font-weight="bold" font-family="Helvetica Neue, Helvetica, Arial-Unicode, Arial, Sans-serif">Created by Travis Avery</text><text x="0" y="44" fill="#000000" font-size="5px" font-weight="bold" font-family="Helvetica Neue, Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>
      </div>    
		<div class="name-block">
            <span class="round">{{ user.firstName.substring(0,1) }}{{ user.lastName.substring(0,1) }}</span>
            <span class="name">{{ user.firstName }} {{ user.lastName }}</span>
        </div>
        <div class="fake-dropdown">
            <div class="selected" v-on:click="toggleDropdown">
                <span>{{ currentCompany.name }}</span>
            </div>   
            <div class="the-rest">
                <ul>
                    <template v-if="otherCompanies.length > 0">
                        <li v-for="company in otherCompanies" :data-id="company.id">
                            {{ company.name }}
                        </li>
                    </template>
                    <template v-else>
                        <li>
                            -
                        </li>
                    </template>
                </ul>
            </div>
        </div>
        <div class="menu-options level1">
            <div class="menu-option">
                 <router-link to="/dashboard">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve">
                    <title>All</title>
                    <path d="M34.8,0c1.7,0.6,3.4,1.3,4.9,2.2c3.3,2.2,4.7,5.5,4.7,9.3c0.1,7.2,0.1,14.3,0,21.5c0,4.7-2.1,8.3-6.4,10.3
                        c-1.6,0.7-3.4,1.1-5.2,1.1c-7.1,0.1-14.1,0.1-21.2,0c-5.9,0-10-3.3-11.4-9.1C0.2,35.1,0.1,35,0,34.8c0-8.4,0-16.7,0-25.1
                        C0.1,9.5,0.2,9.2,0.3,9c0.7-2.7,1.9-5.2,4.3-6.7C6.2,1.4,8,0.6,9.7,0H34.8z"/>
                    <path d="M0,65.1c0.7-1.8,1.5-3.5,2.4-5.1c1.8-2.8,4.9-4.4,8.2-4.3c7.6-0.1,15.2,0,22.8,0c6.1,0,11,4.9,11,11c0,0.1,0,0.2,0,0.3
                        c0,7.2,0.1,14.5,0,21.7c-0.1,6.5-4.5,11.1-10.9,11.2c-7.5,0.2-15,0.2-22.5,0c-5.6-0.1-9.4-3.4-10.8-8.8c-0.1-0.2-0.2-0.5-0.3-0.7
                        C0,82,0,73.5,0,65.1z"/>
                    <path d="M90.2,0c2,0.4,3.9,1.3,5.6,2.5c2.4,1.8,3.9,4.6,4,7.7c0.1,6.2,0.1,12.3,0.1,18.5c0,1.6,0,3.1,0,4.7c0,6.1-5,11.1-11.1,11.1
                        c-0.1,0-0.2,0-0.3,0c-7.2,0-14.3,0.1-21.5,0c-6.5-0.1-11.2-4.4-11.3-10.8c-0.2-7.6-0.2-15.1,0-22.7c0.1-5.5,3.5-9.3,8.9-10.6
                        c0.2-0.1,0.4-0.1,0.6-0.2H90.2z"/>
                    <path d="M99.9,77.8c0,4,0.1,8,0,11.9c-0.2,5.5-4.6,10-10.2,10.1c-8,0.2-16,0.2-24,0c-5.5-0.2-9.8-4.6-10-10.1c-0.2-8-0.2-16,0-24
                        c0.2-5.5,4.5-9.9,10-10.1c8-0.2,16-0.2,24.1,0c5.4,0.3,9.7,4.6,10,10C100,69.7,99.8,73.7,99.9,77.8L99.9,77.8L99.9,77.8z"/>
                    </svg>
                    <span>Dashboard</span>
                </router-link>
            </div>
            <div class="menu-option">
                  <router-link to="/banners">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve">
                    <title>Artboard 1</title>
                    <path d="M6.1,57c-0.4-0.9-0.3-1.9,0.3-2.7l9-10.8c1-1.2,2.7-1.3,3.9-0.3c0.1,0.1,0.2,0.2,0.3,0.3l9,10.8c0.9,1.1,0.7,2.6-0.3,3.5
                        c-0.4,0.4-1,0.6-1.6,0.6h-3.8c0.7,16.8,14.9,29.8,31.7,29c16.8-0.7,29.8-14.9,29-31.7c-0.7-16.8-14.9-29.8-31.7-29
                        c-9.6,0.4-18.3,5.3-23.8,13.2c-0.1,0.2-0.3,0.3-0.6,0.3c-0.2,0-0.5-0.1-0.6-0.3l-6-7.2c-0.2-0.3-0.2-0.6,0-0.9
                        c6.6-8.5,16.3-14,27-15.4v-4h-4c-2.9,0.3-5.5-1.8-5.8-4.7C37.9,4.9,40,2.3,42.9,2c0.3,0,0.7,0,1,0h18.6c2.9-0.1,5.4,2.1,5.5,5
                        s-2.1,5.4-5,5.5c-0.2,0-0.3,0-0.5,0h-4v4c7.2,0.9,14.1,3.8,19.8,8.3l4.5-4.5c2-2.1,5.3-2.3,7.5-0.3s2.3,5.3,0.3,7.5
                        c-0.1,0.1-0.2,0.2-0.3,0.3l-4.5,4.5c5.5,7.1,8.4,15.8,8.4,24.8c0.4,22.6-17.7,41.2-40.3,41.6S12.7,81,12.3,58.4h-4
                        C7.4,58.4,6.5,57.9,6.1,57z M70.4,40c-1.2-1.2-3-1.3-4.4-0.3L54.3,49c-4.5-0.6-8.7,2.5-9.3,7s2.5,8.7,7,9.3c4.5,0.6,8.7-2.5,9.3-7
                        c0.1-0.8,0.1-1.5,0-2.3l9.3-11.6C71.7,43,71.6,41.1,70.4,40L70.4,40z"/>
                    </svg>
                    <span>Banners</span>
                 </router-link>
            </div>
            <div class="menu-option">
                <router-link to="/templates">
                    <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch -->
                    <title>noun_1394884_cc</title>
                    <desc>Created with Sketch.</desc>
                    <defs></defs>
                    <g id="Symbols" stroke="none" stroke-width="1" fill-rule="evenodd">
                        <g id="Sidebar" transform="translate(-40.000000, -371.000000)" >
                            <g id="noun_1394884_cc" transform="translate(40.000000, 371.000000)">
                                <g id="Group">
                                    <g id="Shape">
                                        <path d="M6.05000906,13 L3,13 L3,17 C3,17.5522847 3.44771525,18 4,18 L16,18 C16.5522847,18 17,17.5522847 17,17 L17,13 L13.9499909,13 C13.7183558,14.1411202 12.709479,15 11.5,15 L8.5,15 C7.29052104,15 6.28164422,14.1411202 6.05000906,13 Z M13.9499909,11 L17,11 C17.5522847,11 18,10.5522847 18,10 L18,7 C18,6.44771525 17.5522847,6 17,6 L3,6 C2.44771525,6 2,6.44771525 2,7 L2,10 C2,10.5522847 2.44771525,11 3,11 L6.05000906,11 C6.28164422,9.8588798 7.29052104,9 8.5,9 L11.5,9 C12.709479,9 13.7183558,9.8588798 13.9499909,11 Z M5,4 L5,3 C5,1.34314575 6.34314575,0 8,0 L12,0 C13.6568542,0 15,1.34314575 15,3 L15,4 L17,4 C18.6568542,4 20,5.34314575 20,7 L20,10 C20,10.8884998 19.6137494,11.686786 19,12.2361065 L19,17 C19,18.6568542 17.6568542,20 16,20 L4,20 C2.34314575,20 1,18.6568542 1,17 L1,12.2361065 C0.38625064,11.686786 0,10.8884998 0,10 L0,7 C0,5.34314575 1.34314575,4 3,4 L5,4 Z M13,4 L13,3 C13,2.44771525 12.5522847,2 12,2 L8,2 C7.44771525,2 7,2.44771525 7,3 L7,4 L13,4 Z M8.5,11 C8.2238576,11 8,11.2238576 8,11.5 L8,12.5 C8,12.7761424 8.2238576,13 8.5,13 L11.5,13 C11.7761424,13 12,12.7761424 12,12.5 L12,11.5 C12,11.2238576 11.7761424,11 11.5,11 L8.5,11 Z"></path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                    </svg>
                    <span>Templates</span>
                </router-link>
            </div>
        </div>    
        <hr>
        <div class="menu-options level2">
            <div class="menu-option">
               <router-link to="/edit-company">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 52 65" style="enable-background:new 0 0 52 65;" xml:space="preserve">
                    <g>
                        <path d="M26.2,13.4c3.1,0,5.5-3.5,5.5-6.5c0-3-2.5-5.5-5.5-5.5s-5.5,2.5-5.5,5.5C20.7,9.9,23.1,13.4,26.2,13.4z"/>
                        <path d="M51,49.4c-0.1-4.2-2.5-7.9-6-9.7c-1.3,1.6-3.2,2.7-5.3,2.7c-1.2,0-2.4-0.4-3.5-1.1c-0.6-0.4-1.2-1-1.8-1.6
                            c-3.5,1.9-6,5.6-6,9.9c0,0.5,0.5,1,1,1H50c0,0,0,0,0,0c0.5,0,1-0.5,1-1C51,49.5,51,49.5,51,49.4z"/>
                        <path d="M37.3,39.6c0.8,0.5,1.6,0.8,2.4,0.8c3.1,0,5.5-3.5,5.5-6.5c0-3-2.5-5.5-5.5-5.5c-3,0-5.5,2.5-5.5,5.5c0,0.4,0,0.7,0.1,1.1
                            C32,33.8,29.5,33.2,27,33v-9.4h9.5c0,0,0,0,0,0c0.6,0,1-0.5,1-1c0-0.1,0-0.2,0-0.2c-0.1-4.2-2.5-7.9-6-9.7
                            c-1.3,1.6-3.2,2.7-5.3,2.7c-2.1,0-4-1.1-5.3-2.7c-3.5,1.9-6,5.6-6,9.9c0,0.5,0.4,1,1,1H25V33c-2.5,0.1-5,0.8-7.3,1.9
                            c0.1-0.4,0.1-0.7,0.1-1.1c0-3-2.5-5.5-5.5-5.5c-3,0-5.5,2.5-5.5,5.5c0,3,2.4,6.5,5.5,6.5c0.8,0,1.6-0.3,2.4-0.7
                            c0.5-0.3,1.1-0.8,1.5-1.3c5.7-4.4,14-4.4,19.7,0C36.3,38.8,36.8,39.2,37.3,39.6z"/>
                        <path d="M17.6,39.7c-0.5,0.6-1.2,1.2-1.8,1.6c-1.1,0.7-2.3,1-3.5,1c-2.1,0-4-1.1-5.3-2.7c-3.5,1.9-6,5.6-6,9.9c0,0.5,0.5,1,1,1
                            h20.5c0,0,0,0,0,0c0.5,0,1-0.5,1-1c0-0.1,0-0.1,0-0.2C23.5,45.2,21.1,41.5,17.6,39.7z"/>
                    </g>
                    </svg>
                    <span>Edit Company</span>
               </router-link>
            </div>
            <div class="menu-option">
                <router-link to="/my-account">
                    <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch -->
                    <title>Shape</title>
                    <desc>Created with Sketch.</desc>
                    <defs></defs>
                    <g id="Symbols" stroke="none" stroke-width="1"  fill-rule="evenodd">
                        <g id="Sidebar" transform="translate(-40.000000, -572.000000)" >
                            <g id="noun_account_1337577" transform="translate(40.000000, 572.000000)">
                                <path d="M14.2285714,9.52285714 C15.1428571,8.51 15.7142857,7.18285714 15.7142857,5.71428571 C15.7142857,2.56285714 13.1514286,0 10,0 C6.84857143,0 4.28571429,2.56285714 4.28571429,5.71428571 C4.28571429,7.18285714 4.85714286,8.51 5.77142857,9.52285714 C2.36714286,11.12 0,14.57 0,18.5714286 L0,20 L20,20 L20,18.5714286 C20,14.57 17.6328571,11.12 14.2285714,9.52285714 Z M7.14285714,5.71428571 C7.14285714,4.13857143 8.42428571,2.85714286 10,2.85714286 C11.5757143,2.85714286 12.8571429,4.13857143 12.8571429,5.71428571 C12.8571429,7.29 11.5757143,8.57142857 10,8.57142857 C8.42428571,8.57142857 7.14285714,7.29 7.14285714,5.71428571 Z M3.00142857,17.1428571 C3.66428571,13.8871429 6.55142857,11.4285714 10,11.4285714 C13.4485714,11.4285714 16.3357143,13.8871429 16.9985714,17.1428571 L3.00142857,17.1428571 Z" id="Shape"></path>
                            </g>
                        </g>
                    </g>
                </svg>
                    <span>My account</span>
                 </router-link>
            </div>
            <div v-if="loggedIn" class="menu-option">
                 <router-link to="/logout">
                   <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 512 640" x="0px" y="0px"><title>l3</title><path d="M153.51,424.21c-13.29-.74-26.66-0.27-40-0.34-17-.08-25.88-9-25.88-26.11q0-142,0-284.09c0-16.74,8.88-25.72,25.61-25.84,12.8-.09,25.61.3,38.4-0.16A43.67,43.67,0,0,0,194,43.16c-0.32-23.59-19.37-42.56-43.47-43-14.4-.24-28.8-0.28-43.2,0C57.08,1.37,13.7,36.81,2.66,85.57c-1,4.47-1.78,9-2.66,13.5V412.61c0.38,1.72.89,3.41,1.13,5.15,6.69,48.12,47.18,88.2,95.55,92.9,19,1.85,38.37,1.47,57.52.75,15.75-.59,27.33-9.55,34.76-23.22C203.91,460.68,184.72,425.95,153.51,424.21Z"/><path d="M363.14,96.62c-8.18-8.18-18.29-12.09-29.8-12.26a44.31,44.31,0,0,0-41,26.53,43.15,43.15,0,0,0,9.08,47.82c18.42,18.78,37,37.54,55.54,56.23,1.29,1.3,2.47,3.06,4.44,5.06h-9.57c-59,0-118.07-.24-177.1-0.11-29.39.06-50,25.71-43.51,53.82,4.56,19.73,22.8,33.47,44.33,33.49,59.57,0,119.13-.2,178.7-0.2h6.13a20.56,20.56,0,0,0,1.53,2.43c-1.7,1-3.71,1.69-5,3-17.67,17.53-35.41,35-52.79,52.84-17,17.38-16.84,44.16-.2,61,17.21,17.42,44.38,18.28,61.83,1Q433,360.69,499.58,293.43a42.47,42.47,0,0,0-.12-60.14Q431.55,164.71,363.14,96.62Z"/><text x="0" y="527" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by i cons</text><text x="0" y="532" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>
                    <span>Log out</span>
                 </router-link>
            </div>
        </div>    
  </div> 
</template>

<script>
export default {
  name: 'Sidebar',
  data () {
    return {
      msg: 'Sidebar',
      currentCompany: this.$store.getters.getCurrentCompany || null,
      otherCompanies: this.$store.getters.getUser.companies ? this.$store.getters.getUser.companies.filter(company => company.id != this.$store.getters.getCurrentCompany.id) : null,
      user: this.$store.getters.getUser || null,
    }
  },
  computed: {
      loggedIn(){
          return this.$store.getters.loggedIn
      }
  },
  created(){
      console.log(this.currentCompany)
      console.log(this.otherCompanies)
      console.log(this.user)
      if(this.currentCompany == null){
            console.log('currentcompany is null')
            this.$store.commit('setCurrentCompany', this.$store.getters.getUser.companies[0])
            this.currentCompany = this.$store.getters.getCurrentCompany
            this.otherCompanies = this.$store.getters.getUser.companies.filter(company => company.id != this.currentCompany.id)
            this.user = this.$store.getters.getUser
            console.log(this.currentCompany)
            console.log(this.otherCompanies)
            console.log(this.user)
      }
      
  },
  methods : {
      toggleSidebar: function(e){
            document.querySelector('.sidebar').classList.toggle('closed');
            document.querySelector('.main-view').classList.toggle('wider');
      },
      toggleDropdown: function(e){
            document.querySelector('.selected').classList.toggle('open');
            document.querySelector('.selected').nextElementSibling.classList.toggle('open-list')
            /* setTimeout(function(){ 
                document.querySelector('.selected').nextElementSibling.classList.remove('animated', 'fadeInUp')
			}, 3000); */
      },
      selectCompany(){

      }
    }
}
</script>

