import React, {useState} from 'react';

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from '@mui/material/Link';

import Breadcrumb from "../components/layout/Breadcrumb";
import AddressField from "../components/ServicePage/AddressField";
import ImageField from "../components/ServicePage/ImageField";
import MapField from "../components/ServicePage/MapField";

const breadcrumbs = [
    <Link key={1} fontSize={'20px'} underline="hover" color="inherit" href="/">
        Dashboard
    </Link>, <Typography
        key={2}
        color="secondary"
        fontSize={'20px'}
        fontWeight={600}>
        Load Forecasting
    </Typography>,];

interface AddressOptionType {
    address: string;
    cadastre: number;
    id: number;
}

const ServicePage = () => {
    const [address, setAddress] = useState<AddressOptionType | null>(null);
    const [chosenImage, setChosenImage] = useState<number | null>(null)


    const addresses = [
        {address: 'The Shawshank Redemption', cadastre: 1994, id: 1},
        {address: 'sassafras', cadastre: 1111, id: 2},
    ]

    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={'Energy Efficiency Investment De-Risking'}/>
            <Container maxWidth={'xl'} sx={{my: 5}}>
                <Typography variant={'h4'} fontWeight={'bold'} sx={{mb: 3}}>Configuration</Typography>
                <AddressField address={address} setAddress={setAddress} addresses={addresses} />
                <ImageField chosenImage={chosenImage} setChosenImage={setChosenImage}/>
                <MapField/>
            </Container>
        </>
    );
}

export default ServicePage;