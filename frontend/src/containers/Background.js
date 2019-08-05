import React, { Component } from 'react';
import { connect } from 'react-redux';
import ToolbarTop from '../components/Toolbar';
import { WidthProvider, Responsive } from "react-grid-layout";
import Item from './Item';
import {
  toggleMenu,
  addBreakpoint,
  addCols,
  updateLayout,
  isDragging,
  doneDragging
} from '../actions/actions';

import {
    iterCounter,
} from '../actions/counter';

import {
  addItem,
  removeItem,
  setAllItems
} from '../actions/item';

import {
  saveAllItems
} from '../data_manipulation/save_functions';

import {
    createItem
} from '../data_manipulation/add_item';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};

class Background extends Component {

    static defaultProps = {
            className: "layout",
            cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
            rowHeight: 30
     };

     boardChanged = () => {
        if(Object.keys(this.props.items).length > 0) {
            saveAllItems(this.props.items, this.props.layout, this.props.user.id, this.props.counter);
        }
     }

     componentDidUpdate = (prevProps) => {
        if((this.props.user) && ((prevProps.items !== this.props.items) || (prevProps.layout !== this.props.layout))){
            this.boardChanged();
        }
     }

    onAddItem = (e) => {
        const xpl = Math.floor(e.pageX);
        const ypl = e.pageY;
        const items = createItem(this.props.items, this.props.counter, xpl, ypl)
        this.props.dispatch(addItem(items));
        this.props.dispatch(iterCounter(this.props.counter + 1));
    }

    onRemoveItem(id) {
        var items = Object.assign({}, this.props.items);
        delete items[id];
        this.props.dispatch(removeItem(items));
    }

    onBreakpointChange = (breakpoint, cols) => {

        this.props.dispatch(addBreakpoint(breakpoint));
        this.props.dispatch(addCols(cols));
    }

    isDragging = (e) => {
        if(!this.props.dragging){
            this.props.dispatch(isDragging());
        }

    }

    doneDragging = (e) => {
        if(this.props.dragging){
            setTimeout(function(){this.props.dispatch(doneDragging());}.bind(this), 200);
        }
        return false;

    }


    onLayoutChange = (layout, layouts)  => {
        saveToLS("layout", layouts);
        this.props.dispatch(updateLayout(layouts));
    }

    render = () => {

        const items = this.props.items;
        const elements = Object.keys(items).map((el, i) =>  (<div key={items[el].id} onClick={proxy => proxy.stopPropagation()}
                                                            data-grid={items[el].grid} className={"item"}>
                                                                <div className="handle top"></div>
                                                                <div className="handle bottom"></div>
                                                                <div className="handle left"></div>
                                                                <div className="handle right"></div>
                                                                <Item el={items[el]}
                                                                dragging={this.props.dragging} boardChanged={this.boardChanged.bind(this)}
                                                                onRemoveItem={this.onRemoveItem.bind(this, items[el].id)}
                                                                />
                                                            </div>));
        return (
            <div>
                {this.props.user ? <ToolbarTop user={this.props.user}/> : <div></div>}
                <div className="selectorDiv" onClick={this.props.user ? this.onAddItem : e => e.preventDefault()}>
                    <ResponsiveReactGridLayout
                        className="layout"
                        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                        rowHeight={30}
                        layouts={this.props.layout}
                        compactType={null}
                        onDrag={this.isDragging}
                        draggableHandle={".handle"}
                        onDragStop={this.doneDragging}
                        preventCollision={false}
                        onLayoutChange={(layout, layouts) =>
                            this.onLayoutChange(layout, layouts)
                        }
                    >
                        {elements}
                    </ResponsiveReactGridLayout>
                </div>
            </div>
        );
    }
}



function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-7")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-7",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

function mapStateToProps(state) {
    return ({
            layout: state.layout,
            user: state.user,
            options: state.options,
            menu: state.menu,
            items: state.items,
            cols: state.cols,
            counter: state.counter,
            breakpoint: state.breakpoint,
            dragging: state.dragging
        });
}


export default connect(mapStateToProps)(Background);