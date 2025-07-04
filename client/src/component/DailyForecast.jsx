export default function DailyForecast({ days }) {
  return (
    <section className="bg-white shadow rounded p-6">
      <h3 className="text-xl font-bold mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
        {days.map((day, idx) => (
          <div
            key={idx}
            className="bg-blue-50 rounded p-3 text-center"
          >
            <div className="font-bold">{day.day}</div>
            <div className="text-3xl">{day.icon}</div>
            <div className="text-gray-700">
              {day.high}° / {day.low}°
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
