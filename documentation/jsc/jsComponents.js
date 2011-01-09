/* -*- javascript -*- 
     Copyright 2006-2008 Dr. Detlef Groth, Schwielowsee, Germany.
     License: http://creativecommons.org/licenses/LGPL/2.1/
     System        : JSCOMPONENTS_INIT_JS : 
     Created By    : Dr. Detlef Groth, Schwielowsee, Germany
     Last Modified : <080707.0925>
     ID            : $Id: jsComponents.js,v 1.45 2006/05/11 10:57:43 dgroth Exp $
     Source        : $Source: /cygdrive/d/cvs/jsComponents/css-js/jsComponents.js,v $
     $Log: jsComponents.js,v $
     Description	
     Notes
*/

// Simon Willison's Weblog http://simon.incutio.com/archive/2004/05/26/addLoadEvent
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}
/* Event Utilities */
function evtGetTarget(evt) {
    var elem ;
    if (evt.target) {
        elem = (evt.target.nodeType == 3) ? evt.target.parentNode : evt.target ;
    } else {
        elem = evt.srcElement ;
    }
    return elem ;
}

/* 
  more efficient to construct the functions ones 
  Thanks to Dean Edwards http://dean.edwards.name/
  */
var evtAdd;
if (document.addEventListener) {
    evtAdd = function(element, type, handler) {
        element.addEventListener(type, handler, null);
    };
} else if (document.attachEvent) {
    evtAdd = function(element, type, handler) {
        element.attachEvent("on" + type, handler);
    };
} else {
    alert("Your browser is not supported!");
}
/* XMLHttpRequestLoader - Class */
function XMLHttpRequestLoader () {
    var xmlhttp = false ;
    if (typeof(XMLHttpRequest) != "undefined") {
        xmlhttp = new XMLHttpRequest();
    } else {
        // IE 5, 6
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (ev0) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (ev1) {
                xmlhttp = false;
            }
        }
    }
    this.loadXML = loadXML  ;
    this.loadText = loadText;
    this.loadIEText = loadIEText;
    function loadText(url,cb,targetNode) {
        if (typeof(XMLHttpRequest) != "undefined") {
            loadMozText(url,cb,targetNode);
        } else if (xmlhttp) {
            loadIEText(url,cb,targetNode);
        } else {
            alert("Browser not supported or JavaScript or ActiveX (IE) is not enabled!");
        }
    }
    function loadXML(url,cb,targetNode) {
        if (typeof(XMLHttpRequest) != "undefined") {
            load(url,cb,targetNode);
        } else if (xmlhttp) {
            loadIE(url,cb,targetNode);
        } else {
            alert("Browser not supported or JavaScript or ActiveX (IE) is not enabled!");
        }
    }
    function load(srcUrl,cb,targetNode) {
        var req = new XMLHttpRequest();
        req.overrideMimeType('text/xml');
        req.open("GET", srcUrl, true);
        
        req.onreadystatechange = function() {
            if (req.readyState == 4) {
                if (cb && targetNode) {
                    cb(req.responseXML, targetNode);
                } else if (cb) {
                    cb(req.responseXML);
                }
            } 
                
        };
        req.setRequestHeader('Content-Type', 'text/xml'); 
        req.setRequestHeader('Cache-Control', 'no-cache'); 
        req.send(null);
    }
    function loadMozText(srcUrl,cb,targetNode) {
        var req = new XMLHttpRequest();
        req.open("GET", srcUrl, true);
        req.onreadystatechange = function() {
            if (req.readyState == 4) {
                var xmlText = req.responseText;
                xmlText = xmlText.replace(/<\/html>/,"");
                xmlText = xmlText.slice(xmlText.indexOf("<body>"));
                xmlText = xmlText.replace(/<\/?body>/g,"");

                if (cb && targetNode) {
                    cb(xmlText, targetNode);
                } else if (cb) {
                    cb(xmlText);
                }
            } 
                
        };
        req.setRequestHeader('Cache-Control', 'no-cache'); 
        req.send(null);
    }
    
    
    function loadIE(srcUrl,cb,targetNode) {
        
        xmlhttp.open("GET", srcUrl);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if (cb) {
                    var xmlObj = xmlhttp.responseXML;
                    
                    if(!xmlObj.hasChildNodes) {
                        // seems that Mime-Type was not recognized
                        // we create the right object by hand
                        xmlObj = new ActiveXObject("Msxml2.DOMDocument");
                        var xmlText = xmlhttp.responseText;
                        xmlText = xmlText.replace(/<\/html>/,"");
                        xmlText = xmlText.slice(xmlText.indexOf("<body>"));
                        xmlObj.loadXML(xmlText);
                        if (cb && targetNode) {
                            cb(xmlObj, targetNode);
                        } else {
                            cb(xmlObj);
                        }
                    } else {
                        if (cb && targetNode) {
                            cb(xmlhttp.responseXML, targetNode);
                        } else {
                            cb(xmlhttp.responseXML);
                        }
                    }
                }
            } 
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml'); 
        xmlhttp.setRequestHeader('Cache-Control', 'no-cache'); 
        xmlhttp.send(null);
    }
    function loadIEText(srcUrl,cb,targetNode) {
        xmlhttp.open("GET", srcUrl);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if (cb) {
                    var xmlText = xmlhttp.responseText;
                    xmlText = xmlText.replace(/<\/html>/,"");
                    xmlText = xmlText.slice(xmlText.indexOf("<body>"));
                    xmlText = xmlText.replace(/<\/?body>/g,"");
                    if (cb && targetNode) {
                        cb(xmlText, targetNode);
                    } else {
                        cb(xmlObj);
                    }
                }
            } 
        };
        xmlhttp.setRequestHeader('Cache-Control', 'no-cache'); 
        xmlhttp.send(null);
    }
}

function jsComponent (node) {
    try {
        eval("mfunc = "+node.className+";");
        mfunc(node);
    } catch (ev) {}
}


function jsComponentsInit() { 
    var divs = document.getElementsByTagName("DIV") ;
    var head = document.getElementsByTagName("head");
    // Image fix to fix missing display of images for 
    // Opera and firefox if used as style-images but not shown first
    var divp = document.createElement("div");
    var images = new Array("plus.gif","minus.gif","file2.gif","file.gif","up.gif","down.gif","plus20.gif","minus20.gif");
    for (var i = 0 ; i < images.length ; i++) {
        var img = new Image(); img.src = "jsc/img/"+images[i] ;
        divp.appendChild(img);
        img.width="0";
    }
    document.body.appendChild(divp);
    /* divs.length is ineffective but robust against adding new divs at runtime */
    for (var i = 0 ; i < divs.length ; i++) {
        if (divs.item(i).className && divs.item(i).className.match(/JS.+/)) {
            var comp = new jsComponent(divs.item(i));
        }
    }
    if(document.body.firstChild.nodeValue == "]&gt;") {
        // ie
        document.body.firstChild.deleteData(0,2)
    } else if(document.body.firstChild.nodeValue == "]> ") {
        // ie too
        document.body.firstChild.deleteData(0,3)
    } else {
        // firefox
        var node = document.body.firstChild.nextSibling;
        while (node.nodeValue) {
            if (node.nodeValue.match(/]>/)) {
                node.deleteData(0,3)
            }
            node = node.nextSibling;
        }
    }
    divp.style.display = "none" ;

}
addLoadEvent(jsComponentsInit);

var maxZ = 100 ; 

function JSDragArea (element) {
    this.grabDown = grabDown;
    this.grabClick = grabClick;
    evtAdd(element,"mousedown",this.grabDown);
    evtAdd(element,"mouseclick",this.grabClick);
    
    /*    var dw = new DebugWindow();*/
    function grabClick(e) {
        e=e||window.event;
        var node = evtGetTarget(e);
        if (node.style.zIndex != maxZ) {
            maxZ++;
            node.style.zIndex = maxZ;
        }
    }
    function grabDown(e) {
        e=e||window.event;
        var node = evtGetTarget(e);
        if (node.style.zIndex != maxZ) {
            maxZ++;
            node.style.zIndex = maxZ;
        }
        var clientX0 = e.clientX;
        var clientY0 = e.clientY;
        var top=node.style.top;
        var left=node.style.left;
        //        dw.append("top:"+top);
        window.document.onmousemove = function (e) {
            var deltaX; var deltaY;
            e=e||window.event;
            deltaX = e.clientX - clientX0;
            deltaY = e.clientY - clientY0;
            node.style.left = parseInt(left)+parseInt(deltaX) + "px";
            node.style.top =  parseInt(top)+parseInt(deltaY) + "px";

        };
        // IE seems better without dragstart
        window.document.ondragstart = function(){return false};
        // cleanup after document.onmouseup
        
        window.document.onmouseup = function(e) {
            this.onmousemove = null;
            this.onmouseup = null;
            this.ondragstart = null;
        };
    }
}



function JSDynContent(div) {
    var dsrc=div.getAttribute("datasrc");
    this.loadSource = loadSource;
    var src = null ;
    evtAdd(div, "click", this.loadSource);   
    function initializeResult(response,el) {
        el.innerHTML=response;
        var divs = el.getElementsByTagName("DIV") ;
        el.style.cursor = 'auto';
        for (var i = 0 ; i < divs.length ; i++) {
            if (divs.item(i).className && divs.item(i).className.match(/JS.+/)) {
                var comp = new jsComponent(divs.item(i));
            }
        }
        src.style.cursor = 'pointer';
    }
    function loadSource(e) {
        e=e||window.event;
        var element = evtGetTarget(e);
        var dsrc=element.getAttribute("datasrc");
        var items = dsrc.split(",");
        var target=document.getElementById(items[1]);
        element.style.cursor = 'wait' ;
        target.style.cursor = 'wait';
        var loader = new XMLHttpRequestLoader;
        src=element ;
        loader.loadText(items[0],initializeResult,target)
    }
}
// JSDynListAbbr Start
function JSDynListAbbr (element) {
    var parent = element.parentNode;
    var abbrs = parent.getElementsByTagName("abbr");
    var targetList = document.createElement("dl");
    // RegExp speichern
    // Nur Einträge der Form "Text für die Abkürzung (Abk)"
    // wie bei erstmaliger Verwendung üblich werden berücksichtigt
    var rx = /(.+)\((.+)\)/;
    var l = abbrs.length;   
    // Ein Array erstellen um später einfach zu sortieren
    var resList = new Array();
    for (var x = 0 ; x < l ; x++) {
        var res = rx.exec(abbrs.item(x).innerHTML);
        if (res) {
            resList.push(""+RegExp.$2+":::"+RegExp.$1);
        }
    }
    resList.sort();
    l = resList.length;
    // Nun Anhängen der Abkürzungen
    for (var x = 0 ; x < l ; x++) {
        var arr = resList[x].split(":::");
        var dt = document.createElement("dt");
        dt.appendChild(document.createTextNode(arr[0]));
        var dd = document.createElement("dd");
        dd.appendChild(document.createTextNode(arr[1]));
        targetList.appendChild(dt);
        targetList.appendChild(dd);
    }
    element.appendChild(targetList) ;
}
// JSDynListAbbr End
function JSDynListDfn (element) {
    var parent = element.parentNode;
    var dfns = parent.getElementsByTagName("dfn");
    var targetList = document.createElement("dl");
    // RegExp speichern
    // Nur Einträge der Form "Term [:,-] Beschreibung"
    // werden berücksichtigt
    var rx = /([^\s]+)(.+)/g;
    // how to replace returns ??
    var l = dfns.length;   

    // Ein Array erstellen um später einfach zu sortieren
    var resList = new Array();
    for (var x = 0 ; x < l ; x++) {
        var text = dfns.item(x).innerHTML.replace(/\n/g, " ");
/*        alert(text);*/
        var res = rx.exec(text);
        if (res) {
            resList.push(""+RegExp.$1+":::"+RegExp.$2);
        }
    }
    resList.sort();
    l = resList.length;
    // Nun Anhängen der Definitionen
    for (var x = 0 ; x < l ; x++) {
        var arr = resList[x].split(":::");
        var dt = document.createElement("dt");
        dt.appendChild(document.createTextNode(arr[0]));
        var dd = document.createElement("dd");
        dd.appendChild(document.createTextNode(arr[1]));
        targetList.appendChild(dt);
        targetList.appendChild(dd);
    }
    element.appendChild(targetList) ;
}
function JSDynListLink (element) {
    var parent = element.parentNode;
    var ls = parent.getElementsByTagName("a");
    var targetList = document.createElement("ol");
    var l = ls.length;
    var y = 0 ;
    for (var x = 0 ; x < l ; x++) {
        if (ls.item(x).hasAttribute("href") && ls.item(x).getAttribute("href").match(/^http:/)) {
            // alert(ls.item(x).innerHTML);
            // TODO check if this link is not yet saved!!
            var as = targetList.getElementsByTagName("a") ;
            var found = 0 ;
            for (var z = 0 ; z < as.length ; z++) {
                if (as.item(z).getAttribute("href") == ls.item(x).getAttribute("href")) {
                    ls.item(x).innerHTML = z+1 ;
                    found = 1 ;
                    break;
                }
            }
            if (found == 0) {
                var li = document.createElement("li");
                var a = document.createElement("a");
                y = y +1 ;
                a.setAttribute("href", ls.item(x).getAttribute("href"));
                a.appendChild(document.createTextNode(ls.item(x).getAttribute("href")));
                li.appendChild(document.createTextNode(ls.item(x).innerHTML+ " "));
                li.appendChild(a);
                targetList.appendChild(li);
                ls.item(x).innerHTML = ""+y ;
            }
        }
    }
    element.appendChild(targetList);
}
function JSDynListRef (element) {
    var parent= element.parentNode;
    var ol = element.getElementsByTagName("ol")[0];
    var lliste = ol.getElementsByTagName("li");
    if (lliste && lliste.length > 0) {
        //alert(lliste.length);
        var cites = parent.getElementsByTagName("cite");
        for (var x = 0 ; x < cites.length; x++) {
            var cites_text = "" ;
            var refs = cites.item(x).innerHTML.split(",");
            for (var y = 0 ; y < refs.length; y++) {
                // get the Entry
                for (var z = 0 ; z < lliste.length; z++) {
                    if (lliste.item(z).hasAttribute("id") && 
                        lliste.item(z).getAttribute("id") == refs[y]) {
                         if (cites_text != "") {
                             cites_text = cites_text+","
                         }
                         cites_text = cites_text+""+(z+1);
                     }	
                 }
                 
             }
             cites.item(x).innerHTML = cites_text;
         }
     }
}
JSDynListToc.counter=0;
function JSDynListToc (element) {
    JSDynListToc.counter++;
    var lastArray = new Array(4);
    var next = element.nextSibling;
    var targetList = document.createElement("ul");
    var x = 1 ;
    var lastidx = 0;
    while (next) {
	if (next.tagName &&  next.tagName.match(/h([1-4])/i)) {
            var idx = RegExp.$1 ;
            var pidx = idx-1;
            var name = "test";
            var as = next.getElementsByTagName("a");
            var alink =document.createElement("a");
            if (as.length > 0 && as.item(0).hasAttribute("name")) {
                name = as.item(0).getAttribute("name");
            } else {
                var a = document.createElement("a");
                name = "dynlistoc"+JSDynListToc.counter+"x"+x++ ;
                a.setAttribute("name",name);
                a.setAttribute("id",name);
                next.appendChild(a);
                
                
            }
            print(name);
            alink.setAttribute("href", "#"+name);
            var li = document.createElement("li");  
            li.appendChild(alink);
            alink.appendChild(document.createTextNode(next.innerHTML.replace(/<.+?>/g,"")));
            print("idx="+idx+" pidx="+pidx);
            if (idx > 1 && lastArray[pidx]) {
                if (idx > lastidx) {
                    var ul = document.createElement("ul");
                    ul.appendChild(li);
                    lastArray[pidx].appendChild(ul);
                    debug("append_ul");
                    lastArray[idx] = ul ;
                } else if (idx == lastidx) {
                    debug("append_li_eq");
                    lastArray[idx].appendChild(li);
                } else {
                    debug("append_li_lt");
                    lastArray[pidx].appendChild(li);
                }
            } else {
                targetList.appendChild(li);
                lastArray[idx] = targetList ;
                
            }
            lastidx = idx;
            
        }
        next = next.nextSibling;
    }
    element.appendChild(targetList);
    alert(targetList.innerHTML);
}
/*var el = document.getElementById("toc");*/
/*el.innerHTML = "" ;*/
/*JSDynListToc(el);*/
function JSSearchList (element) {
    this.keyup = keyup ;
    var div = window.document.createElement("div");
    var text = window.document.createTextNode("Search: ");
    div.className = "input" ;
    div.appendChild(text);
    var input = window.document.createElement("input");
    input.setAttribute("name", "inputvalue");
    input.setAttribute("type", "text");
    evtAdd(input, "keyup", this.keyup); 
    div.appendChild(input);
    element.insertBefore(div, element.firstChild);
    element.style.listStylePosition = "outside";
    function keyup(e) {
        //alert(element.getElementsByTagName("input")[0].value);
        //e=e || key.event;
        var input = evtGetTarget(e);
        var element = input.parentNode.parentNode ;
        var links = element.getElementsByTagName("A") ;
        var  m = input.value ;
        if (e.keyCode == 13) {
            for (var i = 0 ; i < links.length; i++) {
                if (links[i].parentNode.style.display == "") {
                    if ((links[i].getAttribute("target") == "" || 
                         links[i].getAttribute("target") == null) &&
                        (window.document.getElementsByTagName("BASE").item(0) == null ||
                         window.document.getElementsByTagName("BASE").item(0).getAttribute("target") == null ||
                        window.document.getElementsByTagName("BASE").item(0).getAttribute("target") == "")) 
                    {
                        window.location.href = links[i].getAttribute("href") ;
                    } else {
                        if (links[i].getAttribute("target") != null && links[i].getAttribute("target") != "") {
                            
                            eval("parent.frames."+links[i].getAttribute("target")+".location.href = '"+links[i].getAttribute("href")+"';"); 
                        } else {
                            eval("parent.frames."+window.document.getElementsByTagName("BASE").item(0).getAttribute("target")+".location.href = '"+links[i].getAttribute("href")+"';"); 
                        }
                    }
                    break;
                }
            }
        } else {
            var found = 0 ;
            if (m == "") {
                for (var i = 0 ; i < links.length; i++) {
                    links[i].parentNode.style.display ="";
                    if (found == 0) {
                        links[i].parentNode.style.backgroundColor = "#dddddd";
                    } else {
                        links[i].parentNode.style.backgroundColor = "white";
                    }
                    found ++ ;
                }
            } else {
                for (var i = 0 ; i < links.length; i++) {
                    if (links[i].firstChild.data.match(eval("/^"+m+"/i"))) {
                        links[i].parentNode.style.display ="";
                        if (found == 0) {
                            links[i].parentNode.style.backgroundColor = "#dddddd";
                        } else {
                            links[i].parentNode.style.backgroundColor = "white";
                        }
                        found ++ ;
                    } else {
                        links[i].parentNode.style.display ="none";
                        links[i].parentNode.style.backgroundColor = "white";
                    }
                }
            }
        }
    }

}

function JSMenu (element) {
    if (window.attachEvent) {
        // ie only
	var sfEls = element.getElementsByTagName("LI");
	for (var i=0; i<sfEls.length; i++) {
            sfEls[i].onmouseover=function() {
                this.className+=" sfhover";
            }
            sfEls[i].onmouseout=function() {
                this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
            }
	}
    }
    var uls= element.getElementsByTagName("UL");
    for (var i = 0 ; i < uls.length;i++) {
        if(uls.item(i).lastChild.tagName != "LI") {
            uls.item(i).lastChild.previousSibling.className="lastChild";
        } else {
            uls.item(i).lastChild.className="lastChild";
        }
    }
}
function JSTabBox (element) {
    var ie5 = document.all && 
              document.getElementById && 
              navigator.userAgent.toLowerCase().indexOf('opera')==-1?1:0 ;

    this.raiseTab = raiseTab ;
    evtAdd(element, "click", this.raiseTab); 
    var div = document.createElement("DIV") ;
  
/*     div.setAttribute("nowrap","true"); */
  
   
    element.insertBefore(div,element.firstChild) ;
    var ul = document.createElement("UL");
    div.appendChild(ul);
    var panels = element.getElementsByTagName("DIV") ;
    if (panels.item(1).getAttribute("title") == "N") {
        div.className = "JSTabNumbers" ;
    } else {
        div.className = "JSTabs" ;
    }
    var k = 0 ;
    var curr = 0 ;
    for (var j = 0 ; j < panels.length ; j++) {

        if (panels.item(j).className == "JSTabPanel" && 
            panels.item(j).parentNode == element && panels.item(j).getAttribute("title")) {
            var li = document.createElement("LI");
            if (panels.item(j).getAttribute("current")) {
                if (panels.item(j).getAttribute("current") == "true") {
                    li.className = "current" ;
                    curr = k ;
                }
            }
            var t ;
            if (div.className == "JSTabs") {
                t = document.createTextNode(panels.item(j).getAttribute("title"));
            } else {
                t = document.createTextNode(""+(k+1)+"");
            }
            panels.item(j).removeAttribute("title");
            li.appendChild(t);
            li.style.cursor = (ie5 ? "hand" : "pointer") ; 
            ul.appendChild(li);
            k++ ;
        }
    }
    ul.getElementsByTagName("LI").item(curr).className = "current" ;
    ul.getElementsByTagName("LI").item(curr).pointer = "" ;
    if (k == 1) {
        div.style.display="none";
    }
    showPanel(element, curr);
    function showPanel (parent,index) {
        var child = parent.firstChild ;
        var  curr = 0 ; 
        while (child != null) {
            if (child.className == "JSTabPanel") {
                if (index == curr) {
                    child.style.display = "block" ;
                } else {
                    child.style.display = "none" ;
                }
                curr++ ;
            }
            child = child.nextSibling ;
        }
    }
    function getIndex (el) {
        var idx = 0 ;
        var sibling  = el.previousSibling ; 
        while (sibling != null)  {
            if (sibling.nodeName == el.nodeName) {
                idx++ ;
            }
            sibling = sibling.previousSibling ;
        }
        return idx ;
    }
    function raiseTab (e) {
        e=e||window.event;
        var node = evtGetTarget(e);
        var parent = node.parentNode ;
        if (parent.parentNode.className != "JSTabs" && parent.parentNode.className != "JSTabNumbers") { return }
        var a= parent.getElementsByTagName("LI");
        for (var x = 0 ; x < a.length ; x++) {
            if (a[x].className.match("firstChild")) {
                a[x].className = "firstChild" ;
            } else {
                a[x].className = "" ;
            }
            a[x].style.cursor = (ie5 ? "hand" : "pointer") ;
        }
        if (node.className.match("firstChild")) {
            node.className= "current firstChild";
        } else {
            node.className = "current" ;
        }
        node.style.cursor = "" ;
        var index = getIndex(node) ;
        showPanel(node.parentNode.parentNode.parentNode, index);
    }
}
function JSTabLinks(element) {
    JSTabs(element);
}
function JSTabs (element) {
    var lis = element.getElementsByTagName("li");
    if (lis.item(0)) {
        lis.item(0).className = "firstChild" ;
    }
}

function JSTableStripe(div) {
    var table = div.getElementsByTagName("table")[0];
    var types = new Array("even","odd");
    var trs = table.getElementsByTagName("tr") ;
    for (var i = 0 ; i < trs.length ;i++) {
        var mod = i % 2 ;
        trs.item(i).className = types[mod] ;
    }
}
function JSTableSort(div) {
    var table = div.getElementsByTagName("table")[0];
    var types = new Array();
    var headers = table.getElementsByTagName('th');
    var order = "asc" ;
    var lastI = 100 ;
    for (var i = 0; i < headers.length;i++) {
        types[i] = headers.item(i).className;
    }
    for (var i = 0; i < headers.length;i++) {
        if (headers.item(i).className == "SortNumber") {
            headers[i].onclick = build_sorter(table,i,"n") ;
            
        } else if (headers.item(i).className == "SortString") {
            headers[i].onclick = build_sorter(table,i,"s") ;
        }

    }
    function sort_table (table,extract_fct,sort_fct) {
        var clones = new Array();
        var tbody = table.getElementsByTagName('tbody')[0];
        var rows = tbody.getElementsByTagName('tr');
        var l = rows.length ;
        for (var i = 0; i < l;i++) {
            var r = rows[i];
            var v = extract_fct(r);
            clones[i] = {
                value : v,
                element : r
            };
        }
        if (sort_fct) {
            clones.sort(sort_fct);
        } else {
            clones.sort();
            
        }
        if (order == "asc") {
            clones.reverse();
        }
        while(tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
        for (var i = 0; i < l; i++) {
            tbody.appendChild(clones[i].element);
        }
        if (rows.item(0).className == "even" || rows.item(0).className == "odd") {
            JSTableStripe(table.parentNode);
        }
    }
    function compare_numbers(a,b) {
        return (a.value-b.value);
    }
    function compare_strings(a,b) {
        a = a.value ; b = b.value ;
        if (""+a<""+b) return (-1) ;
        if (""+a>""+b) return (1) ;
        if (""+a==""+b) return (0) ;
    }
    
    function extract_string_ci (r,i) {
        var text = r.getElementsByTagName('td')[i].innerHTML.toLowerCase();
        text = text.replace(/<.+?>/g,"");
        return String(text) ;
    }
    
    function extract_string_c (r,i) {
        var text = r.getElementsByTagName('td')[i].innerHTML;
        text = text.replace(/<.+?>/g,"");
        return String(text) ;
    }
    function extract_number (r,i) {
        var n = r.getElementsByTagName('td')[i].innerHTML;
        return parseFloat(n) ;
        
    }

    function build_sorter(table,i,type) {
        return function() {
            var ths = table.getElementsByTagName("th");
            for (var j = 0 ; j < ths.length;j++) {
                table.getElementsByTagName("th").item(j).className = types[j] ;
            }
            if (order == 'desc' && lastI == 1) {
                order = "asc" ;
                table.getElementsByTagName('th').item(i).className="SortAsc";
            } else {
                
                table.getElementsByTagName('th').item(i).className="SortDesc";
                order = "desc" ;
                
            }
            lastI = 1 ;
            if(type == 'n') {
                sort_table(
                           table,function(r) {
                               return extract_number(r,i);
                           },
                           compare_numbers
                           );
            } else if (type == 's') {
                sort_table(
                           table, function (r) {
                               return extract_string_ci(r,i);
                           },
                           compare_strings
                           );
            }
        }
    }
}
/* JSTTip-Class */
function JSTTip (varname,filename,t) {
    var tipId ;
    var lastTipId = "null" ;
    var responseXML = false ;
    var vname = varname ;
    var file = filename ;
    var timeout = t ;
    var lastNode = null ;
    // first tooltip might take more time because the 
    // document must be downloaded
    var timeMulti = 2 ;
    function getTooltip() {
        /* tooltip construction */
        var id = "ttip" ;
        if (arguments[0]) { id = arguments[0]; }
        var tooltip ;
        if (!document.getElementById(id)) {
            tooltip = document.createElement("DIV");
            tooltip.visibility = "hidden" ;
            tooltip.setAttribute("id", id);
            document.body.appendChild(tooltip);
        }  else {
            tooltip = document.getElementById(id);
        }
        return tooltip ;
    }
    function getTTip (evt) {
        /* event resolution and tip positioning */
        var e = evt || window.event ;
     
        var node = evtGetTarget(e);
        var div = getTooltip() ;
         if (node.className == "JSTTip" || node.className == "JSInlineTooltip") {
            /*            alert(node);*/
            if (e.stopPropagation) e.stopPropagation();
            e.cancelBubble = true;

            // at the right place 
            // we can stop event propagation

        }
        
        tipId = node.getAttribute("id");
        window.setTimeout(''+vname+'.hideTTip()',timeout);
        if (tipId) {
            tipId = tipId.slice(0, 6);
        }
         if (window.pageXOffset || window.pageYOffset) {
            x = window.pageXOffset+e.clientX ;
            y = window.pageYOffset+e.clientY ;
        } else if (document.documentElement.scrollTop || document.documentElement.scrollLeft) {
            x = document.documentElement.scrollLeft+e.clientX ;
            y = document.documentElement.scrollTop+e.clientY ;
        } else {
            // ie < 6
            x = document.body.scrollLeft+e.clientX ;
            y = document.body.scrollTop+e.clientY ;
        }
        if (x > 500) {
            // we put it on the left side of the event
            // otherwise it might went out of the window
            x -= 250 ;
        }
        if (y > 300) {
            // like with x
            y -= 30;
        }
        div.style.left = x+"px";
        div.style.top = y+"px";
        // get content
        if (file == null) {
            var spans = node.getElementsByTagName("span");
            if (spans[0]) {
                div.innerHTML = spans[0].innerHTML;
                div.style.visibility = "visible" ;
            }
        } else if (node.className == "JSTTip" && !responseXML) {
            div.style.visibility = "visible" ;
            div.innerHTML = "Loading data ..." ;
            var loader = new XMLHttpRequestLoader;
            loader.loadXML(file,displayTTip);
        } else if (node.className == "JSTTip") {
            div.style.visibility = "visible" ;
            div.innerHTML = "Loading data ..." ;
            timeMulti = 1 ;
            displayTTip(responseXML);
        }
    }
    function displayTTip (response) {
        // parsing of the reponse
        // loading the right tip
        if (!tipId) {
            return;
        }
        responseXML=response ;
        var divs = responseXML.getElementsByTagName("div");
        for (var x = 0 ; x < divs.length ; x++) {
            if (divs.item(x).getAttribute('id').search(tipId) >= 0) {
                var div = getTooltip() ;
                if (divs.item(x).innerHTML) {
                    div.innerHTML = divs.item(x).innerHTML;
                } else if (divs.item(x).xml) {
                    div.innerHTML = divs.item(x).xml ;
                }
                
                break ;
            }
        }
        
        
    }
    function hideTTip() {
        if (lastTipId == tipId) {
            var div = getTooltip() ;
            div.style.visibility = "hidden" ;
        } else {
            window.setTimeout(''+vname+'.hideTTip()',timeout*timeMulti);
        }
        lastTipId = tipId ;
    }
    function addEventsTTips () {
        var spans = document.getElementsByTagName("span");
        for (var i = 0 ; i< spans.length;i++) {
            if(spans.item(i).className) {
                if(spans.item(i).className == "JSTTip") {
                    evtAdd(spans.item(i),"mouseover",getTTip);
                } else if (spans.item(i).className == "tip") {
                    evtAdd(spans.item(i).parentNode,"mouseover",getTTip);
                }
            }
        }
        
    }
    this.hideTTip = hideTTip;
    addEventsTTips();
}
var jstt ;
function JSToolTip (element) {
    // wrapper function
    // we need the global variable name for window.setTimeout
    // Parameters JSTTip(varName filename, timeout)
    var path ;
    var outtime ;
    if (element.getAttribute("data") == null) {
        alert("JSToolTip: error you need data attribute like so data='path/tips.xhtml,timout'!");
    } else {
        var text = element.getAttribute("data");
        var items = text.split(",");
    }
    jstt = new JSTTip('jstt',items[0],items[1]);    
}
function JSInlineTooltip (div) {
     jstt = new JSTTip('jstt',null,5000);
}
function JSCollapse(element) {
    var c = new JSTree(element);
}
function JSTree (element) {
    var lists = element.getElementsByTagName("LI") ;
    this.toggleDisplay = toggleDisplay ;
    this.expandcollapse = expandcollapse ;
    this.hideAllSubLists = hideAllSubLists ;
    this.listInit = listInit;
    this.insertInclude = insertInclude;
    evtAdd(element, "click", this.expandcollapse);    
    listInit(lists);
    hideAllSubLists(element, "");
    function listInit(lists) {
        for (var i = 0 ; i < lists.length; i++) {
            var listslists = lists.item(i).getElementsByTagName("LI") ;
            if (listslists.length > 0) {    
                if (lists.item(i).className != "opened") {
                    toggleDisplay(lists.item(i));
                }
            } else if (lists.item(i).className != "include") {
                lists.item(i).className = "leaf" ;
            }
        }
    }

    function hideAllSubLists(element, display) {
        var ul = element.childNodes ;
        for (var i = 0 ; i < ul.length ; i++) {
            var node = ul.item(i) ;
            if (node.nodeName == "LI" && node.getElementsByTagName("UL").item(0) &&
                node.getElementsByTagName("UL").item(0).nodeName == "UL") {
                node = node.getElementsByTagName("UL").item(0) ;
            }
            if (node.nodeName == "UL") {
                node.style.display = display ;
            }
        }
    }
    function getNodeUp (node, nodeType) {
        while (node.nodeName != nodeType) {
            node=node.parentNode;
        }
        return node ;
    }
    function expandcollapse (e) {
        e=e||window.event;
        var element = evtGetTarget(e);
        var child ;
        // to avoid closing the upper list-item
/*        e.cancelBubble = true;*/
     
/*        if (e.stopPropagation) e.stopPropagation();*/
        // to avoid closing the upper list-item if clicking on a link
        //alert(element.nextSibling.nodeName);
        try { if(window.event.srcElement.tagName != "LI" && window.event.srcElement.tagName != "SPAN") return; } catch (ev) {}
        toggleDisplay(element) ;
    }
    function insertInclude (response,el) {
        div = el.getElementsByTagName("div")[0];
        el.removeChild(div);
        el.innerHTML = el.innerHTML+response;
        var lis = el.getElementsByTagName("LI");
        if (lis.length > 0) {    
            el.className = "opened" ;
            listInit(lis);
            hideAllSubLists(el, "");
            
        } else {
            el.className = "leaf";
        }
        el.style.cursor = 'pointer';
    }
    function toggleDisplay(el) {
        if (el.className == "include") {
            el.style.cursor = 'wait';
            var loader = new XMLHttpRequestLoader;
            var dsrcdiv = el.getElementsByTagName("div")[0] ;
            loader.loadText(dsrcdiv.getAttribute("datasrc"),insertInclude,el);
            return ;

        }
                  
        child = el.getElementsByTagName("UL")[0];
        if (!child) {
            // we have mozilla which correctly finds it as s sibling
            child = el.nextSibling ;
            while (child != null) {
                if (child.nodeName == "UL") { break } ; //"[object HTMLUListElement]") { break }
                child = child.nextSibling ;
            }
        }
        if (child) {
            bCollapsed = (child.style.display == "none");
            // Toggle the display and listStyleImage properties depending
            // on the expanded or collapsed state of the list.
            if (bCollapsed) {
                if (element.className == "JSTree" || element.className == "JSCollapse") {
                    el.className = "opened" ;
                }
                child.style.display = "";
            } else {
                if (element.className == "JSTree" || element.className == "JSCollapse") {
                    el.className = "" ;
                }
                child.style.display = "none" ;
            }
        } else {
            // no child so it is a simple listitem
            el.className = "leaf" ;
        }
    }
   
}
