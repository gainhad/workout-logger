import React from 'react';
import { Link } from 'react-router-dom';
const Login = () => {
  return (
    <div id="login-screen">
      <form action="" method="post" enctype="multipart/form-data">
        <input type="text" name="username" placeholder="username"/>
        <input type="password" name="password" placeholder="password"/>
        <Link to="/">
          <button type="button" class="arrow-button">&rarr;</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
