import './App.css';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

import Dashboard from './views/userSection/Dashboard';
import SARC from './views/userSection/SARC';
import LocateHospital from './views/userSection/LocateHospital';
import Faqs from './views/userSection/Faqs';
import Evidence from './views/userSection/Evidence';

import AdminIndex from './views/adminSection/AdminIndex';
import AdminRegister from './views/adminSection/AdminRegister';
import AdminLogin from './views/adminSection/AdminLogin';
import ChatAdmin from './views/adminSection/ChatAdmin';
import ChatAdminMsg from './views/adminSection/ChatAdminMsg';

import AgentIndex from './views/agentSection/AgentIndex';
import AgentRegister from './views/agentSection/AgentRegister';
import AgentLogin from './views/agentSection/AgentLogin';

// ..
AOS.init();

function App() {
  // localStorage.clear();
  // console.log('LocalStorage cleared!');
	const { number } = useParams();

  return (
    <div className='w-full relative flex flex-col font-medium'>
      {/*<div id="google_translate_element" className='w-full'></div>*/}
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Dashboard />} />

        {/* SARC Route */}
        <Route path="/sarc" element={<SARC />} />

        {/* LocateHospital Route */}
        <Route path="/locate-hospital" element={<LocateHospital />} />

        {/* Faqs Route */}
        <Route path="/faqs" element={<Faqs />} />

        {/* All admin routes */}
        <Route path="/admin" element={<AdminIndex />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/chat" element={<ChatAdmin />} />
        <Route path="/admin/chat/:number" element={<ChatAdminMsg number={number} />} />

        {/* All agent routes */}
        <Route path="/agent" element={<AgentIndex />} />
        <Route path="/agent/login" element={<AgentLogin />} />
        <Route path="/agent/register" element={<AgentRegister />} />
        {/*<Route path="/agent/register" element={<AgentRegister />} />
        <Route path="/agent/login" element={<AgentLogin />} /> */}

        {/* Evidence Route */}
        <Route path="/evidence" element={<Evidence />} />

      </Routes>
    </div>
  );
}

export default App;