
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
			out.push("<div id=\"back\"><span class=\"back\" onclick=\"backClicked()\">&lt; Back</span></div>");
			var tpl = list[cit];
			makeItem(tps,cit,cts,out, true);
		}
	}
			
	function toID(str) {  return str.toLowerCase().replace(/\s+/g, "-")+".html"; }
	function makeItem(tps, ind,cts,lst, big) {
		var tpl = tps.list[ind];  
		var rst = window.innerWidth-(245+30);  //console.log(iw);
		var num = 1;  while(rst/num>300) num++;
		var cc = Math.floor(rst/num);  //console.log(cc);
		var isz = cc-26;  //console.log(isz);
		
		var tit = tpl[7];
		var lim = ~~(isz/9);  //console.log(tpl);
		
		lst.push("<div class=\"item"+(big?" flexrow":"")+"\" "+ ((!big) ? "onclick=\"itemClicked("+ind+")\"" : "")+">");
		
		var iurl = tpl[3]//(Math.random()<0.5?"wide.png":"tall.png");
		//*
		if(big) isz=rst/2;
		var wi = (isz+"px");
		var hi = ((isz*0.67)+"px");
		lst.push("<div style=\"min-width:"+wi+"; height:"+hi+"; background-image: url('"+iurl+"'); background-size:contain;  background-repeat: no-repeat; background-position: center;\">");  // ict */
		
		//var wi = big?"50%":(isz+"px");
		//lst.push("<div style=\"min-width:"+wi+"; max-width:"+wi+";\">");  // ict
		var aurl = "https://www.Photopea.com#t"+tpl[2].split("").reverse().join("");
		//lst.push("<img src=\""+iurl+"\" "+((big&&!stc) ? "onclick=\"itemClicked("+ind+")\"" : "")+" />");
		lst.push("</div>"); // ict
		lst.push("<div class=\""+"post"+(big?"_big":"")+"\">"); // cmt
		
		lst.push("<span class=\"title "+(big?"t1":"t2")+"\">" + escapeHtml((tit.length<lim || big) ?tit:tit.slice(0,lim-3)+"...") + "</span>");
		
		lst.push("<span>"+"By "+tps.authors[tpl[0]] + " in " + cts["c"+tpl[4]]+"</span>");
		
		if(big) {
			lst.push("<p>"+escapeHtml(tpl[8])+"</p>");
			lst.push("<p>");
			lst.push("<b class=\"clickable\" onclick=\"itemClicked("+ind+")\">Open</b>");
			lst.push("  <a href=\""+aurl+"\" target=\"_blank\" class=\"clickable\" ><b>Open Separately</b></a>");
			lst.push("</p>");
			lst.push("<b>"+"👁 "+tpl[5]+"×  ⭳ "+tpl[6]+"×"+"</b>");
		}
		else {
			//var p = makeNode("span");  p.textContent = tpl[5]+"/"+tpl[6];  //ict.appendChild(p);
			//p.setAttribute("style","display:inline-block; right:4px; bottom:8px; padding:0px 4px; position:absolute; background:white;");
		}
		lst.push("</div>"); // cmt
		lst.push("</div>");
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
	
	
	function cost(v) {
		var age = (Date.now()*0.001 - v[1]) / (60*60*24);
		var cst = v[6] / age;
		var ext = 20*Math.pow(2,-age*0.5);
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
	function getBaseLog(x, y) {  return Math.log(y) / Math.log(x);  }
	
	