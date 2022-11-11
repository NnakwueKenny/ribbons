import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter} from "react-router-dom";

document.tidioChatLang = navigator.language.slice(0,2);
console.log(document.tidioChatLang);
console.log(document.querySelector('html').getAttribute('lang'))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
		</BrowserRouter>
  </React.StrictMode>
);
