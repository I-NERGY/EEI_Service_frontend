import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AddressOptionType from "../interfaces/AddressOptionType";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from '@mui/material/Link';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

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
        Service Title
    </Typography>,];

const ServicePage = () => {
    const [address, setAddress] = useState<AddressOptionType | null>(null);
    const [chosenImage, setChosenImage] = useState<number | null>(null)
    const [perimeter, setPerimeter] = useState<number | null>(null)

    useEffect(() => window.scrollTo(0, 0), [])


    // const addresses = [
    //     {
    //         address: 'string',
    //         cadastre_number: '12',
    //         latitude_centroid: '35',
    //         longitude_centroid: '35',
    //         perimeter: 12,
    //         building_id: 1
    //     },
    //     // {
    //     //     address: 'Kleisouras 41, Petroupoli',
    //     //     cadastre: 1111,
    //     //     latitude: 38.04565950449955,
    //     //     longitude: 23.694367382543604,
    //     //     id: 2
    //     // },
    // ]

    const handleSubmit = () => {
        console.log({address: address?.address, chosenImage, cadastre: address?.cadastre_number, perimeter})
    }

    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={'Energy Efficiency Investment De-Risking'}/>
            <Container maxWidth={'xl'} sx={{my: 5}}>
                <Typography variant={'h4'} fontWeight={'bold'} sx={{mb: 3}}>Configuration</Typography>
                <AddressField address={address} setAddress={setAddress} setPerimeter={setPerimeter} />
                <ImageField chosenImage={chosenImage} setChosenImage={setChosenImage}/>
                <MapField address={address} perimeter={perimeter} />
            </Container>

            <Divider/>

            <Container maxWidth={'xl'} sx={{my: 5}}>
                <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Grid item xs={12} md={6}>

                    </Grid>
                    <Grid item xs={12} md={6} display={'flex'}>
                        <Button variant={'contained'} component={'span'} size={'large'} color={'warning'}
                                sx={{ml: 'auto'}} fullWidth
                                endIcon={<ChevronRight/>}
                                onClick={handleSubmit}
                                disabled={!address || !chosenImage}
                        >
                            <Typography variant={'h6'}>Virtual EPC</Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default ServicePage;