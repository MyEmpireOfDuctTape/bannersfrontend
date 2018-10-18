$(document).ready(function(){


    // fake checkboxes
    $('.checkbox-group.normal span').click(function(e){
        $(e.target).toggleClass('checked');
        var checkBoxes = $(e.target).parent().find('input[type="checkbox"]');
        checkBoxes.prop('checked', !checkBoxes.prop('checked'));
    });


    function fakefocus(event){
        console.log('fakefocus');
        let parent = $(event.target).parent();
        if(parent.hasClass('focused')){
            parent.removeClass('focused');
        }
        else{
            parent.addClass('focused');            
        }
    }
    // fake input focus
    $('.input-block input').on('focus', function(e){
        console.log($(e.target).parent());
        $(e.target).parent().addClass('focused');    
    });
    $('.input-block input').on('focusout', function(e){
        console.log($(e.target).parent());
        $(e.target).parent().removeClass('focused');    
    });


    //dropdown logic
    $('.selected').click(function(e){
        if($(this).next().is(":visible")){
            let that = $(this);
            $(this).next().slideUp('fast', function(){
                that.removeClass('open');
            });//.addClass('open-list');
        }
        else{
            $(this).addClass('open');
            $(this).next().slideDown('fast');
        }
        
    });

    $('.dropdown').click(function(e){
        $(e.target).next().toggleClass('visible');
        $(e.target).parent().toggleClass('open');
    });

    $('.grey-dd').click(function(e){
        $(e.target).next().toggleClass('visible');
        $(e.target).parent().toggleClass('open');
    });
}); // doc ready