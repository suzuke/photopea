

var UTIL = {};

UTIL.getPList = function(tab, list, cp)
{
	if(typeof tab == "string") {  list.push({ str:tab, path:cp.slice(0) });  return; }
	for(var i=0; i<tab.length; i++)
	{
		cp.push(i);
		UTIL.getPList(tab[i], list, cp);
		cp.pop();
	}
}

UTIL.getWord = function(path, tab)
{
	for(var i=0; i<path.length; i++)
	{
		tab  = tab[path[i]];
		if(tab==null) return null;
		if(typeof tab == "string" && i+1<path.length) return path[i+1]==0 ? tab : null;
	}
	return tab;
}

UTIL.setWord = function(w, path, tab)
{
	for(var i=0; i<path.length-1; i++)  tab  = tab[path[i]];
	return tab[path[path.length-1]] = w;
}

UTIL.tryClear = function(tab)
{
	if(tab==null) return null;
	if(typeof tab == "string") return tab;
	
	for(var i=tab.length-1; i>=0; i--)
	{
		var nval = UTIL.tryClear(tab[i]);
		if(nval==null) tab.pop();
		else return tab;
	}
	return null;
}

UTIL.minify = function(tab) {
	var arr = [];
	UTIL._minify(tab,arr);
	return arr.join(";");
}
UTIL._minify = function(tab,arr) {
	for(var i=0; i<tab.length; i++) {
		var ti = tab[i];
		if(ti==null) arr.push("");
		else if(ti instanceof Array) arr.push("["+UTIL.minify(ti)+"]");
		else arr.push(ti);
	}
}