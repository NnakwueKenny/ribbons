import './App.css';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import Dashboard from './views/Dashboard';import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import SARC from './views/SARC';
// ..
AOS.init();

function App() {
  return (
    <div id='wrapper' className="App homepage font-black font-sans h-screen py-2 flex flex-col items-center">
      <div className='w-full relative h-full max-w-lg font-medium md:border-2 rounded-3xl'>
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Dashboard />} />

          {/* SARC Route */}
          <Route path="/sarc" element={<SARC />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;