import React, { useState } from 'react';
import { deleteUser } from '../api'; // Ensure this API function is correctly implemented

function DeleteUserForm() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await deleteUser(formData);
      setMessage('User deleted successfully!');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('User does not exist.');
      } else if (error.response && error.response.status === 400) {
        setError('Password is incorrect.');
      } else {
        setError('Error deleting user. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Delete User</button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default DeleteUserForm;
