import React from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    padding: 10,
    size: 12,
  },
};

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
      .then((res) => res.data)
      .then((data) => {
        const markdownParserUrl = "https://api.github.com/markdown";
        const markdownData = {
          "text": data
        }
        const markdownHeaders = {
          "Accept": "application/vnd.github.v3+json"
        }
        axios
          .post(markdownParserUrl, {
            markdownHeaders,
            markdownData
          })
          .then((response) => {
            this.setState({ markdownBody: response["data"] });
          })
          .catch((error) => {
            console.warn(error);
          });
      })
      .catch((error) => {
        console.warn(error);
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
    return (
      <div dangerouslySetInnerHTML={{ __html: this.state.markdownBody }} />
    );
  }
}

export default withStyles(styles)(Markdown);
