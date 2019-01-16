<template>
<div id="add-banner-overlay" v-on:click="hidePopup" class="overlay Aligner">
    <div class="popup Aligner-item">
        <div class="popup-header">
         <h3>{{ msg }}</h3>
         </div>
        <form class="auth-form" v-on:submit="createBanner"> 
         <div class="input-block">
          <span class="fake-label">Banner name</span>
          <input v-on:focusin="highLightParent" v-on:focusout="unHighLightParent" v-model="name" type="text" name="name" placeholder="Your banner name">
        </div>
        <div class="input-block half-width select">
                <span  class="fake-label">Folder name</span>
                <span v-on:click="dropdownToggle" >Select folder</span>
            <div class="options">
                <ul>
                    <li data-folderid="1" v-on:click="folderSelected">Folder 1</li>
                    <li data-folderid="1" v-on:click="folderSelected">Folder 2</li>
                    <li data-folderid="1" v-on:click="folderSelected">Folder 3</li>
                    <li data-folderid="1" v-on:click="folderSelected">Folder 4</li>
                </ul>
            </div>
            <input type="hidden" name="folderId" v-model="folderid">
        </div>
        <div class="input-block half-width select">
            <span class="fake-label">Template name</span>
            <span v-on:click="dropdownToggle">Select template</span>
            <div class="options">
                <ul>
                    <template v-for="template in templates.templates">
                        <li :data-templateid="template.id" v-on:click="templateSelected">{{ template.name }}</li>
                    </template>    
                </ul>
            </div>
            <input type="hidden" name="templateId" v-model="templateid">
        </div>
        <div class="input-block half-width select">
            <span class="fake-label">Size</span>
            <span v-on:click="dropdownToggle">Select Size</span>
            <div class="options">
                <ul>
                    <template v-for="size in sizes.sizes">
                        <li :data-sizeid="size.id" v-on:click="sizeSelected">{{ size.width }}x{{ size.height }}</li>
                    </template>    
                </ul>
            </div>
            <input type="hidden" name="sizeId" v-model="sizeid">
        </div>
        <div class="input-block checkbox">
            <button v-on:click="checkBoxToggleStyles" class="check"></button>
            <input type="checkbox" name="manualsStylesEnabled" v-model="manualsStylesEnabled" class="">
            <span class="fake-label">Manual styles</span>
        </div>
        <div class="input-block checkbox">
            <button v-on:click="checkBoxToggleTemplate" class="check"></button>
            <input type="checkbox" name="templateOverWriteEnabled" v-model="templateOverWriteEnabled" class="">
            <span class="fake-label">Manual styles</span>
        </div>
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
import axios from 'axios'

export default {
  name: 'AddBannerModal',
  data () {
    return {
        msg: 'Create a banner',
        name: '',
        folderid: 0,
        templateid: 0,
        sizeid: 0,
        manualsStylesEnabled: 0,
        templateOverWriteEnabled: 0,
        folders: this.$store.getters.getFolders,
        templates: this.$store.getters.getTemplates,
        sizes: this.$store.getters.getSizes,

    }
  },
  computed: {
      loggedIn(){
          return this.$store.getters.loggedIn
      }
  },
  created(){
      this.getFolders()
      this.getTemplates()
      this.getSizes()
      /* console.log(this.folders)
      console.log(this.templates) */
      console.log(this.sizes)

  },
  methods : {
            getFolders(){
				this.$store.dispatch('getFolders', {
                    bearer: this.$store.getters.getToken.accessToken,
                    company: 1
				}).then(response => {
					console.log(response)
				}).catch(error => {
					console.log(error.response);
				})
            },
            getTemplates(){
				this.$store.dispatch('getTemplates', {
                    bearer: this.$store.getters.getToken.accessToken,
                    company: 1
				}).then(response => {
					console.log(response)
				}).catch(error => {
					console.log(error.response);
				})
            },
            getSizes(){
				this.$store.dispatch('getSizes', {
                    bearer: this.$store.getters.getToken.accessToken,
                    company: 1
				}).then(response => {
					console.log(response)
				}).catch(error => {
					console.log(error.response);
				})
			},
      		highLightParent(event){
				event.target.parentNode.classList.remove('input-error');
                event.target.parentNode.classList.add('highlighted');
                event.stopPropagation();
			},
			unHighLightParent(event){
				event.target.parentNode.classList.remove('highlighted');
            },
            hidePopup(event){
                if(event.target.classList.contains('overlay')){
                    document.querySelector('.overlay').classList.add('animated', 'slideOutRight')
                    setTimeout(function(){
                        document.querySelector('.overlay').classList.remove('animated', 'slideOutRight')
                        document.querySelector('.overlay').classList.remove('open')
                    }, 2000)
                }
            },
            dropdownToggle(e){
                 if(!$(e.target).next().is(':visible')){
                    $(e.target).next().slideDown();
                }
                else{
                    $(e.target).next().slideUp();
                }    

            },

            // failure, a man can dream og passing events and arguments
            dropDownElementClicked(e, type){
                // doesnt work, stupid
                console.log(e)
                console.log(type)
                $(e.target).parent().parent().prev().text($(e.target).text())
                this.type = e.target.dataset.type
                console.log(this.type)
                $(e.target).parent().parent().slideUp() 
            },
            folderSelected(e){
                $(e.target).parent().parent().prev().text($(e.target).text())
                this.folderid = Number(e.target.dataset.folderid)
                $(e.target).parent().parent().slideUp()
            },
            templateSelected(e){
                $(e.target).parent().parent().prev().text($(e.target).text())
                this.templateid = Number(e.target.dataset.templateid)
                $(e.target).parent().parent().slideUp()
            },
            sizeSelected(e){
                $(e.target).parent().parent().prev().text($(e.target).text())
                this.sizeid = Number(e.target.dataset.sizeid)
                $(e.target).parent().parent().slideUp()
            },
            checkBoxToggleStyles(event){
                event.target.parentNode.classList.toggle('selected');
                event.target.classList.toggle('selected');
                this.manualsStylesEnabled = this.manualsStylesEnabled == 0 ? 1 : 0

            },
            checkBoxToggleTemplate(event){
                event.target.parentNode.classList.toggle('selected');
                event.target.classList.toggle('selected');
                this.templateOverWriteEnabled = this.templateOverWriteEnabled == 0 ? 1 : 0
            },
            createBanner(event){
                event.preventDefault()
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken,
                axios.defaults.headers.common['Company'] = 1
                let data = {
                    name: this.name,
                    folderId: this.folderid,
                    templateId: this.templateid,
                    sizeId: this.sizeid,
                    manualsStylesEnabled: this.manualsStylesEnabled,
                    templateOverWriteEnabled: this.templateOverWriteEnabled,
                };
                console.log(data)
                axios.post('/banners', data)
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
									$('input[name="'+key+'"]').parent().addClass('input-error animated shake');
								}
							}
							setTimeout(function(){ 
								$('.input-block').removeClass('animated shake');
							}, 3000);
						}
						if(typeof error.response.data.message != 'undefined'){
										document.getElementById('error').innerHTML = error.response.data.message;
									}
                })
            }
    }
}
</script>

