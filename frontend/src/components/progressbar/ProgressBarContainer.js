// REDUX
import { connect } from 'react-redux';

// COMPONENTS
import ProgressBarComponent from './ProgressBarComponent';

// MIDDLEWARE
import { retryRequest } from '../../state/middleware/appState';


const mapStateToProps = (state) => {
    return {
        showProgressBar: state.progressState.showProgressBar,
        progress: state.progressState.progress,
        responseArr: state.appState.responseArr,
    };
};

const mapDispatchToProps = {
    handleRetryRequest: retryRequest,
};

const ProgressBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProgressBarComponent);

export default ProgressBarContainer;
