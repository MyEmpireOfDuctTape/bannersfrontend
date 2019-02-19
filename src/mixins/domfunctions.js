import $ from 'jquery'
var jQuery = require("jquery")
var _ = require('lodash')
export default {
    data(){
        return{
            baseUrl: 'https://stage.api.banners.ee/v1'
        }
    },
    methods: {
        toggleDropDown(event){
            console.log(event.target)
            switch(event.target.tagName){
                case 'DIV':
                event.target.children[1].classList.toggle('visible')
                event.target.classList.toggle('open')
                break
                case 'SPAN':
                event.target.nextElementSibling.classList.toggle('visible')
                event.target.parentNode.classList.toggle('open')
                break
                default:
                event.target.nextElementSibling.classList.toggle('visible')
                event.target.parentNode.classList.toggle('open')
            }

        },
        highLightParent(event){
			event.target.parentNode.classList.remove('input-error');
            event.target.parentNode.classList.add('highlighted', 'focused');
            event.stopPropagation();
		},
		unHighLightParent(event){
            event.target.parentNode.classList.remove('highlighted');
            //console.log(event.target.parentNode.children[1].value)
            if(event.target.parentNode.children[1].value == ''){
                event.target.parentNode.classList.remove('focused');
            }
        },
        focusInput(event){
            event.target.nextElementSibling.focus();
        },
        checkIfAutofilled(){
                let inputs = document.querySelectorAll('.input-block')//('input[type="text"], input[type="password"], input[type="email"]');
                console.log(inputs)
                for(let key = 0; key < inputs.length; key++){
                    /* console.log(inputs[key].value.length)
                    console.log(inputs[key].value) */
                    if(inputs[key].children[1].value.length > 0 ){
                        inputs[key].classList.add('focused')//children[1].focus()
                    }
                } 
        },
        humanDate(input){
            let date = new Date(input)
            return date.toDateString()
        },
        returnRole(role){
            switch(role){
                case 'admin':
                    return 'Administrator'
                    break
                default:
                    return 'unset'
                    break
            }
        },
        hidePopup(event){
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
        dropdownToggle(e){
            jQuery(e.target).parent().toggleClass('open')
            jQuery(e.target).removeClass('input-error')
            jQuery(e.target).parent().removeClass('input-error')
            if(!jQuery(e.target).next().is(':visible')){
               jQuery(e.target).next().slideDown();
           }
           else{
               jQuery(e.target).next().slideUp();
           }    

        },
        dropDownElementClicked(e){
            jQuery(e.target).parent().parent().prev().text($(e.target).text())
            jQuery(e.target).parent().parent().slideUp()
        },
       changed(){
        this.checkIfAutofilled()
        },
        sliderToggle(event){
            let slidertype = event.target.classList.contains('html') ? '' : 'manual-styles'
            if(event.target.value > 50){
                event.target.value = 1;
                event.target.classList.remove('on')
                jQuery('.' + slidertype).slideUp()
            }
            else{
                event.target.value = 100;
                event.target.classList.add('on')
                jQuery('.' + slidertype).slideDown()
            }
        },

    }
}