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

        ns.setDefaults();           // assign our defaults to the DOM
        ns.setupListeners();        // attach event listeners to our DOM
        ns.getBranchInformation();
        ns.getContent();
    }

    /**
     * Set the defaults for the dom elements we care about
     */
    ns.setDefaults = function() {
        ns.hostInputEl.val(ns.defaultHost);
        ns.userOrgInputEl.val(ns.defaultOwner);
        ns.projectInputEl.val(ns.defaultProject);
    }

    /**
     * Request data to load as content from the given resource.
     * We assume github style structure and params
     */
    ns.getContent = function(host = ns.defaultHost, 
                             owner = ns.defaultOwner, 
                             project = ns.defaultProject, 
                             branch = ns.defaultBranch) {
        const url = 'https://api.' + host + '/repos/' + owner + '/' + project + '/contents/docs?ref=' + branch;
        
        $.get(url).done(function(data) {
            // TODO: on click, need to set data[n].html_url as the source document and download_url
            console.warn('success', data)
            let listItems = '';
            data.forEach(function(item) {
                listItems += "<a href='#' class='list-group-item list-group-item-action' " +
                    "onclick='main.loadMarkdownContent(" + JSON.stringify(item) + ")'>" + item.name + "</a>"
            });
            ns.listOfDocsEl.html(listItems);
        }).fail(function(err) {
            // TODO: create error handler 
            console.warn('error', err)
        });
    }

    /**
     * Attach our required click and change listeners
     */
    ns.setupListeners = function() {
        ns.refreshDataBtn.click(function() {
            alert('i was clicked');
        });
    }

    /**
     * Retrieve branch information for the given project and update
     * the select/options with the data returned
     */
    ns.getBranchInformation = function(host = ns.defaultHost, 
                                       owner = ns.defaultOwner, 
                                       project = ns.defaultProject) {
        const url = 'https://api.' + host + '/repos/' + owner + '/' + project + '/branches?per_page=1000';

        $.get(url).done(function(data) {
            console.warn('success', data);
            // build the options from the response
            var selectOptions = data.reduce(function(acc, currentVal, idx) {
                var curOpt = '<option>' + currentVal.name + '</option>';
                if(idx === 1) {
                    return '<option>' + acc.name + '</option>' + curOpt;
                }
                return acc + curOpt;
            });
            // attach the generated options to the dom
            ns.selectOptionEl.html(selectOptions);
        }).fail(function(err) {
            // TODO: create error handler
            console.warn('error', err);
        });
    }

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
        $.get(contentUrl).done(function(data) {
            // parse the markdown response
            $.ajax({
                url: markdownParserUrl,
                method: 'POST',
                contentType: 'text/plain',
                data: data
            }).done(function(response) {
                console.warn(response);
                ns.markdownPanelEl.html(response);
            }).fail(function(parserErr) {
                // TODO: write error handler
                console.warn(parserErr);
            });
        }).fail(function(err) {
            // TODO: write error handler
            console.warn(err);
        });
    }

    // on document.ready, get everything going
    $(function() { onLoad(); })
})(main);
