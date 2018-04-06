import axios from 'axios';
import store from '../store';
import router from '../routers/auth';

function setAuthFlag(bool) {
    store.dispatch('setAuthenticated', bool);
}

function setSession (authResult) {
    console.log('setting session', authResult);
    // Set the time that the access token will expire at
    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('id_token', authResult.id_token);
    localStorage.setItem('expires_at', JSON.stringify(
        authResult.expires_in * 1000 + new Date().getTime()
    ));
    setAuthFlag(true);
}

function isValid() {
    return Date.now() < JSON.parse(localStorage.getItem('expires_at'));
}

export function login(phone_number) {
    console.log('Logging in');
    // Send CODE
    return axios
        .post(router.match({ name: 'start' }).path, { phone_number })
        .then(({ data }) => {
            console.log(data);
            store.dispatch('authCodeRequested', data);
        });
}

export function validateCode(code) {
    // Validate Code
    console.log('Validating code');
    return axios
        .post(router.match({ name: 'validate' }).path, {
            password: code,
            username: store.getters.authPhoneNumber
        })
        .then(({ data }) => setSession(data));
}

export function logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    window.location.reload();
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
