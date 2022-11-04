import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Box from "@mui/material/Box";

interface Props {
    chosenImage: number | null,
    setChosenImage: React.Dispatch<React.SetStateAction<number | null>>,
}

const ImageField = ({chosenImage, setChosenImage}: Props) => {
    const building_type_images = [
        {src: 'images/building_types/101.png', id: 101},
        {src: 'images/building_types/102.png', id: 102},
        {src: 'images/building_types/103.png', id: 103},
        {src: 'images/building_types/104.png', id: 104},
        {src: 'images/building_types/105.png', id: 105},
        {src: 'images/building_types/110.png', id: 110},
        {src: 'images/building_types/119.png', id: 119},
        {src: 'images/building_types/316_318.png', id: 316},
        {src: 'images/building_types/464.png', id: 464},
        {src: 'images/building_types/467.png', id: 467},
        {src: 'images/building_types/607.png', id: 607},
    ]

    return (
        <>
            <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Grid item xs={12} md={6}>
                    <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                        <PhotoSizeSelectActualIcon fontSize="large"
                                                   sx={{
                                                       width: '60px',
                                                       height: '60px',
                                                       color: '#A1B927',
                                                       ml: 2,
                                                       my: 1
                                                   }}/>
                        <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>
                            Choose a resembling photo
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <ImageList sx={{height: 450}} cols={4} rowHeight={164}>
                        {building_type_images.map((item) => (
                            <ImageListItem key={item.id} sx={{position: 'relative'}} onClick={() => setChosenImage(item.id)}>
                                <Box height={'50px'} sx={{
                                    position: 'absolute',
                                    top: 'calc(50% - 40px)',
                                    left: 'calc(50% - 40px)',
                                    color: 'green', height: '80px', width: '80px'
                                }}>
                                    {chosenImage === item.id ? <CheckCircleIcon sx={{width: "100%", height: '100%', color: '#ADC05D'}}/> : null}
                                </Box>
                                <img
                                    src={`${item.src}?w=164&h=164&fit=crop&auto=format`}
                                    srcSet={`${item.src}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Grid>
            </Grid>
        </>
    );
}

export default ImageField;