import './App.css';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import Dashboard from './views/Dashboard';

function App() {
  return (
    <div id='wrapper' className="App homepage font-black font-sans text-purple-900 h-screen py-2 flex flex-col items-center">
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Dashboard />} />

      </Routes>
    </div>
  );
}

export default App;