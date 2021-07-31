var UDOC={};UDOC.B=function(){var o=new Uint8Array(4),s=o.buffer,U=new Int16Array(s),j=new Uint16Array(s),H=new Int32Array(s),N=new Uint32Array(s),V=new Float32Array(s);
return{readShort:function(m,R){o[0]=m[R];o[1]=m[R+1];return U[0]},readUshort:function(m,R){o[0]=m[R];
o[1]=m[R+1];return j[0]},readInt:function(m,R){o[0]=m[R];o[1]=m[R+1];o[2]=m[R+2];o[3]=m[R+3];return H[0]},readUint:function(m,R){o[0]=m[R];
o[1]=m[R+1];o[2]=m[R+2];o[3]=m[R+3];return N[0]},readUintBE:function(m,R){o[3]=m[R];o[2]=m[R+1];o[1]=m[R+2];
o[0]=m[R+3];return N[0]},readFloat:function(m,R){o[0]=m[R];o[1]=m[R+1];o[2]=m[R+2];o[3]=m[R+3];return V[0]},readASCII:function(m,R,w){var X="";
for(var v=0;v<w;v++)X+=String.fromCharCode(m[R+v]);return X}}}();UDOC.G={concat:function(o,s){for(var U=0;
U<s.cmds.length;U++)o.cmds.push(s.cmds[U]);for(var U=0;U<s.crds.length;U++)o.crds.push(s.crds[U])},getBB:function(o){var s=1e99,U=1e99,j=-s,H=-U;
for(var N=0;N<o.length;N+=2){var V=o[N],m=o[N+1];if(V<s)s=V;if(V>j)j=V;if(m<U)U=m;if(m>H)H=m}return[s,U,j,H]},rectToPath:function(o){return{cmds:["M","L","L","L","Z"],crds:[o[0],o[1],o[2],o[1],o[2],o[3],o[0],o[3]]}},insideBox:function(o,s){return s[0]<=o[0]&&s[1]<=o[1]&&o[2]<=s[2]&&o[3]<=s[3]},isBox:function(o,s){var U=function(M,P){for(var x=0;
x<8;x+=2){var r=!0;for(var O=0;O<8;O++)if(Math.abs(P[O]-M[O+x&7])>=2){r=!1;break}if(r)return!0}return!1},N=!1;
if(o.cmds.length>10)return!1;var j=o.cmds.join(""),H=o.crds;if(j=="MLLLZ"&&H.length==8||(j=="MLLLLZ"||j=="MLLLL")&&H.length==10){if(H.length==10)H=H.slice(0,8);
if(s==null){s=[H[0],H[1],H[0],H[1]];for(var V=0;V<H.length;V+=2){var m=H[V],w=H[V+1];if(m<s[0])s[0]=m;
if(w<s[1])s[1]=w;if(s[2]<m)s[2]=m;if(s[3]<w)s[3]=w}}var X=s[0],e=s[1],v=s[2],D=s[3];if(!N)N=U(H,[X,e,v,e,v,D,X,D]);
if(!N)N=U(H,[X,D,v,D,v,e,X,e])}return N},boxArea:function(o){var s=o[2]-o[0],U=o[3]-o[1];return s*U},newPath:function(o){o.pth={cmds:[],crds:[]}},moveTo:function(o,s,U){var j=UDOC.M.multPoint(o.ctm,[s,U]),H=o.pth,N=H.cmds.length;
if(N!=0&&H.cmds[N-1]=="M"){H.cmds.pop();H.crds.pop();H.crds.pop()}o.pth.cmds.push("M");o.pth.crds.push(j[0],j[1]);
o.cpos=j},lineTo:function(o,s,U){var j=UDOC.M.multPoint(o.ctm,[s,U]);if(o.cpos[0]==j[0]&&o.cpos[1]==j[1])return;
o.pth.cmds.push("L");o.pth.crds.push(j[0],j[1]);o.cpos=j},curveTo:function(o,s,U,j,H,N,V){var m;if(o.pth.cmds.length==0)UDOC.G.moveTo(o,0,0);
m=UDOC.M.multPoint(o.ctm,[s,U]);s=m[0];U=m[1];m=UDOC.M.multPoint(o.ctm,[j,H]);j=m[0];H=m[1];m=UDOC.M.multPoint(o.ctm,[N,V]);
N=m[0];V=m[1];o.cpos=m;o.pth.cmds.push("C");o.pth.crds.push(s,U,j,H,N,V)},quadCurveTo:function(o,s,U,j,H){var N;
if(o.pth.cmds.length==0)UDOC.G.moveTo(o,0,0);N=UDOC.M.multPoint(o.ctm,[s,U]);s=N[0];U=N[1];N=UDOC.M.multPoint(o.ctm,[j,H]);
j=N[0];H=N[1];o.cpos=N;o.pth.cmds.push("Q");o.pth.crds.push(s,U,j,H)},closePath:function(o){o.pth.cmds.push("Z")},arc:function(o,s,U,j,H,N,V){if(V)while(N>H)N-=2*Math.PI;
else while(N<H)N+=2*Math.PI;var m=(N-H)/4,R=Math.cos(m/2),w=-Math.sin(m/2),X=(4-R)/3,e=w==0?w:(1-R)*(3-R)/(3*w),v=X,D=-e,M=R,C=-w,P=[R,w],r=[X,e],O=[v,D],i=[M,C],n={cmds:[o.pth.cmds.length==0?"M":"L"],crds:[R,w]},Q=[1,0,0,1,0,0];
for(var t=0;t<4;t++){r=UDOC.M.multPoint(Q,r);O=UDOC.M.multPoint(Q,O);i=UDOC.M.multPoint(Q,i);n.crds.push(r[0],r[1],O[0],O[1],i[0],i[1]);
n.cmds.push("C");if(t==0)UDOC.M.rotate(Q,-m)}var c=[j,0,0,j,s,U];UDOC.M.rotate(Q,-H+m/2);UDOC.M.concat(Q,c);
UDOC.M.multArray(Q,n.crds);UDOC.M.multArray(o.ctm,n.crds);UDOC.G.concat(o.pth,n);var U=n.crds.pop();
s=n.crds.pop();o.cpos=[s,U]},drawRect:function(o,s,U,j,H){UDOC.G.moveTo(o,s,U);UDOC.G.lineTo(o,s+j,U);
UDOC.G.lineTo(o,s+j,U+H);UDOC.G.lineTo(o,s,U+H);UDOC.G.closePath(o)},toPoly:function(o){if(o.cmds[0]!="M"||o.cmds[o.cmds.length-1]!="Z")return null;
for(var s=1;s<o.cmds.length-1;s++)if(o.cmds[s]!="L")return null;var U=[],j=o.crds.length;if(o.crds[0]==o.crds[j-2]&&o.crds[1]==o.crds[j-1])j-=2;
for(var s=0;s<j;s+=2)U.push([o.crds[s],o.crds[s+1]]);if(UDOC.G.polyArea(o.crds)<0)U.reverse();return U},fromPoly:function(o){var s={cmds:[],crds:[]};
for(var U=0;U<o.length;U++){s.crds.push(o[U][0],o[U][1]);s.cmds.push(U==0?"M":"L")}s.cmds.push("Z");
return s},polyArea:function(o){if(o.length<6)return 0;var s=o.length-2,U=(o[0]-o[s])*(o[s+1]+o[1]);for(var j=0;
j<s;j+=2)U+=(o[j+2]-o[j])*(o[j+1]+o[j+3]);return-U*.5},polyClip:function(o,s){var U,j,H,N,V=function(v){return(j[0]-U[0])*(v[1]-U[1])>(j[1]-U[1])*(v[0]-U[0])},m=function(){var v=[U[0]-j[0],U[1]-j[1]],D=[H[0]-N[0],H[1]-N[1]],M=U[0]*j[1]-U[1]*j[0],C=H[0]*N[1]-H[1]*N[0],P=1/(v[0]*D[1]-v[1]*D[0]);
return[(M*D[0]-C*v[0])*P,(M*D[1]-C*v[1])*P]},R=o,w,X;U=s[s.length-1];for(X in s){var j=s[X],e=R;R=[];
H=e[e.length-1];for(w in e){var N=e[w];if(V(N)){if(!V(H)){R.push(m())}R.push(N)}else if(V(H)){R.push(m())}H=N}U=j}return R}};
UDOC.M={getScale:function(o){return Math.sqrt(Math.abs(o[0]*o[3]-o[1]*o[2]))},translate:function(o,s,U){UDOC.M.concat(o,[1,0,0,1,s,U])},rotate:function(o,s){UDOC.M.concat(o,[Math.cos(s),-Math.sin(s),Math.sin(s),Math.cos(s),0,0])},scale:function(o,s,U){UDOC.M.concat(o,[s,0,0,U,0,0])},concat:function(o,s){var U=o[0],j=o[1],H=o[2],N=o[3],V=o[4],m=o[5];
o[0]=U*s[0]+j*s[2];o[1]=U*s[1]+j*s[3];o[2]=H*s[0]+N*s[2];o[3]=H*s[1]+N*s[3];o[4]=V*s[0]+m*s[2]+s[4];
o[5]=V*s[1]+m*s[3]+s[5]},invert:function(o){var s=o[0],U=o[1],j=o[2],H=o[3],N=o[4],V=o[5],m=s*H-U*j;
o[0]=H/m;o[1]=-U/m;o[2]=-j/m;o[3]=s/m;o[4]=(j*V-H*N)/m;o[5]=(U*N-s*V)/m},multPoint:function(o,s){var U=s[0],j=s[1];
return[U*o[0]+j*o[2]+o[4],U*o[1]+j*o[3]+o[5]]},multArray:function(o,s){for(var U=0;U<s.length;U+=2){var j=s[U],H=s[U+1];
s[U]=j*o[0]+H*o[2]+o[4];s[U+1]=j*o[1]+H*o[3]+o[5]}}};UDOC.C={srgbGamma:function(o){return o<.0031308?12.92*o:1.055*Math.pow(o,1/2.4)-.055},cmykToRgb:function(o){var s=o[0],j=o[1],H=o[2],N=o[3],V=255+s*(-4.387332384609988*s+54.48615194189176*j+18.82290502165302*H+212.25662451639585*N+-285.2331026137004)+j*(1.7149763477362134*j-5.6096736904047315*H+-17.873870861415444*N-5.497006427196366)+H*(-2.5217340131683033*H-21.248923337353073*N+17.5119270841813)+N*(-21.86122147463605*N-189.48180835922747),m=255+s*(8.841041422036149*s+60.118027045597366*j+6.871425592049007*H+31.159100130055922*N+-79.2970844816548)+j*(-15.310361306967817*j+17.575251261109482*H+131.35250912493976*N-190.9453302588951)+H*(4.444339102852739*H+9.8632861493405*N-24.86741582555878)+N*(-20.737325471181034*N-187.80453709719578),R=255+s*(.8842522430003296*s+8.078677503112928*j+30.89978309703729*H-.23883238689178934*N+-14.183576799673286)+j*(10.49593273432072*j+63.02378494754052*H+50.606957656360734*N-112.23884253719248)+H*(.03296041114873217*H+115.60384449646641*N+-193.58209356861505)+N*(-22.33816807309886*N-180.12613974708367);
return[Math.max(0,Math.min(1,V/255)),Math.max(0,Math.min(1,m/255)),Math.max(0,Math.min(1,R/255))]},labToRgb:function(o){var s=903.3,U=.008856,j=o[0],N=o[1],V=o[2],m=(j+16)/116,R=m*m*m,w=m-V/200,e=w*w*w,v=N/500+m,D=v*v*v,M=e>U?e:(116*w-16)/s,C=R>U?R:(116*m-16)/s,P=D>U?D:(116*v-16)/s,x=P*96.72,r=C*100,O=M*81.427,i=[x/100,r/100,O/100],n=[3.1338561,-1.6168667,-.4906146,-.9787684,1.9161415,.033454,.0719453,-.2289914,1.4052427],Q=[n[0]*i[0]+n[1]*i[1]+n[2]*i[2],n[3]*i[0]+n[4]*i[1]+n[5]*i[2],n[6]*i[0]+n[7]*i[1]+n[8]*i[2]];
for(var d=0;d<3;d++)Q[d]=Math.max(0,Math.min(1,UDOC.C.srgbGamma(Q[d])));return Q}};UDOC.getState=function(o){return{font:UDOC.getFont(),dd:{flat:1},ca:1,colr:[0,0,0],space:"/DeviceGray",CA:1,COLR:[0,0,0],sspace:"/DeviceGray",bmode:"/Normal",SA:!1,OPM:0,AIS:!1,OP:!1,op:!1,SMask:"/None",lwidth:1,lcap:0,ljoin:0,mlimit:10,SM:.1,doff:0,dash:[],ctm:[1,0,0,1,0,0],cpos:[0,0],pth:{cmds:[],crds:[]},cpth:o?UDOC.G.rectToPath(o):null,cpstack:[]}};
UDOC.getFont=function(){return{Tc:0,Tw:0,Th:100,Tl:0,Tf:"Helvetica-Bold",Tfs:1,Tmode:0,Trise:0,Tk:0,Tal:0,Tun:0,Tm:[1,0,0,1,0,0],Tlm:[1,0,0,1,0,0],Trm:[1,0,0,1,0,0]}};
function FromPS(){}FromPS.Parse=function(o,s){o=new Uint8Array(o);var U=0,N=null,V=null,P=!0;while(!(o[U]==37&&o[U+1]==33))U++;
var j=FromPS.B.readASCII(o,U,o.length-U),H=j.split(/[\n\r]+/);for(var m=0;m<H.length;m++){var R=H[m].trim();
if(R.charAt(0)=="%"){R=R.slice(1);while(R.charAt(0)=="%")R=R.slice(1);var w=R.split(":");if(w[0]=="BoundingBox"){N=w[1].trim().split(/[ ]+/).map(parseFloat)}if(R.indexOf("!PS-Adobe-3.0 EPSF-3.0")!=-1)V=R;
if(R.indexOf("!PS-Adobe-2.0 EPSF-1.2")!=-1)V=R}}if(V==null||N==null)N=[0,0,595,842];var X=[],e=FromPS._getDictStack([],{}),v=[{typ:"file",val:{buff:o,off:U}}],D=[],M=FromPS._getEnv(N),C=Date.now();
while(P)P=FromPS.step(X,e,v,D,M,s);if(M.pgOpen)s.ShowPage();s.Done();console.log(Date.now()-C)};FromPS._getDictStack=function(o,s){var U="def undef known begin end currentfile currentdict currentpacking setpacking currentoverprint setoverprint currentglobal setglobal gcheck currentsystemparams setsystemparams currentuserparams setuserparams currentpagedevice setpagedevice currentflat currentlinewidth currentdash currentpoint currentscreen setscreen currenthalftone currentblackgeneration currentundercolorremoval currentcolortransfer internaldict dict string readstring readhexstring readline getinterval putinterval token array aload astore length maxlength matrix count mark counttomark cleartomark dictstack countdictstack makepattern makefont scalefont stringwidth setfont currentcolorspace setcolorspace setcolor _setHSB_ currentgray currentrgbcolor setlinewidth setstrokeadjust setflat setlinecap setlinejoin setmiterlimit setdash clip eoclip clippath pathbbox newpath stroke fill eofill shfill closepath flattenpath showpage print _drawRect_ moveto lineto curveto arc arcn show ashow xshow yshow xyshow widthshow awidthshow charpath cshow rmoveto rlineto rcurveto translate rotate scale concat concatmatrix invertmatrix currentmatrix defaultmatrix setmatrix limitcheck save restore clipsave cliprestore gsave grestore grestoreall usertime readtime flush flushfile readonly executeonly findresource resourcestatus defineresource undefineresource resourceforall image imagemask colorimage xcheck status cachestatus setcachelimit type if ifelse exec stopped stop dup exch copy roll index anchorsearch pop put get load where store repeat for forall pathforall loop exit bind cvi cvr cvs cvx cvn cvlit add sub mul div idiv bitshift mod exp atan neg abs floor ceiling round truncate sqrt ln sin cos srand rand == transform itransform dtransform idtransform eq ge gt le lt ne and or not filter begincmap endcmap begincodespacerange endcodespacerange beginbfrange endbfrange beginbfchar endbfchar".split(" ").concat(o),j="image colorimage repeat for forall loop".split(" ");
for(var H=0;H<j.length;H++)U.push(j[H]+"---");FromPS._myOps=FromPS.makeProcs({CIDSystemInfo:"/CIDSystemInfo",findfont:"/Font findresource",definefont:"/Font defineresource",undefinefont:"/Font undefineresource",selectfont:"exch findfont exch scalefont setfont",rectfill:"gsave newpath _drawRect_  fill   grestore",rectstroke:"gsave newpath _drawRect_  stroke grestore",rectclip:"newpath _drawRect_  clip newpath",setgray:"/DeviceGray setcolorspace setcolor",setrgbcolor:"/DeviceRGB  setcolorspace setcolor",sethsbcolor:"/DeviceRGB  setcolorspace _setHSB_",setcmykcolor:"/DeviceCMYK setcolorspace setcolor",setpattern:"/Pattern    setcolorspace setcolor"});
for(var N in FromPS._myOps)U.push(N);var V=s,m={},w={},X={},e={};m.systemdict={typ:"dict",val:m};m.globaldict={typ:"dict",val:w};
m.userdict={typ:"dict",val:X};m.statusdict={typ:"dict",val:e};m.GlobalFontDirectory=m.SharedFontDirectory={typ:"dict",val:{}};
m.FontDirectory={typ:"dict",val:{}};m.$error={typ:"dict",val:{}};m.errordict={typ:"dict",val:FromPS.makeProcs({handleerror:""})};
m.null={typ:"null",val:null};m.true={typ:"boolean",val:!0};m.false={typ:"boolean",val:!1};m.product={typ:"string",val:FromPS.makeStr("Photopea")};
m.version={typ:"string",val:[51]};m.languagelevel={typ:"integer",val:3};for(var H=0;H<U.length;H++)m[U[H]]={typ:"operator",val:U[H]};
for(var v in V)m[v]=V[v];return[m,w,X]};FromPS._getEnv=function(o){var s={bb:o,gst:UDOC.getState(o),packing:!1,overprint:!1,global:!1,systemparams:{MaxPatternCache:{type:"integer",val:5e3}},userparams:{},pagedevice:{PageSize:{typ:"array",val:[{typ:"real",val:o[2]},{typ:"real",val:o[3]}]}},cmnum:0,fnt:null,res:{},pgOpen:!1,funs:FromPS.makeProcs({blackgeneration:"",undercolorremoval:"pop 0"})},U;
U="Font CIDFont CMap FontSet Form Pattern ProcSet Halftone ColorRendering IdiomSet InkParams TrapParams OutputDevice ControlLanguage Localization PDL HWOptions".split(" ");
for(var j=0;j<U.length;j++)s.res[U[j]]={typ:"dict",val:{},maxl:1e3};U=["Encoding","ColorSpace"];for(var j=0;
j<U.length;j++)s.res[U[j]]={typ:"array",val:[]};s.res.Category={typ:"dict",val:s.res};s.res.ColorSpace.val=[{typ:"array",val:[{typ:"name",val:"/DeviceRGB"}]},{typ:"array",val:[{typ:"name",val:"/DeviceCMYK"}]},{typ:"array",val:[{typ:"name",val:"/DeviceGray"}]}];
for(var j=0;j<U.length;j++)s.res[U[j]]={typ:"dict",val:{},maxl:1e3};return s};FromPS.makeProcs=function(o){var s={};
for(var U in o){var j=o[U].replace(/  +/g," ").split(" ");s[U]={typ:"procedure",val:[]};for(var H=0;
H<j.length;H++)s[U].val.push({typ:"name",val:j[H]})}return s};FromPS.addProc=function(o,s){if(o.val.length==0)return;
if(o.typ!="procedure"){console.log(o);throw o.typ}s.push({typ:"procedure",val:o.val,off:0})};FromPS.stepC=0;
FromPS._f32=new Float32Array(1);FromPS.step=function(o,s,U,j,H,N,V,m){var R=Date.now(),w=FromPS._f32,X=FromPS.getToken,e=H.gst,v=X(U,s),C=!1;
if(v==null)return!1;if(m&&v.typ=="string"&&FromPS.readStr(v.val)=="def")v={typ:"operator",val:"def"};
var D=v.typ,M=v.val;if(isNaN(e.cpos[0]))throw"e";if(C)console.log(v,o.slice(0));if("integer real dict boolean string array procedure null file".split(" ").indexOf(D)!=-1){o.push(v);
return!0}if(D!="name"&&D!="operator")throw"e";if(M.charAt(0)=="/"){o.push(v)}else if(M=="undefined")return!0;
else if(M.startsWith("II*"))return!1;else if(M=="{"){var P=[],x={typ:"procedure",val:[]},r=X(U,s);while(!0){if(r.val=="{"){var O={typ:"procedure",val:[]};
x.val.push(O);P.push(x);x=O}else if(r.val=="}"){if(P.length==0)break;x=P.pop()}else x.val.push(r);r=X(U,s)}o.push(x)}else if(M=="["||M=="<<")o.push({typ:"mark"});
else if(M=="]"||M==">>"){var i=[];while(o.length!=0){var n=o.pop();if(n.typ=="mark")break;i.push(n)}i.reverse();
if(M=="]")o.push({typ:"array",val:i});else{var Q={};for(var d=0;d<i.length;d+=2)Q[i[d].val.slice(1)]=i[d+1];
o.push({typ:"dict",val:Q,maxl:1e3})}}else{var B=FromPS.getFromStacks(M,s);if(C)console.log("---",B);
if(B==null){if(m)return!1;else{console.log("unknown operator",M,o,s);throw"e"}}else if(B.typ=="procedure")FromPS.addProc(B,U);
else if("array string dict null integer real boolean state name file".split(" ").indexOf(B.typ)!=-1)o.push(B);
else if(B.typ=="operator"){var t=B.val,c="known if ifelse currentpacking setpacking dict dup begin end put bind def undef where pop get exec ge stop stopped cvr string not and".split(" ");
if(FromPS._myOps[t]){FromPS.addProc(FromPS._myOps[t],U)}else if(t=="flattenpath"||t=="limitcheck"){}else if(t=="def"){var p=o.pop(),h=o.pop();
if(h==null&&m)return!1;h=FromPS.getDKey(h);s[s.length-1][h]=p}else if(t=="undef"||t=="known"){var g=FromPS.getDKey(o.pop()),aq=o.pop(),aQ=aq.val;
if(t=="undef")delete aQ[g];else o.push({typ:"boolean",val:aq.typ!="null"&&aQ[g]!=null})}else if(t=="internaldict"){var I=o.pop().val;
o.push({typ:"dict",val:{},maxl:1e3})}else if(t=="dict"){var I=o.pop().val;o.push({typ:"dict",val:{},maxl:I})}else if(t=="string"){var I=o.pop().val;
o.push({typ:"string",val:new Array(I)})}else if(t=="readstring"||t=="readhexstring"){var A=o.pop(),I=A.val.length,bq=o.pop(),K=FromPS.GetFile(bq).val;
if(t=="readstring"){for(var d=0;d<I;d++)A.val[d]=K.buff[K.off+d];K.off+=I}else FromPS.readHex(K,I,A.val);
o.push(A,{typ:"boolean",val:!0})}else if(t=="readline"){var A=o.pop(),K=FromPS.GetFile(o.pop()).val,d=0;
if(FromPS.isEOL(K.buff[K.off]))K.off++;while(d<A.val.length){var aX=K.buff[K.off];K.off++;if(aX==null)throw"e";
if(FromPS.isEOL(aX)){if(K.buff[K.off]==10)K.off++;break}A.val[d]=aX;d++}o.push({typ:"string",val:A.val.slice(0,d)});
o.push({typ:"boolean",val:!0})}else if(t=="getinterval"){var bu=o.pop().val,cw=o.pop().val,cn=o.pop(),F=[];
if(cn.typ=="string"||cn.typ=="array")for(var d=0;d<bu;d++)F.push(cn.val[cw+d]);else throw"e";o.push({typ:cn.typ,val:F})}else if(t=="putinterval"){var cn=o.pop(),cw=o.pop().val,c3=o.pop();
if(cw+cn.val.length>=c3.val.length){}else if(cn.typ=="string")for(var d=0;d<cn.val.length;d++)c3.val[cw+d]=cn.val[d];
else throw"e"}else if(t=="token"){var cn=o.pop();if(cn.typ!="string")throw"e";var i=[];for(var d=0;d<cn.val.length;
d++){var a5=cn.val[d];if(a5==null)break;i.push(a5)}var bp={buff:new Uint8Array(i),off:0},v=X([{typ:"file",val:bp}],s),aw=[];
for(var d=bp.off;d<i.length;d++)aw.push(i[d]);o.push({typ:"string",val:aw},v,{typ:"boolean",val:!0})}else if(t=="array"){var I=o.pop().val;
o.push({typ:"array",val:new Array(I)})}else if(t=="aload"){var n=o.pop(),i=n.val;for(var d=0;d<i.length;
d++)o.push(i[d]);o.push(n)}else if(t=="astore"){var n=o.pop(),i=n.val;for(var d=0;d<i.length;d++)i[i.length-1-d]=o.pop();
o.push(n)}else if(t=="length"){var n=o.pop(),D=n.typ,I=0;if(D=="array")I=n.val.length;else if(D=="procedure")I=n.val.length;
else if(D=="dict")I=Object.keys(n.val).length;else if(D=="string")I=n.val.length;else{console.log(n);
throw"e"}o.push({typ:"integer",val:I})}else if(t=="maxlength"){var aC=o.pop();o.push({typ:"integer",val:aC.maxl})}else if(t=="matrix"){o.push({typ:"array",val:FromPS.makeArr([1,0,0,1,0,0],"real")})}else if(t=="count"){o.push({typ:"integer",val:o.length})}else if(t=="mark"){o.push({typ:"mark"})}else if(t=="counttomark"||t=="cleartomark"){var aH=0;
while(aH<o.length&&o[o.length-1-aH].typ!="mark")aH++;if(t=="cleartomark")for(var d=0;d<aH+1;d++)o.pop();
else o.push({typ:"integer",val:aH})}else if(t=="dictstack"){var i=o.pop();for(var d=0;d<s.length;d++)i.val[d]={typ:"dict",val:s[d],maxl:1e3};
o.push(i)}else if(t=="countdictstack"){var cz=0;for(var d=0;d<o.length;d++)if(o[d].typ=="dict")cz++;
o.push({typ:"integer",val:cz})}else if(t=="begin"){var n=o.pop(),aQ=n.val;if(aQ==null||n.typ!="dict"){console.log(n,s);
throw"e"}s.push(aQ)}else if(t=="end"){s.pop()}else if(t=="currentfile"){var a4;for(var d=U.length-1;
d>=0;d--)if(U[d].typ=="file"){a4=U[d];break}o.push({typ:"file",val:a4.val})}else if(t=="currentdict"){var aQ=s[s.length-1];
o.push({typ:"dict",val:aQ,maxl:1e3})}else if("currentpacking currentoverprint currentglobal currentsystemparams currentuserparams currentpagedevice".split(" ").indexOf(t)!=-1){var p=H[t.slice(7)];
o.push({typ:typeof p=="boolean"?"boolean":"dict",val:p})}else if(t=="gcheck"){var Z=o.pop();o.push({typ:"boolean",val:!1})}else if("setpacking setoverprint setglobal setsystemparams setuserparams setpagedevice".split(" ").indexOf(t)!=-1){H[t.slice(3)]=o.pop().val}else if(t=="currentflat"){o.push({typ:"real",val:1})}else if(t=="currentlinewidth"){o.push({typ:"real",val:e.lwidth})}else if(t=="currentdash"){o.push({typ:"array",val:FromPS.makeArr(e.dash,"integer")},{typ:"real",val:e.doff})}else if(t=="currentpoint"){var bo=e.ctm.slice(0);
UDOC.M.invert(bo);var b_=UDOC.M.multPoint(bo,e.cpos);o.push({typ:"real",val:b_[0]},{typ:"real",val:b_[1]})}else if(t=="currentscreen"){o.push({typ:"int",val:60},{typ:"real",val:0},{typ:"real",val:0})}else if(t=="setscreen"){o.pop();
o.pop();o.pop()}else if(t=="currenthalftone"){o.push({typ:"dict",val:{},maxl:1e3})}else if(t=="currentblackgeneration"||t=="currentundercolorremoval"){o.push(H.funs[t.slice(7)])}else if(t=="currentcolortransfer"){for(var d=0;
d<4;d++)o.push(H.funs.blackgeneration)}else if(t=="findresource"){var cq=o.pop().val.slice(1),ag=o.pop(),g=ag.val.slice(1),aS;
if(cq=="Font"){H.res[cq].val[g]={typ:"dict",val:{FontType:{typ:"integer",val:1},FontMatrix:{typ:"array",val:FromPS.makeArr([1,0,0,1,0,0],"real")},FontName:ag,FID:{typ:"fontID",val:Math.floor(Math.random()*16777215)},Encoding:{typ:"array",val:[]},FontBBox:{typ:"array",val:FromPS.makeArr([0,0,1,1],"real")},PaintType:{typ:"integer",val:0}}}}if(cq=="Category"&&g=="Generic")aS={typ:"dict",val:{},maxl:1e3};
else if((cq=="ProcSet"||cq=="Procset")&&g=="CIDInit")aS={typ:"dict",val:{},maxl:1e3};else aS=H.res[cq].val[g];
if(aS==null)throw"e";o.push(aS)}else if(t=="resourcestatus"){var cq=o.pop().val.slice(1),g=o.pop().val.slice(1),aS=H.res[cq].val[g];
if(aS){o.push({typ:"integer",val:1});o.push({typ:"integer",val:Object.keys(aS.val).length})}o.push({typ:"boolean",val:aS!=null})}else if(t=="defineresource"){var cq=o.pop().val.slice(1),aZ=o.pop(),g=o.pop().val.slice(1);
H.res[cq].val[g]=aZ;o.push(aZ)}else if(t=="undefineresource"){var cq=o.pop().val.slice(1),g=o.pop().val.slice(1);
delete H.res[cq].val[g]}else if(t=="resourceforall"){var cq=o.pop().val.slice(1),al=o.pop().val,c4=o.pop(),b3=o.pop().val;
if(b3.length!=1||b3[0]!=42)throw"e";var bi=H.res[cq].val;for(var g in bi){var A=al.slice(0);for(var d=0;
d<g.length;d++)A[d]=g[d];FromPS.addProc(c4,U);FromPS.addProc({typ:"procedure",val:[{typ:"string",val:A}]},U)}}else if(t=="image"||t=="colorimage"){var bv,bQ,b9,b0,c2=1,ak=!1,_=[],top=o.pop();
o.push(top);if(t=="image"&&top.typ=="dict"){var cs=o.pop().val;bv=cs.Width.val;bQ=cs.Height.val;b9=cs.BitsPerComponent.val;
b0=FromPS.readArr(cs.ImageMatrix.val);c2=cs.NComponents?cs.NComponents.val:1;ak=cs.MultipleDataSources?cs.MultipleDataSources.val:!1;
_=cs.DataSource.val;if(cs.DataSource.typ=="file")_=[cs.DataSource]}else{if(t=="colorimage"){c2=o.pop().val;
ak=o.pop().val}if(ak){_[2]=o.pop();_[1]=o.pop();_[0]=o.pop()}else _=[o.pop()];var b0=FromPS.readArr(o.pop().val),b9=o.pop().val,bQ=o.pop().val,bv=o.pop().val}if(c2!=1&&c2!=3&&c2!=4)throw"unsupported number of channels "+c2;
if(b9!=8)throw"unsupported bits per channel: "+b9;var b=new Uint8Array(bv*bQ*4);for(var d=0;d<b.length;
d++)b[d]=255;U.push({typ:"name",val:t+"---",ctx:[bv,bQ,b9,b0,c2,ak,b,0,_]});if(_[0].typ=="procedure")for(var d=0;
d<_.length;d++)FromPS.addProc(_[d],U)}else if(t=="image---"||t=="colorimage---"){var cu=v.ctx,bv=cu[0],bQ=cu[1],b9=cu[2],b0=cu[3],c2=cu[4],ak=cu[5],b=cu[6],bk=cu[7],_=cu[8],a3=0;
if(ak){for(d=0;d<c2;d++){var bR=_[d];if(bR.typ=="procedure")bR=o.pop().val;else bR=bR.val;a3=bR.length;
if(c2==4)for(var cA=0;cA<a3;cA++)b[(bk+cA)*4+3-d]=bR[cA];if(c2==3)for(var cA=0;cA<a3;cA++)b[(bk+cA)*4+2-d]=bR[cA]}}else{var bR;
if(_[0].typ=="file")bR=FromPS.GetFile(_[0]).val.buff;else bR=o.pop().val;a3=Math.floor(bR.length/3);
for(var cA=0;cA<a3;cA++){var ar=cA*3,cc=(bk+cA)*4;b[cc+0]=bR[ar+0];b[cc+1]=bR[ar+1];b[cc+2]=bR[ar+2]}}bk+=a3;
FromPS.checkPageStarted(H,N);if(bk==bv*bQ){var ce=1/255;if(e.space=="/DeviceCMYK")for(var d=0;d<b.length;
d+=4){var af=[b[d]*ce,b[d+1]*ce,b[d+2]*ce,b[d+3]*ce],bg=UDOC.C.cmykToRgb(af);b[d]=bg[0]*255;b[d+1]=bg[1]*255;
b[d+2]=bg[2]*255;b[d+3]=255}var bn=e.ctm.slice(),cm=b0.slice(0);UDOC.M.invert(cm);var bC=[bv,0,0,-bQ,0,bQ];
UDOC.M.concat(bC,cm);UDOC.M.concat(e.ctm,bC);N.PutImage(e,b,bv,bQ);e.ctm=bn}else{cu[7]=bk;U.push(v);
if(_[0].typ=="procedure")for(var d=0;d<_.length;d++)FromPS.addProc(_[d],U)}}else if(t=="makepattern"){var k=o.pop().val,aC=o.pop().val;
o.push({typ:"array",val:[aC,JSON.parse(JSON.stringify(k))]})}else if(t=="makefont"||t=="scalefont"){var aR=t=="makefont",cu=o.pop().val;
if(aR)cu=FromPS.readArr(cu);var aA=JSON.parse(JSON.stringify(o.pop())),bF=FromPS.readArr(aA.val.FontMatrix.val);
if(aR)UDOC.M.concat(bF,cu);else UDOC.M.scale(bF,cu,cu);aA.val.FontMatrix.val=FromPS.makeArr(bF);o.push(aA)}else if(t=="stringwidth"||t=="charpath"){if(t=="charpath")o.pop();
var c1=o.pop().val,A=FromPS.readStr(c1),c9=UDOC.M.getScale(e.font.Tm)/UDOC.M.getScale(e.ctm),bt=.55*c9*A.length;
if(t=="stringwidth")o.push({typ:"real",val:bt},{typ:"real",val:0});else UDOC.G.drawRect(e,0,0,bt,c9)}else if(t=="setfont"){var aA=o.pop().val;
e.font.Tf=aA.FontName.val.slice(1);e.font.Tm=FromPS.readArr(aA.FontMatrix.val)}else if(t=="setlinewidth")e.lwidth=o.pop().val;
else if(t=="setstrokeadjust")e.SA=o.pop().val;else if(t=="setlinecap")e.lcap=o.pop().val;else if(t=="setlinejoin")e.ljoin=o.pop().val;
else if(t=="setmiterlimit")e.mlimit=o.pop().val;else if(t=="setflat")e.dd.flat=o.pop();else if(t=="setdash"){e.doff=o.pop().val;
e.dash=FromPS.readArr(o.pop().val)}else if(t=="show"||t=="ashow"||t=="xshow"||t=="yshow"||t=="xyshow"||t=="widthshow"||t=="awidthshow"){if(t=="xshow"||t=="xyshow"||t=="yshow")o.pop();
var c1=o.pop().val,A=FromPS.readStr(c1);if(t=="awidthshow"){o.pop();o.pop();o.pop();o.pop()}if(t=="widthshow"){o.pop();
o.pop();o.pop()}if(t=="ashow"){o.pop();o.pop()}var cj=e.ctm;e.ctm=cj.slice(0);e.ctm[4]=e.cpos[0];e.ctm[5]=e.cpos[1];
FromPS.checkPageStarted(H,N);N.PutText(e,A,A.length*.55);e.cpos[0]+=A.length*UDOC.M.getScale(cj)*UDOC.M.getScale(e.font.Tm)*.55;
e.ctm=cj}else if(t=="cshow"){o.pop();o.pop()}else if(t=="currentcolorspace"){o.push({typ:"array",val:[{typ:"name",val:e.space}]})}else if(t=="setcolorspace"){var be=o.pop();
e.space=be.val;if(be.typ=="array")e.space=be.val[0].val;else if(be.typ=="name")e.space=be.val;else{console.log(be);
throw"e"}}else if(t=="setcolor"||t=="_setHSB_"){var aM;if(e.space=="/Pattern"){var af=o.pop();if(af.typ!="array")throw"e";
var b_=af.val,k=FromPS.readArr(b_[1]);UDOC.M.concat(k,e.ctm);aM=FromPS.getPSShadingFill(b_[0].Shading,k)}else if(e.space=="/DeviceGray"){var a2=FromPS.nrm(o.pop().val);
aM=[a2,a2,a2]}else if(t=="_setHSB_"){var Z=o.pop().val,bP=o.pop().val,bQ=o.pop().val,ae,a2,bW,d,cb,b_,bx,a_;
d=Math.floor(bQ*6);cb=bQ*6-d;b_=Z*(1-bP);bx=Z*(1-cb*bP);a_=Z*(1-(1-cb)*bP);switch(d%6){case 0:ae=Z,a2=a_,bW=b_;
break;case 1:ae=bx,a2=Z,bW=b_;break;case 2:ae=b_,a2=Z,bW=a_;break;case 3:ae=b_,a2=bx,bW=Z;break;case 4:ae=a_,a2=b_,bW=Z;
break;case 5:ae=Z,a2=b_,bW=bx;break}aM=[FromPS.nrm(ae),FromPS.nrm(a2),FromPS.nrm(bW)]}else if(e.space=="/DeviceRGB"){var bW=o.pop().val,a2=o.pop().val,ae=o.pop().val;
aM=[FromPS.nrm(ae),FromPS.nrm(a2),FromPS.nrm(bW)]}else if(e.space=="/DeviceCMYK"){var bd=o.pop().val,a0=o.pop().val,k=o.pop().val,cC=o.pop().val;
aM=UDOC.C.cmykToRgb([cC,k,a0,bd])}else throw e.space;if(aM)e.colr=e.COLR=aM}else if(t=="currentrgbcolor"){for(var d=0;
d<3;d++)o.push({typ:"real",val:e.colr[d]})}else if(t=="currentgray"){o.push({typ:"real",val:(e.colr[0]+e.colr[1]+e.colr[2])/3})}else if(t=="clip"||t=="eoclip"){var aD=UDOC.G.getBB(e.pth.crds),bD=UDOC.G.getBB(e.cpth.crds);
if(UDOC.G.isBox(e.pth,aD)&&UDOC.G.insideBox(bD,aD)){}else if(UDOC.G.isBox(e.cpth,bD)&&UDOC.G.insideBox(aD,bD)){e.cpth=JSON.parse(JSON.stringify(e.pth))}else{var bN=UDOC.G.toPoly(e.pth),av=UDOC.G.toPoly(e.cpth);
if(bN&&av){var b_=UDOC.G.polyClip(bN,av);if(b_.length!=0)e.cpth=UDOC.G.fromPoly(b_);else console.log("strange intersection of polygons")}else{e.cpth=JSON.parse(JSON.stringify(e.pth))}}}else if(t=="clippath"){e.pth=JSON.parse(JSON.stringify(e.cpth))}else if(t=="pathbbox"){var ao=e.pth.crds,bA=UDOC.G.getBB(ao);
ao=[bA[0],bA[1],bA[2],bA[1],bA[0],bA[3],bA[2],bA[3]];var bo=e.ctm.slice(0);UDOC.M.invert(bo);UDOC.M.multArray(bo,ao);
bA=UDOC.G.getBB(ao);w[0]=bA[0];bA[0]=w[0];w[0]=bA[1];bA[1]=w[0];w[0]=bA[2];bA[2]=w[0];w[0]=bA[3];bA[3]=w[0];
bA=FromPS.makeArr(bA,"real");o.push(bA[0],bA[1],bA[2],bA[3])}else if(t=="newpath")UDOC.G.newPath(e);
else if(t=="stroke"){FromPS.checkPageStarted(H,N);N.Stroke(e);UDOC.G.newPath(e)}else if(t=="shfill"){var aW=e.colr,as=e.pth,b_=o.pop().val,k=e.ctm.slice(0);
e.colr=FromPS.getPSShadingFill({typ:"dict",val:b_,maxl:1e3},k);FromPS.checkPageStarted(H,N);e.pth=e.cpth;
e.cpth=UDOC.G.rectToPath(H.bb);N.Fill(e);e.colr=aW;e.pth=as}else if(t=="fill"||t=="eofill"){FromPS.checkPageStarted(H,N);
N.Fill(e,t=="eofill");UDOC.G.newPath(e)}else if(t=="showpage"){FromPS.checkPageStarted(H,N);N.ShowPage();
var bU=e.font;e=H.gst=UDOC.getState(H.bb);e.font=bU;H.pgOpen=!1}else if(t=="print"){var c1=o.pop().val,A=FromPS.readStr(c1);
N.Print(A)}else if(t=="_drawRect_"){var bQ=o.pop();if(bQ.typ!="real"&&bQ.typ!="integer")throw"e";bQ=bQ.val;
var bv=o.pop().val,a0=o.pop().val,ci=o.pop().val;UDOC.G.drawRect(e,ci,a0,bv,bQ)}else if(t=="closepath")UDOC.G.closePath(e);
else if(t=="moveto"||t=="lineto"){var a0=o.pop().val,ci=o.pop().val;if(t=="moveto")UDOC.G.moveTo(e,ci,a0);
else UDOC.G.lineTo(e,ci,a0)}else if(t=="rmoveto"||t=="rlineto"){var a0=o.pop().val,ci=o.pop().val,bo=e.ctm.slice(0);
UDOC.M.invert(bo);var b_=UDOC.M.multPoint(bo,e.cpos);a0+=b_[1];ci+=b_[0];if(t=="rmoveto")UDOC.G.moveTo(e,ci,a0);
else UDOC.G.lineTo(e,ci,a0)}else if(t=="curveto"){var c7=o.pop().val,ck=o.pop().val,aN=o.pop().val,br=o.pop().val,bK=o.pop().val,cx=o.length==0?0:o.pop().val;
UDOC.G.curveTo(e,cx,bK,br,aN,ck,c7)}else if(t=="arc"||t=="arcn"){var aL=o.pop().val,aa=o.pop().val,ae=o.pop().val,a0=o.pop().val,ci=o.pop().val;
UDOC.G.arc(e,ci,a0,ae,aa*Math.PI/180,aL*Math.PI/180,t=="arcn")}else if(t=="concat"){var k=FromPS.readArr(o.pop().val);
UDOC.M.concat(k,e.ctm);e.ctm=k}else if(["translate","scale","rotate"].indexOf(t)!=-1){var Z=o.pop(),k,ci,a0;
if(Z.typ=="array"){k=FromPS.readArr(Z.val);a0=o.pop().val}else{k=[1,0,0,1,0,0];a0=Z.val}if(t!="rotate")ci=o.pop().val;
if(t=="translate")UDOC.M.translate(k,ci,a0);if(t=="scale")UDOC.M.scale(k,ci,a0);if(t=="rotate")UDOC.M.rotate(k,-a0*Math.PI/180);
if(Z.typ=="array")o.push({typ:"array",val:FromPS.makeArr(k,"real")});else{UDOC.M.concat(k,e.ctm);e.ctm=k}}else if(t=="concatmatrix"){var by=FromPS.readArr,cf=by(o.pop().val),ab=by(o.pop().val),b5=by(o.pop().val),k=b5.slice(0);
UDOC.M.concat(k,ab);k=FromPS.makeArr(k,"real");o.push({typ:"array",val:k})}else if(t=="invertmatrix"){var by=FromPS.readArr,ab=by(o.pop().val),b5=by(o.pop().val),k=b5.slice(0);
UDOC.M.invert(k);k=FromPS.makeArr(k,"real");o.push({typ:"array",val:k})}else if(t=="currentmatrix"||t=="defaultmatrix"){var k=o.pop(),cg=FromPS.makeArr(t=="currentmatrix"?e.ctm:[1,0,0,1,0,0],"real");
for(var d=0;d<6;d++)k.val[d]=cg[d];o.push(k)}else if(t=="setmatrix"){e.ctm=FromPS.readArr(o.pop().val)}else if(t=="cvi"){var n=o.pop(),Z=n.val,F=0;
if(n.typ=="real")F=Math.round(Z);else if(n.typ=="integer")F=Z;else throw"unknown type "+n.typ;o.push({typ:"integer",val:F})}else if(t=="cvr"){var n=o.pop(),Z=n.val,F=0;
if(n.typ=="real")F=Z;else if(n.typ=="integer")F=Z;else if(n.typ=="string")F=parseFloat(FromPS.readStr(Z));
else throw"unknown type "+n.typ;o.push({typ:"real",val:F})}else if(t=="cvs"){var A=o.pop(),aK=o.pop(),p="";
A.val=[];o.push(A);if(aK.typ=="real"||aK.typ=="integer"){if(Math.abs(Math.round(aK.val)-aK.val)<1e-6)p=Math.round(aK.val)+".0";
else p=(Math.round(aK.val*1e6)/1e6).toString()}else if(aK.typ=="name")p=aK.val;else throw"unknown var type: "+aK.typ;
for(var d=0;d<p.length;d++)A.val[d]=p.charCodeAt(d)}else if(t=="cvx"){var n=o.pop(),bj;if(n.typ=="array")bj={typ:"procedure",val:n.val};
else if(n.typ=="name")bj={typ:"name",val:n.val.slice(1)};else if(n.typ=="string"){bj={typ:"file",val:{off:0,buff:new Uint8Array(n.val)}}}else{console.log(n);
throw n.typ}o.push(bj)}else if(t=="cvlit"){var B=o.pop();if(B.typ=="procedure")o.push({typ:"array",val:B.val});
else o.push(B)}else if(t=="cvn"){o.push({typ:"name",val:FromPS.readStr(o.pop().val)})}else if("add sub mul div idiv bitshift mod exp atan".split(" ").indexOf(t)!=-1){var a1=o.pop(),cl=o.pop(),T=cl.val,u=a1.val,F=0,a="";
if(t=="add"||t=="sub"||t=="mul")a=cl.typ=="real"||a1.typ=="real"?"real":"integer";else if(t=="div"||t=="atan"||t=="exp")a="real";
else if(t=="mod"||t=="idiv"||t=="bitshift")a="integer";if(cl.typ=="real"){w[0]=T;T=w[0]}if(a1.typ=="real"){w[0]=u;
u=w[0]}if(t=="add")F=T+u;if(t=="sub")F=T-u;if(t=="mul")F=T*u;if(t=="div")F=T/u;if(t=="idiv")F=~~(T/u);
if(t=="bitshift")F=u>0?T<<u:T>>>-u;if(t=="mod")F=T%u;if(t=="exp")F=Math.pow(T,u);if(t=="atan")F=Math.atan2(T,u)*180/Math.PI;
if(a=="real"){w[0]=F;F=w[0]}o.push({typ:a,val:F})}else if("neg abs floor ceiling round truncate sqrt ln sin cos".split(" ").indexOf(t)!=-1){var cl=o.pop(),T=cl.val,F=0,a="";
if(t=="neg"||t=="abs"||t=="truncate"||t=="floor"||t=="ceiling"||t=="round")a=cl.typ;else if(t=="sqrt"||t=="sin"||t=="cos"||t=="ln")a="real";
if(cl.typ=="real"){w[0]=T;T=w[0]}if(t=="neg")F=-T;if(t=="abs")F=Math.abs(T);if(t=="floor")F=Math.floor(T);
if(t=="ceiling")F=Math.ceil(T);if(t=="round")F=Math.round(T);if(t=="truncate")F=Math.trunc(T);if(t=="sqrt")F=Math.sqrt(T);
if(t=="ln")F=Math.log(T);if(t=="sin")F=Math.sin(T*Math.PI/180);if(t=="cos")F=Math.cos(T*Math.PI/180);
if(t=="ln"&&T<=0)throw"e";if(a=="real"){w[0]=F;F=w[0]}o.push({typ:a,val:F})}else if("eq ge gt le lt ne".split(" ").indexOf(t)!=-1){var a1=o.pop(),cl=o.pop(),z=cl.typ,bl=a1.typ,T=cl.val,u=a1.val,F=!1;
if(t=="eq"||t=="ne"){var bJ=cl.typ==a1.typ;if(bJ&&["integer","real","name","null","dict"].indexOf(z)!=-1)F=T==u;
else if(z=="real"&&bl=="integer"||bl=="real"&&z=="integer")F=T==u;else if(!bJ&&(cl.typ=="null"||a1.typ=="null"))F=!1;
else if(bJ&&cl.typ=="string"){if(T.length!=u.length)F=!1;else{F=!0;for(var d=0;d<T.length;d++)if(T[d]!=u[d])F=!1}}else{console.log(t,cl,a1,cl.val==a1.val);
throw"e"}if(t=="ne")F=!F}else if(t=="ge")F=T>=u;else if(t=="gt")F=T>u;else if(t=="le")F=T<=u;else if(t=="lt")F=T<u;
o.push({typ:"boolean",val:F})}else if(["and","or"].indexOf(t)!=-1){var S=o.pop(),G=o.pop(),u=G.val,$=S.val,J=G.typ=="integer",F;
if(t=="and")F=J?u&$:u&&$;if(t=="or")F=J?u|$:u||$;o.push({typ:J?"integer":"boolean",val:F})}else if(t=="not"){var bW=o.pop(),Z=bW.val,J=bW.typ=="integer",F=J?~Z:!Z;
o.push({typ:J?"integer":"boolean",val:F})}else if(t=="if"){var c4=o.pop(),Y=o.pop().val;if(Y)FromPS.addProc(c4,U)}else if(t=="ifelse"){var ca=o.pop(),ay=o.pop(),Y=o.pop().val;
FromPS.addProc(Y?ay:ca,U)}else if(t=="exec"||t=="stopped"){var B=o.pop();if(t=="stopped")FromPS.addProc({typ:"procedure",val:[{typ:"boolean",val:!1}]},U);
if(B.typ=="procedure")FromPS.addProc(B,U);else if(B.typ=="name"||B.typ=="operator"||B.typ=="integer"||B.typ=="real"||B.typ=="array")FromPS.addProc({typ:"procedure",val:[B]},U);
else{console.log(B);throw"unknown executable type: "+B.typ}}else if(t=="stop"){var E=U[U.length-1];if(E.typ=="procedure"&&E.off!=0)U.pop()}else if(t=="dup"){var Z=o.pop();
o.push(Z,Z)}else if(t=="exch"){o.push(o.pop(),o.pop())}else if(t=="copy"){var cz=o.pop();if(cz.typ=="integer"){var bh=[];
for(var d=0;d<cz.val;d++)bh[cz.val-1-d]=o.pop();for(var d=0;d<cz.val;d++)o.push(bh[d]);for(var d=0;d<cz.val;
d++)o.push(bh[d])}else if(cz.typ=="array"){var k=o.pop().val;for(var d=0;d<k.length;d++){cz.val[d]=k[d];
if(k[d].val==null){console.log(s);throw"e"}}o.push(cz)}else if(cz.typ=="dict"){var k=o.pop().val;for(var y in k){cz.val[y]=k[y]}o.push(cz)}else throw"e"}else if(t=="roll"){var cA=o.pop().val,cz=o.pop().val,bh=[];
for(var d=0;d<cz;d++)bh.push(o.pop());bh.reverse();cA=(cz+cA)%cz;for(var d=0;d<cA;d++)bh.unshift(bh.pop());
for(var d=0;d<cz;d++)o.push(bh[d])}else if(t=="index"){var cz=o.pop().val;o.push(o[o.length-1-cz])}else if(t=="anchorsearch"){var q=o.pop(),bY=o.pop(),aY=q.val,A=bY.val,aT=!0;
if(aY.length<=A.length){for(var d=0;d<aY.length;d++)if(aY[d]!=A[d])aT=!1}else aT=!1;if(aT)o.push({typ:"string",val:A.slice(aY.length)},q);
else o.push(bY);o.push({typ:"boolean",val:aT})}else if(t=="transform"||t=="itransform"||t=="dtransform"||t=="idtransform"){var k=o.pop(),a0=0,ci=0;
if(k.typ=="array"){k=FromPS.readArr(k.val);a0=o.pop().val}else{a0=k.val;k=e.ctm.slice(0)}if(t=="itransform"||t=="idtransform"){UDOC.M.invert(k)}ci=o.pop().val;
if(t.endsWith("dtransform")){k[4]=0;k[5]=0}var ch=UDOC.M.multPoint(k,[ci,a0]);o.push({typ:"real",val:ch[0]},{typ:"real",val:ch[1]})}else if(t=="pop"||t=="srand"||t=="=="){o.pop()}else if(t=="rand"){o.push({typ:"integer",val:Math.floor(Math.random()*2147483647)})}else if(t=="put"){var M=o.pop(),n=o.pop(),B=o.pop(),a=B.typ;
if(a=="array"){if(n.typ!="integer")throw"e";B.val[n.val]=M}else if(a=="dict"){var h=FromPS.getDKey(n);
B.val[h]=M}else if(a=="string")B.val[n.val]=M.val;else throw a+" e"}else if(t=="get"){var n=o.pop(),B=o.pop(),a=B.typ;
if(a=="string")o.push({typ:"integer",val:B.val[n.val]});else if(a=="array"){var p=B.val[n.val];if(p==null)throw"e";
o.push(p)}else if(a=="dict"){var bd=FromPS.getDKey(n),Z=B.val[bd];if(Z==null){throw"e"}else o.push(Z)}else throw"getting from unknown type "+B.typ}else if(t=="load"){var g=o.pop().val.slice(1),M=FromPS.getFromStacks(g,s);
if(M==null){console.log(g,s);throw"e"}o.push(M)}else if(t=="where"){var g=o.pop().val.slice(1),aQ=FromPS.where(g,s);
if(aQ!=null)o.push({typ:"dict",val:aQ,maxl:1e3});o.push({typ:"boolean",val:aQ!=null})}else if(t=="store"){var M=o.pop(),g=o.pop().val.slice(1),aQ=FromPS.where(g,s);
if(aQ==null)aQ=s[s.length-1];aQ[g]=M}else if(t=="repeat"){var c4=o.pop(),b6=o.pop().val;U.push({typ:"name",val:t+"---",ctx:{proc:c4,cur:0,cnt:b6}})}else if(t=="repeat---"){var l=v.ctx;
if(l.cur<l.cnt){U.push(v);FromPS.addProc(l.proc,U);l.cur++}}else if(t=="for"){var c4=o.pop(),ap=o.pop(),cB=o.pop(),ax=o.pop();
U.push({typ:"name",val:t+"---",ctx:{proc:c4,isInt:ax.typ=="integer"&&cB.typ=="integer",init:ax.val,inc:cB.val,limit:ap.val}})}else if(t=="for---"){var l=v.ctx;
if(l.isInt){if(l.inc>0&&l.init<=l.limit||l.inc<0&&l.init>=l.limit){U.push(v);FromPS.addProc(l.proc,U);
o.push({typ:"integer",val:l.init});l.init+=l.inc}}else{var L=new Float32Array(1);L[0]=l.limit;l.limit=L[0];
L[0]=l.inc;l.inc=L[0];L[0]=l.init;if(l.inc>0&&L[0]<=l.limit||l.inc<0&&L[0]>=l.limit){U.push(v);FromPS.addProc(l.proc,U);
o.push({typ:"real",val:L[0]});L[0]+=l.inc;l.init=L[0]}}}else if(t=="loop"){var c4=o.pop();U.push({typ:"name",val:t+"---",ctx:{proc:c4}})}else if(t=="loop---"){var l=v.ctx;
U.push(v);FromPS.addProc(l.proc,U)}else if(t=="pathforall"){var W=o.pop(),c5=o.pop(),ad=o.pop(),an=o.pop()}else if(t=="forall"){var c4=o.pop(),B=o.pop(),l=[c4,B,0];
U.push({typ:"name",val:t+"---",ctx:l})}else if(t=="forall---"){var l=v.ctx,c4=l[0],B=l[1],d=l[2];if(B.typ=="dict"){var au=Object.keys(B.val);
if(d<au.length){U.push(v);FromPS.addProc(c4,U);o.push({typ:"name",val:"/"+au[d]});var p=B.val[au[d]];
if(p==null)throw"e";o.push(p==null?{typ:"null",val:null}:p);l[2]++}}else if(B.typ=="procedure"||B.typ=="array"){if(d<B.val.length){U.push(v);
FromPS.addProc(c4,U);var cr=B.val[d];o.push(cr==null?{typ:"null",val:null}:cr);l[2]++}}else{console.log(c4,B);
throw"forall: unknown type: "+B.typ}}else if(t=="exit"){var d=U.length-1;while(d!=0&&(U[d].typ!="name"||!U[d].val.endsWith("---")))d--;
if(d!=0)while(U.length>d)U.pop()}else if(t=="bind"){}else if(t=="xcheck"){var B=o.pop(),D=B.typ;o.push({typ:"boolean",val:D=="procedure"})}else if(t=="status"){var A=o.pop();
o.push({typ:"boolean",val:!1})}else if(t=="cachestatus"){for(var d=0;d<7;d++)o.push({typ:"integer",val:5e3})}else if(t=="setcachelimit"){o.pop()}else if(t=="type"){var n=o.pop(),bc={name:"nametype",dict:"dicttype",boolean:"booleantype",procedure:"operatortype",string:"stringtype",null:"nulltype",integer:"integertype",array:"arraytype",operator:"operatortype",real:"realtype"};
if(bc[n.typ]==null){console.log(n);throw n.typ}o.push({typ:"name",val:"/"+bc[n.typ]})}else if(t=="save"){o.push({typ:"state",val:JSON.parse(JSON.stringify(e))})}else if(t=="restore"){e=H.gst=o.pop().val}else if(t=="clipsave"){e.cpstack.push(JSON.parse(JSON.stringify(e.cpth)))}else if(t=="cliprestore"){e.cpath=e.cpstack.pop()}else if(t=="gsave"){j.push(JSON.parse(JSON.stringify(e)))}else if(t=="grestore"){if(j.length!=0)e=H.gst=j.pop();
else e=UDOC.getState()}else if(t=="grestoreall"){while(j.length!=0)e=H.gst=j.pop()}else if(t=="usertime"||t=="realtime")o.push({typ:"integer",val:t=="usertime"?Date.now()-R:Date.now()});
else if(t=="flush"||t=="readonly"||t=="executeonly"){}else if(t=="flushfile"){FromPS.GetFile(o.pop())}else if(t=="filter"){var bV=o.pop().val,bM;
if(bV=="/SubFileDecode"){var A=o.pop();if(A.typ!="string")throw"e";var bu=o.pop().val;A=A.val;bM=[bV,A,bu]}else bM=[bV];
var b8=o.pop();o.push({typ:"file",val:{buff:new Uint8Array,off:0},_flt:bM,_src:b8})}else if(t=="begincmap"||t=="endcmap"){}else if(t=="begincodespacerange"||t=="beginbfrange"||t=="beginbfchar"){H.cmnum=o.pop().val}else if(t=="endcodespacerange"||t=="endbfrange"||t=="endbfchar"){var W=t=="endbfrange"?3:2,cp=t.slice(3),aQ=s[s.length-1],b9=0;
if(aQ[cp]==null)aQ[cp]=[];for(var d=0;d<H.cmnum;d++){var bS=[];for(var cA=W-1;cA>=0;cA--){var aE=o.pop(),aU=aE.val,p;
if(aE.typ=="string"){p=FromPS.strToInt(aU);if(cA==0)b9=aU.length}else{p=[];for(var bd=0;bd<aU.length;
bd++)p.push(FromPS.strToInt(aU[bd].val))}bS[cA]=p}aQ[cp]=aQ[cp].concat(bS)}if(t!="endcodespacerange")aQ.bpc=b9}else if(V)V(t,o,s,U,j,H,N);
else{console.log(M,t);console.log(s,o);throw"e"}}else throw B.typ}return!0};FromPS.strToInt=function(o){var s=0;
for(var U=0;U<o.length;U++)s=s<<8|o[U];return s};FromPS.getDKey=function(o){if(o.typ=="name")return o.val.slice(1);
if(o.typ=="string")return FromPS.readStr(o.val);return o.val};FromPS.GetFile=function(o){if(o._flt==null||o.val.off<o.val.buff.length)return o;
FromPS.GetFile(o._src);var s=o._src.val,U=o._flt,j=U[0],H;if(j=="/ASCII85Decode")H=FromPS.F.ASCII85Decode(s);
else if(j=="/RunLengthDecode")H=FromPS.F.RunLengthDecode(s);else if(j=="/FlateDecode")H=FromPS.F.FlateDecode(s);
else if(j=="/LZWDecode")H=FromPS.F.LZWDecode(s);else if(j=="/SubFileDecode"){var V=U[1],m=U[2],R=s.off,w=0;
while(R<s.buff.length){var X=0;while(X<V.length&&s.buff[R+X]==V[X])X++;if(X==V.length){if(w==m)break;
w++}R++}H=s.buff.slice(s.off,R);s.off=R}else throw j;o.val={buff:H,off:0};return o};FromPS.checkPageStarted=function(o,s){if(!o.pgOpen){s.StartPage(o.bb[0],o.bb[1],o.bb[2],o.bb[3]);
o.pgOpen=!0}};FromPS.getPSShadingFill=function(o,s){function U(H){var N,V=H.typ,m=H.val;if(V=="dict"){N={};
for(var R in m)N["/"+R]=U(m[R])}else if(V=="array"){N=[];for(var w=0;w<m.length;w++)N.push(U(m[w]))}else if(V=="string"){N="";
for(var w=0;w<m.length;w++)N+=String.fromCharCode(m[w])}else if(["boolean","integer","real","name"].indexOf(V)!=-1)N=m;
else if(V=="procedure"){var X="";for(var w=0;w<m.length;w++)X+=m[w].val+" ";X="{ "+X+"}";var e=new Uint8Array(X.length);
for(var w=0;w<X.length;w++)e[w]=X.charCodeAt(w);N={"/FunctionType":4,"/Domain":[0,1],"/Range":[0,1,0,1,0,1,0,1],"/Length":X.length,stream:e}}else{console.log(H);
throw"e"}return N}var j=U(o);return FromPS.getShadingFill(j,s)};FromPS.F={HexDecode:function(o){var s=[];
FromPS.readHex(o,1e9,s);return new Uint8Array(s)},ASCII85Decode:function(o){var s=[85*85*85*85,85*85*85,85*85,85,1],U=[],j=0,H=0,N=o.off,V=o.buff,m=V.length;
while(!0){var w=V[N++];if(FromPS.isWhite(w)){}else if(w==126){if(j!=0){if(j==3){U.push(H>>>24&255)}if(j==4){U.push(H>>>24&255);
U.push(H>>>16&255)}var X=5-j<<3,e=H>>>X&255;H=H&(1<<X)-1;if(H!=0)e++;U.push(e)}o.off=N+1;return new Uint8Array(U)}else if(w==122){U.push(0);
U.push(0);U.push(0);U.push(0)}else{H+=(w-33)*s[j];j++;if(j==5){U.push(H>>>24&255);U.push(H>>>16&255);
U.push(H>>>8&255);U.push(H>>>0&255);j=0;H=0}}}},RunLengthDecode:function(o){var s=[],U=o.off,j=o.buff.length;
while(U<j){var H=o.buff[U];U++;if(H==128){break}if(H<128){for(var N=0;N<H+1;N++)s.push(o.buff[U+N]);
U+=H+1}else{for(var N=0;N<257-H;N++)s.push(o.buff[U]);U++}}o.off=U;return new Uint8Array(s)},FlateDecode:function(o){var s=o.buff,U=new Uint8Array(s.buffer,s.byteOffset+o.off+2,s.length-2),j=pako.inflateRaw(U);
return j},LZWDecode:function(o){var s=new Uint8Array((o.buff.length-o.off)*20),U=UTIF.decode._decodeLZW(o.buff,o.off,s,0);
return s.slice(0,U)},_myLZW:function(){var o={},s=function(j,H,N,V,m){for(var w=0;w<m;w+=4){N[V+w]=j[H+w];
N[V+w+1]=j[H+w+1];N[V+w+2]=j[H+w+2];N[V+w+3]=j[H+w+3]}},U=function(j,H,N,V){if(!o.c){var m=new Uint32Array(65535),w=new Uint16Array(65535),X=new Uint8Array(2e6);
for(var e=0;e<256;e++){X[e<<2]=e;m[e]=e<<2;w[e]=1}o.c=[m,w,X]}var v=o.c[0],D=o.c[1],X=o.c[2],C=258,P=258<<2,x=9,r=H<<3,O=256,i=257,n=0,Q=0,c=0;
while(!0){n=j[r>>>3]<<16|j[r+8>>>3]<<8|j[r+16>>>3];Q=n>>24-(r&7)-x&(1<<x)-1;r+=x;if(Q==i)break;if(Q==O){x=9;
C=258;P=258<<2;n=j[r>>>3]<<16|j[r+8>>>3]<<8|j[r+16>>>3];Q=n>>24-(r&7)-x&(1<<x)-1;r+=x;if(Q==i)break;
N[V]=Q;V++}else if(Q<C){var g=v[Q],aq=D[Q];s(X,g,N,V,aq);V+=aq;if(c>=C){v[C]=P;X[v[C]]=g[0];D[C]=1;P=P+1+3&~3;
C++}else{v[C]=P;var I=v[c],A=D[c];s(X,I,X,P,A);X[P+A]=X[g];A++;D[C]=A;C++;P=P+A+3&~3}if(C+1==1<<x)x++}else{if(c>=C){v[C]=P;
D[C]=0;C++}else{v[C]=P;var I=v[c],A=D[c];s(X,I,X,P,A);X[P+A]=X[P];A++;D[C]=A;C++;s(X,P,N,V,A);V+=A;P=P+A+3&~3}if(C+1==1<<x)x++}c=Q}return V};
return U}()};FromPS.B={readUshort:function(o,s){return o[s]<<8|o[s+1]},readUint:function(o,s){return o[s]*(256*256*256)+(o[s+1]<<16|o[s+2]<<8|o[s+3])},readASCII:function(o,s,U){var j="";
for(var H=0;H<U;H++)j+=String.fromCharCode(o[s+H]);return j}};FromPS.nrm=function(o){return Math.max(0,Math.min(1,o))};
FromPS.makeArr=function(o,s){var U=[];for(var j=0;j<o.length;j++)U.push({typ:s,val:o[j]});return U};
FromPS.readArr=function(o){var s=[];for(var U=0;U<o.length;U++)s.push(o[U].val);return s};FromPS.makeStr=function(o){var s=[];
for(var U=0;U<o.length;U++)s.push(o.charCodeAt(U));return s};FromPS.readStr=function(o){var s="";for(var U=0;
U<o.length;U++)s+=String.fromCharCode(o[U]);return s};FromPS.getFromStacks=function(o,s){var U=s.length-1;
while(U>=0){if(s[U][o]!=null)return s[U][o];U--}return null};FromPS.where=function(o,s){var U=s.length-1;
while(U>=0){if(s[U][o]!=null)return s[U];U--}return null};FromPS.skipWhite=function(o){var s=o.off,U=o.buff,j=FromPS.isWhite;
while(j(U[s])||U[s]==37){while(j(U[s]))s++;if(U[s]==37){while(s<U.length&&!FromPS.isEOL(U[s]))s++;s++}}o.off=s};
FromPS.getToken=function(o,s){if(o.length==0)return null;var U=o[o.length-1];if(U.typ=="procedure"){var j=U.val[U.off];
U.off++;if(U.off==U.val.length)o.pop();return j}if(U.typ=="name"){o.pop();return U}var H=FromPS.getFToken(U.val,s);
while(H==null&&o.length>1){o.pop();if(o.length!=0)H=FromPS.getFToken(o[o.length-1].val,s)}return H};
FromPS.getFToken=function(o,s){FromPS.skipWhite(o);var U=FromPS.isWhite,j=FromPS.isSpecl,H=o.off,N=o.buff,V=null;
if(H>=N.length)return null;var m=N[H],w=String.fromCharCode(m);H++;if(w=="("){var X=0,e=H;while(!(N[e]==41&&X==0)){var v=N[e];
if(v==40)X++;else if(v==41)X--;else if(v==92)e++;e++}var D=[];for(var M=0;M<e-H;M++)D.push(N[H+M]);H=e+1;
D=FromPS.getString(D);V={typ:"string",val:D}}else if(w=="{"||w=="}"||w=="["||w=="]"){V={typ:"name",val:w}}else if(w=="<"&&N[H]==60||w==">"&&N[H]==62){V={typ:"name",val:w=="<"?"<<":">>"};
H++}else if(w=="<"){var D;if(N[H]=="~".charCodeAt(0)){o.off=H+1;var C=FromPS.F.ASCII85Decode(o);D=[];
for(var M=0;M<C.length;M++)D.push(C[M]);H=o.off}else{var e=H;while(N[e]!=62)e++;var D=[];FromPS.readHex({buff:N,off:H},1e9,D);
H=e+1}V={typ:"string",val:D}}else{var e=H;while(e<N.length&&!U(N[e])&&(!j(N[e])||N[e]==47&&N[e-1]==47&&e==H&&s))e++;
var P=FromPS.B.readASCII(N,H-1,e-H+1);H=e;var x=parseFloat(P);if(!1){}else if(P=="true"||P=="false")V={typ:"boolean",val:P=="true"};
else if(!isNaN(x)){var r=new Float32Array(1);r[0]=x;x=r[0];V={typ:P.indexOf(".")==-1?"integer":"real",val:x}}else{if(P.slice(0,2)=="//"&&s){var O=P.slice(2),i=FromPS.getFromStacks(O,s);
if(i!=null)V=i;else V={typ:"name",val:P}}else V={typ:"name",val:P}}}o.off=H;return V};FromPS.isSpecl=function(o){return[40,41,60,62,91,93,123,125,37,47].indexOf(o)!=-1};
FromPS.isWhite=function(o){return o==0||o==9||o==10||o==12||o==13||o==32};FromPS.isEOL=function(o){return o==10||o==13};
FromPS.getString=function(o){var s=[],U="n,r,t,b,f,\\,(,), ,/".split(","),j=["\n","\r","\t","\b","\f","\\","(",")"," ","/"];
for(var H=0;H<o.length;H++){var N=o[H],V=String.fromCharCode(N);if(V=="\\"){var m=String.fromCharCode(o[H+1]);
H++;if(m=="\r"||m=="\n")continue;var w=U.indexOf(m);if(w!=-1)s.push(j[w].charCodeAt(0));else{var X=m+String.fromCharCode(o[H+1])+String.fromCharCode(o[H+2]);
H+=2;s.push(parseInt(X,8))}}else s.push(N)}return s};FromPS.makeString=function(o){var s="n r t b f \\ ( )".split(" "),U=["\n","\r","\t","\b","\f","\\","(",")"],j=[];
for(var H=0;H<o.length;H++){var N=o[H],V=U.indexOf(String.fromCharCode(N));if(V==-1)j.push(N);else j.push(92,s[V].charCodeAt(0))}return j};
FromPS.readHex=function(o,s,U){var j=0,H=-1,N=o.off,V=o.buff.length;while(j!=s&&N<V){var m=o.buff[N],X=0;
N++;if(47<m&&m<58)X=m-48;else if(96<m&&m<103)X=10+m-97;else if(64<m&&m<71)X=10+m-65;else if(m==62)break;
else if(FromPS.isWhite(m))continue;else throw"e";if(H==-1)H=X;else{U[j]=H<<4|X;H=-1;j++}}o.off=N};FromPS.getShadingFill=function(o,s){var U=o["/ShadingType"],j=o["/ColorSpace"],H=o["/Extend"],N=o["/Coords"]?o["/Coords"].slice(0):null,V="",R;
if(H==null)H=[!1,!1];if(U==2)V="lin";else if(U==3)V="rad";else{console.log("Unknown shading type",U);
return}var m=o["/Function"];if(m instanceof Array){var w=m.length,X;for(var e=0;e<w;e++){var v=FromPS.getGrad(m[e],"/DeviceGray");
if(e==0)X=v;else{var M=X.length;for(var C=0;C<M;C++)X[C][1][e]=v[C][1][0]}}if(j=="/DeviceCMYK")for(var e=0;
e<X.length;e++)X[e][1]=UDOC.C.cmykToRgb(X[e][1]);R=X}else R=FromPS.getGrad(m,j);if(V=="rad"&&N[2]>N[5]){N=N.slice(3).concat(N.slice(0,3));
H.reverse();R.reverse();for(var e=0;e<R.length;e++)R[e][0]=1-R[e][0]}if(!H[0]&&V!="rad"){var P=R[0];
P[0]+=.002;R.unshift([.001,P[1].slice(),0])}if(!H[1]){var P=R[R.length-1];P[0]-=.002;R.push([0,999,P[1].slice(),0])}var x={typ:V,mat:s,grad:R,crds:N};
return x};FromPS.getGrad=function(o,s){var U=FromPS._normColor,j=o["/Functions"],H=o["/FunctionType"],N=o["/Bounds"],V=o["/Encode"],m;
if(H==0){m=[];var R=Math.min(4,o["/Size"][0]);for(var w=0;w<=R;w++)m.push([w/R,U(o,[w/R],s)])}else if(H==2)m=[[0,U(o,[0],s)],[1,U(o,[1],s)]];
else if(H==3){var X=0;m=[];if(N.length==0||N[0]>0)m.push([0,U(j[0],[V[0]],s)]);for(var w=0;w<N.length;
w++)m.push([N[w],U(j[w],[V[2*w+1]],s)]);if(N.length==0||N[N.length-1]<1)m.push([1,U(j[j.length-1],[V[V.length-1]],s)])}else if(H==4){m=[];
for(var w=0;w<5;w++)m.push([w/5,U(o,[w/5],s)])}return m};FromPS._normColor=function(o,s,U){var j="/DeviceCMYK",H="/DeviceRGB",N,V=FromPS.Func(o,s);
if(U[3]&&U[3]["/Length"]){V=FromPS.Func(U[3],V);if(U[2]==j||V.length==4)N=j;else if(U[2]==H)N=H;else if(U[2]&&U[2][1]&&U[2][1]["/Alternate"]&&U[2][1]["/Alternate"][0]=="/Lab")N="/Lab";
else if(U[2]&&U[2][1]&&U[2][1]["/Alternate"]&&U[2][1]["/Alternate"]==H)N=H;else{console.log(V,U);throw"unknown color profile"}}else if(U[0]=="/ICCBased"&&U[1]){var m=U[1]["/N"];
if(m==4)N=j;else if(m==3)N=H;else throw m}else if(U[0]=="/Separation"){V=FromPS._readSeparation(U,V[0]);
N=H}else if(U.length==1)N=U[0];else if(U[0]=="/Lab")N="/Lab";else if(U[2]==j)N=j;else N=U;if(N==H)V=V;
else if(N==j)V=UDOC.C.cmykToRgb(V);else if(N=="/DeviceGray")V=[V[0],V[0],V[0]];else if(N=="/Lab")V=UDOC.C.labToRgb(V);
else throw"Unknown color space "+N;return V};FromPS._readSeparation=function(o,s){var U=FromPS.Func(o[3],[s]),j;
if(o&&o[2]=="/DeviceCMYK")j=UDOC.C.cmykToRgb(U);else if(o&&o[2]=="/DeviceGray")j=[U[0],U[0],U[0]];else if(o&&o[2]&&o[2][0]&&o[2][0]=="/Lab")j=UDOC.C.labToRgb(U);
else{j=U}return j};FromPS.Func=function(o,s){var U=FromPS.intp,j=o["/Domain"],H=o["/Range"],V=o["/FunctionType"],m=[];
for(var R=0;R<s.length;R++)s[R]=Math.max(j[2*R],Math.min(j[2*R+1],s[R]));if(V==0){var w=o["/Encode"],X=o["/Size"],e=o["/Decode"],v=H.length/2;
if(w==null)w=[0,X[0]-1];if(e==null)e=H;for(var R=0;R<s.length;R++){var M=U(s[R],j[2*R],j[2*R+1],w[2*R],w[2*R+1]);
s[R]=Math.max(0,Math.min(X[R]-1,M))}var C=o["/DataSource"];for(var P=0;P<v;P++){var x=Math.round(s[0]),r;
if(C)r=C.charCodeAt(v*x+P);else r=FromPS.GS(o)[v*x+P];r=U(r,0,255,e[2*P],e[2*P+1]);m.push(r)}}else if(V==2){var O=o["/C0"],i=o["/C1"],n=o["/N"];
if(O==null)O=[0];if(i==null)i=[1];var x=s[0];for(var R=0;R<O.length;R++)m[R]=O[R]+Math.pow(x,n)*(i[R]-O[R])}else if(V==4){var Q=FromPS._getEnv([0,0,0,0]),p=!0;
Q.pgOpen=!0;var B=[],t=[],C=FromPS._getDictStack([],{}),c=[];c.push({typ:"file",val:{buff:FromPS.GS(o),off:0}});
while(p)p=FromPS.step(t,C,c,B,Q,{},FromPS.operator);var h=t.pop();h.off=0;c.push(h);for(var R=0;R<s.length;
R++)t.push({typ:"real",val:s[R]});p=!0;while(p)p=FromPS.step(t,C,c,B,Q,{},FromPS.operator);for(var R=0;
R<t.length;R++)m.push(t[R].val)}if(H)for(var R=0;R<m.length;R++)m[R]=Math.max(H[2*R],Math.min(H[2*R+1],m[R]));
return m};FromPS.intp=function(o,s,U,j,H){return j+(o-s)*(H-j)/(U-s)};FromPS.GS=function(o){if(o.stream==null){var s=o.buff;
delete o.buff;var U=o["/Filter"],j=o["/DecodeParms"];if(U!=null){var H=typeof U=="string"?[U]:U,N=!1;
for(var V=0;V<H.length;V++){var m=H[V],w={buff:s,off:0};if(m=="/FlateDecode"){s=FromPS.F.FlateDecode(w)}else if(m=="/RunLengthDecode"){s=FromPS.F.RunLengthDecode(w)}else if(m=="/LZWDecode"){s=FromPS.F.LZWDecode(w)}else if(m=="/ASCIIHexDecode"){s=FromPS.F.HexDecode(w)}else if(m=="/ASCII85Decode"||m=="/A85"){s=FromPS.F.ASCII85Decode(w)}else if(m=="/DCTDecode"||m=="/CCITTFaxDecode"||m=="/JPXDecode"||m=="/JBIG2Decode"){N=!0}else{console.log(m,s);
throw"e"}}if(!N)delete o["/Filter"]}if(j!=null){if(j instanceof Array)j=j[0];if(j&&j["/Predictor"]!=null&&j["/Predictor"]!=1){var X=j["/Columns"],e=j["/Colors"]?j["/Colors"]:1,v=e*X,D=s.length/(v+1);
FromPS._filterZero(s,0,X,D,e);s=s.slice(0,D*v)}}o.stream=s}return o.stream};FromPS._filterZero=function(o,s,U,j,H){var N=H*U,V=FromPS._paeth;
for(var R=0;R<j;R++){var w=s+R*N,X=w+R+1,e=o[X-1];if(e==0)for(var v=0;v<N;v++)o[w+v]=o[X+v];else if(e==1){for(var v=0;
v<H;v++)o[w+v]=o[X+v];for(var v=H;v<N;v++)o[w+v]=o[X+v]+o[w+v-H]&255}else if(R==0){for(var v=0;v<H;v++)o[w+v]=o[X+v];
if(e==2)for(var v=H;v<N;v++)o[w+v]=o[X+v]&255;if(e==3)for(var v=H;v<N;v++)o[w+v]=o[X+v]+(o[w+v-H]>>1)&255;
if(e==4)for(var v=H;v<N;v++)o[w+v]=o[X+v]+V(o[w+v-H],0,0)&255}else{if(e==2){for(var v=0;v<N;v++)o[w+v]=o[X+v]+o[w+v-N]&255}if(e==3){for(var v=0;
v<H;v++)o[w+v]=o[X+v]+(o[w+v-N]>>1)&255;for(var v=H;v<N;v++)o[w+v]=o[X+v]+(o[w+v-N]+o[w+v-H]>>1)&255}if(e==4){for(var v=0;
v<H;v++)o[w+v]=o[X+v]+V(0,o[w+v-N],0)&255;for(var v=H;v<N;v++)o[w+v]=o[X+v]+V(o[w+v-H],o[w+v-N],o[w+v-H-N])&255}}}return o};
FromPS._paeth=function(o,s,U){var j=o+s-U,H=Math.abs(j-o),N=Math.abs(j-s),V=Math.abs(j-U);if(H<=N&&H<=V)return o;
else if(N<=V)return s;return U};function FromPDF(){}FromPDF.indexOfXref=function(o){var s=o.length-3;
while(FromPS.B.readASCII(o,s,3)!="%%E")s--;while(o[s-1]==37)s--;var U=s;s--;while(FromPS.isEOL(o[s])||o[s]==32)s--;
while(!FromPS.isEOL(o[s])&&o[s]!=32)s--;s++;var j=parseInt(FromPS.B.readASCII(o,s,U-s));if(isNaN(j))throw"no xref";
return j};FromPDF.Parse=function(o,s){o=new Uint8Array(o);var U=0;while(o[U]==32)U++;if(U!=0)o=new Uint8Array(o.buffer,o.byteOffset+U,o.length-U);
var j=FromPDF.indexOfXref(o),H=[],N=FromPDF.readXrefTrail(o,j,H),V=-1;for(var m=0;m<H.length;m++)if(H[m]==null)V=m;
if(N==null||V!=-1){console.log("PDF is broken, trying to rebuild");while(H.length!=0)H.pop();N=FromPDF.brokenXrefTrail(o,H)}if(N["/Encrypt"]){alert("Encrypted PDFs are not supported yet.");
return}var w={buff:o,off:0},X=N["/Root"];if(X.typ=="ref")N["/Root"]=FromPDF.getIndirect(X.ind,X.gen,w,H);
var e=N["/Root"]["/Pages"];if(e.typ=="ref")N["/Root"]["/Pages"]=FromPDF.getIndirect(e.ind,e.gen,w,H);
var v=[N["/Root"]["/Pages"]];while(v.length!=0){var D=v.pop();if(D["/Kids"]){var M=D["/Kids"];for(var m=0;
m<M.length;m++){if(M[m].typ=="ref")M[m]=FromPDF.getIndirect(M[m].ind,M[m].gen,w,H);FromPDF.solveIndirects(M[m],w,H);
v.push(M[m])}}}var C=Date.now();FromPDF.render(N["/Root"],s,N);s.Done()};FromPDF.solveIndirects=function(o,s,U){if(typeof o=="object")for(var j in o)if(j.startsWith("/")){if(o[j]&&o[j].typ=="ref"&&U[o[j].ind])o[j]=FromPDF.getIndirect(o[j].ind,o[j].gen,s,U);
FromPDF.solveIndirects(o[j],s,U)}};FromPDF.render=function(o,s,U){var j="CS cs SCN scn SC sc sh Do gs ID EI cm y v B B* BT ET Tj TJ Tf Tm Td T* Tc Tw Tz TL Tr Ts MP DP BMC BDC EMC BX EX ri".split(" "),H={J:"setlinecap",j:"setlinejoin",w:"setlinewidth",d:"setdash",M:"setmiterlimit",i:"setflat",q:"gsave",Q:"grestore",m:"moveto",l:"lineto",c:"curveto",h:"closepath",re:"_drawRect_",W:"clip","W*":"eoclip",f:"fill",F:"fill","f*":"eofill",S:"stroke",b:"h B","b*":"h B*",n:"newpath",RG:"/DeviceRGB  CS SCN",rg:"/DeviceRGB  cs scn",G:"/DeviceGray CS SCN",g:"/DeviceGray cs scn",K:"/DeviceCMYK CS SCN",k:"/DeviceCMYK cs scn",TD:"dup neg TL Td","\"":"exch Tc exch Tw '","'":"T* Tj",s:"h S",BI:"/BI"},V=0;
H=FromPS.makeProcs(H);var N=[o["/Pages"]];while(N.length!=0){var m=N.pop();if(m["/Kids"]){var R=m["/Kids"];
for(var w=R.length-1;w>=0;w--)N.push(R[w]);continue}var X=m["/MediaBox"];if(X==null)X=o["/Pages"]["/MediaBox"];
V+=(X[2]-X[0])*(X[3]-X[1])}var N=[o["/Pages"]],e=-1,v=[-1e9,1e9];while(N.length!=0){var m=N.pop();if(m["/Kids"]){var R=m["/Kids"];
for(var w=R.length-1;w>=0;w--)N.push(R[w]);continue}e++;if(e<v[0])continue;if(m["/Resources"]==null)m["/Resources"]=o["/Pages"]["/Resources"];
var D=m["/Contents"];if(D==null)continue;if(D.length==null)D=[D];var M=m["/Rotate"]!=null&&(m["/Rotate"]+36e3)%360==90,X=m["/MediaBox"];
if(X==null)X=o["/Pages"]["/MediaBox"];if(M)X=[X[0],X[1],X[3],X[2]];var C=FromPS._getEnv(X);C.pgOpen=!0;
var P=[],x=[],r=FromPS._getDictStack(j,H),O=[];if(M){UDOC.M.rotate(C.gst.ctm,Math.PI/2);UDOC.M.translate(C.gst.ctm,0,X[3])}s.StartPage(X[0],X[1],X[2],X[3],V);
if(U["/Encrypt"]){if(N.length==0)alert("Encrypted PDF is not supported yet.")}else for(var i=0;i<D.length;
i++){if(D[i].buff==null)continue;var n=FromPS.GS(D[i]),Q=n.length-1,d=!0;while(n[Q]==0)Q--;n=new Uint8Array(n.buffer,n.byteOffset,Q+1);
O.push({typ:"file",val:{buff:n,off:0,extra:m,clgrp:!1}});while(d){d=FromPS.step(x,r,O,P,C,s,FromPDF.operator)}}s.ShowPage();
if(e>=v[1])break}};FromPDF.addCmd=function(o,s,U){var j=o.length,H=new Uint8Array(j);for(var N=0;N<j;
N++)H[N]=o.charCodeAt(N);s.push({typ:"file",val:{buff:H,off:0,extra:U}})};FromPDF._pushForm=function(o,s,U,j){var H=s["/Matrix"];
if(j)FromPDF.addCmd("Q",o,s);if(H){var N=H.slice(0);UDOC.M.invert(N);FromPDF.addCmd(N.join(" ")+" cm",o,s)}o.push({typ:"file",val:{buff:FromPS.GS(s),off:0,extra:s,clgrp:U}});
if(H)FromPDF.addCmd(H.join(" ")+" cm",o,s);if(j)FromPDF.addCmd("q",o,s)};FromPDF.operator=function(o,s,U,j,H,N,V){var m=N.gst,R=j.length-1;
while(j[R].typ!="file")R--;var w=j[R].val,X=w.extra["/Resources"];if(o=="Do"){var e=s.pop().val,v=X["/XObject"][e],D=v["/Subtype"];
if(D=="/Form"){var M=v["/Group"],C=!1;if(M!=null){C=!0}if(v["/Resources"]==null)v["/Resources"]=X;FromPDF._pushForm(j,v,C)}else if(D=="/Image"){var P=v["/Width"],x=v["/Height"],r=v["/ColorSpace"],O=v["/SMask"],i=FromPDF.getImage(v),n=FromPDF.getJBIG2Glob(v),d,B;
if(O&&O["/Width"]){var t=O["/Width"],c=O["/Height"];if(t!=P||c!=x){var p=new Uint32Array(t*c),h=new Uint32Array(i.buffer.slice(i.byteOffset,i.byteOffset+4));
p.fill(h[0]);P=t;x=c;i=new Uint8Array(p.buffer)}d=FromPDF.getImage(v["/SMask"]);B=FromPDF.getJBIG2Glob(v["/SMask"])}if(v["/ImageMask"]==!0){d=i;
B=n;i=new Uint8Array(P*x*4);n=null;var g=m.colr[0]*255,aq=m.colr[1]*255,aQ=m.colr[2]*255;for(var I=0;
I<P*x*4;I+=4){i[I]=g;i[I+1]=aq;i[I+2]=aQ;i[I+3]=255}}if(i&&i.byteOffset!=0)i=i.slice(0);if(d&&d.byteOffset!=0)d=d.slice(0);
V.PutImage(m,i,P,x,d,n,B)}else console.log("Unknown XObject",D)}else if(o=="gs"){if(s.length==0)return;
var A=s.pop().val,bq=X["/ExtGState"][A];for(var K in bq){var aX=bq[K];if(K=="/Type")continue;else if(K=="/CA")m.CA=w.clgrp?m.CA*aX:aX;
else if(K=="/ca")m.ca=w.clgrp?m.ca*aX:aX;else if(K=="/BM"){if(!w.clgrp||m.bmode=="/Normal")m.bmode=aX}else if(K=="/LC")m.lcap=aX;
else if(K=="/LJ")m.ljoin=aX;else if(K=="/LW")m.lwidth=aX;else if(K=="/ML")m.mlimit=aX;else if(K=="/SA")m.SA=aX;
else if(K=="/OPM")m.OPM=aX;else if(K=="/AIS")m.AIS=aX;else if(K=="/OP")m.OP=aX;else if(K=="/op")m.op=aX;
else if(K=="/SMask"){m.SMask=""}else if(K=="/SM")m.SM=aX;else if(K=="/HT"||K=="/TR"){}else console.log("Unknown gstate property: ",K,aX)}}else if(o=="ID"){var bu={};
while(!0){var aX=s.pop().val;if(aX=="/BI")break;bu[s.pop().val]=aX}w.off++;var P=bu["/W"],x=bu["/H"],cw=P*x,i=new Uint8Array(cw*4),r=bu["/CS"],cn=bu["/BPC"],F=w.off,c3=w.buff;
while(!FromPS.isWhite(c3[F])||c3[F+1]!=69||c3[F+2]!=73||!FromPS.isWhite(c3[F+3]))F++;var a5=c3.slice(w.off,F);
w.off+=a5.length;if(bu["/F"]=="/Fl"){var bp={buff:a5,"/Filter":"/FlateDecode"};if(bu["/DP"]){var aw=bp["/DecodeParms"]={},aC=["Predictor","Columns","Colors"];
for(var I=0;I<3;I++)if(bu["/DP"][aC[I]])aw["/"+aC[I]]=bu["/DP"][aC[I]].val}a5=FromPS.GS(bp);delete bu["/F"];
delete bu["/DP"]}if(r=="/G"&&bu["/F"]==null){FromPDF.plteImage(a5,0,i,null,P,x,cn)}else if(r=="/RGB"&&bu["/F"]==null&&a5.length==P*x*3){for(var I=0;
I<cw;I++){var aH=I*3,cz=I*4;i[cz]=a5[aH];i[cz+1]=a5[aH+1];i[cz+2]=a5[aH+2];i[cz+3]=255}}else if(r&&r[0].typ!=null){FromPDF.plteImage(a5,0,i,r[3].val,P,x,cn)}else i=a5;
V.PutImage(m,i,P,x)}else if(o=="n"||o=="BT"||o=="EI"){}else if(o=="ET"){m.font.Tm=[1,0,0,1,0,0];m.font.Tlm=m.font.Tm.slice(0)}else if(o=="y"||o=="v"){var a4=m.ctm.slice(0);
UDOC.M.invert(a4);var K=UDOC.M.multPoint(a4,m.cpos),Z=s.pop().val,bo=s.pop().val,b_=s.pop().val,cq=s.pop().val;
if(o=="y")UDOC.G.curveTo(m,cq,b_,bo,Z,bo,Z);else UDOC.G.curveTo(m,K[0],K[1],cq,b_,bo,Z)}else if(o=="B"||o=="B*"){V.Fill(m,o=="B*");
V.Stroke(m);UDOC.G.newPath(m)}else if(o=="cm"||o=="Tm"){var ag=[];for(var I=0;I<6;I++)ag.push(s.pop().val);
ag.reverse();if(o=="cm"){UDOC.M.concat(ag,m.ctm);m.ctm=ag}else{m.font.Tm=ag;m.font.Tlm=ag.slice(0)}}else if(o=="Td"||o=="T*"){var aS=0,aZ=0;
if(o=="T*"){aS=0;aZ=-m.font.Tl}else{aZ=s.pop().val;aS=s.pop().val}var al=[1,0,0,1,aS,aZ];UDOC.M.concat(al,m.font.Tlm);
m.font.Tm=al;m.font.Tlm=al.slice(0)}else if(o=="Tf"){var c4=s.pop().val,b3=s.pop().val;m.font.Tf=b3;
m.font.Tfs=c4}else if(o=="Tj"||o=="TJ"){var bi=s.pop();if(bi.typ=="string")bi=[bi];else bi=bi.val;var bv=m.font.Tf,b3=X["/Font"][bv];
if(b3==null)b3=X["/Font"][bv.replace("_","#5F")];var bQ=m.font.Tfs/1e3,b9=function(k,aR){var aA=[1,0,0,1,aR,0];
UDOC.M.concat(aA,k.Tm);k.Tm=aA};for(var I=0;I<bi.length;I++){if(bi[I].typ!="string"){if(I==0)b9(m.font,-bQ*bi[I].val);
continue}var b0=FromPDF.getString(bi[I].val,b3);if(bi[I+1]&&bi[I+1].typ!="string"){var c2=bi[I+1].val;
b0[1]+=-c2;if(-900<c2&&c2<-100)b0[0]+=" "}m.font.Tf=b0[2];V.PutText(m,b0[0],b0[1]/1e3);m.font.Tf=bv;
b9(m.font,bQ*b0[1])}}else if(o=="Tc")m.font.Tc=s.pop().val;else if(o=="Tw")m.font.Tw=s.pop().val;else if(o=="Tz")m.font.Th=s.pop().val;
else if(o=="TL")m.font.Tl=s.pop().val;else if(o=="Tr")m.font.Tmode=s.pop().val;else if(o=="Ts")m.font.Trise=s.pop().val;
else if(o=="CS"||o=="cs"){var r=s.pop().val;if(o=="CS")m.sspace=r;else m.space=r}else if(o=="SCN"||o=="scn"||o=="SC"||o=="sc"){var ak=o=="SCN"||o=="SC",_=ak?m.sspace:m.space,r,cs=null,b=X?X["/ColorSpace"]:null;
if(b!=null&&b[_]!=null){if(b[_][1]&&b[_][1]["/Alternate"])r=b[_][1]["/Alternate"];else r=typeof b[_]=="string"?b[_]:b[_][0]}else r=_;
if(r=="/DeviceN"){var cu=b[_],bk=cu[1].length;for(var I=0;I<bk;I++)s.pop();cs=[1,0,0]}else if(r=="/Lab"||r=="/DeviceRGB"||r=="/CalRGB"||r=="/ICCBased"&&b[_][1]["/N"]==3){cs=[s.pop().val,s.pop().val,s.pop().val];
cs.reverse()}else if(r=="/DeviceCMYK"||r=="/ICCBased"&&b[_][1]["/N"]==4){var a3=[s.pop().val,s.pop().val,s.pop().val,s.pop().val];
a3.reverse();cs=UDOC.C.cmykToRgb(a3)}else if(r=="/DeviceGray"||r=="/CalGray"||r=="/ICCBased"&&b[_][1]["/N"]==1){var bR=FromPS.nrm(s.pop().val);
cs=[bR,bR,bR]}else if(r=="/Separation"){cs=FromPS._readSeparation(b[_],s.pop().val)}else if(r=="/Indexed"){var cA=FromPDF.getPalette(b[_]),ar=s.pop().val*3;
cs=[cA[ar]/255,cA[ar+1]/255,cA[ar+2]/255]}else if(r=="/Pattern"){var cc=X["/Pattern"][s.pop().val],ce=cc["/PatternType"];
if(ce==1){console.log("tile pattern");FromPDF._pushForm(j,cc,C,!0);return}var af=cc["/Matrix"];if(af==null)af=[1,0,0,1,0,0];
cs=FromPS.getShadingFill(cc["/Shading"],af);if(cs==null)cs=[0,0,0]}else{console.log(_,r,b,X);throw"e"}if(ak)m.COLR=cs;
else m.colr=cs}else if(o=="sh"){var bg=X["/Shading"][s.pop().val],bn=m.colr,cm=m.pth;m.pth=m.cpth;m.cpth=UDOC.G.rectToPath(N.bb);
m.colr=FromPS.getShadingFill(bg,m.ctm.slice(0));if(m.colr==null)m.colr=[0,0,0];V.Fill(m);m.colr=bn;m.pth=cm}else if(o=="MP"||o=="BMC"||o=="ri"){s.pop()}else if(o=="DP"||o=="BDC"){s.pop();
s.pop()}else if(o=="EMC"||o=="BX"||o=="EX"){}else throw"Unknown operator",o};FromPDF.getJBIG2Glob=function(o){var s=o;
s=s["/DecodeParms"];if(s==null)return null;s=s["/JBIG2Globals"];if(s==null)return null;return FromPS.GS(s)};
FromPDF.getImage=function(o){var s=o["/Width"],U=o["/Height"],j=s*U,H=FromPS.GS(o),N=o["/Filter"],V=o["/ColorSpace"],R=o["/BitsPerComponent"],w=o["/Matte"],X=o.image;
if(X==null){var e=o["/Mask"];if(V&&V[0]=="/Indexed"){var v=FromPDF.getPalette(V),D=new Uint8Array(j*4);
FromPDF.plteImage(H,0,D,v,s,U,R,e);X=D}else if(N==null&&(V==null||V=="/DeviceGray")){var v=[0,0,0,255,255,255],D=new Uint8Array(j*4);
if(o["/Decode"]&&o["/Decode"][0]==1){v.reverse()}if(o["/ImageMask"]==!0)v.reverse();FromPDF.plteImage(H,0,D,R==1?v:null,s,U,R,e);
X=D}else if(N==null&&V&&(V=="/DeviceCMYK"||V[0]=="/ICCBased"&&V[1]&&V[1]["/N"]==4)){var D=new Uint8Array(j*4),M=[0,0,0,0];
for(var C=0;C<j;C++){var P=C*4;M[0]=H[P]*(1/255);M[1]=H[P+1]*(1/255);M[2]=H[P+2]*(1/255);M[3]=H[P+3]*(1/255);
var x=UDOC.C.cmykToRgb(M);D[P]=~~(x[0]*255+.5);D[P+1]=~~(x[1]*255+.5);D[P+2]=~~(x[2]*255+.5);D[P+3]=255}X=D}else if(N==null){var r=Math.round(255/((1<<R)-1)),O=Math.ceil(s*3*R/8),D=new Uint8Array(j*4);
D.fill(255);var r=Math.round(255/((1<<R)-1));for(var i=0;i<U;i++){var n=O*i;for(var d=0;d<s;d++){var P=(i*s+d)*4,t=3*d;
D[P]=FromPDF.getBitNum(H,n,t,R)*r;D[P+1]=FromPDF.getBitNum(H,n,t+1,R)*r;D[P+2]=FromPDF.getBitNum(H,n,t+2,R)*r}}X=D}else{X=H}if(w&&w.join("")!="000"){var c=Math.round(w[0]*255),p=Math.round(w[1]*255),h=Math.round(w[2]*255);
for(var C=0;C<X.length;C+=4){X[C]=Math.max(X[C],c);X[C+1]=Math.max(X[C+1],p);X[C+2]=Math.max(X[C+2],h)}}o.image=X}return X};
FromPDF.getPalette=function(o){var s;if(o[3].length!=null){var U=o[3];s=new Uint8Array(256*3);for(var j=0;
j<U.length;j++)s[j]=U.charCodeAt(j)}else s=FromPS.GS(o[3]);if(o[1]=="/DeviceCMYK"||o[1]&&o[1][1]&&o[1][1]["/N"]==4){var H=s,s=new Uint8Array(256*3);
for(var j=0;j<256;j++){var N=j<<2,V=N-j,m=UDOC.C.cmykToRgb([H[N]/255,H[N+1]/255,H[N+2]/255,H[N+3]/255]);
s[V]=m[0]*255;s[V+1]=m[1]*255;s[V+2]=m[2]*255}}return s};FromPDF.plteImage=function(o,s,U,j,H,N,V,R){var w=Math.round(255/((1<<V)-1)),X=Math.ceil(H*V/8);
for(var e=0;e<N;e++){var v=s+X*e;for(var D=0;D<H;D++){var M=FromPDF.getBitNum(o,v,D,V),C=e*H+D<<2;if(j){var P=M*3;
U[C]=j[P];U[C+1]=j[P+1];U[C+2]=j[P+2]}else{var x=M*w;U[C]=x;U[C+1]=x;U[C+2]=x}U[C+3]=255;if(R&&R[0]<=M&&M<=R[1])U[C+3]=0}}};
FromPDF.getBitNum=function(o,s,U,j){var H=0;if(j==8)H=o[s+U];else if(j==4)H=o[s+(U>>1)]>>(1-(U&1)<<2)&15;
else if(j==2)H=o[s+(U>>2)]>>(3-(U&3)<<1)&3;else if(j==1)H=o[s+(U>>3)]>>(7-(U&7)<<0)&1;return H};FromPDF.getString=function(o,s){var U=s["/Subtype"],j="",H=0,N=null,V=s["/ToUnicode"],m=s["/Encoding"],R=s,aq;
if(V!=null&&typeof V!="object")V=null;if(U=="/Type0")R=s["/DescendantFonts"][0];if(V!=null)j=FromPDF.toUnicode(o,V);
else if(m=="/WinAnsiEncoding")j=FromPDF.encFromMap(o,FromPDF._win1252);else if(m=="/MacRomanEncoding")j=FromPDF.encFromMap(o,FromPDF._macRoman);
else if(U=="/Type0"){var w=0,X=R["/CIDSystemInfo"]["/Ordering"];if(X=="Identity")w=0;else if(X=="Japan1")w=31;
else if(X=="GB1")w=31;else if(X=="CNS1")w=31;else if(X=="Korea1")w=31;else{console.log("unknown ordering",X);
w=0}for(var e=0;e<o.length;e+=2){var D=o[e]<<8|o[e+1];j+=String.fromCharCode(D+w)}}else if(m!=null&&m["/Type"]=="/Encoding"){var M=m["/Differences"],C=m["/BaseEncoding"],P=null,j="";
if(C=="/WinAnsiEncoding")P=FromPDF._win1252;if(C=="/MacRomanEncoding")P=FromPDF._macRoman;for(var x=0;
x<o.length;x++){var O=o[x],i=-5,n=!1;if(M)for(var e=0;e<M.length;e++){if(typeof M[e]=="string"){if(O==i){j+=FromPDF.fromCName(M[e].slice(1));
n=!0;break}i++}else i=M[e]}if(!n&&P!=null){var Q=P.indexOf(O);if(Q!=-1)O=String.fromCharCode(P[Q+1]);
j+=String.fromCharCode(O)}else if(!n)j+=String.fromCharCode(O)}}else{j=FromPS.readStr(o)}if(U=="/Type0"){var d=R["/W"];
if(d&&d.length==0)d=null;if(d==null){H=j.length*1e3*.4;console.log("approximating word widths")}else for(var x=0;
x<o.length;x+=2){var B=o[x]<<8|o[x+1],t=!1;for(var e=0;e<d.length;e+=2){var c=d[e],p=d[e+1];if(p.length){if(0<=B-c&&B-c<p.length){H+=p[B-c];
t=!0}}else{if(c<=B&&B<=p){H+=d[e+2];t=!0}e++}}if(!t)H+=d[1][0]}}else if(U=="/Type1"||U=="/Type3"||U=="/TrueType"){var h=s["/FirstChar"],d=s["/Widths"];
if(d)for(var x=0;x<o.length;x++)H+=d[o[x]-h];else{H=j.length*1e3*.4;console.log("approximating word width")}}else throw"unknown font type";
var g=R["/FontDescriptor"],aQ=["","2","3"];for(var x=0;x<3;x++)if(g&&g["/FontFile"+aQ[x]])aq="/FontFile"+aQ[x];
if(g){if(g.psName)N=g.psName;else if(aq){var I=FromPS.GS(g[aq]);if(aq!=null&&I&&FromPS.B.readUint(I,0)==65536)N=g.psName=FromPDF._psName(I)}}if(N==null&&s["/BaseFont"])N=s["/BaseFont"].slice(1);
if(N==null||N=="")N="DejaVuSans";return[j,H,N]};FromPDF._psName=function(o){var s=FromPS.B.readUshort,U=s(o,4),j=0;
for(var H=0;H<U;H++){var N=FromPS.B.readASCII(o,12+H*16,4),V=FromPS.B.readUint(o,12+H*16+8);if(N=="name"){j=V;
break}}if(j==0)return null;var m=s(o,j+2),w=j+6,X=j+6;for(var H=0;H<m;H++){var e=s(o,X),v=s(o,X+2),D=s(o,X+4),M=s(o,X+6),C=s(o,X+8),P=s(o,X+10),x;
X+=12;var O=w+m*12+P;if(v==1||v==10||v==3||e==3&&v==0){x="";for(var i=1;i<C;i+=2)x+=String.fromCharCode(o[O+i])}else if(v==0||v==2)x=FromPS.B.readASCII(o,O,C);
if(M==6&&x!=null&&x.slice(0,3)!="OTS")return x.replace(/\s/g,"")}return null};FromPDF.encFromMap=function(o,s){var U="";
for(var j=0;j<o.length;j++){var H=o[j],N=s.indexOf(H);if(N!=-1)H=s[N+1];U+=String.fromCharCode(H)}return U};
FromPDF._win1252=[128,8364,130,8218,131,402,132,8222,133,8230,134,8224,135,8225,136,710,137,8240,138,352,139,8249,140,338,142,381,145,8216,146,8217,147,8220,148,8221,149,8226,150,8211,151,8212,152,732,153,8482,154,353,155,8250,156,339,158,382,159,376];
FromPDF._macRoman=[128,196,129,197,130,199,131,201,132,209,133,214,134,220,135,225,136,224,137,226,138,228,139,227,140,229,141,231,142,233,143,232,144,234,145,235,146,237,147,236,148,238,149,239,150,241,151,243,152,242,153,244,154,246,155,245,156,250,157,249,158,251,159,252,160,8224,161,176,162,162,163,163,164,167,165,8226,166,182,167,223,168,174,169,169,170,8482,171,180,172,168,173,9824,174,198,175,216,176,8734,177,177,178,8804,179,8805,180,165,181,181,182,8706,183,8721,184,8719,185,960,186,8747,187,170,188,186,189,937,190,230,191,248,192,191,193,161,194,172,195,8730,196,402,197,8776,198,8710,199,171,200,187,201,8230,202,160,203,192,204,195,205,213,206,338,207,339,208,8211,209,8212,210,8220,211,8221,212,8216,213,8217,214,247,215,9674,216,255,217,376,218,8260,219,8364,220,8249,221,8250,222,64257,223,64258,224,8225,225,183,226,8218,227,8222,228,8240,229,194,230,202,231,193,232,203,233,200,234,205,235,206,236,207,237,204,238,211,239,212,240,63743,241,210,242,218,243,219,244,217,245,305,246,710,247,732,248,175,249,728,250,729,251,730,252,184,253,733,254,731,255,711];
FromPDF.fromCName=function(o){if(o=="f_f_i")return"ffi";if(o.length==1)return o;if(o.slice(0,3)=="uni")return String.fromCharCode(parseInt(o.slice(3),16));
var s={space:32,exclam:33,quotedbl:34,numbersign:35,dollar:36,percent:37,ampersand:38,quotesingle:39,parenleft:40,parenright:41,asterisk:42,plus:43,comma:44,hyphen:45,period:46,slash:47,zero:48,one:49,two:50,three:51,four:52,five:53,six:54,seven:55,eight:56,nine:57,colon:58,semicolon:59,less:60,equal:61,at:64,bracketleft:91,bracketright:93,underscore:95,braceleft:123,braceright:125,dieresis:168,circlecopyrt:169,copyright:169,registered:174,degree:176,plusminus:177,periodcentered:183,Eacute:201,Adieresis:196,adieresis:228,Udieresis:220,germandbls:223,udieresis:252,Odieresis:214,ntilde:241,odieresis:246,Cacute:262,cacute:263,Ccaron:268,ccaron:269,Dcroat:272,dcroat:273,Ecaron:283,ecaron:283,dotlessi:305,Scaron:352,scaron:353,Tcaron:356,tcaron:357,Zcaron:381,zcaron:382,alpha:945,phi:966,endash:8211,emdash:8212,asteriskmath:8727,quoteright:8217,quotedblbase:8222,ellipsis:8230,quotedblleft:8220,quotedblright:8221,bullet:8226,minus:8706,fi:64257,fl:64258},U=s[o];
if(U==null){if(o.charAt(0)!="g")console.log("unknown character "+o);return o}return String.fromCharCode(U)};
FromPDF.toUnicode=function(o,s){var U=s.cmap,j="",H;if(U==null){var N={buff:FromPS.GS(s),off:0},V=[],m=FromPS._getDictStack({}),R=[{typ:"file",val:N}],w=[],X=FromPS._getEnv([0,0,1,1]),e=!0;
X.pgOpen=!0;while(e)e=FromPS.step(V,m,R,w,X,null,FromPS.operator,!0);U=X.res.CMap.val;s.cmap=U}for(var v in U){U=U[v].val;
break}var D=U.bfrange,M=U.bfchar,P=U.bpc;for(var x=0;x<o.length;x+=P){var O=o[x],i=!1;if(P==2)O=O<<8|o[x+1];
if(!i&&D)for(var n=0;n<D.length;n+=3){var Q=D[n],d=D[n+1],B=D[n+2];if(Q<=O&&O<=d){if(Q==d&&B==0){}else if(B.length==null)O+=B-Q;
else O=B[O-Q];i=!0;break}}if(!i&&M)for(var n=0;n<M.length;n+=2)if(M[n]==O){O=M[n+1];i=!0;break}j+=String.fromCharCode(O)}return j};
FromPDF.brokenXrefTrail=function(o,s){function U(D,M){var C=M;while(48<=D[M]&&D[M]<=57)M++;return FromPS.B.readASCII(D,C,M-C)}var j,H=o.length;
for(var N=0;N<H;N++){if(FromPS.isEOL(o[N])){var V=N;while(FromPS.isWhite(o[V]))V++;var m=U(o,V);if(m!=""){V+=m.length;
while(FromPS.isWhite(o[V]))V++;var w=U(o,V);if(w!=""){V+=w.length;while(FromPS.isWhite(o[V]))V++;if(FromPS.B.readASCII(o,V,3)=="obj"){var X=parseInt(m),e=parseInt(w);
s[X]={off:N+1,gen:e,chr:"n"};N=V}}}else if(o[V]==116&&o[V+1]==114&&FromPS.B.readASCII(o,V,7)=="trailer"){if(j==null)j=FromPDF._readTrailer(o,V+7,s)}else if(o[V]==115&&o[V+1]==116&&FromPS.B.readASCII(o,V,9)=="startxref"){V+=10;
while(FromPS.isWhite(o[V]))V++;var v=parseInt(U(o,V));if(v!=0&&j==null)j=FromPDF.readXrefTrail(o,v,s)}}}return j};
FromPDF._readTrailer=function(o,s,U){var j={buff:o,off:s},H=FromPDF.readObject(j,j,U);if(H["/Prev"])FromPDF.readXrefTrail(o,H["/Prev"],U);
return H};FromPDF.readXrefTrail=function(o,s,U){var j=FromPS.B.readASCII(o,s,4);if(j=="xref"){var H=s+4;
if(o[H]==13)H++;if(o[H]==10)H++;while(!0){if(FromPS.B.readASCII(o,H,7)=="trailer"){H+=7;if(o[H]==13)H++;
if(o[H]==10)H++;break}var N=H;while(!FromPS.isEOL(o[H]))H++;var V=FromPS.B.readASCII(o,N,H-N);V=V.split(" ");
var m=parseInt(V[0]),R=parseInt(V[1]);if(o[H]==13)H++;if(o[H]==10)H++;for(var w=0;w<R;w++){var X=m+w;
if(U[X]==null)U[X]={off:parseInt(FromPS.B.readASCII(o,H,10)),gen:parseInt(FromPS.B.readASCII(o,H+11,5)),chr:FromPS.B.readASCII(o,H+17,1),val:null,opn:!1};
if(o[H+16]!=32)return null;H+=20}}return FromPDF._readTrailer(o,H,U)}else{var H=s,e=H+32;while(H<e&&FromPS.B.readASCII(o,H,2)!="<<")H++;
if(FromPS.B.readASCII(o,H,2)=="<<"){var v={buff:o,off:H},M=FromPDF.readObject(v,v,null),C=0,P=FromPS.GS(M),x=M["/W"],r=M["/Index"],O=[],w=0;
if(r){for(w=0;w<r.length;w+=2){for(var i=0;i<r[w+1];i++)O.push(r[w]+i)}}w=0;while(C<P.length){var n=FromPDF.getInt(P,C,x[0]),H=0,t=0,c="n";
C+=x[0];var d=FromPDF.getInt(P,C,x[1]);C+=x[1];var B=FromPDF.getInt(P,C,x[2]);C+=x[2];if(n==0){H=d;t=B;
c="f"}if(n==1){H=d;t=B;c="n"}if(n==2){H=d;t=B;c="s"}U[r?O[w]:w]={off:H,gen:t,chr:c,val:null,opn:!1};
w++}if(M["/Prev"])FromPDF.readXrefTrail(o,M["/Prev"],U);if(M["/Encrypt"])return M;var p={buff:o,off:0},h=["/Root","/Info"];
for(w=0;w<h.length;w++){var g=h[w],aq=M[g];if(aq&&aq.typ=="ref")M[g]=FromPDF.getIndirect(aq.ind,aq.gen,p,U)}return M}else return null}};
FromPDF.getInt=function(o,U,j){if(j==0)return 0;if(j==1)return o[U];if(j==2)return o[U]<<8|o[U+1];if(j==3)return o[U]<<16|o[U+1]<<8|o[U+2];
if(j==4)return o[U]<<24|o[U+1]<<16|o[U+2]<<8|o[U+3];while(j>4){j--;U++}return o[U]<<24|o[U+1]<<16|o[U+2]<<8|o[U+3]};
FromPDF.getIndirect=function(o,s,U,j){var H=j[o],m;if(H.chr=="f")return null;if(H.val!=null)return H.val;
if(H.opn)return{typ:"ref",ind:o,gen:s};H.opn=!0;var N=U.off;if(H.chr=="s"){var w=FromPDF.getIndirect(H.off,H.gen,U,j),X={buff:FromPS.GS(w),off:0},e=0,v=0;
while(e!=o){e=FromPS.getFToken(X).val;v=FromPS.getFToken(X).val}X.off=v+w["/First"];m=FromPDF.readObject(X,U,j)}else{U.off=H.off;
var D=FromPS.getFToken(U);if(D.val!="<<"){var M=FromPS.getFToken(U),C=FromPS.getFToken(U)}else U.off-=2;
m=FromPDF.readObject(U,U,j)}H.val=m;U.off=N;H.opn=!1;return m};FromPDF.readObject=function(o,s,U){var j=FromPS.getFToken(o);
if(j.typ=="integer"){var H=o.off,N=FromPS.getFToken(o);if(N&&N.typ=="integer"){FromPS.skipWhite(o);if(o.buff[o.off]==82){o.off++;
if(U&&U[j.val])return FromPDF.getIndirect(j.val,N.val,s,U);else return{typ:"ref",ind:j.val,gen:N.val}}}o.off=H}if(j.val=="<<")return FromPDF.readDict(o,s,U);
if(j.val=="[")return FromPDF.readArra(o,s,U);if(j.typ=="string"){var V="";for(var m=0;m<j.val.length;
m++)V+=String.fromCharCode(j.val[m]);return V}if(j.typ=="name"&&j.val==">>")throw"e";return j.val};FromPDF.readDict=function(o,s,U){var j={};
while(!0){var H=o.off,N=FromPS.getFToken(o);if(N.typ=="name"&&N.val==">>")break;o.off=H;var V=FromPDF.readObject(o,s,U),m=FromPDF.readObject(o,s,U);
j[V]=m}if(j["/Length"]!=null&&j["/CFM"]==null){var R=j["/Length"];if(R.typ&&R.typ=="ref")throw"e";var w=FromPS.getFToken(o);
if(o.buff[o.off]==32)o.off++;if(o.buff[o.off]==13)o.off++;if(o.buff[o.off]==10)o.off++;if(o.off+R>o.buff.length){console.log("too big /Length of a stream",R,o.buff.length-o.off,o.off);
R=o.buff.length-o.off}j.buff=new Uint8Array(o.buff.buffer,o.buff.byteOffset+o.off,R);o.off+=R;FromPS.getFToken(o)}return j};
FromPDF.readArra=function(o,s,U){var j=[];while(!0){var H=o.off,N=FromPS.getFToken(o);if(N.typ=="name"&&N.val=="]")return j;
o.off=H;var V=FromPDF.readObject(o,s,U);j.push(V)}};var FromWMF=function(){var o=0,s=53,U=55,j=258,H=259,N=260,V=261,m=262,R=263,w=264,X=295,e=313,v=322,D=329,M=513,C=521,P=529,x=531,r=532,O=544,i=552,n=561,Q=564,d=804,B=805,t=522,c=523,p=524,h=525,g=526,aq=527,aQ=1040,I=1042,A=1045,bq=1046,K=1048,aX=1049,bu=1065,cw=1078,cn=1313,F=1336,c3=1352,a5=1051,bp=1055,aw=1564,aC=1565,aH=30,cz=2074,a4=2851,Z=1574,bo=298,b_=299,cq=300,ag=301,aS=302,aZ=2071,al=2096,c4=2338,b3=2610,bi=3379,bv=2368,bQ=2881,b9=3907,b0=496,c2=247,ak=505,_=762,cs=763,b=764,cu=1791,bk=1,a3=2,bR=3,cA=4,ar=5,cc=6,ce=7,af=8,bg=9,bn=10,cm=11,bC=12,k=13,aR=14,aA=15,bF=16,c1=17,c9=18,bt=19,cj=20,be=21,aM=22,a2=23,bP=24,ae=25,bW=26,cb=27,bx=28,a_=29,bd=30,a0=31,cC=32,aD=33,bD=34,bN=35,av=37,ao=38,bA=42,aW=256,as=258,bU=512,ci=513,c7=514,ck=2049,aN=3073,br=4096,bK=4097,cx=4098,aL=4110,aa=4111,by=4112,cf=4115,ab=4116,b5=4117,cg=4118,aK=4119,bj=4120,a1=4121,cl=4122,f=4568,T=UDOC.B;
function u(S,G){S=new Uint8Array(S);var $=0,J={fill:!1,strk:!1,bb:[0,0,600,600],lbb:[0,0,600,600],scl:1,fnt:{nam:"Arial",hgh:25,und:!1,orn:0,chrst:0},tclr:[0,0,0],talg:0},Y=T.readShort,ca=T.readUshort,ay=T.readUint,E=ay(S,0),ap=0;
if(E==2596720087){$=6;var bh=Y(S,$+8);J.scl=120/bh;for(var y=0;y<4;y++){J.bb[y]=Math.round(Y(S,$)*J.scl);
$+=2}$+=2;$+=6}G.StartPage(J.bb[0],J.bb[1],J.bb[2],J.bb[3]);var q=UDOC.getState(J.bb),bY=ca(S,$);$+=2;
var aY=ca(S,$);$+=2;var c6=ca(S,$);$+=2;var aT=ay(S,$);$+=4;var ch=ca(S,$);$+=2;var b6=ay(S,$);$+=4;
var ch=ca(S,$);$+=2;var l=[];while(!0){var cB=ay(S,$)<<1,c5=null;$+=4;var ax=ca(S,$);$+=2;var L=ax,W=$;
if(!1){}else if(L==o)break;else if(L==Z){var ad=ca(S,$);W+=2;var an=ad;console.log(L,an)}else if(L==H||L==m||L==j){}else if(L==ag){var au=ca(S,W);
W+=2;var cr=l[au];if(cr.t=="br"){J.fill=cr.stl!=1;if(cr.stl==0){}else if(cr.stl==1){}else throw cr.stl+" e";
q.colr=cr.clr}else if(cr.t=="pn"){var bc=cr.stl&7;J.strk=bc!=5;if(bc==0||bc==6)q.lwidth=cr.px;else if(bc==5){}else throw bc+" e";
if((cr.stl&4096)!=0)q.ljoin=2;else if((cr.stl&8192)!=0)q.ljoin=0;else q.ljoin=1;q.COLR=cr.clr}else if(cr.t=="fn"){J.fnt=cr;
q.font.Tf=cr.nam;q.font.Tfs=Math.abs(cr.hgh);q.font.Tun=cr.und}else throw"e"}else if(L==b0){var au=ca(S,W);
W+=2;l[au]=null}else if(L==c||L==p){var bV=L==c?0:2;J.lbb[bV+1]=Y(S,W);W+=2;J.lbb[bV]=Y(S,W);W+=2;z(J,q)}else if(L==b){c5={t:"br"};
c5.stl=ca(S,W);W+=2;c5.clr=[S[W]/255,S[W+1]/255,S[W+2]/255];W+=4;c5.htc=ca(S,W);W+=2}else if(L==_){c5={t:"pn"};
c5.stl=ca(S,W);W+=2;c5.px=Y(S,W);W+=2;c5.py=Y(S,W);W+=2;c5.clr=[S[W]/255,S[W+1]/255,S[W+2]/255];W+=4}else if(L==cs){c5={t:"fn",nam:""};
c5.hgh=Y(S,W);W+=2;W+=2*2;c5.orn=Y(S,W)/10;W+=2;var bM=Y(S,W);W+=2;c5.und=S[W+1];W+=2;c5.stk=S[W];c5.chrst=S[$+1];
W+=2;W+=4;while(S[W]!=0){c5.nam+=String.fromCharCode(S[W]);W++}if(bM>500)c5.nam+="-Bold"}else if(L==c2){c5={t:"pl"}}else if(L==C)J.tclr=[S[W]/255,S[W+1]/255,S[W+2]/255];
else if(L==aS)J.talg=ca(S,W);else if(L==r){UDOC.G.moveTo(q,Y(S,W+2),Y(S,W))}else if(L==x){if(q.pth.cmds.length==0){var b8=q.ctm.slice(0);
UDOC.M.invert(b8);var cp=UDOC.M.multPoint(b8,q.cpos);UDOC.G.moveTo(q,cp[0],cp[1])}UDOC.G.lineTo(q,Y(S,W+2),Y(S,W));
var bS=J.fill;J.fill=!1;bl(G,q,J);J.fill=bS}else if(L==F){var aE=ca(S,W);W+=2;var aU=W;W+=aE*2;for(var y=0;
y<aE;y++){var bO=ca(S,aU+y*2);W=bJ(S,W,bO,q,!0)}bl(G,q,J)}else if(L==d||L==B){var bO=ca(S,W);W+=2;W=bJ(S,W,bO,q,L==d);
var bS=J.fill;J.fill=bS&&L==d;bl(G,q,J);J.fill=bS}else if(L==a5||L==K){var az=Y(S,W);W+=2;var bZ=Y(S,W);
W+=2;var a8=Y(S,W);W+=2;var ba=Y(S,W);W+=2;if(L==a5){UDOC.G.moveTo(q,ba,a8);UDOC.G.lineTo(q,bZ,a8);UDOC.G.lineTo(q,bZ,az);
UDOC.G.lineTo(q,ba,az)}else{var bE=(ba+bZ)/2,ah=(a8+az)/2;UDOC.G.arc(q,bE,ah,(az-a8)/2,0,2*Math.PI,!1)}UDOC.G.closePath(q);
var bS=J.fill;J.fill=!0;bl(G,q,J);J.fill=bS}else if(L==b9||L==bQ||L==bv){var cy=ay(S,W),b1,a6;W+=4;if(L==b9){var bH=ca(S,W);
W+=2}if(L!=bv){a6=Y(S,W);W+=2;b1=Y(S,W);W+=2}var c0=Y(S,W);W+=2;var bw=Y(S,W);W+=2;var bB=Y(S,W);W+=2;
var at=Y(S,W);W+=2;var c8=Y(S,W);W+=2;var a7=Y(S,W);W+=2;if(L==bv){b1=at;a6=bB}var aP=a(S,W);if(aP.length>b1*a6*4)aP=aP.slice(0,b1*a6*4);
var bT=q.ctm.slice(0);q.ctm=[1,0,0,1,0,0];UDOC.M.scale(q.ctm,at,-bB);UDOC.M.translate(q.ctm,a7,c8+bB);
UDOC.M.concat(q.ctm,bT);G.PutImage(q,aP,b1,a6);q.ctm=bT}else if(L==b3){var b2=Y(S,W),bf="";W+=2;var ac=Y(S,W);
W+=2;q.font.Tm=[1,0,0,-1,0,0];UDOC.M.rotate(q.font.Tm,J.fnt.orn*Math.PI/180);UDOC.M.translate(q.font.Tm,ac,b2);
var ct=J.talg;if((ct&6)==6)q.font.Tal=2;else if((ct&7)==0)q.font.Tal=0;else throw ct+" e";if((ct&24)==24){}else if((ct&24)==0)UDOC.M.translate(q.font.Tm,0,q.font.Tfs);
else throw"e";var a9=ca(S,W);W+=2;var b$=ca(S,W);W+=2;if(b$&4)W+=8;for(var y=0;y<a9;y++){var aF=S[W+y];
if(aF>127){y++;aF=aF<<8|S[W+y]}bf+=String.fromCharCode(aF)}var bm=q.colr;q.colr=J.tclr;G.PutText(q,bf,bf.length*q.font.Tfs*.5);
q.colr=bm}else if(L==ci){}else{console.log(L.toString(16),cB)}if(c5!=null){var a$=0;while(l[a$]!=null)a$++;
l[a$]=c5}$+=cB-6}G.ShowPage();G.Done()}function a(S,G){var $=T.readShort,J=T.readUshort,Y=T.readUint,ca=Y(S,G),ay,E,bh;
G+=4;if(ca==12)throw"e";else{ay=Y(S,G);G+=4;E=Y(S,G);G+=4;var y=J(S,G);G+=2;if(y!=1)throw"e";var q=J(S,G);
G+=2;if(q!=1&&q!=24&&q!=32)throw q+" e";var bY=Y(S,G);G+=4;if(bY!=0)throw"e";var aY=Y(S,G);G+=4;var c6=Y(S,G);
G+=4;var aT=Y(S,G);G+=4;bh=Y(S,G);G+=4;var ch=Y(S,G);G+=4}var b6=ay*E,l=new Uint8Array(b6*4),ap=Math.floor((ay*y*q+31&~31)/8);
if(q==1)for(var cB=0;cB<E;cB++){var ax=G+bh*4+(E-1-cB)*ap;for(var L=0;L<ay;L++){var W=cB*ay+L<<2,c5=S[ax+(L>>>3)]>>>7-(L&7)&1;
l[W]=S[G+c5*4+2];l[W+1]=S[G+c5*4+1];l[W+2]=S[G+c5*4+0];l[W+3]=255}}if(q==24){for(var cB=0;cB<E;cB++)for(var L=0;
L<ay;L++){var W=cB*ay+L<<2,ad=G+(E-1-cB)*ap+L*3;l[W]=S[ad+2];l[W+1]=S[ad+1];l[W+2]=S[ad+0];l[W+3]=255}}if(q==32){for(var cB=0;
cB<E;cB++)for(var L=0;L<ay;L++){var W=cB*ay+L<<2,ad=G+(E-1-cB)*ap+L*4;l[W]=S[ad+2];l[W+1]=S[ad+1];l[W+2]=S[ad+0];
l[W+3]=S[ad+3]}}return l}function z(S,G){var $=[1,0,0,1,0,0],J=S.lbb,Y=S.bb;UDOC.M.translate($,-J[0],-J[1]);
UDOC.M.scale($,1/J[2],1/J[3]);UDOC.M.scale($,Y[2]-Y[0],Y[3]-Y[1]);UDOC.M.translate($,Y[0],Y[1]);G.ctm=$}function bl(S,G,$){if($.fill)S.Fill(G,!1);
if($.strk&&G.lwidth!=0)S.Stroke(G,!1);UDOC.G.newPath(G)}function bJ(S,G,$,J,Y){var ca=T.readShort;for(var ay=0;
ay<$;ay++){var E=ca(S,G);G+=2;var bh=ca(S,G);G+=2;if(ay==0)UDOC.G.moveTo(J,E,bh);else UDOC.G.lineTo(J,E,bh)}if(Y)UDOC.G.closePath(J);
return G}return{Parse:u}}(),FromEMF=function(){var o=1,s=2,U=3,j=4,H=5,N=6,V=7,m=8,R=9,w=10,X=11,e=12,v=13,D=14,M=15,C=16,P=17,x=18,r=19,O=20,i=21,n=22,Q=23,d=24,B=25,t=26,c=27,p=28,h=29,g=30,aq=31,aQ=32,I=33,A=34,bq=35,K=36,aX=37,bu=38,cw=39,cn=40,F=41,c3=42,a5=43,bp=44,aw=45,aC=46,aH=47,cz=48,a4=49,Z=50,bo=51,b_=52,cq=53,ag=54,aS=55,aZ=56,al=57,c4=58,b3=59,bi=60,bv=61,bQ=62,b9=63,b0=64,c2=65,ak=66,_=67,cs=68,b=70,cu=71,bk=72,a3=73,bR=74,cA=75,ar=76,cc=77,ce=78,af=79,bg=80,bn=81,cm=82,bC=83,k=84,aR=85,aA=86,bF=87,c1=88,c9=89,bt=90,cj=91,be=92,aM=93,a2=94,bP=95,ae=96,bW=97,cb=98,bx=99,a_=100,bd=101,a0=102,cC=103,aD=104,bD=105,bN=106,av=108,ao=109,bA=110,aW=111,as=112,bU=113,ci=114,c7=115,ck=116,aN=118,br=119,bK=120,cx=121,aL=122,aa=UDOC.B,by=null,cf=13369376,ab=15597702,b5=8913094;
function cg(f,T){f=new Uint8Array(f);var u=0,a={fill:!1,strk:!1,bb:[0,0,1,1],wbb:[0,0,1,1],fnt:{nam:"Arial",hgh:25,und:!1,orn:0},tclr:[0,0,0],talg:0},z,bl=[],bJ=[],S=aa.readShort,G=aa.readUshort,$=aa.readInt,J=aa.readUint,Y=aa.readFloat,ca=0;
while(!0){var ay=J(f,u),q=null,bY=0;u+=4;var E=ay,bh=J(f,u);u+=4;var y=u;if(!1){}else if(E==D){break}else if(E==o){a.bb=aK(f,y);
y+=16;T.StartPage(a.bb[0],a.bb[1],a.bb[2],a.bb[3]);z=UDOC.getState(a.bb)}else if(E==I)bJ.push(JSON.stringify(z),JSON.stringify(a));
else if(E==A){var aY=$(f,y);y+=4;while(aY<-1){bJ.pop();bJ.pop();aY++}a=JSON.parse(bJ.pop());z=JSON.parse(bJ.pop())}else if(E==_){z.cpth=JSON.parse(JSON.stringify(z.pth))}else if(E==g){var c6=aK(f,y);
y+=16;var aT=z.pth;z.pth={cmds:[],crds:[]};UDOC.G.drawRect(z,c6[0],c6[1],c6[2]-c6[0],c6[3]-c6[1]);z.cpth=z.pth;
z.pth=aT}else if([P,r,x,cb,O,cA].indexOf(E)!=-1){}else if(E==c4)z.mlimit=J(f,y);else if(E==d)a.tclr=[f[y]/255,f[y+1]/255,f[y+2]/255];
else if(E==n)a.talg=J(f,y);else if(E==X||E==e){if(a.vbb==null)a.vbb=[];var b6=E==e?0:2;a.vbb[b6]=$(f,y);
y+=4;a.vbb[b6+1]=$(f,y);y+=4;if(E==X)bj(a,z)}else if(E==R||E==w){var b6=E==w?0:2;a.wbb[b6]=$(f,y);y+=4;
a.wbb[b6+1]=$(f,y);y+=4;if(E==R)bj(a,z)}else if(E==b){var l=J(f,y);y+=4}else if(E==aX){var ap=J(f,y);
y+=4;if(ap==2147483648){a.fill=!0;z.colr=[1,1,1]}else if(ap==2147483653){a.fill=!1}else if(ap==2147483655){a.strk=!0;
a.lwidth=1;z.COLR=[0,0,0]}else if(ap==2147483656){a.strk=!1}else if(ap==2147483661){}else if(ap==2147483662){}else{var cB=bl[ap];
if(cB.t=="b"){a.fill=cB.stl!=1;if(cB.stl==0){}else if(cB.stl==1){}else throw cB.stl+" e";z.colr=cB.clr}else if(cB.t=="p"){a.strk=cB.stl!=5;
z.lwidth=cB.wid;z.COLR=cB.clr}else if(cB.t=="f"){a.fnt=cB;z.font.Tf=cB.nam;z.font.Tfs=Math.abs(cB.hgh);
z.font.Tun=cB.und}else throw"e"}}else if(E==cn){var ap=J(f,y);y+=4;if(bl[ap]!=null)bl[ap]=null;else throw"e"}else if(E==cw){bY=J(f,y);
y+=4;q={t:"b"};q.stl=J(f,y);y+=4;q.clr=[f[y]/255,f[y+1]/255,f[y+2]/255];y+=4;q.htc=J(f,y);y+=4}else if(E==a2){bY=J(f,y);
y+=4;console.log("unsupported pattern brush");q={t:"b"};q.stl=0}else if(E==bu||E==bP){bY=J(f,y);y+=4;
q={t:"p"};if(E==bP){y+=16;q.stl=J(f,y);y+=4;q.wid=J(f,y);y+=4;y+=4}else{q.stl=J(f,y);y+=4;q.wid=J(f,y);
y+=4;y+=4}q.clr=[f[y]/255,f[y+1]/255,f[y+2]/255];y+=4}else if(E==cm){bY=J(f,y);y+=4;q={t:"f",nam:""};
q.hgh=$(f,y);y+=4;y+=4*2;q.orn=$(f,y)/10;y+=4;var ax=J(f,y);y+=4;q.und=f[y+1];q.stk=f[y+2];y+=4*2;while(G(f,y)!=0){q.nam+=String.fromCharCode(G(f,y));
y+=2}if(ax>500)q.nam+="-Bold"}else if(E==k){y+=16;var L=J(f,y),cp="";y+=4;var W=Y(f,y);y+=4;var c5=Y(f,y);
y+=4;var ad=$(f,y);y+=4;var an=$(f,y);y+=4;var au=z.ctm.slice(0);if(L==1)z.ctm=[1,0,0,1,0,0];z.font.Tm=[1,0,0,-1,0,0];
UDOC.M.rotate(z.font.Tm,a.fnt.orn*Math.PI/180);UDOC.M.translate(z.font.Tm,ad,an);var cr=a.talg;if((cr&6)==6)z.font.Tal=2;
else if((cr&7)==0)z.font.Tal=0;else throw cr+" e";if((cr&24)==24){}else if((cr&24)==0)UDOC.M.translate(z.font.Tm,0,z.font.Tfs);
else console.log("unknown alignment",cr);var bc=J(f,y);y+=4;var bV=J(f,y);y+=4;var bM=J(f,y);y+=4;y+=16;
var b8=J(f,y);y+=4;bV+=u-8;for(var bS=0;bS<bc;bS++){var aE=G(f,bV+bS*2);cp+=String.fromCharCode(aE)}var aU=z.colr;
z.colr=a.tclr;T.PutText(z,cp,cp.length*z.font.Tfs*.5);z.colr=aU;z.ctm=au}else if(E==b3){UDOC.G.newPath(z)}else if(E==bi){}else if(E==bv)UDOC.G.closePath(z);
else if(E==c){UDOC.G.moveTo(z,$(f,y),$(f,y+4))}else if(E==ag){if(z.pth.cmds.length==0){var bO=z.ctm.slice(0);
UDOC.M.invert(bO);var az=UDOC.M.multPoint(bO,z.cpos);UDOC.G.moveTo(z,az[0],az[1])}UDOC.G.lineTo(z,$(f,y),$(f,y+4))}else if(E==U||E==aA||E==j||E==bF||E==N||E==c9){y+=16;
var bZ=E==U||E==aA,a8=E==N||E==c9,ba=J(f,y);y+=4;if(!a8)UDOC.G.newPath(z);y=cl(f,y,ba,z,E==aA||E==bF||E==c9?2:4,bZ,a8);
if(!a8)a1(T,z,a,bZ)}else if(E==cj){y+=16;var bZ=!0,a8=!1,bE=J(f,y);y+=4;y+=4;var ah=y;y+=bE*4;if(!a8)UDOC.G.newPath(z);
for(var bS=0;bS<bE;bS++){var cy=G(f,ah+bS*4);y=cl(f,y,cy,z,2,bZ,a8)}if(!a8)a1(T,z,a,bZ)}else if(E==s||E==aR||E==H||E==c1){y+=16;
var bH=E==aR||E==c1,b1=bH?S:$,a6=bH?2:4,ba=J(f,y);y+=4;if(!(E==H||E==c1)){UDOC.G.moveTo(z,b1(f,y),b1(f,y+a6));
y+=2*a6;ba--}while(ba>0){UDOC.G.curveTo(z,b1(f,y),b1(f,y+a6),b1(f,y+2*a6),b1(f,y+3*a6),b1(f,y+4*a6),b1(f,y+5*a6));
y+=6*a6;ba-=3}}else if(E==a5||E==c3){UDOC.G.newPath(z);var c6=aK(f,y);if(E==a5){UDOC.G.drawRect(z,c6[0],c6[1],c6[2]-c6[0],c6[3]-c6[1])}else{var c0=(c6[0]+c6[2])/2,bw=(c6[1]+c6[3])/2;
UDOC.G.arc(z,c0,bw,(c6[2]-c6[0])/2,0,2*Math.PI,!1)}UDOC.G.closePath(z);a1(T,z,a,!0)}else if(E==bQ)T.Fill(z,!1);
else if(E==b0)T.Stroke(z);else if(E==b9){T.Fill(z,!1);T.Stroke(z)}else if(E==bq||E==K){var bB=[];for(var bS=0;
bS<6;bS++)bB.push(Y(f,y+bS*4));y+=24;if(E==bq)z.ctm=bB;else{var L=J(f,y);y+=4;if(L==2){var at=z.ctm;
z.ctm=bB;UDOC.M.concat(z.ctm,at)}else if(L==4)z.ctm=bB;else throw L}}else if(E==i){var c8=J(f,y);y+=4}else if(E==bn){var c6=aK(f,y);
y+=16;var a7=$(f,y);y+=4;var aP=$(f,y);y+=4;var bT=$(f,y);y+=4;var b2=$(f,y);y+=4;var ac=$(f,y);y+=4;
var ct=$(f,y);y+=4;var b$=J(f,y)+u-8;y+=4;var bf=J(f,y);y+=4;var aF=J(f,y)+u-8;y+=4;var bm=J(f,y);y+=4;
var a$=J(f,y);y+=4;if(a$!=0)throw"e";var aV=J(f,y);y+=4;if(aV!=cf&&aV!=ab&&aV!=b5)throw aV.toString(16);
var aG=$(f,y);y+=4;var bb=$(f,y);y+=4;var bG=J(f,b$);b$+=4;if(bG!=40)throw bG;var b4=J(f,b$);b$+=4;var aJ=J(f,b$);
b$+=4;if(b4!=ac||aJ!=ct)throw"e";var cv=G(f,b$);b$+=2;if(cv!=1)throw"e";var bX=G(f,b$);b$+=2;if(bX!=1&&bX!=4&&bX!=8&&bX!=16&&bX!=24&&bX!=32)throw bX+" e";
var cd=J(f,b$);b$+=4;if(cd!=0)throw cd+" e";var bz=J(f,b$);b$+=4;var bL=J(f,b$);b$+=4;var bs=J(f,b$);
b$+=4;var ai=J(f,b$);b$+=4;var aj=J(f,b$);b$+=4;if(aj!=0)throw aj;var aB=Math.floor((b4*cv*bX+31&~31)/8),aO=new Uint8Array(b4*aJ*4);
if(bX==1){for(var bw=0;bw<aJ;bw++)for(var c0=0;c0<b4;c0++){var am=bw*b4+c0<<2,ap=(f[aF+(aJ-1-bw)*aB+(c0>>>3)]>>>7-(c0&7)&1)<<2;
aO[am]=f[b$+ap+2];aO[am+1]=f[b$+ap+1];aO[am+2]=f[b$+ap+0];aO[am+3]=255}}else if(bX==8){for(var bw=0;
bw<aJ;bw++)for(var c0=0;c0<b4;c0++){var am=bw*b4+c0<<2,ap=f[aF+(aJ-1-bw)*aB+c0]<<2;aO[am]=f[b$+ap+2];
aO[am+1]=f[b$+ap+1];aO[am+2]=f[b$+ap+0];aO[am+3]=255}}else if(bX==16){for(var bw=0;bw<aJ;bw++)for(var c0=0;
c0<b4;c0++){var am=bw*b4+c0<<2,aI=aF+(aJ-1-bw)*aB+c0*2,b7=f[aI+1]<<8|f[aI];aO[am]=(b7>>>10&31)*(255/31);
aO[am+1]=(b7>>>5&31)*(255/31);aO[am+2]=(b7>>>0&31)*(255/31);aO[am+3]=255}}else if(bX==24){for(var bw=0;
bw<aJ;bw++)for(var c0=0;c0<b4;c0++){var am=bw*b4+c0<<2,aI=aF+(aJ-1-bw)*aB+c0*3;aO[am]=f[aI+2];aO[am+1]=f[aI+1];
aO[am+2]=f[aI+0];aO[am+3]=255}}else if(bX==32){for(var bw=0;bw<aJ;bw++)for(var c0=0;c0<b4;c0++){var am=bw*b4+c0<<2,aI=aF+(aJ-1-bw)*aB+c0*4;
aO[am]=f[aI+2];aO[am+1]=f[aI+1];aO[am+2]=f[aI+0];aO[am+3]=f[aI+3]}}else console.log("unsupported bit depth",bX,b4,aJ);
var bI=z.ctm.slice(0);z.ctm=[1,0,0,1,0,0];UDOC.M.scale(z.ctm,aG,-bb);UDOC.M.translate(z.ctm,a7,aP+bb);
UDOC.M.concat(z.ctm,bI);if(aV==ab)by=aO;else if(aV==b5)T.PutImage(z,aO,b4,aJ,by);else T.PutImage(z,aO,b4,aJ);
z.ctm=bI}else{console.log("unknown command",E,bh)}if(q!=null)bl[bY]=q;u+=bh-8}T.ShowPage();T.Done()}function aK(f,T){var u=[];
for(var a=0;a<4;a++)u[a]=aa.readInt(f,T+a*4);return u}function bj(f,T){var u=[1,0,0,1,0,0],a=f.wbb,z=f.bb,bl=f.vbb&&f.vbb.length==4?f.vbb:f.bb;
UDOC.M.translate(u,-a[0],-a[1]);UDOC.M.scale(u,1/a[2],1/a[3]);UDOC.M.scale(u,bl[2],bl[3]);T.ctm=u}function a1(f,T,u,a){if(u.fill&&a)f.Fill(T,!1);
if(u.strk&&T.lwidth!=0)f.Stroke(T)}function cl(f,T,u,a,z,bl,bJ){var S=z==2?aa.readShort:aa.readInt;for(var G=0;
G<u;G++){var $=S(f,T);T+=z;var J=S(f,T);T+=z;if(G==0&&!bJ)UDOC.G.moveTo(a,$,J);else UDOC.G.lineTo(a,$,J)}if(bl)UDOC.G.closePath(a);
return T}return{Parse:cg}}(),FromDXF=function(){var o=function(){this.bb=[1e9,1e9,-1e9,-1e9]};o.prototype={StartPage:function(){},PutText:function(){},PutImage:function(){},Stroke:function(m){this.checkPath(m.pth.crds)},Fill:function(m){this.checkPath(m.pth.crds)},PutText:function(m,R,w,X){var e=[0,0,w*m.font.Tfs,0,0,-m.font.Tfs,0,m.font.Tfs];
if(X){e[2]=X[0];e[5]=-X[1]}UDOC.M.multArray(m.ctm,e);UDOC.M.multArray(m.font.Tm,e);this.checkPath(e)},checkPath:function(m){var R=this.bb;
for(var w=0;w<m.length;w+=2){var X=m[w],e=m[w+1];R[0]=Math.min(R[0],X);R[1]=Math.min(R[1],e);R[2]=Math.max(R[2],X);
R[3]=Math.max(R[3],e)}},ShowPage:function(){},Done:function(){}};function s(m,R){m=new Uint8Array(m);
var w=0,X=new TextDecoder().decode(m),e=X.split("\n"),C=2e3,P=100;for(var v=0;v<e.length;v++)e[v]=e[v].trim();
while(e[e.length-1]=="")e.pop();var D=new o;U(e,D);var M=D.bb,x=(C-P*2)/(M[2]-M[0]),r=Math.round((M[3]-M[1])*x+P*2),O=[0,0,C,r],i=UDOC.getState(O);
i.lwidth=1/x;i.ctm=[x,0,0,-x,P-M[0]*x,-P+M[1]*x+r];U(e,R,i,O)}function U(m,R,w,X){if(w==null){X=[0,0,1e3,1e3];
w=UDOC.getState(X)}R.StartPage(X[0],X[1],X[2],X[3]);var e={tabs:{LTYPE:{}},blocks:{}};H(m,R,w,e,0,m.length);
R.ShowPage();R.Done()}function j(m,R){if(m.startsWith("%%u")){m=m.slice(3);R.font.Tun=1}m=m.split("\\P").join("\n");
m=m.split("%%d").join("'");m=m.split("{").join("");m=m.split("}").join("");while(!0){var w=m.indexOf("\\U+");
if(w==-1)break;m=m.slice(0,w)+String.fromCharCode(parseInt(m.slice(w+3,w+7),16))+m.slice(w+7)}while(!0){var w=m.indexOf("\\"),X=m.indexOf(";");
if(w==-1||X==-1)break;var e=m.slice(w+1,X);if(e.startsWith("pi"))e=" ".repeat(.5*parseFloat(e.slice(2)));
else e="";m=m.slice(0,w)+e+m.slice(X+1)}return m}function H(m,R,w,X,e,v,D){var M,C,P;while(e<v){var x=parseInt(m[e++]),r=m[e++],O=[10,11,12,13,14,20,21,22,23,24,30,31,32,33,34,40,41,42,43,44,45,46,47,48,49,50,51,52,53,62,70,71,72,73,74,90,370].indexOf(x)!=-1,i=M=="LWPOLYLINE"&&(x==10||x==20||x==30)||M=="LTYPE"&&x==49||M=="SPLINE"&&(x==10||x==20||x==30||x==40)||M=="OLE2FRAME"&&x==310;
if(O)r=parseFloat(r);if(x==999){}else if(r=="SECTION")D=-1;else if(r=="ENDSEC"){}else if(D==-1)D=r;else if(r=="EOF"){}else if(D=="HEADER"){}else if(D=="CLASSES"){}else if(D=="TABLES"||D=="BLOCKS"){if(x==0){M=r;
C={};continue}if(i){if(C[x]==null)C[x]=[];C[x].push(r)}else{C[x]=r}if(m[e]!="0")continue;if(M=="LTYPE"){if(X.tabs[M][C[2]]!=null)throw"e";
X.tabs[M][C[2]]=C}else if(M=="BLOCK"){P=X.blocks[C[2]]=[e]}else if(M=="ENDBLK"){P[1]=e-2;P=null}}else if(D=="ENTITIES"){if(x==0){M=r;
C={}}else{if(i){if(C[x]==null)C[x]=[];C[x].push(r)}else{C[x]=r}}if(m[e]!="0")continue;if(P==null){w.colr=[0,0,0];
w.ca=1;w.COLR=[0,0,0];w.dash=[];if(C[62]!=null&&C[62]!=256){var n={c0:[0,0,0],c1:[1,0,0],c2:[1,1,0],c4:[0,1,1],c5:[0,0,1],c7:[0,0,0],c8:[0,0,0],c242:[.64,0,.16],c250:[0,0,0]}["c"+C[62]];
if(n)w.COLR=n;else{w.COLR=[0,1,0];console.log(M+" "+C[62])}}if(C[6]!=null){var Q=X.tabs.LTYPE[C[6]];
if(Q[49]!=null){var d=Q[49].slice(0);for(var B=0;B<d.length;B++)d[B]=Math.abs(d[B])*(C[48]?C[48]:1);
w.dash=d}}if(C[8]=="H")w.dash=[.1,.02];UDOC.G.newPath(w)}var t=-1/3.17;if(M=="LINE"){var c=(C[30]?C[30]:0)*t,p=(C[31]?C[31]:0)*t;
UDOC.G.moveTo(w,C[10]+c,C[20]-c);UDOC.G.lineTo(w,C[11]+p,C[21]-p);R.Stroke(w,!1)}else if(M=="POLYLINE"){P=[C,[]]}else if(M=="VERTEX"){P[1].push(C)}else if(M=="SEQEND"){if(P==null)continue;
var h=P[0],g=P[1],aq=g.length,aQ=h[70]==1?aq+1:aq;UDOC.G.moveTo(w,g[0][10],g[0][20]);for(var B=1;B<aQ;
B++){var I=g[B%aq][10],A=g[B%aq][20],bq=g[B-1][42];if(bq==null)bq=0;if(bq==0)UDOC.G.lineTo(w,I,A);else{var K=g[B-1],aX=K[10],bu=K[20],cw=I-aX,F=A-bu,c3=-bq*Math.PI/2,a5=.42,bp=Math.sin(c3),aw=Math.cos(c3),aC=aw*cw-bp*F,aH=bp*cw+aw*F,cz=aw*cw+bp*F,a4=-bp*cw+aw*F;
UDOC.G.curveTo(w,aX+a5*aC,bu+a5*aH,I-a5*cz,A-a5*a4,I,A)}}R.Stroke(w,!1);P=null}else if(M=="OLE2FRAME"){var Z=57,bo=295,b_=C[310].join(""),cq=bo*Z,ag=new Uint8Array(b_.length>>>1);
for(var B=0;B<ag.length;B++)ag[B]=parseInt(b_.slice(B*2,B*2+2),16);var aS=new Float64Array(ag.slice(2,2+12*8).buffer),aZ=new Uint8Array(cq*4);
new Uint32Array(aZ.buffer).fill(4281563135);var al=w.ctm,c4=[1,0,0,1,0,0],b3=C[11]-C[10],bi=C[21]-C[20];
UDOC.M.scale(c4,b3,bi);UDOC.M.translate(c4,C[10],C[20]);UDOC.M.concat(c4,w.ctm);w.ctm=c4;R.PutImage(w,aZ,bo,Z);
w.ctm=al}else if(M=="INSERT"){var bv=X.blocks[C[2]],bQ=w.ctm.slice(0),c4=[1,0,0,1,0,0];if(C[50]!=null)UDOC.M.rotate(c4,C[50]*Math.PI/180);
if(C[41]!=null)UDOC.M.scale(c4,C[41],C[42]);UDOC.M.translate(c4,C[10],C[20]);UDOC.M.concat(c4,w.ctm);
w.ctm=c4;H(m,R,w,X,bv[0],bv[1],D);w.ctm=bQ}else if(M=="--VIEWPORT"){console.log(C);w.COLR=[1,0,0];UDOC.G.moveTo(w,C[10],C[20]);
UDOC.G.lineTo(w,C[10]+5,C[20]+5);R.Stroke(w,!1)}else if(M=="--DIMENSION"){var b9=C[70]&7;if(b9==0){console.log(C);
w.COLR=[0,.3,.6];var cw=0,F=0;UDOC.G.moveTo(w,C[13]+cw,C[23]+F);UDOC.G.lineTo(w,C[14]+cw,C[24]+F);R.Stroke(w,!1)}}else if(M=="3DFACE"||M=="SOLID"){var c=C[30]*t,p=C[31]*t,b0=C[32]*t,c2=C[33]*t;
UDOC.G.moveTo(w,C[10]+c,C[20]-c);UDOC.G.lineTo(w,C[11]+p,C[21]-p);UDOC.G.lineTo(w,C[12]+b0,C[22]-b0);
UDOC.G.lineTo(w,C[13]+c2,C[23]-c2);UDOC.G.closePath(w);if(M=="3DFACE"){w.colr=[Math.random(),Math.random(),Math.random()];
w.ca=.5}R.Fill(w,!1)}else if(M=="LWPOLYLINE"){for(var B=0;B<C[90];B++){var ak=B==0?UDOC.G.moveTo:UDOC.G.lineTo;
ak(w,C[10][B],C[20][B])}if(C[70]==1)UDOC.G.closePath(w);R.Stroke(w,!1)}else if(M=="CIRCLE"){UDOC.G.arc(w,C[10],C[20],C[40],0,Math.PI*2);
R.Stroke(w,!1)}else if(M=="ELLIPSE"){var _=w.ctm.slice(0),cs=C[10],b=C[20],cw=C[11],F=C[21],cu=Math.sqrt(cw*cw+F*F),c4=[1,0,0,1,0,0];
UDOC.M.scale(c4,1,C[40]);UDOC.M.rotate(c4,-Math.atan2(F,cw));UDOC.M.translate(c4,cs,b);UDOC.M.concat(c4,w.ctm);
w.ctm=c4;UDOC.G.arc(w,0,0,cu,C[41],C[42]);R.Stroke(w,!1);w.ctm=_}else if(M=="ARC"){UDOC.G.arc(w,C[10],C[20],C[40],C[50]*Math.PI/180,C[51]*Math.PI/180);
R.Stroke(w,!1)}else if(M=="SPLINE"){var bk=C[10],a3=C[20],bR=C[40].slice(0),cA=bk.length-1;UDOC.G.moveTo(w,bk[0],a3[0]);
if(C[71]==3&&C[73]==4){UDOC.G.curveTo(w,bk[1],a3[1],bk[2],a3[2],bk[3],a3[3])}else{var ar=-1e6,cc=1e6;
for(var B=0;B<bR.length;B++){var ce=bR[B];if(ce<cc)cc=ce;if(ce>ar)ar=ce}for(var B=0;B<bR.length;B++){bR[B]=(bR[B]-cc)/(ar-cc)}var aq=bk.length*10;
for(var af=1;af<aq;af++){var bg=af/aq,bn=N(bk,a3,C[71],bR,bg);UDOC.G.lineTo(w,bn[0],bn[1])}UDOC.G.lineTo(w,bk[bk.length-1],a3[a3.length-1])}if(C[70]&1)UDOC.G.closePath(w);
R.Stroke(w,!1)}else if(M=="--ATTDEF"||M=="ATTRIB"||M=="TEXT"||M=="MTEXT"){w.font.Tun=0;w.font.Tal=0;
w.font.Tm=[1,0,0,1,0,0];if(C[50])UDOC.M.rotate(w.font.Tm,-C[50]*Math.PI/180);UDOC.M.translate(w.font.Tm,C[10],C[20]);
w.font.Tfs=C[40];var b_=C[M=="ATTDEF"?3:1],bC=null;b_=j(b_,w);var cm=C[71]==null?0:(C[71]-1)%3;w.font.Tal=[0,2,1][cm];
if(M=="MTEXT"&&C[41]!=null&&C[41]!=0){var k=b_.length*w.font.Tfs/C[41];k=Math.max(k,b_.split("\n").length);
bC=[C[41],k*w.font.Tfs*1.5];if(cm==0){}else if(cm==2){UDOC.M.translate(w.font.Tm,-C[41],0)}else if(cm==1){UDOC.M.translate(w.font.Tm,-C[41]/2,0)}else console.log("unknown align",C)}else if(M=="MTEXT"&&C[71]!=null){if(C[71]<=3)UDOC.M.translate(w.font.Tm,0,-w.font.Tfs*.8);
else if(C[71]<=6)UDOC.M.translate(w.font.Tm,0,-w.font.Tfs*.4)}R.PutText(w,b_,b_.length*.5,bC)}else console.log("unknown command",M)}else if(D=="OBJECTS"){}else if(D=="ACDSDATA"){}else{console.log(D,x,r);
throw D}}}function N(m,R,w,X,e){var v=0,D=0;for(var M=0;M<m.length;M++){var C=V(M,w,X,e);v+=m[M]*C;D+=R[M]*C}return[v,D]}function V(m,w,X,e){var v=new Float64Array(w+1),D,M,P=X.Length-1;
if(m==0&&e==X[0]||m==P-w-1&&e==X[P])return 1;if(e<X[m]||e>=X[m+w+1])return 0;for(var x=0;x<=w;x++){if(e>=X[m+x]&&e<X[m+x+1])v[x]=1;
else v[x]=0}for(var r=1;r<=w;r++){if(v[0]==0)D=0;else D=(e-X[m])*v[0]/(X[m+r]-X[m]);for(var x=0;x<w-r+1;
x++){var O=X[m+x+1],n=X[m+x+r+1];if(v[x+1]==0){v[x]=D;D=0}else{M=v[x+1]/(n-O);v[x]=D+(n-e)*M;D=(e-O)*M}}}return v[0]}return{Parse:s}}(),ToPDF=function(){function o(){this._res={"/Font":{},"/XObject":{},"/ExtGState":{},"/Pattern":{}};
this._xr=[null,{"/Type":"/Catalog","/Pages":{typ:"ref",ind:2}},{"/Type":"/Pages","/Kids":[],"/Count":0},this._res];
this._bnds=[];this._cont="";this._gst=s()}function s(){return{colr:"[0,0,0]",COLR:"[0,0,0]",lcap:"0",ljoin:"0",lwidth:"1",mlimit:"10",dash:"[]",doff:"0",bmode:"/Normal",CA:"1",ca:"1"}}o.prototype.StartPage=function(r,O,i,n){this._bnds=[r,O,i,n]};
o.prototype.Stroke=function(r){if(r.CA==0)return;this.setGState(r,!0);this._cont+=" S\n"};o.prototype.Fill=function(r,O){if(r.ca==0)return;
this.setGState(r,!0);this._cont+=" f\n"};function U(r){return""+parseFloat(r.toFixed(2))}function j(r){return""+parseFloat(r.toFixed(3))}function H(r){return Math.sqrt(Math.abs(r[0]*r[3]-r[1]*r[2]))}function N(r){var O=r.map(U).join(" ");
if(O=="1 0 0 1 0 0")return"";return O+" cm "}function V(r,O){if(r.length!=O.length)return!1;for(var i=0;
i<r.length;i++)if(r[i]!=O[i])return!1;return!0}function m(r){var O=[[255,216,255],[0,0,0,12,106,80,32,32],[0,0,0,0,48,0,1,0]],i=["/DCTDecode","/JPXDecode","/JBIG2Decode"];
for(var n=0;n<O.length;n++){var Q=O[n],d=!0;for(var B=0;B<Q.length;B++)d=d&&r[B]==Q[B];if(d)return i[n]}}o.prototype.setGState=function(r,O){var i=this._gst,n={};
for(var Q in r)n[Q]=typeof r[Q]=="string"?r[Q]:JSON.stringify(r[Q]);var d=H(r.ctm),B=r.dash.slice(0);
for(var t=0;t<B.length;t++)B[t]=U(B[t]*d);var c=this._cont;if(i.lcap!=n.lcap)c+=r.lcap+" J ";if(i.ljoin!=n.ljoin)c+=r.ljoin+" j ";
if(i.lwidth!=n.lwidth)c+=U(r.lwidth*d)+" w ";if(i.mlimit!=n.mlimit)c+=U(r.mlimit)+" M ";if(i.dash!=n.dash||i.doff!=n.doff)c+="["+B.join(" ")+"] "+r.doff+" d ";
if(i.COLR!=n.COLR)c+=R(r.COLR,!1,this._res);if(i.colr!=n.colr)c+=R(r.colr,!0,this._res);var p=this._res["/ExtGState"];
if(i.bmode!=n.bmode){var h=n.bmode;if(p[h]==null)p[h]={"/Type":"/ExtGState","/BM":r.bmode};c+=h+" gs "}if(i.CA!=n.CA){var h="/Alpha"+Math.round(255*n.CA);
if(p[h]==null)p[h]={"/Type":"/ExtGState","/CA":r.CA};c+=h+" gs "}if(i.ca!=n.ca){var h="/alpha"+Math.round(255*n.ca);
if(p[h]==null)p[h]={"/Type":"/ExtGState","/ca":r.ca};c+=h+" gs "}if(O)c+=w(r.pth);this._cont=c;this._gst=n};
function R(r,O,i){if(r.length!=null)return r.map(j).join(" ")+" "+(O?"rg":"RG")+" \n";else{var n=i["/Pattern"],Q=r,d="/P"+(D(n)+1),B={"/ShadingType":Q.typ=="lin"?2:3,"/ColorSpace":"/DeviceRGB","/Extend":[!0,!0],"/Function":X(Q.grad),"/Coords":Q.crds};
n[d]={"/Type":"/Pattern","/PatternType":2,"/Matrix":Q.mat,"/Shading":B};return"/Pattern "+(O?"cs "+d+" scn ":"CS "+d+" SCN ")}}function w(r){var O=0,i="",n=U;
for(var Q=0;Q<r.cmds.length;Q++){var d=r.cmds[Q];if(d=="M"){for(var B=0;B<2;B++)i+=n(r.crds[O++])+" ";
i+="m "}else if(d=="L"){for(var B=0;B<2;B++)i+=n(r.crds[O++])+" ";i+="l "}else if(d=="C"){for(var B=0;
B<6;B++)i+=n(r.crds[O++])+" ";i+="c "}else if(d=="Z"){i+="h "}else throw d}return i}function X(r){r=r.slice(0);
if(r[0][0]!=0)r.unshift(JSON.parse(JSON.stringify(r[0])));if(r[r.length-1][0]!=1)r.unshift(JSON.parse(JSON.stringify(r[r.length-1])));
r[0][0]=0;r[r.length-1][0]=1;var O=[],i=[],n=[0,1],Q=e;if(r.length==2)return Q(r[0][1],r[1][1]);i.push(Q(r[0][1],r[1][1]));
for(var d=1;d<r.length-1;d++){O.push(r[d][0]);i.push(Q(r[d][1],r[d+1][1]));n.push(0,1)}return{"/FunctionType":3,"/Encode":n,"/Domain":[0,1],"/Bounds":O,"/Functions":i}}function e(r,O){return{"/FunctionType":2,"/C0":r,"/C1":O,"/Domain":[0,1],"/N":1}}o.prototype.PutText=function(r,O,i,n){this.setGState(r,!1);
var Q=this.addFont(r.font.Tf,n);this._cont+="q ";this._cont+=N(r.ctm);this._cont+=N(r.font.Tm);this._cont+="BT  "+Q+" "+U(r.font.Tfs)+" Tf  0 0 Td  (";
var d=[];if(n==null){var B=[128,8364,130,8218,131,402,132,8222,133,8230,134,8224,135,8225,136,710,137,8240,138,352,139,8249,140,338,142,381,145,8216,146,8217,147,8220,148,8221,149,8226,150,8211,151,8212,152,732,153,8482,154,353,155,8250,156,339,158,382,159,376];
for(var t=0;t<O.length;t++){var c=O.charCodeAt(t);if(c>255){var p=B.indexOf(c);d.push(p==-1?32:B[p-1])}else d.push(c)}}else{for(var t=0;
t<O.length;t++){var c=O.charCodeAt(t);d.push(c&255)}}d=FromPS.makeString(d);for(var t=0;t<d.length;t++)this._cont+=String.fromCharCode(d[t]);
this._cont+=") Tj  ET ";this._cont+=" Q\n"};o.prototype.PutImage=function(r,O,i,n,d){if(O.length==i*n*4&&d==null){var B=i*n,t=new Uint8Array(B),c=255;
for(var p=0;p<B;p++){t[p]=O[(p<<2)+3];c&=O[(p<<2)+3]}if(c!=255)d=t}var h=this.addImage(O,i,n,d);this.setGState(r,!1);
this._cont+="q "+N(r.ctm);this._cont+=h+" Do  Q\n"};o.prototype.ShowPage=function(){C(this._xr,this._cont,this._bnds);
this._cont="";this._gst=s()};o.prototype.Print=function(r){};o.prototype.Done=function(){var r=this._res;
for(var O in r)if(Object.keys(r[O])==0)delete r[O];this.buffer=P(this._xr)};o.prototype.addImage=function(r,O,i,n){var d;
if(n){var B=n;if(n.length==O*i*4){B=new Uint8Array(O*i);for(var t=0;t<B.length;t++)B[t]=n[(t<<2)+1]}d=this.addImage(B,O,i,null)}var c=m(r),p=r;
if(r.length==O*i*4){p=new Uint8Array(O*i*3);for(var t=0;t<r.length;t+=4){var h=3*(t>>2);p[h]=r[t+0];
p[h+1]=r[t+1];p[h+2]=r[t+2]}}var g=this._res["/XObject"];for(var aq in g){var aQ=this._xr[g[aq].ind],I=aQ["/SMask"],A=I!=null?1:0,bq=d!=null?1:0;
if(!V(aQ.stream,p)||A+bq==1)continue;if(A+bq==2&&!V(this._xr[I.ind].stream,B))continue;return aq}var aq="/I"+(D(g)+1);
g[aq]={typ:"ref",ind:this._xr.length};var K={"/Type":"/XObject","/Subtype":"/Image","/BitsPerComponent":8,"/ColorSpace":r.length==O*i||c=="/DCTDecode"&&v(r)&&v(r).comps==1?"/DeviceGray":"/DeviceRGB","/Height":i,"/Width":O,stream:p};
if(c!=null)K["/Filter"]=m(r);if(n){K["/SMask"]={typ:"ref",ind:this._xr.length-1}}this._xr.push(K);return aq};
function v(r){var O=0;while(O<r.length){while(r[O]==255)O++;var i=r[O];O++;if(i==216)continue;if(i==217)break;
if(208<=i&&i<=215)continue;if(i==1)continue;var n=(r[O]<<8|r[O+1])-2;O+=2;if(i==192)return{bpp:r[O],w:r[O+1]<<8|r[O+2],h:r[O+3]<<8|r[O+4],comps:r[O+5]};
O+=n}}function D(r){var O;for(var i in r)O=i;return O==null?0:parseInt(O.slice(2))}function M(r){var O=r.toLowerCase(),i="Helvetica Helvetica-Bold Helvetica-Oblique Helvetica-BoldOblique Times-Roman Times-Bold Times-Italic Times-BoldItalic".split(" "),n=0;
if(O.indexOf("sans")!=-1)n=0;else if(O.indexOf("serif")!=-1)n=4;var Q=O.indexOf("bold")!=-1,d=O.indexOf("italic")!=-1||O.indexOf("oblique")!=-1||O.endsWith("-it");
if(Q&&d)n+=3;else if(d)n+=2;else if(Q)n+=1;return i[n]}o.prototype.addFont=function(r,O){r=M(r);r="/"+r;
var i=this._res["/Font"];for(var n in i)if(i[n]["/BaseFont"]==r)return n;var n="/F"+(D(i)+1),Q={"/Type":"/Font","/Subtype":"/Type1","/BaseFont":r,"/Encoding":"/WinAnsiEncoding"};
if(O!=null){var d="/CIDInit /ProcSet findresource begin \t12 dict begin \tbegincmap \t/CIDSystemInfo \t<<  /Registry (Adobe) \t/Ordering (UCS) \t/Supplement 0 \t>> def \t/CMapName /Adobe-Identity-UCS def \t/CMapType 2 def \t1 begincodespacerange \t<0000> <FFFF> \tendcodespacerange \t1 beginbfchar \t<0001> <200B> \tendbfchar \tendcmap \tCMapName currentdict /CMap defineresource pop \tend \tend",B=new Uint8Array(d.length);
for(var t=0;t<d.length;t++)B[t]=d.charCodeAt(t);Q["/Subtype"]="/TrueType";delete Q["/Encoding"];Q["/FirstChar"]=0;
Q["/Widths"]=[];for(var t=0;t<256;t++)Q["/Widths"].push(500);Q["/LastChar"]=Q["/Widths"].length-1;Q["/FontDescriptor"]={"/Ascent":905,"/CapHeight":1010,"/Descent":211,"/Flags":4,"/FontBBox":[-627,-376,2e3,1011],"/FontName":r,"/ItalicAngle":0,"/StemV":80,"/Type":"/FontDescriptor","/FontFile2":{stream:new Uint8Array(O)}}}i[n]=Q;
return n};function C(r,O,i){var n=r.length;r[2]["/Kids"].push({typ:"ref",ind:n});r[2]["/Count"]++;r.push({"/Type":"/Page","/Parent":{typ:"ref",ind:2},"/Resources":{typ:"ref",ind:3},"/MediaBox":i,"/Contents":{typ:"ref",ind:n+1}});
r.push({stream:O})}function P(r){var O={file:new x,off:0},i=o.write,n=[];i(O,"%PDF-1.1\n");for(var Q=1;
Q<r.length;Q++){n.push(O.off);i(O,Q+" 0 obj\n");o.writeDict(O,r[Q],0);i(O,"\nendobj\n")}var d=O.off;
i(O,"xref\n");i(O,"0 "+r.length+"\n");i(O,"0000000000 65535 f \n");for(var Q=0;Q<n.length;Q++){var B=n[Q]+"";
while(B.length<10)B="0"+B;i(O,B+" 00000 n \n")}i(O,"trailer\n");o.writeDict(O,{"/Root":{typ:"ref",ind:1},"/Size":r.length},0);
i(O,"\nstartxref\n"+d+"\n%%EOF\n");return O.file.data.buffer.slice(0,O.off)}o.write=function(r,O){r.file.req(r.off,O.length);
for(var i=0;i<O.length;i++)r.file.data[r.off+i]=O.charCodeAt(i);r.off+=O.length};o._tab="    ";o.spc=function(r){var O="";
for(var i=0;i<r;i++)O+=o._tab;return O};o.writeValue=function(r,O,i){var Q=o.write;if(!1){}else if(typeof O=="string")Q(r,O);
else if(typeof O=="number")Q(r,""+O);else if(typeof O=="boolean")Q(r,""+O);else if(O.typ!=null)Q(r,O.ind+" 0 R");
else if(O instanceof Array)o.writeArray(r,O,i+1);else if(O instanceof Object)o.writeDict(r,O,i+1);else{console.log(O);
throw"e"}};o.writeDict=function(r,O,i){var n=o.write,Q=o.spc,d=O.stream;if(d){if(typeof d=="string"){var B=new Uint8Array(d.length);
for(var t=0;t<d.length;t++)B[t]=d.charCodeAt(t);d=B}if(O["/Filter"]==null){O["/Filter"]="/FlateDecode";
d=pako.deflate(d)}}n(r,"<<\n");for(var c in O){if(c.charAt(0)!="/")continue;n(r,Q(i+1)+c+" ");o.writeValue(r,O[c],i);
n(r,"\n")}if(d)n(r,Q(i+1)+"/Length "+d.length+"\n");n(r,Q(i)+">>");if(d){n(r,Q(i)+"\nstream\n");r.file.req(r.off,d.length);
for(var t=0;t<d.length;t++)r.file.data[r.off+t]=d[t];r.off+=d.length;n(r,Q(i)+"\nendstream")}};o.writeArray=function(r,O,i){var n=o.write;
n(r,"[ ");for(var Q=0;Q<O.length;Q++){o.writeValue(r,O[Q],i+1);if(Q!=O.length-1)n(r," ")}n(r," ]")};
var x=function(){this.size=16;this.data=new Uint8Array(16)};x.prototype.req=function(r,O){if(r+O<=this.size)return;
var i=this.size;while(r+O>this.size)this.size*=2;var n=new Uint8Array(this.size);for(var Q=0;Q<i;Q++)n[Q]=this.data[Q];
this.data=n};return o}();function ToEMF(){this._file={file:new ToEMF.MFile,off:0};this._lstw=0;this._curx=0;
this._curh=0;this._recs=0;this._lenp=0;this._objs={};this._tabl=1;this._stkf=0;this._tclr=0;this._curt={p:-1,b:-1,t:-1};
this._inited=!1}ToEMF.prototype.StartPage=function(o,s,U,j){this._check();var H=this._file,V=ToEMF.B.writeUint,m=ToEMF.B.writeInt;
this._curh=Math.max(this._curh,j*10);if(!this._inited){this._inited=!0;this._addRec("HEADER",88);ToEMF._writeHeadBox(H,[o,s,U,j]);
H.off+=32;ToEMF.B.writeASCII(H.file,H.off," EMF");H.off+=4;V(H.file,H.off,65536);H.off+=4;this._lenp=H.off;
H.off+=4+4+4;H.off+=4+4+4;m(H.file,H.off,1440);H.off+=4;m(H.file,H.off,900);H.off+=4;m(H.file,H.off,508);
H.off+=4;m(H.file,H.off,318);H.off+=4;this._trsf([.1,0,0,.1,0,0]);this._addRec("SETBKMODE",12);V(H.file,H.off,1);
H.off+=4;this._addRec("SETTEXTALIGN",12);V(H.file,H.off,24);H.off+=4}else{this._curx+=this._lstw;ToEMF._writeHeadBox(H,[0,0,this._curx+U,Math.round(this._curh/10)])}this._lstw=U};
ToEMF.prototype.Stroke=function(o){this._draw(o,1)};ToEMF.prototype.Fill=function(o,s){this._draw(o,2)};
ToEMF.prototype.PutImage=function(o,s,U,j,H){var N=s.length;if((N&3)!=0)N+=4-(N&3);var V=[1,0,0,-1,0,1];
UDOC.M.concat(V,o.ctm);UDOC.M.scale(V,10,10);UDOC.M.scale(V,1,-1);UDOC.M.translate(V,this._curx,this._curh);
this._trsf(V);var R=this._file,w=ToEMF.B.writeUint,X=ToEMF.B.writeInt,e=ToEMF.B.writeUshort,D=8+16+14*4;
this._addRec("STRETCHDIBITS",D+40+N);R.off+=16;X(R.file,R.off,Math.round(0));R.off+=4;X(R.file,R.off,Math.round(0));
R.off+=4;R.off+=8;X(R.file,R.off,U);R.off+=4;X(R.file,R.off,j);R.off+=4;w(R.file,R.off,D);R.off+=4;w(R.file,R.off,40);
R.off+=4;w(R.file,R.off,D+40);R.off+=4;w(R.file,R.off,s.length);R.off+=4;R.off+=4;w(R.file,R.off,13369376);
R.off+=4;X(R.file,R.off,Math.round(1));R.off+=4;X(R.file,R.off,Math.round(1));R.off+=4;X(R.file,R.off,40);
R.off+=4;X(R.file,R.off,U);R.off+=4;X(R.file,R.off,j);R.off+=4;e(R.file,R.off,1);R.off+=2;e(R.file,R.off,32);
R.off+=2;X(R.file,R.off,0);R.off+=4;X(R.file,R.off,s.length);R.off+=4;X(R.file,R.off,3800);R.off+=4;
X(R.file,R.off,3800);R.off+=4;R.off+=8;R.file.req(R.off,s.length);if(s.length==U*j*4){for(var M=0;M<j;
M++)for(var C=0;C<U;C++){var P=M*U+C<<2,x=R.off+((j-1-M)*U+C<<2);R.file.data[x]=s[P+2];R.file.data[x+1]=s[P+1];
R.file.data[x+2]=s[P];R.file.data[x+3]=s[P+3]}}else for(var r=0;r<s.length;r++)R.file.data[R.off+r]=s[r];
R.off+=N;UDOC.M.invert(V);this._trsf(V)};ToEMF.prototype.PutText=function(o,s,U){var j=s.length,M;if((j&1)==1)j++;
this._check();var H=this._file,V=ToEMF.B.writeUint,m=ToEMF.B.writeInt,R=ToEMF.B.writeUshort,w=ToEMF.B.writeFloat,X=ToEMF._color(o.colr);
if(X!=this._tclr){this._addRec("SETTEXTCOLOR",12);V(H.file,H.off,X);H.off+=4;this._tclr=X}this._setTool("f",[o.font.Tf,Math.round(o.font.Tfs*10)]);
var e=10*(o.ctm[4]+this._curx),v=this._curh-10*o.ctm[5],D=Math.abs(o.ctm[1])>.05;if(D){M=o.ctm.slice(0);
M[1]*=-1;M[2]*=-1;M[4]=e;M[5]=v;e=v=0;this._trsf(M)}var C=8+16+12+4*6+16;this._addRec("EXTTEXTOUTW",C+j*2);
H.off+=16;V(H.file,H.off,2);H.off+=4;w(H.file,H.off,31.25);H.off+=4;w(H.file,H.off,31.25);H.off+=4;m(H.file,H.off,Math.round(e));
H.off+=4;m(H.file,H.off,Math.round(v));H.off+=4;V(H.file,H.off,s.length);H.off+=4;V(H.file,H.off,C);
H.off+=4;V(H.file,H.off,0);H.off+=4;H.off+=16;V(H.file,H.off,0);H.off+=4;for(var P=0;P<s.length;P++)R(H.file,H.off+P*2,s.charCodeAt(P));
H.off+=2*j;if(D){UDOC.M.invert(M);this._trsf(M)}};ToEMF.prototype.ShowPage=function(){this._check()};
ToEMF.prototype.Done=function(){this._check();var o=this._file,s=ToEMF.B.writeUint;this._addRec("EOF",20);
s(o.file,o.off,0);o.off+=4;s(o.file,o.off,16);o.off+=4;s(o.file,o.off,20);o.off+=4;s(o.file,this._lenp,o.off);
s(o.file,this._lenp+4,this._recs);s(o.file,this._lenp+8,this._tabl);this.buffer=o.file.data.buffer.slice(0,o.off)};
ToEMF.prototype._check=function(){var o=this._file,s=this._stkf;if(s==0)return;if(s==1)this._addRec("STROKEPATH",24);
if(s==2)this._addRec("FILLPATH",24);if(s==3)this._addRec("STROKEANDFILLPATH",24);o.off+=16;this._stkf=0};
ToEMF.prototype._addRec=function(o,s){var U=this._file,j=ToEMF.B.writeUint;this._recs++;j(U.file,U.off,ToEMF.C["EMR_"+o]);
U.off+=4;j(U.file,U.off,s);U.off+=4};ToEMF.prototype._trsf=function(o){var s=this._file,U=ToEMF.B.writeInt;
this._addRec("MODIFYWORLDTRANSFORM",36);for(var j=0;j<o.length;j++){ToEMF.B.writeFloat(s.file,s.off,o[j]);
s.off+=4}U(s.file,s.off,2);s.off+=4};ToEMF._writeHeadBox=function(o,s){var U=o.off;o.off=8;ToEMF._writeBox(o,s);
var j=1/72*25.4*100;ToEMF._writeBox(o,[0,0,Math.round((s[2]-s[0])*j),Math.round((s[3]-s[1])*j)]);o.off=U};
ToEMF._writeBox=function(o,s){for(var U=0;U<4;U++){ToEMF.B.writeInt(o.file,o.off,s[U]);o.off+=4}};ToEMF.prototype._draw=function(o,s){var U=this._file,j=ToEMF.B.writeUint,H=ToEMF.B.writeInt,V=o.pth,m=JSON.stringify(V);
if(this._cpth!=m)this._check();if(s==1)this._setTool("p",[o.COLR,o.lwidth,o.ljoin]);else this._setTool("b",[o.colr]);
if(this._cpth==m){this._stkf+=s}else{var R={M:["MOVETOEX",1],L:["LINETO",1],C:["POLYBEZIERTO",3],Z:["CLOSEFIGURE",0]},w=0,X=V.cmds.length;
this._addRec("BEGINPATH",8);for(var e=0;e<X;e++){var v=V.cmds[e],D=R[v],x=1;if(D==null)throw v+" e";
var M=D[1]*2,C=D[0],P=8+4*M;while(!0){if(e+x<X&&V.cmds[e+x]==v)x++;else break}var r=v=="C"||v=="L"&&x>1;
if(r){M*=x;if(v=="L")C="POLYLINETO";P=8+20+4*M}this._addRec(C,P);if(r){U.off+=16;j(U.file,U.off,x*D[1]);
U.off+=4;e+=x-1}for(var O=0;O<M;O+=2){H(U.file,U.off,Math.round(10*(V.crds[w]+this._curx)));U.off+=4;
w++;H(U.file,U.off,Math.round(this._curh-10*V.crds[w]));U.off+=4;w++}}this._addRec("ENDPATH",8);this._cpth=m;
this._stkf=s}};ToEMF.prototype._setTool=function(o,s){var U=this._file,j=ToEMF.B.writeUint,H=ToEMF.B.writeInt,V=o+JSON.stringify(s),m=this._objs[V];
if(m==null){m=this._objs[V]=this._tabl;this._tabl++;if(o=="b")this._addRec("CREATEBRUSHINDIRECT",24);
if(o=="p")this._addRec("CREATEPEN",28);if(o=="f")this._addRec("EXTCREATEFONTINDIRECTW",104);j(U.file,U.off,m);
U.off+=4;if(o=="b"||o=="p"){if(o=="p"){j(U.file,U.off,0);U.off+=4;var R=Math.round(s[1]*10);j(U.file,U.off,R);
U.off+=4;j(U.file,U.off,R);U.off+=4}else{j(U.file,U.off,0);U.off+=4}j(U.file,U.off,ToEMF._color(s[0]));
U.off+=4;if(o=="b"){j(U.file,U.off,0);U.off+=4}}if(o=="f"){var w=s[0],X=w.toLowerCase().indexOf("bold")!=-1;
if(w.endsWith("-Bold"))w=w.slice(0,w.length-5);H(U.file,U.off,-s[1]);U.off+=4;U.off+=12;j(U.file,U.off,X?700:400);
U.off+=4;j(U.file,U.off,0);U.off+=4;j(U.file,U.off,262151);U.off+=4;for(var e=0;e<w.length;e++)ToEMF.B.writeUshort(U.file,U.off+e*2,w.charCodeAt(e));
U.off+=64}}if(this._curt[o]!=m){this._addRec("SELECTOBJECT",12);j(U.file,U.off,m);U.off+=4;this._curt[o]=m}};
ToEMF._color=function(o){var s=Math.round(o[0]*255),U=Math.round(o[1]*255),j=Math.round(o[2]*255);return j<<16|U<<8|s<<0};
ToEMF.B=function(){var o=new Uint8Array(4),s=o.buffer,U=new Int16Array(s),j=new Uint16Array(s),H=new Int32Array(s),N=new Uint32Array(s),V=new Float32Array(s);
return{writeShort:function(m,R,w){U[0]=w;m.req(R,2);var X=m.data;X[R]=o[0];X[R+1]=o[1]},writeUshort:function(m,R,w){j[0]=w;
m.req(R,2);var X=m.data;X[R]=o[0];X[R+1]=o[1]},writeInt:function(m,R,w){H[0]=w;m.req(R,4);var X=m.data;
X[R]=o[0];X[R+1]=o[1];X[R+2]=o[2];X[R+3]=o[3]},writeUint:function(m,R,w){N[0]=w;m.req(R,4);var X=m.data;
X[R]=o[0];X[R+1]=o[1];X[R+2]=o[2];X[R+3]=o[3]},writeFloat:function(m,R,w){V[0]=w;m.req(R,4);var X=m.data;
X[R]=o[0];X[R+1]=o[1];X[R+2]=o[2];X[R+3]=o[3]},writeASCII:function(m,R,w){m.req(R,w.length);for(var X=0;
X<w.length;X++)m.data[R+X]=w.charCodeAt(X)}}}();ToEMF.MFile=function(){this.size=16;this.data=new Uint8Array(16)};
ToEMF.MFile.prototype.req=function(o,s){if(o+s<=this.size)return;var U=this.size;while(o+s>this.size)this.size*=2;
var j=new Uint8Array(this.size);for(var H=0;H<U;H++)j[H]=this.data[H];this.data=j};ToEMF.C={EMR_HEADER:1,EMR_POLYBEZIER:2,EMR_POLYGON:3,EMR_POLYLINE:4,EMR_POLYBEZIERTO:5,EMR_POLYLINETO:6,EMR_POLYPOLYLINE:7,EMR_POLYPOLYGON:8,EMR_SETWINDOWEXTEX:9,EMR_SETWINDOWORGEX:10,EMR_SETVIEWPORTEXTEX:11,EMR_SETVIEWPORTORGEX:12,EMR_SETBRUSHORGEX:13,EMR_EOF:14,EMR_SETPIXELV:15,EMR_SETMAPPERFLAGS:16,EMR_SETMAPMODE:17,EMR_SETBKMODE:18,EMR_SETPOLYFILLMODE:19,EMR_SETROP2:20,EMR_SETSTRETCHBLTMODE:21,EMR_SETTEXTALIGN:22,EMR_SETCOLORADJUSTMENT:23,EMR_SETTEXTCOLOR:24,EMR_SETBKCOLOR:25,EMR_OFFSETCLIPRGN:26,EMR_MOVETOEX:27,EMR_SETMETARGN:28,EMR_EXCLUDECLIPRECT:29,EMR_INTERSECTCLIPRECT:30,EMR_SCALEVIEWPORTEXTEX:31,EMR_SCALEWINDOWEXTEX:32,EMR_SAVEDC:33,EMR_RESTOREDC:34,EMR_SETWORLDTRANSFORM:35,EMR_MODIFYWORLDTRANSFORM:36,EMR_SELECTOBJECT:37,EMR_CREATEPEN:38,EMR_CREATEBRUSHINDIRECT:39,EMR_DELETEOBJECT:40,EMR_ANGLEARC:41,EMR_ELLIPSE:42,EMR_RECTANGLE:43,EMR_ROUNDRECT:44,EMR_ARC:45,EMR_CHORD:46,EMR_PIE:47,EMR_SELECTPALETTE:48,EMR_CREATEPALETTE:49,EMR_SETPALETTEENTRIES:50,EMR_RESIZEPALETTE:51,EMR_REALIZEPALETTE:52,EMR_EXTFLOODFILL:53,EMR_LINETO:54,EMR_ARCTO:55,EMR_POLYDRAW:56,EMR_SETARCDIRECTION:57,EMR_SETMITERLIMIT:58,EMR_BEGINPATH:59,EMR_ENDPATH:60,EMR_CLOSEFIGURE:61,EMR_FILLPATH:62,EMR_STROKEANDFILLPATH:63,EMR_STROKEPATH:64,EMR_FLATTENPATH:65,EMR_WIDENPATH:66,EMR_SELECTCLIPPATH:67,EMR_ABORTPATH:68,EMR_COMMENT:70,EMR_FILLRGN:71,EMR_FRAMERGN:72,EMR_INVERTRGN:73,EMR_PAINTRGN:74,EMR_EXTSELECTCLIPRGN:75,EMR_BITBLT:76,EMR_STRETCHBLT:77,EMR_MASKBLT:78,EMR_PLGBLT:79,EMR_SETDIBITSTODEVICE:80,EMR_STRETCHDIBITS:81,EMR_EXTCREATEFONTINDIRECTW:82,EMR_EXTTEXTOUTA:83,EMR_EXTTEXTOUTW:84,EMR_POLYBEZIER16:85,EMR_POLYGON16:86,EMR_POLYLINE16:87,EMR_POLYBEZIERTO16:88,EMR_POLYLINETO16:89,EMR_POLYPOLYLINE16:90,EMR_POLYPOLYGON16:91,EMR_POLYDRAW16:92,EMR_CREATEMONOBRUSH:93,EMR_CREATEDIBPATTERNBRUSHPT:94,EMR_EXTCREATEPEN:95,EMR_POLYTEXTOUTA:96,EMR_POLYTEXTOUTW:97,EMR_SETICMMODE:98,EMR_CREATECOLORSPACE:99,EMR_SETCOLORSPACE:100,EMR_DELETECOLORSPACE:101,EMR_GLSRECORD:102,EMR_GLSBOUNDEDRECORD:103,EMR_PIXELFORMAT:104,EMR_DRAWESCAPE:105,EMR_EXTESCAPE:106,EMR_SMALLTEXTOUT:108,EMR_FORCEUFIMAPPING:109,EMR_NAMEDESCAPE:110,EMR_COLORCORRECTPALETTE:111,EMR_SETICMPROFILEA:112,EMR_SETICMPROFILEW:113,EMR_ALPHABLEND:114,EMR_SETLAYOUT:115,EMR_TRANSPARENTBLT:116,EMR_GRADIENTFILL:118,EMR_SETLINKEDUFIS:119,EMR_SETTEXTJUSTIFICATION:120,EMR_COLORMATCHTOTARGETW:121,EMR_CREATECOLORSPACEW:122};
ToEMF.K=[];(function(){var o,s,U;o=ToEMF.C;s=ToEMF.K;U=4;for(var j in o)s[o[j]]=j.slice(U)}());var ToDXF=function(){var o;
function s(){this.buffer=null}s.prototype.StartPage=function(){if(o==null)o=[0,"SECTION",2,"ENTITIES"]};
s.prototype.ShowPage=function(){};s.prototype.Done=function(){o.push(0,"ENDSEC",0,"EOF","");var U=o.join("\n"),j=new Uint8Array(U.length);
this.buffer=j.buffer;for(var H=0;H<U.length;H++)j[H]=U.charCodeAt(H);o=null};s.prototype.PutImage=function(){};
s.prototype.PutText=function(U,j,H){while(j.endsWith("\n"))j=j.slice(0,j.length-1);o.push(0,"MTEXT");
o.push(40,U.font.Tfs);o.push(10,U.ctm[4],20,U.ctm[5]);o.push(1,j)};s.prototype.Fill=function(){};s.prototype.Stroke=function(U){var j=U.pth.cmds,H=U.pth.crds,N=0,V=0,m=0,R=0,w=0;
for(var X=0;X<j.length;X++){var e=j[X];if(e=="M"){m=H[w++];R=H[w++];N=m;V=R}else if(e=="L"||e=="Z"){if(e=="Z"&&m==N&&R==V)continue;
o.push(0,"LINE",10,m,20,R);if(e=="L"){m=H[w++];R=H[w++]}else{m=N;R=V}o.push(11,m,21,R)}else if(e=="C"){o.push(0,"SPLINE");
o.push(210,0,220,0,230,0);o.push(70,8,71,3,72,8,73,4,74,0,42,0,43,0);for(var v=0;v<8;v++)o.push(40,v<4?0:1);
o.push(10,m,20,R);for(var v=0;v<3;v++){m=H[w++];R=H[w++];o.push(10,m,20,R)}}}};return s}()/* pako 1.0.5 nodeca/pako */
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.pako=t()}}(function(){return function t(e,a,i){function n(s,o){if(!a[s]){if(!e[s]){var l="function"==typeof require&&require;if(!o&&l)return l(s,!0);if(r)return r(s,!0);var h=new Error("Cannot find module '"+s+"'");throw h.code="MODULE_NOT_FOUND",h}var d=a[s]={exports:{}};e[s][0].call(d.exports,function(t){var a=e[s][1][t];return n(a?a:t)},d,d.exports,t,e,a,i)}return a[s].exports}for(var r="function"==typeof require&&require,s=0;s<i.length;s++)n(i[s]);return n}({1:[function(t,e,a){"use strict";function i(t){if(!(this instanceof i))return new i(t);this.options=l.assign({level:w,method:v,chunkSize:16384,windowBits:15,memLevel:8,strategy:p,to:""},t||{});var e=this.options;e.raw&&e.windowBits>0?e.windowBits=-e.windowBits:e.gzip&&e.windowBits>0&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new f,this.strm.avail_out=0;var a=o.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(a!==b)throw new Error(d[a]);if(e.header&&o.deflateSetHeader(this.strm,e.header),e.dictionary){var n;if(n="string"==typeof e.dictionary?h.string2buf(e.dictionary):"[object ArrayBuffer]"===_.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,a=o.deflateSetDictionary(this.strm,n),a!==b)throw new Error(d[a]);this._dict_set=!0}}function n(t,e){var a=new i(e);if(a.push(t,!0),a.err)throw a.msg||d[a.err];return a.result}function r(t,e){return e=e||{},e.raw=!0,n(t,e)}function s(t,e){return e=e||{},e.gzip=!0,n(t,e)}var o=t("./zlib/deflate"),l=t("./utils/common"),h=t("./utils/strings"),d=t("./zlib/messages"),f=t("./zlib/zstream"),_=Object.prototype.toString,u=0,c=4,b=0,g=1,m=2,w=-1,p=0,v=8;i.prototype.push=function(t,e){var a,i,n=this.strm,r=this.options.chunkSize;if(this.ended)return!1;i=e===~~e?e:e===!0?c:u,"string"==typeof t?n.input=h.string2buf(t):"[object ArrayBuffer]"===_.call(t)?n.input=new Uint8Array(t):n.input=t,n.next_in=0,n.avail_in=n.input.length;do{if(0===n.avail_out&&(n.output=new l.Buf8(r),n.next_out=0,n.avail_out=r),a=o.deflate(n,i),a!==g&&a!==b)return this.onEnd(a),this.ended=!0,!1;0!==n.avail_out&&(0!==n.avail_in||i!==c&&i!==m)||("string"===this.options.to?this.onData(h.buf2binstring(l.shrinkBuf(n.output,n.next_out))):this.onData(l.shrinkBuf(n.output,n.next_out)))}while((n.avail_in>0||0===n.avail_out)&&a!==g);return i===c?(a=o.deflateEnd(this.strm),this.onEnd(a),this.ended=!0,a===b):i!==m||(this.onEnd(b),n.avail_out=0,!0)},i.prototype.onData=function(t){this.chunks.push(t)},i.prototype.onEnd=function(t){t===b&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=l.flattenChunks(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},a.Deflate=i,a.deflate=n,a.deflateRaw=r,a.gzip=s},{"./utils/common":3,"./utils/strings":4,"./zlib/deflate":8,"./zlib/messages":13,"./zlib/zstream":15}],2:[function(t,e,a){"use strict";function i(t){if(!(this instanceof i))return new i(t);this.options=o.assign({chunkSize:16384,windowBits:0,to:""},t||{});var e=this.options;e.raw&&e.windowBits>=0&&e.windowBits<16&&(e.windowBits=-e.windowBits,0===e.windowBits&&(e.windowBits=-15)),!(e.windowBits>=0&&e.windowBits<16)||t&&t.windowBits||(e.windowBits+=32),e.windowBits>15&&e.windowBits<48&&0===(15&e.windowBits)&&(e.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new f,this.strm.avail_out=0;var a=s.inflateInit2(this.strm,e.windowBits);if(a!==h.Z_OK)throw new Error(d[a]);this.header=new _,s.inflateGetHeader(this.strm,this.header)}function n(t,e){var a=new i(e);if(a.push(t,!0),a.err)throw a.msg||d[a.err];return a.result}function r(t,e){return e=e||{},e.raw=!0,n(t,e)}var s=t("./zlib/inflate"),o=t("./utils/common"),l=t("./utils/strings"),h=t("./zlib/constants"),d=t("./zlib/messages"),f=t("./zlib/zstream"),_=t("./zlib/gzheader"),u=Object.prototype.toString;i.prototype.push=function(t,e){var a,i,n,r,d,f,_=this.strm,c=this.options.chunkSize,b=this.options.dictionary,g=!1;if(this.ended)return!1;i=e===~~e?e:e===!0?h.Z_FINISH:h.Z_NO_FLUSH,"string"==typeof t?_.input=l.binstring2buf(t):"[object ArrayBuffer]"===u.call(t)?_.input=new Uint8Array(t):_.input=t,_.next_in=0,_.avail_in=_.input.length;do{if(0===_.avail_out&&(_.output=new o.Buf8(c),_.next_out=0,_.avail_out=c),a=s.inflate(_,h.Z_NO_FLUSH),a===h.Z_NEED_DICT&&b&&(f="string"==typeof b?l.string2buf(b):"[object ArrayBuffer]"===u.call(b)?new Uint8Array(b):b,a=s.inflateSetDictionary(this.strm,f)),a===h.Z_BUF_ERROR&&g===!0&&(a=h.Z_OK,g=!1),a!==h.Z_STREAM_END&&a!==h.Z_OK)return this.onEnd(a),this.ended=!0,!1;_.next_out&&(0!==_.avail_out&&a!==h.Z_STREAM_END&&(0!==_.avail_in||i!==h.Z_FINISH&&i!==h.Z_SYNC_FLUSH)||("string"===this.options.to?(n=l.utf8border(_.output,_.next_out),r=_.next_out-n,d=l.buf2string(_.output,n),_.next_out=r,_.avail_out=c-r,r&&o.arraySet(_.output,_.output,n,r,0),this.onData(d)):this.onData(o.shrinkBuf(_.output,_.next_out)))),0===_.avail_in&&0===_.avail_out&&(g=!0)}while((_.avail_in>0||0===_.avail_out)&&a!==h.Z_STREAM_END);return a===h.Z_STREAM_END&&(i=h.Z_FINISH),i===h.Z_FINISH?(a=s.inflateEnd(this.strm),this.onEnd(a),this.ended=!0,a===h.Z_OK):i!==h.Z_SYNC_FLUSH||(this.onEnd(h.Z_OK),_.avail_out=0,!0)},i.prototype.onData=function(t){this.chunks.push(t)},i.prototype.onEnd=function(t){t===h.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},a.Inflate=i,a.inflate=n,a.inflateRaw=r,a.ungzip=n},{"./utils/common":3,"./utils/strings":4,"./zlib/constants":6,"./zlib/gzheader":9,"./zlib/inflate":11,"./zlib/messages":13,"./zlib/zstream":15}],3:[function(t,e,a){"use strict";var i="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;a.assign=function(t){for(var e=Array.prototype.slice.call(arguments,1);e.length;){var a=e.shift();if(a){if("object"!=typeof a)throw new TypeError(a+"must be non-object");for(var i in a)a.hasOwnProperty(i)&&(t[i]=a[i])}}return t},a.shrinkBuf=function(t,e){return t.length===e?t:t.subarray?t.subarray(0,e):(t.length=e,t)};var n={arraySet:function(t,e,a,i,n){if(e.subarray&&t.subarray)return void t.set(e.subarray(a,a+i),n);for(var r=0;r<i;r++)t[n+r]=e[a+r]},flattenChunks:function(t){var e,a,i,n,r,s;for(i=0,e=0,a=t.length;e<a;e++)i+=t[e].length;for(s=new Uint8Array(i),n=0,e=0,a=t.length;e<a;e++)r=t[e],s.set(r,n),n+=r.length;return s}},r={arraySet:function(t,e,a,i,n){for(var r=0;r<i;r++)t[n+r]=e[a+r]},flattenChunks:function(t){return[].concat.apply([],t)}};a.setTyped=function(t){t?(a.Buf8=Uint8Array,a.Buf16=Uint16Array,a.Buf32=Int32Array,a.assign(a,n)):(a.Buf8=Array,a.Buf16=Array,a.Buf32=Array,a.assign(a,r))},a.setTyped(i)},{}],4:[function(t,e,a){"use strict";function i(t,e){if(e<65537&&(t.subarray&&s||!t.subarray&&r))return String.fromCharCode.apply(null,n.shrinkBuf(t,e));for(var a="",i=0;i<e;i++)a+=String.fromCharCode(t[i]);return a}var n=t("./common"),r=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(t){r=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){s=!1}for(var o=new n.Buf8(256),l=0;l<256;l++)o[l]=l>=252?6:l>=248?5:l>=240?4:l>=224?3:l>=192?2:1;o[254]=o[254]=1,a.string2buf=function(t){var e,a,i,r,s,o=t.length,l=0;for(r=0;r<o;r++)a=t.charCodeAt(r),55296===(64512&a)&&r+1<o&&(i=t.charCodeAt(r+1),56320===(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),r++)),l+=a<128?1:a<2048?2:a<65536?3:4;for(e=new n.Buf8(l),s=0,r=0;s<l;r++)a=t.charCodeAt(r),55296===(64512&a)&&r+1<o&&(i=t.charCodeAt(r+1),56320===(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),r++)),a<128?e[s++]=a:a<2048?(e[s++]=192|a>>>6,e[s++]=128|63&a):a<65536?(e[s++]=224|a>>>12,e[s++]=128|a>>>6&63,e[s++]=128|63&a):(e[s++]=240|a>>>18,e[s++]=128|a>>>12&63,e[s++]=128|a>>>6&63,e[s++]=128|63&a);return e},a.buf2binstring=function(t){return i(t,t.length)},a.binstring2buf=function(t){for(var e=new n.Buf8(t.length),a=0,i=e.length;a<i;a++)e[a]=t.charCodeAt(a);return e},a.buf2string=function(t,e){var a,n,r,s,l=e||t.length,h=new Array(2*l);for(n=0,a=0;a<l;)if(r=t[a++],r<128)h[n++]=r;else if(s=o[r],s>4)h[n++]=65533,a+=s-1;else{for(r&=2===s?31:3===s?15:7;s>1&&a<l;)r=r<<6|63&t[a++],s--;s>1?h[n++]=65533:r<65536?h[n++]=r:(r-=65536,h[n++]=55296|r>>10&1023,h[n++]=56320|1023&r)}return i(h,n)},a.utf8border=function(t,e){var a;for(e=e||t.length,e>t.length&&(e=t.length),a=e-1;a>=0&&128===(192&t[a]);)a--;return a<0?e:0===a?e:a+o[t[a]]>e?a:e}},{"./common":3}],5:[function(t,e,a){"use strict";function i(t,e,a,i){for(var n=65535&t|0,r=t>>>16&65535|0,s=0;0!==a;){s=a>2e3?2e3:a,a-=s;do n=n+e[i++]|0,r=r+n|0;while(--s);n%=65521,r%=65521}return n|r<<16|0}e.exports=i},{}],6:[function(t,e,a){"use strict";e.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],7:[function(t,e,a){"use strict";function i(){for(var t,e=[],a=0;a<256;a++){t=a;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[a]=t}return e}function n(t,e,a,i){var n=r,s=i+a;t^=-1;for(var o=i;o<s;o++)t=t>>>8^n[255&(t^e[o])];return t^-1}var r=i();e.exports=n},{}],8:[function(t,e,a){"use strict";function i(t,e){return t.msg=D[e],e}function n(t){return(t<<1)-(t>4?9:0)}function r(t){for(var e=t.length;--e>=0;)t[e]=0}function s(t){var e=t.state,a=e.pending;a>t.avail_out&&(a=t.avail_out),0!==a&&(R.arraySet(t.output,e.pending_buf,e.pending_out,a,t.next_out),t.next_out+=a,e.pending_out+=a,t.total_out+=a,t.avail_out-=a,e.pending-=a,0===e.pending&&(e.pending_out=0))}function o(t,e){C._tr_flush_block(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,s(t.strm)}function l(t,e){t.pending_buf[t.pending++]=e}function h(t,e){t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e}function d(t,e,a,i){var n=t.avail_in;return n>i&&(n=i),0===n?0:(t.avail_in-=n,R.arraySet(e,t.input,t.next_in,n,a),1===t.state.wrap?t.adler=N(t.adler,e,n,a):2===t.state.wrap&&(t.adler=O(t.adler,e,n,a)),t.next_in+=n,t.total_in+=n,n)}function f(t,e){var a,i,n=t.max_chain_length,r=t.strstart,s=t.prev_length,o=t.nice_match,l=t.strstart>t.w_size-ft?t.strstart-(t.w_size-ft):0,h=t.window,d=t.w_mask,f=t.prev,_=t.strstart+dt,u=h[r+s-1],c=h[r+s];t.prev_length>=t.good_match&&(n>>=2),o>t.lookahead&&(o=t.lookahead);do if(a=e,h[a+s]===c&&h[a+s-1]===u&&h[a]===h[r]&&h[++a]===h[r+1]){r+=2,a++;do;while(h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&r<_);if(i=dt-(_-r),r=_-dt,i>s){if(t.match_start=e,s=i,i>=o)break;u=h[r+s-1],c=h[r+s]}}while((e=f[e&d])>l&&0!==--n);return s<=t.lookahead?s:t.lookahead}function _(t){var e,a,i,n,r,s=t.w_size;do{if(n=t.window_size-t.lookahead-t.strstart,t.strstart>=s+(s-ft)){R.arraySet(t.window,t.window,s,s,0),t.match_start-=s,t.strstart-=s,t.block_start-=s,a=t.hash_size,e=a;do i=t.head[--e],t.head[e]=i>=s?i-s:0;while(--a);a=s,e=a;do i=t.prev[--e],t.prev[e]=i>=s?i-s:0;while(--a);n+=s}if(0===t.strm.avail_in)break;if(a=d(t.strm,t.window,t.strstart+t.lookahead,n),t.lookahead+=a,t.lookahead+t.insert>=ht)for(r=t.strstart-t.insert,t.ins_h=t.window[r],t.ins_h=(t.ins_h<<t.hash_shift^t.window[r+1])&t.hash_mask;t.insert&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[r+ht-1])&t.hash_mask,t.prev[r&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=r,r++,t.insert--,!(t.lookahead+t.insert<ht)););}while(t.lookahead<ft&&0!==t.strm.avail_in)}function u(t,e){var a=65535;for(a>t.pending_buf_size-5&&(a=t.pending_buf_size-5);;){if(t.lookahead<=1){if(_(t),0===t.lookahead&&e===I)return vt;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;var i=t.block_start+a;if((0===t.strstart||t.strstart>=i)&&(t.lookahead=t.strstart-i,t.strstart=i,o(t,!1),0===t.strm.avail_out))return vt;if(t.strstart-t.block_start>=t.w_size-ft&&(o(t,!1),0===t.strm.avail_out))return vt}return t.insert=0,e===F?(o(t,!0),0===t.strm.avail_out?yt:xt):t.strstart>t.block_start&&(o(t,!1),0===t.strm.avail_out)?vt:vt}function c(t,e){for(var a,i;;){if(t.lookahead<ft){if(_(t),t.lookahead<ft&&e===I)return vt;if(0===t.lookahead)break}if(a=0,t.lookahead>=ht&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+ht-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==a&&t.strstart-a<=t.w_size-ft&&(t.match_length=f(t,a)),t.match_length>=ht)if(i=C._tr_tally(t,t.strstart-t.match_start,t.match_length-ht),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=ht){t.match_length--;do t.strstart++,t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+ht-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart;while(0!==--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+1])&t.hash_mask;else i=C._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(i&&(o(t,!1),0===t.strm.avail_out))return vt}return t.insert=t.strstart<ht-1?t.strstart:ht-1,e===F?(o(t,!0),0===t.strm.avail_out?yt:xt):t.last_lit&&(o(t,!1),0===t.strm.avail_out)?vt:kt}function b(t,e){for(var a,i,n;;){if(t.lookahead<ft){if(_(t),t.lookahead<ft&&e===I)return vt;if(0===t.lookahead)break}if(a=0,t.lookahead>=ht&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+ht-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=ht-1,0!==a&&t.prev_length<t.max_lazy_match&&t.strstart-a<=t.w_size-ft&&(t.match_length=f(t,a),t.match_length<=5&&(t.strategy===q||t.match_length===ht&&t.strstart-t.match_start>4096)&&(t.match_length=ht-1)),t.prev_length>=ht&&t.match_length<=t.prev_length){n=t.strstart+t.lookahead-ht,i=C._tr_tally(t,t.strstart-1-t.prev_match,t.prev_length-ht),t.lookahead-=t.prev_length-1,t.prev_length-=2;do++t.strstart<=n&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+ht-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart);while(0!==--t.prev_length);if(t.match_available=0,t.match_length=ht-1,t.strstart++,i&&(o(t,!1),0===t.strm.avail_out))return vt}else if(t.match_available){if(i=C._tr_tally(t,0,t.window[t.strstart-1]),i&&o(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return vt}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(i=C._tr_tally(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<ht-1?t.strstart:ht-1,e===F?(o(t,!0),0===t.strm.avail_out?yt:xt):t.last_lit&&(o(t,!1),0===t.strm.avail_out)?vt:kt}function g(t,e){for(var a,i,n,r,s=t.window;;){if(t.lookahead<=dt){if(_(t),t.lookahead<=dt&&e===I)return vt;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=ht&&t.strstart>0&&(n=t.strstart-1,i=s[n],i===s[++n]&&i===s[++n]&&i===s[++n])){r=t.strstart+dt;do;while(i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&n<r);t.match_length=dt-(r-n),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=ht?(a=C._tr_tally(t,1,t.match_length-ht),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(a=C._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),a&&(o(t,!1),0===t.strm.avail_out))return vt}return t.insert=0,e===F?(o(t,!0),0===t.strm.avail_out?yt:xt):t.last_lit&&(o(t,!1),0===t.strm.avail_out)?vt:kt}function m(t,e){for(var a;;){if(0===t.lookahead&&(_(t),0===t.lookahead)){if(e===I)return vt;break}if(t.match_length=0,a=C._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,a&&(o(t,!1),0===t.strm.avail_out))return vt}return t.insert=0,e===F?(o(t,!0),0===t.strm.avail_out?yt:xt):t.last_lit&&(o(t,!1),0===t.strm.avail_out)?vt:kt}function w(t,e,a,i,n){this.good_length=t,this.max_lazy=e,this.nice_length=a,this.max_chain=i,this.func=n}function p(t){t.window_size=2*t.w_size,r(t.head),t.max_lazy_match=Z[t.level].max_lazy,t.good_match=Z[t.level].good_length,t.nice_match=Z[t.level].nice_length,t.max_chain_length=Z[t.level].max_chain,t.strstart=0,t.block_start=0,t.lookahead=0,t.insert=0,t.match_length=t.prev_length=ht-1,t.match_available=0,t.ins_h=0}function v(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=V,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new R.Buf16(2*ot),this.dyn_dtree=new R.Buf16(2*(2*rt+1)),this.bl_tree=new R.Buf16(2*(2*st+1)),r(this.dyn_ltree),r(this.dyn_dtree),r(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new R.Buf16(lt+1),this.heap=new R.Buf16(2*nt+1),r(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new R.Buf16(2*nt+1),r(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function k(t){var e;return t&&t.state?(t.total_in=t.total_out=0,t.data_type=Q,e=t.state,e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?ut:wt,t.adler=2===e.wrap?0:1,e.last_flush=I,C._tr_init(e),H):i(t,K)}function y(t){var e=k(t);return e===H&&p(t.state),e}function x(t,e){return t&&t.state?2!==t.state.wrap?K:(t.state.gzhead=e,H):K}function z(t,e,a,n,r,s){if(!t)return K;var o=1;if(e===Y&&(e=6),n<0?(o=0,n=-n):n>15&&(o=2,n-=16),r<1||r>$||a!==V||n<8||n>15||e<0||e>9||s<0||s>W)return i(t,K);8===n&&(n=9);var l=new v;return t.state=l,l.strm=t,l.wrap=o,l.gzhead=null,l.w_bits=n,l.w_size=1<<l.w_bits,l.w_mask=l.w_size-1,l.hash_bits=r+7,l.hash_size=1<<l.hash_bits,l.hash_mask=l.hash_size-1,l.hash_shift=~~((l.hash_bits+ht-1)/ht),l.window=new R.Buf8(2*l.w_size),l.head=new R.Buf16(l.hash_size),l.prev=new R.Buf16(l.w_size),l.lit_bufsize=1<<r+6,l.pending_buf_size=4*l.lit_bufsize,l.pending_buf=new R.Buf8(l.pending_buf_size),l.d_buf=1*l.lit_bufsize,l.l_buf=3*l.lit_bufsize,l.level=e,l.strategy=s,l.method=a,y(t)}function B(t,e){return z(t,e,V,tt,et,J)}function S(t,e){var a,o,d,f;if(!t||!t.state||e>L||e<0)return t?i(t,K):K;if(o=t.state,!t.output||!t.input&&0!==t.avail_in||o.status===pt&&e!==F)return i(t,0===t.avail_out?P:K);if(o.strm=t,a=o.last_flush,o.last_flush=e,o.status===ut)if(2===o.wrap)t.adler=0,l(o,31),l(o,139),l(o,8),o.gzhead?(l(o,(o.gzhead.text?1:0)+(o.gzhead.hcrc?2:0)+(o.gzhead.extra?4:0)+(o.gzhead.name?8:0)+(o.gzhead.comment?16:0)),l(o,255&o.gzhead.time),l(o,o.gzhead.time>>8&255),l(o,o.gzhead.time>>16&255),l(o,o.gzhead.time>>24&255),l(o,9===o.level?2:o.strategy>=G||o.level<2?4:0),l(o,255&o.gzhead.os),o.gzhead.extra&&o.gzhead.extra.length&&(l(o,255&o.gzhead.extra.length),l(o,o.gzhead.extra.length>>8&255)),o.gzhead.hcrc&&(t.adler=O(t.adler,o.pending_buf,o.pending,0)),o.gzindex=0,o.status=ct):(l(o,0),l(o,0),l(o,0),l(o,0),l(o,0),l(o,9===o.level?2:o.strategy>=G||o.level<2?4:0),l(o,zt),o.status=wt);else{var _=V+(o.w_bits-8<<4)<<8,u=-1;u=o.strategy>=G||o.level<2?0:o.level<6?1:6===o.level?2:3,_|=u<<6,0!==o.strstart&&(_|=_t),_+=31-_%31,o.status=wt,h(o,_),0!==o.strstart&&(h(o,t.adler>>>16),h(o,65535&t.adler)),t.adler=1}if(o.status===ct)if(o.gzhead.extra){for(d=o.pending;o.gzindex<(65535&o.gzhead.extra.length)&&(o.pending!==o.pending_buf_size||(o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),s(t),d=o.pending,o.pending!==o.pending_buf_size));)l(o,255&o.gzhead.extra[o.gzindex]),o.gzindex++;o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),o.gzindex===o.gzhead.extra.length&&(o.gzindex=0,o.status=bt)}else o.status=bt;if(o.status===bt)if(o.gzhead.name){d=o.pending;do{if(o.pending===o.pending_buf_size&&(o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),s(t),d=o.pending,o.pending===o.pending_buf_size)){f=1;break}f=o.gzindex<o.gzhead.name.length?255&o.gzhead.name.charCodeAt(o.gzindex++):0,l(o,f)}while(0!==f);o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),0===f&&(o.gzindex=0,o.status=gt)}else o.status=gt;if(o.status===gt)if(o.gzhead.comment){d=o.pending;do{if(o.pending===o.pending_buf_size&&(o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),s(t),d=o.pending,o.pending===o.pending_buf_size)){f=1;break}f=o.gzindex<o.gzhead.comment.length?255&o.gzhead.comment.charCodeAt(o.gzindex++):0,l(o,f)}while(0!==f);o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),0===f&&(o.status=mt)}else o.status=mt;if(o.status===mt&&(o.gzhead.hcrc?(o.pending+2>o.pending_buf_size&&s(t),o.pending+2<=o.pending_buf_size&&(l(o,255&t.adler),l(o,t.adler>>8&255),t.adler=0,o.status=wt)):o.status=wt),0!==o.pending){if(s(t),0===t.avail_out)return o.last_flush=-1,H}else if(0===t.avail_in&&n(e)<=n(a)&&e!==F)return i(t,P);if(o.status===pt&&0!==t.avail_in)return i(t,P);if(0!==t.avail_in||0!==o.lookahead||e!==I&&o.status!==pt){var c=o.strategy===G?m(o,e):o.strategy===X?g(o,e):Z[o.level].func(o,e);if(c!==yt&&c!==xt||(o.status=pt),c===vt||c===yt)return 0===t.avail_out&&(o.last_flush=-1),H;if(c===kt&&(e===U?C._tr_align(o):e!==L&&(C._tr_stored_block(o,0,0,!1),e===T&&(r(o.head),0===o.lookahead&&(o.strstart=0,o.block_start=0,o.insert=0))),s(t),0===t.avail_out))return o.last_flush=-1,H}return e!==F?H:o.wrap<=0?j:(2===o.wrap?(l(o,255&t.adler),l(o,t.adler>>8&255),l(o,t.adler>>16&255),l(o,t.adler>>24&255),l(o,255&t.total_in),l(o,t.total_in>>8&255),l(o,t.total_in>>16&255),l(o,t.total_in>>24&255)):(h(o,t.adler>>>16),h(o,65535&t.adler)),s(t),o.wrap>0&&(o.wrap=-o.wrap),0!==o.pending?H:j)}function E(t){var e;return t&&t.state?(e=t.state.status,e!==ut&&e!==ct&&e!==bt&&e!==gt&&e!==mt&&e!==wt&&e!==pt?i(t,K):(t.state=null,e===wt?i(t,M):H)):K}function A(t,e){var a,i,n,s,o,l,h,d,f=e.length;if(!t||!t.state)return K;if(a=t.state,s=a.wrap,2===s||1===s&&a.status!==ut||a.lookahead)return K;for(1===s&&(t.adler=N(t.adler,e,f,0)),a.wrap=0,f>=a.w_size&&(0===s&&(r(a.head),a.strstart=0,a.block_start=0,a.insert=0),d=new R.Buf8(a.w_size),R.arraySet(d,e,f-a.w_size,a.w_size,0),e=d,f=a.w_size),o=t.avail_in,l=t.next_in,h=t.input,t.avail_in=f,t.next_in=0,t.input=e,_(a);a.lookahead>=ht;){i=a.strstart,n=a.lookahead-(ht-1);do a.ins_h=(a.ins_h<<a.hash_shift^a.window[i+ht-1])&a.hash_mask,a.prev[i&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=i,i++;while(--n);a.strstart=i,a.lookahead=ht-1,_(a)}return a.strstart+=a.lookahead,a.block_start=a.strstart,a.insert=a.lookahead,a.lookahead=0,a.match_length=a.prev_length=ht-1,a.match_available=0,t.next_in=l,t.input=h,t.avail_in=o,a.wrap=s,H}var Z,R=t("../utils/common"),C=t("./trees"),N=t("./adler32"),O=t("./crc32"),D=t("./messages"),I=0,U=1,T=3,F=4,L=5,H=0,j=1,K=-2,M=-3,P=-5,Y=-1,q=1,G=2,X=3,W=4,J=0,Q=2,V=8,$=9,tt=15,et=8,at=29,it=256,nt=it+1+at,rt=30,st=19,ot=2*nt+1,lt=15,ht=3,dt=258,ft=dt+ht+1,_t=32,ut=42,ct=69,bt=73,gt=91,mt=103,wt=113,pt=666,vt=1,kt=2,yt=3,xt=4,zt=3;Z=[new w(0,0,0,0,u),new w(4,4,8,4,c),new w(4,5,16,8,c),new w(4,6,32,32,c),new w(4,4,16,16,b),new w(8,16,32,32,b),new w(8,16,128,128,b),new w(8,32,128,256,b),new w(32,128,258,1024,b),new w(32,258,258,4096,b)],a.deflateInit=B,a.deflateInit2=z,a.deflateReset=y,a.deflateResetKeep=k,a.deflateSetHeader=x,a.deflate=S,a.deflateEnd=E,a.deflateSetDictionary=A,a.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":3,"./adler32":5,"./crc32":7,"./messages":13,"./trees":14}],9:[function(t,e,a){"use strict";function i(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}e.exports=i},{}],10:[function(t,e,a){"use strict";var i=30,n=12;e.exports=function(t,e){var a,r,s,o,l,h,d,f,_,u,c,b,g,m,w,p,v,k,y,x,z,B,S,E,A;a=t.state,r=t.next_in,E=t.input,s=r+(t.avail_in-5),o=t.next_out,A=t.output,l=o-(e-t.avail_out),h=o+(t.avail_out-257),d=a.dmax,f=a.wsize,_=a.whave,u=a.wnext,c=a.window,b=a.hold,g=a.bits,m=a.lencode,w=a.distcode,p=(1<<a.lenbits)-1,v=(1<<a.distbits)-1;t:do{g<15&&(b+=E[r++]<<g,g+=8,b+=E[r++]<<g,g+=8),k=m[b&p];e:for(;;){if(y=k>>>24,b>>>=y,g-=y,y=k>>>16&255,0===y)A[o++]=65535&k;else{if(!(16&y)){if(0===(64&y)){k=m[(65535&k)+(b&(1<<y)-1)];continue e}if(32&y){a.mode=n;break t}t.msg="invalid literal/length code",a.mode=i;break t}x=65535&k,y&=15,y&&(g<y&&(b+=E[r++]<<g,g+=8),x+=b&(1<<y)-1,b>>>=y,g-=y),g<15&&(b+=E[r++]<<g,g+=8,b+=E[r++]<<g,g+=8),k=w[b&v];a:for(;;){if(y=k>>>24,b>>>=y,g-=y,y=k>>>16&255,!(16&y)){if(0===(64&y)){k=w[(65535&k)+(b&(1<<y)-1)];continue a}t.msg="invalid distance code",a.mode=i;break t}if(z=65535&k,y&=15,g<y&&(b+=E[r++]<<g,g+=8,g<y&&(b+=E[r++]<<g,g+=8)),z+=b&(1<<y)-1,z>d){t.msg="invalid distance too far back",a.mode=i;break t}if(b>>>=y,g-=y,y=o-l,z>y){if(y=z-y,y>_&&a.sane){t.msg="invalid distance too far back",a.mode=i;break t}if(B=0,S=c,0===u){if(B+=f-y,y<x){x-=y;do A[o++]=c[B++];while(--y);B=o-z,S=A}}else if(u<y){if(B+=f+u-y,y-=u,y<x){x-=y;do A[o++]=c[B++];while(--y);if(B=0,u<x){y=u,x-=y;do A[o++]=c[B++];while(--y);B=o-z,S=A}}}else if(B+=u-y,y<x){x-=y;do A[o++]=c[B++];while(--y);B=o-z,S=A}for(;x>2;)A[o++]=S[B++],A[o++]=S[B++],A[o++]=S[B++],x-=3;x&&(A[o++]=S[B++],x>1&&(A[o++]=S[B++]))}else{B=o-z;do A[o++]=A[B++],A[o++]=A[B++],A[o++]=A[B++],x-=3;while(x>2);x&&(A[o++]=A[B++],x>1&&(A[o++]=A[B++]))}break}}break}}while(r<s&&o<h);x=g>>3,r-=x,g-=x<<3,b&=(1<<g)-1,t.next_in=r,t.next_out=o,t.avail_in=r<s?5+(s-r):5-(r-s),t.avail_out=o<h?257+(h-o):257-(o-h),a.hold=b,a.bits=g}},{}],11:[function(t,e,a){"use strict";function i(t){return(t>>>24&255)+(t>>>8&65280)+((65280&t)<<8)+((255&t)<<24)}function n(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new w.Buf16(320),this.work=new w.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function r(t){var e;return t&&t.state?(e=t.state,t.total_in=t.total_out=e.total=0,t.msg="",e.wrap&&(t.adler=1&e.wrap),e.mode=T,e.last=0,e.havedict=0,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new w.Buf32(bt),e.distcode=e.distdyn=new w.Buf32(gt),e.sane=1,e.back=-1,Z):N}function s(t){var e;return t&&t.state?(e=t.state,e.wsize=0,e.whave=0,e.wnext=0,r(t)):N}function o(t,e){var a,i;return t&&t.state?(i=t.state,e<0?(a=0,e=-e):(a=(e>>4)+1,e<48&&(e&=15)),e&&(e<8||e>15)?N:(null!==i.window&&i.wbits!==e&&(i.window=null),i.wrap=a,i.wbits=e,s(t))):N}function l(t,e){var a,i;return t?(i=new n,t.state=i,i.window=null,a=o(t,e),a!==Z&&(t.state=null),a):N}function h(t){return l(t,wt)}function d(t){if(pt){var e;for(g=new w.Buf32(512),m=new w.Buf32(32),e=0;e<144;)t.lens[e++]=8;for(;e<256;)t.lens[e++]=9;for(;e<280;)t.lens[e++]=7;for(;e<288;)t.lens[e++]=8;for(y(z,t.lens,0,288,g,0,t.work,{bits:9}),e=0;e<32;)t.lens[e++]=5;y(B,t.lens,0,32,m,0,t.work,{bits:5}),pt=!1}t.lencode=g,t.lenbits=9,t.distcode=m,t.distbits=5}function f(t,e,a,i){var n,r=t.state;return null===r.window&&(r.wsize=1<<r.wbits,r.wnext=0,r.whave=0,r.window=new w.Buf8(r.wsize)),i>=r.wsize?(w.arraySet(r.window,e,a-r.wsize,r.wsize,0),r.wnext=0,r.whave=r.wsize):(n=r.wsize-r.wnext,n>i&&(n=i),w.arraySet(r.window,e,a-i,n,r.wnext),i-=n,i?(w.arraySet(r.window,e,a-i,i,0),r.wnext=i,r.whave=r.wsize):(r.wnext+=n,r.wnext===r.wsize&&(r.wnext=0),r.whave<r.wsize&&(r.whave+=n))),0}function _(t,e){var a,n,r,s,o,l,h,_,u,c,b,g,m,bt,gt,mt,wt,pt,vt,kt,yt,xt,zt,Bt,St=0,Et=new w.Buf8(4),At=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!t||!t.state||!t.output||!t.input&&0!==t.avail_in)return N;a=t.state,a.mode===X&&(a.mode=W),o=t.next_out,r=t.output,h=t.avail_out,s=t.next_in,n=t.input,l=t.avail_in,_=a.hold,u=a.bits,c=l,b=h,xt=Z;t:for(;;)switch(a.mode){case T:if(0===a.wrap){a.mode=W;break}for(;u<16;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(2&a.wrap&&35615===_){a.check=0,Et[0]=255&_,Et[1]=_>>>8&255,a.check=v(a.check,Et,2,0),_=0,u=0,a.mode=F;break}if(a.flags=0,a.head&&(a.head.done=!1),!(1&a.wrap)||(((255&_)<<8)+(_>>8))%31){t.msg="incorrect header check",a.mode=_t;break}if((15&_)!==U){t.msg="unknown compression method",a.mode=_t;break}if(_>>>=4,u-=4,yt=(15&_)+8,0===a.wbits)a.wbits=yt;else if(yt>a.wbits){t.msg="invalid window size",a.mode=_t;break}a.dmax=1<<yt,t.adler=a.check=1,a.mode=512&_?q:X,_=0,u=0;break;case F:for(;u<16;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(a.flags=_,(255&a.flags)!==U){t.msg="unknown compression method",a.mode=_t;break}if(57344&a.flags){t.msg="unknown header flags set",a.mode=_t;break}a.head&&(a.head.text=_>>8&1),512&a.flags&&(Et[0]=255&_,Et[1]=_>>>8&255,a.check=v(a.check,Et,2,0)),_=0,u=0,a.mode=L;case L:for(;u<32;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.head&&(a.head.time=_),512&a.flags&&(Et[0]=255&_,Et[1]=_>>>8&255,Et[2]=_>>>16&255,Et[3]=_>>>24&255,a.check=v(a.check,Et,4,0)),_=0,u=0,a.mode=H;case H:for(;u<16;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.head&&(a.head.xflags=255&_,a.head.os=_>>8),512&a.flags&&(Et[0]=255&_,Et[1]=_>>>8&255,a.check=v(a.check,Et,2,0)),_=0,u=0,a.mode=j;case j:if(1024&a.flags){for(;u<16;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.length=_,a.head&&(a.head.extra_len=_),512&a.flags&&(Et[0]=255&_,Et[1]=_>>>8&255,a.check=v(a.check,Et,2,0)),_=0,u=0}else a.head&&(a.head.extra=null);a.mode=K;case K:if(1024&a.flags&&(g=a.length,g>l&&(g=l),g&&(a.head&&(yt=a.head.extra_len-a.length,a.head.extra||(a.head.extra=new Array(a.head.extra_len)),w.arraySet(a.head.extra,n,s,g,yt)),512&a.flags&&(a.check=v(a.check,n,g,s)),l-=g,s+=g,a.length-=g),a.length))break t;a.length=0,a.mode=M;case M:if(2048&a.flags){if(0===l)break t;g=0;do yt=n[s+g++],a.head&&yt&&a.length<65536&&(a.head.name+=String.fromCharCode(yt));while(yt&&g<l);if(512&a.flags&&(a.check=v(a.check,n,g,s)),l-=g,s+=g,yt)break t}else a.head&&(a.head.name=null);a.length=0,a.mode=P;case P:if(4096&a.flags){if(0===l)break t;g=0;do yt=n[s+g++],a.head&&yt&&a.length<65536&&(a.head.comment+=String.fromCharCode(yt));while(yt&&g<l);if(512&a.flags&&(a.check=v(a.check,n,g,s)),l-=g,s+=g,yt)break t}else a.head&&(a.head.comment=null);a.mode=Y;case Y:if(512&a.flags){for(;u<16;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(_!==(65535&a.check)){t.msg="header crc mismatch",a.mode=_t;break}_=0,u=0}a.head&&(a.head.hcrc=a.flags>>9&1,a.head.done=!0),t.adler=a.check=0,a.mode=X;break;case q:for(;u<32;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}t.adler=a.check=i(_),_=0,u=0,a.mode=G;case G:if(0===a.havedict)return t.next_out=o,t.avail_out=h,t.next_in=s,t.avail_in=l,a.hold=_,a.bits=u,C;t.adler=a.check=1,a.mode=X;case X:if(e===E||e===A)break t;case W:if(a.last){_>>>=7&u,u-=7&u,a.mode=ht;break}for(;u<3;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}switch(a.last=1&_,_>>>=1,u-=1,3&_){case 0:a.mode=J;break;case 1:if(d(a),a.mode=at,e===A){_>>>=2,u-=2;break t}break;case 2:a.mode=$;break;case 3:t.msg="invalid block type",a.mode=_t}_>>>=2,u-=2;break;case J:for(_>>>=7&u,u-=7&u;u<32;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if((65535&_)!==(_>>>16^65535)){t.msg="invalid stored block lengths",a.mode=_t;break}if(a.length=65535&_,_=0,u=0,a.mode=Q,e===A)break t;case Q:a.mode=V;case V:if(g=a.length){if(g>l&&(g=l),g>h&&(g=h),0===g)break t;w.arraySet(r,n,s,g,o),l-=g,s+=g,h-=g,o+=g,a.length-=g;break}a.mode=X;break;case $:
for(;u<14;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(a.nlen=(31&_)+257,_>>>=5,u-=5,a.ndist=(31&_)+1,_>>>=5,u-=5,a.ncode=(15&_)+4,_>>>=4,u-=4,a.nlen>286||a.ndist>30){t.msg="too many length or distance symbols",a.mode=_t;break}a.have=0,a.mode=tt;case tt:for(;a.have<a.ncode;){for(;u<3;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.lens[At[a.have++]]=7&_,_>>>=3,u-=3}for(;a.have<19;)a.lens[At[a.have++]]=0;if(a.lencode=a.lendyn,a.lenbits=7,zt={bits:a.lenbits},xt=y(x,a.lens,0,19,a.lencode,0,a.work,zt),a.lenbits=zt.bits,xt){t.msg="invalid code lengths set",a.mode=_t;break}a.have=0,a.mode=et;case et:for(;a.have<a.nlen+a.ndist;){for(;St=a.lencode[_&(1<<a.lenbits)-1],gt=St>>>24,mt=St>>>16&255,wt=65535&St,!(gt<=u);){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(wt<16)_>>>=gt,u-=gt,a.lens[a.have++]=wt;else{if(16===wt){for(Bt=gt+2;u<Bt;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(_>>>=gt,u-=gt,0===a.have){t.msg="invalid bit length repeat",a.mode=_t;break}yt=a.lens[a.have-1],g=3+(3&_),_>>>=2,u-=2}else if(17===wt){for(Bt=gt+3;u<Bt;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}_>>>=gt,u-=gt,yt=0,g=3+(7&_),_>>>=3,u-=3}else{for(Bt=gt+7;u<Bt;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}_>>>=gt,u-=gt,yt=0,g=11+(127&_),_>>>=7,u-=7}if(a.have+g>a.nlen+a.ndist){t.msg="invalid bit length repeat",a.mode=_t;break}for(;g--;)a.lens[a.have++]=yt}}if(a.mode===_t)break;if(0===a.lens[256]){t.msg="invalid code -- missing end-of-block",a.mode=_t;break}if(a.lenbits=9,zt={bits:a.lenbits},xt=y(z,a.lens,0,a.nlen,a.lencode,0,a.work,zt),a.lenbits=zt.bits,xt){t.msg="invalid literal/lengths set",a.mode=_t;break}if(a.distbits=6,a.distcode=a.distdyn,zt={bits:a.distbits},xt=y(B,a.lens,a.nlen,a.ndist,a.distcode,0,a.work,zt),a.distbits=zt.bits,xt){t.msg="invalid distances set",a.mode=_t;break}if(a.mode=at,e===A)break t;case at:a.mode=it;case it:if(l>=6&&h>=258){t.next_out=o,t.avail_out=h,t.next_in=s,t.avail_in=l,a.hold=_,a.bits=u,k(t,b),o=t.next_out,r=t.output,h=t.avail_out,s=t.next_in,n=t.input,l=t.avail_in,_=a.hold,u=a.bits,a.mode===X&&(a.back=-1);break}for(a.back=0;St=a.lencode[_&(1<<a.lenbits)-1],gt=St>>>24,mt=St>>>16&255,wt=65535&St,!(gt<=u);){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(mt&&0===(240&mt)){for(pt=gt,vt=mt,kt=wt;St=a.lencode[kt+((_&(1<<pt+vt)-1)>>pt)],gt=St>>>24,mt=St>>>16&255,wt=65535&St,!(pt+gt<=u);){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}_>>>=pt,u-=pt,a.back+=pt}if(_>>>=gt,u-=gt,a.back+=gt,a.length=wt,0===mt){a.mode=lt;break}if(32&mt){a.back=-1,a.mode=X;break}if(64&mt){t.msg="invalid literal/length code",a.mode=_t;break}a.extra=15&mt,a.mode=nt;case nt:if(a.extra){for(Bt=a.extra;u<Bt;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.length+=_&(1<<a.extra)-1,_>>>=a.extra,u-=a.extra,a.back+=a.extra}a.was=a.length,a.mode=rt;case rt:for(;St=a.distcode[_&(1<<a.distbits)-1],gt=St>>>24,mt=St>>>16&255,wt=65535&St,!(gt<=u);){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(0===(240&mt)){for(pt=gt,vt=mt,kt=wt;St=a.distcode[kt+((_&(1<<pt+vt)-1)>>pt)],gt=St>>>24,mt=St>>>16&255,wt=65535&St,!(pt+gt<=u);){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}_>>>=pt,u-=pt,a.back+=pt}if(_>>>=gt,u-=gt,a.back+=gt,64&mt){t.msg="invalid distance code",a.mode=_t;break}a.offset=wt,a.extra=15&mt,a.mode=st;case st:if(a.extra){for(Bt=a.extra;u<Bt;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.offset+=_&(1<<a.extra)-1,_>>>=a.extra,u-=a.extra,a.back+=a.extra}if(a.offset>a.dmax){t.msg="invalid distance too far back",a.mode=_t;break}a.mode=ot;case ot:if(0===h)break t;if(g=b-h,a.offset>g){if(g=a.offset-g,g>a.whave&&a.sane){t.msg="invalid distance too far back",a.mode=_t;break}g>a.wnext?(g-=a.wnext,m=a.wsize-g):m=a.wnext-g,g>a.length&&(g=a.length),bt=a.window}else bt=r,m=o-a.offset,g=a.length;g>h&&(g=h),h-=g,a.length-=g;do r[o++]=bt[m++];while(--g);0===a.length&&(a.mode=it);break;case lt:if(0===h)break t;r[o++]=a.length,h--,a.mode=it;break;case ht:if(a.wrap){for(;u<32;){if(0===l)break t;l--,_|=n[s++]<<u,u+=8}if(b-=h,t.total_out+=b,a.total+=b,b&&(t.adler=a.check=a.flags?v(a.check,r,b,o-b):p(a.check,r,b,o-b)),b=h,(a.flags?_:i(_))!==a.check){t.msg="incorrect data check",a.mode=_t;break}_=0,u=0}a.mode=dt;case dt:if(a.wrap&&a.flags){for(;u<32;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(_!==(4294967295&a.total)){t.msg="incorrect length check",a.mode=_t;break}_=0,u=0}a.mode=ft;case ft:xt=R;break t;case _t:xt=O;break t;case ut:return D;case ct:default:return N}return t.next_out=o,t.avail_out=h,t.next_in=s,t.avail_in=l,a.hold=_,a.bits=u,(a.wsize||b!==t.avail_out&&a.mode<_t&&(a.mode<ht||e!==S))&&f(t,t.output,t.next_out,b-t.avail_out)?(a.mode=ut,D):(c-=t.avail_in,b-=t.avail_out,t.total_in+=c,t.total_out+=b,a.total+=b,a.wrap&&b&&(t.adler=a.check=a.flags?v(a.check,r,b,t.next_out-b):p(a.check,r,b,t.next_out-b)),t.data_type=a.bits+(a.last?64:0)+(a.mode===X?128:0)+(a.mode===at||a.mode===Q?256:0),(0===c&&0===b||e===S)&&xt===Z&&(xt=I),xt)}function u(t){if(!t||!t.state)return N;var e=t.state;return e.window&&(e.window=null),t.state=null,Z}function c(t,e){var a;return t&&t.state?(a=t.state,0===(2&a.wrap)?N:(a.head=e,e.done=!1,Z)):N}function b(t,e){var a,i,n,r=e.length;return t&&t.state?(a=t.state,0!==a.wrap&&a.mode!==G?N:a.mode===G&&(i=1,i=p(i,e,r,0),i!==a.check)?O:(n=f(t,e,r,r))?(a.mode=ut,D):(a.havedict=1,Z)):N}var g,m,w=t("../utils/common"),p=t("./adler32"),v=t("./crc32"),k=t("./inffast"),y=t("./inftrees"),x=0,z=1,B=2,S=4,E=5,A=6,Z=0,R=1,C=2,N=-2,O=-3,D=-4,I=-5,U=8,T=1,F=2,L=3,H=4,j=5,K=6,M=7,P=8,Y=9,q=10,G=11,X=12,W=13,J=14,Q=15,V=16,$=17,tt=18,et=19,at=20,it=21,nt=22,rt=23,st=24,ot=25,lt=26,ht=27,dt=28,ft=29,_t=30,ut=31,ct=32,bt=852,gt=592,mt=15,wt=mt,pt=!0;a.inflateReset=s,a.inflateReset2=o,a.inflateResetKeep=r,a.inflateInit=h,a.inflateInit2=l,a.inflate=_,a.inflateEnd=u,a.inflateGetHeader=c,a.inflateSetDictionary=b,a.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":3,"./adler32":5,"./crc32":7,"./inffast":10,"./inftrees":12}],12:[function(t,e,a){"use strict";var i=t("../utils/common"),n=15,r=852,s=592,o=0,l=1,h=2,d=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],f=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],_=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],u=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];e.exports=function(t,e,a,c,b,g,m,w){var p,v,k,y,x,z,B,S,E,A=w.bits,Z=0,R=0,C=0,N=0,O=0,D=0,I=0,U=0,T=0,F=0,L=null,H=0,j=new i.Buf16(n+1),K=new i.Buf16(n+1),M=null,P=0;for(Z=0;Z<=n;Z++)j[Z]=0;for(R=0;R<c;R++)j[e[a+R]]++;for(O=A,N=n;N>=1&&0===j[N];N--);if(O>N&&(O=N),0===N)return b[g++]=20971520,b[g++]=20971520,w.bits=1,0;for(C=1;C<N&&0===j[C];C++);for(O<C&&(O=C),U=1,Z=1;Z<=n;Z++)if(U<<=1,U-=j[Z],U<0)return-1;if(U>0&&(t===o||1!==N))return-1;for(K[1]=0,Z=1;Z<n;Z++)K[Z+1]=K[Z]+j[Z];for(R=0;R<c;R++)0!==e[a+R]&&(m[K[e[a+R]]++]=R);if(t===o?(L=M=m,z=19):t===l?(L=d,H-=257,M=f,P-=257,z=256):(L=_,M=u,z=-1),F=0,R=0,Z=C,x=g,D=O,I=0,k=-1,T=1<<O,y=T-1,t===l&&T>r||t===h&&T>s)return 1;for(;;){B=Z-I,m[R]<z?(S=0,E=m[R]):m[R]>z?(S=M[P+m[R]],E=L[H+m[R]]):(S=96,E=0),p=1<<Z-I,v=1<<D,C=v;do v-=p,b[x+(F>>I)+v]=B<<24|S<<16|E|0;while(0!==v);for(p=1<<Z-1;F&p;)p>>=1;if(0!==p?(F&=p-1,F+=p):F=0,R++,0===--j[Z]){if(Z===N)break;Z=e[a+m[R]]}if(Z>O&&(F&y)!==k){for(0===I&&(I=O),x+=C,D=Z-I,U=1<<D;D+I<N&&(U-=j[D+I],!(U<=0));)D++,U<<=1;if(T+=1<<D,t===l&&T>r||t===h&&T>s)return 1;k=F&y,b[k]=O<<24|D<<16|x-g|0}}return 0!==F&&(b[x+F]=Z-I<<24|64<<16|0),w.bits=O,0}},{"../utils/common":3}],13:[function(t,e,a){"use strict";e.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],14:[function(t,e,a){"use strict";function i(t){for(var e=t.length;--e>=0;)t[e]=0}function n(t,e,a,i,n){this.static_tree=t,this.extra_bits=e,this.extra_base=a,this.elems=i,this.max_length=n,this.has_stree=t&&t.length}function r(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}function s(t){return t<256?lt[t]:lt[256+(t>>>7)]}function o(t,e){t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255}function l(t,e,a){t.bi_valid>W-a?(t.bi_buf|=e<<t.bi_valid&65535,o(t,t.bi_buf),t.bi_buf=e>>W-t.bi_valid,t.bi_valid+=a-W):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=a)}function h(t,e,a){l(t,a[2*e],a[2*e+1])}function d(t,e){var a=0;do a|=1&t,t>>>=1,a<<=1;while(--e>0);return a>>>1}function f(t){16===t.bi_valid?(o(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)}function _(t,e){var a,i,n,r,s,o,l=e.dyn_tree,h=e.max_code,d=e.stat_desc.static_tree,f=e.stat_desc.has_stree,_=e.stat_desc.extra_bits,u=e.stat_desc.extra_base,c=e.stat_desc.max_length,b=0;for(r=0;r<=X;r++)t.bl_count[r]=0;for(l[2*t.heap[t.heap_max]+1]=0,a=t.heap_max+1;a<G;a++)i=t.heap[a],r=l[2*l[2*i+1]+1]+1,r>c&&(r=c,b++),l[2*i+1]=r,i>h||(t.bl_count[r]++,s=0,i>=u&&(s=_[i-u]),o=l[2*i],t.opt_len+=o*(r+s),f&&(t.static_len+=o*(d[2*i+1]+s)));if(0!==b){do{for(r=c-1;0===t.bl_count[r];)r--;t.bl_count[r]--,t.bl_count[r+1]+=2,t.bl_count[c]--,b-=2}while(b>0);for(r=c;0!==r;r--)for(i=t.bl_count[r];0!==i;)n=t.heap[--a],n>h||(l[2*n+1]!==r&&(t.opt_len+=(r-l[2*n+1])*l[2*n],l[2*n+1]=r),i--)}}function u(t,e,a){var i,n,r=new Array(X+1),s=0;for(i=1;i<=X;i++)r[i]=s=s+a[i-1]<<1;for(n=0;n<=e;n++){var o=t[2*n+1];0!==o&&(t[2*n]=d(r[o]++,o))}}function c(){var t,e,a,i,r,s=new Array(X+1);for(a=0,i=0;i<K-1;i++)for(dt[i]=a,t=0;t<1<<et[i];t++)ht[a++]=i;for(ht[a-1]=i,r=0,i=0;i<16;i++)for(ft[i]=r,t=0;t<1<<at[i];t++)lt[r++]=i;for(r>>=7;i<Y;i++)for(ft[i]=r<<7,t=0;t<1<<at[i]-7;t++)lt[256+r++]=i;for(e=0;e<=X;e++)s[e]=0;for(t=0;t<=143;)st[2*t+1]=8,t++,s[8]++;for(;t<=255;)st[2*t+1]=9,t++,s[9]++;for(;t<=279;)st[2*t+1]=7,t++,s[7]++;for(;t<=287;)st[2*t+1]=8,t++,s[8]++;for(u(st,P+1,s),t=0;t<Y;t++)ot[2*t+1]=5,ot[2*t]=d(t,5);_t=new n(st,et,M+1,P,X),ut=new n(ot,at,0,Y,X),ct=new n(new Array(0),it,0,q,J)}function b(t){var e;for(e=0;e<P;e++)t.dyn_ltree[2*e]=0;for(e=0;e<Y;e++)t.dyn_dtree[2*e]=0;for(e=0;e<q;e++)t.bl_tree[2*e]=0;t.dyn_ltree[2*Q]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0}function g(t){t.bi_valid>8?o(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0}function m(t,e,a,i){g(t),i&&(o(t,a),o(t,~a)),N.arraySet(t.pending_buf,t.window,e,a,t.pending),t.pending+=a}function w(t,e,a,i){var n=2*e,r=2*a;return t[n]<t[r]||t[n]===t[r]&&i[e]<=i[a]}function p(t,e,a){for(var i=t.heap[a],n=a<<1;n<=t.heap_len&&(n<t.heap_len&&w(e,t.heap[n+1],t.heap[n],t.depth)&&n++,!w(e,i,t.heap[n],t.depth));)t.heap[a]=t.heap[n],a=n,n<<=1;t.heap[a]=i}function v(t,e,a){var i,n,r,o,d=0;if(0!==t.last_lit)do i=t.pending_buf[t.d_buf+2*d]<<8|t.pending_buf[t.d_buf+2*d+1],n=t.pending_buf[t.l_buf+d],d++,0===i?h(t,n,e):(r=ht[n],h(t,r+M+1,e),o=et[r],0!==o&&(n-=dt[r],l(t,n,o)),i--,r=s(i),h(t,r,a),o=at[r],0!==o&&(i-=ft[r],l(t,i,o)));while(d<t.last_lit);h(t,Q,e)}function k(t,e){var a,i,n,r=e.dyn_tree,s=e.stat_desc.static_tree,o=e.stat_desc.has_stree,l=e.stat_desc.elems,h=-1;for(t.heap_len=0,t.heap_max=G,a=0;a<l;a++)0!==r[2*a]?(t.heap[++t.heap_len]=h=a,t.depth[a]=0):r[2*a+1]=0;for(;t.heap_len<2;)n=t.heap[++t.heap_len]=h<2?++h:0,r[2*n]=1,t.depth[n]=0,t.opt_len--,o&&(t.static_len-=s[2*n+1]);for(e.max_code=h,a=t.heap_len>>1;a>=1;a--)p(t,r,a);n=l;do a=t.heap[1],t.heap[1]=t.heap[t.heap_len--],p(t,r,1),i=t.heap[1],t.heap[--t.heap_max]=a,t.heap[--t.heap_max]=i,r[2*n]=r[2*a]+r[2*i],t.depth[n]=(t.depth[a]>=t.depth[i]?t.depth[a]:t.depth[i])+1,r[2*a+1]=r[2*i+1]=n,t.heap[1]=n++,p(t,r,1);while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],_(t,e),u(r,h,t.bl_count)}function y(t,e,a){var i,n,r=-1,s=e[1],o=0,l=7,h=4;for(0===s&&(l=138,h=3),e[2*(a+1)+1]=65535,i=0;i<=a;i++)n=s,s=e[2*(i+1)+1],++o<l&&n===s||(o<h?t.bl_tree[2*n]+=o:0!==n?(n!==r&&t.bl_tree[2*n]++,t.bl_tree[2*V]++):o<=10?t.bl_tree[2*$]++:t.bl_tree[2*tt]++,o=0,r=n,0===s?(l=138,h=3):n===s?(l=6,h=3):(l=7,h=4))}function x(t,e,a){var i,n,r=-1,s=e[1],o=0,d=7,f=4;for(0===s&&(d=138,f=3),i=0;i<=a;i++)if(n=s,s=e[2*(i+1)+1],!(++o<d&&n===s)){if(o<f){do h(t,n,t.bl_tree);while(0!==--o)}else 0!==n?(n!==r&&(h(t,n,t.bl_tree),o--),h(t,V,t.bl_tree),l(t,o-3,2)):o<=10?(h(t,$,t.bl_tree),l(t,o-3,3)):(h(t,tt,t.bl_tree),l(t,o-11,7));o=0,r=n,0===s?(d=138,f=3):n===s?(d=6,f=3):(d=7,f=4)}}function z(t){var e;for(y(t,t.dyn_ltree,t.l_desc.max_code),y(t,t.dyn_dtree,t.d_desc.max_code),k(t,t.bl_desc),e=q-1;e>=3&&0===t.bl_tree[2*nt[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e}function B(t,e,a,i){var n;for(l(t,e-257,5),l(t,a-1,5),l(t,i-4,4),n=0;n<i;n++)l(t,t.bl_tree[2*nt[n]+1],3);x(t,t.dyn_ltree,e-1),x(t,t.dyn_dtree,a-1)}function S(t){var e,a=4093624447;for(e=0;e<=31;e++,a>>>=1)if(1&a&&0!==t.dyn_ltree[2*e])return D;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return I;for(e=32;e<M;e++)if(0!==t.dyn_ltree[2*e])return I;return D}function E(t){bt||(c(),bt=!0),t.l_desc=new r(t.dyn_ltree,_t),t.d_desc=new r(t.dyn_dtree,ut),t.bl_desc=new r(t.bl_tree,ct),t.bi_buf=0,t.bi_valid=0,b(t)}function A(t,e,a,i){l(t,(T<<1)+(i?1:0),3),m(t,e,a,!0)}function Z(t){l(t,F<<1,3),h(t,Q,st),f(t)}function R(t,e,a,i){var n,r,s=0;t.level>0?(t.strm.data_type===U&&(t.strm.data_type=S(t)),k(t,t.l_desc),k(t,t.d_desc),s=z(t),n=t.opt_len+3+7>>>3,r=t.static_len+3+7>>>3,r<=n&&(n=r)):n=r=a+5,a+4<=n&&e!==-1?A(t,e,a,i):t.strategy===O||r===n?(l(t,(F<<1)+(i?1:0),3),v(t,st,ot)):(l(t,(L<<1)+(i?1:0),3),B(t,t.l_desc.max_code+1,t.d_desc.max_code+1,s+1),v(t,t.dyn_ltree,t.dyn_dtree)),b(t),i&&g(t)}function C(t,e,a){return t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&a,t.last_lit++,0===e?t.dyn_ltree[2*a]++:(t.matches++,e--,t.dyn_ltree[2*(ht[a]+M+1)]++,t.dyn_dtree[2*s(e)]++),t.last_lit===t.lit_bufsize-1}var N=t("../utils/common"),O=4,D=0,I=1,U=2,T=0,F=1,L=2,H=3,j=258,K=29,M=256,P=M+1+K,Y=30,q=19,G=2*P+1,X=15,W=16,J=7,Q=256,V=16,$=17,tt=18,et=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],at=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],it=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],nt=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],rt=512,st=new Array(2*(P+2));i(st);var ot=new Array(2*Y);i(ot);var lt=new Array(rt);i(lt);var ht=new Array(j-H+1);i(ht);var dt=new Array(K);i(dt);var ft=new Array(Y);i(ft);var _t,ut,ct,bt=!1;a._tr_init=E,a._tr_stored_block=A,a._tr_flush_block=R,a._tr_tally=C,a._tr_align=Z},{"../utils/common":3}],15:[function(t,e,a){"use strict";function i(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}e.exports=i},{}],"/":[function(t,e,a){"use strict";var i=t("./lib/utils/common").assign,n=t("./lib/deflate"),r=t("./lib/inflate"),s=t("./lib/zlib/constants"),o={};i(o,n,r,s),e.exports=o},{"./lib/deflate":1,"./lib/inflate":2,"./lib/utils/common":3,"./lib/zlib/constants":6}]},{},[])("/")});
/**
 * @license
 * Copyright 2015 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var PDFJS;

(function(PDFJS) {
    "use strict";
	
var JpegError = (function JpegErrorClosure() {
  function JpegError(msg) {
    this.message = 'JPEG error: ' + msg;
  }

  JpegError.prototype = new Error();
  JpegError.prototype.name = 'JpegError';
  JpegError.constructor = JpegError;

  return JpegError;
})();
	
	var JpegImage = (function JpegImageClosure() {
  // prettier-ignore
  var dctZigZag = new Uint8Array([
     0,
     1,  8,
    16,  9,  2,
     3, 10, 17, 24,
    32, 25, 18, 11, 4,
     5, 12, 19, 26, 33, 40,
    48, 41, 34, 27, 20, 13,  6,
     7, 14, 21, 28, 35, 42, 49, 56,
    57, 50, 43, 36, 29, 22, 15,
    23, 30, 37, 44, 51, 58,
    59, 52, 45, 38, 31,
    39, 46, 53, 60,
    61, 54, 47,
    55, 62,
    63
  ]);

  var dctCos1 = 4017; // cos(pi/16)
  var dctSin1 = 799; // sin(pi/16)
  var dctCos3 = 3406; // cos(3*pi/16)
  var dctSin3 = 2276; // sin(3*pi/16)
  var dctCos6 = 1567; // cos(6*pi/16)
  var dctSin6 = 3784; // sin(6*pi/16)
  var dctSqrt2 = 5793; // sqrt(2)
  var dctSqrt1d2 = 2896; // sqrt(2) / 2

  // eslint-disable-next-line no-shadow
  function JpegImage({ decodeTransform = null, colorTransform = -1 } = {}) {
    this._decodeTransform = decodeTransform;
    this._colorTransform = colorTransform;
  }

  function buildHuffmanTable(codeLengths, values) {
    var k = 0,
      code = [],
      i,
      j,
      length = 16;
    while (length > 0 && !codeLengths[length - 1]) {
      length--;
    }
    code.push({ children: [], index: 0 });
    var p = code[0],
      q;
    for (i = 0; i < length; i++) {
      for (j = 0; j < codeLengths[i]; j++) {
        p = code.pop();
        p.children[p.index] = values[k];
        while (p.index > 0) {
          p = code.pop();
        }
        p.index++;
        code.push(p);
        while (code.length <= i) {
          code.push((q = { children: [], index: 0 }));
          p.children[p.index] = q.children;
          p = q;
        }
        k++;
      }
      if (i + 1 < length) {
        // p here points to last code
        code.push((q = { children: [], index: 0 }));
        p.children[p.index] = q.children;
        p = q;
      }
    }
    return code[0].children;
  }

  function getBlockBufferOffset(component, row, col) {
    return 64 * ((component.blocksPerLine + 1) * row + col);
  }

  function decodeScan(
    data,
    offset,
    frame,
    components,
    resetInterval,
    spectralStart,
    spectralEnd,
    successivePrev,
    successive,
    parseDNLMarker = false
  ) {
    var mcusPerLine = frame.mcusPerLine;
    var progressive = frame.progressive;

    const startOffset = offset;
    let bitsData = 0,
      bitsCount = 0;

    function readBit() {
      if (bitsCount > 0) {
        bitsCount--;
        return (bitsData >> bitsCount) & 1;
      }
      bitsData = data[offset++];
      if (bitsData === 0xff) {
        var nextByte = data[offset++];
        if (nextByte) {
          if (nextByte === /* DNL = */ 0xdc && parseDNLMarker) {
            offset += 2; // Skip marker length.

            const scanLines = readUint16(data, offset);
            offset += 2;
            if (scanLines > 0 && scanLines !== frame.scanLines) {
              throw new DNLMarkerError(
                "Found DNL marker (0xFFDC) while parsing scan data",
                scanLines
              );
            }
          } else if (nextByte === /* EOI = */ 0xd9) {
            if (parseDNLMarker) {
              // NOTE: only 8-bit JPEG images are supported in this decoder.
              const maybeScanLines = blockRow * 8;
              // Heuristic to attempt to handle corrupt JPEG images with too
              // large `scanLines` parameter, by falling back to the currently
              // parsed number of scanLines when it's at least one order of
              // magnitude smaller than expected (fixes issue10880.pdf).
              if (maybeScanLines > 0 && maybeScanLines < frame.scanLines / 10) {
                throw new DNLMarkerError(
                  "Found EOI marker (0xFFD9) while parsing scan data, " +
                    "possibly caused by incorrect `scanLines` parameter",
                  maybeScanLines
                );
              }
            }
            throw new EOIMarkerError(
              "Found EOI marker (0xFFD9) while parsing scan data"
            );
          }
          throw new JpegError(
            `unexpected marker ${((bitsData << 8) | nextByte).toString(16)}`
          );
        }
        // unstuff 0
      }
      bitsCount = 7;
      return bitsData >>> 7;
    }

    function decodeHuffman(tree) {
      var node = tree;
      while (true) {
        node = node[readBit()];
        switch (typeof node) {
          case "number":
            return node;
          case "object":
            continue;
        }
        throw new JpegError("invalid huffman sequence");
      }
    }

    function receive(length) {
      var n = 0;
      while (length > 0) {
        n = (n << 1) | readBit();
        length--;
      }
      return n;
    }

    function receiveAndExtend(length) {
      if (length === 1) {
        return readBit() === 1 ? 1 : -1;
      }
      var n = receive(length);
      if (n >= 1 << (length - 1)) {
        return n;
      }
      return n + (-1 << length) + 1;
    }

    function decodeBaseline(component, blockOffset) {
      var t = decodeHuffman(component.huffmanTableDC);
      var diff = t === 0 ? 0 : receiveAndExtend(t);
      component.blockData[blockOffset] = component.pred += diff;
      var k = 1;
      while (k < 64) {
        var rs = decodeHuffman(component.huffmanTableAC);
        var s = rs & 15,
          r = rs >> 4;
        if (s === 0) {
          if (r < 15) {
            break;
          }
          k += 16;
          continue;
        }
        k += r;
        var z = dctZigZag[k];
        component.blockData[blockOffset + z] = receiveAndExtend(s);
        k++;
      }
    }

    function decodeDCFirst(component, blockOffset) {
      var t = decodeHuffman(component.huffmanTableDC);
      var diff = t === 0 ? 0 : receiveAndExtend(t) << successive;
      component.blockData[blockOffset] = component.pred += diff;
    }

    function decodeDCSuccessive(component, blockOffset) {
      component.blockData[blockOffset] |= readBit() << successive;
    }

    var eobrun = 0;
    function decodeACFirst(component, blockOffset) {
      if (eobrun > 0) {
        eobrun--;
        return;
      }
      var k = spectralStart,
        e = spectralEnd;
      while (k <= e) {
        var rs = decodeHuffman(component.huffmanTableAC);
        var s = rs & 15,
          r = rs >> 4;
        if (s === 0) {
          if (r < 15) {
            eobrun = receive(r) + (1 << r) - 1;
            break;
          }
          k += 16;
          continue;
        }
        k += r;
        var z = dctZigZag[k];
        component.blockData[blockOffset + z] =
          receiveAndExtend(s) * (1 << successive);
        k++;
      }
    }

    var successiveACState = 0,
      successiveACNextValue;
    function decodeACSuccessive(component, blockOffset) {
      var k = spectralStart;
      var e = spectralEnd;
      var r = 0;
      var s;
      var rs;
      while (k <= e) {
        const offsetZ = blockOffset + dctZigZag[k];
        const sign = component.blockData[offsetZ] < 0 ? -1 : 1;
        switch (successiveACState) {
          case 0: // initial state
            rs = decodeHuffman(component.huffmanTableAC);
            s = rs & 15;
            r = rs >> 4;
            if (s === 0) {
              if (r < 15) {
                eobrun = receive(r) + (1 << r);
                successiveACState = 4;
              } else {
                r = 16;
                successiveACState = 1;
              }
            } else {
              if (s !== 1) {
                throw new JpegError("invalid ACn encoding");
              }
              successiveACNextValue = receiveAndExtend(s);
              successiveACState = r ? 2 : 3;
            }
            continue;
          case 1: // skipping r zero items
          case 2:
            if (component.blockData[offsetZ]) {
              component.blockData[offsetZ] += sign * (readBit() << successive);
            } else {
              r--;
              if (r === 0) {
                successiveACState = successiveACState === 2 ? 3 : 0;
              }
            }
            break;
          case 3: // set value for a zero item
            if (component.blockData[offsetZ]) {
              component.blockData[offsetZ] += sign * (readBit() << successive);
            } else {
              component.blockData[offsetZ] =
                successiveACNextValue << successive;
              successiveACState = 0;
            }
            break;
          case 4: // eob
            if (component.blockData[offsetZ]) {
              component.blockData[offsetZ] += sign * (readBit() << successive);
            }
            break;
        }
        k++;
      }
      if (successiveACState === 4) {
        eobrun--;
        if (eobrun === 0) {
          successiveACState = 0;
        }
      }
    }

    let blockRow = 0;
    function decodeMcu(component, decode, mcu, row, col) {
      var mcuRow = (mcu / mcusPerLine) | 0;
      var mcuCol = mcu % mcusPerLine;
      blockRow = mcuRow * component.v + row;
      var blockCol = mcuCol * component.h + col;
      const blockOffset = getBlockBufferOffset(component, blockRow, blockCol);
      decode(component, blockOffset);
    }

    function decodeBlock(component, decode, mcu) {
      blockRow = (mcu / component.blocksPerLine) | 0;
      var blockCol = mcu % component.blocksPerLine;
      const blockOffset = getBlockBufferOffset(component, blockRow, blockCol);
      decode(component, blockOffset);
    }

    var componentsLength = components.length;
    var component, i, j, k, n;
    var decodeFn;
    if (progressive) {
      if (spectralStart === 0) {
        decodeFn = successivePrev === 0 ? decodeDCFirst : decodeDCSuccessive;
      } else {
        decodeFn = successivePrev === 0 ? decodeACFirst : decodeACSuccessive;
      }
    } else {
      decodeFn = decodeBaseline;
    }

    var mcu = 0,
      fileMarker;
    var mcuExpected;
    if (componentsLength === 1) {
      mcuExpected = components[0].blocksPerLine * components[0].blocksPerColumn;
    } else {
      mcuExpected = mcusPerLine * frame.mcusPerColumn;
    }

    var h, v;
    while (mcu <= mcuExpected) {
      // reset interval stuff
      var mcuToRead = resetInterval
        ? Math.min(mcuExpected - mcu, resetInterval)
        : mcuExpected;

      // The `mcuToRead === 0` case should only occur when all of the expected
      // MCU data has been already parsed, i.e. when `mcu === mcuExpected`, but
      // some corrupt JPEG images contain more data than intended and we thus
      // want to skip over any extra RSTx markers below (fixes issue11794.pdf).
      if (mcuToRead > 0) {
        for (i = 0; i < componentsLength; i++) {
          components[i].pred = 0;
        }
        eobrun = 0;

        if (componentsLength === 1) {
          component = components[0];
          for (n = 0; n < mcuToRead; n++) {
            decodeBlock(component, decodeFn, mcu);
            mcu++;
          }
        } else {
          for (n = 0; n < mcuToRead; n++) {
            for (i = 0; i < componentsLength; i++) {
              component = components[i];
              h = component.h;
              v = component.v;
              for (j = 0; j < v; j++) {
                for (k = 0; k < h; k++) {
                  decodeMcu(component, decodeFn, mcu, j, k);
                }
              }
            }
            mcu++;
          }
        }
      }

      // find marker
      bitsCount = 0;
      fileMarker = findNextFileMarker(data, offset);
      if (!fileMarker) {
        break; // Reached the end of the image data without finding any marker.
      }
      if (fileMarker.invalid) {
        // Some bad images seem to pad Scan blocks with e.g. zero bytes, skip
        // past those to attempt to find a valid marker (fixes issue4090.pdf).
        const partialMsg = mcuToRead > 0 ? "unexpected" : "excessive";
        warn(
          `decodeScan - ${partialMsg} MCU data, current marker is: ${fileMarker.invalid}`
        );
        offset = fileMarker.offset;
      }
      if (fileMarker.marker >= 0xffd0 && fileMarker.marker <= 0xffd7) {
        // RSTx
        offset += 2;
      } else {
        break;
      }
    }

    return offset - startOffset;
  }

  // A port of poppler's IDCT method which in turn is taken from:
  //   Christoph Loeffler, Adriaan Ligtenberg, George S. Moschytz,
  //   'Practical Fast 1-D DCT Algorithms with 11 Multiplications',
  //   IEEE Intl. Conf. on Acoustics, Speech & Signal Processing, 1989,
  //   988-991.
  function quantizeAndInverse(component, blockBufferOffset, p) {
    var qt = component.quantizationTable,
      blockData = component.blockData;
    var v0, v1, v2, v3, v4, v5, v6, v7;
    var p0, p1, p2, p3, p4, p5, p6, p7;
    var t;

    if (!qt) {
      throw new JpegError("missing required Quantization Table.");
    }

    // inverse DCT on rows
    for (var row = 0; row < 64; row += 8) {
      // gather block data
      p0 = blockData[blockBufferOffset + row];
      p1 = blockData[blockBufferOffset + row + 1];
      p2 = blockData[blockBufferOffset + row + 2];
      p3 = blockData[blockBufferOffset + row + 3];
      p4 = blockData[blockBufferOffset + row + 4];
      p5 = blockData[blockBufferOffset + row + 5];
      p6 = blockData[blockBufferOffset + row + 6];
      p7 = blockData[blockBufferOffset + row + 7];

      // dequant p0
      p0 *= qt[row];

      // check for all-zero AC coefficients
      if ((p1 | p2 | p3 | p4 | p5 | p6 | p7) === 0) {
        t = (dctSqrt2 * p0 + 512) >> 10;
        p[row] = t;
        p[row + 1] = t;
        p[row + 2] = t;
        p[row + 3] = t;
        p[row + 4] = t;
        p[row + 5] = t;
        p[row + 6] = t;
        p[row + 7] = t;
        continue;
      }
      // dequant p1 ... p7
      p1 *= qt[row + 1];
      p2 *= qt[row + 2];
      p3 *= qt[row + 3];
      p4 *= qt[row + 4];
      p5 *= qt[row + 5];
      p6 *= qt[row + 6];
      p7 *= qt[row + 7];

      // stage 4
      v0 = (dctSqrt2 * p0 + 128) >> 8;
      v1 = (dctSqrt2 * p4 + 128) >> 8;
      v2 = p2;
      v3 = p6;
      v4 = (dctSqrt1d2 * (p1 - p7) + 128) >> 8;
      v7 = (dctSqrt1d2 * (p1 + p7) + 128) >> 8;
      v5 = p3 << 4;
      v6 = p5 << 4;

      // stage 3
      v0 = (v0 + v1 + 1) >> 1;
      v1 = v0 - v1;
      t = (v2 * dctSin6 + v3 * dctCos6 + 128) >> 8;
      v2 = (v2 * dctCos6 - v3 * dctSin6 + 128) >> 8;
      v3 = t;
      v4 = (v4 + v6 + 1) >> 1;
      v6 = v4 - v6;
      v7 = (v7 + v5 + 1) >> 1;
      v5 = v7 - v5;

      // stage 2
      v0 = (v0 + v3 + 1) >> 1;
      v3 = v0 - v3;
      v1 = (v1 + v2 + 1) >> 1;
      v2 = v1 - v2;
      t = (v4 * dctSin3 + v7 * dctCos3 + 2048) >> 12;
      v4 = (v4 * dctCos3 - v7 * dctSin3 + 2048) >> 12;
      v7 = t;
      t = (v5 * dctSin1 + v6 * dctCos1 + 2048) >> 12;
      v5 = (v5 * dctCos1 - v6 * dctSin1 + 2048) >> 12;
      v6 = t;

      // stage 1
      p[row] = v0 + v7;
      p[row + 7] = v0 - v7;
      p[row + 1] = v1 + v6;
      p[row + 6] = v1 - v6;
      p[row + 2] = v2 + v5;
      p[row + 5] = v2 - v5;
      p[row + 3] = v3 + v4;
      p[row + 4] = v3 - v4;
    }

    // inverse DCT on columns
    for (var col = 0; col < 8; ++col) {
      p0 = p[col];
      p1 = p[col + 8];
      p2 = p[col + 16];
      p3 = p[col + 24];
      p4 = p[col + 32];
      p5 = p[col + 40];
      p6 = p[col + 48];
      p7 = p[col + 56];

      // check for all-zero AC coefficients
      if ((p1 | p2 | p3 | p4 | p5 | p6 | p7) === 0) {
        t = (dctSqrt2 * p0 + 8192) >> 14;
        // Convert to 8-bit.
        if (t < -2040) {
          t = 0;
        } else if (t >= 2024) {
          t = 255;
        } else {
          t = (t + 2056) >> 4;
        }
        blockData[blockBufferOffset + col] = t;
        blockData[blockBufferOffset + col + 8] = t;
        blockData[blockBufferOffset + col + 16] = t;
        blockData[blockBufferOffset + col + 24] = t;
        blockData[blockBufferOffset + col + 32] = t;
        blockData[blockBufferOffset + col + 40] = t;
        blockData[blockBufferOffset + col + 48] = t;
        blockData[blockBufferOffset + col + 56] = t;
        continue;
      }

      // stage 4
      v0 = (dctSqrt2 * p0 + 2048) >> 12;
      v1 = (dctSqrt2 * p4 + 2048) >> 12;
      v2 = p2;
      v3 = p6;
      v4 = (dctSqrt1d2 * (p1 - p7) + 2048) >> 12;
      v7 = (dctSqrt1d2 * (p1 + p7) + 2048) >> 12;
      v5 = p3;
      v6 = p5;

      // stage 3
      // Shift v0 by 128.5 << 5 here, so we don't need to shift p0...p7 when
      // converting to UInt8 range later.
      v0 = ((v0 + v1 + 1) >> 1) + 4112;
      v1 = v0 - v1;
      t = (v2 * dctSin6 + v3 * dctCos6 + 2048) >> 12;
      v2 = (v2 * dctCos6 - v3 * dctSin6 + 2048) >> 12;
      v3 = t;
      v4 = (v4 + v6 + 1) >> 1;
      v6 = v4 - v6;
      v7 = (v7 + v5 + 1) >> 1;
      v5 = v7 - v5;

      // stage 2
      v0 = (v0 + v3 + 1) >> 1;
      v3 = v0 - v3;
      v1 = (v1 + v2 + 1) >> 1;
      v2 = v1 - v2;
      t = (v4 * dctSin3 + v7 * dctCos3 + 2048) >> 12;
      v4 = (v4 * dctCos3 - v7 * dctSin3 + 2048) >> 12;
      v7 = t;
      t = (v5 * dctSin1 + v6 * dctCos1 + 2048) >> 12;
      v5 = (v5 * dctCos1 - v6 * dctSin1 + 2048) >> 12;
      v6 = t;

      // stage 1
      p0 = v0 + v7;
      p7 = v0 - v7;
      p1 = v1 + v6;
      p6 = v1 - v6;
      p2 = v2 + v5;
      p5 = v2 - v5;
      p3 = v3 + v4;
      p4 = v3 - v4;

      // Convert to 8-bit integers.
      if (p0 < 16) {
        p0 = 0;
      } else if (p0 >= 4080) {
        p0 = 255;
      } else {
        p0 >>= 4;
      }
      if (p1 < 16) {
        p1 = 0;
      } else if (p1 >= 4080) {
        p1 = 255;
      } else {
        p1 >>= 4;
      }
      if (p2 < 16) {
        p2 = 0;
      } else if (p2 >= 4080) {
        p2 = 255;
      } else {
        p2 >>= 4;
      }
      if (p3 < 16) {
        p3 = 0;
      } else if (p3 >= 4080) {
        p3 = 255;
      } else {
        p3 >>= 4;
      }
      if (p4 < 16) {
        p4 = 0;
      } else if (p4 >= 4080) {
        p4 = 255;
      } else {
        p4 >>= 4;
      }
      if (p5 < 16) {
        p5 = 0;
      } else if (p5 >= 4080) {
        p5 = 255;
      } else {
        p5 >>= 4;
      }
      if (p6 < 16) {
        p6 = 0;
      } else if (p6 >= 4080) {
        p6 = 255;
      } else {
        p6 >>= 4;
      }
      if (p7 < 16) {
        p7 = 0;
      } else if (p7 >= 4080) {
        p7 = 255;
      } else {
        p7 >>= 4;
      }

      // store block data
      blockData[blockBufferOffset + col] = p0;
      blockData[blockBufferOffset + col + 8] = p1;
      blockData[blockBufferOffset + col + 16] = p2;
      blockData[blockBufferOffset + col + 24] = p3;
      blockData[blockBufferOffset + col + 32] = p4;
      blockData[blockBufferOffset + col + 40] = p5;
      blockData[blockBufferOffset + col + 48] = p6;
      blockData[blockBufferOffset + col + 56] = p7;
    }
  }

  function buildComponentData(frame, component) {
    var blocksPerLine = component.blocksPerLine;
    var blocksPerColumn = component.blocksPerColumn;
    var computationBuffer = new Int16Array(64);

    for (var blockRow = 0; blockRow < blocksPerColumn; blockRow++) {
      for (var blockCol = 0; blockCol < blocksPerLine; blockCol++) {
        var offset = getBlockBufferOffset(component, blockRow, blockCol);
        quantizeAndInverse(component, offset, computationBuffer);
      }
    }
    return component.blockData;
  }

  function findNextFileMarker(data, currentPos, startPos = currentPos) {
    const maxPos = data.length - 1;
    var newPos = startPos < currentPos ? startPos : currentPos;

    if (currentPos >= maxPos) {
      return null; // Don't attempt to read non-existent data and just return.
    }
    var currentMarker = readUint16(data, currentPos);
    if (currentMarker >= 0xffc0 && currentMarker <= 0xfffe) {
      return {
        invalid: null,
        marker: currentMarker,
        offset: currentPos,
      };
    }
    var newMarker = readUint16(data, newPos);
    while (!(newMarker >= 0xffc0 && newMarker <= 0xfffe)) {
      if (++newPos >= maxPos) {
        return null; // Don't attempt to read non-existent data and just return.
      }
      newMarker = readUint16(data, newPos);
    }
    return {
      invalid: currentMarker.toString(16),
      marker: newMarker,
      offset: newPos,
    };
  }

  JpegImage.prototype = {
    parse(data, { dnlScanLines = null } = {}) {
      function readDataBlock() {
        const length = readUint16(data, offset);
        offset += 2;
        let endOffset = offset + length - 2;

        var fileMarker = findNextFileMarker(data, endOffset, offset);
        if (fileMarker && fileMarker.invalid) {
          warn(
            "readDataBlock - incorrect length, current marker is: " +
              fileMarker.invalid
          );
          endOffset = fileMarker.offset;
        }

        var array = data.subarray(offset, endOffset);
        offset += array.length;
        return array;
      }

      function prepareComponents(frame) {
        var mcusPerLine = Math.ceil(frame.samplesPerLine / 8 / frame.maxH);
        var mcusPerColumn = Math.ceil(frame.scanLines / 8 / frame.maxV);
        for (var i = 0; i < frame.components.length; i++) {
          component = frame.components[i];
          var blocksPerLine = Math.ceil(
            (Math.ceil(frame.samplesPerLine / 8) * component.h) / frame.maxH
          );
          var blocksPerColumn = Math.ceil(
            (Math.ceil(frame.scanLines / 8) * component.v) / frame.maxV
          );
          var blocksPerLineForMcu = mcusPerLine * component.h;
          var blocksPerColumnForMcu = mcusPerColumn * component.v;

          var blocksBufferSize =
            64 * blocksPerColumnForMcu * (blocksPerLineForMcu + 1);
          component.blockData = new Int16Array(blocksBufferSize);
          component.blocksPerLine = blocksPerLine;
          component.blocksPerColumn = blocksPerColumn;
        }
        frame.mcusPerLine = mcusPerLine;
        frame.mcusPerColumn = mcusPerColumn;
      }

      var offset = 0;
      var jfif = null;
      var adobe = null;
      var frame, resetInterval;
      let numSOSMarkers = 0;
      var quantizationTables = [];
      var huffmanTablesAC = [],
        huffmanTablesDC = [];

      let fileMarker = readUint16(data, offset);
      offset += 2;
      if (fileMarker !== /* SOI (Start of Image) = */ 0xffd8) {
        throw new JpegError("SOI not found");
      }
      fileMarker = readUint16(data, offset);
      offset += 2;

      markerLoop: while (fileMarker !== /* EOI (End of Image) = */ 0xffd9) {
        var i, j, l;
        switch (fileMarker) {
          case 0xffe0: // APP0 (Application Specific)
          case 0xffe1: // APP1
          case 0xffe2: // APP2
          case 0xffe3: // APP3
          case 0xffe4: // APP4
          case 0xffe5: // APP5
          case 0xffe6: // APP6
          case 0xffe7: // APP7
          case 0xffe8: // APP8
          case 0xffe9: // APP9
          case 0xffea: // APP10
          case 0xffeb: // APP11
          case 0xffec: // APP12
          case 0xffed: // APP13
          case 0xffee: // APP14
          case 0xffef: // APP15
          case 0xfffe: // COM (Comment)
            var appData = readDataBlock();

            if (fileMarker === 0xffe0) {
              // 'JFIF\x00'
              if (
                appData[0] === 0x4a &&
                appData[1] === 0x46 &&
                appData[2] === 0x49 &&
                appData[3] === 0x46 &&
                appData[4] === 0
              ) {
                jfif = {
                  version: { major: appData[5], minor: appData[6] },
                  densityUnits: appData[7],
                  xDensity: (appData[8] << 8) | appData[9],
                  yDensity: (appData[10] << 8) | appData[11],
                  thumbWidth: appData[12],
                  thumbHeight: appData[13],
                  thumbData: appData.subarray(
                    14,
                    14 + 3 * appData[12] * appData[13]
                  ),
                };
              }
            }
            // TODO APP1 - Exif
            if (fileMarker === 0xffee) {
              // 'Adobe'
              if (
                appData[0] === 0x41 &&
                appData[1] === 0x64 &&
                appData[2] === 0x6f &&
                appData[3] === 0x62 &&
                appData[4] === 0x65
              ) {
                adobe = {
                  version: (appData[5] << 8) | appData[6],
                  flags0: (appData[7] << 8) | appData[8],
                  flags1: (appData[9] << 8) | appData[10],
                  transformCode: appData[11],
                };
              }
            }
            break;

          case 0xffdb: // DQT (Define Quantization Tables)
            const quantizationTablesLength = readUint16(data, offset);
            offset += 2;
            var quantizationTablesEnd = quantizationTablesLength + offset - 2;
            var z;
            while (offset < quantizationTablesEnd) {
              var quantizationTableSpec = data[offset++];
              var tableData = new Uint16Array(64);
              if (quantizationTableSpec >> 4 === 0) {
                // 8 bit values
                for (j = 0; j < 64; j++) {
                  z = dctZigZag[j];
                  tableData[z] = data[offset++];
                }
              } else if (quantizationTableSpec >> 4 === 1) {
                // 16 bit values
                for (j = 0; j < 64; j++) {
                  z = dctZigZag[j];
                  tableData[z] = readUint16(data, offset);
                  offset += 2;
                }
              } else {
                throw new JpegError("DQT - invalid table spec");
              }
              quantizationTables[quantizationTableSpec & 15] = tableData;
            }
            break;

          case 0xffc0: // SOF0 (Start of Frame, Baseline DCT)
          case 0xffc1: // SOF1 (Start of Frame, Extended DCT)
          case 0xffc2: // SOF2 (Start of Frame, Progressive DCT)
            if (frame) {
              throw new JpegError("Only single frame JPEGs supported");
            }
            offset += 2; // Skip marker length.

            frame = {};
            frame.extended = fileMarker === 0xffc1;
            frame.progressive = fileMarker === 0xffc2;
            frame.precision = data[offset++];
            const sofScanLines = readUint16(data, offset);
            offset += 2;
            frame.scanLines = dnlScanLines || sofScanLines;
            frame.samplesPerLine = readUint16(data, offset);
            offset += 2;
            frame.components = [];
            frame.componentIds = {};
            var componentsCount = data[offset++],
              componentId;
            var maxH = 0,
              maxV = 0;
            for (i = 0; i < componentsCount; i++) {
              componentId = data[offset];
              var h = data[offset + 1] >> 4;
              var v = data[offset + 1] & 15;
              if (maxH < h) {
                maxH = h;
              }
              if (maxV < v) {
                maxV = v;
              }
              var qId = data[offset + 2];
              l = frame.components.push({
                h,
                v,
                quantizationId: qId,
                quantizationTable: null, // See comment below.
              });
              frame.componentIds[componentId] = l - 1;
              offset += 3;
            }
            frame.maxH = maxH;
            frame.maxV = maxV;
            prepareComponents(frame);
            break;

          case 0xffc4: // DHT (Define Huffman Tables)
            const huffmanLength = readUint16(data, offset);
            offset += 2;
            for (i = 2; i < huffmanLength; ) {
              var huffmanTableSpec = data[offset++];
              var codeLengths = new Uint8Array(16);
              var codeLengthSum = 0;
              for (j = 0; j < 16; j++, offset++) {
                codeLengthSum += codeLengths[j] = data[offset];
              }
              var huffmanValues = new Uint8Array(codeLengthSum);
              for (j = 0; j < codeLengthSum; j++, offset++) {
                huffmanValues[j] = data[offset];
              }
              i += 17 + codeLengthSum;

              (huffmanTableSpec >> 4 === 0 ? huffmanTablesDC : huffmanTablesAC)[
                huffmanTableSpec & 15
              ] = buildHuffmanTable(codeLengths, huffmanValues);
            }
            break;

          case 0xffdd: // DRI (Define Restart Interval)
            offset += 2; // Skip marker length.

            resetInterval = readUint16(data, offset);
            offset += 2;
            break;

          case 0xffda: // SOS (Start of Scan)
            // A DNL marker (0xFFDC), if it exists, is only allowed at the end
            // of the first scan segment and may only occur once in an image.
            // Furthermore, to prevent an infinite loop, do *not* attempt to
            // parse DNL markers during re-parsing of the JPEG scan data.
            const parseDNLMarker = ++numSOSMarkers === 1 && !dnlScanLines;

            offset += 2; // Skip marker length.

            var selectorsCount = data[offset++];
            var components = [],
              component;
            for (i = 0; i < selectorsCount; i++) {
              const index = data[offset++];
              var componentIndex = frame.componentIds[index];
              component = frame.components[componentIndex];
              component.index = index;
              var tableSpec = data[offset++];
              component.huffmanTableDC = huffmanTablesDC[tableSpec >> 4];
              component.huffmanTableAC = huffmanTablesAC[tableSpec & 15];
              components.push(component);
            }
            var spectralStart = data[offset++];
            var spectralEnd = data[offset++];
            var successiveApproximation = data[offset++];
            try {
              var processed = decodeScan(
                data,
                offset,
                frame,
                components,
                resetInterval,
                spectralStart,
                spectralEnd,
                successiveApproximation >> 4,
                successiveApproximation & 15,
                parseDNLMarker
              );
              offset += processed;
            } catch (ex) {
              if (ex instanceof DNLMarkerError) {
                warn(`${ex.message} -- attempting to re-parse the JPEG image.`);
                return this.parse(data, { dnlScanLines: ex.scanLines });
              } else if (ex instanceof EOIMarkerError) {
                warn(`${ex.message} -- ignoring the rest of the image data.`);
                break markerLoop;
              }
              throw ex;
            }
            break;

          case 0xffdc: // DNL (Define Number of Lines)
            // Ignore the marker, since it's being handled in `decodeScan`.
            offset += 4;
            break;

          case 0xffff: // Fill bytes
            if (data[offset] !== 0xff) {
              // Avoid skipping a valid marker.
              offset--;
            }
            break;

          default:
            // Could be incorrect encoding -- the last 0xFF byte of the previous
            // block could have been eaten by the encoder, hence we fallback to
            // `startPos = offset - 3` when looking for the next valid marker.
            const nextFileMarker = findNextFileMarker(
              data,
              /* currentPos = */ offset - 2,
              /* startPos = */ offset - 3
            );
            if (nextFileMarker && nextFileMarker.invalid) {
              warn(
                "JpegImage.parse - unexpected data, current marker is: " +
                  nextFileMarker.invalid
              );
              offset = nextFileMarker.offset;
              break;
            }
            if (offset >= data.length - 1) {
              warn(
                "JpegImage.parse - reached the end of the image data " +
                  "without finding an EOI marker (0xFFD9)."
              );
              break markerLoop;
            }
            throw new JpegError(
              "JpegImage.parse - unknown marker: " + fileMarker.toString(16)
            );
        }
        fileMarker = readUint16(data, offset);
        offset += 2;
      }

      this.width = frame.samplesPerLine;
      this.height = frame.scanLines;
      this.jfif = jfif;
      this.adobe = adobe;
      this.components = [];
      for (i = 0; i < frame.components.length; i++) {
        component = frame.components[i];

        // Prevent errors when DQT markers are placed after SOF{n} markers,
        // by assigning the `quantizationTable` entry after the entire image
        // has been parsed (fixes issue7406.pdf).
        var quantizationTable = quantizationTables[component.quantizationId];
        if (quantizationTable) {
          component.quantizationTable = quantizationTable;
        }

        this.components.push({
          index: component.index,
          output: buildComponentData(frame, component),
          scaleX: component.h / frame.maxH,
          scaleY: component.v / frame.maxV,
          blocksPerLine: component.blocksPerLine,
          blocksPerColumn: component.blocksPerColumn,
        });
      }
      this.numComponents = this.components.length;
      return undefined;
    },

    _getLinearizedBlockData(width, height, isSourcePDF = false) {
      var scaleX = this.width / width,
        scaleY = this.height / height;

      var component, componentScaleX, componentScaleY, blocksPerScanline;
      var x, y, i, j, k;
      var index;
      var offset = 0;
      var output;
      var numComponents = this.components.length;
      var dataLength = width * height * numComponents;
      var data = new Uint8ClampedArray(dataLength);
      var xScaleBlockOffset = new Uint32Array(width);
      var mask3LSB = 0xfffffff8; // used to clear the 3 LSBs
      let lastComponentScaleX;

      for (i = 0; i < numComponents; i++) {
        component = this.components[i];
        componentScaleX = component.scaleX * scaleX;
        componentScaleY = component.scaleY * scaleY;
        offset = i;
        output = component.output;
        blocksPerScanline = (component.blocksPerLine + 1) << 3;
        // Precalculate the `xScaleBlockOffset`. Since it doesn't depend on the
        // component data, that's only necessary when `componentScaleX` changes.
        if (componentScaleX !== lastComponentScaleX) {
          for (x = 0; x < width; x++) {
            j = 0 | (x * componentScaleX);
            xScaleBlockOffset[x] = ((j & mask3LSB) << 3) | (j & 7);
          }
          lastComponentScaleX = componentScaleX;
        }
        // linearize the blocks of the component
        for (y = 0; y < height; y++) {
          j = 0 | (y * componentScaleY);
          index = (blocksPerScanline * (j & mask3LSB)) | ((j & 7) << 3);
          for (x = 0; x < width; x++) {
            data[offset] = output[index + xScaleBlockOffset[x]];
            offset += numComponents;
          }
        }
      }

      // decodeTransform contains pairs of multiplier (-256..256) and additive
      let transform = this._decodeTransform;

      // In PDF files, JPEG images with CMYK colour spaces are usually inverted
      // (this can be observed by extracting the raw image data).
      // Since the conversion algorithms (see below) were written primarily for
      // the PDF use-cases, attempting to use `JpegImage` to parse standalone
      // JPEG (CMYK) images may thus result in inverted images (see issue 9513).
      //
      // Unfortunately it's not (always) possible to tell, from the image data
      // alone, if it needs to be inverted. Thus in an attempt to provide better
      // out-of-box behaviour when `JpegImage` is used standalone, default to
      // inverting JPEG (CMYK) images if and only if the image data does *not*
      // come from a PDF file and no `decodeTransform` was passed by the user.
      if (!isSourcePDF && numComponents === 4 && !transform) {
        // prettier-ignore
        transform = new Int32Array([
          -256, 255, -256, 255, -256, 255, -256, 255]);
      }

      if (transform) {
        for (i = 0; i < dataLength; ) {
          for (j = 0, k = 0; j < numComponents; j++, i++, k += 2) {
            data[i] = ((data[i] * transform[k]) >> 8) + transform[k + 1];
          }
        }
      }
      return data;
    },

    get _isColorConversionNeeded() {
      if (this.adobe) {
        // The adobe transform marker overrides any previous setting.
        return !!this.adobe.transformCode;
      }
      if (this.numComponents === 3) {
        if (this._colorTransform === 0) {
          // If the Adobe transform marker is not present and the image
          // dictionary has a 'ColorTransform' entry, explicitly set to `0`,
          // then the colours should *not* be transformed.
          return false;
        } else if (
          this.components[0].index === /* "R" = */ 0x52 &&
          this.components[1].index === /* "G" = */ 0x47 &&
          this.components[2].index === /* "B" = */ 0x42
        ) {
          // If the three components are indexed as RGB in ASCII
          // then the colours should *not* be transformed.
          return false;
        }
        return true;
      }
      // `this.numComponents !== 3`
      if (this._colorTransform === 1) {
        // If the Adobe transform marker is not present and the image
        // dictionary has a 'ColorTransform' entry, explicitly set to `1`,
        // then the colours should be transformed.
        return true;
      }
      return false;
    },

    _convertYccToRgb: function convertYccToRgb(data) {
      var Y, Cb, Cr;
      for (var i = 0, length = data.length; i < length; i += 3) {
        Y = data[i];
        Cb = data[i + 1];
        Cr = data[i + 2];
        data[i] = Y - 179.456 + 1.402 * Cr;
        data[i + 1] = Y + 135.459 - 0.344 * Cb - 0.714 * Cr;
        data[i + 2] = Y - 226.816 + 1.772 * Cb;
      }
      return data;
    },

    _convertYcckToRgb: function convertYcckToRgb(data) {
      var Y, Cb, Cr, k;
      var offset = 0;
      for (var i = 0, length = data.length; i < length; i += 4) {
        Y = data[i];
        Cb = data[i + 1];
        Cr = data[i + 2];
        k = data[i + 3];

        data[offset++] =
          -122.67195406894 +
          Cb *
            (-6.60635669420364e-5 * Cb +
              0.000437130475926232 * Cr -
              5.4080610064599e-5 * Y +
              0.00048449797120281 * k -
              0.154362151871126) +
          Cr *
            (-0.000957964378445773 * Cr +
              0.000817076911346625 * Y -
              0.00477271405408747 * k +
              1.53380253221734) +
          Y *
            (0.000961250184130688 * Y -
              0.00266257332283933 * k +
              0.48357088451265) +
          k * (-0.000336197177618394 * k + 0.484791561490776);

        data[offset++] =
          107.268039397724 +
          Cb *
            (2.19927104525741e-5 * Cb -
              0.000640992018297945 * Cr +
              0.000659397001245577 * Y +
              0.000426105652938837 * k -
              0.176491792462875) +
          Cr *
            (-0.000778269941513683 * Cr +
              0.00130872261408275 * Y +
              0.000770482631801132 * k -
              0.151051492775562) +
          Y *
            (0.00126935368114843 * Y -
              0.00265090189010898 * k +
              0.25802910206845) +
          k * (-0.000318913117588328 * k - 0.213742400323665);

        data[offset++] =
          -20.810012546947 +
          Cb *
            (-0.000570115196973677 * Cb -
              2.63409051004589e-5 * Cr +
              0.0020741088115012 * Y -
              0.00288260236853442 * k +
              0.814272968359295) +
          Cr *
            (-1.53496057440975e-5 * Cr -
              0.000132689043961446 * Y +
              0.000560833691242812 * k -
              0.195152027534049) +
          Y *
            (0.00174418132927582 * Y -
              0.00255243321439347 * k +
              0.116935020465145) +
          k * (-0.000343531996510555 * k + 0.24165260232407);
      }
      // Ensure that only the converted RGB data is returned.
      return data.subarray(0, offset);
    },

    _convertYcckToCmyk: function convertYcckToCmyk(data) {
      var Y, Cb, Cr;
      for (var i = 0, length = data.length; i < length; i += 4) {
        Y = data[i];
        Cb = data[i + 1];
        Cr = data[i + 2];
        data[i] = 434.456 - Y - 1.402 * Cr;
        data[i + 1] = 119.541 - Y + 0.344 * Cb + 0.714 * Cr;
        data[i + 2] = 481.816 - Y - 1.772 * Cb;
        // K in data[i + 3] is unchanged
      }
      return data;
    },

    _convertCmykToRgb: function convertCmykToRgb(data) {
      var c, m, y, k;
      var offset = 0;
      for (var i = 0, length = data.length; i < length; i += 4) {
        c = data[i];
        m = data[i + 1];
        y = data[i + 2];
        k = data[i + 3];

        data[offset++] =
          255 +
          c *
            (-0.00006747147073602441 * c +
              0.0008379262121013727 * m +
              0.0002894718188643294 * y +
              0.003264231057537806 * k -
              1.1185611867203937) +
          m *
            (0.000026374107616089405 * m -
              0.00008626949158638572 * y -
              0.0002748769067499491 * k -
              0.02155688794978967) +
          y *
            (-0.00003878099212869363 * y -
              0.0003267808279485286 * k +
              0.0686742238595345) -
          k * (0.0003361971776183937 * k + 0.7430659151342254);

        data[offset++] =
          255 +
          c *
            (0.00013596372813588848 * c +
              0.000924537132573585 * m +
              0.00010567359618683593 * y +
              0.0004791864687436512 * k -
              0.3109689587515875) +
          m *
            (-0.00023545346108370344 * m +
              0.0002702845253534714 * y +
              0.0020200308977307156 * k -
              0.7488052167015494) +
          y *
            (0.00006834815998235662 * y +
              0.00015168452363460973 * k -
              0.09751927774728933) -
          k * (0.00031891311758832814 * k + 0.7364883807733168);

        data[offset++] =
          255 +
          c *
            (0.000013598650411385307 * c +
              0.00012423956175490851 * m +
              0.0004751985097583589 * y -
              0.0000036729317476630422 * k -
              0.05562186980264034) +
          m *
            (0.00016141380598724676 * m +
              0.0009692239130725186 * y +
              0.0007782692450036253 * k -
              0.44015232367526463) +
          y *
            (5.068882914068769e-7 * y +
              0.0017778369011375071 * k -
              0.7591454649749609) -
          k * (0.0003435319965105553 * k + 0.7063770186160144);
      }
      // Ensure that only the converted RGB data is returned.
      return data.subarray(0, offset);
    },

    getData({ width, height, forceRGB = false, isSourcePDF = false }) {
      if (this.numComponents > 4) {
        throw new JpegError("Unsupported color mode");
      }
      // Type of data: Uint8ClampedArray(width * height * numComponents)
      var data = this._getLinearizedBlockData(width, height, isSourcePDF);

      if (this.numComponents === 1 && forceRGB) {
        var dataLength = data.length;
        var rgbData = new Uint8ClampedArray(dataLength * 3);
        var offset = 0;
        for (var i = 0; i < dataLength; i++) {
          var grayColor = data[i];
          rgbData[offset++] = grayColor;
          rgbData[offset++] = grayColor;
          rgbData[offset++] = grayColor;
        }
        return rgbData;
      } else if (this.numComponents === 3 && this._isColorConversionNeeded) {
        return this._convertYccToRgb(data);
      } else if (this.numComponents === 4) {
        if (this._isColorConversionNeeded) {
          if (forceRGB) {
            return this._convertYcckToRgb(data);
          }
          return this._convertYcckToCmyk(data);
        } else if (forceRGB) {
          return this._convertCmykToRgb(data);
        }
      }
      return data;
    },
  };

  return JpegImage;
})();


	"use strict";
    var ArithmeticDecoder = function ArithmeticDecoderClosure() {
  var QeTable = [{
    qe: 0x5601,
    nmps: 1,
    nlps: 1,
    switchFlag: 1
  }, {
    qe: 0x3401,
    nmps: 2,
    nlps: 6,
    switchFlag: 0
  }, {
    qe: 0x1801,
    nmps: 3,
    nlps: 9,
    switchFlag: 0
  }, {
    qe: 0x0AC1,
    nmps: 4,
    nlps: 12,
    switchFlag: 0
  }, {
    qe: 0x0521,
    nmps: 5,
    nlps: 29,
    switchFlag: 0
  }, {
    qe: 0x0221,
    nmps: 38,
    nlps: 33,
    switchFlag: 0
  }, {
    qe: 0x5601,
    nmps: 7,
    nlps: 6,
    switchFlag: 1
  }, {
    qe: 0x5401,
    nmps: 8,
    nlps: 14,
    switchFlag: 0
  }, {
    qe: 0x4801,
    nmps: 9,
    nlps: 14,
    switchFlag: 0
  }, {
    qe: 0x3801,
    nmps: 10,
    nlps: 14,
    switchFlag: 0
  }, {
    qe: 0x3001,
    nmps: 11,
    nlps: 17,
    switchFlag: 0
  }, {
    qe: 0x2401,
    nmps: 12,
    nlps: 18,
    switchFlag: 0
  }, {
    qe: 0x1C01,
    nmps: 13,
    nlps: 20,
    switchFlag: 0
  }, {
    qe: 0x1601,
    nmps: 29,
    nlps: 21,
    switchFlag: 0
  }, {
    qe: 0x5601,
    nmps: 15,
    nlps: 14,
    switchFlag: 1
  }, {
    qe: 0x5401,
    nmps: 16,
    nlps: 14,
    switchFlag: 0
  }, {
    qe: 0x5101,
    nmps: 17,
    nlps: 15,
    switchFlag: 0
  }, {
    qe: 0x4801,
    nmps: 18,
    nlps: 16,
    switchFlag: 0
  }, {
    qe: 0x3801,
    nmps: 19,
    nlps: 17,
    switchFlag: 0
  }, {
    qe: 0x3401,
    nmps: 20,
    nlps: 18,
    switchFlag: 0
  }, {
    qe: 0x3001,
    nmps: 21,
    nlps: 19,
    switchFlag: 0
  }, {
    qe: 0x2801,
    nmps: 22,
    nlps: 19,
    switchFlag: 0
  }, {
    qe: 0x2401,
    nmps: 23,
    nlps: 20,
    switchFlag: 0
  }, {
    qe: 0x2201,
    nmps: 24,
    nlps: 21,
    switchFlag: 0
  }, {
    qe: 0x1C01,
    nmps: 25,
    nlps: 22,
    switchFlag: 0
  }, {
    qe: 0x1801,
    nmps: 26,
    nlps: 23,
    switchFlag: 0
  }, {
    qe: 0x1601,
    nmps: 27,
    nlps: 24,
    switchFlag: 0
  }, {
    qe: 0x1401,
    nmps: 28,
    nlps: 25,
    switchFlag: 0
  }, {
    qe: 0x1201,
    nmps: 29,
    nlps: 26,
    switchFlag: 0
  }, {
    qe: 0x1101,
    nmps: 30,
    nlps: 27,
    switchFlag: 0
  }, {
    qe: 0x0AC1,
    nmps: 31,
    nlps: 28,
    switchFlag: 0
  }, {
    qe: 0x09C1,
    nmps: 32,
    nlps: 29,
    switchFlag: 0
  }, {
    qe: 0x08A1,
    nmps: 33,
    nlps: 30,
    switchFlag: 0
  }, {
    qe: 0x0521,
    nmps: 34,
    nlps: 31,
    switchFlag: 0
  }, {
    qe: 0x0441,
    nmps: 35,
    nlps: 32,
    switchFlag: 0
  }, {
    qe: 0x02A1,
    nmps: 36,
    nlps: 33,
    switchFlag: 0
  }, {
    qe: 0x0221,
    nmps: 37,
    nlps: 34,
    switchFlag: 0
  }, {
    qe: 0x0141,
    nmps: 38,
    nlps: 35,
    switchFlag: 0
  }, {
    qe: 0x0111,
    nmps: 39,
    nlps: 36,
    switchFlag: 0
  }, {
    qe: 0x0085,
    nmps: 40,
    nlps: 37,
    switchFlag: 0
  }, {
    qe: 0x0049,
    nmps: 41,
    nlps: 38,
    switchFlag: 0
  }, {
    qe: 0x0025,
    nmps: 42,
    nlps: 39,
    switchFlag: 0
  }, {
    qe: 0x0015,
    nmps: 43,
    nlps: 40,
    switchFlag: 0
  }, {
    qe: 0x0009,
    nmps: 44,
    nlps: 41,
    switchFlag: 0
  }, {
    qe: 0x0005,
    nmps: 45,
    nlps: 42,
    switchFlag: 0
  }, {
    qe: 0x0001,
    nmps: 45,
    nlps: 43,
    switchFlag: 0
  }, {
    qe: 0x5601,
    nmps: 46,
    nlps: 46,
    switchFlag: 0
  }];
  function ArithmeticDecoder(data, start, end) {
    this.data = data;
    this.bp = start;
    this.dataEnd = end;
    this.chigh = data[start];
    this.clow = 0;
    this.byteIn();
    this.chigh = this.chigh << 7 & 0xFFFF | this.clow >> 9 & 0x7F;
    this.clow = this.clow << 7 & 0xFFFF;
    this.ct -= 7;
    this.a = 0x8000;
  }
  ArithmeticDecoder.prototype = {
    byteIn: function ArithmeticDecoder_byteIn() {
      var data = this.data;
      var bp = this.bp;
      if (data[bp] === 0xFF) {
        var b1 = data[bp + 1];
        if (b1 > 0x8F) {
          this.clow += 0xFF00;
          this.ct = 8;
        } else {
          bp++;
          this.clow += data[bp] << 9;
          this.ct = 7;
          this.bp = bp;
        }
      } else {
        bp++;
        this.clow += bp < this.dataEnd ? data[bp] << 8 : 0xFF00;
        this.ct = 8;
        this.bp = bp;
      }
      if (this.clow > 0xFFFF) {
        this.chigh += this.clow >> 16;
        this.clow &= 0xFFFF;
      }
    },
    readBit: function ArithmeticDecoder_readBit(contexts, pos) {
      var cx_index = contexts[pos] >> 1,
          cx_mps = contexts[pos] & 1;
      var qeTableIcx = QeTable[cx_index];
      var qeIcx = qeTableIcx.qe;
      var d;
      var a = this.a - qeIcx;
      if (this.chigh < qeIcx) {
        if (a < qeIcx) {
          a = qeIcx;
          d = cx_mps;
          cx_index = qeTableIcx.nmps;
        } else {
          a = qeIcx;
          d = 1 ^ cx_mps;
          if (qeTableIcx.switchFlag === 1) {
            cx_mps = d;
          }
          cx_index = qeTableIcx.nlps;
        }
      } else {
        this.chigh -= qeIcx;
        if ((a & 0x8000) !== 0) {
          this.a = a;
          return cx_mps;
        }
        if (a < qeIcx) {
          d = 1 ^ cx_mps;
          if (qeTableIcx.switchFlag === 1) {
            cx_mps = d;
          }
          cx_index = qeTableIcx.nlps;
        } else {
          d = cx_mps;
          cx_index = qeTableIcx.nmps;
        }
      }
      do {
        if (this.ct === 0) {
          this.byteIn();
        }
        a <<= 1;
        this.chigh = this.chigh << 1 & 0xFFFF | this.clow >> 15 & 1;
        this.clow = this.clow << 1 & 0xFFFF;
        this.ct--;
      } while ((a & 0x8000) === 0);
      this.a = a;
      contexts[pos] = cx_index << 1 | cx_mps;
      return d;
    }
  };
  return ArithmeticDecoder;
}();


	
	"use strict";
   var JpxImage = function JpxImageClosure() {
  var SubbandsGainLog2 = {
    'LL': 0,
    'LH': 1,
    'HL': 1,
    'HH': 2
  };
  function JpxImage() {
    this.failOnCorruptedImage = false;
  }
  JpxImage.prototype = {
    parse: function JpxImage_parse(data) {
      var head = readUint16(data, 0);
      if (head === 0xFF4F) {
        this.parseCodestream(data, 0, data.length);
        return;
      }
      var position = 0,
          length = data.length;
      while (position < length) {
        var headerSize = 8;
        var lbox = readUint32(data, position);
        var tbox = readUint32(data, position + 4);
        position += headerSize;
        if (lbox === 1) {
          lbox = readUint32(data, position) * 4294967296 + readUint32(data, position + 4);
          position += 8;
          headerSize += 8;
        }
        if (lbox === 0) {
          lbox = length - position + headerSize;
        }
        if (lbox < headerSize) {
          error('JPX Error: Invalid box field size');
        }
        var dataLength = lbox - headerSize;
        var jumpDataLength = true;
        switch (tbox) {
          case 0x6A703268:
            jumpDataLength = false;
            break;
          case 0x636F6C72:
            var method = data[position];
            if (method === 1) {
              var colorspace = readUint32(data, position + 3);
              switch (colorspace) {
                case 16:
                case 17:
                case 18:
                  break;
                default:
                  warn('Unknown colorspace ' + colorspace);
                  break;
              }
            } else if (method === 2) {
              info('ICC profile not supported');
            }
            break;
          case 0x6A703263:
            this.parseCodestream(data, position, position + dataLength);
            break;
          case 0x6A502020:
            if (readUint32(data, position) !== 0x0d0a870a) {
              warn('Invalid JP2 signature');
            }
            break;
          case 0x6A501A1A:
          case 0x66747970:
          case 0x72726571:
          case 0x72657320:
          case 0x69686472:
            break;
          default:
            var headerType = String.fromCharCode(tbox >> 24 & 0xFF, tbox >> 16 & 0xFF, tbox >> 8 & 0xFF, tbox & 0xFF);
            warn('Unsupported header type ' + tbox + ' (' + headerType + ')');
            break;
        }
        if (jumpDataLength) {
          position += dataLength;
        }
      }
    },
    parseImageProperties: function JpxImage_parseImageProperties(stream) {
      var newByte = stream.getByte();
      while (newByte >= 0) {
        var oldByte = newByte;
        newByte = stream.getByte();
        var code = oldByte << 8 | newByte;
        if (code === 0xFF51) {
          stream.skip(4);
          var Xsiz = stream.getInt32() >>> 0;
          var Ysiz = stream.getInt32() >>> 0;
          var XOsiz = stream.getInt32() >>> 0;
          var YOsiz = stream.getInt32() >>> 0;
          stream.skip(16);
          var Csiz = stream.getUint16();
          this.width = Xsiz - XOsiz;
          this.height = Ysiz - YOsiz;
          this.componentsCount = Csiz;
          this.bitsPerComponent = 8;
          return;
        }
      }
      error('JPX Error: No size marker found in JPX stream');
    },
    parseCodestream: function JpxImage_parseCodestream(data, start, end) {
      var context = {};
      var doNotRecover = false;
      try {
        var position = start;
        while (position + 1 < end) {
          var code = readUint16(data, position);
          position += 2;
          var length = 0,
              j,
              sqcd,
              spqcds,
              spqcdSize,
              scalarExpounded,
              tile;
          switch (code) {
            case 0xFF4F:
              context.mainHeader = true;
              break;
            case 0xFFD9:
              break;
            case 0xFF51:
              length = readUint16(data, position);
              var siz = {};
              siz.Xsiz = readUint32(data, position + 4);
              siz.Ysiz = readUint32(data, position + 8);
              siz.XOsiz = readUint32(data, position + 12);
              siz.YOsiz = readUint32(data, position + 16);
              siz.XTsiz = readUint32(data, position + 20);
              siz.YTsiz = readUint32(data, position + 24);
              siz.XTOsiz = readUint32(data, position + 28);
              siz.YTOsiz = readUint32(data, position + 32);
              var componentsCount = readUint16(data, position + 36);
              siz.Csiz = componentsCount;
              var components = [];
              j = position + 38;
              for (var i = 0; i < componentsCount; i++) {
                var component = {
                  precision: (data[j] & 0x7F) + 1,
                  isSigned: !!(data[j] & 0x80),
                  XRsiz: data[j + 1],
                  YRsiz: data[j + 1]
                };
                calculateComponentDimensions(component, siz);
                components.push(component);
              }
              context.SIZ = siz;
              context.components = components;
              calculateTileGrids(context, components);
              context.QCC = [];
              context.COC = [];
              break;
            case 0xFF5C:
              length = readUint16(data, position);
              var qcd = {};
              j = position + 2;
              sqcd = data[j++];
              switch (sqcd & 0x1F) {
                case 0:
                  spqcdSize = 8;
                  scalarExpounded = true;
                  break;
                case 1:
                  spqcdSize = 16;
                  scalarExpounded = false;
                  break;
                case 2:
                  spqcdSize = 16;
                  scalarExpounded = true;
                  break;
                default:
                  throw new Error('Invalid SQcd value ' + sqcd);
              }
              qcd.noQuantization = spqcdSize === 8;
              qcd.scalarExpounded = scalarExpounded;
              qcd.guardBits = sqcd >> 5;
              spqcds = [];
              while (j < length + position) {
                var spqcd = {};
                if (spqcdSize === 8) {
                  spqcd.epsilon = data[j++] >> 3;
                  spqcd.mu = 0;
                } else {
                  spqcd.epsilon = data[j] >> 3;
                  spqcd.mu = (data[j] & 0x7) << 8 | data[j + 1];
                  j += 2;
                }
                spqcds.push(spqcd);
              }
              qcd.SPqcds = spqcds;
              if (context.mainHeader) {
                context.QCD = qcd;
              } else {
                context.currentTile.QCD = qcd;
                context.currentTile.QCC = [];
              }
              break;
            case 0xFF5D:
              length = readUint16(data, position);
              var qcc = {};
              j = position + 2;
              var cqcc;
              if (context.SIZ.Csiz < 257) {
                cqcc = data[j++];
              } else {
                cqcc = readUint16(data, j);
                j += 2;
              }
              sqcd = data[j++];
              switch (sqcd & 0x1F) {
                case 0:
                  spqcdSize = 8;
                  scalarExpounded = true;
                  break;
                case 1:
                  spqcdSize = 16;
                  scalarExpounded = false;
                  break;
                case 2:
                  spqcdSize = 16;
                  scalarExpounded = true;
                  break;
                default:
                  throw new Error('Invalid SQcd value ' + sqcd);
              }
              qcc.noQuantization = spqcdSize === 8;
              qcc.scalarExpounded = scalarExpounded;
              qcc.guardBits = sqcd >> 5;
              spqcds = [];
              while (j < length + position) {
                spqcd = {};
                if (spqcdSize === 8) {
                  spqcd.epsilon = data[j++] >> 3;
                  spqcd.mu = 0;
                } else {
                  spqcd.epsilon = data[j] >> 3;
                  spqcd.mu = (data[j] & 0x7) << 8 | data[j + 1];
                  j += 2;
                }
                spqcds.push(spqcd);
              }
              qcc.SPqcds = spqcds;
              if (context.mainHeader) {
                context.QCC[cqcc] = qcc;
              } else {
                context.currentTile.QCC[cqcc] = qcc;
              }
              break;
            case 0xFF52:
              length = readUint16(data, position);
              var cod = {};
              j = position + 2;
              var scod = data[j++];
              cod.entropyCoderWithCustomPrecincts = !!(scod & 1);
              cod.sopMarkerUsed = !!(scod & 2);
              cod.ephMarkerUsed = !!(scod & 4);
              cod.progressionOrder = data[j++];
              cod.layersCount = readUint16(data, j);
              j += 2;
              cod.multipleComponentTransform = data[j++];
              cod.decompositionLevelsCount = data[j++];
              cod.xcb = (data[j++] & 0xF) + 2;
              cod.ycb = (data[j++] & 0xF) + 2;
              var blockStyle = data[j++];
              cod.selectiveArithmeticCodingBypass = !!(blockStyle & 1);
              cod.resetContextProbabilities = !!(blockStyle & 2);
              cod.terminationOnEachCodingPass = !!(blockStyle & 4);
              cod.verticalyStripe = !!(blockStyle & 8);
              cod.predictableTermination = !!(blockStyle & 16);
              cod.segmentationSymbolUsed = !!(blockStyle & 32);
              cod.reversibleTransformation = data[j++];
              if (cod.entropyCoderWithCustomPrecincts) {
                var precinctsSizes = [];
                while (j < length + position) {
                  var precinctsSize = data[j++];
                  precinctsSizes.push({
                    PPx: precinctsSize & 0xF,
                    PPy: precinctsSize >> 4
                  });
                }
                cod.precinctsSizes = precinctsSizes;
              }
              var unsupported = [];
              if (cod.selectiveArithmeticCodingBypass) {
                unsupported.push('selectiveArithmeticCodingBypass');
              }
              if (cod.resetContextProbabilities) {
                unsupported.push('resetContextProbabilities');
              }
              if (cod.terminationOnEachCodingPass) {
                unsupported.push('terminationOnEachCodingPass');
              }
              if (cod.verticalyStripe) {
                unsupported.push('verticalyStripe');
              }
              if (cod.predictableTermination) {
                unsupported.push('predictableTermination');
              }
              if (unsupported.length > 0) {
                doNotRecover = true;
                throw new Error('Unsupported COD options (' + unsupported.join(', ') + ')');
              }
              if (context.mainHeader) {
                context.COD = cod;
              } else {
                context.currentTile.COD = cod;
                context.currentTile.COC = [];
              }
              break;
            case 0xFF90:
              length = readUint16(data, position);
              tile = {};
              tile.index = readUint16(data, position + 2);
              tile.length = readUint32(data, position + 4);
              tile.dataEnd = tile.length + position - 2;
              tile.partIndex = data[position + 8];
              tile.partsCount = data[position + 9];
              context.mainHeader = false;
              if (tile.partIndex === 0) {
                tile.COD = context.COD;
                tile.COC = context.COC.slice(0);
                tile.QCD = context.QCD;
                tile.QCC = context.QCC.slice(0);
              }
              context.currentTile = tile;
              break;
            case 0xFF93:
              tile = context.currentTile;
              if (tile.partIndex === 0) {
                initializeTile(context, tile.index);
                buildPackets(context);
              }
              length = tile.dataEnd - position;
              parseTilePackets(context, data, position, length);
              break;
            case 0xFF55:
            case 0xFF57:
            case 0xFF58:
            case 0xFF64:
              length = readUint16(data, position);
              break;
            case 0xFF53:
              throw new Error('Codestream code 0xFF53 (COC) is ' + 'not implemented');
            default:
              throw new Error('Unknown codestream code: ' + code.toString(16));
          }
          position += length;
        }
      } catch (e) {
        if (doNotRecover || this.failOnCorruptedImage) {
          error('JPX Error: ' + e.message);
        } else {
          warn('JPX: Trying to recover from: ' + e.message);
        }
      }
      this.tiles = transformComponents(context);
      this.width = context.SIZ.Xsiz - context.SIZ.XOsiz;
      this.height = context.SIZ.Ysiz - context.SIZ.YOsiz;
      this.componentsCount = context.SIZ.Csiz;
    }
  };
  function calculateComponentDimensions(component, siz) {
    component.x0 = Math.ceil(siz.XOsiz / component.XRsiz);
    component.x1 = Math.ceil(siz.Xsiz / component.XRsiz);
    component.y0 = Math.ceil(siz.YOsiz / component.YRsiz);
    component.y1 = Math.ceil(siz.Ysiz / component.YRsiz);
    component.width = component.x1 - component.x0;
    component.height = component.y1 - component.y0;
  }
  function calculateTileGrids(context, components) {
    var siz = context.SIZ;
    var tile,
        tiles = [];
    var numXtiles = Math.ceil((siz.Xsiz - siz.XTOsiz) / siz.XTsiz);
    var numYtiles = Math.ceil((siz.Ysiz - siz.YTOsiz) / siz.YTsiz);
    for (var q = 0; q < numYtiles; q++) {
      for (var p = 0; p < numXtiles; p++) {
        tile = {};
        tile.tx0 = Math.max(siz.XTOsiz + p * siz.XTsiz, siz.XOsiz);
        tile.ty0 = Math.max(siz.YTOsiz + q * siz.YTsiz, siz.YOsiz);
        tile.tx1 = Math.min(siz.XTOsiz + (p + 1) * siz.XTsiz, siz.Xsiz);
        tile.ty1 = Math.min(siz.YTOsiz + (q + 1) * siz.YTsiz, siz.Ysiz);
        tile.width = tile.tx1 - tile.tx0;
        tile.height = tile.ty1 - tile.ty0;
        tile.components = [];
        tiles.push(tile);
      }
    }
    context.tiles = tiles;
    var componentsCount = siz.Csiz;
    for (var i = 0, ii = componentsCount; i < ii; i++) {
      var component = components[i];
      for (var j = 0, jj = tiles.length; j < jj; j++) {
        var tileComponent = {};
        tile = tiles[j];
        tileComponent.tcx0 = Math.ceil(tile.tx0 / component.XRsiz);
        tileComponent.tcy0 = Math.ceil(tile.ty0 / component.YRsiz);
        tileComponent.tcx1 = Math.ceil(tile.tx1 / component.XRsiz);
        tileComponent.tcy1 = Math.ceil(tile.ty1 / component.YRsiz);
        tileComponent.width = tileComponent.tcx1 - tileComponent.tcx0;
        tileComponent.height = tileComponent.tcy1 - tileComponent.tcy0;
        tile.components[i] = tileComponent;
      }
    }
  }
  function getBlocksDimensions(context, component, r) {
    var codOrCoc = component.codingStyleParameters;
    var result = {};
    if (!codOrCoc.entropyCoderWithCustomPrecincts) {
      result.PPx = 15;
      result.PPy = 15;
    } else {
      result.PPx = codOrCoc.precinctsSizes[r].PPx;
      result.PPy = codOrCoc.precinctsSizes[r].PPy;
    }
    result.xcb_ = r > 0 ? Math.min(codOrCoc.xcb, result.PPx - 1) : Math.min(codOrCoc.xcb, result.PPx);
    result.ycb_ = r > 0 ? Math.min(codOrCoc.ycb, result.PPy - 1) : Math.min(codOrCoc.ycb, result.PPy);
    return result;
  }
  function buildPrecincts(context, resolution, dimensions) {
    var precinctWidth = 1 << dimensions.PPx;
    var precinctHeight = 1 << dimensions.PPy;
    var isZeroRes = resolution.resLevel === 0;
    var precinctWidthInSubband = 1 << dimensions.PPx + (isZeroRes ? 0 : -1);
    var precinctHeightInSubband = 1 << dimensions.PPy + (isZeroRes ? 0 : -1);
    var numprecinctswide = resolution.trx1 > resolution.trx0 ? Math.ceil(resolution.trx1 / precinctWidth) - Math.floor(resolution.trx0 / precinctWidth) : 0;
    var numprecinctshigh = resolution.try1 > resolution.try0 ? Math.ceil(resolution.try1 / precinctHeight) - Math.floor(resolution.try0 / precinctHeight) : 0;
    var numprecincts = numprecinctswide * numprecinctshigh;
    resolution.precinctParameters = {
      precinctWidth: precinctWidth,
      precinctHeight: precinctHeight,
      numprecinctswide: numprecinctswide,
      numprecinctshigh: numprecinctshigh,
      numprecincts: numprecincts,
      precinctWidthInSubband: precinctWidthInSubband,
      precinctHeightInSubband: precinctHeightInSubband
    };
  }
  function buildCodeblocks(context, subband, dimensions) {
    var xcb_ = dimensions.xcb_;
    var ycb_ = dimensions.ycb_;
    var codeblockWidth = 1 << xcb_;
    var codeblockHeight = 1 << ycb_;
    var cbx0 = subband.tbx0 >> xcb_;
    var cby0 = subband.tby0 >> ycb_;
    var cbx1 = subband.tbx1 + codeblockWidth - 1 >> xcb_;
    var cby1 = subband.tby1 + codeblockHeight - 1 >> ycb_;
    var precinctParameters = subband.resolution.precinctParameters;
    var codeblocks = [];
    var precincts = [];
    var i, j, codeblock, precinctNumber;
    for (j = cby0; j < cby1; j++) {
      for (i = cbx0; i < cbx1; i++) {
        codeblock = {
          cbx: i,
          cby: j,
          tbx0: codeblockWidth * i,
          tby0: codeblockHeight * j,
          tbx1: codeblockWidth * (i + 1),
          tby1: codeblockHeight * (j + 1)
        };
        codeblock.tbx0_ = Math.max(subband.tbx0, codeblock.tbx0);
        codeblock.tby0_ = Math.max(subband.tby0, codeblock.tby0);
        codeblock.tbx1_ = Math.min(subband.tbx1, codeblock.tbx1);
        codeblock.tby1_ = Math.min(subband.tby1, codeblock.tby1);
        var pi = Math.floor((codeblock.tbx0_ - subband.tbx0) / precinctParameters.precinctWidthInSubband);
        var pj = Math.floor((codeblock.tby0_ - subband.tby0) / precinctParameters.precinctHeightInSubband);
        precinctNumber = pi + pj * precinctParameters.numprecinctswide;
        codeblock.precinctNumber = precinctNumber;
        codeblock.subbandType = subband.type;
        codeblock.Lblock = 3;
        if (codeblock.tbx1_ <= codeblock.tbx0_ || codeblock.tby1_ <= codeblock.tby0_) {
          continue;
        }
        codeblocks.push(codeblock);
        var precinct = precincts[precinctNumber];
        if (precinct !== undefined) {
          if (i < precinct.cbxMin) {
            precinct.cbxMin = i;
          } else if (i > precinct.cbxMax) {
            precinct.cbxMax = i;
          }
          if (j < precinct.cbyMin) {
            precinct.cbxMin = j;
          } else if (j > precinct.cbyMax) {
            precinct.cbyMax = j;
          }
        } else {
          precincts[precinctNumber] = precinct = {
            cbxMin: i,
            cbyMin: j,
            cbxMax: i,
            cbyMax: j
          };
        }
        codeblock.precinct = precinct;
      }
    }
    subband.codeblockParameters = {
      codeblockWidth: xcb_,
      codeblockHeight: ycb_,
      numcodeblockwide: cbx1 - cbx0 + 1,
      numcodeblockhigh: cby1 - cby0 + 1
    };
    subband.codeblocks = codeblocks;
    subband.precincts = precincts;
  }
  function createPacket(resolution, precinctNumber, layerNumber) {
    var precinctCodeblocks = [];
    var subbands = resolution.subbands;
    for (var i = 0, ii = subbands.length; i < ii; i++) {
      var subband = subbands[i];
      var codeblocks = subband.codeblocks;
      for (var j = 0, jj = codeblocks.length; j < jj; j++) {
        var codeblock = codeblocks[j];
        if (codeblock.precinctNumber !== precinctNumber) {
          continue;
        }
        precinctCodeblocks.push(codeblock);
      }
    }
    return {
      layerNumber: layerNumber,
      codeblocks: precinctCodeblocks
    };
  }
  function LayerResolutionComponentPositionIterator(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var layersCount = tile.codingStyleDefaultParameters.layersCount;
    var componentsCount = siz.Csiz;
    var maxDecompositionLevelsCount = 0;
    for (var q = 0; q < componentsCount; q++) {
      maxDecompositionLevelsCount = Math.max(maxDecompositionLevelsCount, tile.components[q].codingStyleParameters.decompositionLevelsCount);
    }
    var l = 0,
        r = 0,
        i = 0,
        k = 0;
    this.nextPacket = function JpxImage_nextPacket() {
      for (; l < layersCount; l++) {
        for (; r <= maxDecompositionLevelsCount; r++) {
          for (; i < componentsCount; i++) {
            var component = tile.components[i];
            if (r > component.codingStyleParameters.decompositionLevelsCount) {
              continue;
            }
            var resolution = component.resolutions[r];
            var numprecincts = resolution.precinctParameters.numprecincts;
            for (; k < numprecincts;) {
              var packet = createPacket(resolution, k, l);
              k++;
              return packet;
            }
            k = 0;
          }
          i = 0;
        }
        r = 0;
      }
      error('JPX Error: Out of packets');
    };
  }
  function ResolutionLayerComponentPositionIterator(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var layersCount = tile.codingStyleDefaultParameters.layersCount;
    var componentsCount = siz.Csiz;
    var maxDecompositionLevelsCount = 0;
    for (var q = 0; q < componentsCount; q++) {
      maxDecompositionLevelsCount = Math.max(maxDecompositionLevelsCount, tile.components[q].codingStyleParameters.decompositionLevelsCount);
    }
    var r = 0,
        l = 0,
        i = 0,
        k = 0;
    this.nextPacket = function JpxImage_nextPacket() {
      for (; r <= maxDecompositionLevelsCount; r++) {
        for (; l < layersCount; l++) {
          for (; i < componentsCount; i++) {
            var component = tile.components[i];
            if (r > component.codingStyleParameters.decompositionLevelsCount) {
              continue;
            }
            var resolution = component.resolutions[r];
            var numprecincts = resolution.precinctParameters.numprecincts;
            for (; k < numprecincts;) {
              var packet = createPacket(resolution, k, l);
              k++;
              return packet;
            }
            k = 0;
          }
          i = 0;
        }
        l = 0;
      }
      error('JPX Error: Out of packets');
    };
  }
  function ResolutionPositionComponentLayerIterator(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var layersCount = tile.codingStyleDefaultParameters.layersCount;
    var componentsCount = siz.Csiz;
    var l, r, c, p;
    var maxDecompositionLevelsCount = 0;
    for (c = 0; c < componentsCount; c++) {
      var component = tile.components[c];
      maxDecompositionLevelsCount = Math.max(maxDecompositionLevelsCount, component.codingStyleParameters.decompositionLevelsCount);
    }
    var maxNumPrecinctsInLevel = new Int32Array(maxDecompositionLevelsCount + 1);
    for (r = 0; r <= maxDecompositionLevelsCount; ++r) {
      var maxNumPrecincts = 0;
      for (c = 0; c < componentsCount; ++c) {
        var resolutions = tile.components[c].resolutions;
        if (r < resolutions.length) {
          maxNumPrecincts = Math.max(maxNumPrecincts, resolutions[r].precinctParameters.numprecincts);
        }
      }
      maxNumPrecinctsInLevel[r] = maxNumPrecincts;
    }
    l = 0;
    r = 0;
    c = 0;
    p = 0;
    this.nextPacket = function JpxImage_nextPacket() {
      for (; r <= maxDecompositionLevelsCount; r++) {
        for (; p < maxNumPrecinctsInLevel[r]; p++) {
          for (; c < componentsCount; c++) {
            var component = tile.components[c];
            if (r > component.codingStyleParameters.decompositionLevelsCount) {
              continue;
            }
            var resolution = component.resolutions[r];
            var numprecincts = resolution.precinctParameters.numprecincts;
            if (p >= numprecincts) {
              continue;
            }
            for (; l < layersCount;) {
              var packet = createPacket(resolution, p, l);
              l++;
              return packet;
            }
            l = 0;
          }
          c = 0;
        }
        p = 0;
      }
      error('JPX Error: Out of packets');
    };
  }
  function PositionComponentResolutionLayerIterator(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var layersCount = tile.codingStyleDefaultParameters.layersCount;
    var componentsCount = siz.Csiz;
    var precinctsSizes = getPrecinctSizesInImageScale(tile);
    var precinctsIterationSizes = precinctsSizes;
    var l = 0,
        r = 0,
        c = 0,
        px = 0,
        py = 0;
    this.nextPacket = function JpxImage_nextPacket() {
      for (; py < precinctsIterationSizes.maxNumHigh; py++) {
        for (; px < precinctsIterationSizes.maxNumWide; px++) {
          for (; c < componentsCount; c++) {
            var component = tile.components[c];
            var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount;
            for (; r <= decompositionLevelsCount; r++) {
              var resolution = component.resolutions[r];
              var sizeInImageScale = precinctsSizes.components[c].resolutions[r];
              var k = getPrecinctIndexIfExist(px, py, sizeInImageScale, precinctsIterationSizes, resolution);
              if (k === null) {
                continue;
              }
              for (; l < layersCount;) {
                var packet = createPacket(resolution, k, l);
                l++;
                return packet;
              }
              l = 0;
            }
            r = 0;
          }
          c = 0;
        }
        px = 0;
      }
      error('JPX Error: Out of packets');
    };
  }
  function ComponentPositionResolutionLayerIterator(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var layersCount = tile.codingStyleDefaultParameters.layersCount;
    var componentsCount = siz.Csiz;
    var precinctsSizes = getPrecinctSizesInImageScale(tile);
    var l = 0,
        r = 0,
        c = 0,
        px = 0,
        py = 0;
    this.nextPacket = function JpxImage_nextPacket() {
      for (; c < componentsCount; ++c) {
        var component = tile.components[c];
        var precinctsIterationSizes = precinctsSizes.components[c];
        var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount;
        for (; py < precinctsIterationSizes.maxNumHigh; py++) {
          for (; px < precinctsIterationSizes.maxNumWide; px++) {
            for (; r <= decompositionLevelsCount; r++) {
              var resolution = component.resolutions[r];
              var sizeInImageScale = precinctsIterationSizes.resolutions[r];
              var k = getPrecinctIndexIfExist(px, py, sizeInImageScale, precinctsIterationSizes, resolution);
              if (k === null) {
                continue;
              }
              for (; l < layersCount;) {
                var packet = createPacket(resolution, k, l);
                l++;
                return packet;
              }
              l = 0;
            }
            r = 0;
          }
          px = 0;
        }
        py = 0;
      }
      error('JPX Error: Out of packets');
    };
  }
  function getPrecinctIndexIfExist(pxIndex, pyIndex, sizeInImageScale, precinctIterationSizes, resolution) {
    var posX = pxIndex * precinctIterationSizes.minWidth;
    var posY = pyIndex * precinctIterationSizes.minHeight;
    if (posX % sizeInImageScale.width !== 0 || posY % sizeInImageScale.height !== 0) {
      return null;
    }
    var startPrecinctRowIndex = posY / sizeInImageScale.width * resolution.precinctParameters.numprecinctswide;
    return posX / sizeInImageScale.height + startPrecinctRowIndex;
  }
  function getPrecinctSizesInImageScale(tile) {
    var componentsCount = tile.components.length;
    var minWidth = Number.MAX_VALUE;
    var minHeight = Number.MAX_VALUE;
    var maxNumWide = 0;
    var maxNumHigh = 0;
    var sizePerComponent = new Array(componentsCount);
    for (var c = 0; c < componentsCount; c++) {
      var component = tile.components[c];
      var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount;
      var sizePerResolution = new Array(decompositionLevelsCount + 1);
      var minWidthCurrentComponent = Number.MAX_VALUE;
      var minHeightCurrentComponent = Number.MAX_VALUE;
      var maxNumWideCurrentComponent = 0;
      var maxNumHighCurrentComponent = 0;
      var scale = 1;
      for (var r = decompositionLevelsCount; r >= 0; --r) {
        var resolution = component.resolutions[r];
        var widthCurrentResolution = scale * resolution.precinctParameters.precinctWidth;
        var heightCurrentResolution = scale * resolution.precinctParameters.precinctHeight;
        minWidthCurrentComponent = Math.min(minWidthCurrentComponent, widthCurrentResolution);
        minHeightCurrentComponent = Math.min(minHeightCurrentComponent, heightCurrentResolution);
        maxNumWideCurrentComponent = Math.max(maxNumWideCurrentComponent, resolution.precinctParameters.numprecinctswide);
        maxNumHighCurrentComponent = Math.max(maxNumHighCurrentComponent, resolution.precinctParameters.numprecinctshigh);
        sizePerResolution[r] = {
          width: widthCurrentResolution,
          height: heightCurrentResolution
        };
        scale <<= 1;
      }
      minWidth = Math.min(minWidth, minWidthCurrentComponent);
      minHeight = Math.min(minHeight, minHeightCurrentComponent);
      maxNumWide = Math.max(maxNumWide, maxNumWideCurrentComponent);
      maxNumHigh = Math.max(maxNumHigh, maxNumHighCurrentComponent);
      sizePerComponent[c] = {
        resolutions: sizePerResolution,
        minWidth: minWidthCurrentComponent,
        minHeight: minHeightCurrentComponent,
        maxNumWide: maxNumWideCurrentComponent,
        maxNumHigh: maxNumHighCurrentComponent
      };
    }
    return {
      components: sizePerComponent,
      minWidth: minWidth,
      minHeight: minHeight,
      maxNumWide: maxNumWide,
      maxNumHigh: maxNumHigh
    };
  }
  function buildPackets(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var componentsCount = siz.Csiz;
    for (var c = 0; c < componentsCount; c++) {
      var component = tile.components[c];
      var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount;
      var resolutions = [];
      var subbands = [];
      for (var r = 0; r <= decompositionLevelsCount; r++) {
        var blocksDimensions = getBlocksDimensions(context, component, r);
        var resolution = {};
        var scale = 1 << decompositionLevelsCount - r;
        resolution.trx0 = Math.ceil(component.tcx0 / scale);
        resolution.try0 = Math.ceil(component.tcy0 / scale);
        resolution.trx1 = Math.ceil(component.tcx1 / scale);
        resolution.try1 = Math.ceil(component.tcy1 / scale);
        resolution.resLevel = r;
        buildPrecincts(context, resolution, blocksDimensions);
        resolutions.push(resolution);
        var subband;
        if (r === 0) {
          subband = {};
          subband.type = 'LL';
          subband.tbx0 = Math.ceil(component.tcx0 / scale);
          subband.tby0 = Math.ceil(component.tcy0 / scale);
          subband.tbx1 = Math.ceil(component.tcx1 / scale);
          subband.tby1 = Math.ceil(component.tcy1 / scale);
          subband.resolution = resolution;
          buildCodeblocks(context, subband, blocksDimensions);
          subbands.push(subband);
          resolution.subbands = [subband];
        } else {
          var bscale = 1 << decompositionLevelsCount - r + 1;
          var resolutionSubbands = [];
          subband = {};
          subband.type = 'HL';
          subband.tbx0 = Math.ceil(component.tcx0 / bscale - 0.5);
          subband.tby0 = Math.ceil(component.tcy0 / bscale);
          subband.tbx1 = Math.ceil(component.tcx1 / bscale - 0.5);
          subband.tby1 = Math.ceil(component.tcy1 / bscale);
          subband.resolution = resolution;
          buildCodeblocks(context, subband, blocksDimensions);
          subbands.push(subband);
          resolutionSubbands.push(subband);
          subband = {};
          subband.type = 'LH';
          subband.tbx0 = Math.ceil(component.tcx0 / bscale);
          subband.tby0 = Math.ceil(component.tcy0 / bscale - 0.5);
          subband.tbx1 = Math.ceil(component.tcx1 / bscale);
          subband.tby1 = Math.ceil(component.tcy1 / bscale - 0.5);
          subband.resolution = resolution;
          buildCodeblocks(context, subband, blocksDimensions);
          subbands.push(subband);
          resolutionSubbands.push(subband);
          subband = {};
          subband.type = 'HH';
          subband.tbx0 = Math.ceil(component.tcx0 / bscale - 0.5);
          subband.tby0 = Math.ceil(component.tcy0 / bscale - 0.5);
          subband.tbx1 = Math.ceil(component.tcx1 / bscale - 0.5);
          subband.tby1 = Math.ceil(component.tcy1 / bscale - 0.5);
          subband.resolution = resolution;
          buildCodeblocks(context, subband, blocksDimensions);
          subbands.push(subband);
          resolutionSubbands.push(subband);
          resolution.subbands = resolutionSubbands;
        }
      }
      component.resolutions = resolutions;
      component.subbands = subbands;
    }
    var progressionOrder = tile.codingStyleDefaultParameters.progressionOrder;
    switch (progressionOrder) {
      case 0:
        tile.packetsIterator = new LayerResolutionComponentPositionIterator(context);
        break;
      case 1:
        tile.packetsIterator = new ResolutionLayerComponentPositionIterator(context);
        break;
      case 2:
        tile.packetsIterator = new ResolutionPositionComponentLayerIterator(context);
        break;
      case 3:
        tile.packetsIterator = new PositionComponentResolutionLayerIterator(context);
        break;
      case 4:
        tile.packetsIterator = new ComponentPositionResolutionLayerIterator(context);
        break;
      default:
        error('JPX Error: Unsupported progression order ' + progressionOrder);
    }
  }
  function parseTilePackets(context, data, offset, dataLength) {
    var position = 0;
    var buffer,
        bufferSize = 0,
        skipNextBit = false;
    function readBits(count) {
      while (bufferSize < count) {
        var b = data[offset + position];
        position++;
        if (skipNextBit) {
          buffer = buffer << 7 | b;
          bufferSize += 7;
          skipNextBit = false;
        } else {
          buffer = buffer << 8 | b;
          bufferSize += 8;
        }
        if (b === 0xFF) {
          skipNextBit = true;
        }
      }
      bufferSize -= count;
      return buffer >>> bufferSize & (1 << count) - 1;
    }
    function skipMarkerIfEqual(value) {
      if (data[offset + position - 1] === 0xFF && data[offset + position] === value) {
        skipBytes(1);
        return true;
      } else if (data[offset + position] === 0xFF && data[offset + position + 1] === value) {
        skipBytes(2);
        return true;
      }
      return false;
    }
    function skipBytes(count) {
      position += count;
    }
    function alignToByte() {
      bufferSize = 0;
      if (skipNextBit) {
        position++;
        skipNextBit = false;
      }
    }
    function readCodingpasses() {
      if (readBits(1) === 0) {
        return 1;
      }
      if (readBits(1) === 0) {
        return 2;
      }
      var value = readBits(2);
      if (value < 3) {
        return value + 3;
      }
      value = readBits(5);
      if (value < 31) {
        return value + 6;
      }
      value = readBits(7);
      return value + 37;
    }
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var sopMarkerUsed = context.COD.sopMarkerUsed;
    var ephMarkerUsed = context.COD.ephMarkerUsed;
    var packetsIterator = tile.packetsIterator;
    while (position < dataLength) {
      alignToByte();
      if (sopMarkerUsed && skipMarkerIfEqual(0x91)) {
        skipBytes(4);
      }
      var packet = packetsIterator.nextPacket();
      if (!readBits(1)) {
        continue;
      }
      var layerNumber = packet.layerNumber;
      var queue = [],
          codeblock;
      for (var i = 0, ii = packet.codeblocks.length; i < ii; i++) {
        codeblock = packet.codeblocks[i];
        var precinct = codeblock.precinct;
        var codeblockColumn = codeblock.cbx - precinct.cbxMin;
        var codeblockRow = codeblock.cby - precinct.cbyMin;
        var codeblockIncluded = false;
        var firstTimeInclusion = false;
        var valueReady;
        if (codeblock['included'] !== undefined) {
          codeblockIncluded = !!readBits(1);
        } else {
          precinct = codeblock.precinct;
          var inclusionTree, zeroBitPlanesTree;
          if (precinct['inclusionTree'] !== undefined) {
            inclusionTree = precinct.inclusionTree;
          } else {
            var width = precinct.cbxMax - precinct.cbxMin + 1;
            var height = precinct.cbyMax - precinct.cbyMin + 1;
            inclusionTree = new InclusionTree(width, height, layerNumber);
            zeroBitPlanesTree = new TagTree(width, height);
            precinct.inclusionTree = inclusionTree;
            precinct.zeroBitPlanesTree = zeroBitPlanesTree;
          }
          if (inclusionTree.reset(codeblockColumn, codeblockRow, layerNumber)) {
            while (true) {
              if (readBits(1)) {
                valueReady = !inclusionTree.nextLevel();
                if (valueReady) {
                  codeblock.included = true;
                  codeblockIncluded = firstTimeInclusion = true;
                  break;
                }
              } else {
                inclusionTree.incrementValue(layerNumber);
                break;
              }
            }
          }
        }
        if (!codeblockIncluded) {
          continue;
        }
        if (firstTimeInclusion) {
          zeroBitPlanesTree = precinct.zeroBitPlanesTree;
          zeroBitPlanesTree.reset(codeblockColumn, codeblockRow);
          while (true) {
            if (readBits(1)) {
              valueReady = !zeroBitPlanesTree.nextLevel();
              if (valueReady) {
                break;
              }
            } else {
              zeroBitPlanesTree.incrementValue();
            }
          }
          codeblock.zeroBitPlanes = zeroBitPlanesTree.value;
        }
        var codingpasses = readCodingpasses();
        while (readBits(1)) {
          codeblock.Lblock++;
        }
        var codingpassesLog2 = log2(codingpasses);
        var bits = (codingpasses < 1 << codingpassesLog2 ? codingpassesLog2 - 1 : codingpassesLog2) + codeblock.Lblock;
        var codedDataLength = readBits(bits);
        queue.push({
          codeblock: codeblock,
          codingpasses: codingpasses,
          dataLength: codedDataLength
        });
      }
      alignToByte();
      if (ephMarkerUsed) {
        skipMarkerIfEqual(0x92);
      }
      while (queue.length > 0) {
        var packetItem = queue.shift();
        codeblock = packetItem.codeblock;
        if (codeblock['data'] === undefined) {
          codeblock.data = [];
        }
        codeblock.data.push({
          data: data,
          start: offset + position,
          end: offset + position + packetItem.dataLength,
          codingpasses: packetItem.codingpasses
        });
        position += packetItem.dataLength;
      }
    }
    return position;
  }
  function copyCoefficients(coefficients, levelWidth, levelHeight, subband, delta, mb, reversible, segmentationSymbolUsed) {
    var x0 = subband.tbx0;
    var y0 = subband.tby0;
    var width = subband.tbx1 - subband.tbx0;
    var codeblocks = subband.codeblocks;
    var right = subband.type.charAt(0) === 'H' ? 1 : 0;
    var bottom = subband.type.charAt(1) === 'H' ? levelWidth : 0;
    for (var i = 0, ii = codeblocks.length; i < ii; ++i) {
      var codeblock = codeblocks[i];
      var blockWidth = codeblock.tbx1_ - codeblock.tbx0_;
      var blockHeight = codeblock.tby1_ - codeblock.tby0_;
      if (blockWidth === 0 || blockHeight === 0) {
        continue;
      }
      if (codeblock['data'] === undefined) {
        continue;
      }
      var bitModel, currentCodingpassType;
      bitModel = new BitModel(blockWidth, blockHeight, codeblock.subbandType, codeblock.zeroBitPlanes, mb);
      currentCodingpassType = 2;
      var data = codeblock.data,
          totalLength = 0,
          codingpasses = 0;
      var j, jj, dataItem;
      for (j = 0, jj = data.length; j < jj; j++) {
        dataItem = data[j];
        totalLength += dataItem.end - dataItem.start;
        codingpasses += dataItem.codingpasses;
      }
      var encodedData = new Uint8Array(totalLength);
      var position = 0;
      for (j = 0, jj = data.length; j < jj; j++) {
        dataItem = data[j];
        var chunk = dataItem.data.subarray(dataItem.start, dataItem.end);
        encodedData.set(chunk, position);
        position += chunk.length;
      }
      var decoder = new ArithmeticDecoder(encodedData, 0, totalLength);
      bitModel.setDecoder(decoder);
      for (j = 0; j < codingpasses; j++) {
        switch (currentCodingpassType) {
          case 0:
            bitModel.runSignificancePropagationPass();
            break;
          case 1:
            bitModel.runMagnitudeRefinementPass();
            break;
          case 2:
            bitModel.runCleanupPass();
            if (segmentationSymbolUsed) {
              bitModel.checkSegmentationSymbol();
            }
            break;
        }
        currentCodingpassType = (currentCodingpassType + 1) % 3;
      }
      var offset = codeblock.tbx0_ - x0 + (codeblock.tby0_ - y0) * width;
      var sign = bitModel.coefficentsSign;
      var magnitude = bitModel.coefficentsMagnitude;
      var bitsDecoded = bitModel.bitsDecoded;
      var magnitudeCorrection = reversible ? 0 : 0.5;
      var k, n, nb;
      position = 0;
      var interleave = subband.type !== 'LL';
      for (j = 0; j < blockHeight; j++) {
        var row = offset / width | 0;
        var levelOffset = 2 * row * (levelWidth - width) + right + bottom;
        for (k = 0; k < blockWidth; k++) {
          n = magnitude[position];
          if (n !== 0) {
            n = (n + magnitudeCorrection) * delta;
            if (sign[position] !== 0) {
              n = -n;
            }
            nb = bitsDecoded[position];
            var pos = interleave ? levelOffset + (offset << 1) : offset;
            if (reversible && nb >= mb) {
              coefficients[pos] = n;
            } else {
              coefficients[pos] = n * (1 << mb - nb);
            }
          }
          offset++;
          position++;
        }
        offset += width - blockWidth;
      }
    }
  }
  function transformTile(context, tile, c) {
    var component = tile.components[c];
    var codingStyleParameters = component.codingStyleParameters;
    var quantizationParameters = component.quantizationParameters;
    var decompositionLevelsCount = codingStyleParameters.decompositionLevelsCount;
    var spqcds = quantizationParameters.SPqcds;
    var scalarExpounded = quantizationParameters.scalarExpounded;
    var guardBits = quantizationParameters.guardBits;
    var segmentationSymbolUsed = codingStyleParameters.segmentationSymbolUsed;
    var precision = context.components[c].precision;
    var reversible = codingStyleParameters.reversibleTransformation;
    var transform = reversible ? new ReversibleTransform() : new IrreversibleTransform();
    var subbandCoefficients = [];
    var b = 0;
    for (var i = 0; i <= decompositionLevelsCount; i++) {
      var resolution = component.resolutions[i];
      var width = resolution.trx1 - resolution.trx0;
      var height = resolution.try1 - resolution.try0;
      var coefficients = new Float32Array(width * height);
      for (var j = 0, jj = resolution.subbands.length; j < jj; j++) {
        var mu, epsilon;
        if (!scalarExpounded) {
          mu = spqcds[0].mu;
          epsilon = spqcds[0].epsilon + (i > 0 ? 1 - i : 0);
        } else {
          mu = spqcds[b].mu;
          epsilon = spqcds[b].epsilon;
          b++;
        }
        var subband = resolution.subbands[j];
        var gainLog2 = SubbandsGainLog2[subband.type];
        var delta = reversible ? 1 : Math.pow(2, precision + gainLog2 - epsilon) * (1 + mu / 2048);
        var mb = guardBits + epsilon - 1;
        copyCoefficients(coefficients, width, height, subband, delta, mb, reversible, segmentationSymbolUsed);
      }
      subbandCoefficients.push({
        width: width,
        height: height,
        items: coefficients
      });
    }
    var result = transform.calculate(subbandCoefficients, component.tcx0, component.tcy0);
    return {
      left: component.tcx0,
      top: component.tcy0,
      width: result.width,
      height: result.height,
      items: result.items
    };
  }
  function transformComponents(context) {
    var siz = context.SIZ;
    var components = context.components;
    var componentsCount = siz.Csiz;
    var resultImages = [];
    for (var i = 0, ii = context.tiles.length; i < ii; i++) {
      var tile = context.tiles[i];
      var transformedTiles = [];
      var c;
      for (c = 0; c < componentsCount; c++) {
        transformedTiles[c] = transformTile(context, tile, c);
      }
      var tile0 = transformedTiles[0];
      var out = new Uint8Array(tile0.items.length * componentsCount);
      var result = {
        left: tile0.left,
        top: tile0.top,
        width: tile0.width,
        height: tile0.height,
        items: out
      };
      var shift, offset, max, min, maxK;
      var pos = 0,
          j,
          jj,
          y0,
          y1,
          y2,
          r,
          g,
          b,
          k,
          val;
      if (tile.codingStyleDefaultParameters.multipleComponentTransform) {
        var fourComponents = componentsCount === 4;
        var y0items = transformedTiles[0].items;
        var y1items = transformedTiles[1].items;
        var y2items = transformedTiles[2].items;
        var y3items = fourComponents ? transformedTiles[3].items : null;
        shift = components[0].precision - 8;
        offset = (128 << shift) + 0.5;
        max = 255 * (1 << shift);
        maxK = max * 0.5;
        min = -maxK;
        var component0 = tile.components[0];
        var alpha01 = componentsCount - 3;
        jj = y0items.length;
        if (!component0.codingStyleParameters.reversibleTransformation) {
          for (j = 0; j < jj; j++, pos += alpha01) {
            y0 = y0items[j] + offset;
            y1 = y1items[j];
            y2 = y2items[j];
            r = y0 + 1.402 * y2;
            g = y0 - 0.34413 * y1 - 0.71414 * y2;
            b = y0 + 1.772 * y1;
            out[pos++] = r <= 0 ? 0 : r >= max ? 255 : r >> shift;
            out[pos++] = g <= 0 ? 0 : g >= max ? 255 : g >> shift;
            out[pos++] = b <= 0 ? 0 : b >= max ? 255 : b >> shift;
          }
        } else {
          for (j = 0; j < jj; j++, pos += alpha01) {
            y0 = y0items[j] + offset;
            y1 = y1items[j];
            y2 = y2items[j];
            g = y0 - (y2 + y1 >> 2);
            r = g + y2;
            b = g + y1;
            out[pos++] = r <= 0 ? 0 : r >= max ? 255 : r >> shift;
            out[pos++] = g <= 0 ? 0 : g >= max ? 255 : g >> shift;
            out[pos++] = b <= 0 ? 0 : b >= max ? 255 : b >> shift;
          }
        }
        if (fourComponents) {
          for (j = 0, pos = 3; j < jj; j++, pos += 4) {
            k = y3items[j];
            out[pos] = k <= min ? 0 : k >= maxK ? 255 : k + offset >> shift;
          }
        }
      } else {
        for (c = 0; c < componentsCount; c++) {
          var items = transformedTiles[c].items;
          shift = components[c].precision - 8;
          offset = (128 << shift) + 0.5;
          max = 127.5 * (1 << shift);
          min = -max;
          for (pos = c, j = 0, jj = items.length; j < jj; j++) {
            val = items[j];
            out[pos] = val <= min ? 0 : val >= max ? 255 : val + offset >> shift;
            pos += componentsCount;
          }
        }
      }
      resultImages.push(result);
    }
    return resultImages;
  }
  function initializeTile(context, tileIndex) {
    var siz = context.SIZ;
    var componentsCount = siz.Csiz;
    var tile = context.tiles[tileIndex];
    for (var c = 0; c < componentsCount; c++) {
      var component = tile.components[c];
      var qcdOrQcc = context.currentTile.QCC[c] !== undefined ? context.currentTile.QCC[c] : context.currentTile.QCD;
      component.quantizationParameters = qcdOrQcc;
      var codOrCoc = context.currentTile.COC[c] !== undefined ? context.currentTile.COC[c] : context.currentTile.COD;
      component.codingStyleParameters = codOrCoc;
    }
    tile.codingStyleDefaultParameters = context.currentTile.COD;
  }
  var TagTree = function TagTreeClosure() {
    function TagTree(width, height) {
      var levelsLength = log2(Math.max(width, height)) + 1;
      this.levels = [];
      for (var i = 0; i < levelsLength; i++) {
        var level = {
          width: width,
          height: height,
          items: []
        };
        this.levels.push(level);
        width = Math.ceil(width / 2);
        height = Math.ceil(height / 2);
      }
    }
    TagTree.prototype = {
      reset: function TagTree_reset(i, j) {
        var currentLevel = 0,
            value = 0,
            level;
        while (currentLevel < this.levels.length) {
          level = this.levels[currentLevel];
          var index = i + j * level.width;
          if (level.items[index] !== undefined) {
            value = level.items[index];
            break;
          }
          level.index = index;
          i >>= 1;
          j >>= 1;
          currentLevel++;
        }
        currentLevel--;
        level = this.levels[currentLevel];
        level.items[level.index] = value;
        this.currentLevel = currentLevel;
        delete this.value;
      },
      incrementValue: function TagTree_incrementValue() {
        var level = this.levels[this.currentLevel];
        level.items[level.index]++;
      },
      nextLevel: function TagTree_nextLevel() {
        var currentLevel = this.currentLevel;
        var level = this.levels[currentLevel];
        var value = level.items[level.index];
        currentLevel--;
        if (currentLevel < 0) {
          this.value = value;
          return false;
        }
        this.currentLevel = currentLevel;
        level = this.levels[currentLevel];
        level.items[level.index] = value;
        return true;
      }
    };
    return TagTree;
  }();
  var InclusionTree = function InclusionTreeClosure() {
    function InclusionTree(width, height, defaultValue) {
      var levelsLength = log2(Math.max(width, height)) + 1;
      this.levels = [];
      for (var i = 0; i < levelsLength; i++) {
        var items = new Uint8Array(width * height);
        for (var j = 0, jj = items.length; j < jj; j++) {
          items[j] = defaultValue;
        }
        var level = {
          width: width,
          height: height,
          items: items
        };
        this.levels.push(level);
        width = Math.ceil(width / 2);
        height = Math.ceil(height / 2);
      }
    }
    InclusionTree.prototype = {
      reset: function InclusionTree_reset(i, j, stopValue) {
        var currentLevel = 0;
        while (currentLevel < this.levels.length) {
          var level = this.levels[currentLevel];
          var index = i + j * level.width;
          level.index = index;
          var value = level.items[index];
          if (value === 0xFF) {
            break;
          }
          if (value > stopValue) {
            this.currentLevel = currentLevel;
            this.propagateValues();
            return false;
          }
          i >>= 1;
          j >>= 1;
          currentLevel++;
        }
        this.currentLevel = currentLevel - 1;
        return true;
      },
      incrementValue: function InclusionTree_incrementValue(stopValue) {
        var level = this.levels[this.currentLevel];
        level.items[level.index] = stopValue + 1;
        this.propagateValues();
      },
      propagateValues: function InclusionTree_propagateValues() {
        var levelIndex = this.currentLevel;
        var level = this.levels[levelIndex];
        var currentValue = level.items[level.index];
        while (--levelIndex >= 0) {
          level = this.levels[levelIndex];
          level.items[level.index] = currentValue;
        }
      },
      nextLevel: function InclusionTree_nextLevel() {
        var currentLevel = this.currentLevel;
        var level = this.levels[currentLevel];
        var value = level.items[level.index];
        level.items[level.index] = 0xFF;
        currentLevel--;
        if (currentLevel < 0) {
          return false;
        }
        this.currentLevel = currentLevel;
        level = this.levels[currentLevel];
        level.items[level.index] = value;
        return true;
      }
    };
    return InclusionTree;
  }();
  var BitModel = function BitModelClosure() {
    var UNIFORM_CONTEXT = 17;
    var RUNLENGTH_CONTEXT = 18;
    var LLAndLHContextsLabel = new Uint8Array([0, 5, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 1, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8]);
    var HLContextLabel = new Uint8Array([0, 3, 4, 0, 5, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 1, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8]);
    var HHContextLabel = new Uint8Array([0, 1, 2, 0, 1, 2, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 3, 4, 5, 0, 4, 5, 5, 0, 5, 5, 5, 0, 0, 0, 0, 0, 6, 7, 7, 0, 7, 7, 7, 0, 7, 7, 7, 0, 0, 0, 0, 0, 8, 8, 8, 0, 8, 8, 8, 0, 8, 8, 8, 0, 0, 0, 0, 0, 8, 8, 8, 0, 8, 8, 8, 0, 8, 8, 8]);
    function BitModel(width, height, subband, zeroBitPlanes, mb) {
      this.width = width;
      this.height = height;
      this.contextLabelTable = subband === 'HH' ? HHContextLabel : subband === 'HL' ? HLContextLabel : LLAndLHContextsLabel;
      var coefficientCount = width * height;
      this.neighborsSignificance = new Uint8Array(coefficientCount);
      this.coefficentsSign = new Uint8Array(coefficientCount);
      this.coefficentsMagnitude = mb > 14 ? new Uint32Array(coefficientCount) : mb > 6 ? new Uint16Array(coefficientCount) : new Uint8Array(coefficientCount);
      this.processingFlags = new Uint8Array(coefficientCount);
      var bitsDecoded = new Uint8Array(coefficientCount);
      if (zeroBitPlanes !== 0) {
        for (var i = 0; i < coefficientCount; i++) {
          bitsDecoded[i] = zeroBitPlanes;
        }
      }
      this.bitsDecoded = bitsDecoded;
      this.reset();
    }
    BitModel.prototype = {
      setDecoder: function BitModel_setDecoder(decoder) {
        this.decoder = decoder;
      },
      reset: function BitModel_reset() {
        this.contexts = new Int8Array(19);
        this.contexts[0] = 4 << 1 | 0;
        this.contexts[UNIFORM_CONTEXT] = 46 << 1 | 0;
        this.contexts[RUNLENGTH_CONTEXT] = 3 << 1 | 0;
      },
      setNeighborsSignificance: function BitModel_setNeighborsSignificance(row, column, index) {
        var neighborsSignificance = this.neighborsSignificance;
        var width = this.width,
            height = this.height;
        var left = column > 0;
        var right = column + 1 < width;
        var i;
        if (row > 0) {
          i = index - width;
          if (left) {
            neighborsSignificance[i - 1] += 0x10;
          }
          if (right) {
            neighborsSignificance[i + 1] += 0x10;
          }
          neighborsSignificance[i] += 0x04;
        }
        if (row + 1 < height) {
          i = index + width;
          if (left) {
            neighborsSignificance[i - 1] += 0x10;
          }
          if (right) {
            neighborsSignificance[i + 1] += 0x10;
          }
          neighborsSignificance[i] += 0x04;
        }
        if (left) {
          neighborsSignificance[index - 1] += 0x01;
        }
        if (right) {
          neighborsSignificance[index + 1] += 0x01;
        }
        neighborsSignificance[index] |= 0x80;
      },
      runSignificancePropagationPass: function BitModel_runSignificancePropagationPass() {
        var decoder = this.decoder;
        var width = this.width,
            height = this.height;
        var coefficentsMagnitude = this.coefficentsMagnitude;
        var coefficentsSign = this.coefficentsSign;
        var neighborsSignificance = this.neighborsSignificance;
        var processingFlags = this.processingFlags;
        var contexts = this.contexts;
        var labels = this.contextLabelTable;
        var bitsDecoded = this.bitsDecoded;
        var processedInverseMask = ~1;
        var processedMask = 1;
        var firstMagnitudeBitMask = 2;
        for (var i0 = 0; i0 < height; i0 += 4) {
          for (var j = 0; j < width; j++) {
            var index = i0 * width + j;
            for (var i1 = 0; i1 < 4; i1++, index += width) {
              var i = i0 + i1;
              if (i >= height) {
                break;
              }
              processingFlags[index] &= processedInverseMask;
              if (coefficentsMagnitude[index] || !neighborsSignificance[index]) {
                continue;
              }
              var contextLabel = labels[neighborsSignificance[index]];
              var decision = decoder.readBit(contexts, contextLabel);
              if (decision) {
                var sign = this.decodeSignBit(i, j, index);
                coefficentsSign[index] = sign;
                coefficentsMagnitude[index] = 1;
                this.setNeighborsSignificance(i, j, index);
                processingFlags[index] |= firstMagnitudeBitMask;
              }
              bitsDecoded[index]++;
              processingFlags[index] |= processedMask;
            }
          }
        }
      },
      decodeSignBit: function BitModel_decodeSignBit(row, column, index) {
        var width = this.width,
            height = this.height;
        var coefficentsMagnitude = this.coefficentsMagnitude;
        var coefficentsSign = this.coefficentsSign;
        var contribution, sign0, sign1, significance1;
        var contextLabel, decoded;
        significance1 = column > 0 && coefficentsMagnitude[index - 1] !== 0;
        if (column + 1 < width && coefficentsMagnitude[index + 1] !== 0) {
          sign1 = coefficentsSign[index + 1];
          if (significance1) {
            sign0 = coefficentsSign[index - 1];
            contribution = 1 - sign1 - sign0;
          } else {
            contribution = 1 - sign1 - sign1;
          }
        } else if (significance1) {
          sign0 = coefficentsSign[index - 1];
          contribution = 1 - sign0 - sign0;
        } else {
          contribution = 0;
        }
        var horizontalContribution = 3 * contribution;
        significance1 = row > 0 && coefficentsMagnitude[index - width] !== 0;
        if (row + 1 < height && coefficentsMagnitude[index + width] !== 0) {
          sign1 = coefficentsSign[index + width];
          if (significance1) {
            sign0 = coefficentsSign[index - width];
            contribution = 1 - sign1 - sign0 + horizontalContribution;
          } else {
            contribution = 1 - sign1 - sign1 + horizontalContribution;
          }
        } else if (significance1) {
          sign0 = coefficentsSign[index - width];
          contribution = 1 - sign0 - sign0 + horizontalContribution;
        } else {
          contribution = horizontalContribution;
        }
        if (contribution >= 0) {
          contextLabel = 9 + contribution;
          decoded = this.decoder.readBit(this.contexts, contextLabel);
        } else {
          contextLabel = 9 - contribution;
          decoded = this.decoder.readBit(this.contexts, contextLabel) ^ 1;
        }
        return decoded;
      },
      runMagnitudeRefinementPass: function BitModel_runMagnitudeRefinementPass() {
        var decoder = this.decoder;
        var width = this.width,
            height = this.height;
        var coefficentsMagnitude = this.coefficentsMagnitude;
        var neighborsSignificance = this.neighborsSignificance;
        var contexts = this.contexts;
        var bitsDecoded = this.bitsDecoded;
        var processingFlags = this.processingFlags;
        var processedMask = 1;
        var firstMagnitudeBitMask = 2;
        var length = width * height;
        var width4 = width * 4;
        for (var index0 = 0, indexNext; index0 < length; index0 = indexNext) {
          indexNext = Math.min(length, index0 + width4);
          for (var j = 0; j < width; j++) {
            for (var index = index0 + j; index < indexNext; index += width) {
              if (!coefficentsMagnitude[index] || (processingFlags[index] & processedMask) !== 0) {
                continue;
              }
              var contextLabel = 16;
              if ((processingFlags[index] & firstMagnitudeBitMask) !== 0) {
                processingFlags[index] ^= firstMagnitudeBitMask;
                var significance = neighborsSignificance[index] & 127;
                contextLabel = significance === 0 ? 15 : 14;
              }
              var bit = decoder.readBit(contexts, contextLabel);
              coefficentsMagnitude[index] = coefficentsMagnitude[index] << 1 | bit;
              bitsDecoded[index]++;
              processingFlags[index] |= processedMask;
            }
          }
        }
      },
      runCleanupPass: function BitModel_runCleanupPass() {
        var decoder = this.decoder;
        var width = this.width,
            height = this.height;
        var neighborsSignificance = this.neighborsSignificance;
        var coefficentsMagnitude = this.coefficentsMagnitude;
        var coefficentsSign = this.coefficentsSign;
        var contexts = this.contexts;
        var labels = this.contextLabelTable;
        var bitsDecoded = this.bitsDecoded;
        var processingFlags = this.processingFlags;
        var processedMask = 1;
        var firstMagnitudeBitMask = 2;
        var oneRowDown = width;
        var twoRowsDown = width * 2;
        var threeRowsDown = width * 3;
        var iNext;
        for (var i0 = 0; i0 < height; i0 = iNext) {
          iNext = Math.min(i0 + 4, height);
          var indexBase = i0 * width;
          var checkAllEmpty = i0 + 3 < height;
          for (var j = 0; j < width; j++) {
            var index0 = indexBase + j;
            var allEmpty = checkAllEmpty && processingFlags[index0] === 0 && processingFlags[index0 + oneRowDown] === 0 && processingFlags[index0 + twoRowsDown] === 0 && processingFlags[index0 + threeRowsDown] === 0 && neighborsSignificance[index0] === 0 && neighborsSignificance[index0 + oneRowDown] === 0 && neighborsSignificance[index0 + twoRowsDown] === 0 && neighborsSignificance[index0 + threeRowsDown] === 0;
            var i1 = 0,
                index = index0;
            var i = i0,
                sign;
            if (allEmpty) {
              var hasSignificantCoefficent = decoder.readBit(contexts, RUNLENGTH_CONTEXT);
              if (!hasSignificantCoefficent) {
                bitsDecoded[index0]++;
                bitsDecoded[index0 + oneRowDown]++;
                bitsDecoded[index0 + twoRowsDown]++;
                bitsDecoded[index0 + threeRowsDown]++;
                continue;
              }
              i1 = decoder.readBit(contexts, UNIFORM_CONTEXT) << 1 | decoder.readBit(contexts, UNIFORM_CONTEXT);
              if (i1 !== 0) {
                i = i0 + i1;
                index += i1 * width;
              }
              sign = this.decodeSignBit(i, j, index);
              coefficentsSign[index] = sign;
              coefficentsMagnitude[index] = 1;
              this.setNeighborsSignificance(i, j, index);
              processingFlags[index] |= firstMagnitudeBitMask;
              index = index0;
              for (var i2 = i0; i2 <= i; i2++, index += width) {
                bitsDecoded[index]++;
              }
              i1++;
            }
            for (i = i0 + i1; i < iNext; i++, index += width) {
              if (coefficentsMagnitude[index] || (processingFlags[index] & processedMask) !== 0) {
                continue;
              }
              var contextLabel = labels[neighborsSignificance[index]];
              var decision = decoder.readBit(contexts, contextLabel);
              if (decision === 1) {
                sign = this.decodeSignBit(i, j, index);
                coefficentsSign[index] = sign;
                coefficentsMagnitude[index] = 1;
                this.setNeighborsSignificance(i, j, index);
                processingFlags[index] |= firstMagnitudeBitMask;
              }
              bitsDecoded[index]++;
            }
          }
        }
      },
      checkSegmentationSymbol: function BitModel_checkSegmentationSymbol() {
        var decoder = this.decoder;
        var contexts = this.contexts;
        var symbol = decoder.readBit(contexts, UNIFORM_CONTEXT) << 3 | decoder.readBit(contexts, UNIFORM_CONTEXT) << 2 | decoder.readBit(contexts, UNIFORM_CONTEXT) << 1 | decoder.readBit(contexts, UNIFORM_CONTEXT);
        if (symbol !== 0xA) {
          error('JPX Error: Invalid segmentation symbol');
        }
      }
    };
    return BitModel;
  }();
  var Transform = function TransformClosure() {
    function Transform() {}
    Transform.prototype.calculate = function transformCalculate(subbands, u0, v0) {
      var ll = subbands[0];
      for (var i = 1, ii = subbands.length; i < ii; i++) {
        ll = this.iterate(ll, subbands[i], u0, v0);
      }
      return ll;
    };
    Transform.prototype.extend = function extend(buffer, offset, size) {
      var i1 = offset - 1,
          j1 = offset + 1;
      var i2 = offset + size - 2,
          j2 = offset + size;
      buffer[i1--] = buffer[j1++];
      buffer[j2++] = buffer[i2--];
      buffer[i1--] = buffer[j1++];
      buffer[j2++] = buffer[i2--];
      buffer[i1--] = buffer[j1++];
      buffer[j2++] = buffer[i2--];
      buffer[i1] = buffer[j1];
      buffer[j2] = buffer[i2];
    };
    Transform.prototype.iterate = function Transform_iterate(ll, hl_lh_hh, u0, v0) {
      var llWidth = ll.width,
          llHeight = ll.height,
          llItems = ll.items;
      var width = hl_lh_hh.width;
      var height = hl_lh_hh.height;
      var items = hl_lh_hh.items;
      var i, j, k, l, u, v;
      for (k = 0, i = 0; i < llHeight; i++) {
        l = i * 2 * width;
        for (j = 0; j < llWidth; j++, k++, l += 2) {
          items[l] = llItems[k];
        }
      }
      llItems = ll.items = null;
      var bufferPadding = 4;
      var rowBuffer = new Float32Array(width + 2 * bufferPadding);
      if (width === 1) {
        if ((u0 & 1) !== 0) {
          for (v = 0, k = 0; v < height; v++, k += width) {
            items[k] *= 0.5;
          }
        }
      } else {
        for (v = 0, k = 0; v < height; v++, k += width) {
          rowBuffer.set(items.subarray(k, k + width), bufferPadding);
          this.extend(rowBuffer, bufferPadding, width);
          this.filter(rowBuffer, bufferPadding, width);
          items.set(rowBuffer.subarray(bufferPadding, bufferPadding + width), k);
        }
      }
      var numBuffers = 16;
      var colBuffers = [];
      for (i = 0; i < numBuffers; i++) {
        colBuffers.push(new Float32Array(height + 2 * bufferPadding));
      }
      var b,
          currentBuffer = 0;
      ll = bufferPadding + height;
      if (height === 1) {
        if ((v0 & 1) !== 0) {
          for (u = 0; u < width; u++) {
            items[u] *= 0.5;
          }
        }
      } else {
        for (u = 0; u < width; u++) {
          if (currentBuffer === 0) {
            numBuffers = Math.min(width - u, numBuffers);
            for (k = u, l = bufferPadding; l < ll; k += width, l++) {
              for (b = 0; b < numBuffers; b++) {
                colBuffers[b][l] = items[k + b];
              }
            }
            currentBuffer = numBuffers;
          }
          currentBuffer--;
          var buffer = colBuffers[currentBuffer];
          this.extend(buffer, bufferPadding, height);
          this.filter(buffer, bufferPadding, height);
          if (currentBuffer === 0) {
            k = u - numBuffers + 1;
            for (l = bufferPadding; l < ll; k += width, l++) {
              for (b = 0; b < numBuffers; b++) {
                items[k + b] = colBuffers[b][l];
              }
            }
          }
        }
      }
      return {
        width: width,
        height: height,
        items: items
      };
    };
    return Transform;
  }();
  var IrreversibleTransform = function IrreversibleTransformClosure() {
    function IrreversibleTransform() {
      Transform.call(this);
    }
    IrreversibleTransform.prototype = Object.create(Transform.prototype);
    IrreversibleTransform.prototype.filter = function irreversibleTransformFilter(x, offset, length) {
      var len = length >> 1;
      offset = offset | 0;
      var j, n, current, next;
      var alpha = -1.586134342059924;
      var beta = -0.052980118572961;
      var gamma = 0.882911075530934;
      var delta = 0.443506852043971;
      var K = 1.230174104914001;
      var K_ = 1 / K;
      j = offset - 3;
      for (n = len + 4; n--; j += 2) {
        x[j] *= K_;
      }
      j = offset - 2;
      current = delta * x[j - 1];
      for (n = len + 3; n--; j += 2) {
        next = delta * x[j + 1];
        x[j] = K * x[j] - current - next;
        if (n--) {
          j += 2;
          current = delta * x[j + 1];
          x[j] = K * x[j] - current - next;
        } else {
          break;
        }
      }
      j = offset - 1;
      current = gamma * x[j - 1];
      for (n = len + 2; n--; j += 2) {
        next = gamma * x[j + 1];
        x[j] -= current + next;
        if (n--) {
          j += 2;
          current = gamma * x[j + 1];
          x[j] -= current + next;
        } else {
          break;
        }
      }
      j = offset;
      current = beta * x[j - 1];
      for (n = len + 1; n--; j += 2) {
        next = beta * x[j + 1];
        x[j] -= current + next;
        if (n--) {
          j += 2;
          current = beta * x[j + 1];
          x[j] -= current + next;
        } else {
          break;
        }
      }
      if (len !== 0) {
        j = offset + 1;
        current = alpha * x[j - 1];
        for (n = len; n--; j += 2) {
          next = alpha * x[j + 1];
          x[j] -= current + next;
          if (n--) {
            j += 2;
            current = alpha * x[j + 1];
            x[j] -= current + next;
          } else {
            break;
          }
        }
      }
    };
    return IrreversibleTransform;
  }();
  var ReversibleTransform = function ReversibleTransformClosure() {
    function ReversibleTransform() {
      Transform.call(this);
    }
    ReversibleTransform.prototype = Object.create(Transform.prototype);
    ReversibleTransform.prototype.filter = function reversibleTransformFilter(x, offset, length) {
      var len = length >> 1;
      offset = offset | 0;
      var j, n;
      for (j = offset, n = len + 1; n--; j += 2) {
        x[j] -= x[j - 1] + x[j + 1] + 2 >> 2;
      }
      for (j = offset + 1, n = len; n--; j += 2) {
        x[j] += x[j - 1] + x[j + 1] >> 1;
      }
    };
    return ReversibleTransform;
  }();
  return JpxImage;
}();

	
	"use strict";
    
	var Jbig2Image = function Jbig2ImageClosure() {
  function ContextCache() {}
  ContextCache.prototype = {
    getContexts: function (id) {
      if (id in this) {
        return this[id];
      }
      return this[id] = new Int8Array(1 << 16);
    }
  };
  function DecodingContext(data, start, end) {
    this.data = data;
    this.start = start;
    this.end = end;
  }
  DecodingContext.prototype = {
    get decoder() {
      var decoder = new ArithmeticDecoder(this.data, this.start, this.end);
      return shadow(this, 'decoder', decoder);
    },
    get contextCache() {
      var cache = new ContextCache();
      return shadow(this, 'contextCache', cache);
    }
  };
  function decodeInteger(contextCache, procedure, decoder) {
    var contexts = contextCache.getContexts(procedure);
    var prev = 1;
    function readBits(length) {
      var v = 0;
      for (var i = 0; i < length; i++) {
        var bit = decoder.readBit(contexts, prev);
        prev = prev < 256 ? prev << 1 | bit : (prev << 1 | bit) & 511 | 256;
        v = v << 1 | bit;
      }
      return v >>> 0;
    }
    var sign = readBits(1);
    var value = readBits(1) ? readBits(1) ? readBits(1) ? readBits(1) ? readBits(1) ? readBits(32) + 4436 : readBits(12) + 340 : readBits(8) + 84 : readBits(6) + 20 : readBits(4) + 4 : readBits(2);
    return sign === 0 ? value : value > 0 ? -value : null;
  }
  function decodeIAID(contextCache, decoder, codeLength) {
    var contexts = contextCache.getContexts('IAID');
    var prev = 1;
    for (var i = 0; i < codeLength; i++) {
      var bit = decoder.readBit(contexts, prev);
      prev = prev << 1 | bit;
    }
    if (codeLength < 31) {
      return prev & (1 << codeLength) - 1;
    }
    return prev & 0x7FFFFFFF;
  }
  var SegmentTypes = ['SymbolDictionary', null, null, null, 'IntermediateTextRegion', null, 'ImmediateTextRegion', 'ImmediateLosslessTextRegion', null, null, null, null, null, null, null, null, 'patternDictionary', null, null, null, 'IntermediateHalftoneRegion', null, 'ImmediateHalftoneRegion', 'ImmediateLosslessHalftoneRegion', null, null, null, null, null, null, null, null, null, null, null, null, 'IntermediateGenericRegion', null, 'ImmediateGenericRegion', 'ImmediateLosslessGenericRegion', 'IntermediateGenericRefinementRegion', null, 'ImmediateGenericRefinementRegion', 'ImmediateLosslessGenericRefinementRegion', null, null, null, null, 'PageInformation', 'EndOfPage', 'EndOfStripe', 'EndOfFile', 'Profiles', 'Tables', null, null, null, null, null, null, null, null, 'Extension'];
  var CodingTemplates = [[{
    x: -1,
    y: -2
  }, {
    x: 0,
    y: -2
  }, {
    x: 1,
    y: -2
  }, {
    x: -2,
    y: -1
  }, {
    x: -1,
    y: -1
  }, {
    x: 0,
    y: -1
  }, {
    x: 1,
    y: -1
  }, {
    x: 2,
    y: -1
  }, {
    x: -4,
    y: 0
  }, {
    x: -3,
    y: 0
  }, {
    x: -2,
    y: 0
  }, {
    x: -1,
    y: 0
  }], [{
    x: -1,
    y: -2
  }, {
    x: 0,
    y: -2
  }, {
    x: 1,
    y: -2
  }, {
    x: 2,
    y: -2
  }, {
    x: -2,
    y: -1
  }, {
    x: -1,
    y: -1
  }, {
    x: 0,
    y: -1
  }, {
    x: 1,
    y: -1
  }, {
    x: 2,
    y: -1
  }, {
    x: -3,
    y: 0
  }, {
    x: -2,
    y: 0
  }, {
    x: -1,
    y: 0
  }], [{
    x: -1,
    y: -2
  }, {
    x: 0,
    y: -2
  }, {
    x: 1,
    y: -2
  }, {
    x: -2,
    y: -1
  }, {
    x: -1,
    y: -1
  }, {
    x: 0,
    y: -1
  }, {
    x: 1,
    y: -1
  }, {
    x: -2,
    y: 0
  }, {
    x: -1,
    y: 0
  }], [{
    x: -3,
    y: -1
  }, {
    x: -2,
    y: -1
  }, {
    x: -1,
    y: -1
  }, {
    x: 0,
    y: -1
  }, {
    x: 1,
    y: -1
  }, {
    x: -4,
    y: 0
  }, {
    x: -3,
    y: 0
  }, {
    x: -2,
    y: 0
  }, {
    x: -1,
    y: 0
  }]];
  var RefinementTemplates = [{
    coding: [{
      x: 0,
      y: -1
    }, {
      x: 1,
      y: -1
    }, {
      x: -1,
      y: 0
    }],
    reference: [{
      x: 0,
      y: -1
    }, {
      x: 1,
      y: -1
    }, {
      x: -1,
      y: 0
    }, {
      x: 0,
      y: 0
    }, {
      x: 1,
      y: 0
    }, {
      x: -1,
      y: 1
    }, {
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 1
    }]
  }, {
    coding: [{
      x: -1,
      y: -1
    }, {
      x: 0,
      y: -1
    }, {
      x: 1,
      y: -1
    }, {
      x: -1,
      y: 0
    }],
    reference: [{
      x: 0,
      y: -1
    }, {
      x: -1,
      y: 0
    }, {
      x: 0,
      y: 0
    }, {
      x: 1,
      y: 0
    }, {
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 1
    }]
  }];
  var ReusedContexts = [0x9B25, 0x0795, 0x00E5, 0x0195];
  var RefinementReusedContexts = [0x0020, 0x0008];
  function decodeBitmapTemplate0(width, height, decodingContext) {
    var decoder = decodingContext.decoder;
    var contexts = decodingContext.contextCache.getContexts('GB');
    var contextLabel,
        i,
        j,
        pixel,
        row,
        row1,
        row2,
        bitmap = [];
    var OLD_PIXEL_MASK = 0x7BF7;
    for (i = 0; i < height; i++) {
      row = bitmap[i] = new Uint8Array(width);
      row1 = i < 1 ? row : bitmap[i - 1];
      row2 = i < 2 ? row : bitmap[i - 2];
      contextLabel = row2[0] << 13 | row2[1] << 12 | row2[2] << 11 | row1[0] << 7 | row1[1] << 6 | row1[2] << 5 | row1[3] << 4;
      for (j = 0; j < width; j++) {
        row[j] = pixel = decoder.readBit(contexts, contextLabel);
        contextLabel = (contextLabel & OLD_PIXEL_MASK) << 1 | (j + 3 < width ? row2[j + 3] << 11 : 0) | (j + 4 < width ? row1[j + 4] << 4 : 0) | pixel;
      }
    }
    return bitmap;
  }
  function decodeBitmap(mmr, width, height, templateIndex, prediction, skip, at, decodingContext) {
    if (mmr) {
      error('JBIG2 error: MMR encoding is not supported');
    }
    if (templateIndex === 0 && !skip && !prediction && at.length === 4 && at[0].x === 3 && at[0].y === -1 && at[1].x === -3 && at[1].y === -1 && at[2].x === 2 && at[2].y === -2 && at[3].x === -2 && at[3].y === -2) {
      return decodeBitmapTemplate0(width, height, decodingContext);
    }
    var useskip = !!skip;
    var template = CodingTemplates[templateIndex].concat(at);
    template.sort(function (a, b) {
      return a.y - b.y || a.x - b.x;
    });
    var templateLength = template.length;
    var templateX = new Int8Array(templateLength);
    var templateY = new Int8Array(templateLength);
    var changingTemplateEntries = [];
    var reuseMask = 0,
        minX = 0,
        maxX = 0,
        minY = 0;
    var c, k;
    for (k = 0; k < templateLength; k++) {
      templateX[k] = template[k].x;
      templateY[k] = template[k].y;
      minX = Math.min(minX, template[k].x);
      maxX = Math.max(maxX, template[k].x);
      minY = Math.min(minY, template[k].y);
      if (k < templateLength - 1 && template[k].y === template[k + 1].y && template[k].x === template[k + 1].x - 1) {
        reuseMask |= 1 << templateLength - 1 - k;
      } else {
        changingTemplateEntries.push(k);
      }
    }
    var changingEntriesLength = changingTemplateEntries.length;
    var changingTemplateX = new Int8Array(changingEntriesLength);
    var changingTemplateY = new Int8Array(changingEntriesLength);
    var changingTemplateBit = new Uint16Array(changingEntriesLength);
    for (c = 0; c < changingEntriesLength; c++) {
      k = changingTemplateEntries[c];
      changingTemplateX[c] = template[k].x;
      changingTemplateY[c] = template[k].y;
      changingTemplateBit[c] = 1 << templateLength - 1 - k;
    }
    var sbb_left = -minX;
    var sbb_top = -minY;
    var sbb_right = width - maxX;
    var pseudoPixelContext = ReusedContexts[templateIndex];
    var row = new Uint8Array(width);
    var bitmap = [];
    var decoder = decodingContext.decoder;
    var contexts = decodingContext.contextCache.getContexts('GB');
    var ltp = 0,
        j,
        i0,
        j0,
        contextLabel = 0,
        bit,
        shift;
    for (var i = 0; i < height; i++) {
      if (prediction) {
        var sltp = decoder.readBit(contexts, pseudoPixelContext);
        ltp ^= sltp;
        if (ltp) {
          bitmap.push(row);
          continue;
        }
      }
      row = new Uint8Array(row);
      bitmap.push(row);
      for (j = 0; j < width; j++) {
        if (useskip && skip[i][j]) {
          row[j] = 0;
          continue;
        }
        if (j >= sbb_left && j < sbb_right && i >= sbb_top) {
          contextLabel = contextLabel << 1 & reuseMask;
          for (k = 0; k < changingEntriesLength; k++) {
            i0 = i + changingTemplateY[k];
            j0 = j + changingTemplateX[k];
            bit = bitmap[i0][j0];
            if (bit) {
              bit = changingTemplateBit[k];
              contextLabel |= bit;
            }
          }
        } else {
          contextLabel = 0;
          shift = templateLength - 1;
          for (k = 0; k < templateLength; k++, shift--) {
            j0 = j + templateX[k];
            if (j0 >= 0 && j0 < width) {
              i0 = i + templateY[k];
              if (i0 >= 0) {
                bit = bitmap[i0][j0];
                if (bit) {
                  contextLabel |= bit << shift;
                }
              }
            }
          }
        }
        var pixel = decoder.readBit(contexts, contextLabel);
        row[j] = pixel;
      }
    }
    return bitmap;
  }
  function decodeRefinement(width, height, templateIndex, referenceBitmap, offsetX, offsetY, prediction, at, decodingContext) {
    var codingTemplate = RefinementTemplates[templateIndex].coding;
    if (templateIndex === 0) {
      codingTemplate = codingTemplate.concat([at[0]]);
    }
    var codingTemplateLength = codingTemplate.length;
    var codingTemplateX = new Int32Array(codingTemplateLength);
    var codingTemplateY = new Int32Array(codingTemplateLength);
    var k;
    for (k = 0; k < codingTemplateLength; k++) {
      codingTemplateX[k] = codingTemplate[k].x;
      codingTemplateY[k] = codingTemplate[k].y;
    }
    var referenceTemplate = RefinementTemplates[templateIndex].reference;
    if (templateIndex === 0) {
      referenceTemplate = referenceTemplate.concat([at[1]]);
    }
    var referenceTemplateLength = referenceTemplate.length;
    var referenceTemplateX = new Int32Array(referenceTemplateLength);
    var referenceTemplateY = new Int32Array(referenceTemplateLength);
    for (k = 0; k < referenceTemplateLength; k++) {
      referenceTemplateX[k] = referenceTemplate[k].x;
      referenceTemplateY[k] = referenceTemplate[k].y;
    }
    var referenceWidth = referenceBitmap[0].length;
    var referenceHeight = referenceBitmap.length;
    var pseudoPixelContext = RefinementReusedContexts[templateIndex];
    var bitmap = [];
    var decoder = decodingContext.decoder;
    var contexts = decodingContext.contextCache.getContexts('GR');
    var ltp = 0;
    for (var i = 0; i < height; i++) {
      if (prediction) {
        var sltp = decoder.readBit(contexts, pseudoPixelContext);
        ltp ^= sltp;
        if (ltp) {
          error('JBIG2 error: prediction is not supported');
        }
      }
      var row = new Uint8Array(width);
      bitmap.push(row);
      for (var j = 0; j < width; j++) {
        var i0, j0;
        var contextLabel = 0;
        for (k = 0; k < codingTemplateLength; k++) {
          i0 = i + codingTemplateY[k];
          j0 = j + codingTemplateX[k];
          if (i0 < 0 || j0 < 0 || j0 >= width) {
            contextLabel <<= 1;
          } else {
            contextLabel = contextLabel << 1 | bitmap[i0][j0];
          }
        }
        for (k = 0; k < referenceTemplateLength; k++) {
          i0 = i + referenceTemplateY[k] + offsetY;
          j0 = j + referenceTemplateX[k] + offsetX;
          if (i0 < 0 || i0 >= referenceHeight || j0 < 0 || j0 >= referenceWidth) {
            contextLabel <<= 1;
          } else {
            contextLabel = contextLabel << 1 | referenceBitmap[i0][j0];
          }
        }
        var pixel = decoder.readBit(contexts, contextLabel);
        row[j] = pixel;
      }
    }
    return bitmap;
  }
  function decodeSymbolDictionary(huffman, refinement, symbols, numberOfNewSymbols, numberOfExportedSymbols, huffmanTables, templateIndex, at, refinementTemplateIndex, refinementAt, decodingContext) {
    if (huffman) {
      error('JBIG2 error: huffman is not supported');
    }
    var newSymbols = [];
    var currentHeight = 0;
    var symbolCodeLength = log2(symbols.length + numberOfNewSymbols);
    var decoder = decodingContext.decoder;
    var contextCache = decodingContext.contextCache;
    while (newSymbols.length < numberOfNewSymbols) {
      var deltaHeight = decodeInteger(contextCache, 'IADH', decoder);
      currentHeight += deltaHeight;
      var currentWidth = 0;
      while (true) {
        var deltaWidth = decodeInteger(contextCache, 'IADW', decoder);
        if (deltaWidth === null) {
          break;
        }
        currentWidth += deltaWidth;
        var bitmap;
        if (refinement) {
          var numberOfInstances = decodeInteger(contextCache, 'IAAI', decoder);
          if (numberOfInstances > 1) {
            bitmap = decodeTextRegion(huffman, refinement, currentWidth, currentHeight, 0, numberOfInstances, 1, symbols.concat(newSymbols), symbolCodeLength, 0, 0, 1, 0, huffmanTables, refinementTemplateIndex, refinementAt, decodingContext);
          } else {
            var symbolId = decodeIAID(contextCache, decoder, symbolCodeLength);
            var rdx = decodeInteger(contextCache, 'IARDX', decoder);
            var rdy = decodeInteger(contextCache, 'IARDY', decoder);
            var symbol = symbolId < symbols.length ? symbols[symbolId] : newSymbols[symbolId - symbols.length];
            bitmap = decodeRefinement(currentWidth, currentHeight, refinementTemplateIndex, symbol, rdx, rdy, false, refinementAt, decodingContext);
          }
        } else {
          bitmap = decodeBitmap(false, currentWidth, currentHeight, templateIndex, false, null, at, decodingContext);
        }
        newSymbols.push(bitmap);
      }
    }
    var exportedSymbols = [];
    var flags = [],
        currentFlag = false;
    var totalSymbolsLength = symbols.length + numberOfNewSymbols;
    while (flags.length < totalSymbolsLength) {
      var runLength = decodeInteger(contextCache, 'IAEX', decoder);
      while (runLength--) {
        flags.push(currentFlag);
      }
      currentFlag = !currentFlag;
    }
    for (var i = 0, ii = symbols.length; i < ii; i++) {
      if (flags[i]) {
        exportedSymbols.push(symbols[i]);
      }
    }
    for (var j = 0; j < numberOfNewSymbols; i++, j++) {
      if (flags[i]) {
        exportedSymbols.push(newSymbols[j]);
      }
    }
    return exportedSymbols;
  }
  function decodeTextRegion(huffman, refinement, width, height, defaultPixelValue, numberOfSymbolInstances, stripSize, inputSymbols, symbolCodeLength, transposed, dsOffset, referenceCorner, combinationOperator, huffmanTables, refinementTemplateIndex, refinementAt, decodingContext) {
    if (huffman) {
      error('JBIG2 error: huffman is not supported');
    }
    var bitmap = [];
    var i, row;
    for (i = 0; i < height; i++) {
      row = new Uint8Array(width);
      if (defaultPixelValue) {
        for (var j = 0; j < width; j++) {
          row[j] = defaultPixelValue;
        }
      }
      bitmap.push(row);
    }
    var decoder = decodingContext.decoder;
    var contextCache = decodingContext.contextCache;
    var stripT = -decodeInteger(contextCache, 'IADT', decoder);
    var firstS = 0;
    i = 0;
    while (i < numberOfSymbolInstances) {
      var deltaT = decodeInteger(contextCache, 'IADT', decoder);
      stripT += deltaT;
      var deltaFirstS = decodeInteger(contextCache, 'IAFS', decoder);
      firstS += deltaFirstS;
      var currentS = firstS;
      do {
        var currentT = stripSize === 1 ? 0 : decodeInteger(contextCache, 'IAIT', decoder);
        var t = stripSize * stripT + currentT;
        var symbolId = decodeIAID(contextCache, decoder, symbolCodeLength);
        var applyRefinement = refinement && decodeInteger(contextCache, 'IARI', decoder);
        var symbolBitmap = inputSymbols[symbolId];
        var symbolWidth = symbolBitmap[0].length;
        var symbolHeight = symbolBitmap.length;
        if (applyRefinement) {
          var rdw = decodeInteger(contextCache, 'IARDW', decoder);
          var rdh = decodeInteger(contextCache, 'IARDH', decoder);
          var rdx = decodeInteger(contextCache, 'IARDX', decoder);
          var rdy = decodeInteger(contextCache, 'IARDY', decoder);
          symbolWidth += rdw;
          symbolHeight += rdh;
          symbolBitmap = decodeRefinement(symbolWidth, symbolHeight, refinementTemplateIndex, symbolBitmap, (rdw >> 1) + rdx, (rdh >> 1) + rdy, false, refinementAt, decodingContext);
        }
        var offsetT = t - (referenceCorner & 1 ? 0 : symbolHeight);
        var offsetS = currentS - (referenceCorner & 2 ? symbolWidth : 0);
        var s2, t2, symbolRow;
        if (transposed) {
          for (s2 = 0; s2 < symbolHeight; s2++) {
            row = bitmap[offsetS + s2];
            if (!row) {
              continue;
            }
            symbolRow = symbolBitmap[s2];
            var maxWidth = Math.min(width - offsetT, symbolWidth);
            switch (combinationOperator) {
              case 0:
                for (t2 = 0; t2 < maxWidth; t2++) {
                  row[offsetT + t2] |= symbolRow[t2];
                }
                break;
              case 2:
                for (t2 = 0; t2 < maxWidth; t2++) {
                  row[offsetT + t2] ^= symbolRow[t2];
                }
                break;
              default:
                error('JBIG2 error: operator ' + combinationOperator + ' is not supported');
            }
          }
          currentS += symbolHeight - 1;
        } else {
          for (t2 = 0; t2 < symbolHeight; t2++) {
            row = bitmap[offsetT + t2];
            if (!row) {
              continue;
            }
            symbolRow = symbolBitmap[t2];
            switch (combinationOperator) {
              case 0:
                for (s2 = 0; s2 < symbolWidth; s2++) {
                  row[offsetS + s2] |= symbolRow[s2];
                }
                break;
              case 2:
                for (s2 = 0; s2 < symbolWidth; s2++) {
                  row[offsetS + s2] ^= symbolRow[s2];
                }
                break;
              default:
                error('JBIG2 error: operator ' + combinationOperator + ' is not supported');
            }
          }
          currentS += symbolWidth - 1;
        }
        i++;
        var deltaS = decodeInteger(contextCache, 'IADS', decoder);
        if (deltaS === null) {
          break;
        }
        currentS += deltaS + dsOffset;
      } while (true);
    }
    return bitmap;
  }
  function readSegmentHeader(data, start) {
    var segmentHeader = {};
    segmentHeader.number = readUint32(data, start);
    var flags = data[start + 4];
    var segmentType = flags & 0x3F;
    if (!SegmentTypes[segmentType]) {
      error('JBIG2 error: invalid segment type: ' + segmentType);
    }
    segmentHeader.type = segmentType;
    segmentHeader.typeName = SegmentTypes[segmentType];
    segmentHeader.deferredNonRetain = !!(flags & 0x80);
    var pageAssociationFieldSize = !!(flags & 0x40);
    var referredFlags = data[start + 5];
    var referredToCount = referredFlags >> 5 & 7;
    var retainBits = [referredFlags & 31];
    var position = start + 6;
    if (referredFlags === 7) {
      referredToCount = readUint32(data, position - 1) & 0x1FFFFFFF;
      position += 3;
      var bytes = referredToCount + 7 >> 3;
      retainBits[0] = data[position++];
      while (--bytes > 0) {
        retainBits.push(data[position++]);
      }
    } else if (referredFlags === 5 || referredFlags === 6) {
      error('JBIG2 error: invalid referred-to flags');
    }
    segmentHeader.retainBits = retainBits;
    var referredToSegmentNumberSize = segmentHeader.number <= 256 ? 1 : segmentHeader.number <= 65536 ? 2 : 4;
    var referredTo = [];
    var i, ii;
    for (i = 0; i < referredToCount; i++) {
      var number = referredToSegmentNumberSize === 1 ? data[position] : referredToSegmentNumberSize === 2 ? readUint16(data, position) : readUint32(data, position);
      referredTo.push(number);
      position += referredToSegmentNumberSize;
    }
    segmentHeader.referredTo = referredTo;
    if (!pageAssociationFieldSize) {
      segmentHeader.pageAssociation = data[position++];
    } else {
      segmentHeader.pageAssociation = readUint32(data, position);
      position += 4;
    }
    segmentHeader.length = readUint32(data, position);
    position += 4;
    if (segmentHeader.length === 0xFFFFFFFF) {
      if (segmentType === 38) {
        var genericRegionInfo = readRegionSegmentInformation(data, position);
        var genericRegionSegmentFlags = data[position + RegionSegmentInformationFieldLength];
        var genericRegionMmr = !!(genericRegionSegmentFlags & 1);
        var searchPatternLength = 6;
        var searchPattern = new Uint8Array(searchPatternLength);
        if (!genericRegionMmr) {
          searchPattern[0] = 0xFF;
          searchPattern[1] = 0xAC;
        }
        searchPattern[2] = genericRegionInfo.height >>> 24 & 0xFF;
        searchPattern[3] = genericRegionInfo.height >> 16 & 0xFF;
        searchPattern[4] = genericRegionInfo.height >> 8 & 0xFF;
        searchPattern[5] = genericRegionInfo.height & 0xFF;
        for (i = position, ii = data.length; i < ii; i++) {
          var j = 0;
          while (j < searchPatternLength && searchPattern[j] === data[i + j]) {
            j++;
          }
          if (j === searchPatternLength) {
            segmentHeader.length = i + searchPatternLength;
            break;
          }
        }
        if (segmentHeader.length === 0xFFFFFFFF) {
          error('JBIG2 error: segment end was not found');
        }
      } else {
        error('JBIG2 error: invalid unknown segment length');
      }
    }
    segmentHeader.headerEnd = position;
    return segmentHeader;
  }
  function readSegments(header, data, start, end) {
    var segments = [];
    var position = start;
    while (position < end) {
      var segmentHeader = readSegmentHeader(data, position);
      position = segmentHeader.headerEnd;
      var segment = {
        header: segmentHeader,
        data: data
      };
      if (!header.randomAccess) {
        segment.start = position;
        position += segmentHeader.length;
        segment.end = position;
      }
      segments.push(segment);
      if (segmentHeader.type === 51) {
        break;
      }
    }
    if (header.randomAccess) {
      for (var i = 0, ii = segments.length; i < ii; i++) {
        segments[i].start = position;
        position += segments[i].header.length;
        segments[i].end = position;
      }
    }
    return segments;
  }
  function readRegionSegmentInformation(data, start) {
    return {
      width: readUint32(data, start),
      height: readUint32(data, start + 4),
      x: readUint32(data, start + 8),
      y: readUint32(data, start + 12),
      combinationOperator: data[start + 16] & 7
    };
  }
  var RegionSegmentInformationFieldLength = 17;
  function processSegment(segment, visitor) {
    var header = segment.header;
    var data = segment.data,
        position = segment.start,
        end = segment.end;
    var args, at, i, atLength;
    switch (header.type) {
      case 0:
        var dictionary = {};
        var dictionaryFlags = readUint16(data, position);
        dictionary.huffman = !!(dictionaryFlags & 1);
        dictionary.refinement = !!(dictionaryFlags & 2);
        dictionary.huffmanDHSelector = dictionaryFlags >> 2 & 3;
        dictionary.huffmanDWSelector = dictionaryFlags >> 4 & 3;
        dictionary.bitmapSizeSelector = dictionaryFlags >> 6 & 1;
        dictionary.aggregationInstancesSelector = dictionaryFlags >> 7 & 1;
        dictionary.bitmapCodingContextUsed = !!(dictionaryFlags & 256);
        dictionary.bitmapCodingContextRetained = !!(dictionaryFlags & 512);
        dictionary.template = dictionaryFlags >> 10 & 3;
        dictionary.refinementTemplate = dictionaryFlags >> 12 & 1;
        position += 2;
        if (!dictionary.huffman) {
          atLength = dictionary.template === 0 ? 4 : 1;
          at = [];
          for (i = 0; i < atLength; i++) {
            at.push({
              x: readInt8(data, position),
              y: readInt8(data, position + 1)
            });
            position += 2;
          }
          dictionary.at = at;
        }
        if (dictionary.refinement && !dictionary.refinementTemplate) {
          at = [];
          for (i = 0; i < 2; i++) {
            at.push({
              x: readInt8(data, position),
              y: readInt8(data, position + 1)
            });
            position += 2;
          }
          dictionary.refinementAt = at;
        }
        dictionary.numberOfExportedSymbols = readUint32(data, position);
        position += 4;
        dictionary.numberOfNewSymbols = readUint32(data, position);
        position += 4;
        args = [dictionary, header.number, header.referredTo, data, position, end];
        break;
      case 6:
      case 7:
        var textRegion = {};
        textRegion.info = readRegionSegmentInformation(data, position);
        position += RegionSegmentInformationFieldLength;
        var textRegionSegmentFlags = readUint16(data, position);
        position += 2;
        textRegion.huffman = !!(textRegionSegmentFlags & 1);
        textRegion.refinement = !!(textRegionSegmentFlags & 2);
        textRegion.stripSize = 1 << (textRegionSegmentFlags >> 2 & 3);
        textRegion.referenceCorner = textRegionSegmentFlags >> 4 & 3;
        textRegion.transposed = !!(textRegionSegmentFlags & 64);
        textRegion.combinationOperator = textRegionSegmentFlags >> 7 & 3;
        textRegion.defaultPixelValue = textRegionSegmentFlags >> 9 & 1;
        textRegion.dsOffset = textRegionSegmentFlags << 17 >> 27;
        textRegion.refinementTemplate = textRegionSegmentFlags >> 15 & 1;
        if (textRegion.huffman) {
          var textRegionHuffmanFlags = readUint16(data, position);
          position += 2;
          textRegion.huffmanFS = textRegionHuffmanFlags & 3;
          textRegion.huffmanDS = textRegionHuffmanFlags >> 2 & 3;
          textRegion.huffmanDT = textRegionHuffmanFlags >> 4 & 3;
          textRegion.huffmanRefinementDW = textRegionHuffmanFlags >> 6 & 3;
          textRegion.huffmanRefinementDH = textRegionHuffmanFlags >> 8 & 3;
          textRegion.huffmanRefinementDX = textRegionHuffmanFlags >> 10 & 3;
          textRegion.huffmanRefinementDY = textRegionHuffmanFlags >> 12 & 3;
          textRegion.huffmanRefinementSizeSelector = !!(textRegionHuffmanFlags & 14);
        }
        if (textRegion.refinement && !textRegion.refinementTemplate) {
          at = [];
          for (i = 0; i < 2; i++) {
            at.push({
              x: readInt8(data, position),
              y: readInt8(data, position + 1)
            });
            position += 2;
          }
          textRegion.refinementAt = at;
        }
        textRegion.numberOfSymbolInstances = readUint32(data, position);
        position += 4;
        if (textRegion.huffman) {
          error('JBIG2 error: huffman is not supported');
        }
        args = [textRegion, header.referredTo, data, position, end];
        break;
      case 38:
      case 39:
        var genericRegion = {};
        genericRegion.info = readRegionSegmentInformation(data, position);
        position += RegionSegmentInformationFieldLength;
        var genericRegionSegmentFlags = data[position++];
        genericRegion.mmr = !!(genericRegionSegmentFlags & 1);
        genericRegion.template = genericRegionSegmentFlags >> 1 & 3;
        genericRegion.prediction = !!(genericRegionSegmentFlags & 8);
        if (!genericRegion.mmr) {
          atLength = genericRegion.template === 0 ? 4 : 1;
          at = [];
          for (i = 0; i < atLength; i++) {
            at.push({
              x: readInt8(data, position),
              y: readInt8(data, position + 1)
            });
            position += 2;
          }
          genericRegion.at = at;
        }
        args = [genericRegion, data, position, end];
        break;
      case 48:
        var pageInfo = {
          width: readUint32(data, position),
          height: readUint32(data, position + 4),
          resolutionX: readUint32(data, position + 8),
          resolutionY: readUint32(data, position + 12)
        };
        if (pageInfo.height === 0xFFFFFFFF) {
          delete pageInfo.height;
        }
        var pageSegmentFlags = data[position + 16];
        readUint16(data, position + 17);
        pageInfo.lossless = !!(pageSegmentFlags & 1);
        pageInfo.refinement = !!(pageSegmentFlags & 2);
        pageInfo.defaultPixelValue = pageSegmentFlags >> 2 & 1;
        pageInfo.combinationOperator = pageSegmentFlags >> 3 & 3;
        pageInfo.requiresBuffer = !!(pageSegmentFlags & 32);
        pageInfo.combinationOperatorOverride = !!(pageSegmentFlags & 64);
        args = [pageInfo];
        break;
      case 49:
        break;
      case 50:
        break;
      case 51:
        break;
      case 62:
        break;
      default:
        error('JBIG2 error: segment type ' + header.typeName + '(' + header.type + ') is not implemented');
    }
    var callbackName = 'on' + header.typeName;
    if (callbackName in visitor) {
      visitor[callbackName].apply(visitor, args);
    }
  }
  function processSegments(segments, visitor) {
    for (var i = 0, ii = segments.length; i < ii; i++) {
      processSegment(segments[i], visitor);
    }
  }
  function parseJbig2(data, start, end) {
    var position = start;
    if (data[position] !== 0x97 || data[position + 1] !== 0x4A || data[position + 2] !== 0x42 || data[position + 3] !== 0x32 || data[position + 4] !== 0x0D || data[position + 5] !== 0x0A || data[position + 6] !== 0x1A || data[position + 7] !== 0x0A) {
      error('JBIG2 error: invalid header');
    }
    var header = {};
    position += 8;
    var flags = data[position++];
    header.randomAccess = !(flags & 1);
    if (!(flags & 2)) {
      header.numberOfPages = readUint32(data, position);
      position += 4;
    }
    readSegments(header, data, position, end);
    error('Not implemented');
  }
  function parseJbig2Chunks(chunks) {
    var visitor = new SimpleSegmentVisitor();
    for (var i = 0, ii = chunks.length; i < ii; i++) {
      var chunk = chunks[i];
      var segments = readSegments({}, chunk.data, chunk.start, chunk.end);
      processSegments(segments, visitor);
    }
    return visitor.buffer;
  }
  function SimpleSegmentVisitor() {}
  SimpleSegmentVisitor.prototype = {
    onPageInformation: function SimpleSegmentVisitor_onPageInformation(info) {
      this.currentPageInfo = info;
      var rowSize = info.width + 7 >> 3;
      var buffer = new Uint8Array(rowSize * info.height);
      if (info.defaultPixelValue) {
        for (var i = 0, ii = buffer.length; i < ii; i++) {
          buffer[i] = 0xFF;
        }
      }
      this.buffer = buffer;
    },
    drawBitmap: function SimpleSegmentVisitor_drawBitmap(regionInfo, bitmap) {
      var pageInfo = this.currentPageInfo;
      var width = regionInfo.width,
          height = regionInfo.height;
      var rowSize = pageInfo.width + 7 >> 3;
      var combinationOperator = pageInfo.combinationOperatorOverride ? regionInfo.combinationOperator : pageInfo.combinationOperator;
      var buffer = this.buffer;
      var mask0 = 128 >> (regionInfo.x & 7);
      var offset0 = regionInfo.y * rowSize + (regionInfo.x >> 3);
      var i, j, mask, offset;
      switch (combinationOperator) {
        case 0:
          for (i = 0; i < height; i++) {
            mask = mask0;
            offset = offset0;
            for (j = 0; j < width; j++) {
              if (bitmap[i][j]) {
                buffer[offset] |= mask;
              }
              mask >>= 1;
              if (!mask) {
                mask = 128;
                offset++;
              }
            }
            offset0 += rowSize;
          }
          break;
        case 2:
          for (i = 0; i < height; i++) {
            mask = mask0;
            offset = offset0;
            for (j = 0; j < width; j++) {
              if (bitmap[i][j]) {
                buffer[offset] ^= mask;
              }
              mask >>= 1;
              if (!mask) {
                mask = 128;
                offset++;
              }
            }
            offset0 += rowSize;
          }
          break;
        default:
          error('JBIG2 error: operator ' + combinationOperator + ' is not supported');
      }
    },
    onImmediateGenericRegion: function SimpleSegmentVisitor_onImmediateGenericRegion(region, data, start, end) {
      var regionInfo = region.info;
      var decodingContext = new DecodingContext(data, start, end);
      var bitmap = decodeBitmap(region.mmr, regionInfo.width, regionInfo.height, region.template, region.prediction, null, region.at, decodingContext);
      this.drawBitmap(regionInfo, bitmap);
    },
    onImmediateLosslessGenericRegion: function SimpleSegmentVisitor_onImmediateLosslessGenericRegion() {
      this.onImmediateGenericRegion.apply(this, arguments);
    },
    onSymbolDictionary: function SimpleSegmentVisitor_onSymbolDictionary(dictionary, currentSegment, referredSegments, data, start, end) {
      var huffmanTables;
      if (dictionary.huffman) {
        error('JBIG2 error: huffman is not supported');
      }
      var symbols = this.symbols;
      if (!symbols) {
        this.symbols = symbols = {};
      }
      var inputSymbols = [];
      for (var i = 0, ii = referredSegments.length; i < ii; i++) {
        inputSymbols = inputSymbols.concat(symbols[referredSegments[i]]);
      }
      var decodingContext = new DecodingContext(data, start, end);
      symbols[currentSegment] = decodeSymbolDictionary(dictionary.huffman, dictionary.refinement, inputSymbols, dictionary.numberOfNewSymbols, dictionary.numberOfExportedSymbols, huffmanTables, dictionary.template, dictionary.at, dictionary.refinementTemplate, dictionary.refinementAt, decodingContext);
    },
    onImmediateTextRegion: function SimpleSegmentVisitor_onImmediateTextRegion(region, referredSegments, data, start, end) {
      var regionInfo = region.info;
      var huffmanTables;
      var symbols = this.symbols;
      var inputSymbols = [];
      for (var i = 0, ii = referredSegments.length; i < ii; i++) {
        inputSymbols = inputSymbols.concat(symbols[referredSegments[i]]);
      }
      var symbolCodeLength = log2(inputSymbols.length);
      var decodingContext = new DecodingContext(data, start, end);
      var bitmap = decodeTextRegion(region.huffman, region.refinement, regionInfo.width, regionInfo.height, region.defaultPixelValue, region.numberOfSymbolInstances, region.stripSize, inputSymbols, symbolCodeLength, region.transposed, region.dsOffset, region.referenceCorner, region.combinationOperator, huffmanTables, region.refinementTemplate, region.refinementAt, decodingContext);
      this.drawBitmap(regionInfo, bitmap);
    },
    onImmediateLosslessTextRegion: function SimpleSegmentVisitor_onImmediateLosslessTextRegion() {
      this.onImmediateTextRegion.apply(this, arguments);
    }
  };
  function Jbig2Image() {}
  Jbig2Image.prototype = {
    parseChunks: function Jbig2Image_parseChunks(chunks) {
      return parseJbig2Chunks(chunks);
    }
  };
  return Jbig2Image;
}();


	
	
	
	function log2(x) {
        var n = 1, i = 0;
        while (x > n) {
            n <<= 1;
            i++;
        }
        return i;
    }
    function readInt8(data, start) {
        return data[start] << 24 >> 24;
    }
    function readUint16(data, offset) {
        return data[offset] << 8 | data[offset + 1];
    }
    function readUint32(data, offset) {
        return (data[offset] << 24 | data[offset + 1] << 16 | data[offset + 2] << 8 | data[offset + 3]) >>> 0;
    }
    function shadow(obj, prop, value) {
        Object.defineProperty(obj, prop, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: false
        });
        return value;
    }
    var error = function() {
        console.error.apply(console, arguments);
        throw new Error("PDFJS error: " + arguments[0]);
    };
    var warn = function() {
        console.warn.apply(console, arguments);
    };
    var info = function() {
        console.info.apply(console, arguments);
    };
    Jbig2Image.prototype.parse = function parseJbig2(data) {
        var position = 0, end = data.length;
        if (data[position] !== 151 || data[position + 1] !== 74 || data[position + 2] !== 66 || data[position + 3] !== 50 || data[position + 4] !== 13 || data[position + 5] !== 10 || data[position + 6] !== 26 || data[position + 7] !== 10) {
            error("JBIG2 error: invalid header");
        }
        var header = {};
        position += 8;
        var flags = data[position++];
        header.randomAccess = !(flags & 1);
        if (!(flags & 2)) {
            header.numberOfPages = readUint32(data, position);
            position += 4;
        }
        var visitor = this.parseChunks([ {
            data: data,
            start: position,
            end: end
        } ]);
        var width = visitor.currentPageInfo.width;
        var height = visitor.currentPageInfo.height;
        var bitPacked = visitor.buffer;
        var data = new Uint8Array(width * height);
        var q = 0, k = 0;
        for (var i = 0; i < height; i++) {
            var mask = 0, buffer;
            for (var j = 0; j < width; j++) {
                if (!mask) {
                    mask = 128;
                    buffer = bitPacked[k++];
                }
                data[q++] = buffer & mask ? 0 : 255;
                mask >>= 1;
            }
        }
        this.width = width;
        this.height = height;
        this.data = data;
    };
    PDFJS.JpegImage = JpegImage;
    PDFJS.JpxImage = JpxImage;
    PDFJS.Jbig2Image = Jbig2Image;
})(PDFJS || (PDFJS = {}));


;(function(){var o,X=0,e=null,n=null;o=window.FFT={};var f={o:function(G){if(G!==0&&(G&G-1)===0){X=G;
f.B();f.q();f.i()}else{throw new Error("init: radix-2 required")}},X:function(G,B){f.G(G,B,1)},e:function(G,B){var j=1/X;
f.G(G,B,-1);for(var q=0;q<X;q++){G[q]*=j;B[q]*=j}},n:function(G,B){var j=[],q=[],i=0;for(var m=0;m<X;
m++){i=m*X;for(var Z=0;Z<X;Z++){j[Z]=G[Z+i];q[Z]=B[Z+i]}f.X(j,q);for(var p=0;p<X;p++){G[p+i]=j[p];B[p+i]=q[p]}}for(var C=0;
C<X;C++){for(var a=0;a<X;a++){i=C+a*X;j[a]=G[i];q[a]=B[i]}f.X(j,q);for(var r=0;r<X;r++){i=C+r*X;G[i]=j[r];
B[i]=q[r]}}},f:function(G,B){var j=[],q=[],i=0;for(var m=0;m<X;m++){i=m*X;for(var Z=0;Z<X;Z++){j[Z]=G[Z+i];
q[Z]=B[Z+i]}f.e(j,q);for(var p=0;p<X;p++){G[p+i]=j[p];B[p+i]=q[p]}}for(var C=0;C<X;C++){for(var a=0;
a<X;a++){i=C+a*X;j[a]=G[i];q[a]=B[i]}f.e(j,q);for(var r=0;r<X;r++){i=C+r*X;G[i]=j[r];B[i]=q[r]}}},G:function(G,B,j){var q,i,m,Z,p,C,a,r,M,R=X>>2;
for(var P=0;P<X;P++){Z=e[P];if(P<Z){p=G[P];G[P]=G[Z];G[Z]=p;p=B[P];B[P]=B[Z];B[Z]=p}}for(var y=1;y<X;
y<<=1){i=0;q=X/(y<<1);for(var x=0;x<y;x++){C=n[i+R];a=j*n[i];for(var t=x;t<X;t+=y<<1){m=t+y;r=C*G[m]+a*B[m];
M=C*B[m]-a*G[m];G[m]=G[t]-r;G[t]+=r;B[m]=B[t]-M;B[t]+=M}i+=q}}},B:function(){var G=Uint32Array;if(X<=256)G=Uint8Array;
else if(X<=65536)G=Uint16Array;e=new G(X);n=new Float64Array(X*1.25)},j:function(){},q:function(){var G=0,B=0,q=0;
e[0]=0;while(++G<X){q=X>>1;while(q<=B){B-=q;q>>=1}B+=q;e[G]=B}},i:function(){var G=X>>1,B=X>>2,j=X>>3,q=G+B,i=Math.sin(Math.PI/X),m=2*i*i,Z=Math.sqrt(m*(2-m)),p=n[B]=1,C=n[0]=0;
i=2*m;for(var a=1;a<j;a++){p-=m;m+=i*p;C+=Z;Z-=i*C;n[a]=C;n[B-a]=p}if(j!==0){n[j]=Math.sqrt(.5)}for(var r=0;
r<B;r++){n[G-r]=n[r]}for(var M=0;M<q;M++){n[M+G]=-n[M]}}};o.init=f.o;o.fft2d=f.n;o.ifft2d=f.f}.call(this));
	
(function(r){"object"===typeof exports&&"undefined"!==typeof module?module.exports=r():"function"===typeof define&&define.amd?define([],r):("undefined"!==typeof window?window:"undefined"!==typeof global?global:"undefined"!==typeof self?self:this).acorn=r()})(function(){return function a(l,f,c){function g(d,n){if(!f[d]){if(!l[d]){var e="function"==typeof require&&require;if(!n&&e)return e(d,!0);if(b)return b(d,!0);e=Error("Cannot find module '"+d+"'");throw e.code="MODULE_NOT_FOUND",e;}e=f[d]={exports:{}};
l[d][0].call(e.exports,function(b){var e=l[d][1][b];return g(e?e:b)},e,e.exports,a,l,f,c)}return f[d].exports}for(var b="function"==typeof require&&require,d=0;d<c.length;d++)g(c[d]);return g}({1:[function(a,l,f){var c=a("./tokentype");a=a("./state").Parser.prototype;a.checkPropClash=function(b,c){if(!(6<=this.options.ecmaVersion&&(b.computed||b.method||b.shorthand))){var d=b.key;switch(d.type){case "Identifier":var a=d.name;break;case "Literal":a=String(d.value);break;default:return}var e=b.kind;
if(6<=this.options.ecmaVersion)"__proto__"===a&&"init"===e&&(c.proto&&this.raiseRecoverable(d.start,"Redefinition of __proto__ property"),c.proto=!0);else{a="$"+a;var m=c[a];m?(a="init"!==e,(!this.strict&&!a||!m[e])&&a^m.init||this.raiseRecoverable(d.start,"Redefinition of property")):m=c[a]={init:!1,get:!1,set:!1};m[e]=!0}}};a.parseExpression=function(b,a){var d=this.start,n=this.startLoc,e=this.parseMaybeAssign(b,a);if(this.type===c.types.comma){d=this.startNodeAt(d,n);for(d.expressions=[e];this.eat(c.types.comma);)d.expressions.push(this.parseMaybeAssign(b,
a));return this.finishNode(d,"SequenceExpression")}return e};a.parseMaybeAssign=function(b,a,h){if(this.inGenerator&&this.isContextual("yield"))return this.parseYield();var d=!1;a||(a={shorthandAssign:0,trailingComma:0},d=!0);var e=this.start,m=this.startLoc;if(this.type==c.types.parenL||this.type==c.types.name)this.potentialArrowAt=this.start;var p=this.parseMaybeConditional(b,a);h&&(p=h.call(this,p,e,m));if(this.type.isAssign)return d&&this.checkPatternErrors(a,!0),h=this.startNodeAt(e,m),h.operator=
this.value,h.left=this.type===c.types.eq?this.toAssignable(p):p,a.shorthandAssign=0,this.checkLVal(p),this.next(),h.right=this.parseMaybeAssign(b),this.finishNode(h,"AssignmentExpression");d&&this.checkExpressionErrors(a,!0);return p};a.parseMaybeConditional=function(b,a){var d=this.start,n=this.startLoc,e=this.parseExprOps(b,a);return this.checkExpressionErrors(a)?e:this.eat(c.types.question)?(d=this.startNodeAt(d,n),d.test=e,d.consequent=this.parseMaybeAssign(),this.expect(c.types.colon),d.alternate=
this.parseMaybeAssign(b),this.finishNode(d,"ConditionalExpression")):e};a.parseExprOps=function(b,c){var a=this.start,d=this.startLoc,e=this.parseMaybeUnary(c,!1);return this.checkExpressionErrors(c)?e:this.parseExprOp(e,a,d,-1,b)};a.parseExprOp=function(b,a,h,n,e){var d=this.type.binop;if(null!=d&&(!e||this.type!==c.types._in)&&d>n){var p=this.type===c.types.logicalOR||this.type===c.types.logicalAND,g=this.value;this.next();var k=this.start,q=this.startLoc,d=this.parseExprOp(this.parseMaybeUnary(null,
!1),k,q,d,e);b=this.buildBinary(a,h,b,d,g,p);return this.parseExprOp(b,a,h,n,e)}return b};a.buildBinary=function(b,c,a,n,e,m){b=this.startNodeAt(b,c);b.left=a;b.operator=e;b.right=n;return this.finishNode(b,m?"LogicalExpression":"BinaryExpression")};a.parseMaybeUnary=function(b,a){var d=this.start,n=this.startLoc;if(this.type.prefix){var e=this.startNode();var m=this.type===c.types.incDec;e.operator=this.value;e.prefix=!0;this.next();e.argument=this.parseMaybeUnary(null,!0);this.checkExpressionErrors(b,
!0);m?this.checkLVal(e.argument):this.strict&&"delete"===e.operator&&"Identifier"===e.argument.type?this.raiseRecoverable(e.start,"Deleting local variable in strict mode"):a=!0;m=this.finishNode(e,m?"UpdateExpression":"UnaryExpression")}else{m=this.parseExprSubscripts(b);if(this.checkExpressionErrors(b))return m;for(;this.type.postfix&&!this.canInsertSemicolon();)e=this.startNodeAt(d,n),e.operator=this.value,e.prefix=!1,e.argument=m,this.checkLVal(m),this.next(),m=this.finishNode(e,"UpdateExpression")}return!a&&
this.eat(c.types.starstar)?this.buildBinary(d,n,m,this.parseMaybeUnary(null,!1),"**",!1):m};a.parseExprSubscripts=function(b){var c=this.start,a=this.startLoc,n=this.parseExprAtom(b),e="ArrowFunctionExpression"===n.type&&")"!==this.input.slice(this.lastTokStart,this.lastTokEnd);return this.checkExpressionErrors(b)||e?n:this.parseSubscripts(n,c,a)};a.parseSubscripts=function(b,a,h,n){for(var e;;)if(this.eat(c.types.dot))e=this.startNodeAt(a,h),e.object=b,e.property=this.parseIdent(!0),e.computed=!1,
b=this.finishNode(e,"MemberExpression");else if(this.eat(c.types.bracketL))e=this.startNodeAt(a,h),e.object=b,e.property=this.parseExpression(),e.computed=!0,this.expect(c.types.bracketR),b=this.finishNode(e,"MemberExpression");else if(!n&&this.eat(c.types.parenL))e=this.startNodeAt(a,h),e.callee=b,e.arguments=this.parseExprList(c.types.parenR,!1),b=this.finishNode(e,"CallExpression");else if(this.type===c.types.backQuote)e=this.startNodeAt(a,h),e.tag=b,e.quasi=this.parseTemplate(),b=this.finishNode(e,
"TaggedTemplateExpression");else return b};a.parseExprAtom=function(b){var a=this.potentialArrowAt==this.start;switch(this.type){case c.types._super:this.inFunction||this.raise(this.start,"'super' outside of function or class");case c.types._this:return b=this.type===c.types._this?"ThisExpression":"Super",a=this.startNode(),this.next(),this.finishNode(a,b);case c.types.name:b=this.start;var h=this.startLoc,n=this.parseIdent(this.type!==c.types.name);return a&&!this.canInsertSemicolon()&&this.eat(c.types.arrow)?
this.parseArrowExpression(this.startNodeAt(b,h),[n]):n;case c.types.regexp:return b=this.value,a=this.parseLiteral(b.value),a.regex={pattern:b.pattern,flags:b.flags},a;case c.types.num:case c.types.string:return this.parseLiteral(this.value);case c.types._null:case c.types._true:case c.types._false:return a=this.startNode(),a.value=this.type===c.types._null?null:this.type===c.types._true,a.raw=this.type.keyword,this.next(),this.finishNode(a,"Literal");case c.types.parenL:return this.parseParenAndDistinguishExpression(a);
case c.types.bracketL:return a=this.startNode(),this.next(),a.elements=this.parseExprList(c.types.bracketR,!0,!0,b),this.finishNode(a,"ArrayExpression");case c.types.braceL:return this.parseObj(!1,b);case c.types._function:return a=this.startNode(),this.next(),this.parseFunction(a,!1);case c.types._class:return this.parseClass(this.startNode(),!1);case c.types._new:return this.parseNew();case c.types.backQuote:return this.parseTemplate();default:this.unexpected()}};a.parseLiteral=function(b){var a=
this.startNode();a.value=b;a.raw=this.input.slice(this.start,this.end);this.next();return this.finishNode(a,"Literal")};a.parseParenExpression=function(){this.expect(c.types.parenL);var b=this.parseExpression();this.expect(c.types.parenR);return b};a.parseParenAndDistinguishExpression=function(b){var a=this.start,h=this.startLoc;if(6<=this.options.ecmaVersion){this.next();for(var n=this.start,e=this.startLoc,m=[],p=!0,g={shorthandAssign:0,trailingComma:0},k=void 0,q=void 0;this.type!==c.types.parenR;)if(p?
p=!1:this.expect(c.types.comma),this.type===c.types.ellipsis){k=this.start;m.push(this.parseParenItem(this.parseRest()));break}else this.type!==c.types.parenL||q||(q=this.start),m.push(this.parseMaybeAssign(!1,g,this.parseParenItem));var p=this.start,f=this.startLoc;this.expect(c.types.parenR);if(b&&!this.canInsertSemicolon()&&this.eat(c.types.arrow))return this.checkPatternErrors(g,!0),q&&this.unexpected(q),this.parseParenArrowList(a,h,m);m.length||this.unexpected(this.lastTokStart);k&&this.unexpected(k);
this.checkExpressionErrors(g,!0);1<m.length?(b=this.startNodeAt(n,e),b.expressions=m,this.finishNodeAt(b,"SequenceExpression",p,f)):b=m[0]}else b=this.parseParenExpression();return this.options.preserveParens?(a=this.startNodeAt(a,h),a.expression=b,this.finishNode(a,"ParenthesizedExpression")):b};a.parseParenItem=function(b){return b};a.parseParenArrowList=function(b,a,c){return this.parseArrowExpression(this.startNodeAt(b,a),c)};var g=[];a.parseNew=function(){var b=this.startNode(),a=this.parseIdent(!0);
if(6<=this.options.ecmaVersion&&this.eat(c.types.dot))return b.meta=a,b.property=this.parseIdent(!0),"target"!==b.property.name&&this.raiseRecoverable(b.property.start,"The only valid meta property for new is new.target"),this.inFunction||this.raiseRecoverable(b.start,"new.target can only be used in functions"),this.finishNode(b,"MetaProperty");var a=this.start,h=this.startLoc;b.callee=this.parseSubscripts(this.parseExprAtom(),a,h,!0);this.eat(c.types.parenL)?b.arguments=this.parseExprList(c.types.parenR,
!1):b.arguments=g;return this.finishNode(b,"NewExpression")};a.parseTemplateElement=function(){var b=this.startNode();b.value={raw:this.input.slice(this.start,this.end).replace(/\r\n?/g,"\n"),cooked:this.value};this.next();b.tail=this.type===c.types.backQuote;return this.finishNode(b,"TemplateElement")};a.parseTemplate=function(){var b=this.startNode();this.next();b.expressions=[];var a=this.parseTemplateElement();for(b.quasis=[a];!a.tail;)this.expect(c.types.dollarBraceL),b.expressions.push(this.parseExpression()),
this.expect(c.types.braceR),b.quasis.push(a=this.parseTemplateElement());this.next();return this.finishNode(b,"TemplateLiteral")};a.parseObj=function(b,a){var d=this.startNode(),n=!0,e={};d.properties=[];for(this.next();!this.eat(c.types.braceR);){if(n)n=!1;else if(this.expect(c.types.comma),this.afterTrailingComma(c.types.braceR))break;var m=this.startNode(),p=void 0,g=void 0,k=void 0;if(6<=this.options.ecmaVersion){m.method=!1;m.shorthand=!1;if(b||a)g=this.start,k=this.startLoc;b||(p=this.eat(c.types.star))}this.parsePropertyName(m);
this.parsePropertyValue(m,b,p,g,k,a);this.checkPropClash(m,e);d.properties.push(this.finishNode(m,"Property"))}return this.finishNode(d,b?"ObjectPattern":"ObjectExpression")};a.parsePropertyValue=function(b,a,h,n,e,m){this.eat(c.types.colon)?(b.value=a?this.parseMaybeDefault(this.start,this.startLoc):this.parseMaybeAssign(!1,m),b.kind="init"):6<=this.options.ecmaVersion&&this.type===c.types.parenL?(a&&this.unexpected(),b.kind="init",b.method=!0,b.value=this.parseMethod(h)):5<=this.options.ecmaVersion&&
!b.computed&&"Identifier"===b.key.type&&("get"===b.key.name||"set"===b.key.name)&&this.type!=c.types.comma&&this.type!=c.types.braceR?((h||a)&&this.unexpected(),b.kind=b.key.name,this.parsePropertyName(b),b.value=this.parseMethod(!1),b.value.params.length!==("get"===b.kind?0:1)&&(a=b.value.start,"get"===b.kind?this.raiseRecoverable(a,"getter should have no params"):this.raiseRecoverable(a,"setter should have exactly one param")),"set"===b.kind&&"RestElement"===b.value.params[0].type&&this.raiseRecoverable(b.value.params[0].start,
"Setter cannot use rest params")):6<=this.options.ecmaVersion&&!b.computed&&"Identifier"===b.key.type?(b.kind="init",a?((this.keywords.test(b.key.name)||(this.strict?this.reservedWordsStrictBind:this.reservedWords).test(b.key.name)||this.inGenerator&&"yield"==b.key.name)&&this.raiseRecoverable(b.key.start,"Binding "+b.key.name),b.value=this.parseMaybeDefault(n,e,b.key)):this.type===c.types.eq&&m?(m.shorthandAssign||(m.shorthandAssign=this.start),b.value=this.parseMaybeDefault(n,e,b.key)):b.value=
b.key,b.shorthand=!0):this.unexpected()};a.parsePropertyName=function(b){if(6<=this.options.ecmaVersion){if(this.eat(c.types.bracketL))return b.computed=!0,b.key=this.parseMaybeAssign(),this.expect(c.types.bracketR),b.key;b.computed=!1}return b.key=this.type===c.types.num||this.type===c.types.string?this.parseExprAtom():this.parseIdent(!0)};a.initFunction=function(b){b.id=null;6<=this.options.ecmaVersion&&(b.generator=!1,b.expression=!1)};a.parseMethod=function(b){var a=this.startNode(),h=this.inGenerator;
this.inGenerator=b;this.initFunction(a);this.expect(c.types.parenL);a.params=this.parseBindingList(c.types.parenR,!1,!1);6<=this.options.ecmaVersion&&(a.generator=b);this.parseFunctionBody(a,!1);this.inGenerator=h;return this.finishNode(a,"FunctionExpression")};a.parseArrowExpression=function(b,a){var c=this.inGenerator;this.inGenerator=!1;this.initFunction(b);b.params=this.toAssignableList(a,!0);this.parseFunctionBody(b,!0);this.inGenerator=c;return this.finishNode(b,"ArrowFunctionExpression")};
a.parseFunctionBody=function(b,a){var d=a&&this.type!==c.types.braceL;if(d)b.body=this.parseMaybeAssign(),b.expression=!0;else{var n=this.inFunction,e=this.labels;this.inFunction=!0;this.labels=[];b.body=this.parseBlock(!0);b.expression=!1;this.inFunction=n;this.labels=e}this.strict||!d&&b.body.body.length&&this.isUseStrict(b.body.body[0])?(d=this.strict,this.strict=!0,b.id&&this.checkLVal(b.id,!0),this.checkParams(b),this.strict=d):a&&this.checkParams(b)};a.checkParams=function(b){for(var a={},c=
0;c<b.params.length;c++)this.checkLVal(b.params[c],!0,a)};a.parseExprList=function(b,a,h,n){for(var e=[],d=!0;!this.eat(b);){if(d)d=!1;else if(this.expect(c.types.comma),a&&this.afterTrailingComma(b))break;if(h&&this.type===c.types.comma)var p=null;else this.type===c.types.ellipsis?(p=this.parseSpread(n),this.type===c.types.comma&&n&&!n.trailingComma&&(n.trailingComma=this.lastTokStart)):p=this.parseMaybeAssign(!1,n);e.push(p)}return e};a.parseIdent=function(b){var a=this.startNode();b&&"never"==
this.options.allowReserved&&(b=!1);this.type===c.types.name?(!b&&(this.strict?this.reservedWordsStrict:this.reservedWords).test(this.value)&&(6<=this.options.ecmaVersion||-1==this.input.slice(this.start,this.end).indexOf("\\"))&&this.raiseRecoverable(this.start,"The keyword '"+this.value+"' is reserved"),!b&&this.inGenerator&&"yield"===this.value&&this.raiseRecoverable(this.start,"Can not use 'yield' as identifier inside a generator"),a.name=this.value):b&&this.type.keyword?a.name=this.type.keyword:
this.unexpected();this.next();return this.finishNode(a,"Identifier")};a.parseYield=function(){var b=this.startNode();this.next();this.type==c.types.semi||this.canInsertSemicolon()||this.type!=c.types.star&&!this.type.startsExpr?(b.delegate=!1,b.argument=null):(b.delegate=this.eat(c.types.star),b.argument=this.parseMaybeAssign());return this.finishNode(b,"YieldExpression")}},{"./state":10,"./tokentype":14}],2:[function(a,l,f){function c(b,a){for(var e=65536,c=0;c<a.length;c+=2){e+=a[c];if(e>b)return!1;
e+=a[c+1];if(e>=b)return!0}}f.__esModule=!0;f.isIdentifierStart=function(b,a){return 65>b?36===b:91>b?!0:97>b?95===b:123>b?!0:65535>=b?170<=b&&g.test(String.fromCharCode(b)):!1===a?!1:c(b,d)};f.isIdentifierChar=function(a,e){return 48>a?36===a:58>a?!0:65>a?!1:91>a?!0:97>a?95===a:123>a?!0:65535>=a?170<=a&&b.test(String.fromCharCode(a)):!1===e?!1:c(a,d)||c(a,h)};f.reservedWords={3:"abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
5:"class enum extends super const export import",6:"enum",7:"enum",strict:"implements interface let package private protected public static yield",strictBind:"eval arguments"};f.keywords={5:"break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",6:"break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this const class extends export import super"};
a="\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u052f\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0-\u08b4\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0af9\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d\u0c58-\u0c5a\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d5f-\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f5\u13f8-\u13fd\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f8\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191e\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2118-\u211d\u2124\u2126\u2128\u212a-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309b-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fd5\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua69d\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua7ad\ua7b0-\ua7b7\ua7f7-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua8fd\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\ua9e0-\ua9e4\ua9e6-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa7e-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab65\uab70-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
var g=new RegExp("["+a+"]"),b=new RegExp("["+a+"\u200c\u200d\u00b7\u0300-\u036f\u0387\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08e3-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c00-\u0c03\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c81-\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0d01-\u0d03\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0de6-\u0def\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1369-\u1371\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19d0-\u19da\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1ab0-\u1abd\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf2-\u1cf4\u1cf8\u1cf9\u1dc0-\u1df5\u1dfc-\u1dff\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua620-\ua629\ua66f\ua674-\ua67d\ua69e\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua880\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f1\ua900-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\ua9e5\ua9f0-\ua9f9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b-\uaa7d\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f]");
a=null;var d=[0,11,2,25,2,18,2,1,2,14,3,13,35,122,70,52,268,28,4,48,48,31,17,26,6,37,11,29,3,35,5,7,2,4,43,157,99,39,9,51,157,310,10,21,11,7,153,5,3,0,2,43,2,1,4,0,3,22,11,22,10,30,66,18,2,1,11,21,11,25,71,55,7,1,65,0,16,3,2,2,2,26,45,28,4,28,36,7,2,27,28,53,11,21,11,18,14,17,111,72,56,50,14,50,785,52,76,44,33,24,27,35,42,34,4,0,13,47,15,3,22,0,2,0,36,17,2,24,85,6,2,0,2,3,2,14,2,9,8,46,39,7,3,1,3,21,2,6,2,1,2,4,4,0,19,0,13,4,287,47,21,1,2,0,185,46,42,3,37,47,21,0,60,42,86,25,391,63,32,0,449,56,1288,
921,103,110,18,195,2749,1070,4050,582,8634,568,8,30,114,29,19,47,17,3,32,20,6,18,881,68,12,0,67,12,16481,1,3071,106,6,12,4,8,8,9,5991,84,2,70,2,1,3,0,3,1,3,3,2,11,2,0,2,6,2,64,2,3,3,7,2,6,2,27,2,3,2,4,2,0,4,6,2,339,3,24,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,7,4149,196,1340,3,2,26,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,16,6,2,2,4,2,16,4421,42710,42,4148,12,221,3,5761,10591,541],h=[509,0,227,0,150,4,294,9,1368,2,2,1,6,3,
41,2,5,0,166,1,1306,2,54,14,32,9,16,3,46,10,54,9,7,2,37,13,2,9,52,0,13,2,49,13,10,2,4,9,83,11,168,11,6,9,7,3,57,0,2,6,3,1,3,2,10,0,11,1,3,6,4,4,316,19,13,9,214,6,3,8,28,1,83,16,16,9,82,12,9,9,84,14,5,9,423,9,20855,9,135,4,60,6,26,9,1016,45,17,3,19723,1,5319,4,4,5,9,7,3,6,31,3,149,2,1418,49,513,54,5,49,9,0,15,0,23,4,2,14,3617,6,792618,239]},{}],3:[function(a,l,f){f.__esModule=!0;f.parse=function(a,b){return(new c.Parser(b,a)).parse()};f.parseExpressionAt=function(a,b,d){a=new c.Parser(d,a,b);a.nextToken();
return a.parseExpression()};f.tokenizer=function(a,b){return new c.Parser(b,a)};var c=a("./state");a("./parseutil");a("./statement");a("./lval");a("./expression");a("./location");f.Parser=c.Parser;f.plugins=c.plugins;l=a("./options");f.defaultOptions=l.defaultOptions;l=a("./locutil");f.Position=l.Position;f.SourceLocation=l.SourceLocation;f.getLineInfo=l.getLineInfo;l=a("./node");f.Node=l.Node;l=a("./tokentype");f.TokenType=l.TokenType;f.tokTypes=l.types;l=a("./tokencontext");f.TokContext=l.TokContext;
f.tokContexts=l.types;l=a("./identifier");f.isIdentifierChar=l.isIdentifierChar;f.isIdentifierStart=l.isIdentifierStart;l=a("./tokenize");f.Token=l.Token;a=a("./whitespace");f.isNewLine=a.isNewLine;f.lineBreak=a.lineBreak;f.lineBreakG=a.lineBreakG;f.version="3.1.0"},{"./expression":1,"./identifier":2,"./location":4,"./locutil":5,"./lval":6,"./node":7,"./options":8,"./parseutil":9,"./state":10,"./statement":11,"./tokencontext":12,"./tokenize":13,"./tokentype":14,"./whitespace":16}],4:[function(a,l,
f){l=a("./state");var c=a("./locutil");a=l.Parser.prototype;a.raise=function(a,b){var d=c.getLineInfo(this.input,a);b+=" ("+d.line+":"+d.column+")";var h=new SyntaxError(b);h.pos=a;h.loc=d;h.raisedAt=this.pos;throw h;};a.raiseRecoverable=a.raise;a.curPosition=function(){if(this.options.locations)return new c.Position(this.curLine,this.pos-this.lineStart)}},{"./locutil":5,"./state":10}],5:[function(a,l,f){function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function");
}f.__esModule=!0;f.getLineInfo=function(a,c){for(var d=1,e=0;;){g.lineBreakG.lastIndex=e;var m=g.lineBreakG.exec(a);if(m&&m.index<c)++d,e=m.index+m[0].length;else return new b(d,c-e)}};var g=a("./whitespace"),b=function(){function a(b,d){c(this,a);this.line=b;this.column=d}a.prototype.offset=function(b){return new a(this.line,this.column+b)};return a}();f.Position=b;f.SourceLocation=function h(a,b,m){c(this,h);this.start=b;this.end=m;null!==a.sourceFile&&(this.source=a.sourceFile)}},{"./whitespace":16}],
6:[function(a,l,f){var c=a("./tokentype");l=a("./state");var g=a("./util");a=l.Parser.prototype;a.toAssignable=function(a,c){if(6<=this.options.ecmaVersion&&a)switch(a.type){case "Identifier":case "ObjectPattern":case "ArrayPattern":break;case "ObjectExpression":a.type="ObjectPattern";for(var b=0;b<a.properties.length;b++){var d=a.properties[b];"init"!==d.kind&&this.raise(d.key.start,"Object pattern can't contain getter or setter");this.toAssignable(d.value,c)}break;case "ArrayExpression":a.type=
"ArrayPattern";this.toAssignableList(a.elements,c);break;case "AssignmentExpression":if("="===a.operator)a.type="AssignmentPattern",delete a.operator;else{this.raise(a.left.end,"Only '=' operator can be used for specifying default value.");break}case "AssignmentPattern":"YieldExpression"===a.right.type&&this.raise(a.right.start,"Yield expression cannot be a default value");break;case "ParenthesizedExpression":a.expression=this.toAssignable(a.expression,c);break;case "MemberExpression":if(!c)break;
default:this.raise(a.start,"Assigning to rvalue")}return a};a.toAssignableList=function(a,c){var b=a.length;if(b){var d=a[b-1];if(d&&"RestElement"==d.type)--b;else if(d&&"SpreadElement"==d.type){d.type="RestElement";var e=d.argument;this.toAssignable(e,c);"Identifier"!==e.type&&"MemberExpression"!==e.type&&"ArrayPattern"!==e.type&&this.unexpected(e.start);--b}c&&"RestElement"===d.type&&"Identifier"!==d.argument.type&&this.unexpected(d.argument.start)}for(d=0;d<b;d++)(e=a[d])&&this.toAssignable(e,
c);return a};a.parseSpread=function(a){var b=this.startNode();this.next();b.argument=this.parseMaybeAssign(a);return this.finishNode(b,"SpreadElement")};a.parseRest=function(a){var b=this.startNode();this.next();b.argument=a?this.type===c.types.name?this.parseIdent():this.unexpected():this.type===c.types.name||this.type===c.types.bracketL?this.parseBindingAtom():this.unexpected();return this.finishNode(b,"RestElement")};a.parseBindingAtom=function(){if(6>this.options.ecmaVersion)return this.parseIdent();
switch(this.type){case c.types.name:return this.parseIdent();case c.types.bracketL:var a=this.startNode();this.next();a.elements=this.parseBindingList(c.types.bracketR,!0,!0);return this.finishNode(a,"ArrayPattern");case c.types.braceL:return this.parseObj(!0);default:this.unexpected()}};a.parseBindingList=function(a,d,h,n){for(var b=[],m=!0;!this.eat(a);)if(m?m=!1:this.expect(c.types.comma),d&&this.type===c.types.comma)b.push(null);else if(h&&this.afterTrailingComma(a))break;else if(this.type===
c.types.ellipsis){d=this.parseRest(n);this.parseBindingListItem(d);b.push(d);this.type===c.types.comma&&this.raise(this.start,"Comma is not permitted after the rest element");this.expect(a);break}else{var p=this.parseMaybeDefault(this.start,this.startLoc);this.parseBindingListItem(p);b.push(p)}return b};a.parseBindingListItem=function(a){return a};a.parseMaybeDefault=function(a,d,h){h=h||this.parseBindingAtom();if(6>this.options.ecmaVersion||!this.eat(c.types.eq))return h;a=this.startNodeAt(a,d);
a.left=h;a.right=this.parseMaybeAssign();return this.finishNode(a,"AssignmentPattern")};a.checkLVal=function(a,c,h){switch(a.type){case "Identifier":this.strict&&this.reservedWordsStrictBind.test(a.name)&&this.raiseRecoverable(a.start,(c?"Binding ":"Assigning to ")+a.name+" in strict mode");h&&(g.has(h,a.name)&&this.raiseRecoverable(a.start,"Argument name clash"),h[a.name]=!0);break;case "MemberExpression":c&&this.raiseRecoverable(a.start,(c?"Binding":"Assigning to")+" member expression");break;case "ObjectPattern":for(var b=
0;b<a.properties.length;b++)this.checkLVal(a.properties[b].value,c,h);break;case "ArrayPattern":for(b=0;b<a.elements.length;b++){var e=a.elements[b];e&&this.checkLVal(e,c,h)}break;case "AssignmentPattern":this.checkLVal(a.left,c,h);break;case "RestElement":this.checkLVal(a.argument,c,h);break;case "ParenthesizedExpression":this.checkLVal(a.expression,c,h);break;default:this.raise(a.start,(c?"Binding":"Assigning to")+" rvalue")}}},{"./state":10,"./tokentype":14,"./util":15}],7:[function(a,l,f){function c(a,
b,c,e){a.type=b;a.end=c;this.options.locations&&(a.loc.end=e);this.options.ranges&&(a.range[1]=c);return a}f.__esModule=!0;l=a("./state");var g=a("./locutil"),b=function h(a,b,c){if(!(this instanceof h))throw new TypeError("Cannot call a class as a function");this.type="";this.start=b;this.end=0;a.options.locations&&(this.loc=new g.SourceLocation(a,c));a.options.directSourceFile&&(this.sourceFile=a.options.directSourceFile);a.options.ranges&&(this.range=[b,0])};f.Node=b;a=l.Parser.prototype;a.startNode=
function(){return new b(this,this.start,this.startLoc)};a.startNodeAt=function(a,c){return new b(this,a,c)};a.finishNode=function(a,b){return c.call(this,a,b,this.lastTokEnd,this.lastTokEndLoc)};a.finishNodeAt=function(a,b,e,m){return c.call(this,a,b,e,m)}},{"./locutil":5,"./state":10}],8:[function(a,l,f){function c(a,c){return function(e,m,d,h,k,q){e={type:e?"Block":"Line",value:m,start:d,end:h};a.locations&&(e.loc=new b.SourceLocation(this,k,q));a.ranges&&(e.range=[d,h]);c.push(e)}}f.__esModule=
!0;f.getOptions=function(a){var b={},e;for(e in d)b[e]=a&&g.has(a,e)?a[e]:d[e];null==b.allowReserved&&(b.allowReserved=5>b.ecmaVersion);g.isArray(b.onToken)&&function(){var a=b.onToken;b.onToken=function(b){return a.push(b)}}();g.isArray(b.onComment)&&(b.onComment=c(b,b.onComment));return b};var g=a("./util"),b=a("./locutil"),d={ecmaVersion:6,sourceType:"script",onInsertedSemicolon:null,onTrailingComma:null,allowReserved:null,allowReturnOutsideFunction:!1,allowImportExportEverywhere:!1,allowHashBang:!1,
locations:!1,onToken:null,onComment:null,ranges:!1,program:null,sourceFile:null,directSourceFile:null,preserveParens:!1,plugins:{}};f.defaultOptions=d},{"./locutil":5,"./util":15}],9:[function(a,l,f){var c=a("./tokentype");l=a("./state");var g=a("./whitespace");a=l.Parser.prototype;a.isUseStrict=function(a){return 5<=this.options.ecmaVersion&&"ExpressionStatement"===a.type&&"Literal"===a.expression.type&&"use strict"===a.expression.raw.slice(1,-1)};a.eat=function(a){return this.type===a?(this.next(),
!0):!1};a.isContextual=function(a){return this.type===c.types.name&&this.value===a};a.eatContextual=function(a){return this.value===a&&this.eat(c.types.name)};a.expectContextual=function(a){this.eatContextual(a)||this.unexpected()};a.canInsertSemicolon=function(){return this.type===c.types.eof||this.type===c.types.braceR||g.lineBreak.test(this.input.slice(this.lastTokEnd,this.start))};a.insertSemicolon=function(){if(this.canInsertSemicolon()){if(this.options.onInsertedSemicolon)this.options.onInsertedSemicolon(this.lastTokEnd,
this.lastTokEndLoc);return!0}};a.semicolon=function(){this.eat(c.types.semi)||this.insertSemicolon()||this.unexpected()};a.afterTrailingComma=function(a){if(this.type==a){if(this.options.onTrailingComma)this.options.onTrailingComma(this.lastTokStart,this.lastTokStartLoc);this.next();return!0}};a.expect=function(a){this.eat(a)||this.unexpected()};a.unexpected=function(a){this.raise(null!=a?a:this.start,"Unexpected token")};a.checkPatternErrors=function(a,c){var b=a&&a.trailingComma;if(!c)return!!b;
b&&this.raise(b,"Comma is not permitted after the rest element")};a.checkExpressionErrors=function(a,c){var b=a&&a.shorthandAssign;if(!c)return!!b;b&&this.raise(b,"Shorthand property assignments are valid only in destructuring patterns")}},{"./state":10,"./tokentype":14,"./whitespace":16}],10:[function(a,l,f){function c(a){return new RegExp("^("+a.replace(/ /g,"|")+")$")}f.__esModule=!0;var g=a("./identifier"),b=a("./tokentype"),d=a("./whitespace"),h=a("./options"),n={};f.plugins=n;a=function(){function a(e,
p,f){if(!(this instanceof a))throw new TypeError("Cannot call a class as a function");this.options=e=h.getOptions(e);this.sourceFile=e.sourceFile;this.keywords=c(g.keywords[6<=e.ecmaVersion?6:5]);var k=e.allowReserved?"":g.reservedWords[e.ecmaVersion]+("module"==e.sourceType?" await":"");this.reservedWords=c(k);k=(k?k+" ":"")+g.reservedWords.strict;this.reservedWordsStrict=c(k);this.reservedWordsStrictBind=c(k+" "+g.reservedWords.strictBind);this.input=String(p);this.containsEsc=!1;this.loadPlugins(e.plugins);
f?(this.pos=f,this.lineStart=Math.max(0,this.input.lastIndexOf("\n",f)),this.curLine=this.input.slice(0,this.lineStart).split(d.lineBreak).length):(this.pos=this.lineStart=0,this.curLine=1);this.type=b.types.eof;this.value=null;this.start=this.end=this.pos;this.startLoc=this.endLoc=this.curPosition();this.lastTokEndLoc=this.lastTokStartLoc=null;this.lastTokStart=this.lastTokEnd=this.pos;this.context=this.initialContext();this.exprAllowed=!0;this.strict=this.inModule="module"===e.sourceType;this.potentialArrowAt=
-1;this.inFunction=this.inGenerator=!1;this.labels=[];0===this.pos&&e.allowHashBang&&"#!"===this.input.slice(0,2)&&this.skipLineComment(2)}a.prototype.isKeyword=function(a){return this.keywords.test(a)};a.prototype.isReservedWord=function(a){return this.reservedWords.test(a)};a.prototype.extend=function(a,b){this[a]=b(this[a])};a.prototype.loadPlugins=function(a){for(var b in a){var c=n[b];if(!c)throw Error("Plugin '"+b+"' not found");c(this,a[b])}};a.prototype.parse=function(){var a=this.options.program||
this.startNode();this.nextToken();return this.parseTopLevel(a)};return a}();f.Parser=a},{"./identifier":2,"./options":8,"./tokentype":14,"./whitespace":16}],11:[function(a,l,f){var c=a("./tokentype");l=a("./state");var g=a("./whitespace"),b=a("./identifier");a=l.Parser.prototype;a.parseTopLevel=function(a){var b=!0;a.body||(a.body=[]);for(;this.type!==c.types.eof;){var e=this.parseStatement(!0,!0);a.body.push(e);b&&(this.isUseStrict(e)&&this.setStrict(!0),b=!1)}this.next();6<=this.options.ecmaVersion&&
(a.sourceType=this.options.sourceType);return this.finishNode(a,"Program")};var d={kind:"loop"},h={kind:"switch"};a.isLet=function(){if(this.type!==c.types.name||6>this.options.ecmaVersion||"let"!=this.value)return!1;g.skipWhiteSpace.lastIndex=this.pos;var a=g.skipWhiteSpace.exec(this.input),a=this.pos+a[0].length,d=this.input.charCodeAt(a);if(91===d||123==d)return!0;if(b.isIdentifierStart(d,!0)){for(d=a+1;b.isIdentifierChar(this.input.charCodeAt(d,!0));++d);a=this.input.slice(a,d);if(!this.isKeyword(a))return!0}return!1};
a.parseStatement=function(a,b){var e=this.type,d=this.startNode(),k=void 0;this.isLet()&&(e=c.types._var,k="let");switch(e){case c.types._break:case c.types._continue:return this.parseBreakContinueStatement(d,e.keyword);case c.types._debugger:return this.parseDebuggerStatement(d);case c.types._do:return this.parseDoStatement(d);case c.types._for:return this.parseForStatement(d);case c.types._function:return!a&&6<=this.options.ecmaVersion&&this.unexpected(),this.parseFunctionStatement(d);case c.types._class:return a||
this.unexpected(),this.parseClass(d,!0);case c.types._if:return this.parseIfStatement(d);case c.types._return:return this.parseReturnStatement(d);case c.types._switch:return this.parseSwitchStatement(d);case c.types._throw:return this.parseThrowStatement(d);case c.types._try:return this.parseTryStatement(d);case c.types._const:case c.types._var:return k=k||this.value,a||"var"==k||this.unexpected(),this.parseVarStatement(d,k);case c.types._while:return this.parseWhileStatement(d);case c.types._with:return this.parseWithStatement(d);
case c.types.braceL:return this.parseBlock();case c.types.semi:return this.parseEmptyStatement(d);case c.types._export:case c.types._import:return this.options.allowImportExportEverywhere||(b||this.raise(this.start,"'import' and 'export' may only appear at the top level"),this.inModule||this.raise(this.start,"'import' and 'export' may appear only with 'sourceType: module'")),e===c.types._import?this.parseImport(d):this.parseExport(d);default:var k=this.value,m=this.parseExpression();return e===c.types.name&&
"Identifier"===m.type&&this.eat(c.types.colon)?this.parseLabeledStatement(d,k,m):this.parseExpressionStatement(d,m)}};a.parseBreakContinueStatement=function(a,b){var e="break"==b;this.next();this.eat(c.types.semi)||this.insertSemicolon()?a.label=null:this.type!==c.types.name?this.unexpected():(a.label=this.parseIdent(),this.semicolon());for(var d=0;d<this.labels.length;++d){var k=this.labels[d];if(null==a.label||k.name===a.label.name){if(null!=k.kind&&(e||"loop"===k.kind))break;if(a.label&&e)break}}d===
this.labels.length&&this.raise(a.start,"Unsyntactic "+b);return this.finishNode(a,e?"BreakStatement":"ContinueStatement")};a.parseDebuggerStatement=function(a){this.next();this.semicolon();return this.finishNode(a,"DebuggerStatement")};a.parseDoStatement=function(a){this.next();this.labels.push(d);a.body=this.parseStatement(!1);this.labels.pop();this.expect(c.types._while);a.test=this.parseParenExpression();6<=this.options.ecmaVersion?this.eat(c.types.semi):this.semicolon();return this.finishNode(a,
"DoWhileStatement")};a.parseForStatement=function(a){this.next();this.labels.push(d);this.expect(c.types.parenL);if(this.type===c.types.semi)return this.parseFor(a,null);var b=this.isLet();if(this.type===c.types._var||this.type===c.types._const||b){var e=this.startNode(),b=b?"let":this.value;this.next();this.parseVar(e,!0,b);this.finishNode(e,"VariableDeclaration");return!(this.type===c.types._in||6<=this.options.ecmaVersion&&this.isContextual("of"))||1!==e.declarations.length||"var"!==b&&e.declarations[0].init?
this.parseFor(a,e):this.parseForIn(a,e)}e={shorthandAssign:0,trailingComma:0};b=this.parseExpression(!0,e);if(this.type===c.types._in||6<=this.options.ecmaVersion&&this.isContextual("of"))return this.checkPatternErrors(e,!0),this.toAssignable(b),this.checkLVal(b),this.parseForIn(a,b);this.checkExpressionErrors(e,!0);return this.parseFor(a,b)};a.parseFunctionStatement=function(a){this.next();return this.parseFunction(a,!0)};a.parseIfStatement=function(a){this.next();a.test=this.parseParenExpression();
a.consequent=this.parseStatement(!1);a.alternate=this.eat(c.types._else)?this.parseStatement(!1):null;return this.finishNode(a,"IfStatement")};a.parseReturnStatement=function(a){this.inFunction||this.options.allowReturnOutsideFunction||this.raise(this.start,"'return' outside of function");this.next();this.eat(c.types.semi)||this.insertSemicolon()?a.argument=null:(a.argument=this.parseExpression(),this.semicolon());return this.finishNode(a,"ReturnStatement")};a.parseSwitchStatement=function(a){this.next();
a.discriminant=this.parseParenExpression();a.cases=[];this.expect(c.types.braceL);this.labels.push(h);for(var b,e=!1;this.type!=c.types.braceR;)if(this.type===c.types._case||this.type===c.types._default){var d=this.type===c.types._case;b&&this.finishNode(b,"SwitchCase");a.cases.push(b=this.startNode());b.consequent=[];this.next();d?b.test=this.parseExpression():(e&&this.raiseRecoverable(this.lastTokStart,"Multiple default clauses"),e=!0,b.test=null);this.expect(c.types.colon)}else b||this.unexpected(),
b.consequent.push(this.parseStatement(!0));b&&this.finishNode(b,"SwitchCase");this.next();this.labels.pop();return this.finishNode(a,"SwitchStatement")};a.parseThrowStatement=function(a){this.next();g.lineBreak.test(this.input.slice(this.lastTokEnd,this.start))&&this.raise(this.lastTokEnd,"Illegal newline after throw");a.argument=this.parseExpression();this.semicolon();return this.finishNode(a,"ThrowStatement")};var n=[];a.parseTryStatement=function(a){this.next();a.block=this.parseBlock();a.handler=
null;if(this.type===c.types._catch){var b=this.startNode();this.next();this.expect(c.types.parenL);b.param=this.parseBindingAtom();this.checkLVal(b.param,!0);this.expect(c.types.parenR);b.body=this.parseBlock();a.handler=this.finishNode(b,"CatchClause")}a.finalizer=this.eat(c.types._finally)?this.parseBlock():null;a.handler||a.finalizer||this.raise(a.start,"Missing catch or finally clause");return this.finishNode(a,"TryStatement")};a.parseVarStatement=function(a,b){this.next();this.parseVar(a,!1,
b);this.semicolon();return this.finishNode(a,"VariableDeclaration")};a.parseWhileStatement=function(a){this.next();a.test=this.parseParenExpression();this.labels.push(d);a.body=this.parseStatement(!1);this.labels.pop();return this.finishNode(a,"WhileStatement")};a.parseWithStatement=function(a){this.strict&&this.raise(this.start,"'with' in strict mode");this.next();a.object=this.parseParenExpression();a.body=this.parseStatement(!1);return this.finishNode(a,"WithStatement")};a.parseEmptyStatement=
function(a){this.next();return this.finishNode(a,"EmptyStatement")};a.parseLabeledStatement=function(a,b,d){for(var e=0;e<this.labels.length;++e)this.labels[e].name===b&&this.raise(d.start,"Label '"+b+"' is already declared");for(var k=this.type.isLoop?"loop":this.type===c.types._switch?"switch":null,e=this.labels.length-1;0<=e;e--){var q=this.labels[e];if(q.statementStart==a.start)q.statementStart=this.start,q.kind=k;else break}this.labels.push({name:b,kind:k,statementStart:this.start});a.body=this.parseStatement(!0);
this.labels.pop();a.label=d;return this.finishNode(a,"LabeledStatement")};a.parseExpressionStatement=function(a,b){a.expression=b;this.semicolon();return this.finishNode(a,"ExpressionStatement")};a.parseBlock=function(a){var b=this.startNode(),e=!0,d=void 0;b.body=[];for(this.expect(c.types.braceL);!this.eat(c.types.braceR);){var k=this.parseStatement(!0);b.body.push(k);e&&a&&this.isUseStrict(k)&&(d=this.strict,this.setStrict(this.strict=!0));e=!1}!1===d&&this.setStrict(!1);return this.finishNode(b,
"BlockStatement")};a.parseFor=function(a,b){a.init=b;this.expect(c.types.semi);a.test=this.type===c.types.semi?null:this.parseExpression();this.expect(c.types.semi);a.update=this.type===c.types.parenR?null:this.parseExpression();this.expect(c.types.parenR);a.body=this.parseStatement(!1);this.labels.pop();return this.finishNode(a,"ForStatement")};a.parseForIn=function(a,b){var e=this.type===c.types._in?"ForInStatement":"ForOfStatement";this.next();a.left=b;a.right=this.parseExpression();this.expect(c.types.parenR);
a.body=this.parseStatement(!1);this.labels.pop();return this.finishNode(a,e)};a.parseVar=function(a,b,d){a.declarations=[];for(a.kind=d;;){var e=this.startNode();this.parseVarId(e);this.eat(c.types.eq)?e.init=this.parseMaybeAssign(b):"const"!==d||this.type===c.types._in||6<=this.options.ecmaVersion&&this.isContextual("of")?"Identifier"==e.id.type||b&&(this.type===c.types._in||this.isContextual("of"))?e.init=null:this.raise(this.lastTokEnd,"Complex binding patterns require an initialization value"):
this.unexpected();a.declarations.push(this.finishNode(e,"VariableDeclarator"));if(!this.eat(c.types.comma))break}return a};a.parseVarId=function(a){a.id=this.parseBindingAtom();this.checkLVal(a.id,!0)};a.parseFunction=function(a,b,d){this.initFunction(a);6<=this.options.ecmaVersion&&(a.generator=this.eat(c.types.star));var e=this.inGenerator;this.inGenerator=a.generator;if(b||this.type===c.types.name)a.id=this.parseIdent();this.parseFunctionParams(a);this.parseFunctionBody(a,d);this.inGenerator=e;
return this.finishNode(a,b?"FunctionDeclaration":"FunctionExpression")};a.parseFunctionParams=function(a){this.expect(c.types.parenL);a.params=this.parseBindingList(c.types.parenR,!1,!1,!0)};a.parseClass=function(a,b){this.next();this.parseClassId(a,b);this.parseClassSuper(a);var e=this.startNode(),d=!1;e.body=[];for(this.expect(c.types.braceL);!this.eat(c.types.braceR);)if(!this.eat(c.types.semi)){var k=this.startNode(),q=this.eat(c.types.star),h=this.type===c.types.name&&"static"===this.value;this.parsePropertyName(k);
k["static"]=h&&this.type!==c.types.parenL;k["static"]&&(q&&this.unexpected(),q=this.eat(c.types.star),this.parsePropertyName(k));k.kind="method";h=!1;if(!k.computed){var f=k.key;q||"Identifier"!==f.type||this.type===c.types.parenL||"get"!==f.name&&"set"!==f.name||(h=!0,k.kind=f.name,f=this.parsePropertyName(k));!k["static"]&&("Identifier"===f.type&&"constructor"===f.name||"Literal"===f.type&&"constructor"===f.value)&&(d&&this.raise(f.start,"Duplicate constructor in the same class"),h&&this.raise(f.start,
"Constructor can't have get/set modifier"),q&&this.raise(f.start,"Constructor can't be a generator"),k.kind="constructor",d=!0)}this.parseClassMethod(e,k,q);h&&(k.value.params.length!==("get"===k.kind?0:1)&&(q=k.value.start,"get"===k.kind?this.raiseRecoverable(q,"getter should have no params"):this.raiseRecoverable(q,"setter should have exactly one param")),"set"===k.kind&&"RestElement"===k.value.params[0].type&&this.raise(k.value.params[0].start,"Setter cannot use rest params"))}a.body=this.finishNode(e,
"ClassBody");return this.finishNode(a,b?"ClassDeclaration":"ClassExpression")};a.parseClassMethod=function(a,b,c){b.value=this.parseMethod(c);a.body.push(this.finishNode(b,"MethodDefinition"))};a.parseClassId=function(a,b){a.id=this.type===c.types.name?this.parseIdent():b?this.unexpected():null};a.parseClassSuper=function(a){a.superClass=this.eat(c.types._extends)?this.parseExprSubscripts():null};a.parseExport=function(a){this.next();if(this.eat(c.types.star))return this.expectContextual("from"),
a.source=this.type===c.types.string?this.parseExprAtom():this.unexpected(),this.semicolon(),this.finishNode(a,"ExportAllDeclaration");if(this.eat(c.types._default)){var b=this.type==c.types.parenL,e=this.parseMaybeAssign(),d=!0;b||"FunctionExpression"!=e.type&&"ClassExpression"!=e.type||(d=!1,e.id&&(e.type="FunctionExpression"==e.type?"FunctionDeclaration":"ClassDeclaration"));a.declaration=e;d&&this.semicolon();return this.finishNode(a,"ExportDefaultDeclaration")}if(this.shouldParseExportStatement())a.declaration=
this.parseStatement(!0),a.specifiers=[],a.source=null;else{a.declaration=null;a.specifiers=this.parseExportSpecifiers();if(this.eatContextual("from"))a.source=this.type===c.types.string?this.parseExprAtom():this.unexpected();else{for(b=0;b<a.specifiers.length;b++)(this.keywords.test(a.specifiers[b].local.name)||this.reservedWords.test(a.specifiers[b].local.name))&&this.unexpected(a.specifiers[b].local.start);a.source=null}this.semicolon()}return this.finishNode(a,"ExportNamedDeclaration")};a.shouldParseExportStatement=
function(){return this.type.keyword||this.isLet()};a.parseExportSpecifiers=function(){var a=[],b=!0;for(this.expect(c.types.braceL);!this.eat(c.types.braceR);){if(b)b=!1;else if(this.expect(c.types.comma),this.afterTrailingComma(c.types.braceR))break;var d=this.startNode();d.local=this.parseIdent(this.type===c.types._default);d.exported=this.eatContextual("as")?this.parseIdent(!0):d.local;a.push(this.finishNode(d,"ExportSpecifier"))}return a};a.parseImport=function(a){this.next();this.type===c.types.string?
(a.specifiers=n,a.source=this.parseExprAtom()):(a.specifiers=this.parseImportSpecifiers(),this.expectContextual("from"),a.source=this.type===c.types.string?this.parseExprAtom():this.unexpected());this.semicolon();return this.finishNode(a,"ImportDeclaration")};a.parseImportSpecifiers=function(){var a=[],b=!0;if(this.type===c.types.name){var d=this.startNode();d.local=this.parseIdent();this.checkLVal(d.local,!0);a.push(this.finishNode(d,"ImportDefaultSpecifier"));if(!this.eat(c.types.comma))return a}if(this.type===
c.types.star)return d=this.startNode(),this.next(),this.expectContextual("as"),d.local=this.parseIdent(),this.checkLVal(d.local,!0),a.push(this.finishNode(d,"ImportNamespaceSpecifier")),a;for(this.expect(c.types.braceL);!this.eat(c.types.braceR);){if(b)b=!1;else if(this.expect(c.types.comma),this.afterTrailingComma(c.types.braceR))break;d=this.startNode();d.imported=this.parseIdent(!0);this.eatContextual("as")?d.local=this.parseIdent():(d.local=d.imported,this.isKeyword(d.local.name)&&this.unexpected(d.local.start),
this.reservedWordsStrict.test(d.local.name)&&this.raise(d.local.start,"The keyword '"+d.local.name+"' is reserved"));this.checkLVal(d.local,!0);a.push(this.finishNode(d,"ImportSpecifier"))}return a}},{"./identifier":2,"./state":10,"./tokentype":14,"./whitespace":16}],12:[function(a,l,f){f.__esModule=!0;l=a("./state");var c=a("./tokentype"),g=a("./whitespace");a=function h(a,b,c,f){if(!(this instanceof h))throw new TypeError("Cannot call a class as a function");this.token=a;this.isExpr=!!b;this.preserveSpace=
!!c;this.override=f};f.TokContext=a;var b={b_stat:new a("{",!1),b_expr:new a("{",!0),b_tmpl:new a("${",!0),p_stat:new a("(",!1),p_expr:new a("(",!0),q_tmpl:new a("`",!0,!0,function(a){return a.readTmplToken()}),f_expr:new a("function",!0)};f.types=b;f=l.Parser.prototype;f.initialContext=function(){return[b.b_stat]};f.braceIsBlock=function(a){if(a===c.types.colon){var f=this.curContext();if(f===b.b_stat||f===b.b_expr)return!f.isExpr}return a===c.types._return?g.lineBreak.test(this.input.slice(this.lastTokEnd,
this.start)):a===c.types._else||a===c.types.semi||a===c.types.eof||a===c.types.parenR?!0:a==c.types.braceL?this.curContext()===b.b_stat:!this.exprAllowed};f.updateContext=function(a){var b,e=this.type;e.keyword&&a==c.types.dot?this.exprAllowed=!1:(b=e.updateContext)?b.call(this,a):this.exprAllowed=e.beforeExpr};c.types.parenR.updateContext=c.types.braceR.updateContext=function(){if(1==this.context.length)this.exprAllowed=!0;else{var a=this.context.pop();a===b.b_stat&&this.curContext()===b.f_expr?
(this.context.pop(),this.exprAllowed=!1):this.exprAllowed=a===b.b_tmpl?!0:!a.isExpr}};c.types.braceL.updateContext=function(a){this.context.push(this.braceIsBlock(a)?b.b_stat:b.b_expr);this.exprAllowed=!0};c.types.dollarBraceL.updateContext=function(){this.context.push(b.b_tmpl);this.exprAllowed=!0};c.types.parenL.updateContext=function(a){this.context.push(a===c.types._if||a===c.types._for||a===c.types._with||a===c.types._while?b.p_stat:b.p_expr);this.exprAllowed=!0};c.types.incDec.updateContext=
function(){};c.types._function.updateContext=function(a){!a.beforeExpr||a===c.types.semi||a===c.types._else||a===c.types.colon&&this.curContext()===b.b_stat||this.context.push(b.f_expr);this.exprAllowed=!1};c.types.backQuote.updateContext=function(){this.curContext()===b.q_tmpl?this.context.pop():this.context.push(b.q_tmpl);this.exprAllowed=!1}},{"./state":10,"./tokentype":14,"./whitespace":16}],13:[function(a,l,f){function c(a,b,c,d){try{return new RegExp(a,b)}catch(t){if(void 0!==c)throw t instanceof
SyntaxError&&d.raise(c,"Error parsing regular expression: "+t.message),t;}}function g(a){if(65535>=a)return String.fromCharCode(a);a-=65536;return String.fromCharCode((a>>10)+55296,(a&1023)+56320)}f.__esModule=!0;var b=a("./identifier"),d=a("./tokentype");l=a("./state");var h=a("./locutil"),n=a("./whitespace"),e=function k(a){if(!(this instanceof k))throw new TypeError("Cannot call a class as a function");this.type=a.type;this.value=a.value;this.start=a.start;this.end=a.end;a.options.locations&&(this.loc=
new h.SourceLocation(a,a.startLoc,a.endLoc));a.options.ranges&&(this.range=[a.start,a.end])};f.Token=e;a=l.Parser.prototype;var m="object"==typeof Packages&&"[object JavaPackage]"==Object.prototype.toString.call(Packages);a.next=function(){if(this.options.onToken)this.options.onToken(new e(this));this.lastTokEnd=this.end;this.lastTokStart=this.start;this.lastTokEndLoc=this.endLoc;this.lastTokStartLoc=this.startLoc;this.nextToken()};a.getToken=function(){this.next();return new e(this)};"undefined"!==
typeof Symbol&&(a[Symbol.iterator]=function(){var a=this;return{next:function(){var b=a.getToken();return{done:b.type===d.types.eof,value:b}}}});a.setStrict=function(a){this.strict=a;if(this.type===d.types.num||this.type===d.types.string){this.pos=this.start;if(this.options.locations)for(;this.pos<this.lineStart;)this.lineStart=this.input.lastIndexOf("\n",this.lineStart-2)+1,--this.curLine;this.nextToken()}};a.curContext=function(){return this.context[this.context.length-1]};a.nextToken=function(){var a=
this.curContext();a&&a.preserveSpace||this.skipSpace();this.start=this.pos;this.options.locations&&(this.startLoc=this.curPosition());if(this.pos>=this.input.length)return this.finishToken(d.types.eof);if(a.override)return a.override(this);this.readToken(this.fullCharCodeAtPos())};a.readToken=function(a){return b.isIdentifierStart(a,6<=this.options.ecmaVersion)||92===a?this.readWord():this.getTokenFromCode(a)};a.fullCharCodeAtPos=function(){var a=this.input.charCodeAt(this.pos);if(55295>=a||57344<=
a)return a;var b=this.input.charCodeAt(this.pos+1);return(a<<10)+b-56613888};a.skipBlockComment=function(){var a=this.options.onComment&&this.curPosition(),b=this.pos,c=this.input.indexOf("*/",this.pos+=2);-1===c&&this.raise(this.pos-2,"Unterminated comment");this.pos=c+2;if(this.options.locations){n.lineBreakG.lastIndex=b;for(var d=void 0;(d=n.lineBreakG.exec(this.input))&&d.index<this.pos;)++this.curLine,this.lineStart=d.index+d[0].length}if(this.options.onComment)this.options.onComment(!0,this.input.slice(b+
2,c),b,this.pos,a,this.curPosition())};a.skipLineComment=function(a){for(var b=this.pos,c=this.options.onComment&&this.curPosition(),d=this.input.charCodeAt(this.pos+=a);this.pos<this.input.length&&10!==d&&13!==d&&8232!==d&&8233!==d;)++this.pos,d=this.input.charCodeAt(this.pos);if(this.options.onComment)this.options.onComment(!1,this.input.slice(b+a,this.pos),b,this.pos,c,this.curPosition())};a.skipSpace=function(){a:for(;this.pos<this.input.length;){var a=this.input.charCodeAt(this.pos);switch(a){case 32:case 160:++this.pos;
break;case 13:10===this.input.charCodeAt(this.pos+1)&&++this.pos;case 10:case 8232:case 8233:++this.pos;this.options.locations&&(++this.curLine,this.lineStart=this.pos);break;case 47:switch(this.input.charCodeAt(this.pos+1)){case 42:this.skipBlockComment();break;case 47:this.skipLineComment(2);break;default:break a}break;default:if(8<a&&14>a||5760<=a&&n.nonASCIIwhitespace.test(String.fromCharCode(a)))++this.pos;else break a}}};a.finishToken=function(a,b){this.end=this.pos;this.options.locations&&
(this.endLoc=this.curPosition());var c=this.type;this.type=a;this.value=b;this.updateContext(c)};a.readToken_dot=function(){var a=this.input.charCodeAt(this.pos+1);if(48<=a&&57>=a)return this.readNumber(!0);var b=this.input.charCodeAt(this.pos+2);if(6<=this.options.ecmaVersion&&46===a&&46===b)return this.pos+=3,this.finishToken(d.types.ellipsis);++this.pos;return this.finishToken(d.types.dot)};a.readToken_slash=function(){var a=this.input.charCodeAt(this.pos+1);return this.exprAllowed?(++this.pos,
this.readRegexp()):61===a?this.finishOp(d.types.assign,2):this.finishOp(d.types.slash,1)};a.readToken_mult_modulo_exp=function(a){var b=this.input.charCodeAt(this.pos+1),c=1;a=42===a?d.types.star:d.types.modulo;7<=this.options.ecmaVersion&&42===b&&(++c,a=d.types.starstar,b=this.input.charCodeAt(this.pos+2));return 61===b?this.finishOp(d.types.assign,c+1):this.finishOp(a,c)};a.readToken_pipe_amp=function(a){var b=this.input.charCodeAt(this.pos+1);return b===a?this.finishOp(124===a?d.types.logicalOR:
d.types.logicalAND,2):61===b?this.finishOp(d.types.assign,2):this.finishOp(124===a?d.types.bitwiseOR:d.types.bitwiseAND,1)};a.readToken_caret=function(){return 61===this.input.charCodeAt(this.pos+1)?this.finishOp(d.types.assign,2):this.finishOp(d.types.bitwiseXOR,1)};a.readToken_plus_min=function(a){var b=this.input.charCodeAt(this.pos+1);return b===a?45==b&&62==this.input.charCodeAt(this.pos+2)&&n.lineBreak.test(this.input.slice(this.lastTokEnd,this.pos))?(this.skipLineComment(3),this.skipSpace(),
this.nextToken()):this.finishOp(d.types.incDec,2):61===b?this.finishOp(d.types.assign,2):this.finishOp(d.types.plusMin,1)};a.readToken_lt_gt=function(a){var b=this.input.charCodeAt(this.pos+1),c=1;if(b===a)return c=62===a&&62===this.input.charCodeAt(this.pos+2)?3:2,61===this.input.charCodeAt(this.pos+c)?this.finishOp(d.types.assign,c+1):this.finishOp(d.types.bitShift,c);if(33==b&&60==a&&45==this.input.charCodeAt(this.pos+2)&&45==this.input.charCodeAt(this.pos+3))return this.inModule&&this.unexpected(),
this.skipLineComment(4),this.skipSpace(),this.nextToken();61===b&&(c=2);return this.finishOp(d.types.relational,c)};a.readToken_eq_excl=function(a){var b=this.input.charCodeAt(this.pos+1);return 61===b?this.finishOp(d.types.equality,61===this.input.charCodeAt(this.pos+2)?3:2):61===a&&62===b&&6<=this.options.ecmaVersion?(this.pos+=2,this.finishToken(d.types.arrow)):this.finishOp(61===a?d.types.eq:d.types.prefix,1)};a.getTokenFromCode=function(a){switch(a){case 46:return this.readToken_dot();case 40:return++this.pos,
this.finishToken(d.types.parenL);case 41:return++this.pos,this.finishToken(d.types.parenR);case 59:return++this.pos,this.finishToken(d.types.semi);case 44:return++this.pos,this.finishToken(d.types.comma);case 91:return++this.pos,this.finishToken(d.types.bracketL);case 93:return++this.pos,this.finishToken(d.types.bracketR);case 123:return++this.pos,this.finishToken(d.types.braceL);case 125:return++this.pos,this.finishToken(d.types.braceR);case 58:return++this.pos,this.finishToken(d.types.colon);case 63:return++this.pos,
this.finishToken(d.types.question);case 96:if(6>this.options.ecmaVersion)break;++this.pos;return this.finishToken(d.types.backQuote);case 48:a=this.input.charCodeAt(this.pos+1);if(120===a||88===a)return this.readRadixNumber(16);if(6<=this.options.ecmaVersion){if(111===a||79===a)return this.readRadixNumber(8);if(98===a||66===a)return this.readRadixNumber(2)}case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return this.readNumber(!1);case 34:case 39:return this.readString(a);case 47:return this.readToken_slash();
case 37:case 42:return this.readToken_mult_modulo_exp(a);case 124:case 38:return this.readToken_pipe_amp(a);case 94:return this.readToken_caret();case 43:case 45:return this.readToken_plus_min(a);case 60:case 62:return this.readToken_lt_gt(a);case 61:case 33:return this.readToken_eq_excl(a);case 126:return this.finishOp(d.types.prefix,1)}this.raise(this.pos,"Unexpected character '"+g(a)+"'")};a.finishOp=function(a,b){var c=this.input.slice(this.pos,this.pos+b);this.pos+=b;return this.finishToken(a,
c)};var p=!!c("\uffff","u");a.readRegexp=function(){for(var a=this,b=void 0,e=void 0,f=this.pos;;){this.pos>=this.input.length&&this.raise(f,"Unterminated regular expression");var g=this.input.charAt(this.pos);n.lineBreak.test(g)&&this.raise(f,"Unterminated regular expression");if(b)b=!1;else{if("["===g)e=!0;else if("]"===g&&e)e=!1;else if("/"===g&&!e)break;b="\\"===g}++this.pos}b=this.input.slice(f,this.pos);++this.pos;e=this.readWord1();g=b;if(e){var h=/^[gim]*$/;6<=this.options.ecmaVersion&&(h=
/^[gimuy]*$/);h.test(e)||this.raise(f,"Invalid regular expression flag");0<=e.indexOf("u")&&!p&&(g=g.replace(/\\u\{([0-9a-fA-F]+)\}/g,function(b,c,d){c=Number("0x"+c);1114111<c&&a.raise(f+d+3,"Code point out of bounds");return"x"}),g=g.replace(/\\u([a-fA-F0-9]{4})|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,"x"))}h=null;m||(c(g,void 0,f,this),h=c(b,e));return this.finishToken(d.types.regexp,{pattern:b,flags:e,value:h})};a.readInt=function(a,b){for(var c=this.pos,d=0,e=0,f=null==b?Infinity:b;e<f;++e){var k=this.input.charCodeAt(this.pos),
k=97<=k?k-97+10:65<=k?k-65+10:48<=k&&57>=k?k-48:Infinity;if(k>=a)break;++this.pos;d=d*a+k}return this.pos===c||null!=b&&this.pos-c!==b?null:d};a.readRadixNumber=function(a){this.pos+=2;var c=this.readInt(a);null==c&&this.raise(this.start+2,"Expected number in radix "+a);b.isIdentifierStart(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number");return this.finishToken(d.types.num,c)};a.readNumber=function(a){var c=this.pos,e=!1,f=48===this.input.charCodeAt(this.pos);a||
null!==this.readInt(10)||this.raise(c,"Invalid number");a=this.input.charCodeAt(this.pos);46===a&&(++this.pos,this.readInt(10),e=!0,a=this.input.charCodeAt(this.pos));if(69===a||101===a)a=this.input.charCodeAt(++this.pos),43!==a&&45!==a||++this.pos,null===this.readInt(10)&&this.raise(c,"Invalid number"),e=!0;b.isIdentifierStart(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number");a=this.input.slice(c,this.pos);var k=void 0;e?k=parseFloat(a):f&&1!==a.length?/[89]/.test(a)||
this.strict?this.raise(c,"Invalid number"):k=parseInt(a,8):k=parseInt(a,10);return this.finishToken(d.types.num,k)};a.readCodePoint=function(){if(123===this.input.charCodeAt(this.pos)){6>this.options.ecmaVersion&&this.unexpected();var a=++this.pos;var b=this.readHexChar(this.input.indexOf("}",this.pos)-this.pos);++this.pos;1114111<b&&this.raise(a,"Code point out of bounds")}else b=this.readHexChar(4);return b};a.readString=function(a){for(var b="",c=++this.pos;;){this.pos>=this.input.length&&this.raise(this.start,
"Unterminated string constant");var e=this.input.charCodeAt(this.pos);if(e===a)break;92===e?(b+=this.input.slice(c,this.pos),b+=this.readEscapedChar(!1),c=this.pos):(n.isNewLine(e)&&this.raise(this.start,"Unterminated string constant"),++this.pos)}b+=this.input.slice(c,this.pos++);return this.finishToken(d.types.string,b)};a.readTmplToken=function(){for(var a="",b=this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated template");var c=this.input.charCodeAt(this.pos);if(96===
c||36===c&&123===this.input.charCodeAt(this.pos+1)){if(this.pos===this.start&&this.type===d.types.template){if(36===c)return this.pos+=2,this.finishToken(d.types.dollarBraceL);++this.pos;return this.finishToken(d.types.backQuote)}a+=this.input.slice(b,this.pos);return this.finishToken(d.types.template,a)}if(92===c)a+=this.input.slice(b,this.pos),a+=this.readEscapedChar(!0),b=this.pos;else if(n.isNewLine(c)){a+=this.input.slice(b,this.pos);++this.pos;switch(c){case 13:10===this.input.charCodeAt(this.pos)&&
++this.pos;case 10:a+="\n";break;default:a+=String.fromCharCode(c)}this.options.locations&&(++this.curLine,this.lineStart=this.pos);b=this.pos}else++this.pos}};a.readEscapedChar=function(a){var b=this.input.charCodeAt(++this.pos);++this.pos;switch(b){case 110:return"\n";case 114:return"\r";case 120:return String.fromCharCode(this.readHexChar(2));case 117:return g(this.readCodePoint());case 116:return"\t";case 98:return"\b";case 118:return"\x0B";case 102:return"\f";case 13:10===this.input.charCodeAt(this.pos)&&
++this.pos;case 10:return this.options.locations&&(this.lineStart=this.pos,++this.curLine),"";default:if(48<=b&&55>=b){var b=this.input.substr(this.pos-1,3).match(/^[0-7]+/)[0],c=parseInt(b,8);255<c&&(b=b.slice(0,-1),c=parseInt(b,8));"0"!==b&&(this.strict||a)&&this.raise(this.pos-2,"Octal literal in strict mode");this.pos+=b.length-1;return String.fromCharCode(c)}return String.fromCharCode(b)}};a.readHexChar=function(a){var b=this.pos;a=this.readInt(16,a);null===a&&this.raise(b,"Bad character escape sequence");
return a};a.readWord1=function(){this.containsEsc=!1;for(var a="",c=!0,d=this.pos,e=6<=this.options.ecmaVersion;this.pos<this.input.length;){var f=this.fullCharCodeAtPos();if(b.isIdentifierChar(f,e))this.pos+=65535>=f?1:2;else if(92===f)this.containsEsc=!0,a+=this.input.slice(d,this.pos),d=this.pos,117!=this.input.charCodeAt(++this.pos)&&this.raise(this.pos,"Expecting Unicode escape sequence \\uXXXX"),++this.pos,f=this.readCodePoint(),(c?b.isIdentifierStart:b.isIdentifierChar)(f,e)||this.raise(d,
"Invalid Unicode escape"),a+=g(f),d=this.pos;else break;c=!1}return a+this.input.slice(d,this.pos)};a.readWord=function(){var a=this.readWord1(),b=d.types.name;(6<=this.options.ecmaVersion||!this.containsEsc)&&this.keywords.test(a)&&(b=d.keywords[a]);return this.finishToken(b,a)}},{"./identifier":2,"./locutil":5,"./state":10,"./tokentype":14,"./whitespace":16}],14:[function(a,l,f){function c(a,c){return new b(a,{beforeExpr:!0,binop:c})}function g(a){var c=1>=arguments.length||void 0===arguments[1]?
{}:arguments[1];c.keyword=a;h[a]=d["_"+a]=new b(a,c)}f.__esModule=!0;var b=function e(a){var b=1>=arguments.length||void 0===arguments[1]?{}:arguments[1];if(!(this instanceof e))throw new TypeError("Cannot call a class as a function");this.label=a;this.keyword=b.keyword;this.beforeExpr=!!b.beforeExpr;this.startsExpr=!!b.startsExpr;this.isLoop=!!b.isLoop;this.isAssign=!!b.isAssign;this.prefix=!!b.prefix;this.postfix=!!b.postfix;this.binop=b.binop||null;this.updateContext=null};f.TokenType=b;a={beforeExpr:!0};
l={startsExpr:!0};var d={num:new b("num",l),regexp:new b("regexp",l),string:new b("string",l),name:new b("name",l),eof:new b("eof"),bracketL:new b("[",{beforeExpr:!0,startsExpr:!0}),bracketR:new b("]"),braceL:new b("{",{beforeExpr:!0,startsExpr:!0}),braceR:new b("}"),parenL:new b("(",{beforeExpr:!0,startsExpr:!0}),parenR:new b(")"),comma:new b(",",a),semi:new b(";",a),colon:new b(":",a),dot:new b("."),question:new b("?",a),arrow:new b("=>",a),template:new b("template"),ellipsis:new b("...",a),backQuote:new b("`",
l),dollarBraceL:new b("${",{beforeExpr:!0,startsExpr:!0}),eq:new b("=",{beforeExpr:!0,isAssign:!0}),assign:new b("_=",{beforeExpr:!0,isAssign:!0}),incDec:new b("++/--",{prefix:!0,postfix:!0,startsExpr:!0}),prefix:new b("prefix",{beforeExpr:!0,prefix:!0,startsExpr:!0}),logicalOR:c("||",1),logicalAND:c("&&",2),bitwiseOR:c("|",3),bitwiseXOR:c("^",4),bitwiseAND:c("&",5),equality:c("==/!=",6),relational:c("</>",7),bitShift:c("<</>>",8),plusMin:new b("+/-",{beforeExpr:!0,binop:9,prefix:!0,startsExpr:!0}),
modulo:c("%",10),star:c("*",10),slash:c("/",10),starstar:new b("**",{beforeExpr:!0})};f.types=d;var h={};f.keywords=h;g("break");g("case",a);g("catch");g("continue");g("debugger");g("default",a);g("do",{isLoop:!0,beforeExpr:!0});g("else",a);g("finally");g("for",{isLoop:!0});g("function",l);g("if");g("return",a);g("switch");g("throw",a);g("try");g("var");g("const");g("while",{isLoop:!0});g("with");g("new",{beforeExpr:!0,startsExpr:!0});g("this",l);g("super",l);g("class");g("extends",a);g("export");
g("import");g("null",l);g("true",l);g("false",l);g("in",{beforeExpr:!0,binop:7});g("instanceof",{beforeExpr:!0,binop:7});g("typeof",{beforeExpr:!0,prefix:!0,startsExpr:!0});g("void",{beforeExpr:!0,prefix:!0,startsExpr:!0});g("delete",{beforeExpr:!0,prefix:!0,startsExpr:!0})},{}],15:[function(a,l,f){f.__esModule=!0;f.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)};f.has=function(a,f){return Object.prototype.hasOwnProperty.call(a,f)}},{}],16:[function(a,l,f){f.__esModule=
!0;f.isNewLine=function(a){return 10===a||13===a||8232===a||8233==a};a=/\r\n?|\n|\u2028|\u2029/;f.lineBreak=a;f.lineBreakG=new RegExp(a.source,"g");f.nonASCIIwhitespace=/[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;f.skipWhiteSpace=/(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g},{}]},{},[3])(3)});
var UPNG = {};

	

UPNG.toRGBA8 = function(out)
{
	var w = out.width, h = out.height;
	if(out.tabs.acTL==null) return [UPNG.toRGBA8.decodeImage(out.data, w, h, out).buffer];
	
	var frms = [];
	if(out.frames[0].data==null) out.frames[0].data = out.data;
	
	var len = w*h*4, img = new Uint8Array(len), empty = new Uint8Array(len), prev=new Uint8Array(len);
	for(var i=0; i<out.frames.length; i++)
	{
		var frm = out.frames[i];
		var fx=frm.rect.x, fy=frm.rect.y, fw = frm.rect.width, fh = frm.rect.height;
		var fdata = UPNG.toRGBA8.decodeImage(frm.data, fw,fh, out);
		
		if(i!=0) for(var j=0; j<len; j++) prev[j]=img[j];
		
		if     (frm.blend==0) UPNG._copyTile(fdata, fw, fh, img, w, h, fx, fy, 0);
		else if(frm.blend==1) UPNG._copyTile(fdata, fw, fh, img, w, h, fx, fy, 1);
		
		frms.push(img.buffer.slice(0));
		
		if     (frm.dispose==0) {}
		else if(frm.dispose==1) UPNG._copyTile(empty, fw, fh, img, w, h, fx, fy, 0);
		else if(frm.dispose==2) for(var j=0; j<len; j++) img[j]=prev[j];
	}
	return frms;
}
UPNG.toRGBA8.decodeImage = function(data, w, h, out)
{
	var area = w*h, bpp = UPNG.decode._getBPP(out);
	var bpl = Math.ceil(w*bpp/8);	// bytes per line

	var bf = new Uint8Array(area*4), bf32 = new Uint32Array(bf.buffer);
	var ctype = out.ctype, depth = out.depth;
	var rs = UPNG._bin.readUshort;
	
	//console.log(ctype, depth);
	var time = Date.now();

	if     (ctype==6) { // RGB + alpha
		var qarea = area<<2;
		if(depth== 8) for(var i=0; i<qarea;i+=4) {  bf[i] = data[i];  bf[i+1] = data[i+1];  bf[i+2] = data[i+2];  bf[i+3] = data[i+3]; }
		if(depth==16) for(var i=0; i<qarea;i++ ) {  bf[i] = data[i<<1];  }
	}
	else if(ctype==2) {	// RGB
		var ts=out.tabs["tRNS"];
		if(ts==null) {
			if(depth== 8) for(var i=0; i<area; i++) {  var ti=i*3;  bf32[i] = (255<<24)|(data[ti+2]<<16)|(data[ti+1]<<8)|data[ti];  }
			if(depth==16) for(var i=0; i<area; i++) {  var ti=i*6;  bf32[i] = (255<<24)|(data[ti+4]<<16)|(data[ti+2]<<8)|data[ti];  }
		}
		else {  var tr=ts[0], tg=ts[1], tb=ts[2];
			if(depth== 8) for(var i=0; i<area; i++) {  var qi=i<<2, ti=i*3;  bf32[i] = (255<<24)|(data[ti+2]<<16)|(data[ti+1]<<8)|data[ti];
				if(data[ti]   ==tr && data[ti+1]   ==tg && data[ti+2]   ==tb) bf[qi+3] = 0;  }
			if(depth==16) for(var i=0; i<area; i++) {  var qi=i<<2, ti=i*6;  bf32[i] = (255<<24)|(data[ti+4]<<16)|(data[ti+2]<<8)|data[ti];
				if(rs(data,ti)==tr && rs(data,ti+2)==tg && rs(data,ti+4)==tb) bf[qi+3] = 0;  }
		}
	}
	else if(ctype==3) {	// palette
		var p=out.tabs["PLTE"], ap=out.tabs["tRNS"], tl=ap?ap.length:0;
		//console.log(p, ap);
		if(depth==1) for(var y=0; y<h; y++) {  var s0 = y*bpl, t0 = y*w;
			for(var i=0; i<w; i++) { var qi=(t0+i)<<2, j=((data[s0+(i>>3)]>>(7-((i&7)<<0)))& 1), cj=3*j;  bf[qi]=p[cj];  bf[qi+1]=p[cj+1];  bf[qi+2]=p[cj+2];  bf[qi+3]=(j<tl)?ap[j]:255;  }
		}
		if(depth==2) for(var y=0; y<h; y++) {  var s0 = y*bpl, t0 = y*w;
			for(var i=0; i<w; i++) { var qi=(t0+i)<<2, j=((data[s0+(i>>2)]>>(6-((i&3)<<1)))& 3), cj=3*j;  bf[qi]=p[cj];  bf[qi+1]=p[cj+1];  bf[qi+2]=p[cj+2];  bf[qi+3]=(j<tl)?ap[j]:255;  }
		}
		if(depth==4) for(var y=0; y<h; y++) {  var s0 = y*bpl, t0 = y*w;
			for(var i=0; i<w; i++) { var qi=(t0+i)<<2, j=((data[s0+(i>>1)]>>(4-((i&1)<<2)))&15), cj=3*j;  bf[qi]=p[cj];  bf[qi+1]=p[cj+1];  bf[qi+2]=p[cj+2];  bf[qi+3]=(j<tl)?ap[j]:255;  }
		}
		if(depth==8) for(var i=0; i<area; i++ ) {  var qi=i<<2, j=data[i]                      , cj=3*j;  bf[qi]=p[cj];  bf[qi+1]=p[cj+1];  bf[qi+2]=p[cj+2];  bf[qi+3]=(j<tl)?ap[j]:255;  }
	}
	else if(ctype==4) {	// gray + alpha
		if(depth== 8)  for(var i=0; i<area; i++) {  var qi=i<<2, di=i<<1, gr=data[di];  bf[qi]=gr;  bf[qi+1]=gr;  bf[qi+2]=gr;  bf[qi+3]=data[di+1];  }
		if(depth==16)  for(var i=0; i<area; i++) {  var qi=i<<2, di=i<<2, gr=data[di];  bf[qi]=gr;  bf[qi+1]=gr;  bf[qi+2]=gr;  bf[qi+3]=data[di+2];  }
	}
	else if(ctype==0) {	// gray
		var tr = out.tabs["tRNS"] ? out.tabs["tRNS"] : -1;
		for(var y=0; y<h; y++) {
			var off = y*bpl, to = y*w;
			if     (depth== 1) for(var x=0; x<w; x++) {  var gr=255*((data[off+(x>>>3)]>>>(7 -((x&7)   )))& 1), al=(gr==tr*255)?0:255;  bf32[to+x]=(al<<24)|(gr<<16)|(gr<<8)|gr;  }
			else if(depth== 2) for(var x=0; x<w; x++) {  var gr= 85*((data[off+(x>>>2)]>>>(6 -((x&3)<<1)))& 3), al=(gr==tr* 85)?0:255;  bf32[to+x]=(al<<24)|(gr<<16)|(gr<<8)|gr;  }
			else if(depth== 4) for(var x=0; x<w; x++) {  var gr= 17*((data[off+(x>>>1)]>>>(4 -((x&1)<<2)))&15), al=(gr==tr* 17)?0:255;  bf32[to+x]=(al<<24)|(gr<<16)|(gr<<8)|gr;  }
			else if(depth== 8) for(var x=0; x<w; x++) {  var gr=data[off+     x], al=(gr                 ==tr)?0:255;  bf32[to+x]=(al<<24)|(gr<<16)|(gr<<8)|gr;  }
			else if(depth==16) for(var x=0; x<w; x++) {  var gr=data[off+(x<<1)], al=(rs(data,off+(x<<i))==tr)?0:255;  bf32[to+x]=(al<<24)|(gr<<16)|(gr<<8)|gr;  }
		}
	}
	//console.log(Date.now()-time);
	return bf;
}



UPNG.decode = function(buff)
{
	var data = new Uint8Array(buff), offset = 8, bin = UPNG._bin, rUs = bin.readUshort, rUi = bin.readUint;
	var out = {tabs:{}, frames:[]};
	var dd = new Uint8Array(data.length), doff = 0;	 // put all IDAT data into it
	var fd, foff = 0;	// frames
	
	var mgck = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
	for(var i=0; i<8; i++) if(data[i]!=mgck[i]) throw "The input is not a PNG file!";

	while(offset<data.length)
	{
		var len  = bin.readUint(data, offset);  offset += 4;
		var type = bin.readASCII(data, offset, 4);  offset += 4;
		//console.log(type,len);
		
		if     (type=="IHDR")  {  UPNG.decode._IHDR(data, offset, out);  }
		else if(type=="CgBI")  {  out.tabs[type] = data.slice(offset,offset+4);  }
		else if(type=="IDAT") {
			for(var i=0; i<len; i++) dd[doff+i] = data[offset+i];
			doff += len;
		}
		else if(type=="acTL")  {
			out.tabs[type] = {  num_frames:rUi(data, offset), num_plays:rUi(data, offset+4)  };
			fd = new Uint8Array(data.length);
		}
		else if(type=="fcTL")  {
			if(foff!=0) {  var fr = out.frames[out.frames.length-1];
				fr.data = UPNG.decode._decompress(out, fd.slice(0,foff), fr.rect.width, fr.rect.height);  foff=0;
			}
			var rct = {x:rUi(data, offset+12),y:rUi(data, offset+16),width:rUi(data, offset+4),height:rUi(data, offset+8)};
			var del = rUs(data, offset+22);  del = rUs(data, offset+20) / (del==0?100:del);
			var frm = {rect:rct, delay:Math.round(del*1000), dispose:data[offset+24], blend:data[offset+25]};
			//console.log(frm);
			out.frames.push(frm);
		}
		else if(type=="fdAT") {
			for(var i=0; i<len-4; i++) fd[foff+i] = data[offset+i+4];
			foff += len-4;
		}
		else if(type=="pHYs") {
			out.tabs[type] = [bin.readUint(data, offset), bin.readUint(data, offset+4), data[offset+8]];
		}
		else if(type=="cHRM") {
			out.tabs[type] = [];
			for(var i=0; i<8; i++) out.tabs[type].push(bin.readUint(data, offset+i*4));
		}
		else if(type=="tEXt" || type=="zTXt") {
			if(out.tabs[type]==null) out.tabs[type] = {};
			var nz = bin.nextZero(data, offset);
			var keyw = bin.readASCII(data, offset, nz-offset);
			var text, tl=offset+len-nz-1;
			if(type=="tEXt") text = bin.readASCII(data, nz+1, tl);
			else {
				var bfr = UPNG.decode._inflate(data.slice(nz+2,nz+2+tl));
				text = bin.readUTF8(bfr,0,bfr.length);
			}
			out.tabs[type][keyw] = text;
		}
		else if(type=="iTXt") {
			if(out.tabs[type]==null) out.tabs[type] = {};
			var nz = 0, off = offset;
			nz = bin.nextZero(data, off);
			var keyw = bin.readASCII(data, off, nz-off);  off = nz + 1;
			var cflag = data[off], cmeth = data[off+1];  off+=2;
			nz = bin.nextZero(data, off);
			var ltag = bin.readASCII(data, off, nz-off);  off = nz + 1;
			nz = bin.nextZero(data, off);
			var tkeyw = bin.readUTF8(data, off, nz-off);  off = nz + 1;
			var text, tl=len-(off-offset);
			if(cflag==0) text  = bin.readUTF8(data, off, tl);
			else {
				var bfr = UPNG.decode._inflate(data.slice(off,off+tl));
				text = bin.readUTF8(bfr,0,bfr.length);
			}
			out.tabs[type][keyw] = text;
		}
		else if(type=="PLTE") {
			out.tabs[type] = bin.readBytes(data, offset, len);
		}
		else if(type=="hIST") {
			var pl = out.tabs["PLTE"].length/3;
			out.tabs[type] = [];  for(var i=0; i<pl; i++) out.tabs[type].push(rUs(data, offset+i*2));
		}
		else if(type=="tRNS") {
			if     (out.ctype==3) out.tabs[type] = bin.readBytes(data, offset, len);
			else if(out.ctype==0) out.tabs[type] = rUs(data, offset);
			else if(out.ctype==2) out.tabs[type] = [ rUs(data,offset),rUs(data,offset+2),rUs(data,offset+4) ];
			//else console.log("tRNS for unsupported color type",out.ctype, len);
		}
		else if(type=="gAMA") out.tabs[type] = bin.readUint(data, offset)/100000;
		else if(type=="sRGB") out.tabs[type] = data[offset];
		else if(type=="bKGD")
		{
			if     (out.ctype==0 || out.ctype==4) out.tabs[type] = [rUs(data, offset)];
			else if(out.ctype==2 || out.ctype==6) out.tabs[type] = [rUs(data, offset), rUs(data, offset+2), rUs(data, offset+4)];
			else if(out.ctype==3) out.tabs[type] = data[offset];
		}
		else if(type=="IEND") {
			break;
		}
		//else {  console.log("unknown chunk type", type, len);  out.tabs[type]=data.slice(offset,offset+len);  }
		offset += len;
		var crc = bin.readUint(data, offset);  offset += 4;
	}
	if(foff!=0) {  var fr = out.frames[out.frames.length-1];
		fr.data = UPNG.decode._decompress(out, fd.slice(0,foff), fr.rect.width, fr.rect.height);  foff=0;
	}	
	out.data = UPNG.decode._decompress(out, dd, out.width, out.height);
	
	delete out.compress;  delete out.interlace;  delete out.filter;
	return out;
}

UPNG.decode._decompress = function(out, dd, w, h) {
	var time = Date.now();
	var bpp = UPNG.decode._getBPP(out), bpl = Math.ceil(w*bpp/8), buff = new Uint8Array((bpl+1+out.interlace)*h);
	if(out.tabs["CgBI"]) dd = UPNG.inflateRaw(dd,buff);
	else                 dd = UPNG.decode._inflate(dd,buff);
	//console.log(dd.length, buff.length);
	//console.log(Date.now()-time);

	var time=Date.now();
	if     (out.interlace==0) dd = UPNG.decode._filterZero(dd, out, 0, w, h);
	else if(out.interlace==1) dd = UPNG.decode._readInterlace(dd, out);
	//console.log(Date.now()-time);
	return dd;
}

UPNG.decode._inflate = function(data, buff) {  var out=UPNG["inflateRaw"](new Uint8Array(data.buffer, 2,data.length-6),buff);  return out;  }
UPNG.inflateRaw=function(){var H={};H.H={};H.H.N=function(N,W){var R=Uint8Array,i=0,m=0,J=0,h=0,Q=0,X=0,u=0,w=0,d=0,v,C;
if(N[0]==3&&N[1]==0)return W?W:new R(0);var V=H.H,n=V.b,A=V.e,l=V.R,M=V.n,I=V.A,e=V.Z,b=V.m,Z=W==null;
if(Z)W=new R(N.length>>>2<<5);while(i==0){i=n(N,d,1);m=n(N,d+1,2);d+=3;if(m==0){if((d&7)!=0)d+=8-(d&7);
var D=(d>>>3)+4,q=N[D-4]|N[D-3]<<8;if(Z)W=H.H.W(W,w+q);W.set(new R(N.buffer,N.byteOffset+D,q),w);d=D+q<<3;
w+=q;continue}if(Z)W=H.H.W(W,w+(1<<17));if(m==1){v=b.J;C=b.h;X=(1<<9)-1;u=(1<<5)-1}if(m==2){J=A(N,d,5)+257;
h=A(N,d+5,5)+1;Q=A(N,d+10,4)+4;d+=14;var E=d,j=1;for(var c=0;c<38;c+=2){b.Q[c]=0;b.Q[c+1]=0}for(var c=0;
c<Q;c++){var K=A(N,d+c*3,3);b.Q[(b.X[c]<<1)+1]=K;if(K>j)j=K}d+=3*Q;M(b.Q,j);I(b.Q,j,b.u);v=b.w;C=b.d;
d=l(b.u,(1<<j)-1,J+h,N,d,b.v);var r=V.V(b.v,0,J,b.C);X=(1<<r)-1;var S=V.V(b.v,J,h,b.D);u=(1<<S)-1;M(b.C,r);
I(b.C,r,v);M(b.D,S);I(b.D,S,C)}while(!0){var T=v[e(N,d)&X];d+=T&15;var p=T>>>4;if(p>>>8==0){W[w++]=p}else if(p==256){break}else{var z=w+p-254;
if(p>264){var _=b.q[p-257];z=w+(_>>>3)+A(N,d,_&7);d+=_&7}var $=C[e(N,d)&u];d+=$&15;var s=$>>>4,Y=b.c[s],a=(Y>>>4)+n(N,d,Y&15);
d+=Y&15;while(w<z){W[w]=W[w++-a];W[w]=W[w++-a];W[w]=W[w++-a];W[w]=W[w++-a]}w=z}}}return W.length==w?W:W.slice(0,w)};
H.H.W=function(N,W){var R=N.length;if(W<=R)return N;var V=new Uint8Array(R<<1);V.set(N,0);return V};
H.H.R=function(N,W,R,V,n,A){var l=H.H.e,M=H.H.Z,I=0;while(I<R){var e=N[M(V,n)&W];n+=e&15;var b=e>>>4;
if(b<=15){A[I]=b;I++}else{var Z=0,m=0;if(b==16){m=3+l(V,n,2);n+=2;Z=A[I-1]}else if(b==17){m=3+l(V,n,3);
n+=3}else if(b==18){m=11+l(V,n,7);n+=7}var J=I+m;while(I<J){A[I]=Z;I++}}}return n};H.H.V=function(N,W,R,V){var n=0,A=0,l=V.length>>>1;
while(A<R){var M=N[A+W];V[A<<1]=0;V[(A<<1)+1]=M;if(M>n)n=M;A++}while(A<l){V[A<<1]=0;V[(A<<1)+1]=0;A++}return n};
H.H.n=function(N,W){var R=H.H.m,V=N.length,n,A,l,M,I,e=R.j;for(var M=0;M<=W;M++)e[M]=0;for(M=1;M<V;M+=2)e[N[M]]++;
var b=R.K;n=0;e[0]=0;for(A=1;A<=W;A++){n=n+e[A-1]<<1;b[A]=n}for(l=0;l<V;l+=2){I=N[l+1];if(I!=0){N[l]=b[I];
b[I]++}}};H.H.A=function(N,W,R){var V=N.length,n=H.H.m,A=n.r;for(var l=0;l<V;l+=2)if(N[l+1]!=0){var M=l>>1,I=N[l+1],e=M<<4|I,b=W-I,Z=N[l]<<b,m=Z+(1<<b);
while(Z!=m){var J=A[Z]>>>15-W;R[J]=e;Z++}}};H.H.l=function(N,W){var R=H.H.m.r,V=15-W;for(var n=0;n<N.length;
n+=2){var A=N[n]<<W-N[n+1];N[n]=R[A]>>>V}};H.H.M=function(N,W,R){R=R<<(W&7);var V=W>>>3;N[V]|=R;N[V+1]|=R>>>8};
H.H.I=function(N,W,R){R=R<<(W&7);var V=W>>>3;N[V]|=R;N[V+1]|=R>>>8;N[V+2]|=R>>>16};H.H.e=function(N,W,R){return(N[W>>>3]|N[(W>>>3)+1]<<8)>>>(W&7)&(1<<R)-1};
H.H.b=function(N,W,R){return(N[W>>>3]|N[(W>>>3)+1]<<8|N[(W>>>3)+2]<<16)>>>(W&7)&(1<<R)-1};H.H.Z=function(N,W){return(N[W>>>3]|N[(W>>>3)+1]<<8|N[(W>>>3)+2]<<16)>>>(W&7)};
H.H.i=function(N,W){return(N[W>>>3]|N[(W>>>3)+1]<<8|N[(W>>>3)+2]<<16|N[(W>>>3)+3]<<24)>>>(W&7)};H.H.m=function(){var N=Uint16Array,W=Uint32Array;
return{K:new N(16),j:new N(16),X:[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],S:[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,999,999,999],T:[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0],q:new N(32),p:[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,65535,65535],z:[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0],c:new W(32),J:new N(512),_:[],h:new N(32),$:[],w:new N(32768),C:[],v:[],d:new N(32768),D:[],u:new N(512),Q:[],r:new N(1<<15),s:new W(286),Y:new W(30),a:new W(19),t:new W(15e3),k:new N(1<<16),g:new N(1<<15)}}();
(function(){var N=H.H.m,W=1<<15;for(var R=0;R<W;R++){var V=R;V=(V&2863311530)>>>1|(V&1431655765)<<1;
V=(V&3435973836)>>>2|(V&858993459)<<2;V=(V&4042322160)>>>4|(V&252645135)<<4;V=(V&4278255360)>>>8|(V&16711935)<<8;
N.r[R]=(V>>>16|V<<16)>>>17}function n(A,l,M){while(l--!=0)A.push(0,M)}for(var R=0;R<32;R++){N.q[R]=N.S[R]<<3|N.T[R];
N.c[R]=N.p[R]<<4|N.z[R]}n(N._,144,8);n(N._,255-143,9);n(N._,279-255,7);n(N._,287-279,8);H.H.n(N._,9);
H.H.A(N._,9,N.J);H.H.l(N._,9);n(N.$,32,5);H.H.n(N.$,5);H.H.A(N.$,5,N.h);H.H.l(N.$,5);n(N.Q,19,0);n(N.C,286,0);
n(N.D,30,0);n(N.v,320,0)}());return H.H.N}()


UPNG.decode._readInterlace = function(data, out)
{
	var w = out.width, h = out.height;
	var bpp = UPNG.decode._getBPP(out), cbpp = bpp>>3, bpl = Math.ceil(w*bpp/8);
	var img = new Uint8Array( h * bpl );
	var di = 0;

	var starting_row  = [ 0, 0, 4, 0, 2, 0, 1 ];
	var starting_col  = [ 0, 4, 0, 2, 0, 1, 0 ];
	var row_increment = [ 8, 8, 8, 4, 4, 2, 2 ];
	var col_increment = [ 8, 8, 4, 4, 2, 2, 1 ];

	var pass=0;
	while(pass<7)
	{
		var ri = row_increment[pass], ci = col_increment[pass];
		var sw = 0, sh = 0;
		var cr = starting_row[pass];  while(cr<h) {  cr+=ri;  sh++;  }
		var cc = starting_col[pass];  while(cc<w) {  cc+=ci;  sw++;  }
		var bpll = Math.ceil(sw*bpp/8);
		UPNG.decode._filterZero(data, out, di, sw, sh);

		var y=0, row = starting_row[pass];
		while(row<h)
		{
			var col = starting_col[pass];
			var cdi = (di+y*bpll)<<3;

			while(col<w)
			{
				if(bpp==1) {
					var val = data[cdi>>3];  val = (val>>(7-(cdi&7)))&1;
					img[row*bpl + (col>>3)] |= (val << (7-((col&7)<<0)));
				}
				if(bpp==2) {
					var val = data[cdi>>3];  val = (val>>(6-(cdi&7)))&3;
					img[row*bpl + (col>>2)] |= (val << (6-((col&3)<<1)));
				}
				if(bpp==4) {
					var val = data[cdi>>3];  val = (val>>(4-(cdi&7)))&15;
					img[row*bpl + (col>>1)] |= (val << (4-((col&1)<<2)));
				}
				if(bpp>=8) {
					var ii = row*bpl+col*cbpp;
					for(var j=0; j<cbpp; j++) img[ii+j] = data[(cdi>>3)+j];
				}
				cdi+=bpp;  col+=ci;
			}
			y++;  row += ri;
		}
		if(sw*sh!=0) di += sh * (1 + bpll);
		pass = pass + 1;
	}
	return img;
}

UPNG.decode._getBPP = function(out) {
	var noc = [1,null,3,1,2,null,4][out.ctype];
	return noc * out.depth;
}

UPNG.decode._filterZero = function(data, out, off, w, h)
{
	var bpp = UPNG.decode._getBPP(out), bpl = Math.ceil(w*bpp/8), paeth = UPNG.decode._paeth;
	bpp = Math.ceil(bpp/8);
	
	var i=0, di=1, type=data[off], x=0;
	
	if(type>1) data[off]=[0,0,1][type-2];  
	if(type==3) for(x=bpp; x<bpl; x++) data[x+1] = (data[x+1] + (data[x+1-bpp]>>>1) )&255;

	for(var y=0; y<h; y++)  {
		i = off+y*bpl; di = i+y+1;
		type = data[di-1]; x=0;

		if     (type==0)   for(; x<bpl; x++) data[i+x] = data[di+x];
		else if(type==1) { for(; x<bpp; x++) data[i+x] = data[di+x];
						   for(; x<bpl; x++) data[i+x] = (data[di+x] + data[i+x-bpp]);  }
		else if(type==2) { for(; x<bpl; x++) data[i+x] = (data[di+x] + data[i+x-bpl]);  }
		else if(type==3) { for(; x<bpp; x++) data[i+x] = (data[di+x] + ( data[i+x-bpl]>>>1));
			               for(; x<bpl; x++) data[i+x] = (data[di+x] + ((data[i+x-bpl]+data[i+x-bpp])>>>1) );  }
		else             { for(; x<bpp; x++) data[i+x] = (data[di+x] + paeth(0, data[i+x-bpl], 0));
						   for(; x<bpl; x++) data[i+x] = (data[di+x] + paeth(data[i+x-bpp], data[i+x-bpl], data[i+x-bpp-bpl]) );  }
	}
	return data;
}

UPNG.decode._paeth = function(a,b,c)
{
	var p = a+b-c, pa = (p-a), pb = (p-b), pc = (p-c);
	if (pa*pa <= pb*pb && pa*pa <= pc*pc)  return a;
	else if (pb*pb <= pc*pc)  return b;
	return c;
}

UPNG.decode._IHDR = function(data, offset, out)
{
	var bin = UPNG._bin;
	out.width  = bin.readUint(data, offset);  offset += 4;
	out.height = bin.readUint(data, offset);  offset += 4;
	out.depth     = data[offset];  offset++;
	out.ctype     = data[offset];  offset++;
	out.compress  = data[offset];  offset++;
	out.filter    = data[offset];  offset++;
	out.interlace = data[offset];  offset++;
}

UPNG._bin = {
	nextZero   : function(data,p)  {  while(data[p]!=0) p++;  return p;  },
	readUshort : function(buff,p)  {  return (buff[p]<< 8) | buff[p+1];  },
	writeUshort: function(buff,p,n){  buff[p] = (n>>8)&255;  buff[p+1] = n&255;  },
	readUint   : function(buff,p)  {  return (buff[p]*(256*256*256)) + ((buff[p+1]<<16) | (buff[p+2]<< 8) | buff[p+3]);  },
	writeUint  : function(buff,p,n){  buff[p]=(n>>24)&255;  buff[p+1]=(n>>16)&255;  buff[p+2]=(n>>8)&255;  buff[p+3]=n&255;  },
	readASCII  : function(buff,p,l){  var s = "";  for(var i=0; i<l; i++) s += String.fromCharCode(buff[p+i]);  return s;    },
	writeASCII : function(data,p,s){  for(var i=0; i<s.length; i++) data[p+i] = s.charCodeAt(i);  },
	readBytes  : function(buff,p,l){  var arr = [];   for(var i=0; i<l; i++) arr.push(buff[p+i]);   return arr;  },
	pad : function(n) { return n.length < 2 ? "0" + n : n; },
	readUTF8 : function(buff, p, l) {
		var s = "", ns;
		for(var i=0; i<l; i++) s += "%" + UPNG._bin.pad(buff[p+i].toString(16));
		try {  ns = decodeURIComponent(s); }
		catch(e) {  return UPNG._bin.readASCII(buff, p, l);  }
		return  ns;
	}
}
UPNG._copyTile = function(sb, sw, sh, tb, tw, th, xoff, yoff, mode)
{
	var w = Math.min(sw,tw), h = Math.min(sh,th);
	var si=0, ti=0;
	for(var y=0; y<h; y++)
		for(var x=0; x<w; x++)
		{
			if(xoff>=0 && yoff>=0) {  si = (y*sw+x)<<2;  ti = (( yoff+y)*tw+xoff+x)<<2;  }
			else                   {  si = ((-yoff+y)*sw-xoff+x)<<2;  ti = (y*tw+x)<<2;  }
			
			if     (mode==0) {  tb[ti] = sb[si];  tb[ti+1] = sb[si+1];  tb[ti+2] = sb[si+2];  tb[ti+3] = sb[si+3];  }
			else if(mode==1) {
				var fa = sb[si+3]*(1/255), fr=sb[si]*fa, fg=sb[si+1]*fa, fb=sb[si+2]*fa; 
				var ba = tb[ti+3]*(1/255), br=tb[ti]*ba, bg=tb[ti+1]*ba, bb=tb[ti+2]*ba; 
				
				var ifa=1-fa, oa = fa+ba*ifa, ioa = (oa==0?0:1/oa);
				tb[ti+3] = 255*oa;  
				tb[ti+0] = (fr+br*ifa)*ioa;  
				tb[ti+1] = (fg+bg*ifa)*ioa;   
				tb[ti+2] = (fb+bb*ifa)*ioa;  
			}
			else if(mode==2){	// copy only differences, otherwise zero
				var fa = sb[si+3], fr=sb[si], fg=sb[si+1], fb=sb[si+2]; 
				var ba = tb[ti+3], br=tb[ti], bg=tb[ti+1], bb=tb[ti+2]; 
				if(fa==ba && fr==br && fg==bg && fb==bb) {  tb[ti]=0;  tb[ti+1]=0;  tb[ti+2]=0;  tb[ti+3]=0;  }
				else {  tb[ti]=fr;  tb[ti+1]=fg;  tb[ti+2]=fb;  tb[ti+3]=fa;  }
			}
			else if(mode==3){	// check if can be blended
				var fa = sb[si+3], fr=sb[si], fg=sb[si+1], fb=sb[si+2]; 
				var ba = tb[ti+3], br=tb[ti], bg=tb[ti+1], bb=tb[ti+2]; 
				if(fa==ba && fr==br && fg==bg && fb==bb) continue;
				//if(fa!=255 && ba!=0) return false;
				if(fa<220 && ba>20) return false;
			}
		}
	return true;
}


UPNG.encode = function(bufs, w, h, ps, dels, tabs, forbidPlte)
{
	if(ps==null) ps=0;
	if(forbidPlte==null) forbidPlte = false;

	var nimg = UPNG.encode.compress(bufs, w, h, ps, [false, false, false, 0, forbidPlte,false]);
	UPNG.encode.compressPNG(nimg, -1);
	
	return UPNG.encode._main(nimg, w, h, dels, tabs);
}

UPNG.encodeLL = function(bufs, w, h, cc, ac, depth, dels, tabs) {
	var nimg = {  ctype: 0 + (cc==1 ? 0 : 2) + (ac==0 ? 0 : 4),      depth: depth,  frames: []  };
	
	var time = Date.now();
	var bipp = (cc+ac)*depth, bipl = bipp * w;
	for(var i=0; i<bufs.length; i++)
		nimg.frames.push({  rect:{x:0,y:0,width:w,height:h},  img:new Uint8Array(bufs[i]), blend:0, dispose:1, bpp:Math.ceil(bipp/8), bpl:Math.ceil(bipl/8)  });
	
	UPNG.encode.compressPNG(nimg, 0, true);
	
	var out = UPNG.encode._main(nimg, w, h, dels, tabs);
	return out;
}

UPNG.encode._main = function(nimg, w, h, dels, tabs) {
	if(tabs==null) tabs={};
	var crc = UPNG.crc.crc, wUi = UPNG._bin.writeUint, wUs = UPNG._bin.writeUshort, wAs = UPNG._bin.writeASCII;
	var offset = 8, anim = nimg.frames.length>1, pltAlpha = false;
	
	var leng = 8 + (16+5+4) /*+ (9+4)*/ + (anim ? 20 : 0);
	if(tabs["sRGB"]!=null) leng += 8+1+4;
	if(tabs["pHYs"]!=null) leng += 8+9+4;
	if(nimg.ctype==3) {
		var dl = nimg.plte.length;
		for(var i=0; i<dl; i++) if((nimg.plte[i]>>>24)!=255) pltAlpha = true;
		leng += (8 + dl*3 + 4) + (pltAlpha ? (8 + dl*1 + 4) : 0);
	}
	for(var j=0; j<nimg.frames.length; j++)
	{
		var fr = nimg.frames[j];
		if(anim) leng += 38;
		leng += fr.cimg.length + 12;
		if(j!=0) leng+=4;
	}
	leng += 12; 
	
	var data = new Uint8Array(leng);
	var wr=[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
	for(var i=0; i<8; i++) data[i]=wr[i];
	
	wUi(data,offset, 13);     offset+=4;
	wAs(data,offset,"IHDR");  offset+=4;
	wUi(data,offset,w);  offset+=4;
	wUi(data,offset,h);  offset+=4;
	data[offset] = nimg.depth;  offset++;  // depth
	data[offset] = nimg.ctype;  offset++;  // ctype
	data[offset] = 0;  offset++;  // compress
	data[offset] = 0;  offset++;  // filter
	data[offset] = 0;  offset++;  // interlace
	wUi(data,offset,crc(data,offset-17,17));  offset+=4; // crc

	// 13 bytes to say, that it is sRGB
	if(tabs["sRGB"]!=null) {
		wUi(data,offset, 1);      offset+=4;
		wAs(data,offset,"sRGB");  offset+=4;
		data[offset] = tabs["sRGB"];  offset++;
		wUi(data,offset,crc(data,offset-5,5));  offset+=4; // crc
	}
	if(tabs["pHYs"]!=null) {
		wUi(data,offset, 9);      offset+=4;
		wAs(data,offset,"pHYs");  offset+=4;
		wUi(data,offset, tabs["pHYs"][0]);      offset+=4;
		wUi(data,offset, tabs["pHYs"][1]);      offset+=4;
		data[offset]=tabs["pHYs"][2];			offset++;
		wUi(data,offset,crc(data,offset-13,13));  offset+=4; // crc
	}

	if(anim) {
		wUi(data,offset, 8);      offset+=4;
		wAs(data,offset,"acTL");  offset+=4;
		wUi(data,offset, nimg.frames.length);     offset+=4;
		wUi(data,offset, tabs["loop"]!=null?tabs["loop"]:0);      offset+=4;
		wUi(data,offset,crc(data,offset-12,12));  offset+=4; // crc
	}

	if(nimg.ctype==3) {
		var dl = nimg.plte.length;
		wUi(data,offset, dl*3);  offset+=4;
		wAs(data,offset,"PLTE");  offset+=4;
		for(var i=0; i<dl; i++){
			var ti=i*3, c=nimg.plte[i], r=(c)&255, g=(c>>>8)&255, b=(c>>>16)&255;
			data[offset+ti+0]=r;  data[offset+ti+1]=g;  data[offset+ti+2]=b;
		}
		offset+=dl*3;
		wUi(data,offset,crc(data,offset-dl*3-4,dl*3+4));  offset+=4; // crc

		if(pltAlpha) {
			wUi(data,offset, dl);  offset+=4;
			wAs(data,offset,"tRNS");  offset+=4;
			for(var i=0; i<dl; i++)  data[offset+i]=(nimg.plte[i]>>>24)&255;
			offset+=dl;
			wUi(data,offset,crc(data,offset-dl-4,dl+4));  offset+=4; // crc
		}
	}
	
	var fi = 0;
	for(var j=0; j<nimg.frames.length; j++)
	{
		var fr = nimg.frames[j];
		if(anim) {
			wUi(data, offset, 26);     offset+=4;
			wAs(data, offset,"fcTL");  offset+=4;
			wUi(data, offset, fi++);   offset+=4;
			wUi(data, offset, fr.rect.width );   offset+=4;
			wUi(data, offset, fr.rect.height);   offset+=4;
			wUi(data, offset, fr.rect.x);   offset+=4;
			wUi(data, offset, fr.rect.y);   offset+=4;
			wUs(data, offset, dels[j]);   offset+=2;
			wUs(data, offset,  1000);   offset+=2;
			data[offset] = fr.dispose;  offset++;	// dispose
			data[offset] = fr.blend  ;  offset++;	// blend
			wUi(data,offset,crc(data,offset-30,30));  offset+=4; // crc
		}
				
		var imgd = fr.cimg, dl = imgd.length;
		wUi(data,offset, dl+(j==0?0:4));     offset+=4;
		var ioff = offset;
		wAs(data,offset,(j==0)?"IDAT":"fdAT");  offset+=4;
		if(j!=0) {  wUi(data, offset, fi++);  offset+=4;  }
		data.set(imgd,offset);
		offset += dl;
		wUi(data,offset,crc(data,ioff,offset-ioff));  offset+=4; // crc
	}

	wUi(data,offset, 0);     offset+=4;
	wAs(data,offset,"IEND");  offset+=4;
	wUi(data,offset,crc(data,offset-4,4));  offset+=4; // crc

	return data.buffer;
}

UPNG.encode.compressPNG = function(out, filter, levelZero) {
	for(var i=0; i<out.frames.length; i++) {
		var frm = out.frames[i], nw=frm.rect.width, nh=frm.rect.height;
		var fdata = new Uint8Array(nh*frm.bpl+nh);
		frm.cimg = UPNG.encode._filterZero(frm.img,nh,frm.bpp,frm.bpl,fdata, filter, levelZero);
	}
}



UPNG.encode.compress = function(bufs, w, h, ps, prms) // prms:  onlyBlend, minBits, forbidPlte
{
	//var time = Date.now();
	var onlyBlend = prms[0], evenCrd = prms[1], forbidPrev = prms[2], minBits = prms[3], forbidPlte = prms[4], dither=prms[5];
	
	var ctype = 6, depth = 8, alphaAnd=255
	
	for(var j=0; j<bufs.length; j++)  {  // when not quantized, other frames can contain colors, that are not in an initial frame
		var img = new Uint8Array(bufs[j]), ilen = img.length;
		for(var i=0; i<ilen; i+=4) alphaAnd &= img[i+3];
	}
	var gotAlpha = (alphaAnd!=255);
	
	//console.log("alpha check", Date.now()-time);  time = Date.now();
	
	//var brute = gotAlpha && forGIF;		// brute : frames can only be copied, not "blended"
	var frms = UPNG.encode.framize(bufs, w, h, onlyBlend, evenCrd, forbidPrev);
	//console.log("framize", Date.now()-time);  time = Date.now();
	
	var cmap={}, plte=[], inds=[]; 
	
	if(ps!=0) {
		var nbufs = [];  for(var i=0; i<frms.length; i++) nbufs.push(frms[i].img.buffer);
		
		var abuf = UPNG.encode.concatRGBA(nbufs), qres = UPNG.quantize(abuf, ps);
		
		for(var i=0; i<qres.plte.length; i++) plte.push(qres.plte[i].est.rgba);
		
		var cof = 0;
		for(var i=0; i<frms.length; i++) {  
			var frm=frms[i], bln=frm.img.length, ind = new Uint8Array(qres.inds.buffer, cof>>2, bln>>2);  inds.push(ind);
			var bb = new Uint8Array(qres.abuf,cof,bln);
			
			//console.log(frm.img, frm.width, frm.height);
			//var time = Date.now();
			if(dither) UPNG.encode.dither(frm.img, frm.rect.width, frm.rect.height, plte, bb, ind);
			//console.log(Date.now()-time);
			frm.img.set(bb);  cof+=bln;  
		}
		
		//console.log("quantize", Date.now()-time);  time = Date.now();
	}
	else {
		// what if ps==0, but there are <=256 colors?  we still need to detect, if the palette could be used
		for(var j=0; j<frms.length; j++)  {  // when not quantized, other frames can contain colors, that are not in an initial frame
			var frm = frms[j], img32 = new Uint32Array(frm.img.buffer), nw=frm.rect.width, ilen = img32.length;
			var ind = new Uint8Array(ilen);  inds.push(ind);
			for(var i=0; i<ilen; i++) {
				var c = img32[i];
				if     (i!=0 && c==img32[i- 1]) ind[i]=ind[i-1];
				else if(i>nw && c==img32[i-nw]) ind[i]=ind[i-nw];
				else {
					var cmc = cmap[c];
					if(cmc==null) {  cmap[c]=cmc=plte.length;  plte.push(c);  if(plte.length>=300) break;  }
					ind[i]=cmc;
				}
			}
		}
		//console.log("make palette", Date.now()-time);  time = Date.now();
	}
	
	var cc=plte.length; //console.log("colors:",cc);
	if(cc<=256 && forbidPlte==false) {
		if(cc<= 2) depth=1;  else if(cc<= 4) depth=2;  else if(cc<=16) depth=4;  else depth=8;
		depth =  Math.max(depth, minBits);
	}
	
	for(var j=0; j<frms.length; j++)
	{
		var frm = frms[j], nx=frm.rect.x, ny=frm.rect.y, nw=frm.rect.width, nh=frm.rect.height;
		var cimg = frm.img, cimg32 = new Uint32Array(cimg.buffer);
		var bpl = 4*nw, bpp=4;
		if(cc<=256 && forbidPlte==false) {
			bpl = Math.ceil(depth*nw/8);
			var nimg = new Uint8Array(bpl*nh);
			var inj = inds[j];
			for(var y=0; y<nh; y++) {  var i=y*bpl, ii=y*nw;
				if     (depth==8) for(var x=0; x<nw; x++) nimg[i+(x)   ]   =  (inj[ii+x]             );
				else if(depth==4) for(var x=0; x<nw; x++) nimg[i+(x>>1)]  |=  (inj[ii+x]<<(4-(x&1)*4));
				else if(depth==2) for(var x=0; x<nw; x++) nimg[i+(x>>2)]  |=  (inj[ii+x]<<(6-(x&3)*2));
				else if(depth==1) for(var x=0; x<nw; x++) nimg[i+(x>>3)]  |=  (inj[ii+x]<<(7-(x&7)*1));
			}
			cimg=nimg;  ctype=3;  bpp=1;
		}
		else if(gotAlpha==false && frms.length==1) {	// some next "reduced" frames may contain alpha for blending
			var nimg = new Uint8Array(nw*nh*3), area=nw*nh;
			for(var i=0; i<area; i++) { var ti=i*3, qi=i*4;  nimg[ti]=cimg[qi];  nimg[ti+1]=cimg[qi+1];  nimg[ti+2]=cimg[qi+2];  }
			cimg=nimg;  ctype=2;  bpp=3;  bpl=3*nw;
		}
		frm.img=cimg;  frm.bpl=bpl;  frm.bpp=bpp;
	}
	//console.log("colors => palette indices", Date.now()-time);  time = Date.now();
	
	return {ctype:ctype, depth:depth, plte:plte, frames:frms  };
}
UPNG.encode.framize = function(bufs,w,h,alwaysBlend,evenCrd,forbidPrev) {
	/*  DISPOSE
	    - 0 : no change
		- 1 : clear to transparent
		- 2 : retstore to content before rendering (previous frame disposed)
		BLEND
		- 0 : replace
		- 1 : blend
	*/
	var frms = [];
	for(var j=0; j<bufs.length; j++) {
		var cimg = new Uint8Array(bufs[j]), cimg32 = new Uint32Array(cimg.buffer);
		var nimg;
		
		var nx=0, ny=0, nw=w, nh=h, blend=alwaysBlend?1:0;
		if(j!=0) {
			var tlim = (forbidPrev || alwaysBlend || j==1 || frms[j-2].dispose!=0)?1:2, tstp = 0, tarea = 1e9;
			for(var it=0; it<tlim; it++)
			{
				var pimg = new Uint8Array(bufs[j-1-it]), p32 = new Uint32Array(bufs[j-1-it]);
				var mix=w,miy=h,max=-1,may=-1;
				for(var y=0; y<h; y++) for(var x=0; x<w; x++) {
					var i = y*w+x;
					if(cimg32[i]!=p32[i]) {
						if(x<mix) mix=x;  if(x>max) max=x;
						if(y<miy) miy=y;  if(y>may) may=y;
					}
				}
				if(max==-1) mix=miy=max=may=0;
				if(evenCrd) {  if((mix&1)==1)mix--;  if((miy&1)==1)miy--;  }
				var sarea = (max-mix+1)*(may-miy+1);
				if(sarea<tarea) {
					tarea = sarea;  tstp = it;
					nx = mix; ny = miy; nw = max-mix+1; nh = may-miy+1;
				}
			}
			
			// alwaysBlend: pokud zjistím, že blendit nelze, nastavím předchozímu snímku dispose=1. Zajistím, aby obsahoval můj obdélník.
			var pimg = new Uint8Array(bufs[j-1-tstp]);
			if(tstp==1) frms[j-1].dispose = 2;
			
			nimg = new Uint8Array(nw*nh*4);
			UPNG._copyTile(pimg,w,h, nimg,nw,nh, -nx,-ny, 0);
			
			blend =  UPNG._copyTile(cimg,w,h, nimg,nw,nh, -nx,-ny, 3) ? 1 : 0;
			if(blend==1) UPNG.encode._prepareDiff(cimg,w,h,nimg,{x:nx,y:ny,width:nw,height:nh});
			else         UPNG._copyTile(cimg,w,h, nimg,nw,nh, -nx,-ny, 0);
			//UPNG._copyTile(cimg,w,h, nimg,nw,nh, -nx,-ny, blend==1?2:0);
		}
		else nimg = cimg.slice(0);	// img may be rewritten further ... don't rewrite input
		
		frms.push({rect:{x:nx,y:ny,width:nw,height:nh}, img:nimg, blend:blend, dispose:0});
	}
	
	
	if(alwaysBlend) for(var j=0; j<frms.length; j++) {
		var frm = frms[j];  if(frm.blend==1) continue;
		var r0 = frm.rect, r1 = frms[j-1].rect
		var miX = Math.min(r0.x, r1.x), miY = Math.min(r0.y, r1.y);
		var maX = Math.max(r0.x+r0.width, r1.x+r1.width), maY = Math.max(r0.y+r0.height, r1.y+r1.height);
		var r = {x:miX, y:miY, width:maX-miX, height:maY-miY};
		
		frms[j-1].dispose = 1;
		if(j-1!=0) 
		UPNG.encode._updateFrame(bufs, w,h,frms, j-1,r, evenCrd);
		UPNG.encode._updateFrame(bufs, w,h,frms, j  ,r, evenCrd);
	}
	var area = 0;
	if(bufs.length!=1) for(var i=0; i<frms.length; i++) {
		var frm = frms[i];
		area += frm.rect.width*frm.rect.height;
		//if(i==0 || frm.blend!=1) continue;
		//var ob = new Uint8Array(
		//console.log(frm.blend, frm.dispose, frm.rect);
	}
	//if(area!=0) console.log(area);
	return frms;
}
UPNG.encode._updateFrame = function(bufs, w,h, frms, i, r, evenCrd) {
	var U8 = Uint8Array, U32 = Uint32Array;
	var pimg = new U8(bufs[i-1]), pimg32 = new U32(bufs[i-1]), nimg = i+1<bufs.length ? new U8(bufs[i+1]):null;
	var cimg = new U8(bufs[i]), cimg32 = new U32(cimg.buffer);
	
	var mix=w,miy=h,max=-1,may=-1;
	for(var y=0; y<r.height; y++) for(var x=0; x<r.width; x++) {
		var cx = r.x+x, cy = r.y+y;
		var j = cy*w+cx, cc = cimg32[j];
		// no need to draw transparency, or to dispose it. Or, if writing the same color and the next one does not need transparency.
		if(cc==0 || (frms[i-1].dispose==0 && pimg32[j]==cc && (nimg==null || nimg[j*4+3]!=0))/**/) {}
		else {
			if(cx<mix) mix=cx;  if(cx>max) max=cx;
			if(cy<miy) miy=cy;  if(cy>may) may=cy;
		}
	}
	if(max==-1) mix=miy=max=may=0;
	if(evenCrd) {  if((mix&1)==1)mix--;  if((miy&1)==1)miy--;  }
	r = {x:mix, y:miy, width:max-mix+1, height:may-miy+1};
	
	var fr = frms[i];  fr.rect = r;  fr.blend = 1;  fr.img = new Uint8Array(r.width*r.height*4);
	if(frms[i-1].dispose==0) {
		UPNG._copyTile(pimg,w,h, fr.img,r.width,r.height, -r.x,-r.y, 0);
		UPNG.encode._prepareDiff(cimg,w,h,fr.img,r);
		//UPNG._copyTile(cimg,w,h, fr.img,r.width,r.height, -r.x,-r.y, 2);
	}
	else
		UPNG._copyTile(cimg,w,h, fr.img,r.width,r.height, -r.x,-r.y, 0);
}
UPNG.encode._prepareDiff = function(cimg, w,h, nimg, rec) {
	UPNG._copyTile(cimg,w,h, nimg,rec.width,rec.height, -rec.x,-rec.y, 2);
	/*
	var n32 = new Uint32Array(nimg.buffer);
	var og = new Uint8Array(rec.width*rec.height*4), o32 = new Uint32Array(og.buffer);
	UPNG._copyTile(cimg,w,h, og,rec.width,rec.height, -rec.x,-rec.y, 0);
	for(var i=4; i<nimg.length; i+=4) {
		if(nimg[i-1]!=0 && nimg[i+3]==0 && o32[i>>>2]==o32[(i>>>2)-1]) {
			n32[i>>>2]=o32[i>>>2];
			//var j = i, c=p32[(i>>>2)-1];
			//while(p32[j>>>2]==c) {  n32[j>>>2]=c;  j+=4;  }
		}
	}
	for(var i=nimg.length-8; i>0; i-=4) {
		if(nimg[i+7]!=0 && nimg[i+3]==0 && o32[i>>>2]==o32[(i>>>2)+1]) {
			n32[i>>>2]=o32[i>>>2];
			//var j = i, c=p32[(i>>>2)-1];
			//while(p32[j>>>2]==c) {  n32[j>>>2]=c;  j+=4;  }
		}
	}*/
}

UPNG.encode._filterZero = function(img,h,bpp,bpl,data, filter, levelZero)
{
	var fls = [], ftry=[0,1,2,3,4];
	if     (filter!=-1)             ftry=[filter];
	else if(h*bpl>500000 || bpp==1) ftry=[0];
	var opts;  if(levelZero) opts={level:0};
	
	
	var CMPR = (data.length>10e6 && UZIP!=null) ? UZIP : pako;
	
	var time = Date.now();
	for(var i=0; i<ftry.length; i++) {
		for(var y=0; y<h; y++) UPNG.encode._filterLine(data, img, y, bpl, bpp, ftry[i]);
		//var nimg = new Uint8Array(data.length);
		//var sz = UZIP.F.deflate(data, nimg);  fls.push(nimg.slice(0,sz));
		//var dfl = pako["deflate"](data), dl=dfl.length-4;
		//var crc = (dfl[dl+3]<<24)|(dfl[dl+2]<<16)|(dfl[dl+1]<<8)|(dfl[dl+0]<<0);
		//console.log(crc, UZIP.adler(data,2,data.length-6));
		fls.push(CMPR["deflate"](data,opts));
	}
	
	var ti, tsize=1e9;
	for(var i=0; i<fls.length; i++) if(fls[i].length<tsize) {  ti=i;  tsize=fls[i].length;  }
	return fls[ti];
}
UPNG.encode._filterLine = function(data, img, y, bpl, bpp, type)
{
	var i = y*bpl, di = i+y, paeth = UPNG.decode._paeth
	data[di]=type;  di++;

	if(type==0) {
		if(bpl<500) for(var x=0; x<bpl; x++) data[di+x] = img[i+x];
		else data.set(new Uint8Array(img.buffer,i,bpl),di);
	}
	else if(type==1) {
		for(var x=  0; x<bpp; x++) data[di+x] =  img[i+x];
		for(var x=bpp; x<bpl; x++) data[di+x] = (img[i+x]-img[i+x-bpp]+256)&255;
	}
	else if(y==0) {
		for(var x=  0; x<bpp; x++) data[di+x] = img[i+x];

		if(type==2) for(var x=bpp; x<bpl; x++) data[di+x] = img[i+x];
		if(type==3) for(var x=bpp; x<bpl; x++) data[di+x] = (img[i+x] - (img[i+x-bpp]>>1) +256)&255;
		if(type==4) for(var x=bpp; x<bpl; x++) data[di+x] = (img[i+x] - paeth(img[i+x-bpp], 0, 0) +256)&255;
	}
	else {
		if(type==2) { for(var x=  0; x<bpl; x++) data[di+x] = (img[i+x]+256 - img[i+x-bpl])&255;  }
		if(type==3) { for(var x=  0; x<bpp; x++) data[di+x] = (img[i+x]+256 - (img[i+x-bpl]>>1))&255;
					  for(var x=bpp; x<bpl; x++) data[di+x] = (img[i+x]+256 - ((img[i+x-bpl]+img[i+x-bpp])>>1))&255;  }
		if(type==4) { for(var x=  0; x<bpp; x++) data[di+x] = (img[i+x]+256 - paeth(0, img[i+x-bpl], 0))&255;
					  for(var x=bpp; x<bpl; x++) data[di+x] = (img[i+x]+256 - paeth(img[i+x-bpp], img[i+x-bpl], img[i+x-bpp-bpl]))&255;  }
	}
}

UPNG.crc = {
	table : ( function() {
	   var tab = new Uint32Array(256);
	   for (var n=0; n<256; n++) {
			var c = n;
			for (var k=0; k<8; k++) {
				if (c & 1)  c = 0xedb88320 ^ (c >>> 1);
				else        c = c >>> 1;
			}
			tab[n] = c;  }
		return tab;  })(),
	update : function(c, buf, off, len) {
		for (var i=0; i<len; i++)  c = UPNG.crc.table[(c ^ buf[off+i]) & 0xff] ^ (c >>> 8);
		return c;
	},
	crc : function(b,o,l)  {  return UPNG.crc.update(0xffffffff,b,o,l) ^ 0xffffffff;  }
}


UPNG.quantize = function(abuf, ps)
{	
	var sb = new Uint8Array(abuf), tb = sb.slice(0), tb32 = new Uint32Array(tb.buffer);
	
	var KD = UPNG.quantize.getKDtree(tb, ps);
	var root = KD[0], leafs = KD[1];
	
	var planeDst = UPNG.quantize.planeDst;
	var len=sb.length;
		
	var inds = new Uint8Array(len>>2), nd;
	if(sb.length<20e6)  // precise, but slow :(
		for(var i=0; i<len; i+=4) {
			var r=sb[i]*(1/255), g=sb[i+1]*(1/255), b=sb[i+2]*(1/255), a=sb[i+3]*(1/255);
			
			nd = UPNG.quantize.getNearest(root, r, g, b, a);
			inds[i>>2] = nd.ind;  tb32[i>>2] = nd.est.rgba;
		}
	else 
		for(var i=0; i<len; i+=4) {
			var r=sb[i]*(1/255), g=sb[i+1]*(1/255), b=sb[i+2]*(1/255), a=sb[i+3]*(1/255);
			
			nd = root;  while(nd.left) nd = (planeDst(nd.est,r,g,b,a)<=0) ? nd.left : nd.right;
			inds[i>>2] = nd.ind;  tb32[i>>2] = nd.est.rgba;
		}
	return {  abuf:tb.buffer, inds:inds, plte:leafs  };
}

UPNG.quantize.getKDtree = function(nimg, ps, err) {
	if(err==null) err = 0.0001;
	var nimg32 = new Uint32Array(nimg.buffer);
	
	var root = {i0:0, i1:nimg.length, bst:null, est:null, tdst:0, left:null, right:null };  // basic statistic, extra statistic
	root.bst = UPNG.quantize.stats(  nimg,root.i0, root.i1  );  root.est = UPNG.quantize.estats( root.bst );
	var leafs = [root];
	
	while(leafs.length<ps)
	{
		var maxL = 0, mi=0;
		for(var i=0; i<leafs.length; i++) if(leafs[i].est.L > maxL) {  maxL=leafs[i].est.L;  mi=i;  }
		if(maxL<err) break;
		var node = leafs[mi];
		
		var s0 = UPNG.quantize.splitPixels(nimg,nimg32, node.i0, node.i1, node.est.e, node.est.eMq255);
		var s0wrong = (node.i0>=s0 || node.i1<=s0);
		//console.log(maxL, leafs.length, mi);
		if(s0wrong) {  node.est.L=0;  continue;  }
		
		
		var ln = {i0:node.i0, i1:s0, bst:null, est:null, tdst:0, left:null, right:null };  ln.bst = UPNG.quantize.stats( nimg, ln.i0, ln.i1 );  
		ln.est = UPNG.quantize.estats( ln.bst );
		var rn = {i0:s0, i1:node.i1, bst:null, est:null, tdst:0, left:null, right:null };  rn.bst = {R:[], m:[], N:node.bst.N-ln.bst.N};
		for(var i=0; i<16; i++) rn.bst.R[i] = node.bst.R[i]-ln.bst.R[i];
		for(var i=0; i< 4; i++) rn.bst.m[i] = node.bst.m[i]-ln.bst.m[i];
		rn.est = UPNG.quantize.estats( rn.bst );
		
		node.left = ln;  node.right = rn;
		leafs[mi]=ln;  leafs.push(rn);
	}
	leafs.sort(function(a,b) {  return b.bst.N-a.bst.N;  });
	for(var i=0; i<leafs.length; i++) leafs[i].ind=i;
	return [root, leafs];
}

UPNG.quantize.getNearest = function(nd, r,g,b,a)
{
	if(nd.left==null) {  nd.tdst = UPNG.quantize.dist(nd.est.q,r,g,b,a);  return nd;  }
	var planeDst = UPNG.quantize.planeDst(nd.est,r,g,b,a);
	
	var node0 = nd.left, node1 = nd.right;
	if(planeDst>0) {  node0=nd.right;  node1=nd.left;  }
	
	var ln = UPNG.quantize.getNearest(node0, r,g,b,a);
	if(ln.tdst<=planeDst*planeDst) return ln;
	var rn = UPNG.quantize.getNearest(node1, r,g,b,a);
	return rn.tdst<ln.tdst ? rn : ln;
}
UPNG.quantize.planeDst = function(est, r,g,b,a) {  var e = est.e;  return e[0]*r + e[1]*g + e[2]*b + e[3]*a - est.eMq;  }
UPNG.quantize.dist     = function(q,   r,g,b,a) {  var d0=r-q[0], d1=g-q[1], d2=b-q[2], d3=a-q[3];  return d0*d0+d1*d1+d2*d2+d3*d3;  }

UPNG.quantize.splitPixels = function(nimg, nimg32, i0, i1, e, eMq)
{
	var vecDot = UPNG.quantize.vecDot;
	i1-=4;
	var shfs = 0;
	while(i0<i1)
	{
		while(vecDot(nimg, i0, e)<=eMq) i0+=4;
		while(vecDot(nimg, i1, e)> eMq) i1-=4;
		if(i0>=i1) break;
		
		var t = nimg32[i0>>2];  nimg32[i0>>2] = nimg32[i1>>2];  nimg32[i1>>2]=t;
		
		i0+=4;  i1-=4;
	}
	while(vecDot(nimg, i0, e)>eMq) i0-=4;
	return i0+4;
}
UPNG.quantize.vecDot = function(nimg, i, e)
{
	return nimg[i]*e[0] + nimg[i+1]*e[1] + nimg[i+2]*e[2] + nimg[i+3]*e[3];
}
UPNG.quantize.stats = function(nimg, i0, i1){
	var R = [0,0,0,0,  0,0,0,0,  0,0,0,0,  0,0,0,0];
	var m = [0,0,0,0];
	var N = (i1-i0)>>2;
	for(var i=i0; i<i1; i+=4)
	{
		var r = nimg[i]*(1/255), g = nimg[i+1]*(1/255), b = nimg[i+2]*(1/255), a = nimg[i+3]*(1/255);
		//var r = nimg[i], g = nimg[i+1], b = nimg[i+2], a = nimg[i+3];
		m[0]+=r;  m[1]+=g;  m[2]+=b;  m[3]+=a;
		
		R[ 0] += r*r;  R[ 1] += r*g;  R[ 2] += r*b;  R[ 3] += r*a;  
		               R[ 5] += g*g;  R[ 6] += g*b;  R[ 7] += g*a; 
		                              R[10] += b*b;  R[11] += b*a;  
		                                             R[15] += a*a;  
	}
	R[4]=R[1];  R[8]=R[2];  R[9]=R[6];  R[12]=R[3];  R[13]=R[7];  R[14]=R[11];
	
	return {R:R, m:m, N:N};
}
UPNG.quantize.estats = function(stats){
	var R = stats.R, m = stats.m, N = stats.N;
	
	// when all samples are equal, but N is large (millions), the Rj can be non-zero ( 0.0003.... - precission error)
	var m0 = m[0], m1 = m[1], m2 = m[2], m3 = m[3], iN = (N==0 ? 0 : 1/N);
	var Rj = [
		R[ 0] - m0*m0*iN,  R[ 1] - m0*m1*iN,  R[ 2] - m0*m2*iN,  R[ 3] - m0*m3*iN,  
		R[ 4] - m1*m0*iN,  R[ 5] - m1*m1*iN,  R[ 6] - m1*m2*iN,  R[ 7] - m1*m3*iN,
		R[ 8] - m2*m0*iN,  R[ 9] - m2*m1*iN,  R[10] - m2*m2*iN,  R[11] - m2*m3*iN,  
		R[12] - m3*m0*iN,  R[13] - m3*m1*iN,  R[14] - m3*m2*iN,  R[15] - m3*m3*iN 
	];
	
	var A = Rj, M = UPNG.M4;
	var b = [Math.random(),Math.random(),Math.random(),Math.random()], mi = 0, tmi = 0;
	
	if(N!=0)
	for(var i=0; i<16; i++) {
		b = M.multVec(A, b);  tmi = Math.sqrt(M.dot(b,b));  b = M.sml(1/tmi,  b);
		if(i!=0 && Math.abs(tmi-mi)<1e-9) break;  mi = tmi;
	}	
	//b = [0,0,1,0];  mi=N;
	var q = [m0*iN, m1*iN, m2*iN, m3*iN];
	var eMq255 = M.dot(M.sml(255,q),b);
	
	return {  Cov:Rj, q:q, e:b, L:mi,  eMq255:eMq255, eMq : M.dot(b,q),
				rgba: (((Math.round(255*q[3])<<24) | (Math.round(255*q[2])<<16) |  (Math.round(255*q[1])<<8) | (Math.round(255*q[0])<<0))>>>0)  };
}
UPNG.M4 = {
	multVec : function(m,v) {
			return [
				m[ 0]*v[0] + m[ 1]*v[1] + m[ 2]*v[2] + m[ 3]*v[3],
				m[ 4]*v[0] + m[ 5]*v[1] + m[ 6]*v[2] + m[ 7]*v[3],
				m[ 8]*v[0] + m[ 9]*v[1] + m[10]*v[2] + m[11]*v[3],
				m[12]*v[0] + m[13]*v[1] + m[14]*v[2] + m[15]*v[3]
			];
	},
	dot : function(x,y) {  return  x[0]*y[0]+x[1]*y[1]+x[2]*y[2]+x[3]*y[3];  },
	sml : function(a,y) {  return [a*y[0],a*y[1],a*y[2],a*y[3]];  }
}

UPNG.encode.concatRGBA = function(bufs) {
	var tlen = 0;
	for(var i=0; i<bufs.length; i++) tlen += bufs[i].byteLength;
	var nimg = new Uint8Array(tlen), noff=0;
	for(var i=0; i<bufs.length; i++) {
		var img = new Uint8Array(bufs[i]), il = img.length;
		for(var j=0; j<il; j+=4) {  
			var r=img[j], g=img[j+1], b=img[j+2], a = img[j+3];
			if(a==0) r=g=b=0;
			nimg[noff+j]=r;  nimg[noff+j+1]=g;  nimg[noff+j+2]=b;  nimg[noff+j+3]=a;  }
		noff += il;
	}
	return nimg.buffer;
}

UPNG.encode.dither = function(sb, w, h, plte, tb, oind) {
	
	function addErr(er, tg, ti, f) {
		tg[ti]+=(er[0]*f)>>4;  tg[ti+1]+=(er[1]*f)>>4;  tg[ti+2]+=(er[2]*f)>>4;  tg[ti+3]+=(er[3]*f)>>4;  
	}
	function N(x) {  return Math.max(0, Math.min(255, x));  }
	function D(a,b) {  var dr=a[0]-b[0], dg=a[1]-b[1], db=a[2]-b[2], da=a[3]-b[3];  return (dr*dr + dg*dg + db*db + da*da);  }
	
	
	var pc=plte.length, nplt = [], rads=[];
	for(var i=0; i<pc; i++) {
		var c = plte[i];
		nplt.push([((c>>>0)&255), ((c>>>8)&255), ((c>>>16)&255), ((c>>>24)&255)]);
	}
	for(var i=0; i<pc; i++) {
		var ne=0xffffffff, ni=0;
		for(var j=0; j<pc; j++) {  var ce=D(nplt[i],nplt[j]);  if(j!=i && ce<ne) {  ne=ce;  ni=j;  }  }
		var hd = Math.sqrt(ne)/2;
		rads[i] = ~~(hd*hd);
	}
		
	var tb32 = new Uint32Array(tb.buffer);
	var err = new Int16Array(w*h*4);
	
	for(var y=0; y<h; y++) {
		for(var x=0; x<w; x++) {
			var i = (y*w+x)*4;
			
			var cc = [N(sb[i]+err[i]), N(sb[i+1]+err[i+1]), N(sb[i+2]+err[i+2]), N(sb[i+3]+err[i+3])];
			
			var ni=0, nd = 0xffffff;
			for(var j=0; j<pc; j++) {
				var cd = D(cc,nplt[j]);
				if(cd<nd) {  nd=cd;  ni=j;  }
			}  
			
			//ni = oind[i>>2];
			var nc = nplt[ni];
			var er = [cc[0]-nc[0], cc[1]-nc[1], cc[2]-nc[2], cc[3]-nc[3]];
			
			//addErr(er, err, i+4, 16);
			
			//*
			if(x!=w-1) addErr(er, err, i+4    , 7);
			if(y!=h-1) {
				if(x!=  0) addErr(er, err, i+4*w-4, 3);
				           addErr(er, err, i+4*w  , 5);
				if(x!=w-1) addErr(er, err, i+4*w+4, 1);  //*/
			}
		
			oind[i>>2] = ni;  tb32[i>>2] = plte[ni];
		}
	}
}
var UTEX=function(){function x(i,P,j,R,d){var a=new Uint8Array(4*4*4);for(var m=0;m<d;m+=4)for(var Q=0;
Q<R;Q+=4){c(i,P,a);k(j,R,d,Q,m,a);P+=8}return P}function a6(i,P,j,R,d){var a=new Uint8Array(4*4*4);for(var m=0;
m<d;m+=4)for(var Q=0;Q<R;Q+=4){c(i,P+8,a);k(j,R,d,Q,m,a);P+=16}return P}function aq(i,P,j,R,d){var a=new Uint8Array(4*4*4);
for(var m=0;m<d;m+=4)for(var Q=0;Q<R;Q+=4){y(i,P,a);k(j,R,d,Q,m,a);P+=8}return P}function H(i,P,j,R,d){var a=new Uint8Array(16*4);
for(var m=0;m<j;m+=4)for(var Q=0;Q<P;Q+=4){K(i,P,j,Q,m,a);_(R,d,a);d+=8}return d}function M(i,P,j,R,d){var a={s:P*8},m=new Uint8Array(4*4*4);
for(var Q=0;Q<d;Q+=4)for(var v=0;v<R;v+=4){y(i,P+8,m);for(var J=0;J<64;J+=4){var q=n(i,a,4);m[J+3]=255*(q/15)}k(j,R,d,v,Q,m);
P+=16;a.s+=64}return P}function X(i,P){var j=[i,P];if(i>P)j.push(6/7*i+1/7*P,5/7*i+2/7*P,4/7*i+3/7*P,3/7*i+4/7*P,2/7*i+5/7*P,1/7*i+6/7*P);
else j.push(4/5*i+1/5*P,3/5*i+2/5*P,2/5*i+3/5*P,1/5*i+4/5*P,0,255);return j}function Y(i,P,j,R,d){var a=X(i[P],i[P+1]);
j.s+=16;for(var m=0;m<64;m+=4){var Q=n(i,j,3);R[m+d]=a[Q]}}function r(i,P,j,R,d){var a={s:P*8},m=new Uint8Array(4*4*4);
m.fill(255);for(var Q=0;Q<d;Q+=4)for(var v=0;v<R;v+=4){Y(i,P,a,m,1);P+=8;Y(i,P,a,m,0);P+=8;k(j,R,d,v,Q,m)}return P}function D(i,P,j,R,d){var a={s:P*8},m=new Uint8Array(4*4*4);
for(var Q=0;Q<d;Q+=4)for(var v=0;v<R;v+=4){y(i,P+8,m);Y(i,P,a,m,3);a.s+=64;k(j,R,d,v,Q,m);P+=16}return P}function g(i,P,j,R,d){var a=new Uint8Array(16*4);
for(var m=0;m<j;m+=4)for(var Q=0;Q<P;Q+=4){K(i,P,j,Q,m,a);var v=a[3],J=a[3];for(var q=7;q<64;q+=4){var p=a[q];
if(p<v)v=p;else if(J<p)J=p}R[d]=J;R[d+1]=v;d+=2;var b=X(J,v),f=d+2<<3;for(var q=0;q<64;q+=32){var $=0,f=0;
for(var l=0;l<32;l+=4){var A=0,W=500,p=a[q+l+3];for(var C=0;C<8;C++){var E=Math.abs(b[C]-p);if(E<W){W=E;
A=C}}$=$|A<<f;f+=3}R[d]=$;R[d+1]=$>>8;R[d+2]=$>>16;d+=3}_(R,d,a);d+=8}return d}var F=new Uint8Array(16);
function c(i,P,j){var R=i[P+1]<<8|i[P],d=i[P+3]<<8|i[P+2],a=(R&31)*(255/31),m=(R>>>5&31)*(255/31),Q=(R>>10)*(255/31),v=(d&31)*(255/31),J=(d>>>5&63)*(255/63),q=(d>>11)*(255/31),p=F;
p[0]=N(Q);p[1]=N(m);p[2]=N(a);p[3]=255;p[12]=N(q);p[13]=N(J);p[14]=N(v);p[15]=255;var b=2/3,f=1-b;p[4]=N(b*Q+f*q);
p[5]=N(b*m+f*J);p[6]=N(b*a+f*v);p[7]=255;b=1/3;f=1-b;p[8]=N(b*Q+f*q);p[9]=N(b*m+f*J);p[10]=N(b*a+f*v);
p[11]=255;w(i,j,p,P)}function y(i,P,j){var R=i[P+1]<<8|i[P],d=i[P+3]<<8|i[P+2],a=(R&31)*(255/31),m=(R>>>5&63)*(255/63),Q=(R>>11)*(255/31),v=(d&31)*(255/31),J=(d>>>5&63)*(255/63),q=(d>>11)*(255/31),p=F;
p[0]=N(Q);p[1]=N(m);p[2]=N(a);p[3]=255;p[4]=N(q);p[5]=N(J);p[6]=N(v);p[7]=255;if(d<R){var b=2/3,f=1-b;
p[8]=N(b*Q+f*q);p[9]=N(b*m+f*J);p[10]=N(b*a+f*v);p[11]=255;b=1/3;f=1-b;p[12]=N(b*Q+f*q);p[13]=N(b*m+f*J);
p[14]=N(b*a+f*v);p[15]=255}else{var b=1/2,f=1-b;p[8]=N(b*Q+f*q);p[9]=N(b*m+f*J);p[10]=N(b*a+f*v);p[11]=255;
p[12]=0;p[13]=0;p[14]=0;p[15]=0}w(i,j,p,P)}function N(i){return~~(.5+i)}function Z(i,P,j){return N(i*(31/255))<<11|~~(.45+P*(63/255))<<5|N(j*(31/255))}function _(i,P,j){var R=ac,d=aa(j),a=j[d>>8],m=j[(d>>8)+1],Q=j[(d>>8)+2],v=j[d&255],J=j[(d&255)+1],q=j[(d&255)+2],p=Z(a,m,Q),b=Z(v,J,q);
if(p<b){var f=p;p=b;b=f}var Q=N((p&31)*(255/31)),m=N((p>>>5&63)*(255/63)),a=N((p>>11)*(255/31)),q=N((b&31)*(255/31)),J=N((b>>>5&63)*(255/63)),v=N((b>>11)*(255/31));
i[P+0]=p&255;i[P+1]=p>>8;i[P+2]=b&255;i[P+3]=b>>8;var $=2/3,l=1-$,A=N($*a+l*v),W=N($*m+l*J),C=N($*Q+l*q);
$=1/3;l=1-$;var E=N($*a+l*v),ae=N($*m+l*J),o=N($*Q+l*q),G=P*8+32;for(var O=0;O<64;O+=4){var s=j[O],L=j[O+1],ah=j[O+2],ak=R(s,L,ah,a,m,Q),a4=R(s,L,ah,v,J,q),e=R(s,L,ah,A,W,C),t=R(s,L,ah,E,ae,o),a0=Math.min(ak,Math.min(a4,Math.min(e,t))),V=0;
if(a0==a4)V=1;else if(a0==e)V=2;else if(a0==t)V=3;i[G>>3]|=V<<(G&7);G+=2}}function w(i,P,j,R){var d=R+4<<3;
for(var a=0;a<64;a+=4){var m=i[d>>3]>>(d&7)&3;d+=2;m=m<<2;P[a]=j[m];P[a+1]=j[m+1];P[a+2]=j[m+2];P[a+3]=j[m+3]}}function K(i,P,j,R,d,a){for(var m=0;
m<4;m++){var Q=(d+m)*P+R<<2,v=m<<4;a[v+0]=i[Q+0];a[v+1]=i[Q+1];a[v+2]=i[Q+2];a[v+3]=i[Q+3];a[v+4]=i[Q+4];
a[v+5]=i[Q+5];a[v+6]=i[Q+6];a[v+7]=i[Q+7];a[v+8]=i[Q+8];a[v+9]=i[Q+9];a[v+10]=i[Q+10];a[v+11]=i[Q+11];
a[v+12]=i[Q+12];a[v+13]=i[Q+13];a[v+14]=i[Q+14];a[v+15]=i[Q+15]}}function k(i,P,j,R,d,a){for(var m=0;
m<4;m++){var Q=(d+m)*P+R<<2,v=m<<4;i[Q+0]=a[v+0];i[Q+1]=a[v+1];i[Q+2]=a[v+2];i[Q+3]=a[v+3];i[Q+4]=a[v+4];
i[Q+5]=a[v+5];i[Q+6]=a[v+6];i[Q+7]=a[v+7];i[Q+8]=a[v+8];i[Q+9]=a[v+9];i[Q+10]=a[v+10];i[Q+11]=a[v+11];
i[Q+12]=a[v+12];i[Q+13]=a[v+13];i[Q+14]=a[v+14];i[Q+15]=a[v+15]}}var h="0011001100110011 0001000100010001 0111011101110111 0001001100110111 0000000100010011 0011011101111111 0001001101111111 0000000100110111 0000000000010011 0011011111111111 0000000101111111 0000000000010111 0001011111111111 0000000011111111 0000111111111111 0000000000001111 0000100011101111 0111000100000000 0000000010001110 0111001100010000 0011000100000000 0000100011001110 0000000010001100 0111001100110001 0011000100010000 0000100010001100 0110011001100110 0011011001101100 0001011111101000 0000111111110000 0111000110001110 0011100110011100 0101010101010101 0000111100001111 0101101001011010 0011001111001100 0011110000111100 0101010110101010 0110100101101001 0101101010100101 0111001111001110 0001001111001000 0011001001001100 0011101111011100 0110100110010110 0011110011000011 0110011010011001 0000011001100000 0100111001000000 0010011100100000 0000001001110010 0000010011100100 0110110010010011 0011011011001001 0110001110011100 0011100111000110 0110110011001001 0110001100111001 0111111010000001 0001100011100111 0000111100110011 0011001111110000 0010001011101110 0100010001110111".split(" "),af="0011001102212222 0001001122112221 0000200122112211 0222002200110111 0000000011221122 0011001100220022 0022002211111111 0011001122112211 0000000011112222 0000111111112222 0000111122222222 0012001200120012 0112011201120112 0122012201220122 0011011211221222 0011200122002220 0001001101121122 0111001120012200 0000112211221122 0022002200221111 0111011102220222 0001000122212221 0000001101220122 0000110022102210 0122012200110000 0012001211222222 0110122112210110 0000011012211221 0022110211020022 0110011020022222 0011012201220011 0000200022112221 0000000211221222 0222002200120011 0011001200220222 0120012001200120 0000111122220000 0120120120120120 0120201212010120 0011220011220011 0011112222000011 0101010122222222 0000000021212121 0022112200221122 0022001100220011 0220122102201221 0101222222220101 0000212121212121 0101010101012222 0222011102220111 0002111200021112 0000211221122112 0222011101110222 0002111211120002 0110011001102222 0000000021122112 0110011022222222 0022001100110022 0022112211220022 0000000000002112 0002000100020001 0222122202221222 0101222222222222 0111201122012220".split(" "),S=[[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,2,0],[0,8,0],[0,2,0],[0,2,0],[0,8,0],[0,8,0],[0,15,0],[0,2,0],[0,8,0],[0,2,0],[0,2,0],[0,8,0],[0,8,0],[0,2,0],[0,2,0],[0,15,0],[0,15,0],[0,6,0],[0,8,0],[0,2,0],[0,8,0],[0,15,0],[0,15,0],[0,2,0],[0,8,0],[0,2,0],[0,2,0],[0,2,0],[0,15,0],[0,15,0],[0,6,0],[0,6,0],[0,2,0],[0,6,0],[0,8,0],[0,15,0],[0,15,0],[0,2,0],[0,2,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,2,0],[0,2,0],[0,15,0]],ap=[[0,3,15],[0,3,8],[0,15,8],[0,15,3],[0,8,15],[0,3,15],[0,15,3],[0,15,8],[0,8,15],[0,8,15],[0,6,15],[0,6,15],[0,6,15],[0,5,15],[0,3,15],[0,3,8],[0,3,15],[0,3,8],[0,8,15],[0,15,3],[0,3,15],[0,3,8],[0,6,15],[0,10,8],[0,5,3],[0,8,15],[0,8,6],[0,6,10],[0,8,15],[0,5,15],[0,15,10],[0,15,8],[0,8,15],[0,15,3],[0,3,15],[0,5,10],[0,6,10],[0,10,8],[0,8,9],[0,15,10],[0,15,6],[0,3,15],[0,15,8],[0,5,15],[0,15,3],[0,15,6],[0,15,6],[0,15,8],[0,3,15],[0,15,3],[0,5,15],[0,5,15],[0,5,15],[0,8,15],[0,5,15],[0,10,15],[0,5,15],[0,10,15],[0,8,15],[0,13,15],[0,15,3],[0,12,15],[0,3,15],[0,3,8]];
function a2(i,P,j,R,d){var a=n,m={s:0},Q=new Uint8Array(4*4*4),v=[null,null,[0,21,43,64],[0,9,18,27,37,46,55,64],[0,4,9,13,17,21,26,30,34,38,43,47,51,55,60,64]],J=[null,null,h,af],q=[null,null,S,ap];
for(var p=0;p<d;p+=4)for(var b=0;b<R;b+=4){var f=0,a0="0000000000000000";while((i[P]>>f&1)!=1)f++;m.s=(P<<3)+f+1;
var $=f==4||f==5?a(i,m,2):0,l=f==4?a(i,m,1):0,A=[4,6,6,6,0,0,0,6][f],W=a(i,m,A),C=[4,6,5,7,5,7,7,5][f],E=[0,0,0,0,6,8,7,5][f],ae=[1,1,0,1,0,0,1,1][f],o=[6,4,6,4,2,2,2,4][f],G=[];
for(var O=0;O<4;O++){var s=O==3?E:C;for(var L=0;L<o;L++)G[O*o+L]=a(i,m,s)}for(var L=0;L<o;L++){if(f==1&&(L&1)==1)m.s--;
var ah=a(i,m,ae);for(var O=0;O<3;O++)G[O*o+L]=G[O*o+L]<<ae|ah;if(E!=0)G[3*o+L]=G[3*o+L]<<ae|ah}C+=ae;
if(E!=0)E+=ae;for(var O=0;O<4;O++){var s=O==3?E:C,ak=s==0?0:1/((1<<s)-1);for(var L=0;L<o;L++)G[O*o+L]*=ak}if(E==0)for(var L=0;
L<o;L++)G[3*o+L]=1;var a4=[3,2,3,2,1,1,1,2][f],e=[3,3,2,2,2,2,4,2][f],t=[0,0,0,0,3,2,0,0][f],V=[0,0,0];
if(a4!=1){a0=J[a4][W];V=q[a4][W]}var ao=m.s,ag=ao+16*e-a4;if(l==1){var ai=ao;ao=ag;ag=ai;ai=e;e=t;t=ai}var a3=v[e];
m.s=ao;for(var O=0;O<64;O+=4){var u=a0.charCodeAt(O>>2)-48,a8=V[u]==O>>2?1:0,aj=a(i,m,e-a8),B=a3[aj]/64,a7=(1-B)*G[0*o+2*u+0]+B*G[0*o+2*u+1],am=(1-B)*G[1*o+2*u+0]+B*G[1*o+2*u+1],ad=(1-B)*G[2*o+2*u+0]+B*G[2*o+2*u+1],ab=(1-B)*G[3*o+2*u+0]+B*G[3*o+2*u+1];
Q[O]=a7*255;Q[O+1]=am*255;Q[O+2]=ad*255;Q[O+3]=ab*255}a3=v[t];m.s=ag;if(t!=0)for(var O=0;O<64;O+=4){var u=a0.charCodeAt(O>>2)-48,a8=V[u]==O>>2?1:0,aj=a(i,m,t-a8),B=a3[aj]/64,ab=(1-B)*G[3*o+2*u+0]+B*G[3*o+2*u+1];
Q[O+3]=ab*255}T(Q,$);k(j,R,d,b,p,Q);P+=16}return P}function T(i,P){if(P==0)return;for(var j=0;j<64;j+=4){var R=i[j],d=i[j+1],a=i[j+2],m=i[j+3];
if(P==1){var Q=m;m=R;R=Q}if(P==2){var Q=m;m=d;d=Q}if(P==3){var Q=m;m=a;a=Q}i[j]=R;i[j+1]=d;i[j+2]=a;
i[j+3]=m}}function n(i,P,j){var R=0,d=j;while(j!=0){R=R|I(i,P)<<d-j;j--}return R}function I(i,P){var j=P.s;
P.s++;return i[j>>3]>>(j&7)&1}function an(i,P,j){var R=P>>1,d=j>>1,a=new Uint8Array(R*d*4);for(var m=0;
m<d;m++)for(var Q=0;Q<R;Q++){var v=m*R+Q<<2,J=(m<<1)*P+(Q<<1)<<2,q=i[J+3],p=i[J+7],b=i[J]*q+i[J+4]*p,f=i[J+1]*q+i[J+5]*p,$=i[J+2]*q+i[J+6]*p;
J+=P<<2;var l=i[J+3],A=i[J+7];b+=i[J]*l+i[J+4]*A;f+=i[J+1]*l+i[J+5]*A;$+=i[J+2]*l+i[J+6]*A;var W=q+p+l+A+2>>2,G=W==0?0:.25/W;
a[v]=~~(b*G+.5);a[v+1]=~~(f*G+.5);a[v+2]=~~($*G+.5);a[v+3]=W}return a}function ac(i,P,j,R,d,a){return(i-R)*(i-R)+(P-d)*(P-d)+(j-a)*(j-a)}function aa(i){var P=ac,j=0,R=0;
for(var d=0;d<64;d+=4){var a=i[d],m=i[d+1],Q=i[d+2];for(var v=d+4;v<64;v+=4){var J=P(a,m,Q,i[v],i[v+1],i[v+2]);
if(J>R){R=J;j=d<<8|v}}}return j}var a1=new ArrayBuffer(4),z=new Uint8Array(a1),a5=new Uint32Array(a1),a9=new Uint16Array(a1),al={b:function(i,P){z[0]=i[P+0];
z[1]=i[P+1];return a9[0]},G:function(i,P){z[0]=i[P+0];z[1]=i[P+1];z[2]=i[P+2];z[3]=i[P+3];return a5[0]},W:function(i,P,j){a5[0]=j;
i[P+0]=z[0];i[P+1]=z[1];i[P+2]=z[2];i[P+3]=z[3]},C:function(i,P,j){var R="";for(var d=0;d<j;d++)R+=String.fromCharCode(i[P+d]);
return R},X:function(i,P,j){for(var R=0;R<j.length;R++)i[P+R]=j.charCodeAt(R)}};return{S:aq,$:M,R:D,c:r,L:a2,A:x,g:a6,n:H,H:g,f:an,e:al}}();
UTEX.DDS=function(){var x={J:1,O:2,B:4,D:8,K:4096,d:131072,_:524288,q:8388608,p:1,u:2,I:4,Z:64,i:512,N:131072,P:8,V:4194304,h:4096};
function a6(D){var g=new Uint8Array(D),F=0,c=UTEX.e.C(g,F,4),y,N,Z;F+=4;y=H(g,F);F+=124;N=y.v;if(N.w&x.I&&N.M=="DX10"){Z=r(g,F);
F+=20}var _=y.width,w=y.height,K=[],k=N.M,h=N.a,af={DXT1:"BC1",DXT3:"BC2",DXT5:"BC3",DX10:"BC7",ATI2:"BC5"};
if(af[k])k=af[k];if(Z){var S=Z.l;if(70<=S&&S<=72)k="BC1";else if(73<=S&&S<=75)k="BC2";else if(76<=S&&S<=78)k="BC3";
else if(97<=S&&S<=99)k="BC7";else console.log("Unknown DX10 format",S)}var a2=Math.max(1,y.t);for(var T=0;
T<a2;T++){var n=_*w*4,I=new Uint8Array(n);if(!1){}else if(k=="BC1")F=UTEX.S(g,F,I,_,w);else if(k=="BC2")F=UTEX.$(g,F,I,_,w);
else if(k=="BC3")F=UTEX.R(g,F,I,_,w);else if(k=="BC5")F=UTEX.c(g,F,I,_,w);else if(k=="BC7")F=UTEX.L(g,F,I,_,w);
else if(k=="ATC ")F=UTEX.A(g,F,I,_,w);else if(k=="ATCA")F=UTEX.g(g,F,I,_,w);else if(k=="ATCI")F=UTEX.g(g,F,I,_,w);
else if(N.w&x.p&&N.w&x.Z){var an=N.T,aa=255/an,a1=N.o,z=255/a1,a9=N.m,al=255/a9,i=N.k,P=255/i;if(h==32){for(var j=0;
j<n;j+=4){var R=g[F+j+3]<<24|g[F+j+2]<<16|g[F+j+1]<<8|g[F+j];I[j+0]=(R&an)*aa;I[j+1]=(R&a1)*z;I[j+2]=(R&a9)*al;
I[j+3]=(R&i)*P}F+=n}else if(h==16){for(var j=0;j<n;j+=4){var R=g[F+(j>>1)+1]<<8|g[F+(j>>1)];I[j+0]=(R&an)*aa;
I[j+1]=(R&a1)*z;I[j+2]=(R&a9)*al;I[j+3]=(R&i)*P}F+=n>>>1}else throw"unknown bit count "+h}else if(N.w&x.u||N.w&x.p||N.w&x.N){if(h==8){if(N.w&x.u){for(var j=0;
j<n;j+=4)I[j+3]=g[F+(j>>2)]}else{I.fill(255);for(var j=0;j<n;j+=4)I[j]=I[j+1]=I[j+2]=g[F+(j>>2)]}F+=n>>>2}else throw"unknown bit count "+h}else{console.log("unknown texture format, head flags: ",y.w.toString(2),"pixelFormat flags: ",N.w.toString(2));
throw"e"}K.push({width:_,height:w,image:I.buffer});_=_>>>1;w=w>>>1}return K}function aq(D,g,F,c){if(c==null)c=[!0,!0];
var D=new Uint8Array(D),y=255,k=0,h=0;for(var N=3;N<D.length;N+=4)y&=D[N];var Z=y<250,_=c[0],w=c[1],K=new Uint8Array(124+g*F*6);
UTEX.e.X(K,k,"DDS ");k+=4;M(K,g,F,Z,_,w,k);k+=124;while(g*F!=0){if(w){if(Z)k=UTEX.H(D,g,F,K,k);else k=UTEX.n(D,g,F,K,k)}else{K.set(D,k);
k+=D.length}D=UTEX.f(D,g,F);g=g>>1;F=F>>1;h++;if(!_)break}K[28]=h;return K.buffer.slice(0,k)}function H(D,g){var F={},c=UTEX.e.G;
g+=4;F.w=c(D,g);g+=4;F.height=c(D,g);g+=4;F.width=c(D,g);g+=4;F.pitch=c(D,g);g+=4;F.depth=c(D,g);g+=4;
F.t=c(D,g);g+=4;g+=11*4;F.v=X(D,g);g+=32;F.Q=c(D,g);g+=4;F.r=c(D,g);g+=4;F.a0=c(D,g);g+=4;F.a8=c(D,g);
g+=4;g+=4;return F}function M(D,g,F,c,y,N,Z){var _=UTEX.e.W,w=x.J|x.O|x.B|x.K;w|=x.d|(N?x._:x.D);var K=(y?x.V:0)|x.h|(y?x.P:0),k=(g*F>>>1)*(c?2:1),h=c?1:0;
if(!N)k=g*F*4;_(D,Z,124);Z+=4;_(D,Z,w);Z+=4;_(D,Z,F);Z+=4;_(D,Z,g);Z+=4;_(D,Z,k);Z+=4;_(D,Z,h);Z+=4;
_(D,Z,10);Z+=4;Z+=11*4;Y(D,c,N,Z);Z+=32;_(D,Z,K);Z+=4;Z+=4*4}function X(D,g){var F={},c=UTEX.e.G;g+=4;
F.w=c(D,g);g+=4;F.M=UTEX.e.C(D,g,4);g+=4;F.a=c(D,g);g+=4;F.T=c(D,g);g+=4;F.o=c(D,g);g+=4;F.m=c(D,g);
g+=4;F.k=c(D,g);g+=4;return F}function Y(D,g,F,c){var y=UTEX.e.W,N=F?x.I:x.p|x.Z;y(D,c,32);c+=4;y(D,c,N);
c+=4;UTEX.e.X(D,c,F?g?"DXT5":"DXT1":"    ");c+=4;if(!F){y(D,c,32);for(var Z=0;Z<4;Z++)y(D,c+4+Z*4,255<<Z*8)}c+=5*4}function r(D,g){var F={},c=UTEX.e.G;
F.l=c(D,g);g+=4;F.a3=c(D,g);g+=4;F.a2=c(D,g);g+=4;F.a5=c(D,g);g+=4;F.a1=c(D,g);g+=4;return F}return{encode:aq,decode:a6}}();
UTEX.VTF=function(){var x={};function a6(H){var M=new Uint8Array(H),X=0,Y={};X=aq(M,X,Y);var r=Y.z,D=Y.Y;
if(r*D!=0){var g=new Uint8Array(r*D*4);X=UTEX.S(M,X,g,r,D)}var F=Y.j,c=Y.F,y=[];for(var N=0;N<c;N++){var Z=Y.width>>>c-1-N,_=Y.height>>>c-1-N;
for(var w=0;w<Y.frames;w++){var g=new Uint8Array(Z*_*4);if(F==0||F==12){var K=X,k=F==0?[0,1,2,3]:[2,1,0,3],h=k[0],af=k[1],S=k[2],a2=k[3];
for(var T=0;T<g.length;T+=4){g[T+h]=M[K++];g[T+af]=M[K++];g[T+S]=M[K++];g[T+a2]=M[K++]}X+=Z*_*4}else if(F==2){for(var T=0;
T<g.length;T+=4){g[T]=M[X++];g[T+1]=M[X++];g[T+2]=M[X++];g[T+3]=255}}else if(F==13)X=UTEX.S(M,X,g,Z,_);
else if(F==14)X=UTEX.$(M,X,g,Z,_);else if(F==15)X=UTEX.R(M,X,g,Z,_);else throw F;y.push({width:Z,height:_,image:g.buffer})}}return y}function aq(H,M,X){var Y=UTEX.e.G,r=UTEX.e.b,D=UTEX.e.C(H,M,4);
M+=4;var g=Y(H,M);M+=4;var F=Y(H,M);M+=4;var c=Y(H,M);M+=4;X.width=r(H,M);M+=2;X.height=r(H,M);M+=2;
X.w=Y(H,M);M+=4;X.frames=r(H,M);M+=2;X.a6=r(H,M);M+=2;M+=4;M+=12;M+=4;M+=4;X.j=Y(H,M);M+=4;X.F=H[M++];
X.a4=Y(H,M);M+=4;X.z=H[M++];X.Y=H[M++];if(F>=2){X.depth=r(H,M);M+=2;if(F>=3){M+=3;X.a7=Y(H,M);M+=4}}return c}return{decode:a6}}();

(function(){var X={};if(typeof module=="object"){module.exports=X}else{self.UTIF=X}var aG=typeof require==="function"?require("pako"):self.pako;
function aH(){if(typeof process=="undefined"||process.env.NODE_ENV=="development")console.log.apply(console,arguments)}(function(X,aG){(function(){"use strict";
var m=function h(){function m(A){this.message="JPEG error: "+A}m.prototype=new Error;m.prototype.name="JpegError";
m.constructor=m;return m}(),B=function C(){var A=new Uint8Array([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63]),d=4017,S=799,y=3406,z=2276,j=1567,U=3784,x=5793,L=2896;
function B(q){if(q==null)q={};if(q.w==null)q.w=-1;this.V=q.n;this.N=q.w}function r(q,n){var G=0,b=[],c,g,H=16,$;
while(H>0&&!q[H-1]){H--}b.push({children:[],index:0});var e=b[0];for(c=0;c<H;c++){for(g=0;g<q[c];g++){e=b.pop();
e.children[e.index]=n[G];while(e.index>0){e=b.pop()}e.index++;b.push(e);while(b.length<=c){b.push($={children:[],index:0});
e.children[e.index]=$.children;e=$}G++}if(c+1<H){b.push($={children:[],index:0});e.children[e.index]=$.children;
e=$}}return b[0].children}function K(q,n,G){return 64*((q.P+1)*n+G)}function M(q,n,G,b,c,g,H,$,e,_){if(_==null)_=!1;
var l=G.m,I=G.Z,O=n,F=0,N=0,J=0,Y=0,V,p=0,s,k,T,D,aF,as,b1=0,aP,aA,aS,aT;function v(){if(N>0){N--;return F>>N&1}F=q[n++];
if(F===255){var au=q[n++];if(au){if(au===220&&_){n+=2;var aa=u(q,n);n+=2;if(aa>0&&aa!==G.s){throw new DNLMarkerError("Found DNL marker (0xFFDC) while parsing scan data",aa)}}else if(au===217){if(_){var aW=p*8;
if(aW>0&&aW<G.s/10){throw new DNLMarkerError("Found EOI marker (0xFFD9) while parsing scan data, "+"possibly caused by incorrect `scanLines` parameter",aW)}}throw new EOIMarkerError("Found EOI marker (0xFFD9) while parsing scan data")}throw new m("unexpected marker")}}N=7;
return F>>>7}function a6(au){var aa=au;while(!0){aa=aa[v()];switch(typeof aa){case"number":return aa;
case"object":continue}throw new m("invalid huffman sequence")}}function ag(au){var aF=0;while(au>0){aF=aF<<1|v();
au--}return aF}function a$(au){if(au===1){return v()===1?1:-1}var aF=ag(au);if(aF>=1<<au-1){return aF}return aF+(-1<<au)+1}function aZ(s,au){var aa=a6(s.J),aW=aa===0?0:a$(aa),D=1;
s.D[au]=s.Q+=aW;while(D<64){var b7=a6(s.i),b0=b7&15,aV=b7>>4;if(b0===0){if(aV<15){break}D+=16;continue}D+=aV;
var a1=A[D];s.D[au+a1]=a$(b0);D++}}function ad(s,au){var aa=a6(s.J),aW=aa===0?0:a$(aa)<<e;s.D[au]=s.Q+=aW}function ah(s,au){s.D[au]|=v()<<e}function b8(s,au){if(J>0){J--;
return}var D=g,aa=H;while(D<=aa){var aW=a6(s.i),b7=aW&15,b0=aW>>4;if(b7===0){if(b0<15){J=ag(b0)+(1<<b0)-1;
break}D+=16;continue}D+=b0;var aV=A[D];s.D[au+aV]=a$(b7)*(1<<e);D++}}function b6(s,au){var D=g,aa=H,aW=0,b7,b0;
while(D<=aa){var aV=au+A[D],a1=s.D[aV]<0?-1:1;switch(Y){case 0:b0=a6(s.i);b7=b0&15;aW=b0>>4;if(b7===0){if(aW<15){J=ag(aW)+(1<<aW);
Y=4}else{aW=16;Y=1}}else{if(b7!==1){throw new m("invalid ACn encoding")}V=a$(b7);Y=aW?2:3}continue;case 1:case 2:if(s.D[aV]){s.D[aV]+=a1*(v()<<e)}else{aW--;
if(aW===0){Y=Y===2?3:0}}break;case 3:if(s.D[aV]){s.D[aV]+=a1*(v()<<e)}else{s.D[aV]=V<<e;Y=0}break;case 4:if(s.D[aV]){s.D[aV]+=a1*(v()<<e)}break}D++}if(Y===4){J--;
if(J===0){Y=0}}}function a9(s,au,b1,aa,aW){var b7=b1/l|0,b0=b1%l;p=b7*s.A+aa;var aV=b0*s.h+aW,a1=K(s,p,aV);
au(s,a1)}function aB(s,au,b1){p=b1/s.P|0;var aa=b1%s.P,aW=K(s,p,aa);au(s,aW)}var at=b.length;if(I){if(g===0){as=$===0?ad:ah}else{as=$===0?b8:b6}}else{as=aZ}if(at===1){aA=b[0].P*b[0].c}else{aA=l*G.R}while(b1<=aA){var ac=c?Math.min(aA-b1,c):aA;
if(ac>0){for(k=0;k<at;k++){b[k].Q=0}J=0;if(at===1){s=b[0];for(aF=0;aF<ac;aF++){aB(s,as,b1);b1++}}else{for(aF=0;
aF<ac;aF++){for(k=0;k<at;k++){s=b[k];aS=s.h;aT=s.A;for(T=0;T<aT;T++){for(D=0;D<aS;D++){a9(s,as,b1,T,D)}}}b1++}}}N=0;
aP=o(q,n);if(!aP){break}if(aP.u){var ai=ac>0?"unexpected":"excessive";n=aP.offset}if(aP.M>=65488&&aP.M<=65495){n+=2}else{break}}return n-O}function E(q,n,G){var b=q.$,c=q.D,g,H,$,e,_,l,I,O,F,N,J,Y,V,p,s,aL,k;
if(!b){throw new m("missing required Quantization Table.")}for(var T=0;T<64;T+=8){F=c[n+T];N=c[n+T+1];
J=c[n+T+2];Y=c[n+T+3];V=c[n+T+4];p=c[n+T+5];s=c[n+T+6];aL=c[n+T+7];F*=b[T];if((N|J|Y|V|p|s|aL)===0){k=x*F+512>>10;
G[T]=k;G[T+1]=k;G[T+2]=k;G[T+3]=k;G[T+4]=k;G[T+5]=k;G[T+6]=k;G[T+7]=k;continue}N*=b[T+1];J*=b[T+2];Y*=b[T+3];
V*=b[T+4];p*=b[T+5];s*=b[T+6];aL*=b[T+7];g=x*F+128>>8;H=x*V+128>>8;$=J;e=s;_=L*(N-aL)+128>>8;O=L*(N+aL)+128>>8;
l=Y<<4;I=p<<4;g=g+H+1>>1;H=g-H;k=$*U+e*j+128>>8;$=$*j-e*U+128>>8;e=k;_=_+I+1>>1;I=_-I;O=O+l+1>>1;l=O-l;
g=g+e+1>>1;e=g-e;H=H+$+1>>1;$=H-$;k=_*z+O*y+2048>>12;_=_*y-O*z+2048>>12;O=k;k=l*S+I*d+2048>>12;l=l*d-I*S+2048>>12;
I=k;G[T]=g+O;G[T+7]=g-O;G[T+1]=H+I;G[T+6]=H-I;G[T+2]=$+l;G[T+5]=$-l;G[T+3]=e+_;G[T+4]=e-_}for(var D=0;
D<8;++D){F=G[D];N=G[D+8];J=G[D+16];Y=G[D+24];V=G[D+32];p=G[D+40];s=G[D+48];aL=G[D+56];if((N|J|Y|V|p|s|aL)===0){k=x*F+8192>>14;
if(k<-2040){k=0}else if(k>=2024){k=255}else{k=k+2056>>4}c[n+D]=k;c[n+D+8]=k;c[n+D+16]=k;c[n+D+24]=k;
c[n+D+32]=k;c[n+D+40]=k;c[n+D+48]=k;c[n+D+56]=k;continue}g=x*F+2048>>12;H=x*V+2048>>12;$=J;e=s;_=L*(N-aL)+2048>>12;
O=L*(N+aL)+2048>>12;l=Y;I=p;g=(g+H+1>>1)+4112;H=g-H;k=$*U+e*j+2048>>12;$=$*j-e*U+2048>>12;e=k;_=_+I+1>>1;
I=_-I;O=O+l+1>>1;l=O-l;g=g+e+1>>1;e=g-e;H=H+$+1>>1;$=H-$;k=_*z+O*y+2048>>12;_=_*y-O*z+2048>>12;O=k;k=l*S+I*d+2048>>12;
l=l*d-I*S+2048>>12;I=k;F=g+O;aL=g-O;N=H+I;s=H-I;J=$+l;p=$-l;Y=e+_;V=e-_;if(F<16){F=0}else if(F>=4080){F=255}else{F>>=4}if(N<16){N=0}else if(N>=4080){N=255}else{N>>=4}if(J<16){J=0}else if(J>=4080){J=255}else{J>>=4}if(Y<16){Y=0}else if(Y>=4080){Y=255}else{Y>>=4}if(V<16){V=0}else if(V>=4080){V=255}else{V>>=4}if(p<16){p=0}else if(p>=4080){p=255}else{p>>=4}if(s<16){s=0}else if(s>=4080){s=255}else{s>>=4}if(aL<16){aL=0}else if(aL>=4080){aL=255}else{aL>>=4}c[n+D]=F;
c[n+D+8]=N;c[n+D+16]=J;c[n+D+24]=Y;c[n+D+32]=V;c[n+D+40]=p;c[n+D+48]=s;c[n+D+56]=aL}}function a(q,n){var G=n.P,b=n.c,c=new Int16Array(64);
for(var g=0;g<b;g++){for(var H=0;H<G;H++){var $=K(n,g,H);E(n,$,c)}}return n.D}function o(q,n,G){if(G==null)G=n;
var b=q.length-1,c=G<n?G:n;if(n>=b){return null}var g=u(q,n);if(g>=65472&&g<=65534){return{u:null,M:g,offset:n}}var H=u(q,c);
while(!(H>=65472&&H<=65534)){if(++c>=b){return null}H=u(q,c)}return{u:g.toString(16),M:H,offset:c}}B.prototype={parse(q,n){if(n==null)n={};
var G=n.F,b=0,c=null,g=null,H,$,e=0;function _(){var aV=u(q,b);b+=2;var a1=b+aV-2,N=o(q,a1,b);if(N&&N.u){a1=N.offset}var aY=q.subarray(b,a1);
b+=aY.length;return aY}function l(H){var aV=Math.ceil(H.o/8/H.X),a1=Math.ceil(H.s/8/H.B);for(var J=0;
J<H.W.length;J++){b8=H.W[J];var aY=Math.ceil(Math.ceil(H.o/8)*b8.h/H.X),aw=Math.ceil(Math.ceil(H.s/8)*b8.A/H.B),a_=aV*b8.h,aQ=a1*b8.A,az=64*aQ*(a_+1);
b8.D=new Int16Array(az);b8.P=aY;b8.c=aw}H.m=aV;H.R=a1}var I=[],O=[],F=[],N=u(q,b);b+=2;if(N!==65496){throw new m("SOI not found")}N=u(q,b);
b+=2;markerLoop:while(N!==65497){var J,Y,V;switch(N){case 65504:case 65505:case 65506:case 65507:case 65508:case 65509:case 65510:case 65511:case 65512:case 65513:case 65514:case 65515:case 65516:case 65517:case 65518:case 65519:case 65534:var p=_();
if(N===65504){if(p[0]===74&&p[1]===70&&p[2]===73&&p[3]===70&&p[4]===0){c={version:{d:p[5],T:p[6]},K:p[7],j:p[8]<<8|p[9],H:p[10]<<8|p[11],S:p[12],I:p[13],C:p.subarray(14,14+3*p[12]*p[13])}}}if(N===65518){if(p[0]===65&&p[1]===100&&p[2]===111&&p[3]===98&&p[4]===101){g={version:p[5]<<8|p[6],k:p[7]<<8|p[8],q:p[9]<<8|p[10],a:p[11]}}}break;
case 65499:var s=u(q,b),aL;b+=2;var k=s+b-2;while(b<k){var T=q[b++],D=new Uint16Array(64);if(T>>4===0){for(Y=0;
Y<64;Y++){aL=A[Y];D[aL]=q[b++]}}else if(T>>4===1){for(Y=0;Y<64;Y++){aL=A[Y];D[aL]=u(q,b);b+=2}}else{throw new m("DQT - invalid table spec")}I[T&15]=D}break;
case 65472:case 65473:case 65474:if(H){throw new m("Only single frame JPEGs supported")}b+=2;H={};H.G=N===65473;
H.Z=N===65474;H.precision=q[b++];var aF=u(q,b),as,b1=0,aP=0;b+=2;H.s=G||aF;H.o=u(q,b);b+=2;H.W=[];H._={};
var aA=q[b++];for(J=0;J<aA;J++){as=q[b];var aS=q[b+1]>>4,aT=q[b+1]&15;if(b1<aS){b1=aS}if(aP<aT){aP=aT}var v=q[b+2];
V=H.W.push({h:aS,A:aT,L:v,$:null});H._[as]=V-1;b+=3}H.X=b1;H.B=aP;l(H);break;case 65476:var a6=u(q,b);
b+=2;for(J=2;J<a6;){var ag=q[b++],a$=new Uint8Array(16),aZ=0;for(Y=0;Y<16;Y++,b++){aZ+=a$[Y]=q[b]}var ad=new Uint8Array(aZ);
for(Y=0;Y<aZ;Y++,b++){ad[Y]=q[b]}J+=17+aZ;(ag>>4===0?F:O)[ag&15]=r(a$,ad)}break;case 65501:b+=2;$=u(q,b);
b+=2;break;case 65498:var ah=++e===1&&!G,b8;b+=2;var b6=q[b++],a9=[];for(J=0;J<b6;J++){var aB=q[b++],at=H._[aB];
b8=H.W[at];b8.index=aB;var ac=q[b++];b8.J=F[ac>>4];b8.i=O[ac&15];a9.push(b8)}var ai=q[b++],au=q[b++],aa=q[b++];
try{var aW=M(q,b,H,a9,$,ai,au,aa>>4,aa&15,ah);b+=aW}catch(ex){if(ex instanceof DNLMarkerError){return this.parse(q,{F:ex.s})}else if(ex instanceof EOIMarkerError){break markerLoop}throw ex}break;
case 65500:b+=4;break;case 65535:if(q[b]!==255){b--}break;default:var b7=o(q,b-2,b-3);if(b7&&b7.u){b=b7.offset;
break}if(b>=q.length-1){break markerLoop}throw new m("JpegImage.parse - unknown marker: "+N.toString(16))}N=u(q,b);
b+=2}this.width=H.o;this.height=H.s;this.g=c;this.b=g;this.W=[];for(J=0;J<H.W.length;J++){b8=H.W[J];
var b0=I[b8.L];if(b0){b8.$=b0}this.W.push({index:b8.index,e:a(H,b8),l:b8.h/H.X,t:b8.A/H.B,P:b8.P,c:b8.c})}this.p=this.W.length;
return undefined},Y(q,n,G){if(G==null)G=!1;var b=this.width/q,c=this.height/n,g,H,$,e,_,l,I,O,F,N,J=0,Y,V=this.W.length,p=q*n*V,s=new Uint8ClampedArray(p),aL=new Uint32Array(q),k=4294967288,T;
for(I=0;I<V;I++){g=this.W[I];H=g.l*b;$=g.t*c;J=I;Y=g.e;e=g.P+1<<3;if(H!==T){for(_=0;_<q;_++){O=0|_*H;
aL[_]=(O&k)<<3|O&7}T=H}for(l=0;l<n;l++){O=0|l*$;N=e*(O&k)|(O&7)<<3;for(_=0;_<q;_++){s[J]=Y[N+aL[_]];
J+=V}}}var D=this.V;if(!G&&V===4&&!D){D=new Int32Array([-256,255,-256,255,-256,255,-256,255])}if(D){for(I=0;
I<p;){for(O=0,F=0;O<V;O++,I++,F+=2){s[I]=(s[I]*D[F]>>8)+D[F+1]}}}return s},get f(){if(this.b){return!!this.b.a}if(this.p===3){if(this.N===0){return!1}else if(this.W[0].index===82&&this.W[1].index===71&&this.W[2].index===66){return!1}return!0}if(this.N===1){return!0}return!1},z:function al(q){var n,G,b;
for(var c=0,g=q.length;c<g;c+=3){n=q[c];G=q[c+1];b=q[c+2];q[c]=n-179.456+1.402*b;q[c+1]=n+135.459-.344*G-.714*b;
q[c+2]=n-226.816+1.772*G}return q},O:function W(q){var n,G,b,c,g=0;for(var H=0,$=q.length;H<$;H+=4){n=q[H];
G=q[H+1];b=q[H+2];c=q[H+3];q[g++]=-122.67195406894+G*(-660635669420364e-19*G+.000437130475926232*b-54080610064599e-18*n+.00048449797120281*c-.154362151871126)+b*(-.000957964378445773*b+.000817076911346625*n-.00477271405408747*c+1.53380253221734)+n*(.000961250184130688*n-.00266257332283933*c+.48357088451265)+c*(-.000336197177618394*c+.484791561490776);
q[g++]=107.268039397724+G*(219927104525741e-19*G-.000640992018297945*b+.000659397001245577*n+.000426105652938837*c-.176491792462875)+b*(-.000778269941513683*b+.00130872261408275*n+.000770482631801132*c-.151051492775562)+n*(.00126935368114843*n-.00265090189010898*c+.25802910206845)+c*(-.000318913117588328*c-.213742400323665);
q[g++]=-20.810012546947+G*(-.000570115196973677*G-263409051004589e-19*b+.0020741088115012*n-.00288260236853442*c+.814272968359295)+b*(-153496057440975e-19*b-.000132689043961446*n+.000560833691242812*c-.195152027534049)+n*(.00174418132927582*n-.00255243321439347*c+.116935020465145)+c*(-.000343531996510555*c+.24165260232407)}return q.subarray(0,g)},r:function ab(q){var n,G,b;
for(var c=0,g=q.length;c<g;c+=4){n=q[c];G=q[c+1];b=q[c+2];q[c]=434.456-n-1.402*b;q[c+1]=119.541-n+.344*G+.714*b;
q[c+2]=481.816-n-1.772*G}return q},U:function R(q){var n,G,b,c,g=0;for(var H=0,$=q.length;H<$;H+=4){n=q[H];
G=q[H+1];b=q[H+2];c=q[H+3];q[g++]=255+n*(-6747147073602441e-20*n+.0008379262121013727*G+.0002894718188643294*b+.003264231057537806*c-1.1185611867203937)+G*(26374107616089404e-21*G-8626949158638572e-20*b-.0002748769067499491*c-.02155688794978967)+b*(-3878099212869363e-20*b-.0003267808279485286*c+.0686742238595345)-c*(.0003361971776183937*c+.7430659151342254);
q[g++]=255+n*(.00013596372813588848*n+.000924537132573585*G+.00010567359618683593*b+.0004791864687436512*c-.3109689587515875)+G*(-.00023545346108370344*G+.0002702845253534714*b+.0020200308977307156*c-.7488052167015494)+b*(6834815998235662e-20*b+.00015168452363460973*c-.09751927774728933)-c*(.0003189131175883281*c+.7364883807733168);
q[g++]=255+n*(13598650411385308e-21*n+.00012423956175490851*G+.0004751985097583589*b-36729317476630424e-22*c-.05562186980264034)+G*(.00016141380598724676*G+.0009692239130725186*b+.0007782692450036253*c-.44015232367526463)+b*(5.068882914068769e-7*b+.0017778369011375071*c-.7591454649749609)-c*(.0003435319965105553*c+.7063770186160144)}return q.subarray(0,g)},getData:function(q){var n=q.width,G=q.height,b=q.forceRGB,c=q.isSourcePDF;
if(this.p>4){throw new m("Unsupported color mode")}var g=this.Y(n,G,c);if(this.p===1&&b){var H=g.length,$=new Uint8ClampedArray(H*3),e=0;
for(var _=0;_<H;_++){var l=g[_];$[e++]=l;$[e++]=l;$[e++]=l}return $}else if(this.p===3&&this.f){return this.z(g)}else if(this.p===4){if(this.f){if(b){return this.O(g)}return this.r(g)}else if(b){return this.U(g)}}return g}};
return B}();function Z(A,d){return A[d]<<24>>24}function u(A,d){return A[d]<<8|A[d+1]}function i(A,d){return(A[d]<<24|A[d+1]<<16|A[d+2]<<8|A[d+3])>>>0}X.JpegDecoder=B}());
X.encodeImage=function(m,B,h,C){var u={t256:[B],t257:[h],t258:[8,8,8,8],t259:[1],t262:[2],t273:[1e3],t277:[4],t278:[h],t279:[B*h*4],t282:[[72,1]],t283:[[72,1]],t284:[1],t286:[[0,1]],t287:[[0,1]],t296:[1],t305:["Photopea (UTIF.js)"],t338:[1]};
if(C)for(var i in C)u[i]=C[i];var A=new Uint8Array(X.encode([u])),d=new Uint8Array(m),S=new Uint8Array(1e3+B*h*4);
for(var i=0;i<A.length;i++)S[i]=A[i];for(var i=0;i<d.length;i++)S[1e3+i]=d[i];return S.buffer};X.encode=function(m){var B=!1,h=new Uint8Array(2e4),C=4,Z=B?X._binLE:X._binBE,u=8;
h[0]=h[1]=B?73:77;Z.writeUshort(h,2,42);Z.writeUint(h,C,u);C+=4;for(var i=0;i<m.length;i++){var A=X._writeIFD(Z,X._types.basic,h,u,m[i]);
u=A[1];if(i<m.length-1){if((u&3)!=0)u+=4-(u&3);Z.writeUint(h,A[0],u)}}return h.slice(0,u).buffer};X.decode=function(m,B){if(B==null)B={parseMN:!0,debug:!1};
var h=new Uint8Array(m),C=0,Z=X._binBE.readASCII(h,C,2);C+=2;var u=Z=="II"?X._binLE:X._binBE,i=u.readUshort(h,C);
C+=2;var A=u.readUint(h,C);C+=4;var d=[];while(!0){var S=u.readUshort(h,A),y=u.readUshort(h,A+4);if(S!=0)if(y<1||13<y){aH("error in TIFF");
break}X._readIFD(u,h,A,d,0,B);A=u.readUint(h,A+2+S*12);if(A==0)break}return d};X.decodeImage=function(m,B,h){if(B.data)return;
var C=new Uint8Array(m),Z=X._binBE.readASCII(C,0,2),A,t=0;if(B.t256==null)return;B.isLE=Z=="II";B.width=B.t256[0];
B.height=B.t257[0];var u=B.t259?B.t259[0]:1,i=B.t266?B.t266[0]:1;if(B.t284&&B.t284[0]==2)aH("PlanarConfiguration 2 should not be used!");
if(B.t258)A=Math.min(32,B.t258[0])*B.t258.length;else A=B.t277?B.t277[0]:1;if(u==1&&B.t279!=null&&B.t278&&B.t262[0]==32803){A=Math.round(B.t279[0]*8/(B.width*B.t278[0]))}var d=Math.ceil(B.width*A/8)*8,S=B.t273;
if(S==null)S=B.t324;var y=B.t279;if(u==1&&S.length==1)y=[B.height*(d>>>3)];if(y==null)y=B.t325;var z=new Uint8Array(B.height*(d>>>3));
if(B.t322!=null){var j=B.t322[0],U=B.t323[0],x=Math.floor((B.width+j-1)/j),P=Math.floor((B.height+U-1)/U),L=new Uint8Array(Math.ceil(j*U*A/8)|0);
for(var r=0;r<P;r++)for(var K=0;K<x;K++){var a=r*x+K;for(var o=0;o<L.length;o++)L[o]=0;X.decode._decompress(B,h,C,S[a],y[a],u,L,0,i);
if(u==6)z=L;else X._copyTile(L,Math.ceil(j*A/8)|0,U,z,Math.ceil(B.width*A/8)|0,B.height,Math.ceil(K*j*A/8)|0,r*U)}t=z.length*8}else{var al=B.t278?B.t278[0]:B.height;
al=Math.min(al,B.height);for(var a=0;a<S.length;a++){X.decode._decompress(B,h,C,S[a],y[a],u,z,Math.ceil(t/8)|0,i);
t+=d*al}t=Math.min(t,z.length*8)}B.data=new Uint8Array(z.buffer,0,Math.ceil(t/8)|0)};X.decode._decompress=function(m,B,h,C,Z,u,i,A,d){if(!1){}else if(u==1)for(var S=0;
S<Z;S++)i[A+S]=h[C+S];else if(u==3)X.decode._decodeG3(h,C,Z,i,A,m.width,d,m.t292?(m.t292[0]&1)==1:!1);
else if(u==4)X.decode._decodeG4(h,C,Z,i,A,m.width,d);else if(u==5)X.decode._decodeLZW(h,C,Z,i,A,8);else if(u==6)X.decode._decodeOldJPEG(m,h,C,Z,i,A);
else if(u==7||u==34892)X.decode._decodeNewJPEG(m,h,C,Z,i,A);else if(u==8||u==32946){var y=new Uint8Array(h.buffer,C,Z),z=aG.inflate(y);
for(var t=0;t<z.length;t++)i[A+t]=z[t]}else if(u==9)X.decode._decodeVC5(h,C,Z,i,A);else if(u==32767)X.decode._decodeARW(m,h,C,Z,i,A);
else if(u==32773)X.decode._decodePackBits(h,C,Z,i,A);else if(u==32809)X.decode._decodeThunder(h,C,Z,i,A);
else if(u==34713)X.decode._decodeNikon(m,B,h,C,Z,i,A);else aH("Unknown compression",u);var j=m.t258?Math.min(32,m.t258[0]):1,U=m.t277?m.t277[0]:1,x=j*U>>>3,P=m.t278?m.t278[0]:m.height,L=Math.ceil(j*U*m.width/8);
if(j==16&&!m.isLE&&m.t33422==null)for(var r=0;r<P;r++){var K=A+r*L;for(var M=1;M<L;M+=2){var a=i[K+M];
i[K+M]=i[K+M-1];i[K+M-1]=a}}if(m.t317&&m.t317[0]==2){for(var r=0;r<P;r++){var o=A+r*L;if(j==16)for(var S=x;
S<L;S+=2){var al=(i[o+S+1]<<8|i[o+S])+(i[o+S-x+1]<<8|i[o+S-x]);i[o+S]=al&255;i[o+S+1]=al>>>8&255}else if(U==3)for(var S=3;
S<L;S+=3){i[o+S]=i[o+S]+i[o+S-3]&255;i[o+S+1]=i[o+S+1]+i[o+S-2]&255;i[o+S+2]=i[o+S+2]+i[o+S-1]&255}else for(var S=x;
S<L;S++)i[o+S]=i[o+S]+i[o+S-x]&255}}};X.decode._decodeVC5=X.decode._decodeVC5=function(){var m=[1,0,1,0,2,2,1,1,3,7,1,2,5,25,1,3,6,48,1,4,6,54,1,5,7,111,1,8,7,99,1,6,7,105,12,0,7,107,1,7,8,209,20,0,8,212,1,9,8,220,1,10,9,393,1,11,9,394,32,0,9,416,1,12,9,427,1,13,10,887,1,18,10,784,1,14,10,790,1,15,10,835,60,0,10,852,1,16,10,885,1,17,11,1571,1,19,11,1668,1,20,11,1669,100,0,11,1707,1,21,11,1772,1,22,12,3547,1,29,12,3164,1,24,12,3166,1,25,12,3140,1,23,12,3413,1,26,12,3537,1,27,12,3539,1,28,13,7093,1,35,13,6283,1,30,13,6331,1,31,13,6335,180,0,13,6824,1,32,13,7072,1,33,13,7077,320,0,13,7076,1,34,14,12565,1,36,14,12661,1,37,14,12669,1,38,14,13651,1,39,14,14184,1,40,15,28295,1,46,15,28371,1,47,15,25320,1,42,15,25336,1,43,15,25128,1,41,15,27300,1,44,15,28293,1,45,16,50259,1,48,16,50643,1,49,16,50675,1,50,16,56740,1,53,16,56584,1,51,16,56588,1,52,17,113483,1,61,17,113482,1,60,17,101285,1,55,17,101349,1,56,17,109205,1,57,17,109207,1,58,17,100516,1,54,17,113171,1,59,18,202568,1,62,18,202696,1,63,18,218408,1,64,18,218412,1,65,18,226340,1,66,18,226356,1,67,18,226358,1,68,19,402068,1,69,19,405138,1,70,19,405394,1,71,19,436818,1,72,19,436826,1,73,19,452714,1,75,19,452718,1,76,19,452682,1,74,20,804138,1,77,20,810279,1,78,20,810790,1,79,20,873638,1,80,20,873654,1,81,20,905366,1,82,20,905430,1,83,20,905438,1,84,21,1608278,1,85,21,1620557,1,86,21,1621582,1,87,21,1621583,1,88,21,1747310,1,89,21,1810734,1,90,21,1810735,1,91,21,1810863,1,92,21,1810879,1,93,22,3621725,1,99,22,3621757,1,100,22,3241112,1,94,22,3494556,1,95,22,3494557,1,96,22,3494622,1,97,22,3494623,1,98,23,6482227,1,102,23,6433117,1,101,23,6989117,1,103,23,6989119,1,105,23,6989118,1,104,23,7243449,1,106,23,7243512,1,107,24,13978233,1,111,24,12964453,1,109,24,12866232,1,108,24,14486897,1,113,24,13978232,1,110,24,14486896,1,112,24,14487026,1,114,24,14487027,1,115,25,25732598,1,225,25,25732597,1,189,25,25732596,1,188,25,25732595,1,203,25,25732594,1,202,25,25732593,1,197,25,25732592,1,207,25,25732591,1,169,25,25732590,1,223,25,25732589,1,159,25,25732522,1,235,25,25732579,1,152,25,25732575,1,192,25,25732489,1,179,25,25732573,1,201,25,25732472,1,172,25,25732576,1,149,25,25732488,1,178,25,25732566,1,120,25,25732571,1,219,25,25732577,1,150,25,25732487,1,127,25,25732506,1,211,25,25732548,1,125,25,25732588,1,158,25,25732486,1,247,25,25732467,1,238,25,25732508,1,163,25,25732552,1,228,25,25732603,1,183,25,25732513,1,217,25,25732587,1,168,25,25732520,1,122,25,25732484,1,128,25,25732562,1,249,25,25732505,1,187,25,25732504,1,186,25,25732483,1,136,25,25928905,1,181,25,25732560,1,255,25,25732500,1,230,25,25732482,1,135,25,25732555,1,233,25,25732568,1,222,25,25732583,1,145,25,25732481,1,134,25,25732586,1,167,25,25732521,1,248,25,25732518,1,209,25,25732480,1,243,25,25732512,1,216,25,25732509,1,164,25,25732547,1,140,25,25732479,1,157,25,25732544,1,239,25,25732574,1,191,25,25732564,1,251,25,25732478,1,156,25,25732546,1,139,25,25732498,1,242,25,25732557,1,133,25,25732477,1,162,25,25732515,1,213,25,25732584,1,165,25,25732514,1,212,25,25732476,1,227,25,25732494,1,198,25,25732531,1,236,25,25732530,1,234,25,25732529,1,117,25,25732528,1,215,25,25732527,1,124,25,25732526,1,123,25,25732525,1,254,25,25732524,1,253,25,25732523,1,148,25,25732570,1,218,25,25732580,1,146,25,25732581,1,147,25,25732569,1,224,25,25732533,1,143,25,25732540,1,184,25,25732541,1,185,25,25732585,1,166,25,25732556,1,132,25,25732485,1,129,25,25732563,1,250,25,25732578,1,151,25,25732501,1,119,25,25732502,1,193,25,25732536,1,176,25,25732496,1,245,25,25732553,1,229,25,25732516,1,206,25,25732582,1,144,25,25732517,1,208,25,25732558,1,137,25,25732543,1,241,25,25732466,1,237,25,25732507,1,190,25,25732542,1,240,25,25732551,1,131,25,25732554,1,232,25,25732565,1,252,25,25732475,1,171,25,25732493,1,205,25,25732492,1,204,25,25732491,1,118,25,25732490,1,214,25,25928904,1,180,25,25732549,1,126,25,25732602,1,182,25,25732539,1,175,25,25732545,1,141,25,25732559,1,138,25,25732537,1,177,25,25732534,1,153,25,25732503,1,194,25,25732606,1,160,25,25732567,1,121,25,25732538,1,174,25,25732497,1,246,25,25732550,1,130,25,25732572,1,200,25,25732474,1,170,25,25732511,1,221,25,25732601,1,196,25,25732532,1,142,25,25732519,1,210,25,25732495,1,199,25,25732605,1,155,25,25732535,1,154,25,25732499,1,244,25,25732510,1,220,25,25732600,1,195,25,25732607,1,161,25,25732604,1,231,25,25732473,1,173,25,25732599,1,226,26,51465122,1,116,26,51465123,0,1],h,C,Z,u=[3,3,3,3,2,2,2,1,1,1],i=24576,A=16384,d=8192,S=A|d;
function y(E){var a=E[1],W=E[0][a>>>3]>>>7-(a&7)&1;E[1]++;return W}function z(E,a){if(h==null){h={};
for(var W=0;W<m.length;W+=4)h[m[W+1]]=m.slice(W,W+4)}var R=y(E),q=h[R];while(q==null){R=R<<1|y(E);q=h[R]}var n=q[3];
if(n!=0)n=y(E)==0?n:-n;a[0]=q[2];a[1]=n}function t(E,a){for(var W=0;W<a;W++){if((E&1)==1)E++;E=E>>>1}return E}function j(E,a){return E>>a}function U(E,a,W,R,q,n){a[W]=j(j(11*E[q]-4*E[q+n]+E[q+n+n]+4,3)+E[R],1);
a[W+n]=j(j(5*E[q]+4*E[q+n]-E[q+n+n]+4,3)-E[R],1)}function x(E,a,W,R,q,n){var b=E[q-n]-E[q+n],c=E[q],$=E[R];
a[W]=j(j(b+4,3)+c+$,1);a[W+n]=j(j(-b+4,3)+c-$,1)}function P(E,a,W,R,q,n){a[W]=j(j(5*E[q]+4*E[q-n]-E[q-n-n]+4,3)+E[R],1);
a[W+n]=j(j(11*E[q]-4*E[q-n]+E[q-n-n]+4,3)-E[R],1)}function r(E){E=E<0?0:E>4095?4095:E;E=Z[E]>>>2;return E}function K(E,a,W,R,q){R=new Uint16Array(R.buffer);
var n=Date.now(),b=X._binBE,c=a+W,$,I,aI,F,aD,J,aJ,Y,V,aq,af,ao,p,aE,s,aR,f,w;a+=4;while(a<c){var Q=b.readShort(E,a),T=b.readUshort(E,a+2);
a+=4;if(Q==12)$=T;else if(Q==20)I=T;else if(Q==21)aI=T;else if(Q==48)F=T;else if(Q==53)aD=T;else if(Q==35)J=T;
else if(Q==62)aJ=T;else if(Q==101)Y=T;else if(Q==109)V=T;else if(Q==84)aq=T;else if(Q==106)af=T;else if(Q==107)ao=T;
else if(Q==108)p=T;else if(Q==102)aE=T;else if(Q==104)s=T;else if(Q==105)aR=T;else{var D=Q<0?-Q:Q,aK=D&65280,aj=0;
if(D&S){if(D&d){aj=T&65535;aj+=(D&255)<<16}else{aj=T&65535}}if((D&i)==i){if(f==null){f=[];for(var an=0;
an<4;an++)f[an]=new Int16Array((I>>>1)*(aI>>>1));w=new Int16Array((I>>>1)*(aI>>>1));C=new Int16Array(1024);
for(var an=0;an<1024;an++){var am=an-512,a3=Math.abs(am),$=Math.floor(768*a3*a3*a3/(255*255*255))+a3;
C[an]=Math.sign(am)*$}Z=new Uint16Array(4096);var aF=(1<<16)-1;for(var an=0;an<4096;an++){var as=an,ar=aF*(Math.pow(113,as/4095)-1)/112;
Z[an]=Math.min(ar,aF)}}var a2=f[aJ],b1=t(I,1+u[F]),aA=t(aI,1+u[F]);if(F==0){for(var v=0;v<aA;v++)for(var a$=0;
a$<b1;a$++){var aZ=a+(v*b1+a$)*2;a2[v*(I>>>1)+a$]=E[aZ]<<8|E[aZ+1]}}else{var ad=[E,a*8],ah=[],b6=0,a9=b1*aA,aB=[0,0],at=0,T=0;
while(b6<a9){z(ad,aB);at=aB[0];T=aB[1];while(at>0){ah[b6++]=T;at--}}var ac=(F-1)%3,ai=ac!=1?b1:0,au=ac!=0?aA:0;
for(var v=0;v<aA;v++){var aa=(v+au)*(I>>>1)+ai,aW=v*b1;for(var a$=0;a$<b1;a$++)a2[aa+a$]=C[ah[aW+a$]+512]*aD}if(ac==2){var s=I>>>1,b7=b1*2,b0=aA*2;
for(var v=0;v<aA;v++){for(var a$=0;a$<b7;a$++){var an=v*2*s+a$,aV=v*s+a$,a1=aA*s+aV;if(v==0)U(a2,w,an,a1,aV,s);
else if(v==aA-1)P(a2,w,an,a1,aV,s);else x(a2,w,an,a1,aV,s)}}var aY=a2;a2=w;w=aY;for(var v=0;v<b0;v++){for(var a$=0;
a$<b1;a$++){var an=v*s+2*a$,aV=v*s+a$,a1=b1+aV;if(a$==0)U(a2,w,an,a1,aV,1);else if(a$==b1-1)P(a2,w,an,a1,aV,1);
else x(a2,w,an,a1,aV,1)}}var aY=a2;a2=w;w=aY;var aw=[],a_=2-~~((F-1)/3);for(var aQ=0;aQ<3;aQ++)aw[aQ]=V>>14-aQ*2&3;
var az=aw[a_];if(az!=0)for(var v=0;v<b0;v++)for(var a$=0;a$<b7;a$++){var an=v*s+a$;a2[an]=a2[an]<<az}}}if(F==9&&aJ==3){var aC=f[0],b3=f[1],aX=f[2],a4=f[3];
for(var v=0;v<aI;v+=2)for(var a$=0;a$<I;a$+=2){var aU=v*I+a$,aZ=(v>>>1)*(I>>>1)+(a$>>>1),a5=aC[aZ],ae=b3[aZ]-2048,av=aX[aZ]-2048,b4=a4[aZ]-2048,ax=(ae<<1)+a5,aO=(av<<1)+a5,aM=a5+b4,b2=a5-b4;
R[aU]=r(ax);R[aU+1]=r(aM);R[aU+I]=r(b2);R[aU+I+1]=r(aO)}}a+=aj*4}else if(D==16388){a+=aj*4}else if(aK==8192||aK==8448||aK==9216){}else throw D.toString(16)}}console.log(Date.now()-n)}return K}();
X.decode._ljpeg_diff=function(m,B,h){var C=X.decode._getbithuff,Z,u;Z=C(m,B,h[0],h);u=C(m,B,Z,0);if((u&1<<Z-1)==0)u-=(1<<Z)-1;
return u};X.decode._decodeARW=function(m,B,h,C,Z,u){var i=m.t256[0],A=m.t257[0],d=m.t258[0],S=m.isLE?X._binLE:X._binBE,y=i*A==C||i*A*1.5==C,r,L,R,q,n,G,b,c,g,U,H;
if(!y){A+=8;var z=[h,0,0,0],t=new Uint16Array(32770),j=[3857,3856,3599,3342,3085,2828,2571,2314,2057,1800,1543,1286,1029,772,771,768,514,513],U,x,P,L,r,K=0,M=X.decode._ljpeg_diff;
t[0]=15;for(P=U=0;U<18;U++){var E=32768>>>(j[U]>>>8);for(var x=0;x<E;x++)t[++P]=j[U]}for(L=i;L--;)for(r=0;
r<A+1;r+=2){if(r==A)r=1;K+=M(B,z,t);if(r<A){var a=K&4095;X.decode._putsF(Z,(r*i+L)*d,a<<16-d)}}return}if(i*A*1.5==C){for(var U=0;
U<C;U+=3){var o=B[h+U+0],al=B[h+U+1],W=B[h+U+2];Z[u+U]=al<<4|o>>>4;Z[u+U+1]=o<<4|W>>>4;Z[u+U+2]=W<<4|al>>>4}return}var ab=new Uint16Array(16),$=new Uint8Array(i+1);
for(r=0;r<A;r++){for(var e=0;e<i;e++)$[e]=B[h++];for(H=0,L=0;L<i-30;H+=16){q=2047&(R=S.readUint($,H));
n=2047&R>>>11;G=15&R>>>22;b=15&R>>>26;for(c=0;c<4&&128<<c<=q-n;c++);for(g=30,U=0;U<16;U++)if(U==G)ab[U]=q;
else if(U==b)ab[U]=n;else{ab[U]=((S.readUshort($,H+(g>>3))>>>(g&7)&127)<<c)+n;if(ab[U]>2047)ab[U]=2047;
g+=7}for(U=0;U<16;U++,L+=2){var a=ab[U]<<1;X.decode._putsF(Z,(r*i+L)*d,a<<16-d)}L-=L&1?1:31}}};X.decode._decodeNikon=function(m,B,h,C,Z,u,i){var A=[[0,0,1,5,1,1,1,1,1,1,2,0,0,0,0,0,0,5,4,3,6,2,7,1,0,8,9,11,10,12],[0,0,1,5,1,1,1,1,1,1,2,0,0,0,0,0,0,57,90,56,39,22,5,4,3,2,1,0,11,12,12],[0,0,1,4,2,3,1,2,0,0,0,0,0,0,0,0,0,5,4,6,3,7,2,8,1,9,0,10,11,12],[0,0,1,4,3,1,1,1,1,1,2,0,0,0,0,0,0,5,6,4,7,8,3,9,2,1,0,10,11,12,13,14],[0,0,1,5,1,1,1,1,1,1,1,2,0,0,0,0,0,8,92,75,58,41,7,6,5,4,3,2,1,0,13,14],[0,0,1,4,2,2,3,1,2,0,0,0,0,0,0,0,0,7,6,8,5,9,4,10,3,11,12,2,0,1,13,14]],d=m.t256[0],S=m.t257[0],y=m.t258[0],z=0,t=0,j=X.decode._make_decoder,U=X.decode._getbithuff,x=B[0].exifIFD.makerNote,P=x.t150?x.t150:x.t140,L=0,r=P[L++],K=P[L++],W=0,a,R,q,n,G,b,c=0;
if(r==73||K==88)L+=2110;if(r==70)z=2;if(y==14)z+=3;var M=[[0,0],[0,0]],E=m.isLE?X._binLE:X._binBE;for(var a=0;
a<2;a++)for(var o=0;o<2;o++){M[a][o]=E.readShort(P,L);L+=2}var al=1<<y&32767,ab=E.readShort(P,L);L+=2;
if(ab>1)W=Math.floor(al/(ab-1));if(r==68&&K==32&&W>0)t=E.readShort(P,562);var g=[0,0],H=j(A[z]),$=[C,0,0,0];
for(c=R=0;R<S;R++){if(t&&R==t){H=j(A[z+1])}for(q=0;q<d;q++){a=U(h,$,H[0],H);n=a&15;G=a>>>4;b=(U(h,$,n-G,0)<<1)+1<<G>>>1;
if((b&1<<n-1)==0)b-=(1<<n)-(G==0?1:0);if(q<2)g[q]=M[R&1][q]+=b;else g[q&1]+=b;var e=Math.min(Math.max(g[q&1],0),(1<<y)-1),_=(R*d+q)*y;
X.decode._putsF(u,_,e<<16-y)}}};X.decode._putsF=function(m,B,h){h=h<<8-(B&7);var C=B>>>3;m[C]|=h>>>16;
m[C+1]|=h>>>8;m[C+2]|=h};X.decode._getbithuff=function(m,B,h,C){var Z=0,u=X.decode._get_byte,i,A=B[0],d=B[1],S=B[2],y=B[3];
if(h==0||S<0)return 0;while(!y&&S<h&&(i=m[A++])!=-1&&!(y=Z&&i==255&&m[A++])){d=(d<<8)+i;S+=8}i=d<<32-S>>>32-h;
if(C){S-=C[i+1]>>>8;i=C[i+1]&255}else S-=h;if(S<0)throw"e";B[0]=A;B[1]=d;B[2]=S;B[3]=y;return i};X.decode._make_decoder=function(m){var B,h,C,u,i,A=[],d=17;
for(B=16;B!=0&&!m[B];B--);A[0]=B;for(C=h=1;h<=B;h++)for(u=0;u<m[h];u++,++d)for(i=0;i<1<<B-h;i++)if(C<=1<<B)A[C++]=h<<8|m[d];
return A};X.decode._decodeNewJPEG=function(m,B,h,C,Z,u){C=Math.min(C,B.length-h);var i=m.t347,A=i?i.length:0,d=new Uint8Array(A+C);
if(i){var S=216,y=217,z=0;for(var t=0;t<A-1;t++){if(i[t]==255&&i[t+1]==y)break;d[z++]=i[t]}var j=B[h],U=B[h+1];
if(j!=255||U!=S){d[z++]=j;d[z++]=U}for(var t=2;t<C;t++)d[z++]=B[h+t]}else for(var t=0;t<C;t++)d[t]=B[h+t];
if(m.t262[0]==32803||m.t259[0]==7&&m.t262[0]==34892){var x=m.t258[0],P=X.LosslessJpegDecode(d),L=P.length;
if(!1){}else if(x==16){if(m.isLE)for(var t=0;t<L;t++){Z[u+(t<<1)]=P[t]&255;Z[u+(t<<1)+1]=P[t]>>>8}else for(var t=0;
t<L;t++){Z[u+(t<<1)]=P[t]>>>8;Z[u+(t<<1)+1]=P[t]&255}}else if(x==14||x==12){var r=16-x;for(var t=0;t<L;
t++)X.decode._putsF(Z,t*x,P[t]<<r)}else if(x==8){for(var t=0;t<L;t++)Z[u+t]=P[t]}else throw new Error("unsupported bit depth "+x)}else{var K=new X.JpegDecoder;
K.parse(d);var M=K.getData({width:K.width,height:K.height,forceRGB:!0,isSourcePDF:!1});for(var t=0;t<M.length;
t++)Z[u+t]=M[t]}if(m.t262[0]==6)m.t262[0]=2};X.decode._decodeOldJPEGInit=function(m,B,h,C){var Z=216,u=217,i=219,A=196,d=221,S=192,y=218,z=0,t=0,j,U,x=!1,P,L,r,K=m.t513,M=K?K[0]:0,E=m.t514,a=E?E[0]:0,o=m.t324||m.t273||K,al=m.t530,W=0,ab=0,R=m.t277?m.t277[0]:1,q=m.t515;
if(o){t=o[0];x=o.length>1}if(!x){if(B[h]==255&&B[h+1]==Z)return{jpegOffset:h};if(K!=null){if(B[h+M]==255&&B[h+M+1]==Z)z=h+M;
else aH("JPEGInterchangeFormat does not point to SOI");if(E==null)aH("JPEGInterchangeFormatLength field is missing");
else if(M>=t||M+a<=t)aH("JPEGInterchangeFormatLength field value is invalid");if(z!=null)return{jpegOffset:z}}}if(al!=null){W=al[0];
ab=al[1]}if(K!=null)if(E!=null)if(a>=2&&M+a<=t){if(B[h+M+a-2]==255&&B[h+M+a-1]==Z)j=new Uint8Array(a-2);
else j=new Uint8Array(a);for(P=0;P<j.length;P++)j[P]=B[h+M+P];aH("Incorrect JPEG interchange format: using JPEGInterchangeFormat offset to derive tables")}else aH("JPEGInterchangeFormat+JPEGInterchangeFormatLength > offset to first strip or tile");
if(j==null){var n=0,G=[];G[n++]=255;G[n++]=Z;var b=m.t519;if(b==null)throw new Error("JPEGQTables tag is missing");
for(P=0;P<b.length;P++){G[n++]=255;G[n++]=i;G[n++]=0;G[n++]=67;G[n++]=P;for(L=0;L<64;L++)G[n++]=B[h+b[P]+L]}for(r=0;
r<2;r++){var c=m[r==0?"t520":"t521"];if(c==null)throw new Error((r==0?"JPEGDCTables":"JPEGACTables")+" tag is missing");
for(P=0;P<c.length;P++){G[n++]=255;G[n++]=A;var g=19;for(L=0;L<16;L++)g+=B[h+c[P]+L];G[n++]=g>>>8;G[n++]=g&255;
G[n++]=P|r<<4;for(L=0;L<16;L++)G[n++]=B[h+c[P]+L];for(L=0;L<g;L++)G[n++]=B[h+c[P]+16+L]}}G[n++]=255;
G[n++]=S;G[n++]=0;G[n++]=8+3*R;G[n++]=8;G[n++]=m.height>>>8&255;G[n++]=m.height&255;G[n++]=m.width>>>8&255;
G[n++]=m.width&255;G[n++]=R;if(R==1){G[n++]=1;G[n++]=17;G[n++]=0}else for(P=0;P<3;P++){G[n++]=P+1;G[n++]=P!=0?17:(W&15)<<4|ab&15;
G[n++]=P}if(q!=null&&q[0]!=0){G[n++]=255;G[n++]=d;G[n++]=0;G[n++]=4;G[n++]=q[0]>>>8&255;G[n++]=q[0]&255}j=new Uint8Array(G)}var H=-1;
P=0;while(P<j.length-1){if(j[P]==255&&j[P+1]==S){H=P;break}P++}if(H==-1){var $=new Uint8Array(j.length+10+3*R);
$.set(j);var e=j.length;H=j.length;j=$;j[e++]=255;j[e++]=S;j[e++]=0;j[e++]=8+3*R;j[e++]=8;j[e++]=m.height>>>8&255;
j[e++]=m.height&255;j[e++]=m.width>>>8&255;j[e++]=m.width&255;j[e++]=R;if(R==1){j[e++]=1;j[e++]=17;j[e++]=0}else for(P=0;
P<3;P++){j[e++]=P+1;j[e++]=P!=0?17:(W&15)<<4|ab&15;j[e++]=P}}if(B[t]==255&&B[t+1]==y){var _=B[t+2]<<8|B[t+3];
U=new Uint8Array(_+2);U[0]=B[t];U[1]=B[t+1];U[2]=B[t+2];U[3]=B[t+3];for(P=0;P<_-2;P++)U[P+4]=B[t+P+4]}else{U=new Uint8Array(2+6+2*R);
var l=0;U[l++]=255;U[l++]=y;U[l++]=0;U[l++]=6+2*R;U[l++]=R;if(R==1){U[l++]=1;U[l++]=0}else for(P=0;P<3;
P++){U[l++]=P+1;U[l++]=P<<4|P}U[l++]=0;U[l++]=63;U[l++]=0}return{jpegOffset:h,tables:j,sosMarker:U,sofPosition:H}};
X.decode._decodeOldJPEG=function(m,B,h,C,Z,u){var i,A,d,S,y,z=X.decode._decodeOldJPEGInit(m,B,h,C);if(z.jpegOffset!=null){A=h+C-z.jpegOffset;
S=new Uint8Array(A);for(i=0;i<A;i++)S[i]=B[z.jpegOffset+i]}else{d=z.tables.length;S=new Uint8Array(d+z.sosMarker.length+C+2);
S.set(z.tables);y=d;S[z.sofPosition+5]=m.height>>>8&255;S[z.sofPosition+6]=m.height&255;S[z.sofPosition+7]=m.width>>>8&255;
S[z.sofPosition+8]=m.width&255;if(B[h]!=255||B[h+1]!=SOS){S.set(z.sosMarker,y);y+=sosMarker.length}for(i=0;
i<C;i++)S[y++]=B[h+i];S[y++]=255;S[y++]=EOI}var t=new X.JpegDecoder;t.parse(S);var j=t.getData({width:t.width,height:t.height,forceRGB:!0,isSourcePDF:!1});
for(var i=0;i<j.length;i++)Z[u+i]=j[i];if(m.t262&&m.t262[0]==6)m.t262[0]=2};X.decode._decodePackBits=function(m,B,h,C,Z){var u=new Int8Array(m.buffer),i=new Int8Array(C.buffer),A=B+h;
while(B<A){var d=u[B];B++;if(d>=0&&d<128)for(var S=0;S<d+1;S++){i[Z]=u[B];Z++;B++}if(d>=-127&&d<0){for(var S=0;
S<-d+1;S++){i[Z]=u[B];Z++}B++}}};X.decode._decodeThunder=function(m,B,h,C,Z){var u=[0,1,0,-1],i=[0,1,2,3,0,-3,-2,-1],A=B+h,d=Z*2,S=0;
while(B<A){var y=m[B],z=y>>>6,t=y&63;B++;if(z==3){S=t&15;C[d>>>1]|=S<<4*(1-d&1);d++}if(z==0)for(var j=0;
j<t;j++){C[d>>>1]|=S<<4*(1-d&1);d++}if(z==2)for(var j=0;j<2;j++){var U=t>>>3*(1-j)&7;if(U!=4){S+=i[U];
C[d>>>1]|=S<<4*(1-d&1);d++}}if(z==1)for(var j=0;j<3;j++){var U=t>>>2*(2-j)&3;if(U!=2){S+=u[U];C[d>>>1]|=S<<4*(1-d&1);
d++}}}};X.decode._dmap={"1":0,"011":1,"000011":2,"0000011":3,"010":-1,"000010":-2,"0000010":-3};X.decode._lens=function(){var m=function(d,S,y,z){for(var t=0;
t<S.length;t++)d[S[t]]=y+t*z},B="00110101,000111,0111,1000,1011,1100,1110,1111,10011,10100,00111,01000,001000,000011,110100,110101,"+"101010,101011,0100111,0001100,0001000,0010111,0000011,0000100,0101000,0101011,0010011,0100100,0011000,00000010,00000011,00011010,"+"00011011,00010010,00010011,00010100,00010101,00010110,00010111,00101000,00101001,00101010,00101011,00101100,00101101,00000100,00000101,00001010,"+"00001011,01010010,01010011,01010100,01010101,00100100,00100101,01011000,01011001,01011010,01011011,01001010,01001011,00110010,00110011,00110100",h="0000110111,010,11,10,011,0011,0010,00011,000101,000100,0000100,0000101,0000111,00000100,00000111,000011000,"+"0000010111,0000011000,0000001000,00001100111,00001101000,00001101100,00000110111,00000101000,00000010111,00000011000,000011001010,000011001011,000011001100,000011001101,000001101000,000001101001,"+"000001101010,000001101011,000011010010,000011010011,000011010100,000011010101,000011010110,000011010111,000001101100,000001101101,000011011010,000011011011,000001010100,000001010101,000001010110,000001010111,"+"000001100100,000001100101,000001010010,000001010011,000000100100,000000110111,000000111000,000000100111,000000101000,000001011000,000001011001,000000101011,000000101100,000001011010,000001100110,000001100111",C="11011,10010,010111,0110111,00110110,00110111,01100100,01100101,01101000,01100111,011001100,011001101,011010010,011010011,011010100,011010101,011010110,"+"011010111,011011000,011011001,011011010,011011011,010011000,010011001,010011010,011000,010011011",Z="0000001111,000011001000,000011001001,000001011011,000000110011,000000110100,000000110101,0000001101100,0000001101101,0000001001010,0000001001011,0000001001100,"+"0000001001101,0000001110010,0000001110011,0000001110100,0000001110101,0000001110110,0000001110111,0000001010010,0000001010011,0000001010100,0000001010101,0000001011010,"+"0000001011011,0000001100100,0000001100101",u="00000001000,00000001100,00000001101,000000010010,000000010011,000000010100,000000010101,000000010110,000000010111,000000011100,000000011101,000000011110,000000011111";
B=B.split(",");h=h.split(",");C=C.split(",");Z=Z.split(",");u=u.split(",");var i={},A={};m(i,B,0,1);
m(i,C,64,64);m(i,u,1792,64);m(A,h,0,1);m(A,Z,64,64);m(A,u,1792,64);return[i,A]}();X.decode._decodeG4=function(m,B,h,C,Z,u,i){var A=X.decode,d=B<<3,S=0,y="",z=[],t=[],U=0,x=0,P=0,L=0,r=0,M=0,E=0,a="",o=0;
for(var j=0;j<u;j++)t.push(0);t=A._makeDiff(t);var al=Math.ceil(u/8)*8;while(d>>>3<B+h){L=A._findDiff(t,U+(U==0?0:1),1-M),r=A._findDiff(t,L,M);
var W=0;if(i==1)W=m[d>>>3]>>>7-(d&7)&1;if(i==2)W=m[d>>>3]>>>(d&7)&1;d++;y+=W;if(a=="H"){if(A._lens[M][y]!=null){var ab=A._lens[M][y];
y="";S+=ab;if(ab<64){A._addNtimes(z,S,M);U+=S;M=1-M;S=0;o--;if(o==0)a=""}}}else{if(y=="0001"){y="";A._addNtimes(z,r-U,M);
U=r}if(y=="001"){y="";a="H";o=2}if(A._dmap[y]!=null){x=L+A._dmap[y];A._addNtimes(z,x-U,M);U=x;y="";M=1-M}}if(z.length==u&&a==""){A._writeBits(z,C,Z*8+E*al);
M=0;E++;U=0;t=A._makeDiff(z);z=[]}}};X.decode._findDiff=function(m,B,h){for(var C=0;C<m.length;C+=2)if(m[C]>=B&&m[C+1]==h)return m[C]};
X.decode._makeDiff=function(m){var B=[];if(m[0]==1)B.push(0,1);for(var h=1;h<m.length;h++)if(m[h-1]!=m[h])B.push(h,m[h]);
B.push(m.length,0,m.length,1);return B};X.decode._decodeG3=function(m,B,h,C,Z,u,i,A){var d=X.decode,S=B<<3,y=0,z="",t=[],j=[],x=0,P=0,L=0,r=0,M=0,E=0,o="",al=0,W=!0;
for(var U=0;U<u;U++)t.push(0);var a=-1,ab=Math.ceil(u/8)*8;while(S>>>3<B+h){r=d._findDiff(j,x+(x==0?0:1),1-E),M=d._findDiff(j,r,E);
var R=0;if(i==1)R=m[S>>>3]>>>7-(S&7)&1;if(i==2)R=m[S>>>3]>>>(S&7)&1;S++;z+=R;if(W){if(d._lens[E][z]!=null){var q=d._lens[E][z];
z="";y+=q;if(q<64){d._addNtimes(t,y,E);E=1-E;y=0}}}else{if(o=="H"){if(d._lens[E][z]!=null){var q=d._lens[E][z];
z="";y+=q;if(q<64){d._addNtimes(t,y,E);x+=y;E=1-E;y=0;al--;if(al==0)o=""}}}else{if(z=="0001"){z="";d._addNtimes(t,M-x,E);
x=M}if(z=="001"){z="";o="H";al=2}if(d._dmap[z]!=null){P=r+d._dmap[z];d._addNtimes(t,P-x,E);x=P;z="";
E=1-E}}}if(z.endsWith("000000000001")){if(a>=0)d._writeBits(t,C,Z*8+a*ab);if(A){if(i==1)W=(m[S>>>3]>>>7-(S&7)&1)==1;
if(i==2)W=(m[S>>>3]>>>(S&7)&1)==1;S++}z="";E=0;a++;x=0;j=d._makeDiff(t);t=[]}}if(t.length==u)d._writeBits(t,C,Z*8+a*ab)};
X.decode._addNtimes=function(m,B,h){for(var C=0;C<B;C++)m.push(h)};X.decode._writeBits=function(m,B,h){for(var C=0;
C<m.length;C++)B[h+C>>>3]|=m[C]<<7-(h+C&7)};X.decode._decodeLZW=X.decode._decodeLZW=function(){var m,h,C,Z,u=0,i=0,A=0,d=0,S=function(){var r=m>>>3,M=h[r]<<16|h[r+1]<<8|h[r+2],E=M>>>24-(m&7)-i&(1<<i)-1;
m+=i;return E},y=new Uint32Array(4096*4),z=0,t=function(r){if(r==z)return;z=r;A=1<<r;d=A+1;for(var M=0;
M<d+1;M++){y[4*M]=y[4*M+3]=M;y[4*M+1]=65535;y[4*M+2]=1}},j=function(r){i=r+1;u=d+1},U=function(r){var M=r<<2,E=y[M+2],a=Z+E-1;
while(M!=65535){C[a--]=y[M];M=y[M+1]}Z+=E},x=function(r,M){var E=u<<2,a=r<<2;y[E]=y[(M<<2)+3];y[E+1]=a;
y[E+2]=y[a+2]+1;y[E+3]=y[a+3];u++;if(u+1==1<<i&&i!=12)i++},P=function(r,M,E,a,al,W){m=M<<3;h=r;C=a;Z=al;
var R=M+E<<3,q=0,n=0;t(W);j(W);while(m<R&&(q=S())!=d){if(q==A){j(W);q=S();if(q==d)break;U(q)}else{if(q<u){U(q);
x(n,q)}else{x(n,n);U(u-1)}}n=q}return Z};return P}();X.tags={};X._types=function(){var m=new Array(250);
m.fill(0);m=m.concat([0,0,0,0,4,3,3,3,3,3,0,0,3,0,0,0,3,0,0,2,2,2,2,4,3,0,0,3,4,4,3,3,5,5,3,2,5,5,0,0,0,0,4,4,0,0,3,3,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,2,2,3,5,5,3,0,3,3,4,4,4,3,4,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
var B={33432:2,33434:5,33437:5,34665:4,34850:3,34853:4,34855:3,34864:3,34866:4,36864:7,36867:2,36868:2,37121:7,37377:10,37378:5,37380:10,37381:5,37383:3,37384:3,37385:3,37386:5,37510:7,37520:2,37521:2,37522:2,40960:7,40961:3,40962:4,40963:4,40965:4,41486:5,41487:5,41488:3,41985:3,41986:3,41987:3,41988:5,41989:3,41990:3,41993:3,41994:3,41995:7,41996:3,42032:2,42033:2,42034:5,42036:2,42037:2,59932:7};
return{basic:{main:m,rest:B},gps:{main:[1,2,5,2,5,1,5,5,0,9],rest:{18:2,29:2}}}}();X._readIFD=function(m,B,h,C,Z,u){var i=m.readUshort(B,h);
h+=2;var A={};if(u.debug)aH("   ".repeat(Z),C.length-1,">>>----------------");for(var d=0;d<i;d++){var S=m.readUshort(B,h);
h+=2;var y=m.readUshort(B,h);h+=2;var z=m.readUint(B,h);h+=4;var t=m.readUint(B,h);h+=4;var j=[];if(y==1||y==7){j=new Uint8Array(B.buffer,z<5?h-4:t,z)}if(y==2){var U=z<5?h-4:t,x=B[U],P=Math.max(0,Math.min(z-1,B.length-U));
if(x<128||P==0)j.push(m.readASCII(B,U,P));else j=new Uint8Array(B.buffer,U,P)}if(y==3){for(var L=0;L<z;
L++)j.push(m.readUshort(B,(z<3?h-4:t)+2*L))}if(y==4||y==13){for(var L=0;L<z;L++)j.push(m.readUint(B,(z<2?h-4:t)+4*L))}if(y==5||y==10){var r=y==5?m.readUint:m.readInt;
for(var L=0;L<z;L++)j.push([r(B,t+L*8),r(B,t+L*8+4)])}if(y==8){for(var L=0;L<z;L++)j.push(m.readShort(B,(z<3?h-4:t)+2*L))}if(y==9){for(var L=0;
L<z;L++)j.push(m.readInt(B,(z<2?h-4:t)+4*L))}if(y==11){for(var L=0;L<z;L++)j.push(m.readFloat(B,t+L*4))}if(y==12){for(var L=0;
L<z;L++)j.push(m.readDouble(B,t+L*8))}if(z!=0&&j.length==0){aH(S,"unknown TIFF tag type: ",y,"num:",z);
if(d==0)return;continue}if(u.debug)aH("   ".repeat(Z),S,y,X.tags[S],j);A["t"+S]=j;if(S==330&&A.t272&&A.t272[0]=="DSLR-A100"){}else if(S==330||S==34665||S==34853||S==50740&&m.readUshort(B,m.readUint(j,0))<300||S==61440){var K=S==50740?[m.readUint(j,0)]:j,M=[];
for(var L=0;L<K.length;L++)X._readIFD(m,B,K[L],M,Z+1,u);if(S==330)A.subIFD=M;if(S==34665)A.exifIFD=M[0];
if(S==34853)A.gpsiIFD=M[0];if(S==50740)A.dngPrvt=M[0];if(S==61440)A.fujiIFD=M[0]}if(S==37500&&u.parseMN){var E=j;
if(m.readASCII(E,0,5)=="Nikon")A.makerNote=X.decode(E.slice(10).buffer)[0];else if(m.readUshort(B,t)<300&&m.readUshort(B,t+4)<=12){var a=[];
X._readIFD(m,B,t,a,Z+1,u);A.makerNote=a[0]}}}C.push(A);if(u.debug)aH("   ".repeat(Z),"<<<---------------");
return h};X._writeIFD=function(m,B,h,C,Z){var u=Object.keys(Z),i=u.length;if(Z.exifIFD)i--;if(Z.gpsiIFD)i--;
m.writeUshort(h,C,i);C+=2;var A=C+i*12+4;for(var d=0;d<u.length;d++){var S=u[d];if(S=="t34665"||S=="t34853")continue;
if(S=="exifIFD")S="t34665";if(S=="gpsiIFD")S="t34853";var y=parseInt(S.slice(1)),z=B.main[y];if(z==null)z=B.rest[y];
if(z==null||z==0)throw new Error("unknown type of tag: "+y);var t=Z[S];if(y==34665){var j=X._writeIFD(m,B,h,A,Z.exifIFD);
t=[A];A=j[1]}if(y==34853){var j=X._writeIFD(m,X._types.gps,h,A,Z.gpsiIFD);t=[A];A=j[1]}if(z==2)t=t[0]+"\0";
var U=t.length;m.writeUshort(h,C,y);C+=2;m.writeUshort(h,C,z);C+=2;m.writeUint(h,C,U);C+=4;var x=[-1,1,1,2,4,8,0,1,0,4,8,0,8][z]*U,P=C;
if(x>4){m.writeUint(h,C,A);P=A}if(z==1||z==7){for(var L=0;L<U;L++)h[P+L]=t[L]}else if(z==2){m.writeASCII(h,P,t)}else if(z==3){for(var L=0;
L<U;L++)m.writeUshort(h,P+2*L,t[L])}else if(z==4){for(var L=0;L<U;L++)m.writeUint(h,P+4*L,t[L])}else if(z==5||z==10){var r=z==5?m.writeUint:m.writeInt;
for(var L=0;L<U;L++){var K=t[L],M=K[0],E=K[1];if(M==null)throw"e";r(h,P+8*L,M);r(h,P+8*L+4,E)}}else if(z==9){for(var L=0;
L<U;L++)m.writeInt(h,P+4*L,t[L])}else if(z==12){for(var L=0;L<U;L++)m.writeDouble(h,P+8*L,t[L])}else throw z;
if(x>4){x+=x&1;A+=x}C+=4}return[C,A]};X.toRGBA8=function(m,B){var h=m.width,C=m.height,u=h*C,i=u*4,A=m.data,d=new Uint8Array(u*4),S=m.t262?m.t262[0]:2,y=m.t258?Math.min(32,m.t258[0]):1;
if(m.t262==null&&y==1)S=0;if(!1){}else if(S==0){var z=Math.ceil(y*h/8);for(var t=0;t<C;t++){var j=t*z,U=t*h;
if(y==1)for(var x=0;x<h;x++){var P=U+x<<2,L=A[j+(x>>3)]>>7-(x&7)&1;d[P]=d[P+1]=d[P+2]=(1-L)*255;d[P+3]=255}if(y==4)for(var x=0;
x<h;x++){var P=U+x<<2,L=A[j+(x>>1)]>>4-4*(x&1)&15;d[P]=d[P+1]=d[P+2]=(15-L)*17;d[P+3]=255}if(y==8)for(var x=0;
x<h;x++){var P=U+x<<2,L=A[j+x];d[P]=d[P+1]=d[P+2]=255-L;d[P+3]=255}}}else if(S==1){var r=m.t258?m.t258.length:1,z=Math.ceil(r*y*h/8);
if(B==null)B=1/256;for(var t=0;t<C;t++){var j=t*z,U=t*h;if(y==1)for(var x=0;x<h;x++){var P=U+x<<2,L=A[j+(x>>3)]>>7-(x&7)&1;
d[P]=d[P+1]=d[P+2]=L*255;d[P+3]=255}if(y==2)for(var x=0;x<h;x++){var P=U+x<<2,L=A[j+(x>>2)]>>6-2*(x&3)&3;
d[P]=d[P+1]=d[P+2]=L*85;d[P+3]=255}if(y==8)for(var x=0;x<h;x++){var P=U+x<<2,L=A[j+x*r];d[P]=d[P+1]=d[P+2]=L;
d[P+3]=255}if(y==16)for(var x=0;x<h;x++){var P=U+x<<2,M=j+2*x,L=A[M+1]<<8|A[M];d[P]=d[P+1]=d[P+2]=Math.min(255,~~(L*B));
d[P+3]=255}}}else if(S==2){var r=m.t258?m.t258.length:3;if(y==8){if(r==4)for(var x=0;x<i;x++)d[x]=A[x];
if(r==3)for(var x=0;x<u;x++){var P=x<<2,a=x*3;d[P]=A[a];d[P+1]=A[a+1];d[P+2]=A[a+2];d[P+3]=255}}else{if(r==4)for(var x=0;
x<u;x++){var P=x<<2,a=x*8+1;d[P]=A[a];d[P+1]=A[a+2];d[P+2]=A[a+4];d[P+3]=A[a+6]}if(r==3)for(var x=0;
x<u;x++){var P=x<<2,a=x*6+1;d[P]=A[a];d[P+1]=A[a+2];d[P+2]=A[a+4];d[P+3]=255}}}else if(S==3){var o=m.t320,r=m.t258?m.t258.length:1,z=Math.ceil(r*y*h/8),al=1<<y;
for(var t=0;t<C;t++)for(var W=0;W<h;W++){var x=t*h+W,P=x<<2,ab=0,R=t*z;if(!1){}else if(y==1)ab=A[R+(W>>>3)]>>>7-(W&7)&1;
else if(y==2)ab=A[R+(W>>>2)]>>>6-2*(W&3)&3;else if(y==4)ab=A[R+(W>>>1)]>>>4-4*(W&1)&15;else if(y==8)ab=A[R+W*r];
else throw y;d[P]=o[ab]>>8;d[P+1]=o[al+ab]>>8;d[P+2]=o[al+al+ab]>>8;d[P+3]=255}}else if(S==5){var r=m.t258?m.t258.length:4,q=r>4?1:0;
for(var x=0;x<u;x++){var P=x<<2,n=x*r,G=255-A[n],b=255-A[n+1],c=255-A[n+2],g=(255-A[n+3])*(1/255);d[P]=~~(G*g+.5);
d[P+1]=~~(b*g+.5);d[P+2]=~~(c*g+.5);d[P+3]=255*(1-q)+A[n+4]*q}}else if(S==6&&m.t278){var H=m.t278[0];
for(var t=0;t<C;t+=H){var x=t*h,e=H*h;for(var _=0;_<e;_++){var P=4*(x+_),n=3*x+4*(_>>>1),c=A[n+(_&1)],l=A[n+2]-128,a8=A[n+3]-128,I=c+((a8>>2)+(a8>>3)+(a8>>5)),O=c-((l>>2)+(l>>4)+(l>>5))-((a8>>1)+(a8>>3)+(a8>>4)+(a8>>5)),aI=c+(l+(l>>1)+(l>>2)+(l>>6));
d[P]=Math.max(0,Math.min(255,I));d[P+1]=Math.max(0,Math.min(255,O));d[P+2]=Math.max(0,Math.min(255,aI));
d[P+3]=255}}}else aH("Unknown Photometric interpretation: "+S);return d};X.replaceIMG=function(m){if(m==null)m=document.getElementsByTagName("img");
var B=["tif","tiff","dng","cr2","nef"];for(var h=0;h<m.length;h++){var C=m[h],Z=C.getAttribute("src");
if(Z==null)continue;var i=Z.split(".").pop().toLowerCase();if(B.indexOf(i)==-1)continue;var A=new XMLHttpRequest;
X._xhrs.push(A);X._imgs.push(C);A.open("GET",Z);A.responseType="arraybuffer";A.onload=X._imgLoaded;A.send()}};
X._xhrs=[];X._imgs=[];X._imgLoaded=function(m){var h=m.target.response,C=X.decode(h),Z=C,u=0,i=Z[0];
if(C[0].subIFD)Z=Z.concat(C[0].subIFD);for(var A=0;A<Z.length;A++){var d=Z[A];if(d.t258==null||d.t258.length<3)continue;
var S=d.t256*d.t257;if(S>u){u=S;i=d}}X.decodeImage(h,i,C);var y=X.toRGBA8(i),z=i.width,t=i.height,j=X._xhrs.indexOf(m.target),d=X._imgs[j];
X._xhrs.splice(j,1);X._imgs.splice(j,1);var U=document.createElement("canvas");U.width=z;U.height=t;
var x=U.getContext("2d"),P=new ImageData(new Uint8ClampedArray(y.buffer),z,t);x.putImageData(P,0,0);
d.setAttribute("src",U.toDataURL())};X._binBE={nextZero:function(m,B){while(m[B]!=0)B++;return B},readUshort:function(m,B){return m[B]<<8|m[B+1]},readShort:function(m,B){var h=X._binBE.ui8;
h[0]=m[B+1];h[1]=m[B+0];return X._binBE.i16[0]},readInt:function(m,B){var h=X._binBE.ui8;h[0]=m[B+3];
h[1]=m[B+2];h[2]=m[B+1];h[3]=m[B+0];return X._binBE.i32[0]},readUint:function(m,B){var h=X._binBE.ui8;
h[0]=m[B+3];h[1]=m[B+2];h[2]=m[B+1];h[3]=m[B+0];return X._binBE.ui32[0]},readASCII:function(m,B,h){var C="";
for(var Z=0;Z<h;Z++)C+=String.fromCharCode(m[B+Z]);return C},readFloat:function(m,B){var h=X._binBE.ui8;
for(var C=0;C<4;C++)h[C]=m[B+3-C];return X._binBE.fl32[0]},readDouble:function(m,B){var h=X._binBE.ui8;
for(var C=0;C<8;C++)h[C]=m[B+7-C];return X._binBE.fl64[0]},writeUshort:function(m,B,h){m[B]=h>>8&255;
m[B+1]=h&255},writeInt:function(m,B,h){var C=X._binBE.ui8;X._binBE.i32[0]=h;m[B+3]=C[0];m[B+2]=C[1];
m[B+1]=C[2];m[B+0]=C[3]},writeUint:function(m,B,h){m[B]=h>>24&255;m[B+1]=h>>16&255;m[B+2]=h>>8&255;m[B+3]=h>>0&255},writeASCII:function(m,B,h){for(var C=0;
C<h.length;C++)m[B+C]=h.charCodeAt(C)},writeDouble:function(m,B,h){X._binBE.fl64[0]=h;for(var C=0;C<8;
C++)m[B+C]=X._binBE.ui8[7-C]}};X._binBE.ui8=new Uint8Array(8);X._binBE.i16=new Int16Array(X._binBE.ui8.buffer);
X._binBE.i32=new Int32Array(X._binBE.ui8.buffer);X._binBE.ui32=new Uint32Array(X._binBE.ui8.buffer);
X._binBE.fl32=new Float32Array(X._binBE.ui8.buffer);X._binBE.fl64=new Float64Array(X._binBE.ui8.buffer);
X._binLE={nextZero:X._binBE.nextZero,readUshort:function(m,B){return m[B+1]<<8|m[B]},readShort:function(m,B){var h=X._binBE.ui8;
h[0]=m[B+0];h[1]=m[B+1];return X._binBE.i16[0]},readInt:function(m,B){var h=X._binBE.ui8;h[0]=m[B+0];
h[1]=m[B+1];h[2]=m[B+2];h[3]=m[B+3];return X._binBE.i32[0]},readUint:function(m,B){var h=X._binBE.ui8;
h[0]=m[B+0];h[1]=m[B+1];h[2]=m[B+2];h[3]=m[B+3];return X._binBE.ui32[0]},readASCII:X._binBE.readASCII,readFloat:function(m,B){var h=X._binBE.ui8;
for(var C=0;C<4;C++)h[C]=m[B+C];return X._binBE.fl32[0]},readDouble:function(m,B){var h=X._binBE.ui8;
for(var C=0;C<8;C++)h[C]=m[B+C];return X._binBE.fl64[0]},writeUshort:function(m,B,h){m[B]=h&255;m[B+1]=h>>8&255},writeInt:function(m,B,h){var C=X._binBE.ui8;
X._binBE.i32[0]=h;m[B+0]=C[0];m[B+1]=C[1];m[B+2]=C[2];m[B+3]=C[3]},writeUint:function(m,B,h){m[B]=h>>>0&255;
m[B+1]=h>>>8&255;m[B+2]=h>>>16&255;m[B+3]=h>>>24&255},writeASCII:X._binBE.writeASCII};X._copyTile=function(m,B,h,C,Z,u,i,A){var d=Math.min(B,Z-i),S=Math.min(h,u-A);
for(var y=0;y<S;y++){var z=(A+y)*Z+i,t=y*B;for(var j=0;j<d;j++)C[z+j]=m[t+j]}};X.LosslessJpegDecode=function(){var m,B,h,C,Z,u,A,S,y,z;
function t(){return m[B++]}function U(){return m[B++]<<8|m[B++]}function x(){var g=t(),H=[0,0,0,255],$=[],e=8;
for(var _=0;_<16;_++)$[_]=t();for(var _=0;_<16;_++){for(var l=0;l<$[_];l++){var a8=P(H,0,_+1,1);H[a8+3]=t()}}var I=new Uint8Array(1<<e);
y[g]=[new Uint8Array(H),I];for(var _=0;_<1<<e;_++){var O=e,aI=_,b5=0,F=0;while(H[b5+3]==255&&O!=0){F=aI>>--O&1;
b5=H[b5+F]}I[_]=b5}}function P(g,H,$,e){if(g[H+3]!=255)return 0;if($==0)return H;for(var _=0;_<2;_++){if(g[H+_]==0){g[H+_]=g.length;
g.push(0,0,e,255)}var l=P(g,g[H+_],$-1,e+1);if(l!=0)return l}return 0}function L(g){var H=g.e,$=g.c;
while(H<25&&g.a<g.d){var e=g.data[g.a++];if(!g.b)g.a+=e+1>>>8;$=$<<8|e;H+=8}g.e=H;g.c=$}function r(g,H){if(H.e<g)L(H);
return H.c>>(H.e-=g)&65535>>16-g}function K(g,H){var $=g[0],e=0,_=255,l=0;if(H.e<16)L(H);var a8=H.c>>H.e-8&255;
e=g[1][a8];_=$[e+3];H.e-=$[e+2];while(_==255){l=H.c>>--H.e&1;e=$[e+l];_=$[e+3]}return _}function M(g,H){if(g<32768>>16-H)g+=-(1<<H)+1;
return g}function a(g,H){var $=K(g,H);if($==0)return 0;if($==16)return-32768;var e=r($,H);return M(e,$)}function R(g,H,$){var e=u,_=C,l=A,a8=z;
for(var I=0;I<e;I++){g[I]=a(a8[I],$)+(1<<h-1)}for(var O=e;O<H;O+=e){for(var I=0;I<e;I++)g[O+I]=a(a8[I],$)+g[O+I-e]}var aI=H;
for(var b5=1;b5<_;b5++){for(var I=0;I<e;I++){g[aI+I]=a(a8[I],$)+g[aI+I-H]}for(var O=e;O<H;O+=e){for(var I=0;
I<e;I++){var F=aI+O+I,aD=g[F-e],N=0;if(l==0)N=0;else if(l==1)N=aD;else if(l==2)N=g[F-H];else if(l==3)N=g[F-H-e];
else if(l==4)N=aD+(g[F-H]-g[F-H-e]);else if(l==5)N=aD+(g[F-H]-g[F-H-e]>>>1);else if(l==6)N=g[F-H]+(aD-g[F-H-e]>>>1);
else if(l==7)N=aD+g[F-H]>>>1;else throw l;g[F]=N+a(a8[I],$)}}aI+=H}}function n(g,H){return M(r(g,H),g)}function b(g,H,$){var e=m.length-B;
for(var _=0;_<e;_+=4){var l=m[B+_];m[B+_]=m[B+_+3];m[B+_+3]=l;var l=m[B+_+1];m[B+_+1]=m[B+_+2];m[B+_+2]=l}var a8=z[0];
for(var I=0;I<C;I++){var O=32768,aI=32768;for(var b5=0;b5<H;b5+=2){var F=K(a8,$),aD=K(a8,$);if(F!=0)O+=n(F,$);
if(aD!=0)aI+=n(aD,$);g[I*H+b5]=O&65535;g[I*H+b5+1]=aI&65535}}}function c(g){m=g;B=0;y=[],z=[];if(U()!=65496)throw"e";
while(!0){var H=U();if(H==65535){B--;continue}var $=U();if(H==65475){h=t();C=U();Z=U();u=t();S=[];for(var e=0;
e<u;e++){var _=t(),l=t();if(l!=17)throw"e";var a8=t();if(a8!=0)throw"e";S[_]=e}}else if(H==65476){var I=B+$-2;
while(B<I)x()}else if(H==65498){B++;for(var e=0;e<u;e++){var O=t();z[S[O]]=y[t()>>>4]}A=t();B+=2;break}else{B+=$-2}}var aI=h>8?Uint16Array:Uint8Array,b5=Z*u,F=new aI(C*b5),aD={e:0,c:0,b:A==8,a:B,data:m,d:m.length};
if(aD.b)b(F,b5,aD);else R(F,b5,aD);return F}return c}();(function(){var m=0,B=1,h=2,C=3,Z=4,u=5,A=6,d=7,S=8,z=9,t=10,j=11,U=12,x=13,L=14,r=15,M=16,E=17,a=18;
function o(V){var f=X._binBE.readUshort,k={m:f(V,0),f:V[2],r:V[3],a:V[4],d:f(V,5),t:f(V,7),h:f(V,9),n:f(V,11),v:V[13],p:f(V,14)};
if(k.m!=18771||k.f>1||k.d<6||k.d%6||k.h<768||k.h%24||k.n!=768||k.t<k.n||k.t%k.n||k.t-k.h>=k.n||k.v>16||k.v!=k.t/k.n||k.v!=Math.ceil(k.h/k.n)||k.p!=k.d/6||k.a!=12&&k.a!=14&&k.a!=16||k.r!=16&&k.r!=0){throw"Invalid data"}if(k.f==0){throw"Not implemented. We need this file!"}k.o=k.r==16;
k.c=(k.o?k.n*2/3:k.n>>>1)|0;k.g=k.c+2;k.q=64;k.j=(1<<k.a)-1;k.w=4*k.a;return k}function al(V,f){var k=new Array(f.v),w=16+4*f.v;
for(var Q=0,T=16;Q<f.v;T+=4){var D=X._binBE.readUint(V,T);k[Q]=V.slice(w,w+D);k[Q].l=0;k[Q].s=0;w+=D;
Q++}if(w!=V.length)throw"Invalid data";return k}function ab(V,f){for(var k=-f[4],w=0;k<=f[4];w++,k++){V[w]=k<=-f[3]?-4:k<=-f[2]?-3:k<=-f[1]?-2:k<-f[0]?-1:k<=f[0]?0:k<f[1]?1:k<f[2]?2:k<f[3]?3:4}}function R(V,f,k){var w=[f,3*f+18,5*f+67,7*f+276,k];
V.k=f;V.i=(w[4]+2*f)/(2*f+1)+1|0;V.b=Math.ceil(Math.log2(V.i));V.e=9;ab(V.u,w)}function n(V){var f={u:new Int8Array(2<<V.a)};
R(f,0,V.j);return f}function G(V){var f=[[],[],[]],k=Math.max(2,V.i+32>>>6);for(var w=0;w<3;w++){for(var Q=0;
Q<41;Q++){f[w][Q]=[k,1]}}return f}function b(V){for(var f=-1,k=0;!k;f++){k=V[V.l]>>>7-V.s&1;V.s++;V.s&=7;
if(!V.s)V.l++}return f}function c(V,f){var k=0,w=8-V.s,Q=V.l,T=V.s;if(f){if(f>=w){do{k<<=w;f-=w;k|=V[V.l]&(1<<w)-1;
V.l++;w=8}while(f>=8)}if(f){k<<=f;w-=f;k|=V[V.l]>>>w&(1<<f)-1}V.s=8-w}return k}function g(V,f){var k=0;
if(f<V){while(k<=14&&f<<++k<V);}return k}function O(V,f,k,w,Q,T,D,aK){if(aK==null)aK=0;var aj=T+1,ay=aj%2,ap=0,an=0,am=0,aN,a3,ak=w[Q],aF=w[Q-1],as=w[Q-2][aj],ar=aF[aj-1],a2=aF[aj],b1=aF[aj+1],aP=ak[aj-1],aA=ak[aj+1],aS=Math.abs,aT,v,a6,ag;
if(ay){aT=aS(b1-a2);v=aS(as-a2);a6=aS(ar-a2)}if(ay){ag=aT>a6&&v<aT?as+ar:aT<a6&&v<a6?as+b1:b1+ar;ag=ag+2*a2>>>2;
if(aK){ak[aj]=ag;return}aN=f.e*f.u[V.j+a2-as]+f.u[V.j+ar-a2]}else{ag=a2>ar&&a2>b1||a2<ar&&a2<b1?aA+aP+2*a2>>>2:aP+aA>>>1;
aN=f.e*f.u[V.j+a2-ar]+f.u[V.j+ar-aP]}a3=aS(aN);var a$=b(k);if(a$<V.w-f.b-1){var aZ=g(D[a3][0],D[a3][1]);
am=c(k,aZ)+(a$<<aZ)}else{am=c(k,f.b)+1}am=am&1?-1-(am>>>1):am>>>1;D[a3][0]+=aS(am);if(D[a3][1]==V.q){D[a3][0]>>>=1;
D[a3][1]>>>=1}D[a3][1]++;ag=aN<0?ag-am:ag+am;if(V.f){if(ag<0)ag+=f.i;else if(ag>V.j)ag-=f.i}ak[aj]=ag>=0?Math.min(ag,V.j):0}function aI(V,f,k){var w=V[0].length;
for(var Q=f;Q<=k;Q++){V[Q][0]=V[Q-1][1];V[Q][w-1]=V[Q-1][w-2]}}function aD(V){aI(V,d,U);aI(V,h,Z);aI(V,r,E)}function N(V,f,k,w,Q,T,D,aK,aj,ay,ap,an,am){var aN=0,a3=1,ak=Q<x&&Q>Z;
while(a3<V.c){if(aN<V.c){O(V,f,k,w,Q,aN,D[aj],V.o&&(ak&&ay||!ak&&(ap||(aN&an)==am)));O(V,f,k,w,T,aN,D[aj],V.o&&(!ak&&ay||ak&&(ap||(aN&an)==am)));
aN+=2}if(aN>8){O(V,f,k,w,Q,a3,aK[aj]);O(V,f,k,w,T,a3,aK[aj]);a3+=2}}aD(w)}function aJ(V,f,k,w,Q,T){N(V,f,k,w,h,d,Q,T,0,0,1,0,8);
N(V,f,k,w,S,r,Q,T,1,0,1,0,8);N(V,f,k,w,C,z,Q,T,2,1,0,3,0);N(V,f,k,w,t,M,Q,T,0,0,0,3,2);N(V,f,k,w,Z,j,Q,T,1,0,0,3,2);
N(V,f,k,w,U,E,Q,T,2,1,0,3,0)}function Y(V,f,k,w,Q,T){var D=T.length,aK=V.n;if(Q+1==V.v)aK=V.h-Q*V.n;
var aj=6*V.h*w+Q*V.n;for(var ay=0;ay<6;ay++){for(var ap=0;ap<aK;ap++){var an=T[ay%D][ap%D],am;if(an==0){am=h+(ay>>>1)}else if(an==2){am=r+(ay>>>1)}else{am=d+ay}var aN=V.o?(ap*2/3&2147483646|ap%3&1)+(ap%3>>>1):ap>>>1;
f[aj+ap]=k[am][aN+1]}aj+=V.h}}X._decompressRAF=function(V,f){var k=o(V),w=al(V,k),Q=n(k),T=new Int16Array(k.h*k.d);
if(f==null){f=k.o?[[1,1,0,1,1,2],[1,1,2,1,1,0],[2,0,1,0,2,1],[1,1,2,1,1,0],[1,1,0,1,1,2],[0,2,1,2,0,1]]:[[0,1],[3,2]]}var D=[[m,C],[B,Z],[u,j],[A,U],[x,M],[L,E]],aK=[];
for(var aj=0;aj<a;aj++){aK[aj]=new Uint16Array(k.g)}for(var ay=0;ay<k.v;ay++){var ap=G(Q),an=G(Q);for(var aj=0;
aj<a;aj++){for(var am=0;am<k.g;am++){aK[aj][am]=0}}for(var aN=0;aN<k.p;aN++){aJ(k,Q,w[ay],aK,ap,an);
for(var aj=0;aj<6;aj++){for(var am=0;am<k.g;am++){aK[D[aj][0]][am]=aK[D[aj][1]][am]}}Y(k,T,aK,aN,ay,f);
for(var aj=h;aj<a;aj++){if([u,A,x,L].indexOf(aj)==-1){for(var am=0;am<k.g;am++){aK[aj][am]=0}}}aD(aK)}}return T}}())}(X,aG))}())// (c) Dean McNamee <dean@gmail.com>, 2013.
//
// https://github.com/deanm/omggif
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.
//
// omggif is a JavaScript implementation of a GIF 89a encoder and decoder,
// including animation and compression.  It does not rely on any specific
// underlying system, so should run in the browser, Node, or Plask.

"use strict";

function GifWriter(buf, width, height, gopts) {
  var p = 0;

  var gopts = gopts === undefined ? { } : gopts;
  var loop_count = gopts.loop === undefined ? null : gopts.loop;
  var global_palette = gopts.palette === undefined ? null : gopts.palette;

  if (width <= 0 || height <= 0 || width > 65535 || height > 65535)
    throw new Error("Width/Height invalid.");

  function check_palette_and_num_colors(palette) {
    var num_colors = palette.length;
    if (num_colors < 2 || num_colors > 256 ||  num_colors & (num_colors-1)) {
      throw new Error(
          "Invalid code/color length, must be power of 2 and 2 .. 256.");
    }
    return num_colors;
  }

  // - Header.
  buf[p++] = 0x47; buf[p++] = 0x49; buf[p++] = 0x46;  // GIF
  buf[p++] = 0x38; buf[p++] = 0x39; buf[p++] = 0x61;  // 89a

  // Handling of Global Color Table (palette) and background index.
  var gp_num_colors_pow2 = 0;
  var background = 0;
  if (global_palette !== null) {
    var gp_num_colors = check_palette_and_num_colors(global_palette);
    while (gp_num_colors >>= 1) ++gp_num_colors_pow2;
    gp_num_colors = 1 << gp_num_colors_pow2;
    --gp_num_colors_pow2;
    if (gopts.background !== undefined) {
      background = gopts.background;
      if (background >= gp_num_colors)
        throw new Error("Background index out of range.");
      // The GIF spec states that a background index of 0 should be ignored, so
      // this is probably a mistake and you really want to set it to another
      // slot in the palette.  But actually in the end most browsers, etc end
      // up ignoring this almost completely (including for dispose background).
      if (background === 0)
        throw new Error("Background index explicitly passed as 0.");
    }
  }

  // - Logical Screen Descriptor.
  // NOTE(deanm): w/h apparently ignored by implementations, but set anyway.
  buf[p++] = width & 0xff; buf[p++] = width >> 8 & 0xff;
  buf[p++] = height & 0xff; buf[p++] = height >> 8 & 0xff;
  // NOTE: Indicates 0-bpp original color resolution (unused?).
  buf[p++] = (global_palette !== null ? 0x80 : 0) |  // Global Color Table Flag.
             gp_num_colors_pow2;  // NOTE: No sort flag (unused?).
  buf[p++] = background;  // Background Color Index.
  buf[p++] = 0;  // Pixel aspect ratio (unused?).

  // - Global Color Table
  if (global_palette !== null) {
    for (var i = 0, il = global_palette.length; i < il; ++i) {
      var rgb = global_palette[i];
      buf[p++] = rgb >> 16 & 0xff;
      buf[p++] = rgb >> 8 & 0xff;
      buf[p++] = rgb & 0xff;
    }
  }

  if (loop_count !== null) {  // Netscape block for looping.
    if (loop_count < 0 || loop_count > 65535)
      throw new Error("Loop count invalid.");
    // Extension code, label, and length.
    buf[p++] = 0x21; buf[p++] = 0xff; buf[p++] = 0x0b;
    // NETSCAPE2.0
    buf[p++] = 0x4e; buf[p++] = 0x45; buf[p++] = 0x54; buf[p++] = 0x53;
    buf[p++] = 0x43; buf[p++] = 0x41; buf[p++] = 0x50; buf[p++] = 0x45;
    buf[p++] = 0x32; buf[p++] = 0x2e; buf[p++] = 0x30;
    // Sub-block
    buf[p++] = 0x03; buf[p++] = 0x01;
    buf[p++] = loop_count & 0xff; buf[p++] = loop_count >> 8 & 0xff;
    buf[p++] = 0x00;  // Terminator.
  }


  var ended = false;

  this.addFrame = function(x, y, w, h, indexed_pixels, opts) {
    if (ended === true) { --p; ended = false; }  // Un-end.

    opts = opts === undefined ? { } : opts;

    // TODO(deanm): Bounds check x, y.  Do they need to be within the virtual
    // canvas width/height, I imagine?
    if (x < 0 || y < 0 || x > 65535 || y > 65535)
      throw new Error("x/y invalid.");

    if (w <= 0 || h <= 0 || w > 65535 || h > 65535)
      throw new Error("Width/Height invalid.");

    if (indexed_pixels.length < w * h)
      throw new Error("Not enough pixels for the frame size.");

    var using_local_palette = true;
    var palette = opts.palette;
    if (palette === undefined || palette === null) {
      using_local_palette = false;
      palette = global_palette;
    }

    if (palette === undefined || palette === null)
      throw new Error("Must supply either a local or global palette.");

    var num_colors = check_palette_and_num_colors(palette);

    // Compute the min_code_size (power of 2), destroying num_colors.
    var min_code_size = 0;
    while (num_colors >>= 1) ++min_code_size;
    num_colors = 1 << min_code_size;  // Now we can easily get it back.

    var delay = opts.delay === undefined ? 0 : opts.delay;

    // From the spec:
    //     0 -   No disposal specified. The decoder is
    //           not required to take any action.
    //     1 -   Do not dispose. The graphic is to be left
    //           in place.
    //     2 -   Restore to background color. The area used by the
    //           graphic must be restored to the background color.
    //     3 -   Restore to previous. The decoder is required to
    //           restore the area overwritten by the graphic with
    //           what was there prior to rendering the graphic.
    //  4-7 -    To be defined.
    // NOTE(deanm): Dispose background doesn't really work, apparently most
    // browsers ignore the background palette index and clear to transparency.
    var disposal = opts.disposal === undefined ? 0 : opts.disposal;
    if (disposal < 0 || disposal > 3)  // 4-7 is reserved.
      throw new Error("Disposal out of range.");

    var use_transparency = false;
    var transparent_index = 0;
    if (opts.transparent !== undefined && opts.transparent !== null) {
      use_transparency = true;
      transparent_index = opts.transparent;
      if (transparent_index < 0 || transparent_index >= num_colors)
        throw new Error("Transparent color index.");
    }

    if (disposal !== 0 || use_transparency || delay !== 0) {
      // - Graphics Control Extension
      buf[p++] = 0x21; buf[p++] = 0xf9;  // Extension / Label.
      buf[p++] = 4;  // Byte size.

      buf[p++] = disposal << 2 | (use_transparency === true ? 1 : 0);
      buf[p++] = delay & 0xff; buf[p++] = delay >> 8 & 0xff;
      buf[p++] = transparent_index;  // Transparent color index.
      buf[p++] = 0;  // Block Terminator.
    }

    // - Image Descriptor
    buf[p++] = 0x2c;  // Image Seperator.
    buf[p++] = x & 0xff; buf[p++] = x >> 8 & 0xff;  // Left.
    buf[p++] = y & 0xff; buf[p++] = y >> 8 & 0xff;  // Top.
    buf[p++] = w & 0xff; buf[p++] = w >> 8 & 0xff;
    buf[p++] = h & 0xff; buf[p++] = h >> 8 & 0xff;
    // NOTE: No sort flag (unused?).
    // TODO(deanm): Support interlace.
    buf[p++] = using_local_palette === true ? (0x80 | (min_code_size-1)) : 0;

    // - Local Color Table
    if (using_local_palette === true) {
      for (var i = 0, il = palette.length; i < il; ++i) {
        var rgb = palette[i];
        buf[p++] = rgb >> 16 & 0xff;
        buf[p++] = rgb >> 8 & 0xff;
        buf[p++] = rgb & 0xff;
      }
    }

    p = GifWriterOutputLZWCodeStream(
            buf, p, min_code_size < 2 ? 2 : min_code_size, indexed_pixels);

    return p;
  };

  this.end = function() {
    if (ended === false) {
      buf[p++] = 0x3b;  // Trailer.
      ended = true;
    }
    return p;
  };

  this.getOutputBuffer = function() { return buf; };
  this.setOutputBuffer = function(v) { buf = v; };
  this.getOutputBufferPosition = function() { return p; };
  this.setOutputBufferPosition = function(v) { p = v; };
}

// Main compression routine, palette indexes -> LZW code stream.
// |index_stream| must have at least one entry.
function GifWriterOutputLZWCodeStream(buf, p, min_code_size, index_stream) {
  buf[p++] = min_code_size;
  var cur_subblock = p++;  // Pointing at the length field.

  var clear_code = 1 << min_code_size;
  var code_mask = clear_code - 1;
  var eoi_code = clear_code + 1;
  var next_code = eoi_code + 1;

  var cur_code_size = min_code_size + 1;  // Number of bits per code.
  var cur_shift = 0;
  // We have at most 12-bit codes, so we should have to hold a max of 19
  // bits here (and then we would write out).
  var cur = 0;

  function emit_bytes_to_buffer(bit_block_size) {
    while (cur_shift >= bit_block_size) {
      buf[p++] = cur & 0xff;
      cur >>= 8; cur_shift -= 8;
      if (p === cur_subblock + 256) {  // Finished a subblock.
        buf[cur_subblock] = 255;
        cur_subblock = p++;
      }
    }
  }

  function emit_code(c) {
    cur |= c << cur_shift;
    cur_shift += cur_code_size;
    emit_bytes_to_buffer(8);
  }

  // I am not an expert on the topic, and I don't want to write a thesis.
  // However, it is good to outline here the basic algorithm and the few data
  // structures and optimizations here that make this implementation fast.
  // The basic idea behind LZW is to build a table of previously seen runs
  // addressed by a short id (herein called output code).  All data is
  // referenced by a code, which represents one or more values from the
  // original input stream.  All input bytes can be referenced as the same
  // value as an output code.  So if you didn't want any compression, you
  // could more or less just output the original bytes as codes (there are
  // some details to this, but it is the idea).  In order to achieve
  // compression, values greater then the input range (codes can be up to
  // 12-bit while input only 8-bit) represent a sequence of previously seen
  // inputs.  The decompressor is able to build the same mapping while
  // decoding, so there is always a shared common knowledge between the
  // encoding and decoder, which is also important for "timing" aspects like
  // how to handle variable bit width code encoding.
  //
  // One obvious but very important consequence of the table system is there
  // is always a unique id (at most 12-bits) to map the runs.  'A' might be
  // 4, then 'AA' might be 10, 'AAA' 11, 'AAAA' 12, etc.  This relationship
  // can be used for an effecient lookup strategy for the code mapping.  We
  // need to know if a run has been seen before, and be able to map that run
  // to the output code.  Since we start with known unique ids (input bytes),
  // and then from those build more unique ids (table entries), we can
  // continue this chain (almost like a linked list) to always have small
  // integer values that represent the current byte chains in the encoder.
  // This means instead of tracking the input bytes (AAAABCD) to know our
  // current state, we can track the table entry for AAAABC (it is guaranteed
  // to exist by the nature of the algorithm) and the next character D.
  // Therefor the tuple of (table_entry, byte) is guaranteed to also be
  // unique.  This allows us to create a simple lookup key for mapping input
  // sequences to codes (table indices) without having to store or search
  // any of the code sequences.  So if 'AAAA' has a table entry of 12, the
  // tuple of ('AAAA', K) for any input byte K will be unique, and can be our
  // key.  This leads to a integer value at most 20-bits, which can always
  // fit in an SMI value and be used as a fast sparse array / object key.

  // Output code for the current contents of the index buffer.
  var ib_code = index_stream[0] & code_mask;  // Load first input index.
  var code_table = { };  // Key'd on our 20-bit "tuple".

  emit_code(clear_code);  // Spec says first code should be a clear code.

  // First index already loaded, process the rest of the stream.
  for (var i = 1, il = index_stream.length; i < il; ++i) {
    var k = index_stream[i] & code_mask;
    var cur_key = ib_code << 8 | k;  // (prev, k) unique tuple.
    var cur_code = code_table[cur_key];  // buffer + k.

    // Check if we have to create a new code table entry.
    if (cur_code === undefined) {  // We don't have buffer + k.
      // Emit index buffer (without k).
      // This is an inline version of emit_code, because this is the core
      // writing routine of the compressor (and V8 cannot inline emit_code
      // because it is a closure here in a different context).  Additionally
      // we can call emit_byte_to_buffer less often, because we can have
      // 30-bits (from our 31-bit signed SMI), and we know our codes will only
      // be 12-bits, so can safely have 18-bits there without overflow.
      // emit_code(ib_code);
      cur |= ib_code << cur_shift;
      cur_shift += cur_code_size;
      while (cur_shift >= 8) {
        buf[p++] = cur & 0xff;
        cur >>= 8; cur_shift -= 8;
        if (p === cur_subblock + 256) {  // Finished a subblock.
          buf[cur_subblock] = 255;
          cur_subblock = p++;
        }
      }

      if (next_code === 4096) {  // Table full, need a clear.
        emit_code(clear_code);
        next_code = eoi_code + 1;
        cur_code_size = min_code_size + 1;
        code_table = { };
      } else {  // Table not full, insert a new entry.
        // Increase our variable bit code sizes if necessary.  This is a bit
        // tricky as it is based on "timing" between the encoding and
        // decoder.  From the encoders perspective this should happen after
        // we've already emitted the index buffer and are about to create the
        // first table entry that would overflow our current code bit size.
        if (next_code >= (1 << cur_code_size)) ++cur_code_size;
        code_table[cur_key] = next_code++;  // Insert into code table.
      }

      ib_code = k;  // Index buffer to single input k.
    } else {
      ib_code = cur_code;  // Index buffer to sequence in code table.
    }
  }

  emit_code(ib_code);  // There will still be something in the index buffer.
  emit_code(eoi_code);  // End Of Information.

  // Flush / finalize the sub-blocks stream to the buffer.
  emit_bytes_to_buffer(1);

  // Finish the sub-blocks, writing out any unfinished lengths and
  // terminating with a sub-block of length 0.  If we have already started
  // but not yet used a sub-block it can just become the terminator.
  if (cur_subblock + 1 === p) {  // Started but unused.
    buf[cur_subblock] = 0;
  } else {  // Started and used, write length and additional terminator block.
    buf[cur_subblock] = p - cur_subblock - 1;
    buf[p++] = 0;
  }
  return p;
};

var UGIF=function(){var a=function(){var j,F,c,b,H=0,k=0,Z=0,P=0,l=function(){var R=j>>>3,i=F[R+2]<<16|F[R+1]<<8|F[R],M=i>>>(j&7)&(1<<k)-1;
j+=k;return M},e=new Uint32Array(4096*4),V=0,W=function(R){if(R==V)return;V=R;Z=1<<R;P=Z+1;for(var i=0;
i<P+1;i++){e[4*i]=e[4*i+3]=i;e[4*i+1]=65535;e[4*i+2]=1}},G=function(R){k=R+1;H=P+1},Q=function(R){var i=R<<2,M=e[i+2],v=b+M-1;
while(i!=65535){c[v--]=e[i];i=e[i+1]}b+=M},L=function(R,i){var M=H<<2,v=R<<2;e[M]=e[(i<<2)+3];e[M+1]=v;
e[M+2]=e[v+2]+1;e[M+3]=e[v+3];H++;if(H==1<<k&&k!=12)k++},s=function(R,i,M,v,t,q){j=i<<3;F=R;c=v;b=t;
var g=i+M<<3,r=0,p=0;W(q);G(q);while(j<g&&(r=l())!=P){if(r==Z){G(q);r=l();if(r==P)break;Q(r)}else{if(r<H){Q(r);
L(p,r)}else{L(p,p);Q(H-1)}}p=r}return b};return s}(),O,f,E=new Uint8Array(128),B=function(){return O[f++]},A=function(){var j=O[f+1]<<8|O[f];
f+=2;return j},U=function(){while(O[f]!=0)f+=1+O[f];f++},d=function(j){O=new Uint8Array(j);f=6;var F=A(),c=A(),b=B(),H=B(),k=B(),Z=b>>>7,P=b>>>4&7,X=b>>>3&1,l=b>>>0&7,m=f,e=0,V,W=0,G=0,C=0,z=260;
if(Z==1)f+=3*(1<<l+1);var T=[];while(f+1<O.length){var Q=B();if(Q==33){var L=B();if(L==249){var s=B(),b=B();
W=b>>>2&7;G=A();z=B();if((b&1)==0)z=260;B()}else if(L==254){U()}else if(L==255){U()}else throw L}else if(Q==44){var R=A(),i=A(),M=A(),v=A(),t=B(),q=t>>>7;
C=t>>>6&1;if(q==1){var l=t>>>0&7;e=f;f+=3*(1<<l+1)}V={x:R,y:i,a:M,O:v,f:W,delay:G,B:z,A:e==0?m:e,U:C};
T.push(V);e=0}else if(Q<=8){var M=V.a,v=V.O,S=M*v,Y=0;if(E.length<S*1.2)E=new Uint8Array(~~(S*1.3));
while(f<O.length&&O[f]!=0){var J=B();for(var g=0;g<J;g++)E[Y+g]=O[f+g];Y+=J;f+=J}if(f>=O.length){alert("Some frames are damaged.");
T.pop();break}B();V.d=new Uint8Array(S);var r=a(E,0,Y,V.d,0,Q)}else if(Q==59)break;else throw Q}return{width:F,height:c,data:O,frames:T}};
function D(j,F,O,c,b,H,k,Z){for(var P=0;P<k;P++){var X=b[H+P];if(X!=Z){var l=F+P<<2,m=c+X*3;j[l]=O[m];
j[l+1]=O[m+1];j[l+2]=O[m+2];j[l+3]=255}}}var w=function(j){var F=j.frames,c=j.width,b=j.height,H=new Uint8Array(c*b*4),k,Z=[],O=j.data;
for(var P=0;P<F.length;P++){var X=F[P],l=X.x,m=X.y,e=X.a,T=X.O,V=X.f;if(V==3){if(k==null)k=H.slice(0);
else k.set(H)}var W=[];if(X.U==1){for(var G=0;G<T;G+=8)W.push(G);for(var G=4;G<T;G+=8)W.push(G);for(var G=2;
G<T;G+=4)W.push(G);for(var G=1;G<T;G+=2)W.push(G)}var C=X.d,z=X.A,Q=X.B,L=X.U;for(var G=0;G<T;G++){var s=L==0?G:W[G];
D(H,(s+m)*c+l,O,z,C,G*e,e,Q)}Z.push(H.slice(0).buffer);if(V<2){}else if(V==2){for(var G=0;G<T;G++){var R=((m+G)*c+l)*4;
H.fill(0,R,R+e*4)}}else if(V==3)H.set(k)}return Z};return{decode:d,toRGBA8:w}}()/**
 * Gauss-Jordan elimination
 */

var linear = (function(){
/**
 * Used internally to solve systems
 * If you want to solve A.x = B,
 * choose data=A and mirror=B.
 * mirror can be either an array representing a vector
 * or an array of arrays representing a matrix.
 */
function Mat(data, mirror) {
  // Clone the original matrix
  this.data = new Array(data.length);
  for (var i=0, cols=data[0].length; i<data.length; i++) {
    this.data[i] = new Array(cols);
    for(var j=0; j<cols; j++) {
      this.data[i][j] = data[i][j];
    }
  }

  if (mirror) {
    if (typeof mirror[0] !== "object") {
      for (var i=0; i<mirror.length; i++) {
        mirror[i] = [mirror[i]];
      }
    }
    this.mirror = new Mat(mirror);
  }
}

/**
 * Swap lines i and j in the matrix
 */
Mat.prototype.swap = function (i, j) {
  if (this.mirror) this.mirror.swap(i,j);
  var tmp = this.data[i];
  this.data[i] = this.data[j];
  this.data[j] = tmp;
}

/**
 * Multiply line number i by l
 */
Mat.prototype.multline = function (i, l) {
  if (this.mirror) this.mirror.multline(i,l);
  var line = this.data[i];
  for (var k=line.length-1; k>=0; k--) {
    line[k] *= l;
  }
}

/**
 * Add line number j multiplied by l to line number i
 */
Mat.prototype.addmul = function (i, j, l) {
  if (this.mirror) this.mirror.addmul(i,j,l);
  var lineI = this.data[i], lineJ = this.data[j];
  for (var k=lineI.length-1; k>=0; k--) {
    lineI[k] = lineI[k] + l*lineJ[k];
  }
}

/**
 * Tests if line number i is composed only of zeroes
 */
Mat.prototype.hasNullLine = function (i) {
  for (var j=0; j<this.data[i].length; j++) {
    if (this.data[i][j] !== 0) {
      return false;
    }
  }
  return true;
}

Mat.prototype.gauss = function() {
  var pivot = 0,
      lines = this.data.length,
      columns = this.data[0].length,
      nullLines = [];

  for (var j=0; j<columns; j++) {
    // Find the line on which there is the maximum value of column j
    var maxValue = 0, maxLine = 0;
    for (var k=pivot; k<lines; k++) {
      var val = this.data[k][j];
      if (Math.abs(val) > Math.abs(maxValue)) {
        maxLine = k;
        maxValue = val;
      } 
    }
    if (maxValue === 0) {
      // The matrix is not invertible. The system may still have solutions.
      nullLines.push(pivot);
    } else {
      // The value of the pivot is maxValue
      this.multline(maxLine, 1/maxValue);
      this.swap(maxLine, pivot);
      for (var i=0; i<lines; i++) {
        if (i !== pivot) {
          this.addmul(i, pivot, -this.data[i][j]);
        }
      }
    }
    pivot++;
  }

  // Check that the system has null lines where it should
  for (var i=0; i<nullLines.length; i++) {
    if (!this.mirror.hasNullLine(nullLines[i])) {
      throw new Error("singular matrix");
    }
  }
  return this.mirror.data;
}

/**
 * Solves A.x = b
 * @param A
 * @param b
 * @return x
 */
 var exports = {};
exports.solve = function solve(A, b) {
  var result = new Mat(A,b).gauss();
  if (result.length > 0 && result[0].length === 1) {
    // Convert Nx1 matrices to simple javascript arrays
    for (var i=0; i<result.length; i++) result[i] = result[i][0];
  }
  return result;
}

function identity(n) {
  var id = new Array(n);
  for (var i=0; i<n; i++) {
    id[i] = new Array(n);
    for (var j=0; j<n; j++) {
      id[i][j] = (i === j) ? 1 : 0;
    }
  }
  return id;
}

/**
 * invert a matrix
 */
exports.invert = function invert(A) {
  return new Mat(A, identity(A.length)).gauss();
}

return exports;
})();

var Typr=function(){var B={};B.parse=function(o){var l=function(K,O,x,w){var F=B.B,L=B.T,j={cmap:L.g,head:L.head,hhea:L.b4,maxp:L.ax,hmtx:L.aV,name:L.name,"OS/2":L.H,post:L.b6,loca:L.aA,kern:L.Z,glyf:L.O,"CFF ":L.d,CBLC:L.at,CBDT:L.aC,"SVG ":L.a3,COLR:L.aK,CPAL:L.aP,sbix:L.b2},H={_data:K,_index:O,_offset:x};
for(var g in j){var d=B.findTable(K,g,x);if(d){var e=d[0],U=w[e];if(U==null)U=j[g].M(K,e,d[1],H);H[g]=w[e]=U}}return H},F=B.B,K=new Uint8Array(o),w={},y=F.m(K,0,4);
if(y=="ttcf"){var x=4,S=F.K(K,x);x+=2;var f=F.K(K,x);x+=2;var N=F.e(K,x);x+=4;var A=[];for(var X=0;X<N;
X++){var G=F.e(K,x);x+=4;A.push(l(K,X,G,w))}return A}else return[l(K,0,0,w)]};B.findTable=function(o,l,F){var K=B.B,w=K.K(o,F+4),y=F+12;
for(var x=0;x<w;x++){var f=K.m(o,y,4),N=K.e(o,y+4),A=K.e(o,y+8),X=K.e(o,y+12);if(f==l)return[A,X];y+=16}return null};
B.T={};B.B={X:function(o,l){return(o[l]<<8|o[l+1])+(o[l+2]<<8|o[l+3])/(256*256+4)},_:function(o,l){var F=B.B.q(o,l);
return F/16384},C:function(o,l){var F=B.B.c.o;F[0]=o[l+3];F[1]=o[l+2];F[2]=o[l+1];F[3]=o[l];return B.B.c.aa[0]},Y:function(o,l){var F=B.B.c.o;
F[0]=o[l];return B.B.c.aE[0]},q:function(o,l){var F=B.B.c.o;F[1]=o[l];F[0]=o[l+1];return B.B.c.aH[0]},K:function(o,l){return o[l]<<8|o[l+1]},aM:function(o,l,F){o[l]=F>>8&255;
o[l+1]=F&255},an:function(o,l,F){var K=[];for(var w=0;w<F;w++){var y=B.B.K(o,l+w*2);K.push(y)}return K},e:function(o,l){var F=B.B.c.o;
F[3]=o[l];F[2]=o[l+1];F[1]=o[l+2];F[0]=o[l+3];return B.B.c.ai[0]},a9:function(o,l,F){o[l]=F>>24&255;
o[l+1]=F>>16&255;o[l+2]=F>>8&255;o[l+3]=F>>0&255},V:function(o,l){return B.B.e(o,l)*(4294967295+1)+B.B.e(o,l+4)},m:function(o,l,F){var K="";
for(var w=0;w<F;w++)K+=String.fromCharCode(o[l+w]);return K},b7:function(o,l,F){for(var K=0;K<F.length;
K++)o[l+K]=F.charCodeAt(K)},f:function(o,l,F){var K="";for(var w=0;w<F;w++){var y=o[l++]<<8|o[l++];K+=String.fromCharCode(y)}return K},aN:window.TextDecoder?new window.TextDecoder:null,ag:function(o,l,F){var K=B.B.aN;
if(K&&l==0&&F==o.length)return K.decode(o);return B.B.m(o,l,F)},P:function(o,l,F){var K=[];for(var w=0;
w<F;w++)K.push(o[l+w]);return K},a5:function(o,l,F){var K=[];for(var w=0;w<F;w++)K.push(String.fromCharCode(o[l+w]));
return K},c:function(){var o=new ArrayBuffer(8);return{am:o,aE:new Int8Array(o),o:new Uint8Array(o),aH:new Int16Array(o),au:new Uint16Array(o),aa:new Int32Array(o),ai:new Uint32Array(o)}}()};
B.T.d={M:function(o,l,F){var K=B.B,w=B.T.d;o=new Uint8Array(o.buffer,l,F);l=0;var y=o[l];l++;var x=o[l];
l++;var S=o[l];l++;var f=o[l];l++;var N=[];l=w.B(o,l,N);var A=[];for(var X=0;X<N.length-1;X++)A.push(K.m(o,l+N[X],N[X+1]-N[X]));
l+=N[N.length-1];var G=[];l=w.B(o,l,G);var O=[];for(var X=0;X<G.length-1;X++)O.push(w.r(o,l+G[X],l+G[X+1]));
l+=G[G.length-1];var L=O[0],j=[];l=w.B(o,l,j);var H=[];for(var X=0;X<j.length-1;X++)H.push(K.m(o,l+j[X],j[X+1]-j[X]));
l+=j[j.length-1];w.w(o,l,L);if(L.CharStrings)L.CharStrings=w.P(o,L.CharStrings);if(L.ROS){l=L.FDArray;
var g=[];l=w.B(o,l,g);L.FDArray=[];for(var X=0;X<g.length-1;X++){var T=w.r(o,l+g[X],l+g[X+1]);w.R(o,T,H);
L.FDArray.push(T)}l+=g[g.length-1];l=L.FDSelect;L.FDSelect=[];var d=o[l];l++;if(d==3){var e=K.K(o,l);
l+=2;for(var X=0;X<e+1;X++){L.FDSelect.push(K.K(o,l),o[l+2]);l+=3}}else throw d}if(L.charset)L.charset=w.aJ(o,L.charset,L.CharStrings.length);
w.R(o,L,H);return L},R:function(o,l,F){var K=B.T.d,w;if(l.Private){w=l.Private[1];l.Private=K.r(o,w,w+l.Private[0]);
if(l.Private.Subrs)K.w(o,w+l.Private.Subrs,l.Private)}for(var y in l)if("FamilyName FontName FullName Notice version Copyright".split(" ").indexOf(y)!=-1)l[y]=F[l[y]-426+35]},w:function(o,l,F){F.Subrs=B.T.d.P(o,l);
var K,w=F.Subrs.length+1;if(!1)K=0;else if(w<1240)K=107;else if(w<33900)K=1131;else K=32768;F.Bias=K},P:function(o,l){var F=B.B,K=[];
l=B.T.d.B(o,l,K);var w=[],y=K.length-1,x=o.byteOffset+l;for(var S=0;S<y;S++){var f=K[S];w.push(new Uint8Array(o.buffer,x+f,K[S+1]-f))}return w},a7:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,0,111,112,113,114,0,115,116,117,118,119,120,121,122,0,123,0,124,125,126,127,128,129,130,131,0,132,133,0,134,135,136,137,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,0,139,0,0,0,0,140,141,142,143,0,0,0,0,0,144,0,0,0,145,0,0,146,147,148,149,0,0,0,0],aI:function(o,l){for(var F=0;
F<o.charset.length;F++)if(o.charset[F]==l)return F;return-1},s:function(o,l){if(l<0||l>255)return-1;
return B.T.d.aI(o,B.T.d.a7[l])},aJ:function(o,l,F){var K=B.B,w=[".notdef"],y=o[l];l++;if(y==0){for(var x=0;
x<F;x++){var f=K.K(o,l);l+=2;w.push(f)}}else if(y==1||y==2){while(w.length<F){var f=K.K(o,l),N=0;l+=2;
if(y==1){N=o[l];l++}else{N=K.K(o,l);l+=2}for(var x=0;x<=N;x++){w.push(f);f++}}}else throw"error: format: "+y;
return w},B:function(o,l,F){var K=B.B,w=K.K(o,l)+1;l+=2;var y=o[l];l++;if(y==1)for(var x=0;x<w;x++)F.push(o[l+x]);
else if(y==2)for(var x=0;x<w;x++)F.push(K.K(o,l+x*2));else if(y==3)for(var x=0;x<w;x++)F.push(K.e(o,l+x*3-1)&16777215);
else if(y==4)for(var x=0;x<w;x++)F.push(K.e(o,l+x*4));else if(w!=1)throw"unsupported offset size: "+y+", count: "+w;
l+=w*y;return l-1},aW:function(o,l,F){var K=B.B,w=o[l],y=o[l+1],x=o[l+2],S=o[l+3],f=o[l+4],N=1,A=null,X=null;
if(w<=20){A=w;N=1}if(w==12){A=w*100+y;N=2}if(21<=w&&w<=27){A=w;N=1}if(w==28){X=K.q(o,l+1);N=3}if(29<=w&&w<=31){A=w;
N=1}if(32<=w&&w<=246){X=w-139;N=1}if(247<=w&&w<=250){X=(w-247)*256+y+108;N=2}if(251<=w&&w<=254){X=-(w-251)*256-y-108;
N=2}if(w==255){X=K.C(o,l+1)/65535;N=5}F.aR=X!=null?X:"o"+A;F.size=N},ao:function(o,l,F){var K=l+F,w=B.B,y=[];
while(l<K){var x=o[l],S=o[l+1],f=o[l+2],N=o[l+3],A=o[l+4],X=1,G=null,O=null;if(x<=20){G=x;X=1}if(x==12){G=x*100+S;
X=2}if(x==19||x==20){G=x;X=2}if(21<=x&&x<=27){G=x;X=1}if(x==28){O=w.q(o,l+1);X=3}if(29<=x&&x<=31){G=x;
X=1}if(32<=x&&x<=246){O=x-139;X=1}if(247<=x&&x<=250){O=(x-247)*256+S+108;X=2}if(251<=x&&x<=254){O=-(x-251)*256-S-108;
X=2}if(x==255){O=w.C(o,l+1)/65535;X=5}y.push(O!=null?O:"o"+G);l+=X}return y},r:function(o,l,F){var K=B.B,w={},y=[];
while(l<F){var x=o[l],S=o[l+1],f=o[l+2],N=o[l+3],A=o[l+4],X=1,G=null,O=null;if(x==28){O=K.q(o,l+1);X=3}if(x==29){O=K.C(o,l+1);
X=5}if(32<=x&&x<=246){O=x-139;X=1}if(247<=x&&x<=250){O=(x-247)*256+S+108;X=2}if(251<=x&&x<=254){O=-(x-251)*256-S-108;
X=2}if(x==255){O=K.C(o,l+1)/65535;X=5;throw"unknown number"}if(x==30){var L=[],T="";X=1;while(!0){var j=o[l+X];
X++;var H=j>>4,g=j&15;if(H!=15)L.push(H);if(g!=15)L.push(g);if(g==15)break}var d=[0,1,2,3,4,5,6,7,8,9,".","e","e-","reserved","-","endOfNumber"];
for(var e=0;e<L.length;e++)T+=d[L[e]];O=parseFloat(T)}if(x<=21){var U="version Notice FullName FamilyName Weight FontBBox BlueValues OtherBlues FamilyBlues FamilyOtherBlues StdHW StdVW escape UniqueID XUID charset Encoding CharStrings Private Subrs defaultWidthX nominalWidthX".split(" ");
G=U[x];X=1;if(x==12){var U="Copyright isFixedPitch ItalicAngle UnderlinePosition UnderlineThickness PaintType CharstringType FontMatrix StrokeWidth BlueScale BlueShift BlueFuzz StemSnapH StemSnapV ForceBold   LanguageGroup ExpansionFactor initialRandomSeed SyntheticBase PostScript BaseFontName BaseFontBlend       ROS CIDFontVersion CIDFontRevision CIDFontType CIDCount UIDBase FDArray FDSelect FontName".split(" ");
G=U[S];X=2}}if(G!=null){w[G]=y.length==1?y[0]:y;y=[]}else y.push(O);l+=X}return w}};B.T.g={M:function(o,l,F){var K={u:[],Q:{},a0:l};
o=new Uint8Array(o.buffer,l,F);l=0;var w=l,y=B.B,x=y.K,S=B.T.g,f=x(o,l);l+=2;var N=x(o,l);l+=2;var A=[];
for(var X=0;X<N;X++){var G=x(o,l);l+=2;var O=x(o,l);l+=2;var L=y.e(o,l);l+=4;var j="p"+G+"e"+O,H=A.indexOf(L);
if(H==-1){H=K.u.length;var g={};A.push(L);var T=g.a$=x(o,L);if(T==0)g=S.aw(o,L,g);else if(T==4)g=S.a6(o,L,g);
else if(T==6)g=S.b8(o,L,g);else if(T==12)g=S.ay(o,L,g);K.u.push(g)}if(K.Q[j]!=null)console.log("multiple tables for one platform+encoding: "+j);
K.Q[j]=H}return K},aw:function(o,l,F){var K=B.B;l+=2;var w=K.K(o,l);l+=2;var y=K.K(o,l);l+=2;F.map=[];
for(var x=0;x<w-6;x++)F.map.push(o[l+x]);return F},a6:function(o,l,F){var K=B.B,w=K.K,y=K.an,x=l;l+=2;
var S=w(o,l);l+=2;var f=w(o,l);l+=2;var N=w(o,l);l+=2;var A=N>>>1;F.ap=w(o,l);l+=2;F.aL=w(o,l);l+=2;
F.a8=w(o,l);l+=2;F.aq=y(o,l,A);l+=A*2;l+=2;F.aD=y(o,l,A);l+=A*2;F.b3=[];for(var X=0;X<A;X++){F.b3.push(K.q(o,l));
l+=2}F.b=y(o,l,A);l+=A*2;F.j=y(o,l,x+S-l>>>1);return F},b8:function(o,l,F){var K=B.B,w=l;l+=2;var y=K.K(o,l);
l+=2;var x=K.K(o,l);l+=2;F.av=K.K(o,l);l+=2;var S=K.K(o,l);l+=2;F.j=[];for(var f=0;f<S;f++){F.j.push(K.K(o,l));
l+=2}return F},ay:function(o,l,F){var K=B.B,w=K.e,y=l;l+=4;var x=w(o,l);l+=4;var S=w(o,l);l+=4;var f=w(o,l)*3;
l+=4;var N=F.ar=new Uint32Array(f);for(var A=0;A<f;A+=3){N[A]=w(o,l+(A<<2));N[A+1]=w(o,l+(A<<2)+4);N[A+2]=w(o,l+(A<<2)+8)}return F}};
B.T.at={M:function(o,l,F){var K=B.B,w=l,y=K.K(o,l);l+=2;var x=K.K(o,l);l+=2;var S=K.e(o,l);l+=4;var f=[];
for(var N=0;N<S;N++){var A=K.e(o,l);l+=4;var X=K.e(o,l);l+=4;var G=K.e(o,l);l+=4;l+=4;l+=2*12;var O=K.K(o,l);
l+=2;var L=K.K(o,l);l+=2;l+=4;var j=w+A;for(var H=0;H<3;H++){var g=K.K(o,j);j+=2;var T=K.K(o,j);j+=2;
var d=K.e(o,j);j+=4;var e=T-g+1,U=w+A+d,i=K.K(o,U);U+=2;if(i!=1)throw i;var I=K.K(o,U);U+=2;var Y=K.e(o,U);
U+=4;var n=[];for(var $=0;$<e;$++){var k=K.e(o,U+$*4);n.push(Y+k)}f.push([g,T,I,n])}}return f}};B.T.aC={M:function(o,l,F){var K=B.B,w=l;
return new Uint8Array(o.buffer,o.byteOffset+l,F)}};B.T.O={M:function(o,l,F,K){var w=[],y=K.maxp.numGlyphs;
for(var x=0;x<y;x++)w.push(null);return w},ac:function(o,l){var F=B.B,K=o._data,w=o.loca;if(w[l]==w[l+1])return null;
var x=B.findTable(K,"glyf",o._offset)[0]+w[l],S={};S.a=F.q(K,x);x+=2;S.az=F.q(K,x);x+=2;S.a1=F.q(K,x);
x+=2;S.aZ=F.q(K,x);x+=2;S.a_=F.q(K,x);x+=2;if(S.az>=S.aZ||S.a1>=S.a_)return null;if(S.a>0){S.i=[];for(var f=0;
f<S.a;f++){S.i.push(F.K(K,x));x+=2}var N=F.K(K,x),H=0,g=0;x+=2;if(K.length-x<N)return null;S.ad=F.P(K,x,N);
x+=N;var A=S.i[S.a-1]+1;S.S=[];for(var f=0;f<A;f++){var X=K[x];x++;S.S.push(X);if((X&8)!=0){var G=K[x];
x++;for(var O=0;O<G;O++){S.S.push(X);f++}}}S.v=[];for(var f=0;f<A;f++){var L=(S.S[f]&2)!=0,j=(S.S[f]&16)!=0;
if(L){S.v.push(j?K[x]:-K[x]);x++}else{if(j)S.v.push(0);else{S.v.push(F.q(K,x));x+=2}}}S.J=[];for(var f=0;
f<A;f++){var L=(S.S[f]&4)!=0,j=(S.S[f]&32)!=0;if(L){S.J.push(j?K[x]:-K[x]);x++}else{if(j)S.J.push(0);
else{S.J.push(F.q(K,x));x+=2}}}for(var f=0;f<A;f++){H+=S.v[f];g+=S.J[f];S.v[f]=H;S.J[f]=g}}else{var T=1<<0,d=1<<1,e=1<<2,U=1<<3,Y=1<<4,n=1<<5,$=1<<6,k=1<<7,m=1<<8,u=1<<9,v=1<<10,D=1<<11,J=1<<12,C;
S.I=[];do{C=F.K(K,x);x+=2;var P={N:{n:1,a2:0,a4:0,$:1,b5:0,al:0},aO:-1,aY:-1};S.I.push(P);P.ak=F.K(K,x);
x+=2;if(C&T){var q=F.q(K,x);x+=2;var r=F.q(K,x);x+=2}else{var q=F.Y(K,x);x++;var r=F.Y(K,x);x++}if(C&d){P.N.b5=q;
P.N.al=r}else{P.aO=q;P.aY=r}if(C&U){P.N.n=P.N.$=F._(K,x);x+=2}else if(C&$){P.N.n=F._(K,x);x+=2;P.N.$=F._(K,x);
x+=2}else if(C&k){P.N.n=F._(K,x);x+=2;P.N.a2=F._(K,x);x+=2;P.N.a4=F._(K,x);x+=2;P.N.$=F._(K,x);x+=2}}while(C&n);
if(C&m){var ap=F.K(K,x);x+=2;S.aS=[];for(var f=0;f<ap;f++){S.aS.push(K[x]);x++}}}return S}};B.T.head={M:function(o,l,F){var K=B.B,w={},y=K.X(o,l);
l+=4;w.fontRevision=K.X(o,l);l+=4;var x=K.e(o,l);l+=4;var S=K.e(o,l);l+=4;w.flags=K.K(o,l);l+=2;w.unitsPerEm=K.K(o,l);
l+=2;w.created=K.V(o,l);l+=8;w.modified=K.V(o,l);l+=8;w.xMin=K.q(o,l);l+=2;w.yMin=K.q(o,l);l+=2;w.xMax=K.q(o,l);
l+=2;w.yMax=K.q(o,l);l+=2;w.macStyle=K.K(o,l);l+=2;w.lowestRecPPEM=K.K(o,l);l+=2;w.fontDirectionHint=K.q(o,l);
l+=2;w.indexToLocFormat=K.q(o,l);l+=2;w.glyphDataFormat=K.q(o,l);l+=2;return w}};B.T.b4={M:function(o,l,F){var K=B.B,w={},y=K.X(o,l);
l+=4;var x="ascender descender lineGap advanceWidthMax minLeftSideBearing minRightSideBearing xMaxExtent caretSlopeRise caretSlopeRun caretOffset res0 res1 res2 res3 metricDataFormat numberOfHMetrics".split(" ");
for(var S=0;S<x.length;S++){var f=x[S],N=f=="advanceWidthMax"||f=="numberOfHMetrics"?K.K:K.q;w[f]=N(o,l+S*2)}return w}};
B.T.aV={M:function(o,l,F,K){var w=B.B,y=[],x=[],S=K.maxp.numGlyphs,f=K.hhea.numberOfHMetrics,N=0,A=0,X=0;
while(X<f){N=w.K(o,l+(X<<2));A=w.q(o,l+(X<<2)+2);y.push(N);x.push(A);X++}while(X<S){y.push(N);x.push(A);
X++}return{aB:y,b1:x}}};B.T.Z={M:function(o,l,F,K){var w=B.B,y=B.T.Z,x=w.K(o,l);if(x==1)return y.ae(o,l,F,K);
var S=w.K(o,l+2);l+=4;var f={G:[],T:[]};for(var N=0;N<S;N++){l+=2;var F=w.K(o,l);l+=2;var A=w.K(o,l);
l+=2;var X=A>>>8;X&=15;if(X==0)l=y.L(o,l,f)}return f},ae:function(o,l,F,K){var w=B.B,y=B.T.Z,x=w.X(o,l),S=w.e(o,l+4);
l+=8;var f={G:[],T:[]};for(var N=0;N<S;N++){var F=w.e(o,l);l+=4;var A=w.K(o,l);l+=2;var X=w.K(o,l);l+=2;
var G=A&255;if(G==0)l=y.L(o,l,f)}return f},L:function(o,l,F){var K=B.B,w=K.K,y=-1,x=w(o,l),S=w(o,l+2),f=w(o,l+4),N=w(o,l+6);
l+=8;for(var A=0;A<x;A++){var X=w(o,l);l+=2;var G=w(o,l);l+=2;var O=K.q(o,l);l+=2;if(X!=y){F.G.push(X);
F.T.push({aQ:[],as:[]})}var L=F.T[F.T.length-1];L.aQ.push(G);L.as.push(O);y=X}return l}};B.T.aA={M:function(o,l,F,K){var w=B.B,y=[],x=K.head.indexToLocFormat,S=K.maxp.numGlyphs+1;
if(x==0)for(var f=0;f<S;f++)y.push(w.K(o,l+(f<<1))<<1);if(x==1)for(var f=0;f<S;f++)y.push(w.e(o,l+(f<<2)));
return y}};B.T.ax={M:function(o,l,F){var K=B.B,w=K.K,y={},x=K.e(o,l);l+=4;y.numGlyphs=w(o,l);l+=2;return y}};
B.T.name={M:function(o,l,F){var K=B.B,w={},y=K.K(o,l),U="postScriptName",I;l+=2;var x=K.K(o,l);l+=2;
var S=K.K(o,l);l+=2;var f="copyright fontFamily fontSubfamily ID fullName version postScriptName trademark manufacturer designer description urlVendor urlDesigner licence licenceURL --- typoFamilyName typoSubfamilyName compatibleFull sampleText postScriptCID wwsFamilyName wwsSubfamilyName lightPalette darkPalette".split(" "),N=l,A=K.K;
for(var X=0;X<x;X++){var G=A(o,l),d;l+=2;var O=A(o,l);l+=2;var L=A(o,l);l+=2;var j=A(o,l);l+=2;var H=A(o,l);
l+=2;var g=A(o,l);l+=2;var T=N+x*12+g;if(!1){}else if(G==0)d=K.f(o,T,H/2);else if(G==3&&O==0)d=K.f(o,T,H/2);
else if(O==0)d=K.m(o,T,H);else if(O==1)d=K.f(o,T,H/2);else if(O==3)d=K.f(o,T,H/2);else if(O==4)d=K.f(o,T,H/2);
else if(O==5)d=K.f(o,T,H/2);else if(O==10)d=K.f(o,T,H/2);else if(G==1){d=K.m(o,T,H);console.log("reading unknown MAC encoding "+O+" as ASCII")}else{console.log("unknown encoding "+O+", platformID: "+G);
d=K.m(o,T,H)}var e="p"+G+","+L.toString(16);if(w[e]==null)w[e]={};w[e][f[j]]=d;w[e]._lang=L}for(var i in w)if(w[i][U]!=null&&w[i]._lang==1033)return w[i];
for(var i in w)if(w[i][U]!=null&&w[i]._lang==0)return w[i];for(var i in w)if(w[i][U]!=null&&w[i]._lang==3084)return w[i];
for(var i in w)if(w[i][U]!=null)return w[i];for(var i in w){I=w[i];break}console.log("returning name table with languageID "+I.b0);
if(I[U]==null&&I.ID!=null)I[U]=I.ID;return I}};B.T.H={M:function(o,l,F){var K=B.B,w=K.K(o,l);l+=2;var y=B.T.H,x={};
if(w==0)y.A(o,l,x);else if(w==1)y.z(o,l,x);else if(w==2||w==3||w==4)y.ah(o,l,x);else if(w==5)y.ab(o,l,x);
else throw"unknown OS/2 table version: "+w;return x},A:function(o,l,F){var K=B.B;F.xAvgCharWidth=K.q(o,l);
l+=2;F.usWeightClass=K.K(o,l);l+=2;F.usWidthClass=K.K(o,l);l+=2;F.fsType=K.K(o,l);l+=2;F.ySubscriptXSize=K.q(o,l);
l+=2;F.ySubscriptYSize=K.q(o,l);l+=2;F.ySubscriptXOffset=K.q(o,l);l+=2;F.ySubscriptYOffset=K.q(o,l);
l+=2;F.ySuperscriptXSize=K.q(o,l);l+=2;F.ySuperscriptYSize=K.q(o,l);l+=2;F.ySuperscriptXOffset=K.q(o,l);
l+=2;F.ySuperscriptYOffset=K.q(o,l);l+=2;F.yStrikeoutSize=K.q(o,l);l+=2;F.yStrikeoutPosition=K.q(o,l);
l+=2;F.sFamilyClass=K.q(o,l);l+=2;F.panose=K.P(o,l,10);l+=10;F.ulUnicodeRange1=K.e(o,l);l+=4;F.ulUnicodeRange2=K.e(o,l);
l+=4;F.ulUnicodeRange3=K.e(o,l);l+=4;F.ulUnicodeRange4=K.e(o,l);l+=4;F.achVendID=K.m(o,l,4);l+=4;F.fsSelection=K.K(o,l);
l+=2;F.usFirstCharIndex=K.K(o,l);l+=2;F.usLastCharIndex=K.K(o,l);l+=2;F.sTypoAscender=K.q(o,l);l+=2;
F.sTypoDescender=K.q(o,l);l+=2;F.sTypoLineGap=K.q(o,l);l+=2;F.usWinAscent=K.K(o,l);l+=2;F.usWinDescent=K.K(o,l);
l+=2;return l},z:function(o,l,F){var K=B.B;l=B.T.H.A(o,l,F);F.ulCodePageRange1=K.e(o,l);l+=4;F.ulCodePageRange2=K.e(o,l);
l+=4;return l},ah:function(o,l,F){var K=B.B,w=K.K;l=B.T.H.z(o,l,F);F.sxHeight=K.q(o,l);l+=2;F.sCapHeight=K.q(o,l);
l+=2;F.usDefault=w(o,l);l+=2;F.usBreak=w(o,l);l+=2;F.usMaxContext=w(o,l);l+=2;return l},ab:function(o,l,F){var K=B.B.K;
l=B.T.H.ah(o,l,F);F.usLowerOpticalPointSize=K(o,l);l+=2;F.usUpperOpticalPointSize=K(o,l);l+=2;return l}};
B.T.b6={M:function(o,l,F){var K=B.B,w={};w.version=K.X(o,l);l+=4;w.italicAngle=K.X(o,l);l+=4;w.underlinePosition=K.q(o,l);
l+=2;w.underlineThickness=K.q(o,l);l+=2;return w}};B.T.a3={M:function(o,l,F){var K=B.B,w={entries:[]},y=l,x=K.K(o,l);
l+=2;var S=K.e(o,l);l+=4;var f=K.e(o,l);l+=4;l=S+y;var N=K.K(o,l);l+=2;for(var A=0;A<N;A++){var X=K.K(o,l);
l+=2;var G=K.K(o,l);l+=2;var O=K.e(o,l);l+=4;var L=K.e(o,l);l+=4;var j=new Uint8Array(o.buffer,y+O+S,L),H=K.ag(j,0,j.length);
for(var g=X;g<=G;g++){w.entries[g]=H}}return w}};B.T.b2={M:function(o,l,F,K){var w=K.maxp.numGlyphs,y=l,x=B.B,S=x.e(o,l+4),f=[];
for(var N=S-1;N<S;N++){var A=y+x.e(o,l+8+N*4);for(var X=0;X<w;X++){var G=x.e(o,A+4+X*4),O=x.e(o,A+4+X*4+4);
if(G==O){f[X]=null;continue}var L=A+G,j=x.m(o,L+4,4);if(j!="png ")throw j;f[X]=new Uint8Array(o.buffer,o.byteOffset+L+8,O-G-8)}}return f}};
B.T.aK={M:function(o,l,F){var K=B.B,w=l;l+=2;var y=K.K(o,l);l+=2;var x=K.e(o,l);l+=4;var S=K.e(o,l);
l+=4;var f=K.K(o,l);l+=2;var N={},A=w+x;for(var X=0;X<y;X++){N["g"+K.K(o,A)]=[K.K(o,A+2),K.K(o,A+4)];
A+=6}var G=[];A=w+S;for(var X=0;X<f;X++){G.push(K.K(o,A),K.K(o,A+2));A+=4}return[N,G]}};B.T.aP={M:function(o,l,F){var K=B.B,w=l,y=K.K(o,l);
l+=2;if(y==0){var x=K.K(o,l);l+=2;var S=K.K(o,l);l+=2;var f=K.K(o,l);l+=2;var N=K.e(o,l);l+=4;return new Uint8Array(o.buffer,w+N,f*4)}else throw y}};
B.U={shape:function(o,l,F){var K=function(o,w,L,F){var j=w[L],H=w[L+1],g=o.kern;if(g){var T=g.G.indexOf(j);
if(T!=-1){var d=g.T[T].aQ.indexOf(H);if(d!=-1)return[0,0,g.T[T].as[d],0]}}return[0,0,0,0]},w=[],N=0,A=0;
for(var y=0;y<l.length;y++){var x=l.codePointAt(y);if(x>65535)y++;w.push(B.U.codeToGlyph(o,x))}var f=[];
for(var y=0;y<w.length;y++){var X=K(o,w,y,F),G=w[y],O=o.hmtx.aB[G]+X[2];f.push({g:G,cl:y,dx:0,dy:0,ax:O,ay:0});
N+=O}return f},shapeToPath:function(o,l,F){var K={h:[],F:[]},w=0,y=0;for(var x=0;x<l.length;x++){var f=l[x],N=B.U.glyphToPath(o,f.g),A=N.crds;
for(var X=0;X<A.length;X+=2){K.F.push(A[X]+w+f.dx);K.F.push(A[X+1]+y+f.dy)}if(F)K.h.push(F);for(var X=0;
X<N.cmds.length;X++)K.h.push(N.cmds[X]);var G=K.h.length;if(F)if(G!=0&&K.h[G-1]!="X")K.h.push("X");w+=f.ax;
y+=f.ay}return{cmds:K.h,crds:K.F}},codeToGlyph:function(){function o(y,x,f){var A=0,X=~~(y.length/x);
while(A+1!=X){var G=A+(X-A>>>1);if(y[G*x]<=f)A=G;else X=G}return A*x}var l=[9,10,11,12,13,32,133,160,5760,6158,8232,8233,8239,8288,12288,65279],F={};
for(var K=0;K<l.length;K++)F[l[K]]=1;for(var K=8192;K<=8205;K++)F[K]=1;function w(y,x){if(y._ctab==null){var f=y.cmap,N=-1,A="p3e10 p0e4 p3e1 p1e0 p0e3 p0e1 p3e0 p3e5".split(" ");
for(var K=0;K<A.length;K++)if(f.Q[A[K]]!=null){N=f.Q[A[K]];break}if(N==-1)throw"no familiar platform and encoding!";
y._ctab=f.u[N]}var X=y._ctab,G=X.a$,O=-1;if(G==0){if(x>=X.map.length)O=0;else O=X.map[x]}else if(G==4){var L=X.aq;
O=0;if(x<=L[L.length-1]){var j=o(L,1,x);if(L[j]<x)j++;if(x>=X.aD[j]){var H=0;if(X.b[j]!=0)H=X.j[x-X.aD[j]+(X.b[j]>>1)-(X.b.length-j)];
else H=x+X.b3[j];O=H&65535}}}else if(G==6){var g=x-X.av,T=X.j;if(g<0||g>=T.length)O=0;else O=T[g]}else if(G==12){var d=X.ar;
O=0;if(x<=d[d.length-2]){var K=o(d,3,x);if(d[K]<=x&&x<=d[K+1]){O=d[K+2]+(x-d[K])}}}else throw"unknown cmap table format "+X.a$;
var e=y["SVG "],U=y.loca;if(O!=0&&y["CFF "]==null&&(e==null||e.entries[O]==null)&&U&&U[O]==U[O+1]&&F[x]==null)O=0;
return O}return w}(),glyphToPath:function(o,l,F){var K={h:[],F:[]},w=o["SVG "],y=o["CFF "],x=o.COLR,S=o.CBLC,f=o.CBDT,N=o.sbix,A=window.UPNG,X=B.U,G=null;
if(S&&A)for(var O=0;O<S.length;O++)if(S[O][0]<=l&&l<=S[O][1])G=S[O];if(G||N&&N[l]){if(G&&G[2]!=17)throw"not a PNG";
if(o.__tmp==null)o.__tmp={};var L=o.__tmp["g"+l];if(L==null){var j,H,T="";if(N){j=N[l];H=j.length}else{var g=G[3][l-G[0]]+5;
H=f[g+1]<<16|f[g+2]<<8|f[g+3];g+=4;j=new Uint8Array(f.buffer,f.byteOffset+g,H)}for(var O=0;O<H;O++)T+=String.fromCharCode(j[O]);
L=o.__tmp["g"+l]="data:image/png;base64,"+btoa(T)}K.h.push(L);var d=o.head.unitsPerEm*1.15,e=Math.round(d),U=Math.round(d),i=Math.round(-U*.15);
K.F.push(0,U+i,e,U+i,e,i,0,i)}else if(w&&w.entries[l]){var I=w.entries[l];if(I!=null){if(typeof I=="string"){I=X.SVG.aX(I);
w.entries[l]=I}K=I}}else if(F!=!0&&x&&x[0]["g"+l]&&x[0]["g"+l][1]>1){function Y(q){var r=q.toString(16);
return(r.length==1?"0":"")+r}var n=o.CPAL,$=x[0]["g"+l];for(var O=0;O<$[1];O++){var k=$[0]+O,m=x[1][2*k],u=x[1][2*k+1]*4,v=B.U.glyphToPath(o,m,m==l),D="#"+Y(n[u+2])+Y(n[u+1])+Y(n[u+0]);
K.h.push(D);K.h=K.h.concat(v.cmds);K.F=K.F.concat(v.crds);K.h.push("X")}}else if(y){var J=y.Private,C={x:0,y:0,stack:[],W:0,p:!1,width:J?J.defaultWidthX:0,open:!1};
if(y.ROS){var P=0;while(y.FDSelect[P+2]<=l)P+=2;J=y.FDArray[y.FDSelect[P+1]].Private}X._drawCFF(y.CharStrings[l],C,y,J,K)}else if(o.glyf){X._drawGlyf(l,o,K)}return{cmds:K.h,crds:K.F}},_drawGlyf:function(o,l,F){var K=l.glyf[o];
if(K==null)K=l.glyf[o]=B.T.O.ac(l,o);if(K!=null){if(K.a>-1)B.U._simpleGlyph(K,F);else B.U._compoGlyph(K,l,F)}},_simpleGlyph:function(o,l){var F=B.U.P;
for(var K=0;K<o.a;K++){var w=K==0?0:o.i[K-1]+1,y=o.i[K];for(var x=w;x<=y;x++){var f=x==w?y:x-1,N=x==y?w:x+1,A=o.S[x]&1,X=o.S[f]&1,G=o.S[N]&1,O=o.v[x],j=o.J[x];
if(x==w){if(A){if(X)F.l(l,o.v[f],o.J[f]);else{F.l(l,O,j);continue}}else{if(X)F.l(l,o.v[f],o.J[f]);else F.l(l,Math.floor((o.v[f]+O)*.5),Math.floor((o.J[f]+j)*.5))}}if(A){if(X)F.D(l,O,j)}else{if(G)F.b9(l,O,j,o.v[N],o.J[N]);
else F.b9(l,O,j,Math.floor((O+o.v[N])*.5),Math.floor((j+o.J[N])*.5))}}F.k(l)}},_compoGlyph:function(o,l,F){for(var K=0;
K<o.I.length;K++){var w={h:[],F:[]},y=o.I[K];B.U._drawGlyf(y.ak,l,w);var x=y.N;for(var S=0;S<w.F.length;
S+=2){var N=w.F[S],A=w.F[S+1];F.F.push(N*x.n+A*x.a4+x.b5);F.F.push(N*x.a2+A*x.$+x.al)}for(var S=0;S<w.h.length;
S++)F.h.push(w.h[S])}},pathToSVG:function(o,l){var F=o.cmds,K=o.crds,y=0;if(l==null)l=5;var w=[],x={M:2,L:2,Q:4,C:6};
for(var S=0;S<F.length;S++){var f=F[S],N=y+(x[f]?x[f]:0);w.push(f);while(y<N){var A=K[y++];w.push(parseFloat(A.toFixed(l))+(y==N?"":" "))}}return w.join("")},SVGToPath:function(o){var l={h:[],F:[]};
B.U.SVG.aj(o,l);return{cmds:l.h,crds:l.F}},pathToContext:function(){var o,l;function F(K,w){var y=0,x=K.cmds,S=K.crds;
for(var f=0;f<x.length;f++){var N=x[f];if(N=="M"){w.moveTo(S[y],S[y+1]);y+=2}else if(N=="L"){w.lineTo(S[y],S[y+1]);
y+=2}else if(N=="C"){w.bezierCurveTo(S[y],S[y+1],S[y+2],S[y+3],S[y+4],S[y+5]);y+=6}else if(N=="Q"){w.quadraticCurveTo(S[y],S[y+1],S[y+2],S[y+3]);
y+=4}else if(N[0]=="d"){var A=window.UPNG,X=S[y],G=S[y+1],O=S[y+2],L=S[y+3],j=S[y+4],H=S[y+5],g=S[y+6],T=S[y+7];
y+=8;if(A==null){w.moveTo(X,G);w.lineTo(O,L);w.lineTo(j,H);w.lineTo(g,T);w.closePath();continue}w.save();
var d=O-X,e=L-G,U=Math.sqrt(d*d+e*e),i=Math.atan2(e,d),I=g-X,Y=T-G,n=Math.sqrt(I*I+Y*Y),$=Math.sign(d*Y-e*I),k=atob(N.slice(22)),m=[];
for(var u=0;u<k.length;u++)m[u]=k.charCodeAt(u);var v=A.decode(new Uint8Array(m)),D=v.width,J=v.height,C=new Uint8Array(A.toRGBA8(v)[0]);
if(o==null){o=document.createElement("canvas");l=o.getContext("2d")}if(o.width!=D||o.height!=J){o.width=D;
o.height=J}l.putImageData(new ImageData(new Uint8ClampedArray(C.buffer),D,J),0,0);w.translate(X,G);w.rotate(i);
w.scale(U*(D/J)/D,$*n/J);w.drawImage(o,0,0);w.restore()}else if(N.charAt(0)=="#"||N.charAt(0)=="r"){w.beginPath();
w.fillStyle=N}else if(N.charAt(0)=="O"&&N!="OX"){w.beginPath();var P=N.split("-");w.lineWidth=parseFloat(P[2]);
w.strokeStyle=P[1]}else if(N=="Z"){w.closePath()}else if(N=="X"){w.fill()}else if(N=="OX"){w.stroke()}}}return F}(),P:{l:function(o,l,F){o.h.push("M");
o.F.push(l,F)},D:function(o,l,F){o.h.push("L");o.F.push(l,F)},U:function(o,l,F,K,w,y,x){o.h.push("C");
o.F.push(l,F,K,w,y,x)},b9:function(o,l,F,K,w){o.h.push("Q");o.F.push(l,F,K,w)},k:function(o){o.h.push("Z")}},_drawCFF:function(o,l,F,K,w){var y=l.stack,x=l.W,S=l.p,f=l.width,N=l.open,A=0,X=l.x,G=l.y,O=0,j=0,H=0,g=0,T=0,d=0,e=0,U=0,Y=0,n=0,$=B.T.d,k=B.U.P,m=K.nominalWidthX,u={aR:0,size:0};
while(A<o.length){$.aW(o,A,u);var v=u.aR;A+=u.size;if(!1){}else if(v=="o1"||v=="o18"){var D;D=y.length%2!==0;
if(D&&!S){f=y.shift()+m}x+=y.length>>1;y.length=0;S=!0}else if(v=="o3"||v=="o23"){var D;D=y.length%2!==0;
if(D&&!S){f=y.shift()+m}x+=y.length>>1;y.length=0;S=!0}else if(v=="o4"){if(y.length>1&&!S){f=y.shift()+m;
S=!0}if(N)k.k(w);G+=y.pop();k.l(w,X,G);N=!0}else if(v=="o5"){while(y.length>0){X+=y.shift();G+=y.shift();
k.D(w,X,G)}}else if(v=="o6"||v=="o7"){var J=y.length,C=v=="o6";for(var P=0;P<J;P++){var q=y.shift();
if(C)X+=q;else G+=q;C=!C;k.D(w,X,G)}}else if(v=="o8"||v=="o24"){var J=y.length,r=0;while(r+6<=J){O=X+y.shift();
j=G+y.shift();H=O+y.shift();g=j+y.shift();X=H+y.shift();G=g+y.shift();k.U(w,O,j,H,g,X,G);r+=6}if(v=="o24"){X+=y.shift();
G+=y.shift();k.D(w,X,G)}}else if(v=="o11")break;else if(v=="o1234"||v=="o1235"||v=="o1236"||v=="o1237"){if(v=="o1234"){O=X+y.shift();
j=G;H=O+y.shift();g=j+y.shift();Y=H+y.shift();n=g;T=Y+y.shift();d=g;e=T+y.shift();U=G;X=e+y.shift();
k.U(w,O,j,H,g,Y,n);k.U(w,T,d,e,U,X,G)}if(v=="o1235"){O=X+y.shift();j=G+y.shift();H=O+y.shift();g=j+y.shift();
Y=H+y.shift();n=g+y.shift();T=Y+y.shift();d=n+y.shift();e=T+y.shift();U=d+y.shift();X=e+y.shift();G=U+y.shift();
y.shift();k.U(w,O,j,H,g,Y,n);k.U(w,T,d,e,U,X,G)}if(v=="o1236"){O=X+y.shift();j=G+y.shift();H=O+y.shift();
g=j+y.shift();Y=H+y.shift();n=g;T=Y+y.shift();d=g;e=T+y.shift();U=d+y.shift();X=e+y.shift();k.U(w,O,j,H,g,Y,n);
k.U(w,T,d,e,U,X,G)}if(v=="o1237"){O=X+y.shift();j=G+y.shift();H=O+y.shift();g=j+y.shift();Y=H+y.shift();
n=g+y.shift();T=Y+y.shift();d=n+y.shift();e=T+y.shift();U=d+y.shift();if(Math.abs(e-X)>Math.abs(U-G)){X=e+y.shift()}else{G=U+y.shift()}k.U(w,O,j,H,g,Y,n);
k.U(w,T,d,e,U,X,G)}}else if(v=="o14"){if(y.length>0&&y.length!=4&&!S){f=y.shift()+F.nominalWidthX;S=!0}if(y.length==4){var ap=0,Z=y.shift(),M=y.shift(),a0=y.shift(),at=y.shift(),as=$.s(F,a0),a5=$.s(F,at);
B.U._drawCFF(F.CharStrings[as],l,F,K,w);l.x=Z;l.y=M;B.U._drawCFF(F.CharStrings[a5],l,F,K,w)}if(N){k.k(w);
N=!1}}else if(v=="o19"||v=="o20"){var D;D=y.length%2!==0;if(D&&!S){f=y.shift()+m}x+=y.length>>1;y.length=0;
S=!0;A+=x+7>>3}else if(v=="o21"){if(y.length>2&&!S){f=y.shift()+m;S=!0}G+=y.pop();X+=y.pop();if(N)k.k(w);
k.l(w,X,G);N=!0}else if(v=="o22"){if(y.length>1&&!S){f=y.shift()+m;S=!0}X+=y.pop();if(N)k.k(w);k.l(w,X,G);
N=!0}else if(v=="o25"){while(y.length>6){X+=y.shift();G+=y.shift();k.D(w,X,G)}O=X+y.shift();j=G+y.shift();
H=O+y.shift();g=j+y.shift();X=H+y.shift();G=g+y.shift();k.U(w,O,j,H,g,X,G)}else if(v=="o26"){if(y.length%2){X+=y.shift()}while(y.length>0){O=X;
j=G+y.shift();H=O+y.shift();g=j+y.shift();X=H;G=g+y.shift();k.U(w,O,j,H,g,X,G)}}else if(v=="o27"){if(y.length%2){G+=y.shift()}while(y.length>0){O=X+y.shift();
j=G;H=O+y.shift();g=j+y.shift();X=H+y.shift();G=g;k.U(w,O,j,H,g,X,G)}}else if(v=="o10"||v=="o29"){var R=v=="o10"?K:F;
if(y.length==0){console.log("error: empty stack")}else{var W=y.pop(),t=R.Subrs[W+R.Bias];l.x=X;l.y=G;
l.W=x;l.p=S;l.width=f;l.open=N;B.U._drawCFF(t,l,F,K,w);X=l.x;G=l.y;x=l.W;S=l.p;f=l.width;N=l.open}}else if(v=="o30"||v=="o31"){var J,p=y.length,r=0,z=v=="o31";
J=p&~2;r+=p-J;while(r<J){if(z){O=X+y.shift();j=G;H=O+y.shift();g=j+y.shift();G=g+y.shift();if(J-r==5){X=H+y.shift();
r++}else X=H;z=!1}else{O=X;j=G+y.shift();H=O+y.shift();g=j+y.shift();X=H+y.shift();if(J-r==5){G=g+y.shift();
r++}else G=g;z=!0}k.U(w,O,j,H,g,X,G);r+=4}}else if((v+"").charAt(0)=="o"){console.log("Unknown operation: "+v,o);
throw v}else y.push(v)}l.x=X;l.y=G;l.W=x;l.p=S;l.width=f;l.open=N},SVG:function(){var o={af:function(A){return Math.sqrt(Math.abs(A[0]*A[3]-A[1]*A[2]))},translate:function(A,G,O){o.concat(A,[1,0,0,1,G,O])},rotate:function(A,G){o.concat(A,[Math.cos(G),-Math.sin(G),Math.sin(G),Math.cos(G),0,0])},scale:function(A,G,O){o.concat(A,[G,0,0,O,0,0])},concat:function(A,G){var O=A[0],L=A[1],j=A[2],H=A[3],g=A[4],T=A[5];
A[0]=O*G[0]+L*G[2];A[1]=O*G[1]+L*G[3];A[2]=j*G[0]+H*G[2];A[3]=j*G[1]+H*G[3];A[4]=g*G[0]+T*G[2]+G[4];
A[5]=g*G[1]+T*G[3]+G[5]},aF:function(A){var G=A[0],O=A[1],L=A[2],j=A[3],H=A[4],g=A[5],T=G*j-O*L;A[0]=j/T;
A[1]=-O/T;A[2]=-L/T;A[3]=G/T;A[4]=(L*g-j*H)/T;A[5]=(O*H-G*g)/T},ba:function(A,G){var O=G[0],j=G[1];return[O*A[0]+j*A[2]+A[4],O*A[1]+j*A[3]+A[5]]},aT:function(A,G){for(var O=0;
O<G.length;O+=2){var L=G[O],j=G[O+1];G[O]=L*A[0]+j*A[2]+A[4];G[O+1]=L*A[1]+j*A[3]+A[5]}}};function l(A,X,G){var O=[],L=0,j=0,H=0;
while(!0){var g=A.indexOf(X,j),T=A.indexOf(G,j);if(g==-1&&T==-1)break;if(T==-1||g!=-1&&g<T){if(H==0){O.push(A.slice(L,g).trim());
L=g+1}H++;j=g+1}else if(g==-1||T!=-1&&T<g){H--;if(H==0){O.push(A.slice(L,T).trim());L=T+1}j=T+1}}return O}function F(A){var X=l(A,"{","}"),G={};
for(var O=0;O<X.length;O+=2){var L=X[O].split(",");for(var j=0;j<L.length;j++){var H=L[j].trim();if(G[H]==null)G[H]="";
G[H]+=X[O+1]}}return G}function K(A){var X=l(A,"(",")"),G=[1,0,0,1,0,0];for(var O=0;O<X.length;O+=2){var L=G;
G=w(X[O],X[O+1]);o.concat(G,L)}return G}function w(A,X){var G=[1,0,0,1,0,0],O=!0;for(var L=0;L<X.length;
L++){var j=X.charAt(L);if(j==","||j==" ")O=!0;else if(j=="."){if(!O){X=X.slice(0,L)+","+X.slice(L);L++}O=!1}else if(j=="-"&&L>0&&X[L-1]!="e"){X=X.slice(0,L)+" "+X.slice(L);
L++;O=!0}}X=X.split(/\s*[\s,]\s*/).map(parseFloat);if(!1){}else if(A=="translate"){if(X.length==1)o.translate(G,X[0],0);
else o.translate(G,X[0],X[1])}else if(A=="scale"){if(X.length==1)o.scale(G,X[0],X[0]);else o.scale(G,X[0],X[1])}else if(A=="rotate"){var H=0,g=0;
if(X.length!=1){H=X[1];g=X[2]}o.translate(G,-H,-g);o.rotate(G,-Math.PI*X[0]/180);o.translate(G,H,g)}else if(A=="matrix")G=X;
else console.log("unknown transform: ",A);return G}function y(A){var X={h:[],F:[]};if(A==null)return X;
var G=new DOMParser,O=G.parseFromString(A,"image/svg+xml"),L=O.getElementsByTagName("svg")[0],j=L.getAttribute("viewBox");
if(j)j=j.trim().split(" ").map(parseFloat);else j=[0,0,1e3,1e3];x(L.children,X);for(var H=0;H<X.F.length;
H+=2){var g=X.F[H],T=X.F[H+1];g-=j[0];T-=j[1];T=-T;X.F[H]=g;X.F[H+1]=T}return X}function x(A,X,G){for(var O=0;
O<A.length;O++){var L=A[O],j=L.tagName,H=L.getAttribute("fill");if(H==null)H=G;if(j=="g"){var g={F:[],h:[]};
x(L.children,g,H);var T=L.getAttribute("transform");if(T){var d=K(T);o.aT(d,g.F)}X.F=X.F.concat(g.F);
X.h=X.h.concat(g.h)}else if(j=="path"||j=="circle"||j=="ellipse"){X.h.push(H?H:"#000000");var e;if(j=="path")e=L.getAttribute("d");
if(j=="circle"||j=="ellipse"){var U=[0,0,0,0],i=["cx","cy","rx","ry","r"];for(var I=0;I<5;I++){var Y=L.getAttribute(i[I]);
if(Y){Y=parseFloat(Y);if(I<4)U[I]=Y;else U[2]=U[3]=Y}}var n=U[0],$=U[1],k=U[2],m=U[3];e=["M",n-k,$,"a",k,m,0,1,0,k*2,0,"a",k,m,0,1,0,-k*2,0].join(" ")}N(e,X);
X.h.push("X")}else if(j=="defs"){}else console.log(j,L)}}function S(A){var X=[],G=0,O=!1,L="",j="",H="",g=0;
while(G<A.length){var T=A.charCodeAt(G),d=A.charAt(G);G++;var e=48<=T&&T<=57||d=="."||d=="-"||d=="e"||d=="E";
if(O){if(d=="-"&&j!="e"||d=="."&&L.indexOf(".")!=-1||e&&(H=="a"||H=="A")&&(g%7==3||g%7==4)){X.push(parseFloat(L));
g++;L=d}else if(e)L+=d;else{X.push(parseFloat(L));g++;if(d!=","&&d!=" "){X.push(d);H=d;g=0}O=!1}}else{if(e){L=d;
O=!0}else if(d!=","&&d!=" "){X.push(d);H=d;g=0}}j=d}if(O)X.push(parseFloat(L));return X}function f(A,X,G){var O=X;
while(O<A.length){if(typeof A[O]=="string")break;O+=G}return(O-X)/G}function N(A,X){var G=S(A),O=0,L=0,j=0,H=0,g=0,T=X.F.length,d={M:2,L:2,H:1,V:1,T:2,S:4,A:7,Q:4,C:6},e=X.h,U=X.F;
while(O<G.length){var Y=G[O];O++;var n=Y.toUpperCase();if(n=="Z"){e.push("Z");L=H;j=g}else{var $=d[n],k=f(G,O,$);
for(var m=0;m<k;m++){if(m==1&&n=="M"){Y=Y==n?"L":"l";n="L"}var u=0,v=0;if(Y!=n){u=L;v=j}if(!1){}else if(n=="M"){L=u+G[O++];
j=v+G[O++];e.push("M");U.push(L,j);H=L;g=j}else if(n=="L"){L=u+G[O++];j=v+G[O++];e.push("L");U.push(L,j)}else if(n=="H"){L=u+G[O++];
e.push("L");U.push(L,j)}else if(n=="V"){j=v+G[O++];e.push("L");U.push(L,j)}else if(n=="Q"){var D=u+G[O++],J=v+G[O++],C=u+G[O++],P=v+G[O++];
e.push("Q");U.push(D,J,C,P);L=C;j=P}else if(n=="T"){var q=Math.max(U.length-(e[e.length-1]=="Q"?4:2),T),D=L+L-U[q],J=j+j-U[q+1],C=u+G[O++],P=v+G[O++];
e.push("Q");U.push(D,J,C,P);L=C;j=P}else if(n=="C"){var D=u+G[O++],J=v+G[O++],C=u+G[O++],P=v+G[O++],r=u+G[O++],Z=v+G[O++];
e.push("C");U.push(D,J,C,P,r,Z);L=r;j=Z}else if(n=="S"){var q=Math.max(U.length-(e[e.length-1]=="C"?4:2),T),D=L+L-U[q],J=j+j-U[q+1],C=u+G[O++],P=v+G[O++],r=u+G[O++],Z=v+G[O++];
e.push("C");U.push(D,J,C,P,r,Z);L=r;j=Z}else if(n=="A"){var D=L,J=j,M=G[O++],c=G[O++],a0=G[O++]*(Math.PI/180),at=G[O++],as=G[O++],C=u+G[O++],P=v+G[O++];
if(C==L&&P==j&&M==0&&c==0)continue;var a5=(D-C)/2,R=(J-P)/2,W=Math.cos(a0),t=Math.sin(a0),p=W*a5+t*R,z=-t*a5+W*R,a1=M*M,ar=c*c,am=p*p,a9=z*z,ab=(a1*ar-a1*a9-ar*am)/(a1*a9+ar*am),al=(at!=as?1:-1)*Math.sqrt(Math.max(ab,0)),ak=al*(M*z)/c,aq=-al*(c*p)/M,a6=W*ak-t*aq+(D+C)/2,aj=t*ak+W*aq+(J+P)/2,an=function(b,Q,E,s){var ad=Math.sqrt(b*b+Q*Q),V=Math.sqrt(E*E+s*s),a7=(b*E+Q*s)/(ad*V);
return(b*s-Q*E>=0?1:-1)*Math.acos(Math.max(-1,Math.min(1,a7)))},ag=(p-ak)/M,a2=(z-aq)/c,ae=an(1,0,ag,a2),ao=an(ag,a2,(-p-ak)/M,(-z-aq)/c);
ao=ao%(2*Math.PI);var a8=function(a4,L,j,b,Q,E,s){var ad=function(h,_){var ac=Math.sin(_),q=Math.cos(_),_=h[0],ah=h[1],au=h[2],A=h[3];
h[0]=_*q+ah*ac;h[1]=-_*ac+ah*q;h[2]=au*q+A*ac;h[3]=-au*ac+A*q},V=function(h,_){for(var m=0;m<_.length;
m+=2){var L=_[m],j=_[m+1];_[m]=h[0]*L+h[2]*j+h[4];_[m+1]=h[1]*L+h[3]*j+h[5]}},a7=function(h,_){for(var m=0;
m<_.length;m++)h.push(_[m])},af=function(h,b){a7(h.h,b.h);a7(h.F,b.F)};if(s)while(E>Q)E-=2*Math.PI;else while(E<Q)E+=2*Math.PI;
var aa=(E-Q)/4,a3=Math.cos(aa/2),ai=-Math.sin(aa/2),D=(4-a3)/3,J=ai==0?ai:(1-a3)*(3-a3)/(3*ai),C=D,P=-J,r=a3,Z=-ai,$=[D,J,C,P,r,Z],X={h:["C","C","C","C"],F:$.slice(0)},a=[1,0,0,1,0,0];
ad(a,-aa);for(var m=0;m<3;m++){V(a,$);a7(X.F,$)}ad(a,-Q+aa/2);a[0]*=b;a[1]*=b;a[2]*=b;a[3]*=b;a[4]=L;
a[5]=j;V(a,X.F);V(a4.aU,X.F);af(a4.aG,X)},a4={aG:X,aU:[M*W,M*t,-c*t,c*W,a6,aj]};a8(a4,0,0,1,ae,ae+ao,as==0);
L=C;j=P}else console.log("Unknown SVG command "+Y)}}}}return{cssMap:F,readTrnf:K,aj:N,aX:y}}(),initHB:function(o,l){var F=function(K){var w=0;
if((K&4294967295-(1<<7)+1)==0){w=1}else if((K&4294967295-(1<<11)+1)==0){w=2}else if((K&4294967295-(1<<16)+1)==0){w=3}else if((K&4294967295-(1<<21)+1)==0){w=4}return w};
fetch(o).then(function(K){return K.arrayBuffer()}).then(function(K){return WebAssembly.instantiate(K)}).then(function(K){console.log("HB ready");
var w=K.instance.exports,y=w.memory,x,S,f,N,A,X,G,O;B.U.shapeHB=function(){var L=function(H){var g=w.hb_buffer_get_length(H),T=[],d=w.hb_buffer_get_glyph_infos(H,0)>>>2,e=w.hb_buffer_get_glyph_positions(H,0)>>>2;
for(var U=0;U<g;++U){var i=d+U*5,I=e+U*5;T.push({g:S[i+0],cl:S[i+2],ax:f[I+0],ay:f[I+1],dx:f[I+2],dy:f[I+3]})}return T},j;
return function(H,g,T){var d=H._data,e=H.name.postScriptName,U=y.buffer.byteLength,i=2*d.length+g.length*16+4e6,u=0,v=0;
if(U<i){y.grow((i-U>>>16)+4)}x=new Uint8Array(y.buffer);S=new Uint32Array(y.buffer);f=new Int32Array(y.buffer);
if(N!=e){if(A!=null){w.hb_blob_destroy(A);w.free(X);w.hb_face_destroy(G);w.hb_font_destroy(O)}X=w.malloc(d.byteLength);
x.set(d,X);A=w.hb_blob_create(X,d.byteLength,2,0,0);G=w.hb_face_create(A,0);O=w.hb_font_create(G);N=e}if(window.TextEncoder==null){alert("Your browser is too old. Please, update it.");
return}if(j==null)j=new window.TextEncoder("utf8");var I=w.hb_buffer_create(),Y=j.encode(g),n=Y.length,$=w.malloc(n);
x.set(Y,$);w.hb_buffer_add_utf8(I,$,n,0,n);w.free($);w.hb_buffer_set_direction(I,T?4:5);w.hb_buffer_guess_segment_properties(I);
w.hb_shape(O,I,0,0);var k=L(I);w.hb_buffer_destroy(I);var m=k.slice(0);if(!T)m.reverse();for(var D=1;
D<m.length;D++){var J=m[D],C=J.cl;while(!0){var P=g.codePointAt(u),q=F(P);if(v+q<=C){v+=q;u+=P<=65535?1:2}else break}J.cl=u}return k}}();
l()})}};return B}()


var UZIP = {};
if(typeof module == "object") module.exports = UZIP;


UZIP["parse"] = function(buf, onlyNames)	// ArrayBuffer
{
	var rUs = UZIP.bin.readUshort, rUi = UZIP.bin.readUint, o = 0, out = {};
	var data = new Uint8Array(buf);
	var eocd = data.length-4;
	
	while(rUi(data, eocd)!=0x06054b50) eocd--;
	
	var o = eocd;
	o+=4;	// sign  = 0x06054b50
	o+=4;  // disks = 0;
	var cnu = rUs(data, o);  o+=2;
	var cnt = rUs(data, o);  o+=2;
			
	var csize = rUi(data, o);  o+=4;
	var coffs = rUi(data, o);  o+=4;
	
	o = coffs;
	for(var i=0; i<cnu; i++)
	{
		var sign = rUi(data, o);  o+=4;
		o += 4;  // versions;
		o += 4;  // flag + compr
		var time = UZIP._readTime(data,o);  o += 4;  // time
		
		var crc32 = rUi(data, o);  o+=4;
		var csize = rUi(data, o);  o+=4;
		var usize = rUi(data, o);  o+=4;
		
		var nl = rUs(data, o), el = rUs(data, o+2), cl = rUs(data, o+4);  o += 6;  // name, extra, comment
		o += 8;  // disk, attribs
		
		var roff = rUi(data, o);  o+=4;
		o += nl + el + cl;
		
		UZIP._readLocal(data, roff, out, csize, usize, onlyNames);
	}
	//console.log(out);
	return out;
}

UZIP._readTime = function(data,o) {
	var time = UZIP.bin.readUshort(data,o), date = UZIP.bin.readUshort(data,o+2);
	var year = 1980+(date>>>9);
	var mont = (date>>>5)&15;
	var day  = (date)&31;
	//console.log(year,mont,day);
	
	var hour = (time>>>11);
	var minu = (time>>> 5)&63;
	var seco = 2*(time&31);
	
	var stamp = new Date(year,mont,day,hour,minu,seco).getTime();
	
	//console.log(date,time);
	//UZIP._writeTime(data,o,stamp);
	return stamp;
}
UZIP._writeTime = function(data,o,stamp) {
	var dt = new Date(stamp);
	var date = ((dt.getFullYear()-1980)<<9) | ((dt.getMonth()+1)<<5) | dt.getDate();
	var time = (dt.getHours()<<11) | (dt.getMinutes()<<5) | (dt.getSeconds()>>>1);
	UZIP.bin.writeUshort(data,o,time);
	UZIP.bin.writeUshort(data,o+2,date);
}


UZIP._readLocal = function(data, o, out, csize, usize, onlyNames)
{
	var rUs = UZIP.bin.readUshort, rUi = UZIP.bin.readUint;
	var sign  = rUi(data, o);  o+=4;
	var ver   = rUs(data, o);  o+=2;
	var gpflg = rUs(data, o);  o+=2;
	//if((gpflg&8)!=0) throw "unknown sizes";
	var cmpr  = rUs(data, o);  o+=2;
	
	var time  = UZIP._readTime(data,o);  o+=4;
	
	var crc32 = rUi(data, o);  o+=4;
	//var csize = rUi(data, o);  o+=4;
	//var usize = rUi(data, o);  o+=4;
	o+=8;
		
	var nlen  = rUs(data, o);  o+=2;
	var elen  = rUs(data, o);  o+=2;
		
	var name =  (gpflg&2048)==0 ? UZIP.bin.readIBM(data,o,nlen) : UZIP.bin.readUTF8(data, o, nlen);  o+=nlen;  //console.log(name);
	o += elen;
			
	//console.log(sign.toString(16), ver, gpflg, cmpr, crc32.toString(16), "csize, usize", csize, usize, nlen, elen, name, o);
	if(onlyNames) {  out[name]={size:usize, csize:csize};  return;  }   
	var file = new Uint8Array(data.buffer, o);
	if(false) {}
	else if(cmpr==0) out[name] = new Uint8Array(file.buffer.slice(o, o+csize));
	else if(cmpr==8) {
		var buf = new Uint8Array(usize);  UZIP.inflateRaw(file, buf);
		/*var nbuf = pako["inflateRaw"](file);
		if(usize>8514000) {
			//console.log(PUtils.readASCII(buf , 8514500, 500));
			//console.log(PUtils.readASCII(nbuf, 8514500, 500));
		}
		for(var i=0; i<buf.length; i++) if(buf[i]!=nbuf[i]) {  console.log(buf.length, nbuf.length, usize, i);  throw "e";  }
		*/
		out[name] = buf;
	}
	else throw "unknown compression method: "+cmpr;
}

UZIP.inflateRaw = function(file, buf) {  return UZIP.F.inflate(file, buf);  }
UZIP.inflate    = function(file, buf) { 
	var CMF = file[0], FLG = file[1];
	var CM = (CMF&15), CINFO = (CMF>>>4);
	//console.log(CM, CINFO,CMF,FLG);
	return UZIP.inflateRaw(new Uint8Array(file.buffer, file.byteOffset+2, file.length-6), buf);  
}
UZIP.deflate    = function(data, opts/*, buf, off*/) {
	if(opts==null) opts={level:6};
	var off=0, buf=new Uint8Array(50+Math.floor(data.length*1.1));
	buf[off]=120;  buf[off+1]=156;  off+=2;
	off = UZIP.F.deflateRaw(data, buf, off, opts.level);
	var crc = UZIP.adler(data, 0, data.length);
	buf[off+0]=((crc>>>24)&255); 
	buf[off+1]=((crc>>>16)&255); 
	buf[off+2]=((crc>>> 8)&255); 
	buf[off+3]=((crc>>> 0)&255); 	
	return new Uint8Array(buf.buffer, 0, off+4);
}
UZIP.deflateRaw = function(data, opts) {
	if(opts==null) opts={level:6};
	var buf=new Uint8Array(50+Math.floor(data.length*1.1));
	var off = UZIP.F.deflateRaw(data, buf, off, opts.level);
	return new Uint8Array(buf.buffer, 0, off);
}


UZIP.encode = function(obj, noCmpr) {
	if(noCmpr==null) noCmpr=false;
	var tot = 0, wUi = UZIP.bin.writeUint, wUs = UZIP.bin.writeUshort;
	var zpd = {};
	for(var p in obj) {  var cpr = !UZIP._noNeed(p) && !noCmpr, buf = obj[p], crc = UZIP.crc.crc(buf,0,buf.length); 
		zpd[p] = {  cpr:cpr, usize:buf.length, crc:crc, file: (cpr ? UZIP.deflateRaw(buf) : buf)  };  }
	
	for(var p in zpd) tot += zpd[p].file.length + 30 + 46 + 2*UZIP.bin.sizeUTF8(p);
	tot +=  22;
	
	var data = new Uint8Array(tot), o = 0;
	var fof = []
	
	for(var p in zpd) {
		var file = zpd[p];  fof.push(o);
		o = UZIP._writeHeader(data, o, p, file, 0);
	}
	var i=0, ioff = o;
	for(var p in zpd) {
		var file = zpd[p];  fof.push(o);
		o = UZIP._writeHeader(data, o, p, file, 1, fof[i++]);		
	}
	var csize = o-ioff;
	
	wUi(data, o, 0x06054b50);  o+=4;
	o += 4;  // disks
	wUs(data, o, i);  o += 2;
	wUs(data, o, i);  o += 2;	// number of c d records
	wUi(data, o, csize);  o += 4;
	wUi(data, o, ioff );  o += 4;
	o += 2;
	return data.buffer;
}
// no need to compress .PNG, .ZIP, .JPEG ....
UZIP._noNeed = function(fn) {  var ext = fn.split(".").pop().toLowerCase();  return "png,jpg,jpeg,zip".indexOf(ext)!=-1;  }

UZIP._writeHeader = function(data, o, p, obj, t, roff)
{
	var wUi = UZIP.bin.writeUint, wUs = UZIP.bin.writeUshort;
	var file = obj.file;
	
	wUi(data, o, t==0 ? 0x04034b50 : 0x02014b50);  o+=4; // sign
	if(t==1) o+=2;  // ver made by
	wUs(data, o, 20);  o+=2;	// ver
	wUs(data, o,  2048);  o+=2;    // gflip
	wUs(data, o,  obj.cpr?8:0);  o+=2;	// cmpr
		
	UZIP._writeTime(data,o,Date.now());  o+=4;//wUi(data, o,  0);  o+=4;	// time		
	wUi(data, o, obj.crc);  o+=4;	// crc32
	wUi(data, o, file.length);  o+=4;	// csize
	wUi(data, o, obj.usize);  o+=4;	// usize
		
	wUs(data, o, UZIP.bin.sizeUTF8(p));  o+=2;	// nlen
	wUs(data, o, 0);  o+=2;	// elen
	
	if(t==1) {
		o += 2;  // comment length
		o += 2;  // disk number
		o += 6;  // attributes
		wUi(data, o, roff);  o+=4;	// usize
	}
	var nlen = UZIP.bin.writeUTF8(data, o, p);  o+= nlen;	
	if(t==0) {  data.set(file, o);  o += file.length;  }
	return o;
}





UZIP.crc = {
	table : ( function() {
	   var tab = new Uint32Array(256);
	   for (var n=0; n<256; n++) {
			var c = n;
			for (var k=0; k<8; k++) {
				if (c & 1)  c = 0xedb88320 ^ (c >>> 1);
				else        c = c >>> 1;
			}
			tab[n] = c;  }    
		return tab;  })(),
	update : function(c, buf, off, len) {
		for (var i=0; i<len; i++)  c = UZIP.crc.table[(c ^ buf[off+i]) & 0xff] ^ (c >>> 8);
		return c;
	},
	crc : function(b,o,l)  {  return UZIP.crc.update(0xffffffff,b,o,l) ^ 0xffffffff;  }
}
UZIP.adler = function(data,o,len) {
	var a = 1, b = 0;
	var off = o, end=o+len;
	while(off<end) {
		var eend = Math.min(off+5552, end);
		while(off<eend) {
			a += data[off++];
			b += a;
		}
		a=a%65521;
		b=b%65521;
	}
    return (b << 16) | a;
}

UZIP.bin = {
	readUshort : function(buff,p)  {  return (buff[p]) | (buff[p+1]<<8);  },
	writeUshort: function(buff,p,n){  buff[p] = (n)&255;  buff[p+1] = (n>>8)&255;  },
	readUint   : function(buff,p)  {  return (buff[p+3]*(256*256*256)) + ((buff[p+2]<<16) | (buff[p+1]<< 8) | buff[p]);  },
	writeUint  : function(buff,p,n){  buff[p]=n&255;  buff[p+1]=(n>>8)&255;  buff[p+2]=(n>>16)&255;  buff[p+3]=(n>>24)&255;  },
	readASCII  : function(buff,p,l){  var s = "";  for(var i=0; i<l; i++) s += String.fromCharCode(buff[p+i]);  return s;    },
	writeASCII : function(data,p,s){  for(var i=0; i<s.length; i++) data[p+i] = s.charCodeAt(i);  },
	pad : function(n) { return n.length < 2 ? "0" + n : n; },
	readIBM  : function(buff, p, l) {
		var codes = [
			0xc7, 0xfc, 0xe9, 0xe2, 0xe4, 0xe0, 0xe5, 0xe7, 0xea,   0xeb, 0xe8, 0xef, 0xee, 0xec, 0xc4, 0xc5,
			0xc9, 0xe6, 0xc6, 0xf4, 0xf6, 0xf2, 0xfb, 0xf9, 0xff,   0xd6, 0xdc, 0xa2, 0xa3, 0xa5, 0xa7, 0x192,
			0xe1, 0xed, 0xf3, 0xfa, 0xf1, 0xd1, 0xaa, 0xba, 0xbf, 0x2310, 0xac, 0xbd, 0xbc, 0xa1, 0xab, 0xbb
		]
		var out = "";
		for(var i=0; i<l; i++) {
			var cc = buff[p+i];
			if     (cc<0x80) cc = cc;
			else if(cc<0xb0) cc = codes[cc-0x80];
			else             cc = 32;
			out += String.fromCharCode(cc);
		}
		return out;
	},
	readUTF8 : function(buff, p, l) {
		var s = "", ns;
		for(var i=0; i<l; i++) s += "%" + UZIP.bin.pad(buff[p+i].toString(16));
		try {  ns = decodeURIComponent(s); }
		catch(e) {  return UZIP.bin.readASCII(buff, p, l);  }
		return  ns;
	},
	writeUTF8 : function(buff, p, str) {
		var strl = str.length, i=0;
		for(var ci=0; ci<strl; ci++)
		{
			var code = str.charCodeAt(ci);
			if     ((code&(0xffffffff-(1<< 7)+1))==0) {  buff[p+i] = (     code     );  i++;  }
			else if((code&(0xffffffff-(1<<11)+1))==0) {  buff[p+i] = (192|(code>> 6));  buff[p+i+1] = (128|((code>> 0)&63));  i+=2;  }
			else if((code&(0xffffffff-(1<<16)+1))==0) {  buff[p+i] = (224|(code>>12));  buff[p+i+1] = (128|((code>> 6)&63));  buff[p+i+2] = (128|((code>>0)&63));  i+=3;  }
			else if((code&(0xffffffff-(1<<21)+1))==0) {  buff[p+i] = (240|(code>>18));  buff[p+i+1] = (128|((code>>12)&63));  buff[p+i+2] = (128|((code>>6)&63));  buff[p+i+3] = (128|((code>>0)&63)); i+=4;  }
			else throw "e";
		}
		return i;
	},
	sizeUTF8 : function(str) {
		var strl = str.length, i=0;
		for(var ci=0; ci<strl; ci++)
		{
			var code = str.charCodeAt(ci);
			if     ((code&(0xffffffff-(1<< 7)+1))==0) {  i++ ;  }
			else if((code&(0xffffffff-(1<<11)+1))==0) {  i+=2;  }
			else if((code&(0xffffffff-(1<<16)+1))==0) {  i+=3;  }
			else if((code&(0xffffffff-(1<<21)+1))==0) {  i+=4;  }
			else throw "e";
		}
		return i;
	}
}









UZIP.F = {};

UZIP.F.deflateRaw = function(data, out, opos, lvl) {	
	var opts = [
	/*
		 ush good_length; /* reduce lazy search above this match length 
		 ush max_lazy;    /* do not perform lazy search above this match length 
         ush nice_length; /* quit search above this match length 
	*/
	/*      good lazy nice chain */
	/* 0 */ [ 0,   0,   0,    0,0],  /* store only */
	/* 1 */ [ 4,   4,   8,    4,0], /* max speed, no lazy matches */
	/* 2 */ [ 4,   5,  16,    8,0],
	/* 3 */ [ 4,   6,  16,   16,0],

	/* 4 */ [ 4,  10,  16,   32,0],  /* lazy matches */
	/* 5 */ [ 8,  16,  32,   32,0],
	/* 6 */ [ 8,  16, 128,  128,0],
	/* 7 */ [ 8,  32, 128,  256,0],
	/* 8 */ [32, 128, 258, 1024,1],
	/* 9 */ [32, 258, 258, 4096,1]]; /* max compression */
	
	var opt = opts[lvl];
	
	
	var U = UZIP.F.U, goodIndex = UZIP.F._goodIndex, hash = UZIP.F._hash, putsE = UZIP.F._putsE;
	var i = 0, pos = opos<<3, cvrd = 0, dlen = data.length;
	
	if(lvl==0) {
		while(i<dlen) {   var len = Math.min(0xffff, dlen-i);
			putsE(out, pos, (i+len==dlen ? 1 : 0));  pos = UZIP.F._copyExact(data, i, len, out, pos+8);  i += len;  }
		return pos>>>3;
	}

	var lits = U.lits, strt=U.strt, prev=U.prev, li=0, lc=0, bs=0, ebits=0, c=0, nc=0;  // last_item, literal_count, block_start
	if(dlen>2) {  nc=UZIP.F._hash(data,0);  strt[nc]=0;  }
	var nmch=0,nmci=0;
	
	for(i=0; i<dlen; i++)  {
		c = nc;
		//*
		if(i+1<dlen-2) {
			nc = UZIP.F._hash(data, i+1);
			var ii = ((i+1)&0x7fff);
			prev[ii]=strt[nc];
			strt[nc]=ii;
		} //*/
		if(cvrd<=i) {
			if((li>14000 || lc>26697) && (dlen-i)>100) {
				if(cvrd<i) {  lits[li]=i-cvrd;  li+=2;  cvrd=i;  }
				pos = UZIP.F._writeBlock(((i==dlen-1) || (cvrd==dlen))?1:0, lits, li, ebits, data,bs,i-bs, out, pos);  li=lc=ebits=0;  bs=i;
			}
			
			var mch = 0;
			//if(nmci==i) mch= nmch;  else 
			if(i<dlen-2) mch = UZIP.F._bestMatch(data, i, prev, c, Math.min(opt[2],dlen-i), opt[3]);
			/*
			if(mch!=0 && opt[4]==1 && (mch>>>16)<opt[1] && i+1<dlen-2) {
				nmch = UZIP.F._bestMatch(data, i+1, prev, nc, opt[2], opt[3]);  nmci=i+1;
				//var mch2 = UZIP.F._bestMatch(data, i+2, prev, nnc);  //nmci=i+1;
				if((nmch>>>16)>(mch>>>16)) mch=0;
			}//*/
			var len = mch>>>16, dst = mch&0xffff;  //if(i-dst<0) throw "e";
			if(mch!=0) { 
				var len = mch>>>16, dst = mch&0xffff;  //if(i-dst<0) throw "e";
				var lgi = goodIndex(len, U.of0);  U.lhst[257+lgi]++; 
				var dgi = goodIndex(dst, U.df0);  U.dhst[    dgi]++;  ebits += U.exb[lgi] + U.dxb[dgi]; 
				lits[li] = (len<<23)|(i-cvrd);  lits[li+1] = (dst<<16)|(lgi<<8)|dgi;  li+=2;
				cvrd = i + len;  
			}
			else {	U.lhst[data[i]]++;  }
			lc++;
		}
	}
	if(bs!=i || data.length==0) {
		if(cvrd<i) {  lits[li]=i-cvrd;  li+=2;  cvrd=i;  }
		pos = UZIP.F._writeBlock(1, lits, li, ebits, data,bs,i-bs, out, pos);  li=0;  lc=0;  li=lc=ebits=0;  bs=i;
	}
	while((pos&7)!=0) pos++;
	return pos>>>3;
}
UZIP.F._bestMatch = function(data, i, prev, c, nice, chain) {
	var ci = (i&0x7fff), pi=prev[ci];  
	//console.log("----", i);
	var dif = ((ci-pi + (1<<15)) & 0x7fff);  if(pi==ci || c!=UZIP.F._hash(data,i-dif)) return 0;
	var tl=0, td=0;  // top length, top distance
	var dlim = Math.min(0x7fff, i);
	while(dif<=dlim && --chain!=0 && pi!=ci /*&& c==UZIP.F._hash(data,i-dif)*/) {
		if(tl==0 || (data[i+tl]==data[i+tl-dif])) {
			var cl = UZIP.F._howLong(data, i, dif);
			if(cl>tl) {  
				tl=cl;  td=dif;  if(tl>=nice) break;    //* 
				if(dif+2<cl) cl = dif+2;
				var maxd = 0; // pi does not point to the start of the word
				for(var j=0; j<cl-2; j++) {
					var ei =  (i-dif+j+ (1<<15)) & 0x7fff;
					var li = prev[ei];
					var curd = (ei-li + (1<<15)) & 0x7fff;
					if(curd>maxd) {  maxd=curd;  pi = ei; }
				}  //*/
			}
		}
		
		ci=pi;  pi = prev[ci];
		dif += ((ci-pi + (1<<15)) & 0x7fff);
	}
	return (tl<<16)|td;
}
UZIP.F._howLong = function(data, i, dif) {
	if(data[i]!=data[i-dif] || data[i+1]!=data[i+1-dif] || data[i+2]!=data[i+2-dif]) return 0;
	var oi=i, l = Math.min(data.length, i+258);  i+=3;
	//while(i+4<l && data[i]==data[i-dif] && data[i+1]==data[i+1-dif] && data[i+2]==data[i+2-dif] && data[i+3]==data[i+3-dif]) i+=4;
	while(i<l && data[i]==data[i-dif]) i++;
	return i-oi;
}
UZIP.F._hash = function(data, i) {
	return (((data[i]<<8) | data[i+1])+(data[i+2]<<4))&0xffff;
	//var hash_shift = 0, hash_mask = 255;
	//var h = data[i+1] % 251;
	//h = (((h << 8) + data[i+2]) % 251);
	//h = (((h << 8) + data[i+2]) % 251);
	//h = ((h<<hash_shift) ^ (c) ) & hash_mask;
	//return h | (data[i]<<8);
	//return (data[i] | (data[i+1]<<8));
}
//UZIP.___toth = 0;
UZIP.saved = 0;
UZIP.F._writeBlock = function(BFINAL, lits, li, ebits, data,o0,l0, out, pos) {
	var U = UZIP.F.U, putsF = UZIP.F._putsF, putsE = UZIP.F._putsE;
	
	//*
	var T, ML, MD, MH, numl, numd, numh, lset, dset;  U.lhst[256]++;
	T = UZIP.F.getTrees(); ML=T[0]; MD=T[1]; MH=T[2]; numl=T[3]; numd=T[4]; numh=T[5]; lset=T[6]; dset=T[7];
	
	var cstSize = (((pos+3)&7)==0 ? 0 : 8-((pos+3)&7)) + 32 + (l0<<3);
	var fxdSize = ebits + UZIP.F.contSize(U.fltree, U.lhst) + UZIP.F.contSize(U.fdtree, U.dhst);
	var dynSize = ebits + UZIP.F.contSize(U.ltree , U.lhst) + UZIP.F.contSize(U.dtree , U.dhst);
	dynSize    += 14 + 3*numh + UZIP.F.contSize(U.itree, U.ihst) + (U.ihst[16]*2 + U.ihst[17]*3 + U.ihst[18]*7);
	
	for(var j=0; j<286; j++) U.lhst[j]=0;   for(var j=0; j<30; j++) U.dhst[j]=0;   for(var j=0; j<19; j++) U.ihst[j]=0;
	//*/
	var BTYPE = (cstSize<fxdSize && cstSize<dynSize) ? 0 : ( fxdSize<dynSize ? 1 : 2 );
	putsF(out, pos, BFINAL);  putsF(out, pos+1, BTYPE);  pos+=3;
	
	var opos = pos;
	if(BTYPE==0) {
		while((pos&7)!=0) pos++;
		pos = UZIP.F._copyExact(data, o0, l0, out, pos);
	}
	else {
		var ltree, dtree;
		if(BTYPE==1) {  ltree=U.fltree;  dtree=U.fdtree;  }
		if(BTYPE==2) {	
			UZIP.F.makeCodes(U.ltree, ML);  UZIP.F.revCodes(U.ltree, ML);
			UZIP.F.makeCodes(U.dtree, MD);  UZIP.F.revCodes(U.dtree, MD);
			UZIP.F.makeCodes(U.itree, MH);  UZIP.F.revCodes(U.itree, MH);
			
			ltree = U.ltree;  dtree = U.dtree;
			
			putsE(out, pos,numl-257);  pos+=5;  // 286
			putsE(out, pos,numd-  1);  pos+=5;  // 30
			putsE(out, pos,numh-  4);  pos+=4;  // 19
			
			for(var i=0; i<numh; i++) putsE(out, pos+i*3, U.itree[(U.ordr[i]<<1)+1]);   pos+=3* numh;
			pos = UZIP.F._codeTiny(lset, U.itree, out, pos);
			pos = UZIP.F._codeTiny(dset, U.itree, out, pos);
		}
		
		var off=o0;
		for(var si=0; si<li; si+=2) {
			var qb=lits[si], len=(qb>>>23), end = off+(qb&((1<<23)-1));
			while(off<end) pos = UZIP.F._writeLit(data[off++], ltree, out, pos);
			
			if(len!=0) {
				var qc = lits[si+1], dst=(qc>>16), lgi=(qc>>8)&255, dgi=(qc&255);
				pos = UZIP.F._writeLit(257+lgi, ltree, out, pos);
				putsE(out, pos, len-U.of0[lgi]);  pos+=U.exb[lgi];
				
				pos = UZIP.F._writeLit(dgi, dtree, out, pos);
				putsF(out, pos, dst-U.df0[dgi]);  pos+=U.dxb[dgi];  off+=len;
			}
		}
		pos = UZIP.F._writeLit(256, ltree, out, pos);
	}
	//console.log(pos-opos, fxdSize, dynSize, cstSize);
	return pos;
}
UZIP.F._copyExact = function(data,off,len,out,pos) {
	var p8 = (pos>>>3);
	out[p8]=(len);  out[p8+1]=(len>>>8);  out[p8+2]=255-out[p8];  out[p8+3]=255-out[p8+1];  p8+=4;
	out.set(new Uint8Array(data.buffer, off, len), p8);
	//for(var i=0; i<len; i++) out[p8+i]=data[off+i];
	return pos + ((len+4)<<3);
}
/*
	Interesting facts:
	- decompressed block can have bytes, which do not occur in a Huffman tree (copied from the previous block by reference)
*/

UZIP.F.getTrees = function() {
	var U = UZIP.F.U;
	var ML = UZIP.F._hufTree(U.lhst, U.ltree, 15);
	var MD = UZIP.F._hufTree(U.dhst, U.dtree, 15);
	var lset = [], numl = UZIP.F._lenCodes(U.ltree, lset);
	var dset = [], numd = UZIP.F._lenCodes(U.dtree, dset);
	for(var i=0; i<lset.length; i+=2) U.ihst[lset[i]]++;
	for(var i=0; i<dset.length; i+=2) U.ihst[dset[i]]++;
	var MH = UZIP.F._hufTree(U.ihst, U.itree,  7);
	var numh = 19;  while(numh>4 && U.itree[(U.ordr[numh-1]<<1)+1]==0) numh--;
	return [ML, MD, MH, numl, numd, numh, lset, dset];
}
UZIP.F.getSecond= function(a) {  var b=[];  for(var i=0; i<a.length; i+=2) b.push  (a[i+1]);  return b;  }
UZIP.F.nonZero  = function(a) {  var b= "";  for(var i=0; i<a.length; i+=2) if(a[i+1]!=0)b+=(i>>1)+",";  return b;  }
UZIP.F.contSize = function(tree, hst) {  var s=0;  for(var i=0; i<hst.length; i++) s+= hst[i]*tree[(i<<1)+1];  return s;  }
UZIP.F._codeTiny = function(set, tree, out, pos) {
	for(var i=0; i<set.length; i+=2) {
		var l = set[i], rst = set[i+1];  //console.log(l, pos, tree[(l<<1)+1]);
		pos = UZIP.F._writeLit(l, tree, out, pos);
		var rsl = l==16 ? 2 : (l==17 ? 3 : 7);
		if(l>15) {  UZIP.F._putsE(out, pos, rst, rsl);  pos+=rsl;  }
	}
	return pos;
}
UZIP.F._lenCodes = function(tree, set) {
	var len=tree.length;  while(len!=2 && tree[len-1]==0) len-=2;  // when no distances, keep one code with length 0
	for(var i=0; i<len; i+=2) {
		var l = tree[i+1], nxt = (i+3<len ? tree[i+3]:-1),  nnxt = (i+5<len ? tree[i+5]:-1),  prv = (i==0 ? -1 : tree[i-1]);
		if(l==0 && nxt==l && nnxt==l) {
			var lz = i+5;
			while(lz+2<len && tree[lz+2]==l) lz+=2;
			var zc = Math.min((lz+1-i)>>>1, 138);
			if(zc<11) set.push(17, zc-3);
			else set.push(18, zc-11);
			i += zc*2-2;
		}
		else if(l==prv && nxt==l && nnxt==l) {
			var lz = i+5;
			while(lz+2<len && tree[lz+2]==l) lz+=2;
			var zc = Math.min((lz+1-i)>>>1, 6);
			set.push(16, zc-3);
			i += zc*2-2;
		}
		else set.push(l, 0);
	}
	return len>>>1;
}
UZIP.F._hufTree   = function(hst, tree, MAXL) {
	var list=[], hl = hst.length, tl=tree.length, i=0;
	for(i=0; i<tl; i+=2) {  tree[i]=0;  tree[i+1]=0;  }	
	for(i=0; i<hl; i++) if(hst[i]!=0) list.push({lit:i, f:hst[i]});
	var end = list.length, l2=list.slice(0);
	if(end==0) return 0;  // empty histogram (usually for dist)
	if(end==1) {  var lit=list[0].lit, l2=lit==0?1:0;  tree[(lit<<1)+1]=1;  tree[(l2<<1)+1]=1;  return 1;  }
	list.sort(function(a,b){return a.f-b.f;});
	var a=list[0], b=list[1], i0=0, i1=1, i2=2;  list[0]={lit:-1,f:a.f+b.f,l:a,r:b,d:0};
	while(i1!=end-1) {
		if(i0!=i1 && (i2==end || list[i0].f<list[i2].f)) {  a=list[i0++];  }  else {  a=list[i2++];  }
		if(i0!=i1 && (i2==end || list[i0].f<list[i2].f)) {  b=list[i0++];  }  else {  b=list[i2++];  }
		list[i1++]={lit:-1,f:a.f+b.f, l:a,r:b};
	}
	var maxl = UZIP.F.setDepth(list[i1-1], 0);
	if(maxl>MAXL) {  UZIP.F.restrictDepth(l2, MAXL, maxl);  maxl = MAXL;  }
	for(i=0; i<end; i++) tree[(l2[i].lit<<1)+1]=l2[i].d;
	return maxl;
}

UZIP.F.setDepth  = function(t, d) {
	if(t.lit!=-1) {  t.d=d;  return d;  }
	return Math.max( UZIP.F.setDepth(t.l, d+1),  UZIP.F.setDepth(t.r, d+1) );
}

UZIP.F.restrictDepth = function(dps, MD, maxl) {
	var i=0, bCost=1<<(maxl-MD), dbt=0;
	dps.sort(function(a,b){return b.d==a.d ? a.f-b.f : b.d-a.d;});
	
	for(i=0; i<dps.length; i++) if(dps[i].d>MD) {  var od=dps[i].d;  dps[i].d=MD;  dbt+=bCost-(1<<(maxl-od));  }  else break;
	dbt = dbt>>>(maxl-MD);
	while(dbt>0) {  var od=dps[i].d;  if(od<MD) {  dps[i].d++;  dbt-=(1<<(MD-od-1));  }  else  i++;  }
	for(; i>=0; i--) if(dps[i].d==MD && dbt<0) {  dps[i].d--;  dbt++;  }  if(dbt!=0) console.log("debt left");
}

UZIP.F._goodIndex = function(v, arr) {
	var i=0;  if(arr[i|16]<=v) i|=16;  if(arr[i|8]<=v) i|=8;  if(arr[i|4]<=v) i|=4;  if(arr[i|2]<=v) i|=2;  if(arr[i|1]<=v) i|=1;  return i;
}
UZIP.F._writeLit = function(ch, ltree, out, pos) {
	UZIP.F._putsF(out, pos, ltree[ch<<1]);
	return pos+ltree[(ch<<1)+1];
}








UZIP.F.inflate = function(data, buf) {
	var u8=Uint8Array;
	if(data[0]==3 && data[1]==0) return (buf ? buf : new u8(0));
	var F=UZIP.F, bitsF = F._bitsF, bitsE = F._bitsE, decodeTiny = F._decodeTiny, makeCodes = F.makeCodes, codes2map=F.codes2map, get17 = F._get17;
	var U = F.U;
	
	var noBuf = (buf==null);
	if(noBuf) buf = new u8((data.length>>>2)<<3);
	
	var BFINAL=0, BTYPE=0, HLIT=0, HDIST=0, HCLEN=0, ML=0, MD=0; 	
	var off = 0, pos = 0;
	var lmap, dmap;
	
	while(BFINAL==0) {		
		BFINAL = bitsF(data, pos  , 1);
		BTYPE  = bitsF(data, pos+1, 2);  pos+=3;
		//console.log(BFINAL, BTYPE);
		
		if(BTYPE==0) {
			if((pos&7)!=0) pos+=8-(pos&7);
			var p8 = (pos>>>3)+4, len = data[p8-4]|(data[p8-3]<<8);  //console.log(len);//bitsF(data, pos, 16), 
			if(noBuf) buf=UZIP.F._check(buf, off+len);
			buf.set(new u8(data.buffer, data.byteOffset+p8, len), off);
			//for(var i=0; i<len; i++) buf[off+i] = data[p8+i];
			//for(var i=0; i<len; i++) if(buf[off+i] != data[p8+i]) throw "e";
			pos = ((p8+len)<<3);  off+=len;  continue;
		}
		if(noBuf) buf=UZIP.F._check(buf, off+(1<<17));  // really not enough in many cases (but PNG and ZIP provide buffer in advance)
		if(BTYPE==1) {  lmap = U.flmap;  dmap = U.fdmap;  ML = (1<<9)-1;  MD = (1<<5)-1;   }
		if(BTYPE==2) {
			HLIT  = bitsE(data, pos   , 5)+257;  
			HDIST = bitsE(data, pos+ 5, 5)+  1;  
			HCLEN = bitsE(data, pos+10, 4)+  4;  pos+=14;
			
			var ppos = pos;
			for(var i=0; i<38; i+=2) {  U.itree[i]=0;  U.itree[i+1]=0;  }
			var tl = 1;
			for(var i=0; i<HCLEN; i++) {  var l=bitsE(data, pos+i*3, 3);  U.itree[(U.ordr[i]<<1)+1] = l;  if(l>tl)tl=l;  }     pos+=3*HCLEN;  //console.log(itree);
			makeCodes(U.itree, tl);
			codes2map(U.itree, tl, U.imap);
			
			lmap = U.lmap;  dmap = U.dmap;
			
			pos = decodeTiny(U.imap, (1<<tl)-1, HLIT+HDIST, data, pos, U.ttree);
			var mx0 = F._copyOut(U.ttree,    0, HLIT , U.ltree);  ML = (1<<mx0)-1;
			var mx1 = F._copyOut(U.ttree, HLIT, HDIST, U.dtree);  MD = (1<<mx1)-1;
			
			//var ml = decodeTiny(U.imap, (1<<tl)-1, HLIT , data, pos, U.ltree); ML = (1<<(ml>>>24))-1;  pos+=(ml&0xffffff);
			makeCodes(U.ltree, mx0);
			codes2map(U.ltree, mx0, lmap);
			
			//var md = decodeTiny(U.imap, (1<<tl)-1, HDIST, data, pos, U.dtree); MD = (1<<(md>>>24))-1;  pos+=(md&0xffffff);
			makeCodes(U.dtree, mx1);
			codes2map(U.dtree, mx1, dmap);
		}
		//var ooff=off, opos=pos;
		while(true) {
			var code = lmap[get17(data, pos) & ML];  pos += code&15;
			var lit = code>>>4;  //U.lhst[lit]++;  
			if((lit>>>8)==0) {  buf[off++] = lit;  }
			else if(lit==256) {  break;  }
			else {
				var end = off+lit-254;
				if(lit>264) { var ebs = U.ldef[lit-257];  end = off + (ebs>>>3) + bitsE(data, pos, ebs&7);  pos += ebs&7;  }
				//UZIP.F.dst[end-off]++;
				
				var dcode = dmap[get17(data, pos) & MD];  pos += dcode&15;
				var dlit = dcode>>>4;
				var dbs = U.ddef[dlit], dst = (dbs>>>4) + bitsF(data, pos, dbs&15);  pos += dbs&15;
				
				//var o0 = off-dst, stp = Math.min(end-off, dst);
				//if(stp>20) while(off<end) {  buf.copyWithin(off, o0, o0+stp);  off+=stp;  }  else
				//if(end-dst<=off) buf.copyWithin(off, off-dst, end-dst);  else
				//if(dst==1) buf.fill(buf[off-1], off, end);  else
				if(noBuf) buf=UZIP.F._check(buf, off+(1<<17));
				while(off<end) {  buf[off]=buf[off++-dst];    buf[off]=buf[off++-dst];  buf[off]=buf[off++-dst];  buf[off]=buf[off++-dst];  }   
				off=end;
				//while(off!=end) {  buf[off]=buf[off++-dst];  }
			}
		}
		//console.log(off-ooff, (pos-opos)>>>3);
	}
	//console.log(UZIP.F.dst);
	//console.log(tlen, dlen, off-tlen+tcnt);
	return buf.length==off ? buf : buf.slice(0,off);
}
UZIP.F._check=function(buf, len) {
	var bl=buf.length;  if(len<=bl) return buf;
	var nbuf = new Uint8Array(Math.max(bl<<1,len));  nbuf.set(buf,0);
	//for(var i=0; i<bl; i+=4) {  nbuf[i]=buf[i];  nbuf[i+1]=buf[i+1];  nbuf[i+2]=buf[i+2];  nbuf[i+3]=buf[i+3];  }
	return nbuf;
}

UZIP.F._decodeTiny = function(lmap, LL, len, data, pos, tree) {
	var bitsE = UZIP.F._bitsE, get17 = UZIP.F._get17;
	var i = 0;
	while(i<len) {
		var code = lmap[get17(data, pos)&LL];  pos+=code&15;
		var lit = code>>>4; 
		if(lit<=15) {  tree[i]=lit;  i++;  }
		else {
			var ll = 0, n = 0;
			if(lit==16) {
				n = (3  + bitsE(data, pos, 2));  pos += 2;  ll = tree[i-1];
			}
			else if(lit==17) {
				n = (3  + bitsE(data, pos, 3));  pos += 3;
			}
			else if(lit==18) {
				n = (11 + bitsE(data, pos, 7));  pos += 7;
			}
			var ni = i+n;
			while(i<ni) {  tree[i]=ll;  i++; }
		}
	}
	return pos;
}
UZIP.F._copyOut = function(src, off, len, tree) {
	var mx=0, i=0, tl=tree.length>>>1;
	while(i<len) {  var v=src[i+off];  tree[(i<<1)]=0;  tree[(i<<1)+1]=v;  if(v>mx)mx=v;  i++;  }
	while(i<tl ) {  tree[(i<<1)]=0;  tree[(i<<1)+1]=0;  i++;  }
	return mx;
}

UZIP.F.makeCodes = function(tree, MAX_BITS) {  // code, length
	var U = UZIP.F.U;
	var max_code = tree.length;
	var code, bits, n, i, len;
	
	var bl_count = U.bl_count;  for(var i=0; i<=MAX_BITS; i++) bl_count[i]=0;
	for(i=1; i<max_code; i+=2) bl_count[tree[i]]++;
	
	var next_code = U.next_code;	// smallest code for each length
	
	code = 0;
	bl_count[0] = 0;
	for (bits = 1; bits <= MAX_BITS; bits++) {
		code = (code + bl_count[bits-1]) << 1;
		next_code[bits] = code;
	}
	
	for (n = 0; n < max_code; n+=2) {
		len = tree[n+1];
		if (len != 0) {
			tree[n] = next_code[len];
			next_code[len]++;
		}
	}
}
UZIP.F.codes2map = function(tree, MAX_BITS, map) {
	var max_code = tree.length;
	var U=UZIP.F.U, r15 = U.rev15;
	for(var i=0; i<max_code; i+=2) if(tree[i+1]!=0)  {
		var lit = i>>1;
		var cl = tree[i+1], val = (lit<<4)|cl; // :  (0x8000 | (U.of0[lit-257]<<7) | (U.exb[lit-257]<<4) | cl);
		var rest = (MAX_BITS-cl), i0 = tree[i]<<rest, i1 = i0 + (1<<rest);
		//tree[i]=r15[i0]>>>(15-MAX_BITS);
		while(i0!=i1) {
			var p0 = r15[i0]>>>(15-MAX_BITS);
			map[p0]=val;  i0++;
		}
	}
}
UZIP.F.revCodes = function(tree, MAX_BITS) {
	var r15 = UZIP.F.U.rev15, imb = 15-MAX_BITS;
	for(var i=0; i<tree.length; i+=2) {  var i0 = (tree[i]<<(MAX_BITS-tree[i+1]));  tree[i] = r15[i0]>>>imb;  }
}

// used only in deflate
UZIP.F._putsE= function(dt, pos, val   ) {  val = val<<(pos&7);  var o=(pos>>>3);  dt[o]|=val;  dt[o+1]|=(val>>>8);                        }
UZIP.F._putsF= function(dt, pos, val   ) {  val = val<<(pos&7);  var o=(pos>>>3);  dt[o]|=val;  dt[o+1]|=(val>>>8);  dt[o+2]|=(val>>>16);  }

UZIP.F._bitsE= function(dt, pos, length) {  return ((dt[pos>>>3] | (dt[(pos>>>3)+1]<<8)                        )>>>(pos&7))&((1<<length)-1);  }
UZIP.F._bitsF= function(dt, pos, length) {  return ((dt[pos>>>3] | (dt[(pos>>>3)+1]<<8) | (dt[(pos>>>3)+2]<<16))>>>(pos&7))&((1<<length)-1);  }
/*
UZIP.F._get9 = function(dt, pos) {
	return ((dt[pos>>>3] | (dt[(pos>>>3)+1]<<8))>>>(pos&7))&511;
} */
UZIP.F._get17= function(dt, pos) {	// return at least 17 meaningful bytes
	return (dt[pos>>>3] | (dt[(pos>>>3)+1]<<8) | (dt[(pos>>>3)+2]<<16) )>>>(pos&7);
}
UZIP.F._get25= function(dt, pos) {	// return at least 17 meaningful bytes
	return (dt[pos>>>3] | (dt[(pos>>>3)+1]<<8) | (dt[(pos>>>3)+2]<<16) | (dt[(pos>>>3)+3]<<24) )>>>(pos&7);
}
UZIP.F.U = function(){
	var u16=Uint16Array, u32=Uint32Array;
	return {
		next_code : new u16(16),
		bl_count  : new u16(16),
		ordr : [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ],
		of0  : [3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,999,999,999],
		exb  : [0,0,0,0,0,0,0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4,  4,  5,  5,  5,  5,  0,  0,  0,  0],
		ldef : new u16(32),
		df0  : [1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577, 65535, 65535],
		dxb  : [0,0,0,0,1,1,2, 2, 3, 3, 4, 4, 5, 5,  6,  6,  7,  7,  8,  8,   9,   9,  10,  10,  11,  11,  12,   12,   13,   13,     0,     0],
		ddef : new u32(32),
		flmap: new u16(  512),  fltree: [],
		fdmap: new u16(   32),  fdtree: [],
		lmap : new u16(32768),  ltree : [],  ttree:[],
		dmap : new u16(32768),  dtree : [],
		imap : new u16(  512),  itree : [],
		//rev9 : new u16(  512)
		rev15: new u16(1<<15),
		lhst : new u32(286), dhst : new u32( 30), ihst : new u32(19),
		lits : new u32(15000),
		strt : new u16(1<<16),
		prev : new u16(1<<15)
	};  
} ();

(function(){	
	var U = UZIP.F.U;
	var len = 1<<15;
	for(var i=0; i<len; i++) {
		var x = i;
		x = (((x & 0xaaaaaaaa) >>> 1) | ((x & 0x55555555) << 1));
		x = (((x & 0xcccccccc) >>> 2) | ((x & 0x33333333) << 2));
		x = (((x & 0xf0f0f0f0) >>> 4) | ((x & 0x0f0f0f0f) << 4));
		x = (((x & 0xff00ff00) >>> 8) | ((x & 0x00ff00ff) << 8));
		U.rev15[i] = (((x >>> 16) | (x << 16)))>>>17;
	}
	
	function pushV(tgt, n, sv) {  while(n--!=0) tgt.push(0,sv);  }
	
	for(var i=0; i<32; i++) {  U.ldef[i]=(U.of0[i]<<3)|U.exb[i];  U.ddef[i]=(U.df0[i]<<4)|U.dxb[i];  }
	
	pushV(U.fltree, 144, 8);  pushV(U.fltree, 255-143, 9);  pushV(U.fltree, 279-255, 7);  pushV(U.fltree,287-279,8);
	/*
	var i = 0;
	for(; i<=143; i++) U.fltree.push(0,8);
	for(; i<=255; i++) U.fltree.push(0,9);
	for(; i<=279; i++) U.fltree.push(0,7);
	for(; i<=287; i++) U.fltree.push(0,8);
	*/
	UZIP.F.makeCodes(U.fltree, 9);
	UZIP.F.codes2map(U.fltree, 9, U.flmap);
	UZIP.F.revCodes (U.fltree, 9)
	
	pushV(U.fdtree,32,5);
	//for(i=0;i<32; i++) U.fdtree.push(0,5);
	UZIP.F.makeCodes(U.fdtree, 5);
	UZIP.F.codes2map(U.fdtree, 5, U.fdmap);
	UZIP.F.revCodes (U.fdtree, 5)
	
	pushV(U.itree,19,0);  pushV(U.ltree,286,0);  pushV(U.dtree,30,0);  pushV(U.ttree,320,0);
	/*
	for(var i=0; i< 19; i++) U.itree.push(0,0);
	for(var i=0; i<286; i++) U.ltree.push(0,0);
	for(var i=0; i< 30; i++) U.dtree.push(0,0);
	for(var i=0; i<320; i++) U.ttree.push(0,0);
	*/
})()


var paper=function(t,e){var i=(t=t||require("./node/self.js")).window,n=t.document,r=new function(){function t(t,e,r,s,a){function u(n,u){"string"==typeof(u=u||(u=o(e,n))&&(u.get?u:u.value))&&"#"===u[0]&&(u=t[u.substring(1)]||u);var c,f="function"==typeof u,d=u,_=a||f&&!u.base?u&&u.get?n in t:t[n]:null;a&&_||(f&&_&&(u.base=_),f&&!1!==s&&(c=n.match(/^([gs]et|is)(([A-Z])(.*))$/))&&(l[c[3].toLowerCase()+c[4]]=c[2]),d&&!f&&d.get&&"function"==typeof d.get&&i.isPlainObject(d)||(d={value:d,writable:!0}),(o(t,n)||{configurable:!0}).configurable&&(d.configurable=!0,d.enumerable=null!=r?r:!c),h(t,n,d))}var l={};if(e){for(var c in e)e.hasOwnProperty(c)&&!n.test(c)&&u(c);for(var c in l){var f=l[c],d=t["set"+f],_=t["get"+f]||d&&t["is"+f];!_||!0!==s&&0!==_.length||u(c,{get:_,set:d})}}return t}function i(){for(var t=0,e=arguments.length;t<e;t++){var i=arguments[t];i&&c(this,i)}return this}var n=/^(statics|enumerable|beans|preserve)$/,r=[],s=r.slice,a=Object.create,o=Object.getOwnPropertyDescriptor,h=Object.defineProperty,u=r.forEach||function(t,e){for(var i=0,n=this.length;i<n;i++)t.call(e,this[i],i,this)},l=function(t,e){for(var i in this)this.hasOwnProperty(i)&&t.call(e,this[i],i,this)},c=Object.assign||function(t){for(var e=1,i=arguments.length;e<i;e++){var n=arguments[e];for(var r in n)n.hasOwnProperty(r)&&(t[r]=n[r])}return t},f=function(t,e,i){if(t){var n=o(t,"length");(n&&"number"==typeof n.value?u:l).call(t,e,i=i||t)}return i};return t(i,{inject:function(e){if(e){var i=!0===e.statics?e:e.statics,n=e.beans,r=e.preserve;i!==e&&t(this.prototype,e,e.enumerable,n,r),t(this,i,null,n,r)}for(var s=1,a=arguments.length;s<a;s++)this.inject(arguments[s]);return this},extend:function(){for(var e,i,n,r=this,s=0,o=arguments.length;s<o&&(!e||!i);s++)n=arguments[s],e=e||n.initialize,i=i||n.prototype;return e=e||function(){r.apply(this,arguments)},i=e.prototype=i||a(this.prototype),h(i,"constructor",{value:e,writable:!0,configurable:!0}),t(e,this),arguments.length&&this.inject.apply(e,arguments),e.base=r,e}}).inject({enumerable:!1,initialize:i,set:i,inject:function(){for(var e=0,i=arguments.length;e<i;e++){var n=arguments[e];n&&t(this,n,n.enumerable,n.beans,n.preserve)}return this},extend:function(){var t=a(this);return t.inject.apply(t,arguments)},each:function(t,e){return f(this,t,e)},clone:function(){return new this.constructor(this)},statics:{set:c,each:f,create:a,define:h,describe:o,clone:function(t){return c(new t.constructor,t)},isPlainObject:function(t){var e=null!=t&&t.constructor;return e&&(e===Object||e===i||"Object"===e.name)},pick:function(t,i){return t!==e?t:i},slice:function(t,e,i){return s.call(t,e,i)}}})};"undefined"!=typeof module&&(module.exports=r),r.inject({enumerable:!1,toString:function(){return null!=this._id?(this._class||"Object")+(this._name?" '"+this._name+"'":" @"+this._id):"{ "+r.each(this,function(t,e){if(!/^_/.test(e)){var i=typeof t;this.push(e+": "+("number"===i?h.instance.number(t):"string"===i?"'"+t+"'":t))}},[]).join(", ")+" }"},getClassName:function(){return this._class||""},importJSON:function(t){return r.importJSON(t,this)},exportJSON:function(t){return r.exportJSON(this,t)},toJSON:function(){return r.serialize(this)},set:function(t,e){return t&&r.filter(this,t,e,this._prioritize),this}},{beans:!1,statics:{exports:{},extend:function t(){var e=t.base.apply(this,arguments),i=e.prototype._class;return i&&!r.exports[i]&&(r.exports[i]=e),e},equals:function(t,e){if(t===e)return!0;if(t&&t.equals)return t.equals(e);if(e&&e.equals)return e.equals(t);if(t&&e&&"object"==typeof t&&"object"==typeof e){if(Array.isArray(t)&&Array.isArray(e)){if((n=t.length)!==e.length)return!1;for(;n--;)if(!r.equals(t[n],e[n]))return!1}else{var i=Object.keys(t),n=i.length;if(n!==Object.keys(e).length)return!1;for(;n--;){var s=i[n];if(!e.hasOwnProperty(s)||!r.equals(t[s],e[s]))return!1}}return!0}return!1},read:function(t,i,n,s){if(this===r){var a=this.peek(t,i);return t.__index++,a}var o=this.prototype,h=o._readIndex,u=i||h&&t.__index||0,l=t.length,c=t[u];if(s=s||l-u,c instanceof this||n&&n.readNull&&null==c&&s<=1)return h&&(t.__index=u+1),c&&n&&n.clone?c.clone():c;if(c=r.create(o),h&&(c.__read=!0),c=c.initialize.apply(c,u>0||u+s<l?r.slice(t,u,u+s):t)||c,h){t.__index=u+c.__read;var f=c.__filtered;f&&(t.__filtered=f,c.__filtered=e),c.__read=e}return c},peek:function(t,e){return t[t.__index=e||t.__index||0]},remain:function(t){return t.length-(t.__index||0)},readList:function(t,e,i,n){for(var r,s=[],a=e||0,o=n?a+n:t.length,h=a;h<o;h++)s.push(Array.isArray(r=t[h])?this.read(r,0,i):this.read(t,h,i,1));return s},readNamed:function(t,i,n,s,a){var o=this.getNamed(t,i),h=o!==e;if(h){var u=t.__filtered;u||((u=t.__filtered=r.create(t[0])).__unfiltered=t[0]),u[i]=e}var l=h?[o]:t;return this.read(l,n,s,a)},getNamed:function(t,i){var n=t[0];if(t._hasObject===e&&(t._hasObject=1===t.length&&r.isPlainObject(n)),t._hasObject)return i?n[i]:t.__filtered||n},hasNamed:function(t,e){return!!this.getNamed(t,e)},filter:function(t,i,n,r){function s(r){if(!(n&&r in n||a&&r in a)){var s=i[r];s!==e&&(t[r]=s)}}var a;if(r){for(var o,h={},u=0,l=r.length;u<l;u++)(o=r[u])in i&&(s(o),h[o]=!0);a=h}return Object.keys(i.__unfiltered||i).forEach(s),t},isPlainValue:function(t,e){return r.isPlainObject(t)||Array.isArray(t)||e&&"string"==typeof t},serialize:function(t,e,i,n){e=e||{};var s,a=!n;if(a&&(e.formatter=new h(e.precision),n={length:0,definitions:{},references:{},add:function(t,e){var i="#"+t._id,n=this.references[i];if(!n){this.length++;var r=e.call(t),s=t._class;s&&r[0]!==s&&r.unshift(s),this.definitions[i]=r,n=this.references[i]=[i]}return n}}),t&&t._serialize){s=t._serialize(e,n);var o=t._class;!o||t._compactSerialize||!a&&i||s[0]===o||s.unshift(o)}else if(Array.isArray(t)){s=[];for(var u=0,l=t.length;u<l;u++)s[u]=r.serialize(t[u],e,i,n)}else if(r.isPlainObject(t)){s={};for(var c=Object.keys(t),u=0,l=c.length;u<l;u++){var f=c[u];s[f]=r.serialize(t[f],e,i,n)}}else s="number"==typeof t?e.formatter.number(t,e.precision):t;return a&&n.length>0?[["dictionary",n.definitions],s]:s},deserialize:function(t,e,i,n,s){var a=t,o=!i,h=o&&t&&t.length&&"dictionary"===t[0][0];if(i=i||{},Array.isArray(t)){var u=t[0],l="dictionary"===u;if(1==t.length&&/^#/.test(u))return i.dictionary[u];a=[];for(var c=(u=r.exports[u])?1:0,f=t.length;c<f;c++)a.push(r.deserialize(t[c],e,i,l,h));if(u){var d=a;e?a=e(u,d,o||s):(a=r.create(u.prototype),u.apply(a,d))}}else if(r.isPlainObject(t)){a={},n&&(i.dictionary=a);for(var _ in t)a[_]=r.deserialize(t[_],e,i)}return h?a[1]:a},exportJSON:function(t,e){var i=r.serialize(t,e);return e&&0==e.asString?i:JSON.stringify(i)},importJSON:function(t,e){return r.deserialize("string"==typeof t?JSON.parse(t):t,function(t,i,n){var s=n&&e&&e.constructor===t,a=s?e:r.create(t.prototype);if(1===i.length&&a instanceof w&&(s||!(a instanceof b))){var o=i[0];r.isPlainObject(o)&&(o.insert=!1)}return(s?a.set:t).apply(a,i),s&&(e=null),a})},splice:function(t,i,n,r){var s=i&&i.length,a=n===e;(n=a?t.length:n)>t.length&&(n=t.length);for(u=0;u<s;u++)i[u]._index=n+u;if(a)return t.push.apply(t,i),[];var o=[n,r];i&&o.push.apply(o,i);for(var h=t.splice.apply(t,o),u=0,l=h.length;u<l;u++)h[u]._index=e;for(var u=n+s,l=t.length;u<l;u++)t[u]._index=u;return h},capitalize:function(t){return t.replace(/\b[a-z]/g,function(t){return t.toUpperCase()})},camelize:function(t){return t.replace(/-(.)/g,function(t,e){return e.toUpperCase()})},hyphenate:function(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}}});var s={on:function(t,e){if("string"!=typeof t)r.each(t,function(t,e){this.on(e,t)},this);else{var i=this._eventTypes,n=i&&i[t],s=this._callbacks=this._callbacks||{};-1===(s=s[t]=s[t]||[]).indexOf(e)&&(s.push(e),n&&n.install&&1===s.length&&n.install.call(this,t))}return this},off:function(t,e){if("string"==typeof t){var i,n=this._eventTypes,s=n&&n[t],a=this._callbacks&&this._callbacks[t];return a&&(!e||-1!==(i=a.indexOf(e))&&1===a.length?(s&&s.uninstall&&s.uninstall.call(this,t),delete this._callbacks[t]):-1!==i&&a.splice(i,1)),this}r.each(t,function(t,e){this.off(e,t)},this)},once:function(t,e){return this.on(t,function(){e.apply(this,arguments),this.off(t,e)})},emit:function(t,e){var i=this._callbacks&&this._callbacks[t];if(!i)return!1;var n=r.slice(arguments,1),s=e&&e.target&&!e.currentTarget;i=i.slice(),s&&(e.currentTarget=this);for(var a=0,o=i.length;a<o;a++)if(0==i[a].apply(this,n)){e&&e.stop&&e.stop();break}return s&&delete e.currentTarget,!0},responds:function(t){return!(!this._callbacks||!this._callbacks[t])},attach:"#on",detach:"#off",fire:"#emit",_installEvents:function(t){var e=this._eventTypes,i=this._callbacks,n=t?"install":"uninstall";if(e)for(var r in i)if(i[r].length>0){var s=e[r],a=s&&s[n];a&&a.call(this,r)}},statics:{inject:function t(e){var i=e._events;if(i){var n={};r.each(i,function(t,i){var s="string"==typeof t,a=s?t:i,o=r.capitalize(a),h=a.substring(2).toLowerCase();n[h]=s?{}:t,a="_"+a,e["get"+o]=function(){return this[a]},e["set"+o]=function(t){var e=this[a];e&&this.off(h,e),t&&this.on(h,t),this[a]=t}}),e._eventTypes=n}return t.base.apply(this,arguments)}}},a=r.extend({_class:"PaperScope",initialize:function e(){paper=this,this.settings=new r({applyMatrix:!0,insertItems:!0,handleSize:4,hitTolerance:0}),this.project=null,this.projects=[],this.tools=[],this._id=e._id++,e._scopes[this._id]=this;var i=e.prototype;if(!this.support){var n=Q.getContext(1,1)||{};i.support={nativeDash:"setLineDash"in n||"mozDash"in n,nativeBlendModes:tt.nativeModes},Q.release(n)}if(!this.agent){var s=t.navigator.userAgent.toLowerCase(),a=(/(darwin|win|mac|linux|freebsd|sunos)/.exec(s)||[])[0],o="darwin"===a?"mac":a,h=i.agent=i.browser={platform:o};o&&(h[o]=!0),s.replace(/(opera|chrome|safari|webkit|firefox|msie|trident|atom|node)\/?\s*([.\d]+)(?:.*version\/([.\d]+))?(?:.*rv\:v?([.\d]+))?/g,function(t,e,i,n,r){if(!h.chrome){var s="opera"===e?n:/^(node|trident)$/.test(e)?r:i;h.version=s,h.versionNumber=parseFloat(s),e="trident"===e?"msie":e,h.name=e,h[e]=!0}}),h.chrome&&delete h.webkit,h.atom&&delete h.chrome}},version:"0.11.5",getView:function(){var t=this.project;return t&&t._view},getPaper:function(){return this},execute:function(t,e){paper.PaperScript.execute(t,this,e),U.updateFocus()},install:function(t){var e=this;r.each(["project","view","tool"],function(i){r.define(t,i,{configurable:!0,get:function(){return e[i]}})});for(var i in this)!/^_/.test(i)&&this[i]&&(t[i]=this[i])},setup:function(t){return paper=this,this.project=new y(t),this},createCanvas:function(t,e){return Q.getCanvas(t,e)},activate:function(){paper=this},clear:function(){for(var t=this.projects,e=this.tools,i=t.length-1;i>=0;i--)t[i].remove();for(i=e.length-1;i>=0;i--)e[i].remove()},remove:function(){this.clear(),delete a._scopes[this._id]},statics:new function(){function t(t){return t+="Attribute",function(e,i){return e[t](i)||e[t]("data-paper-"+i)}}return{_scopes:{},_id:0,get:function(t){return this._scopes[t]||null},getAttribute:t("get"),hasAttribute:t("has")}}}),o=r.extend(s,{initialize:function(t){this._scope=paper,this._index=this._scope[this._list].push(this)-1,!t&&this._scope[this._reference]||this.activate()},activate:function(){if(!this._scope)return!1;var t=this._scope[this._reference];return t&&t!==this&&t.emit("deactivate"),this._scope[this._reference]=this,this.emit("activate",t),!0},isActive:function(){return this._scope[this._reference]===this},remove:function(){return null!=this._index&&(r.splice(this._scope[this._list],null,this._index,1),this._scope[this._reference]==this&&(this._scope[this._reference]=null),this._scope=null,!0)},getView:function(){return this._scope.getView()}}),h=r.extend({initialize:function(t){this.precision=r.pick(t,5),this.multiplier=Math.pow(10,this.precision)},number:function(t){return this.precision<16?Math.round(t*this.multiplier)/this.multiplier:t},pair:function(t,e,i){return this.number(t)+(i||",")+this.number(e)},point:function(t,e){return this.number(t.x)+(e||",")+this.number(t.y)},size:function(t,e){return this.number(t.width)+(e||",")+this.number(t.height)},rectangle:function(t,e){return this.point(t,e)+(e||",")+this.size(t,e)}});h.instance=new h;var u=new function(){function t(t,e,i){return t<e?e:t>i?i:t}function e(t,e,i){function n(t){var e=134217729*t,i=t-e+e;return[i,t-i]}var r=e*e-t*i,a=e*e+t*i;if(3*s(r)<a){var o=n(t),h=n(e),u=n(i),l=e*e,c=t*i;r=l-c+(h[0]*h[0]-l+2*h[0]*h[1]+h[1]*h[1]-(o[0]*u[0]-c+o[0]*u[1]+o[1]*u[0]+o[1]*u[1]))}return r}function i(){var t=Math.max.apply(Math,arguments);return t&&(t<1e-8||t>1e8)?o(2,-Math.round(h(t))):0}var n=[[.5773502691896257],[0,.7745966692414834],[.33998104358485626,.8611363115940526],[0,.5384693101056831,.906179845938664],[.2386191860831969,.6612093864662645,.932469514203152],[0,.4058451513773972,.7415311855993945,.9491079123427585],[.1834346424956498,.525532409916329,.7966664774136267,.9602898564975363],[0,.3242534234038089,.6133714327005904,.8360311073266358,.9681602395076261],[.14887433898163122,.4333953941292472,.6794095682990244,.8650633666889845,.9739065285171717],[0,.26954315595234496,.5190961292068118,.7301520055740494,.8870625997680953,.978228658146057],[.1252334085114689,.3678314989981802,.5873179542866175,.7699026741943047,.9041172563704749,.9815606342467192],[0,.2304583159551348,.44849275103644687,.6423493394403402,.8015780907333099,.9175983992229779,.9841830547185881],[.10805494870734367,.31911236892788974,.5152486363581541,.6872929048116855,.827201315069765,.9284348836635735,.9862838086968123],[0,.20119409399743451,.3941513470775634,.5709721726085388,.7244177313601701,.8482065834104272,.937273392400706,.9879925180204854],[.09501250983763744,.2816035507792589,.45801677765722737,.6178762444026438,.755404408355003,.8656312023878318,.9445750230732326,.9894009349916499]],r=[[1],[.8888888888888888,.5555555555555556],[.6521451548625461,.34785484513745385],[.5688888888888889,.47862867049936647,.23692688505618908],[.46791393457269104,.3607615730481386,.17132449237917036],[.4179591836734694,.3818300505051189,.27970539148927664,.1294849661688697],[.362683783378362,.31370664587788727,.22238103445337448,.10122853629037626],[.3302393550012598,.31234707704000286,.26061069640293544,.1806481606948574,.08127438836157441],[.29552422471475287,.26926671930999635,.21908636251598204,.1494513491505806,.06667134430868814],[.2729250867779006,.26280454451024665,.23319376459199048,.18629021092773426,.1255803694649046,.05566856711617366],[.24914704581340277,.2334925365383548,.20316742672306592,.16007832854334622,.10693932599531843,.04717533638651183],[.2325515532308739,.22628318026289723,.2078160475368885,.17814598076194574,.13887351021978725,.09212149983772845,.04048400476531588],[.2152638534631578,.2051984637212956,.18553839747793782,.15720316715819355,.12151857068790319,.08015808715976021,.03511946033175186],[.2025782419255613,.19843148532711158,.1861610000155622,.16626920581699392,.13957067792615432,.10715922046717194,.07036604748810812,.03075324199611727],[.1894506104550685,.18260341504492358,.16915651939500254,.14959598881657674,.12462897125553388,.09515851168249279,.062253523938647894,.027152459411754096]],s=Math.abs,a=Math.sqrt,o=Math.pow,h=Math.log2||function(t){return Math.log(t)*Math.LOG2E};return{EPSILON:1e-12,MACHINE_EPSILON:1.12e-16,CURVETIME_EPSILON:1e-8,GEOMETRIC_EPSILON:1e-7,TRIGONOMETRIC_EPSILON:1e-8,KAPPA:4*(a(2)-1)/3,isZero:function(t){return t>=-1e-12&&t<=1e-12},clamp:t,integrate:function(t,e,i,s){for(var a=n[s-2],o=r[s-2],h=.5*(i-e),u=h+e,l=0,c=s+1>>1,f=1&s?o[l++]*t(u):0;l<c;){var d=h*a[l];f+=o[l++]*(t(u+d)+t(u-d))}return h*f},findRoot:function(e,i,n,r,a,o,h){for(var u=0;u<o;u++){var l=e(n),c=l/i(n),f=n-c;if(s(c)<h){n=f;break}l>0?(a=n,n=f<=r?.5*(r+a):f):(r=n,n=f>=a?.5*(r+a):f)}return t(n,r,a)},solveQuadratic:function(n,r,o,h,u,l){var c,f=1/0;if(s(n)<1e-12){if(s(r)<1e-12)return s(o)<1e-12?-1:0;c=-o/r}else{var d=e(n,r*=-.5,o);if(d&&s(d)<1.12e-16){var _=i(s(n),s(r),s(o));_&&(d=e(n*=_,r*=_,o*=_))}if(d>=-1.12e-16){var g=d<0?0:a(d),v=r+(r<0?-g:g);0===v?f=-(c=o/n):(c=v/n,f=o/v)}}var p=0,m=null==u,y=u-1e-12,w=l+1e-12;return isFinite(c)&&(m||c>y&&c<w)&&(h[p++]=m?c:t(c,u,l)),f!==c&&isFinite(f)&&(m||f>y&&f<w)&&(h[p++]=m?f:t(f,u,l)),p},solveCubic:function(e,n,r,h,l,c,f){function d(t){var i=e*(_=t);p=(i+(g=i+n))*_+(v=g*_+r),m=v*_+h}var _,g,v,p,m,y=i(s(e),s(n),s(r),s(h));if(y&&(e*=y,n*=y,r*=y,h*=y),s(e)<1e-12)e=n,g=r,v=h,_=1/0;else if(s(h)<1e-12)g=n,v=r,_=0;else{d(-n/e/3);var w=m/e,x=o(s(w),1/3),b=w<0?-1:1,C=-p/e,S=C>0?1.324717957244746*Math.max(x,a(C)):x,P=_-b*S;if(P!==_){do{d(P),P=0===p?_:_-m/p/(1+1.12e-16)}while(b*P>b*_);s(e)*_*_>s(h/_)&&(g=((v=-h/_)-r)/_)}}var I=u.solveQuadratic(e,g,v,l,c,f),M=null==c;return isFinite(_)&&(0===I||I>0&&_!==l[0]&&_!==l[1])&&(M||_>c-1e-12&&_<f+1e-12)&&(l[I++]=M?_:t(_,c,f)),I}}},l={_id:1,_pools:{},get:function(t){if(t){var e=this._pools[t];return e||(e=this._pools[t]={_id:1}),e._id++}return this._id++}},c=r.extend({_class:"Point",_readIndex:!0,initialize:function(t,e){var i=typeof t,n=this.__read,r=0;if("number"===i){var s="number"==typeof e;this._set(t,s?e:t),n&&(r=s?2:1)}else if("undefined"===i||null===t)this._set(0,0),n&&(r=null===t?1:0);else{var a="string"===i?t.split(/[\s,]+/)||[]:t;r=1,Array.isArray(a)?this._set(+a[0],+(a.length>1?a[1]:a[0])):"x"in a?this._set(a.x||0,a.y||0):"width"in a?this._set(a.width||0,a.height||0):"angle"in a?(this._set(a.length||0,0),this.setAngle(a.angle||0)):(this._set(0,0),r=0)}return n&&(this.__read=r),this},set:"#initialize",_set:function(t,e){return this.x=t,this.y=e,this},equals:function(t){return this===t||t&&(this.x===t.x&&this.y===t.y||Array.isArray(t)&&this.x===t[0]&&this.y===t[1])||!1},clone:function(){return new c(this.x,this.y)},toString:function(){var t=h.instance;return"{ x: "+t.number(this.x)+", y: "+t.number(this.y)+" }"},_serialize:function(t){var e=t.formatter;return[e.number(this.x),e.number(this.y)]},getLength:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},setLength:function(t){if(this.isZero()){var e=this._angle||0;this._set(Math.cos(e)*t,Math.sin(e)*t)}else{var i=t/this.getLength();u.isZero(i)&&this.getAngle(),this._set(this.x*i,this.y*i)}},getAngle:function(){return 180*this.getAngleInRadians.apply(this,arguments)/Math.PI},setAngle:function(t){this.setAngleInRadians.call(this,t*Math.PI/180)},getAngleInDegrees:"#getAngle",setAngleInDegrees:"#setAngle",getAngleInRadians:function(){if(arguments.length){var t=c.read(arguments),e=this.getLength()*t.getLength();if(u.isZero(e))return NaN;var i=this.dot(t)/e;return Math.acos(i<-1?-1:i>1?1:i)}return this.isZero()?this._angle||0:this._angle=Math.atan2(this.y,this.x)},setAngleInRadians:function(t){if(this._angle=t,!this.isZero()){var e=this.getLength();this._set(Math.cos(t)*e,Math.sin(t)*e)}},getQuadrant:function(){return this.x>=0?this.y>=0?1:4:this.y>=0?2:3}},{beans:!1,getDirectedAngle:function(){var t=c.read(arguments);return 180*Math.atan2(this.cross(t),this.dot(t))/Math.PI},getDistance:function(){var t=c.read(arguments),e=t.x-this.x,i=t.y-this.y,n=e*e+i*i;return r.read(arguments)?n:Math.sqrt(n)},normalize:function(t){t===e&&(t=1);var i=this.getLength(),n=0!==i?t/i:0,r=new c(this.x*n,this.y*n);return n>=0&&(r._angle=this._angle),r},rotate:function(t,e){if(0===t)return this.clone();t=t*Math.PI/180;var i=e?this.subtract(e):this,n=Math.sin(t),r=Math.cos(t);return i=new c(i.x*r-i.y*n,i.x*n+i.y*r),e?i.add(e):i},transform:function(t){return t?t._transformPoint(this):this},add:function(){var t=c.read(arguments);return new c(this.x+t.x,this.y+t.y)},subtract:function(){var t=c.read(arguments);return new c(this.x-t.x,this.y-t.y)},multiply:function(){var t=c.read(arguments);return new c(this.x*t.x,this.y*t.y)},divide:function(){var t=c.read(arguments);return new c(this.x/t.x,this.y/t.y)},modulo:function(){var t=c.read(arguments);return new c(this.x%t.x,this.y%t.y)},negate:function(){return new c(-this.x,-this.y)},isInside:function(){return g.read(arguments).contains(this)},isClose:function(){var t=c.read(arguments),e=r.read(arguments);return this.getDistance(t)<=e},isCollinear:function(){var t=c.read(arguments);return c.isCollinear(this.x,this.y,t.x,t.y)},isColinear:"#isCollinear",isOrthogonal:function(){var t=c.read(arguments);return c.isOrthogonal(this.x,this.y,t.x,t.y)},isZero:function(){var t=u.isZero;return t(this.x)&&t(this.y)},isNaN:function(){return isNaN(this.x)||isNaN(this.y)},isInQuadrant:function(t){return this.x*(t>1&&t<4?-1:1)>=0&&this.y*(t>2?-1:1)>=0},dot:function(){var t=c.read(arguments);return this.x*t.x+this.y*t.y},cross:function(){var t=c.read(arguments);return this.x*t.y-this.y*t.x},project:function(){var t=c.read(arguments),e=t.isZero()?0:this.dot(t)/t.dot(t);return new c(t.x*e,t.y*e)},statics:{min:function(){var t=c.read(arguments),e=c.read(arguments);return new c(Math.min(t.x,e.x),Math.min(t.y,e.y))},max:function(){var t=c.read(arguments),e=c.read(arguments);return new c(Math.max(t.x,e.x),Math.max(t.y,e.y))},random:function(){return new c(Math.random(),Math.random())},isCollinear:function(t,e,i,n){return Math.abs(t*n-e*i)<=1e-8*Math.sqrt((t*t+e*e)*(i*i+n*n))},isOrthogonal:function(t,e,i,n){return Math.abs(t*i+e*n)<=1e-8*Math.sqrt((t*t+e*e)*(i*i+n*n))}}},r.each(["round","ceil","floor","abs"],function(t){var e=Math[t];this[t]=function(){return new c(e(this.x),e(this.y))}},{})),f=c.extend({initialize:function(t,e,i,n){this._x=t,this._y=e,this._owner=i,this._setter=n},_set:function(t,e,i){return this._x=t,this._y=e,i||this._owner[this._setter](this),this},getX:function(){return this._x},setX:function(t){this._x=t,this._owner[this._setter](this)},getY:function(){return this._y},setY:function(t){this._y=t,this._owner[this._setter](this)},isSelected:function(){return!!(this._owner._selection&this._getSelection())},setSelected:function(t){this._owner._changeSelection(this._getSelection(),t)},_getSelection:function(){return"setPosition"===this._setter?4:0}}),d=r.extend({_class:"Size",_readIndex:!0,initialize:function(t,e){var i=typeof t,n=this.__read,r=0;if("number"===i){var s="number"==typeof e;this._set(t,s?e:t),n&&(r=s?2:1)}else if("undefined"===i||null===t)this._set(0,0),n&&(r=null===t?1:0);else{var a="string"===i?t.split(/[\s,]+/)||[]:t;r=1,Array.isArray(a)?this._set(+a[0],+(a.length>1?a[1]:a[0])):"width"in a?this._set(a.width||0,a.height||0):"x"in a?this._set(a.x||0,a.y||0):(this._set(0,0),r=0)}return n&&(this.__read=r),this},set:"#initialize",_set:function(t,e){return this.width=t,this.height=e,this},equals:function(t){return t===this||t&&(this.width===t.width&&this.height===t.height||Array.isArray(t)&&this.width===t[0]&&this.height===t[1])||!1},clone:function(){return new d(this.width,this.height)},toString:function(){var t=h.instance;return"{ width: "+t.number(this.width)+", height: "+t.number(this.height)+" }"},_serialize:function(t){var e=t.formatter;return[e.number(this.width),e.number(this.height)]},add:function(){var t=d.read(arguments);return new d(this.width+t.width,this.height+t.height)},subtract:function(){var t=d.read(arguments);return new d(this.width-t.width,this.height-t.height)},multiply:function(){var t=d.read(arguments);return new d(this.width*t.width,this.height*t.height)},divide:function(){var t=d.read(arguments);return new d(this.width/t.width,this.height/t.height)},modulo:function(){var t=d.read(arguments);return new d(this.width%t.width,this.height%t.height)},negate:function(){return new d(-this.width,-this.height)},isZero:function(){var t=u.isZero;return t(this.width)&&t(this.height)},isNaN:function(){return isNaN(this.width)||isNaN(this.height)},statics:{min:function(t,e){return new d(Math.min(t.width,e.width),Math.min(t.height,e.height))},max:function(t,e){return new d(Math.max(t.width,e.width),Math.max(t.height,e.height))},random:function(){return new d(Math.random(),Math.random())}}},r.each(["round","ceil","floor","abs"],function(t){var e=Math[t];this[t]=function(){return new d(e(this.width),e(this.height))}},{})),_=d.extend({initialize:function(t,e,i,n){this._width=t,this._height=e,this._owner=i,this._setter=n},_set:function(t,e,i){return this._width=t,this._height=e,i||this._owner[this._setter](this),this},getWidth:function(){return this._width},setWidth:function(t){this._width=t,this._owner[this._setter](this)},getHeight:function(){return this._height},setHeight:function(t){this._height=t,this._owner[this._setter](this)}}),g=r.extend({_class:"Rectangle",_readIndex:!0,beans:!0,initialize:function(t,i,n,s){var a,o=typeof t;if("number"===o?(this._set(t,i,n,s),a=4):"undefined"===o||null===t?(this._set(0,0,0,0),a=null===t?1:0):1===arguments.length&&(Array.isArray(t)?(this._set.apply(this,t),a=1):t.x!==e||t.width!==e?(this._set(t.x||0,t.y||0,t.width||0,t.height||0),a=1):t.from===e&&t.to===e&&(this._set(0,0,0,0),r.filter(this,t),a=1)),a===e){var h,u,l=c.readNamed(arguments,"from"),f=r.peek(arguments),_=l.x,g=l.y;if(f&&f.x!==e||r.hasNamed(arguments,"to")){var v=c.readNamed(arguments,"to");h=v.x-_,u=v.y-g,h<0&&(_=v.x,h=-h),u<0&&(g=v.y,u=-u)}else{var p=d.read(arguments);h=p.width,u=p.height}this._set(_,g,h,u),a=arguments.__index;var m=arguments.__filtered;m&&(this.__filtered=m)}return this.__read&&(this.__read=a),this},set:"#initialize",_set:function(t,e,i,n){return this.x=t,this.y=e,this.width=i,this.height=n,this},clone:function(){return new g(this.x,this.y,this.width,this.height)},equals:function(t){var e=r.isPlainValue(t)?g.read(arguments):t;return e===this||e&&this.x===e.x&&this.y===e.y&&this.width===e.width&&this.height===e.height||!1},toString:function(){var t=h.instance;return"{ x: "+t.number(this.x)+", y: "+t.number(this.y)+", width: "+t.number(this.width)+", height: "+t.number(this.height)+" }"},_serialize:function(t){var e=t.formatter;return[e.number(this.x),e.number(this.y),e.number(this.width),e.number(this.height)]},getPoint:function(t){return new(t?c:f)(this.x,this.y,this,"setPoint")},setPoint:function(){var t=c.read(arguments);this.x=t.x,this.y=t.y},getSize:function(t){return new(t?d:_)(this.width,this.height,this,"setSize")},_fw:1,_fh:1,setSize:function(){var t=d.read(arguments),e=this._sx,i=this._sy,n=t.width,r=t.height;e&&(this.x+=(this.width-n)*e),i&&(this.y+=(this.height-r)*i),this.width=n,this.height=r,this._fw=this._fh=1},getLeft:function(){return this.x},setLeft:function(t){if(!this._fw){var e=t-this.x;this.width-=.5===this._sx?2*e:e}this.x=t,this._sx=this._fw=0},getTop:function(){return this.y},setTop:function(t){if(!this._fh){var e=t-this.y;this.height-=.5===this._sy?2*e:e}this.y=t,this._sy=this._fh=0},getRight:function(){return this.x+this.width},setRight:function(t){if(!this._fw){var e=t-this.x;this.width=.5===this._sx?2*e:e}this.x=t-this.width,this._sx=1,this._fw=0},getBottom:function(){return this.y+this.height},setBottom:function(t){if(!this._fh){var e=t-this.y;this.height=.5===this._sy?2*e:e}this.y=t-this.height,this._sy=1,this._fh=0},getCenterX:function(){return this.x+this.width/2},setCenterX:function(t){this._fw||.5===this._sx?this.x=t-this.width/2:(this._sx&&(this.x+=2*(t-this.x)*this._sx),this.width=2*(t-this.x)),this._sx=.5,this._fw=0},getCenterY:function(){return this.y+this.height/2},setCenterY:function(t){this._fh||.5===this._sy?this.y=t-this.height/2:(this._sy&&(this.y+=2*(t-this.y)*this._sy),this.height=2*(t-this.y)),this._sy=.5,this._fh=0},getCenter:function(t){return new(t?c:f)(this.getCenterX(),this.getCenterY(),this,"setCenter")},setCenter:function(){var t=c.read(arguments);return this.setCenterX(t.x),this.setCenterY(t.y),this},getArea:function(){return this.width*this.height},isEmpty:function(){return 0===this.width||0===this.height},contains:function(t){return t&&t.width!==e||4===(Array.isArray(t)?t:arguments).length?this._containsRectangle(g.read(arguments)):this._containsPoint(c.read(arguments))},_containsPoint:function(t){var e=t.x,i=t.y;return e>=this.x&&i>=this.y&&e<=this.x+this.width&&i<=this.y+this.height},_containsRectangle:function(t){var e=t.x,i=t.y;return e>=this.x&&i>=this.y&&e+t.width<=this.x+this.width&&i+t.height<=this.y+this.height},intersects:function(){var t=g.read(arguments),e=r.read(arguments)||0;return t.x+t.width>this.x-e&&t.y+t.height>this.y-e&&t.x<this.x+this.width+e&&t.y<this.y+this.height+e},intersect:function(){var t=g.read(arguments),e=Math.max(this.x,t.x),i=Math.max(this.y,t.y),n=Math.min(this.x+this.width,t.x+t.width),r=Math.min(this.y+this.height,t.y+t.height);return new g(e,i,n-e,r-i)},unite:function(){var t=g.read(arguments),e=Math.min(this.x,t.x),i=Math.min(this.y,t.y),n=Math.max(this.x+this.width,t.x+t.width),r=Math.max(this.y+this.height,t.y+t.height);return new g(e,i,n-e,r-i)},include:function(){var t=c.read(arguments),e=Math.min(this.x,t.x),i=Math.min(this.y,t.y),n=Math.max(this.x+this.width,t.x),r=Math.max(this.y+this.height,t.y);return new g(e,i,n-e,r-i)},expand:function(){var t=d.read(arguments),e=t.width,i=t.height;return new g(this.x-e/2,this.y-i/2,this.width+e,this.height+i)},scale:function(t,i){return this.expand(this.width*t-this.width,this.height*(i===e?t:i)-this.height)}},r.each([["Top","Left"],["Top","Right"],["Bottom","Left"],["Bottom","Right"],["Left","Center"],["Top","Center"],["Right","Center"],["Bottom","Center"]],function(t,e){var i=t.join(""),n=/^[RL]/.test(i);e>=4&&(t[1]+=n?"Y":"X");var r=t[n?0:1],s=t[n?1:0],a="get"+r,o="get"+s,h="set"+r,u="set"+s,l="set"+i;this["get"+i]=function(t){return new(t?c:f)(this[a](),this[o](),this,l)},this[l]=function(){var t=c.read(arguments);this[h](t.x),this[u](t.y)}},{beans:!0})),v=g.extend({initialize:function(t,e,i,n,r,s){this._set(t,e,i,n,!0),this._owner=r,this._setter=s},_set:function(t,e,i,n,r){return this._x=t,this._y=e,this._width=i,this._height=n,r||this._owner[this._setter](this),this}},new function(){var t=g.prototype;return r.each(["x","y","width","height"],function(t){var e=r.capitalize(t),i="_"+t;this["get"+e]=function(){return this[i]},this["set"+e]=function(t){this[i]=t,this._dontNotify||this._owner[this._setter](this)}},r.each(["Point","Size","Center","Left","Top","Right","Bottom","CenterX","CenterY","TopLeft","TopRight","BottomLeft","BottomRight","LeftCenter","TopCenter","RightCenter","BottomCenter"],function(e){var i="set"+e;this[i]=function(){this._dontNotify=!0,t[i].apply(this,arguments),this._dontNotify=!1,this._owner[this._setter](this)}},{isSelected:function(){return!!(2&this._owner._selection)},setSelected:function(t){var e=this._owner;e._changeSelection&&e._changeSelection(2,t)}}))}),p=r.extend({_class:"Matrix",initialize:function t(e,i){var n=arguments.length,r=!0;if(n>=6?this._set.apply(this,arguments):1===n||2===n?e instanceof t?this._set(e._a,e._b,e._c,e._d,e._tx,e._ty,i):Array.isArray(e)?this._set.apply(this,i?e.concat([i]):e):r=!1:n?r=!1:this.reset(),!r)throw new Error("Unsupported matrix parameters");return this},set:"#initialize",_set:function(t,e,i,n,r,s,a){return this._a=t,this._b=e,this._c=i,this._d=n,this._tx=r,this._ty=s,a||this._changed(),this},_serialize:function(t,e){return r.serialize(this.getValues(),t,!0,e)},_changed:function(){var t=this._owner;t&&(t._applyMatrix?t.transform(null,!0):t._changed(9))},clone:function(){return new p(this._a,this._b,this._c,this._d,this._tx,this._ty)},equals:function(t){return t===this||t&&this._a===t._a&&this._b===t._b&&this._c===t._c&&this._d===t._d&&this._tx===t._tx&&this._ty===t._ty},toString:function(){var t=h.instance;return"[["+[t.number(this._a),t.number(this._c),t.number(this._tx)].join(", ")+"], ["+[t.number(this._b),t.number(this._d),t.number(this._ty)].join(", ")+"]]"},reset:function(t){return this._a=this._d=1,this._b=this._c=this._tx=this._ty=0,t||this._changed(),this},apply:function(t,e){var i=this._owner;return!!i&&(i.transform(null,!0,r.pick(t,!0),e),this.isIdentity())},translate:function(){var t=c.read(arguments),e=t.x,i=t.y;return this._tx+=e*this._a+i*this._c,this._ty+=e*this._b+i*this._d,this._changed(),this},scale:function(){var t=c.read(arguments),e=c.read(arguments,0,{readNull:!0});return e&&this.translate(e),this._a*=t.x,this._b*=t.x,this._c*=t.y,this._d*=t.y,e&&this.translate(e.negate()),this._changed(),this},rotate:function(t){t*=Math.PI/180;var e=c.read(arguments,1),i=e.x,n=e.y,r=Math.cos(t),s=Math.sin(t),a=i-i*r+n*s,o=n-i*s-n*r,h=this._a,u=this._b,l=this._c,f=this._d;return this._a=r*h+s*l,this._b=r*u+s*f,this._c=-s*h+r*l,this._d=-s*u+r*f,this._tx+=a*h+o*l,this._ty+=a*u+o*f,this._changed(),this},shear:function(){var t=c.read(arguments),e=c.read(arguments,0,{readNull:!0});e&&this.translate(e);var i=this._a,n=this._b;return this._a+=t.y*this._c,this._b+=t.y*this._d,this._c+=t.x*i,this._d+=t.x*n,e&&this.translate(e.negate()),this._changed(),this},skew:function(){var t=c.read(arguments),e=c.read(arguments,0,{readNull:!0}),i=Math.PI/180,n=new c(Math.tan(t.x*i),Math.tan(t.y*i));return this.shear(n,e)},append:function(t,e){if(t){var i=this._a,n=this._b,r=this._c,s=this._d,a=t._a,o=t._c,h=t._b,u=t._d,l=t._tx,c=t._ty;this._a=a*i+h*r,this._c=o*i+u*r,this._b=a*n+h*s,this._d=o*n+u*s,this._tx+=l*i+c*r,this._ty+=l*n+c*s,e||this._changed()}return this},prepend:function(t,e){if(t){var i=this._a,n=this._b,r=this._c,s=this._d,a=this._tx,o=this._ty,h=t._a,u=t._c,l=t._b,c=t._d,f=t._tx,d=t._ty;this._a=h*i+u*n,this._c=h*r+u*s,this._b=l*i+c*n,this._d=l*r+c*s,this._tx=h*a+u*o+f,this._ty=l*a+c*o+d,e||this._changed()}return this},appended:function(t){return this.clone().append(t)},prepended:function(t){return this.clone().prepend(t)},invert:function(){var t=this._a,e=this._b,i=this._c,n=this._d,r=this._tx,s=this._ty,a=t*n-e*i,o=null;return a&&!isNaN(a)&&isFinite(r)&&isFinite(s)&&(this._a=n/a,this._b=-e/a,this._c=-i/a,this._d=t/a,this._tx=(i*s-n*r)/a,this._ty=(e*r-t*s)/a,o=this),o},inverted:function(){return this.clone().invert()},concatenate:"#append",preConcatenate:"#prepend",chain:"#appended",_shiftless:function(){return new p(this._a,this._b,this._c,this._d,0,0)},_orNullIfIdentity:function(){return this.isIdentity()?null:this},isIdentity:function(){return 1===this._a&&0===this._b&&0===this._c&&1===this._d&&0===this._tx&&0===this._ty},isInvertible:function(){var t=this._a*this._d-this._c*this._b;return t&&!isNaN(t)&&isFinite(this._tx)&&isFinite(this._ty)},isSingular:function(){return!this.isInvertible()},transform:function(t,e,i){return arguments.length<3?this._transformPoint(c.read(arguments)):this._transformCoordinates(t,e,i)},_transformPoint:function(t,e,i){var n=t.x,r=t.y;return e||(e=new c),e._set(n*this._a+r*this._c+this._tx,n*this._b+r*this._d+this._ty,i)},_transformCoordinates:function(t,e,i){for(var n=0,r=2*i;n<r;n+=2){var s=t[n],a=t[n+1];e[n]=s*this._a+a*this._c+this._tx,e[n+1]=s*this._b+a*this._d+this._ty}return e},_transformCorners:function(t){var e=t.x,i=t.y,n=e+t.width,r=i+t.height,s=[e,i,n,i,n,r,e,r];return this._transformCoordinates(s,s,4)},_transformBounds:function(t,e,i){for(var n=this._transformCorners(t),r=n.slice(0,2),s=r.slice(),a=2;a<8;a++){var o=n[a],h=1&a;o<r[h]?r[h]=o:o>s[h]&&(s[h]=o)}return e||(e=new g),e._set(r[0],r[1],s[0]-r[0],s[1]-r[1],i)},inverseTransform:function(){return this._inverseTransform(c.read(arguments))},_inverseTransform:function(t,e,i){var n=this._a,r=this._b,s=this._c,a=this._d,o=this._tx,h=this._ty,u=n*a-r*s,l=null;if(u&&!isNaN(u)&&isFinite(o)&&isFinite(h)){var f=t.x-this._tx,d=t.y-this._ty;e||(e=new c),l=e._set((f*a-d*s)/u,(d*n-f*r)/u,i)}return l},decompose:function(){var t,e,i,n=this._a,r=this._b,s=this._c,a=this._d,o=n*a-r*s,h=Math.sqrt,u=Math.atan2,l=180/Math.PI;if(0!==n||0!==r){var f=h(n*n+r*r);t=Math.acos(n/f)*(r>0?1:-1),e=[f,o/f],i=[u(n*s+r*a,f*f),0]}else if(0!==s||0!==a){var d=h(s*s+a*a);t=Math.asin(s/d)*(a>0?1:-1),e=[o/d,d],i=[0,u(n*s+r*a,d*d)]}else t=0,i=e=[0,0];return{translation:this.getTranslation(),rotation:t*l,scaling:new c(e),skewing:new c(i[0]*l,i[1]*l)}},getValues:function(){return[this._a,this._b,this._c,this._d,this._tx,this._ty]},getTranslation:function(){return new c(this._tx,this._ty)},getScaling:function(){return(this.decompose()||{}).scaling},getRotation:function(){return(this.decompose()||{}).rotation},applyToContext:function(t){this.isIdentity()||t.transform(this._a,this._b,this._c,this._d,this._tx,this._ty)}},r.each(["a","b","c","d","tx","ty"],function(t){var e=r.capitalize(t),i="_"+t;this["get"+e]=function(){return this[i]},this["set"+e]=function(t){this[i]=t,this._changed()}},{})),m=r.extend({_class:"Line",initialize:function(t,e,i,n,r){var s=!1;arguments.length>=4?(this._px=t,this._py=e,this._vx=i,this._vy=n,s=r):(this._px=t.x,this._py=t.y,this._vx=e.x,this._vy=e.y,s=i),s||(this._vx-=this._px,this._vy-=this._py)},getPoint:function(){return new c(this._px,this._py)},getVector:function(){return new c(this._vx,this._vy)},getLength:function(){return this.getVector().getLength()},intersect:function(t,e){return m.intersect(this._px,this._py,this._vx,this._vy,t._px,t._py,t._vx,t._vy,!0,e)},getSide:function(t,e){return m.getSide(this._px,this._py,this._vx,this._vy,t.x,t.y,!0,e)},getDistance:function(t){return Math.abs(this.getSignedDistance(t))},getSignedDistance:function(t){return m.getSignedDistance(this._px,this._py,this._vx,this._vy,t.x,t.y,!0)},isCollinear:function(t){return c.isCollinear(this._vx,this._vy,t._vx,t._vy)},isOrthogonal:function(t){return c.isOrthogonal(this._vx,this._vy,t._vx,t._vy)},statics:{intersect:function(t,e,i,n,r,s,a,o,h,l){h||(i-=t,n-=e,a-=r,o-=s);var f=i*o-n*a;if(!u.isZero(f)){var d=t-r,_=e-s,g=(a*_-o*d)/f,v=(i*_-n*d)/f;if(l||-1e-12<g&&g<1+1e-12&&-1e-12<v&&v<1+1e-12)return l||(g=g<=0?0:g>=1?1:g),new c(t+g*i,e+g*n)}},getSide:function(t,e,i,n,r,s,a,o){a||(i-=t,n-=e);var h=r-t,l=h*n-(s-e)*i;return!o&&u.isZero(l)&&(l=(h*i+h*i)/(i*i+n*n))>=0&&l<=1&&(l=0),l<0?-1:l>0?1:0},getSignedDistance:function(t,e,i,n,r,s,a){return a||(i-=t,n-=e),0===i?n>0?r-t:t-r:0===n?i<0?s-e:e-s:((r-t)*n-(s-e)*i)/Math.sqrt(i*i+n*n)},getDistance:function(t,e,i,n,r,s,a){return Math.abs(m.getSignedDistance(t,e,i,n,r,s,a))}}}),y=o.extend({_class:"Project",_list:"projects",_reference:"project",_compactSerialize:!0,initialize:function(t){o.call(this,!0),this._children=[],this._namedChildren={},this._activeLayer=null,this._currentStyle=new V(null,null,this),this._view=U.create(this,t||Q.getCanvas(1,1)),this._selectionItems={},this._selectionCount=0,this._updateVersion=0},_serialize:function(t,e){return r.serialize(this._children,t,!0,e)},_changed:function(t,e){if(1&t){var i=this._view;i&&(i._needsUpdate=!0,!i._requested&&i._autoUpdate&&i.requestUpdate())}var n=this._changes;if(n&&e){var r=this._changesById,s=e._id,a=r[s];a?a.flags|=t:n.push(r[s]={item:e,flags:t})}},clear:function(){for(var t=this._children,e=t.length-1;e>=0;e--)t[e].remove()},isEmpty:function(){return!this._children.length},remove:function t(){return!!t.base.call(this)&&(this._view&&this._view.remove(),!0)},getView:function(){return this._view},getCurrentStyle:function(){return this._currentStyle},setCurrentStyle:function(t){this._currentStyle.set(t)},getIndex:function(){return this._index},getOptions:function(){return this._scope.settings},getLayers:function(){return this._children},getActiveLayer:function(){return this._activeLayer||new b({project:this,insert:!0})},getSymbolDefinitions:function(){var t=[],e={};return this.getItems({class:P,match:function(i){var n=i._definition,r=n._id;return e[r]||(e[r]=!0,t.push(n)),!1}}),t},getSymbols:"getSymbolDefinitions",getSelectedItems:function(){var t=this._selectionItems,e=[];for(var i in t){var n=t[i],r=n._selection;1&r&&n.isInserted()?e.push(n):r||this._updateSelection(n)}return e},_updateSelection:function(t){var e=t._id,i=this._selectionItems;t._selection?i[e]!==t&&(this._selectionCount++,i[e]=t):i[e]===t&&(this._selectionCount--,delete i[e])},selectAll:function(){for(var t=this._children,e=0,i=t.length;e<i;e++)t[e].setFullySelected(!0)},deselectAll:function(){var t=this._selectionItems;for(var e in t)t[e].setFullySelected(!1)},addLayer:function(t){return this.insertLayer(e,t)},insertLayer:function(t,e){if(e instanceof b){e._remove(!1,!0),r.splice(this._children,[e],t,0),e._setProject(this,!0);var i=e._name;i&&e.setName(i),this._changes&&e._changed(5),this._activeLayer||(this._activeLayer=e)}else e=null;return e},_insertItem:function(t,i,n){return i=this.insertLayer(t,i)||(this._activeLayer||this._insertItem(e,new b(w.NO_INSERT),!0)).insertChild(t,i),n&&i.activate&&i.activate(),i},getItems:function(t){return w._getItems(this,t)},getItem:function(t){return w._getItems(this,t,null,null,!0)[0]||null},importJSON:function(t){this.activate();var e=this._activeLayer;return r.importJSON(t,e&&e.isEmpty()&&e)},removeOn:function(t){var e=this._removeSets;if(e){"mouseup"===t&&(e.mousedrag=null);var i=e[t];if(i){for(var n in i){var r=i[n];for(var s in e){var a=e[s];a&&a!=i&&delete a[r._id]}r.remove()}e[t]=null}}},draw:function(t,e,i){this._updateVersion++,t.save(),e.applyToContext(t);for(var n=this._children,s=new r({offset:new c(0,0),pixelRatio:i,viewMatrix:e.isIdentity()?null:e,matrices:[new p],updateMatrix:!0}),a=0,o=n.length;a<o;a++)n[a].draw(t,s);if(t.restore(),this._selectionCount>0){t.save(),t.strokeWidth=1;var h=this._selectionItems,u=this._scope.settings.handleSize,l=this._updateVersion;for(var f in h)h[f]._drawSelection(t,e,u,h,l);t.restore()}}}),w=r.extend(s,{statics:{extend:function t(e){return e._serializeFields&&(e._serializeFields=r.set({},this.prototype._serializeFields,e._serializeFields)),t.base.apply(this,arguments)},NO_INSERT:{insert:!1}},_class:"Item",_name:null,_applyMatrix:!0,_canApplyMatrix:!0,_canScaleStroke:!1,_pivot:null,_visible:!0,_blendMode:"normal",_opacity:1,_locked:!1,_guide:!1,_clipMask:!1,_selection:0,_selectBounds:!0,_selectChildren:!1,_serializeFields:{name:null,applyMatrix:null,matrix:new p,pivot:null,visible:!0,blendMode:"normal",opacity:1,locked:!1,guide:!1,clipMask:!1,selected:!1,data:{}},_prioritize:["applyMatrix"]},new function(){var t=["onMouseDown","onMouseUp","onMouseDrag","onClick","onDoubleClick","onMouseMove","onMouseEnter","onMouseLeave"];return r.each(t,function(t){this._events[t]={install:function(t){this.getView()._countItemEvent(t,1)},uninstall:function(t){this.getView()._countItemEvent(t,-1)}}},{_events:{onFrame:{install:function(){this.getView()._animateItem(this,!0)},uninstall:function(){this.getView()._animateItem(this,!1)}},onLoad:{},onError:{}},statics:{_itemHandlers:t}})},{initialize:function(){},_initialize:function(t,i){var n=t&&r.isPlainObject(t),s=n&&!0===t.internal,a=this._matrix=new p,o=n&&t.project||paper.project,h=paper.settings;return this._id=s?null:l.get(),this._parent=this._index=null,this._applyMatrix=this._canApplyMatrix&&h.applyMatrix,i&&a.translate(i),a._owner=this,this._style=new V(o._currentStyle,this,o),s||n&&0==t.insert||!h.insertItems&&(!n||!0!==t.insert)?this._setProject(o):(n&&t.parent||o)._insertItem(e,this,!0),n&&t!==w.NO_INSERT&&this.set(t,{internal:!0,insert:!0,project:!0,parent:!0}),n},_serialize:function(t,e){function i(i){for(var a in i){var o=s[a];r.equals(o,"leading"===a?1.2*i.fontSize:i[a])||(n[a]=r.serialize(o,t,"data"!==a,e))}}var n={},s=this;return i(this._serializeFields),this instanceof x||i(this._style._defaults),[this._class,n]},_changed:function(t){var i=this._symbol,n=this._parent||i,r=this._project;8&t&&(this._bounds=this._position=this._decomposed=this._globalMatrix=e),n&&40&t&&w._clearBoundsCache(n),2&t&&w._clearBoundsCache(this),r&&r._changed(t,this),i&&i._changed(t)},getId:function(){return this._id},getName:function(){return this._name},setName:function(t){if(this._name&&this._removeNamed(),t===+t+"")throw new Error("Names consisting only of numbers are not supported.");var i=this._getOwner();if(t&&i){var n=i._children,r=i._namedChildren;(r[t]=r[t]||[]).push(this),t in n||(n[t]=this)}this._name=t||e,this._changed(128)},getStyle:function(){return this._style},setStyle:function(t){this.getStyle().set(t)}},r.each(["locked","visible","blendMode","opacity","guide"],function(t){var e=r.capitalize(t),i="_"+t,n={locked:128,visible:137};this["get"+e]=function(){return this[i]},this["set"+e]=function(e){e!=this[i]&&(this[i]=e,this._changed(n[t]||129))}},{}),{beans:!0,getSelection:function(){return this._selection},setSelection:function(t){if(t!==this._selection){this._selection=t;var e=this._project;e&&(e._updateSelection(this),this._changed(129))}},_changeSelection:function(t,e){var i=this._selection;this.setSelection(e?i|t:i&~t)},isSelected:function(){if(this._selectChildren)for(var t=this._children,e=0,i=t.length;e<i;e++)if(t[e].isSelected())return!0;return!!(1&this._selection)},setSelected:function(t){if(this._selectChildren)for(var e=this._children,i=0,n=e.length;i<n;i++)e[i].setSelected(t);this._changeSelection(1,t)},isFullySelected:function(){var t=this._children,e=!!(1&this._selection);if(t&&e){for(var i=0,n=t.length;i<n;i++)if(!t[i].isFullySelected())return!1;return!0}return e},setFullySelected:function(t){var e=this._children;if(e)for(var i=0,n=e.length;i<n;i++)e[i].setFullySelected(t);this._changeSelection(1,t)},isClipMask:function(){return this._clipMask},setClipMask:function(t){this._clipMask!=(t=!!t)&&(this._clipMask=t,t&&(this.setFillColor(null),this.setStrokeColor(null)),this._changed(129),this._parent&&this._parent._changed(1024))},getData:function(){return this._data||(this._data={}),this._data},setData:function(t){this._data=t},getPosition:function(t){var e=this._position,i=t?c:f;if(!e){var n=this._pivot;e=this._position=n?this._matrix._transformPoint(n):this.getBounds().getCenter(!0)}return new i(e.x,e.y,this,"setPosition")},setPosition:function(){this.translate(c.read(arguments).subtract(this.getPosition(!0)))},getPivot:function(){var t=this._pivot;return t?new f(t.x,t.y,this,"setPivot"):null},setPivot:function(){this._pivot=c.read(arguments,0,{clone:!0,readNull:!0}),this._position=e}},r.each({getStrokeBounds:{stroke:!0},getHandleBounds:{handle:!0},getInternalBounds:{internal:!0}},function(t,e){this[e]=function(e){return this.getBounds(e,t)}},{beans:!0,getBounds:function(t,e){var i=e||t instanceof p,n=r.set({},i?e:t,this._boundsOptions);n.stroke&&!this.getStrokeScaling()||(n.cacheItem=this);var s=this._getCachedBounds(i&&t,n).rect;return arguments.length?s:new v(s.x,s.y,s.width,s.height,this,"setBounds")},setBounds:function(){var t=g.read(arguments),e=this.getBounds(),i=this._matrix,n=new p,r=t.getCenter();n.translate(r),t.width==e.width&&t.height==e.height||(i.isInvertible()||(i.set(i._backup||(new p).translate(i.getTranslation())),e=this.getBounds()),n.scale(0!==e.width?t.width/e.width:0,0!==e.height?t.height/e.height:0)),r=e.getCenter(),n.translate(-r.x,-r.y),this.transform(n)},_getBounds:function(t,e){var i=this._children;return i&&i.length?(w._updateBoundsCache(this,e.cacheItem),w._getBounds(i,t,e)):new g},_getBoundsCacheKey:function(t,e){return[t.stroke?1:0,t.handle?1:0,e?1:0].join("")},_getCachedBounds:function(t,e,i){t=t&&t._orNullIfIdentity();var n=e.internal&&!i,r=e.cacheItem,s=n?null:this._matrix._orNullIfIdentity(),a=r&&(!t||t.equals(s))&&this._getBoundsCacheKey(e,n),o=this._bounds;if(w._updateBoundsCache(this._parent||this._symbol,r),a&&o&&a in o)return{rect:(f=o[a]).rect.clone(),nonscaling:f.nonscaling};var h=this._getBounds(t||s,e),u=h.rect||h,l=this._style,c=h.nonscaling||l.hasStroke()&&!l.getStrokeScaling();if(a){o||(this._bounds=o={});var f=o[a]={rect:u.clone(),nonscaling:c,internal:n}}return{rect:u,nonscaling:c}},_getStrokeMatrix:function(t,e){var i=this.getStrokeScaling()?null:e&&e.internal?this:this._parent||this._symbol&&this._symbol._item,n=i?i.getViewMatrix().invert():t;return n&&n._shiftless()},statics:{_updateBoundsCache:function(t,e){if(t&&e){var i=e._id,n=t._boundsCache=t._boundsCache||{ids:{},list:[]};n.ids[i]||(n.list.push(e),n.ids[i]=e)}},_clearBoundsCache:function(t){var i=t._boundsCache;if(i){t._bounds=t._position=t._boundsCache=e;for(var n=0,r=i.list,s=r.length;n<s;n++){var a=r[n];a!==t&&(a._bounds=a._position=e,a._boundsCache&&w._clearBoundsCache(a))}}},_getBounds:function(t,e,i){var n=1/0,r=-n,s=n,a=r,o=!1;i=i||{};for(var h=0,u=t.length;h<u;h++){var l=t[h];if(l._visible&&!l.isEmpty()){var c=l._getCachedBounds(e&&e.appended(l._matrix),i,!0),f=c.rect;n=Math.min(f.x,n),s=Math.min(f.y,s),r=Math.max(f.x+f.width,r),a=Math.max(f.y+f.height,a),c.nonscaling&&(o=!0)}}return{rect:isFinite(n)?new g(n,s,r-n,a-s):new g,nonscaling:o}}}}),{beans:!0,_decompose:function(){return this._applyMatrix?null:this._decomposed||(this._decomposed=this._matrix.decompose())},getRotation:function(){var t=this._decompose();return t?t.rotation:0},setRotation:function(t){var e=this.getRotation();if(null!=e&&null!=t){var i=this._decomposed;this.rotate(t-e),i&&(i.rotation=t,this._decomposed=i)}},getScaling:function(){var t=this._decompose(),e=t&&t.scaling;return new f(e?e.x:1,e?e.y:1,this,"setScaling")},setScaling:function(){var t=this.getScaling(),e=c.read(arguments,0,{clone:!0,readNull:!0});if(t&&e&&!t.equals(e)){var i=this.getRotation(),n=this._decomposed,r=new p,s=this.getPosition(!0);r.translate(s),i&&r.rotate(i),r.scale(e.x/t.x,e.y/t.y),i&&r.rotate(-i),r.translate(s.negate()),this.transform(r),n&&(n.scaling=e,this._decomposed=n)}},getMatrix:function(){return this._matrix},setMatrix:function(){var t=this._matrix;t.initialize.apply(t,arguments)},getGlobalMatrix:function(t){var e=this._globalMatrix,i=this._project._updateVersion;if(e&&e._updateVersion!==i&&(e=null),!e){e=this._globalMatrix=this._matrix.clone();var n=this._parent;n&&e.prepend(n.getGlobalMatrix(!0)),e._updateVersion=i}return t?e:e.clone()},getViewMatrix:function(){return this.getGlobalMatrix().prepend(this.getView()._matrix)},getApplyMatrix:function(){return this._applyMatrix},setApplyMatrix:function(t){(this._applyMatrix=this._canApplyMatrix&&!!t)&&this.transform(null,!0)},getTransformContent:"#getApplyMatrix",setTransformContent:"#setApplyMatrix"},{getProject:function(){return this._project},_setProject:function(t,e){if(this._project!==t){this._project&&this._installEvents(!1),this._project=t;for(var i=this._children,n=0,r=i&&i.length;n<r;n++)i[n]._setProject(t);e=!0}e&&this._installEvents(!0)},getView:function(){return this._project._view},_installEvents:function t(e){t.base.call(this,e);for(var i=this._children,n=0,r=i&&i.length;n<r;n++)i[n]._installEvents(e)},getLayer:function(){for(var t=this;t=t._parent;)if(t instanceof b)return t;return null},getParent:function(){return this._parent},setParent:function(t){return t.addChild(this)},_getOwner:"#getParent",getChildren:function(){return this._children},setChildren:function(t){this.removeChildren(),this.addChildren(t)},getFirstChild:function(){return this._children&&this._children[0]||null},getLastChild:function(){return this._children&&this._children[this._children.length-1]||null},getNextSibling:function(){var t=this._getOwner();return t&&t._children[this._index+1]||null},getPreviousSibling:function(){var t=this._getOwner();return t&&t._children[this._index-1]||null},getIndex:function(){return this._index},equals:function(t){return t===this||t&&this._class===t._class&&this._style.equals(t._style)&&this._matrix.equals(t._matrix)&&this._locked===t._locked&&this._visible===t._visible&&this._blendMode===t._blendMode&&this._opacity===t._opacity&&this._clipMask===t._clipMask&&this._guide===t._guide&&this._equals(t)||!1},_equals:function(t){return r.equals(this._children,t._children)},clone:function(t){var i=new this.constructor(w.NO_INSERT),n=this._children,s=r.pick(t?t.insert:e,t===e||!0===t),a=r.pick(t?t.deep:e,!0);n&&i.copyAttributes(this),n&&!a||i.copyContent(this),n||i.copyAttributes(this),s&&i.insertAbove(this);var o=this._name,h=this._parent;if(o&&h){for(var n=h._children,u=o,l=1;n[o];)o=u+" "+l++;o!==u&&i.setName(o)}return i},copyContent:function(t){for(var e=t._children,i=0,n=e&&e.length;i<n;i++)this.addChild(e[i].clone(!1),!0)},copyAttributes:function(t,e){this.setStyle(t._style);for(var i=["_locked","_visible","_blendMode","_opacity","_clipMask","_guide"],n=0,s=i.length;n<s;n++){var a=i[n];t.hasOwnProperty(a)&&(this[a]=t[a])}e||this._matrix.set(t._matrix,!0),this.setApplyMatrix(t._applyMatrix),this.setPivot(t._pivot),this.setSelection(t._selection);var o=t._data,h=t._name;this._data=o?r.clone(o):null,h&&this.setName(h)},rasterize:function(t,i){var n=this.getStrokeBounds(),s=(t||this.getView().getResolution())/72,a=n.getTopLeft().floor(),o=n.getBottomRight().ceil(),h=new d(o.subtract(a)),u=new S(w.NO_INSERT);if(!h.isZero()){var l=Q.getCanvas(h.multiply(s)),c=l.getContext("2d"),f=(new p).scale(s).translate(a.negate());c.save(),f.applyToContext(c),this.draw(c,new r({matrices:[f]})),c.restore(),u.setCanvas(l)}return u.transform((new p).translate(a.add(h.divide(2))).scale(1/s)),(i===e||i)&&u.insertAbove(this),u},contains:function(){return!!this._contains(this._matrix._inverseTransform(c.read(arguments)))},_contains:function(t){var e=this._children;if(e){for(var i=e.length-1;i>=0;i--)if(e[i].contains(t))return!0;return!1}return t.isInside(this.getInternalBounds())},isInside:function(){return g.read(arguments).contains(this.getBounds())},_asPathItem:function(){return new L.Rectangle({rectangle:this.getInternalBounds(),matrix:this._matrix,insert:!1})},intersects:function(t,e){return t instanceof w&&this._asPathItem().getIntersections(t._asPathItem(),null,e,!0).length>0}},new function(){function t(){return this._hitTest(c.read(arguments),M.getOptions(arguments))}function e(){var t=c.read(arguments),e=M.getOptions(arguments),i=[];return this._hitTest(t,r.set({all:i},e)),i}function i(t,e,i,n){var r=this._children;if(r)for(var s=r.length-1;s>=0;s--){var a=r[s],o=a!==n&&a._hitTest(t,e,i);if(o&&!e.all)return o}return null}return y.inject({hitTest:t,hitTestAll:e,_hitTest:i}),{hitTest:t,hitTestAll:e,_hitTestChildren:i}},{_hitTest:function(t,e,i){function n(t){return t&&_&&!_(t)&&(t=null),t&&e.all&&e.all.push(t),t}function s(e,i){var n=i?l["get"+i]():g.getPosition();if(t.subtract(n).divide(u).length<=1)return new M(e,g,{name:i?r.hyphenate(i):e,point:n})}if(this._locked||!this._visible||this._guide&&!e.guides||this.isEmpty())return null;var a=this._matrix,o=i?i.appended(a):this.getGlobalMatrix().prepend(this.getView()._matrix),h=Math.max(e.tolerance,1e-12),u=e._tolerancePadding=new d(L._getStrokePadding(h,a._shiftless().invert()));if(!(t=a._inverseTransform(t))||!this._children&&!this.getBounds({internal:!0,stroke:!0,handle:!0}).expand(u.multiply(2))._containsPoint(t))return null;var l,c,f=!(e.guides&&!this._guide||e.selected&&!this.isSelected()||e.type&&e.type!==r.hyphenate(this._class)||e.class&&!(this instanceof e.class)),_=e.match,g=this,v=e.position,p=e.center,m=e.bounds;if(f&&this._parent&&(v||p||m)){if((p||m)&&(l=this.getInternalBounds()),!(c=v&&s("position")||p&&s("center","Center"))&&m)for(var y=["TopLeft","TopRight","BottomLeft","BottomRight","LeftCenter","TopCenter","RightCenter","BottomCenter"],w=0;w<8&&!c;w++)c=s("bounds",y[w]);c=n(c)}return c||(c=this._hitTestChildren(t,e,o)||f&&n(this._hitTestSelf(t,e,o,this.getStrokeScaling()?null:o._shiftless().invert()))||null),c&&c.point&&(c.point=a.transform(c.point)),c},_hitTestSelf:function(t,e){if(e.fill&&this.hasFill()&&this._contains(t))return new M("fill",this)},matches:function(t,e){function i(t,e){for(var n in t)if(t.hasOwnProperty(n)){var s=t[n],a=e[n];if(r.isPlainObject(s)&&r.isPlainObject(a)){if(!i(s,a))return!1}else if(!r.equals(s,a))return!1}return!0}var n=typeof t;if("object"===n){for(var s in t)if(t.hasOwnProperty(s)&&!this.matches(s,t[s]))return!1;return!0}if("function"===n)return t(this);if("match"===t)return e(this);var a=/^(empty|editable)$/.test(t)?this["is"+r.capitalize(t)]():"type"===t?r.hyphenate(this._class):this[t];if("class"===t){if("function"==typeof e)return this instanceof e;a=this._class}if("function"==typeof e)return!!e(a);if(e){if(e.test)return e.test(a);if(r.isPlainObject(e))return i(e,a)}return r.equals(a,e)},getItems:function(t){return w._getItems(this,t,this._matrix)},getItem:function(t){return w._getItems(this,t,this._matrix,null,!0)[0]||null},statics:{_getItems:function t(e,i,n,s,a){if(!s){var o="object"==typeof i&&i,h=o&&o.overlapping,u=o&&o.inside,l=(w=h||u)&&g.read([w]);s={items:[],recursive:o&&!1!==o.recursive,inside:!!u,overlapping:!!h,rect:l,path:h&&new L.Rectangle({rectangle:l,insert:!1})},o&&(i=r.filter({},i,{recursive:!0,inside:!0,overlapping:!0}))}var c=e._children,f=s.items;n=(l=s.rect)&&(n||new p);for(var d=0,_=c&&c.length;d<_;d++){var v=c[d],m=n&&n.appended(v._matrix),y=!0;if(l){var w=v.getBounds(m);if(!l.intersects(w))continue;l.contains(w)||s.overlapping&&(w.contains(l)||s.path.intersects(v,m))||(y=!1)}if(y&&v.matches(i)&&(f.push(v),a))break;if(!1!==s.recursive&&t(v,i,m,s,a),a&&f.length>0)break}return f}}},{importJSON:function(t){var e=r.importJSON(t,this);return e!==this?this.addChild(e):e},addChild:function(t){return this.insertChild(e,t)},insertChild:function(t,e){var i=e?this.insertChildren(t,[e]):null;return i&&i[0]},addChildren:function(t){return this.insertChildren(this._children.length,t)},insertChildren:function(t,e){var i=this._children;if(i&&e&&e.length>0){for(var n={},s=(e=r.slice(e)).length-1;s>=0;s--){var a=(l=e[s])&&l._id;!l||n[a]?e.splice(s,1):(l._remove(!1,!0),n[a]=!0)}r.splice(i,e,t,0);for(var o=this._project,h=o._changes,s=0,u=e.length;s<u;s++){var l=e[s],c=l._name;l._parent=this,l._setProject(o,!0),c&&l.setName(c),h&&l._changed(5)}this._changed(11)}else e=null;return e},_insertItem:"#insertChild",_insertAt:function(t,e){var i=t&&t._getOwner(),n=t!==this&&i?this:null;return n&&(n._remove(!1,!0),i._insertItem(t._index+e,n)),n},insertAbove:function(t){return this._insertAt(t,1)},insertBelow:function(t){return this._insertAt(t,0)},sendToBack:function(){var t=this._getOwner();return t?t._insertItem(0,this):null},bringToFront:function(){var t=this._getOwner();return t?t._insertItem(e,this):null},appendTop:"#addChild",appendBottom:function(t){return this.insertChild(0,t)},moveAbove:"#insertAbove",moveBelow:"#insertBelow",addTo:function(t){return t._insertItem(e,this)},copyTo:function(t){return this.clone(!1).addTo(t)},reduce:function(t){var e=this._children;if(e&&1===e.length){var i=e[0].reduce(t);return this._parent?(i.insertAbove(this),this.remove()):i.remove(),i}return this},_removeNamed:function(){var t=this._getOwner();if(t){var e=t._children,i=t._namedChildren,n=this._name,r=i[n],s=r?r.indexOf(this):-1;-1!==s&&(e[n]==this&&delete e[n],r.splice(s,1),r.length?e[n]=r[0]:delete i[n])}},_remove:function(t,e){var i=this._getOwner(),n=this._project,s=this._index;return!!i&&(this._name&&this._removeNamed(),null!=s&&(n._activeLayer===this&&(n._activeLayer=this.getNextSibling()||this.getPreviousSibling()),r.splice(i._children,null,s,1)),this._installEvents(!1),t&&n._changes&&this._changed(5),e&&i._changed(11,this),this._parent=null,!0)},remove:function(){return this._remove(!0,!0)},replaceWith:function(t){var e=t&&t.insertBelow(this);return e&&this.remove(),e},removeChildren:function(t,e){if(!this._children)return null;t=t||0,e=r.pick(e,this._children.length);for(var i=r.splice(this._children,null,t,e-t),n=i.length-1;n>=0;n--)i[n]._remove(!0,!1);return i.length>0&&this._changed(11),i},clear:"#removeChildren",reverseChildren:function(){if(this._children){this._children.reverse();for(var t=0,e=this._children.length;t<e;t++)this._children[t]._index=t;this._changed(11)}},isEmpty:function(){var t=this._children;return!t||!t.length},isEditable:function(){for(var t=this;t;){if(!t._visible||t._locked)return!1;t=t._parent}return!0},hasFill:function(){return this.getStyle().hasFill()},hasStroke:function(){return this.getStyle().hasStroke()},hasShadow:function(){return this.getStyle().hasShadow()},_getOrder:function(t){function e(t){var e=[];do{e.unshift(t)}while(t=t._parent);return e}for(var i=e(this),n=e(t),r=0,s=Math.min(i.length,n.length);r<s;r++)if(i[r]!=n[r])return i[r]._index<n[r]._index?1:-1;return 0},hasChildren:function(){return this._children&&this._children.length>0},isInserted:function(){return!!this._parent&&this._parent.isInserted()},isAbove:function(t){return-1===this._getOrder(t)},isBelow:function(t){return 1===this._getOrder(t)},isParent:function(t){return this._parent===t},isChild:function(t){return t&&t._parent===this},isDescendant:function(t){for(var e=this;e=e._parent;)if(e===t)return!0;return!1},isAncestor:function(t){return!!t&&t.isDescendant(this)},isSibling:function(t){return this._parent===t._parent},isGroupedWith:function(t){for(var e=this._parent;e;){if(e._parent&&/^(Group|Layer|CompoundPath)$/.test(e._class)&&t.isDescendant(e))return!0;e=e._parent}return!1}},r.each(["rotate","scale","shear","skew"],function(t){var e="rotate"===t;this[t]=function(){var i=(e?r:c).read(arguments),n=c.read(arguments,0,{readNull:!0});return this.transform((new p)[t](i,n||this.getPosition(!0)))}},{translate:function(){var t=new p;return this.transform(t.translate.apply(t,arguments))},transform:function(t,e,i,n){var r=this._matrix,s=t&&!t.isIdentity(),a=(e||this._applyMatrix)&&(!r.isIdentity()||s||e&&i&&this._children);if(!s&&!a)return this;if(s){!t.isInvertible()&&r.isInvertible()&&(r._backup=r.getValues()),r.prepend(t,!0);var o=this._style,h=o.getFillColor(!0),u=o.getStrokeColor(!0);h&&h.transform(t),u&&u.transform(t)}if(a&&(a=this._transformContent(r,i,n))){var l=this._pivot;l&&r._transformPoint(l,l,!0),r.reset(!0),n&&this._canApplyMatrix&&(this._applyMatrix=!0)}var c=this._bounds,f=this._position;(s||a)&&this._changed(9);var d=s&&c&&t.decompose();if(d&&d.skewing.isZero()&&d.rotation%90==0){for(var _ in c){var g=c[_];if(g.nonscaling)delete c[_];else if(a||!g.internal){var v=g.rect;t._transformBounds(v,v)}}this._bounds=c;var p=c[this._getBoundsCacheKey(this._boundsOptions||{})];p&&(this._position=p.rect.getCenter(!0))}else s&&f&&this._pivot&&(this._position=t._transformPoint(f,f));return this},_transformContent:function(t,e,i){var n=this._children;if(n){for(var r=0,s=n.length;r<s;r++)n[r].transform(t,!0,e,i);return!0}},globalToLocal:function(){return this.getGlobalMatrix(!0)._inverseTransform(c.read(arguments))},localToGlobal:function(){return this.getGlobalMatrix(!0)._transformPoint(c.read(arguments))},parentToLocal:function(){return this._matrix._inverseTransform(c.read(arguments))},localToParent:function(){return this._matrix._transformPoint(c.read(arguments))},fitBounds:function(t,e){t=g.read(arguments);var i=this.getBounds(),n=i.height/i.width,r=t.height/t.width,s=(e?n>r:n<r)?t.width/i.width:t.height/i.height,a=new g(new c,new d(i.width*s,i.height*s));a.setCenter(t.getCenter()),this.setBounds(a)}}),{_setStyles:function(t,e,i){var n=this._style,r=this._matrix;if(n.hasFill()&&(t.fillStyle=n.getFillColor().toCanvasStyle(t,r)),n.hasStroke()){t.strokeStyle=n.getStrokeColor().toCanvasStyle(t,r),t.lineWidth=n.getStrokeWidth();var s=n.getStrokeJoin(),a=n.getStrokeCap(),o=n.getMiterLimit();if(s&&(t.lineJoin=s),a&&(t.lineCap=a),o&&(t.miterLimit=o),paper.support.nativeDash){var h=n.getDashArray(),u=n.getDashOffset();h&&h.length&&("setLineDash"in t?(t.setLineDash(h),t.lineDashOffset=u):(t.mozDash=h,t.mozDashOffset=u))}}if(n.hasShadow()){var l=e.pixelRatio||1,f=i._shiftless().prepend((new p).scale(l,l)),d=f.transform(new c(n.getShadowBlur(),0)),_=f.transform(this.getShadowOffset());t.shadowColor=n.getShadowColor().toCanvasStyle(t),t.shadowBlur=d.getLength(),t.shadowOffsetX=_.x,t.shadowOffsetY=_.y}},draw:function(t,e,i){var n=this._updateVersion=this._project._updateVersion;if(this._visible&&0!==this._opacity){var r=e.matrices,s=e.viewMatrix,a=this._matrix,o=r[r.length-1].appended(a);if(o.isInvertible()){s=s?s.appended(o):o,r.push(o),e.updateMatrix&&(o._updateVersion=n,this._globalMatrix=o);var h,u,l,c=this._blendMode,f=this._opacity,d="normal"===c,_=tt.nativeModes[c],g=d&&1===f||e.dontStart||e.clip||(_||d&&f<1)&&this._canComposite(),v=e.pixelRatio||1;if(!g){var p=this.getStrokeBounds(s);if(!p.width||!p.height)return;l=e.offset,u=e.offset=p.getTopLeft().floor(),h=t,t=Q.getContext(p.getSize().ceil().add(1).multiply(v)),1!==v&&t.scale(v,v)}t.save();var m=i?i.appended(a):this._canScaleStroke&&!this.getStrokeScaling(!0)&&s,y=!g&&e.clipItem,w=!m||y;if(g?(t.globalAlpha=f,_&&(t.globalCompositeOperation=c)):w&&t.translate(-u.x,-u.y),w&&(g?a:s).applyToContext(t),y&&e.clipItem.draw(t,e.extend({clip:!0})),m){t.setTransform(v,0,0,v,0,0);var x=e.offset;x&&t.translate(-x.x,-x.y)}this._draw(t,e,s,m),t.restore(),r.pop(),e.clip&&!e.dontFinish&&t.clip(),g||(tt.process(c,t,h,f,u.subtract(l).multiply(v)),Q.release(t),e.offset=l)}}},_isUpdated:function(t){var e=this._parent;if(e instanceof N)return e._isUpdated(t);var i=this._updateVersion===t;return!i&&e&&e._visible&&e._isUpdated(t)&&(this._updateVersion=t,i=!0),i},_drawSelection:function(t,e,i,n,r){var s=this._selection,a=1&s,o=2&s||a&&this._selectBounds,h=4&s;if(this._drawSelected||(a=!1),(a||o||h)&&this._isUpdated(r)){var u,l=this.getSelectedColor(!0)||(u=this.getLayer())&&u.getSelectedColor(!0),c=e.appended(this.getGlobalMatrix(!0)),f=i/2;if(t.strokeStyle=t.fillStyle=l?l.toCanvasStyle(t):"#009dec",a&&this._drawSelected(t,c,n),h){var d=this.getPosition(!0),_=d.x,g=d.y;t.beginPath(),t.arc(_,g,f,0,2*Math.PI,!0),t.stroke();for(var v=[[0,-1],[1,0],[0,1],[-1,0]],p=f,m=i+1,y=0;y<4;y++){var w=v[y],x=w[0],b=w[1];t.moveTo(_+x*p,g+b*p),t.lineTo(_+x*m,g+b*m),t.stroke()}}if(o){var C=c._transformCorners(this.getInternalBounds());t.beginPath();for(y=0;y<8;y++)t[y?"lineTo":"moveTo"](C[y],C[++y]);t.closePath(),t.stroke();for(y=0;y<8;y++)t.fillRect(C[y]-f,C[++y]-f,i,i)}}},_canComposite:function(){return!1}},r.each(["down","drag","up","move"],function(t){this["removeOn"+r.capitalize(t)]=function(){var e={};return e[t]=!0,this.removeOn(e)}},{removeOn:function(t){for(var e in t)if(t[e]){var i="mouse"+e,n=this._project,r=n._removeSets=n._removeSets||{};r[i]=r[i]||{},r[i][this._id]=this}return this}})),x=w.extend({_class:"Group",_selectBounds:!1,_selectChildren:!0,_serializeFields:{children:[]},initialize:function(t){this._children=[],this._namedChildren={},this._initialize(t)||this.addChildren(Array.isArray(t)?t:arguments)},_changed:function t(i){t.base.call(this,i),1026&i&&(this._clipItem=e)},_getClipItem:function(){var t=this._clipItem;if(t===e){t=null;for(var i=this._children,n=0,r=i.length;n<r;n++)if(i[n]._clipMask){t=i[n];break}this._clipItem=t}return t},isClipped:function(){return!!this._getClipItem()},setClipped:function(t){var e=this.getFirstChild();e&&e.setClipMask(t)},_getBounds:function t(e,i){var n=this._getClipItem();return n?n._getCachedBounds(e&&e.appended(n._matrix),r.set({},i,{stroke:!1})):t.base.call(this,e,i)},_hitTestChildren:function t(e,i,n){var r=this._getClipItem();return(!r||r.contains(e))&&t.base.call(this,e,i,n,r)},_draw:function(t,e){var i=e.clip,n=!i&&this._getClipItem();e=e.extend({clipItem:n,clip:!1}),i?(t.beginPath(),e.dontStart=e.dontFinish=!0):n&&n.draw(t,e.extend({clip:!0}));for(var r=this._children,s=0,a=r.length;s<a;s++){var o=r[s];o!==n&&o.draw(t,e)}}}),b=x.extend({_class:"Layer",initialize:function(){x.apply(this,arguments)},_getOwner:function(){return this._parent||null!=this._index&&this._project},isInserted:function t(){return this._parent?t.base.call(this):null!=this._index},activate:function(){this._project._activeLayer=this},_hitTestSelf:function(){}}),C=w.extend({_class:"Shape",_applyMatrix:!1,_canApplyMatrix:!1,_canScaleStroke:!0,_serializeFields:{type:null,size:null,radius:null},initialize:function(t,e){this._initialize(t,e)},_equals:function(t){return this._type===t._type&&this._size.equals(t._size)&&r.equals(this._radius,t._radius)},copyContent:function(t){this.setType(t._type),this.setSize(t._size),this.setRadius(t._radius)},getType:function(){return this._type},setType:function(t){this._type=t},getShape:"#getType",setShape:"#setType",getSize:function(){var t=this._size;return new _(t.width,t.height,this,"setSize")},setSize:function(){var t=d.read(arguments);if(this._size){if(!this._size.equals(t)){var e=this._type,i=t.width,n=t.height;"rectangle"===e?this._radius.set(d.min(this._radius,t.divide(2))):"circle"===e?(i=n=(i+n)/2,this._radius=i/2):"ellipse"===e&&this._radius._set(i/2,n/2),this._size._set(i,n),this._changed(9)}}else this._size=t.clone()},getRadius:function(){var t=this._radius;return"circle"===this._type?t:new _(t.width,t.height,this,"setRadius")},setRadius:function(t){var e=this._type;if("circle"===e){if(t===this._radius)return;i=2*t;this._radius=t,this._size._set(i,i)}else if(t=d.read(arguments),this._radius){if(this._radius.equals(t))return;if(this._radius.set(t),"rectangle"===e){var i=d.max(this._size,t.multiply(2));this._size.set(i)}else"ellipse"===e&&this._size._set(2*t.width,2*t.height)}else this._radius=t.clone();this._changed(9)},isEmpty:function(){return!1},toPath:function(t){var i=new(L[r.capitalize(this._type)])({center:new c,size:this._size,radius:this._radius,insert:!1});return i.copyAttributes(this),paper.settings.applyMatrix&&i.setApplyMatrix(!0),(t===e||t)&&i.insertAbove(this),i},toShape:"#clone",_asPathItem:function(){return this.toPath(!1)},_draw:function(t,e,i,n){var r=this._style,s=r.hasFill(),a=r.hasStroke(),o=e.dontFinish||e.clip,h=!n;if(s||a||o){var u=this._type,l=this._radius,c="circle"===u;if(e.dontStart||t.beginPath(),h&&c)t.arc(0,0,l,0,2*Math.PI,!0);else{var f=c?l:l.width,d=c?l:l.height,_=this._size,g=_.width,v=_.height;if(h&&"rectangle"===u&&0===f&&0===d)t.rect(-g/2,-v/2,g,v);else{var p=g/2,m=v/2,y=.44771525016920644,w=f*y,x=d*y,b=[-p,-m+d,-p,-m+x,-p+w,-m,-p+f,-m,p-f,-m,p-w,-m,p,-m+x,p,-m+d,p,m-d,p,m-x,p-w,m,p-f,m,-p+f,m,-p+w,m,-p,m-x,-p,m-d];n&&n.transform(b,b,32),t.moveTo(b[0],b[1]),t.bezierCurveTo(b[2],b[3],b[4],b[5],b[6],b[7]),p!==f&&t.lineTo(b[8],b[9]),t.bezierCurveTo(b[10],b[11],b[12],b[13],b[14],b[15]),m!==d&&t.lineTo(b[16],b[17]),t.bezierCurveTo(b[18],b[19],b[20],b[21],b[22],b[23]),p!==f&&t.lineTo(b[24],b[25]),t.bezierCurveTo(b[26],b[27],b[28],b[29],b[30],b[31])}}t.closePath()}o||!s&&!a||(this._setStyles(t,e,i),s&&(t.fill(r.getFillRule()),t.shadowColor="rgba(0,0,0,0)"),a&&t.stroke())},_canComposite:function(){return!(this.hasFill()&&this.hasStroke())},_getBounds:function(t,e){var i=new g(this._size).setCenter(0,0),n=this._style,r=e.stroke&&n.hasStroke()&&n.getStrokeWidth();return t&&(i=t._transformBounds(i)),r?i.expand(L._getStrokePadding(r,this._getStrokeMatrix(t,e))):i}},new function(){function t(t,e,i){var n=t._radius;if(!n.isZero())for(var r=t._size.divide(2),s=1;s<=4;s++){var a=new c(s>1&&s<4?-1:1,s>2?-1:1),o=a.multiply(r),h=o.subtract(a.multiply(n));if(new g(i?o.add(a.multiply(i)):o,h).contains(e))return{point:h,quadrant:s}}}function e(t,e,i,n){var r=t.divide(e);return(!n||r.isInQuadrant(n))&&r.subtract(r.normalize()).multiply(e).divide(i).length<=1}return{_contains:function e(i){if("rectangle"===this._type){var n=t(this,i);return n?i.subtract(n.point).divide(this._radius).getLength()<=1:e.base.call(this,i)}return i.divide(this.size).getLength()<=.5},_hitTestSelf:function i(n,r,s,a){var o=!1,h=this._style,u=r.stroke&&h.hasStroke(),l=r.fill&&h.hasFill();if(u||l){var c=this._type,f=this._radius,d=u?h.getStrokeWidth()/2:0,_=r._tolerancePadding.add(L._getStrokePadding(d,!h.getStrokeScaling()&&a));if("rectangle"===c){var v=_.multiply(2),p=t(this,n,v);if(p)o=e(n.subtract(p.point),f,_,p.quadrant);else{var m=new g(this._size).setCenter(0,0),y=m.expand(v),w=m.expand(v.negate());o=y._containsPoint(n)&&!w._containsPoint(n)}}else o=e(n,f,_)}return o?new M(u?"stroke":"fill",this):i.base.apply(this,arguments)}}},{statics:new function(){function t(t,e,i,n,s){var a=new C(r.getNamed(s),e);return a._type=t,a._size=i,a._radius=n,a}return{Circle:function(){var e=c.readNamed(arguments,"center"),i=r.readNamed(arguments,"radius");return t("circle",e,new d(2*i),i,arguments)},Rectangle:function(){var e=g.readNamed(arguments,"rectangle"),i=d.min(d.readNamed(arguments,"radius"),e.getSize(!0).divide(2));return t("rectangle",e.getCenter(!0),e.getSize(!0),i,arguments)},Ellipse:function(){var e=C._readEllipse(arguments),i=e.radius;return t("ellipse",e.center,i.multiply(2),i,arguments)},_readEllipse:function(t){var e,i;if(r.hasNamed(t,"radius"))e=c.readNamed(t,"center"),i=d.readNamed(t,"radius");else{var n=g.readNamed(t,"rectangle");e=n.getCenter(!0),i=n.getSize(!0).divide(2)}return{center:e,radius:i}}}}}),S=w.extend({_class:"Raster",_applyMatrix:!1,_canApplyMatrix:!1,_boundsOptions:{stroke:!1,handle:!1},_serializeFields:{crossOrigin:null,source:null},_prioritize:["crossOrigin"],initialize:function(t,i){if(!this._initialize(t,i!==e&&c.read(arguments,1))){var r="string"==typeof t?n.getElementById(t):t;r?this.setImage(r):this.setSource(t)}this._size||(this._size=new d,this._loaded=!1)},_equals:function(t){return this.getSource()===t.getSource()},copyContent:function(t){var e=t._image,i=t._canvas;if(e)this._setImage(e);else if(i){var n=Q.getCanvas(t._size);n.getContext("2d").drawImage(i,0,0),this._setImage(n)}this._crossOrigin=t._crossOrigin},getSize:function(){var t=this._size;return new _(t?t.width:0,t?t.height:0,this,"setSize")},setSize:function(){var t=d.read(arguments);if(!t.equals(this._size))if(t.width>0&&t.height>0){var e=this.getElement();this._setImage(Q.getCanvas(t)),e&&this.getContext(!0).drawImage(e,0,0,t.width,t.height)}else this._canvas&&Q.release(this._canvas),this._size=t.clone()},getWidth:function(){return this._size?this._size.width:0},setWidth:function(t){this.setSize(t,this.getHeight())},getHeight:function(){return this._size?this._size.height:0},setHeight:function(t){this.setSize(this.getWidth(),t)},getLoaded:function(){return this._loaded},isEmpty:function(){var t=this._size;return!t||0===t.width&&0===t.height},getResolution:function(){var t=this._matrix,e=new c(0,0).transform(t),i=new c(1,0).transform(t).subtract(e),n=new c(0,1).transform(t).subtract(e);return new d(72/i.getLength(),72/n.getLength())},getPpi:"#getResolution",getImage:function(){return this._image},setImage:function(t){function e(t){var e=i.getView(),n=t&&t.type||"load";e&&i.responds(n)&&(paper=e._scope,i.emit(n,new G(t)))}var i=this;this._setImage(t),this._loaded?setTimeout(e,0):t&&Z.add(t,{load:function(n){i._setImage(t),e(n)},error:e})},_setImage:function(t){this._canvas&&Q.release(this._canvas),t&&t.getContext?(this._image=null,this._canvas=t,this._loaded=!0):(this._image=t,this._canvas=null,this._loaded=!!(t&&t.src&&t.complete)),this._size=new d(t?t.naturalWidth||t.width:0,t?t.naturalHeight||t.height:0),this._context=null,this._changed(521)},getCanvas:function(){if(!this._canvas){var t=Q.getContext(this._size);try{this._image&&t.drawImage(this._image,0,0),this._canvas=t.canvas}catch(e){Q.release(t)}}return this._canvas},setCanvas:"#setImage",getContext:function(t){return this._context||(this._context=this.getCanvas().getContext("2d")),t&&(this._image=null,this._changed(513)),this._context},setContext:function(t){this._context=t},getSource:function(){var t=this._image;return t&&t.src||this.toDataURL()},setSource:function(e){var i=new t.Image,n=this._crossOrigin;n&&(i.crossOrigin=n),i.src=e,this.setImage(i)},getCrossOrigin:function(){var t=this._image;return t&&t.crossOrigin||this._crossOrigin||""},setCrossOrigin:function(t){this._crossOrigin=t;var e=this._image;e&&(e.crossOrigin=t)},getElement:function(){return this._canvas||this._loaded&&this._image}},{beans:!1,getSubCanvas:function(){var t=g.read(arguments),e=Q.getContext(t.getSize());return e.drawImage(this.getCanvas(),t.x,t.y,t.width,t.height,0,0,t.width,t.height),e.canvas},getSubRaster:function(){var t=g.read(arguments),e=new S(w.NO_INSERT);return e._setImage(this.getSubCanvas(t)),e.translate(t.getCenter().subtract(this.getSize().divide(2))),e._matrix.prepend(this._matrix),e.insertAbove(this),e},toDataURL:function(){var t=this._image,e=t&&t.src;if(/^data:/.test(e))return e;var i=this.getCanvas();return i?i.toDataURL.apply(i,arguments):null},drawImage:function(t){var e=c.read(arguments,1);this.getContext(!0).drawImage(t,e.x,e.y)},getAverageColor:function(t){var e,i;if(t?t instanceof A?(i=t,e=t.getBounds()):"object"==typeof t&&("width"in t?e=new g(t):"x"in t&&(e=new g(t.x-.5,t.y-.5,1,1))):e=this.getBounds(),!e)return null;var n=Math.min(e.width,32),s=Math.min(e.height,32),a=S._sampleContext;a?a.clearRect(0,0,33,33):a=S._sampleContext=Q.getContext(new d(32)),a.save();var o=(new p).scale(n/e.width,s/e.height).translate(-e.x,-e.y);o.applyToContext(a),i&&i.draw(a,new r({clip:!0,matrices:[o]})),this._matrix.applyToContext(a);var h=this.getElement(),u=this._size;h&&a.drawImage(h,-u.width/2,-u.height/2),a.restore();for(var l=a.getImageData(.5,.5,Math.ceil(n),Math.ceil(s)).data,c=[0,0,0],f=0,_=0,v=l.length;_<v;_+=4){var m=l[_+3];f+=m,m/=255,c[0]+=l[_]*m,c[1]+=l[_+1]*m,c[2]+=l[_+2]*m}for(_=0;_<3;_++)c[_]/=f;return f?F.read(c):null},getPixel:function(){var t=c.read(arguments),e=this.getContext().getImageData(t.x,t.y,1,1).data;return new F("rgb",[e[0]/255,e[1]/255,e[2]/255],e[3]/255)},setPixel:function(){var t=c.read(arguments),e=F.read(arguments),i=e._convert("rgb"),n=e._alpha,r=this.getContext(!0),s=r.createImageData(1,1),a=s.data;a[0]=255*i[0],a[1]=255*i[1],a[2]=255*i[2],a[3]=null!=n?255*n:255,r.putImageData(s,t.x,t.y)},createImageData:function(){var t=d.read(arguments);return this.getContext().createImageData(t.width,t.height)},getImageData:function(){var t=g.read(arguments);return t.isEmpty()&&(t=new g(this._size)),this.getContext().getImageData(t.x,t.y,t.width,t.height)},setImageData:function(t){var e=c.read(arguments,1);this.getContext(!0).putImageData(t,e.x,e.y)},_getBounds:function(t,e){var i=new g(this._size).setCenter(0,0);return t?t._transformBounds(i):i},_hitTestSelf:function(t){if(this._contains(t)){var e=this;return new M("pixel",e,{offset:t.add(e._size.divide(2)).round(),color:{get:function(){return e.getPixel(this.offset)}}})}},_draw:function(t){var e=this.getElement();e&&(t.globalAlpha=this._opacity,t.drawImage(e,-this._size.width/2,-this._size.height/2))},_canComposite:function(){return!0}}),P=w.extend({_class:"SymbolItem",_applyMatrix:!1,_canApplyMatrix:!1,_boundsOptions:{stroke:!0},_serializeFields:{symbol:null},initialize:function(t,i){this._initialize(t,i!==e&&c.read(arguments,1))||this.setDefinition(t instanceof I?t:new I(t))},_equals:function(t){return this._definition===t._definition},copyContent:function(t){this.setDefinition(t._definition)},getDefinition:function(){return this._definition},setDefinition:function(t){this._definition=t,this._changed(9)},getSymbol:"#getDefinition",setSymbol:"#setDefinition",isEmpty:function(){return this._definition._item.isEmpty()},_getBounds:function(t,e){var i=this._definition._item;return i._getCachedBounds(i._matrix.prepended(t),e)},_hitTestSelf:function(t,e,i){var n=this._definition._item._hitTest(t,e,i);return n&&(n.item=this),n},_draw:function(t,e){this._definition._item.draw(t,e)}}),I=r.extend({_class:"SymbolDefinition",initialize:function(t,e){this._id=l.get(),this.project=paper.project,t&&this.setItem(t,e)},_serialize:function(t,e){return e.add(this,function(){return r.serialize([this._class,this._item],t,!1,e)})},_changed:function(t){8&t&&w._clearBoundsCache(this),1&t&&this.project._changed(t)},getItem:function(){return this._item},setItem:function(t,e){t._symbol&&(t=t.clone()),this._item&&(this._item._symbol=null),this._item=t,t.remove(),t.setSelected(!1),e||t.setPosition(new c),t._symbol=this,this._changed(9)},getDefinition:"#getItem",setDefinition:"#setItem",place:function(t){return new P(this,t)},clone:function(){return new I(this._item.clone(!1))},equals:function(t){return t===this||t&&this._item.equals(t._item)||!1}}),M=r.extend({_class:"HitResult",initialize:function(t,e,i){this.type=t,this.item=e,i&&this.inject(i)},statics:{getOptions:function(t){var e=t&&r.read(t);return r.set({type:null,tolerance:paper.settings.hitTolerance,fill:!e,stroke:!e,segments:!e,handles:!1,ends:!1,position:!1,center:!1,bounds:!1,guides:!1,selected:!1},e)}}}),T=r.extend({_class:"Segment",beans:!0,_selection:0,initialize:function(t,i,n,r,s,a){var o,h,u,l,c=arguments.length;c>0&&(null==t||"object"==typeof t?1===c&&t&&"point"in t?(o=t.point,h=t.handleIn,u=t.handleOut,l=t.selection):(o=t,h=i,u=n,l=r):(o=[t,i],h=n!==e?[n,r]:null,u=s!==e?[s,a]:null)),new z(o,this,"_point"),new z(h,this,"_handleIn"),new z(u,this,"_handleOut"),l&&this.setSelection(l)},_serialize:function(t,e){var i=this._point,n=this._selection,s=n||this.hasHandles()?[i,this._handleIn,this._handleOut]:i;return n&&s.push(n),r.serialize(s,t,!0,e)},_changed:function(t){var e=this._path;if(e){var i,n=e._curves,r=this._index;n&&(t&&t!==this._point&&t!==this._handleIn||!(i=r>0?n[r-1]:e._closed?n[n.length-1]:null)||i._changed(),t&&t!==this._point&&t!==this._handleOut||!(i=n[r])||i._changed()),e._changed(25)}},getPoint:function(){return this._point},setPoint:function(){this._point.set(c.read(arguments))},getHandleIn:function(){return this._handleIn},setHandleIn:function(){this._handleIn.set(c.read(arguments))},getHandleOut:function(){return this._handleOut},setHandleOut:function(){this._handleOut.set(c.read(arguments))},hasHandles:function(){return!this._handleIn.isZero()||!this._handleOut.isZero()},isSmooth:function(){var t=this._handleIn,e=this._handleOut;return!t.isZero()&&!e.isZero()&&t.isCollinear(e)},clearHandles:function(){this._handleIn._set(0,0),this._handleOut._set(0,0)},getSelection:function(){return this._selection},setSelection:function(t){var e=this._selection,i=this._path;this._selection=t=t||0,i&&t!==e&&(i._updateSelection(this,e,t),i._changed(129))},_changeSelection:function(t,e){var i=this._selection;this.setSelection(e?i|t:i&~t)},isSelected:function(){return!!(7&this._selection)},setSelected:function(t){this._changeSelection(7,t)},getIndex:function(){return this._index!==e?this._index:null},getPath:function(){return this._path||null},getCurve:function(){var t=this._path,e=this._index;return t?(e>0&&!t._closed&&e===t._segments.length-1&&e--,t.getCurves()[e]||null):null},getLocation:function(){var t=this.getCurve();return t?new O(t,this===t._segment1?0:1):null},getNext:function(){var t=this._path&&this._path._segments;return t&&(t[this._index+1]||this._path._closed&&t[0])||null},smooth:function(t,i,n){var r=t||{},s=r.type,a=r.factor,o=this.getPrevious(),h=this.getNext(),u=(o||this)._point,l=this._point,f=(h||this)._point,d=u.getDistance(l),_=l.getDistance(f);if(s&&"catmull-rom"!==s){if("geometric"!==s)throw new Error("Smoothing method '"+s+"' not supported.");if(o&&h){var g=u.subtract(f),v=a===e?.4:a,p=v*d/(d+_);i||this.setHandleIn(g.multiply(p)),n||this.setHandleOut(g.multiply(p-v))}}else{var m=a===e?.5:a,y=Math.pow(d,m),w=y*y,x=Math.pow(_,m),b=x*x;if(!i&&o){var C=2*b+3*x*y+w,S=3*x*(x+y);this.setHandleIn(0!==S?new c((b*u._x+C*l._x-w*f._x)/S-l._x,(b*u._y+C*l._y-w*f._y)/S-l._y):new c)}if(!n&&h){var C=2*w+3*y*x+b,S=3*y*(y+x);this.setHandleOut(0!==S?new c((w*f._x+C*l._x-b*u._x)/S-l._x,(w*f._y+C*l._y-b*u._y)/S-l._y):new c)}}},getPrevious:function(){var t=this._path&&this._path._segments;return t&&(t[this._index-1]||this._path._closed&&t[t.length-1])||null},isFirst:function(){return!this._index},isLast:function(){var t=this._path;return t&&this._index===t._segments.length-1||!1},reverse:function(){var t=this._handleIn,e=this._handleOut,i=t.clone();t.set(e),e.set(i)},reversed:function(){return new T(this._point,this._handleOut,this._handleIn)},remove:function(){return!!this._path&&!!this._path.removeSegment(this._index)},clone:function(){return new T(this._point,this._handleIn,this._handleOut)},equals:function(t){return t===this||t&&this._class===t._class&&this._point.equals(t._point)&&this._handleIn.equals(t._handleIn)&&this._handleOut.equals(t._handleOut)||!1},toString:function(){var t=["point: "+this._point];return this._handleIn.isZero()||t.push("handleIn: "+this._handleIn),this._handleOut.isZero()||t.push("handleOut: "+this._handleOut),"{ "+t.join(", ")+" }"},transform:function(t){this._transformCoordinates(t,new Array(6),!0),this._changed()},interpolate:function(t,e,i){var n=1-i,r=i,s=t._point,a=e._point,o=t._handleIn,h=e._handleIn,u=e._handleOut,l=t._handleOut;this._point._set(n*s._x+r*a._x,n*s._y+r*a._y,!0),this._handleIn._set(n*o._x+r*h._x,n*o._y+r*h._y,!0),this._handleOut._set(n*l._x+r*u._x,n*l._y+r*u._y,!0),this._changed()},_transformCoordinates:function(t,e,i){var n=this._point,r=i&&this._handleIn.isZero()?null:this._handleIn,s=i&&this._handleOut.isZero()?null:this._handleOut,a=n._x,o=n._y,h=2;return e[0]=a,e[1]=o,r&&(e[h++]=r._x+a,e[h++]=r._y+o),s&&(e[h++]=s._x+a,e[h++]=s._y+o),t&&(t._transformCoordinates(e,e,h/2),a=e[0],o=e[1],i?(n._x=a,n._y=o,h=2,r&&(r._x=e[h++]-a,r._y=e[h++]-o),s&&(s._x=e[h++]-a,s._y=e[h++]-o)):(r||(e[h++]=a,e[h++]=o),s||(e[h++]=a,e[h++]=o))),e}}),z=c.extend({initialize:function(t,i,n){var r,s,a;if(t)if((r=t[0])!==e)s=t[1];else{var o=t;(r=o.x)===e&&(r=(o=c.read(arguments)).x),s=o.y,a=o.selected}else r=s=0;this._x=r,this._y=s,this._owner=i,i[n]=this,a&&this.setSelected(!0)},_set:function(t,e){return this._x=t,this._y=e,this._owner._changed(this),this},getX:function(){return this._x},setX:function(t){this._x=t,this._owner._changed(this)},getY:function(){return this._y},setY:function(t){this._y=t,this._owner._changed(this)},isZero:function(){var t=u.isZero;return t(this._x)&&t(this._y)},isSelected:function(){return!!(this._owner._selection&this._getSelection())},setSelected:function(t){this._owner._changeSelection(this._getSelection(),t)},_getSelection:function(){var t=this._owner;return this===t._point?1:this===t._handleIn?2:this===t._handleOut?4:0}}),k=r.extend({_class:"Curve",beans:!0,initialize:function(t,e,i,n,r,s,a,o){var h,u,l,c,f,d,_=arguments.length;3===_?(this._path=t,h=e,u=i):_?1===_?"segment1"in t?(h=new T(t.segment1),u=new T(t.segment2)):"point1"in t?(l=t.point1,f=t.handle1,d=t.handle2,c=t.point2):Array.isArray(t)&&(l=[t[0],t[1]],c=[t[6],t[7]],f=[t[2]-t[0],t[3]-t[1]],d=[t[4]-t[6],t[5]-t[7]]):2===_?(h=new T(t),u=new T(e)):4===_?(l=t,f=e,d=i,c=n):8===_&&(l=[t,e],c=[a,o],f=[i-t,n-e],d=[r-a,s-o]):(h=new T,u=new T),this._segment1=h||new T(l,null,f),this._segment2=u||new T(c,d,null)},_serialize:function(t,e){return r.serialize(this.hasHandles()?[this.getPoint1(),this.getHandle1(),this.getHandle2(),this.getPoint2()]:[this.getPoint1(),this.getPoint2()],t,!0,e)},_changed:function(){this._length=this._bounds=e},clone:function(){return new k(this._segment1,this._segment2)},toString:function(){var t=["point1: "+this._segment1._point];return this._segment1._handleOut.isZero()||t.push("handle1: "+this._segment1._handleOut),this._segment2._handleIn.isZero()||t.push("handle2: "+this._segment2._handleIn),t.push("point2: "+this._segment2._point),"{ "+t.join(", ")+" }"},classify:function(){return k.classify(this.getValues())},remove:function(){var t=!1;if(this._path){var e=this._segment2,i=e._handleOut;(t=e.remove())&&this._segment1._handleOut.set(i)}return t},getPoint1:function(){return this._segment1._point},setPoint1:function(){this._segment1._point.set(c.read(arguments))},getPoint2:function(){return this._segment2._point},setPoint2:function(){this._segment2._point.set(c.read(arguments))},getHandle1:function(){return this._segment1._handleOut},setHandle1:function(){this._segment1._handleOut.set(c.read(arguments))},getHandle2:function(){return this._segment2._handleIn},setHandle2:function(){this._segment2._handleIn.set(c.read(arguments))},getSegment1:function(){return this._segment1},getSegment2:function(){return this._segment2},getPath:function(){return this._path},getIndex:function(){return this._segment1._index},getNext:function(){var t=this._path&&this._path._curves;return t&&(t[this._segment1._index+1]||this._path._closed&&t[0])||null},getPrevious:function(){var t=this._path&&this._path._curves;return t&&(t[this._segment1._index-1]||this._path._closed&&t[t.length-1])||null},isFirst:function(){return!this._segment1._index},isLast:function(){var t=this._path;return t&&this._segment1._index===t._curves.length-1||!1},isSelected:function(){return this.getPoint1().isSelected()&&this.getHandle1().isSelected()&&this.getHandle2().isSelected()&&this.getPoint2().isSelected()},setSelected:function(t){this.getPoint1().setSelected(t),this.getHandle1().setSelected(t),this.getHandle2().setSelected(t),this.getPoint2().setSelected(t)},getValues:function(t){return k.getValues(this._segment1,this._segment2,t)},getPoints:function(){for(var t=this.getValues(),e=[],i=0;i<8;i+=2)e.push(new c(t[i],t[i+1]));return e}},{getLength:function(){return null==this._length&&(this._length=k.getLength(this.getValues(),0,1)),this._length},getArea:function(){return k.getArea(this.getValues())},getLine:function(){return new m(this._segment1._point,this._segment2._point)},getPart:function(t,e){return new k(k.getPart(this.getValues(),t,e))},getPartLength:function(t,e){return k.getLength(this.getValues(),t,e)},divideAt:function(t){return this.divideAtTime(t&&t.curve===this?t.time:this.getTimeAt(t))},divideAtTime:function(t,e){var i=null;if(t>=1e-8&&t<=1-1e-8){var n=k.subdivide(this.getValues(),t),r=n[0],s=n[1],a=e||this.hasHandles(),o=this._segment1,h=this._segment2,u=this._path;a&&(o._handleOut._set(r[2]-r[0],r[3]-r[1]),h._handleIn._set(s[4]-s[6],s[5]-s[7]));var l=r[6],f=r[7],d=new T(new c(l,f),a&&new c(r[4]-l,r[5]-f),a&&new c(s[2]-l,s[3]-f));u?(u.insert(o._index+1,d),i=this.getNext()):(this._segment2=d,this._changed(),i=new k(d,h))}return i},splitAt:function(t){var e=this._path;return e?e.splitAt(t):null},splitAtTime:function(t){return this.splitAt(this.getLocationAtTime(t))},divide:function(t,i){return this.divideAtTime(t===e?.5:i?t:this.getTimeAt(t))},split:function(t,i){return this.splitAtTime(t===e?.5:i?t:this.getTimeAt(t))},reversed:function(){return new k(this._segment2.reversed(),this._segment1.reversed())},clearHandles:function(){this._segment1._handleOut._set(0,0),this._segment2._handleIn._set(0,0)},statics:{getValues:function(t,e,i,n){var r=t._point,s=t._handleOut,a=e._handleIn,o=e._point,h=r.x,u=r.y,l=o.x,c=o.y,f=n?[h,u,h,u,l,c,l,c]:[h,u,h+s._x,u+s._y,l+a._x,c+a._y,l,c];return i&&i._transformCoordinates(f,f,4),f},subdivide:function(t,i){var n=t[0],r=t[1],s=t[2],a=t[3],o=t[4],h=t[5],u=t[6],l=t[7];i===e&&(i=.5);var c=1-i,f=c*n+i*s,d=c*r+i*a,_=c*s+i*o,g=c*a+i*h,v=c*o+i*u,p=c*h+i*l,m=c*f+i*_,y=c*d+i*g,w=c*_+i*v,x=c*g+i*p,b=c*m+i*w,C=c*y+i*x;return[[n,r,f,d,m,y,b,C],[b,C,w,x,v,p,u,l]]},getMonoCurves:function(t,e){var i=[],n=e?0:1,r=t[n+0],s=t[n+2],a=t[n+4],o=t[n+6];if(r>=s==s>=a&&s>=a==a>=o||k.isStraight(t))i.push(t);else{var h=3*(s-a)-r+o,l=2*(r+a)-4*s,c=s-r,f=[],d=u.solveQuadratic(h,l,c,f,1e-8,1-1e-8);if(d){f.sort();var _=f[0],g=k.subdivide(t,_);i.push(g[0]),d>1&&(_=(f[1]-_)/(1-_),g=k.subdivide(g[1],_),i.push(g[0])),i.push(g[1])}else i.push(t)}return i},solveCubic:function(t,e,i,n,r,s){var a=t[e],o=t[e+2],h=t[e+4],l=t[e+6],c=0;if(!(a<i&&l<i&&o<i&&h<i||a>i&&l>i&&o>i&&h>i)){var f=3*(o-a),d=3*(h-o)-f,_=l-a-f-d;c=u.solveCubic(_,d,f,a-i,n,r,s)}return c},getTimeOf:function(t,e){var i=new c(t[0],t[1]),n=new c(t[6],t[7]);if(null===(e.isClose(i,1e-12)?0:e.isClose(n,1e-12)?1:null))for(var r=[e.x,e.y],s=[],a=0;a<2;a++)for(var o=k.solveCubic(t,a,r[a],s,0,1),h=0;h<o;h++){var u=s[h];if(e.isClose(k.getPoint(t,u),1e-7))return u}return e.isClose(i,1e-7)?0:e.isClose(n,1e-7)?1:null},getNearestTime:function(t,e){function i(i){if(i>=0&&i<=1){var n=e.getDistance(k.getPoint(t,i),!0);if(n<u)return u=n,l=i,!0}}if(k.isStraight(t)){var n=t[0],r=t[1],s=t[6]-n,a=t[7]-r,o=s*s+a*a;if(0===o)return 0;var h=((e.x-n)*s+(e.y-r)*a)/o;return h<1e-12?0:h>.999999999999?1:k.getTimeOf(t,new c(n+h*s,r+h*a))}for(var u=1/0,l=0,f=0;f<=100;f++)i(f/100);for(var d=.005;d>1e-8;)i(l-d)||i(l+d)||(d/=2);return l},getPart:function(t,e,i){var n=e>i;if(n){var r=e;e=i,i=r}return e>0&&(t=k.subdivide(t,e)[1]),i<1&&(t=k.subdivide(t,(i-e)/(1-e))[0]),n?[t[6],t[7],t[4],t[5],t[2],t[3],t[0],t[1]]:t},isFlatEnough:function(t,e){var i=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],h=t[6],u=t[7],l=3*r-2*i-h,c=3*s-2*n-u,f=3*a-2*h-i,d=3*o-2*u-n;return Math.max(l*l,f*f)+Math.max(c*c,d*d)<=16*e*e},getArea:function(t){var e=t[0],i=t[1],n=t[2],r=t[3],s=t[4],a=t[5],o=t[6],h=t[7];return 3*((h-i)*(n+s)-(o-e)*(r+a)+r*(e-s)-n*(i-a)+h*(s+e/3)-o*(a+i/3))/20},getBounds:function(t){for(var e=t.slice(0,2),i=e.slice(),n=[0,0],r=0;r<2;r++)k._addBounds(t[r],t[r+2],t[r+4],t[r+6],r,0,e,i,n);return new g(e[0],e[1],i[0]-e[0],i[1]-e[1])},_addBounds:function(t,e,i,n,r,s,a,o,h){function l(t,e){var i=t-e,n=t+e;i<a[r]&&(a[r]=i),n>o[r]&&(o[r]=n)}s/=2;var c=a[r]-s,f=o[r]+s;if(t<c||e<c||i<c||n<c||t>f||e>f||i>f||n>f)if(e<t!=e<n&&i<t!=i<n)l(t,s),l(n,s);else{var d=3*(e-i)-t+n,_=2*(t+i)-4*e,g=e-t,v=u.solveQuadratic(d,_,g,h);l(n,0);for(var p=0;p<v;p++){var m=h[p],y=1-m;1e-8<=m&&m<=1-1e-8&&l(y*y*y*t+3*y*y*m*e+3*y*m*m*i+m*m*m*n,s)}}}}},r.each(["getBounds","getStrokeBounds","getHandleBounds"],function(t){this[t]=function(){this._bounds||(this._bounds={});var e=this._bounds[t];return e||(e=this._bounds[t]=L[t]([this._segment1,this._segment2],!1,this._path)),e.clone()}},{}),r.each({isStraight:function(t,e,i,n){if(e.isZero()&&i.isZero())return!0;var r=n.subtract(t);if(r.isZero())return!1;if(r.isCollinear(e)&&r.isCollinear(i)){var s=new m(t,n);if(s.getDistance(t.add(e))<1e-7&&s.getDistance(n.add(i))<1e-7){var a=r.dot(r),o=r.dot(e)/a,h=r.dot(i)/a;return o>=0&&o<=1&&h<=0&&h>=-1}}return!1},isLinear:function(t,e,i,n){var r=n.subtract(t).divide(3);return e.equals(r)&&i.negate().equals(r)}},function(t,e){this[e]=function(e){var i=this._segment1,n=this._segment2;return t(i._point,i._handleOut,n._handleIn,n._point,e)},this.statics[e]=function(e,i){var n=e[0],r=e[1],s=e[6],a=e[7];return t(new c(n,r),new c(e[2]-n,e[3]-r),new c(e[4]-s,e[5]-a),new c(s,a),i)}},{statics:{},hasHandles:function(){return!this._segment1._handleOut.isZero()||!this._segment2._handleIn.isZero()},hasLength:function(t){return(!this.getPoint1().equals(this.getPoint2())||this.hasHandles())&&this.getLength()>(t||0)},isCollinear:function(t){return t&&this.isStraight()&&t.isStraight()&&this.getLine().isCollinear(t.getLine())},isHorizontal:function(){return this.isStraight()&&Math.abs(this.getTangentAtTime(.5).y)<1e-8},isVertical:function(){return this.isStraight()&&Math.abs(this.getTangentAtTime(.5).x)<1e-8}}),{beans:!1,getLocationAt:function(t,e){return this.getLocationAtTime(e?t:this.getTimeAt(t))},getLocationAtTime:function(t){return null!=t&&t>=0&&t<=1?new O(this,t):null},getTimeAt:function(t,e){return k.getTimeAt(this.getValues(),t,e)},getParameterAt:"#getTimeAt",getOffsetAtTime:function(t){return this.getPartLength(0,t)},getLocationOf:function(){return this.getLocationAtTime(this.getTimeOf(c.read(arguments)))},getOffsetOf:function(){var t=this.getLocationOf.apply(this,arguments);return t?t.getOffset():null},getTimeOf:function(){return k.getTimeOf(this.getValues(),c.read(arguments))},getParameterOf:"#getTimeOf",getNearestLocation:function(){var t=c.read(arguments),e=this.getValues(),i=k.getNearestTime(e,t),n=k.getPoint(e,i);return new O(this,i,n,null,t.getDistance(n))},getNearestPoint:function(){var t=this.getNearestLocation.apply(this,arguments);return t?t.getPoint():t}},new function(){var t=["getPoint","getTangent","getNormal","getWeightedTangent","getWeightedNormal","getCurvature"];return r.each(t,function(t){this[t+"At"]=function(e,i){var n=this.getValues();return k[t](n,i?e:k.getTimeAt(n,e))},this[t+"AtTime"]=function(e){return k[t](this.getValues(),e)}},{statics:{_evaluateMethods:t}})},new function(){function t(t){var e=t[0],i=t[1],n=t[2],r=t[3],s=t[4],a=t[5],o=9*(n-s)+3*(t[6]-e),h=6*(e+s)-12*n,u=3*(n-e),l=9*(r-a)+3*(t[7]-i),c=6*(i+a)-12*r,f=3*(r-i);return function(t){var e=(o*t+h)*t+u,i=(l*t+c)*t+f;return Math.sqrt(e*e+i*i)}}function i(t,e){return Math.max(2,Math.min(16,Math.ceil(32*Math.abs(e-t))))}function n(t,e,i,n){if(null==e||e<0||e>1)return null;var r=t[0],s=t[1],a=t[2],o=t[3],h=t[4],l=t[5],f=t[6],d=t[7],_=u.isZero;_(a-r)&&_(o-s)&&(a=r,o=s),_(h-f)&&_(l-d)&&(h=f,l=d);var g,v,p=3*(a-r),m=3*(h-a)-p,y=f-r-p-m,w=3*(o-s),x=3*(l-o)-w,b=d-s-w-x;if(0===i)g=0===e?r:1===e?f:((y*e+m)*e+p)*e+r,v=0===e?s:1===e?d:((b*e+x)*e+w)*e+s;else{if(e<1e-8?(g=p,v=w):e>1-1e-8?(g=3*(f-h),v=3*(d-l)):(g=(3*y*e+2*m)*e+p,v=(3*b*e+2*x)*e+w),n){0===g&&0===v&&(e<1e-8||e>1-1e-8)&&(g=h-a,v=l-o);var C=Math.sqrt(g*g+v*v);C&&(g/=C,v/=C)}if(3===i){var h=6*y*e+2*m,l=6*b*e+2*x,S=Math.pow(g*g+v*v,1.5);g=0!==S?(g*l-v*h)/S:0,v=0}}return 2===i?new c(v,-g):new c(g,v)}return{statics:{classify:function(t){function i(t,i,n){var r=i!==e,s=r&&i>0&&i<1,a=r&&n>0&&n<1;return!r||(s||a)&&("loop"!==t||s&&a)||(t="arch",s=a=!1),{type:t,roots:s||a?s&&a?i<n?[i,n]:[n,i]:[s?i:n]:null}}var n=t[0],r=t[1],s=t[2],a=t[3],o=t[4],h=t[5],l=t[6],c=t[7],f=s*(r-c)+a*(l-n)+n*c-r*l,d=3*(o*(a-r)+h*(n-s)+s*r-a*n),_=d-f,g=_-f+(n*(c-h)+r*(o-l)+l*h-c*o),v=Math.sqrt(g*g+_*_+d*d),p=0!==v?1/v:0,m=u.isZero;if(g*=p,_*=p,d*=p,m(g))return m(_)?i(m(d)?"line":"quadratic"):i("serpentine",d/(3*_));var y=3*_*_-4*g*d;if(m(y))return i("cusp",_/(2*g));var w=y>0?Math.sqrt(y/3):Math.sqrt(-y),x=2*g;return i(y>0?"serpentine":"loop",(_+w)/x,(_-w)/x)},getLength:function(n,r,s,a){if(r===e&&(r=0),s===e&&(s=1),k.isStraight(n)){var o=n;s<1&&(o=k.subdivide(o,s)[0],r/=s),r>0&&(o=k.subdivide(o,r)[1]);var h=o[6]-o[0],l=o[7]-o[1];return Math.sqrt(h*h+l*l)}return u.integrate(a||t(n),r,s,i(r,s))},getTimeAt:function(n,r,s){if(s===e&&(s=r<0?1:0),0===r)return s;var a=Math.abs,o=r>0,h=o?s:0,l=o?1:s,c=t(n),f=k.getLength(n,h,l,c),d=a(r)-f;if(a(d)<1e-12)return o?l:h;if(d>1e-12)return null;var _=r/f,g=0;return u.findRoot(function(t){return g+=u.integrate(c,s,t,i(s,t)),s=t,g-r},c,s+_,h,l,32,1e-12)},getPoint:function(t,e){return n(t,e,0,!1)},getTangent:function(t,e){return n(t,e,1,!0)},getWeightedTangent:function(t,e){return n(t,e,1,!1)},getNormal:function(t,e){return n(t,e,2,!0)},getWeightedNormal:function(t,e){return n(t,e,2,!1)},getCurvature:function(t,e){return n(t,e,3,!1).x},getPeaks:function(t){var e=t[0],i=t[1],n=t[2],r=t[3],s=t[4],a=t[5],o=3*n-e-3*s+t[6],h=3*e-6*n+3*s,l=-3*e+3*n,c=3*r-i-3*a+t[7],f=3*i-6*r+3*a,d=-3*i+3*r,_=[];return u.solveCubic(9*(o*o+c*c),9*(o*h+f*c),2*(h*h+f*f)+3*(l*o+d*c),l*h+f*d,_,1e-8,1-1e-8),_.sort()}}}},new function(){function t(t,e,i,n,r,s,a){var o=!a&&i.getPrevious()===r,h=!a&&i!==r&&i.getNext()===r;if(null!==n&&n>=(o?1e-8:0)&&n<=(h?1-1e-8:1)&&null!==s&&s>=(h?1e-8:0)&&s<=(o?1-1e-8:1)){var u=new O(i,n,null,a),l=new O(r,s,null,a);u._intersection=l,l._intersection=u,e&&!e(u)||O.insert(t,u,!0)}}function e(r,s,a,o,h,u,l,c,f,d,_,g,v){if(++f>=4096||++c>=40)return f;var p,y,w=s[0],x=s[1],b=s[6],C=s[7],S=m.getSignedDistance,P=S(w,x,b,C,s[2],s[3]),I=S(w,x,b,C,s[4],s[5]),M=P*I>0?.75:4/9,T=M*Math.min(0,P,I),z=M*Math.max(0,P,I),O=S(w,x,b,C,r[0],r[1]),A=S(w,x,b,C,r[2],r[3]),L=S(w,x,b,C,r[4],r[5]),N=S(w,x,b,C,r[6],r[7]),B=i(O,A,L,N),D=B[0],j=B[1];if(0===P&&0===I&&0===O&&0===A&&0===L&&0===N||null==(p=n(D,j,T,z))||null==(y=n(D.reverse(),j.reverse(),T,z)))return f;var E=d+(_-d)*p,F=d+(_-d)*y;if(Math.max(v-g,F-E)<1e-9){var R=(E+F)/2,q=(g+v)/2;t(h,u,l?o:a,l?q:R,l?a:o,l?R:q)}else if(r=k.getPart(r,p,y),y-p>.8)if(F-E>v-g){R=(E+F)/2;f=e(s,(V=k.subdivide(r,.5))[0],o,a,h,u,!l,c,f,g,v,E,R),f=e(s,V[1],o,a,h,u,!l,c,f,g,v,R,F)}else{var V=k.subdivide(s,.5),q=(g+v)/2;f=e(V[0],r,o,a,h,u,!l,c,f,g,q,E,F),f=e(V[1],r,o,a,h,u,!l,c,f,q,v,E,F)}else f=v-g>=1e-9?e(s,r,o,a,h,u,!l,c,f,g,v,E,F):e(r,s,a,o,h,u,l,c,f,E,F,g,v);return f}function i(t,e,i,n){var r,s=[0,t],a=[1/3,e],o=[2/3,i],h=[1,n],u=e-(2*t+n)/3,l=i-(t+2*n)/3;if(u*l<0)r=[[s,a,h],[s,o,h]];else{var c=u/l;r=[c>=2?[s,a,h]:c<=.5?[s,o,h]:[s,a,o,h],[s,h]]}return(u||l)<0?r.reverse():r}function n(t,e,i,n){return t[0][1]<i?r(t,!0,i):e[0][1]>n?r(e,!1,n):t[0][0]}function r(t,e,i){for(var n=t[0][0],r=t[0][1],s=1,a=t.length;s<a;s++){var o=t[s][0],h=t[s][1];if(e?h>=i:h<=i)return h===i?o:n+(i-r)*(o-n)/(h-r);n=o,r=h}return null}function s(t,e,i,n,r){var s=u.isZero;if(s(n)&&s(r)){var a=k.getTimeOf(t,new c(e,i));return null===a?[]:[a]}for(var o=Math.atan2(-r,n),h=Math.sin(o),l=Math.cos(o),f=[],d=[],_=0;_<8;_+=2){var g=t[_]-e,v=t[_+1]-i;f.push(g*l-v*h,g*h+v*l)}return k.solveCubic(f,1,0,d,0,1),d}function a(e,i,n,r,a,o,h){for(var u=i[0],l=i[1],c=s(e,u,l,i[6]-u,i[7]-l),f=0,d=c.length;f<d;f++){var _=c[f],g=k.getPoint(e,_),v=k.getTimeOf(i,g);null!==v&&t(a,o,h?r:n,h?v:_,h?n:r,h?_:v)}}function o(e,i,n,r,s,a){var o=m.intersect(e[0],e[1],e[6],e[7],i[0],i[1],i[6],i[7]);o&&t(s,a,n,k.getTimeOf(e,o),r,k.getTimeOf(i,o))}function h(i,n,r,s,h,u){var l=Math.min,d=Math.max;if(d(i[0],i[2],i[4],i[6])+1e-12>l(n[0],n[2],n[4],n[6])&&l(i[0],i[2],i[4],i[6])-1e-12<d(n[0],n[2],n[4],n[6])&&d(i[1],i[3],i[5],i[7])+1e-12>l(n[1],n[3],n[5],n[7])&&l(i[1],i[3],i[5],i[7])-1e-12<d(n[1],n[3],n[5],n[7])){var _=f(i,n);if(_)for(x=0;x<2;x++){var g=_[x];t(h,u,r,g[0],s,g[1],!0)}else{var v=k.isStraight(i),p=k.isStraight(n),m=v&&p,y=v&&!p,w=h.length;if((m?o:v||p?a:e)(y?n:i,y?i:n,y?s:r,y?r:s,h,u,y,0,0,0,1,0,1),!m||h.length===w)for(var x=0;x<4;x++){var b=x>>1,C=1&x,S=6*b,P=6*C,I=new c(i[S],i[S+1]),M=new c(n[P],n[P+1]);I.isClose(M,1e-12)&&t(h,u,r,b,s,C)}}}return h}function l(e,i,n,r){var s=k.classify(e);if("loop"===s.type){var a=s.roots;t(n,r,i,a[0],i,a[1])}return n}function f(t,e){function i(t){var e=t[6]-t[0],i=t[7]-t[1];return e*e+i*i}var n=Math.abs,r=m.getDistance,s=k.isStraight(t),a=k.isStraight(e),o=s&&a,h=i(t)<i(e),u=h?e:t,l=h?t:e,f=u[0],d=u[1],_=u[6]-f,g=u[7]-d;if(r(f,d,_,g,l[0],l[1],!0)<1e-7&&r(f,d,_,g,l[6],l[7],!0)<1e-7)!o&&r(f,d,_,g,u[2],u[3],!0)<1e-7&&r(f,d,_,g,u[4],u[5],!0)<1e-7&&r(f,d,_,g,l[2],l[3],!0)<1e-7&&r(f,d,_,g,l[4],l[5],!0)<1e-7&&(s=a=o=!0);else if(o)return null;if(s^a)return null;for(var v=[t,e],p=[],y=0;y<4&&p.length<2;y++){var w=1&y,x=1^w,b=y>>1,C=k.getTimeOf(v[w],new c(v[x][b?6:0],v[x][b?7:1]));if(null!=C){var S=w?[b,C]:[C,b];(!p.length||n(S[0]-p[0][0])>1e-8&&n(S[1]-p[0][1])>1e-8)&&p.push(S)}if(y>2&&!p.length)break}if(2!==p.length)p=null;else if(!o){var P=k.getPart(t,p[0][0],p[1][0]),I=k.getPart(e,p[0][1],p[1][1]);(n(I[2]-P[2])>1e-7||n(I[3]-P[3])>1e-7||n(I[4]-P[4])>1e-7||n(I[5]-P[5])>1e-7)&&(p=null)}return p}return{getIntersections:function(t){var e=this.getValues(),i=t&&t!==this&&t.getValues();return i?h(e,i,this,t,[]):l(e,this,[])},statics:{getOverlaps:f,getIntersections:function(t,e,i,n,r,s){var a=!e;a&&(e=t);for(var o,u,c=t.length,f=e.length,d=[],_=[],g=0;g<f;g++)d[g]=e[g].getValues(r);for(g=0;g<c;g++){var v=t[g],p=a?d[g]:v.getValues(n),m=v.getPath();m!==u&&(u=m,o=[],_.push(o)),a&&l(p,v,o,i);for(var y=a?g+1:0;y<f;y++){if(s&&o.length)return o;h(p,d[y],v,e[y],o,i)}}o=[];for(var g=0,w=_.length;g<w;g++)o.push.apply(o,_[g]);return o},getCurveLineIntersections:s}}}),O=r.extend({_class:"CurveLocation",initialize:function(t,e,i,n,r){if(e>=.99999999){var s=t.getNext();s&&(e=0,t=s)}this._setCurve(t),this._time=e,this._point=i||t.getPointAtTime(e),this._overlap=n,this._distance=r,this._intersection=this._next=this._previous=null},_setCurve:function(t){var e=t._path;this._path=e,this._version=e?e._version:0,this._curve=t,this._segment=null,this._segment1=t._segment1,this._segment2=t._segment2},_setSegment:function(t){this._setCurve(t.getCurve()),this._segment=t,this._time=t===this._segment1?0:1,this._point=t._point.clone()},getSegment:function(){var t=this._segment;if(!t){var e=this.getCurve(),i=this.getTime();0===i?t=e._segment1:1===i?t=e._segment2:null!=i&&(t=e.getPartLength(0,i)<e.getPartLength(i,1)?e._segment1:e._segment2),this._segment=t}return t},getCurve:function(){function t(t){var e=t&&t.getCurve();if(e&&null!=(i._time=e.getTimeOf(i._point)))return i._setCurve(e),e}var e=this._path,i=this;return e&&e._version!==this._version&&(this._time=this._offset=this._curveOffset=this._curve=null),this._curve||t(this._segment)||t(this._segment1)||t(this._segment2.getPrevious())},getPath:function(){var t=this.getCurve();return t&&t._path},getIndex:function(){var t=this.getCurve();return t&&t.getIndex()},getTime:function(){var t=this.getCurve(),e=this._time;return t&&null==e?this._time=t.getTimeOf(this._point):e},getParameter:"#getTime",getPoint:function(){return this._point},getOffset:function(){var t=this._offset;if(null==t){t=0;var e=this.getPath(),i=this.getIndex();if(e&&null!=i)for(var n=e.getCurves(),r=0;r<i;r++)t+=n[r].getLength();this._offset=t+=this.getCurveOffset()}return t},getCurveOffset:function(){var t=this._curveOffset;if(null==t){var e=this.getCurve(),i=this.getTime();this._curveOffset=t=null!=i&&e&&e.getPartLength(0,i)}return t},getIntersection:function(){return this._intersection},getDistance:function(){return this._distance},divide:function(){var t=this.getCurve(),e=t&&t.divideAtTime(this.getTime());return e&&this._setSegment(e._segment1),e},split:function(){var t=this.getCurve(),e=t._path,i=t&&t.splitAtTime(this.getTime());return i&&this._setSegment(e.getLastSegment()),i},equals:function(t,e){var i=this===t;if(!i&&t instanceof O){var n=this.getCurve(),r=t.getCurve(),s=n._path;if(s===r._path){var a=Math.abs,o=a(this.getOffset()-t.getOffset()),h=!e&&this._intersection,u=!e&&t._intersection;i=(o<1e-7||s&&a(s.getLength()-o)<1e-7)&&(!h&&!u||h&&u&&h.equals(u,!0))}}return i},toString:function(){var t=[],e=this.getPoint(),i=h.instance;e&&t.push("point: "+e);var n=this.getIndex();null!=n&&t.push("index: "+n);var r=this.getTime();return null!=r&&t.push("time: "+i.number(r)),null!=this._distance&&t.push("distance: "+i.number(this._distance)),"{ "+t.join(", ")+" }"},isTouching:function(){var t=this._intersection;if(t&&this.getTangent().isCollinear(t.getTangent())){var e=this.getCurve(),i=t.getCurve();return!(e.isStraight()&&i.isStraight()&&e.getLine().intersect(i.getLine()))}return!1},isCrossing:function(){function t(t,e){var i=t.getValues(),n=k.classify(i).roots||k.getPeaks(i),r=n.length,s=e&&r>1?n[r-1]:r>0?n[0]:.5;c.push(k.getLength(i,e?s:0,e?1:s)/2)}function e(t,e,i){return e<i?t>e&&t<i:t>e||t<i}var i=this._intersection;if(!i)return!1;var n=this.getTime(),r=i.getTime(),s=n>=1e-8&&n<=1-1e-8,a=r>=1e-8&&r<=1-1e-8;if(s&&a)return!this.isTouching();var o=this.getCurve(),h=n<1e-8?o.getPrevious():o,u=i.getCurve(),l=r<1e-8?u.getPrevious():u;if(n>1-1e-8&&(o=o.getNext()),r>1-1e-8&&(u=u.getNext()),!(h&&o&&l&&u))return!1;var c=[];s||(t(h,!0),t(o,!1)),a||(t(l,!0),t(u,!1));var f=this.getPoint(),d=Math.min.apply(Math,c),_=s?o.getTangentAtTime(n):o.getPointAt(d).subtract(f),g=s?_.negate():h.getPointAt(-d).subtract(f),v=a?u.getTangentAtTime(r):u.getPointAt(d).subtract(f),p=a?v.negate():l.getPointAt(-d).subtract(f),m=g.getAngle(),y=_.getAngle(),w=p.getAngle(),x=v.getAngle();return!!(s?e(m,w,x)^e(y,w,x)&&e(m,x,w)^e(y,x,w):e(w,m,y)^e(x,m,y)&&e(w,y,m)^e(x,y,m))},hasOverlap:function(){return!!this._overlap}},r.each(k._evaluateMethods,function(t){var e=t+"At";this[t]=function(){var t=this.getCurve(),i=this.getTime();return null!=i&&t&&t[e](i,!0)}},{preserve:!0}),new function(){function t(t,e,i){function n(i,n){for(var s=i+n;s>=-1&&s<=r;s+=n){var a=t[(s%r+r)%r];if(!e.getPoint().isClose(a.getPoint(),1e-7))break;if(e.equals(a))return a}return null}for(var r=t.length,s=0,a=r-1;s<=a;){var o,h=s+a>>>1,u=t[h];if(i&&(o=e.equals(u)?u:n(h,-1)||n(h,1)))return e._overlap&&(o._overlap=o._intersection._overlap=!0),o;var l=e.getPath(),c=u.getPath();(l!==c?l._id-c._id:e.getIndex()+e.getTime()-(u.getIndex()+u.getTime()))<0?a=h-1:s=h+1}return t.splice(s,0,e),e}return{statics:{insert:t,expand:function(e){for(var i=e.slice(),n=e.length-1;n>=0;n--)t(i,e[n]._intersection,!1);return i}}}}),A=w.extend({_class:"PathItem",_selectBounds:!1,_canScaleStroke:!0,beans:!0,initialize:function(){},statics:{create:function(t){var e,i,n;if(r.isPlainObject(t)?(i=t.segments,e=t.pathData):Array.isArray(t)?i=t:"string"==typeof t&&(e=t),i){var s=i[0];n=s&&Array.isArray(s[0])}else e&&(n=(e.match(/m/gi)||[]).length>1||/z\s*\S+/i.test(e));return new(n?N:L)(t)}},_asPathItem:function(){return this},isClockwise:function(){return this.getArea()>=0},setClockwise:function(t){this.isClockwise()!=(t=!!t)&&this.reverse()},setPathData:function(t){function e(t,e){var i=+n[t];return o&&(i+=h[e]),i}function i(t){return new c(e(t,"x"),e(t+1,"y"))}var n,r,s,a=t&&t.match(/[mlhvcsqtaz][^mlhvcsqtaz]*/gi),o=!1,h=new c,u=new c;this.clear();for(var l=0,f=a&&a.length;l<f;l++){var _=a[l],g=_[0],v=g.toLowerCase(),p=(n=_.match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g))&&n.length;switch(o=g===v,"z"!==r||/[mz]/.test(v)||this.moveTo(h),v){case"m":case"l":for(var m="m"===v,y=0;y<p;y+=2)this[m?"moveTo":"lineTo"](h=i(y)),m&&(u=h,m=!1);s=h;break;case"h":case"v":var w="h"===v?"x":"y";h=h.clone();for(y=0;y<p;y++)h[w]=e(y,w),this.lineTo(h);s=h;break;case"c":for(y=0;y<p;y+=6)this.cubicCurveTo(i(y),s=i(y+2),h=i(y+4));break;case"s":for(y=0;y<p;y+=4)this.cubicCurveTo(/[cs]/.test(r)?h.multiply(2).subtract(s):h,s=i(y),h=i(y+2)),r=v;break;case"q":for(y=0;y<p;y+=4)this.quadraticCurveTo(s=i(y),h=i(y+2));break;case"t":for(y=0;y<p;y+=2)this.quadraticCurveTo(s=/[qt]/.test(r)?h.multiply(2).subtract(s):h,h=i(y)),r=v;break;case"a":for(y=0;y<p;y+=7)this.arcTo(h=i(y+5),new d(+n[y],+n[y+1]),+n[y+2],+n[y+4],+n[y+3]);break;case"z":this.closePath(1e-12),h=u}r=v}},_canComposite:function(){return!(this.hasFill()&&this.hasStroke())},_contains:function(t){var e=t.isInside(this.getBounds({internal:!0,handle:!0}))?this._getWinding(t):{};return e.onPath||!!("evenodd"===this.getFillRule()?1&e.windingL||1&e.windingR:e.winding)},getIntersections:function(t,e,i,n){var r=this===t||!t,s=this._matrix._orNullIfIdentity(),a=r?s:(i||t._matrix)._orNullIfIdentity();return r||this.getBounds(s).intersects(t.getBounds(a),1e-12)?k.getIntersections(this.getCurves(),!r&&t.getCurves(),e,s,a,n):[]},getCrossings:function(t){return this.getIntersections(t,function(t){return t.hasOverlap()||t.isCrossing()})},getNearestLocation:function(){for(var t=c.read(arguments),e=this.getCurves(),i=1/0,n=null,r=0,s=e.length;r<s;r++){var a=e[r].getNearestLocation(t);a._distance<i&&(i=a._distance,n=a)}return n},getNearestPoint:function(){var t=this.getNearestLocation.apply(this,arguments);return t?t.getPoint():t},interpolate:function(t,e,i){var n=!this._children,r=n?"_segments":"_children",s=t[r],a=e[r],o=this[r];if(!s||!a||s.length!==a.length)throw new Error("Invalid operands in interpolate() call: "+t+", "+e);var h=o.length,u=a.length;if(h<u)for(var l=n?T:L,c=h;c<u;c++)this.add(new l);else h>u&&this[n?"removeSegments":"removeChildren"](u,h);for(c=0;c<u;c++)o[c].interpolate(s[c],a[c],i);n&&(this.setClosed(t._closed),this._changed(9))},compare:function(t){var e=!1;if(t){var i=this._children||[this],n=t._children?t._children.slice():[t],r=i.length,s=n.length,a=[],o=0;e=!0;for(var h=r-1;h>=0&&e;h--){var u=i[h];e=!1;for(var l=s-1;l>=0&&!e;l--)u.compare(n[l])&&(a[l]||(a[l]=!0,o++),e=!0)}e=e&&o===s}return e}}),L=A.extend({_class:"Path",_serializeFields:{segments:[],closed:!1},initialize:function(t){this._closed=!1,this._segments=[],this._version=0;var i=Array.isArray(t)?"object"==typeof t[0]?t:arguments:!t||t.size!==e||t.x===e&&t.point===e?null:arguments;i&&i.length>0?this.setSegments(i):(this._curves=e,this._segmentSelection=0,i||"string"!=typeof t||(this.setPathData(t),t=null)),this._initialize(!i&&t)},_equals:function(t){return this._closed===t._closed&&r.equals(this._segments,t._segments)},copyContent:function(t){this.setSegments(t._segments),this._closed=t._closed},_changed:function t(i){if(t.base.call(this,i),8&i){if(this._length=this._area=e,16&i)this._version++;else if(this._curves)for(var n=0,r=this._curves.length;n<r;n++)this._curves[n]._changed()}else 32&i&&(this._bounds=e)},getStyle:function(){var t=this._parent;return(t instanceof N?t:this)._style},getSegments:function(){return this._segments},setSegments:function(t){var i=this.isFullySelected(),n=t&&t.length;if(this._segments.length=0,this._segmentSelection=0,this._curves=e,n){var r=t[n-1];"boolean"==typeof r&&(this.setClosed(r),n--),this._add(T.readList(t,0,{},n))}i&&this.setFullySelected(!0)},getFirstSegment:function(){return this._segments[0]},getLastSegment:function(){return this._segments[this._segments.length-1]},getCurves:function(){var t=this._curves,e=this._segments;if(!t){var i=this._countCurves();t=this._curves=new Array(i);for(var n=0;n<i;n++)t[n]=new k(this,e[n],e[n+1]||e[0])}return t},getFirstCurve:function(){return this.getCurves()[0]},getLastCurve:function(){var t=this.getCurves();return t[t.length-1]},isClosed:function(){return this._closed},setClosed:function(t){if(this._closed!=(t=!!t)){if(this._closed=t,this._curves){var e=this._curves.length=this._countCurves();t&&(this._curves[e-1]=new k(this,this._segments[e-1],this._segments[0]))}this._changed(25)}}},{beans:!0,getPathData:function(t,e){function i(e,i){if(e._transformCoordinates(t,g),n=g[0],r=g[1],v)p.push("M"+_.pair(n,r)),v=!1;else if(o=g[2],u=g[3],o===n&&u===r&&l===s&&c===a){if(!i){var h=n-s,f=r-a;p.push(0===h?"v"+_.number(f):0===f?"h"+_.number(h):"l"+_.pair(h,f))}}else p.push("c"+_.pair(l-s,c-a)+" "+_.pair(o-s,u-a)+" "+_.pair(n-s,r-a));s=n,a=r,l=g[4],c=g[5]}var n,r,s,a,o,u,l,c,f=this._segments,d=f.length,_=new h(e),g=new Array(6),v=!0,p=[];if(!d)return"";for(var m=0;m<d;m++)i(f[m]);return this._closed&&d>0&&(i(f[0],!0),p.push("z")),p.join("")},isEmpty:function(){return!this._segments.length},_transformContent:function(t){for(var e=this._segments,i=new Array(6),n=0,r=e.length;n<r;n++)e[n]._transformCoordinates(t,i,!0);return!0},_add:function(t,e){for(var i=this._segments,n=this._curves,r=t.length,s=null==e,e=s?i.length:e,a=0;a<r;a++){var o=t[a];o._path&&(o=t[a]=o.clone()),o._path=this,o._index=e+a,o._selection&&this._updateSelection(o,0,o._selection)}if(s)i.push.apply(i,t);else{i.splice.apply(i,[e,0].concat(t));for(var a=e+r,h=i.length;a<h;a++)i[a]._index=a}if(n){var u=this._countCurves(),l=e>0&&e+r-1===u?e-1:e,c=l,f=Math.min(l+r,u);t._curves&&(n.splice.apply(n,[l,0].concat(t._curves)),c+=t._curves.length);for(a=c;a<f;a++)n.splice(a,0,new k(this,null,null));this._adjustCurves(l,f)}return this._changed(25),t},_adjustCurves:function(t,e){for(var i,n=this._segments,r=this._curves,s=t;s<e;s++)(i=r[s])._path=this,i._segment1=n[s],i._segment2=n[s+1]||n[0],i._changed();(i=r[this._closed&&!t?n.length-1:t-1])&&(i._segment2=n[t]||n[0],i._changed()),(i=r[e])&&(i._segment1=n[e],i._changed())},_countCurves:function(){var t=this._segments.length;return!this._closed&&t>0?t-1:t},add:function(t){return arguments.length>1&&"number"!=typeof t?this._add(T.readList(arguments)):this._add([T.read(arguments)])[0]},insert:function(t,e){return arguments.length>2&&"number"!=typeof e?this._add(T.readList(arguments,1),t):this._add([T.read(arguments,1)],t)[0]},addSegment:function(){return this._add([T.read(arguments)])[0]},insertSegment:function(t){return this._add([T.read(arguments,1)],t)[0]},addSegments:function(t){return this._add(T.readList(t))},insertSegments:function(t,e){return this._add(T.readList(e),t)},removeSegment:function(t){return this.removeSegments(t,t+1)[0]||null},removeSegments:function(t,e,i){t=t||0,e=r.pick(e,this._segments.length);var n=this._segments,s=this._curves,a=n.length,o=n.splice(t,e-t),h=o.length;if(!h)return o;for(l=0;l<h;l++){var u=o[l];u._selection&&this._updateSelection(u,u._selection,0),u._index=u._path=null}for(var l=t,c=n.length;l<c;l++)n[l]._index=l;if(s){for(var f=t>0&&e===a+(this._closed?1:0)?t-1:t,l=(s=s.splice(f,h)).length-1;l>=0;l--)s[l]._path=null;i&&(o._curves=s.slice(1)),this._adjustCurves(f,f)}return this._changed(25),o},clear:"#removeSegments",hasHandles:function(){for(var t=this._segments,e=0,i=t.length;e<i;e++)if(t[e].hasHandles())return!0;return!1},clearHandles:function(){for(var t=this._segments,e=0,i=t.length;e<i;e++)t[e].clearHandles()},getLength:function(){if(null==this._length){for(var t=this.getCurves(),e=0,i=0,n=t.length;i<n;i++)e+=t[i].getLength();this._length=e}return this._length},getArea:function(){var t=this._area;if(null==t){var e=this._segments,i=this._closed;t=0;for(var n=0,r=e.length;n<r;n++){var s=n+1===r;t+=k.getArea(k.getValues(e[n],e[s?0:n+1],null,s&&!i))}this._area=t}return t},isFullySelected:function(){var t=this._segments.length;return this.isSelected()&&t>0&&this._segmentSelection===7*t},setFullySelected:function(t){t&&this._selectSegments(!0),this.setSelected(t)},setSelection:function t(e){1&e||this._selectSegments(!1),t.base.call(this,e)},_selectSegments:function(t){var e=this._segments,i=e.length,n=t?7:0;this._segmentSelection=n*i;for(var r=0;r<i;r++)e[r]._selection=n},_updateSelection:function(t,e,i){t._selection=i,(this._segmentSelection+=i-e)>0&&this.setSelected(!0)},divideAt:function(t){var e,i=this.getLocationAt(t);return i&&(e=i.getCurve().divideAt(i.getCurveOffset()))?e._segment1:null},splitAt:function(t){var e=this.getLocationAt(t),i=e&&e.index,n=e&&e.time;n>1-1e-8&&(i++,n=0);var r=this.getCurves();if(i>=0&&i<r.length){n>=1e-8&&r[i++].divideAtTime(n);var s,a=this.removeSegments(i,this._segments.length,!0);return this._closed?(this.setClosed(!1),s=this):((s=new L(w.NO_INSERT)).insertAbove(this),s.copyAttributes(this)),s._add(a,0),this.addSegment(a[0]),s}return null},split:function(t,i){var n,r=i===e?t:(n=this.getCurves()[t])&&n.getLocationAtTime(i);return null!=r?this.splitAt(r):null},join:function(t,e){var i=e||0;if(t&&t!==this){var n=t._segments,r=this.getLastSegment(),s=t.getLastSegment();if(!s)return this;r&&r._point.isClose(s._point,i)&&t.reverse();var a=t.getFirstSegment();if(r&&r._point.isClose(a._point,i))r.setHandleOut(a._handleOut),this._add(n.slice(1));else{var o=this.getFirstSegment();o&&o._point.isClose(a._point,i)&&t.reverse(),s=t.getLastSegment(),o&&o._point.isClose(s._point,i)?(o.setHandleIn(s._handleIn),this._add(n.slice(0,n.length-1),0)):this._add(n.slice())}t._closed&&this._add([n[0]]),t.remove()}var h=this.getFirstSegment(),u=this.getLastSegment();return h!==u&&h._point.isClose(u._point,i)&&(h.setHandleIn(u._handleIn),u.remove(),this.setClosed(!0)),this},reduce:function(t){for(var e=this.getCurves(),i=t&&t.simplify,n=i?1e-7:0,r=e.length-1;r>=0;r--){var s=e[r];!s.hasHandles()&&(!s.hasLength(n)||i&&s.isCollinear(s.getNext()))&&s.remove()}return this},reverse:function(){this._segments.reverse();for(var t=0,e=this._segments.length;t<e;t++){var i=this._segments[t],n=i._handleIn;i._handleIn=i._handleOut,i._handleOut=n,i._index=t}this._curves=null,this._changed(9)},flatten:function(t){for(var e=new B(this,t||.25,256,!0).parts,i=e.length,n=[],r=0;r<i;r++)n.push(new T(e[r].curve.slice(0,2)));!this._closed&&i>0&&n.push(new T(e[i-1].curve.slice(6))),this.setSegments(n)},simplify:function(t){var e=new D(this).fit(t||2.5);return e&&this.setSegments(e),!!e},smooth:function(t){function i(t,e){var i=t&&t.index;if(null!=i){var r=t.path;if(r&&r!==n)throw new Error(t._class+" "+i+" of "+r+" is not part of "+n);e&&t instanceof k&&i++}else i="number"==typeof t?t:e;return Math.min(i<0&&h?i%o:i<0?i+o:i,o-1)}var n=this,r=t||{},s=r.type||"asymmetric",a=this._segments,o=a.length,h=this._closed,u=h&&r.from===e&&r.to===e,l=i(r.from,0),c=i(r.to,o-1);if(l>c)if(h)l-=o;else{var f=l;l=c,c=f}if(/^(?:asymmetric|continuous)$/.test(s)){var d="asymmetric"===s,_=Math.min,g=c-l+1,v=g-1,p=u?_(g,4):1,m=p,y=p,w=[];if(h||(m=_(1,l),y=_(1,o-c-1)),(v+=m+y)<=1)return;for(var x=0,b=l-m;x<=v;x++,b++)w[x]=a[(b<0?b+o:b)%o]._point;for(var C=w[0]._x+2*w[1]._x,S=w[0]._y+2*w[1]._y,P=2,I=v-1,M=[C],T=[S],z=[P],O=[],A=[],x=1;x<v;x++){var L=x<I,N=L?1:d?1:2,B=L?4:d?2:7,D=L?4:d?3:8,j=L?2:d?0:1,E=N/P;P=z[x]=B-E,C=M[x]=D*w[x]._x+j*w[x+1]._x-E*C,S=T[x]=D*w[x]._y+j*w[x+1]._y-E*S}O[I]=M[I]/z[I],A[I]=T[I]/z[I];for(x=v-2;x>=0;x--)O[x]=(M[x]-O[x+1])/z[x],A[x]=(T[x]-A[x+1])/z[x];O[v]=(3*w[v]._x-O[I])/2,A[v]=(3*w[v]._y-A[I])/2;for(var x=m,F=v-y,b=l;x<=F;x++,b++){var R=a[b<0?b+o:b],q=R._point,V=O[x]-q._x,H=A[x]-q._y;(u||x<F)&&R.setHandleOut(V,H),(u||x>m)&&R.setHandleIn(-V,-H)}}else for(x=l;x<=c;x++)a[x<0?x+o:x].smooth(r,!u&&x===l,!u&&x===c)},toShape:function(t){function i(t,e){var i=l[t],n=i.getNext(),r=l[e],s=r.getNext();return i._handleOut.isZero()&&n._handleIn.isZero()&&r._handleOut.isZero()&&s._handleIn.isZero()&&n._point.subtract(i._point).isCollinear(s._point.subtract(r._point))}function n(t){var e=l[t],i=e.getNext(),n=e._handleOut,r=i._handleIn;if(n.isOrthogonal(r)){var s=e._point,a=i._point,o=new m(s,n,!0).intersect(new m(a,r,!0),!0);return o&&u.isZero(n.getLength()/o.subtract(s).getLength()-.5522847498307936)&&u.isZero(r.getLength()/o.subtract(a).getLength()-.5522847498307936)}return!1}function r(t,e){return l[t]._point.getDistance(l[e]._point)}if(!this._closed)return null;var s,a,o,h,l=this._segments;if(!this.hasHandles()&&4===l.length&&i(0,2)&&i(1,3)&&function(t){var e=l[t],i=e.getPrevious(),n=e.getNext();return i._handleOut.isZero()&&e._handleIn.isZero()&&e._handleOut.isZero()&&n._handleIn.isZero()&&e._point.subtract(i._point).isOrthogonal(n._point.subtract(e._point))}(1)?(s=C.Rectangle,a=new d(r(0,3),r(0,1)),h=l[1]._point.add(l[2]._point).divide(2)):8===l.length&&n(0)&&n(2)&&n(4)&&n(6)&&i(1,5)&&i(3,7)?(s=C.Rectangle,o=(a=new d(r(1,6),r(0,3))).subtract(new d(r(0,7),r(1,2))).divide(2),h=l[3]._point.add(l[4]._point).divide(2)):4===l.length&&n(0)&&n(1)&&n(2)&&n(3)&&(u.isZero(r(0,2)-r(1,3))?(s=C.Circle,o=r(0,2)/2):(s=C.Ellipse,o=new d(r(2,0)/2,r(3,1)/2)),h=l[1]._point),s){var c=this.getPosition(!0),f=new s({center:c,size:a,radius:o,insert:!1});return f.copyAttributes(this,!0),f._matrix.prepend(this._matrix),f.rotate(h.subtract(c).getAngle()+90),(t===e||t)&&f.insertAbove(this),f}return null},toPath:"#clone",compare:function t(e){if(!e||e instanceof N)return t.base.call(this,e);var i=this.getCurves(),n=e.getCurves(),r=i.length,s=n.length;if(!r||!s)return r==s;for(var a,o,h=i[0].getValues(),u=[],l=0,c=0,f=0;f<s;f++){g=n[f].getValues();if(u.push(g),v=k.getOverlaps(h,g)){a=!f&&v[0][0]>0?s-1:f,o=v[0][1];break}}for(var d,_=Math.abs,g=u[a];h&&g;){var v=k.getOverlaps(h,g);if(v&&_(v[0][0]-c)<1e-8){1===(c=v[1][0])&&(h=++l<r?i[l].getValues():null,c=0);var p=v[0][1];if(_(p-o)<1e-8){if(d||(d=[a,p]),1===(o=v[1][1])&&(++a>=s&&(a=0),g=u[a]||n[a].getValues(),o=0),!h)return d[0]===a&&d[1]===o;continue}}break}return!1},_hitTestSelf:function(t,e,i,n){function r(e,i){return t.subtract(e).divide(i).length<=1}function s(t,i,n){if(!e.selected||i.isSelected()){var s=t._point;if(i!==s&&(i=i.add(s)),r(i,x))return new M(n,g,{segment:t,point:i})}}function a(t,i){return(i||e.segments)&&s(t,t._point,"segment")||!i&&e.handles&&(s(t,t._handleIn,"handle-in")||s(t,t._handleOut,"handle-out"))}function o(t){f.add(t)}function h(e){var i=y||e._index>0&&e._index<m-1;if("round"===(i?u:l))return r(e._point,x);if(f=new L({internal:!0,closed:!0}),i?e.isSmooth()||L._addBevelJoin(e,u,P,c,null,n,o,!0):"square"===l&&L._addSquareCap(e,l,P,null,n,o,!0),!f.isEmpty()){var s;return f.contains(t)||(s=f.getNearestLocation(t))&&r(s.getPoint(),w)}}var u,l,c,f,d,_,g=this,v=this.getStyle(),p=this._segments,m=p.length,y=this._closed,w=e._tolerancePadding,x=w,b=e.stroke&&v.hasStroke(),C=e.fill&&v.hasFill(),S=e.curves,P=b?v.getStrokeWidth()/2:C&&e.tolerance>0||S?0:null;if(null!==P&&(P>0?(u=v.getStrokeJoin(),l=v.getStrokeCap(),c=v.getMiterLimit(),x=x.add(L._getStrokePadding(P,n))):u=l="round"),!e.ends||e.segments||y){if(e.segments||e.handles)for(T=0;T<m;T++)if(_=a(p[T]))return _}else if(_=a(p[0],!0)||a(p[m-1],!0))return _;if(null!==P){if(d=this.getNearestLocation(t)){var I=d.getTime();0===I||1===I&&m>1?h(d.getSegment())||(d=null):r(d.getPoint(),x)||(d=null)}if(!d&&"miter"===u&&m>1)for(var T=0;T<m;T++){var z=p[T];if(t.getDistance(z._point)<=c*P&&h(z)){d=z.getLocation();break}}}return!d&&C&&this._contains(t)||d&&!b&&!S?new M("fill",this):d?new M(b?"stroke":"curve",this,{location:d,point:d.getPoint()}):null}},r.each(k._evaluateMethods,function(t){this[t+"At"]=function(e){var i=this.getLocationAt(e);return i&&i[t]()}},{beans:!1,getLocationOf:function(){for(var t=c.read(arguments),e=this.getCurves(),i=0,n=e.length;i<n;i++){var r=e[i].getLocationOf(t);if(r)return r}return null},getOffsetOf:function(){var t=this.getLocationOf.apply(this,arguments);return t?t.getOffset():null},getLocationAt:function(t){if("number"==typeof t){for(var e=this.getCurves(),i=0,n=0,r=e.length;n<r;n++){var s=i,a=e[n];if((i+=a.getLength())>t)return a.getLocationAt(t-s)}if(e.length>0&&t<=this.getLength())return new O(e[e.length-1],1)}else if(t&&t.getPath&&t.getPath()===this)return t;return null}}),new function(){function t(t,e,i,n){function r(e){var i=h[e],n=h[e+1];s==i&&a==n||(t.beginPath(),t.moveTo(s,a),t.lineTo(i,n),t.stroke(),t.beginPath(),t.arc(i,n,o,0,2*Math.PI,!0),t.fill())}for(var s,a,o=n/2,h=new Array(6),u=0,l=e.length;u<l;u++){var c=e[u],f=c._selection;if(c._transformCoordinates(i,h),s=h[0],a=h[1],2&f&&r(2),4&f&&r(4),t.fillRect(s-o,a-o,n,n),!(1&f)){var d=t.fillStyle;t.fillStyle="#ffffff",t.fillRect(s-o+1,a-o+1,n-2,n-2),t.fillStyle=d}}}function e(t,e,i){function n(e){if(i)e._transformCoordinates(i,_),r=_[0],s=_[1];else{var n=e._point;r=n._x,s=n._y}if(g)t.moveTo(r,s),g=!1;else{if(i)h=_[2],u=_[3];else{f=e._handleIn;h=r+f._x,u=s+f._y}h===r&&u===s&&l===a&&c===o?t.lineTo(r,s):t.bezierCurveTo(l,c,h,u,r,s)}if(a=r,o=s,i)l=_[4],c=_[5];else{var f=e._handleOut;l=a+f._x,c=o+f._y}}for(var r,s,a,o,h,u,l,c,f=e._segments,d=f.length,_=new Array(6),g=!0,v=0;v<d;v++)n(f[v]);e._closed&&d>0&&n(f[0])}return{_draw:function(t,i,n,r){function s(t){return c[(t%f+f)%f]}var a=i.dontStart,o=i.dontFinish||i.clip,h=this.getStyle(),u=h.hasFill(),l=h.hasStroke(),c=h.getDashArray(),f=!paper.support.nativeDash&&l&&c&&c.length;if(a||t.beginPath(),(u||l&&!f||o)&&(e(t,this,r),this._closed&&t.closePath()),!o&&(u||l)&&(this._setStyles(t,i,n),u&&(t.fill(h.getFillRule()),t.shadowColor="rgba(0,0,0,0)"),l)){if(f){a||t.beginPath();var d,_=new B(this,.25,32,!1,r),g=_.length,v=-h.getDashOffset(),p=0;for(v%=g;v>0;)v-=s(p--)+s(p--);for(;v<g;)d=v+s(p++),(v>0||d>0)&&_.drawPart(t,Math.max(v,0),Math.max(d,0)),v=d+s(p++)}t.stroke()}},_drawSelected:function(i,n){i.beginPath(),e(i,this,n),i.stroke(),t(i,this._segments,n,paper.settings.handleSize)}}},new function(){function t(t){var e=t._segments;if(!e.length)throw new Error("Use a moveTo() command first");return e[e.length-1]}return{moveTo:function(){var t=this._segments;1===t.length&&this.removeSegment(0),t.length||this._add([new T(c.read(arguments))])},moveBy:function(){throw new Error("moveBy() is unsupported on Path items.")},lineTo:function(){this._add([new T(c.read(arguments))])},cubicCurveTo:function(){var e=c.read(arguments),i=c.read(arguments),n=c.read(arguments),r=t(this);r.setHandleOut(e.subtract(r._point)),this._add([new T(n,i.subtract(n))])},quadraticCurveTo:function(){var e=c.read(arguments),i=c.read(arguments),n=t(this)._point;this.cubicCurveTo(e.add(n.subtract(e).multiply(1/3)),e.add(i.subtract(e).multiply(1/3)),i)},curveTo:function(){var e=c.read(arguments),i=c.read(arguments),n=r.pick(r.read(arguments),.5),s=1-n,a=t(this)._point,o=e.subtract(a.multiply(s*s)).subtract(i.multiply(n*n)).divide(2*n*s);if(o.isNaN())throw new Error("Cannot put a curve through points with parameter = "+n);this.quadraticCurveTo(o,i)},arcTo:function(){var e,i,n,s,a=Math.abs,o=Math.sqrt,h=t(this),l=h._point,f=c.read(arguments),_=r.peek(arguments);if("boolean"==typeof(x=r.pick(_,!0)))var g=(C=l.add(f).divide(2)).add(C.subtract(l).rotate(x?-90:90));else if(r.remain(arguments)<=2)g=f,f=c.read(arguments);else{var v=d.read(arguments),y=u.isZero;if(y(v.width)||y(v.height))return this.lineTo(f);var w=r.read(arguments),x=!!r.read(arguments),b=!!r.read(arguments),C=l.add(f).divide(2),S=(W=l.subtract(C).rotate(-w)).x,P=W.y,I=a(v.width),M=a(v.height),z=I*I,k=M*M,O=S*S,A=P*P,L=o(O/z+A/k);if(L>1&&(z=(I*=L)*I,k=(M*=L)*M),L=(z*k-z*A-k*O)/(z*A+k*O),a(L)<1e-12&&(L=0),L<0)throw new Error("Cannot create an arc with the given arguments");e=new c(I*P/M,-M*S/I).multiply((b===x?-1:1)*o(L)).rotate(w).add(C),i=(n=(s=(new p).translate(e).rotate(w).scale(I,M))._inverseTransform(l)).getDirectedAngle(s._inverseTransform(f)),!x&&i>0?i-=360:x&&i<0&&(i+=360)}if(g){var N=new m(l.add(g).divide(2),g.subtract(l).rotate(90),!0),B=new m(g.add(f).divide(2),f.subtract(g).rotate(90),!0),D=new m(l,f),j=D.getSide(g);if(!(e=N.intersect(B,!0))){if(!j)return this.lineTo(f);throw new Error("Cannot create an arc with the given arguments")}i=(n=l.subtract(e)).getDirectedAngle(f.subtract(e));var E=D.getSide(e);0===E?i=j*a(i):j===E&&(i+=i<0?360:-360)}for(var F=a(i),R=F>=360?4:Math.ceil((F-1e-7)/90),q=i/R,V=q*Math.PI/360,H=4/3*Math.sin(V)/(1+Math.cos(V)),Z=[],U=0;U<=R;U++){var W=f,G=null;if(U<R&&(G=n.rotate(90).multiply(H),s?(W=s._transformPoint(n),G=s._transformPoint(n.add(G)).subtract(W)):W=e.add(n)),U){var J=n.rotate(-90).multiply(H);s&&(J=s._transformPoint(n.add(J)).subtract(W)),Z.push(new T(W,J,G))}else h.setHandleOut(G);n=n.rotate(q)}this._add(Z)},lineBy:function(){var e=c.read(arguments),i=t(this)._point;this.lineTo(i.add(e))},curveBy:function(){var e=c.read(arguments),i=c.read(arguments),n=r.read(arguments),s=t(this)._point;this.curveTo(s.add(e),s.add(i),n)},cubicCurveBy:function(){var e=c.read(arguments),i=c.read(arguments),n=c.read(arguments),r=t(this)._point;this.cubicCurveTo(r.add(e),r.add(i),r.add(n))},quadraticCurveBy:function(){var e=c.read(arguments),i=c.read(arguments),n=t(this)._point;this.quadraticCurveTo(n.add(e),n.add(i))},arcBy:function(){var e=t(this)._point,i=e.add(c.read(arguments)),n=r.pick(r.peek(arguments),!0);"boolean"==typeof n?this.arcTo(i,n):this.arcTo(i,e.add(c.read(arguments)))},closePath:function(t){this.setClosed(!0),this.join(this,t)}}},{_getBounds:function(t,e){var i=e.handle?"getHandleBounds":e.stroke?"getStrokeBounds":"getBounds";return L[i](this._segments,this._closed,this,t,e)},statics:{getBounds:function(t,e,i,n,r,s){function a(t){t._transformCoordinates(n,h);for(var e=0;e<2;e++)k._addBounds(u[e],u[e+4],h[e+2],h[e],e,s?s[e]:0,l,c,f);var i=u;u=h,h=i}var o=t[0];if(!o)return new g;for(var h=new Array(6),u=o._transformCoordinates(n,new Array(6)),l=u.slice(0,2),c=l.slice(),f=new Array(2),d=1,_=t.length;d<_;d++)a(t[d]);return e&&a(o),new g(l[0],l[1],c[0]-l[0],c[1]-l[1])},getStrokeBounds:function(t,e,i,n,r){function s(t){v=v.include(t)}function a(t){v=v.unite(x.setCenter(t._point.transform(n)))}function o(t,e){"round"===e||t.isSmooth()?a(t):L._addBevelJoin(t,e,p,w,n,f,s)}function h(t,e){"round"===e?a(t):L._addSquareCap(t,e,p,n,f,s)}var u=i.getStyle(),l=u.hasStroke(),c=u.getStrokeWidth(),f=l&&i._getStrokeMatrix(n,r),_=l&&L._getStrokePadding(c,f),v=L.getBounds(t,e,i,n,r,_);if(!l)return v;for(var p=c/2,m=u.getStrokeJoin(),y=u.getStrokeCap(),w=u.getMiterLimit(),x=new g(new d(_)),b=t.length-(e?0:1),C=1;C<b;C++)o(t[C],m);return e?o(t[0],m):b>0&&(h(t[0],y),h(t[t.length-1],y)),v},_getStrokePadding:function(t,e){if(!e)return[t,t];var i=new c(t,0).transform(e),n=new c(0,t).transform(e),r=i.getAngleInRadians(),s=i.getLength(),a=n.getLength(),o=Math.sin(r),h=Math.cos(r),u=Math.tan(r),l=Math.atan2(a*u,s),f=Math.atan2(a,u*s);return[Math.abs(s*Math.cos(l)*h+a*Math.sin(l)*o),Math.abs(a*Math.sin(f)*h+s*Math.cos(f)*o)]},_addBevelJoin:function(t,e,i,n,r,s,a,o){var h=t.getCurve(),u=h.getPrevious(),l=h.getPoint1().transform(r),f=u.getNormalAtTime(1).multiply(i).transform(s),d=h.getNormalAtTime(0).multiply(i).transform(s);if(f.getDirectedAngle(d)<0&&(f=f.negate(),d=d.negate()),o&&a(l),a(l.add(f)),"miter"===e){var _=new m(l.add(f),new c(-f.y,f.x),!0).intersect(new m(l.add(d),new c(-d.y,d.x),!0),!0);_&&l.getDistance(_)<=n*i&&a(_)}a(l.add(d))},_addSquareCap:function(t,e,i,n,r,s,a){var o=t._point.transform(n),h=t.getLocation(),u=h.getNormal().multiply(0===h.getTime()?i:-i).transform(r);"square"===e&&(a&&(s(o.subtract(u)),s(o.add(u))),o=o.add(u.rotate(-90))),s(o.add(u)),s(o.subtract(u))},getHandleBounds:function(t,e,i,n,r){var s,a,o=i.getStyle();if(r.stroke&&o.hasStroke()){var h=i._getStrokeMatrix(n,r),u=o.getStrokeWidth()/2,l=u;"miter"===o.getStrokeJoin()&&(l=u*o.getMiterLimit()),"square"===o.getStrokeCap()&&(l=Math.max(l,u*Math.SQRT2)),s=L._getStrokePadding(u,h),a=L._getStrokePadding(l,h)}for(var c=new Array(6),f=1/0,d=-f,_=f,v=d,p=0,m=t.length;p<m;p++){t[p]._transformCoordinates(n,c);for(var y=0;y<6;y+=2){var w=y?s:a,x=w?w[0]:0,b=w?w[1]:0,C=c[y],S=c[y+1],P=C-x,I=C+x,M=S-b,T=S+b;P<f&&(f=P),I>d&&(d=I),M<_&&(_=M),T>v&&(v=T)}}return new g(f,_,d-f,v-_)}}});L.inject({statics:new function(){function t(t,e,i){var n=r.getNamed(i),s=new L(n&&0==n.insert&&w.NO_INSERT);return s._add(t),s._closed=e,s.set(n,{insert:!0})}function e(e,i,r){for(var s=new Array(4),a=0;a<4;a++){var o=n[a];s[a]=new T(o._point.multiply(i).add(e),o._handleIn.multiply(i),o._handleOut.multiply(i))}return t(s,!0,r)}var i=.5522847498307936,n=[new T([-1,0],[0,i],[0,-i]),new T([0,-1],[-i,0],[i,0]),new T([1,0],[0,-i],[0,i]),new T([0,1],[i,0],[-i,0])];return{Line:function(){return t([new T(c.readNamed(arguments,"from")),new T(c.readNamed(arguments,"to"))],!1,arguments)},Circle:function(){var t=c.readNamed(arguments,"center"),i=r.readNamed(arguments,"radius");return e(t,new d(i),arguments)},Rectangle:function(){var e,n=g.readNamed(arguments,"rectangle"),r=d.readNamed(arguments,"radius",0,{readNull:!0}),s=n.getBottomLeft(!0),a=n.getTopLeft(!0),o=n.getTopRight(!0),h=n.getBottomRight(!0);if(!r||r.isZero())e=[new T(s),new T(a),new T(o),new T(h)];else{var u=(r=d.min(r,n.getSize(!0).divide(2))).width,l=r.height,c=u*i,f=l*i;e=[new T(s.add(u,0),null,[-c,0]),new T(s.subtract(0,l),[0,f]),new T(a.add(0,l),null,[0,-f]),new T(a.add(u,0),[-c,0],null),new T(o.subtract(u,0),null,[c,0]),new T(o.add(0,l),[0,-f],null),new T(h.subtract(0,l),null,[0,f]),new T(h.subtract(u,0),[c,0])]}return t(e,!0,arguments)},RoundRectangle:"#Rectangle",Ellipse:function(){var t=C._readEllipse(arguments);return e(t.center,t.radius,arguments)},Oval:"#Ellipse",Arc:function(){var t=c.readNamed(arguments,"from"),e=c.readNamed(arguments,"through"),i=c.readNamed(arguments,"to"),n=r.getNamed(arguments),s=new L(n&&0==n.insert&&w.NO_INSERT);return s.moveTo(t),s.arcTo(e,i),s.set(n)},RegularPolygon:function(){for(var e=c.readNamed(arguments,"center"),i=r.readNamed(arguments,"sides"),n=r.readNamed(arguments,"radius"),s=360/i,a=i%3==0,o=new c(0,a?-n:n),h=a?-1:.5,u=new Array(i),l=0;l<i;l++)u[l]=new T(e.add(o.rotate((l+h)*s)));return t(u,!0,arguments)},Star:function(){for(var e=c.readNamed(arguments,"center"),i=2*r.readNamed(arguments,"points"),n=r.readNamed(arguments,"radius1"),s=r.readNamed(arguments,"radius2"),a=360/i,o=new c(0,-1),h=new Array(i),u=0;u<i;u++)h[u]=new T(e.add(o.rotate(a*u).multiply(u%2?s:n)));return t(h,!0,arguments)}}}});var N=A.extend({_class:"CompoundPath",_serializeFields:{children:[]},beans:!0,initialize:function(t){this._children=[],this._namedChildren={},this._initialize(t)||("string"==typeof t?this.setPathData(t):this.addChildren(Array.isArray(t)?t:arguments))},insertChildren:function t(e,i){var n=i,s=n[0];s&&"number"==typeof s[0]&&(n=[n]);for(var a=i.length-1;a>=0;a--){var o=n[a];n!==i||o instanceof L||(n=r.slice(n)),Array.isArray(o)?n[a]=new L({segments:o,insert:!1}):o instanceof N&&(n.splice.apply(n,[a,1].concat(o.removeChildren())),o.remove())}return t.base.call(this,e,n)},reduce:function t(e){for(var i=this._children,n=i.length-1;n>=0;n--)(r=i[n].reduce(e)).isEmpty()&&r.remove();if(!i.length){var r=new L(w.NO_INSERT);return r.copyAttributes(this),r.insertAbove(this),this.remove(),r}return t.base.call(this)},isClosed:function(){for(var t=this._children,e=0,i=t.length;e<i;e++)if(!t[e]._closed)return!1;return!0},setClosed:function(t){for(var e=this._children,i=0,n=e.length;i<n;i++)e[i].setClosed(t)},getFirstSegment:function(){var t=this.getFirstChild();return t&&t.getFirstSegment()},getLastSegment:function(){var t=this.getLastChild();return t&&t.getLastSegment()},getCurves:function(){for(var t=this._children,e=[],i=0,n=t.length;i<n;i++)e.push.apply(e,t[i].getCurves());return e},getFirstCurve:function(){var t=this.getFirstChild();return t&&t.getFirstCurve()},getLastCurve:function(){var t=this.getLastChild();return t&&t.getLastCurve()},getArea:function(){for(var t=this._children,e=0,i=0,n=t.length;i<n;i++)e+=t[i].getArea();return e},getLength:function(){for(var t=this._children,e=0,i=0,n=t.length;i<n;i++)e+=t[i].getLength();return e},getPathData:function(t,e){for(var i=this._children,n=[],r=0,s=i.length;r<s;r++){var a=i[r],o=a._matrix;n.push(a.getPathData(t&&!o.isIdentity()?t.appended(o):t,e))}return n.join("")},_hitTestChildren:function t(e,i,n){return t.base.call(this,e,i.class===L||"path"===i.type?i:r.set({},i,{fill:!1}),n)},_draw:function(t,e,i,n){var r=this._children;if(r.length){e=e.extend({dontStart:!0,dontFinish:!0}),t.beginPath();for(var s=0,a=r.length;s<a;s++)r[s].draw(t,e,n);if(!e.clip){this._setStyles(t,e,i);var o=this._style;o.hasFill()&&(t.fill(o.getFillRule()),t.shadowColor="rgba(0,0,0,0)"),o.hasStroke()&&t.stroke()}}},_drawSelected:function(t,e,i){for(var n=this._children,r=0,s=n.length;r<s;r++){var a=n[r],o=a._matrix;i[a._id]||a._drawSelected(t,o.isIdentity()?e:e.appended(o))}}},new function(){function t(t,e){var i=t._children;if(e&&!i.length)throw new Error("Use a moveTo() command first");return i[i.length-1]}return r.each(["lineTo","cubicCurveTo","quadraticCurveTo","curveTo","arcTo","lineBy","cubicCurveBy","quadraticCurveBy","curveBy","arcBy"],function(e){this[e]=function(){var i=t(this,!0);i[e].apply(i,arguments)}},{moveTo:function(){var e=t(this),i=e&&e.isEmpty()?e:new L(w.NO_INSERT);i!==e&&this.addChild(i),i.moveTo.apply(i,arguments)},moveBy:function(){var e=t(this,!0),i=e&&e.getLastSegment(),n=c.read(arguments);this.moveTo(i?n.add(i._point):n)},closePath:function(e){t(this,!0).closePath(e)}})},r.each(["reverse","flatten","simplify","smooth"],function(t){this[t]=function(e){for(var i,n=this._children,r=0,s=n.length;r<s;r++)i=n[r][t](e)||i;return i}},{}));A.inject(new function(){function t(t,e){var i=t.clone(!1).reduce({simplify:!0}).transform(null,!0,!0);return e?i.resolveCrossings().reorient("nonzero"===i.getFillRule(),!0):i}function i(t,e,i,n,r){var s=new N(w.NO_INSERT);return s.addChildren(t,!0),s=s.reduce({simplify:e}),r&&0==r.insert||s.insertAbove(n&&i.isSibling(n)&&i.getIndex()<n.getIndex()?n:i),s.copyAttributes(i,!0),s}function n(e,n,r,a){function o(t){for(var e=0,i=t.length;e<i;e++){var n=t[e];w.push.apply(w,n._segments),x.push.apply(x,n.getCurves()),n._overlapsOnly=!0}}if(a&&(0==a.trace||a.stroke)&&/^(subtract|intersect)$/.test(r))return s(e,n,r);var u=t(e,!0),c=n&&e!==n&&t(n,!0),_=p[r];_[r]=!0,c&&(_.subtract||_.exclude)^c.isClockwise()^u.isClockwise()&&c.reverse();var g,v=l(O.expand(u.getCrossings(c))),m=u._children||[u],y=c&&(c._children||[c]),w=[],x=[];if(v.length){o(m),y&&o(y);for(var b=0,C=v.length;b<C;b++)f(v[b]._segment,u,c,x,_);for(var b=0,C=w.length;b<C;b++){var S=w[b],P=S._intersection;S._winding||f(S,u,c,x,_),P&&P._overlap||(S._path._overlapsOnly=!1)}g=d(w,_)}else g=h(y?m.concat(y):m.slice(),function(t){return!!_[t]});return i(g,!0,e,n,a)}function s(e,n,r){function s(t){if(!c[t._id]&&(l||o.contains(t.getPointAt(t.getLength()/2))^u))return f.unshift(t),c[t._id]=!0}for(var a=t(e),o=t(n),h=a.getCrossings(o),u="subtract"===r,l="divide"===r,c={},f=[],d=h.length-1;d>=0;d--){var _=h[d].split();_&&(s(_)&&_.getFirstSegment().setHandleIn(0,0),a.getLastSegment().setHandleOut(0,0))}return s(a),i(f,!1,e,n)}function a(t,e){for(var i=t;i;){if(i===e)return;i=i._previous}for(;t._next&&t._next!==e;)t=t._next;if(!t._next){for(;e._previous;)e=e._previous;t._next=e,e._previous=t}}function o(t){for(var e=t.length-1;e>=0;e--)t[e].clearHandles()}function h(t,e,i){var n=t&&t.length;if(n){var s=r.each(t,function(t,e){this[t._id]={container:null,winding:t.isClockwise()?1:-1,index:e}},{}),a=t.slice().sort(function(t,e){return v(e.getArea())-v(t.getArea())}),o=a[0];null==i&&(i=o.isClockwise());for(var h=0;h<n;h++){for(var u=a[h],l=s[u._id],c=u.getInteriorPoint(),f=0,d=h-1;d>=0;d--){var _=a[d];if(_.contains(c)){var g=s[_._id];f=g.winding,l.winding+=f,l.container=g.exclude?g.container:_;break}}if(e(l.winding)===e(f))l.exclude=!0,t[l.index]=null;else{var p=l.container;u.setClockwise(p?!p.isClockwise():i)}}}return t}function l(t,e,i){function n(t){return t._path._id+"."+t._segment1._index}for(var r,s,h,u=e&&[],l=!1,c=i||[],f=i&&{},d=(i&&i.length)-1;d>=0;d--)(y=i[d])._path&&(f[n(y)]=!0);for(d=t.length-1;d>=0;d--){var _,g=t[d],v=g._time,p=v,m=e&&!e(g),y=g._curve;if(y&&(y!==s?(l=!y.hasHandles()||f&&f[n(y)],r=[],h=null,s=y):h>=1e-8&&(v/=h)),m)r&&r.push(g);else{if(e&&u.unshift(g),h=p,v<1e-8)_=y._segment1;else if(v>1-1e-8)_=y._segment2;else{var w=y.divideAtTime(v,!0);l&&c.push(y,w),_=w._segment1;for(var x=r.length-1;x>=0;x--){var b=r[x];b._time=(b._time-v)/(1-v)}}g._setSegment(_);var C=_._intersection,S=g._intersection;if(C){a(C,S);for(var P=C;P;)a(P._intersection,C),P=P._next}else _._intersection=S}}return i||o(c),u||t}function c(t,e,i,n,r){function s(s){var a=s[l+0],h=s[l+6];if(!(p<_(a,h)||p>g(a,h))){var f=s[u+0],v=s[u+2],x=s[u+4],b=s[u+6];if(a!==h){var I=p===a?0:p===h?1:y>g(f,v,x,b)||w<_(f,v,x,b)?1:k.solveCubic(s,l,p,T,0,1)>0?T[0]:1,z=0===I?f:1===I?b:k.getPoint(s,I)[i?"y":"x"],O=a>h?1:-1,A=o[l]>o[l+6]?1:-1,L=o[u+6];return p!==a?(z<y?C+=O:z>w?S+=O:P=!0,z>d-m&&z<d+m&&(M/=2)):(O!==A?f<y?C+=O:f>w&&(S+=O):f!=L&&(L<w&&z>w?(S+=O,P=!0):L>y&&z<y&&(C+=O,P=!0)),M=0),o=s,!r&&z>y&&z<w&&0===k.getTangent(s,I)[i?"x":"y"]&&c(t,e,!i,n,!0)}(f<w&&b>y||b<w&&f>y)&&(P=!0)}}function a(t){var e=t[l+0],n=t[l+2],r=t[l+4],a=t[l+6];if(p<=g(e,n,r,a)&&p>=_(e,n,r,a))for(var o,h=t[u+0],c=t[u+2],f=t[u+4],d=t[u+6],v=y>g(h,c,f,d)||w<_(h,c,f,d)?[t]:k.getMonoCurves(t,i),m=0,x=v.length;m<x;m++)if(o=s(v[m]))return o}for(var o,h,u=i?1:0,l=1^u,f=[t.x,t.y],d=f[u],p=f[l],m=1e-6,y=d-1e-9,w=d+1e-9,x=0,b=0,C=0,S=0,P=!1,I=!1,M=1,T=[],z=0,O=e.length;z<O;z++){var A,L=e[z],N=L._path,B=L.getValues();if(!(z&&e[z-1]._path===N||(o=null,N._closed||(h=k.getValues(N.getLastCurve().getSegment2(),L.getSegment1(),null,!n))[l]!==h[l+6]&&(o=h),o))){o=B;for(var D=N.getLastCurve();D&&D!==L;){var j=D.getValues();if(j[l]!==j[l+6]){o=j;break}D=D.getPrevious()}}if(A=a(B))return A;if(z+1===O||e[z+1]._path!==N){if(h&&(A=a(h)))return A;!P||C||S||(C=S=N.isClockwise(n)^i?1:-1),x+=C,b+=S,C=S=0,P&&(I=!0,P=!1),h=null}}return x=v(x),b=v(b),{winding:g(x,b),windingL:x,windingR:b,quality:M,onPath:I}}function f(t,e,i,n,r){var s=[],a=t,o=0;do{d=(y=t.getCurve()).getLength();s.push({segment:t,curve:y,length:d}),o+=d,t=t.getNext()}while(t&&!t._intersection&&t!==a);for(var h=[.5,.25,.75],l={winding:0,quality:-1},f=0;f<h.length&&l.quality<.5;f++)for(var d=o*h[f],_=0,g=s.length;_<g;_++){var p=s[_],m=p.length;if(d<=m){var y=p.curve,w=y._path,x=w._parent,b=x instanceof N?x:w,C=u.clamp(y.getTimeAt(d),1e-8,1-1e-8),S=y.getPointAtTime(C),P=v(y.getTangentAtTime(C).y)<Math.SQRT1_2,I=r.subtract&&i&&(b===e&&i._getWinding(S,P,!0).winding||b===i&&!e._getWinding(S,P,!0).winding)?{winding:0,quality:1}:c(S,n,P,!0);I.quality>l.quality&&(l=I);break}d-=m}for(_=s.length-1;_>=0;_--)s[_].segment._winding=l}function d(t,e){function i(t){var i;return!(!t||t._visited||e&&(!e[(i=t._winding||{}).winding]||e.unite&&2===i.winding&&i.windingL&&i.windingR))}function n(t){if(t)for(var e=0,i=s.length;e<i;e++)if(t===s[e])return!0;return!1}function r(t){for(var e=t._segments,i=0,n=e.length;i<n;i++)e[i]._visited=!0}var s,a=[];t.sort(function(t,e){var i=t._intersection,n=e._intersection,r=!(!i||!i._overlap),s=!(!n||!n._overlap),a=t._path,o=e._path;return r^s?r?1:-1:!i^!n?i?1:-1:a!==o?a._id-o._id:t._index-e._index});for(var o=0,h=t.length;o<h;o++){var u,l,c,f=t[o],d=i(f),_=null,g=!1,v=!0,p=[];if(d&&f._path._overlapsOnly){var m=f._path,y=f._intersection._segment._path;m.compare(y)&&(m.getArea()&&a.push(m.clone(!1)),r(m),r(y),d=!1)}for(;d;){var x=!_,b=function(t,e){function r(r,a){for(;r&&r!==a;){var o=r._segment,u=o&&o._path;if(u){var l=o.getNext()||u.getFirstSegment(),c=l._intersection;o!==t&&(n(o)||n(l)||l&&i(o)&&(i(l)||c&&i(c._segment)))&&h.push(o),e&&s.push(o)}r=r._next}}var a=t._intersection,o=a,h=[];if(e&&(s=[t]),a){for(r(a);a&&a._prev;)a=a._prev;r(a,o)}return h}(f,x),C=b.shift(),S=!(g=!x&&(n(f)||n(C)))&&C;if(x&&(_=new L(w.NO_INSERT),u=null),g){(f.isFirst()||f.isLast())&&(v=f._path._closed),f._visited=!0;break}if(S&&u&&(p.push(u),u=null),u||(S&&b.push(f),u={start:_._segments.length,crossings:b,visited:l=[],handleIn:c}),S&&(f=C),!i(f)){_.removeSegments(u.start);for(var P=0,I=l.length;P<I;P++)l[P]._visited=!1;l.length=0;do{(f=u&&u.crossings.shift())&&f._path||(f=null,(u=p.pop())&&(l=u.visited,c=u.handleIn))}while(u&&!i(f));if(!f)break}var M=f.getNext();_.add(new T(f._point,c,M&&f._handleOut)),f._visited=!0,l.push(f),f=M||f._path.getFirstSegment(),c=M&&M._handleIn}g&&(v&&(_.getFirstSegment().setHandleIn(c),_.setClosed(v)),0!==_.getArea()&&a.push(_))}return a}var _=Math.min,g=Math.max,v=Math.abs,p={unite:{1:!0,2:!0},intersect:{2:!0},subtract:{1:!0},exclude:{1:!0,"-1":!0}};return{_getWinding:function(t,e,i){return c(t,this.getCurves(),e,i)},unite:function(t,e){return n(this,t,"unite",e)},intersect:function(t,e){return n(this,t,"intersect",e)},subtract:function(t,e){return n(this,t,"subtract",e)},exclude:function(t,e){return n(this,t,"exclude",e)},divide:function(t,e){return e&&(0==e.trace||e.stroke)?s(this,t,"divide"):i([this.subtract(t,e),this.intersect(t,e)],!0,this,t,e)},resolveCrossings:function(){function t(t,e){var i=t&&t._intersection;return i&&i._overlap&&i._path===e}var e=this._children,i=e||[this],n=!1,s=!1,a=this.getIntersections(null,function(t){return t.hasOverlap()&&(n=!0)||t.isCrossing()&&(s=!0)}),h=n&&s&&[];if(a=O.expand(a),n)for(var u=l(a,function(t){return t.hasOverlap()},h),c=u.length-1;c>=0;c--){var f=u[c],_=f._path,g=f._segment,v=g.getPrevious(),p=g.getNext();t(v,_)&&t(p,_)&&(g.remove(),v._handleOut._set(0,0),p._handleIn._set(0,0),v===g||v.getCurve().hasLength()||(p._handleIn.set(v._handleIn),v.remove()))}s&&(l(a,n&&function(t){var e=t.getCurve(),i=t.getSegment(),n=t._intersection,r=n._curve,s=n._segment;if(e&&r&&e._path&&r._path)return!0;i&&(i._intersection=null),s&&(s._intersection=null)},h),h&&o(h),i=d(r.each(i,function(t){this.push.apply(this,t._segments)},[])));var m,y=i.length;return y>1&&e?(i!==e&&this.setChildren(i),m=this):1!==y||e||(i[0]!==this&&this.setSegments(i[0].removeSegments()),m=this),m||((m=new N(w.NO_INSERT)).addChildren(i),(m=m.reduce()).copyAttributes(this),this.replaceWith(m)),m},reorient:function(t,i){var n=this._children;return n&&n.length?this.setChildren(h(this.removeChildren(),function(e){return!!(t?e:1&e)},i)):i!==e&&this.setClockwise(i),this},getInteriorPoint:function(){var t=this.getBounds().getCenter(!0);if(!this.contains(t)){for(var e=this.getCurves(),i=t.y,n=[],r=[],s=0,a=e.length;s<a;s++){var o=e[s].getValues(),h=o[1],u=o[3],l=o[5],c=o[7];if(i>=_(h,u,l,c)&&i<=g(h,u,l,c))for(var f=k.getMonoCurves(o),d=0,v=f.length;d<v;d++){var p=f[d],m=p[1],y=p[7];if(m!==y&&(i>=m&&i<=y||i>=y&&i<=m)){var w=i===m?p[0]:i===y?p[6]:1===k.solveCubic(p,1,i,r,0,1)?k.getPoint(p,r[0]).x:(p[0]+p[6])/2;n.push(w)}}}n.length>1&&(n.sort(function(t,e){return t-e}),t.x=(n[0]+n[1])/2)}return t}}});var B=r.extend({_class:"PathFlattener",initialize:function(t,e,i,n,r){function s(t,e){var i=k.getValues(t,e,r);h.push(i),a(i,t._index,0,1)}function a(t,i,r,s){if(!(s-r>c)||n&&k.isStraight(t)||k.isFlatEnough(t,e||.25)){var o=t[6]-t[0],h=t[7]-t[1],f=Math.sqrt(o*o+h*h);f>0&&(l+=f,u.push({offset:l,curve:t,index:i,time:s}))}else{var d=k.subdivide(t,.5),_=(r+s)/2;a(d[0],i,r,_),a(d[1],i,_,s)}}for(var o,h=[],u=[],l=0,c=1/(i||32),f=t._segments,d=f[0],_=1,g=f.length;_<g;_++)s(d,o=f[_]),d=o;t._closed&&s(o,f[0]),this.curves=h,this.parts=u,this.length=l,this.index=0},_get:function(t){for(var e,i=this.parts,n=i.length,r=this.index;e=r,r&&!(i[--r].offset<t););for(;e<n;e++){var s=i[e];if(s.offset>=t){this.index=e;var a=i[e-1],o=a&&a.index===s.index?a.time:0,h=a?a.offset:0;return{index:s.index,time:o+(s.time-o)*(t-h)/(s.offset-h)}}}return{index:i[n-1].index,time:1}},drawPart:function(t,e,i){for(var n=this._get(e),r=this._get(i),s=n.index,a=r.index;s<=a;s++){var o=k.getPart(this.curves[s],s===n.index?n.time:0,s===r.index?r.time:1);s===n.index&&t.moveTo(o[0],o[1]),t.bezierCurveTo.apply(t,o.slice(2))}}},r.each(k._evaluateMethods,function(t){this[t+"At"]=function(e){var i=this._get(e);return k[t](this.curves[i.index],i.time)}},{})),D=r.extend({initialize:function(t){for(var e,i=this.points=[],n=t._segments,r=t._closed,s=0,a=n.length;s<a;s++){var o=n[s].point;e&&e.equals(o)||i.push(e=o.clone())}r&&(i.unshift(i[i.length-1]),i.push(i[1])),this.closed=r},fit:function(t){var e=this.points,i=e.length,n=null;return i>0&&(n=[new T(e[0])],i>1&&(this.fitCubic(n,t,0,i-1,e[1].subtract(e[0]),e[i-2].subtract(e[i-1])),this.closed&&(n.shift(),n.pop()))),n},fitCubic:function(t,e,i,n,r,s){var a=this.points;if(n-i!=1){for(var o,h=this.chordLengthParameterize(i,n),u=Math.max(e,e*e),l=!0,c=0;c<=4;c++){var f=this.generateBezier(i,n,h,r,s),d=this.findMaxError(i,n,f,h);if(d.error<e&&l)return void this.addCurve(t,f);if(o=d.index,d.error>=u)break;l=this.reparameterize(i,n,h,f),u=d.error}var _=a[o-1].subtract(a[o+1]);this.fitCubic(t,e,i,o,r,_),this.fitCubic(t,e,o,n,_.negate(),s)}else{var g=a[i],v=a[n],p=g.getDistance(v)/3;this.addCurve(t,[g,g.add(r.normalize(p)),v.add(s.normalize(p)),v])}},addCurve:function(t,e){t[t.length-1].setHandleOut(e[1].subtract(e[0])),t.push(new T(e[3],e[2].subtract(e[3])))},generateBezier:function(t,e,i,n,r){for(var s=Math.abs,a=this.points,o=a[t],h=a[e],u=[[0,0],[0,0]],l=[0,0],c=0,f=e-t+1;c<f;c++){var d=i[c],_=1-d,g=3*d*_,v=_*_*_,p=g*_,m=g*d,y=d*d*d,w=n.normalize(p),x=r.normalize(m),b=a[t+c].subtract(o.multiply(v+p)).subtract(h.multiply(m+y));u[0][0]+=w.dot(w),u[0][1]+=w.dot(x),u[1][0]=u[0][1],u[1][1]+=x.dot(x),l[0]+=w.dot(b),l[1]+=x.dot(b)}var C,S,P=u[0][0]*u[1][1]-u[1][0]*u[0][1];if(s(P)>1e-12){var I=u[0][0]*l[1]-u[1][0]*l[0];C=(l[0]*u[1][1]-l[1]*u[0][1])/P,S=I/P}else{var M=u[0][0]+u[0][1],T=u[1][0]+u[1][1];C=S=s(M)>1e-12?l[0]/M:s(T)>1e-12?l[1]/T:0}var z,k,O=h.getDistance(o),A=1e-12*O;if(C<A||S<A)C=S=O/3;else{var L=h.subtract(o);z=n.normalize(C),k=r.normalize(S),z.dot(L)-k.dot(L)>O*O&&(C=S=O/3,z=k=null)}return[o,o.add(z||n.normalize(C)),h.add(k||r.normalize(S)),h]},reparameterize:function(t,e,i,n){for(r=t;r<=e;r++)i[r-t]=this.findRoot(n,this.points[r],i[r-t]);for(var r=1,s=i.length;r<s;r++)if(i[r]<=i[r-1])return!1;return!0},findRoot:function(t,e,i){for(var n=[],r=[],s=0;s<=2;s++)n[s]=t[s+1].subtract(t[s]).multiply(3);for(s=0;s<=1;s++)r[s]=n[s+1].subtract(n[s]).multiply(2);var a=this.evaluate(3,t,i),o=this.evaluate(2,n,i),h=this.evaluate(1,r,i),l=a.subtract(e),c=o.dot(o)+l.dot(h);return u.isZero(c)?i:i-l.dot(o)/c},evaluate:function(t,e,i){for(var n=e.slice(),r=1;r<=t;r++)for(var s=0;s<=t-r;s++)n[s]=n[s].multiply(1-i).add(n[s+1].multiply(i));return n[0]},chordLengthParameterize:function(t,e){for(var i=[0],n=t+1;n<=e;n++)i[n-t]=i[n-t-1]+this.points[n].getDistance(this.points[n-1]);for(var n=1,r=e-t;n<=r;n++)i[n]/=i[r];return i},findMaxError:function(t,e,i,n){for(var r=Math.floor((e-t+1)/2),s=0,a=t+1;a<e;a++){var o=this.evaluate(3,i,n[a-t]).subtract(this.points[a]),h=o.x*o.x+o.y*o.y;h>=s&&(s=h,r=a)}return{error:s,index:r}}}),j=w.extend({_class:"TextItem",_applyMatrix:!1,_canApplyMatrix:!1,_serializeFields:{content:null},_boundsOptions:{stroke:!1,handle:!1},initialize:function(t){this._content="",this._lines=[];var i=t&&r.isPlainObject(t)&&t.x===e&&t.y===e;this._initialize(i&&t,!i&&c.read(arguments))},_equals:function(t){return this._content===t._content},copyContent:function(t){this.setContent(t._content)},getContent:function(){return this._content},setContent:function(t){this._content=""+t,this._lines=this._content.split(/\r\n|\n|\r/gm),this._changed(265)},isEmpty:function(){return!this._content},getCharacterStyle:"#getStyle",setCharacterStyle:"#setStyle",getParagraphStyle:"#getStyle",setParagraphStyle:"#setStyle"}),E=j.extend({_class:"PointText",initialize:function(){j.apply(this,arguments)},getPoint:function(){var t=this._matrix.getTranslation();return new f(t.x,t.y,this,"setPoint")},setPoint:function(){var t=c.read(arguments);this.translate(t.subtract(this._matrix.getTranslation()))},_draw:function(t,e,i){if(this._content){this._setStyles(t,e,i);var n=this._lines,r=this._style,s=r.hasFill(),a=r.hasStroke(),o=r.getLeading(),h=t.shadowColor;t.font=r.getFontStyle(),t.textAlign=r.getJustification();for(var u=0,l=n.length;u<l;u++){t.shadowColor=h;var c=n[u];s&&(t.fillText(c,0,0),t.shadowColor="rgba(0,0,0,0)"),a&&t.strokeText(c,0,0),t.translate(0,o)}}},_getBounds:function(t,e){var i=this._style,n=this._lines,r=n.length,s=i.getJustification(),a=i.getLeading(),o=this.getView().getTextWidth(i.getFontStyle(),n),h=0;"left"!==s&&(h-=o/("center"===s?2:1));var u=new g(h,r?-.75*a:0,o,r*a);return t?t._transformBounds(u,u):u}}),F=r.extend(new function(){function t(t){var n,r=t.match(/^#(\w{1,2})(\w{1,2})(\w{1,2})$/);if(r){n=[0,0,0];for(s=0;s<3;s++){h=r[s+1];n[s]=parseInt(1==h.length?h+h:h,16)/255}}else if(r=t.match(/^rgba?\((.*)\)$/))for(var s=0,o=(n=r[1].split(",")).length;s<o;s++){var h=+n[s];n[s]=s<3?h/255:h}else if(i){var u=a[t];if(!u){e||((e=Q.getContext(1,1)).globalCompositeOperation="copy"),e.fillStyle="rgba(0,0,0,0)",e.fillStyle=t,e.fillRect(0,0,1,1);var l=e.getImageData(0,0,1,1).data;u=a[t]=[l[0]/255,l[1]/255,l[2]/255]}n=u.slice()}else n=[0,0,0];return n}var e,n={gray:["gray"],rgb:["red","green","blue"],hsb:["hue","saturation","brightness"],hsl:["hue","saturation","lightness"],gradient:["gradient","origin","destination","highlight"]},s={},a={},o=[[0,3,1],[2,0,1],[1,0,3],[1,2,0],[3,1,0],[0,1,2]],u={"rgb-hsb":function(t,e,i){var n=Math.max(t,e,i),r=n-Math.min(t,e,i);return[0===r?0:60*(n==t?(e-i)/r+(e<i?6:0):n==e?(i-t)/r+2:(t-e)/r+4),0===n?0:r/n,n]},"hsb-rgb":function(t,e,i){t=(t/60%6+6)%6;var n=Math.floor(t),r=t-n,s=[i,i*(1-e),i*(1-e*r),i*(1-e*(1-r))];return[s[(n=o[n])[0]],s[n[1]],s[n[2]]]},"rgb-hsl":function(t,e,i){var n=Math.max(t,e,i),r=Math.min(t,e,i),s=n-r,a=0===s,o=(n+r)/2;return[a?0:60*(n==t?(e-i)/s+(e<i?6:0):n==e?(i-t)/s+2:(t-e)/s+4),a?0:o<.5?s/(n+r):s/(2-n-r),o]},"hsl-rgb":function(t,e,i){if(t=(t/360%1+1)%1,0===e)return[i,i,i];for(var n=[t+1/3,t,t-1/3],r=i<.5?i*(1+e):i+e-i*e,s=2*i-r,a=[],o=0;o<3;o++){var h=n[o];h<0&&(h+=1),h>1&&(h-=1),a[o]=6*h<1?s+6*(r-s)*h:2*h<1?r:3*h<2?s+(r-s)*(2/3-h)*6:s}return a},"rgb-gray":function(t,e,i){return[.2989*t+.587*e+.114*i]},"gray-rgb":function(t){return[t,t,t]},"gray-hsb":function(t){return[0,0,t]},"gray-hsl":function(t){return[0,0,t]},"gradient-rgb":function(){return[]},"rgb-gradient":function(){return[]}};return r.each(n,function(t,e){s[e]=[],r.each(t,function(t,i){var a=r.capitalize(t),o=/^(hue|saturation)$/.test(t),h=s[e][i]="gradient"===t?function(t){var e=this._components[0];return t=R.read(Array.isArray(t)?t:arguments,0,{readNull:!0}),e!==t&&(e&&e._removeOwner(this),t&&t._addOwner(this)),t}:"gradient"===e?function(){return c.read(arguments,0,{readNull:"highlight"===t,clone:!0})}:function(t){return null==t||isNaN(t)?0:t};this["get"+a]=function(){return this._type===e||o&&/^hs[bl]$/.test(this._type)?this._components[i]:this._convert(e)[i]},this["set"+a]=function(t){this._type===e||o&&/^hs[bl]$/.test(this._type)||(this._components=this._convert(e),this._properties=n[e],this._type=e),this._components[i]=h.call(this,t),this._changed()}},this)},{_class:"Color",_readIndex:!0,initialize:function e(i){var a,o,h,u,l=arguments,c=this.__read,f=0;Array.isArray(i)&&(i=(l=i)[0]);var d=null!=i&&typeof i;if("string"===d&&i in n&&(a=i,i=l[1],Array.isArray(i)?(o=i,h=l[2]):(c&&(f=1),l=r.slice(l,1),d=typeof i)),!o){if(u="number"===d?l:"object"===d&&null!=i.length?i:null){a||(a=u.length>=3?"rgb":"gray");var _=n[a].length;h=u[_],c&&(f+=u===arguments?_+(null!=h?1:0):1),u.length>_&&(u=r.slice(u,0,_))}else if("string"===d)a="rgb",4===(o=t(i)).length&&(h=o[3],o.length--);else if("object"===d)if(i.constructor===e){if(a=i._type,o=i._components.slice(),h=i._alpha,"gradient"===a)for(var g=1,v=o.length;g<v;g++){var p=o[g];p&&(o[g]=p.clone())}}else if(i.constructor===R)a="gradient",u=l;else{var m=n[a="hue"in i?"lightness"in i?"hsl":"hsb":"gradient"in i||"stops"in i||"radial"in i?"gradient":"gray"in i?"gray":"rgb"],y=s[a];this._components=o=[];for(var g=0,v=m.length;g<v;g++)null==(w=i[m[g]])&&!g&&"gradient"===a&&"stops"in i&&(w={stops:i.stops,radial:i.radial}),null!=(w=y[g].call(this,w))&&(o[g]=w);h=i.alpha}c&&a&&(f=1)}if(this._type=a||"rgb",!o){this._components=o=[];for(var g=0,v=(y=s[this._type]).length;g<v;g++){var w=y[g].call(this,u&&u[g]);null!=w&&(o[g]=w)}}return this._components=o,this._properties=n[this._type],this._alpha=h,c&&(this.__read=f),this},set:"#initialize",_serialize:function(t,e){var i=this.getComponents();return r.serialize(/^(gray|rgb)$/.test(this._type)?i:[this._type].concat(i),t,!0,e)},_changed:function(){this._canvasStyle=null,this._owner&&this._owner._changed(65)},_convert:function(t){var e;return this._type===t?this._components.slice():(e=u[this._type+"-"+t])?e.apply(this,this._components):u["rgb-"+t].apply(this,u[this._type+"-rgb"].apply(this,this._components))},convert:function(t){return new F(t,this._convert(t),this._alpha)},getType:function(){return this._type},setType:function(t){this._components=this._convert(t),this._properties=n[t],this._type=t},getComponents:function(){var t=this._components.slice();return null!=this._alpha&&t.push(this._alpha),t},getAlpha:function(){return null!=this._alpha?this._alpha:1},setAlpha:function(t){this._alpha=null==t?null:Math.min(Math.max(t,0),1),this._changed()},hasAlpha:function(){return null!=this._alpha},equals:function(t){var e=r.isPlainValue(t,!0)?F.read(arguments):t;return e===this||e&&this._class===e._class&&this._type===e._type&&this.getAlpha()===e.getAlpha()&&r.equals(this._components,e._components)||!1},toString:function(){for(var t=this._properties,e=[],i="gradient"===this._type,n=h.instance,r=0,s=t.length;r<s;r++){var a=this._components[r];null!=a&&e.push(t[r]+": "+(i?a:n.number(a)))}return null!=this._alpha&&e.push("alpha: "+n.number(this._alpha)),"{ "+e.join(", ")+" }"},toCSS:function(t){function e(t){return Math.round(255*(t<0?0:t>1?1:t))}var i=this._convert("rgb"),n=t||null==this._alpha?1:this._alpha;return i=[e(i[0]),e(i[1]),e(i[2])],n<1&&i.push(n<0?0:n),t?"#"+((1<<24)+(i[0]<<16)+(i[1]<<8)+i[2]).toString(16).slice(1):(4==i.length?"rgba(":"rgb(")+i.join(",")+")"},toCanvasStyle:function(t,e){if(this._canvasStyle)return this._canvasStyle;if("gradient"!==this._type)return this._canvasStyle=this.toCSS();var i,n=this._components,r=n[0],s=r._stops,a=n[1],o=n[2],h=n[3],u=e&&e.inverted();if(u&&(a=u._transformPoint(a),o=u._transformPoint(o),h&&(h=u._transformPoint(h))),r._radial){var l=o.getDistance(a);if(h){var c=h.subtract(a);c.getLength()>l&&(h=a.add(c.normalize(l-.1)))}var f=h||a;i=t.createRadialGradient(f.x,f.y,0,a.x,a.y,l)}else i=t.createLinearGradient(a.x,a.y,o.x,o.y);for(var d=0,_=s.length;d<_;d++){var g=s[d],v=g._offset;i.addColorStop(null==v?d/(_-1):v,g._color.toCanvasStyle())}return this._canvasStyle=i},transform:function(t){if("gradient"===this._type){for(var e=this._components,i=1,n=e.length;i<n;i++){var r=e[i];t._transformPoint(r,r,!0)}this._changed()}},statics:{_types:n,random:function(){var t=Math.random;return new F(t(),t(),t())}}})},new function(){var t={add:function(t,e){return t+e},subtract:function(t,e){return t-e},multiply:function(t,e){return t*e},divide:function(t,e){return t/e}};return r.each(t,function(t,e){this[e]=function(e){e=F.read(arguments);for(var i=this._type,n=this._components,r=e._convert(i),s=0,a=n.length;s<a;s++)r[s]=t(n[s],r[s]);return new F(i,r,null!=this._alpha?t(this._alpha,e.getAlpha()):null)}},{})}),R=r.extend({_class:"Gradient",initialize:function(t,e){this._id=l.get(),t&&r.isPlainObject(t)&&(this.set(t),t=e=null),null==this._stops&&this.setStops(t||["white","black"]),null==this._radial&&this.setRadial("string"==typeof e&&"radial"===e||e||!1)},_serialize:function(t,e){return e.add(this,function(){return r.serialize([this._stops,this._radial],t,!0,e)})},_changed:function(){for(var t=0,e=this._owners&&this._owners.length;t<e;t++)this._owners[t]._changed()},_addOwner:function(t){this._owners||(this._owners=[]),this._owners.push(t)},_removeOwner:function(t){var i=this._owners?this._owners.indexOf(t):-1;-1!=i&&(this._owners.splice(i,1),this._owners.length||(this._owners=e))},clone:function(){for(var t=[],e=0,i=this._stops.length;e<i;e++)t[e]=this._stops[e].clone();return new R(t,this._radial)},getStops:function(){return this._stops},setStops:function(t){if(t.length<2)throw new Error("Gradient stop list needs to contain at least two stops.");var i=this._stops;if(i)for(var n=0,r=i.length;n<r;n++)i[n]._owner=e;for(var n=0,r=(i=this._stops=q.readList(t,0,{clone:!0})).length;n<r;n++)i[n]._owner=this;this._changed()},getRadial:function(){return this._radial},setRadial:function(t){this._radial=t,this._changed()},equals:function(t){if(t===this)return!0;if(t&&this._class===t._class){var e=this._stops,i=t._stops,n=e.length;if(n===i.length){for(var r=0;r<n;r++)if(!e[r].equals(i[r]))return!1;return!0}}return!1}}),q=r.extend({_class:"GradientStop",initialize:function(t,i){var n=t,r=i;"object"==typeof t&&i===e&&(Array.isArray(t)&&"number"!=typeof t[0]?(n=t[0],r=t[1]):("color"in t||"offset"in t||"rampPoint"in t)&&(n=t.color,r=t.offset||t.rampPoint||0)),this.setColor(n),this.setOffset(r)},clone:function(){return new q(this._color.clone(),this._offset)},_serialize:function(t,e){var i=this._color,n=this._offset;return r.serialize(null==n?[i]:[i,n],t,!0,e)},_changed:function(){this._owner&&this._owner._changed(65)},getOffset:function(){return this._offset},setOffset:function(t){this._offset=t,this._changed()},getRampPoint:"#getOffset",setRampPoint:"#setOffset",getColor:function(){return this._color},setColor:function(){var t=F.read(arguments,0,{clone:!0});t&&(t._owner=this),this._color=t,this._changed()},equals:function(t){return t===this||t&&this._class===t._class&&this._color.equals(t._color)&&this._offset==t._offset||!1}}),V=r.extend(new function(){var t={fillColor:null,fillRule:"nonzero",strokeColor:null,strokeWidth:1,strokeCap:"butt",strokeJoin:"miter",strokeScaling:!0,miterLimit:10,dashOffset:0,dashArray:[],shadowColor:null,shadowBlur:0,shadowOffset:new c,selectedColor:null},i=r.set({},t,{fontFamily:"sans-serif",fontWeight:"normal",fontSize:12,leading:null,justification:"left"}),n=r.set({},i,{fillColor:new F}),s={strokeWidth:97,strokeCap:97,strokeJoin:97,strokeScaling:105,miterLimit:97,fontFamily:9,fontWeight:9,fontSize:9,font:9,leading:9,justification:9},a={beans:!0},o={_class:"Style",beans:!0,initialize:function(e,r,s){this._values={},this._owner=r,this._project=r&&r._project||s||paper.project,this._defaults=!r||r instanceof x?i:r instanceof j?n:t,e&&this.set(e)}};return r.each(i,function(t,i){var n=/Color$/.test(i),h="shadowOffset"===i,u=r.capitalize(i),l=s[i],f="set"+u,d="get"+u;o[f]=function(t){var r=this._owner,s=r&&r._children;if(s&&s.length>0&&!(r instanceof N))for(var a=0,o=s.length;a<o;a++)s[a]._style[f](t);else if(i in this._defaults){var h=this._values[i];h!==t&&(n&&(h&&h._owner!==e&&(h._owner=e),t&&t.constructor===F&&(t._owner&&(t=t.clone()),t._owner=r)),this._values[i]=t,r&&r._changed(l||65))}},o[d]=function(t){var s,a=this._owner,o=a&&a._children;if(i in this._defaults&&(!o||!o.length||t||a instanceof N))if((s=this._values[i])===e)(s=this._defaults[i])&&s.clone&&(s=s.clone());else{var u=n?F:h?c:null;!u||s&&s.constructor===u||(this._values[i]=s=u.read([s],0,{readNull:!0,clone:!0}),s&&n&&(s._owner=a))}else if(o)for(var l=0,f=o.length;l<f;l++){var _=o[l]._style[d]();if(l){if(!r.equals(s,_))return e}else s=_}return s},a[d]=function(t){return this._style[d](t)},a[f]=function(t){this._style[f](t)}}),r.each({Font:"FontFamily",WindingRule:"FillRule"},function(t,e){var i="get"+e,n="set"+e;o[i]=a[i]="#get"+t,o[n]=a[n]="#set"+t}),w.inject(a),o},{set:function(t){var e=t instanceof V,i=e?t._values:t;if(i)for(var n in i)if(n in this._defaults){var r=i[n];this[n]=r&&e&&r.clone?r.clone():r}},equals:function(t){function i(t,i,n){var s=t._values,a=i._values,o=i._defaults;for(var h in s){var u=s[h],l=a[h];if(!(n&&h in a||r.equals(u,l===e?o[h]:l)))return!1}return!0}return t===this||t&&this._class===t._class&&i(this,t)&&i(t,this,!0)||!1},hasFill:function(){var t=this.getFillColor();return!!t&&t.alpha>0},hasStroke:function(){var t=this.getStrokeColor();return!!t&&t.alpha>0&&this.getStrokeWidth()>0},hasShadow:function(){var t=this.getShadowColor();return!!t&&t.alpha>0&&(this.getShadowBlur()>0||!this.getShadowOffset().isZero())},getView:function(){return this._project._view},getFontStyle:function(){var t=this.getFontSize();return this.getFontWeight()+" "+t+(/[a-z]/i.test(t+"")?" ":"px ")+this.getFontFamily()},getFont:"#getFontFamily",setFont:"#setFontFamily",getLeading:function t(){var e=t.base.call(this),i=this.getFontSize();return/pt|em|%|px/.test(i)&&(i=this.getView().getPixelSize(i)),null!=e?e:1.2*i}}),H=new function(){function t(t,e,i,n){for(var r=["","webkit","moz","Moz","ms","o"],s=e[0].toUpperCase()+e.substring(1),a=0;a<6;a++){var o=r[a],h=o?o+s:e;if(h in t){if(!i)return t[h];t[h]=n;break}}}return{getStyles:function(t){var e=t&&9!==t.nodeType?t.ownerDocument:t,i=e&&e.defaultView;return i&&i.getComputedStyle(t,"")},getBounds:function(t,e){var i,n=t.ownerDocument,r=n.body,s=n.documentElement;try{i=t.getBoundingClientRect()}catch(t){i={left:0,top:0,width:0,height:0}}var a=i.left-(s.clientLeft||r.clientLeft||0),o=i.top-(s.clientTop||r.clientTop||0);if(!e){var h=n.defaultView;a+=h.pageXOffset||s.scrollLeft||r.scrollLeft,o+=h.pageYOffset||s.scrollTop||r.scrollTop}return new g(a,o,i.width,i.height)},getViewportBounds:function(t){var e=t.ownerDocument,i=e.defaultView,n=e.documentElement;return new g(0,0,i.innerWidth||n.clientWidth,i.innerHeight||n.clientHeight)},getOffset:function(t,e){return H.getBounds(t,e).getPoint()},getSize:function(t){return H.getBounds(t,!0).getSize()},isInvisible:function(t){return H.getSize(t).equals(new d(0,0))},isInView:function(t){return!H.isInvisible(t)&&H.getViewportBounds(t).intersects(H.getBounds(t,!0))},isInserted:function(t){return n.body.contains(t)},getPrefixed:function(e,i){return e&&t(e,i)},setPrefixed:function(e,i,n){if("object"==typeof i)for(var r in i)t(e,r,!0,i[r]);else t(e,i,!0,n)}}},Z={add:function(t,e){if(t)for(var i in e)for(var n=e[i],r=i.split(/[\s,]+/g),s=0,a=r.length;s<a;s++)t.addEventListener(r[s],n,!1)},remove:function(t,e){if(t)for(var i in e)for(var n=e[i],r=i.split(/[\s,]+/g),s=0,a=r.length;s<a;s++)t.removeEventListener(r[s],n,!1)},getPoint:function(t){var e=t.targetTouches?t.targetTouches.length?t.targetTouches[0]:t.changedTouches[0]:t;return new c(e.pageX||e.clientX+n.documentElement.scrollLeft,e.pageY||e.clientY+n.documentElement.scrollTop)},getTarget:function(t){return t.target||t.srcElement},getRelatedTarget:function(t){return t.relatedTarget||t.toElement},getOffset:function(t,e){return Z.getPoint(t).subtract(H.getOffset(e||Z.getTarget(t)))}};Z.requestAnimationFrame=new function(){function t(){var e=s;s=[];for(var i=0,a=e.length;i<a;i++)e[i]();(r=n&&s.length)&&n(t)}var e,n=H.getPrefixed(i,"requestAnimationFrame"),r=!1,s=[];return function(i){s.push(i),n?r||(n(t),r=!0):e||(e=setInterval(t,1e3/60))}};var U=r.extend(s,{_class:"View",initialize:function t(e,r){function s(t){return r[t]||parseInt(r.getAttribute(t),10)}function o(){var t=H.getSize(r);return t.isNaN()||t.isZero()?new d(s("width"),s("height")):t}var h;if(i&&r){this._id=r.getAttribute("id"),null==this._id&&r.setAttribute("id",this._id="view-"+t._id++),Z.add(r,this._viewEvents);if(H.setPrefixed(r.style,{userDrag:"none",userSelect:"none",touchCallout:"none",contentZooming:"none",tapHighlightColor:"rgba(0,0,0,0)"}),a.hasAttribute(r,"resize")){var u=this;Z.add(i,this._windowEvents={resize:function(){u.setViewSize(o())}})}if(h=o(),a.hasAttribute(r,"stats")&&"undefined"!=typeof Stats){this._stats=new Stats;var l=this._stats.domElement,c=l.style,f=H.getOffset(r);c.position="absolute",c.left=f.x+"px",c.top=f.y+"px",n.body.appendChild(l)}}else h=new d(r),r=null;this._project=e,this._scope=e._scope,this._element=r,this._pixelRatio||(this._pixelRatio=i&&i.devicePixelRatio||1),this._setElementSize(h.width,h.height),this._viewSize=h,t._views.push(this),t._viewsById[this._id]=this,(this._matrix=new p)._owner=this,t._focused||(t._focused=this),this._frameItems={},this._frameItemCount=0,this._itemEvents={native:{},virtual:{}},this._autoUpdate=!paper.agent.node,this._needsUpdate=!1},remove:function(){if(!this._project)return!1;U._focused===this&&(U._focused=null),U._views.splice(U._views.indexOf(this),1),delete U._viewsById[this._id];var t=this._project;return t._view===this&&(t._view=null),Z.remove(this._element,this._viewEvents),Z.remove(i,this._windowEvents),this._element=this._project=null,this.off("frame"),this._animate=!1,this._frameItems={},!0},_events:r.each(w._itemHandlers.concat(["onResize","onKeyDown","onKeyUp"]),function(t){this[t]={}},{onFrame:{install:function(){this.play()},uninstall:function(){this.pause()}}}),_animate:!1,_time:0,_count:0,getAutoUpdate:function(){return this._autoUpdate},setAutoUpdate:function(t){this._autoUpdate=t,t&&this.requestUpdate()},update:function(){},draw:function(){this.update()},requestUpdate:function(){if(!this._requested){var t=this;Z.requestAnimationFrame(function(){if(t._requested=!1,t._animate){t.requestUpdate();var e=t._element;H.getPrefixed(n,"hidden")&&"true"!==a.getAttribute(e,"keepalive")||!H.isInView(e)||t._handleFrame()}t._autoUpdate&&t.update()}),this._requested=!0}},play:function(){this._animate=!0,this.requestUpdate()},pause:function(){this._animate=!1},_handleFrame:function(){paper=this._scope;var t=Date.now()/1e3,e=this._last?t-this._last:0;this._last=t,this.emit("frame",new r({delta:e,time:this._time+=e,count:this._count++})),this._stats&&this._stats.update()},_animateItem:function(t,e){var i=this._frameItems;e?(i[t._id]={item:t,time:0,count:0},1==++this._frameItemCount&&this.on("frame",this._handleFrameItems)):(delete i[t._id],0==--this._frameItemCount&&this.off("frame",this._handleFrameItems))},_handleFrameItems:function(t){for(var e in this._frameItems){var i=this._frameItems[e];i.item.emit("frame",new r(t,{time:i.time+=t.delta,count:i.count++}))}},_changed:function(){this._project._changed(2049),this._bounds=this._decomposed=e},getElement:function(){return this._element},getPixelRatio:function(){return this._pixelRatio},getResolution:function(){return 72*this._pixelRatio},getViewSize:function(){var t=this._viewSize;return new _(t.width,t.height,this,"setViewSize")},setViewSize:function(){var t=d.read(arguments),e=t.subtract(this._viewSize);e.isZero()||(this._setElementSize(t.width,t.height),this._viewSize.set(t),this._changed(),this.emit("resize",{size:t,delta:e}),this._autoUpdate&&this.update())},_setElementSize:function(t,e){var i=this._element;i&&(i.width!==t&&(i.width=t),i.height!==e&&(i.height=e))},getBounds:function(){return this._bounds||(this._bounds=this._matrix.inverted()._transformBounds(new g(new c,this._viewSize))),this._bounds},getSize:function(){return this.getBounds().getSize()},isVisible:function(){return H.isInView(this._element)},isInserted:function(){return H.isInserted(this._element)},getPixelSize:function(t){var e,i=this._element;if(i){var r=i.parentNode,s=n.createElement("div");s.style.fontSize=t,r.appendChild(s),e=parseFloat(H.getStyles(s).fontSize),r.removeChild(s)}else e=parseFloat(e);return e},getTextWidth:function(t,e){return 0}},r.each(["rotate","scale","shear","skew"],function(t){var e="rotate"===t;this[t]=function(){var i=(e?r:c).read(arguments),n=c.read(arguments,0,{readNull:!0});return this.transform((new p)[t](i,n||this.getCenter(!0)))}},{_decompose:function(){return this._decomposed||(this._decomposed=this._matrix.decompose())},translate:function(){var t=new p;return this.transform(t.translate.apply(t,arguments))},getCenter:function(){return this.getBounds().getCenter()},setCenter:function(){var t=c.read(arguments);this.translate(this.getCenter().subtract(t))},getZoom:function(){var t=this._decompose(),e=t&&t.scaling;return e?(e.x+e.y)/2:0},setZoom:function(t){this.transform((new p).scale(t/this.getZoom(),this.getCenter()))},getRotation:function(){var t=this._decompose();return t&&t.rotation},setRotation:function(t){var e=this.getRotation();null!=e&&null!=t&&this.rotate(t-e)},getScaling:function(){var t=this._decompose(),i=t&&t.scaling;return i?new f(i.x,i.y,this,"setScaling"):e},setScaling:function(){var t=this.getScaling(),e=c.read(arguments,0,{clone:!0,readNull:!0});t&&e&&this.scale(e.x/t.x,e.y/t.y)},getMatrix:function(){return this._matrix},setMatrix:function(){var t=this._matrix;t.initialize.apply(t,arguments)},transform:function(t){this._matrix.append(t)},scrollBy:function(){this.translate(c.read(arguments).negate())}}),{projectToView:function(){return this._matrix._transformPoint(c.read(arguments))},viewToProject:function(){return this._matrix._inverseTransform(c.read(arguments))},getEventPoint:function(t){return this.viewToProject(Z.getOffset(t,this._element))}},{statics:{_views:[],_viewsById:{},_id:0,create:function(t,e){return n&&"string"==typeof e&&(e=n.getElementById(e)),new(i?W:U)(t,e)}}},new function(){function t(t){var e=Z.getTarget(t);return e.getAttribute&&U._viewsById[e.getAttribute("id")]}function e(){var t=U._focused;if(!t||!t.isVisible())for(var e=0,i=U._views.length;e<i;e++)if((t=U._views[e]).isVisible()){U._focused=h=t;break}}function r(t,e,i){t._handleMouseEvent("mousemove",e,i)}function s(t,e,i,n,r,s,a){function o(t,i){if(t.responds(i)){if(h||(h=new X(i,n,r,e||t,s?r.subtract(s):null)),t.emit(i,h)&&(I=!0,h.prevented&&(M=!0),h.stopped))return u=!0}else{var a=T[i];if(a)return o(t,a)}}for(var h,u=!1;t&&t!==a&&!o(t,i);)t=t._parent;return u}function a(t,e,i,n,r,a){return t._project.removeOn(i),M=I=!1,b&&s(b,null,i,n,r,a)||e&&e!==b&&!e.isDescendant(b)&&s(e,null,i,n,r,a,b)||s(t,b||e||t,i,n,r,a)}if(i){var o,h,u,l,c,f=!1,d=!1,_=i.navigator;_.pointerEnabled||_.msPointerEnabled?(u="pointerdown MSPointerDown",l="pointermove MSPointerMove",c="pointerup pointercancel MSPointerUp MSPointerCancel"):(u="touchstart",l="touchmove",c="touchend touchcancel","ontouchstart"in i&&_.userAgent.match(/mobile|tablet|ip(ad|hone|od)|android|silk/i)||(u+=" mousedown",l+=" mousemove",c+=" mouseup"));var g={},v={mouseout:function(t){var e=U._focused,i=Z.getRelatedTarget(t);if(e&&(!i||"HTML"===i.nodeName)){var n=Z.getOffset(t,e._element),s=n.x,a=Math.abs,o=a(s),h=o-(1<<25);n.x=a(h)<o?h*(s<0?-1:1):s,r(e,t,e.viewToProject(n))}},scroll:e};g[u]=function(e){var i=U._focused=t(e);f||(f=!0,i._handleMouseEvent("mousedown",e))},v[l]=function(i){var n=U._focused;if(!d){var s=t(i);s?n!==s&&(n&&r(n,i),o||(o=n),n=U._focused=h=s):h&&h===n&&(o&&!o.isInserted()&&(o=null),n=U._focused=o,o=null,e())}n&&r(n,i)},v[u]=function(){d=!0},v[c]=function(t){var e=U._focused;e&&f&&e._handleMouseEvent("mouseup",t),d=f=!1},Z.add(n,v),Z.add(i,{load:e});var p,m,y,w,x,b,C,S,P,I=!1,M=!1,T={doubleclick:"click",mousedrag:"mousemove"},z=!1,k={mousedown:{mousedown:1,mousedrag:1,click:1,doubleclick:1},mouseup:{mouseup:1,mousedrag:1,click:1,doubleclick:1},mousemove:{mousedrag:1,mousemove:1,mouseenter:1,mouseleave:1}};return{_viewEvents:g,_handleMouseEvent:function(t,e,i){function n(t){return r.virtual[t]||l.responds(t)||u&&u.responds(t)}var r=this._itemEvents,o=r.native[t],h="mousemove"===t,u=this._scope.tool,l=this;h&&f&&n("mousedrag")&&(t="mousedrag"),i||(i=this.getEventPoint(e));var c=this.getBounds().contains(i),d=o&&c&&l._project.hitTest(i,{tolerance:0,fill:!0,stroke:!0}),_=d&&d.item||null,g=!1,v={};if(v[t.substr(5)]=!0,o&&_!==x&&(x&&s(x,null,"mouseleave",e,i),_&&s(_,null,"mouseenter",e,i),x=_),z^c&&(s(this,null,c?"mouseenter":"mouseleave",e,i),p=c?this:null,g=!0),!c&&!v.drag||i.equals(y)||(a(this,_,h?t:"mousemove",e,i,y),g=!0),z=c,v.down&&c||v.up&&m){if(a(this,_,t,e,i,m),v.down){if(P=_===C&&Date.now()-S<300,w=C=_,!M&&_){for(var T=_;T&&!T.responds("mousedrag");)T=T._parent;T&&(b=_)}m=i}else v.up&&(M||_!==w||(S=Date.now(),a(this,_,P?"doubleclick":"click",e,i,m),P=!1),w=b=null);z=!1,g=!0}y=i,g&&u&&(I=u._handleMouseEvent(t,e,i,v)||I),(I&&!v.move||v.down&&n("mouseup"))&&e.preventDefault()},_handleKeyEvent:function(t,e,i,n){function r(r){r.responds(t)&&(paper=a,r.emit(t,s=s||new J(t,e,i,n)))}var s,a=this._scope,o=a.tool;this.isVisible()&&(r(this),o&&o.responds(t)&&r(o))},_countItemEvent:function(t,e){var i=this._itemEvents,n=i.native,r=i.virtual;for(var s in k)n[s]=(n[s]||0)+(k[s][t]||0)*e;r[t]=(r[t]||0)+e},statics:{updateFocus:e}}}}),W=U.extend({_class:"CanvasView",initialize:function(t,e){if(!(e instanceof i.HTMLCanvasElement)){var n=d.read(arguments,1);if(n.isZero())throw new Error("Cannot create CanvasView with the provided argument: "+r.slice(arguments,1));e=Q.getCanvas(n)}var s=this._context=e.getContext("2d");if(s.save(),this._pixelRatio=1,!/^off|false$/.test(a.getAttribute(e,"hidpi"))){var o=i.devicePixelRatio||1,h=H.getPrefixed(s,"backingStorePixelRatio")||1;this._pixelRatio=o/h}U.call(this,t,e),this._needsUpdate=!0},remove:function t(){return this._context.restore(),t.base.call(this)},_setElementSize:function t(e,i){var n=this._pixelRatio;if(t.base.call(this,e*n,i*n),1!==n){var r=this._element,s=this._context;if(!a.hasAttribute(r,"resize")){var o=r.style;o.width=e+"px",o.height=i+"px"}s.restore(),s.save(),s.scale(n,n)}},getPixelSize:function t(e){var i,n=paper.agent;if(n&&n.firefox)i=t.base.call(this,e);else{var r=this._context,s=r.font;r.font=e+" serif",i=parseFloat(r.font),r.font=s}return i},getTextWidth:function(t,e){var i=this._context,n=i.font,r=0;i.font=t;for(var s=0,a=e.length;s<a;s++)r=Math.max(r,i.measureText(e[s]).width);return i.font=n,r},update:function(){if(!this._needsUpdate)return!1;var t=this._project,e=this._context,i=this._viewSize;return e.clearRect(0,0,i.width+1,i.height+1),t&&t.draw(e,this._matrix,this._pixelRatio),this._needsUpdate=!1,!0}}),G=r.extend({_class:"Event",initialize:function(t){this.event=t,this.type=t&&t.type},prevented:!1,stopped:!1,preventDefault:function(){this.prevented=!0,this.event.preventDefault()},stopPropagation:function(){this.stopped=!0,this.event.stopPropagation()},stop:function(){this.stopPropagation(),this.preventDefault()},getTimeStamp:function(){return this.event.timeStamp},getModifiers:function(){return $.modifiers}}),J=G.extend({_class:"KeyEvent",initialize:function(t,e,i,n){this.type=t,this.event=e,this.key=i,this.character=n},toString:function(){return"{ type: '"+this.type+"', key: '"+this.key+"', character: '"+this.character+"', modifiers: "+this.getModifiers()+" }"}}),$=new function(){function t(t){var i=t.key||t.keyIdentifier;return i=/^U\+/.test(i)?String.fromCharCode(parseInt(i.substr(2),16)):/^Arrow[A-Z]/.test(i)?i.substr(5):"Unidentified"===i||i===e?String.fromCharCode(t.keyCode):i,h[i]||(i.length>1?r.hyphenate(i):i.toLowerCase())}function s(t,e,i,n){var o,h=U._focused;if(l[e]=t,t?c[e]=i:delete c[e],e.length>1&&(o=r.camelize(e))in f){f[o]=t;var u=paper&&paper.agent;if("meta"===o&&u&&u.mac)if(t)a={};else{for(var d in a)d in c&&s(!1,d,a[d],n);a=null}}else t&&a&&(a[e]=i);h&&h._handleKeyEvent(t?"keydown":"keyup",n,e,i)}var a,o,h={"\t":"tab"," ":"space","\b":"backspace","":"delete",Spacebar:"space",Del:"delete",Win:"meta",Esc:"escape"},u={tab:"\t",space:" ",enter:"\r"},l={},c={},f=new r({shift:!1,control:!1,alt:!1,meta:!1,capsLock:!1,space:!1}).inject({option:{get:function(){return this.alt}},command:{get:function(){var t=paper&&paper.agent;return t&&t.mac?this.meta:this.control}}});return Z.add(n,{keydown:function(e){var i=t(e),n=paper&&paper.agent;i.length>1||n&&n.chrome&&(e.altKey||n.mac&&e.metaKey||!n.mac&&e.ctrlKey)?s(!0,i,u[i]||(i.length>1?"":i),e):o=i},keypress:function(e){if(o){var i=t(e),n=e.charCode,r=n>=32?String.fromCharCode(n):i.length>1?"":i;i!==o&&(i=r.toLowerCase()),s(!0,i,r,e),o=null}},keyup:function(e){var i=t(e);i in c&&s(!1,i,c[i],e)}}),Z.add(i,{blur:function(t){for(var e in c)s(!1,e,c[e],t)}}),{modifiers:f,isDown:function(t){return!!l[t]}}},X=G.extend({_class:"MouseEvent",initialize:function(t,e,i,n,r){this.type=t,this.event=e,this.point=i,this.target=n,this.delta=r},toString:function(){return"{ type: '"+this.type+"', point: "+this.point+", target: "+this.target+(this.delta?", delta: "+this.delta:"")+", modifiers: "+this.getModifiers()+" }"}}),Y=G.extend({_class:"ToolEvent",_item:null,initialize:function(t,e,i){this.tool=t,this.type=e,this.event=i},_choosePoint:function(t,e){return t||(e?e.clone():null)},getPoint:function(){return this._choosePoint(this._point,this.tool._point)},setPoint:function(t){this._point=t},getLastPoint:function(){return this._choosePoint(this._lastPoint,this.tool._lastPoint)},setLastPoint:function(t){this._lastPoint=t},getDownPoint:function(){return this._choosePoint(this._downPoint,this.tool._downPoint)},setDownPoint:function(t){this._downPoint=t},getMiddlePoint:function(){return!this._middlePoint&&this.tool._lastPoint?this.tool._point.add(this.tool._lastPoint).divide(2):this._middlePoint},setMiddlePoint:function(t){this._middlePoint=t},getDelta:function(){return!this._delta&&this.tool._lastPoint?this.tool._point.subtract(this.tool._lastPoint):this._delta},setDelta:function(t){this._delta=t},getCount:function(){return this.tool[/^mouse(down|up)$/.test(this.type)?"_downCount":"_moveCount"]},setCount:function(t){this.tool[/^mouse(down|up)$/.test(this.type)?"downCount":"count"]=t},getItem:function(){if(!this._item){var t=this.tool._scope.project.hitTest(this.getPoint());if(t){for(var e=t.item,i=e._parent;/^(Group|CompoundPath)$/.test(i._class);)e=i,i=i._parent;this._item=e}}return this._item},setItem:function(t){this._item=t},toString:function(){return"{ type: "+this.type+", point: "+this.getPoint()+", count: "+this.getCount()+", modifiers: "+this.getModifiers()+" }"}}),K=(o.extend({_class:"Tool",_list:"tools",_reference:"tool",_events:["onMouseDown","onMouseUp","onMouseDrag","onMouseMove","onActivate","onDeactivate","onEditOptions","onKeyDown","onKeyUp"],initialize:function(t){o.call(this),this._moveCount=-1,this._downCount=-1,this.set(t)},getMinDistance:function(){return this._minDistance},setMinDistance:function(t){this._minDistance=t,null!=t&&null!=this._maxDistance&&t>this._maxDistance&&(this._maxDistance=t)},getMaxDistance:function(){return this._maxDistance},setMaxDistance:function(t){this._maxDistance=t,null!=this._minDistance&&null!=t&&t<this._minDistance&&(this._minDistance=t)},getFixedDistance:function(){return this._minDistance==this._maxDistance?this._minDistance:null},setFixedDistance:function(t){this._minDistance=this._maxDistance=t},_handleMouseEvent:function(t,e,i,n){function r(t,e){var r=i,s=a?c._point:c._downPoint||r;if(a){if(c._moveCount&&r.equals(s))return!1;if(s&&(null!=t||null!=e)){var o=r.subtract(s),h=o.getLength();if(h<(t||0))return!1;e&&(r=s.add(o.normalize(Math.min(h,e))))}c._moveCount++}return c._point=r,c._lastPoint=s||r,n.down&&(c._moveCount=-1,c._downPoint=r,c._downCount++),!0}function s(){o&&(l=c.emit(t,new Y(c,t,e))||l)}paper=this._scope,n.drag&&!this.responds(t)&&(t="mousemove");var a=n.move||n.drag,o=this.responds(t),h=this.minDistance,u=this.maxDistance,l=!1,c=this;if(n.down)r(),s();else if(n.up)r(null,u),s();else if(o)for(;r(h,u);)s();return l}}),{request:function(e){var i=new t.XMLHttpRequest;return i.open((e.method||"get").toUpperCase(),e.url,r.pick(e.async,!0)),e.mimeType&&i.overrideMimeType(e.mimeType),i.onload=function(){var t=i.status;0===t||200===t?e.onLoad&&e.onLoad.call(i,i.responseText):i.onerror()},i.onerror=function(){var t=i.status,n='Could not load "'+e.url+'" (Status: '+t+")";if(!e.onError)throw new Error(n);e.onError(n,t)},i.send(null)}}),Q={canvases:[],getCanvas:function(t,e){if(!i)return null;var r,s=!0;"object"==typeof t&&(e=t.height,t=t.width),this.canvases.length?r=this.canvases.pop():(r=n.createElement("canvas"),s=!1);var a=r.getContext("2d");if(!a)throw new Error("Canvas "+r+" is unable to provide a 2D context.");return r.width===t&&r.height===e?s&&a.clearRect(0,0,t+1,e+1):(r.width=t,r.height=e),a.save(),r},getContext:function(t,e){var i=this.getCanvas(t,e);return i?i.getContext("2d"):null},release:function(t){var e=t&&t.canvas?t.canvas:t;e&&e.getContext&&(e.getContext("2d").restore(),this.canvases.push(e))}},tt=new function(){function t(t,e,i){return.2989*t+.587*e+.114*i}function e(e,i,n,r){var s=r-t(e,i,n),r=t(d=e+s,_=i+s,g=n+s),a=v(d,_,g),o=p(d,_,g);if(a<0){var h=r-a;d=r+(d-r)*r/h,_=r+(_-r)*r/h,g=r+(g-r)*r/h}if(o>255){var u=255-r,l=o-r;d=r+(d-r)*u/l,_=r+(_-r)*u/l,g=r+(g-r)*u/l}}function i(t,e,i){return p(t,e,i)-v(t,e,i)}function n(t,e,i,n){var r,s=[t,e,i],a=p(t,e,i),o=v(t,e,i);r=0===v(o=o===t?0:o===e?1:2,a=a===t?0:a===e?1:2)?1===p(o,a)?2:1:0,s[a]>s[o]?(s[r]=(s[r]-s[o])*n/(s[a]-s[o]),s[a]=n):s[r]=s[a]=0,s[o]=0,d=s[0],_=s[1],g=s[2]}var s,a,o,h,u,l,c,f,d,_,g,v=Math.min,p=Math.max,m=Math.abs,y={multiply:function(){d=u*s/255,_=l*a/255,g=c*o/255},screen:function(){d=u+s-u*s/255,_=l+a-l*a/255,g=c+o-c*o/255},overlay:function(){d=u<128?2*u*s/255:255-2*(255-u)*(255-s)/255,_=l<128?2*l*a/255:255-2*(255-l)*(255-a)/255,g=c<128?2*c*o/255:255-2*(255-c)*(255-o)/255},"soft-light":function(){var t=s*u/255;d=t+u*(255-(255-u)*(255-s)/255-t)/255,_=(t=a*l/255)+l*(255-(255-l)*(255-a)/255-t)/255,g=(t=o*c/255)+c*(255-(255-c)*(255-o)/255-t)/255},"hard-light":function(){d=s<128?2*s*u/255:255-2*(255-s)*(255-u)/255,_=a<128?2*a*l/255:255-2*(255-a)*(255-l)/255,g=o<128?2*o*c/255:255-2*(255-o)*(255-c)/255},"color-dodge":function(){d=0===u?0:255===s?255:v(255,255*u/(255-s)),_=0===l?0:255===a?255:v(255,255*l/(255-a)),g=0===c?0:255===o?255:v(255,255*c/(255-o))},"color-burn":function(){d=255===u?255:0===s?0:p(0,255-255*(255-u)/s),_=255===l?255:0===a?0:p(0,255-255*(255-l)/a),g=255===c?255:0===o?0:p(0,255-255*(255-c)/o)},darken:function(){d=u<s?u:s,_=l<a?l:a,g=c<o?c:o},lighten:function(){d=u>s?u:s,_=l>a?l:a,g=c>o?c:o},difference:function(){(d=u-s)<0&&(d=-d),(_=l-a)<0&&(_=-_),(g=c-o)<0&&(g=-g)},exclusion:function(){d=u+s*(255-u-u)/255,_=l+a*(255-l-l)/255,g=c+o*(255-c-c)/255},hue:function(){n(s,a,o,i(u,l,c)),e(d,_,g,t(u,l,c))},saturation:function(){n(u,l,c,i(s,a,o)),e(d,_,g,t(u,l,c))},luminosity:function(){e(u,l,c,t(s,a,o))},color:function(){e(s,a,o,t(u,l,c))},add:function(){d=v(u+s,255),_=v(l+a,255),g=v(c+o,255)},subtract:function(){d=p(u-s,0),_=p(l-a,0),g=p(c-o,0)},average:function(){d=(u+s)/2,_=(l+a)/2,g=(c+o)/2},negation:function(){d=255-m(255-s-u),_=255-m(255-a-l),g=255-m(255-o-c)}},w=this.nativeModes=r.each(["source-over","source-in","source-out","source-atop","destination-over","destination-in","destination-out","destination-atop","lighter","darker","copy","xor"],function(t){this[t]=!0},{}),x=Q.getContext(1,1);x&&(r.each(y,function(t,e){var i="darken"===e,n=!1;x.save();try{x.fillStyle=i?"#300":"#a00",x.fillRect(0,0,1,1),x.globalCompositeOperation=e,x.globalCompositeOperation===e&&(x.fillStyle=i?"#a00":"#300",x.fillRect(0,0,1,1),n=x.getImageData(0,0,1,1).data[0]!==i?170:51)}catch(t){}x.restore(),w[e]=n}),Q.release(x)),this.process=function(t,e,i,n,r){var v=e.canvas,p="normal"===t;if(p||w[t])i.save(),i.setTransform(1,0,0,1,0,0),i.globalAlpha=n,p||(i.globalCompositeOperation=t),i.drawImage(v,r.x,r.y),i.restore();else{var m=y[t];if(!m)return;for(var x=i.getImageData(r.x,r.y,v.width,v.height),b=x.data,C=e.getImageData(0,0,v.width,v.height).data,S=0,P=b.length;S<P;S+=4){s=C[S],u=b[S],a=C[S+1],l=b[S+1],o=C[S+2],c=b[S+2],h=C[S+3],f=b[S+3],m();var I=h*n/255,M=1-I;b[S]=I*d+M*u,b[S+1]=I*_+M*l,b[S+2]=I*g+M*c,b[S+3]=h*n+M*f}i.putImageData(x,r.x,r.y)}}},et=new function(){function t(t,e,i){for(var n in e){var r=e[n],a=s[n];"number"==typeof r&&i&&(r=i.number(r)),a?t.setAttributeNS(a,n,r):t.setAttribute(n,r)}return t}var e="http://www.w3.org/2000/svg",i="http://www.w3.org/2000/xmlns",r="http://www.w3.org/1999/xlink",s={href:r,xlink:i,xmlns:i+"/","xmlns:xlink":i+"/"};return{svg:e,xmlns:i,xlink:r,create:function(i,r,s){return t(n.createElementNS(e,i),r,s)},get:function(t,e){var i=s[e],n=i?t.getAttributeNS(i,e):t.getAttribute(e);return"null"===n?null:n},set:t}},it=r.each({fillColor:["fill","color"],fillRule:["fill-rule","string"],strokeColor:["stroke","color"],strokeWidth:["stroke-width","number"],strokeCap:["stroke-linecap","string"],strokeJoin:["stroke-linejoin","string"],strokeScaling:["vector-effect","lookup",{true:"none",false:"non-scaling-stroke"},function(t,e){return!e&&(t instanceof A||t instanceof C||t instanceof j)}],miterLimit:["stroke-miterlimit","number"],dashArray:["stroke-dasharray","array"],dashOffset:["stroke-dashoffset","number"],fontFamily:["font-family","string"],fontWeight:["font-weight","string"],fontSize:["font-size","number"],justification:["text-anchor","lookup",{left:"start",center:"middle",right:"end"}],opacity:["opacity","number"],blendMode:["mix-blend-mode","style"]},function(t,e){var i=r.capitalize(e),n=t[2];this[e]={type:t[1],property:e,attribute:t[0],toSVG:n,fromSVG:n&&r.each(n,function(t,e){this[t]=e},{}),exportFilter:t[3],get:"get"+i,set:"set"+i}},{});return new function(){function e(t,e,i){var n=new r,s=t.getTranslation();if(e){var a=(t=t._shiftless())._inverseTransform(s);n[i?"cx":"x"]=a.x,n[i?"cy":"y"]=a.y,s=null}if(!t.isIdentity()){var o=t.decompose();if(o){var h=[],l=o.rotation,c=o.scaling,f=o.skewing;s&&!s.isZero()&&h.push("translate("+v.point(s)+")"),l&&h.push("rotate("+v.number(l)+")"),u.isZero(c.x-1)&&u.isZero(c.y-1)||h.push("scale("+v.point(c)+")"),f.x&&h.push("skewX("+v.number(f.x)+")"),f.y&&h.push("skewY("+v.number(f.y)+")"),n.transform=h.join(" ")}else n.transform="matrix("+t.getValues().join(",")+")"}return n}function i(t,i){for(var n=e(t._matrix),r=t._children,s=et.create("g",n,v),a=0,o=r.length;a<o;a++){var h=r[a],u=d(h,i);if(u)if(h.isClipMask()){var l=et.create("clipPath");l.appendChild(u),c(h,l,"clip"),et.set(s,{"clip-path":"url(#"+l.id+")"})}else s.appendChild(u)}return s}function n(t){var i=t._type,n=t._radius,r=e(t._matrix,!0,"rectangle"!==i);if("rectangle"===i){i="rect";var s=t._size,a=s.width,o=s.height;r.x-=a/2,r.y-=o/2,r.width=a,r.height=o,n.isZero()&&(n=null)}return n&&("circle"===i?r.r=n:(r.rx=n.width,r.ry=n.height)),et.create(i,r,v)}function s(t){var e=o(t,"color");if(!e){var i,n=t.getGradient(),r=n._radial,s=t.getOrigin(),a=t.getDestination();if(r){i={cx:s.x,cy:s.y,r:s.getDistance(a)};var h=t.getHighlight();h&&(i.fx=h.x,i.fy=h.y)}else i={x1:s.x,y1:s.y,x2:a.x,y2:a.y};i.gradientUnits="userSpaceOnUse",e=et.create((r?"radial":"linear")+"Gradient",i,v);for(var u=n._stops,l=0,f=u.length;l<f;l++){var d=u[l],_=d._color,g=_.getAlpha(),p=d._offset;i={offset:null==p?l/(f-1):p},_&&(i["stop-color"]=_.toCSS(!0)),g<1&&(i["stop-opacity"]=g),e.appendChild(et.create("stop",i,v))}c(t,e,"color")}return"url(#"+e.id+")"}function a(t,e,i){var n={},a=!i&&t.getParent(),o=[];return null!=t._name&&(n.id=t._name),r.each(it,function(e){var i=e.get,h=e.type,u=t[i]();if(e.exportFilter?e.exportFilter(t,u):!a||!r.equals(a[i](),u)){if("color"===h&&null!=u){var l=u.getAlpha();l<1&&(n[e.attribute+"-opacity"]=l)}"style"===h?o.push(e.attribute+": "+u):n[e.attribute]=null==u?"none":"color"===h?u.gradient?s(u,t):u.toCSS(!0):"array"===h?u.join(","):"lookup"===h?e.toSVG[u]:u}}),o.length&&(n.style=o.join(";")),1===n.opacity&&delete n.opacity,t._visible||(n.visibility="hidden"),et.set(e,n,v)}function o(t,e){return m||(m={ids:{},svgs:{}}),t&&m.svgs[e+"-"+(t._id||t.__id||(t.__id=l.get("svg")))]}function c(t,e,i){m||o();var n=m.ids[i]=(m.ids[i]||0)+1;e.id=i+"-"+n,m.svgs[i+"-"+(t._id||t.__id)]=e}function f(e,i){var n=e,r=null;if(m){n="svg"===e.nodeName.toLowerCase()&&e;for(var s in m.svgs)r||(n||(n=et.create("svg")).appendChild(e),r=n.insertBefore(et.create("defs"),n.firstChild)),r.appendChild(m.svgs[s]);m=null}return i.asString?(new t.XMLSerializer).serializeToString(n):n}function d(t,e,i){var n=x[t._class],r=n&&n(t,e);if(r){var s=e.onExport;s&&(r=s(t,r,e)||r);var o=JSON.stringify(t._data);o&&"{}"!==o&&"null"!==o&&r.setAttribute("data-paper-data",o)}return r&&a(t,r,i)}function _(t){return t||(t={}),v=new h(t.precision),t}var v,m,x={Group:i,Layer:i,Raster:function(t,i){var n=e(t._matrix,!0),r=t.getSize(),s=t.getImage();return n.x-=r.width/2,n.y-=r.height/2,n.width=r.width,n.height=r.height,n.href=0==i.embedImages&&s&&s.src||t.toDataURL(),et.create("image",n,v)},Path:function(t,i){var r=i.matchShapes;if(r){var s=t.toShape(!1);if(s)return n(s)}var a,o=t._segments,h=o.length,u=e(t._matrix);if(r&&h>=2&&!t.hasHandles())if(h>2){a=t._closed?"polygon":"polyline";for(var l=[],c=0;c<h;c++)l.push(v.point(o[c]._point));u.points=l.join(" ")}else{a="line";var f=o[0]._point,d=o[1]._point;u.set({x1:f.x,y1:f.y,x2:d.x,y2:d.y})}else a="path",u.d=t.getPathData(null,i.precision);return et.create(a,u,v)},Shape:n,CompoundPath:function(t,i){var n=e(t._matrix),r=t.getPathData(null,i.precision);return r&&(n.d=r),et.create("path",n,v)},SymbolItem:function(t,i){var n=e(t._matrix,!0),r=t._definition,s=o(r,"symbol"),a=r._item,h=a.getBounds();return s||((s=et.create("symbol",{viewBox:v.rectangle(h)})).appendChild(d(a,i)),c(r,s,"symbol")),n.href="#"+s.id,n.x+=h.x,n.y+=h.y,n.width=h.width,n.height=h.height,n.overflow="visible",et.create("use",n,v)},PointText:function(t){var i=et.create("text",e(t._matrix,!0),v);return i.textContent=t._content,i}};w.inject({exportSVG:function(t){return t=_(t),f(d(this,t,!0),t)}}),y.inject({exportSVG:function(t){t=_(t);var i=this._children,n=this.getView(),s=r.pick(t.bounds,"view"),a=t.matrix||"view"===s&&n._matrix,o=a&&p.read([a]),h="view"===s?new g([0,0],n.getViewSize()):"content"===s?w._getBounds(i,o,{stroke:!0}).rect:g.read([s],0,{readNull:!0}),u={version:"1.1",xmlns:et.svg,"xmlns:xlink":et.xlink};h&&(u.width=h.width,u.height=h.height,(h.x||h.y)&&(u.viewBox=v.rectangle(h)));var l=et.create("svg",u,v),c=l;o&&!o.isIdentity()&&(c=l.appendChild(et.create("g",e(o),v)));for(var m=0,y=i.length;m<y;m++)c.appendChild(d(i[m],t,!0));return f(l,t)}})},new function(){function s(t,e,i,n,r){var s=et.get(t,e),a=null==s?n?null:i?"":0:i?s:parseFloat(s);return/%\s*$/.test(s)?a/100*(r?1:z[/x|^width/.test(e)?"width":"height"]):a}function a(t,e,i,n,r){return e=s(t,e||"x",!1,n,r),i=s(t,i||"y",!1,n,r),!n||null!=e&&null!=i?new c(e,i):null}function o(t,e,i,n,r){return e=s(t,e||"width",!1,n,r),i=s(t,i||"height",!1,n,r),!n||null!=e&&null!=i?new d(e,i):null}function h(t,e,i){return"none"===t?null:"number"===e?parseFloat(t):"array"===e?t?t.split(/[\s,]+/g).map(parseFloat):[]:"color"===e?P(t)||t:"lookup"===e?i[t]:t}function u(t,e,i,n){var r=t.childNodes,s="clippath"===e,a="defs"===e,o=new x,h=o._project,u=h._currentStyle,l=[];if(s||a||(o=b(o,t,n),h._currentStyle=o._style.clone()),n)for(var c=t.querySelectorAll("defs"),f=0,d=c.length;f<d;f++)M(c[f],i,!1);for(var f=0,d=r.length;f<d;f++){var _,g=r[f];1!==g.nodeType||/^defs$/i.test(g.nodeName)||!(_=M(g,i,!1))||_ instanceof I||l.push(_)}return o.addChildren(l),s&&(o=b(o.reduce(),t,n)),h._currentStyle=u,(s||a)&&(o.remove(),o=null),o}function l(t,e){for(var i=t.getAttribute("points").match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g),n=[],r=0,s=i.length;r<s;r+=2)n.push(new c(parseFloat(i[r]),parseFloat(i[r+1])));var a=new L(n);return"polygon"===e&&a.closePath(),a}function f(t,e){var i,n=(s(t,"href",!0)||"").substring(1),r="radialgradient"===e;if(n)(i=k[n].getGradient())._radial^r&&((i=i.clone())._radial=r);else{for(var o=t.childNodes,h=[],u=0,l=o.length;u<l;u++){var c=o[u];1===c.nodeType&&h.push(b(new q,c))}i=new R(h,r)}var f,d,_,g="userSpaceOnUse"!==s(t,"gradientUnits",!0);return r?(d=(f=a(t,"cx","cy",!1,g)).add(s(t,"r",!1,!1,g),0),_=a(t,"fx","fy",!0,g)):(f=a(t,"x1","y1",!1,g),d=a(t,"x2","y2",!1,g)),b(new F(i,f,d,_),t)._scaleToBounds=g,null}function _(t,e,i,n){if(t.transform){for(var r=(n.getAttribute(i)||"").split(/\)\s*/g),s=new p,a=0,o=r.length;a<o;a++){var h=r[a];if(!h)break;for(var u=h.split(/\(\s*/),l=u[0],c=u[1].split(/[\s,]+/g),f=0,d=c.length;f<d;f++)c[f]=parseFloat(c[f]);switch(l){case"matrix":s.append(new p(c[0],c[1],c[2],c[3],c[4],c[5]));break;case"rotate":s.rotate(c[0],c[1],c[2]);break;case"translate":s.translate(c[0],c[1]);break;case"scale":s.scale(c);break;case"skewX":s.skew(c[0],0);break;case"skewY":s.skew(0,c[0])}}t.transform(s)}}function v(t,e,i){var n="fill-opacity"===i?"getFillColor":"getStrokeColor",r=t[n]&&t[n]();r&&r.setAlpha(parseFloat(e))}function m(t,i,n){var s=t.attributes[i],a=s&&s.value;if(!a){var o=r.camelize(i);(a=t.style[o])||n.node[o]===n.parent[o]||(a=n.node[o])}return a?"none"===a?null:a:e}function b(t,i,n){if(i.style){var s=i.parentNode,a={node:H.getStyles(i)||{},parent:!n&&!/^defs$/i.test(s.tagName)&&H.getStyles(s)||{}};r.each(N,function(n,r){var s=m(i,r,a);t=s!==e&&n(t,s,r,i,a)||t})}return t}function P(t){var e=t&&t.match(/\((?:["'#]*)([^"')]+)/),n=e&&e[1],r=n&&k[i?n.replace(i.location.href.split("#")[0]+"#",""):n];return r&&r._scaleToBounds&&((r=r.clone())._scaleToBounds=!0),r}function M(t,e,i){var s,a,h,u=t.nodeName.toLowerCase(),l="#document"!==u,c=n.body;i&&l&&(z=paper.getView().getSize(),z=o(t,null,null,!0)||z,s=et.create("svg",{style:"stroke-width: 1px; stroke-miterlimit: 10"}),a=t.parentNode,h=t.nextSibling,s.appendChild(t),c.appendChild(s));var f=paper.settings,d=f.applyMatrix,_=f.insertItems;f.applyMatrix=!1,f.insertItems=!1;var g=O[u],v=g&&g(t,u,e,i)||null;if(f.insertItems=_,f.applyMatrix=d,v){!l||v instanceof x||(v=b(v,t,i));var p=e.onImport,m=l&&t.getAttribute("data-paper-data");p&&(v=p(t,v,e)||v),e.expandShapes&&v instanceof C&&(v.remove(),v=v.toPath()),m&&(v._data=JSON.parse(m))}return s&&(c.removeChild(s),a&&(h?a.insertBefore(t,h):a.appendChild(t))),i&&(k={},v&&r.pick(e.applyMatrix,d)&&v.matrix.apply(!0,!0)),v}function T(i,r,s){function a(n){try{var a="object"==typeof n?n:(new t.DOMParser).parseFromString(n,"image/svg+xml");if(!a.nodeName)throw a=null,new Error("Unsupported SVG source: "+i);paper=h,u=M(a,r,!0),r&&!1===r.insert||s._insertItem(e,u);var l=r.onLoad;l&&l(u,n)}catch(t){o(t)}}function o(t,e){var i=r.onError;if(!i)throw new Error(t);i(t,e)}if(!i)return null;r="function"==typeof r?{onLoad:r}:r||{};var h=paper,u=null;if("string"!=typeof i||/^.*</.test(i)){if("undefined"!=typeof File&&i instanceof File){var l=new FileReader;return l.onload=function(){a(l.result)},l.onerror=function(){o(l.error)},l.readAsText(i)}a(i)}else{var c=n.getElementById(i);c?a(c):K.request({url:i,async:!0,onLoad:a,onError:o})}return u}var z,k={},O={"#document":function(t,e,i,n){for(var r=t.childNodes,s=0,a=r.length;s<a;s++){var o=r[s];if(1===o.nodeType)return M(o,i,n)}},g:u,svg:u,clippath:u,polygon:l,polyline:l,path:function(t){return A.create(t.getAttribute("d"))},lineargradient:f,radialgradient:f,image:function(t){var e=new S(s(t,"href",!0));return e.on("load",function(){var e=o(t);this.setSize(e);var i=this._matrix._transformPoint(a(t).add(e.divide(2)));this.translate(i)}),e},symbol:function(t,e,i,n){return new I(u(t,e,i,n),!0)},defs:u,use:function(t){var e=(s(t,"href",!0)||"").substring(1),i=k[e],n=a(t);return i?i instanceof I?i.place(n):i.clone().translate(n):null},circle:function(t){return new C.Circle(a(t,"cx","cy"),s(t,"r"))},ellipse:function(t){return new C.Ellipse({center:a(t,"cx","cy"),radius:o(t,"rx","ry")})},rect:function(t){return new C.Rectangle(new g(a(t),o(t)),o(t,"rx","ry"))},line:function(t){return new L.Line(a(t,"x1","y1"),a(t,"x2","y2"))},text:function(t){var e=new E(a(t).add(a(t,"dx","dy")));return e.setContent(t.textContent.trim()||""),e}},N=r.set(r.each(it,function(t){this[t.attribute]=function(e,i){if(e[t.set]&&(e[t.set](h(i,t.type,t.fromSVG)),"color"===t.type)){var n=e[t.get]();if(n&&n._scaleToBounds){var r=e.getBounds();n.transform((new p).translate(r.getPoint()).scale(r.getSize()))}}}},{}),{id:function(t,e){k[e]=t,t.setName&&t.setName(e)},"clip-path":function(t,e){var i=P(e);if(i){if((i=i.clone()).setClipMask(!0),!(t instanceof x))return new x(i,t);t.insertChild(0,i)}},gradientTransform:_,transform:_,"fill-opacity":v,"stroke-opacity":v,visibility:function(t,e){t.setVisible&&t.setVisible("visible"===e)},display:function(t,e){t.setVisible&&t.setVisible(null!==e)},"stop-color":function(t,e){t.setColor&&t.setColor(e)},"stop-opacity":function(t,e){t._color&&t._color.setAlpha(parseFloat(e))},offset:function(t,e){if(t.setOffset){var i=e.match(/(.*)%$/);t.setOffset(i?i[1]/100:parseFloat(e))}},viewBox:function(t,e,i,n,r){var s,a=new g(h(e,"array")),u=o(n,null,null,!0);if(t instanceof x){var l=u?u.divide(a.getSize()):1,c=(new p).scale(l).translate(a.getPoint().negate());s=t}else t instanceof I&&(u&&a.setSize(u),s=t._item);if(s){if("visible"!==m(n,"overflow",r)){var f=new C.Rectangle(a);f.setClipMask(!0),s.addChild(f)}c&&s.transform(c)}}});w.inject({importSVG:function(t,e){return T(t,e,this)}}),y.inject({importSVG:function(t,e){return this.activate(),T(t,e,this)}})},(paper=new(a.inject(r.exports,{Base:r,Numerical:u,Key:$,DomEvent:Z,DomElement:H,document:n,window:i,Symbol:I,PlacedSymbol:P}))).agent.node&&require("./node/extend.js")(paper),"function"==typeof define&&define.amd?define("paper",paper):"object"==typeof module&&module&&(module.exports=paper),paper}.call(this,"object"==typeof self?self:null);/*
Script: RectanglePacker.js
	An algorithm implementation in JavaScript for rectangle packing.

Author:
	Iván Montes <drslump@drslump.biz>, <http://blog.netxus.es>

License:
	LGPL - Lesser General Public License

Credits:
	- Algorithm based on <http://www.blackpawn.com/texts/lightmaps/default.html>
*/

/*
	Class: NETXUS.RectanglePacker
	A class that finds an 'efficient' position for a rectangle inside another rectangle
	without overlapping the space already taken.
	
	Algorithm based on <http://www.blackpawn.com/texts/lightmaps/default.html>
	
	It uses a binary tree to partition the space of the parent rectangle and allocate the 
	passed rectangles by dividing the partitions into filled and empty.
*/


// Create a NETXUS namespace object if it doesn't exists
if (typeof NETXUS === 'undefined')
	var NETXUS = function() {};		
	

/*	
	Constructor: NETXUS.RectanglePacker
	Initializes the object with the given maximum dimensions
	
	Parameters:
	
		width - The containing rectangle maximum width as integer
		height - The containing rectangle maximum height as integer
		
*/	
NETXUS.RectanglePacker = function ( width, height ) {
	
	this.root = {};

	// initialize
	this.reset( width, height );	
}


/*
	Resets the object to its initial state by initializing the internal variables

	Parameters:
	
		width - The containing rectangle maximum width as integer
		height - The containing rectangle maximum height as integer
*/
NETXUS.RectanglePacker.prototype.reset = function ( width, height ) {
	this.root.x = 0;
	this.root.y = 0;
	this.root.w = width;
	this.root.h = height;
	delete this.root.lft;
	delete this.root.rgt;
	
	this.usedWidth = 0;
	this.usedHeight = 0;	
}
	

/*
	Returns the actual used dimensions of the containing rectangle.
	
	Returns:
	
		A object composed of the properties: 'w' for width and 'h' for height. 
*/
NETXUS.RectanglePacker.prototype.getDimensions = function () {
	return { w: this.usedWidth, h: this.usedHeight };	
}
	
	
/*
 	Finds a suitable place for the given rectangle
 	
	Parameters:
	
		w - The rectangle width as integer.
		h - The rectangle height as integer.
		
	Returns:
	
		If there is room for the rectangle then returns the coordinates as an object 
		composed of 'x' and 'y' properties. 
		If it doesn't fit returns null
*/  	
NETXUS.RectanglePacker.prototype.findCoords = function ( w, h ) {
	
	// private function to traverse the node tree by recursion
	function recursiveFindCoords ( node, w, h ) {

		// private function to clone a node coords and size
		function cloneNode ( node ) {
			return {
				x: node.x,
				y: node.y,
				w: node.w,
				h: node.h	
			};
		}		
		
		// if we are not at a leaf then go deeper
		if ( node.lft ) {
			// check first the left branch if not found then go by the right
			var coords = recursiveFindCoords( node.lft, w, h );
			return coords ? coords : recursiveFindCoords( node.rgt, w, h );	
		}
		else
		{
			// if already used or it's too big then return
			if ( node.used || w > node.w || h > node.h )
				return null;
				
			// if it fits perfectly then use this gap
			if ( w == node.w && h == node.h ) {
				node.used = true;
				return { x: node.x, y: node.y };
			}
			
			// initialize the left and right leafs by clonning the current one
			node.lft = cloneNode( node );
			node.rgt = cloneNode( node );
			
			// checks if we partition in vertical or horizontal
			if ( node.w - w > node.h - h ) {
				node.lft.w = w;
				node.rgt.x = node.x + w;
				node.rgt.w = node.w - w;	
			} else {
				node.lft.h = h;
				node.rgt.y = node.y + h;
				node.rgt.h = node.h - h;							
			}
			
			return recursiveFindCoords( node.lft, w, h );		
		}
	}
		
	// perform the search
	var coords = recursiveFindCoords( this.root, w, h );
	// if fitted then recalculate the used dimensions
	if (coords) {
		if ( this.usedWidth < coords.x + w )
			this.usedWidth = coords.x + w;
		if ( this.usedHeight < coords.y + h )
			this.usedHeight = coords.y + h;
	}
	return coords;
}

function UnionFind(count) {
	this.roots = new Array(count);
	this.ranks = new Array(count);
	
	for(var i=0; i<count; ++i) {
		this.roots[i] = i;
		this.ranks[i] = 0;
	}
}
// Two calls find(x) always return the same result, if link(..) has not been called in between (unique representatives)
UnionFind.prototype.find = function(x) {
	var x0 = x;
	var roots = this.roots;
	while(roots[x] != x)  x = roots[x];
  
	while(roots[x0] != x) {
		var y = roots[x0];
		roots[x0] = x;
		x0 = y;
	} 
	return x;
}

UnionFind.prototype.link = function(x, y) {
	var xr = this.find(x), yr = this.find(y);
	if(xr == yr)  return;

	var ranks = this.ranks, roots = this.roots, xd = ranks[xr], yd = ranks[yr];
 
	if     (xd < yd) {  roots[xr] = yr;  }
	else if(yd < xd) {  roots[yr] = xr;  }
	else {  roots[yr] = xr;  ++ranks[xr];  }
}

var ICC=function(){var v=new Int16Array(1),C=new Uint8Array(v.buffer);function a(e,n){return e[n]<<8|e[n+1]}function G(e,n){C[0]=e[n+1];
C[1]=e[n];return v[0]}function I(e,n){return e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3]}function t(e,n,A){var L="";
for(var k=0;k<A;k++)L+=String.fromCharCode(e[n+k]);return L}function E(e,n,A){var L=[];for(var k=0;k<A;
k++)L.push(String.fromCharCode(e[n+k]));return L}function i(e,n,A){var L="";for(var k=0;k<A;k++){var z=e[n++]<<8|e[n++];
L+=String.fromCharCode(z)}return L}function B(e){var n=new Uint8Array(e);return{header:h(n,0),tags:F(n,128)}}function h(e,n){var A=t,L=I,k={};
k.I=A(e,4,4);k.version=e[8]+"."+(e[9]>>>4)+"."+(e[9]&15);k.P=A(e,12,4);k.a=A(e,16,4);k.p=A(e,20,4);k.v=a(e,24);
for(var z=0;z<5;z++)k.v+="."+a(e,26+2*z);k.platform=A(e,40,4);k.d=L(e,44);k.k=A(e,48,4);k.l=L(e,52);
k.Q=[L(e,56),L(e,60)];k.U=L(e,64);k.A=d(e,68);k.h=A(e,80,4);return k}function F(e,n){var A=I,L={},k=A(e,n);
n+=4;for(var z=0;z<k;z++){var r=t(e,n,4);n+=4;var s=A(e,n);n+=4;var x=A(e,n);n+=4;L[r]=o(e,s,x)}return L}function o(e,n,A){var L=t(e,n,4),k={C:L,T:A};
n+=4;n+=4;if(L=="mluc"){var z=[];for(var r=0;r<A;r++)z.push(e[n-8+r])}if(L=="mluc")D(k,e,n,A);else if(L=="text")M(k,e,n,A);
else if(L=="desc")u(k,e,n,A);else if(L=="mAB ")H(k,e,n,A);else if(L=="mft1")w(k,e,n,A);else if(L=="XYZ ")J(k,e,n,A);
else if(L=="para")l(k,e,n,A);else if(L=="curv")K(k,e,n,A);else if(L!="pseq"){console.log("unknown tag",L,n,n,A)}if((k.T&3)!=0)k.T+=4-(k.T&3);
return k}function D(e,n,A,L){var k=A-8,z=I(n,A);A+=4;var r=I(n,A);A+=4;e.b=[];for(var s=0;s<z;s++){var x={};
e.b.push(x);x.code=t(n,A,4);var j=I(n,A+4),b=I(n,A+8);A+=12;x.text=i(n,k+b,j>>>1)}}function u(e,n,A,L){var k=I(n,A);
A+=4;e.r=t(n,A,k-1);A+=k;var z=I(n,A);A+=4;var r=I(n,A);A+=4;e.e=i(n,A,r);A+=r;var s=a(n,A);A+=2;var x=n[A];
A++;e.z=t(n,A,x)}function H(e,n,A,L){var k=A-8;e.L=n[A];A++;e.u=n[A];A++;A+=2;var z=I(n,A);A+=4;var r=I(n,A);
A+=4;var s=I(n,A);A+=4;var x=I(n,A);A+=4;var j=I(n,A);A+=4;if(z!=0){e.S=[];A=k+z;for(var b=0;b<e.u;b++){var f=o(n,A,0);
A+=f.T;e.S.push(f)}}if(r!=0){e.F=[];for(var b=0;b<12;b++)e.F.push(p(n,k+r+b*4))}if(s!=0){e.o=[];A=k+s;
for(var b=0;b<e.u;b++){var f=o(n,A,0);A+=f.T;e.o.push(f)}}if(x!=0){e.c=[];A=k+x;e.n=[];for(var b=0;b<e.L;
b++)e.n.push(n[A+b]);A+=16;var y=n[A];A+=4;var g=e.u;for(var b=0;b<e.L;b++)g*=e.n[b];if(y==1)for(var b=0;
b<g;b++)e.c.push(n[A+b]*(1/255));if(y==2)for(var b=0;b<g;b++)e.c.push(a(n,A+2*b)*(1/65535))}if(j!=0){e.V=[];
A=k+j;for(var b=0;b<e.L;b++){var f=o(n,A,0);A+=f.T;e.V.push(f)}}}function w(e,n,A,L){q(e,n,A);A+=40;
e.K=m(n,A,e.L,256);A+=e.L*256;e.c=[];var k=Math.round(Math.pow(e.q,e.L))*e.u;for(var z=0;z<k;z++)e.c.push(n[A+z]*(1/255));
A+=k;e.D=m(n,A,e.u,256);A+=e.u*256}function q(e,n,A){e.L=n[A];A++;e.u=n[A];A++;e.q=n[A];A++;A++;e.F=[];
for(var L=0;L<9;L++){e.F.push(p(n,A));A+=4}}function m(e,n,A,L){var k=[];for(var z=0;z<A;z++){var r=[];
k.push(r);for(var s=0;s<L;s++){r.push(e[n]);n++}}return k}function l(e,n,A,L){e.s=a(n,A);A+=2;A+=2;var k=[1,3,4,5,7];
e.f=[];for(var z=0;z<k[e.s];z++)e.f.push(p(n,A+z*4))}function K(e,n,A,L){var k=I(n,A);A+=4;e.b=[];if(k==1)e.b.push(c(n,A));
else for(var z=0;z<k;z++)e.b.push(a(n,A+z*2));e.T=12+2*k}function J(e,n,A){e.value=d(n,A)}function M(e,n,A,L){e.value=t(n,A,L-9)}function c(e,n){return e[n]+e[n+1]/256}function p(e,n){return G(e,n)+a(e,n+2)*(1/65536)}function d(e,n){var A=[];
for(var L=0;L<3;L++)A.push(p(e,n+L*4));return A}return{R:B}}();ICC.U=function(){var v={O:[3.1338561,-1.6168667,-.4906146,-.9787684,1.9161415,.033454,.0719453,-.2289914,1.4052427],H:[.4360747,.3850649,.14308038,.2225045,.7168786,.0606169,.0139322,.0971045,.7141733],m:function(F){return F<.0031308?12.92*F:1.055*Math.pow(F,1/2.4)-.055},G:function(F){return F<.04045?F/12.92:Math.pow((F+.055)/1.055,2.4)},J:function(F,o,D){var u=v.R[0],H=v.R[1];
F=u[~~(F*(1e3/255))];o=u[~~(o*(1e3/255))];D=u[~~(D*(1e3/255))];var w=v.H,q=w[0]*F+w[1]*o+w[2]*D,l=w[3]*F+w[4]*o+w[5]*D,K=w[6]*F+w[7]*o+w[8]*D;
q=q*(100/96.72);l=l*(100/100);K=K*(100/81.427);return v.i(q,l,K)},i:function(F,o,D){var u=v.R[1],H=u[~~(F*1e3)],w=u[~~(o*1e3)],q=u[~~(D*1e3)];
return{t:116*w-16,j:500*(H-w),N:200*(w-q)}},w:function(F,o,D){var u=903.3,H=.008856,w=(F+16)/116,q=w*w*w,m=w-D/200,l=m*m*m,K=o/500+w,J=K*K*K,M=l>H?l:(116*m-16)/u,c=q>H?q:(116*w-16)/u,p=J>H?J:(116*K-16)/u,d=p*96.72,e=c*100,n=M*81.427,A=d/100,k=e/100,D=n/100,z=v.O,r=[z[0]*A+z[1]*k+z[2]*D,z[3]*A+z[4]*k+z[5]*D,z[6]*A+z[7]*k+z[8]*D];
for(var s=0;s<3;s++)r[s]=Math.max(0,Math.min(255,v.m(r[s])*255));return{g:r[0],q:r[1],N:r[2]}}};v.R=function(){var F=[],o=[];
for(var D=0;D<2e3;D++){var u=D/1e3;F[D]=v.G(u);o[D]=u>.008856?Math.pow(u,1/3):(903.3*u+16)*(1/116)}return[F,o]}();
function C(F,o){var D=o*o*o,u=D*3,H=1/(o-1),w=[];for(var q=0;q<o;q++)for(var l=0;l<o;l++)for(var K=0;
K<o;K++)w.push(q*H,l*H,K*H);var J=F.tags.A2B0,M=F.header.a.toLowerCase();if(J.C=="mAB "){var c=J.F,p=J.o&&J.o[0].b.length>1?J.o:null;
for(var d=0;d<u;d+=3){if(p)G(w,d,p);t(w,d,J.c,J.n[0]);if(J.F)a(w,d,J.F)}}else if(J.C=="mft1"){if(M=="rgb ")for(var d=0;
d<u;d+=3){t(w,d,J.c,J.q)}else for(var d=0;d<u;d+=3){var e=v.J(w[d]*255,w[d+1]*255,w[d+2]*255);w[d]=e.t/100;
w[d+1]=(128+e.j)/255;w[d+2]=(128+e.N)/255;t(w,d,J.c,J.q);var n=v.w(w[d]*100,-128+255*w[d+1],-128+255*w[d+2]);
w[d]=n.g/255;w[d+1]=n.q/255;w[d+2]=n.N/255}}return w}function a(F,o,D){var u=F[o],H=F[o+1],w=F[o+2];
F[o]=Math.max(0,Math.min(1,D[0]*u+D[1]*H+D[2]*w+D[9]));F[o+1]=Math.max(0,Math.min(1,D[3]*u+D[4]*H+D[5]*w+D[10]));
F[o+2]=Math.max(0,Math.min(1,D[6]*u+D[7]*H+D[8]*w+D[11]))}function G(F,o,D){F[o]=I(F[o],D[0].b);F[o+1]=I(F[o+1],D[1].b);
F[o+2]=I(F[o+2],D[2].b)}function I(F,o){var D=o.length,u=F*(D-1)*.99999,H=~~u,w=u-H;return((1-w)*o[H]+w*o[H+1])*(1/65535)}function t(F,o,D,u){var H=[0,0,0,0,0,0,0,0,0,0,0,0],w=u-1.000001,q=w*F[o+0],l=w*F[o+1],K=w*F[o+2],J=~~q,M=~~l,c=~~K;
E(3*(c+u*M+u*u*J),3*(c+1+u*M+u*u*J),D,K-c,0,H);E(3*(c+u*(M+1)+u*u*J),3*(c+1+u*(M+1)+u*u*J),D,K-c,3,H);
E(0,3,H,l-M,6,H);E(3*(c+u*M+u*u*(J+1)),3*(c+1+u*M+u*u*(J+1)),D,K-c,0,H);E(3*(c+u*(M+1)+u*u*(J+1)),3*(c+1+u*(M+1)+u*u*(J+1)),D,K-c,3,H);
E(0,3,H,l-M,9,H);E(6,9,H,q-J,0,H);F[o]=H[0];F[o+1]=H[1];F[o+2]=H[2]}function E(F,o,D,u,H,w){var q=1-u;
w[H+0]=q*D[F]+u*D[o];w[H+1]=q*D[F+1]+u*D[o+1];w[H+2]=q*D[F+2]+u*D[o+2]}function i(F,o){var D=o*o*o,u=new Uint8Array(D*4);
for(var H=0;H<D;H++){var w=H*3,q=w+H,m=Math.max(0,Math.min(1,F[w])),l=Math.max(0,Math.min(1,F[w+1])),K=Math.max(0,Math.min(1,F[w+2]));
u[q]=~~(.5+m*255);u[q+1]=~~(.5+l*255);u[q+2]=~~(.5+K*255);u[q+3]=255;F[w]=m;F[w+1]=l;F[w+2]=K}return u}function B(F,o,D,u,H,w){var q=1-u;
w[H+0]=q*D[F]+u*D[o];w[H+1]=q*D[F+1]+u*D[o+1];w[H+2]=q*D[F+2]+u*D[o+2]}function h(F,o,D,u){var H=[0,0,0,0,0,0,0,0,0,0,0,0],w=(o-1.000001)/255,q=3;
for(var m=0;m<D.length;m+=4){var l=w*D[m],K=w*D[m+1],J=w*D[m+2],M=~~l,c=~~K,p=~~J;B(q*(p+o*c+o*o*M),q*(p+1+o*c+o*o*M),F,J-p,0,H);
B(q*(p+o*(c+1)+o*o*M),q*(p+1+o*(c+1)+o*o*M),F,J-p,3,H);B(0,3,H,K-c,6,H);B(q*(p+o*c+o*o*(M+1)),q*(p+1+o*c+o*o*(M+1)),F,J-p,0,H);
B(q*(p+o*(c+1)+o*o*(M+1)),q*(p+1+o*(c+1)+o*o*(M+1)),F,J-p,3,H);B(0,3,H,K-c,9,H);B(6,9,H,l-M,0,H);u[m]=~~(.5+H[0]*255);
u[m+1]=~~(.5+H[1]*255);u[m+2]=~~(.5+H[2]*255)}}return{rgba8LUT:i,sampleLUT:C,applyLUT:h}}()/*
 * [js-sha1]{@link https://github.com/emn178/js-sha1}
 *
 * @version 0.6.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
!function(){"use strict";function t(t){t?(f[0]=f[16]=f[1]=f[2]=f[3]=f[4]=f[5]=f[6]=f[7]=f[8]=f[9]=f[10]=f[11]=f[12]=f[13]=f[14]=f[15]=0,this.blocks=f):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],this.h0=1732584193,this.h1=4023233417,this.h2=2562383102,this.h3=271733878,this.h4=3285377520,this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0}var h="object"==typeof window?window:{},s=!h.JS_SHA1_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;s&&(h=global);var i=!h.JS_SHA1_NO_COMMON_JS&&"object"==typeof module&&module.exports,e="function"==typeof define&&define.amd,r="0123456789abcdef".split(""),o=[-2147483648,8388608,32768,128],n=[24,16,8,0],a=["hex","array","digest","arrayBuffer"],f=[],u=function(h){return function(s){return new t(!0).update(s)[h]()}},c=function(){var h=u("hex");s&&(h=p(h)),h.create=function(){return new t},h.update=function(t){return h.create().update(t)};for(var i=0;i<a.length;++i){var e=a[i];h[e]=u(e)}return h},p=function(t){var h=eval("require('crypto')"),s=eval("require('buffer').Buffer"),i=function(i){if("string"==typeof i)return h.createHash("sha1").update(i,"utf8").digest("hex");if(i.constructor===ArrayBuffer)i=new Uint8Array(i);else if(void 0===i.length)return t(i);return h.createHash("sha1").update(new s(i)).digest("hex")};return i};t.prototype.update=function(t){if(!this.finalized){var s="string"!=typeof t;s&&t.constructor===h.ArrayBuffer&&(t=new Uint8Array(t));for(var i,e,r=0,o=t.length||0,a=this.blocks;r<o;){if(this.hashed&&(this.hashed=!1,a[0]=this.block,a[16]=a[1]=a[2]=a[3]=a[4]=a[5]=a[6]=a[7]=a[8]=a[9]=a[10]=a[11]=a[12]=a[13]=a[14]=a[15]=0),s)for(e=this.start;r<o&&e<64;++r)a[e>>2]|=t[r]<<n[3&e++];else for(e=this.start;r<o&&e<64;++r)(i=t.charCodeAt(r))<128?a[e>>2]|=i<<n[3&e++]:i<2048?(a[e>>2]|=(192|i>>6)<<n[3&e++],a[e>>2]|=(128|63&i)<<n[3&e++]):i<55296||i>=57344?(a[e>>2]|=(224|i>>12)<<n[3&e++],a[e>>2]|=(128|i>>6&63)<<n[3&e++],a[e>>2]|=(128|63&i)<<n[3&e++]):(i=65536+((1023&i)<<10|1023&t.charCodeAt(++r)),a[e>>2]|=(240|i>>18)<<n[3&e++],a[e>>2]|=(128|i>>12&63)<<n[3&e++],a[e>>2]|=(128|i>>6&63)<<n[3&e++],a[e>>2]|=(128|63&i)<<n[3&e++]);this.lastByteIndex=e,this.bytes+=e-this.start,e>=64?(this.block=a[16],this.start=e-64,this.hash(),this.hashed=!0):this.start=e}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},t.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,h=this.lastByteIndex;t[16]=this.block,t[h>>2]|=o[3&h],this.block=t[16],h>=56&&(this.hashed||this.hash(),t[0]=this.block,t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.hBytes<<3|this.bytes>>>29,t[15]=this.bytes<<3,this.hash()}},t.prototype.hash=function(){var t,h,s=this.h0,i=this.h1,e=this.h2,r=this.h3,o=this.h4,n=this.blocks;for(t=16;t<80;++t)h=n[t-3]^n[t-8]^n[t-14]^n[t-16],n[t]=h<<1|h>>>31;for(t=0;t<20;t+=5)s=(h=(i=(h=(e=(h=(r=(h=(o=(h=s<<5|s>>>27)+(i&e|~i&r)+o+1518500249+n[t]<<0)<<5|o>>>27)+(s&(i=i<<30|i>>>2)|~s&e)+r+1518500249+n[t+1]<<0)<<5|r>>>27)+(o&(s=s<<30|s>>>2)|~o&i)+e+1518500249+n[t+2]<<0)<<5|e>>>27)+(r&(o=o<<30|o>>>2)|~r&s)+i+1518500249+n[t+3]<<0)<<5|i>>>27)+(e&(r=r<<30|r>>>2)|~e&o)+s+1518500249+n[t+4]<<0,e=e<<30|e>>>2;for(;t<40;t+=5)s=(h=(i=(h=(e=(h=(r=(h=(o=(h=s<<5|s>>>27)+(i^e^r)+o+1859775393+n[t]<<0)<<5|o>>>27)+(s^(i=i<<30|i>>>2)^e)+r+1859775393+n[t+1]<<0)<<5|r>>>27)+(o^(s=s<<30|s>>>2)^i)+e+1859775393+n[t+2]<<0)<<5|e>>>27)+(r^(o=o<<30|o>>>2)^s)+i+1859775393+n[t+3]<<0)<<5|i>>>27)+(e^(r=r<<30|r>>>2)^o)+s+1859775393+n[t+4]<<0,e=e<<30|e>>>2;for(;t<60;t+=5)s=(h=(i=(h=(e=(h=(r=(h=(o=(h=s<<5|s>>>27)+(i&e|i&r|e&r)+o-1894007588+n[t]<<0)<<5|o>>>27)+(s&(i=i<<30|i>>>2)|s&e|i&e)+r-1894007588+n[t+1]<<0)<<5|r>>>27)+(o&(s=s<<30|s>>>2)|o&i|s&i)+e-1894007588+n[t+2]<<0)<<5|e>>>27)+(r&(o=o<<30|o>>>2)|r&s|o&s)+i-1894007588+n[t+3]<<0)<<5|i>>>27)+(e&(r=r<<30|r>>>2)|e&o|r&o)+s-1894007588+n[t+4]<<0,e=e<<30|e>>>2;for(;t<80;t+=5)s=(h=(i=(h=(e=(h=(r=(h=(o=(h=s<<5|s>>>27)+(i^e^r)+o-899497514+n[t]<<0)<<5|o>>>27)+(s^(i=i<<30|i>>>2)^e)+r-899497514+n[t+1]<<0)<<5|r>>>27)+(o^(s=s<<30|s>>>2)^i)+e-899497514+n[t+2]<<0)<<5|e>>>27)+(r^(o=o<<30|o>>>2)^s)+i-899497514+n[t+3]<<0)<<5|i>>>27)+(e^(r=r<<30|r>>>2)^o)+s-899497514+n[t+4]<<0,e=e<<30|e>>>2;this.h0=this.h0+s<<0,this.h1=this.h1+i<<0,this.h2=this.h2+e<<0,this.h3=this.h3+r<<0,this.h4=this.h4+o<<0},t.prototype.hex=function(){this.finalize();var t=this.h0,h=this.h1,s=this.h2,i=this.h3,e=this.h4;return r[t>>28&15]+r[t>>24&15]+r[t>>20&15]+r[t>>16&15]+r[t>>12&15]+r[t>>8&15]+r[t>>4&15]+r[15&t]+r[h>>28&15]+r[h>>24&15]+r[h>>20&15]+r[h>>16&15]+r[h>>12&15]+r[h>>8&15]+r[h>>4&15]+r[15&h]+r[s>>28&15]+r[s>>24&15]+r[s>>20&15]+r[s>>16&15]+r[s>>12&15]+r[s>>8&15]+r[s>>4&15]+r[15&s]+r[i>>28&15]+r[i>>24&15]+r[i>>20&15]+r[i>>16&15]+r[i>>12&15]+r[i>>8&15]+r[i>>4&15]+r[15&i]+r[e>>28&15]+r[e>>24&15]+r[e>>20&15]+r[e>>16&15]+r[e>>12&15]+r[e>>8&15]+r[e>>4&15]+r[15&e]},t.prototype.toString=t.prototype.hex,t.prototype.digest=function(){this.finalize();var t=this.h0,h=this.h1,s=this.h2,i=this.h3,e=this.h4;return[t>>24&255,t>>16&255,t>>8&255,255&t,h>>24&255,h>>16&255,h>>8&255,255&h,s>>24&255,s>>16&255,s>>8&255,255&s,i>>24&255,i>>16&255,i>>8&255,255&i,e>>24&255,e>>16&255,e>>8&255,255&e]},t.prototype.array=t.prototype.digest,t.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(20),h=new DataView(t);return h.setUint32(0,this.h0),h.setUint32(4,this.h1),h.setUint32(8,this.h2),h.setUint32(12,this.h3),h.setUint32(16,this.h4),t};var y=c();i?module.exports=y:(h.sha1=y,e&&define(function(){return y}))}();var EXRLoader={parse:function(e){var r={FloatType:1,UnsignedByteType:2,HalfFloatType:3,RGBEFormat:4};this.type=r.FloatType;var a=65536,n=a>>3,t=14,i=65537,o=1<<t,f=o-1,l=32768,u=65535,s=59,v=63,c=2+v-s,h=8,w=4,p=4,y=2,d=1,g=0,A=1,S=0,U=1,b=2,m=Math.pow(2.7182818,2.2),M=new DataView(new ArrayBuffer(8));function C(e){if(0===e)return[e,0];M.setFloat64(0,e);var r=M.getUint32(0)>>>20&2047;0===r&&(M.setFloat64(0,e*Math.pow(2,64)),r=(M.getUint32(0)>>>20&2047)-64);var a=r-1022;return[function(e,r){for(var a=Math.min(3,Math.ceil(Math.abs(r)/1023)),n=e,t=0;t<a;t++)n*=Math.pow(2,Math.floor((r+t)/a));return n}(e,-a),a]}var O={l:0,c:0,lc:0};function I(e,r,a,n,t){for(;a<e;)r=r<<8|te(n,t),a+=8;a-=e,O.l=r>>a&(1<<e)-1,O.c=r,O.lc=a}var E=new Array(59);function R(e,r,a,n,t,o,f){for(var l=a,u=0,h=0;t<=o;t++){if(l.value-a.value>n)return!1;I(6,u,h,e,l);var w=O.l;if(u=O.c,h=O.lc,f[t]=w,w==v){if(l.value-a.value>n)throw"Something wrong with hufUnpackEncTable";I(8,u,h,e,l);var p=O.l+c;if(u=O.c,h=O.lc,t+p>o+1)throw"Something wrong with hufUnpackEncTable";for(;p--;)f[t++]=0;t--}else if(w>=s){if(t+(p=w-s+2)>o+1)throw"Something wrong with hufUnpackEncTable";for(;p--;)f[t++]=0;t--}}!function(e){for(var r=0;r<=58;++r)E[r]=0;for(r=0;r<i;++r)E[e[r]]+=1;var a=0;for(r=58;r>0;--r){var n=a+E[r]>>1;E[r]=a,a=n}for(r=0;r<i;++r){var t=e[r];t>0&&(e[r]=t|E[t]++<<6)}}(f)}function x(e){return 63&e}function P(e){return e>>6}var z={c:0,lc:0};function N(e,r,a,n){e=e<<8|te(a,n),r+=8,z.c=e,z.lc=r}var T={c:0,lc:0};function k(e,r,a,n,t,i,o,f,l,u){if(e==r){n<8&&(N(a,n,t,o),a=z.c,n=z.lc);var s=a>>(n-=8);s=new Uint8Array([s])[0];if(l.value+s>u)return!1;for(var v=f[l.value-1];s-- >0;)f[l.value++]=v}else{if(!(l.value<u))return!1;f[l.value++]=e}T.c=a,T.lc=n}function _(e){return 65535&e}function D(e){var r=_(e);return r>32767?r-65536:r}var F={a:0,b:0};function B(e,r){var a=D(e),n=D(r),t=a+(1&n)+(n>>1),i=t,o=t-n;F.a=i,F.b=o}function L(e,r){var a=_(e),n=_(r),t=a-(n>>1)&u,i=n+t-l&u;F.a=i,F.b=t}function X(e,r,a,n,t,i,o){for(var f,l=o<16384,u=a>t?t:a,s=1;s<=u;)s<<=1;for(f=s>>=1,s>>=1;s>=1;){for(var v,c,h,w,p=0,y=p+i*(t-f),d=i*s,g=i*f,A=n*s,S=n*f;p<=y;p+=g){for(var U=p,b=p+n*(a-f);U<=b;U+=S){var m=U+A,M=(C=U+d)+A;l?(B(e[U+r],e[C+r]),v=F.a,h=F.b,B(e[m+r],e[M+r]),c=F.a,w=F.b,B(v,c),e[U+r]=F.a,e[m+r]=F.b,B(h,w),e[C+r]=F.a,e[M+r]=F.b):(L(e[U+r],e[C+r]),v=F.a,h=F.b,L(e[m+r],e[M+r]),c=F.a,w=F.b,L(v,c),e[U+r]=F.a,e[m+r]=F.b,L(h,w),e[C+r]=F.a,e[M+r]=F.b)}if(a&s){var C=U+d;l?B(e[U+r],e[C+r]):L(e[U+r],e[C+r]),v=F.a,e[C+r]=F.b,e[U+r]=v}}if(t&s)for(U=p,b=p+n*(a-f);U<=b;U+=S){m=U+A;l?B(e[U+r],e[m+r]):L(e[U+r],e[m+r]),v=F.a,e[m+r]=F.b,e[U+r]=v}f=s,s>>=1}return p}function V(e,r,a,n,l,u){var s=a.value,v=ne(r,a),c=ne(r,a);a.value+=4;var h=ne(r,a);if(a.value+=4,v<0||v>=i||c<0||c>=i)throw"Something wrong with HUF_ENCSIZE";var w=new Array(i),p=new Array(o);if(function(e){for(var r=0;r<o;r++)e[r]={},e[r].len=0,e[r].lit=0,e[r].p=null}(p),R(e,0,a,n-(a.value-s),v,c,w),h>8*(n-(a.value-s)))throw"Something wrong with hufUncompress";!function(e,r,a,n){for(;r<=a;r++){var i=P(e[r]),o=x(e[r]);if(i>>o)throw"Invalid table entry";if(o>t){if((s=n[i>>o-t]).len)throw"Invalid table entry";if(s.lit++,s.p){var f=s.p;s.p=new Array(s.lit);for(var l=0;l<s.lit-1;++l)s.p[l]=f[l]}else s.p=new Array(1);s.p[s.lit-1]=r}else if(o){var u=0;for(l=1<<t-o;l>0;l--){var s;if((s=n[(i<<t-o)+u]).len||s.p)throw"Invalid table entry";s.len=o,s.lit=r,u++}}}}(w,v,c,p),function(e,r,a,n,i,o,l,u,s,v){for(var c=0,h=0,w=u,p=Math.trunc(i.value+(o+7)/8);i.value<p;)for(N(c,h,a,i),c=z.c,h=z.lc;h>=t;)if((A=r[c>>h-t&f]).len)h-=A.len,k(A.lit,l,c,h,a,0,i,s,v,w),c=T.c,h=T.lc;else{if(!A.p)throw"hufDecode issues";var y;for(y=0;y<A.lit;y++){for(var d=x(e[A.p[y]]);h<d&&i.value<p;)N(c,h,a,i),c=z.c,h=z.lc;if(h>=d&&P(e[A.p[y]])==(c>>h-d&(1<<d)-1)){h-=d,k(A.p[y],l,c,h,a,0,i,s,v,w),c=T.c,h=T.lc;break}}if(y==A.lit)throw"hufDecode issues"}var g=8-o&7;for(c>>=g,h-=g;h>0;){var A;if(!(A=r[c<<t-h&f]).len)throw"hufDecode issues";h-=A.len,k(A.lit,l,c,h,a,0,i,s,v,w),c=T.c,h=T.lc}}(w,p,e,0,a,h,c,u,l,{value:0})}function Z(e){for(var r=1;r<e.length;r++){var a=e[r-1]+e[r]-128;e[r]=a}}function H(e,r){for(var a=0,n=Math.floor((e.length+1)/2),t=0,i=e.length-1;!(t>i||(r[t++]=e[a++],t>i));)r[t++]=e[n++]}function W(e){for(var r=e.byteLength,a=new Array,n=0,t=new DataView(e);r>0;){var i=t.getInt8(n++);if(i<0){r-=(f=-i)+1;for(var o=0;o<f;o++)a.push(t.getUint8(n++))}else{var f=i;r-=2;var l=t.getUint8(n++);for(o=0;o<f+1;o++)a.push(l)}}return a}function G(e,r,a){for(var n,t=1;t<64;)65280==(n=r[e.value])?t=64:n>>8==255?t+=255&n:(a[t]=n,t++),e.value++}function Y(e,r){r[0]=le(e[0]),r[1]=le(e[1]),r[2]=le(e[5]),r[3]=le(e[6]),r[4]=le(e[14]),r[5]=le(e[15]),r[6]=le(e[27]),r[7]=le(e[28]),r[8]=le(e[2]),r[9]=le(e[4]),r[10]=le(e[7]),r[11]=le(e[13]),r[12]=le(e[16]),r[13]=le(e[26]),r[14]=le(e[29]),r[15]=le(e[42]),r[16]=le(e[3]),r[17]=le(e[8]),r[18]=le(e[12]),r[19]=le(e[17]),r[20]=le(e[25]),r[21]=le(e[30]),r[22]=le(e[41]),r[23]=le(e[43]),r[24]=le(e[9]),r[25]=le(e[11]),r[26]=le(e[18]),r[27]=le(e[24]),r[28]=le(e[31]),r[29]=le(e[40]),r[30]=le(e[44]),r[31]=le(e[53]),r[32]=le(e[10]),r[33]=le(e[19]),r[34]=le(e[23]),r[35]=le(e[32]),r[36]=le(e[39]),r[37]=le(e[45]),r[38]=le(e[52]),r[39]=le(e[54]),r[40]=le(e[20]),r[41]=le(e[22]),r[42]=le(e[33]),r[43]=le(e[38]),r[44]=le(e[46]),r[45]=le(e[51]),r[46]=le(e[55]),r[47]=le(e[60]),r[48]=le(e[21]),r[49]=le(e[34]),r[50]=le(e[37]),r[51]=le(e[47]),r[52]=le(e[50]),r[53]=le(e[56]),r[54]=le(e[59]),r[55]=le(e[61]),r[56]=le(e[35]),r[57]=le(e[36]),r[58]=le(e[48]),r[59]=le(e[49]),r[60]=le(e[57]),r[61]=le(e[58]),r[62]=le(e[62]),r[63]=le(e[63])}function j(e){for(var r=.5*Math.cos(.7853975),a=.5*Math.cos(.196349375),n=.5*Math.cos(.39269875),t=.5*Math.cos(3*3.14159/16),i=.5*Math.cos(.981746875),o=.5*Math.cos(3*3.14159/8),f=.5*Math.cos(1.374445625),l=new Array(4),u=new Array(4),s=new Array(4),v=new Array(4),c=0;c<8;++c){var h=8*c;l[0]=n*e[h+2],l[1]=o*e[h+2],l[2]=n*e[h+6],l[3]=o*e[h+6],u[0]=a*e[h+1]+t*e[h+3]+i*e[h+5]+f*e[h+7],u[1]=t*e[h+1]-f*e[h+3]-a*e[h+5]-i*e[h+7],u[2]=i*e[h+1]-a*e[h+3]+f*e[h+5]+t*e[h+7],u[3]=f*e[h+1]-i*e[h+3]+t*e[h+5]-a*e[h+7],s[0]=r*(e[h+0]+e[h+4]),s[3]=r*(e[h+0]-e[h+4]),s[1]=l[0]+l[3],s[2]=l[1]-l[2],v[0]=s[0]+s[1],v[1]=s[3]+s[2],v[2]=s[3]-s[2],v[3]=s[0]-s[1],e[h+0]=v[0]+u[0],e[h+1]=v[1]+u[1],e[h+2]=v[2]+u[2],e[h+3]=v[3]+u[3],e[h+4]=v[3]-u[3],e[h+5]=v[2]-u[2],e[h+6]=v[1]-u[1],e[h+7]=v[0]-u[0]}for(var w=0;w<8;++w)l[0]=n*e[16+w],l[1]=o*e[16+w],l[2]=n*e[48+w],l[3]=o*e[48+w],u[0]=a*e[8+w]+t*e[24+w]+i*e[40+w]+f*e[56+w],u[1]=t*e[8+w]-f*e[24+w]-a*e[40+w]-i*e[56+w],u[2]=i*e[8+w]-a*e[24+w]+f*e[40+w]+t*e[56+w],u[3]=f*e[8+w]-i*e[24+w]+t*e[40+w]-a*e[56+w],s[0]=r*(e[w]+e[32+w]),s[3]=r*(e[w]-e[32+w]),s[1]=l[0]+l[3],s[2]=l[1]-l[2],v[0]=s[0]+s[1],v[1]=s[3]+s[2],v[2]=s[3]-s[2],v[3]=s[0]-s[1],e[0+w]=v[0]+u[0],e[8+w]=v[1]+u[1],e[16+w]=v[2]+u[2],e[24+w]=v[3]+u[3],e[32+w]=v[3]-u[3],e[40+w]=v[2]-u[2],e[48+w]=v[1]-u[1],e[56+w]=v[0]-u[0]}function q(e){for(var r=0;r<64;++r){var a=e[0][r],n=e[1][r],t=e[2][r];e[0][r]=a+1.5747*t,e[1][r]=a-.1873*n-.4682*t,e[2][r]=a+1.8556*n}}function J(e,r,a){for(var n=0;n<64;++n)r[a+n]=ue(K(e[n]))}function K(e){return e<=1?Math.sign(e)*Math.pow(Math.abs(e),2.2):Math.sign(e)*Math.pow(m,Math.abs(e)-1)}function Q(e){var r=e.array.slice(e.offset.value,e.offset.value+e.size),a=new Uint8Array(pako.inflate(r).buffer),n=new Uint8Array(a.length);return Z(a),H(a,n),new DataView(n.buffer)}function $(e){var r=e.viewer,a={value:e.offset.value},n=new Uint8Array(e.width*e.lines*(we.channels.length*e.type*y)),t={version:oe(r,a),unknownUncompressedSize:oe(r,a),unknownCompressedSize:oe(r,a),acCompressedSize:oe(r,a),dcCompressedSize:oe(r,a),rleCompressedSize:oe(r,a),rleUncompressedSize:oe(r,a),rleRawSize:oe(r,a),totalAcUncompressedCount:oe(r,a),totalDcUncompressedCount:oe(r,a),acCompression:oe(r,a)};if(t.version<2)throw"EXRLoader.parse: "+we.compression+" version "+t.version+" is unsupported";for(var i=new Array,o=se(r,a)-y;o>0;){var f=ee(r.buffer,a),l=ie(r,a),u=l>>2&3,s=new Int8Array([(l>>4)-1])[0],v=ie(r,a);i.push({name:f,index:s,type:v,compression:u}),o-=f.length+3}for(var c=we.channels,h=new Array(e.channels),w=0;w<e.channels;++w){var p=h[w]={},d=c[w];p.name=d.name,p.compression=S,p.decoded=!1,p.type=d.pixelType,p.pLinear=d.pLinear,p.width=e.width,p.height=e.lines}for(var m={idx:new Array(3)},M=0;M<e.channels;++M)for(p=h[M],w=0;w<i.length;++w){var C=i[w];p.name==C.name&&(p.compression=C.compression,C.index>=0&&(m.idx[C.index]=M),p.offset=M)}if(t.acCompressedSize>0)switch(t.acCompression){case g:var O=new Uint16Array(t.totalAcUncompressedCount);V(e.array,r,a,t.acCompressedSize,O,t.totalAcUncompressedCount);break;case A:var I=e.array.slice(a.value,a.value+t.totalAcUncompressedCount);O=new Uint16Array(pako.inflate(I).buffer);a.value+=t.totalAcUncompressedCount}if(t.dcCompressedSize>0){var E={array:e.array,offset:a,size:t.dcCompressedSize},R=new Uint16Array(Q(E).buffer);a.value+=t.dcCompressedSize}if(t.rleRawSize>0){I=e.array.slice(a.value,a.value+t.rleCompressedSize);var x=W(pako.inflate(I).buffer);a.value+=t.rleCompressedSize}var P=0,z=new Array(h.length);for(w=0;w<z.length;++w)z[w]=new Array;for(var N=0;N<e.lines;++N)for(var T=0;T<h.length;++T)z[T].push(P),P+=h[T].width*e.type*y;!function(e,r,a,n,t,i){for(var o=new DataView(i.buffer),f=a[e.idx[0]].width,l=a[e.idx[0]].height,u=Math.floor(f/8),s=Math.ceil(f/8),v=Math.ceil(l/8),c=f-8*(s-1),h=l-8*(v-1),w={value:0},p=new Array(3),d=new Array(3),g=new Array(3),A=new Array(3),S=new Array(3),U=0;U<3;++U)S[U]=r[e.idx[U]],p[U]=U<1?0:p[U-1]+s*v,d[U]=new Float32Array(64),g[U]=new Uint16Array(64),A[U]=new Uint16Array(64*s);for(var b=0;b<v;++b){var m=8;b==v-1&&(m=h);for(var M=8,C=0;C<s;++C){for(C==s-1&&(M=c),U=0;U<3;++U)g[U].fill(0),g[U][0]=t[p[U]++],G(w,n,g[U]),Y(g[U],d[U]),j(d[U]);for(q(d),U=0;U<3;++U)J(d[U],A[U],64*C)}var O=0;for(U=0;U<3;++U){for(var I=a[e.idx[U]].type,E=8*b;E<8*b+m;++E)for(O=S[U][E],C=0;C<u;++C){var R=64*C+8*(7&E);o.setUint16(O+0*y*I,A[U][R+0],!0),o.setUint16(O+1*y*I,A[U][R+1],!0),o.setUint16(O+2*y*I,A[U][R+2],!0),o.setUint16(O+3*y*I,A[U][R+3],!0),o.setUint16(O+4*y*I,A[U][R+4],!0),o.setUint16(O+5*y*I,A[U][R+5],!0),o.setUint16(O+6*y*I,A[U][R+6],!0),o.setUint16(O+7*y*I,A[U][R+7],!0),O+=8*y*I}if(u!=s)for(E=8*b;E<8*b+m;++E){O=S[U][E]+8*u*y*I,R=64*u+8*(7&E);for(var x=0;x<M;++x)o.setUint16(O+x*y*I,A[U][R+x],!0)}}}var P=new Uint16Array(f);for(o=new DataView(i.buffer),U=0;U<3;++U)if(a[e.idx[U]].decoded=!0,I=a[e.idx[U]].type,2==a[U].type)for(E=0;E<l;++E){for(O=S[U][E],x=0;x<f;++x)P[x]=o.getUint16(O+x*y*I,!0);for(x=0;x<f;++x)o.setFloat32(O+x*y*I,le(P[x]),!0)}}(m,z,h,O,R,n);for(w=0;w<h.length;++w){if(!(p=h[w]).decoded)switch(p.compression){case b:var k=0,_=0;for(N=0;N<e.lines;++N){for(var D=z[w][k],F=0;F<p.width;++F){for(var B=0;B<y*p.type;++B)n[D++]=x[_+B*p.width*p.height];_++}k++}break;case U:default:throw"EXRLoader.parse: unsupported channel compression"}}return new DataView(n.buffer)}function ee(e,r){for(var a=new Uint8Array(e),n=0;0!=a[r.value+n];)n+=1;var t=(new TextDecoder).decode(a.slice(r.value,r.value+n));return r.value=r.value+n+1,t}function re(e,r){var a=e.getUint32(0,!0);return r.value=r.value+h,a}function ae(e,r){var a=e.getInt32(r.value,!0);return r.value=r.value+p,a}function ne(e,r){var a=e.getUint32(r.value,!0);return r.value=r.value+p,a}function te(e,r){var a=e[r.value];return r.value=r.value+d,a}function ie(e,r){var a=e.getUint8(r.value);return r.value=r.value+d,a}function oe(e,r){var a=Number(e.getBigInt64(r.value,!0));return r.value+=h,a}function fe(e,r){var a=e.getFloat32(r.value,!0);return r.value+=w,a}function le(e){var r=(31744&e)>>10,a=1023&e;return(e>>15?-1:1)*(r?31===r?a?NaN:1/0:Math.pow(2,r-15)*(1+a/1024):a/1024*6103515625e-14)}function ue(e){M.setFloat32(0,e);var r=M.getInt32(0),a=r>>16&32768,n=r>>12&2047,t=r>>23&255;return t<103?a:t>142?(a|=31744,a|=(255==t?0:1)&&8388607&r):t<113?a|=((n|=2048)>>114-t)+(n>>113-t&1):(a|=t-112<<10|n>>1,a+=1&n)}function se(e,r){var a=e.getUint16(r.value,!0);return r.value+=y,a}function ve(e,r,a,n,t){return"string"===n||"stringvector"===n||"iccProfile"===n?function(e,r,a){var n=(new TextDecoder).decode(new Uint8Array(e).slice(r.value,r.value+a));return r.value=r.value+a,n}(r,a,t):"chlist"===n?function(e,r,a,n){for(var t=a.value,i=[];a.value<t+n-1;){var o=ee(r,a),f=ae(e,a),l=ie(e,a);a.value+=3;var u=ae(e,a),s=ae(e,a);i.push({name:o,pixelType:f,pLinear:l,xSampling:u,ySampling:s})}return a.value+=1,i}(e,r,a,t):"chromaticities"===n?function(e,r){return{redX:fe(e,r),redY:fe(e,r),greenX:fe(e,r),greenY:fe(e,r),blueX:fe(e,r),blueY:fe(e,r),whiteX:fe(e,r),whiteY:fe(e,r)}}(e,a):"compression"===n?function(e,r){return["NO_COMPRESSION","RLE_COMPRESSION","ZIPS_COMPRESSION","ZIP_COMPRESSION","PIZ_COMPRESSION","PXR24_COMPRESSION","B44_COMPRESSION","B44A_COMPRESSION","DWAA_COMPRESSION","DWAB_COMPRESSION"][ie(e,r)]}(e,a):"box2i"===n?function(e,r){return{xMin:ne(e,r),yMin:ne(e,r),xMax:ne(e,r),yMax:ne(e,r)}}(e,a):"lineOrder"===n?function(e,r){return["INCREASING_Y"][ie(e,r)]}(e,a):"float"===n?fe(e,a):"v2f"===n?function(e,r){return[fe(e,r),fe(e,r)]}(e,a):"v3f"===n?function(e,r){return[fe(e,r),fe(e,r),fe(e,r)]}(e,a):"int"===n?ae(e,a):"rational"===n?function(e,r){return[ae(e,r),ne(e,r)]}(e,a):"timecode"===n?function(e,r){return[ne(e,r),ne(e,r)]}(e,a):(a.value+=t,void console.log("Cannot parse value for unsupported type: "+n))}var ce=new DataView(e),he=new Uint8Array(e),we={};ce.getUint32(0,!0),ce.getUint8(4,!0),ce.getUint8(5,!0);for(var pe={value:8},ye=!0;ye;){var de=ee(e,pe);if(0==de)ye=!1;else{var ge=ve(ce,e,pe,ee(e,pe),ne(ce,pe));we[de]=ge}}var Ae,Se,Ue,be,me=we.dataWindow.yMax+1;switch(we.compression){case"NO_COMPRESSION":Se=1,Ae=function(e){return new DataView(e.array.buffer,e.offset.value,e.size)};break;case"RLE_COMPRESSION":Se=1,Ae=function(e){var r=e.viewer.buffer.slice(e.offset.value,e.offset.value+e.size),a=new Uint8Array(W(r)),n=new Uint8Array(a.length);return Z(a),H(a,n),new DataView(n.buffer)};break;case"ZIPS_COMPRESSION":Se=1,Ae=Q;break;case"ZIP_COMPRESSION":Se=16,Ae=Q;break;case"PXR24_COMPRESSION":Se=16,Ae=function(e){for(var r=e.array.slice(e.offset.value,e.offset.value+e.size),a=new Uint8Array(pako.inflate(r).buffer),n=new Uint8Array(a.length),t=n,i=Ee,o=0;o<t.length;o+=2*i){for(var f=0;f<i;f++)t[o+2*f]=a[o+f+i],t[o+2*f+1]=a[o+f];var l=new Uint16Array(t.buffer,o,i);for(f=1;f<i;f++)l[f]=l[f-1]+l[f]&65535}return new DataView(n.buffer)};break;case"PIZ_COMPRESSION":Se=32,Ae=function(e){for(var r=e.viewer,t={value:e.offset.value},i=e.width*Se*(we.channels.length*e.type),o=new Uint16Array(i),f=new Uint8Array(n),l=0,u=new Array(e.channels),s=0;s<e.channels;s++)u[s]={},u[s].start=l,u[s].end=u[s].start,u[s].nx=e.width,u[s].ny=e.lines,u[s].size=e.type,l+=u[s].nx*u[s].ny*u[s].size;var v=se(r,t),c=se(r,t);if(c>=n)throw"Something is wrong with PIZ_COMPRESSION BITMAP_SIZE";if(v<=c)for(s=0;s<c-v+1;s++)f[s+v]=ie(r,t);var h=new Uint16Array(a),w=function(e,r){for(var n=0,t=0;t<a;++t)(0==t||e[t>>3]&1<<(7&t))&&(r[n++]=t);for(var i=n-1;n<a;)r[n++]=0;return i}(f,h),p=ne(r,t);for(V(e.array,r,t,p,o,l),s=0;s<e.channels;++s)for(var d=u[s],g=0;g<u[s].size;++g)X(o,d.start+g,d.nx,d.size,d.ny,d.nx*d.size,w);!function(e,r,a){for(var n=0;n<a;++n)r[n]=e[r[n]]}(h,o,l);for(var A=0,S=new Uint8Array(o.buffer.byteLength),U=0;U<e.lines;U++)for(var b=0;b<e.channels;b++){var m=(d=u[b]).nx*d.size,M=new Uint8Array(o.buffer,d.end*y,m*y);S.set(M,A),A+=m*y,d.end+=m}return new DataView(S.buffer)};break;case"DWAA_COMPRESSION":Se=32,Ae=$;break;case"DWAB_COMPRESSION":Se=256,Ae=$;break;default:throw"EXRLoader.parse: "+we.compression+" is unsupported"}var Me=we.channels[0].pixelType;if(1===Me)switch(this.type){case r.UnsignedByteType:case r.FloatType:be=function(e,r){return le(se(e,r))},Ue=y;break;case r.HalfFloatType:be=se,Ue=y}else{if(2!==Me)throw"EXRLoader.parse: unsupported pixelType "+Me+" for "+we.compression+".";switch(this.type){case r.UnsignedByteType:case r.FloatType:be=fe,Ue=w;break;case r.HalfFloatType:be=function(e,r){return ue(fe(e,r))},Ue=w}}for(var Ce=me/Se,Oe=0;Oe<Ce;Oe++)re(ce,pe);var Ie=we.dataWindow,Ee=Ie.xMax-Ie.xMin+1,Re=Ie.yMax-Ie.yMin+1,xe=Ee*Re*4;switch(this.type){case r.UnsignedByteType:case r.FloatType:var Pe=new Float32Array(xe);we.channels.length<4&&Pe.fill(1,0,xe);break;case r.HalfFloatType:Pe=new Uint16Array(xe);we.channels.length<4&&Pe.fill(15360,0,xe);break;default:console.error("THREE.EXRLoader: unsupported type: ",this.type)}for(var ze,Ne,Te={R:0,G:1,B:2,A:3},ke={size:0,width:Ee,lines:Se,offset:pe,array:he,viewer:ce,type:Me,channels:we.channels.length},_e={value:0},De=0;De<Re/Se;De++){ze=ne(ce,pe),xe=ne(ce,pe),ke.lines=ze+Se>Re?Re-ze:Se,ke.offset=pe,ke.size=xe,Ne=Ae(ke),pe.value+=xe;for(var Fe=0;Fe<Se;Fe++){var Be=Fe+De*Se;if(Be>=Re)break;for(var Le=0;Le<we.channels.length;Le++)for(var Xe=Te[we.channels[Le].name],Ve=0;Ve<Ee;Ve++){var Ze=Fe*(we.channels.length*Ee)+Le*Ee+Ve;_e.value=Ze*Ue;var He=be(Ne,_e);Pe[4*Ee*(Re-1-Be)+4*Ve+Xe]=He}}}if(this.type===r.UnsignedByteType){xe=Pe.length;for(var We,Ge=new Uint8Array(xe),Ye=0;Ye<Re;++Ye)for(var je=0;je<Ee;++je){var qe=Pe[Oe=Ye*Ee*4+4*je],Je=Pe[Oe+1],Ke=Pe[Oe+2];if((We=Ke>(We=qe>Je?qe:Je)?Ke:We)<1e-32)Ge[Oe]=Ge[Oe+1]=Ge[Oe+2]=Ge[Oe+3]=0;else{var Qe=C(We);We=256*Qe[0]/We,Ge[Oe]=qe*We,Ge[Oe+1]=Je*We,Ge[Oe+2]=Ke*We,Ge[Oe+3]=Qe[1]+128}}Pe=Ge}var $e=this.type===r.UnsignedByteType?r.RGBEFormat:r.RGBAFormat;return{header:we,width:Ee,height:Re,data:Pe,format:$e,type:this.type}}};