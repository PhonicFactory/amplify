import { WebAuth } from 'auth0-js';
import store from '../store';

const service = new WebAuth({
    domain: "eartickling.auth0.com",
    clientID: "vMXpi2lDi1VwOMYuM8dlCJ4X3k4aoz9e",
    audience: "http://api.eartickling.com",
    redirectUri: 'http://localhost:8081/callback',
    responseType: 'token id_token',
    scope: 'openid'
});

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
    service.authorize();
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
