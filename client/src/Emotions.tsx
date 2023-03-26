import { Container, Text } from '@mantine/core';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { predictionEndpoint } from './api';
import { useEffect, useState } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        }
    },
}
const labels = [
    'Depressed',
    'Frustrated',
    'Hopeless',
    'Lonely',
    'Overwhelmed',
    'Positive',
    'Suicidal',
    'Uselessness'
];

const Emotions = () => {
    const [prediction, setPrediction] = useState<{[label: string]: number}>({});
    const data = {
        labels,
        datasets: [
            {
                label: 'Confidence Level',
                data: labels.map((label) => prediction[label]),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    }

    useEffect(() => {
        const intervalId = setInterval(async () => {
            const response = await predictionEndpoint();
            if (Object.keys(response).length > 0) setPrediction(response);
        }, 5000)

        return () => {
            clearInterval(intervalId);
        }
    }, [])
    
    return (
        <Container
            my={40}
            sx={{
                minWidth: '800px'
            }}
        >
            <Text fz="xl" fw={700}>Tendencies Detector</Text>
            <Bar options={options} data={data} />
            <Text fz="xl" fw={700}>Main emotion: {prediction.prediction}</Text>
        </Container>
    )
}

export default Emotions