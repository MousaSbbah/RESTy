// import '../App.scss';
import React from 'react';
import Form from '../form/form'; 
import Result from '../result/result';
import History from '../history/history';
import './main.scss';
import { Route, Switch ,Link} from 'react-router-dom';


class Main extends React.Component {
  constructor(props) {
    const starter =JSON.parse(localStorage.getItem('history')) || [];
    super(props);

    this.state= {render:false, click:'',history:starter,loading:true,response:{type:'start',data:{}}
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
}

handleErrors = (data) =>{

  this.setState({response:{data,type:'error'}});

}
rerun = (data)=>{
    console.log(data);
    this.setState({ click:data , render:true});
    this.setState({ render: false });
}
  render(){

    return (
        <main>
        <Switch>
        <Route exact path="/">
            <div className="home">



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
          <Form render={this.state.render} click={this.state.click}  loading={this.loading} handler={this.handleForm} updateHistory={this.updateHistory} errorHandler={this.handleErrors}/>
        <Result loading={this.state.loading} data = {this.state.response}/>

          </dev>
            </div>
        </Route>
        <Route path="/details/:id" render={(props)=>{
            return(
                <div className='recordDetails'>
                    <div>
                        <h2>Method</h2>
                        <p>{this.state.history[(props.match.params.id)].method}</p>
                    </div>
                    <div>
                    <h2>URL</h2>
                        <p>{this.state.history[(props.match.params.id)].URL}</p>
                    </div>
                    <div>
                    <h2>Body</h2>
                        <p>{JSON.stringify(this.state.history[(props.match.params.id)].body) }</p>
                    </div>

                   <Link onClick={()=>{this.rerun(props.match.params.id,);}} to='/'>
                        Run This Request
                </Link>
                    
                    </div>
            )
        }} />
                       
        <Route path="/history">
            <div className="historyMain">


        <History>
          {this.state.history.map((obj,idx)=>{
            return (<Link to={`/details/${idx}`}><div  key={idx} className='record' onClick={()=>{this.selectRecord(idx,obj)}}>
              <dev className='method'>{obj.method}</dev>
              <dev className='url'>{obj.URL}</dev>
              </div>
              </Link>
              )
          })}
        </History>
            </div>
            </Route> 
        <Route path="/help">
            <div className='help'>
            <h2>How To Use RESTy</h2>
            <div>
                <h3>Home Page</h3>
                <ul>
                    <li>enter the api url</li>
                    <li>choose a method</li>
                    <li>Insert a body if need</li>
                    <li>Click Go!</li>
                    <li>in the left side you can see the history</li>
                    <li>If you click in a history record the for will fill with this record data</li>
                </ul>
            </div>
            <div>
                <h3>History</h3>

                <ul>
                    <li>You can see in this page the history of requests</li>
                    <li>If you click on a request the details page will shown</li>
                    <li>In the details page you can click on run the request</li>
                    <li>when run the request clicked the request you will be redirected to home page</li>
                    <li>and the result will show again</li>
                    <li>If you click in a history record the for will fill with this record data</li>
                </ul>
            </div>


            </div>
            
            
            
            </Route>        
        <Route path="*" >
                <dev>404</dev>
            </Route>            
        </Switch>
                </main>
    );

  }
}

export default Main;
