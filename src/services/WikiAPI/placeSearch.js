import axios from 'axios';

const placeSearchAPI = axios.create({
  baseURL: 'https://pt.wikipedia.org/w/',
});

export default placeSearchAPI;
