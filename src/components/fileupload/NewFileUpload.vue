<template>
<div>
  <div class="input-block file-upload">
    <div class="top">
    <span class="label" v-text="label"></span>
    <span class="success" v-if="success.value == true">{{success.message}}</span>
    </div>
    <!-- <file-upload :url='url' :thumb-url='thumbUrl' :headers="headers" @change="onChange($event)" @success="onSucess" @error="onError" :additional-data="additionalData"></file-upload> -->
    <p class="red"> {{error}}</p>
    <modified-file-upload :url='url' :thumb-url='thumbUrl' @change="onChange" @success="onSucess" @error="onError" :additional-data="additionalData"></modified-file-upload>
  </div>
</div>
</template>

<script>
import FileUpload from 'v-file-upload'
import ModifiedFileUpload from '@/components/fileupload/ModifiedFileUpload'
import axios from 'axios'
import domfunctions from '@/mixins/domfunctions'

export default {
    name: 'MyNewFileUpload',
    props: {
        /* url: { type: String, required: true },
        thumbUrl: { type: String, required: true }, */
        label: { type: String, required: true },
        showFiles: { type: Boolean, required: true },
        selectFiles: { type: Boolean, required: true },
        selectedPictureurl :{ type: String, required: false },
        initialToken :{ type: String, required: false },
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
            selectedFile: null,
            selectedPictureurlData: this.selectedPictureurl,
            initialTokenData: this.initialToken
        }
    },
    created(){
        this.url = this.baseUrl + '/files'
        console.log(this.url)
        if(this.showFiles || this.selectFiles){
            this.getFiles()
            //this.getFileById(1)
        }
        console.log(this.initialTokenData)
        // -> real default value OWKCs9VkUNOSFdrXRjlw - > doesnt work
        // "uZlF2wBEf3EhIUV4tcaD" 
     //   this.getFileThumbnail(this.initialTokenData)
        this.getFileThumbnail('uZlF2wBEf3EhIUV4tcaD')
    },
    components: { 
            FileUpload: FileUpload,
            ModifiedFileUpload: ModifiedFileUpload,
        },
    methods: {
        selectFile(file){
            this.selectedFile = file
            this.getFileThumbnail(this.selectedFile.token)
            console.log(this.selectedFile)
            this.$emit('fileselected', this.selectedFile.id)
        },
        async getFileThumbnail(token){
            this.loading = true
                axios.defaults.headers.common['Accept'] = 'application/json'
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
                axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
                const response = await axios.get('/files/'+token)
                console.log(response.data)
                this.selectedPictureurlData = response.data.file.publicUrl
                this.loading = false
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
