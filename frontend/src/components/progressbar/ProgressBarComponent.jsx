// REACT
import React, { Component } from 'react';
import classNames from 'classnames';

// MATERIAL UI
import { withStyles } from '@material-ui/core/styles';
import {
    LinearProgress, Box, Paper, Typography, Divider,
    Collapse, Table, TableHead, TableBody, TableCell,
    TableRow, Grid, Tooltip,
} from '@material-ui/core';
import {
    Replay, Warning, Done,
} from '@material-ui/icons';

// Lodash
import {
    isEqual, isEmpty, toUpper, get,
} from 'lodash';


// Component style
const styles = (theme) => ({
    progressContainerStyle: {
        marginTop: '10px',
        padding: '10px',
        borderStyle: 'solid',
        borderWidth: 'thin',
        borderColor: '#aaa',
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
    },
    progressBarPanel: {
        display: 'flex',
        flexGrow: 1,
    },
    progressBar: {
        paddingTop: '12px',
    },
    progressText: {
        paddingTop: '5px',
        paddingRight: '8px',
    },
    linear: {
        backgroundColor: '#b7cfe5',
    },
    summaryPanel: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
    },
    table: {
        marginLeft: theme.spacing(3),
        width: 'calc(100% - 24px)',
        borderStyle: 'solid',
        borderWidth: 'thin',
        borderColor: '#e4e4e4',
    },
    tableCell: {
        paddingLeft: '10px',
    },
    tableFontSize: {
        fontSize: '11px',
    },
    requestLabel: {
        fontWeight: 500,
    },
    requestValue: {
        fontSize: '15px',
        fontWeight: 600,
    },
    passedRequest: {
        color: 'green',
    },
    failedRequest: {
        color: '#b93232',
    },
    passedRequestButton: {
        color: 'green',
        cursor: 'pointer',
    },
    failedRequestButton: {
        color: '#b93232',
        cursor: 'pointer',
    },
    actionIconStyle: {
        cursor: 'pointer',
    },
});


class ProgressBarComponent extends Component {
    /* Props
    * ------------------------------------------------
    * @prop { boolean }         showProgressBar                 - Boolean representing to show/hide this component.
    * @prop { string }          progress                        - String representing the progress bar value.
    * prop  { array }           responseArr                     - Array representing the response of requests.
    * @prop { function }        handleRetryRequest              - Callback function to retry the async request in case of failure status.
    */

    // Component lifecycle methods
    constructor(props) {
        super(props);
        this.state = {
            displaySummary: false,
            responseArr: [],
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (!isEqual(props.responseArr !== state.responseArr)) {
            return {
                responseArr: props.responseArr,
            };
        }
        return null;
    }

    // User defined methods
    _filterPassedRequest = () => {
        const { responseArr } = this.state;

        if (isEmpty(responseArr)) {
            return 0;
        }
        const passedRequestArr = responseArr.filter(({ computeResultStatus }) => computeResultStatus === true);
        return passedRequestArr.length;
    }

    _filterFailedRequest = () => {
        const { responseArr } = this.state;

        if (isEmpty(responseArr)) {
            return 0;
        }
        return responseArr.filter(({ response }) => {
            const status = get(response, 'status', true);
            return status === false;
        });
    }

    _handleReload = (id) => {
        const { handleRetryRequest } = this.props;
        handleRetryRequest(id);
    }

    _handleDisplaySummaryOnClick = () => {
        const { displaySummary } = this.state;

        this.setState({
            displaySummary: !displaySummary,
        });
    }

    _renderDisplaySummaryIcon = () => {
        const { classes } = this.props;
        const { responseArr } = this.state;

        const totalRequest = responseArr.length;
        const passedRequest = this._filterPassedRequest();
        const filterFailedRequestArr = this._filterFailedRequest();
        const failedRequest = filterFailedRequestArr.length;

        let button = (<span>&nbsp;</span>);
        if (isEqual(totalRequest, passedRequest)) {
            button = (
                <Done className={classes.passedRequestButton} />
            );
        } else if (!isEqual(failedRequest, 0)) {
            button = (
                <Warning color="primary" className={classes.failedRequestButton} />
            );
        }

        return button;
    }

    _renderDisplaySummary = () => {
        const { classes } = this.props;
        const { displaySummary, responseArr } = this.state;

        const filterFailedRequestArr = this._filterFailedRequest();
        const totalRequest = responseArr.length;
        const failedRequest = filterFailedRequestArr.length;
        const passedRequest = this._filterPassedRequest();
        return (
            <Collapse in={displaySummary} timeout="auto" unmountOnExit>
                <Paper className={classes.summaryPanel}>
                    <Grid
                        item
                        sm={12}
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        component={Paper}
                    >
                        <Grid item sm={2}>
                            <Typography variant="caption" className={classes.requestLabel}>
                                TOTAL REQUESTS
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="caption" className={classes.requestValue}>
                                { totalRequest }
                            </Typography>
                        </Grid>
                        <Grid item sm={12}>
                            <Divider />
                        </Grid>
                        <Grid item sm={2}>
                            <Typography variant="caption" className={classNames(classes.requestLabel, classes.passedRequest)}>
                                PASSED
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="caption" className={classes.requestValue}>
                                {passedRequest}
                            </Typography>
                        </Grid>
                        <Grid item sm={12}>
                            <Divider />
                        </Grid>
                        <Grid item sm={2}>
                            <Typography variant="caption" className={classNames(classes.requestLabel, classes.failedRequest)}>
                                FAILED
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="caption" className={classes.requestValue}>
                                {failedRequest}
                            </Typography>
                        </Grid>
                        {
                            !isEqual(failedRequest, 0) && (
                                <Grid item sm={12}>
                                    <Table padding="none" className={classes.table}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left" className={classes.tableCell}>
                                                    <Typography variant="overline" className={classes.tableFontSize}>Range Value</Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography variant="overline" className={classes.tableFontSize}>Error</Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography variant="overline" className={classes.tableFontSize}>&nbsp;</Typography>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                filterFailedRequestArr
                                                    .map((row) => {
                                                        const {
                                                            id, range, responseStatus, rangeParamLabel, rangeParamValue, response: { data },
                                                        } = row;
                                                        return (
                                                            <TableRow key={id}>
                                                                <TableCell align="left" className={classes.tableCell}>
                                                                    <Typography variant="caption" className={classes.tableFontSize}>
                                                                        {(range) ? `${rangeParamLabel}: ${rangeParamValue}` : 'Range is OFF'}
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <Typography variant="caption" className={classes.tableFontSize}>
                                                                        {data}
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <Typography variant="caption" className={classes.tableFontSize}>
                                                                        {
                                                                            (toUpper(responseStatus) === 'FAILURE') && (
                                                                                <Tooltip title="Retry" placement="top" className={classes.actionIconStyle}>
                                                                                    <Replay
                                                                                        size="small"
                                                                                        color="primary"
                                                                                        onClick={() => this._handleReload(id)}
                                                                                    />
                                                                                </Tooltip>
                                                                            )
                                                                        }
                                                                    </Typography>
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })
                                            }
                                        </TableBody>
                                    </Table>
                                </Grid>
                            )
                        }
                    </Grid>
                </Paper>
            </Collapse>
        );
    }

    render() {
        const {
            classes, showProgressBar, progress,
        } = this.props;


        return showProgressBar && (
            <Paper className={classes.progressContainerStyle}>
                <Paper className={classes.progressBarPanel}>
                    <Box width="100%" mr={1} className={classes.progressBar}>
                        <LinearProgress variant="determinate" value={progress} className={classes.linear} />
                    </Box>
                    <Box minWidth={35} className={classes.progressText}>
                        <Typography variant="body2" color="primary">
                            {`${progress}%`}
                        </Typography>
                    </Box>
                    <Box minWidth={35} onClick={this._handleDisplaySummaryOnClick}>
                        <Tooltip title="View Details" placement="bottom">
                            { this._renderDisplaySummaryIcon() }
                        </Tooltip>
                    </Box>
                </Paper>
                { this._renderDisplaySummary() }
            </Paper>
        );
    }
}

ProgressBarComponent.propTypes = {
};

export default withStyles(styles)(ProgressBarComponent);
