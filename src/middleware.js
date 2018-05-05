import types from "./actionTypes";
import Auth from "./Auth";

const DEFAULT_REDIRECT_URI = "/";

export default (history, config) => {

    const defaultOnHandleAuthSuccess = (accessToken, idToken) => {
    };

    const defaultOnHandleAuthFailure = (err) => {
    };

    const defaultOnLoginSuccess = () => {
        history.push(config.loginSuccessRedirectUri);
    };

    const defaultOnLoginFailure = (message) => {
        history.push(config.loginFailureRedirectUri);
    };

    const defaultOnLogoutSuccess = () => {
        history.push(config.logoutSuccessRedirectUri);
    };

    config.logoutSuccessRedirectUri = config.logoutSuccessRedirectUri || DEFAULT_REDIRECT_URI;
    config.loginSuccessRedirectUri = config.loginSuccessRedirectUri || DEFAULT_REDIRECT_URI;
    config.loginFailureRedirectUri = config.loginFailureRedirectUri || DEFAULT_REDIRECT_URI;

    config.onHandleAuthSuccess = config.onHandleAuthSuccess || defaultOnHandleAuthSuccess;
    config.onHandleAuthFailure = config.onHandleAuthFailure || defaultOnHandleAuthFailure;
    config.onLoginSuccess = config.onLoginSuccess || defaultOnLoginSuccess;
    config.onLoginFailure = config.onLoginFailure || defaultOnLoginFailure;
    config.onLogoutSuccess = config.onLogoutSuccess || defaultOnLogoutSuccess;

    return function (store) {

        const auth = new Auth(config);

        return function (next) {
            return function (action) {

                if (!action.type.startsWith("@@auth0/"))
                    next(action);

                if (action.type === types.HOSTED_LOGIN_REQUEST)
                    auth.login();

                if (action.type === types.HANDLE_AUTHENTICATION)
                    auth.handleAuthentication(
                        // onSuccess
                        function(accessToken, idToken) {
                            next({type: types.HANDLE_AUTHENTICATION_SUCCESS, payload: {accessToken: accessToken, idToken: idToken}});
                            config.onHandleAuthSuccess(accessToken, idToken);
                            next({type: types.LOGIN_SUCCESS});
                            config.onLoginSuccess();
                        },
                        // onError
                        function(err) {
                            next({type: types.HANDLE_AUTHENTICATION_FAILURE, payload: err.message});
                            console.log(err);
                            alert(`Error: ${err.error}. Check the console for further details.`);
                            config.onHandleAuthFailure(err);
                            next({type: types.LOGIN_FAILURE, payload: action.payload});
                            config.onLoginFailure(action.payload);
                        },
                        // onBeforeFetchProfile
                        function() {
                            next({type: types.FETCH_PROFILE});
                        },
                        // onFetchProfileSuccess
                        function(profile) {
                            next({type: types.FETCH_PROFILE_SUCCESS, payload: profile});
                        },
                        // onFetchProfileError
                        function(err) {
                            next({type: types.FETCH_PROFILE_FAILURE, payload: err.message});
                        },
                    );

                if (action.type === types.HANDLE_AUTHENTICATION_SUCCESS) {

                }

                if (action.type === types.HANDLE_AUTHENTICATION_FAILURE) {

                }

                if (action.type === types.LOGOUT_REQUEST) {
                    auth.logout();
                    store.dispatch({type: types.LOGOUT_SUCCESS});
                }

                if (action.type === types.LOGOUT_SUCCESS) {
                    config.onLogoutSuccess();
                }

                next(action);

            };
        };
    };
}

