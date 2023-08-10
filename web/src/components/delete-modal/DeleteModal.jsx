/* eslint-disable react/prop-types */
import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material';

const DeleteModal = ({
  isDeleteDialogOpen,
  setDeleteDialogOpen,
  toDelete,
  deleteCustomer,
}) => {
  return (
    <Dialog open={isDeleteDialogOpen}>
      <DialogTitle>Confirm customer delete</DialogTitle>
      <DialogActions>
        <Button
          variant='outlined'
          onClick={() => {
            setDeleteDialogOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            deleteCustomer(toDelete);
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
