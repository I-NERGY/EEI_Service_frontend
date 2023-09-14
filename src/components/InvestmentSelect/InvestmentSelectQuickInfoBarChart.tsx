import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
import {Bar} from "react-chartjs-2";
import {multilingual} from "../../multilingual";
import {LanguageContext} from "../../context/LanguageContext";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {useContext} from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface Props {
    chartData: Array<number>,
    labels: Array<string>,
    value: number | undefined
}

const InvestmentSelectQuickInfoBarChart = ({chartData, labels, value}: Props) => {
    const {language} = useContext(LanguageContext)
    const dictionary = language === 'en' ? multilingual.english.selectInvestment : multilingual.latvian.selectInvestment

    const baseColor = 'rgba(54, 162, 235, 0.5)'; // Base color for the bars

    const options = {
        responsive: true,
        // indexAxis: 'y' as const,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: dictionary.barChartTitle,
            },
        },
    };

    // const backgroundColor = labels.map((_, index) => {
    //     if (Math.abs(index - highlightPosition) <= 10) {
    //         return highlightColor;
    //     }
    //     return baseColor;
    // });

    const data = {
        labels,
        datasets: [
            {
                label: dictionary.barChartLabel,
                data: chartData,
                // backgroundColor: backgroundColor
                // backgroundColor: labels.map((_, index) =>
                //     index === highlightPosition ? highlightColor : baseColor
                // )
                backgroundColor: baseColor
            },
        ],
    };

    return (
        <Container>
            {value && <Typography variant={'body2'} sx={{mb: 'auto'}} fontWeight={'bold'} align={'center'}>{dictionary.measurement1} {value} kWh</Typography>}
            <Bar options={options} data={data}/>
        </Container>
    );
}

export default InvestmentSelectQuickInfoBarChart;