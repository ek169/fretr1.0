/*global FB*/
import React, { Component } from 'react';

window.fbAsyncInit = function() {
        FB.init({
          appId      : '218432222056840',
          cookie     : true,
          xfbml      : true,
          version    : 'v2.8'
        });

        document.dispatchEvent(new Event('fb_init'));

      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "https://connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));


export class Facebook extends Component {
    render = () => {
        try {
            const textInput = this.props.object.params.split(" ")[1].toLowerCase();
            if(textInput == "birthdays") {
                FB.api("/me/friends?fields=id,name,birthday", function(response) {
                    console.log(response.summary);
                });
            }
        } catch(TypeError) {
            console.log("error");
        }
        return (<div>facebook</div>);
    }

}