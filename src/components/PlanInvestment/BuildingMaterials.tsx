import React, {useContext} from 'react';
import {LanguageContext} from "../../context/LanguageContext";
import {multilingual} from "../../multilingual";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from "@mui/material/Box";

import BuildCircleIcon from '@mui/icons-material/BuildCircle';

interface Props {
    heavyBuildingMaterials: boolean | null,
    setHeavyBuildingMaterials: React.Dispatch<React.SetStateAction<boolean | null>>,
}

const BuildingMaterials = ({heavyBuildingMaterials, setHeavyBuildingMaterials}: Props) => {
    const {language} = useContext(LanguageContext)
    const dictionary = language === 'en' ? multilingual.english.planInvestment : multilingual.latvian.planInvestment

    const handleChange = () => {
        setHeavyBuildingMaterials(!heavyBuildingMaterials);
    };

    return (
        <>
            <Grid container spacing={2} display={'flex'} sx={{my: 3}} justifyContent={'center'} alignItems={'center'}
                // data-testid={'planInvestmentAddress'}
            >
                <Grid item xs={12} md={6}>
                    <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                        <BuildCircleIcon fontSize="large"
                                         sx={{width: '60px', height: '60px', color: '#A1B927', ml: 2, my: 1}}/>
                        <Box>
                            <Typography variant={'h5'} color={'inherit'} sx={{width: '100%'}}>
                                {dictionary.sectionTitle4}
                            </Typography>
                            <Typography variant={'subtitle1'}>
                                {dictionary.sectionDesc4}
                            </Typography>
                        </Box>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl>
                        {/*<FormLabel id="demo-radio-buttons-group-label">{dictionary.sectionTitle4}</FormLabel>*/}
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={true}
                            onChange={handleChange}
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value={true}
                                              control={<Radio sx={{
                                                  '& .MuiSvgIcon-root': {
                                                      fontSize: 28,
                                                  },
                                              }}/>}
                                              label={dictionary.sectionTitleHeavy}/>
                            <FormControlLabel value={false}
                                              control={<Radio sx={{
                                                  '& .MuiSvgIcon-root': {
                                                      fontSize: 28,
                                                  },
                                              }}/>}
                                              label={dictionary.sectionTitleLight}/>
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </>
    );
}

export default BuildingMaterials;