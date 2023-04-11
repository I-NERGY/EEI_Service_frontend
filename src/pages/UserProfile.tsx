import React, {useState} from "react";
import {styled} from '@mui/material/styles';

import useAuthContext from "../hooks/useAuthContext";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';

import Breadcrumb from "../components/layout/Breadcrumb";
import {Link} from "react-router-dom";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#333',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 18,
    },
    fontSize: '20px',
    paddingTop: '18px',
    paddingBottom: '18px',
    fontWeight: '100',
    borderBottom: '1px solid #ccc'
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

const UserProfile = () => {
    const {user} = useAuthContext()
    const roles = localStorage.getItem('roles')?.split(',')
    const [firstName, setFirstName] = useState<string | ''>('')
    const [lastName, setLastName] = useState<string | ''>('')
    const [email, setEmail] = useState<string | ''>('')
    const [userID, setUserID] = useState<string | ''>('')
    // const [roles, setRoles] = useState([])
    const [attributes, setAttributes] = useState<string[] | []>([])

    const [infoLoading, setInfoLoading] = useState<boolean>(false)
    const [rolesLoading, setRolesLoading] = useState<boolean>(false)
    const [attributesLoading, setAttributesLoading] = useState<boolean>(false)

    const [userInfoExpanded, setUserInfoExpanded] = useState<boolean>(true)
    const [rolesExpanded, setRolesExpanded] = useState<boolean>(false)
    const [attributesExpanded, setAttributesExpanded] = useState<boolean>(false)

    // Get user info on first load
    // useEffect(() => {
    //     setInfoLoading(true)
    //     axios.get(`/user/get/username/${auth.username}`)
    //         .then(response => {
    //             if (response.data.attributes) {
    //                 setAttributes(Object.entries(response.data.attributes))
    //             }
    //             setFirstName(response.data.firstName)
    //             setLastName(response.data.lastName)
    //             setEmail(response.data.email)
    //             setUserID(response.data.id)
    //             setInfoLoading(false)
    //
    //         })
    //         .catch(error => {
    //             setInfoLoading(false)
    //             console.log(error)
    //         })
    // }, [])

    const breadcrumbs = [
        <Link className={'breadcrumbLink'} key="1" to="/">
            Homepage
        </Link>,
        <Typography key="2" color="secondary" fontWeight={'bold'} fontSize={'20px'}>
            {'User Profile'}
        </Typography>,
    ];

    return (
        <React.Fragment>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={''}/>

            <Box sx={{padding: 3, maxWidth: "100vw"}}>
                <Accordion expanded={userInfoExpanded} sx={{width: '100%', maxWidth: '100%', overflowX: 'auto'}}>
                    <AccordionSummary
                        onClick={() => setUserInfoExpanded(!userInfoExpanded)}
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Grid container>
                            <Grid item md={3} xs={6}>
                                <Typography sx={{flexShrink: 2}} variant={'h6'}>
                                    Currently logged in user:
                                </Typography>
                            </Grid>

                            <Grid item md={3} xs={6} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                                <FiberManualRecordIcon sx={{marginRight: '5px', my: 'auto'}} color={'success'}/>
                                <Typography variant={'h6'}
                                            sx={{color: 'text.secondary', fontWeight: 'bold', my: 'auto'}}>{user?.username}
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography variant={'h6'}
                                            sx={{
                                                color: 'text.secondary',
                                                marginLeft: 'auto',
                                                display: {xs: 'none', md: 'block'}
                                            }}>
                                    {!userInfoExpanded && 'Click for details'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails >
                        <Grid container spacing={0}>
                                <TableContainer component={Paper}>
                                    <Table size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="center">Username</StyledTableCell>
                                                <StyledTableCell align="center">User ID</StyledTableCell>
                                                <StyledTableCell align="center">Roles</StyledTableCell>
                                                <StyledTableCell align="center">Attributes</StyledTableCell>
                                                <StyledTableCell align="center">Email</StyledTableCell>
                                                <StyledTableCell align="center">First Name</StyledTableCell>
                                                <StyledTableCell align="center">Last Name</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <StyledTableRow
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                                <TableCell sx={{fontSize: '18px', padding: '10px'}} align="center">
                                                    <Typography fontSize={'large'}>{user?.username}</Typography>
                                                </TableCell>
                                                <TableCell sx={{fontSize: '18px', padding: '10px'}} align="center">
                                                    <Typography fontSize={'large'}>{userID}</Typography>
                                                </TableCell>
                                                <TableCell sx={{fontSize: '18px', padding: '10px'}} align="center">
                                                    {roles && roles?.length > 0 &&
                                                        <Accordion expanded={rolesExpanded}
                                                                   onClick={() => setRolesExpanded(!rolesExpanded)}
                                                        >
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon/>}
                                                                aria-controls="panel2bh-content"
                                                                id="panel2bh-header">
                                                                <Container>
                                                                    <Typography fontSize={'large'} align={'center'}
                                                                                fontWeight={'bold'}>
                                                                        {roles?.length} role{roles?.length > 1 && 's'}.
                                                                    </Typography>
                                                                    {!rolesExpanded &&
                                                                        <Typography fontSize={'large'}
                                                                                    overflow={'hidden'}
                                                                                    align={'center'}>{'Click to expand.'}
                                                                        </Typography>}
                                                                </Container>
                                                            </AccordionSummary>

                                                            <AccordionDetails>
                                                                {roles?.map(role => (
                                                                    <Grid display={'flex'} padding={0} key={role}
                                                                          sx={{overflow: 'hidden'}}>
                                                                        <ArrowRightRoundedIcon/>
                                                                        {role}<br/>
                                                                    </Grid>
                                                                ))}
                                                            </AccordionDetails>
                                                        </Accordion>}
                                                    {(roles?.length === 0) &&
                                                        <Typography fontSize={'large'}>No roles assigned.</Typography>}
                                                </TableCell>
                                                <TableCell sx={{fontSize: '18px', padding: '10px'}} align="center">
                                                    {attributes.length > 0 &&
                                                        <Accordion expanded={attributesExpanded}
                                                                   onClick={() => setAttributesExpanded(!attributesExpanded)}
                                                        >
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon/>}
                                                                aria-controls="panel2bh-content"
                                                                id="panel2bh-header">
                                                                <Container>
                                                                    <Typography fontSize={'large'} align={'center'}
                                                                                fontWeight={'bold'}>
                                                                        {attributes.length} attribute{attributes.length > 1 && 's'}.
                                                                    </Typography>
                                                                    {!attributesExpanded &&
                                                                        <Typography fontSize={'large'}
                                                                                    overflow={'hidden'}
                                                                                    align={'center'}>{'Click to expand.'}
                                                                        </Typography>}
                                                                </Container>
                                                            </AccordionSummary>

                                                            <AccordionDetails>
                                                                {attributes.map(attribute => (
                                                                    <Stack direction={'row'} key={attribute[0]}>
                                                                        <Typography
                                                                            fontWeight={'bold'}>{attribute[0]}</Typography>
                                                                        <Typography>:&nbsp;</Typography>
                                                                        <Typography>{attribute[1]} </Typography>
                                                                    </Stack>
                                                                ))}
                                                            </AccordionDetails>
                                                        </Accordion>}
                                                    {(attributes.length === 0) &&
                                                        <Typography fontSize={'large'}>No attributes
                                                            assigned.</Typography>}
                                                </TableCell>
                                                <TableCell sx={{fontSize: '18px', padding: '10px'}} align="center">
                                                    <Typography fontSize={'large'}>{email ? email : '-'}</Typography>
                                                </TableCell>
                                                <TableCell sx={{fontSize: '18px', padding: '10px'}} align="center">
                                                    <Typography
                                                        fontSize={'large'}>{firstName ? firstName : '-'}</Typography>
                                                </TableCell>
                                                <TableCell sx={{fontSize: '18px', padding: '10px'}} align="center">
                                                    <Typography
                                                        fontSize={'large'}>{lastName ? lastName : '-'}</Typography>
                                                </TableCell>
                                            </StyledTableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </React.Fragment>
    );
};

export default UserProfile;