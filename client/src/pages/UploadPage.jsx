// client/src/pages/Upload.jsx
import { useState } from "react";
import Layout from "../components/Layout";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Uses env var in Docker, falls back for local dev
  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  function handleFileChange(e) {
    setError("");
    setStatus("");

    const selected = e.target.files?.[0];

    if (!selected) {
      setFile(null);
      setFileName("");
      return;
    }

    //   CSV validation: mime or .csv extension
    const isCsvMime =
      selected.type === "text/csv" ||
      selected.type === "application/vnd.ms-excel";
    const hasCsvExtension = selected.name.toLowerCase().endsWith(".csv");

    if (!isCsvMime && !hasCsvExtension) {
      setFile(null);
      setFileName("");
      setError("Invalid file type. Please upload a .csv file.");
      return;
    }

    setFile(selected);
    setFileName(selected.name);
  }
  async function handleSubmit(e) {
    e.preventDefault(); //  stay SPA, no reload
    setError("");
    setStatus("");

    if (!file) {
      setError("Please select a CSV file before uploading.");
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", file); // field name "file" for backend

      // fetch server.js "/upload" route
      const response = await fetch(`${apiBaseUrl}/upload`, {
        method: "POST",
        body: formData,
      });

      // Try to read JSON either way (success or error)
      let data = null;
      try {
        data = await response.json();
      } catch {
        // if server didn't send JSON, we'll fall back to generic messages
      }

      if (!response.ok || !data?.success) {
        const message =
          data?.message ||
          "Upload failed. Please check your CSV and try again.";
        throw new Error(message);
      }

      //  Show parse result summary from backend
      setStatus(
        `File uploaded and parsed. Rows: ${data.rowCount}, malformed: ${data.malformedCount}.`
      );

      setFile(null);
      setFileName("");
    } catch (err) {
      setError(err.message || "Something went wrong during upload.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <Layout>
      <div className="w-full flex justify-center items-start py-10">
        <div className="w-full max-w-xl bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-6 text-gray-100">
          <h1 className="text-2xl font-bold mb-2">
            Upload Offensive Play Data
          </h1>
          <p className="text-sm text-gray-300 mb-6">
            Select a <span className="font-semibold">.csv</span> file containing
            offensive play data to upload.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* File input */}
            <div>
              <label
                htmlFor="csvFile"
                className="block text-sm font-medium mb-2 text-gray-200"
              >
                Choose CSV file
              </label>

              <label className="flex items-center justify-between px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700 transition">
                <span className="text-sm text-gray-200">
                  {fileName || "No file selected"}
                </span>
                <span className="text-xs font-semibold text-blue-400">
                  Browse…
                </span>
                <input
                  id="csvFile"
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              <p className="mt-1 text-xs text-gray-400">
                Only .csv files are allowed.
              </p>
            </div>

            {/* Error / status messages */}
            {error && (
              <div className="rounded-md bg-red-900/60 border border-red-500 px-3 py-2 text-sm text-red-100">
                {error}
              </div>
            )}

            {status && (
              <div className="rounded-md bg-emerald-900/60 border border-emerald-500 px-3 py-2 text-sm text-emerald-100">
                {status}
              </div>
            )}

            {/* Upload button */}
            {isUploading && (
              <div className="rounded-md bg-blue-900/40 border border-blue-500 px-3 py-2 text-sm text-blue-100 mb-1">
                Upload in progress… this may take a little while for large CSV
                files.
                <div className="mt-2 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full w-1/2 bg-blue-500 animate-pulse" />
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={!file || isUploading}
                className={`w-full inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition
                  ${
                    !file || isUploading
                      ? "bg-blue-900 text-blue-200 cursor-not-allowed opacity-60"
                      : "bg-blue-600 hover:bg-blue-500 text-white shadow"
                  }`}
              >
                {isUploading ? "Uploading..." : "Upload CSV"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
