import * as axios from 'axios';

var instance = axios.create();
instance.defaults.baseURL = 'http://munchinfranks.com/api/';
instance.defaults.timeout = 1000*30;

export { instance as default };
