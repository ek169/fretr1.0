/* global gapi */
/* global google */
import React, { Component } from 'react';
var CLIENT_ID = '563161828488-lrdf9ia7e0cui5f2avtsa7o3kmbdcp3m.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCM6zkVBtx-jT-YqMmxUdHaJIyvEPsFAuU';
var scope = ['https://www.googleapis.com/auth/drive.appdata', 'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.metadata',
            'https://www.googleapis.com/auth/drive.metadata.readonly', 'https://www.googleapis.com/auth/drive.readonly'];
var pickerApiLoaded = false;
var oauthToken;

export default class GoogleFilePicker extends Component {
    componentDidMount = () => {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/client.js";
        script.onload = () => {
            gapi.load('auth', {'callback': this.onAuthApiLoad});
            gapi.load('picker', {'callback': this.onPickerApiLoad});
        };
        document.body.appendChild(script);
    }

  onAuthApiLoad = () => {
    let _this = this;
    window.gapi.auth.authorize(
      {
        'client_id': CLIENT_ID,
        'scope': scope,
        'immediate': false,
      },
      _this.handleAuthResult);

    }

    onPickerApiLoad = () => {
      pickerApiLoaded = true;
      this.createPicker();
    }

    handleAuthResult = (authResult) => {
      if (authResult && !authResult.error) {
        oauthToken = authResult.access_token;
        this.createPicker();
      }
    }

    createPicker = () => {
      if (pickerApiLoaded && oauthToken) {
        var view = new google.picker.View(google.picker.ViewId.SPREADSHEETS, google.picker.ViewId.DOCS);
        view.setMimeTypes("application/vnd.google-apps.document, application/vnd.google-apps.spreadsheet");
        var picker = new google.picker.PickerBuilder()
            .enableFeature(google.picker.Feature.NAV_HIDDEN)
            .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
            .setAppId(563161828488)
            .setOAuthToken(oauthToken)
            .addView(view)
            .addView(new google.picker.DocsUploadView())
            .setCallback(this.pickerCallback)
            .build();
         picker.setVisible(true);
      }
    }

    pickerCallback = (data) => {
      if (data.action == google.picker.Action.PICKED) {
        var file = data.docs[0];
        this.props.downloadFile(file);
      }
    }

    render = () => {
        return (<div></div>);
    }
}
