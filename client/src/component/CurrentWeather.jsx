export default function CurrentWeather({ temperature, condition, humidity, wind, precipitation }) {
  return (
    <section className="bg-white shadow rounded p-6 mb-6 text-center">
      <h2 className="text-5xl font-bold mb-2">{temperature}°C</h2>
      <p className="text-lg text-gray-600 mb-4">{condition}</p>
      <div className="flex justify-center space-x-6 text-gray-700">
        <span>Humidity: {humidity}%</span>
        <span>Wind: {wind} km/h</span>
        <span>Precipitation: {precipitation}%</span>
      </div>
    </section>
  );
}
