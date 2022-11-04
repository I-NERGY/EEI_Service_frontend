import React from 'react';

import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';

import Breadcrumb from "../components/layout/Breadcrumb";

const breadcrumbs = [
    <Link fontSize={'20px'} underline="hover" key="1" color="inherit" href="/">
        Dashboard
    </Link>, <Typography
        // underline="hover"
        color="secondary"
        fontSize={'20px'}
        fontWeight={600}>
        Load Forecasting
    </Typography>,];

const ServicePage = () => {
    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={'Energy Efficiency Investment De-Risking'}/>
            <h1>Service Page</h1>
        </>
    );
}

export default ServicePage;