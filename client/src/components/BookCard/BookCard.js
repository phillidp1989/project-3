import React, {useEffect, useContext} from "react";
import './style.css';
import API from '../../utils/API';
import M from 'materialize-css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { UserContext } from '../../Context/UserState';

function BookCard({ title, description, authors, image, link }) {

  const { user } = useContext(UserContext);

  // Manipulation of authors data
  let last = authors.pop();
  let authorsString =
    authors.length > 0 ? authors.join(", ") + " and " + last : last;
  
  
  const saveBook = async () => {
    const book = {
      title,
      authors: authorsString,
      description,
      image,
      link,
      userId: user.providerId
    }
    const result = await API.saveBook(book);
    console.log(result);
    handleClickOpen();    
  }
  
  const [open, setOpen] = React.useState(false);  

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
            <h6 className="authors">{authorsString}</h6>
            <p>{description}</p>
          </div>
          <div className="card-action">
            <a href={link} target="_blank" rel="noopener noreferrer">
              View on Google Books Website
            </a>
            <a href="#"><i className="fas fa-heart tooltipped" data-position="right" data-tooltip="Click to save book" onClick={saveBook}></i></a> 
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Saved to your list"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have successfully saved {title} to your personal list of books.            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>          
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BookCard;
