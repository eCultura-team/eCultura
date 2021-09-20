import axios from 'axios';

const marketAPI = axios.create({
  baseURL:
    'http://dados.recife.pe.gov.br/api/3/action/datastore_search?resource_id=40d97dcb-4a14-4365-bced-8555998a498d',
});

export default marketAPI;
