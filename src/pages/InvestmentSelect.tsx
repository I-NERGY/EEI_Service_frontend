import React from 'react';

import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Breadcrumb from "../components/layout/Breadcrumb";
import InvestmentSelectQuickInfo from "../components/InvestmentSelect/InvestmentSelectQuickInfo";

const breadcrumbs = [
    <Link key={1} fontSize={'20px'} underline="hover" color="inherit" href="/">
        Dashboard
    </Link>,
    <Link key={1} fontSize={'20px'} underline="hover" color="inherit" href="/servicePath">
        Building Information
    </Link>, <Typography
        key={2}
        color="secondary"
        fontSize={'20px'}
        fontWeight={600}>
        Energy Measures Investment Choices
    </Typography>,];

const InvestmentSelect = () => {
    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={'Energy Efficiency Investment De-Risking'}/>
            <Container maxWidth={'xl'} sx={{my: 5}}>
                <InvestmentSelectQuickInfo energyClass={'classAPlusPlus'} thermalTransmittance={1.9} energyConsumption={500}/>
            </Container>

            <Container maxWidth={'xl'} sx={{my: 5, display: 'flex'}}>
                <Typography variant={'h4'} fontWeight={'bold'} sx={{mb: 3, flexGrow: 1}}>Energy Efficiency Measures</Typography>
                <Typography variant={'h5'} fontWeight={'bold'} sx={{mb: 3}}>Total Cost: 3500€</Typography>
            </Container>
        </>
    );
}

export default InvestmentSelect;