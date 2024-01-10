import React, {useEffect, useState, useContext} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import {LanguageContext} from "../context/LanguageContext";
import {multilingual} from "../multilingual";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from "@mui/material/Stack";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import ChevronRight from "@mui/icons-material/ChevronRight";

import Breadcrumb from "../components/layout/Breadcrumb";
import InvestmentSelectQuickInfo from "../components/InvestmentSelect/InvestmentSelectQuickInfo";
import InvestmentExpectedResults from "../components/InvestmentSelect/InvestmentExpectedResults";
import Loading from "../components/layout/Loading";

interface MeasureItem {
    id: number;
    measureName: string;
    cost: number;
    thickness: number;
    checked: boolean;
}

interface MeasureCategory {
    categoryName: string;
    categoryItems: MeasureItem[];
}

interface SelectedValue {
    categoryId: string;
    selectedItems: MeasureItem[];
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    minWidth: '350px',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};

const InvestmentSelect = () => {
    const {language} = useContext(LanguageContext);
    const dictionary = language === 'en' ? multilingual.english.selectInvestment : multilingual.latvian.selectInvestment;

    const breadcrumbs = [
        <Link className={'breadcrumbLink'} key="1" to="/">
            {dictionary.breadcrumb1}
        </Link>,
        <Link key={1} className={'breadcrumbLink'} to="/building-info">
            {dictionary.breadcrumb2}
        </Link>,
        <Typography
            key={2}
            color="secondary"
            fontSize={'20px'}
            fontWeight={600}
        >
            {dictionary.breadcrumb3}
        </Typography>,
    ];

    const {id} = useParams();

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [loadingModal, setLoadingModal] = useState<boolean>(false);

    const [energyClass, setEnergyClass] = useState('');
    const [energyConsumption, setEnergyConsumption] = useState(0);
    const [roofArea, setRoofArea] = useState<number>(0)
    const [facadeArea, setFacadeArea] = useState<number>(0)
    const [floorArea, setFloorArea] = useState<number>(0)
    const [windowsArea, setWindowsArea] = useState<number>(0)
    const [doorsArea, setDoorsArea] = useState<number>(0)

    const [totalCost, setTotalCost] = useState<number | 0>(0);

    const [newEnergyClass, setNewEnergyClass] = useState('')
    const [newEergyConsumption, setNewEnergyConsumption] = useState(0);

    const handleSubmit = () => {
        setOpenModal(true);
        setLoadingModal(true);

        axios.post(`recalculations/${id}`, JSON.stringify(selectedMeasures), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setLoadingModal(false)
                setNewEnergyConsumption(response.data.total_energy_consumption)
                setNewEnergyClass(`class${response.data.energy_class}`)
            })
            .catch(error => {
                console.log(error)
            })
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleCategory = (category: string) => {
        if (category === 'Insulation of the roof/attic slab') return roofArea
        if (category === 'Jumta/bēniņu plātnes siltināšana') return roofArea
        if (category === 'Facade insulation') return facadeArea
        if (category === 'Fasādes siltināšana') return facadeArea
        if (category === 'Floor slab  insulation') return floorArea
        if (category === 'Grīdas siltināšana') return floorArea
        if (category === 'Replacement of windows') return windowsArea
        if (category === 'Logu nomaiņa') return windowsArea
        if (category === 'Replacement of doors') return doorsArea
        if (category === 'Durvju nomaiņa') return doorsArea
        else return 1
    }

    useEffect(() => {
        axios.get(`building/info/${id}`).then((response) => {
            setEnergyClass(`class${response.data.energy_class}`);
            setEnergyConsumption(response.data.total_energy_consumption);
            setRoofArea(response.data.roof.toFixed(2))
            setFacadeArea(response.data.walls.toFixed(2))
            setFloorArea(response.data.basement.toFixed(2))
            setWindowsArea(response.data.windows.toFixed(2))
            setDoorsArea(response.data.doors.toFixed(2))
        })
            .catch(error => {
                console.log('error')
            })
    }, [id]);

    useEffect(() => {

        if (roofArea) {
            axios.get(`energy_measures/${id}`).then((response) => {
                // Initialize measures based on language

                let measuresData = language === 'en' ? response.data.english : response.data.latvian;

                const updatedMeasures = measuresData.map((category: any) => ({
                    ...category,
                    categoryItems: category.categoryItems.map((item: MeasureItem) => ({
                        ...item,
                        cost: item.cost * handleCategory(category.categoryName),
                    })),
                }));

                setMeasures(updatedMeasures);
            });
        }
    }, [id, roofArea, language]);


    const [measures, setMeasures] = useState<MeasureCategory[]>([]);

    const [selectedValues, setSelectedValues] = useState<SelectedValue[]>([]);
    const [selectedMeasures, setSelectedMeasures] = useState<MeasureItem[]>([]);

    useEffect(() => {
        updateTotalCost();
    }, [selectedMeasures]);

    useEffect(() => {
        setMeasures([])
        setSelectedValues([])
        setTotalCost(0)
    }, [language])

    const handleCheckboxClick = (categoryId: string, itemId: number) => {
        setMeasures((prevMeasures) => {
            const updatedMeasures = prevMeasures?.map((category) => {
                if (category.categoryName === categoryId) {
                    const updatedItems = category.categoryItems.map((item) => {
                        if (item.id === itemId) {
                            return {
                                ...item,
                                checked: !item.checked,
                                // cost: item.cost * handleCategory(categoryId)
                            };
                        }
                        return item;
                    });
                    return {
                        ...category,
                        categoryItems: updatedItems,
                    };
                }
                return category;
            });

            if (updatedMeasures) {
                updateSelectedMeasures(updatedMeasures); // Update selectedMeasures when checkboxes are clicked
            }
            return updatedMeasures;
        });
    };

    const handleSelectChange = (categoryId: string, selectedItems: MeasureItem[]) => {
        setSelectedValues((prevValues) => {
            const updatedValues = prevValues.filter(
                (value) => value.categoryId !== categoryId
            );
            return [...updatedValues, {categoryId, selectedItems}];
        });
    };

    const updateSelectedMeasures = (updatedMeasures: MeasureCategory[]) => {
        const selectedMeasureItems: MeasureItem[] = [];

        updatedMeasures.forEach((category) => {
            category.categoryItems.forEach((item) => {
                if (item.checked) {
                    selectedMeasureItems.push(item);
                }
            });
        });

        setSelectedMeasures(selectedMeasureItems);
    };

    const updateTotalCost = () => {
        const newTotalCost = selectedMeasures.reduce(
            (accumulator, measure) => accumulator + measure.cost,
            0
        );
        setTotalCost(newTotalCost);
    };

    return (
        <>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {loadingModal ? (
                        <Loading/>
                    ) : (
                        <InvestmentExpectedResults
                            energyClass={newEnergyClass}
                            energyConsumption={newEergyConsumption}
                            totalCost={totalCost}
                            handleClose={handleClose}
                            initialEnergyConsumption={energyConsumption}
                        />
                    )}
                </Box>
            </Modal>

            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={dictionary.pageTitle}/>

            <Container maxWidth={'xl'} sx={{my: 5}}>
                <InvestmentSelectQuickInfo
                    energyClass={energyClass}
                    energyConsumption={energyConsumption}
                />
            </Container>

            <Container maxWidth={'xl'} sx={{my: 5}}>
                <Stack direction={'row'}>
                    <Typography variant={'h4'} fontWeight={'bold'} sx={{mb: 3, flexGrow: 1}}>
                        {dictionary.measures}
                    </Typography>
                    <Typography variant={'h5'} fontWeight={'bold'} sx={{mb: 3}}>
                        {dictionary.totalCost}: {totalCost.toFixed(2)}€
                    </Typography>
                </Stack>

                <Grid container spacing={2}>
                    {measures?.map((measure) => (
                        <Grid item xs={12} md={6} key={measure.categoryName}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    {measure.categoryName}
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label={measure.categoryName}
                                    multiple
                                    value={selectedValues.find(
                                        (value) => value.categoryId === measure.categoryName
                                    )?.selectedItems || []}
                                    onChange={(event) =>
                                        handleSelectChange(
                                            measure.categoryName,
                                            event.target.value as MeasureItem[] // Update the type to MeasureItem[]
                                        )
                                    }
                                    renderValue={(selected) => (
                                        <div style={{display: 'flex', flexWrap: 'wrap'}}>
                                            {(selected as unknown as string[]).map((item, index) => {
                                                const selectedMeasure = measure.categoryItems.find(
                                                    (measureItem) => measureItem.measureName === item
                                                );
                                                // const label = `${selectedMeasure?.measureName} (${selectedMeasure?.cost.toFixed(2)}€)`;
                                                const label = `${selectedMeasure?.measureName}`;
                                                return (
                                                    <div key={item}>
                                                        {index > 0 && ', '}
                                                        {label}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                >
                                    {measure.categoryItems.map((item) => (
                                        <MenuItem
                                            key={item.id}
                                            value={item.measureName}
                                            onClick={() =>
                                                handleCheckboxClick(measure.categoryName, item.id)
                                            }
                                        >
                                            <Checkbox checked={item.checked}/>
                                            <ListItemText
                                                primary={item.measureName + ` (Thickness: ${item.thickness}mm)` +
                                                    ` (${item.cost.toFixed(2)}€)`}
                                            />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Divider/>

            <Container maxWidth={'xl'} sx={{my: 5}}>
                <Grid
                    container
                    spacing={2}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Grid item xs={12} md={6}></Grid>
                    <Grid item xs={12} md={6} display={'flex'}>
                        <Button
                            variant={'contained'}
                            component={'span'}
                            size={'large'}
                            color={'warning'}
                            sx={{ml: 'auto'}}
                            fullWidth
                            endIcon={<ChevronRight/>}
                            onClick={handleSubmit}
                            disabled={selectedMeasures.length < 1}
                        >
                            <Typography variant={'h6'}>{dictionary.button}</Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default InvestmentSelect;