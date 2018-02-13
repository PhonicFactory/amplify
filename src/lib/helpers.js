import { RECEIVE_CLIENT_PUSH_SUBSCRIPTION } from "../store/mutation-types";

/**
 * Convert base64 string to Uint8Array
 * @param  {string} base64String
 * @return {Uint8Array}
 */
export function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);
    var i;
    for (i = 0; i < rawData.length; i += 1) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

/**
 * Convert plain object to querystring
 */
export function objectToQueryString(query) {
    const keys = Object.keys(query);
    if (!keys.length) {
        return '';
    }
    return keys.reduce((accum, key, index) => accum + key + '=' + encodeURIComponent(query[key]) + (index < keys.length - 1 ? '&' : ''), '?');
}