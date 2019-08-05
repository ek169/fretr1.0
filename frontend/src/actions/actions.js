export const TOGGLE_MENU = 'TOGGLE_MENU';
export const ADD_BREAKPOINT = 'ADD_BREAKPOINT';
export const UPDATE_LAYOUT = 'UPDATED_LAYOUT';
export const ADD_COLS = 'ADD_COLS';
export const UPDATE_OPTIONS = 'UPDATE_OPTIONS';
export const IS_DRAGGING = 'IS_DRAGGING';
export const DONE_DRAGGING = 'DONE_DRAGGING';



export function isDragging() {
    return {
        type: IS_DRAGGING
    }
}

export function doneDragging() {
    return {
        type: DONE_DRAGGING
    }
}

export function toggleMenu(menu) {
    return {
        type: TOGGLE_MENU,
        menu
  }
}

export function updateOptions(options) {
    return {
        type: UPDATE_OPTIONS,
        options
    }
}

export function addBreakpoint(breakpoint){
    return {
        type: ADD_BREAKPOINT,
        breakpoint

    }
}

export function addCols(cols){
    return {
        type: ADD_COLS,
        cols
    }
}


export function updateLayout(layout) {
    return {
        type: UPDATE_LAYOUT,
        layout
    }
}