import React, {useEffect, useState} from 'react';

import Link from "@mui/material/Link";
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
    <Link key={1} fontSize={'20px'} underline="hover" color="inherit" href="/">
        Dashboard
    </Link>,
    <Link key={1} fontSize={'20px'} underline="hover" color="inherit" href="/servicePath">
        Building Information
    </Link>, <Typography
        key={2}
        color="secondary"
        fontSize={'20px'}
        fontWeight={600}>
        Energy Measures Investment Choices
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
    const measuresList = [
        {id: 0, title: 'Gas condensing boiler', cost: 14000, checked: false},
        {id: 1, title: '2-Pane window', cost: 220, checked: false},
        {id: 2, title: 'Assembly of internal wall vacuum insulation panels', cost: 148, checked: false},
        {id: 3, title: 'Attic insulation with bulk stone wool', cost: 50, checked: false},
        {id: 4, title: 'Attic insulation with ECO wool', cost: 60, checked: false},
        {id: 5, title: 'Building connection to local heat network', cost: 18000, checked: false},
        {id: 6, title: 'Construction of a two-pipe system', cost: 40000, checked: false},
        {id: 7, title: 'Entrance doors', cost: 300, checked: false},
        {id: 8, title: 'Facade insulation with polystyrene foam', cost: 1000, checked: false},
        // {id: 9, title: 'Facade insulation insulation with stone wool', cost: 800, checked: false},
        // {id: 10, title: 'Gas condensing boiler for the preparation of hot water', cost: 1800, checked: false},
        // {id: 11, title: 'Installation of allocators', cost: 9800, checked: false},
        // {id: 12, title: 'Insulation of the basement cover with stone wool', cost: 500, checked: false},
        // {id: 13, title: 'Insulation of the plinth with polystyrene foam', cost: 3500, checked: false},
        // {id: 14, title: 'Insulation of the plinth with polyurethane', cost: 4000, checked: false},
        // {id: 15, title: 'Pipeline insulation', cost: 5600, checked: false},
        // {id: 16, title: 'Replacement of heating elements', cost: 21000, checked: false},
        // {id: 17, title: 'Roof insulation with polystyrene foam', cost: 6000, checked: false},
        // {id: 18, title: 'Roof insulation with stone wool', cost: 8900, checked: false},
        // {id: 19, title: 'Solar collectors for hot water preparation', cost: 7000, checked: false},
        // {id: 20, title: 'FSolar panels', cost: 8800, checked: false},
    ]

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [loadingModal, setLoadingModal] = useState<boolean>(false)

    const [measuresCurrent, setMeasuresCurrent] = useState<Measure[] | []>([...measuresList])

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
        console.log(measuresChosen)
    }

    const handleClose = () => {
        setOpenModal(false)
    }

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
                        <InvestmentExpectedResults energyClass={'classA'} thermalTransmittance={1.9}
                                                   energyConsumption={500} totalCost={totalCost} handleClose={handleClose}/>}
                </Box>
            </Modal>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={'Energy Efficiency Investment De-Risking'}/>
            <Container maxWidth={'xl'} sx={{my: 5}}>
                <InvestmentSelectQuickInfo energyClass={'classD'} thermalTransmittance={1.9}
                                           energyConsumption={500}/>
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
                            <Typography variant={'h6'}>PLACEHOLDER</Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default InvestmentSelect;