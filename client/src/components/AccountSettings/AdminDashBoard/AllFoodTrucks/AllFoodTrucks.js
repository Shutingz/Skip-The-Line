import React from 'react';
import './AllFoodTrucks.css';
import '../../AccountSettingsStyle.css';
import {makeStyles} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer/TableContainer";
import Paper from "@material-ui/core/Paper/Paper";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";

const AllFoodTrucks = (props) => {
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();

    const createData = (_ownerId, truckId, truckStatus, truckName, truckWaitTime) => {
        return { _ownerId, truckId, truckStatus, truckName, truckWaitTime };
    };

    const rows = props.allFoodTrucks.map(truck => {
        return createData(
            truck._ownerId,
            truck._id,
            truck.status,
            truck.name,
            truck.averageWaitTime);
    });


    return (
        <div className="all-trucks-container">
            <h1 className="header">All Food Trucks</h1>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Truck ID</TableCell>
                            <TableCell align="right">Truck Name</TableCell>
                            <TableCell align="right">Truck Status</TableCell>
                            <TableCell align="right">Truck Wait Time</TableCell>
                            <TableCell align="right"> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.truckId}>
                                <TableCell component="th" scope="row">
                                    {row.truckId}
                                </TableCell>
                                <TableCell align="right">{row.truckName}</TableCell>
                                <TableCell align="right">{row.truckStatus}</TableCell>
                                <TableCell align="right">{row.truckWaitTime}</TableCell>
                                <TableCell align="right">
                                    <button className="all-trucks-remove-truck-button"
                                            onClick={() => {props.removeTruck(row._ownerId, row.truckId)}}> Remove Truck </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AllFoodTrucks;
