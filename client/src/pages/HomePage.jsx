import { useState } from 'react';
import Lottie from 'lottie-react';
import { FiMapPin } from 'react-icons/fi';
import windAnimation from '../assets/lottie/weather-animation.json';

export default function HomePage() {
    const [city, setCity] = useState('');

    const handleSearch = () => {
        console.log(`Searching weather for ${city}`);
        setCity('');
    };

    const handleUseLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    console.log(`Latitude: ${pos.coords.latitude}, Longitude: ${pos.coords.longitude}`);
                },
                () => alert("Unable to retrieve your location.")
            );
        } else {
            alert("Geolocation not supported.");
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white overflow-hidden">

            {/* Background animation */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-10">
                <Lottie
                    animationData={windAnimation}
                    loop
                    autoplay
                    style={{ width: '100%', height: '100%', filter: 'brightness(1.5) contrast(1.3) saturate(1.4)' }}

                />
            </div>

            {/* Main UI */}
            <div className="relative z-10 flex flex-col items-center text-center p-6 max-w-lg w-full">
                <h1 className="text-5xl font-bold text-blue-700 mb-8">
                    Weatherly
                </h1>
                <p className="text-lg text-blue-800 mb-8">
                    Get real time weather updates for your current location.
                </p>

                <form
                    onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
                    className="flex w-full bg-white shadow-xl rounded-full overflow-hidden border border-blue-200 focus-within:ring-2 focus-within:ring-blue-400 transition mb-6"
                >
                    <input
                        type="text"
                        placeholder="Enter city name"
                        className="flex-grow px-5 py-4 text-lg text-gray-800 focus:outline-none"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 text-lg font-semibold transition"
                    >
                        Search
                    </button>
                </form>

                <button
                    onClick={handleUseLocation}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-full shadow-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center gap-2"
                >
                    <FiMapPin className="text-white text-xl" />
                    Use My Location
                </button>

            </div>
        </div>
    );
}
