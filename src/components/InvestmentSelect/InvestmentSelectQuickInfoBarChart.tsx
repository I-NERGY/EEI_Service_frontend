import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
import {Bar} from "react-chartjs-2";

import Container from "@mui/material/Container";

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
    highlightPosition: number,
    labels: Array<string>
}

const InvestmentSelectQuickInfoBarChart = ({chartData, highlightPosition, labels}: Props) => {
    const baseColor = 'rgba(54, 162, 235, 0.5)'; // Base color for other bars
    const highlightColor = 'rgba(255, 0, 0, 0.7)'; // Color for the highlighted bar

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: chartData,
                backgroundColor: labels.map((_, index) =>
                    index === highlightPosition ? highlightColor : baseColor
                )
            },
        ],
    };

    return (
        <Container>
            <Bar options={options} data={data}/>
        </Container>
    );
}

export default InvestmentSelectQuickInfoBarChart;