import types from "./actionTypes";

export function hostedLoginRequest() {
    return {
        type: types.HOSTED_LOGIN_REQUEST
    }
}

export function handleAuthentication() {
    return function (dispatch) {
        return {
            type: types.HANDLE_AUTHENTICATION
        }
    }
}

export function handleAuthenticationSuccess(accessToken, idToken) {
    return {
        type: types.HANDLE_AUTHENTICATION_SUCCESS,
        payload: {
            accessToken: accessToken,
            idToken: idToken
        }
    }
}

export function handleAuthenticationFailure(err) {
    return {
        type: types.HANDLE_AUTHENTICATION_FAILURE,
        payload: err
    }
}

export function loginSuccess() {
    return {
        type: types.LOGIN_SUCCESS,
    }
}

export function loginFailure(err) {
    return {
        type: types.LOGIN_FAILURE,
        payload: err
    }
}

export function logoutRequest() {
    return {
        type: types.LOGOUT_REQUEST
    }
}

export function logoutSuccess() {
    return {
        type: types.LOGOUT_SUCCESS
    }
}

export default {
    hostedLoginRequest,
    handleAuthentication,
    handleAuthenticationSuccess,
    handleAuthenticationFailure,
    loginSuccess,
    loginFailure,
    logoutRequest,
    logoutSuccess
}