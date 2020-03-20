import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import EditDialog from "./EditDialog";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    marginTop: 20
  },
  button: {
    // marginTop: 65,
    height: 50
  },
  table_container: {
    // marginTop: 14,
    marginRight: 14,
    width: "calc(100% - 350px)",
    textAlign: "end"
  },
  cell: {
    fontSize: "0.905rem"
  }
});

function Orders() {
  const classes = useStyles();
  const [ordersData, setOrdersData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [newOrder, setNewOrder] = useState({
    id: "",
    customer_name: "",
    customer_email: "",
    product: "",
    quantity: ""
  });

  useEffect(() => {
    fetch("./DummyData.json")
      .then(response => response.json())
      .then(resp => {
        setOrdersData(resp);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  function handleDeleteOption(id) {
    setOrdersData(ordersData => {
      return ordersData.filter(obj => obj.id !== id);
    });
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOrdersData(ordersData => {
      return [...ordersData, newOrder];
    });
    setOpen(false);
  };

  const handleChange = (e, key) => {
    const value = e.target.value;
    setNewOrder(newOrder => {
      return {
        ...newOrder,
        [key]: value
      };
    });
  };

  return (
    <div className={classes.table_container}>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Create Order
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Create new order</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="id"
            type="text"
            onChange={e => handleChange(e, "id")}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Customer name"
            type="text"
            onChange={e => handleChange(e, "customer_name")}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email Address"
            type="email"
            onChange={e => handleChange(e, "customer_email")}
            fullWidth
          />
          <TextField
            margin="dense"
            label="product"
            type="text"
            onChange={e => handleChange(e, "product")}
            fullWidth
          />
          <TextField
            margin="dense"
            label="quantity"
            type="number"
            onChange={e => handleChange(e, "quantity")}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className={classes.cell}>Id</StyledTableCell>
              <StyledTableCell className={classes.cell}>
                Customer name
              </StyledTableCell>
              <StyledTableCell className={classes.cell}>
                Customer email
              </StyledTableCell>
              <StyledTableCell className={classes.cell}>
                Product
              </StyledTableCell>
              <StyledTableCell className={classes.cell}>
                Quantity
              </StyledTableCell>
              <StyledTableCell className={classes.cell}>
                Remove Order
              </StyledTableCell>
              <StyledTableCell className={classes.cell}>
                Edit Order
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersData &&
              ordersData.map((order, index) => (
                <StyledTableRow key={order.id}>
                  <StyledTableCell component="th" scope="row">
                    {order.id}
                  </StyledTableCell>
                  <StyledTableCell>{order.customer_name}</StyledTableCell>
                  <StyledTableCell>{order.customer_email}</StyledTableCell>
                  <StyledTableCell>{order.product}</StyledTableCell>
                  <StyledTableCell>{order.quantity}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      color="primary"
                      onClick={() => handleDeleteOption(order.id)}
                    >
                      <DeleteIcon color="primary" />
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell>
                    <EditDialog
                      index={index}
                      order={order}
                      setOrdersData={setOrdersData}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default Orders;
