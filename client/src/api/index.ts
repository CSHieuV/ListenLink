import axios from 'axios';
const API_URL = 'https://listenlink.herokuapp.com/';

const $ = axios.create({ baseURL: API_URL });

export const getTwilioToken = async () => {
    const { data: token } = await $.get('/twilio-token');
    return token;
}

export const predictionEndpoint = async () => {
    const { data } = await $.get('/predictions');
    return data;
}