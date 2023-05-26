import React from 'react';
import {useNavigate} from "react-router-dom";
import {handleEnergyClass, handleUColor} from "../../utils";

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

    return (
        <>
            <Stack direction={'row'} sx={{mt: 2}}>
                <Typography variant={'h4'} sx={{py: 0}} flexGrow={1}>Expected Results</Typography>
                <Typography variant={'h5'}>Total cost: {totalCost}€</Typography>
            </Stack>

            <Divider/>

            <Grid container display={'flex'} spacing={5} sx={{py: 3}}>
                <Grid item xs={12} md={6} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Typography variant={'h5'} sx={{mb: 'auto'}} fontWeight={'bold'} align={'center'}>Energy
                        Class</Typography>
                    <div className="energy-class" style={{marginTop: '10px'}}>
                        <span className="classAPlusPlus">A<sup>++</sup></span>
                        <span className="classAPlus">A<sup>+</sup></span>
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
                    <Typography variant={'h5'} sx={{mb: 'auto'}} fontWeight={'bold'} align={'center'}>Total
                        Energy Consumption:</Typography>
                    <Typography variant={'h3'} my={'auto'} align={'center'}>{energyConsumption} kWh</Typography>
                </Grid>
            </Grid>
            <Divider/>
            <Stack direction={'row'} sx={{mt: 2}}>
                <Typography variant={'h6'} flexGrow={1}>Want to try other measures?</Typography>
                <Button variant="contained" color="success" sx={{mx: 1}} onClick={() => handleClose()}>
                    Yes, try other measures.
                </Button>
                <Button variant="outlined" color="error" onClick={() => navigate('/building-info')}>
                    No, back to service page.
                </Button>
            </Stack>
        </>
    );
}

export default InvestmentExpectedResults;