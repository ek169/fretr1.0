export function hashItems(items) {
    var result = items.reduce(function(map, item) {
        map[item.id] = item;
        return map;
        }, {});
    return result;
}

export function modifyAndUpdateItems(items, item, val=null, options, open_menu) {
    if(val !== null) {
        item.api.params = val;
        if(options.indexOf(val.split(" ")[0]) !== -1) {
            item.api.type = item.api.params.split(" ")[0];
        } else {
            item.api.type = 'note';
        }
    }
    if(open_menu) {
        item.menu_open = !item.menu_open;
    }
    for(var k in Object.keys(items)) {
        if(k === item.id){
            items[k] = item;
        }
    }
    return items;
}



