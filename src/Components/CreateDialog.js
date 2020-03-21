import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import AddIcon from "@material-ui/icons/Add";

export default function CreateDialog({ classes, index, order, handleCreate }) {
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
    console.log("running");
    e.preventDefault();
    handleCreate(editedOrder);
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
    <>
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
        <form onSubmit={handleSave}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="id"
              type="text"
              onChange={e => handleChange(e, "id")}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              label="Customer name"
              type="text"
              onChange={e => handleChange(e, "customer_name")}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              label="Email Address"
              type="email"
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
              margin="dense"
              label="quantity"
              type="number"
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
    </>
  );
}
