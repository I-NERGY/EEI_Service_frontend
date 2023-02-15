import React, {useState} from 'react';
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
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import Breadcrumb from "../components/layout/Breadcrumb";

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
        {id: 9, title: 'Facade insulation with stone wool', cost: 800, checked: false},
        {id: 10, title: 'Gas condensing boiler for the preparation of hot water', cost: 1800, checked: false},
    ]

    const [measuresListTemp, setMeasuresListTemp] = useState([...measuresList])

    const handleCostChange = (id: number, e: React.ChangeEvent<any>) => {
        let arrayTemp = measuresList.map(obj => {
            if (obj.id === id) {
                return {...obj, cost: e.target.value}
            }
            return obj
        })
        setMeasuresListTemp(arrayTemp)
    }

    const handleReset = () => {
        setEditSuccess(true)
        setMeasuresListTemp(measuresList)
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
                                        Energy Measure title
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <Typography fontWeight={'bold'} variant={'subtitle1'}>
                                        Cost
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {measuresListTemp.map(measure => (
                                <StyledTableRow key={measure.id}>
                                    <StyledTableCell component="th" scope="row">
                                        <Typography variant={'body1'}>{measure.title}</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <TextField
                                            onChange={e => handleCostChange(measure.id, e)}
                                            required
                                            fullWidth
                                            id="outlined-required"
                                            label="Change cost"
                                            type={'number'}
                                            InputProps={{
                                                inputProps: {min: 0},
                                                startAdornment: <InputAdornment position="start">€</InputAdornment>
                                            }}
                                            value={measure.cost}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Button size={'large'} variant="contained" color={'warning'}
                                                startIcon={<EditAttributesIcon/>} disabled={!measure.cost}>
                                            SAVE
                                        </Button>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Button size={'large'} variant="contained" color={'success'}
                                                startIcon={<RestartAltIcon/>} onClick={handleReset}>
                                            RESET
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

            <Snackbar open={editSuccess} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Energy Measure cost has been successfully changed!
                </Alert>

            </Snackbar>
            <Snackbar open={editFailure} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    Something went wrong! Please try again.
                </Alert>
            </Snackbar>
        </>
    );
}

export default EnergyMeasuresEdit;