import React from 'react';
import './AllUsers.css';
import {makeStyles} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer/TableContainer";
import Paper from "@material-ui/core/Paper/Paper";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";

const AllUsers = (props) => {

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();

    const createData = (userId, userName, userType, userPassword, accountStatus) => {
        return { userId, userName, userType, userPassword, accountStatus };
    };

    const rows = props.allUsers.map(user => {
        return createData(user._id,
            user.name,
            user.type,
            user.password,
            user.accountStatus);
    });


    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>User ID</TableCell>
                            <TableCell align="right">User Name</TableCell>
                            <TableCell align="right">User Type</TableCell>
                            <TableCell align="right">User Password</TableCell>
                            <TableCell align="right"> Account Status </TableCell>
                            <TableCell align="right"> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.userId}>
                                <TableCell component="th" scope="row">
                                    {row.userId}
                                </TableCell>
                                <TableCell align="right">{row.userName}</TableCell>
                                <TableCell align="right">{row.userType}</TableCell>
                                <TableCell align="right">{row.userPassword}</TableCell>
                                <TableCell align="right">
                                    <select disabled={row.userType === 'admin'} onChange={(e) => {props.changeUserAccountStatus(row.userId, row.userType, e.target.value)}} defaultValue={row.accountStatus}>
                                        <option value="active">Active</option>
                                        <option value="disabled">Disabled</option>
                                    </select>
                                </TableCell>
                                <TableCell align="right">
                                    <button
                                        className={`all-users-remove-user-button ${row.userType === 'admin' ? 'all-users-remove-user-button-removed' : ''}`}
                                        onClick={() => {props.removeUser(row.userId, row.userType)}}
                                    > Remove User </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AllUsers;
