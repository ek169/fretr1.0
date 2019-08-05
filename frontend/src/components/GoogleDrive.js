/* global gapi */
import React, { Component } from 'react';
import GoogleFilePicker from '../apiSupplements/GoogleFilePicker';
import TextField from '@material-ui/core/TextField';
var CLIENT_ID = '563161828488-lrdf9ia7e0cui5f2avtsa7o3kmbdcp3m.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCM6zkVBtx-jT-YqMmxUdHaJIyvEPsFAuU';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v2/rest"];
var SCOPES = ['https://www.googleapis.com/auth/drive.appdata', 'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.metadata'];



export class GoogleDrive extends Component {
    constructor(props) {
        super(props);
        this.state = {
                    file_picker: false,
                    link: ""
                    };
    }

    componentDidMount = () => {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/client.js";
        script.onload = () => {
            gapi.load('client:auth2', this.initClient);
        };
        document.body.appendChild(script);
        console.log(this.props.object.params.split(" ")[1]);
        this.setState({link: this.props.object.params.split(" ")[1]});
    }


    openPicker = (e) => {
        e.stopPropagation();
        this.setState({file_picker: !this.state.file_picker});
    }

  updateSigninStatus = (isSignedIn) => {
        console.log(isSignedIn);
        if (isSignedIn) {
            console.log(isSignedIn)
        } else {

        }
      }

  initClient = () => {
        let _this = this;
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPES,
          discoveryDocs: DISCOVERY_DOCS,
        }).then(function (response) {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().signIn();
          gapi.auth2.getAuthInstance().isSignedIn.listen(_this.updateSigninStatus);

          // Handle the initial sign-in state.
          _this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
      }

  downloadFile = (selectedFile) => {
    var file;
    let _this = this;
    gapi.client.drive.files.get({
        fileId: selectedFile.id,
    }).then(function(success){
        file = success.result;
        const link = file.alternateLink + "&output=embed";
        _this.setState({link: link});
        console.log(_this.props.object.params + ' ' + link);
        _this.props.forceItemUpdate(_this.props.object.params + ' ' + link);
     });
}

  render() {
        if(this.state.link) {
            return (
                <div className="googleDriveWindow">
                    <div className="hideGoogleDrive1">
                    </div>
                    <iframe className="googleDriveWindow" title={"drive"} src={this.state.link + "&embedded=true"}>
                    </iframe>
                </div>
            );
        } else {
            return (
                <div className="div">
                    {this.state.file_picker ? <GoogleFilePicker downloadFile={this.downloadFile.bind(this)}/> : ""}
                    <span onClick={this.openPicker}><i align={"center"} position={"center"}
                        className="fab fa-google-drive"></i> OPEN</span>
                </div>
            );
        }

}
}
