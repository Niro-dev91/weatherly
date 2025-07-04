import { useState, useEffect } from 'react';
import Header from '../component/Header';
import CurrentWeather from '../component/CurrentWeather';
import WeatherTabs from '../component/WeatherTabs';
import HourlyChart from '../component/HourlyChart';
import DailyForecast from '../component/DailyForecast';

export default function ForecastPage() {
  const [city, setCity] = useState('New York');
  const [searchInput, setSearchInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [selectedTab, setSelectedTab] = useState('Temperature');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/get-weather', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput: cityName })
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Error fetching weather');
      }

      const data = await response.json();
      setWeatherData(data);

    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchWeather(city);
  }, [city]);


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
      setSearchInput('');
    }
  };


  const getHourlyChartData = () => {
    if (!weatherData?.hourly) return [];
    switch (selectedTab) {
      case 'Temperature':
        return weatherData.hourly.map(h => ({ time: h.time, value: h.temperature }));
      case 'Wind':
        return weatherData.hourly.map(h => ({ time: h.time, value: h.wind }));
      case 'Precipitation':
        return weatherData.hourly.map(h => ({ time: h.time, value: h.precipitation }));
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto p-4">
        {/* Search form */}
        <form onSubmit={handleSearch} className="mb-4 flex flex-wrap items-center">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter city name"
            className="border border-gray-300 rounded p-2 w-64 mb-2 sm:mb-0"
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </form>

        {loading && <p>Loading weather data...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {weatherData && (
          <>
            <CurrentWeather
              city={weatherData.city}
              temperature={Math.round(weatherData.temperature)}
              condition={weatherData.condition}
              humidity={weatherData.humidity}
              wind={weatherData.wind}
              precipitation={weatherData.precipitation}
            />

            <WeatherTabs
              selectedTab={selectedTab}
              onSelectTab={setSelectedTab}
            />

            <HourlyChart
              data={getHourlyChartData()}
              type={selectedTab}
            />

            <DailyForecast days={weatherData.daily} />
          </>
        )}
      </main>
    </div>
  );
}
