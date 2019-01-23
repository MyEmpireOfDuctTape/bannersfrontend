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
            event.target.parentNode.classList.add('highlighted');
            event.stopPropagation();
		},
		unHighLightParent(event){
			event.target.parentNode.classList.remove('highlighted');
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
            $(e.target).removeClass('input-error')
            $(e.target).parent().removeClass('input-error')
            if(!$(e.target).next().is(':visible')){
               $(e.target).next().slideDown();
           }
           else{
               $(e.target).next().slideUp();
           }    

       },
    }
}