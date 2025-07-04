import Navbar from "../component/NavBar";
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiMic, FiMicOff } from 'react-icons/fi';
import ParticlesBackground from '../component/ParticlesBackground';
import { useCallback } from 'react';

export default function HomePage() {
  const [city, setCity] = useState('');
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = useCallback(async (searchCity) => {
    if (!searchCity || !searchCity.trim()) {
      setErrorMsg('Please enter a city name');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/get-weather-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //  body: JSON.stringify({ userInput: searchCity.trim() }),
        body: JSON.stringify({ city: searchCity.trim() }),

      });

      if (!response.ok) {
        if (response.status === 404) setErrorMsg(`City "${searchCity}" not found.`);
        else setErrorMsg('Failed to fetch weather. Please try again.');
        setLoading(false);
        return;
      }

      const data = await response.json();
      navigate('/result', { state: { weatherData: data } });
    } catch {
      setErrorMsg('Unable to get weather. Check your network.');
    } finally {
      setLoading(false);

    }
  }, [navigate]);

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setErrorMsg('Geolocation not supported.');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const response = await fetch('http://localhost:5000/api/get-weather', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
          });

          if (!response.ok) {
            setErrorMsg('Failed to get weather for your location.');
            setLoading(false);
            return;
          }

          const data = await response.json();
          navigate('/result', { state: { weatherData: data } });
        } catch {
          setErrorMsg('Network error fetching weather by location.');
        } finally {
          setLoading(false);
        }
      },
      () => {
        setErrorMsg('Unable to retrieve your location.');
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Speech Recognition not supported in this browser.');
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onstart = () => setListening(true);
    recognitionRef.current.onend = () => setListening(false);
    recognitionRef.current.onerror = (event) => {
      setErrorMsg(`Speech recognition error: ${event.error}`);
      setListening(false);
    };
    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setCity(transcript);
      setListening(false);
      handleSearch(transcript);
    };
  }, [handleSearch]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition not supported.');
      return;
    }
    if (listening) recognitionRef.current.stop();
    else recognitionRef.current.start();
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white overflow-hidden px-4">
        {/* Background animation */}
        <ParticlesBackground />

        {/* Main UI */}
        <div className="relative z-20 flex flex-col items-center text-center p-6 max-w-xl w-full space-y-6">
          <h1 className="text-5xl font-bold text-blue-700">Weatherly</h1>
          <p className="text-lg text-blue-800 max-w-md">
            Stay informed with live weather and air quality monitoring.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(city); // explicit call
            }}
            className="flex w-full bg-white shadow-xl rounded-full overflow-hidden border border-blue-200 focus-within:ring-2 focus-within:ring-blue-400 transition"
          >
            <label htmlFor="city-input" className="sr-only">City Name</label>
            <input
              id="city-input"
              name="city"
              type="text"
              placeholder="Enter city name"
              className="flex-grow px-6 py-4 text-lg text-gray-800 focus:outline-none"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={loading}
              aria-label="City name"
              title="Type your city here"
            />

            <button
              type="button"
              onClick={toggleListening}
              className={`flex items-center justify-center px-4 border-l border-blue-200 ${listening ? 'text-red-500' : 'text-blue-500'} hover:text-red-600 transition`}
              aria-label={listening ? 'Stop voice recognition' : 'Start voice recognition'}
              title={listening ? 'Stop voice recognition' : 'Start voice recognition'}
              disabled={loading}
            >
              {listening ? <FiMicOff size={24} /> : <FiMic size={24} />}
            </button>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
              title="Click to search weather"
            >
              {loading ? 'Loading...' : 'Search'}
            </button>
          </form>

          <button
            onClick={handleUseLocation}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-full shadow-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
            title="Get weather for your current location"
          >
            <FiMapPin className="text-white text-xl" />
            Use My Location
          </button>

          {errorMsg && <p className="text-red-600 font-semibold mt-2 animate-pulse">{errorMsg}</p>}
        </div>
      </div>
    </>
  );
}
