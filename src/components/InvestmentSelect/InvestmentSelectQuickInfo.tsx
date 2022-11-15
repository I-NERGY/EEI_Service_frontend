import React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props {
    energyClass: string,
    thermalTransmittance: number,
    energyConsumption: number
}

const InvestmentSelectQuickInfo = ({energyClass, thermalTransmittance, energyConsumption}: Props) => {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const handleColor = (value: number) => {
        if (value < 1.4) return '#63AA5A'
        if (value >= 1.4 && value < 2) return '#FBB900'
        if (value >= 2 && value < 2.2) return '#FB8800'
        if (value >= 2.2) return '#E30613'
    }

    const handleClass = (className: string) => {
        if (className === 'classAPlusPlus') return 'classAPlusPlusSelected'
        if (className === 'classAPlus') return 'classAPlusSelected'
        if (className === 'classA') return 'classASelected'
        if (className === 'classB') return 'classBSelected'
        if (className === 'classC') return 'classCSelected'
        if (className === 'classD') return 'classDSelected'
        if (className === 'classE') return 'classESelected'
    }

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
                    <Grid container display={'flex'} spacing={5}>
                        <Grid item xs={12} md={4} display={'flex'} flexDirection={'column'} alignItems={'center'}>
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
                                <div style={{marginLeft: '15px'}} className={handleClass(energyClass)}></div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                            <Typography variant={'h5'} sx={{mb: 'auto'}} fontWeight={'bold'} align={'center'}>Thermal
                                Transmittance (U)</Typography>
                            <Typography variant={'h3'} my={'auto'}
                                        color={() => handleColor(thermalTransmittance)}>{thermalTransmittance}</Typography>
                        </Grid>
                        <Grid item xs={12} md={4} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                            <Typography variant={'h5'} sx={{mb: 'auto'}} fontWeight={'bold'} align={'center'}>Total
                                Energy Consumption:</Typography>
                            <Typography variant={'h3'} my={'auto'}>{energyConsumption} kWh</Typography>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </>
    );
}

export default InvestmentSelectQuickInfo;