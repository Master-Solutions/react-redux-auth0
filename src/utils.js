import decode from 'jwt-decode';

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';
const EXPIRES_AT_KEY = 'expires_at';
const PROFILE_KEY = 'profile';

export function getIdToken() {
    return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken(raiseIfNotSet = false) {
    let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (raiseIfNotSet && !accessToken) {
        throw new Error('No access token found');
    }
    return accessToken;
}

export function getExpiresAt() {
    return JSON.parse(localStorage.getItem(EXPIRES_AT_KEY));
}

export function getProfile() {
    return JSON.parse(localStorage.getItem(PROFILE_KEY));
}

export function setAccessToken(accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function setIdToken(idToken) {
    localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function setExpiresAt(dt) {
    localStorage.setItem(EXPIRES_AT_KEY, JSON.stringify(dt));
}

export function setProfile(profile) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function clearIdToken() {
    localStorage.removeItem(ID_TOKEN_KEY);
}

export function clearAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function clearExpiresAt() {
    localStorage.removeItem(EXPIRES_AT_KEY);
}

export function getTokenExpirationDate(encodedToken) {
    const token = decode(encodedToken);
    if (!token.exp) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);

    return date;
}

export function isTokenExpired(token) {
    const expirationDate = getTokenExpirationDate(token);
    return expirationDate < new Date();
}

// Helper function that will allow us to extract the access_token and id_token
export function getParameterByName(name) {
    let match = new RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

export function isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = getExpiresAt();
    return new Date().getTime() < expiresAt;
}

export function isAuthenticatedFromIdToken() {
    const idToken = getIdToken();
    return !!idToken && !isTokenExpired(idToken);
}

export function requireAuth(nextState, replace) {
    if (!isAuthenticated()) {
        replace({pathname: '/'});
    }
}

export default {
    getIdToken,
    getAccessToken,
    getExpiresAt,
    setIdToken,
    getProfile,
    setAccessToken,
    setExpiresAt,
    setProfile,
    clearIdToken,
    clearAccessToken,
    clearExpiresAt,
    isAuthenticated,
    isAuthenticatedFromIdToken,
    requireAuth
}