/*global FB*/
/*global gapi*/
import { connect } from 'react-redux';
import React, {Component} from 'react';
import {setUser} from '../actions/user';
import {urlStart} from '../containers/App';
import {PopUpMenu} from './Toolbar/PopUpMenu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import {clearItems} from '../actions/item';
import Icon from '@material-ui/core/Icon';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

var CLIENT_ID = '563161828488-lrdf9ia7e0cui5f2avtsa7o3kmbdcp3m.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCM6zkVBtx-jT-YqMmxUdHaJIyvEPsFAuU';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v2/rest"];
var SCOPES = ['https://www.googleapis.com/auth/drive.appdata', 'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.metadata'];


class ToolbarTop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
      settings: false
    };
  }

  componentDidMount = () => {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/client.js";
        script.onload = () => {
            gapi.load('client:auth2', this.initClient);
        };
        document.body.appendChild(script);
    }

  updateSigninStatus = (isSignedIn) => {
    if(isSignedIn) {
        console.log(isSignedIn);
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
          console.log(response);
          gapi.auth2.getAuthInstance().isSignedIn.listen(_this.updateSigninStatus);
          gapi.auth2.getAuthInstance().signIn();


          // Handle the initial sign-in state.
          _this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
      }

  logOut = () => {
    this.props.dispatch(setUser(null));
    this.props.dispatch(clearItems())
    try {
         FB.getLoginStatus(function(response) {
            if (response.status === "connected") {
               FB.logout(function(response) {
               });
            }
         });
    } catch (e) {
    }
    try {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
    } catch (e)
    {
    }
    console.log(this.props.user);
    fetch(urlStart + "/logout", {
        crossDomain: true,
        method: 'GET',
    });

  }

  toggleSettings = () => {
    this.setState({settings: !this.state.settings});
  }

  account = () => {

  }

render() {
    const boards = ["Uno", "Dos"];
    const firstSixBoards = boards.slice(0, 6);
    const restOfBoards = boards.slice(6, boards.length-1);
    const tabbedBoard = firstSixBoards.map((boardName, i) =>  (<Tab disableRipple
                                                            label={boardName}
                                                           />));

    const dropdownBoards = restOfBoards.map((boardName, i) => (
                                <ListItem key={i}>
                                    <ListItemText primary={boardName} />
                                </ListItem>
                            ));


    return (
      <div>
        <AppBar id="appBar" position="static">
          <div>
            {this.props.user ?
              <div>
              <Tabs value={1} onChange={this.handleChange}>
                {tabbedBoard}
              </Tabs>
              <Tabs tabItemContainerStyle={{position: "fixed", right:"0"}}></Tabs>
              <Tab icon={<i class="fas fa-plus-square" id="addBoardBtn"></i>}/>
          <div onClick={this.toggleSettings} id="accountIconDiv">
            <i id="accountIcon" className="fas fa-user-circle"></i>
          </div>
          {
          dropdownBoards ?
            <List id="dropdownBoardList">
                {dropdownBoards}
            </List>
            :
            ""
          }
          </div>
            :
            ""
          }
        </div>
      </AppBar>
      {this.state.settings ?
        <div onClick={this.toggleSettings} id="settingsBox">
          <div onClick={e => e.stopPropagation()} id="settingsMenu">
            <PopUpMenu logOut={this.logOut} toggleSettings={this.toggleSettings.bind(this)} email={this.props.user.email}
            />
          </div>
        </div>
      :
        ""
      }
    </div>
    );
  }
}

function mapStateToProps(state) {
    return ({
            });
}


export default connect(mapStateToProps)(ToolbarTop);
