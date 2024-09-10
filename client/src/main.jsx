import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux";
import store from "./Redux/store.js";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom"; 

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Toaster/>
      <App />
    </BrowserRouter>
  </Provider>

)
