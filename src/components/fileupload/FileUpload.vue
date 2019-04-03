<template>
<div>
  <div class="input-block file-upload">
    <span class="label" v-text="label"></span>
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
    name: 'MyFileUpload',
    props: {
        /* url: { type: String, required: true },
        thumbUrl: { type: String, required: true }, */
        label: { type: String, required: true },
        showFiles: { type: Boolean, required: true },
    },
    mixins: [domfunctions],
    data() {
        return {
            success: false,
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
        }
    },
    created(){
        this.url = this.baseUrl + '/files'
        console.log(this.url)
        this.getFiles()
    },
    components: { 
            FileUpload: FileUpload,
            ModifiedFileUpload: ModifiedFileUpload,
        },
    methods: {
        thumbUrl(file) {
        return (file && file.id) || this.success
            ? 'http://vuejs.org/images/logo.png'
            : ''
        },
        onSucess() {
        this.error = ''
        this.success = true
        },
        onChange(files){
            console.log(files);
        },
        onError(e) {
        this.error = e
        },
        async getFiles(){
                this.loading = true
                axios.defaults.headers.common['Accept'] = 'application/json'
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
                axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
                const response = await axios.get('/files')
                console.log(response.data)
                this.loading = false
        }
    }
}
</script>
