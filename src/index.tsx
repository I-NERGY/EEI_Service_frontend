import React from 'react';
import axios from "axios";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AuthContextProvider} from "./context/AuthContext";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

axios.defaults.baseURL = 'http://147.102.6.184:8000';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
                    <Route path={'/*'} element={<App/>}/>
                </Routes>
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();