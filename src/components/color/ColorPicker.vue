<template>
<div>
   <color-picker
            :hue="color.hue"
            :saturation="color.saturation"
            :luminosity="color.luminosity"
            :alpha="color.alpha"
            :mouse-scroll="useScroll"
            :step="step"
            :variant="step"
            @input="onInput"
            @change="onChange"
        />
        </color-picker>
    <!-- <pre v-html="color"></pre> -->
    <template v-if="editing">
        <div id="hslvalues">
            <h1>HSL values</h1>
            <input v-model="color.hue">
            <input v-model="color.saturation">
            <input v-model="color.luminosity">
            <input v-model="color.alpha">
        </div>
        <div id="hexvalues">
            <h1>HEX value</h1>
            <input v-model="this.outputHex">
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
            inputHex: this.$props.inputHex || null,
            // increase scroll (and keyboard) step size
            step: 1,
            // change color with mouse scroll
            useScroll: true,
            // 'persistent' for non-collapsing picker
            variant: 'collapsible',
            // support for disabling UI interactions too!
            disabled: false,
            editing: true,
        }
    },
    created(){
        if(this.inputHex == null){
            this.inputHex = 'C87300'
        }
        this.convertInputtoHSL(this.$props.inputHex)
    },
    methods: {
         onInput(hue, saturation) {
            this.color.hue = hue;
            this.reCalculateOutput()
        },
        reCalculateOutput(){
            this.outputHex = convert.hsl.hex(this.color.hue, this.color.saturation, this.color.luminosity)
            console.log(this.outputHex)
        },
        onChange(hue) {
            console.log('Color picker was dismissed', hue);
            this.editing = !this.editing
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
