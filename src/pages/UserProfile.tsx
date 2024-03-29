import React, {useState, useContext} from "react";
import {styled} from '@mui/material/styles';
import {useKeycloak} from "@react-keycloak/web";
import {LanguageContext} from "../context/LanguageContext";
import {multilingual} from "../multilingual";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
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
    const {language} = useContext(LanguageContext)
    const dictionary = language === 'en' ? multilingual.english.myProfile : multilingual.latvian.myProfile
    const {keycloak} = useKeycloak()

    const [userInfoExpanded, setUserInfoExpanded] = useState<boolean>(true)
    const [rolesExpanded, setRolesExpanded] = useState<boolean>(false)

    const breadcrumbs = [
        <Link className={'breadcrumbLink'} key="1" to="/">
            {dictionary.breadcrumb1}
        </Link>,
        <Typography key="2" color="secondary" fontWeight={'bold'} fontSize={'20px'}>
            {dictionary.breadcrumb2}
        </Typography>,
    ];

    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={''}/>

            <Box sx={{padding: 3, maxWidth: "100vw"}} data-testid={'useProfileMainSection'}>
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
                                    {dictionary.current_user}:
                                </Typography>
                            </Grid>

                            <Grid item md={3} xs={6} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                                <FiberManualRecordIcon sx={{marginRight: '5px', my: 'auto'}} color={'success'}/>
                                <Typography variant={'h6'}
                                            sx={{
                                                color: 'text.secondary',
                                                fontWeight: 'bold',
                                                my: 'auto'
                                            }}>{keycloak?.tokenParsed?.preferred_username}
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography variant={'h6'}
                                            sx={{
                                                color: 'text.secondary',
                                                marginLeft: 'auto',
                                                display: {xs: 'none', md: 'block'}
                                            }}>
                                    {!userInfoExpanded && dictionary.clickDetails}
                                </Typography>
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={0}>
                            <TableContainer component={Paper}>
                                <Table size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">{dictionary.username}</StyledTableCell>
                                            <StyledTableCell align="center">{dictionary.roles}</StyledTableCell>
                                            <StyledTableCell align="center">{dictionary.first_name}</StyledTableCell>
                                            <StyledTableCell align="center">{dictionary.last_name}</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <StyledTableRow
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                            <TableCell sx={{fontSize: '18px', padding: '10px'}} align="center">
                                                <Typography
                                                    fontSize={'large'}>{keycloak?.tokenParsed?.preferred_username}</Typography>
                                            </TableCell>
                                            <TableCell sx={{fontSize: '18px', padding: '10px'}} align="center">
                                                {keycloak?.realmAccess?.roles && keycloak?.realmAccess?.roles?.length > 0 &&
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
                                                                    {keycloak?.realmAccess?.roles?.length < 2 ?
                                                                        keycloak?.realmAccess?.roles?.length + ' ' + dictionary.role_singular :
                                                                        keycloak?.realmAccess?.roles?.length + ' ' + dictionary.role_plural
                                                                    }.
                                                                </Typography>
                                                                {!rolesExpanded &&
                                                                    <Typography fontSize={'large'}
                                                                                overflow={'hidden'}
                                                                                align={'center'}>{dictionary.expand}
                                                                    </Typography>}
                                                            </Container>
                                                        </AccordionSummary>

                                                        <AccordionDetails>
                                                            {keycloak?.realmAccess?.roles?.map(role => (
                                                                <Grid display={'flex'} padding={0} key={role}
                                                                      sx={{overflow: 'hidden'}}>
                                                                    <ArrowRightRoundedIcon/>
                                                                    {role}<br/>
                                                                </Grid>
                                                            ))}
                                                        </AccordionDetails>
                                                    </Accordion>}
                                                {(keycloak?.realmAccess?.roles?.length === 0) &&
                                                    <Typography fontSize={'large'}>{dictionary.noRoles}.</Typography>}
                                            </TableCell>

                                            <TableCell sx={{fontSize: '18px', padding: '10px'}} align="center">
                                                <Typography
                                                    fontSize={'large'}>{keycloak?.tokenParsed?.given_name || '-'}</Typography>
                                            </TableCell>
                                            <TableCell sx={{fontSize: '18px', padding: '10px'}} align="center">
                                                <Typography
                                                    fontSize={'large'}>{keycloak?.tokenParsed?.family_name || '-'}</Typography>
                                            </TableCell>
                                        </StyledTableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </>
    );
};

export default UserProfile;