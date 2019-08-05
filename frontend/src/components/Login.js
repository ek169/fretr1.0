import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import {setUser} from '../actions/user';
import {urlStart} from '../containers/App';
import {FacebookLogin} from './Logins/FacebookLogin';
import {GoogleLogin} from './Logins/GoogleLogin';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const options = ['todo', 'facebook', 'twitter', 'reddit', 'settings']
const cookies = new Cookies();


export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            server_error: false,
            error_pass: false,
            error_other: false,
            error_conf: false,
            isLogin: true

        }
        this.anonymousAction = this.props.anonymousAction;
    }


    LoginRequest = (credential, email=null, name=null, img=null, override=false) => {
        console.log(credential);
        let _this = this;
        fetch(urlStart + "/login", {
            crossDomain: true,
            method: 'POST',
            body: JSON.stringify({
                credential: credential,
                email: email,
                name: name,
                img: img,
                override: override
            }),
            headers: { //"Content-Type": "application/x-www-form-urlencoded"},
              "Content-Type": "application/json",
            }
          })
          .then(function(response) {
            response = response.json();
            response.then(function(response)
          {
            if(response.success == true)
            {
              _this.anonymousAction(setUser, response.data);
            }
            console.log(response);
            if(response.false === 500) {
              _this.setState({server_error: true});
              return false;
            }
          });
               /*response.json().then(obj => {
                   if(obj.response === 'success') {
                    _this.anonymousAction(setUser, obj.user);
                   } else if(obj.response === 'wrong_password') {
                    _this.setState({error_pass: true});
                   } else if(obj.response === 'not_confirmed') {
                   _this.setState({error_conf: true});
                   }
                   else {
                    _this.setState({error_other: true});
                   }
               })*/
          })
          .catch(function(ex) {
            console.log('parsing failed', ex);
          })
    }

    Submit = (e) => {
        //console.log(e.target);
        e.preventDefault();
        const _this = this;
        var data = new FormData(e.target);
        if((!this.state.isLogin) && (data.get('password') !== data.get('confirmPassword')) && (data.get('password').length > 7)){
            this.setState({error_conf: true, email: data.get('email')});
            return false;
        } else {
            this.LoginRequest(data.get('email'), data.get('password'), data.get('confirmPassword'));
        }
    }

    toggleLogin = () => {
        this.setState({isLogin: !this.state.isLogin});
    }

    render = () => {
        const email = this.state.email;
        const error_other = this.state.error_other;
        const error_pass = this.state.error_pass;
        const error_conf = this.state.error_conf;
        const server_error = this.state.server_error;
        const passwords = this.state.passwords;
        if(typeof(this.props.anonymousAction) !== 'undefined') {
            return (
                <div className="loginDiv">
                    <div className="headerText">Beta Login</div>
                    <div className="loginDiv">
                        <p className="error">{server_error ? "~ There was a server error ~" : ""}</p>
                        <form onSubmit={this.Submit}>
                            <TextField
                                hintText="Email"
                                helperText="Email"
                                type="email"
                                name="email"
                                defaultValue={email}
                                errorText={error_other ? "Your login was unsuccessful, please try again" : ""}
                                id="email"
                            /><br/>
                            <TextField
                                hintText="Password"
                                helperText="Password"
                                type="password"
                                defaultValue={passwords}
                                errorText={error_pass ? "Your password was incorrect" : ""}
                                name="password"
                                id="password"
                            /><br/>
                            {!this.state.isLogin ?
                            <div>
                            <TextField
                                hintText="Confirm Password"
                                floatingLabelText="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                errorText={error_conf ? "Your passwords did not match" : ""}
                                defaultValue={passwords}
                                errorText={error_conf ? "Your passwords did not match" : ""}
                                id="confirmPassword"
                            />
                            <span className="loginOptionsText" onClick={this.toggleLogin}>Return To Login</span>
                            </div>
                            :
                            <div>
                                <span className="loginOptionsText" onClick={this.toggleLogin}>Create New Account</span>
                            </div>
                            }
                            <br/>
                            <Button onClick={this.onClick}
                            color="primary" fullWidth={true} type="submit">
                            {this.state.isLogin ? "Login" : "Create Account"}
                            </Button>
                        </form>
                        <FacebookLogin LoginRequest={this.LoginRequest.bind(this)}/>
                        <GoogleLogin LoginRequest={this.LoginRequest.bind(this)}/>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="loginDiv" onClick={e => e.preventDefault()}>
                    <div className="headerText" onClick={e => e.stopPropagation()}>Welcome!</div>
                    <div className="loginText">
                        It looks like it's your first time here! Open a menu by clicking anywhere
                        that is colored white, to change your settings type "settings" into any text
                        menu prompts and hit "enter"!
                    </div>
                    <div className="loginText">
                        Let us know if you have any questions =)
                    </div>
                </div>
            );
          }
    }
}



export default Login;
