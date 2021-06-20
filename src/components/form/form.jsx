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

  submitHandler = (e) => {
    e.preventDefault();
    let URL = e.target.urlText.value;
    let method = e.target.method.value;
    this.setState({ URL, method });
    console.log(this.state);
  };

  render() {
    return (
        <div>


      <form action="" onSubmit={this.submitHandler}>
        <label htmlFor="urlText">URL : </label>
        <input type="text" name="urlText" id="urlText" required />
        <input type="submit" value="Go !" />
        <div className="methods">
          <label htmlFor="get"> GET </label>
          <input type="radio" name="method" id="get" value="get" defaultChecked/>
          <label htmlFor="post">POST </label>
          <input type="radio" name="method" id="post" value="post" />
          <label htmlFor="delete">DELETE</label>
          <input type="radio" name="method" id="delete" value="delete" />
          <label htmlFor="put">PUT </label>
          <input type="radio" name="method" id="put" value="put" />
        </div>
      </form>

      <div className="history">
          <div className='method'>{this.state.method}</div>
          <div className='URL'>{this.state.URL}</div>
      </div>
        </div>
    );
  }
}
export default Form;
