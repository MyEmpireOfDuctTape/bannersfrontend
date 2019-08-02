<template>
 <div v-bind:class="[active == true ? 'active' : '']" class="colorpickerwrapper">
   <color-picker v-if="colorPickerDisabled != true"
            :hue="color.hue"
            :saturation="color.saturation"
            :luminosity="color.luminosity"
            :alpha="color.alpha"
            :mouse-scroll="useScroll"
            :step="step"
            :variant="variant"
            :initiallyCollapsed="true"
            @input="onInput"
            @change="onChange"
            @toggle="onToggle"
            
        />
        </color-picker>
        <color-picker v-else
            :hue="color.hue"
            :saturation="color.saturation"
            :luminosity="color.luminosity"
            :alpha="color.alpha"
            :mouse-scroll="useScroll"
            :step="step"
            :variant="variant"
            :initiallyCollapsed="true"
            @click="preventOpen"
            
        />
        </color-picker>
    <!-- <pre v-html="color"></pre> -->
    <template v-if="editing">
        <h1>HSL values</h1>
        <div id="hslvalues">
            
            <input v-model="color.hue.toFixed(0)">
            <input v-model="color.saturation">
            <input v-model="color.luminosity">
            <!-- <input v-model="color.alpha"> -->
        </div>
        <div id="hexvalues">
            <h1>HEX value</h1>
            <input v-on:keyup="recalculateHex()" v-model="outputHex">
        </div>
    </template>
</div>
</template>
 
<script>
import ColorPicker from '@radial-color-picker/vue-color-picker';
var convert = require('color-convert');
 
export default {
    components: { 
        ColorPicker: ColorPicker,
        convert: convert,
    },
    props: {
        inputHex: String,
        colorPickerDisabled: Boolean,
    },
    data() {
        return {
            color: {
                hue: 50,
                saturation: 40,
                luminosity: 50,
                alpha: 1
            },
            outputHex: this.$props.inputHex || null,
            //inputHex: this.$props.inputHex || null,
            // increase scroll (and keyboard) step size
            step: 1,
            // change color with mouse scroll
            useScroll: true,
            // 'persistent' for non-collapsing picker
            variant: 'collapsible',
            // support for disabling UI interactions too!
            disabled: false,
            editing: false,
            active: false,
        }
    },
    created(){
/*         if(this.inputHex == null){
            this.inputHex = 'C87300'
        } */
        //this.outputHex = this.inputHex
        this.convertInputtoHSL(this.$props.inputHex)

    },
    methods: {
        preventOpen(event){
            event.preventDefault()
            console.log('prevent')
            return
        },
        recalculateHex(){
                console.log(this.outputHex)
                this.convertInputtoHSL(this.outputHex)
            },
         onInput(hue, saturation) {
            this.color.hue = hue;
            this.reCalculateOutput()
        },
        reCalculateOutput(){
            this.outputHex = convert.hsl.hex(this.color.hue, this.color.saturation, this.color.luminosity)
            //console.log(this.outputHex)
        },
        onChange(hue) {
            console.log('Color picker was dismissed', hue);
            this.$emit('color-selected', this.outputHex)
        },
        onToggle(input){
            this.editing = !this.editing
            this.active = !this.active
        },
        convertInputtoHSL(inputHex){
            let colorArray = convert.hex.hsl(inputHex)
            console.log(colorArray)
            this.color.hue = colorArray[0]
            this.color.saturation = colorArray[1]
            this.color.luminosity = colorArray[2]
        }
    },
};
</script>
 
<style scoped>
/* @import '../../node_modules/@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css'; */
button{
    display: none;
}
</style>
