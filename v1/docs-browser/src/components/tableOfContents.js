import React from "react";
import axios from "axios";

export class TableOfContents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentsList: [],
    };
  }

  getContentsList = (host, org, project, branch) => {
    const url =
      "https://api." +
      host +
      "/repos/" +
      org +
      "/" +
      project +
      "/contents/docs?ref=" +
      branch;
    axios
      .get(url)
      .then((response) => {
        const contentsFiltered = response["data"].map((item) => [
          item.name,
          item.download_url,
        ]);
        this.setState({ contentsList: contentsFiltered });
      })
      .catch((error) => {
        //this is no docs folder error handling
        console.warn(error);
      });
  };

  setFolderComponent = (idx, folder) => {
    return (
      <li key={idx} className="nameBox">
        <div
          onClick={(e) => this.props.handleStateChange("folder", folder)}
          className="clickBox"
        >
          {folder[0]}
        </div>
      </li>
    );
  };

  setFileComponent = (idx, file) => {
    const fileComp = (
      <li key={idx} className="nameBox">
        <div
          onClick={(e) => this.props.handleStateChange("file", file)}
          className="clickBox"
        >
          {file[0]}
        </div>
      </li>
    );
    return fileComp;
  };

  contentsListComp = (contentsList) => {
    let checkFiles = /^.*\.(md)$/;
    const contents = [];
    for (let i = 0; i < contentsList.length; i++) {
      if (checkFiles.test(contentsList[i][0])) {
        contents.push(this.setFileComponent(i, contentsList[i]));
      } else {
        contents.push(this.setFolderComponent(i, contentsList[i]));
      }
    }
    return contents;
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.project !== this.props.project ||
      prevProps.branch !== this.props.branch
    ) {
      this.getContentsList(
        this.props.host,
        this.props.org,
        this.props.project,
        this.props.branch
      );
    }
  }

  render() {
    return (
      <div>
        <ul>{this.contentsListComp(this.state.contentsList)}</ul>
      </div>
    );
  }
}

export default TableOfContents;
