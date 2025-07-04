export default function HourlyChart({ data, type }) {
  return (
    <section className="bg-white shadow rounded p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">{type} Forecast</h3>
      <div className="flex space-x-6 overflow-x-auto">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-gray-700"
          >
            <span>{item.time}</span>
            <span className="text-lg font-bold">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
