import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {styled} from '@mui/material/styles';
import {Link, useNavigate} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";

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
import TablePagination from '@mui/material/TablePagination';
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
    <Link className={'breadcrumbLink'} key="1" to="/">
        Homepage
    </Link>, <Typography
        key={2}
        color="secondary"
        fontSize={'20px'}
        fontWeight={600}>
        Energy Measures Admin page
    </Typography>,];

const EnergyMeasuresEdit = () => {
    const {keycloak, initialized} = useKeycloak();
    const navigate = useNavigate();
    const [allowed, setAllowed] = useState(false)

    const [editSuccess, setEditSuccess] = useState(false)
    const [editFailure, setEditFailure] = useState(false)

    const handleCloseSnackbar = () => {
        setEditSuccess(false)
        setEditFailure(false)
    }

    const [measuresList, setMeasuresList] = useState<any[]>([])
    const [measuresListTemp, setMeasuresListTemp] = useState([...measuresList])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (initialized) {
            let roles = keycloak?.realmAccess?.roles
            if (roles?.includes('inergy_admin')) {
                setAllowed(true)
                setLoading(true)
                axios.get('energy_measures')
                    .then(response => {
                        console.log(response.data[0])
                        setMeasuresList(response.data)
                        setMeasuresListTemp(response.data)
                        setLoading(false)
                    })
            } else navigate('/')
        }
    }, [initialized])

    const handleFieldChange = (id: number, field: string, e: React.ChangeEvent<any>) => {
        let arrayTemp = measuresListTemp.map(obj => {
            if (obj.code === id) {
                return {...obj, [field]: e.target.value}
            }
            return obj
        })
        setMeasuresListTemp(arrayTemp)
    }

    const handleReset = (id: number) => {
        setEditSuccess(true)
        let arrayTemp = measuresListTemp
        arrayTemp[id] = measuresList[id]
        setMeasuresListTemp(arrayTemp)
    }


    // TODO Finalize
    const handleSave = (id: number) => {
        setLoading(true)
        // TODO Implement functionality in the back end
        axios.put(`energy_measures/${id}`, measuresListTemp[id])
            .then(response => {
                console.log(response.data)
                setLoading(false)
                setEditSuccess(true)
                let arrayTemp = [...measuresList]
                arrayTemp[id] = response.data
                setMeasuresList([...arrayTemp])
                // setMeasuresList(response.data)
            })
            .catch(error => {
                // TODO Check if this works properly
                setMeasuresListTemp([...measuresList])
                setEditFailure(true)
            })
    }

    // Table pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            {allowed && <>
                <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={'Energy Efficiency Investment De-Risking'}/>
                {<Container maxWidth={false} sx={{my: 5}}>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={measuresListTemp.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
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
                                            Unit
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Typography fontWeight={'bold'} variant={'subtitle1'}>
                                            Lambda (λ) (W/m/K)
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Typography fontWeight={'bold'} variant={'subtitle1'}>
                                            Time Norm (c*h)
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Typography fontWeight={'bold'} variant={'subtitle1'}>
                                            Rate (€/h)
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Typography fontWeight={'bold'} variant={'subtitle1'}>
                                            Salary (€)
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Typography fontWeight={'bold'} variant={'subtitle1'}>
                                            Materials (€)
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Typography fontWeight={'bold'} variant={'subtitle1'}>
                                            Transport Mechanisms (€)
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Typography fontWeight={'bold'} variant={'subtitle1'}>
                                            Total cost per unit (€)
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Typography fontWeight={'bold'} variant={'subtitle1'}>
                                            Total per unit with profit (€)
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{void (0)}</StyledTableCell>
                                    <StyledTableCell align="right">{void (0)}</StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {measuresListTemp.length > 0 && measuresListTemp
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(measure => (
                                        <StyledTableRow key={measure.code}>
                                            <StyledTableCell component="th" scope="row">
                                                <Typography variant={'body1'}>{measure.code}</Typography>
                                            </StyledTableCell>
                                            <StyledTableCell component="th" scope="row">
                                                <Typography variant={'body1'}>{measure.unit}</Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                <TextField
                                                    onChange={e => handleFieldChange(measure.code, 'labda', e)}
                                                    required
                                                    fullWidth
                                                    id="outlined-required"
                                                    label="Change lambda"
                                                    type={'number'}
                                                    // InputProps={{
                                                    //     inputProps: {min: 0},
                                                    //     startAdornment: <InputAdornment
                                                    //         position="start">(W/m/K)</InputAdornment>
                                                    // }}
                                                    value={measure.labda || 0}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                <TextField
                                                    onChange={e => handleFieldChange(measure.code, 'time_norm', e)}
                                                    required
                                                    fullWidth
                                                    id="outlined-required"
                                                    label="Change Time Norm"
                                                    type={'number'}
                                                    // InputProps={{
                                                    //     inputProps: {min: 0},
                                                    //     startAdornment: <InputAdornment
                                                    //         position="start">(c*h)</InputAdornment>
                                                    // }}
                                                    value={measure.time_norm}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                <TextField
                                                    onChange={e => handleFieldChange(measure.code, 'rate', e)}
                                                    required
                                                    fullWidth
                                                    id="outlined-required"
                                                    label="Change rate"
                                                    type={'number'}
                                                    // InputProps={{
                                                    //     inputProps: {min: 0},
                                                    //     startAdornment: <InputAdornment
                                                    //         position="start">(€/h)</InputAdornment>
                                                    // }}
                                                    value={measure.rate}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                <TextField
                                                    onChange={e => handleFieldChange(measure.code, 'salary', e)}
                                                    required
                                                    fullWidth
                                                    id="outlined-required"
                                                    label="Change salary"
                                                    type={'number'}
                                                    // InputProps={{
                                                    //     inputProps: {min: 0},
                                                    //     startAdornment: <InputAdornment
                                                    //         position="start">(€)</InputAdornment>
                                                    // }}
                                                    value={measure.salary}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                <TextField
                                                    onChange={e => handleFieldChange(measure.code, 'materials', e)}
                                                    required
                                                    fullWidth
                                                    id="outlined-required"
                                                    label="Change materials"
                                                    type={'number'}
                                                    // InputProps={{
                                                    //     inputProps: {min: 0},
                                                    //     startAdornment: <InputAdornment
                                                    //         position="start">(€)</InputAdornment>
                                                    // }}
                                                    value={measure.materials}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                <TextField
                                                    onChange={e => handleFieldChange(measure.code, 'transport_mechanisms', e)}
                                                    required
                                                    fullWidth
                                                    id="outlined-required"
                                                    label="Change transport mechanisms"
                                                    type={'number'}
                                                    // InputProps={{
                                                    //     inputProps: {min: 0},
                                                    //     startAdornment: <InputAdornment
                                                    //         position="start">(€)</InputAdornment>
                                                    // }}
                                                    value={measure.transport_mechanisms}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                <TextField
                                                    onChange={e => handleFieldChange(measure.code, 'total_per_unit', e)}
                                                    required
                                                    fullWidth
                                                    id="outlined-required"
                                                    label="Change total per unit"
                                                    type={'number'}
                                                    // InputProps={{
                                                    //     inputProps: {min: 0},
                                                    //     startAdornment: <InputAdornment
                                                    //         position="start">(€)</InputAdornment>
                                                    // }}
                                                    value={measure.total_per_unit}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                <TextField
                                                    onChange={e => handleFieldChange(measure.code, 'total_per_unit_with_profit', e)}
                                                    required
                                                    fullWidth
                                                    id="outlined-required"
                                                    label="Change total per unit with profit"
                                                    type={'number'}
                                                    // InputProps={{
                                                    //     inputProps: {min: 0},
                                                    //     startAdornment: <InputAdornment
                                                    //         position="start">(€)</InputAdornment>
                                                    // }}
                                                    value={measure.total_per_unit_with_profit}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                <Button size={'small'} variant="contained" color={'warning'}
                                                        onClick={() => handleSave(measure.energy_measure_id)}
                                                        startIcon={<EditAttributesIcon/>}
                                                        disabled={!measure.total_per_unit}>
                                                    SAVE
                                                </Button>
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                <Button size={'small'} variant="contained" color={'success'}
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
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={measuresListTemp.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    {loading &&
                        <Box justifyContent={'center'} alignItems={'center'} p={5}>
                            <Loading/>
                        </Box>}
                </Container>}

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
            </>}
        </>
    );
}

export default EnergyMeasuresEdit;