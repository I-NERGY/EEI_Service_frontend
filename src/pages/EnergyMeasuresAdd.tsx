import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import Breadcrumb from "../components/layout/Breadcrumb";
import Button from "@mui/material/Button";
import ChevronRight from "@mui/icons-material/ChevronRight";

const EnergyMeasuresAdd = () => {
    const {keycloak, initialized} = useKeycloak();
    const navigate = useNavigate()
    const [allowed, setAllowed] = useState(false)

    // Form values and errors
    const [code, setCode] = useState<String>('')
    const [codeError, setCodeError] = useState(false)
    const [unit, setUnit] = useState<String>('')
    const [unitError, setUnitError] = useState(false)
    const [lambda, setLambda] = useState<String>('')
    const [lambdaError, setLambdaError] = useState(false)
    const [totalCost, setTotalCost] = useState<String>('')
    const [totalCostError, setTotalCostError] = useState(false)
    const [description, setDescription] = useState<String>('')
    const [descriptionError, setDescriptionError] = useState(false)

    const handleFieldChange = (field: String, value: String) => {
        field === 'code' ? setCode(value) :
            field === 'unit' ? setUnit(value) :
                field === 'lambda' ? setLambda(value) :
                    field === 'totalCost' ? setTotalCost(value) :
                        setDescription(value)
    }

    const breadcrumbs = [
        <Link className={'breadcrumbLink'} key="1" to="/">
            Homepage
        </Link>,
        <Link className={'breadcrumbLink'} key="1" to="/energy-measures/edit">
            Energy Measures Admin page
        </Link>,
        <Typography
            key={2}
            color="secondary"
            fontSize={'20px'}
            fontWeight={600}>
            Energy Measures Addition
        </Typography>,
    ];

    useEffect(() => {
        if (initialized) {
            let roles = keycloak?.realmAccess?.roles
            if (roles?.includes('inergy_admin')) {
                setAllowed(true)
            } else navigate('/')
        }
    }, [initialized])

    return (
        <>
            {allowed && <>
                <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={'Energy Efficiency Investment De-Risking'}/>
                <Container maxWidth={'xl'} sx={{my: 5}}>
                    <Typography variant={'h4'} fontWeight={'bold'} sx={{mb: 3}}>Provide new measure's data</Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                            <TextField
                                onChange={e => handleFieldChange('code', e.target.value)}
                                fullWidth
                                required
                                id="outlined-required"
                                label="Code"
                                placeholder="Provide the code for the new measure"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                onChange={e => handleFieldChange('unit', e.target.value)}
                                fullWidth
                                required
                                id="outlined-required"
                                label="Unit"
                                placeholder="Provide the unit for the new measure"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                onChange={e => handleFieldChange('lambda', e.target.value)}
                                fullWidth
                                required
                                id="outlined-required"
                                label="Lambda (λ)"
                                placeholder="Provide the lambda (λ) (W/m/K) for the new measure"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                onChange={e => handleFieldChange('totalCost', e.target.value)}
                                fullWidth
                                required
                                id="outlined-required"
                                label="Total cost"
                                placeholder="Provide the total cost per unit with profit for the new measure"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={e => handleFieldChange('description', e.target.value)}
                                fullWidth
                                required
                                id="outlined-required"
                                label="Description"
                                placeholder="Provide a description for the new measure"
                            />
                        </Grid>
                        <Grid item xs={12} display={'flex'}>
                            <Button variant={'contained'} component={'span'} size={'medium'} color={'success'}
                                    sx={{ml: 'auto'}}
                                    endIcon={<ChevronRight/>}
                                // onClick={handleButton}
                                // disabled={!address || !chosenImage}
                            >
                                <Typography variant={'h6'}>
                                    SUBMIT
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>

                </Container>

            </>
            }
        </>
    );
}

export default EnergyMeasuresAdd;