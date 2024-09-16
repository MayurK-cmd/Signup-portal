import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignupForm from './components/SignupForm.jsx';
import LoginForm from './components/LoginForm.jsx';
import DeleteUserForm from './components/DeleteUserForm.jsx';

function App() {
  return (
    <Router>
      <div>
        <nav>
          {/* Navigation Links */}
          <ul>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/delete-user">Delete User</Link>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/delete-user" element={<DeleteUserForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
