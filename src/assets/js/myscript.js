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

    $('.input-block textarea').on('focus', function(e){
        console.log($(e.target).parent());
        $(e.target).parent().addClass('focused');    
    });
    $('.input-block textarea').on('focusout', function(e){
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

    let popoverstart = '<div class="popoover">';
    let popoverclose = '<a href="#" class="close">dismiss</a>';
    let popoverend = '</div>';

    $('.popover-wrapper').hover(
        function() {
            let popoverspan = '<span>' + $( this ).attr('data-popover') + '</span>';
            $( this ).append( $( popoverstart + popoverspan + popoverend) );

          }, function() {
            $( this ).find( ".popoover" ).remove();
          }
    );

    $('.edit-overlay .check').click(function(e){
        $(e.target).toggleClass('selected');
        $(e.target).parent().toggleClass('selected');
    });

    $('.edit-overlay .edit').click(function(e){
        $(this).next().toggleClass('visible');

    });

    /* $('.popover-wrapper .close').click(function(e){
        e.preventDefault();
        //console.log($(this));
        console.log('dfsdfsd');
       // $(this).fadeOut();
    }); */
    
    /* var base_uri = 'api.banners.ee';
    var form = new FormData();
    form.append("email", "priit.kuuseorg@gmail.com");
    form.append("password", "Parool");

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://"+base_uri+ "/auth/login",
  "method": "POST",
  "headers": {
    "Accept": "application/json"
  },
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": form
}

$.ajax(settings).done(function (response) {
  console.log(response);
}); */
}); // doc ready

