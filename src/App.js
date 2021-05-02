import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { DataProvider } from './GlobalState'
import Header from './compoonents/headers/Header'
import MainPages from './compoonents/mainpages/Pages'

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="app">
          <Header />
          <MainPages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
