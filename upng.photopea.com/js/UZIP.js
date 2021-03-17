

var UZIP = {};


UZIP.parse = function(data)	// Uint8Array
{
	var bin = UZIP.bin, offset = 0, out = {};
	
	var eocd = data.length-4;
	
	while(bin.readUint(data, eocd)!=0x06054b50) eocd--;
	
	var offset = eocd;
	offset+=4;	// sign  = 0x06054b50
	offset+=4;  // disks = 0;
	var cnu = bin.readUshort(data, offset);  offset+=2;
	var cnt = bin.readUshort(data, offset);  offset+=2;
			
	var csize = bin.readUint  (data, offset);  offset+=4;
	var coffs = bin.readUint  (data, offset);  offset+=4;
	
	offset = coffs;
	for(var i=0; i<cnu; i++)
	{
		var sign = bin.readUint(data, offset);  offset+=4;
		offset += 4;  // versions;
		offset += 4;  // flag + compr
		offset += 4;  // time
		
		var crc = bin.readUint(data, offset);  offset+=4;
		offset += 8;  // sizes
		var nl = bin.readUshort(data, offset), el = bin.readUshort(data, offset+2), cl = bin.readUshort(data, offset+4);  offset += 6;  // name, extra, comment
		offset += 8;  // disk, attribs
		
		var roff = bin.readUint(data, offset);  offset+=4;
		offset += nl + el + cl;
		
		UZIP._readLocal(data, roff, out);
	}
	//console.log(out);
	return out;
}

UZIP._readLocal = function(data, offset, out)
{
	var bin = UZIP.bin;
	var sign = bin.readUint(data, offset);  offset+=4;
	var ver   = bin.readUshort(data, offset);  offset+=2;
	var gpflg = bin.readUshort(data, offset);  offset+=2;
	//if((gpflg&8)!=0) throw "unknown sizes";
	var cmpr  = bin.readUshort(data, offset);  offset+=2;
	
	var time = PUtils.readUint(data, offset);  offset+=4;
	
			
	var crc32 = bin.readUint  (data, offset);  offset+=4;
	var csize = bin.readUint  (data, offset);  offset+=4;
	var usize = bin.readUint  (data, offset);  offset+=4;
		
	var nlen  = bin.readUshort(data, offset);  offset+=2;
	var elen  = bin.readUshort(data, offset);  offset+=2;
		
	var name =  bin.readASCII(data, offset, nlen);  offset+=nlen;
	offset += elen;
			
	//console.log(ver, gpflg, cmpr, crc32, csize, usize, nlen, elen, name);
			
	var file = new Uint8Array(data.buffer, offset);
	if(false) {}
	else if(cmpr==0) out[name] = new Uint8Array(file.buffer.slice(offset, offset+csize));
	else if(cmpr==8) out[name] = pako["inflateRaw"](file);
	else throw "unknown compression method: "+cmpr;
}




UZIP.encode = function(obj) {
	var tot = 0;
	for(var p in obj) tot += obj[p].length + 30 + p.length + 46 + p.length;
	tot +=  22;
	
	var data = new Uint8Array(tot), offset = 0, bin = UZIP.bin;
	var fof = []
	
	for(var p in obj) {
		var file = obj[p];  fof.push(offset);
		offset = UZIP._writeHeader(data, offset, p, file, 0);
	}
	var i=0, ioff = offset;
	for(var p in obj) {
		var file = obj[p];  fof.push(offset);
		offset = UZIP._writeHeader(data, offset, p, file, 1, fof[i++]);		
	}
	var csize = offset-ioff;
	
	bin.writeUint  (data, offset, 0x06054b50);  offset+=4;
	offset += 4;  // disks
	bin.writeUshort(data, offset, i);  offset += 2;
	bin.writeUshort(data, offset, i);  offset += 2;	// number of c d records
	bin.writeUint  (data, offset, csize);  offset += 4;
	bin.writeUint  (data, offset, ioff );  offset += 4;
	offset += 2;
	
	return data;
}

UZIP._writeHeader = function(data, offset, p, file, t, roff)
{
	var bin = UZIP.bin;
	
	bin.writeUint  (data, offset, t==0 ? 0x04034b50 : 0x02014b50);  offset+=4; // sign
	if(t==1) offset+=2;  // ver made by
	bin.writeUshort(data, offset, 20);  offset+=2;	// ver
	bin.writeUshort(data, offset, 0);  offset+=2;   // gflip
	bin.writeUshort(data, offset, 0);  offset+=2;	// cmpr
		
	bin.writeUint(data, offset, 0);  offset+=4;	// time		
	bin.writeUint(data, offset, UZIP.crc.crc(file,0,file.length));  offset+=4;	// crc32
	bin.writeUint(data, offset, file.length);  offset+=4;	// csize
	bin.writeUint(data, offset, file.length);  offset+=4;	// usize
		
	bin.writeUshort(data, offset, p.length);  offset+=2;	// nlen
	bin.writeUshort(data, offset, 0);  offset+=2;	// elen
	
	if(t==1) {
		offset += 2;  // comment length
		offset += 2;  // disk number
		offset += 6;  // attributes
		bin.writeUint(data, offset, roff);  offset+=4;	// usize
	}
		
	bin.writeASCII(data, offset, p);  offset+= p.length;
	
	if(t==0) {
		for(var i=0; i<file.length; i++) data[offset+i] = file[i];
		offset += file.length;
	}
	
	return offset;
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
		for (var i=0; i<len; i++)  c = UPNG.crc.table[(c ^ buf[off+i]) & 0xff] ^ (c >>> 8);
		return c;
	},
	crc : function(b,o,l)  {  return UPNG.crc.update(0xffffffff,b,o,l) ^ 0xffffffff;  }
}

UZIP.bin = {
	readUshort : function(buff,p)  {  return (buff[p]) | (buff[p+1]<<8);  },
	writeUshort: function(buff,p,n){  buff[p] = (n)&255;  buff[p+1] = (n>>8)&255;  },
	readUint   : function(buff,p)  {  return (buff[p+3]*(256*256*256)) + ((buff[p+2]<<16) | (buff[p+1]<< 8) | buff[p]);  },
	writeUint  : function(buff,p,n){  buff[p+3]=(n>>24)&255;  buff[p+2]=(n>>16)&255;  buff[p+1]=(n>>8)&255;  buff[p]=n&255;  },
	readASCII  : function(buff,p,l){  var s = "";  for(var i=0; i<l; i++) s += String.fromCharCode(buff[p+i]);  return s;    },
	writeASCII : function(data,p,s){  for(var i=0; i<s.length; i++) data[p+i] = s.charCodeAt(i);  }
}