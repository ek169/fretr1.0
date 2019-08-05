import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/Background.css';
import './css/News.css';
import './css/Menu.css';
import './css/Note.css';
import './css/Settings.css';
import './css/react-grid-css.css';
import './css/Toolbar.css';
import './css/Login.css';
import './css/react-resizable.css';
import './css/Menu/AutoSuggestionTheme.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';


ReactDOM.render(
<App/>
, document.getElementById('root'));
registerServiceWorker();
