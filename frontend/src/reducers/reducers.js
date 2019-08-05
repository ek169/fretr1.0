import { combineReducers } from 'redux'
import {modifyAndUpdateItems, hashItems} from '../data_manipulation/item_manipulators';
import { Login } from '../components/Login';
import {
  TOGGLE_MENU,
  ADD_BREAKPOINT,
  UPDATE_LAYOUT,
  ADD_COLS,
  UPDATE_OPTIONS,
  IS_DRAGGING,
  DONE_DRAGGING
} from '../actions/actions';

import {
    ITER_COUNTER,
    SET_COUNTER
} from '../actions/counter';

import {
    UPDATED_ITEM,
    ADD_ITEM,
    REMOVE_ITEM,
    LOGIN_ITEM,
    SET_ALL_ITEMS,
    CLEAR_ITEMS
} from '../actions/item';

import {
    SET_USER,
} from '../actions/user';

import {
    allItemOptions
} from '../containers/Item';

const items = [{'id': 0, 'grid': { w: 3, h: 10, x: 5, y: 4, isResizable: false}, 'menu_open':false,  'api': {'type': 'login'}, 'options': allItemOptions}]


function displayItems(state = hashItems(items), action){
    switch(action.type) {
        case ADD_ITEM:
            return action.items;
        case REMOVE_ITEM:
            return action.items;
        case UPDATED_ITEM:
            return modifyAndUpdateItems(state, action.item, action.val, allItemOptions, action.open_menu);
        case LOGIN_ITEM:
            return state;
        case SET_ALL_ITEMS:
            return action.items;
        case CLEAR_ITEMS:
            return hashItems(items);
        default:
            return state;
    }
}

function trackDragging(state=false, action){
    switch(action.type){
        case IS_DRAGGING:
            return true;
        case DONE_DRAGGING:
            return false;
        default:
            return state;
    }
}

function iterCounter(state=1, action){
    switch(action.type){
        case ITER_COUNTER:
            return action.counter;
        case SET_COUNTER:
            return action.count;
        default:
            return state;
    }
}


function addBreakpoint(state=null, action){
    switch(action.type) {
        case ADD_BREAKPOINT:
            return action.breakpoint;
        default:
            return state;
    }
}

function addCols(state=null, action){
    switch(action.type) {
        case ADD_COLS:
            return action.cols;
        default:
            return state;
    }
}

function updateLayout(state={}, action){
    switch(action.type) {
        case UPDATE_LAYOUT:
            return action.layout;
        default:
            return state;
    }
}

function showOptions(state=allItemOptions, action){
    switch(action.type) {
        case UPDATE_OPTIONS:
            return action.options;
        default:
            return state;
    }
}

function checkUser(state=null, action) {
    switch(action.type) {
        case SET_USER:
            return action.user;
        default:
            return state;
    }
}


export const allReducers = combineReducers({
    options: showOptions,
    items: displayItems,
    counter: iterCounter,
    breakpoint: addBreakpoint,
    cols: addCols,
    layout: updateLayout,
    dragging: trackDragging,
    user: checkUser
});