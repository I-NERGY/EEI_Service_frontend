import React from 'react';

import L from 'leaflet';
import {MapContainer, TileLayer, Popup, Marker} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import LeafletRuler from "./LeafletRuler";

import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import HighlightAltOutlinedIcon from '@mui/icons-material/HighlightAltOutlined';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapField = ({address, setPerimeter}) => {
    return (
        <>
            <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'top'}>
                <Grid item xs={12} md={6} display={'flex'} flexDirection={'column'}>
                    <Stack direction="row" spacing={2} sx={{alignItems: 'center', mb: 'auto'}}>
                        <HighlightAltOutlinedIcon fontSize="large"
                                                  sx={{
                                                      width: '60px',
                                                      height: '60px',
                                                      color: '#A1B927',
                                                      ml: 2,
                                                      my: 1
                                                  }}/>
                        <Box>
                            <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>Building Location & Surroundings</Typography>
                            <Typography variant={'subtitle1'}>A map displaying the chosen building's location.</Typography>
                        </Box>
                    </Stack>

                    {address &&
                        <Grid sx={{ml: 'auto'}}>
                            <TextField id="outlined-basic" label="Perimeter (m)" variant="outlined"
                                       type={'number'} sx={{mx: 1}} disabled
                                       InputProps={{inputProps: {min: 0}}}
                                       onChange={e => setPerimeter(e.target.value)}
                            />
                        </Grid>}

                </Grid>

                <Grid item xs={12} md={6}>
                    {address &&
                        <>
                            <MapContainer center={[parseFloat(address.latitude_centroid), parseFloat(address.longitude_centroid)]} zoom={20}
                                          scrollWheelZoom={false}
                                          style={{height: '300px', width: '100wh'}}
                                          key={JSON.stringify([address.latitude_centroid, address.latitude_centroid])}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[address.latitude_centroid, address.latitude_centroid]}>
                                    <Popup>
                                        A pretty CSS3 popup. <br/> Easily customizable.
                                    </Popup>
                                </Marker>

                                <LeafletRuler/>
                            </MapContainer>

                            {/*<Grid container sx={{mt: 2}}>*/}
                            {/*    <TextField id="outlined-basic" label="Perimeter (m²)" variant="outlined"*/}
                            {/*               type={'number'}*/}
                            {/*               InputProps={{inputProps: {min: 0}}}*/}
                            {/*               onChange={e => setPerimeter(e.target.value)}*/}
                            {/*    />*/}
                            {/*</Grid>*/}

                        </>}
                    {!address && <Alert severity="warning">Please select an address first!</Alert>}
                </Grid>
            </Grid>
        </>
    );
}

export default MapField;