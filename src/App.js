import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import CompatibilityMachine from './components/CompatibilityMachine';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <CompatibilityMachine />
        <Footer />
      </div>
    );
  }
}

export default App;
