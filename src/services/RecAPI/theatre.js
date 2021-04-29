import axios from 'axios';

const theatreAPI = axios.create({
  baseURL:
    'http://dados.recife.pe.gov.br/api/3/action/datastore_search?resource_id=16d45f07-1fab-4b8c-95d1-dbf555b6f913',
});

export default theatreAPI;
