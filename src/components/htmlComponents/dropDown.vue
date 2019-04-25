<template>
        <div class="input-block half-width select">
                <span v-on:click="focusInput" :data-initial="name" class="fake-label">{{name}}</span>
                <span v-if="dropdowndisabled == true">{{ defaultValue }}</span>
                <span v-else v-on:click="dropdownToggle">{{ defaultValue }}</span>
            <div class="options">
                <ul>
                    <li v-for="option in optionsArray" v-on:click="optionSelected($event, option.value)">{{ option.name }}</li>
                </ul>
            </div>
            <!-- <input type="hidden" name="folderId" v-model="folderid"> -->
        </div>
</template>

<style lang="scss" scoped>
    
</style>

<script>
import domfunctions from '@/mixins/domfunctions.js'
import $ from 'jquery'
var jQuery = require("jquery")

export default {
  name: 'Dropdown',
  props: ['name', 'defaultValue', 'optionsArray', 'dropdowndisabled'],
  mixins: [domfunctions],
  created(){
      /* console.log('dropDown created')
      console.log(this.props) */
  },
  methods : {
      optionSelected(e, value){
            this.$emit('element-selected', value)
            $(e.target).parent().parent().prev().text($(e.target).text())
            $(e.target).parent().parent().slideUp() 
      }
    }
}
</script>

