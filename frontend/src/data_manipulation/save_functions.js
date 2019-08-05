import {urlStart} from '../containers/App';

function findLayoutMatch(layouts) {
    var largest = [];
    Object.keys(layouts).forEach(function(k) {
        if(typeof(largest) === 'undefined') {
            largest = layouts[k];
        }
        else if(layouts[k].length > largest.length){
            largest = layouts[k];
        }
    });
    return largest;
}



function hashGridItems(newLayout) {
    var result = newLayout.reduce(function(map, item) {
        map[item.i] = item;
        return map;
        }, {});
    return result;
}

function matchItemToGrid(items, layouts) {
    const newLayout = hashGridItems(findLayoutMatch(layouts));
    for(var k in newLayout) {
        try {
            items[k].grid = newLayout[k];
        } catch(TypeError) {
            continue;
        }
    }
    return items;

}

export function saveAllItems(items, layout, userId, counter){
    console.log(items);
    const updatedItems = matchItemToGrid(items, layout);
    fetch(urlStart + "/save", {
        crossDomain: true,
        method: 'POST',
        body: JSON.stringify({
        items: updatedItems,
        userId: userId,
        counter: counter
        }),
    })
    .then(function(response) {
        console.log(response);
        if(response.status === 200) {
            //console.log('success');
        }
    })
    .catch(function(ex) {
        //console.log('parsing failed', ex)
    })
}
