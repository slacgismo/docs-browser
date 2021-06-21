import React from "react";
import { TableOfContents } from "./components/tableOfContents";
import { Settings } from "./components/settings";
import { Markdown } from "./components/markdown";

import "./css/App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      host: "",
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
        <nav class="navbar navbar-default">
          <div class="container-fluid">
            <div class="navbar-header">
              <a
                class="navbar-brand"
                href="https://gismo.slac.stanford.edu/"
                rel="noreferrer"
                target="_blank"
              >
                <image class="navbar-logo" src="./img/gismo-logo.png" />
              </a>
            </div>
          </div>
        </nav>
        <main role="main" class="main-content flex-shrink-0">
          <div class="row">
            <div class="col-md-3 d-none d-md-block bg-light sidebar">
              <form class="nav-form">
                <div class="form-group">
                  <Settings
                    host={this.state.host}
                    org={this.state.org}
                    branch={this.state.branch}
                    project={this.state.project}
                    handleStateChange={(field, value) =>
                      this.handleStateChange(field, value)
                    }
                  />
                </div>
              </form>
              <br />
              <div class="form-group">
                <TableOfContents
                  host={this.state.host}
                  org={this.state.org}
                  branch={this.state.branch}
                  project={this.state.project}
                  folder={this.state.folder}
                  file={this.state.file}
                  handleStateChange={(field, value) =>
                    this.handleStateChange(field, value)
                  }
                />
              </div>
            </div>
            <div id="right-panel" class="col-md-9">
              <Markdown file={this.state.file} />
            </div>
          </div>
        </main>
        <br />
        <footer class="footer mt-auto py-3">
          <div class="container">
            <a
              href="https://raw.githubusercontent.com/slacgismo/docs-browser/master/LICENSE"
              rel="noreferrer"
              target="_blank"
            >
              Copyright (C) 2019, Regents of the Leland Stanford Junior
              University
            </a>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
