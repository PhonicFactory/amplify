import axios from 'axios';
import router from '../routers/api';
import store from '../store';
import { getAccessToken } from './auth';
import { objectToQueryString } from './helpers';

class Api {

    /**/
    constructor() {
        this.http = axios.create();
        this.http.interceptors.response.use(
            // response => response,
            // ({ data }) => {
            ({ config, data, headers, request, status, statusText }) => {
                // console.log(data);
                // Check 401 status
                return data;
            },
            error => Promise.reject(error)
        );
        this.http.interceptors.request.use(
            config => {
                console.log(config);
                config.headers.Authorization = `Bearer ${getAccessToken()}`;
                // config.headers.Accept = 'audio/wav, application/json';
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
     * @param  {Object} config
     * @return {Promise}
     */
    get(name, params = {}, query = {}, config = {}) {
        try {
            return this.http.get(`${router.match({ name, params, query }).path}/${objectToQueryString(query)}`, config);
        } catch (e) {
            return Promise.reject('Route Not Found');
        }
    }

    /**
     * POST to requested api route by name
     * @param  {String} name
     * @param  {Object} params
     * @param  {Object} body
     * @param  {Object} config
     * @return {Promise}
     */
    post(name, params = {}, body = {}, query = {}, config = {}) {
        try {
            // return this.http.post('http://ec2-52-15-174-193.us-east-2.compute.amazonaws.com/api/users/', body);
            return this.http.post(`${router.match({ name, params, query }).fullPath}/`, body, config);
        } catch (e) {
            return Promise.reject('Route Not Found');
        }
    }

    /**
     * DELETE requested api route by name
     * @param  {String} name
     * @param  {Object} params
     * @param  {Object} query
     * @param  {Object} config
     * @return {Promise}
     */
    delete(name, params = {}, query = {}, config = {}) {
        try {
            return this.http.delete(`${router.match({ name, params, query }).fullPath}/`, config);
        } catch (e) {
            return Promise.reject('Route Not Found');
        }
    }
}

export default (new Api());
