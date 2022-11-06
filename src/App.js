import './App.css';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import Dashboard from './views/Dashboard';import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

function App() {
  return (
    <div id='wrapper' className="App homepage font-black font-sans h-screen py-2 flex flex-col items-center">
      <div className='w-full relative h-full max-w-md font-medium md:border-2 rounded-3xl'>
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;