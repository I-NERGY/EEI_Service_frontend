import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {handleEnergyClass} from "../../utils";
import {LanguageContext} from "../../context/LanguageContext";
import {multilingual} from "../../multilingual";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";


interface Props {
    energyClass: string,
    energyConsumption: number,
    totalCost: number,
    handleClose: Function
}

const InvestmentExpectedResults = ({energyClass, energyConsumption, totalCost, handleClose}: Props) => {
    let navigate = useNavigate();
    const {language} = useContext(LanguageContext);
    const dictionary = language === 'en' ? multilingual.english.selectInvestment : multilingual.latvian.selectInvestment;

    return (
        <>
            <Stack direction={'row'} sx={{mt: 2}}>
                <Typography variant={'h4'} sx={{py: 0}} flexGrow={1}>{dictionary.expected}</Typography>
                <Typography variant={'h5'}>{dictionary.totalCost}: {totalCost.toFixed(2)}€</Typography>
            </Stack>

            <Divider/>

            <Grid container display={'flex'} spacing={5} sx={{py: 3}}>
                <Grid item xs={12} md={6} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Typography variant={'h5'} sx={{mb: 'auto'}} fontWeight={'bold'} align={'center'}>
                        {dictionary.energyClass}
                    </Typography>
                    <div className="energy-class" style={{marginTop: '10px'}}>
                        {/*<span className="classAPlusPlus">A<sup>++</sup></span>*/}
                        {/*<span className="classAPlus">A<sup>+</sup></span>*/}
                        <span className="classA">A</span>
                        <span className="classB">B</span>
                        <span className="classC">C</span>
                        <span className="classD">D</span>
                        <span className="classE">E</span>
                        <div style={{marginLeft: '15px'}} className={handleEnergyClass(energyClass)}></div>
                    </div>
                </Grid>
                {/*<Grid item xs={12} md={4} display={'flex'} flexDirection={'column'} alignItems={'center'}>*/}
                {/*    <Typography variant={'h5'} sx={{mb: 'auto'}} fontWeight={'bold'} align={'center'}>Thermal*/}
                {/*        Transmittance (U)</Typography>*/}
                {/*    <Typography variant={'h3'} my={'auto'}*/}
                {/*                color={() => handleUColor(thermalTransmittance)}>{thermalTransmittance}</Typography>*/}
                {/*</Grid>*/}
                <Grid item xs={12} md={6} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Typography variant={'h5'} sx={{mb: 'auto'}} fontWeight={'bold'} align={'center'}>
                        {dictionary.totalConsumption}:
                    </Typography>
                    <Typography variant={'h3'} my={'auto'} align={'center'}>{energyConsumption} kWh</Typography>
                </Grid>
            </Grid>
            <Divider/>
            <Stack direction={'row'} sx={{mt: 2}}>
                <Typography variant={'h6'} flexGrow={1}>{dictionary.tryOther}</Typography>
                <Button variant="contained" color="success" sx={{mx: 1}} onClick={() => handleClose()}>
                    {dictionary.yesModal}
                </Button>
                <Button variant="outlined" color="error" onClick={() => navigate('/building-info')}>
                    {dictionary.noModal}
                </Button>
            </Stack>
        </>
    );
}

export default InvestmentExpectedResults;