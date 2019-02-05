import React, { Component } from 'react';

import Calendar from './components/Calendar'
import Courses from './components/Courses' 
import Footer from './components/Footer'
import Navbar from './components/Navbar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <div className="row mt-3">
            <Calendar />
            <Courses />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
