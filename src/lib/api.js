import axios from 'axios';
import router from '../routers/api';
import store from '../store';
import { getAccessToken } from './auth';

class Api {

    /**/
    constructor() {
        this.http = axios.create();
        this.http.interceptors.response.use(
            // response => response,
            // ({ data }) => {
            ({ config, data, headers, request, status, statusText }) => {
                console.log(data);
                // Check 401 status
                return data;
            },
            error => Promise.reject(error)
        );
        this.http.interceptors.request.use(
            config => {
                console.log(config);
                config.headers.Authorization = `Bearer ${getAccessToken()}`;
                config.headers.Accept = 'audio/wav, application/json';
                return config;
            },
            error => Promise.reject(error)
        );
    }

    /**
     * GET requested api route by name
     * @param  {String} name
     * @param  {Object} params
     * @param  {Object} query
     * @return {Promise}
     */
    get(name, params = {}, query = {}) {
        try {
            // why is the trailing slash getting stripped???!!!
            // return this.http.get('http://ec2-52-15-174-193.us-east-2.compute.amazonaws.com/api/users/')
            return this.http.get(`${router.match({ name, params, query }).fullPath}/`);
        } catch (e) {
            return Promise.reject('Route Not Found');
        }
    }

    /**
     * POST to requested api route by name
     * @param  {String} name
     * @param  {Object} params
     * @param  {Object} body
     * @return {Promise}
     */
    post(name, params = {}, body = {}, query = {}) {
        try {
            // return this.http.post('http://ec2-52-15-174-193.us-east-2.compute.amazonaws.com/api/users/', body);
            return this.http.post(`${router.match({ name, params, query }).fullPath}/`, body);
        } catch (e) {
            return Promise.reject('Route Not Found');
        }
    }
}

export default (new Api());
