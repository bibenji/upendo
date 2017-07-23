import axios from 'axios';

var CustomAxios = axios.create({  
  baseURL: 'http://localhost/mynewupendo/web/app_dev.php',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});