import React from 'react';
import {render, screen} from "@testing-library/react";
import my_keycloak from "../Keycloak";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import {BrowserRouter} from "react-router-dom";
import {AuthContextProvider} from "../context/AuthContext";
import {LanguageProvider} from "../context/LanguageContext";

import PlanInvestment from "../pages/PlanInvestment";

it('renders the Address section in the Plan Investment page', () => {
    render(
        <ReactKeycloakProvider authClient={my_keycloak} initOptions={{onLoad: 'login-required'}}>
            <React.StrictMode>
                <BrowserRouter>
                    <LanguageProvider>
                        <AuthContextProvider>
                            <PlanInvestment/>
                        </AuthContextProvider>
                    </LanguageProvider>
                </BrowserRouter>
            </React.StrictMode>
        </ReactKeycloakProvider>
    )
    const planInvestmentAddress = screen.getByTestId('planInvestmentAddress')
    expect(planInvestmentAddress).toBeInTheDocument();
})

it('renders the Images section in the Plan Investment page', () => {
    render(
        <ReactKeycloakProvider authClient={my_keycloak} initOptions={{onLoad: 'login-required'}}>
            <React.StrictMode>
                <BrowserRouter>
                    <LanguageProvider>
                        <AuthContextProvider>
                            <PlanInvestment/>
                        </AuthContextProvider>
                    </LanguageProvider>
                </BrowserRouter>
            </React.StrictMode>
        </ReactKeycloakProvider>
    )
    const planInvestmentImages = screen.getByTestId('planInvestmentImages')
    expect(planInvestmentImages).toBeInTheDocument();
})

it('renders the Map section in the Plan Investment page', () => {
    render(
        <ReactKeycloakProvider authClient={my_keycloak} initOptions={{onLoad: 'login-required'}}>
            <React.StrictMode>
                <BrowserRouter>
                    <LanguageProvider>
                        <AuthContextProvider>
                            <PlanInvestment/>
                        </AuthContextProvider>
                    </LanguageProvider>
                </BrowserRouter>
            </React.StrictMode>
        </ReactKeycloakProvider>
    )
    const planInvestmentMap = screen.getByTestId('planInvestmentMap')
    expect(planInvestmentMap).toBeInTheDocument();
})