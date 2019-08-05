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


export class FacebookLogin extends Component {

    componentDidMount = () => {
            // facebook login check
            document.addEventListener('fb_init', e => this.checkFbLoginStatus());
        }

        getFbInfo = () => {
            let _this = this;
            FB.api('/me?fields=id,name,email,picture', function(response) {
                const picture = response['picture']['data']
                const credential = {'type': 'facebook', 'key': String(response.id), 'name': response.name, 'img': picture['url']};
                _this.props.LoginRequest(response['email'], null, null, credential);
            });
        }

        checkFbLoginStatus = () => {
            let _this = this;
            FB.getLoginStatus(function(response) {
                if (response.status === "connected") {
                    const access_token = response.authResponse.accessToken;
                    _this.getFbInfo();
                }
            });
        }


        facebookLogin = () => {
            let _this = this;
            FB.login(function(response) {
                if (response.status === "connected") {
                    const access_token = response.authResponse.accessToken;
                    _this.getFbInfo();
                }
            }, {scope: 'email'});
        }


        render = () => {
            return(
            <div>
                <button className="fbLoginBtn" onClick={this.facebookLogin}><i className="fab fa-facebook"></i> Continue with Facebook</button>
            </div>
            );
        }

}