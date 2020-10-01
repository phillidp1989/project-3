import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import API from '../utils/API';

export default function DeleteDialog({ deleteDialogOpen, setDeleteDialogOpen, returnLink, text, id }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  console.log(id);

  const handleClose = async () => {
    const result = await API.deleteSolution(id);
    console.log(result);
    setDeleteDialogOpen(false);
    window.location.replace(`https://app-factory-djd.herokuapp.com/${returnLink}`)
  };

  const handleCloseCancel = () => {
    setDeleteDialogOpen(false);
  };


  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={deleteDialogOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Permanently Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" autoFocus>
            DELETE
          </Button>
          <Button onClick={handleCloseCancel} color="primary" autoFocus>
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}