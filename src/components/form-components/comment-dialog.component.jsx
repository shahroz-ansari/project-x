import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import { putRecord } from '../../helpers/db/idb-query';
import InputComponent from './core/input.component';

export default function FormDialog({doc, store, dispatcher}) {
  const dispatch = useDispatch()

  const [comment, setComment] = useState(doc.comment)
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSave = () => {
    const record = {...doc, comment}
    putRecord(store, record, (doc) => {
      dispatch(dispatcher(doc))
      handleClose()
    })
  }

  return (
    <div>
      <Button
        size="small"
        color="secondary"
        startIcon={doc.comment ? <EditIcon /> : <AddIcon />}
        onClick={handleClickOpen}
      >
        Add comment
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogContent>
          <InputComponent
            multiline
            minRows={2}
            maxRows={3}
            value={comment}
            label="Comment"
            onChange={(event) => setComment(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={onSave} disabled={comment === ''}>
             Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
