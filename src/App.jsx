import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import StudentsTable from './components/StudentsTable';

export default function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="p-4">
          <StudentsTable />
        </main>
      </div>
    </div>
  );
}
