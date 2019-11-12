// establish the main namespace - gets loaded with index.html
var main = main || {};

(function(ns) {
  /**
   * To execute when the document is ready.
   * - Set defaults
   * - Cache the DOM elements we need to operate on
   * - Attach listeners
   * - Request initial required data
   */
  var onLoad = function() {
    // set the main namespace default values
    ns.defaultHost = 'github.com';
    ns.defaultOwner = 'slacgismo';
    ns.defaultProject = 'docs-browser';
    ns.defaultBranch = 'master';
    ns.defaultDoc = 'README.md';
    ns.defaultGetHost = 'raw.githubusercontent.com';

    // get our dom elements
    ns.selectOptionEl = $('#branch-select');
    ns.refreshDataBtn = $('#refresh-data');
    ns.hostInputEl = $('#host-input');
    ns.userOrgInputEl = $('#user-org-input');
    ns.projectInputEl = $('#project-input');
    ns.listOfDocsEl = $('#list-of-docs');
    ns.markdownPanelEl = $('#markdown-panel');

    ns.loginForm = $('#login-form');
    ns.loginButton = $('#login-btn');
    ns.logoutButton = $('#logout-btn');
    ns.usernameField = $('#username');
    ns.passwordField = $('#password');
    ns.loginErrorMessage = $('#login-error-msg');
    ns.headerUser = $('#header-user');

    // Logged in user
    ns.user = null;

    // Set up AJAX calls to use Auth header if a token is available
    $.ajaxSetup({
      beforeSend: function(xhr) {
        //Only add auth header to Github API requests
        const isGithubAPIRequest = /^https:\/\/api\.github\.com/.test(this.url);
        const authToken = sessionStorage.getItem('authToken');
        if (isGithubAPIRequest && ns.user && authToken) {
          xhr.setRequestHeader('Authorization', `Basic ${authToken}`);
        }
      }
    });

    ns.setDefaults(); // assign our defaults to the DOM
    ns.setupListeners(); // attach event listeners to our DOM

    // Attempt a login before making an API request
    ns.loginFromSessionStorage().then(() => {
      ns.getBranchInformation();
      ns.getContent();
    });
  };

  /**
   * Set the defaults for the dom elements we care about
   */
  ns.setDefaults = function() {
    ns.hostInputEl.val(ns.defaultHost);
    ns.userOrgInputEl.val(ns.defaultOwner);
    ns.projectInputEl.val(ns.defaultProject);
  };

  /**
   * Attempt a login using a stored sessionStorage token
   */
  ns.loginFromSessionStorage = function() {
    return new Promise((resolve, _) => {
      const authToken = sessionStorage.getItem('authToken');
      if (authToken) {
        const selectedHost = ns.hostInputEl.val();
        ns.getUserInfo(authToken, selectedHost)
          .then(user => {
            ns.setUser(user);
            resolve();
          })
          .catch(resolve);
      } else {
        resolve();
      }
    });
  };

  /**
   * Attempt a login using username and password/oauth token
   */
  ns.login = function(username, password, host) {
    // Create basic auth token
    const authToken = btoa(`${username}:${password}`);

    // Clear error
    ns.loginErrorMessage.text('');

    ns.getUserInfo(authToken, host)
      .then(user => {
        ns.setUser(user);
        sessionStorage.setItem('authToken', authToken);
        ns.getContent();
      })
      .catch(e => {
        ns.user = null;
        sessionStorage.removeItem('authToken');
        const reason =
          e.status === 401 ? 'Invalid credentials' : 'Unknown Error';
        let errorMessage = `Login Failed: ${reason}`;
        ns.loginErrorMessage.text(errorMessage);
        console.warn('Login Error', e);
      });
  };

  /**
   * Returns a promise that resolves to a fetched github user
   */
  ns.getUserInfo = function(authToken, host = ns.defaultHost) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `https://api.${host}/user`,
        type: 'GET',
        headers: {
          Authorization: `Basic ${authToken}`
        },
        success: resolve,
        error: reject
      });
    });
  };

  /**
   * Set user object in namespace, and update relevant areas of DOM
   */
  ns.setUser = function(user) {
    ns.user = user;

    ns.loginButton.hide();
    // Show user's name in the navbar as a link to their github profile
    ns.headerUser
      .html(
        `<a class="nav-link" href="https://github.com/${
          user.login
        }" target="_blank" rel="noopener noreferrer" >${user.name ||
          user.login}</a>`
      )
      .show();

    ns.logoutButton.show();
  };

  /**
   * Log the current user out.
   * Removed sessionStorage item, user object, and resets header
   */
  ns.logout = function() {
    ns.user = null;
    sessionStorage.removeItem('authToken');
    ns.headerUser.html(`<a href="" ></a>`).hide();
    ns.logoutButton.hide();
    ns.loginButton.show();
  };

  /**
   * Request data to load as content from the given resource.
   * We assume github style structure and params
   */
  ns.getContent = function(
    host = ns.defaultHost,
    owner = ns.defaultOwner,
    project = ns.defaultProject,
    branch = ns.defaultBranch
  ) {
    const url = `https://api.${host}/repos/${owner}/${project}/contents/docs?ref=${branch}`;

    $.get(url)
      .done(function(data) {
        let listItems = '';
        let readmeLoaded = false;

        data.forEach(function(item) {
          listItems +=
            "<a href='#' class='list-group-item list-group-item-action' " +
            "onclick='main.loadMarkdownContent(" +
            JSON.stringify(item) +
            ")'>" +
            item.name +
            '</a>';

          // by default we want to load the README.md file
          if (item.name === 'README.md') {
            ns.loadMarkdownContent(item);
            readmeLoaded = true;
          }
        });

        ns.listOfDocsEl.html(listItems);
        // if there was no readme, load the first document
        if (!readmeLoaded) {
          ns.loadMarkdownContent(data[0]);
        }
      })
      .fail(ns.handleGithubAPIError);
  };

  /**
   * Attach our required click and change listeners
   */
  ns.setupListeners = function() {
    ns.refreshDataBtn.click(function() {
      // get all the input params
      let selectedHost = ns.hostInputEl.val(),
        selectedUserOrg = ns.userOrgInputEl.val(),
        selectedProject = ns.projectInputEl.val();
      // get the new content for the new params
      ns.getContent(selectedHost, selectedUserOrg, selectedProject);
      // get the new branch information
      ns.getBranchInformation(selectedHost, selectedUserOrg, selectedProject);
    });

    ns.selectOptionEl.on('change', function() {
      // get all the input params
      let selectedHost = ns.hostInputEl.val(),
        selectedUserOrg = ns.userOrgInputEl.val(),
        selectedProject = ns.projectInputEl.val();
      // get the new content for the new params
      ns.getContent(selectedHost, selectedUserOrg, selectedProject, this.value);
    });

    // Handle login for submissions
    ns.loginForm.submit(function(e) {
      e.preventDefault();
      const selectedHost = ns.hostInputEl.val();
      const username = ns.usernameField.val();
      const password = ns.passwordField.val();
      ns.login(username, password, selectedHost);
    });
  };

  /**
   * Retrieve branch information for the given project and update
   * the select/options with the data returned.
   *
   * Whenever this is called we assume we should default to master
   */
  ns.getBranchInformation = function(
    host = ns.defaultHost,
    owner = ns.defaultOwner,
    project = ns.defaultProject
  ) {
    const url = `https://api.${host}/repos/${owner}/${project}/branches?per_page=1000`;

    $.get(url)
      .done(function(data) {
        function option(branch) {
          return `<option
                value="${branch.name}"
                ${branch.name === ns.defaultBranch ? 'selected' : ''}
              >
              ${branch.name}
              </option>`;
        }
        // build the options from the response
        var selectOptions = data.map(option).join('');
        // attach the generated options to the dom
        ns.selectOptionEl.html(selectOptions);
      })
      .fail(ns.handleGithubAPIError);
  };

  ns.isMarkdownFile = function(filename) {
    const parts = filename.split('.');
    return parts.length > 1 && parts[parts.length - 1].toLowerCase() === 'md';
  };

  /**
   * Use the host's API to convert raw markdown into an HTML doc.
   * We first perform an api request for the raw content (markdown),
   * then send it to another api endpoint to convert it into the appropriate
   * markup that we then display on screen.
   */
  ns.loadMarkdownContent = function(item, host = ns.defaultHost) {
    const contentUrl = item.download_url,
      markdownParserUrl = 'https://api.' + host + '/markdown/raw';

    // get the markdown content
    $.get(contentUrl)
      .done(function(data) {
        // parse the markdown response
        $.ajax({
          url: markdownParserUrl,
          method: 'POST',
          contentType: 'text/plain',
          data: data
        })
          .done(function(response) {
            ns.markdownPanelEl.html(response);
            ns.typesetMathematicalFormulas();
          })
          .fail(ns.handleGithubAPIError);
      })
      .fail(ns.handleGithubAPIError);
  };

  /**
   * Force our math processing api to re-typeset the page
   * We are currently using MathJax
   */
  ns.typesetMathematicalFormulas = function(mathApi = MathJax) {
    console.warn('calling mathjax api', mathApi);
    mathApi.typeset();
  };

  /**
   * Handle github API errors by popping up a modal
   */
  ns.handleGithubAPIError = function(e) {
    let errorMessage = e.responseText || 'An unknown error occurred';
    if (e.status && e.status === 403) {
      errorMessage =
        'You have reached the Github API limit.  If you have not logged in, please do so for a higher quota.';
    }
    $('#error-modal-body').text(errorMessage);
    $('#error-modal').modal('show');

    console.warn('Github API Error', e);
  };

  // on document.ready, get everything going
  $(function() {
    onLoad();
  });
})(main);
