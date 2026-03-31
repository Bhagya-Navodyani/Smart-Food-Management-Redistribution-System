import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/organization/Sidebar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="sidebar-container">
          <Sidebar />         
        </div>
      </div>
    </Router>
  );
}

export default App;
