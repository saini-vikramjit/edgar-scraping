// REDUX
import { connect } from 'react-redux';

// COMPONENTS
import MainComponent from './MainComponent';

// MIDDLEWARE
// ACTIONS

const mapStateToProps = (state) => {
    return {
        computingFlag: state.appState.computingFlag,
    };
};

const mapDispatchToProps = {
};

const MainContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MainComponent);

export default MainContainer;
