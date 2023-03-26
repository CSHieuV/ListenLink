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
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => Math.random()),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
        // do we want confidence as another dataset?
    ],
}

const Emotions = () => (
    <Container
        my={40}
        sx={{
            minWidth: '800px'
        }}
    >
        <Text fz="xl" fw={700}>Tendencies Detector</Text>
        <Bar options={options} data={data} />
    </Container>
)

export default Emotions