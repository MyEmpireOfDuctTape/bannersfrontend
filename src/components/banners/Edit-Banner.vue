<template>
    <div class="fullpage container-fluid">
        <div class="row">
                <sidebar></sidebar>
                <template v-if="loading">
                    <Loading></Loading>
                </template>
                <template v-else>
		        <div class="edit-banner main-view container-fluid">
                    <div class="row">
                        <div class="col-lg-9 col-sm-12">
                            <span class="before">Edit Banner </span>
                            <svg class="subset" version="1.1" id="Layer_1" fill="#acb2bc" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 800 800" style="enable-background:new 0 0 800 800;" xml:space="preserve"> <path id="Shape" d="M369.1,518.3L194.2,343.5c-8.5-8.5-12.8-19.7-12.8-30.9s4.3-22.4,12.8-30.9c17.1-17.1,44.8-17.1,61.8,0 L400,425.6l143.9-143.9c17.1-17.1,44.8-17.1,61.8,0c17.1,17.1,17.1,44.7,0,61.8L430.9,518.3C413.8,535.4,386.2,535.4,369.1,518.3z" /> </svg>
                            <span class="after">{{ banner.name }}</span>
                        </div>
                        <div class="col-lg-3 col-sm-12 right">
                            <button class="right roundedd blue duplicate">Copy Banner</button>
                        </div>
                    </div> 
                    <div class="row contentrow">
                        <div class="col-lg-8">
                            <div class="big-dd">
                                <span v-on:click="dropdownToggle"> {{ currentTemplate.name }} </span>
                                <div class="dropdown">
                                    <ul>
                                        <li v-for="template in templates" v-bind:key="template.id" v-on:click="selectTemplate($event, template.id)">{{template.name}}</li>
                                    </ul>
                                </div>   
                            </div>    
                        </div>
                        <div class="col-lg-4">
                            <div class="big-dd">
                                <template v-if="undefined !== sizes && sizes.length > 0">
                                <span v-on:click="dropdownToggle"> {{sizes[0].width}}x{{sizes[0].height}} </span>
                                <div class="dropdown">
                                    <ul>
                                        <li v-for="(size, key) in sizes" v-bind:key="key" v-on:click="dropDownElementClicked">{{size.width}}x{{size.height}}</li>
                                    </ul>
                                </div> 
                                </template>
                                <template v-else>
                                    <span>This template has no sizes</span>
                                </template>
                                  
                            </div>    
                        </div>
                    </div>  
                    <div class="row contentrow bigger-wrapper">
                        <div class="col-12">
                        <div class="row nomarg">
                        <div class="col-lg-6 col-md-12 nopad">
                            <div class="form-wrapper">
                                <div class="input-block focused">
                                    <span v-on:click="focusInput" class="fake-label">Banner name</span>
                                    <input v-model="name" name="name" v-on:focusin="highLightParent" v-on:focusout="unHighLightParent"  v-on:change="changed" type="text">
                                </div>
                                <div class="input-block focused">
                                    <span v-on:click="focusInput" class="fake-label">Banner Description</span>
                                    <textarea v-model="description" name="description" v-on:focusin="highLightParent" v-on:focusout="unHighLightParent"  v-on:change="changed" class="comment"></textarea>
                                </div>
                            </div> 
                        </div>  
                        <div class="col-lg-6 col-md-12 nopad">
                            <div class="form-wrapper">
                                <template v-for="(field, key) in field_values">
                                    <template v-if="field.type == 'select'">
                                         <dropDown v-on:element-selected="setField($event, key)" v-bind:defaultValue="field.value" v-bind:name="key" v-bind:optionsArray="getFieldOptions(key)" ></dropDown>
                                    </template>
                                    <template v-else-if="field.type == 'input'">
                                         <div class="input-block" v-bind:class="[field.default.length > 0 ? 'focused' : '']">
                                            <span v-on:click="focusInput" class="fake-label" :data-initial="key">{{field.name}}</span>
                                            <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="field.value" type="text">
                                        </div>
                                    </template>
                                    <template v-else-if="field.type == 'file'">
                                         <!-- <file-upload v-bind:url="'testing123'" v-bind:thumbUrl="'testing123'"></file-upload> -->
                                            <file-upload :label="field.name" :showFiles="false" :selectFiles="true"></file-upload>
                                    </template>
                                    <template v-else-if="field.type == 'color'">
                                         <div class="input-block color" v-bind:class="[field.default.length > 0 ? 'focused' : '']">
                                            <span v-on:click="focusInput" class="fake-label" :data-initial="key">{{field.name}}</span>
                                            <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="field.value" type="text">
                                                <color-picker v-on:color-selected="setField($event, key)" v-bind:inputHex="field.value"></color-picker>
                                         </div>
                                    </template>
                                </template>
                                <!-- <div v-for="(field, key) in banner.fieldValues" v-bind:key="key" class="input-block focused">
                                     <span v-on:click="focusInput" class="fake-label">{{ key }}</span>
                                    <input v-model="fieldValues[key]" v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-on:change="changed" type="text">
                                </div> -->
<!--                                 <v-flex xs12 sm6 md3>
                                <v-text-field
                                    label="Outline"
                                    outline
                                ></v-text-field>
                                </v-flex>
                                <v-text-field name="test" label="value" color="teal"></v-text-field> -->
                                <!-- <div class="input-block">
                                    <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" type="text" placeholder="Button text">
                                </div> -->
                                <!-- <div class="select-row">
                                    <div class="input-block half-width select">
                                                        <span v-on:click="dropdownToggle">Button color</span>
                                                        <div class="options">
                                                            <ul>
                                                                <li v-on:click="dropDownElementClicked">red</li>
                                                                <li v-on:click="dropDownElementClicked">black</li>
                                                                <li v-on:click="dropDownElementClicked">pink</li>
                                                                <li v-on:click="dropDownElementClicked">#f1f1f1</li>
                                                            </ul>
                                                        </div>
                                    </div>
                                    <div class="input-block half-width select">
                                                        <span v-on:click="dropdownToggle">Button animation</span>
                                                        <div class="options">
                                                            <ul>
                                                                <li v-on:click="dropDownElementClicked">fadein</li>
                                                                <li v-on:click="dropDownElementClicked">bounce</li>
                                                                <li v-on:click="dropDownElementClicked">slidein</li>
                                                                <li v-on:click="dropDownElementClicked">wobble</li>
                                                            </ul>
                                                        </div>
                                    </div>
                                </div>   -->  
                            </div> 
                        </div> 
                        <div class="col-lg-6 col-md-12 nopad">
                            <div class="slider-wrapper">
                                <div class="slidecontainer">
                                    <input v-on:click="sliderToggle($event, 'styles')" v-bind:class="[customStylesVisible == true ? 'on' : '']" type="range" min="1" max="100" value="1" class="styles slider" id="myRange" draggable="false">
                                    <span>Manual styles mode</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-12 nopad">
                            <div class="slider-wrapper">
                                <div class="slidecontainer">
                                    <input v-on:click="sliderToggle($event, 'html')" v-bind:class="[templateHtmlOverwrite == true ? 'on' : '']" type="range" min="1" max="100" value="1" class="slider html" id="myRange2" draggable="false">
                                    <span>Template HTML overwrite</span>
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>
         
                    </div>  
                    <template v-if="customStylesVisible">
                    <div class="container-fluid manual-styles">
                    <div class="row">
                        <div class="col-lg-12">
                            <span class="before">Add manual styles </span>
                        </div>
                    </div> 
                    <div class="row contentrow bigger-wrapper customcss">
                        <div class="col-12">
                            <div class="row nomarg manual">
                                <div class="container-fluid" id="cssInputs" data-numberofrows="1">
                                    <div v-for="(style, key) in customStyles" class="row key">
                                        <div class="col-lg-4 col-md-12">
                                            <div class="input-block select">
                                                    <span v-on:click="focusInput" class="fake-label">{{ style.element.name }}</span>
                                                    <span>{{style.element.name}}</span>
                                                    <div class="options">
                                                        <ul>
                                                            <li v-for="value in style.element.values">{{ value }}</li>
                                                        </ul>
                                                    </div>
                                            </div>
                                        </div>  
                                        <div class="col-lg-4 col-md-12">
                                            <div class="input-block select">
                                                    <span v-on:click="focusInput" class="fake-label">{{ style.rule.name }}</span>
                                                    <span>{{style.rule.name}}</span>
                                                    <div class="options">
                                                        <ul>
                                                            <li v-for="value in style.rule.values">{{value}}</li>
                                                        </ul>
                                                    </div>
                                            </div>
                                        </div> 
                                        <div class="col-lg-4 col-md-12">
                                            <div class="input-block focused">
                                                    <span v-on:click="focusInput" class="fake-label">{{ customStyles[key].value }}</span>

                                                <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="customStyles[key].value" type="text" >
                                            </div>
                                            <svg @click="removeStyleRow(key)" class="trash" version="1.1" id="Layer_1" fill="#e0e0e0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>09</title> <path d="M22.8,28.6l0.1,45.2c0,7.2,5.8,13,13,13h28.3c7.2,0,13-5.8,13-13l0.1-45.2h7.4c1.7,0,3-1.3,3-3s-1.3-3-3-3H63.6v-2.5 c0-3.9-3.1-7-7-7H43.4c-3.9,0-7,3.1-7,7v2.5H15.3c-1.7,0-3,1.3-3,3s1.3,3,3,3H22.8z M53,69.8c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9 c0-1.7,1.3-3,3-3s3,1.3,3,3V69.8z M58,40.9c0-1.7,1.3-3,3-3s3,1.3,3,3v28.9c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9z M42.4,20.2 c0-0.6,0.4-1,1-1h13.2c0.6,0,1,0.4,1,1v2.5H42.4V20.2z M36,40.9c0-1.7,1.3-3,3-3s3,1.3,3,3v28.9c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9z" /> </svg>
                                        </div> 
                                    </div>  <!-- row end --> 
                                    </div>   <!-- container fluid cssinputs end -->  
                                <div class="col-12">
                                    <button @click="addStyleRow" class="create blue roundedd"> Add style</button>
                                </div>    
                                <!-- <div class="col-12">
                                    <div class="editor-wrapper">
                                        <editor id="editor" v-model="customhtml" @init="editorInit" lang="html" theme="dreamweaver"></editor>
                                    </div>   
                                </div>     -->
                            </div>
                        </div>

                    </div>
                    </div> 
                    </template>
                    <template v-if="templateHtmlOverwrite">
                    <div class="container-fluid manual-styles">
                    <div class="row">
                        <div class="col-lg-12">
                            <span class="before">Template HTML</span>
                        </div>
                    </div> 
                    <div class="row contentrow bigger-wrapper templatehtmloverride">
                                <div class="col-12">
                                    <div class="editor-wrapper">
                                <editor id="editor" v-model="currentTemplate.html" @init="editorInit" lang="html" theme="dreamweaver"></editor>
                            </div>
                        </div>

                    </div>
                    </div> 
                    </template>
                    <div class="row">
                        <div class="col-lg-12">
                            <span class="before">Banner preview</span>
                        </div>
                    </div> 
                    <div class="row contentrow bigger-wrapper">
                        <div class="col-12">
                            <div class="row nomarg html-preview">
                                <div id="bannerpreview" v-html="renderedHtml">
                                   <!--  <template v-html="renderedHtml"> </template> -->
                                </div>
                                <!-- <iframe class="template-preview" src="https://steven.punkdigital.ee/whiskas/et/html/"></iframe> -->
                            </div>
                        </div>
                    </div>          
                </div>
                </template>

            </div> 
		</div>

</template>

<script>

import Sidebar from '@/components/sidebar/Sidebar'
import Loading from '@/components/loading/Loading'
import axios from 'axios'
const Editor = require('vue2-ace-editor')
import domfunctions from '@/mixins/domfunctions.js'

import ColorPicker from '@/components/color/ColorPicker'
import dropDown from '@/components/htmlComponents/dropDown'
import FileUpload from '@/components/fileupload/FileUpload'
export default {
  name: 'EditBanner',
  components: {
      Sidebar,
      Loading,
      editor: Editor,
        ColorPicker: ColorPicker,
      dropDown,
      FileUpload
  },
  data () {
    return {
        loading: true,
        msg: 'Edit banner',
        templates: null,
        sizes: ['test'],
        name: null,
        description: null,
        customhtml: '<!DOCTYPE html>',
        customStyles:  // TODO  make domhandling functions for adding and deleting rows.
        [
                {
                    element: 
                        {
                            name: 'Element',
                            values: ['div', 'span', '#element', '.class']
                        },
                    rule: 
                        {
                            name: 'Rule',
                            values: ['top', 'margin', 'left', 'right']   
                        },
                    value: 'Value',
                },
        ],
        banner: {
            name: 'loading',
        },
        currentTemplate: null,
        customStylesVisible: false,
        templateHtmlOverwrite: false,
        field_values: {},
        file: null,
        renderedHtml: null,
        thumbnails: [],
    }
  },
  mixins: [domfunctions],
  created(){
        if(this.$store.getters.getCurrentCompany == null){
            this.$store.commit('setCurrentCompany', this.$store.getters.getUser.companies[0])
        }
        this.getBanner()
        this.getTemplates()
        this.getSizes()
        

  },
  mounted(){
	this.checkIfAutofilled()
  },
  methods: {   
      submitForm(event){
          console.log(event.target)
          console.log(this.file)
      },
      getFieldOptions(key){
          let options = this.currentTemplate.fields[key].options;
          let values = []
          _.forEach(options.split('|'), value => {
              values.push({  
                'value': value,
                'name': value
              })
          })
          return values
      },
      setField(value, key){
            //this.currentTemplate.fields[key] = value
            this.field_values[key].value = value
            //console.log(this.currentTemplate.fields[key])
            console.log(this.field_values[key].value )
            console.log(this.field_values[key] )
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
      async getBanner(){
                this.loading = true
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
                axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
                const response = await axios.get('/banners/'+this.$route.params.bannerid)
                console.log(response.data)   
                this.banner = response.data.banner
                this.name = response.data.banner.name
                this.description = response.data.banner.description
                this.fieldValues = response.data.banner.fieldValues
                this.currentTemplate = response.data.banner.template
                this.sizes = response.data.banner.template.sizes
                _.forEach(this.currentTemplate.fields, field => {
                    field.value = field.default
                })
                this.setFieldValues()
                this.getBannerPreview()
                this.loading = false  
      },
      getFileThumbnail(token){
               console.log(token)
      },
      setFieldValues(){
          this.field_values = this.currentTemplate.fields
                _.forEach(this.field_values, field => {
                    if(field.type == 'file'){
                        this.getFileThumbnail(field.default)
                        //console.log(field)
                    }
                    field.value = field.default
                })
                console.log(this.field_values)
      },
      async getTemplates(){
                this.loading = true
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
                axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
                const response = await axios.get('/templates')
                console.log(response.data)
                this.templates = response.data.templates
			    this.loading = false
            },
      async getSizes(){
                this.loading = true   
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
                axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
                const response = await axios.get('/sizes')
                console.log(response.data)
                this.sizes = response.data
                this.loading = false
			    
            },      
      /* dropdownToggle(e){
          console.log('click')
        //console.log($(e.target).parent());
        if(!jQuery(e.target).next().is(':visible')){
            jQuery(e.target).next().slideDown();
        }
        else{
            jQuery(e.target).next().slideUp();
        }   
      }, */
      async getBannerPreview(){
            this.loading = true
            axios.defaults.baseURL = 'https://stage.api.banners.ee/'
            axios.defaults.headers.common['Accept'] = 'text/html'
            //axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id          
            const response = await axios.get('/serve/banner/'+this.banner.token)
            console.log(response) 
            this.renderedHtml = response.data
            axios.defaults.baseURL = 'https://stage.api.banners.ee/v1' 
            this.loading = false
      },
       sliderToggle(event, target){
            if(target == 'styles'){
                this.customStylesVisible = !this.customStylesVisible
            }
            else{
                this.templateHtmlOverwrite = !this.templateHtmlOverwrite
            }
            if(event.target.value > 50){
                event.target.value = 1;
            }
            else{
                event.target.value = 100;
            }

        },

        addStyleRow(){
            let newRow = {
                    element: 
                        {
                            name: 'Element',
                            values: ['div', 'span', '#element', '.class']
                        },
                    rule: 
                        {
                            name: 'Rule',
                            values: ['top', 'margin', 'left', 'right']   
                        },
                    value: 'Value',
                };
            this.customStyles.push(newRow)
        },
        removeStyleRow(index){
            this.customStyles.splice(index,1)
        },
        selectTemplate(e, template_id){
            console.log(template_id)
            this.getTemplateById(template_id)
            jQuery(e.target).parent().parent().prev().text($(e.target).text())
            jQuery(e.target).parent().parent().slideUp()
        },
        async getTemplateById(id){
                this.sizes = []
                this.loading = true
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
                axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
                const response = await axios.get('/templates/'+id)
                console.log(response.data)
                this.currentTemplate = response.data.template
                _.forEach(this.currentTemplate.fields, field => {
                    field.value = field.default
                })
                console.log(this.currentTemplate)
                this.sizes = response.data.template.sizes
                this.loading = false
                
            },
  }
}
</script>

