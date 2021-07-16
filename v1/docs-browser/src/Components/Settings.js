import React from "react";
import axios from "axios";
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = {
  root: {
    padding: 10,
    size: 12
  },
  input: {
    paddingBottom: 2,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    fontSize: 14
  }
};

export class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: [],
      branchList: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.org !== this.props.org) {
      const url =
        "https://api." +
        this.props.host +
        "/users/" +
        this.props.org +
        "/repos?per_page=1000";
      axios
        .get(url)
        .then((response) => {
          const projectsFiltered = response["data"].map((item) => item["name"]);
          this.setState({ projectList: projectsFiltered });
        })
        .catch((error) => {
          console.warn(error);
        });
    }

    if (prevProps.project !== this.props.project || prevProps.org !== this.props.org) {
      const url =
        "https://api." +
        this.props.host +
        "/repos/" +
        this.props.org +
        "/" +
        this.props.project +
        "/branches?per_page=1000";
      axios
        .get(url)
        .then((response) => {
          const branchesFiltered = response["data"].map((item) => item["name"]);
          this.setState({ branchList: branchesFiltered });
        })
        .catch((error) => {
          console.warn(error);
        });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <TextField
          id="standard-basic-host"
          placeholder="github.com"
          InputProps={{
            className: classes.input
          }}
          onBlur={(e) => this.props.handleStateChange("host", e.target.value)}
        />
        <TextField
          id="standard-basic-org"
          placeholder="Enter User or Organization"
          InputProps={{
            className: classes.input
          }}
          onBlur={(e) => this.props.handleStateChange("org", e.target.value)}
          helperText="This must be set to the default project owner (user or organization, e.g., slacgismo)."
        />
        <TextField
          id="standard-select-project"
          select
          label="Select Project"
          InputProps={{
            className: classes.input
          }}
          onBlur={(e) => this.props.handleStateChange("project", e.target.value)}
          helperText="This must be set to the default project owner (user or organization, e.g., slacgismo)."
        >
          {this.state.projectList.map((project) => (
              <option key={project} value={project}>{project}</option>
          ))}
        </TextField>
        <TextField
          id="standard-select-branch"
          select
          label="Select Branch"
          InputProps={{
            className: classes.input
          }}
          onBlur={(e) => this.props.handleStateChange("branch", e.target.value)}
          helperText="This should be set to the default branch (e.g., master)."
        >
          {this.state.branchList.map((branch) => (
              <option key={branch} value={branch}>{branch}</option>
          ))}
        </TextField>
      </div>
    );
  }
}

export default withStyles(styles)(Settings);
