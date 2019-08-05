import { allItemOptions } from '../containers/Item';

export function createItem(items, counter, xpl, ypl) {
    var newItems = Object.assign({}, items)
    newItems[counter] = {
        'id': counter,
        'api': {'type': 'note', 'id': 0, 'params': '', 'options': []},
        'grid': {i: counter.toString(), x: Math.floor(xpl/160), y: Math.floor(ypl/160), w: 2, h: 3},
        'menu_open': true
    };
    return newItems;
}

export function createItemRoute(el) {
    var route;
    if(el.api.type !== 'note'){
        try {
            route = el.api.params.split(" ")[0] + " > ";
        } catch(TypeError) {
            route = el.api.type;
        }
   } else {
        route = "";
   }
   return route;
}