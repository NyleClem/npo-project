import { useEffect, useState } from "react";

export default function PlaysTable() {
  const [plays, setPlays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlays() {
      try {
        const res = await fetch("http://localhost:3000/play");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
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

  if (loading) return <p className="text-center py-8 text-gray-600">Loading plays…</p>;
  if (error) return <p className="text-center py-8 text-red-600">Error: {error}</p>;
  if (!plays.length) return <p className="text-center py-8 text-gray-600">No plays found.</p>;

  return (
    <div className="card overflow-x-auto">
      <table className="min-w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-3 text-sm font-medium text-gray-700">Game ID</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">Play ID</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">Down</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">EPA</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">Success</th>
          </tr>
        </thead>

        <tbody>
          {plays.map((p) => (
            <tr key={`${p.game_id}-${p.play_id}`} className="odd:bg-white even:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-800">{p.game_id}</td>
              <td className="px-4 py-3 text-sm text-gray-800">{p.play_id}</td>
              <td className="px-4 py-3 text-sm text-gray-800">{p.down ?? "-"}</td>
              <td className="px-4 py-3 text-sm text-gray-800">{p.epa ?? "-"}</td>
              <td className="px-4 py-3 text-sm text-gray-800">{p.success ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}