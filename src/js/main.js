var main = main || {}; // establish the main namespace

(function(ns) {
    var onLoad = function() {
        // setup our defaults
        ns.defaultHost = 'github.com';
        ns.defaultOwner = 'slacgismo';
        ns.defaultProject = 'docs-browser';
        ns.defaultBranch = 'master';
        ns.defaultDoc = 'README.md';
        ns.defaultGetHost = 'raw.githubusercontent.com';

        // get our dom elements
        ns.selectOptionEl = $('#branch-select');
        ns.refreshDataBtn = $('#refresh-data');

        ns.setupListeners();
        ns.getBranchInformation();
    }

    ns.getContent = function(host = ns.defaultHost, 
                             owner = ns.defaultOwner, 
                             project = ns.defaultProject, 
                             branch = ns.defaultBranch) {
        const url = 'https://api.' + host + '/repos/' + owner + '/' + project + '/contents/docs?ref=' + branch;
        
        $.get(url).done(function(data) {
            console.warn('success', data)
        }).fail(function(err) { 
            console.warn('error', err)
        });
    }

    ns.setupListeners = function() {
        ns.refreshDataBtn.click(function() {
            alert('i was clicked')
        })
    }

    ns.getBranchInformation = function(host = ns.defaultHost, 
                                       owner = ns.defaultOwner, 
                                       project = ns.defaultProject) {
        const url = 'https://api.' + host + '/repos/' + owner + '/' + project + '/branches?per_page=1000';

        $.get(url).done(function(data) {
            console.warn('success', data)
            
            var selectOptions = data.reduce(function(acc, currentVal, idx) {
                var curOpt = '<option>' + currentVal.name + '</option>';
                if(idx === 1) {
                    return '<option>' + acc.name + '</option>' + curOpt;
                }
                return acc + curOpt;
            });

            ns.selectOptionEl.html(selectOptions);
        }).fail(function(err) { 
            console.warn('error', err)
        });
    }

    $(function() { onLoad() })
})(main);