import "./form.scss";
import React from "react";
import {If,Else} from "../if/if";
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        method:'get',
        URL:'',
        body:{},
        history:[],
        validBody:true,

    }
  }
  onMethodChange=(e)=> {
    this.setState({method: e.target.value});
  }
  componentDidMount(){
    if(this.props.click){
      this.updateAndNotify();
      this.rerun(this.props.click)
    } 
  }
  componentDidUpdate(prevProps){
    if (prevProps.click !== this.props.click) {
      this.updateAndNotify();
    }
  }
  writeJSONCheck = async(e)=>{
    
    try {
      this.setState({body: JSON.parse(e.target.value)});
      
      this.setState({validBody:true});
    } catch (error) {
      this.setState({validBody:false});
    }
  }
  handleChange=(e)=>{
    this.setState({URL:e.value});
  }
  async updateAndNotify (){
    console.log('yes')
    const allData = JSON.parse(localStorage.getItem(`history`)) || [];
    const newData = allData[this.props.click];
    this.setState({URL:newData.URL,method:newData.method,body:newData.body});
    document.getElementById('body').value=JSON.stringify(newData.body);
  }

   rerun = async(idx)=>{
    this.props.loading(false);
    const allData = JSON.parse(localStorage.getItem(`history`)) || [];
    const newData = allData[idx];
      const raw = await fetch(newData.URL,{
        method: newData.method,
        headers: {
          'Content-Type': 'application/json',
        },
          body: (newData.method === 'get')? null : JSON.stringify(newData.body)
        })
      let response = await raw.json();
      let header ={}
       await raw.headers.forEach((val,key)=>{
        header[key]=val;
      });
      const newHistory = this.state.history;
      this.setState({ history:newHistory  });
      this.props.handler({header,response});
      this.props.loading(true);
  }

  submitHandler = async (e) => {
    this.props.loading(false);
    e.preventDefault();
    console.log(this.state.newData);
    console.log(e.target.body.value);
    let URL = e.target.urlText.value;
    let method = this.state.method;  
    this.setState({ URL });
    
    
    try {
      if (!this.state.validBody && method !=='get') throw new Error ('syntax error :Incorrect JSON input in the body')
      const raw = await fetch(URL,{
        method: this.state.method,
        // mode: 'no-cors',
        
        headers: {
          'Content-Type': 'application/json',
        },
          body: (method === 'get')? null : JSON.stringify(this.state.body)
        })
        if (!raw.ok) {
          const message = `An error has occurred: ${raw.status}`;
          throw new Error(message);
        }
      let response = await raw.json();
      let header ={}
       await raw.headers.forEach((val,key)=>{
        header[key]=val;
      });
      const newHistory =JSON.parse(localStorage.getItem('history')) || [] ;
      console.log(newHistory);
      newHistory.push({method,URL,body:this.state.body});
      console.log(newHistory);

      this.setState({ history:newHistory  });
      this.props.handler({header,response});
      this.props.updateHistory(this.state.history);
      this.props.loading(true);
    } catch (error) {
      this.props.errorHandler(error);
      this.props.loading(true);
    }
    
  };

  render() {
    return (
        <React.Fragment>

      <form action="" onSubmit={this.submitHandler}>
        <label htmlFor="urlText">URL : </label>
        <input type="text" onChange={this.handleChange} name="urlText" id="urlText" value={this.state.URL} required />
        <input type="submit" value="Go !" />
        <div className="methods">
          <input type="radio" name="method" id="get" value="get" checked={this.state.method === 'get'}  onChange={this.onMethodChange}/>
          <label htmlFor="get"> GET </label>
          <input type="radio" name="method" id="post" value="post" checked={this.state.method === 'post'} onChange={this.onMethodChange}/>
          <label htmlFor="post">POST </label>
          <input type="radio" name="method" id="delete" value="delete" checked={this.state.method === 'delete'} onChange={this.onMethodChange}/>
          <label htmlFor="delete">DELETE</label>
          <input type="radio" name="method" id="put" value="put" checked={this.state.method === 'put'} onChange={this.onMethodChange}/>
          <label htmlFor="put">PUT </label>
        </div>
        <label htmlFor="body">BODY ( json )</label>
         
          <If condition={this.state.validBody}>
            Correct Json
            </If> 
            <Else condition={this.state.validBody}>
              incorrect JSON
            </Else>
            
        <textarea  id="body" name="body" onChange={this.writeJSONCheck} ></textarea>
      </form>

      <div className="request">
          <div className='method'>{this.state.method}</div>
          <div className='URL'>{this.state.URL}</div>
      </div>
        </React.Fragment>
    );
  }
}
export default Form;
