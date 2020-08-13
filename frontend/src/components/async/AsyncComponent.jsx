// REACT
import React, { Component } from 'react';
// import classNames from 'classnames';

// MATERIAL UI
import { withStyles } from '@material-ui/core/styles';
import {
    Paper, Table, TableHead, TableRow, TableCell, Typography,
    TableBody, Tooltip, Grid, Checkbox,
} from '@material-ui/core';
import {
    Replay,
} from '@material-ui/icons';

// LODASH
import { isEmpty, toUpper, get } from 'lodash';

// Constants
import { APP_CONFIG } from '../../constants';

// Utilities
import { handleStatusToStyleMapping } from '../utils/utils';


// Component style
const styles = (theme) => ({
    asyncContainerStyle: {
        marginTop: '10px',
        padding: '10px',
        borderStyle: 'solid',
        borderWidth: 'thin',
        borderColor: '#aaa',
    },
    table: {
        tableLayout: 'fixed',
    },
    tableCellPadding: {
        paddingLeft: '5px',
    },
    actionIconStyle: {
        cursor: 'pointer',
        marginBottom: '-5px',
    },
    compare: {
        padding: '0px',
    },
    text: {
        fontSize: '13px',
    },
    tableCellAction: {
        lineHeight: '0px',
    },
    success: {
        color: 'rgb(52, 204, 33)',
    },
    error: {
        color: theme.palette.error.dark,
    },
});


class AsyncComponent extends Component {
    /* Props
    * ------------------------------------------------
    * @prop { array }           responseArr                     - Array representing the response of requests.
    * @prop { boolean }         showResults                     - Boolean representing to show/hide this component.
    * @prop { function }        handleCompareValueChange        - Callback function to compare multiple records.
    * @prop { function }        handleRetryRequest              - Callback function to retry the async request in case of failure status.
    */

    // User defined methods
    _handleReload = (id) => {
        const { handleRetryRequest } = this.props;
        handleRetryRequest(id);
    }

    _handleCompare = (id) => {
        // console.log(id);
        const { handleCompareValueChange } = this.props;
        handleCompareValueChange(id);
    }

    // Component lifecycle methods
    render() {
        const {
            classes, showResults, responseArr,
        } = this.props;

        const responseArrFilter = responseArr.filter((obj) => obj.isCompareEnabled === true);
        const enabledCompareCount = responseArrFilter.length;

        return showResults && !isEmpty(responseArr)
        && (
            <Grid
                item
                sm={12}
                container
                className={classes.asyncContainerStyle}
                direction="row"
                justify="space-between"
                alignItems="center"
                component={Paper}
            >
                <Grid
                    item
                    sm={12}
                >
                    <Typography
                        align="left"
                        color="inherit"
                        variant="subtitle1"
                    >
                        Compute List
                    </Typography>
                </Grid>
                <Grid
                    item
                    sm={12}
                >
                    <Paper>
                        {
                            (
                                <>
                                    <Table className={classes.table} padding="none">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="justify" className={classes.tableCellPadding}>
                                                    <Typography variant="overline">Range Value</Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography variant="overline">Request Status</Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography variant="overline">Compute Status</Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography variant="overline">Compare</Typography>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            { responseArr
                                                .map((row) => {
                                                    let msg = '';
                                                    if (toUpper(row.responseStatus) === 'SUCCESS') {
                                                        if (row.computeResultStatus) {
                                                            msg = (
                                                                <Typography
                                                                    variant="caption"
                                                                    className={classes.success}
                                                                >
                                                                    SUCCESS
                                                                </Typography>
                                                            );
                                                        } else {
                                                            msg = (
                                                                <Typography
                                                                    variant="caption"
                                                                    className={classes.error}
                                                                >
                                                                    {`FAILURE: ${get(row, 'response.data', '')}`}
                                                                </Typography>
                                                            );
                                                        }
                                                    }
                                                    return (
                                                        <TableRow key={row.id}>
                                                            <TableCell component="th" scope="row" align="left" className={classes.tableCellPadding}>
                                                                <Typography variant="caption">{`${row.rangeParamLabel}: ${row.rangeParamValue}`}</Typography>
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <Typography variant="caption" style={handleStatusToStyleMapping(row.responseStatus, 'color')}>
                                                                    {row.responseStatus}
                                                                    {
                                                                        (toUpper(row.responseStatus) === 'FAILURE') && (
                                                                            <Tooltip title="Retry" placement="top" className={classes.actionIconStyle}>
                                                                                <Replay
                                                                                    size="small"
                                                                                    color="primary"
                                                                                    onClick={() => this._handleReload(row.id)}
                                                                                />
                                                                            </Tooltip>
                                                                        )
                                                                    }
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                {msg}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <Checkbox
                                                                    size="small"
                                                                    className={classes.compare}
                                                                    disabled={
                                                                        ((!row.computeResultStatus)
                                                                        || toUpper(row.responseStatus) === 'FAILED'
                                                                        || toUpper(row.responseStatus) === 'PENDING'
                                                                        || (!row.isCompareEnabled && enabledCompareCount === APP_CONFIG.maxCompareLimit))
                                                                    }
                                                                    onChange={() => this._handleCompare(row.id)}
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                }) }
                                        </TableBody>
                                    </Table>
                                </>
                            )
                        }
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

AsyncComponent.propTypes = {
};

export default withStyles(styles)(AsyncComponent);
