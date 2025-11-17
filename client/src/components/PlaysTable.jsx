import { useEffect, useState } from "react";

export default function PlaysTable() {
  const [plays, setPlays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlays() {
      try {
        const res = await fetch("http://localhost:3000/play"); // make sure your API URL is correct
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setPlays(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPlays();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading plays...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  if (!plays.length) return <p className="text-center mt-10">No plays found.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-800 text-gray-100 rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-4 py-2 text-left">Game ID</th>
            <th className="px-4 py-2 text-left">Play ID</th>
            <th className="px-4 py-2 text-left">Down</th>
            <th className="px-4 py-2 text-left">EPA</th>
            <th className="px-4 py-2 text-left">Success</th>
          </tr>
        </thead>
        <tbody>
          {plays.map((p) => (
            <tr key={`${p.game_id}-${p.play_id}`} className="even:bg-gray-700 odd:bg-gray-800 hover:bg-gray-600">
              <td className="px-4 py-2">{p.game_id}</td>
              <td className="px-4 py-2">{p.play_id}</td>
              <td className="px-4 py-2">{p.down ?? "-"}</td>
              <td className="px-4 py-2">{p.epa ?? "-"}</td>
              <td className="px-4 py-2">{p.success ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}