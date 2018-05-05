import auth0 from "auth0-js";
import utils from "./utils";

export default class Auth {

    // const config = {
    //     auth0: {
    //         domain,
    //         clientID,
    //         redirectUri,
    //         audience,
    //         responseType,
    //         scope
    //     },
    //     fetchProfile,
    //     fetchEmail,
    // };
    constructor(config) {

        this.config = config;

        const auth0Config = config.auth0;
        const domain = auth0Config.domain;
        const defaultResponseType = "token id_token";

        let audience = auth0Config.audience;
        let scope = auth0Config.scope || "openid";

        if (config.fetchProfile)
            scope += " profile";

        if (config.fetchEmail)
            scope += " email";


        const auth0WebConfig = {
            domain: domain,
            clientID: auth0Config.clientID,
            redirectUri: auth0Config.redirectUri,
            audience: audience,
            responseType: auth0Config.responseType || defaultResponseType,
            scope: scope
        };
        console.log("Auth0 Config:", auth0WebConfig);

        this.auth0Web = new auth0.WebAuth(auth0WebConfig);

        this.profile = null;


        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    login() {
        this.auth0Web.authorize();
    }

    logout() {
        Auth.clearSession();
    }

    handleAuthentication(onSuccess, onError, onBeforeFetchProfile, onFetchProfileSuccess, onFetchProfileError) {
        this.auth0Web.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                Auth.setSession(authResult);
                if (this.config.fetchProfile) {
                    onBeforeFetchProfile();
                    this.getProfile(function(err, profile) {
                        if (err) return onFetchProfileError(err);
                        Auth.setSession(authResult, profile);
                        onFetchProfileSuccess(profile);
                        onSuccess(authResult.accessToken, authResult.idToken);
                    })
                } else
                    onSuccess(authResult.accessToken, authResult.idToken);
            } else if (err) {
                onError(err);
            }
        });
    }

    static setSession(authResult, profile) {
        utils.setAccessToken(authResult.accessToken);
        utils.setIdToken(authResult.idToken);
        // Set the time that the access token will expire at
        utils.setExpiresAt(authResult.expiresIn * 1000 + new Date().getTime());
        if (profile)
            utils.setProfile(profile);
    }

    static clearSession() {
        utils.clearIdToken();
        utils.clearAccessToken();
        utils.clearExpiresAt();
        this.profile = null;
    }

    getProfile(cb) {
        let accessToken = utils.getAccessToken();
        this.auth0Web.client.userInfo(accessToken, (err, profile) => {
            if (profile) {
                this.profile = profile;
            }
            cb(err, profile);
        });
    }

}