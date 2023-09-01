import {useContext} from "react";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';

import {LanguageContext} from "../../context/LanguageContext";
import {multilingual} from "../../multilingual";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
    chartData: Array<number>,
    labels: Array<string>,
}

const InvestmentSelectQuickInfoPieChart = ({chartData, labels}: Props) => {
    const {language} = useContext(LanguageContext)
    const dictionary = language === 'en' ? multilingual.english.selectInvestment : multilingual.latvian.selectInvestment

    const data = {
        labels: labels,
        datasets: [
            {
                label: dictionary.pieChartLabel,
                data: chartData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Container className="chart-container">
            <Typography variant={'body2'} sx={{mb: 'auto'}} fontWeight={'bold'} align={'center'}>
                {dictionary.measurement2}
            </Typography>
            <div className="chart-wrapper">
                <Pie data={data}/>
            </div>
        </Container>
    );
}

export default InvestmentSelectQuickInfoPieChart;