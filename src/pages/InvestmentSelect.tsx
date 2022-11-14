import React from 'react';
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Breadcrumb from "../components/layout/Breadcrumb";

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
        </>
    );
}

export default InvestmentSelect;