import Layout from "../components/Layout";
import PlaysTable from "../components/PlaysTable";

export default function ViewData() {
  return <Layout>{/*placeholder */}</Layout>;
}

export default function ViewDataPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Play Data</h1>
      <PlaysTable />
    </div>
  );
}