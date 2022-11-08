import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {ThemeProvider, createTheme} from '@mui/material/styles';

import Layout from "./components/layout/Layout";
import Homepage from "./pages/Homepage";
import ServicePage from "./pages/ServicePage";
import SignIn from "./pages/SignIn";

import RequireAuth from "./RequireAuth";
import RequireNotAuth from "./RequireNotAuth";

// Set primary color here
let primary = '#97A94D'

// Set secondary color here
let secondary = '#B2C561'

// Dashboard theme setup here
const theme = createTheme({
    palette: {
        primary: {
            main: primary
        },
        secondary: {
            main: secondary
        },
        background: {
            default: `linear-gradient(to right, ${primary}, ${secondary})`
        }
    },
    typography: {
        fontFamily: [
            'Poppins',
            'Roboto',
        ].join(','),
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Layout>
                <Routes>
                    <Route path="/" element={<Homepage/>}/>

                    {/* Routes not accessible to logged-out users */}
                    <Route element={<RequireAuth/>}>
                        <Route path="/servicePath" element={<ServicePage/>}/>
                    </Route>

                    {/* Routes not accessible to logged-in users */}
                    <Route element={<RequireNotAuth/>}>
                        <Route path="/signin" element={<SignIn/>}/>
                    </Route>
                </Routes>
            </Layout>
        </ThemeProvider>
    );
}

export default App;
