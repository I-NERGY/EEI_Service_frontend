import React, {ReactNode} from 'react';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import LocationOnIcon from '@mui/icons-material/LocationOn';

interface Props {
    address: string,
    setAddress: React.Dispatch<React.SetStateAction<string>>
}

const AddressField = ({address, setAddress}: Props) => {
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
                    <InputLabel id="demo-simple-select-label">Building Address</InputLabel>
                    <Select
                        // disabled={executionLoading}
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={address}
                        label="Dataset Resolution (Minutes)"
                        onChange={e => setAddress(e.target.value)}
                    >
                        <MenuItem value={'hi'}>hi</MenuItem>
                        <MenuItem value={'hi'}>hi</MenuItem>
                        <MenuItem value={'hi'}>hi</MenuItem>
                        <MenuItem value={'hi'}>hi</MenuItem>
                        <MenuItem value={'hi'}>hi</MenuItem>
                        {/*{resolutions?.map(resolution => (*/}
                        {/*    <MenuItem key={resolution.value}*/}
                        {/*              value={resolution.value.toString()}>{resolution.display_value}</MenuItem>))}*/}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
}

export default AddressField;