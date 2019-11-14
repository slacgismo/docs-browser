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

function set_default(cname, cvalue) 
{
	document.cookie = cname + "=" + cvalue + ";expires=" + save_default_days + ";path=/";
	console.info(document.cookie)
}

function get_default(cname,deflt) 
{
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for ( var i = 0 ; i < ca.length ; i++ ) 
	{
		var c = ca[i];
		while ( c.charAt(0) == ' ' ) 
		{
			c = c.substring(1);
		}
		if ( c.indexOf(name) == 0) 
		{
			return c.substring(name.length, c.length);
		}
	}
	var value = query.get(cname);
	if ( value == null )
	{
		return deflt;
	}
	else
	{
		return value;
	}
}

var host = get_default('host',default_host);
var owner = get_default('owner',default_owner);
var project = get_default('project',default_project);
var branch = get_default('branch',default_branch);
var doc = get_default('doc',default_doc);
