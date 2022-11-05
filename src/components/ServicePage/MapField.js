import React from 'react';

import L from 'leaflet';
import {MapContainer, TileLayer, useMap, Popup, Marker} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import HighlightAltOutlinedIcon from '@mui/icons-material/HighlightAltOutlined';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

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
                    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height: '350px', width: '100wh' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[51.505, -0.09]}>
                            <Popup>
                                A pretty CSS3 popup. <br/> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </Grid>
            </Grid>
        </>
    );
}

export default MapField;