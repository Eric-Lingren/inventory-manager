import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './App';
import AuthProvider from './context/AuthProvider'

ReactDOM.render(
    <AuthProvider>
        <Router history={createBrowserHistory()}>
            <App />
        </Router>
    </AuthProvider>

, document.getElementById('root'));
