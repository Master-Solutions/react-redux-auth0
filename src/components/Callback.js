import { Component } from 'react';
import { connect } from 'react-redux';
import { HANDLE_AUTHENTICATION } from '../actionTypes';

class Callback extends Component {

    componentDidMount() {
        this.props.handleAuth();
    }

    render() {
        return null;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleAuth: () => {dispatch({type: HANDLE_AUTHENTICATION })},
    }
};

export default connect(null, mapDispatchToProps)(Callback);