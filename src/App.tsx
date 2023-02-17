import React from 'react';
import {Route, Routes} from 'react-router-dom';

import {ThemeProvider, createTheme} from '@mui/material/styles';

import Layout from "./components/layout/Layout";
import Homepage from "./pages/Homepage";
import BuildingInfo from "./pages/BuildingInfo";
import SignIn from "./pages/SignIn";

import RequireAuth from "./RequireAuth";
import RequireNotAuth from "./RequireNotAuth";
import UserProfile from "./pages/UserProfile";
import InvestmentSelect from "./pages/InvestmentSelect";
import EnergyMeasuresEdit from "./pages/EnergyMeasuresEdit";

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
                        <Route path="/building-info" element={<BuildingInfo/>}/>
                    </Route>

                    <Route element={<RequireAuth/>}>
                        <Route path="/user/profile" element={<UserProfile/>}/>
                    </Route>

                    <Route element={<RequireAuth/>}>
                        <Route path="/energy-measures/id/:id" element={<InvestmentSelect/>}/>
                    </Route>

                    <Route element={<RequireAuth/>}>
                        <Route path="/energy-measures/edit" element={<EnergyMeasuresEdit/>}/>
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
