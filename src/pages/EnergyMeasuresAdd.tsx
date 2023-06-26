import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";

import Typography from "@mui/material/Typography";

import Breadcrumb from "../components/layout/Breadcrumb";
import Loading from "../components/layout/Loading";

const EnergyMeasuresAdd = () => {
    const {keycloak, initialized} = useKeycloak();
    const navigate = useNavigate()
    const [allowed, setAllowed] = useState(false)

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
            </>
            }
        </>
    );
}

export default EnergyMeasuresAdd;