export default function WeatherTabs({ selectedTab, onSelectTab }) {
  const tabs = ['Temperature', 'Precipitation', 'Wind'];

  return (
    <div className="flex justify-center mb-4 space-x-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onSelectTab(tab)}
          className={`px-4 py-2 rounded-full ${selectedTab === tab
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
