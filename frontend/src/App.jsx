import React from 'react';
import SignupForm from './components/SignupForm.jsx';
import LoginForm from './components/LoginForm.jsx';
import DeleteUserForm from './components/DeleteUserForm.jsx';

function App() {
  return (
    <div>
      <h1>Signup</h1>
      <SignupForm />
      <h1>Login</h1>
      <LoginForm />
      <h1>Delete User</h1>
      <DeleteUserForm />
    </div>
  );
}

export default App;
