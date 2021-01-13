import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { orange } from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const StyledButton = withStyles(() => ({
    root: {
        backgroundColor: 'white',
        color: orange[700],
        border: 0,
        '&:hover': {
            backgroundColor: orange[100],
        },
    },
}))(Button);

const StyledTableCell = withStyles(() => ({
    root: {
        border: "none"
    },
}))(TableCell);

const TransactionDetails = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const useStyles = makeStyles({
        table: {
            maxWidth: 650,
        },
    });
    const classes = useStyles();

    const createData = (itemId, itemName, itemUnitPrice, itemNumber, itemTotalPrice) => {
        return { itemId, itemName, itemUnitPrice, itemNumber, itemTotalPrice };
    };

    const rows = props.orderItems.map(item => {
        return createData(item._id,
            item.name,
            `$${item.unitPrice.toFixed(2)}`,
            item.numberOrdered,
            `$${item.totalPrice.toFixed(2)}`,
            );
    });

    return (
        <div>
            <StyledButton variant="outlined" onClick={handleClickOpen}>
                Details
            </StyledButton>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Transaction Details
                </DialogTitle>
                <DialogContent>
                    <TableContainer component={Paper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Unit Price</TableCell>
                                    <TableCell align="right">Number Ordered</TableCell>
                                    <TableCell align="right">Total Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(row => (
                                    <TableRow key={row.itemId}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.itemName}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.itemUnitPrice}</StyledTableCell>
                                        <StyledTableCell align="right">{row.itemNumber}</StyledTableCell>
                                        <StyledTableCell align="right">{row.itemTotalPrice}</StyledTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TransactionDetails;
