import React from 'react';
import {useParams} from 'react-router-dom'

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// import {handleEnergyClass, handleUColor} from "../../utils";

import {handleEnergyClass} from "../../utils";
import Loading from "../layout/Loading";

interface Props {
    energyClass: string,
    energyConsumption: number | null
}

const InvestmentSelectQuickInfo = ({energyClass, energyConsumption}: Props) => {
    const {id} = useParams()
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary className={'fancyBackground'}
                                  expandIcon={<ExpandMoreIcon sx={{color: 'white'}}/>}
                                  aria-controls="panel1bh-content"
                                  id="panel1bh-header"
                >
                    <Typography sx={{flexShrink: 0, my: 'auto'}} variant={'h4'} color={'white'}>
                        General information
                    </Typography>
                    <Typography color={'white'} sx={{display: {xs: 'none', md: 'block'}, ml: 'auto', my: 'auto'}}>
                        {expanded === 'panel1' ? '' : 'Click for details'}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{mt: 2}}>
                    {(energyClass && energyConsumption) ?
                        <Grid container display={'flex'} spacing={5}>
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
                                <Typography variant={'h3'} my={'auto'}>{energyConsumption} kWh</Typography>
                            </Grid>
                        </Grid> :
                        <Loading/>
                    }
                </AccordionDetails>
            </Accordion>
        </>
    );
}

export default InvestmentSelectQuickInfo;