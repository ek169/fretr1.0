import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu } from '../components/Menu';
import { Login } from '../components/Login';
import { Note, noteOptions } from '../components/Note';
import { GoogleMaps } from '../components/GoogleMaps';
import { GoogleSheets } from '../components/GoogleSheets';
import { GoogleDrive } from '../components/GoogleDrive';
import { News } from '../components/News';
import { Facebook } from '../components/Facebook';
import '../css/Background.css';
import '../css/react-grid-css.css';
import {updateLayout} from '../actions/actions';
import {updateItem, setAllItems} from '../actions/item';
import {setCounter} from '../actions/counter';
import {newsOptions} from '../components/News';
import {createItemRoute} from '../data_manipulation/add_item';

const item_choices = {'note': Note, 'login': Login, 'invalid': Note,
                    'googlemaps': GoogleMaps, 'news': News, 'facebook': Facebook, 'googlesheets': GoogleSheets, 'googledrive': GoogleDrive};
const hardOptions = {'news': newsOptions}

export const allItemOptions = Object.keys(item_choices);

class Item extends Component {

    updateItem = (e) => {
        if(!this.props.dragging){
            e.preventDefault();
            var val;
            try {
                val = e.target.search.value;
            } catch(TypeError) {
            }
            this.props.dispatch(updateItem(this.props.el, val));
            this.props.boardChanged();
            this.forceUpdate();
        }
    }

    forceItemUpdate = (string, menu_open=false) => {
        if(!this.props.dragging){
            var val;
            try {
                val = string;
            } catch(TypeError) {
            }
            this.props.dispatch(updateItem(this.props.el, val, null, menu_open));
            this.props.boardChanged();
            this.forceUpdate();
        }
    }

    openMenu = (e) => {
        if(!this.props.dragging){
            e.preventDefault();
            this.props.dispatch(updateItem(this.props.el));
            this.forceUpdate();
        }
    }

    anonymousAction (action, data) {
        this.props.dispatch(action(data));
        if(data.items) {
            this.props.dispatch(setCounter(data.item_count));
            this.props.dispatch(setAllItems(data.items));
        }
    }

    search = (e) => {
        e.preventDefault();

    }

    render = () => {
        var options;
        var el = this.props.el;
        try {
            options = hardOptions[el.api.type];
            if (typeof(options) === 'undefined') {
                options = allItemOptions;
            }
        } catch(ValueError) {
            options = allItemOptions;
        }
        const route = createItemRoute(el);
        const ComponentType = item_choices[el.api.type];
        if(this.props.user) {
            return (
                <div className="div"
                onClick={this.openMenu.bind(this)}>
                    <span onClick={this.openMenu.bind(this)} className="itemRoute">{route}</span>
                    {el.menu_open ? <Menu name={"search"} el={el.api}
                    updateItem={this.updateItem.bind(this)} forceItemUpdate={this.forceItemUpdate.bind(this)}
                    options={options}/> :
                    <ComponentType object={el.api} forceItemUpdate={this.forceItemUpdate.bind(this)}/>
                    }
                    <span
                    className="removeStyle"
                    onClick={this.props.onRemoveItem}
                    >
                        x
                    </span>
                </div>
            );
        } else {
            return (
                <div className="div"><ComponentType object={el.api} anonymousAction={this.anonymousAction.bind(this)}/></div>
            );
        }
        }

}

function mapStateToProps(state) {
    return ({
                user: state.user,
                options: state.options
            });
}


export default connect(mapStateToProps)(Item);
