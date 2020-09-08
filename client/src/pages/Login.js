import React from 'react';
import Google from '../components/Google/Google';
import Github from '../components/Github/Github';
import LoginContainer from '../components/loginContainer/LoginContainer';
import Facebook from '../components/Facebook/Facebook';

function Login() {
  return (
    <div>
      <LoginContainer>
        <Google />
        <Github />
        <Facebook />
      </LoginContainer> 
    </div>
  )
}

export default Login
