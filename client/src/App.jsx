import { useEffect, useState } from "react";

export default function App() {
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
    fetch(`${base}/db-ping`)
      .then((res) => res.json())
      .then((json) => {
        if (!json.ok) {
          throw new Error(json.error || "Unknown error");
        }
        setData(json);
        setStatus("ok");
      })
      .catch((err) => {
        setError(err.message);
        setStatus("error");
      });
  }, []);

  if (status === "loading") return <div>Loading…</div>;
  if (status === "error")
    return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Client ↔ API ↔ DB is LIVE ✅</h1>
      <pre style={{ background: "#eee", padding: 16, borderRadius: 8 }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
