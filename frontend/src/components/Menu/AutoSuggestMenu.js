import React, {Component} from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

export const theme = {
  container:                'react-autosuggest__container',
  containerOpen:            'react-autosuggest__container--open',
  input:                    'autosuggestInput',
  inputOpen:                'react-autosuggest__input--open',
  inputFocused:             'react-autosuggest__input--focused',
  suggestionsContainer:     'suggestionsContainer',
  suggestionsContainerOpen: 'suggestionsContainerOpen',
  suggestionsList:          'suggestionsList',
  suggestion:               'suggestion',
  suggestionFirst:          'react-autosuggest__suggestion--first',
  suggestionHighlighted:    'react-autosuggest__suggestion--highlighted',
  sectionContainer:         'react-autosuggest__section-container',
  sectionContainerFirst:    'react-autosuggest__section-container--first',
  sectionTitle:             ''
};

export function renderSuggestion (suggestion) {
    return (
        <MenuItem>
            <ListItemText>
                {suggestion}
            </ListItemText>
        </MenuItem>
    )

};

export function renderSuggestionsContainer({ containerProps, children, query }) {
        return (
            <Paper {... containerProps}>
              <MenuList>
                {children}
              </MenuList>
            </Paper>
        );
}

export function shouldRenderSuggestions(value) {
  return true;
}
