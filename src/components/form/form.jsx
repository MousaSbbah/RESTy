import "./form.scss";
import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        method:'',
        URL:'',
    }
  }

  submitHandler = async (e) => {
    e.preventDefault();
    let URL = e.target.urlText.value;
    let method = e.target.method.value;
    this.setState({ URL, method });
    const raw = await fetch(URL,{
      method: method,
    })
    let response = await raw.json();
    let header ={}
     await raw.headers.forEach((val,key)=>{
      header[key]=val;
    });

    this.props.handler({header,response});
      
    
   
    
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
