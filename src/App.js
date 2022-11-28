import './App.css';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import Dashboard from './views/Dashboard';import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import SARC from './views/SARC';
import LocateHospital from './views/LocateHospital';
import Faqs from './views/Faqs';

import AdminIndex from './views/adminSection/AdminIndex';
import AdminRegister from './views/adminSection/AdminRegister';
import AdminLogin from './views/adminSection/AdminLogin';
import ChatAdmin from './views/adminSection/ChatAdmin';
import ChatAdminMsg from './views/adminSection/ChatAdminMsg';

import AgentIndex from './views/agentSection/AgentIndex';
import AgentRegister from './views/agentSection/AgentRegister';
import AgentLogin from './views/agentSection/AgentLogin';

import Evidence from './views/Evidence';
// ..
AOS.init();

function App() {
  // localStorage.clear();
  // console.log('LocalStorage cleared!');
  return (
    <div id='wrapper' className="App homepage font-black font-sans h-screen flex flex-col items-center">
      {/*<div id="google_translate_element" className='w-full'></div>*/}
      <div className='w-full relative flex flex-col h-full font-medium '>
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
          <Route path="/chat-admin" element={<ChatAdmin />} />
          <Route path="/chat-admin-msg/:number" element={<ChatAdminMsg />} />

          {/* All agent routes */}
          <Route path="/agent" element={<AgentIndex />} />
          {/*<Route path="/agent/register" element={<AgentRegister />} />
  <Route path="/agent/login" element={<AgentLogin />} /> */}

            {/* ChatAdminMsg Route */}
            <Route path="/chat-admin-msg/:number" element={<ChatAdminMsg />} />

          {/* Evidence Route */}
          <Route path="/evidence" element={<Evidence />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;