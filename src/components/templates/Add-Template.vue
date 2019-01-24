<template>
    <div class="fullpage container-fluid">
        <div class="row">
                <sidebar></sidebar>
		        <div class="add-template main-view container-fluid">
                    <div class="header">
                                <h1>Add template</h1>
                    </div>
                    <div class="row template-form">
                        <div class="col-lg-6 col-md-12 ">
                            <div class="form-wrapper">
                                <div class="input-block">
                                    <span class="fake-label" data-initial="Template name">Template name</span>
                                    <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="name" name="name" type="text" placeholder="Skyscraper tempate">
                                </div>
                                <div class="input-block">
                                    <span class="fake-label" data-initial="Description">Description</span>
                                    <textarea v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="description" name="description" class="comment"></textarea>
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
                                <editor id="editor" v-model="html" @init="editorInit" lang="html" theme="dreamweaver"></editor>
                            </div>    
                        </div>
                    </div>  
                    <button @click="createTemplate" class="blue save roundedd">Save</button>  
                    <span id="error"></span>
                    <span id="success"></span>
                    <div class="header row">
                        <div class="col-lg-4 col-md-6">
                            <h1>Form Preview</h1>
                        </div>    
                         <div class="col-lg-8 col-md-6 right">
                            <button class="viewwhite roundedd">View gallery</button>  
                        </div> 
                    </div>
                    <div class="row template-form">
                        <div class="col-lg-6 col-md-12 ">
                            <div class="form-wrapper">
                                <div class="input-block">
                                    <input type="text" placeholder="Background image">
                                </div>
                                <div class="input-block">
                                    <input type="text" placeholder="Button text">
                                </div>
                                <div class="input-block select">
                                    <span>Button colour</span>
                                    <div class="options">
                                        <ul>
                                            <li>Color 1</li>
                                            <li>Color 2</li>
                                            <li>Color 3</li>
                                            <li>Color 4</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="input-block select">
                                    <span>Button animation</span>
                                    <div class="options">
                                        <ul>
                                            <li>Animation 1</li>
                                            <li>Animation 2</li>
                                            <li>Animation 3</li>
                                            <li>Animation 4</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>    
                        </div>
                        <div class="col-lg-6 col-md-12">
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
                                <!-- <div class="uploaded-file">
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
                                </div>  -->  
                            </div>     
                        </div>
                    </div>
                    <div class="header">
                                <h1>Banner Preview</h1>   
                    </div>
                    <div class="html-preview">
                        <iframe class="template-preview" src="https://steven.punkdigital.ee/whiskas/et/html/"></iframe>
                    </div>    
                </div>
			</div>
		</div>


</template>

<script>

import Sidebar from '../sidebar/Sidebar'
import axios from 'axios'
const Editor = require('vue2-ace-editor')

export default {
  name: 'AddTemplate',
  components: {
      Sidebar,
      editor: Editor,
  },
  data () {
    return {
      msg: 'AddTemplate',
      name: '',
      description: '',
      html: '<!DOCTYPE html>',
    }
  },
  created(){
      if(this.$store.getters.getCurrentCompany == null){
        this.$store.commit('setCurrentCompany', this.$store.getters.getUser.companies[0].id)
      }
  },
  methods:{
        highLightParent(event){
			event.target.parentNode.classList.remove('input-error');
            event.target.parentNode.classList.add('highlighted');
            event.stopPropagation();
		},
		unHighLightParent(event){
			event.target.parentNode.classList.remove('highlighted');
        },
        /* renderEditor(){
            var editor = ace.edit("editor")
            console.log(ace.config.get('themePath'))
            console.log(ace.config)
            console.log(editor)
            editor.setTheme("ace/theme/github")
            editor./* session getSession().setMode("ace/mode/html")
        }, */
         editorInit() {
            require('brace/ext/language_tools') //language extension prerequsite...
            require('brace/mode/html')                
            require('brace/mode/javascript')    //language
            require('brace/mode/less')
            require('brace/theme/dreamweaver')
            require('brace/snippets/javascript') //snippet
        },
       createTemplate(){
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
                axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
                /* let timeout
                clearTimeout(timeout) */
                const response = axios.post('/templates', {
                    name: this.name,
                    description: this.description,
                    html: this.html,
                }).then(response => {
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

