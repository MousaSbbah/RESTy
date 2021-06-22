import "./form.scss";
import React from "react";
import {If,Else} from "../if/if";
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        method:'',
        URL:'',
        body:{},
        history:[],
        validBody:false
    }
  }
  writeJSONCheck = async(e)=>{
    try {
      this.setState({body:JSON.parse(e.target.value)});
      this.setState({validBody:true});
    } catch (error) {
      this.setState({validBody:false});
    }
  }
  submitHandler = async (e) => {
    this.props.loading(false);
    e.preventDefault();
    console.log(e.target);
    console.log(e.target.body.value);
    let URL = e.target.urlText.value;
    let method = e.target.method.value;
    this.setState({ URL, method });
    try {
      if (!this.state.validBody && method !=='get') throw new Error ('syntax error :Incorrect JSON input in the body')
      const raw = await fetch(URL,{
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
          body: (method === 'get')? null : JSON.stringify(this.state.body)
        })
        if (!raw.ok) {
          const message = `An error has occurred: ${raw.status}`;
          throw new Error(message);
        }
      console.log(this.state);
      let response = await raw.json();
      let header ={}
       await raw.headers.forEach((val,key)=>{
        header[key]=val;
      });
      const newHistory = this.state.history;
      newHistory.push({method,URL,body:this.state.body});
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
        <input type="text" name="urlText" id="urlText" required />
        <input type="submit" value="Go !" />
        <div className="methods">
          <input type="radio" name="method" id="get" value="get" defaultChecked/>
          <label htmlFor="get"> GET </label>
          <input type="radio" name="method" id="post" value="post" />
          <label htmlFor="post">POST </label>
          <input type="radio" name="method" id="delete" value="delete" />
          <label htmlFor="delete">DELETE</label>
          <input type="radio" name="method" id="put" value="put" />
          <label htmlFor="put">PUT </label>
        </div>
        <label htmlFor="body">BODY ( json )</label>
         
          <If condition={this.state.validBody}>
            Correct Json
            </If> 
            <Else condition={this.state.validBody}>
              incorrect JSON
            </Else>
            
        <textarea  id="body" name="body" onChange={this.writeJSONCheck}></textarea>
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
