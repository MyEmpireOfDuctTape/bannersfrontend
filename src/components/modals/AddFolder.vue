<template>
 <!-- <div id="add-folder-overlay" v-on:click="hidePopup" class="overlay add-folder Aligner"> -->
<div id="add-folder-overlay" v-on:click="hideSlide($event)" class="overlay add-folder Aligner">
    <div class="popup Aligner-item">
        <div class="popup-header">
         <h3>{{ msg }}</h3>
         </div>
        <form id="folderform" class="auth-form" @submit.prevent="createFolder($event)">  
         <div class="input-block">
          <span v-on:click="focusInput" data-initial="Folder name" class="fake-label">Folder name</span>
          <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="name" type="text" name="name">
        </div>
        <span id="error"></span>
        <button type="submit">Create folder</button>
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
import axios from 'axios'
import domfunctions from '@/mixins/domfunctions.js'

export default {
  name: 'AddFolderModal',
  data () {
    return {
        msg: 'Create a Folder',
        name: '',
    }
  },
  mixins: [domfunctions],
  created(){
      console.log('addfolder created')
     /*  this.getFolders()
      this.getTemplates()
      this.getSizes() */
      /* console.log(this.folders)
      console.log(this.templates) */
      //console.log(this.sizes)

  },
  methods: {
      submitClick(event){
          console.log('clicked');
          console.log(event);

      },
      hideSlide(event){
          if(event.target.classList.contains('overlay')){
                let allOverlays = document.querySelectorAll('.overlay')
                for(var overlay of allOverlays){
                    overlay.classList.add('animated', 'slideOutRight')
                }
                setTimeout(function(){
                    for(var overlay of allOverlays){
                        overlay.classList.remove('animated', 'slideOutRight')
                        overlay.classList.remove('open')
                    }
                    
                }, 2000)
            }
      },
        createFolder(event){
                console.log('attempting to create folder')
                console.log(event.target)
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken,
                axios.defaults.headers.common['Company'] = 1
                let data = {
                    name: this.name,
                };
                console.log(data)
                axios.post('/folders', data)
                .then(function (response) {
                        console.log(response)
                })
                .catch(function (error) {
                        console.log(error.response);
                        if(typeof error.response.data.errors != 'undefined'){
						let errors = error.response.data.errors;
							for (var key in errors) {
								if (errors.hasOwnProperty(key)) {
									console.log(key + " -> " + errors[key]);
									$('input[name="'+key+'"]').parent().addClass('input-error animated shake')
								}
							}
							setTimeout(function(){ 
                                $('.input-block').removeClass('input-error animated shake')
							}, 3000);
						}
						if(typeof error.response.data.message != 'undefined'){
										document.getElementById('error').innerHTML = error.response.data.message;
									}
                })
            }, 

    }
}
</script>

