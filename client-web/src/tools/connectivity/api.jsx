import axios from 'axios';

let CustomAxios = axios.create({  
  baseURL: 'http://api.upendo.localhost',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

CustomAxios.interceptors.response.use(function (response) {
  return response;
}, function(error) {
  // window.location.replace("/error");
});

export default CustomAxios;