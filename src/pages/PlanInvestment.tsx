import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import {LanguageContext} from "../context/LanguageContext";
import {multilingual} from "../multilingual";

import AddressOptionType from "../interfaces/AddressOptionType";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import ChevronRight from '@mui/icons-material/ChevronRight';

import Breadcrumb from "../components/layout/Breadcrumb";
import AddressField from "../components/PlanInvestment/AddressField";
import ImageField from "../components/PlanInvestment/ImageField";
import MapField from "../components/PlanInvestment/MapField";
import BuildingMaterials from "../components/PlanInvestment/BuildingMaterials";

const PlanInvestment = () => {
    const {language} = useContext(LanguageContext)
    const dictionary = language === 'en' ? multilingual.english.planInvestment : multilingual.latvian.planInvestment

    const breadcrumbs = [
        <Link className={'breadcrumbLink'} key="1" to="/">
            {dictionary.breadcrumb1}
        </Link>, <Typography
            key={2}
            color="secondary"
            fontSize={'20px'}
            fontWeight={600}>
            {dictionary.breadcrumb2}
        </Typography>,];

    const navigate = useNavigate()
    const [address, setAddress] = useState<AddressOptionType | null>(null);
    const [chosenImage, setChosenImage] = useState<number | null>(null)
    const [perimeter, setPerimeter] = useState<number | null>(null)
    const [heavyBuildingMaterials, setHeavyBuildingMaterials] = useState<boolean | null>(true)

    useEffect(() => window.scrollTo(0, 0), [])

    const handleButton = () => {
        let payload = {
            serie: chosenImage === 1 ? 0 : chosenImage,
            cadastre_number: address?.cadastre_number,
            heavy: heavyBuildingMaterials
        }

        axios.post('/series/', payload)
            .then(response => {
                navigate(`/energy-measures/id/${address?.cadastre_number}`)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={dictionary.pageTitle}/>
            <Container maxWidth={'xl'} sx={{my: 5}}>
                <Typography variant={'h4'} fontWeight={'bold'} sx={{mb: 3}}>{dictionary.configuration}</Typography>
                <AddressField address={address} setAddress={setAddress} setPerimeter={setPerimeter}/>
                <BuildingMaterials heavyBuildingMaterials={heavyBuildingMaterials}
                                   setHeavyBuildingMaterials={setHeavyBuildingMaterials}/>
                <ImageField chosenImage={chosenImage} setChosenImage={setChosenImage}/>
                <MapField address={address} perimeter={perimeter}/>
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
                                onClick={handleButton}
                                disabled={!address || !chosenImage}
                        >
                            <Typography variant={'h6'}>
                                {dictionary.button}
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default PlanInvestment;