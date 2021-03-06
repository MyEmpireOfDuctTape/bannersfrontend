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
        returnHumanDate(date){
            let newDate = new Date(date).toLocaleString('en-GB', { timeZone: 'UTC' })
            let res = newDate.split(',')
            return res[0]
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
            //event.preventDefault()
            console.log('hidepopup')
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
        /* sliderToggle(event){
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
        }, */
        editPopup(event){
            console.log(event.target.tagName)
            if(event.target.tagName != 'path'){
			    event.target.nextElementSibling.classList.toggle('visible');
            }
            else{
                event.target.parentNode.nextElementSibling.classList.toggle('visible');
            }
        },
        dismissPopup(event){
            $(event.target).parent().parent().slideUp()
        },
        showConfirmation(event){

            $(event.target).next().slideDown()
        },
        focusEveryElementOnce(element){
           /*  element.find('input').each(function(k,v){
                $(v).focusin()
                console.log($(v))
                
            }) */
            element.find('input').each(function(k,v){
                $(v).focus()
            })
        },
        animateCss(event, element, animationName, callback) {
            event.preventDefault()
            const node = document.querySelector(element)
            node.classList.add('animated', animationName)
            console.log(node)
            function handleAnimationEnd() {
                console.log('handleAnimationend')
                node.classList.remove('animated', animationName)
                node.removeEventListener('animationend', handleAnimationEnd)
        
                if (typeof callback === 'function') callback()
            }
            function whichAnimationEvent(){
                var t,
                    el = document.createElement("fakeelement");
              
                var animations = {
                  "animation"      : "animationend",
                  "OAnimation"     : "oAnimationEnd",
                  "MozAnimation"   : "animationend",
                  "WebkitAnimation": "webkitAnimationEnd"
                }
              
                for (t in animations){
                  if (el.style[t] !== undefined){
                    return animations[t];
                  }
                }
            }  
              let transitionEvent = whichAnimationEvent()
              console.log(transitionEvent)
                node.addEventListener(transitionEvent, handleAnimationEnd)
                node.addEventListener(transitionEvent, function(){
                console.log('animation ended')
                })
        },
        serialize(input){
            let serialized = '?'
                    _.forEach(input, (value, index) => {
                        
                        if(index == 'vat_number'){
                            serialized += index + '=testtestt&'
                        }
                        else if(index == 'email'){
                            serialized += index + '=juhan.soone@havas.ee&'
                        }
                        else if(value == null && index != 'vat_number'){
                            serialized += index + '=testtest&'
                        }
                        else{
                            serialized += index + '=' + value + '&'
                        }
                        
                    })
                    serialized = serialized.substring(0, serialized.length - 1)
                    return serialized;
        },
        returnAspectRatio(width, height, ){
            if(width == height){
            return 'squaree';
            }
            else if(width > height){
                return 'rectangle';
            }
            else{
                return 'tower';
            }
        },
        /**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
    hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
},
/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {Array}           The HSL representation
 */
rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

          

    }
}