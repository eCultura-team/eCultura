import axios from 'axios';

const museumAPI = axios.create({
  baseURL:
    'http://dados.recife.pe.gov.br/api/3/action/datastore_search?resource_id=97ab18da-f940-43b1-b0d4-a9e93e90bed5',
});

export default museumAPI;
