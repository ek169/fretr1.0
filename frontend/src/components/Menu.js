import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import {renderSuggestionsContainer, shouldRenderSuggestions, renderSuggestion, theme} from './Menu/AutoSuggestMenu';


const getSuggestionValue = suggestion => suggestion;


export class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            suggestions: []
        };
    }


    getSuggestions = () => {
        const inputValue = this.state.searchText.trim().toLowerCase();
        const inputLength = inputValue.length;
         return inputLength === 0 ? [] : this.props.options.filter(choice =>
            choice.toLowerCase().slice(0, inputLength) === inputValue
         );
     };

    onSuggestionsFetchRequested = ({ value }) => {
        let _this = this;
        this.setState({
            suggestions: _this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.props.forceItemUpdate(this.state.searchText, true);
        }
    }

    componentDidMount = () => {
        if (this.state.searchText !== this.props.el.params) {
            this.setState({
                searchText: this.props.el.params
            });
        }
    };

    onBlur = () => {
        if (this.state.searchText !== this.props.el.params) {
            this.props.forceItemUpdate(this.state.searchText, true);
        }
    }

    handleUpdateInput = (e, searchText) => {
        this.setState({
            searchText: searchText.newValue,
        });
    };


    getOptions = (e) => {
        e.preventDefault();
    }

    render = () => {
        const inputProps = {
            placeholder: 'Type',
            value: this.state.searchText,
            onChange: this.handleUpdateInput,
            onKeyPress: this.onKeyPress,
            onBlur: this.onBlur
        };

        return (
            <div className="div">
                {
                ((this.state.searchText !== "") && (this.state.searchText.length > 1024)) ?
                <span className="tooLongOfText"><i class="fas fa-exclamation-triangle"></i>
                 Text is too long</span>
                :
                <div></div>
                }
                <form className="searchBox" onClick={e => e.stopPropagation()}
                onSubmit={this.state.searchText.length > 1024 ? e => e.preventDefault() : this.props.updateItem}>
                    <Autosuggest
                        theme={theme}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        shouldRenderSuggestions={shouldRenderSuggestions}
                        renderSuggestion={renderSuggestion}
                        ref={node => {this.search = node}}
                        name={this.props.name}
                        className="searchBox"
                        inputProps={inputProps}
                        onUpdateInput={this.handleUpdateInput}
                        highlightFirstSuggestion={true}
                        style={{"textAlign": "wrap"}}
                        suggestions={this.state.suggestions}
                        renderSuggestionsContainer={renderSuggestionsContainer}
                    />
                </form>
            </div>
        );
    }
}


export default Menu;