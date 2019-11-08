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
    }

    $(function() { onLoad() })
})(main);