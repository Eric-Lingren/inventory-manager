import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './App';
import AuthProvider from './context/AuthProvider'
import AdminProvider from './context/AdminProvider'
import InventoryProvider from './context/InventoryProvider'
import FeedbackProvider from './context/FeedbackProvider'

ReactDOM.render(
    <AuthProvider>
        <AdminProvider>
            <InventoryProvider>
                <FeedbackProvider>
                    <Router history={createBrowserHistory()}>
                        <App />
                    </Router>
                </FeedbackProvider>
            </InventoryProvider>
        </AdminProvider>
    </AuthProvider>

, document.getElementById('root'));
