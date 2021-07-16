import React from "react";
import axios from "axios";
// import { Markup } from 'interweave';
import ReactMarkdown from 'react-markdown';
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
      markdownBody: "No document selected"
    };
  }

  getMarkdownBody = (file) => {
    const url = file[1];
    axios
      .get(url)
      .then((res) => {
        this.setState({ markdownBody: res.data });
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
      <ReactMarkdown>{this.state.markdownBody}</ReactMarkdown>
    );
  }
}

export default withStyles(styles)(Markdown);
