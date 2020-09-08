import React, { useState, createContext } from "react";

export const BooksContext = createContext();

export default ({ children }) => {
  const [books, setBooks] = useState([]);

  return (
    <div>      
      <BooksContext.Provider value={{books, setBooks}}>
        {children}
      </BooksContext.Provider>
    </div>
  )
}
