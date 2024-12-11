import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const validationErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      validationErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      validationErrors.email = 'Invalid email format';
    }

    if (!password) {
      validationErrors.password = 'Password is required';
    } else if (password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  async function loginUser(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    if (data.user) {
      // alert('Login successful');
      navigate('/musicpage');
    } else {
      alert('Please check your credentials');
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-blue-600">
      <div className="fixed w-full py-12 flex justify-center items-center">
        <div className="w-[450px] h-[500px] max-auto bg-black/55 text-black">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-bold text-white">Sign In</h1>
            <form onSubmit={loginUser} className="w-full flex flex-col py-4">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="p-3 my-2 bg-white-100 rounded"
                type="email"
                placeholder="Email"
                autoComplete="email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="p-3 my-2 bg-white-400 rounded"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

              <button className="bg-orange-500 py-3 my-6 rounded font-bold text-white">
                Sign In
              </button>
              <div className="flex justify-between items-center text-small text-gray-300">
                <p>
                  <input className="mr-2" type="checkbox" />
                  Remember me
                </p>
                <p>Need Help?</p>
              </div>
              <p className="py-8 text-orange-600">
                <span className="text-gray-300">New here?</span>{' '}
                <Link to={'/signup'}>Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
