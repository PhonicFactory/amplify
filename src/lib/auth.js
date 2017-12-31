import { WebAuth } from 'auth0-js';
import axios from 'axios';
import store from '../store';
// import config from '../../config';
import router from '../routers/auth';

const service = {};
// const service = new WebAuth({
    // domain: 'eartickling.auth0.com',
    // clientID: 'vMXpi2lDi1VwOMYuM8dlCJ4X3k4aoz9e',
    // audience: 'http://api.eartickling.com',
    // redirectUri: config.authRedirectUri,
    // responseType: 'token id_token',
    // scope: 'openid'
// });

function setAuthFlag(bool) {
    store.dispatch('setAuthenticated', bool);
}

function setSession (authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    setAuthFlag(true);
}

function isValid() {
    return Date.now() < JSON.parse(localStorage.getItem('expires_at'));
}

export function login() {
    // service.authorize();
    //
    // router.get()
    // store.dispatch('login');
    console.log('Logging in');

    // Send CODE

    // axios.post(router.match({ name: 'start' }).path, {
    //     phone_number: '+13476019737'
    // })
    // .then((response) => {
    //     console.log(response);
    // });


    // Validate Code
    axios.post(router.match({ name: 'validate' }).path, {
        password: '143263',
        username: '+13476019737'
        // client_id: 'vMXpi2lDi1VwOMYuM8dlCJ4X3k4aoz9e',
        // connection: 'sms',
        // grant_type: 'password',
        // phone_number: '+13476019737',
        // password: '681256',
        // scope: 'openid profile email'
    })
    .then((response) => {
        console.log(response);
        //681256
    });



}

export function logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    window.location.reload();
}

export function handleAuthentication () {
    service.parseHash((e, authResult) => {
        console.log(authResult);
        // if (authResult && authResult.accessToken && authResult.idToken) {
        if (authResult && authResult.accessToken) {
            setSession(authResult);
            return;
        }
        // TODO: store authenticationStatus key in vuex to handle failures/pending auth
        console.log('Error Logging in', e);
        setAuthFlag(false);
    });
}

export function isAuthenticated () {
    // Use this as a pass through when making authenticated requests
    return new Promise((resolve, reject) => {
        // Check whether the current time is past the access token's expiry time
        if (isValid()) {
            setAuthFlag(true);
            resolve();
            return;
        }
        setAuthFlag(false);
        reject();
    });
}

export function setAuthenticated () {
    setAuthFlag(isValid());
}

export function getAccessToken() {
    // TODO: If there's no access token we should prompt login
    return localStorage.getItem('access_token');
}
