import "./history.scss";
import React from "react";

class History extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="historyContainer">
          <header>
              <h1>
                  History ({this.props.children.length})
              </h1>
              </header>  
              <div>
                  {this.props.children}
                  </div>      
        </div>
      </React.Fragment>
    );
  }
}

export default History;
