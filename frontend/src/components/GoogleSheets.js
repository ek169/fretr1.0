/* global gapi */
import React, { Component } from 'react';
var CLIENT_ID = '563161828488-lrdf9ia7e0cui5f2avtsa7o3kmbdcp3m.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCM6zkVBtx-jT-YqMmxUdHaJIyvEPsFAuU';
var SCOPES = ["https://www.googleapis.com/drive/v3/files"];


export class GoogleSheets extends Component {
    constructor(props) {
        super(props);
        this.state = {sheet: ""};
    }

    loadYoutubeApi = () => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";
    document.body.appendChild(script);
    script.onload = () => {

        window.gapi.load('client:auth2', this.initClient);
    };
  }

  componentDidMount() {
    this.loadYoutubeApi();
  }

  updateSigninStatus = (isSignedIn) => {
        console.log(isSignedIn);
        if (isSignedIn) {
          this.listMajors();
        } else {

        }
      }


    listFiles() {
        let _this = this;
        window.gapi.client.drive.files.list({
          'pageSize': 10,
          'fields': "nextPageToken, files(id, name)"
        }).then(function(response) {
            console.log(response);
          _this.appendPre('Files:');
          var files = response.result.files;
          if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              _this.appendPre(file.name + ' (' + file.id + ')');
            }
          } else {
            _this.appendPre('No files found.');
          }
        });
    }

  initClient = () => {
        let _this = this;
        window.gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPES
        }).then(function (response) {
          // Listen for sign-in state changes.
          window.gapi.auth2.getAuthInstance().signIn();
          window.gapi.auth2.getAuthInstance().isSignedIn.listen(_this.updateSigninStatus);

          // Handle the initial sign-in state.
          _this.updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        });
      }

    appendPre = (message) => {
        this.setState({sheet: this.state.sheet + " " + message});
      }

    listMajors = () => {
        let _this = this;
        window.gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
          range: 'Class Data!A2:E',
        }).then(function(response) {
          var range = response.result;
          if (range.values.length > 0) {
            _this.appendPre('Name, Major:');
            for (var i = 0; i < range.values.length; i++) {
              var row = range.values[i];
              // Print columns A and E, which correspond to indices 0 and 4.
              _this.appendPre(row[0] + ', ' + row[4]);
            }
          } else {
            _this.appendPre('No data found.');
          }
        }, function(response) {
          _this.appendPre('Error: ' + response.result.error.message);
        });
      }

  render() {
     return (
       <div>{this.state.sheet}</div>
    );
}
}