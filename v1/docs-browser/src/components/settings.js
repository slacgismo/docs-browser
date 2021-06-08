import React from "react";
import axios from "axios";

export class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      host: "",
      org: "",
      projectList: [],
      project: "",
      branchList: [],
      branch: "",
    };
  }

  handleHostChange = (e) => {
    this.setState({ host: e.target.value });
  };

  handleOrgChange = (e) => {
    this.setState({ org: e.target.value });
  };

  handleProjectChange = (e) => {
    this.setState({ project: e.target.value })
  }

  handleBranchChange = (e) => {
    this.setState({ branch: e.target.value })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.org !== this.state.org) {
      const url = 'https://api.' + this.state.host + '/users/' + this.state.org + '/repos?per_page=1000';
      axios.get(url)
      .then((response) => {
        const projectsFiltered = response['data'].map(item => item['name'])
        this.setState({projectList: projectsFiltered})
      })
      .catch(error => {
        console.warn(error);
      });
    }

    if (prevState.project !== this.state.project){
      const url = 'https://api.' + this.state.host + '/repos/' + this.state.org + '/' + this.state.project + '/branches?per_page=1000';
      axios.get(url)
      .then((response) => {
        const branchesFiltered = response['data'].map(item => item['name'])
        this.setState({branchList: branchesFiltered})
      })
      .catch(error => {
        console.warn(error);
      });
    }
  }

  render() {
    return (
      <div>
        <div class="form-group">
          <label for="host-input">Host</label>
          <input
            type="text"
            class="form-control"
            id="host-input"
            aria-describedby="host-help"
            placeholder="github.com"
            onBlur={(e) => this.handleHostChange(e)}
          />
          <small id="host-help" class="form-text text-muted">
            This should generally be set to github.com but can be set to any
            host that support the GitHub API.
          </small>
        </div>
        <div class="form-group">
          <label for="user-org-input">User/Organization</label>
          <input
            type="text"
            class="form-control"
            id="user-org-input"
            aria-describedby="user-org-help"
            placeholder="Enter User/Organization"
            onBlur={(e) => this.handleOrgChange(e)}
          />
          <small id="user-org-help" class="form-text text-muted">
            This must be set to the default project owner (user or organization,
            e.g., slacgismo).
          </small>
        </div>
        <hr />
        <div class="form-group">
          <label for="project-input">Project</label>
          <select
            class="form-control"
            id="project-select"
            aria-describedby="project-help"
            onChange={(e) => this.handleProjectChange(e)}
          >
            {this.state.projectList.map((project) => (
              <option>{project}</option>
            ))}
          </select>
          <small id="project-help" class="form-text text-muted">
            This must be set to the default project name (e.g., docs-browser).
          </small>
        </div>
        <div class="form-group">
          <label for="branch-select">Branch</label>
          <select
            class="form-control"
            id="branch-select"
            aria-describedby="branch-help"
            onChange={(e) => this.handleBranchChange(e)}
          >
            {this.state.branchList.map((branch) => (
              <option>{branch}</option>
            ))}
          </select>
          <small id="branch-help" class="form-text text-muted">
            This should be set to the default branch (e.g., master).
          </small>
        </div>
      </div>
    );
  }
}

export default Settings;
