import React, {useContext} from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {multilingual} from "../../multilingual";
import {LanguageContext} from "../../context/LanguageContext";

const FooterContent = () => {
    const {language} = useContext(LanguageContext)
    let dictionary = language === 'en' ? multilingual.english.layout : multilingual.latvian.layout

    return (
        <Container maxWidth={'xl'}>
            <Grid container spacing={0}
                  alignItems="center" justifyItems={'center'}>
                <Grid item xs={12} md={4}>
                    <Typography fontSize={'small'}>{dictionary.copyright}
                    </Typography>
                </Grid>

                <Grid item xs={12} md={1} alignItems="center" justifyContent={'center'} justifyItems={'center'} sx={{py: 1}}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <img src="/images/ec_logo.jpg" alt="" height={'44px'}/>
                    </Box>
                </Grid>

                <Grid item xs={12} md={7}>
                    <Typography fontSize={'small'} alignContent={'center'}>{dictionary.eu_msg}</Typography>
                </Grid>
            </Grid>
        </Container>
    );
}

export default FooterContent;