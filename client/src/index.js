import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './App';
import AuthProvider from './context/AuthProvider'
import AdminProvider from './context/AdminProvider'
import InventoryProvider from './context/InventoryProvider'

ReactDOM.render(
    <AuthProvider>
        <AdminProvider>
            <InventoryProvider>
                <Router history={createBrowserHistory()}>
                    <App />
                </Router>
            </InventoryProvider>
        </AdminProvider>
    </AuthProvider>

, document.getElementById('root'));
