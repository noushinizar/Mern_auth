import React from "react";

const musicData = [
  {
    id: 1,
    title: "Song Title 1",
    artist: "Artist 1",
    albumArt: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Song Title 2",
    artist: "Artist 2",
    albumArt: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Song Title 3",
    artist: "Artist 3",
    albumArt: "https://via.placeholder.com/150",
  },
  // Add more songs as needed
];

const MusicPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-center">Music Library</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {musicData.map((song) => (
            <div
              key={song.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300"
            >
              <img src={song.albumArt} alt={song.title} className="w-full h-40 object-cover" />
              
              <div className="p-4">
                <h2 className="text-xl font-semibold">{song.title}</h2>
                <p className="text-gray-400">{song.artist}</p>
                
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 w-full">
                  Play
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;

