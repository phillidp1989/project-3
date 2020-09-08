import React from 'react'
import Jumbotron from '../components/Jumbotron/Jumbotron';
import Navbar from '../components/Navbar/Navbar';
import SearchBar from '../components/SearchBar/SearchBar';
import ResultsContainer from '../components/ResultsContainer/ResultsContainer';
import Sidenav from '../components/Sidenav/Sidenav';

function Search() {   

  return (
    <div>
      <Navbar />
      <Sidenav />
      {/* <Jumbotron /> */}
      <SearchBar />
      <ResultsContainer />
    </div>
  )
}

export default Search
