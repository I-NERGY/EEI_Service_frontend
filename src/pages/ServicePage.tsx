import React, {useState} from 'react';
import AddressOptionType from "../interfaces/AddressOptionType";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from '@mui/material/Link';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import ChevronRight from '@mui/icons-material/ChevronRight';

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

const ServicePage = () => {
    const [address, setAddress] = useState<AddressOptionType | null>(null);
    const [chosenImage, setChosenImage] = useState<number | null>(null)
    const [length, setLength] = useState<number | null>(null)
    const [width, setWidth] = useState<number | null>(null)

    const addresses = [
        {
            address: 'Sarantaporou 5, Ilioupoli',
            cadastre: 1994,
            latitude: 37.93995073670426,
            longitude: 23.749203299724236,
            id: 1
        },
        {
            address: 'Kleisouras 41, Petroupoli',
            cadastre: 1111,
            latitude: 38.04565950449955,
            longitude: 23.694367382543604,
            id: 2
        },
    ]

    const handleSubmit = () => {
        console.log({address: address?.address, chosenImage, cadastre: address?.cadastre, length, width})
    }

    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={'Energy Efficiency Investment De-Risking'}/>
            <Container maxWidth={'xl'} sx={{my: 5}}>
                <Typography variant={'h4'} fontWeight={'bold'} sx={{mb: 3}}>Configuration</Typography>
                <AddressField address={address} setAddress={setAddress} addresses={addresses}/>
                <ImageField chosenImage={chosenImage} setChosenImage={setChosenImage}/>
                <MapField address={address} setLength={setLength} setWidth={setWidth}/>
            </Container>

            <hr/>
            <Container maxWidth={'xl'} sx={{my: 5}}>
                <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Grid item xs={12} md={6}>

                    </Grid>
                    <Grid item xs={12} md={6} display={'flex'}>
                        <Button variant={'contained'} component={'span'} size={'large'} color={'warning'}
                                sx={{ml: 'auto'}} fullWidth
                                endIcon={<ChevronRight/>}
                                onClick={handleSubmit}
                                disabled={!address || !chosenImage || !length}
                        >
                            <Typography variant={'h6'} onClick={handleSubmit}>PLACEHOLDER</Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default ServicePage;