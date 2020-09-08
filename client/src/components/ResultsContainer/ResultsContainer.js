import React, {useContext} from 'react';
import BookCard from '../BookCard/BookCard';
import { BooksContext } from '../../Context/BooksState';

function ResultsContainer() {

  const { books } = useContext(BooksContext)
  console.log(books.data);

  return (
    <div className="row">      
      {books.data ? books.data.map((book) => (
        <BookCard 
        key={book.id}
        title={book.title}
        authors={book.authors}
        description={book.description}
        image={book.image}
        link={book.link}
        />
      )): null}
    </div>
  )
}

export default ResultsContainer
