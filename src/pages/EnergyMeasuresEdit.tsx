import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {styled} from '@mui/material/styles';

import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from '@mui/material/Button';
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import Box from "@mui/material/Box";

import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import Breadcrumb from "../components/layout/Breadcrumb";
import Loading from "../components/layout/Loading";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const breadcrumbs = [
    <Link key={1} fontSize={'20px'} underline="hover" color="inherit" href="/">
        Dashboard
    </Link>, <Typography
        key={2}
        color="secondary"
        fontSize={'20px'}
        fontWeight={600}>
        Energy Measures Admin page
    </Typography>,];

const EnergyMeasuresEdit = () => {
    const [editSuccess, setEditSuccess] = useState(false)
    const [editFailure, setEditFailure] = useState(false)

    const handleCloseSnackbar = () => {
        setEditSuccess(false)
        setEditFailure(false)
    }

    const [measuresList, setMeasuresList] = useState<any[]>([])
    const [measuresListTemp, setMeasuresListTemp] = useState([...measuresList])

    useEffect(() => {
        axios.get('energy_measures')
            .then(response => {
                setMeasuresList(response.data)
                setMeasuresListTemp(response.data)
            })
    }, [])

    const handleCostChange = (id: number, e: React.ChangeEvent<any>) => {
        let arrayTemp = measuresList.map(obj => {
            if (obj.energy_measure_id === id) {
                return {...obj, total_per_unit: e.target.value}
            }
            return obj
        })
        setMeasuresListTemp(arrayTemp)
    }

    const handleReset = (id: number) => {
        setEditSuccess(true)
        let arrayTemp = measuresListTemp
        arrayTemp[id].total_per_unit = measuresList[id].total_per_unit
        setMeasuresListTemp(arrayTemp)
    }

    // TODO Finalize
    const handleSave = (id: number) => {
        let payload = {

        }
        axios.put(`energy_measures/${id}`, payload)
            .then(response => {

            })
    }

    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={'Energy Efficiency Investment De-Risking'}/>
            <Container maxWidth={'xl'} sx={{my: 5}}>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 700}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>
                                    <Typography fontWeight={'bold'} variant={'subtitle1'}>
                                        Code
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <Typography fontWeight={'bold'} variant={'subtitle1'}>
                                        Place
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <Typography fontWeight={'bold'} variant={'subtitle1'}>
                                        Total cost per unit
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell align="right">{void (0)}</StyledTableCell>
                                <StyledTableCell align="right">{void (0)}</StyledTableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {measuresListTemp.length > 0 && measuresListTemp.map(measure => (
                                <StyledTableRow key={measure.energy_measure_id}>
                                    <StyledTableCell component="th" scope="row">
                                        <Typography variant={'body1'}>{measure.code}</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        <Typography variant={'body1'}>{measure.place}</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <TextField
                                            onChange={e => handleCostChange(measure.energy_measure_id, e)}
                                            required
                                            fullWidth
                                            id="outlined-required"
                                            label="Change cost"
                                            type={'number'}
                                            InputProps={{
                                                inputProps: {min: 0},
                                                startAdornment: <InputAdornment position="start">€</InputAdornment>
                                            }}
                                            value={measure.total_per_unit}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Button size={'large'} variant="contained" color={'warning'}
                                                onClick={() => handleSave(measure.energy_measure_id)}
                                                startIcon={<EditAttributesIcon/>} disabled={!measure.total_per_unit}>
                                            SAVE
                                        </Button>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Button size={'large'} variant="contained" color={'success'}
                                                startIcon={<RestartAltIcon/>}
                                                onClick={() => handleReset(measure.energy_measure_id)}>
                                            RESET
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {measuresListTemp.length < 1 &&
                    <Box justifyContent={'center'} alignItems={'center'} p={5}>
                        <Loading/>
                    </Box>}
            </Container>

            <Snackbar open={editSuccess} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{width: '100%'}}>
                    Energy Measure cost has been successfully changed!
                </Alert>

            </Snackbar>
            <Snackbar open={editFailure} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{width: '100%'}}>
                    Something went wrong! Please try again.
                </Alert>
            </Snackbar>
        </>
    );
}

export default EnergyMeasuresEdit;