import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { deleteRecord } from '../../helpers/db/idb-query';

export default function DeleteConfirmDialog({id, store, dispatcher, message}) {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onConfirm = () => {
    deleteRecord(store, id, (data) => {
      dispatch(dispatcher(data))
      handleClose()
    })
  }

  return (
    <div>
      <Button
        size="small"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
      >Delete</Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText color="error">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={handleClose}>Cancel</Button>
          <Button size="small" color='error' variant="contained" onClick={onConfirm}>
             Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
