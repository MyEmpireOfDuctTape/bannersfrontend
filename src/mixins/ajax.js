//var request = require("request");
import request from 'request'
import axios from 'axios'

export const ajaxCall = {
    data(){
        return{
            baseUrl: 'https://stage.api.banners.ee/v1'
        }
    },
    methods: {
        makeAjaxCall(ajaxEndpoint, ajaxData, httpMethod = 'POST', dataType = 'json') {
            console.log('baseurl = ' + this.baseUrl + ajaxEndpoint);
            for (var pair of ajaxData.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            } 
            let returns = false;


            $.ajax({
                /* url: this.baseUrl + ajaxEndpoint,
                data: ajaxData,
                type: httpMethod,
                dataType: dataType,
                cache: false,
                 contentType: false,
                processData: false,   */
                async: true,
                crossDomain: true,
                dataType: dataType,
                url: this.baseUrl + ajaxEndpoint,
                method: httpMethod,
                processData: false,
                contentType: false,
                mimeType: "multipart/form-data",
                headers: {
                    "Accept": "application/json",
                },
                data: ajaxData,
                success: function (result) {
                    returns = result;
                }/* ,
                error: function(error) {
                    //console.log(error);
                    ajaxResponse.push(error);
                    ajaxStatus = false;

                },
                fail: function(fail){
                    //console.log(fail);
                    ajaxResponse.push(fail);
                    ajaxStatus = false;

                },
                done: function(done) {
                    //console.log(done);
                    ajaxResponse.push(done);
                    ajaxStatus = true;

                } */
              });
              
              return returns;
        },
        axiosRequest(){
            axios.post('https://stage.api.banners.ee/v1/auth/login', {
                email: 'priit.kuuseorg@gmail.com',
                password: 'Parool'
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        },
        axiosPost(endpoint, data){
            axios.post(this.baseUrl + endpoint, data)
              .then(function (response) {
                console.log(response);
                return response;
              })
              .catch(function (error) {
                console.log(error.response);
                return error;
              });

        },
        animate(animationName, callback){
            $.fn.extend({
                animateCss: function(animationName, callback) {
                  var animationEnd = (function(el) {
                    var animations = {
                      animation: 'animationend',
                      OAnimation: 'oAnimationEnd',
                      MozAnimation: 'mozAnimationEnd',
                      WebkitAnimation: 'webkitAnimationEnd',
                    };
              
                    for (var t in animations) {
                      if (el.style[t] !== undefined) {
                        return animations[t];
                      }
                    }
                  })(document.createElement('div'));
              
                  this.addClass('animated ' + animationName).one(animationEnd, function() {
                    $(this).removeClass('animated ' + animationName);
              
                    if (typeof callback === 'function') callback();
                  });
              
                  return this;
                },
              });
        }

    }
}