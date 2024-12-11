import React from 'react'
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-blue-600">
      <h1 className="text-5xl text-white font-bold mb-4">Welcome to MusicWeb</h1>
      <p className="text-xl text-white mb-8">Discover and enjoy the best music from around the world!</p>
      <Link to={'/login'}>
      <button  className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition duration-300">
        Explore Music
      </button>
      </Link>
    </div>
  );
}
