// config.js
// Copyright (C) 2019 Regents of the Leland Stanford Junior University
//
// This module set the document specifications `host`, `owner`, `project`, `branch`, and `doc`
// as given by the URL, or if absent, as given by the current defaults
//
var package = "Docs-Browser";
var version = "0.1";
var logo = "logo.png";
var website = "http://www.slacgismo.org/";
var banner = '<TABLE WIDTH="100%" CELLPADDING=0 CELLSPACING=0 BORDER=0><TR><TD VALIGN="bottom" ALIGN="left"><A HREF="https://github.com/slacgismo/docs-browser" TARGET="_blank"><H1 CLASS="topbar">' + package + ' Version ' + version + '</H1></A></TD><TD ALIGN="right" VALIGN="middle"><A HREF="' + website + '" TARGET="_blank"><IMG HEIGHT=50 SRC="' + logo + '" /></A></TD></TR></TABLE>';
var year = (new Date()).getFullYear();
if ( year > 2019 )
{
    year = "2019-" + year;
}
var copyright = '<A HREF="https://raw.githubusercontent.com/slacgismo/docs-browser/master/LICENSE" TARGET="_blank">Copyright (C) ' + year + ', Regents of the Leland Stanford Junior University</A>';
var query = new URLSearchParams(window.location.search);

function set_default(name, value) 
{
	// console.info("set_default('" + name + "',value='" + value + "') --> cookie = '" + document.cookie + "'");
	if ( value == null )
	{
		document.cookie = name + "=;";
	}
	else
	{
		document.cookie = name + "=" + value + ";expires=" + save_default_days + ";path=/";
	}
}

function get_default(name,deflt,asnull) 
{
	// console.info("get_default('" + name + "',value='" + deflt + "')...");
	var value = query.get(name);
	var type = 'query';
	if ( value == null )
	{
		var ca = document.cookie.split(';');
		// console.info("  cookie = " + ca);
		for ( var i = 0 ; i < ca.length ; i++ ) 
		{
			var c = ca[i].trim();
			if ( c.indexOf(name+'=') == 0 ) 
			{
				value = c.substring(c.indexOf('=')+1, c.length);
				type = 'cookie';
			}
		}
		if ( value == null )
		{
			value = deflt;
			type = 'default';
		}
	}
	if ( asnull != null && value === asnull )
	{
		value = null;
		type += ' asnull'
	}
	// console.info("  " + type + " --> " + name + " = '" + deflt + "'");
	return value;
}

var host = get_default('host',default_host,null);
var owner = get_default('owner',default_owner,null);
var project = get_default('project',default_project,null);
var branch = get_default('branch',default_branch,null);
var doc = get_default('doc',default_doc,null);
var folder = get_default('folder',"",null);
var github_authorization_token = get_default('token',null,'');

function save_defaults()
{
    set_default("host",host)
    set_default("owner",owner);
    set_default("project",project);
    set_default("branch",branch);
    set_default("folder",folder);
    set_default("doc",doc);
}

function run_query(query)
{
    // console.info("Running query '" + query + "'...")
    var r = new XMLHttpRequest();
    r.open('GET',query,false);
    if ( github_authorization_token != null )
    {
        // console.info("API authorization token: ",github_authorization_token);
        r.setRequestHeader("Authorization","token " + github_authorization_token);
    }
    r.send(null);
    // console.info("  status -> " + r.status);
    return r;
}
function reload_frameset()
{
    top.frames.document.location.href=top.frames.document.location.href;
}
