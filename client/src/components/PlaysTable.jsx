import { useEffect, useState } from "react";

export default function PlaysTable() {
  const [plays, setPlays] = useState([]);

  useEffect(() => {
    async function fetchPlays() {
      try {
        const res = await fetch("http://localhost:3000/play");
        const data = await res.json();
        setPlays(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }

    fetchPlays();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>NFL Plays Dashboard</h2>

      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
        <thead>
          <tr style={{ background: "#222", color: "white" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>Game ID</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Play ID</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Down</th>
            <th style={{ padding: "10px", textAlign: "left" }}>EPA</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Success</th>
          </tr>
        </thead>
        <tbody>
          {plays.map((p) => (
            <tr key={p.play_id} style={{ borderBottom: "1px solid #ccc" }}>
              <td style={{ padding: "10px" }}>{p.game_id}</td>
              <td style={{ padding: "10px" }}>{p.play_id}</td>
              <td style={{ padding: "10px" }}>{p.down ?? "-"}</td>
              <td style={{ padding: "10px" }}>{p.epa ?? "-"}</td>
              <td style={{ padding: "10px" }}>{p.success ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}