import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  Dialog,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";

const ConfirmDeleteDialog = ({open, handleClose, deleteHandler}) => {
  return (
    <dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this group?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={deleteHandler} color="error">Yes</Button>
      </DialogActions>
    </dialog>
  );
  
};

export default ConfirmDeleteDialog;
