import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Weatherly</h1>
      <Link to="/" className="hover:underline">
        Home
      </Link>
    </header>
  );
}
