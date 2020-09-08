import React, {useContext} from 'react';
import Navbar from '../components/Navbar/Navbar';
import SavedBooks from '../components/SavedBooks/SavedBooks';
import { UserContext } from '../Context/UserState';
import Sidenav from '../components/Sidenav/Sidenav';

function Saved() {
  
  const { user } = useContext(UserContext);  

  return (
    <div>
      <Navbar />
      <Sidenav />
      <SavedBooks id={user.providerId}/>
    </div>
  )
}

export default Saved
