// REACT
import React from 'react';
import classNames from 'classnames';

// MATERIAL UI
import { makeStyles } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// COMPONENT
import HeaderComponent from './HeaderComponent';
import MainContainer from './MainContainer';

// Component style
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingBottom: theme.spacing(1),
        maxWidth: '1100px',
    },
    appBarSpacer: theme.mixins.toolbar,
}));

export const App = () => {
    const classes = useStyles();

    return (
        <>
            <div className={classNames(classes.root)}>
                <CssBaseline />
                <HeaderComponent />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <MainContainer />
                </main>
            </div>
        </>
    );
};

export default App;
