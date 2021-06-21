import './App.scss';
import React from 'react';
import Header from './components/header/header'; 
import Form from './components/form/form'; 
import Footer from './components/footer/footer';
import Result from './components/result/result';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state= {}
}

handleForm = (data) =>{
  this.setState(data)
}
  render(){

    return (
      <React.Fragment>
        <Header />
        <main>
        <Form  handler={this.handleForm}/>
        <Result data = {this.state}/>

        </main>
        <Footer />
      </React.Fragment>
    );

  }
}

export default App;
