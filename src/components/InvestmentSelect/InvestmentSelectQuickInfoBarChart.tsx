import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
import {Bar} from "react-chartjs-2";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

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
                text: "All buildings' mean energy consumption (kwh) 2017-2020",
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
                label: 'Available data',
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
            {value && <Typography variant={'body2'} sx={{mb: 'auto'}} fontWeight={'bold'} align={'center'}>Mean energy consumption (2017-2020): {value} kWh</Typography>}
            <Bar options={options} data={data}/>
        </Container>
    );
}

export default InvestmentSelectQuickInfoBarChart;