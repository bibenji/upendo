import axios from 'axios';

let CustomAxios = axios.create({  
  baseURL: 'http://api.upendo.localhost',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

export default CustomAxios;