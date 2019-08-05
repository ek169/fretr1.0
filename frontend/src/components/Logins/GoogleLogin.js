import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
/* global gapi */

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

export class GoogleLogin extends Component {

    componentDidMount = () => {
            // facebook login check
            //document.addEventListener('fb_init', e => this.checkFbLoginStatus());
            window.gapi.signin2.render('g-signin2', {
              'scope': 'profile email',
              'width': 300,
              'height': 50,
              'longtitle': true,
              'theme': 'dark',
              'onSuccess': this.signIn,
            });
        }

    signIn = (googleUser) => {
      let _this = this;
      var id_token = googleUser.getAuthResponse().id_token;
      console.log(id_token);
      var profile = googleUser.getBasicProfile();
      var id = profile.getId();
      var name = profile.getName();
      var email = profile.getEmail();
      var img = profile.getImageUrl();
      if(name && email && id_token)
      {
        console.log("should be logging in");
        _this.props.LoginRequest({id: id, token: id_token}, email, name, img, true);
      }

    }

    signOut = () => {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
    }

    render = () => {
        return(
          <div>
            <div id="g-signin2"></div>
            <Button onClick={this.signOut}>Sign out</Button>
          </div>
        );

    }
}
