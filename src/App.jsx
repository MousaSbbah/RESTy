import './App.scss';
import React from 'react';
import Header from './components/header/header'; 
import Footer from './components/footer/footer';
import Main from './components/main/main';
import { BrowserRouter as Router } from 'react-router-dom';


class App extends React.Component {

  render(){

    return (
      <Router>
      <Header />
        <Main />
        <Footer />
        </Router>
    );

  }
}

export default App;
