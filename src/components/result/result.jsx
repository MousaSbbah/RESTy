import "./result.scss";
import ReactJson from "react-json-view";
import React from "react";
import { If, Else } from "../if/if";

class Result extends React.Component {
  render() {
    return (
      <React.Fragment>
        <If condition={this.props.loading}>
          <div className="resultContainer">
            <If condition={this.props.data.type === "json"}>
              <ReactJson src={this.props.data.data.header} name="Header" />
              <ReactJson src={this.props.data.data.response} name="Response" />
            </If>
            <If condition={this.props.data.type === "start"}>
            <div class="errorMsg"></div>
            </If>
            <Else condition={this.props.data.type === "json" || this.props.data.type === "start"}>
            <div class="errorModule">
  <div class="errorIcon">
    <i class="fa fa-unlink"></i>
  </div>
  <div class="errorMsg">Oops! Something went Wrong. Try Again</div>
</div>
            </Else>
          </div>
        </If>
        <Else condition={this.props.loading}>
        <div class="loader " >
          <div class="loader-wheel"></div>
          <div class="loader-text"></div>
        </div>
        </Else>
      </React.Fragment>
    );
  }
}

export default Result;
