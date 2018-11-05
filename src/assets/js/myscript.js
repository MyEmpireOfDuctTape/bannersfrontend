function renderEditor () {
    if($('#editor').length > 0){
        var editor = ace.edit("editor");
    /* ace.config.set('basePath', '../../node_modules/ace-builds/src/ace.js')
    ace.config.set('modePath', '../../node_modules/ace-builds/src/');
    ace.config.set('themePath', '../../node_modules/ace-builds/src/'); */
    console.log(ace.config.get('themePath'));
     editor.setTheme("ace/theme/github");
    editor./* session */getSession().setMode("ace/mode/html"); 
    }
    
  }
function renderDroppedFiles(files){
    let output = '';
    //console.log(files.name.length);
    for(let i = 0; i < files.name.length; i++){
        let name = files.name[i];
        let type = files.type[i];
        let typesplit = type.split('/');
        let typeprefix = typesplit[0];
        let typepostfix = typesplit[1];
        let tmp_name = files.tmp_name[i];
        let error = files.error[i];
        let size = files.size[i];
        let sizeinkb = (size / 1024).toFixed(2) + ' kb'; 
        let sizeinmb = (sizeinkb / 1024).toFixed(2) + ' mb';
        let filevalue = "{{ file: "+name+"}}";
        let trash = '<svg version="1.1" id="Layer_1" fill="#e0e0e0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>09</title> <path d="M22.8,28.6l0.1,45.2c0,7.2,5.8,13,13,13h28.3c7.2,0,13-5.8,13-13l0.1-45.2h7.4c1.7,0,3-1.3,3-3s-1.3-3-3-3H63.6v-2.5 c0-3.9-3.1-7-7-7H43.4c-3.9,0-7,3.1-7,7v2.5H15.3c-1.7,0-3,1.3-3,3s1.3,3,3,3H22.8z M53,69.8c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9 c0-1.7,1.3-3,3-3s3,1.3,3,3V69.8z M58,40.9c0-1.7,1.3-3,3-3s3,1.3,3,3v28.9c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9z M42.4,20.2 c0-0.6,0.4-1,1-1h13.2c0.6,0,1,0.4,1,1v2.5H42.4V20.2z M36,40.9c0-1.7,1.3-3,3-3s3,1.3,3,3v28.9c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9z" /> </svg>';

        output += '<div class="uploaded-file"><div class="row"><div class="col-3 thumb"><img src="'+tmp_name+'"></div><div class="col-7 info"><span class="bold big">'+name+'</span><span class="bold type">'+typepostfix+'</span> <span class="size">'+sizeinkb+'</span></div><div class="col-2 trash right">'+trash+'</div></div><div class="row"><div class="col-12 thumb"><input type="text" value="'+filevalue+'" disabled></div></div> </div> ';

    }
    //console.log(output);
    $('.uploaded-files').append(output);
}

function AddeventlistenertodeleteCSSrow(index){

    if(index > 1){
        let classname = '.'+index;
        let newelement = $('#cssInputs').find($('.row' + classname + ' .trash'));
        let dropdowns = $('#cssInputs').find($('.row' + classname + ' .input-block.select span'));
        let listitems = $('#cssInputs').find($('.row' + classname + ' .input-block.select .options li'));
        let inputs = $('#cssInputs').find($('.row' + classname + ' .input-block input'));
        newelement.click(function(e){
            e.preventDefault();
    /*         console.log("trash");
            console.log($(this).parent().parent()); */
            $(this).parent().parent().slideUp('slow', function(){
                $(this).remove();
                $('#cssInputs').attr('data-numberofrows', index-1);
            });
        
        });
        dropdowns.click( function(e){
            //console.log($(e.target).parent());
            if(!$(this).next().is(':visible')){
                $(this).next().slideDown();
            }
            else{
                $(this).next().slideUp();
            }   
        });

        listitems.click( function(e){
            $(this).parent().parent().prev().text($(e.target).text());
            $(this).parent().parent().slideUp();
        });
        inputs.on('focus', function(e){
            //console.log($(e.target).parent());
            $(e.target).parent().addClass('focused');    
        });
    }

    else{
        return false;
    }

}
$(document).ready(function(){


    // fake checkboxes
    $('.checkbox-group.normal span').click(function(e){
        $(e.target).toggleClass('checked');
        var checkBoxes = $(e.target).parent().find('input[type="checkbox"]');
        checkBoxes.prop('checked', !checkBoxes.prop('checked'));
    });


    function fakefocus(event){
        //console.log('fakefocus');
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
        //console.log($(e.target).parent());
        $(e.target).parent().addClass('focused');    
    });
    $('.input-block input').on('focusout', function(e){
        //console.log($(e.target).parent());
        $(e.target).parent().removeClass('focused');    
    });

    $('.input-block .comment').on('focus', function(e){
        //console.log($(e.target).parent());
        $(e.target).parent().addClass('focused');    
    });
    $('.input-block .comment').on('focusout', function(e){
        //console.log($(e.target).parent());
        $(e.target).parent().removeClass('focused');    
    });

    //input-block fake select

    $('.input-block.select span').click( function(e){
        //console.log($(e.target).parent());
        if(!$(e.target).next().is(':visible')){
            $(e.target).next().slideDown();
        }
        else{
            $(e.target).next().slideUp();
        }   
    });

    $('.input-block.select .options li').click( function(e){
        $(e.target).parent().parent().prev().text($(e.target).text());
        $(e.target).parent().parent().slideUp();
    });

    // big dropdowns
    $('.big-dd span').click( function(e){
        //console.log($(e.target).parent());
        if(!$(e.target).next().is(':visible')){
            $(e.target).next().slideDown();
        }
        else{
            $(e.target).next().slideUp();
        }   
    });

    $('.big-dd li').click( function(e){
        $(e.target).parent().parent().prev().text($(e.target).text());
        $(e.target).parent().parent().slideUp();
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

    $('button.save').click(function(e){
        let target = $(e.target);
       target.addClass('saving');
       setTimeout(function () { 
        target.removeClass('saving'); 
        target.removeClass('save'); 
        target.addClass('saved');
        target.text('Changes saved!');
        }, 3000);
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

renderEditor ();
/* console.log(ace);
console.log(acetheme); */

// dragndrop
var $form = $('.box');


$form.addClass('has-advanced-upload');

var droppedFiles = false;
  var $input    = $form.find('input[type="file"]'),
    $label    = $form.find('label'),
    showFiles = function(files) {
      $label.text(files.length > 1 ? ($input.attr('data-multiple-caption') || '').replace( '{count}', files.length ) : files[ 0 ].name);
    };
    $form.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
      })
      .on('dragover dragenter', function() {
        $form.addClass('is-dragover');
      })
      .on('dragleave dragend drop', function() {
        $form.removeClass('is-dragover');
      })
        .on('drop', function(e) {
        droppedFiles = e.originalEvent.dataTransfer.files; // the files that were dropped
        //showFiles( droppedFiles );
        $form.submit();
      });



//...

$input.on('change', function(e) {
  //showFiles(e.target.files);
});

  $form.on('submit', function(e) {
    if ($form.hasClass('is-uploading')) return false;
  
    $form.addClass('is-uploading').removeClass('is-error');

        e.preventDefault();
        var ajaxData = new FormData();//$form.get(0));
    console.log($form.get(0));
    console.log(droppedFiles);
         
        if (droppedFiles) {
          $.each( droppedFiles, function(i, file) {
            ajaxData.append( $input.attr('name'), file );
          });
        }
        for(var pair of ajaxData.entries()) {
            console.log(pair[0]+ ', '+ pair[1]); 
         }
         
         $.ajax({
            url: $form.attr('action'),
            type: $form.attr('method'),
            data: ajaxData,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            complete: function() {
              $form.removeClass('is-uploading');
            },
            success: function(data) {
                console.log(data.files.files);
                $form.removeClass('is-uploading');
                renderDroppedFiles(data.files.files)
              $form.addClass( data.success == true ? 'is-success' : 'is-error' );
              if (!data.success) $errorMsg.text(data.error);
              
            },
            error: function(err) {
                console.log(err);
              // Log the error, show an alert, whatever works for you
            }

            }); // ajax

  });  // onsubmit

  // sidebar
  $('.close-sidebar').click(function(){
    $('.sidebar').toggleClass('closed');
    $('.main-view').toggleClass('wider');
    console.log('sidebar');
});

$('.create-folder').click(function(){
    $('.overlay').addClass('open');
});

$('.overlay').click(function(){
    $(this).removeClass('open');
});

//sliders
$('.slider').click(function(){
    let slidertype = $(this).hasClass('html') ? '' : 'manual-styles';
    if($(this).val() > 50){
        $(this).val(1);
        $(this).removeClass('on');
        $('.' + slidertype).slideUp();
    }
    else{
        $(this).val(100);
        $(this).addClass('on');
        $('.' + slidertype).slideDown();
    }
});

// adding rows to css rules

$('.customcss .create').click(function(e){
    e.preventDefault();
    let amountofrows = Number($('#cssInputs').attr('data-numberofrows'));
    let newrow = '<div class="row '+(amountofrows+1)+'" style="display:none"> <div class="col-lg-4 col-md-12"> <div class="input-block select"> <span>Element</span> <div class="options"> <ul> <li>div</li> <li>span</li> <li>#element</li> <li>.class</li> </ul> </div> </div> </div> <div class="col-lg-4 col-md-12"> <div class="input-block select"> <span>Rule</span> <div class="options"> <ul> <li>top</li> <li>margin</li> <li>left</li> <li>right</li> <li>bottom</li> </ul> </div> </div> </div> <div class="col-lg-4 col-md-12"> <div class="input-block"> <input type="text" placeholder="Value"> </div> <svg class="trash" version="1.1" id="Layer_1" fill="#e0e0e0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 125;" xml:space="preserve"> <title>09</title> <path d="M22.8,28.6l0.1,45.2c0,7.2,5.8,13,13,13h28.3c7.2,0,13-5.8,13-13l0.1-45.2h7.4c1.7,0,3-1.3,3-3s-1.3-3-3-3H63.6v-2.5 c0-3.9-3.1-7-7-7H43.4c-3.9,0-7,3.1-7,7v2.5H15.3c-1.7,0-3,1.3-3,3s1.3,3,3,3H22.8z M53,69.8c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9 c0-1.7,1.3-3,3-3s3,1.3,3,3V69.8z M58,40.9c0-1.7,1.3-3,3-3s3,1.3,3,3v28.9c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9z M42.4,20.2 c0-0.6,0.4-1,1-1h13.2c0.6,0,1,0.4,1,1v2.5H42.4V20.2z M36,40.9c0-1.7,1.3-3,3-3s3,1.3,3,3v28.9c0,1.7-1.3,3-3,3s-3-1.3-3-3V40.9z" /> </svg> </div> </div>';
    $('#cssInputs').append(newrow);
    let classname = '.'+(amountofrows+1);
    let newelement = $('#cssInputs').find($('.row' + classname));
    newelement.slideDown();
    $('#cssInputs').attr('data-numberofrows', amountofrows+1);
/*     console.log($('#cssInputs').attr('data-numberofrows'));
    console.log(amountofrows); */
    AddeventlistenertodeleteCSSrow($('#cssInputs').attr('data-numberofrows'));

});

// removing only the first row

$('#cssInputs .row.1 .trash').click(function(e){
    if($('#cssInputs').attr('data-numberofrows') > 1){
        e.preventDefault();
        $(this).parent().parent().slideUp('slow', function(){
            $(this).remove();
            $('#cssInputs').attr('data-numberofrows', index-1);
        });
    }
    else{
        return false;
    }
    
});

// rezie events
$( window ).resize(function() {
   let width = $(this).width();
   if(width < 992){
        $('.sidebar').addClass('sidebar-hidden');
   }
   else{
        $('.sidebar').removeClass('sidebar-hidden');

   }
  });

//thesting

$('html').click(function(e){
    console.log(e.target);
}); 

}); // doc ready

