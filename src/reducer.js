import types from "./actionTypes";
import { isAuthenticated, getAccessToken, getProfile } from "./utils";

const INITIAL_STATE = {
    isAuthenticated: isAuthenticated(),
    currentUser: {profile: getProfile() || {}},
    accessToken: getAccessToken(),
    errorMessage: null,
};

const reducerDescription = {
    [types.HOSTED_LOGIN_REQUEST]: (state, action) => ({ ...state }),
    [types.HANDLE_AUTHENTICATION_SUCCESS]: (state, action) => ({ ...state, isAuthenticated: true, accessToken: action.payload.accessToken }),
    [types.HANDLE_AUTHENTICATION_FAILURE]: (state, action) => ({ ...state, isAuthenticated: false, accessToken: null, errorMessage: action.payload }),
    [types.FETCH_PROFILE]: (state, action) => ({ ...state }),
    [types.FETCH_PROFILE_SUCCESS]: (state, action) => ({ ...state, currentUser: {profile: action.payload} }),
    [types.FETCH_PROFILE_FAILURE]: (state, action) => ({ ...state }),
    [types.LOGIN_SUCCESS]: (state, action) => ({ ...state }),
    [types.LOGIN_FAILURE]: (state, action) => ({ ...state, errorMessage: action.payload }),
    [types.LOGOUT_REQUEST]: (state, action) => ({ ...state }),
    [types.LOGOUT_SUCCESS]: (state, action) => ({ ...state, isAuthenticated: false, accessToken: null}),
};

function createReducer(initialState, reducerObject) {
    return (state = initialState, action) => {
        // if (reducerObject[action.type])
        //     console.log("Reducer:", action);
        return (reducerObject[action.type] && reducerObject[action.type](state, action)) || state;
    };
}

const reducer = createReducer(INITIAL_STATE, reducerDescription);

export default reducer;