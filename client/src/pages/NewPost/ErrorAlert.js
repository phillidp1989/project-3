import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function AlertDialog({ isAlertOpen, setAlert, errorKey }) {
  const handleClose = () => {
    setAlert({ open: false, key: '' });
  };

  return (
    <div>
      <Dialog
        open={isAlertOpen}
        onClose={handleClose}
        aria-labelledby="Error"
        aria-describedby="There is something wrong."
      >
        <DialogContent>
          {errorKey === 'categoriesOverLimit' ? (
            <DialogContentText id="alert-dialog-description">
              Too many categories selected.
            </DialogContentText>
          ) : (
            <DialogContentText id="alert-dialog-description">
              {`You need to add ${
                errorKey === 'categories' || errorKey === 'something'
                  ? ''
                  : 'a '
              }${errorKey}`}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
