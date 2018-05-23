import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import CompatibilityMachine from './components/CompatibilityMachine';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <CompatibilityMachine />
      </div>
    );
  }
}

export default App;
