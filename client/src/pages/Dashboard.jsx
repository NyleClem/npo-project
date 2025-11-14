import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <section className="bg-gray-900/70 backdrop-blur rounded-2xl shadow-xl border border-white/5 p-8 sm:p-10">
        <header className="text-center space-y-2 mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold">Dashboard</h1>
          <p className="text-sm text-gray-400">
            Start by uploading a CSV or view stored play data.
          </p>
        </header>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/upload"
            className="w-full text-center px-8 py-4 rounded-xl text-lg font-semibold
                       bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition"
          >
            Upload Data
          </Link>

          <Link
            to="/view"
            className="w-full text-center px-8 py-4 rounded-xl text-lg font-semibold
                       bg-gray-800 hover:bg-gray-900 active:scale-[0.99] transition"
          >
            View Data
          </Link>
        </div>
      </section>
    </Layout>
  );
}
