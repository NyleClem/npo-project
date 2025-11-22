import PageContainer from "../components/PageContainer";
import PlaysTable from "../components/PlaysTable";

export default function ViewDataPage() {
  return (
    <PageContainer>
      <div className="page-container">
      <div>
        <h1 className="text-2xl font-bold mb-4">Play Data</h1>
        <PlaysTable />
      </div>
      </div>
    </PageContainer>
  );
}
