import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import WeatherTabs from '../component/WeatherTabs';
import HourlyChart from '../component/HourlyChart';
import DailyForecast from '../component/DailyForecast';

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const weatherData = location.state?.weatherData;

  const [selectedTab, setSelectedTab] = useState('hourly');

  useEffect(() => {
    if (!weatherData) {
      navigate('/', { replace: true });
    }
  }, [weatherData, navigate]);

  if (!weatherData) return null;

  const {
    city,
    condition,
    icon,
    temperature,
    feelsLike,
    minTemp,
    maxTemp,
    humidity,
    windSpeed,
    pressure,
    hourly = [],
    daily = []
  } = weatherData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600 py-12 px-6 flex justify-center items-start">
      <div className="max-w-4xl w-full bg-white bg-opacity-90 rounded-3xl shadow-xl p-8 backdrop-blur-md">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between mb-10">
          <div className="flex items-center space-x-6">
            <img
              src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
              alt={condition}
              className="w-28 h-28"
            />
            <div>
              <h1 className="text-5xl font-extrabold text-blue-900">{city}</h1>
              <p className="capitalize text-xl text-blue-800 mt-1">{condition}</p>
              <p className="text-4xl font-bold text-blue-900 mt-3">{temperature}°C</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="mt-6 md:mt-0 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500"
          >
            New Search
          </button>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Feels Like', value: `${feelsLike}°C`, icon: '🌡️' },
            { label: 'Min Temp', value: `${minTemp}°C`, icon: '⬇️' },
            { label: 'Max Temp', value: `${maxTemp}°C`, icon: '⬆️' },
            { label: 'Humidity', value: `${humidity}%`, icon: '💧' },
            { label: 'Wind Speed', value: `${windSpeed} m/s`, icon: '💨' },
            { label: 'Pressure', value: `${pressure} hPa`, icon: '🌪️' },
          ].map(({ label, value, icon }) => (
            <div
              key={label}
              className="flex items-center space-x-4 bg-blue-100 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow"
            >
              <span className="text-3xl">{icon}</span>
              <div>
                <p className="text-sm font-semibold text-blue-700">{label}</p>
                <p className="text-lg font-bold text-blue-900">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <WeatherTabs selectedTab={selectedTab} onSelectTab={setSelectedTab} />

        {/* Charts */}
        <div className="mt-8">
          {selectedTab === 'hourly' ? (
            <HourlyChart data={hourly} />
          ) : (
            <DailyForecast days={daily} />
          )}
        </div>
      </div>
    </div>
  );
}
