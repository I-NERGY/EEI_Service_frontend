import React, {useState} from 'react';

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from '@mui/material/Link';

import Breadcrumb from "../components/layout/Breadcrumb";
import AddressField from "../components/ServicePage/AddressField";

const breadcrumbs = [
    <Link fontSize={'20px'} underline="hover" key="1" color="inherit" href="/">
        Dashboard
    </Link>, <Typography
        color="secondary"
        fontSize={'20px'}
        fontWeight={600}>
        Load Forecasting
    </Typography>,];

const ServicePage = () => {
    const [address, setAddress] = useState<string>('')

    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={'Energy Efficiency Investment De-Risking'}/>
            <Container maxWidth={'xl'} sx={{my: 5}}>
                <Typography variant={'h4'} fontWeight={'bold'} sx={{mb: 3}}>Configuration</Typography>
                <AddressField address={address} setAddress={setAddress} />
            </Container>
        </>
    );
}

export default ServicePage;