import { NavLink } from "react-router-dom";
import PageContainer from "../components/PageContainer";
const Dashboard = () => {
  return (
    <PageContainer>
      <div className="page-container">
    <div className="w-full flex justify-center mt-10">
      <div className="p-8 bg-white shadow-md rounded-xl w-[400px]">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Dashboard
        </h1>

        <div className="flex flex-col gap-4">
          <NavLink
            to="/view"
            className="p-3 text-center bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            View Data
          </NavLink>

          <NavLink
            to="/upload"
            className="p-3 text-center bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            Upload Data
          </NavLink>
        </div>
      </div>
    </div>
    </div>
    </PageContainer>
  );
};

export default Dashboard;