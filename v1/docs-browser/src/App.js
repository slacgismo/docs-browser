import React from "react";
import { Paperbase } from "./Layouts/Base";
// import { TableOfContents } from "./Components/TableOfContents";
// import { Settings } from "./Components/Settings";
// import { Markdown } from "./Components/Markdown";

import "./css/App.css";

export class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    host: "github.com",
    org: "",
    project: "",
    branch: "",
    folder: "",
    file: [],
  };
}

handleStateChange = (field, value) => {
  this.setState({ [field]: value });
};

  render() {
    return (
      <div>
        <Paperbase
          host = {this.state.host}
          org = {this.state.org}
          project = {this.state.project}
          branch = {this.state.branch}
          folder = {this.state.folder}
          file = {this.state.file}
          handleStateChange = {(field, value) =>
            this.handleStateChange(field, value)
          }
          />
      </div>
    );
  }
}

export default App;
