import React from 'react';
import { TableOfContents } from './components/tableOfContents';
import { Settings } from './components/settings';
import { Markdown } from './components/markdown';

import './css/App.css';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
      };
  }

  render() {
      return (
        <div>
            <body class="d-flex flex-column h-100">
                <nav class="navbar navbar-default">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand" href="https://gismo.slac.stanford.edu/" rel="noreferrer" target="_blank">
                                <image class="navbar-logo" src="./img/gismo-logo.png"/>
                            </a>
                        </div>
                    </div>
                </nav> 
                <main role="main" class="main-content flex-shrink-0">
                    <div class="row">
                        <div class='col-md-3 d-none d-md-block bg-light sidebar'>
                            <form class='nav-form'>
                                <div class="form-group">
                                    <Settings/>
                                </div>
                                <br />
                                <div class='table-of-contents'>
                                    <TableOfContents/>
                                </div>
                            </form>
                        </div>

                        <div id='right-panel' class='col-md-9'>
                            <Markdown/>
                        </div>
                    </div>
                </main>
            </body>

            <footer class='footer mt-auto py-3'>
                <div class='container'>
                    <a href="https://raw.githubusercontent.com/slacgismo/docs-browser/master/LICENSE" rel="noreferrer" target="_blank">Copyright (C) 2019, Regents of the Leland Stanford Junior University</a>
                </div>
            </footer>
        </div>
      )
    }
}


export default App;
