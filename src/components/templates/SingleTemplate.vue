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
                                    <span class="before">Edit Template </span>
                                <svg class="subset" version="1.1" id="Layer_1" fill="#acb2bc" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 800 800" style="enable-background:new 0 0 800 800;" xml:space="preserve"> <path id="Shape" d="M369.1,518.3L194.2,343.5c-8.5-8.5-12.8-19.7-12.8-30.9s4.3-22.4,12.8-30.9c17.1-17.1,44.8-17.1,61.8,0 L400,425.6l143.9-143.9c17.1-17.1,44.8-17.1,61.8,0c17.1,17.1,17.1,44.7,0,61.8L430.9,518.3C413.8,535.4,386.2,535.4,369.1,518.3z" /> </svg>
                                <span class="after">{{ template.name }}</span>
                                <span class="description">{{ template.description }}</span>
                                <div class="text">
                                                            <span> Times used   <span>{{ template.bannersCount}} banners</span></span>
                                                            <span> Created at   <span>{{ humanDate(template.createdAt) }}</span></span>
                                                            <span> Last modified   <span>{{ humanDate(template.updatedAt) }}</span></span>
                             </div> 
                            </div> 
                            <div class="col-lg-3 col-sm-12 right">
                                <router-link :to="{ path: '/templates/'+ template.id }">
                                            <button class="right roundedd blue duplicate">View Banners</button>
                                        </router-link>
                           
                            </div>
                        </div> 

                                            
                        <div class="recent-templates">
                                
                                <div class="row template-form">
                        <div class="col-lg-6 col-md-12 ">
                            <div class="form-wrapper">
                                <div class="input-block" v-bind:class="[template.name !== null ? 'focused' : '']"> 
                                    <span v-on:click="focusInput" class="fake-label" data-initial="Template name">Template name</span>
                                    <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="template.name" name="name" type="text">
                                </div>
                                <div class="input-block" v-bind:class="[template.description !== null ? 'focused' : '']">
                                    <span v-on:click="focusInput" class="fake-label" data-initial="Description">Description</span>
                                    <textarea v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="template.description" name="description" class="comment"></textarea>
                                </div>
                            </div>    
                        </div>
                        <div class="col-lg-6 col-md-12">
                            <div class="editor-wrapper">
                                <span class="fake-label error" data-initial=""></span>
                                <input type="hidden" name="html">
                               <!--  <pre id="editor">
&lt;!DOCTYPE html&gt;
                                </pre> -->
                                <editor id="editor" v-model="template.html" @init="editorInit" lang="html" theme="dreamweaver"></editor>
                            </div>    
                        </div>
                    </div>  
                    <button @click="saveTemplate" class="blue save roundedd">Save</button>  
                    <span id="error"></span>
                    <span id="success"></span>
                    <div class="header row">
                        <div class="col-lg-4 col-md-6">
                            <h1>Default Values Preview</h1>
                        </div>    
                         <div class="col-lg-8 col-md-6 right">
                             <div class="big-dd">
                                <template v-if="undefined !== template.sizes">
                                <span v-on:click="dropdownToggle"> {{selectedSize.width}}x{{selectedSize.height}} </span>
                                <div class="dropdown">
                                    <ul>
                                        <li v-for="(size, key) in template.sizes" v-bind:key="key" v-on:click="selectSize($event, key)">{{size.width}}x{{size.height}}</li>
                                    </ul>
                                </div> 
                                </template>
                                <template v-else>
                                    <span>This template has no sizes</span>
                                </template>
                            </div>   
                            <!-- <button class="viewwhite roundedd">View gallery</button>   -->
                        </div> 
                    </div>
                    <div class="row template-form">
                        <div class="col-lg-6 col-md-12 ">
                            <div class="form-wrapper nomarg">
                                <template v-for="(field, key) in template.fields">
                                    <template v-if="field.type == 'select'">
                                         <dropDown v-on:element-selected="setField($event, key)" v-bind:defaultValue="field.default" v-bind:name="key" v-bind:optionsArray="getFieldOptions(key)" v-bind:dropdowndisabled="true"></dropDown>
                                    </template>
                                    <template v-else-if="field.type == 'input'">
                                         <div class="input-block" v-bind:class="[field.default.length > 0 ? 'focused' : '']">
                                            <span v-on:click="focusInput" class="fake-label" :data-initial="key">{{key}}</span>
                                            <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="template.fields[key].value" type="text" disabled>
                                        </div>
                                    </template>
                                    <template v-else-if="field.type == 'file'">
                                         <div class="input-block" v-bind:class="[field.default.length > 0 ? 'focused' : '']">
                                            <span v-on:click="focusInput" class="fake-label" :data-initial="key">{{key}}</span>
                                            <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="template.fields[key].value" type="text" disabled>
                                        </div>
                                    </template>
                                    <template v-else-if="field.type == 'color'">
                                         <div class="input-block color" v-bind:class="[field.default.length > 0 ? 'focused' : '']">
                                            <span v-on:click="focusInput" class="fake-label" :data-initial="key">{{key}}</span>
                                            <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="template.fields[key].value" type="text" disabled>
                                                <color-picker v-on:color-selected="setField($event, key)" v-bind="color" v-bind:inputHex="field.value" v-bind:colorPickerDisabled="true"></color-picker>
                                         </div>
                                    </template>
                                </template>
                            </div>    
                        </div>
                        <div class="col-lg-6 col-md-12">
                            <div class="row nomarg html-preview">
                                <div id="bannerpreview" v-html="renderedHtml">
                                   <!--  <template v-html="renderedHtml"> </template> -->
                                </div>
                                <!-- <iframe class="template-preview" src="https://steven.punkdigital.ee/whiskas/et/html/"></iframe> -->
                            </div>
                        </div>
                        <!-- <div class="col-lg-6 col-md-12">
                            <div class="editor-wrapper">
                               <div class="file-upload">
                                <form class="box" method="post" action="http://localhost:8888/test/return.php" enctype="multipart/form-data">
                                    <div class="box__input">
                                        <input class="box__file" type="file" name="files[]" id="file" data-multiple-caption="{count} files selected" multiple />
                                        <label for="file"><span class="box__dragndrop"> Drop files here</span></label>
                                        <button class="box__button" type="submit">Upload</button>
                                    </div>
                                    <div class="box__uploading">Uploading&hellip;</div>
                                    <div class="box__success">Done!</div>
                                    <div class="box__error">Error! <span></span>.</div>
                                </form>
                                </div>
                            </div>
                            <div class="uploaded-files">
                                <div class="uploaded-file">
                                    <div class="row">
                                        <div class="col-3 thumb">
                                            <img src="../../assets/img/banner.jpg">
                                        </div>    
                                        <div class="col-7 info">
                                            <span class="bold big"> Filename-1 </span>
                                            <span class="bold"> PNG </span> <span class="size">32kb</span>
                                        </div> 
                                        <div class="col-2 trash right">
                                            <svg version="1.1" id="Layer_1" fill="#e0e0e0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>09</title> <path d="M22.8,28.6l0.1,45.2c0,7.2,5.8,13,13,13h28.3c7.2,0,13-5.8,13-13l0.1-45.2h7.4c1.7,0,3-1.3,3-3s-1.3-3-3-3H63.6v-2.5 c0-3.9-3.1-7-7-7H43.4c-3.9,0-7,3.1-7,7v2.5H15.3c-1.7,0-3,1.3-3,3s1.3,3,3,3H22.8z M53,69.8c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9 c0-1.7,1.3-3,3-3s3,1.3,3,3V69.8z M58,40.9c0-1.7,1.3-3,3-3s3,1.3,3,3v28.9c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9z M42.4,20.2 c0-0.6,0.4-1,1-1h13.2c0.6,0,1,0.4,1,1v2.5H42.4V20.2z M36,40.9c0-1.7,1.3-3,3-3s3,1.3,3,3v28.9c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9z" /> </svg>
                                        </div>
                                    </div>   
                                    <div class="row">
                                        <div class="col-12 thumb">
                                        <input type="text" :value="'{{ file: xyz}}'" disabled>
                                        </div>    
                                    </div> 
                                </div>   
                                <div class="uploaded-file">
                                    <div class="row">
                                        <div class="col-3 thumb">
                                            <img src="../../assets/img/banner.jpg">
                                        </div>    
                                        <div class="col-7 info">
                                            <span class="bold big"> Filename-1 </span>
                                            <span class="bold"> PNG </span> <span class="size">32kb</span>
                                        </div> 
                                        <div class="col-2 trash right">
                                            <svg version="1.1" id="Layer_1" fill="#e0e0e0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>09</title> <path d="M22.8,28.6l0.1,45.2c0,7.2,5.8,13,13,13h28.3c7.2,0,13-5.8,13-13l0.1-45.2h7.4c1.7,0,3-1.3,3-3s-1.3-3-3-3H63.6v-2.5 c0-3.9-3.1-7-7-7H43.4c-3.9,0-7,3.1-7,7v2.5H15.3c-1.7,0-3,1.3-3,3s1.3,3,3,3H22.8z M53,69.8c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9 c0-1.7,1.3-3,3-3s3,1.3,3,3V69.8z M58,40.9c0-1.7,1.3-3,3-3s3,1.3,3,3v28.9c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9z M42.4,20.2 c0-0.6,0.4-1,1-1h13.2c0.6,0,1,0.4,1,1v2.5H42.4V20.2z M36,40.9c0-1.7,1.3-3,3-3s3,1.3,3,3v28.9c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9z" /> </svg>
                                        </div>
                                    </div>  
                                    <div class="row">
                                        <div class="col-12 thumb">
                                        <input type="text" :value="'{{ file: xyz}}'" disabled>
                                        </div>    
                                    </div> 
                                </div> 
                            </div>     
                        </div>-->
                    </div>
                                </div>   
                            </div> 
                        </div>
                    </div>
          

</template>

<script>

import Sidebar from '../sidebar/Sidebar'
import Loading from '../loading/Loading'
import ColorPicker from '../color/ColorPicker';
import dropDown from '@/components/htmlComponents/dropDown'

import domfunctions from '@/mixins/domfunctions.js'
import axios from 'axios'

const Editor = require('vue2-ace-editor')
export default {
  name: 'SingleTemplate',
  components: {
      Sidebar,
      Loading,
      editor: Editor,
      ColorPicker: ColorPicker,
      dropDown
  },
  data () {
    return {
        loading: true,
        msg: 'Edit Template',
        template: null,
        banners: null,
        currentCompany: this.$store.getters.getCurrentCompany || null,
        currentAccessLevel: this.$store.getters.getCurrentAccessLevel || null,
        color: {
                hue: 50,
                saturation: 100,
                luminosity: 50,
                alpha: 1
        },
        renderedHtml: null,   
        sizes: null,
        selectedSize: null,
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
      selectSize(e, key){
            this.selectedSize = {width: this.template.sizes[key].width, height: this.template.sizes[key].height }
            jQuery(e.target).parent().parent().slideUp()
            this.getTemplatePreview(this.template.token , this.selectedSize)
      },
      async getTemplatePreview(token, sizes){
           this.loading = true
            //axios.defaults.baseURL = 'https://stage.api.banners.ee/'
            axios.defaults.headers.common['Accept'] = 'text/html'
            //axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id          
            const response = await axios({ url: '/serve/template/'+token , baseURL: 'https://stage.api.banners.ee', method: 'get', params: { width: sizes.width, height: sizes.height}})//axios.get('/serve/banner/'+this.banner.token)
            console.log(response) 
            this.renderedHtml = response.data
            //axios.defaults.baseURL = 'https://stage.api.banners.ee/v1' 
            this.loading = false
      },

      getFieldOptions(key){
          let options = this.template.fields[key].options;
          let values = []
          _.forEach(options.split('|'), value => {
              values.push({  
                'value': value,
                'name': value
              })
          })
          console.log(values)
          return values
      },
      setField(value, key){
            this.template.fields[key].value = value
            console.log(value)
            console.log(this.template.fields[key])
      },
      onInput() {
            // do something with this.color
            console.log(this.color)
        },
        editorInit() {
            require('brace/ext/language_tools') //language extension prerequsite...
            require('brace/mode/html')                
            require('brace/mode/javascript')    //language
            require('brace/mode/less')
            require('brace/theme/dreamweaver')
            require('brace/snippets/javascript') //snippet
        },
            async getTemplate(){
                this.loading = true
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
                axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
                const response = await axios.get('/templates/'+this.$route.params.id)
                this.template = response.data.template
                _.forEach(this.template.fields, field => {
                    field.value = field.default
                })
                console.log(this.template) 
                this.getBannersByTemplate(this.template.id)
                this.selectedSize = {width: this.template.sizes[0].width, height: this.template.sizes[0].height}
                this.getTemplatePreview(this.template.token, this.selectedSize)
                console.log(this.selectedSize)
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
      },
      saveTemplate(){
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
                axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
                /* let timeout
                clearTimeout(timeout) */
                let params = {
                    name: this.template.name,
                    description: this.template.description,
                    html: this.template.html,
                }
                let serialized = this.serialize(params)
                const response = axios.patch('/templates/'+this.template.id, params)
                .then(response => {
                    console.log(response.data)
					if(typeof response.data.messages != 'undefined'){
                       document.getElementById('success').innerHTML = response.data.messages[0].message  
                    }
                }).catch(error => {
                    console.log(error.response)
                    if(error.response.status == 422){
						if(typeof error.response.data.errors != 'undefined'){
                            if(typeof error.response.data.message != 'undefined'){
                                document.getElementById('error').innerHTML = error.response.data.message
                            }
							let errors = error.response.data.errors;
							for (var key in errors) {
								if (errors.hasOwnProperty(key)) {
									console.log(key + " -> " + errors[key]);
									document.querySelector('input[name="'+key+'"]').parentNode.classList.add('input-error', 'animated', 'shake' )
									document.querySelector('input[name="'+key+'"]').parentNode.children[0].innerHTML = errors[key]
								}
							}
                            setTimeout(function(){ 
								document.querySelector('.input-block').classList.remove('input-error','animated', 'shake');
                                document.querySelector('.editor-wrapper').classList.remove('input-error','animated', 'shake')
                                for (var key in errors) {
                                    if (errors.hasOwnProperty(key)) {
                                        document.querySelector('input[name="'+key+'"]').parentNode.classList.remove('input-error', 'animated', 'shake' )
                                        document.querySelector('input[name="'+key+'"]').parentNode.children[0].innerHTML = document.querySelector('input[name="'+key+'"]').parentNode.children[0].dataset.initial
                                    }
                                }
                                if(typeof error.response.data.message != 'undefined'){
								    document.getElementById('error').innerHTML = ''
						        }
							}, 10000);
						}
					}
                })
			    
        },
    },
}
</script>
