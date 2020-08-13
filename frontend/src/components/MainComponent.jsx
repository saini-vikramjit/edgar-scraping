// REACT
import React, { Component } from 'react';
/* import classNames from 'classnames'; */

// MATERIAL UI
import { withStyles } from '@material-ui/core/styles';
/* import {
    Grid, Paper, Button,
} from '@material-ui/core'; */
// LODASH
/* import {
    isEqual, isNull, toNumber, indexOf, replace,
} from 'lodash'; */
// COMPONENTS
// Constants
/* import {
    SBC_TYPES, PROFILE_TYPES, CODEC_NAMES, GPU_TYPES, SIZING_TYPES, PLATFORM_TYPES,
} from '../constants'; */
// Utilities

// Seed Configuration
import seedConfig from '../seed';

// Component style
const styles = (theme) => ({
    loadTemplate: {
        overflow: 'hidden',
        boxShadow: '0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        backgroundColor: theme.palette.white,
    },
    profileContainerStyle: {
        overflow: 'hidden',
        boxShadow: '0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        backgroundColor: theme.palette.white,
        marginTop: '8px',
    },
    profileSelectorPaper: {
        boxShadow: 'none',
    },
    containerPadding: {
        paddingTop: '8px',
    },
    paddingDeployment: {
        paddingTop: '8px',
        paddingLeft: '10px',
    },
    computeContainerStyle: {
        marginTop: '8px',
        padding: '8px 8px',
        borderStyle: 'solid',
        borderWidth: 'thin',
        borderColor: '#aaa',
    },
});

class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = this._getInitialState();
    }

    // Component lifecycle methods

    // User defined methods
    _getInitialState = () => {
        const initialState = {
            ...seedConfig,
        };
        return initialState;
    }

    render() {
        return (
            <p>Hello World</p>
        );
    }
}

MainComponent.propTypes = {
};

export default withStyles(styles)(MainComponent);
