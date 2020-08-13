// REACT
import React from 'react';
import classNames from 'classnames';

// MATERIAL UI
import { makeStyles } from '@material-ui/styles';
import {
    AppBar, Toolbar, Typography, Link,
} from '@material-ui/core';
import { Home } from '@material-ui/icons';

// Component style
const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: 'none',
    },
    title: {
        marginLeft: theme.spacing(1),
    },
    homeIcon: {
        width: '60px',
        padding: '4px 0px 0px 25px',
        marginTop: '4px',
    },
}));

const HeaderComponent = () => {
    const classes = useStyles();

    return (
        <AppBar
            className={classNames(classes.root)}
        >
            <Toolbar
                variant="dense"
                disableGutters
            >
                <Link variant="h6" color="inherit" href="/">
                    <Home fontSize="large" className={classes.homeIcon} />
                </Link>
                <Typography
                    align="center"
                    color="inherit"
                    component="span"
                    variant="h6"
                    className={classes.title}
                >
                    Edgar Scrapper Dashboard - ver 1.0
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

HeaderComponent.propTypes = {
};

export default HeaderComponent;
