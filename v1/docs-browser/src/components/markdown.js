import React from "react";
import axios from "axios";

export class Markdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdownBody: "",
    };
  }

  getMarkdownBody = (file) => {
    const url = file[1];
    axios
      .get(url)
      .then((response) => {
        this.setState({ markdownBody: response["data"] });
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.file !== this.props.file) {
      this.getMarkdownBody(this.props.file);
    }
  }

  render() {
    return <div>{this.state.markdownBody}</div>;
  }
}

export default Markdown;
