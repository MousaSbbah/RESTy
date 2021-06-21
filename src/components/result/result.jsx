import "./result.scss";
import ReactJson from 'react-json-view';
import React from "react";

class Result extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="resultContainer">
          
          <ReactJson src={this.props.data.header} name='Header'/>
          <ReactJson src={this.props.data.response} name='Response'/>
          
        </div>
      </React.Fragment>
    );
  }
}

export default Result;
