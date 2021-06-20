import './App.scss';
import React from 'react';
import Header from './components/header/header'; 
import Form from './components/form/form'; 
import Footer from './components/footer/footer';

function App() {
  return (
    <React.Fragment>
      <Header />
      <Form />
      <Footer />
    </React.Fragment>
  );
}

export default App;
