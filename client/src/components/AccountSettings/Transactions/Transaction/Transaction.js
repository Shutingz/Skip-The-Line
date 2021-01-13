import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import date from 'date-and-time';
import TransactionDetails from './TransactionDetails';
import './Transaction.css';

const Transaction = (props) => {
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();

    const createData = (orderId, customerName, orderDate, orderTotal, foodTruckName, vendorName, status, orderItems) => {
        return {orderId, customerName, orderDate, orderTotal, foodTruckName, vendorName, status, orderItems};
    };

    const rows = props.transactions.map(transaction => {
        return createData(transaction._id,
            transaction.customer.name,
            date.format(new Date(transaction.time), 'YYYY/MM/DD h:m A'),
            `$${transaction.total.toFixed(2)}`,
            transaction.foodTruck.name,
            transaction.foodTruck.owner,
            transaction.status,
            transaction.orderItems);
    });

    if (props.user.type === 'vendor') {
        return (
            <div className="order-history-container">
                <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell align="right">Customer</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Total</TableCell>
                                <TableCell align="right">Food Truck</TableCell>
                                <TableCell align="right">Vendor</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right"> </TableCell>
                                <TableCell align="right"> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.orderId}>
                                    <TableCell component="th" scope="row">
                                        {row.orderId}
                                    </TableCell>
                                    <TableCell align="right">{row.customerName}</TableCell>
                                    <TableCell align="right">{row.orderDate}</TableCell>
                                    <TableCell align="right">{row.orderTotal}</TableCell>
                                    <TableCell align="right">{row.foodTruckName}</TableCell>
                                    <TableCell align="right">{row.vendorName}</TableCell>
                                    <TableCell align="right">
                                        <select onChange={(e) => {
                                            props.changeOrderStatus(row.orderId, e.target.value)
                                        }} defaultValue={row.status}>
                                            <option value="pending">pending</option>
                                            <option value="completed">completed</option>
                                        </select>
                                    </TableCell>
                                    <TableCell align="right"> <TransactionDetails orderItems={row.orderItems}/>
                                    </TableCell>
                                    <TableCell align="right">
                                        <i onClick={() => {
                                            props.removeRow(row.orderId)
                                        }}
                                           className="transaction-delete-record fa fa-times-circle log-remove-row-button"
                                        ></i>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    } else {
        return (
            <div className="order-history-container">
                <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell align="right">Customer</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Total</TableCell>
                                <TableCell align="right">Food Truck</TableCell>
                                <TableCell align="right">Vendor</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right"> </TableCell>
                                <TableCell align="right"> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.orderId}>
                                    <TableCell component="th" scope="row">
                                        {row.orderId}
                                    </TableCell>
                                    <TableCell align="right">{row.customerName}</TableCell>
                                    <TableCell align="right">{row.orderDate}</TableCell>
                                    <TableCell align="right">{row.orderTotal}</TableCell>
                                    <TableCell align="right">{row.foodTruckName}</TableCell>
                                    <TableCell align="right">{row.vendorName}</TableCell>
                                    <TableCell align="right">{row.status}</TableCell>
                                    <TableCell align="right"> <TransactionDetails orderItems={row.orderItems}/>
                                    </TableCell>
                                    <TableCell align="right">
                                        <i onClick={() => {
                                            props.removeRow(row.orderId)
                                        }}
                                           className="transaction-delete-record fa fa-times-circle log-remove-row-button"
                                        ></i>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }

};

export default Transaction;
