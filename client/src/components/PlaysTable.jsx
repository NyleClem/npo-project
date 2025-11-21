import { useState } from "react";

export default function PlaysTable() {
  const [plays, setPlays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [offenseTeam, setOffenseTeam] = useState("");
  const [defenseTeam, setDefenseTeam] = useState("");
  const [down, setDown] = useState("");

  const canFetch = offenseTeam.trim() !== "" || defenseTeam.trim() !== "" || down.trim() !== "";

  async function fetchPlays() {
    if (!canFetch) return;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (offenseTeam.trim()) params.append("offense_team", offenseTeam.trim());
      if (defenseTeam.trim()) params.append("defense_team", defenseTeam.trim());
      if (down.trim()) params.append("down", down.trim());

      const url = `http://localhost:3000/play?${params.toString()}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setPlays(data);
    } catch (err) {
      setError(err.message);
      setPlays([]);
    } finally {
      setLoading(false);
    }
  }

  const columns = plays.length ? Object.keys(plays[0]) : [];

  return (
    <div>
      <div className="mb-4 p-4 bg-gray-900 rounded">
        <h3 className="text-lg font-semibold mb-2 text-gray-100">Filter plays</h3>
        <div className="flex gap-2 flex-wrap">
          <input
            aria-label="Offense team"
            placeholder="Offense team"
            value={offenseTeam}
            onChange={(e) => setOffenseTeam(e.target.value)}
            className="px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700"
          />
          <input
            aria-label="Defense team"
            placeholder="Defense team"
            value={defenseTeam}
            onChange={(e) => setDefenseTeam(e.target.value)}
            className="px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700"
          />
          <input
            aria-label="Down"
            placeholder="Down (e.g. 1,2,3,4)"
            value={down}
            onChange={(e) => setDown(e.target.value)}
            className="px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 w-28"
          />
          <button
            onClick={fetchPlays}
            disabled={!canFetch || loading}
            className="px-4 py-2 rounded bg-blue-600 disabled:opacity-50 text-white"
          >
            {loading ? "Loading..." : "Show Plays"}
          </button>
        </div>
        {!canFetch && <p className="text-sm text-gray-300 mt-2">Please enter at least one filter before viewing plays.</p>}
      </div>

      {error && <p className="text-center mt-4 text-red-500">Error: {error}</p>}

      {!plays.length && !loading && canFetch && <p className="text-center mt-4">No plays found for the provided filters.</p>}

      {plays.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 text-gray-100 rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gray-900">
              <tr>
                {columns.map((col) => (
                  <th key={col} className="px-4 py-2 text-left whitespace-nowrap">
                    {col.replace(/_/g, " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {plays.map((p, idx) => (
                <tr key={idx} className="even:bg-gray-700 odd:bg-gray-800 hover:bg-gray-600 align-top">
                  {columns.map((c) => (
                    <td key={c} className="px-4 py-2 align-top whitespace-nowrap">
                      {p[c] === null || p[c] === undefined ? "-" : String(p[c])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}