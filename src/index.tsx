import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import axios from 'axios';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AuthContextProvider} from "./context/AuthContext";
import {LanguageProvider} from "./context/LanguageContext";

import {ReactKeycloakProvider} from "@react-keycloak/web";
import my_keycloak from "./Keycloak"

axios.defaults.baseURL = 'http://inergy.epu.ntua.gr:8000';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <ReactKeycloakProvider authClient={my_keycloak} initOptions={{onLoad: 'login-required'}}>
        <React.StrictMode>
            <BrowserRouter>
                <LanguageProvider>
                    <AuthContextProvider>
                        <Routes>
                            <Route path={'/*'} element={<App/>}/>
                        </Routes>
                    </AuthContextProvider>
                </LanguageProvider>
            </BrowserRouter>
        </React.StrictMode>
    </ReactKeycloakProvider>);

reportWebVitals();
