
	function makeView(tps,out,twds,wds,curc,cit) {
		var list = tps.list, cts=tps.categories;				
		if(cit==-1) {
			for(var i=0; i<list.length; i++) {
				var tpl = list[i], cat=tpl[4], pcat=cat-(cat%10);
				if(curc!=-1) {
					if((curc%10)==0) {  if(pcat!=curc) continue;  }
					else if(curc!=cat) continue;
				}
				if(twds!="") {
					var occ=0, tot=(tpl[7] + " " + tpl[8] + " " + tps.authors[tpl[0]] + " " + cts["c"+tpl[4]]).toLowerCase();
					for(var j=0; j<wds.length; j++) {
						if(tot.indexOf(wds[j])!=-1) occ++;
					}
					if(occ==0) continue;
				}
				makeItem(tps,i, cts,out, false);
			}
		}
		else {
			//out.push("<div id=\"back\"><span class=\"back\" onclick=\"backClicked()\">&lt; Back</span></div>");
			var tpl = list[cit];
			makeItem(tps,cit,cts,out, true);
			out.push("<iframe src=\"comments.html#"+tempID(tpl)+"\" frameborder=\"0\" style=\"border:none;  max-width:800px; width:calc(100% - 20px); height:800px; background-color:white;\"></iframe>");
			/*
			out.push("<iframe src=\"https://www.facebook.com/plugins/comments.php?href=https://photopea.com/templates\" scrolling=\"yes\" frameborder=\"0\" style=\"border:none; width:calc(100% - 20px); height:600px; background-color:white;\"></iframe>");  */
			/*
			out.push("<div id=\"fb-root\"></div> <script async defer crossorigin=\"anonymous\" src=\"https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v10.0&appId=1709573295939738&autoLogAppEvents=1\" nonce=\"wZ5o5487\"></script>");
			out.push("<div class=\"fb-comments\" data-href=\"https://photopea.com/templates\" data-width=\"600\" data-numposts=\"5\"></div>");
			*/
		}
	}
	
	function shorten(str, lim) {
		return (str.length<lim) ?str:str.slice(0,lim-3)+"...";
	}
	function toID(str) {  return str.toLowerCase().replace(/\s+/g, "-")+".html"; }
	function makeItem(tps, ind,cts,lst, big) {
		var tpl = tps.list[ind];  
		var rst = window.innerWidth-(245+30);  //console.log(iw);
		var num = 1;  while(rst/num>300) num++;
		var cc = Math.floor(rst/num);  //console.log(cc);
		var isz = cc-26;  //console.log(isz);
		
		var tit = escapeHtml(tpl[7]);
		var lim = ~~(isz/9);  //console.log(tpl);
		
		if(big)  lst.push("<div class=\"item flexrow\" >");
		else     lst.push("<div class=\"item\" onclick=\"itemClicked("+ind+")\" style=\"cursor:pointer\">");
		
		var iurl = tpl[3]; //(Math.random()<0.5?"wide.png":"tall.png");  // tpl[3]
		var aurl = "//www.Photopea.com#t"+tempID(tpl);
		//*
		if(big) isz=rst/2;
		var wi = (isz+"px");
		var hi = ((isz*0.67)+"px");
		
		lst.push("<div style=\"width:"+wi+"; min-width:"+wi+"; height:"+hi+"\">");  // ict
		lst.push("<img src=\""+iurl+"\" "+(big ? "onclick=\"itemClicked("+ind+")\" title=\"Open &quot;"+tit+"&quot;\"" : "")+" style=\""+(big?"cursor:pointer":"")+"\" loading=\"lazy\" />");
		lst.push("</div>"); // ict
		lst.push("<div class=\""+"post"+(big?"_big":"")+"\">"); // cmt
		
		lst.push("<span class=\"title "+(big?"t1":"t2")+"\">" + (big?tit:shorten(tit,lim)) + "</span>");
		
		var au = tps.authors[tpl[0]];
		lst.push("<span>"+"By "+(big?au:shorten(au,~~(lim*0.7))) + " in " + cts["c"+tpl[4]]+"</span>");
		
		if(big) {
			lst.push("<p>"+findLinks(escapeHtml(tpl[8]))+"</p>");
			lst.push("<p style=\"font-size:1.5em; margin-bottom: 0em;\" title=\""+((0.001*Date.now()-tpl[1])/(60*60*24)).toFixed(2)+" days ago\">");
			var dstr = printDate(tpl[1]);
			//lst.push("<b class=\"clickable\" onclick=\"itemClicked("+ind+")\">Open</b>");
			//lst.push("  <a href=\""+aurl+"\" target=\"_blank\" class=\"clickable\" ><b>Open Separately</b></a>");
			
			lst.push(printNum(tpl[5])+" views • "+printNum(tpl[6])+" uses • "+dstr);//  lst.push("<br/>");
			
			
			
			//lst.push("<br/>");  lst.push(tpl[6]+" uses");
			lst.push("</p>");
			lst.push("<p style=\"font-size:1.2em; margin-top:0.5em;\">");
			lst.push("<a href=\""+aurl+"\" target=\"_blank\" class=\"clickable\" >photopea.com#t"+tempID(tpl)+"</a>");  lst.push("<br/>");
			lst.push("</p>");
		}
		else {
			//var p = makeNode("span");  p.textContent = tpl[5]+"/"+tpl[6];  //ict.appendChild(p);
			//p.setAttribute("style","display:inline-block; right:4px; bottom:8px; padding:0px 4px; position:absolute; background:white;");
		}
		lst.push("</div>"); // cmt
		lst.push("</div>");
	}
	
	function printDate(d) {
		var dt = new Date(d*1000);
		var mon = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"][dt.getMonth()];
		return mon+" "+(dt.getDate())+", "+dt.getFullYear();
	}
	function printNum(f) {  return f.toLocaleString('en-US', {maximumFractionDigits:2});  }
	function tempID(tpl) {  return tpl[2].split("").reverse().join("");  }
	function isWhite(c) {  return c==" " || c=="\n" || c=="\t";  }
	
	function findLinks(str) {
		//return str;
		var iod = -1;
		for(var i=0; i<str.length-1; i++) if(str[i]=="." && !isWhite(str[i+1])) iod=i;
		if(iod!=-1) {
			var i0=iod, i1=iod;
			while(i0>0 && !isWhite(str[i0])) i0--;
			while(i1<str.length-1 && !isWhite(str[i1])) i1++;
			if(str[i0]==" ") i0++;  if(str[i1]==" ") i1--;
			var mid = str.slice(i0,i1+1), url=mid;
			if(url.indexOf("//")==-1) url="//"+url;
			str = str.slice(0,i0)+"<a href=\""+url+"\" target=\"_blank\">"+mid+"</a>"+str.slice(i1+1);
		}
		return str//.replaceAll("\n","<br/>");
	}
	
	function escapeHtml(unsafe) {
		return unsafe
			 .replace(/&/g, "&amp;")
			 .replace(/</g, "&lt;")
			 .replace(/>/g, "&gt;")
			 .replace(/"/g, "&quot;")
			 .replace(/'/g, "&#039;");
	 }
	
	function getCatCounts(tps) {
		var list = tps.list, cts=tps.categories;
		var ccnt = JSON.parse(JSON.stringify(cts));
		for(var cat in ccnt) ccnt[cat]=0;
		for(var i=0; i<list.length; i++) {
			var tpl = list[i], cat=tpl[4], pcat=cat-(cat%10);
			ccnt["c"+cat]++;  if(cat!=pcat) ccnt["c"+pcat]++;
		}
		return ccnt;
	}
	
	function getCats(tps, curr,out) {
		var cts=tps.categories, ccnt = getCatCounts(tps);				
		out.push("<span class=\"cat_title\">CATEGORIES</span>");				
		for(var cat in cts) {
			if(ccnt[cat]==0) continue;
			var cw = parseInt(cat.slice(1)), isTop = (cw%10)==0;  //console.log(cw);
			out.push("<div class=\"cat"+(isTop?" top":"") + (cw==curr?" blue":"")+" clickable\" onclick=\"catClicked("+cw+")\">");
			out.push(cts[cat]);
			out.push("<span class=\"count\">"+ccnt[cat]+"</span>");
			out.push("</div>");
		}
	}
	
	
	function cost0(v) {
		var age = (Date.now()*0.001 - v[1]) / (60*60*24);  // age in days
		var cst = v[6] / age;  // usages per day
		var ext = 20*Math.pow(Math.PI,-age*0.5);
		//console.log(age,cst,ext)
		
		return cst+ext;
		/*
		var ts = Math.max(0, v[1]-1134028003);
		var x = v[6];
		var y = 1;
		var z = Math.max(1,Math.abs(x));
		return getBaseLog(10, z) + (y*ts/45000);  // 45000
		*/
	}
	function cost1(v) { return  v[1]; }
	function cost2(v) { return  v[6]; }
	//function getBaseLog(x, y) {  return Math.log(y) / Math.log(x);  }
	
	