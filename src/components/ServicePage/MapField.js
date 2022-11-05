import React from 'react';

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import HighlightAltOutlinedIcon from '@mui/icons-material/HighlightAltOutlined';

const MapField = () => {
    return (
        <>
            <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Grid item xs={12} md={6}>
                    <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                        <HighlightAltOutlinedIcon fontSize="large"
                                                   sx={{
                                                       width: '60px',
                                                       height: '60px',
                                                       color: '#A1B927',
                                                       ml: 2,
                                                       my: 1
                                                   }}/>
                        <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>
                            Choose the surrounding area
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                </Grid>
            </Grid>
        </>
    );
}

export default MapField;