// REDUX
import { connect } from 'react-redux';

// COMPONENTS
import AsyncComponent from './AsyncComponent';

// ACTIONS
import { compareValueChange } from '../../state/actions/appState';

// MIDDLEWARE
import { retryRequest } from '../../state/middleware/appState';


const mapStateToProps = (state) => {
    return {
        showResults: state.appState.showResults,
        responseArr: state.appState.responseArr,
    };
};

const mapDispatchToProps = {
    handleCompareValueChange: compareValueChange,
    handleRetryRequest: retryRequest,
};

const AsyncContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AsyncComponent);

export default AsyncContainer;
