<template>
<div class="file-upload">
<!--   <div class="thumb-preview" v-if='thumbUrl(anexo)'>
    <div class="thumb-preview-item">
      <img :src='thumbUrl(anexo)'>
    </div>
    </div> -->
  <div class="input-wrapper" :style='inputWrapperStyle'>
    <input id="file-upload-input" type='file' name='file' @change='onChangeInputFile' :accept='accept' :multiple='false' :disabled='uploading' ref='input'>
    <label class="file-upload-label" for='file-upload-input'>
      <span class="file-upload-icon" :class="{'file-upload-icon-pulse': uploading}"> &#x21EA;</span>
      <div> {{ uploading ? btnUploadingLabel : btnLabel }}</div>
    <div class="file-upload-progress" :style='progressStyle'></div>
    </label>
    </div>
    </div>

</template>

<script>
//import FileUpload from './FileUpload.js'
import axios from 'axios'

export default {
  props: {
    url: { type: String, required: true },
    thumbUrl: { type: Function, default: () => {} },
    accept: { type: String, default: '.png,.jpg' },
    headers: {
      type: Object,
      default: () => {
        return {}
      }
    },
    btnLabel: { type: String, default: 'Select a file' },
    btnUploadingLabel: { type: String, default: 'Uploading file' },
    maxSize: { type: Number, default: 15728640 }, // 15Mb
    additionalData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    requestType: { type: String, default: 'POST' }
  },
  data() {
    return {
      progress: 0,
      anexo: {}
    }
  },
  computed: {
    uploading() {
      return this.progress > 0
    },
    progressStyle() {
      return {
        width: `${this.progress}%`,
        display: this.uploading ? 'block' : 'none'
      }
    },
    inputWrapperStyle() {
      return { opacity: this.uploading ? '0.7' : '1' }
    }
  },
  methods: {
    onChangeInputFile(e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      const file = files[0]
      if (file.size > this.maxSize) {
        this.$emit('error', {
          code: 'max_size_exceded',
          message: `File max size exceded, upload a file smaller than ${this.maxSize}`
        })
        return
      }
      this.upload(file)
    },
    upload(file) {
      this.progress = 0.1
      // needs formdata object for whatever reason
      let formData = new FormData();
      formData.append("file", file);
      axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
      axios.defaults.headers.common['Accept'] = 'application/json'
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getToken.accessToken
      axios.defaults.headers.common['Company'] = this.$store.getters.getCurrentCompany.id
      console.log(axios.defaults.headers.common)
      axios.post('/files', formData)
      .then(response => {
          console.log(response);
          this.anexo = response.data.file
          this.onChangeAnexo()
          this.$emit('success', e)
          this.progress = 0
          this.cleanInput()
      })
      .catch(error => {
          console.log(error.response);
          this.$emit('error', error)
          this.progress = 0
          this.cleanInput()
      });
      /* fileUpload
        .upload(file, this.additionalData)
        .then(e => {
          this.anexo = e.target.response
          this.onChangeAnexo()
          this.$emit('success', e)
          this.progress = 0
          this.cleanInput()
        })
        .catch(e => {
          this.$emit('error', e)
          this.progress = 0
          this.cleanInput()
        }) */
    },
    cleanInput() {
      let input = this.$refs.input
      if (input) {
        input.value = ''
      }
    },
    onProgress(e) {
      this.progress = parseInt(e.loaded * 100 / e.total)
      this.$emit('progress', this.progress)
    },
    onChangeAnexo() {
      this.$emit('change', this.anexo)
    }
  }
}
</script>

<style lang="scss">
.file-upload {
  .top{
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .selected-image{
      min-height: 100px;
      background-position: center;
      background-size: cover;
      transition: 1s;
             &:hover{
            transform: scale(1.05);
            
          }
    }
    img{
      max-width: 100%;
      height: auto;
    }
  }
  .input-wrapper {
    text-align: center;
    position: relative;
    background-color: #70cef3;
    height: 80px;
    border-radius: 5px;
    &:hover {
      background-color: #54bfe8;
    }
    #file-upload-input {
      width: 0.1px;
      height: 0.1px;
      opacity: 0;
      overflow: hidden;
      position: absolute;
      z-index: -1;
    }
    .file-upload-label {
      width: 100%;
      font-size: 1.25em;
      color: white;
      display: inline-block;
      padding: 10px;
      position: absolute;
      left: 0;
      right: 0;
      z-index: 2;
      line-height: 1.4em;
      &:hover {
        cursor: pointer;
      }
      .file-upload-icon {
        display: inline-block;
        text-align: center;
        font-weight: bold;
        font-size: 40px;
        &.file-upload-icon-pulse {
          animation: fade 1.5s infinite 0.5s;
        }
      }
    }
    .file-upload-progress {
      position: absolute;
      background-color: #47B04B;
      height: 100%;
      max-width: 100%;
      z-index: 1;
      transition: width 0.6s ease;
    }
  }
  .thumbs{
    &.select{
      .thumb-preview {
        .thumb-preview-item {
          height: 100px;
          &.selected{
            border: 5px solid #70cef3;
            
          }
          &:hover{
            transform: scale(1);
            background-size: cover;
          }
        }
      }  
    }
    .thumb-preview {
    display: flex;
    flex-flow: row wrap;
    overflow: hidden;
     margin: 5px;
     border-radius: 3px;
    .thumb-preview-item {
      
     
      //background-color: #cccccc;
      height: 150px;
      width: 100%;
      padding: 0;
      position: relative;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      transition: 1s ease;
      .edit-file, .delete-file{
        display: none;
        transition: 1s ease;
      }
      &:hover{
        transform: scale(1.05);
        background-size: 150%;
        cursor: pointer;
        .edit-file{
          display: block;
          transform: none;
          position: absolute;
          background: rgba(0,0,0,0.5);
          width: 100%;
          height: 100%;
          z-index: 2;
          svg{
            fill: white;
            position: absolute;
            top: 10%;
            right: 10%;
          }
        }
        .delete-file{
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          transform: none;
          background: rgba(255,0,0,0.5);
          width: 100%;
          height: 100%;
          z-index: 3;
          p{
            max-width: 70%;
            text-align: center;
            color: white;
          }
          button{
            padding: 0.5em 1em;
          }
        }
      }
      img {
        border-radius: 5px;
        max-width: 100%;
        height: auto;
      }
    }
  }
  }
  
}
@keyframes fade {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes fade {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>