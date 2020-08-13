// REACT
import React, { Component } from 'react';
import Proptypes from 'prop-types';
import classNames from 'classnames';

// MATERIAL UI
import CssBaseline from '@material-ui/core/CssBaseline';
import {
    Typography, Card, Toolbar, AppBar, CardContent,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

/* import logo  from '../assets/images/logo.png'; */

// Component style
const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        height: '100vh',
        overflow: 'auto',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#000',
    },
    appBarShift: {
        marginLeft: 0,
        width: '100%',
    },
    toolbar: {
        paddingRight: 24,
    },
    grow: {
        flex: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    errorArea: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        padding: theme.spacing(1),
        background: '#eeeeee',
        borderWidth: 'thin',
        overflowX: 'auto',
    },
    header: {
        width: '100%',
    },
    actionArea: {
        padding: '10px',
        display: 'flex',
        flexDirection: 'row-reverse',
    },
});

class ErrorBoundary extends Component {
    // Life cycle methods

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null,
        };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo,
        });
    }

    // Component functions

    _displayErrorStack() {
        // Check for the Environment
        if (process.env.NODE_ENV === 'development') {
            const { error, errorInfo } = this.state;
            return (
                <details open style={{ whiteSpace: 'pre-wrap' }}>
                    { error && error.toString() }
                    <br />
                    { errorInfo.componentStack }
                </details>
            );
        }
        return null;
    }

    render() {
        const { classes, children } = this.props;
        const { errorInfo } = this.state;
        if (errorInfo) {
            return (
                <div className={classNames(classes.root)}>

                    <CssBaseline />

                    <AppBar
                        className={classNames(classes.appBar, true && classes.appBarShift)}
                    >
                        <Toolbar
                            className={classes.toolbar}
                        >

                            {/* <div className={classes.grow}>
                                <img src={logo} alt="logo" className={classes.logo} />
                            </div> */}

                        </Toolbar>
                    </AppBar>

                    <main className={classes.content}>

                        <div className={classes.appBarSpacer} />

                        <Card>
                            <CardContent className={classes.errorArea}>
                                <Typography
                                    variant="h4"
                                    gutterBottom
                                    align="left"
                                    className={classes.header}
                                >
                                    Something went wrong
                                </Typography>

                                { this._displayErrorStack() }

                                <div className={classes.appBarSpacer} />

                            </CardContent>
                        </Card>

                    </main>

                </div>
            );
        }

        return children;
    }
}

ErrorBoundary.propTypes = {
    classes: Proptypes.shape({}).isRequired,
    children: Proptypes.node.isRequired,
};

export default withStyles(styles)(ErrorBoundary);
