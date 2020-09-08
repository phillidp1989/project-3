import React, {useEffect, useState, useContext} from 'react';
import SavedBookCard from '../SavedBookCard/SavedBookCard';
import API from '../../utils/API';
import { UserContext } from '../../Context/UserState';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'
import './style.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

function SavedBooks() {

  const classes = useStyles();
  const { user, isLoaded } = useContext(UserContext);  
  const [savedBooks, setSavedBooks] = useState([]);
  
  const getSavedBooks = async () => {
    try {      
      const data = {
        providerId: user.providerId
      }
      const results = await API.getMyBooks(data);  
      console.log(results);  
      setSavedBooks(results.data);  
    } catch (err) {
      console.error("ERROR - SavedBooks.js - getSavedBooks", err);
    }    
  }

  useEffect(() => {
    if (isLoaded) getSavedBooks()
    console.log(savedBooks.data);    
  }, [isLoaded]);

  return (
    <div className="row">      
      {savedBooks ? savedBooks.map((book) => (
        <SavedBookCard 
        key={book._id}
        id={book._id}
        title={book.title}
        authors={book.authors}
        description={book.description}
        image={book.image}
        link={book.link}
        changeState={getSavedBooks}
        />
      )): null}      
      {!isLoaded ? 
      <div className="loader">
      <CircularProgress />      
    </div> : null}
    {isLoaded && savedBooks.length === 0 ? <h1>You do not have any saved books</h1> : null}
    </div>
  )
}

export default SavedBooks
