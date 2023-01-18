import React, {useEffect, useState} from 'react';
import axios from "axios";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddressOptionType from "../../interfaces/AddressOptionType";

import Loading from "../layout/Loading";


interface Props {
    address: AddressOptionType | null,
    setAddress: React.Dispatch<React.SetStateAction<AddressOptionType | null>>,
    setPerimeter: React.Dispatch<React.SetStateAction<number | null>>,
}

const AddressField = ({address, setAddress, setPerimeter}: Props) => {
    const [addresses, setAddresses] = useState<AddressOptionType[] | []>([]);

    useEffect(() => {
        axios.get('http://inergy.epu.ntua.gr:8000/buildings/')
            .then(response => {
                setAddresses(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        address !== null && setPerimeter(address.perimeter)
    }, [address])

    return (
        <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                    <LocationOnIcon fontSize="large"
                                    sx={{width: '60px', height: '60px', color: '#A1B927', ml: 2, my: 1}}/>
                    <Box>
                        <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>Select Building
                            Address</Typography>
                        <Typography variant={'subtitle1'}>Fill in the dropdown menu with the proper address to open the
                            map.</Typography>
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                    {addresses.length > 0 ? <Autocomplete
                        options={addresses}
                        value={address}
                        disablePortal
                        id="combo-box-demo"
                        onChange={(event, newValue) => {
                            setAddress(newValue);
                        }}
                        getOptionLabel={(option) => option.address + ', Cadastre: ' + option.cadastre_number}
                        isOptionEqualToValue={(option, value) => option.address === value.address}
                        renderInput={(params) => <TextField {...params} label="Address"/>}/>
                    : <Loading/>}
                </FormControl>
            </Grid>
        </Grid>
    );
}

export default AddressField;