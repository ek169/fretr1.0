export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const UPDATED_ITEM = 'UPDATED_ITEM';
export const LOGIN_ITEM = 'LOGIN_ITEM';
export const SET_ALL_ITEMS = 'SET_ALL_ITEMS';
export const CLEAR_ITEMS = 'CLEAR_ITEMS';

export function updateItem(item, val=null, options=null, open_menu=true) {
    return {
        type: UPDATED_ITEM,
        item,
        val,
        options,
        open_menu
    }
}

export function addItem(items){
    return {
        type: ADD_ITEM,
        items
    }
}

export function removeItem(items){
    return {
        type: REMOVE_ITEM,
        items
    }
}

export function showLogin(){
    return {
        type: LOGIN_ITEM
    }
}

export function setAllItems(items){
    return {
        type: SET_ALL_ITEMS,
        items
    }
}

export function clearItems() {
    return {
        type: CLEAR_ITEMS
    }
}