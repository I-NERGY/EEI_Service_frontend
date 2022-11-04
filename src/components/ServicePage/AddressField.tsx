import React from 'react';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import LocationOnIcon from '@mui/icons-material/LocationOn';

interface AddressOptionType {
    address: string;
    cadastre: number;
    id: number;
}

interface Props {
    address: AddressOptionType | null,
    setAddress: React.Dispatch<React.SetStateAction<AddressOptionType | null>>,
    addresses: AddressOptionType[]
}

const AddressField = ({address, setAddress, addresses}: Props) => {
    return (
        <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Grid item xs={12} md={8}>
                <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                    <LocationOnIcon fontSize="large"
                                    sx={{width: '60px', height: '60px', color: '#A1B927', ml: 2, my: 1}}/>
                    <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>
                        Select Building Address
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                    <Autocomplete
                        options={addresses}
                        value={address}
                        disablePortal
                        id="combo-box-demo"
                        onChange={(event, newValue) => {
                            setAddress(newValue);
                        }}
                        getOptionLabel={(option) => option.address}
                        isOptionEqualToValue={(option, value) => option.address === value.address}
                        sx={{width: 300}}
                        renderInput={(params) => <TextField {...params} label="Address"/>}/>
                </FormControl>
            </Grid>
        </Grid>
    );
}

export default AddressField;