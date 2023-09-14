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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, {AlertProps} from "@mui/material/Alert";

import ChevronRight from "@mui/icons-material/ChevronRight";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EnergyMeasuresAdd = () => {
    const {keycloak, initialized} = useKeycloak();
    const navigate = useNavigate()
    const [allowed, setAllowed] = useState(false)

    // Form values and errors
    const [code, setCode] = useState<String>('')
    const [codeError, setCodeError] = useState<boolean>(false)
    const [unit, setUnit] = useState<String>('')
    const [unitError, setUnitError] = useState<boolean>(false)
    const [lambda, setLambda] = useState<Number | ''>('')
    const [lambdaError, setLambdaError] = useState<boolean>(false)
    const [totalCost, setTotalCost] = useState<Number | ''>('')
    const [totalCostError, setTotalCostError] = useState<boolean>(false)
    const [description, setDescription] = useState<String>('')
    const [descriptionError, setDescriptionError] = useState<boolean>(false)

    // Values for snackbar
    const [additionSuccess, setAdditionSuccess] = useState<boolean>(false)
    const [additionFailure, setAdditionFailure] = useState<boolean>(false)

    const handleCloseSnackbar = () => {
        setAdditionSuccess(false)
        setAdditionFailure(false)
    }

    const handleFieldChange = (field: String, value: String) => {
        field === 'code' ? setCode(value) :
            field === 'unit' ? setUnit(value) :
                field === 'lambda' ? setLambda(Number(value)) :
                    field === 'totalCost' ? setTotalCost(Number(value)) :
                        setDescription(value)
    }

    const checkForm = () => {
        code === '' ? setCodeError(true) : void (0)
        unit === '' ? setUnitError(true) : void (0)
        lambda === '' ? setLambdaError(true) : void (0)
        totalCost === '' ? setTotalCostError(true) : void (0)
        description === '' ? setDescriptionError(true) : void (0)

        if (code !== '' && unit !== '' && lambda !== '' && totalCost !== '' && description !== '') {
            const payload = {
                unit,
                code,
                measure: description,
                energy_measure_id: 0,
                thickness: 0,
                labda: lambda,
                time_norm: 0,
                rate: 0,
                salary: 0,
                materials: 0,
                transport_mechanisms: 0,
                total_per_unit: 0,
                total_per_unit_with_profit: totalCost
            }

            axios.put('energy_measures_add', payload)
                .then(response => {
                    setCode('')
                    setUnit('')
                    setLambda('')
                    setTotalCost('')
                    setDescription('')

                    setAdditionSuccess(true)
                })
                .catch(error => {
                    setAdditionFailure(true)
                    console.log(error)
                })
        }
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
                                error={code === '' && codeError}
                                fullWidth
                                required
                                id="outlined-required"
                                label="Code"
                                value={code}
                                placeholder="Provide the code for the new measure"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                onChange={e => handleFieldChange('unit', e.target.value)}
                                error={unit === '' && unitError}
                                fullWidth
                                required
                                id="outlined-required"
                                label="Unit"
                                value={unit}
                                placeholder="Provide the unit for the new measure"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                onChange={e => handleFieldChange('lambda', e.target.value)}
                                error={lambda === '' && lambdaError}
                                type={'number'}
                                inputProps={{min: 0}}
                                fullWidth
                                required
                                id="outlined-required"
                                label="Lambda (λ)"
                                value={lambda}
                                placeholder="Provide the lambda (λ) (W/m/K) for the new measure"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                onChange={e => handleFieldChange('totalCost', e.target.value)}
                                error={totalCost === '' && totalCostError}
                                type={'number'}
                                inputProps={{min: 0}}
                                fullWidth
                                required
                                id="outlined-required"
                                label="Total cost"
                                value={totalCost}
                                placeholder="Provide the total cost per unit with profit for the new measure"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={e => handleFieldChange('description', e.target.value)}
                                error={description === '' && descriptionError}
                                fullWidth
                                required
                                id="outlined-required"
                                label="Description"
                                value={description}
                                placeholder="Provide a description for the new measure"
                            />
                        </Grid>
                        <Grid item xs={12} display={'flex'}>
                            <Button variant={'contained'} component={'span'} size={'medium'} color={'success'}
                                    sx={{ml: 'auto'}}
                                    endIcon={<ChevronRight/>}
                                    onClick={checkForm}
                            >
                                <Typography variant={'h6'}>
                                    SUBMIT
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Container>

                <Snackbar open={additionSuccess} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{width: '100%'}}>
                        The Energy Measure has been successfully added!
                    </Alert>

                </Snackbar>
                <Snackbar open={additionFailure} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="error" sx={{width: '100%'}}>
                        Something went wrong! Please try again.
                    </Alert>
                </Snackbar>
            </>
            }
        </>
    );
}

export default EnergyMeasuresAdd;