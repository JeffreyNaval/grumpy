import React from 'react';
import { Outlet } from 'react-router-dom';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';

function App() {
  return (
    <div>
        <Outlet/>
    </div>
  );
}

export default App;
