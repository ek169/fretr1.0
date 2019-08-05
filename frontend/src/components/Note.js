import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';



export const noteOptions = ['note border', 'note list'];

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

export class Note extends Component {

    check = (i) => {
        var toChange = this.props.object.params.split(",")[i];
        if(toChange.split(" ").slice(-1, ).join("") === "true") {
            var newList = this.props.object.params.split(",");
            newList[i] = this.props.object.params.split(",")[i].split(" ").slice(0, -1).join(" ");
            this.props.forceItemUpdate(newList.join(","));
        } else {
            var newList = this.props.object.params.split(",");
            newList[i] = this.props.object.params.split(",")[i] + " true";
            this.props.forceItemUpdate(newList.join(","));

        }
    }

    render = () => {
        const textInput = this.props.object.params.split(" ")[0].toLowerCase();
        var text;
        var body;
        if(textInput === 'header' || textInput == 'border') {
            text = this.props.object.params.split(" ").slice(1,).join(" ");
            body = (<span className='noteHeading'>{text}</span>);
            if(textInput === 'border') {
                var size;
                try {
                    if(this.props.object.params.split(" ")[1] > 30) {
                        text = this.props.object.params.split(" ").slice(2,).join(" ");
                        size = 4500;
                    } else {
                        text = this.props.object.params.split(" ").slice(2,).join(" ");
                        size = this.props.object.params.split(" ")[1] * 150;
                    }
                } catch(TypeError) {
                        size = 450;
                }
                body = (<div className="div">
                            <span className="noteHeading">{text}</span>
                            <div onClick={e => e.stopPropagation()} className="headingBorder" style={{'height': size}}>
                            </div>
                        </div>
                        );
            }
        } else if(textInput === 'todo'){
            text = this.props.object.params.split(" ").slice(1,).join(" ").split(",");
            body = text.map((item, i) =>
                <div key={i} style={{width: "100%"}} onClick={e => e.stopPropagation()}>
                    {item.split(" ").slice(-1,).join("") === 'true' ?
                    (<ListItem primaryText={item.split(" ").slice(0, -1).join(" ")} leftCheckbox={<Checkbox onClick={this.check.bind(this, i)} checked={true}/>} />)
                    :
                    (<ListItem primaryText={item} leftCheckbox={<Checkbox onClick={this.check.bind(this, i)} checked={false}/>}/>)
                    }
                    <Divider/>
                </div>
            );

        } else {
            body = this.props.object.params
        }
        return (
            <div style={styles.root} className="div">
                {body}
            </div>
        );
    }
}
