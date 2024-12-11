import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const registerUser = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();
    if (data.success) {
      // alert('Registration successful');
      navigate('/musicpage');
    } else {
      // alert(data.message || 'Something went wrong');
    }
    console.log(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-blue-600">
      <div className="fixed w-full py-12 flex justify-center items-center">
        <div className="w-[450px] h-[550px] max-auto bg-black/55 text-black">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-bold text-white">Sign Up</h1>
            <form onSubmit={registerUser} className="w-full flex flex-col py-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 my-2 bg-white-200 rounded"
                type="text"
                placeholder="Name"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 my-2 bg-white-200 rounded"
                type="email"
                placeholder="Email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 my-2 bg-white-200 rounded"
                type="password"
                placeholder="Password"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

              <button className="bg-orange-500 py-3 my-6 rounded font-bold text-white">
                Sign Up
              </button>
              <div className="flex justify-between items-center text-small text-gray-300">
                <p>
                  <input className="mr-2" type="checkbox" />
                  Remember me
                </p>
                <p>Need Help?</p>
              </div>
              <p className="py-8 text-orange-600">
                <span className="text-gray-300">Already here?</span>{' '}
                <Link to={'/login'}>Sign In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
