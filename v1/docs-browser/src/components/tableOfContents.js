import React from 'react';

export class TableOfContents extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      contentsList: [],
      contentSelected: ""
    };
  }
  
  handleContentClick = (e) => {
    this.setState({contentSelected: e.target.value});
  }

  contentsListComp = (contentsList) => {
    contentsList.map((content,idx) => {
      return <li key={idx} onclick={this.handleContentClick}>{content}</li>
    })
    return contentsList;
  }


  render() {
    return (
      <div>
        <ul>
          {this.contentsListComp(this.state.contentsList)}
        </ul>
      </div>
    )
  }
}

export default TableOfContents;
