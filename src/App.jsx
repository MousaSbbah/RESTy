import './App.scss';
import React from 'react';
import Header from './components/header/header'; 
import Form from './components/form/form'; 
import Footer from './components/footer/footer';
import Result from './components/result/result';
import History from './components/history/history';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state= {history:[],loading:true,response:{type:'',data:{}}
    }
}

handleForm = (data) =>{

    this.setState({response:{data,type:'json'}});
  
}

updateHistory = (data) =>{

  this.setState({history:data});

}

loading = (data)=>{
  this.setState({ loading:data});
  console.log(data)
}

handleErrors = (data) =>{

  this.setState({response:{data,type:'error'}});

}
  render(){

    return (
      <React.Fragment>
        <Header />
        <main>
        <dev className='left'>
          <History>
          {this.state.history.map(obj=>{
            return (<div className='record'>
              <dev className='method'>{obj.method}</dev>
              <dev className='url'>{obj.URL}</dev>
              </div>
              )
          })}
        </History>

          </dev>
          <dev className='right'>
          <Form loading={this.loading} handler={this.handleForm} updateHistory={this.updateHistory} errorHandler={this.handleErrors}/>
        <Result loading={this.state.loading} data = {this.state.response}/>

          </dev>

        
        

        </main>
        <Footer />
      </React.Fragment>
    );

  }
}

export default App;
