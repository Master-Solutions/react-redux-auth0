// auth via auth0-js and hosted login page
export const HOSTED_LOGIN_REQUEST = '@@auth0/HOSTED_LOGIN_REQUEST';
export const HANDLE_AUTHENTICATION = '@@auth0/HANDLE_AUTHENTICATION';
export const HANDLE_AUTHENTICATION_SUCCESS = '@@auth0/HANDLE_AUTHENTICATION_SUCCESS';
export const HANDLE_AUTHENTICATION_FAILURE = '@@auth0/HANDLE_AUTHENTICATION_FAILURE';

// for both hosted and embedded lock
export const FETCH_PROFILE = '@@auth0/FETCH_PROFILE';
export const FETCH_PROFILE_SUCCESS = '@@auth0/FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAILURE = '@@auth0/AUTH0_FETCH_PROFILE_FAILURE';

// for both hosted and embedded lock
export const LOGIN_SUCCESS = '@@auth0/LOGIN_SUCCESS';
export const LOGIN_FAILURE = '@@auth0/LOGIN_FAILURE';

// for both hosted and embedded lock
export const LOGOUT_REQUEST = '@@auth0/LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = '@@auth0/LOGOUT_SUCCESS';

export default {
    HOSTED_LOGIN_REQUEST,
    HANDLE_AUTHENTICATION,
    HANDLE_AUTHENTICATION_SUCCESS,
    HANDLE_AUTHENTICATION_FAILURE,

    FETCH_PROFILE,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAILURE,

    LOGIN_SUCCESS,
    LOGIN_FAILURE,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS
};