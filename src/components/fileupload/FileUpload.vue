<template>
<div>
  <div class="input-block file-upload">
    <span class="label" v-text="label"></span>
    <span class="success" v-if="success.value == true">{{success.message}}</span>
    <!-- <file-upload :url='url' :thumb-url='thumbUrl' :headers="headers" @change="onChange($event)" @success="onSucess" @error="onError" :additional-data="additionalData"></file-upload> -->
    <p class="red"> {{error}}</p>
    <modified-file-upload :url='url' :thumb-url='thumbUrl' @change="onChange" @success="onSucess" @error="onError" :additional-data="additionalData"></modified-file-upload>
    <template v-if="selectFiles === true">  
        <div class="thumbs select">
            <template v-for="(file, key) in files">
                <div class="thumb-preview" :key="key">
                    <div class="thumb-preview-item" v-bind:class="[file == selectedFile ? 'selected' : '']" v-bind:style="{ 'background-image': 'url(' + file.publicUrl + ')' }" v-on:click="selectFile(file)"></div>
                </div>
            </template>
        </div>
    </template>
    <template v-else-if="showFiles === true">    
        <div class="thumbs">
        <template v-for="(file, key) in files">
            <div class="thumb-preview" :key="key">
                <div class="thumb-preview-item" v-bind:style="{ 'background-image': 'url(' + file.publicUrl + ')' }" v-on:mouseleave="removeDeleting()">
                <template v-if="deleting != null && deleting.id == file.id">
                    <div class="over delete-file">
                        <p>Are you sure you want to delete this file?</p>
                        <button v-on:click="deleteFile(file.id)">YES</button>
                    </div>
                </template>
                <template v-else>
                    <div class="over edit-file">
                        <svg v-on:click="setDeleting(file)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                    </div>
                </template>
            <!-- <img :src='file.publicUrl'> -->
                </div>
            </div> 
        </template>
        </div>
    </template>
  </div>
</div>
</template>

<script>
import FileUpload from 'v-file-upload'
import ModifiedFileUpload from '@/components/fileupload/ModifiedFileUpload'
import axios from 'axios'
import domfunctions from '@/mixins/domfunctions'

export default {
    name: 'MyFileUpload',
    props: {
        /* url: { type: String, required: true },
        thumbUrl: { type: String, required: true }, */
        label: { type: String, required: true },
        showFiles: { type: Boolean, required: true },
        selectFiles: { type: Boolean, required: true },
    },
    mixins: [domfunctions],
    data() {
        return {
            success: {
                value: false,
                message: null,
            },
            error: '',
            additionalData: {
                doc_id: 2
            },
            url: null,
            headers: {
                'Accept': 'application/json',
                'Authorization' : 'Bearer ' + this.$store.getters.getToken.accessToken,
                'Company' : this.$store.getters.getCurrentCompany.id
            },
            files: null,
            deleting: null,
            selectedFile: null
        }
    },
    created(){
        this.url = this.baseUrl + '/files'
        console.log(this.url)
        if(this.showFiles || this.selectFiles){
            this.getFiles()
            //this.getFileById(1)
        }
    },
    components: { 
            FileUpload: FileUpload,
            ModifiedFileUpload: ModifiedFileUpload,
        },
    methods: {
        selectFile(file){
            this.selectedFile = file
            console.log(this.selectedFile)
            this.$emit('fileselected', this.selectedFile.id)
        },
        thumbUrl(file) {
        return (file && file.id) || this.success
            ? 'http://vuejs.org/images/logo.png'
            : ''
        },
        onSucess() {
        this.error = ''
        this.success.value = true
        this.success.message = 'File uploaded successfully!'
        },
        onChange(files){
            console.log(files);
        },
        onError(e) {
        //this.error = e
        },
        setDeleting(file){
            this.deleting = file
               // console.log(this.deleting)
        },
        removeDeleting(){
            this.deleting = null
            //console.log(this.deleting)
        },
        deleteFile(id){
            console.log('attempting to delete file')
                axios.defaults.headers.common['Accept'] = 'application/json'
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken,
                axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
                let payload = {
                        confirmed: true,//this.confirmedtrue,
                        _method: 'delete'
                }
                console.log(payload)
                axios.post('/files/'+id, payload)
                .then((response) => {
                    console.log(response)
                    this.getFiles()
                    console.log(this.files)
                }).catch((error) => {
                    if(error.response != 'undefined'){
                        console.log(error.response);      
                    }
                })
        },
/*         deletingFile(key){
            this.deleting = this.files[key].id
            console.log(this.files[key].id)
            console.log(this.deleting)
            console.log(this.deleting == this.files[key].id)

        }, */
        async getFiles(){
                this.loading = true
                axios.defaults.headers.common['Accept'] = 'application/json'
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
                axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
                let params = {
                    take: 6,
                }
                let serialized = this.serialize(params)
                const response = await axios.get('/files'+serialized)
                console.log(response.data)
                this.files = response.data.files
                this.loading = false
        },
        async getFileById(id){
                this.loading = true
                axios.defaults.headers.common['Accept'] = 'application/json'
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
                axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
                const response = await axios.get('/files/'+id)
                console.log(response.data)
                this.loading = false
        }
    }
}
</script>
