import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

export default function EditDialog({ index, order, handleEdit }) {
  const [open, setOpen] = React.useState(false);
  const [editedOrder, setEditedOrder] = useState(order);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditedOrder(order);
  };

  const handleSave = e => {
    e.preventDefault();
    handleEdit(index, editedOrder);
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
        <DialogTitle id="form-dialog-title">Edit Order</DialogTitle>
        <form onSubmit={handleSave}>
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
              required
            />
            <TextField
              autoFocus
              margin="dense"
              label="Email Address"
              type="email"
              value={editedOrder.customer_email}
              onChange={e => handleChange(e, "customer_email")}
              fullWidth
              required
            />
            <FormControl required>
              <InputLabel id="product-select-label">Product</InputLabel>
              <Select
                native
                labelId="product-select-label"
                id="product-select"
                value={editedOrder.product}
                onChange={e => handleChange(e, "product")}
                required
              >
                <option value=""></option>
                <option value="Product 1">Product 1</option>
                <option value="Product 2">Product 2</option>
                <option value="Product 3">Product 3</option>
              </Select>
            </FormControl>
            <TextField
              autoFocus
              margin="dense"
              label="quantity"
              type="number"
              value={editedOrder.quantity}
              onChange={e => handleChange(e, "quantity")}
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
