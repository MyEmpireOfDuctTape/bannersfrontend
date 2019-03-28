<template>
     <color-picker v-bind="color" @input="onInput"></color-picker>
    <h1 v-text="msg"></h1>
    <pre v-html="color"></pre>
</template>

<script>
import ColorPicker from '@radial-color-picker/vue-color-picker';

export default {
    components: { ColorPicker },
    data() {
        return {
            msg: 'Radial Color Picker - Vue',
            color: {
                hue: 50,
                saturation: 100,
                luminosity: 50,
                alpha: 1
            }
        }
    },
    created(){
        console.log('colorpicker created')
        console.log(ColorPicker)
    },
    methods: {
        onInput() {
            // do something with this.color
            console.log(this.color)
        }
    }
};
</script>

<style scoped>
/* @import '../../node_modules/@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css'; */
#test{
    color: red;
}
</style>
