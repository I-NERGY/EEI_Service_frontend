import React, {useContext, useEffect, useState} from 'react';
import {LanguageContext} from "../../context/LanguageContext";
import {multilingual} from "../../multilingual";
import {useParams} from "react-router-dom";
import axios from 'axios'

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {handleEnergyClass} from "../../utils";
import Loading from "../layout/Loading";
import InvestmentSelectQuickInfoBarChart from "./InvestmentSelectQuickInfoBarChart";
import InvestmentSelectQuickInfoPieChart from "./InvestmentSelectQuickInfoPieChart";

interface Props {
    energyClass: string,
    energyConsumption: number | null
}

const InvestmentSelectQuickInfo = ({energyClass, energyConsumption}: Props) => {
    const {id} = useParams()
    const {language} = useContext(LanguageContext)
    const dictionary = language === 'en' ? multilingual.english.selectInvestment : multilingual.latvian.selectInvestment

    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [barChartLabels, setBarChartLabels] = useState([])
    const [barChartData, setBarChartData] = useState([])
    const [barChartValue, setBarChartValue] = useState()

    const [pieChartLabels, setPieChartLabels] = useState([])
    const [pieChartData, setPieChartData] = useState([])

    useEffect(() => {
        axios.get(`/visualizations/district_heating_data/${id}`)
            .then(response => {
                setBarChartData(response.data.data)
                setBarChartLabels(response.data.labels)
                setBarChartValue(response.data.value)
            })
            .catch(() => console.log('Something went wrong.'))

        axios.get(`/visualizations/heat_loses/${id}`)
            .then(response => {
                setPieChartData(response.data.data)
                setPieChartLabels(response.data.labels)
            })
            .catch(() => console.log('Something went wrong.'))
    }, [])

    return (
        <>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary className={'fancyBackground'}
                                  expandIcon={<ExpandMoreIcon sx={{color: 'white'}}/>}
                                  aria-controls="panel1bh-content"
                                  id="panel1bh-header"
                >
                    <Typography sx={{flexShrink: 0, my: 'auto'}} variant={'h4'} color={'white'}>
                        {dictionary.general}
                    </Typography>
                    <Typography color={'white'} sx={{display: {xs: 'none', md: 'block'}, ml: 'auto', my: 'auto'}}>
                        {expanded === 'panel1' ? '' : dictionary.clickDetails}
                    </Typography>
                </AccordionSummary>

                <AccordionDetails sx={{mt: 2}}>
                    {(energyClass && energyConsumption) ?
                        <Grid container display={'flex'} spacing={5}>
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
                                    {dictionary.totalConsumption}
                                </Typography>
                                <Typography variant={'h3'} my={'auto'}>{energyConsumption} kWh</Typography>
                            </Grid>
                            {barChartData.length > 0 &&
                                <Grid item xs={12} md={6} display={'flex'} flexDirection={'column'}
                                      alignItems={'center'}>
                                    <InvestmentSelectQuickInfoBarChart chartData={barChartData}
                                                                       labels={barChartLabels}
                                                                       value={barChartValue}
                                    />
                                </Grid>}
                            <Grid item xs={12} md={6} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                <InvestmentSelectQuickInfoPieChart chartData={pieChartData}
                                                                   labels={pieChartLabels}/>
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