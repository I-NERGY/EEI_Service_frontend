import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom'
import axios from 'axios';

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Stack from "@mui/material/Stack";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import Breadcrumb from "../components/layout/Breadcrumb";
import InvestmentSelectQuickInfo from "../components/InvestmentSelect/InvestmentSelectQuickInfo";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ChevronRight from "@mui/icons-material/ChevronRight";
import InvestmentExpectedResults from "../components/InvestmentSelect/InvestmentExpectedResults";
import Loading from "../components/layout/Loading";

const breadcrumbs = [
    <Link className={'breadcrumbLink'} key="1" to="/">
        Homepage
    </Link>,
    <Link key={1} className={'breadcrumbLink'} to="/building-info">
        Building Information
    </Link>, <Typography
        key={2}
        color="secondary"
        fontSize={'20px'}
        fontWeight={600}>
        Virtual EPC & Innovation Measures
    </Typography>,];

interface Measure {
    id: number,
    title: string,
    cost: number,
    checked: boolean
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    minWidth: '350px',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};

const InvestmentSelect = () => {
    const {id} = useParams()

    const [measuresList, setMeasuresList] = useState<Measure[] | []>([])
    const [measuresCurrent, setMeasuresCurrent] = useState<Measure[] | []>([...measuresList])

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [loadingModal, setLoadingModal] = useState<boolean>(false)

    const [energyClass, setEnergyClass] = useState('')
    const [thermalTransmittance, setThermalTransmittance] = useState(null)
    const [energyConsumption, setEnergyConsumption] = useState(null)


    const [measuresChosen, setMeasuresChosen] = useState<Measure[] | []>([])
    const [totalCost, setTotalCost] = useState<number | 0>(0)

    const handleChange = (measure: Measure) => {
        measuresCurrent[measure.id].checked = ! measuresCurrent[measure.id].checked

        const result = measuresCurrent.filter(measure => {
            return measure.checked
        })
        setMeasuresChosen([...result])

        let cost = 0
        for (let i = 0; i < result.length; i++) {
            cost += result[i].cost
        }
        setTotalCost(cost)
    }

    const handleSubmit = () => {
        setOpenModal(true)
        setLoadingModal(true)

        setTimeout(() => setLoadingModal(false), 2000)
    }

    const handleClose = () => {
        setOpenModal(false)
    }

    useEffect(() => {
        axios.get(`building/info/${id}`)
            .then(response => {
                setEnergyClass(`class${response.data.energy_class}`)
                setThermalTransmittance(response.data.thermal_transmittance)
                setEnergyConsumption(response.data.total_energy_consumption)
            })

        axios.get(`energy_measures/${id}`)
            .then(response => {
                setMeasuresList(response.data)
                setMeasuresCurrent(response.data)
            })
    }, [])

    return (
        <>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {loadingModal ? <Loading/> :
                        <InvestmentExpectedResults energyClass={'classAPlus'} thermalTransmittance={0.8}
                                                   energyConsumption={380} totalCost={totalCost} handleClose={handleClose}/>}
                </Box>
            </Modal>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={'Energy Efficiency Investment De-Risking'}/>
            <Container maxWidth={'xl'} sx={{my: 5}}>
                <InvestmentSelectQuickInfo energyClass={energyClass} thermalTransmittance={thermalTransmittance}
                                           energyConsumption={energyConsumption}/>
            </Container>

            <Container maxWidth={'xl'} sx={{my: 5}}>
                <Stack direction={'row'}>
                    <Typography variant={'h4'} fontWeight={'bold'} sx={{mb: 3, flexGrow: 1}}>Energy Efficiency
                        Measures</Typography>
                    <Typography variant={'h5'} fontWeight={'bold'} sx={{mb: 3}}>Total Cost: {totalCost}€</Typography>
                </Stack>

                <Grid container spacing={2}>
                    {measuresList.map(measure =>
                        <Grid item xs={12} md={4} key={measure.id}>
                            <FormControl component="fieldset">
                                <FormGroup aria-label="position" row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={measuresCurrent[measure.id]?.checked}
                                                onChange={() => handleChange(measure)}
                                                sx={{
                                                    color: '#ACBF5D',
                                                    '&.Mui-checked': {
                                                        color: '#ACBF5D',
                                                    },
                                                }}
                                            />}
                                        label={<Typography>{measure.title} (<span
                                            style={{fontWeight: 'bold'}}>{measure.cost}€</span>)</Typography>}
                                        labelPlacement="end"
                                    />
                                </FormGroup>
                            </FormControl>
                        </Grid>
                    )}
                </Grid>
            </Container>

            <Divider/>

            <Container maxWidth={'xl'} sx={{my: 5}}>
                <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Grid item xs={12} md={6}></Grid>
                    <Grid item xs={12} md={6} display={'flex'}>
                        <Button variant={'contained'} component={'span'} size={'large'} color={'warning'}
                                sx={{ml: 'auto'}} fullWidth
                                endIcon={<ChevronRight/>}
                                onClick={handleSubmit}
                                disabled={measuresChosen.length < 1}
                        >
                            <Typography variant={'h6'}>CALCULATE</Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default InvestmentSelect;