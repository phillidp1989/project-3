import React, {useEffect} from "react";
import './style.css';
import API from '../../utils/API';
import M from 'materialize-css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function BookCard({ title, description, authors, image, link, id, changeState }) {  
  
  const [open, setOpen] = React.useState(false);  

  const deleteBook = async () => {    
    const data = {
      _id: id
    }
    const result = await API.deleteBook(data);
    console.log(result);    
    changeState();    
  }
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
    // Initialize tooltip
  useEffect(() => {
    M.AutoInit();
  })

  return (
    <div className="col s12">
      <div className="card horizontal">
        <div className="card-image valign-wrapper">
          <img src={image} alt={title}/>
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <h3>{title}</h3>
            <h6 className="authors">{authors}</h6>
            <p>{description}</p>
          </div>
          <div className="card-action">
            <a href={link} target="_blank" rel="noopener noreferrer">
              View on Google Books Website
            </a>
            <a href="#"><i className="fas fa-trash tooltipped" data-position="right" data-tooltip="Click to delete" onClick={handleClickOpen}></i></a> 
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Remove book from your list"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you would like to delete {title}?            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={deleteBook} color="danger" autoFocus>
            Delete
          </Button> 
          <Button onClick={handleClose} color="danger">
            Close
          </Button>          
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BookCard;
