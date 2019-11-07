// config.js
// Copyright (C) 2019 Regents of the Leland Stanford Junior University
//
// This module set the document specifications `host`, `owner`, `project`, `branch`, and `doc`
// as given by the URL, or if absent, as given by the current defaults
//
var banner = '<A HREF="https://github.com/slacgismo/docs-browser" TARGET="_blank">SLAC GISMo Docs Browser</A>';
var year = (new Date()).getFullYear();
if ( year > 2019 )
{
    year = "2019-" + year;
}
var copyright = '<A HREF="https://raw.githubusercontent.com/slacgismo/docs-browser/master/LICENSE" TARGET="_blank">Copyright (C) ' + year + ', Regents of the Leland Stanford Junior University</A>';
var query = new URLSearchParams(window.location.search);
var host = query.get('host');
if ( host == null )
{
    host = default_host;
}
var owner = query.get('owner');
if ( owner == null )
{
    owner = default_owner;
}
var project = query.get('project');
if ( project == null )
{
    project = default_project;
}
var branch = query.get('branch');
if ( branch == null )
{
    branch = default_branch;
}
var doc = query.get('doc');
if ( doc == null )
{
    doc = default_doc;
}
