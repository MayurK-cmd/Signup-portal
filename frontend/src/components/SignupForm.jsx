import React, { useState } from 'react';
import { signup } from '../api'; // Make sure your API calls are correct

const signupFields = [
  { name: 'firstName', type: 'text', placeholder: 'First Name', required: true },
  { name: 'lastName', type: 'text', placeholder: 'Last Name', required: true },
  { name: 'email', type: 'email', placeholder: 'Email', required: true },
  { name: 'username', type: 'text', placeholder: 'Username', required: true },
  { name: 'password', type: 'password', placeholder: 'Password', required: true },
  { name: 'contactNumber', type: 'number', placeholder: 'Contact Number', required: true }
];

function SignupForm() {
  const [formData, setFormData] = useState(
    signupFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );
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
      const response = await signup(formData);
      setMessage('Account signup successful!');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Username already in use.');
      } else {
        setError('Error signing up. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {signupFields.map((field) => (
        <input
          key={field.name}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          value={formData[field.name]}
          onChange={handleChange}
          required={field.required}
        />
      ))}
      <button type="submit">Sign Up</button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default SignupForm;
