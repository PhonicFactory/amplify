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
 * Convert blob to base64 string
 * @param {Blob} blob
 */
export function blobToBase64(blob) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        try {
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                resolve(reader.result);
            }
        } catch(e) {
            reject('Error converting audio', e);
        }
    });
}

/**
 * Formatted text label for conversation
 */
export function conversationLabel(participants, filteredId) {
    return participants
        .filter(({ id }) => id !== filteredId)
        .map(({ phone_number }) => phone_number)
        .join(', ');
}