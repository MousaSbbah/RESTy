import './App.scss';
import React from 'react';
import Header from './components/header/header'; 
import Form from './components/form/form'; 
import Footer from './components/footer/footer';
import Result from './components/result/result';
import History from './components/history/history';

class App extends React.Component {
  constructor(props) {
    const starter =JSON.parse(localStorage.getItem('history')) || [];
    super(props);

    this.state= {click:0,history:starter,loading:true,response:{type:'start',data:{}}
    }
}

handleForm = (data) =>{

    this.setState({response:{data,type:'json'}});
  
}

updateHistory = (data) =>{
  localStorage.setItem('history',JSON.stringify(data))
  this.setState({history:data});

}
selectRecord = (idx,obj) =>{
  this.setState({ click:idx });
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
          {this.state.history.map((obj,idx)=>{
            return (<div  key={idx} className='record' onClick={()=>{this.selectRecord(idx,obj)}}>
              <dev className='method'>{obj.method}</dev>
              <dev className='url'>{obj.URL}</dev>
              </div>
              )
          })}
        </History>

          </dev>
          <dev className='right'>
          <Form click={this.state.click}  loading={this.loading} handler={this.handleForm} updateHistory={this.updateHistory} errorHandler={this.handleErrors}/>
        <Result loading={this.state.loading} data = {this.state.response}/>

          </dev>

        
        

        </main>
        <Footer />
      </React.Fragment>
    );

  }
}

export default App;
