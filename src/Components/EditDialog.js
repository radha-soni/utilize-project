import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";

export default function EditDialog({ index, order, setOrdersData }) {
  const [open, setOpen] = React.useState(false);
  const [editedOrder, setEditedOrder] = useState(order);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditedOrder(order);
  };

  const handleSave = () => {
    setOrdersData(ordersData => {
      var updatedOrdersData = [...ordersData];
      updatedOrdersData[index] = editedOrder;
      return updatedOrdersData;
    });
    setOpen(false);
  };

  function handleChange(e, key) {
    const value = e.target.value;
    setEditedOrder(editedOrder => {
      return {
        ...editedOrder,
        [key]: value
      };
    });
  }

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        <EditIcon color="primary" />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>Please update order details</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Customer name"
            type="text"
            value={editedOrder.customer_name}
            onChange={e => handleChange(e, "customer_name")}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            value={editedOrder.customer_email}
            onChange={e => handleChange(e, "customer_email")}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="product"
            type="text"
            value={editedOrder.product}
            onChange={e => handleChange(e, "product")}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="quantity"
            type="number"
            value={editedOrder.quantity}
            onChange={e => handleChange(e, "quantity")}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
