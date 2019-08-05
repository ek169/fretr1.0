import React, {Component} from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Paper from '@material-ui/core/Paper';

const style = {
  paper: {
    display: 'inline-block',
    float: 'left',
    margin: '16px 32px 16px 0',
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
};

export class PopUpMenu extends Component {

    render = () => {
        return (
            <Paper id="popUpMenu">
              <MenuList>
                <MenuItem disabled={true}>
                    <ListItemText>
                        {this.props.email}
                    </ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={this.props.toggleSettings}>
                    <ListItemIcon>
                        <i id="exitIcon" className="fa fa-times" aria-hidden="true"></i>
                    </ListItemIcon>
                    <ListItemText>
                        Exit
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={this.props.logOut}>
                    <ListItemIcon>
                        <i id="logoutIcon" class="fas fa-sign-out-alt"></i>
                    </ListItemIcon>
                    <ListItemText>
                        Logout
                    </ListItemText>
                </MenuItem>
                <Divider/>
              </MenuList>
            </Paper>
        );
    }
}
