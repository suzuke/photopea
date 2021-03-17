


var tests = [

	{
		name: "Canvas",
		spec: "http://www.w3.org/TR/2dcontext/",
		works: function() 
		{
			var elem = document.createElement("canvas");
			if(elem == null || elem.getContext == null) return 1;
			var cont = elem.getContext("2d");
			if(cont == null) return 2;
			return 0;
		},
		desc: [
			"OK",
			"Canvas element not available",
			"Canvas' context2d not available"
		]
	},
	
	{
		name: "Typed Arrays",
		spec: "https://www.khronos.org/registry/typedarray/specs/latest/",
		works: function() 
		{
			if(window.ArrayBuffer == null) return 1;
			if(window.Uint8Array  == null) return 2;
			if(window.Uint8ClampedArray == null) return 3;
			if(window.Uint32Array == null) return 4;
			
			var buff = new Uint8Array(2);
			var buff2 = new Uint16Array(buff.buffer);  buff2[0] = 0xff00;
			if(buff[0]==0xff) return 5;
			
			return 0;
		},
		desc: [
			"OK",
			"ArrayBuffer not available",
			"Uint8Array not available",
			"Uint8ClampedArray not available",
			"Uint32Array not available",
			"ArrayBufferView is Big Endian (Little Endian expected)"
		]
	},
	{
		name: "Drag'n'Drop",
		spec: "http://www.w3.org/TR/2010/WD-html5-20101019/dnd.html",
		works: function() 
		{
			if(window.DataTransfer == null) return 1;
			if(window.FileReader   == null) return 2;
			if(('draggable' in document.createElement('span'))==null) return 3;
			if(('ondrop'    in document.createElement('span'))==null) return 4;
			return 0;
		},
		desc: [
			"OK",
			"DataTransfer not available",
			"FileReader not available",
			"\"draggable\" property not available",
			"onDrop event not available"
		]
	},
	{
		name: "&lt;a download",
		spec: "https://www.w3.org/TR/html5/links.html#attr-hyperlink-download",
		works: function()
		{
			var a = document.createElement("a");
			if((typeof a.download) != "string") return 1;
			return 0;
		},
		desc: [
			"OK",
			"\"dwonload\" attribute not available"
		]
	},
	{
		name: "KBEvent.key",
		spec: "https://www.w3.org/TR/uievents/#interface-keyboardevent",
		works: function()
		{
			var e = new KeyboardEvent("keydown");
			if(e.key==null) return 1;
			return 0;
		},
		desc: [
			"OK",
			"\"key\" property not available on KeyboardEvent"
		]
	},
	{
		name: "WebAssembly",
		spec: "https://www.w3.org/community/webassembly/",
		works: function() 
		{
			if(window.WebAssembly == null) return 1;
			return 0;
		},
		desc: [
			"OK",
			"WebAssembly object is not available"
		]
	},
]

var add_tests = [
	{
		name: "WebCL",
		spec: "http://www.khronos.org/registry/webcl/specs/latest/1.0/",
		works: function() 
		{
			if(window.WebCL == null) return 1;
			return 0;
		},
		desc: [
			"OK",
			"WebCL object is not available"
		]
	},
	{
		name: "Clipboard API",
		spec: "http://www.w3.org/TR/clipboard-apis/",
		works: function() 
		{
			if(window.DataTransfer == null) return 1;
			if(window.DataTransferItemList == null) return 2;
			var dpr = DataTransfer.prototype;
			if(dpr.getData == null) return 3;
			if(dpr.setData == null) return 4;
			return 0;
		},
		desc: [
			"OK",
			"DataTransfer not available",
			"DataTransferItemList not available",
			"DataTransfer.getData not available",
			"DataTransfer.setData not available"
		]
	}	
]