<template>
<div id="add-banner-overlay" v-on:click="hidePopup($event)" class="overlay add-banner Aligner">
    <template v-if="loading">
                <Loading></Loading>
    </template>
    <div class="popup Aligner-item">
        <div class="popup-header">
         <h3>{{ msg }}</h3>
         </div>
        <form class="auth-form" @submit.prevent="createBanner"> 
         <div class="input-block">
          <span v-on:click="focusInput" data-initial="Banner name" class="fake-label">Banner name</span>
          <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="name" type="text" name="name">
        </div>
        <div class="input-block half-width select">
                <span v-on:click="focusInput" data-initial="Folder name" class="fake-label">Folder name</span>
                <span v-on:click="dropdownToggle" >Select folder</span>
            <div class="options">
                <ul>
                    <li v-for="(folder, key) in folders" :key="key" v-on:click="dropDownElementClicked($event, 'folder', key)">{{folder.name}}</li>
                    <!-- <li data-folderid="1" v-on:click="dropDownElementClicked($event, 'folder')">Folder 2</li>
                    <li data-folderid="1" v-on:click="dropDownElementClicked($event, 'folder')">Folder 3</li>
                    <li data-folderid="1" v-on:click="dropDownElementClicked($event, 'folder')">Folder 4</li> -->
                </ul>
            </div>
            <input type="hidden" name="folderId" v-model="folderid">
        </div>
        <div class="input-block half-width select">
            <span v-on:click="focusInput" data-initial="Template name" class="fake-label">Template name</span>
            <span v-on:click="dropdownToggle">Select template</span>
            <div class="options">
                <ul>
                        <li v-for="(template, key) in templates" :key="key" :data-templateid="template.id" v-on:click="dropDownElementClicked($event, 'template', template.id)">{{ template.name }}</li>
                </ul>
            </div>
            <input type="hidden" name="templateId" v-model="templateid">
        </div>
        <div class="input-block half-width select">
            <span v-on:click="focusInput" data-initial="Size" class="fake-label">Size</span>
            <span v-on:click="dropdownToggle">Select Size</span>
            <div class="options">
                <ul>
                        <li v-for="(size, key) in sizes" :key="key" :data-sizeid="size.id" v-on:click="dropDownElementClicked($event, 'size', size.id)">{{ size.width }}x{{ size.height }}</li>
                </ul>
            </div>
            <input type="hidden" name="sizeId" v-model="sizeid">
        </div>
        <!-- <div class="input-block checkbox">
            <span class="fake-button check" v-on:click="checkBoxToggleStyles"></span>
            <input type="checkbox" name="manualStylesEnabled" v-model="manualStylesEnabled" class="">
            <span class="fake-label">Manual styles</span>
        </div>
        <div class="input-block checkbox">
            <span class="fake-button check" v-on:click="checkBoxToggleTemplate"></span>
            <input type="checkbox" name="templateOverwriteEnabled" v-model="templateOverwriteEnabled" class="">
            <span class="fake-label">Template overwrite</span>
        </div> -->
        <span id="error"></span>
        <button type="submit">Create Banner</button>
        </form>
    </div>    
    </div>    
 
</template>

<style lang="scss" scoped>
    .popup{
        background-color: white;
        z-index: 400;
        padding: 2rem;
        border-radius: 5px;
        box-shadow: 0 0 10px 0 rgba(163,231,251,0.7);
    }
    h3{
        text-align: center;
    }
    
</style>

<script>
import Loading from '../loading/Loading'

import axios from 'axios'
import domfunctions from '@/mixins/domfunctions.js'
export default {
  name: 'AddBannerModal',
  components: {
      Loading
  },
  data () {
    return {
        loading: true,
        msg: 'Create a banner',
        name: '',
        folderid: 0,
        templateid: 0,
        sizeid: 0,
        manualStylesEnabled: 0,
        templateOverwriteEnabled: 0,
        folders: null,
        templates: null,
        sizes: this.$store.getters.getSizes,
        loading: true,
        fieldValues: {
            bg:"1",
            text:"Osta kohe, võidad lohe!",
            textColor:"#C87300",
            ctaText:"Klikka siia!",
            ctaColor:"#C87300",
            ctaTextColor:"#fff",
            logo:"2",
            animation:"simple",
            animationDuration:"10"
        },
        templateFieldValues: 'test',
    }
  },
  mixins: [domfunctions],
  computed: {
      loggedIn(){
          return this.$store.getters.loggedIn
      }
  },
  mounted(){
      this.asyncgetFolders()
      this.getTemplates()
      this.getSizes()
      /* console.log(this.folders)
      console.log(this.templates) */
      //console.log(this.sizes)

  },
  methods : {
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
            // SET HEADERS
            console.log('asyncfolders start')
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken,
            axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
            let params = {
                    take: take,
                    skip: skip,
                    orderByType: orderByType,
                    orderBy: orderBy,
            };
            let serialized = this.serialize(params)
            const response = await axios.get('/folders'+serialized)
            console.log(response.data)
            this.folders = response.data.folders
            this.loading = false

                // nothing useful in here
                /* for(let key in response.data.folders){
                    if (response.data.folders.hasOwnProperty(key)) {
                        this.asyncgetFolderbyID(response.data.folders[key].id)
                    }
                } */

        },
            async getSizes(){
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
                axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
        
                //IF Logged in make Call
                if(this.isloggedIn()){
                    const response = await axios.get('/sizes')
                    console.log(response.data.sizes)
                    this.sizes = response.data.sizes
			    }
            },
            async getTemplates(){
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
                axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
        
                //IF Logged in make Call
                if(this.isloggedIn()){
                    const response = await axios.get('/templates')
                    console.log(response.data)
                    this.templates = response.data.templates
			    }
            },
            async selectTemplate(templatedId){
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
                axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
                const response = await axios.get('/templates/'+templatedId)
                console.log(response.data)
                console.log(this.templateFieldValues)

                this.templateFieldValues = response.data.template.fields
                console.log(this.templateFieldValues)

            },
            // failure, a man can dream of passing events and argument
            //update - dreams do come true - func($event, arg)
            dropDownElementClicked(e, type, value){
                let targetParameter, dataAttribute
                $(e.target).parent().parent().prev().text($(e.target).text())
                switch (type) {
                    case 'folder':
                        this.folderid = value//Number(e.target.dataset.folderid)
                        break;
                    case 'template':
                        this.selectTemplate(value)//(e.target.dataset.templateid)
                        this.templateid = value//Number(e.target.dataset.templateid)
                        break;
                    case 'size':
                        this.sizeid = value//Number(e.target.dataset.sizeid)
                        break;    
                    default:
                        this.folderid = value//Number(e.target.dataset.folderid)
                        break;
                }
                $(e.target).parent().parent().slideUp() 
            },
            checkBoxToggleStyles(event){
                event.target.parentNode.classList.toggle('selected');
                event.target.classList.toggle('selected');
                
                this.manualStylesEnabled = this.manualStylesEnabled == 0 ? 1 : 0
                console.log(this.manualStylesEnable)

            },
            checkBoxToggleTemplate(event){
                event.target.parentNode.classList.toggle('selected');
                event.target.classList.toggle('selected');
                this.templateOverwriteEnabled = this.templateOverwriteEnabled == 0 ? 1 : 0
            },
            createBanner(event){
                event.preventDefault()
                console.log(event.target)
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken,
                axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
                let data = {
                    name: this.name,
                    folderId: this.folderid,
                    templateId: this.templateid,
                    sizeId: this.sizeid,
                    manualStylesEnabled: this.manualStylesEnabled,
                    templateOverwriteEnabled: this.templateOverwriteEnabled,
                    fieldValues: this.fieldValues,
                };
                console.log(data)
                console.table(data)
                axios.post('/banners', data)
                .then(response => {
                        console.log(response)
                        if(response.status == 200){
							this.$router.push({ path: `banners/edit-banner/`+response.data.banner.id });
                        }
                })
                .catch(error => {
                        console.log(error.response);
                        if(typeof error.response.data.message != 'undefined'){
                            document.getElementById('error').innerHTML = error.response.data.message
                        }
                        if(typeof error.response.data.errors != 'undefined'){
						let errors = error.response.data.errors;
							for (var key in errors) {
								if (errors.hasOwnProperty(key)) {
									console.log(key + " -> " + errors[key]);
                                    //$('input[name="'+key+'"]').parent().addClass('input-error animated shake')
                                    document.querySelector('input[name="'+key+'"]').parentNode.classList.add('input-error', 'animated', 'shake' )
									document.querySelector('input[name="'+key+'"]').parentNode.children[0].innerHTML = errors[key]
								}
							}
							setTimeout(function(){
                                for (var key in errors) {
                                    if (errors.hasOwnProperty(key)) {
                                        console.log(document.querySelector('input[name="'+key+'"]').parentNode)
                                        document.querySelector('input[name="'+key+'"]').parentNode.classList.remove('input-error', 'animated', 'shake' )
                                        document.querySelector('input[name="'+key+'"]').parentNode.children[0].innerHTML = document.querySelector('input[name="'+key+'"]').parentNode.children[0].dataset.initial
                                    }
                                }
                                if(typeof error.response.data.message != 'undefined'){
								    document.getElementById('error').innerHTML = ''
						        }
							}, 5000);
						}
						if(typeof error.response.data.message != 'undefined'){
										document.getElementById('error').innerHTML = error.response.data.message;
									}
                })
            },
            isloggedIn(){
                return this.$store.getters.loggedIn
            }    

    }
}
</script>

