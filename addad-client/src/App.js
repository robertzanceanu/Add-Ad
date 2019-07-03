import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Announces from './components/announces';
import Button from './components/addAnnounce';
class App extends React.Component {
  render() {
    // const data = this.state;

    return (
      <div>
        <Header />
        <div class="content">
          <Announces />
        <Button />
        </div>
        <Footer />

      </div>
    )
  }
}

export default App;